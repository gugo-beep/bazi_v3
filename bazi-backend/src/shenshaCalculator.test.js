// 1. 定义模拟的神煞规则，使测试独立于外部文件
const mockShenshaRules = [
    {
        name: '天乙贵人',
        preconditions: [
            { on: 'dayGan', value: ['甲', '戊'] }
        ],
        rules: [
            {
                trigger: { on: 'yearZhi', value: ['丑', '未'] },
                judgment: { on: 'allZhi', value: ['丑', '未'], exclude_trigger: false }
            }
        ]
    },
    {
        name: '桃花',
        rules: [ // 无前提条件
            {
                trigger: { on: 'yearZhi', value: ['寅', '午', '戌'] },
                judgment: { on: 'allZhi', value: ['卯'] }
            },
            {
                trigger: { on: 'dayZhi', value: ['申', '子', '辰'] },
                judgment: { on: 'allZhi', value: ['酉'] }
            }
        ]
    },
    {
        name: '国印贵人', // 用于测试分支逻辑
        branches: [
            {
                preconditions: [{ on: 'dayGan', value: ['甲'] }],
                rules: [{
                    trigger: { on: 'yearZhi', value: ['戌'] },
                    judgment: { on: 'allZhi', value: ['戌'] }
                }]
            },
            {
                preconditions: [{ on: 'dayGan', value: ['乙'] }],
                rules: [{
                    trigger: { on: 'yearZhi', value: ['亥'] },
                    judgment: { on: 'allZhi', value: ['亥'] }
                }]
            }
        ]
    }
];

// 2. 模拟 shenshaRules.js 的导入
import { jest } from '@jest/globals';
jest.unstable_mockModule('../data/shenshaRules.js', () => {
  return { default: mockShenshaRules }; // 返回包含default属性的对象
});

// 3. 在所有 mock 设置完毕后，导入我们要测试的模块
let calculateShensha;
beforeAll(async () => {
  const module = await import('./shenshaCalculator.js');
  calculateShensha = module.calculateShensha;
});

/**
 * 辅助函数：创建一个基础的、可修改的模拟 context 对象
 * @param {Object} overrides - 用于覆盖默认值的对象
 * @returns {Object} 一个完整的模拟 context
 */
const createMockContext = (overrides = {}) => {
    // 这是一个基础的 baziProfile 结构，每个测试可以按需修改
    // --- FIX: 将 nested pillars 结构移除，直接使用 Pillar 后缀 ---
    const baseProfile = {
        yearPillar: { id: 'yp', value: '甲子', gan: { id: 'yg', value: '甲', shensha: [] }, zhi: { id: 'yz', value: '子', shensha: [] } },
        monthPillar: { id: 'mp', value: '丙寅', gan: { id: 'mg', value: '丙', shensha: [] }, zhi: { id: 'mz', value: '寅', shensha: [] } },
        dayPillar: { id: 'dp', value: '甲戌', gan: { id: 'dg', value: '甲', shensha: [] }, zhi: { id: 'dz', value: '戌', shensha: [] } },
        hourPillar: { id: 'tp', value: '甲子', gan: { id: 'tg', value: '甲', shensha: [] }, zhi: { id: 'tz', value: '子', shensha: [] } },
        dayun: []
    };

    // 默认的 flatMap，可以被覆盖
    const baseFlatMap = new Map([
        ['dayGan', '甲'],
        ['yearZhi', '子'],
        ['dayZhi', '戌'],
        // --- FIX: 为Pillar和NaYin添加模拟数据 ---
        ['dayPillar', '甲戌'], 
        ['yearPillar', '甲子'],
        ['monthPillar', '丙寅'],
        ['hourPillar', '甲子'],
    ]);

    // 合并覆盖值
    const finalProfile = { ...baseProfile, ...overrides.baziProfile };
    const finalFlatMap = new Map([...baseFlatMap, ...(overrides.flatMap || new Map())]);

    return {
        baziProfile: finalProfile,
        flatMap: finalFlatMap,
        baziIndex: overrides.baziIndex || {},
        gender: overrides.gender || '男',
    };
};



describe('神煞计算器 (shenshaCalculator)', () => {

    it('应该能正确处理带前提条件的神煞（天乙贵人）', () => {
        // 准备数据: 日干为'甲'，年支为'丑'。满足天乙贵人的前提和触发条件
        const mockContext = createMockContext({
            flatMap: new Map([['dayGan', '甲'], ['yearZhi', '丑']]),
            baziIndex: { '丑': ['yz'] }
        });
        mockContext.baziProfile.yearPillar.zhi.value = '丑';

        // 执行计算
        calculateShensha(mockContext);

        // 断言: 年支的shensha数组应该包含'天乙贵人'
        expect(mockContext.baziProfile.yearPillar.zhi.shensha).toContain('天乙贵人');
    });

    it('当不满足前提条件时，不应该计算神煞', () => {
        // 准备数据: 日干为'乙'（不满足天乙贵人前提），年支为'丑'
        const mockContext = createMockContext({
            flatMap: new Map([['dayGan', '乙'], ['yearZhi', '丑']])
        });

        calculateShensha(mockContext);

        // 断言: 年支的shensha数组应该是空的
        expect(mockContext.baziProfile.yearPillar.zhi.shensha).toEqual([]);
    });

    it('应该能正确处理无前提条件的神煞（桃花）', () => {
        // 准备数据: 年支为'寅'，月支为'卯'。满足桃花的触发条件
        const mockContext = createMockContext({
            flatMap: new Map([['yearZhi', '寅']]),
            baziIndex: { '卯': ['mz'] } // 目标是月支'卯'
        });
        mockContext.baziProfile.yearPillar.zhi.value = '寅';
        mockContext.baziProfile.monthPillar.zhi.value = '卯';

        calculateShensha(mockContext);
        
        // 断言: 月支的shensha数组应该包含'桃花'
        expect(mockContext.baziProfile.monthPillar.zhi.shensha).toContain('桃花');
    });

    it('应该能正确处理分支逻辑（国印贵人）', () => {
        // 场景1: 日干为'甲'，年支为'戌'
        const context1 = createMockContext({
            flatMap: new Map([['dayGan', '甲'], ['yearZhi', '戌']]),
            baziIndex: { '戌': ['yz'] }
        });
        context1.baziProfile.yearPillar.zhi.value = '戌';
        
        calculateShensha(context1);
        // 断言: 年支应该有'国印贵人'
        expect(context1.baziProfile.yearPillar.zhi.shensha).toContain('国印贵人');

        // 场景2: 日干为'乙'，年支为'亥'
        const context2 = createMockContext({
            flatMap: new Map([['dayGan', '乙'], ['yearZhi', '亥']]),
            baziIndex: { '亥': ['yz'] }
        });
        context2.baziProfile.dayPillar.gan.value = '乙';
        context2.baziProfile.yearPillar.zhi.value = '亥';

        calculateShensha(context2);
        // 断言: 年支也应该有'国印贵人'
        expect(context2.baziProfile.yearPillar.zhi.shensha).toContain('国印贵人');
    });
});
