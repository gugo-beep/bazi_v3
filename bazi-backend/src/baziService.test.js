// NEW: 导入刑冲合害计算器，因为集成测试需要它
import { calculateHarmRelations } from './harmCalculator.js';
import { generateBaziProfile } from './baziService.js';

describe('八字服务测试套件', () => {
  let profile; // 这个变量将持有 generateBaziProfile 返回的完整对象

  // 在所有测试运行前，只生成一次profile，提高效率
  beforeAll(() => {
    // MODIFIED: 增加了测试日期，确保与之前的快照一致
    profile = generateBaziProfile('1921-06-22 01:18', '男');
  });

  describe('generateBaziProfile 基本功能', () => {
    it('应该正确生成女性八字信息', () => {
      // MODIFIED: 检查新的顶级属性
      expect(profile).toHaveProperty('profile');
      // --- FIX 1: 将 'pillars' 修改为 'yuanju' ---
      expect(profile).toHaveProperty('yuanju'); 
      expect(profile).toHaveProperty('dayun');
      expect(profile).toHaveProperty('relations');
      
      // 快照测试依然有效，但需要更新
      expect(profile).toMatchSnapshot();
    });
  });
  
  describe('原局四柱测试', () => {
    it('应该包含正确的原局四柱信息', () => {
      // --- FIX 2: 从 profile.yuanju 中获取四柱信息 ---
      const { year, month, day, hour } = profile.yuanju;

      expect(year.id).toBe('yp');
      expect(year.type).toBe('年柱');
      expect(year.value).toMatch(/^[甲乙丙丁戊己庚辛壬癸][子丑寅卯辰巳午未申酉戌亥]$/);
      
      expect(month.id).toBe('mp');
      expect(month.type).toBe('月柱');
      
      expect(day.id).toBe('dp');
      expect(day.type).toBe('日柱');
      
      expect(hour.id).toBe('tp');
      expect(hour.type).toBe('时柱');
    });
    
    it('应该包含正确的天干十神信息', () => {
      // --- FIX 3: 从 profile.yuanju 中获取四柱信息 ---
      const { year, month, day, hour } = profile.yuanju;
      expect(year.gan).toHaveProperty('shishen');
      expect(month.gan).toHaveProperty('shishen');
      expect(day.gan).toHaveProperty('shishen', '日主');
      expect(hour.gan).toHaveProperty('shishen');
    });
    
    it('应该包含正确的纳音信息', () => {
      // --- FIX 4: 从 profile.yuanju 中获取四柱信息 ---
      const { year, month, day, hour } = profile.yuanju;
      expect(year).toHaveProperty('nayin');
      expect(month).toHaveProperty('nayin');
      expect(day).toHaveProperty('nayin');
      expect(hour).toHaveProperty('nayin');
    });
  });
  
  describe('大运与起运前结构测试', () => {
    it('应该包含一个大运数组', () => {
      expect(Array.isArray(profile.dayun)).toBe(true);
      expect(profile.dayun.length).toBeGreaterThan(0);
    });

    it('应该将"起运前"作为第一个元素', () => {
      const qiyunqian = profile.dayun[0];
      expect(qiyunqian).toHaveProperty('id', 'qyq');
      expect(qiyunqian).toHaveProperty('type', '起运前');
    });

    it('应该生成正确的【正式大运】结构', () => {
      const firstDayun = profile.dayun[1];
      expect(firstDayun).toHaveProperty('id', 'dy1p');
      expect(firstDayun).toHaveProperty('type', '大运');
    });
  });
  
  describe('流年和小运测试', () => {
    it('应该在起运前的流年中包含小运信息', () => {
      const qiyunqian = profile.dayun[0];
      const firstLiunian = qiyunqian.liunian[0];
      expect(firstLiunian.xiaoYun).not.toBeNull();
      // MODIFIED: 检查小运的ID现在是柱ID
      expect(firstLiunian.xiaoYun.id).toMatch(/^xy0_\d+p$/); 
    });
    
    it('应该在正式大运的流年中不包含小运信息', () => {
      if (profile.dayun.length > 1) {
        const firstDayun = profile.dayun[1];
        const firstLiunian = firstDayun.liunian[0];
        expect(firstLiunian.xiaoYun).toBeNull();
      }
    });
  });

  describe('集成测试 (Integration Test)', () => {
    it('baziService 的最终输出应该包含正确的 relations 数组', () => {
      expect(profile.relations).toBeInstanceOf(Array);
      const hasRelations = profile.relations.length > 0;
      expect(hasRelations).toBe(true);
      const relationTypes = [...new Set(profile.relations.map(r => r.type))];
      expect(relationTypes.length).toBeGreaterThan(0);
    });
  });
});