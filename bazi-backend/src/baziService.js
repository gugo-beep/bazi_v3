import { Lunar } from 'lunar-javascript';
import NA_YIN from '../data/NA_YIN.js';
import SHI_SHEN_GAN from '../data/SHI_SHEN_GAN.js';
import ZHI_HIDE_GAN from '../data/ZHI_HIDE_GAN.js';
import { calculateHarmRelations } from './harmCalculator.js';
import { calculateShensha } from './shenshaCalculator.js';

/**
 * [最终修正版] 创建一个用于所有计算的上下文对象
 * @param {Object} baziProfile - 包含四柱、大运等信息的完整排盘对象
 * @param {string} gender - 性别
 * @returns {Object} 完整的上下文对象
 */
function createCalculationContext(baziProfile, gender) {
  const baziIndex = {}; // 反向索引，用于快速查找
  const flatMap = new Map(); // 正向速查表，用于快速读取

  // 辅助函数：将干支及其ID添加到反向索引
  const addToIndex = (value, id) => {
    if (!baziIndex[value]) {
      baziIndex[value] = [];
    }
    if (!baziIndex[value].includes(id)) {
      baziIndex[value].push(id);
    }
  };

  /**
   * [最终修正版] 核心处理函数：处理所有类型的“柱”对象
   * @param {Object} p - 任何一个柱对象（原局、大运、流年、小运）
   * @param {string} prefix - 用于 flatMap 的键前缀
   */
  const processPillar = (p, prefix) => {
    if (!p) return;

    // --- 关键修复：确保所有柱的完整干支值都被添加到 flatMap ---
    if (p.value) {
      flatMap.set(`${prefix}Pillar`, p.value);
    }

    if (p.gan && p.gan.value) {
      addToIndex(p.gan.value, p.gan.id);
      flatMap.set(`${prefix}Gan`, p.gan.value);
    }
    if (p.zhi && p.zhi.value) {
      addToIndex(p.zhi.value, p.zhi.id);
      flatMap.set(`${prefix}Zhi`, p.zhi.value);
    }
    if (p.nayin) {
      flatMap.set(`${prefix}NaYin`, p.nayin);
    }
  };

  // 1. 处理原局四柱
  processPillar(baziProfile.yearPillar, 'year');
  processPillar(baziProfile.monthPillar, 'month');
  processPillar(baziProfile.dayPillar, 'day');
  processPillar(baziProfile.hourPillar, 'hour');

  // 2. 遍历大运、流年、小运
  baziProfile.dayun.forEach(dayun => {
    processPillar(dayun, dayun.id); // 处理大运柱本身
    if (dayun.liunian) {
      dayun.liunian.forEach(liunian => {
        processPillar(liunian, liunian.id); // 处理流年柱
        if (liunian.xiaoYun) {
          processPillar(liunian.xiaoYun, liunian.xiaoYun.id); // 处理小运柱
        }
      });
    }
  });

  return {
    baziProfile,
    baziIndex,
    flatMap,
    gender,
  };
}


function generateBaziProfile(gregorianDate, gender) {
  const eightChar = Lunar.fromDate(new Date(gregorianDate)).getEightChar();
  
  const yearPillar = generateOriginalPillar('year', eightChar);
  const monthPillar = generateOriginalPillar('month', eightChar);
  const dayPillar = generateOriginalPillar('day', eightChar);
  const hourPillar = generateOriginalPillar('hour', eightChar);
  
  const baziProfile = {
    yearPillar,
    monthPillar,
    dayPillar,
    hourPillar,
    dayun: generateDayun(eightChar, gender, dayPillar.gan.value)
  };
  
  const context = createCalculationContext(baziProfile, gender);

  const relations = calculateHarmRelations(context);
  
  calculateShensha(context); // 调用神煞计算，直接修改context

  const finalOutput = {
    profile: {
      gregorianDate: gregorianDate,
      gender: gender,
      dayMaster: dayPillar.gan.value
    },
    yuanju: {
      year: baziProfile.yearPillar,
      month: baziProfile.monthPillar,
      day: baziProfile.dayPillar,
      hour: baziProfile.hourPillar
    },
    dayun: baziProfile.dayun,
    relations: relations,
  };

  return finalOutput;
}

// ... generateOriginalPillar, generateDayun, calculateCangGan 等函数保持不变 ...
// (您文件中这些函数的原样)

function generateOriginalPillar(pillarType, eightChar) {
  let gan, zhi, shishenGan, nayin;
  let idPrefix;
  let typeText, ganTypeText, zhiTypeText;

  if (pillarType === 'year') {
    gan = eightChar.getYearGan(); zhi = eightChar.getYearZhi();
    shishenGan = eightChar.getYearShiShenGan(); nayin = eightChar.getYearNaYin();
    idPrefix = 'y'; typeText = '年柱'; ganTypeText = '年干'; zhiTypeText = '年支';
  } else if (pillarType === 'month') {
    gan = eightChar.getMonthGan(); zhi = eightChar.getMonthZhi();
    shishenGan = eightChar.getMonthShiShenGan(); nayin = eightChar.getMonthNaYin();
    idPrefix = 'm'; typeText = '月柱'; ganTypeText = '月干'; zhiTypeText = '月支';
  } else if (pillarType === 'day') {
    gan = eightChar.getDayGan(); zhi = eightChar.getDayZhi();
    shishenGan = '日主'; nayin = eightChar.getDayNaYin();
    idPrefix = 'd'; typeText = '日柱'; ganTypeText = '日干'; zhiTypeText = '日支';
  } else { // hour
    gan = eightChar.getTimeGan(); zhi = eightChar.getTimeZhi();
    shishenGan = eightChar.getTimeShiShenGan(); nayin = eightChar.getTimeNaYin();
    idPrefix = 't'; typeText = '时柱'; ganTypeText = '时干'; zhiTypeText = '时支';
  }
  
  const canggan = calculateCangGan(zhi, eightChar.getDayGan());
  
  return {
    id: `${idPrefix}p`, type: typeText, value: gan + zhi, nayin: nayin, shensha: [],
    gan: { id: `${idPrefix}g`, type: ganTypeText, value: gan, shishen: shishenGan, shensha: [] },
    zhi: { id: `${idPrefix}z`, type: zhiTypeText, value: zhi, canggan: canggan, shensha: [] }
  };
}

function generateDayun(eightChar, gender, dayGan) {
    const ganInfoCache = {};
    Object.keys(SHI_SHEN_GAN[dayGan]).forEach(gan => {
        ganInfoCache[gan] = { shishen: SHI_SHEN_GAN[dayGan][gan] };
    });

    const zhiInfoCache = {};
    Object.keys(ZHI_HIDE_GAN).forEach(zhi => {
        zhiInfoCache[zhi] = { canggan: calculateCangGan(zhi, dayGan) };
    });

    const yunObj = eightChar.getYun(gender);
    const daYunArr = yunObj.getDaYun();
    const result = [];

    daYunArr.forEach((daYun, i) => {
        if (i === 0) {
            const qiyunqian = {
                id: 'qyq', type: '起运前', value: null, gan: null, zhi: null, nayin: null, shensha: [],
                start_year: daYun.getStartYear(), end_year: daYun.getEndYear(), start_age: daYun.getStartAge(),
                liunian: []
            };
            const liuNianArr = daYun.getLiuNian();
            const xiaoYunArr = daYun.getXiaoYun();
            liuNianArr.forEach((liuNian, j) => {
                const liuNianGanZhi = liuNian.getGanZhi();
                const liuNianGan = liuNianGanZhi.substring(0, 1);
                const liuNianZhi = liuNianGanZhi.substring(1);
                const xiaoYunGanZhi = xiaoYunArr[j].getGanZhi();
                const xiaoYunGan = xiaoYunGanZhi.substring(0, 1);
                const xiaoYunZhi = xiaoYunGanZhi.substring(1);

                qiyunqian.liunian.push({
                    id: `ln0_${j}p`,
                    type: '流年',
                    value: liuNianGanZhi,
                    nayin: NA_YIN[liuNianGanZhi],
                    shensha: [],
                    year: liuNian.getYear(),
                    age: liuNian.getAge(),
                    gan: { id: `ln0_${j}g`, type: '流年干', value: liuNianGan, shishen: ganInfoCache[liuNianGan].shishen, shensha: [] },
                    zhi: { id: `ln0_${j}z`, type: '流年支', value: liuNianZhi, canggan: zhiInfoCache[liuNianZhi].canggan, shensha: [] },
                    xiaoYun: {
                      id: `xy0_${j}p`, // ID 统一为 p 结尾，代表 pillar
                      type: '小运',
                      value: xiaoYunGanZhi,
                      nayin: NA_YIN[xiaoYunGanZhi], // 计算纳音
                      shensha: [], // 初始化神煞
                      gan: {
                        id: `xy0_${j}g`, // 定义小运干ID
                        type: '小运干',
                        value: xiaoYunGan,
                        shishen: ganInfoCache[xiaoYunGan].shishen, // 计算十神
                        shensha: []
                      },
                      zhi: {
                        id: `xy0_${j}z`, // 定义小运支ID
                        type: '小运支',
                        value: xiaoYunZhi,
                        canggan: zhiInfoCache[xiaoYunZhi].canggan, // 计算藏干
                        shensha: []
                      }
                    }
                });

            });
            result.push(qiyunqian);
            return;
        }

        const daYunGanZhi = daYun.getGanZhi();
        const daYunGan = daYunGanZhi.substring(0, 1);
        const daYunZhi = daYunGanZhi.substring(1);
        const daYunPillar = {
            id: `dy${i}p`, type: '大运', value: daYunGanZhi, nayin: NA_YIN[daYunGanZhi], shensha: [], index: i,
            start_year: daYun.getStartYear(), end_year: daYun.getEndYear(), start_age: daYun.getStartAge(),
            gan: { id: `dy${i}g`, type: '大运干', value: daYunGan, shishen: ganInfoCache[daYunGan].shishen, shensha: [] },
            zhi: { id: `dy${i}z`, type: '大运支', value: daYunZhi, canggan: zhiInfoCache[daYunZhi].canggan, shensha: [] },
            liunian: []
        };
        const liuNianArr = daYun.getLiuNian();
        liuNianArr.forEach((liuNian, j) => {
            const liuNianGanZhi = liuNian.getGanZhi();
            const liuNianGan = liuNianGanZhi.substring(0, 1);
            const liuNianZhi = liuNianGanZhi.substring(1);
            daYunPillar.liunian.push({
                id: `ln${i}_${j}p`, type: '流年', value: liuNianGanZhi, nayin: NA_YIN[liuNianGanZhi], shensha: [], index:j,
                year: liuNian.getYear(), age: liuNian.getAge(), xiaoYun: null,
                gan: { id: `ln${i}_${j}g`, type: '流年干', value: liuNianGan, shishen: ganInfoCache[liuNianGan].shishen, shensha: [] },
                zhi: { id: `ln${i}_${j}z`, type: '流年支', value: liuNianZhi, canggan: zhiInfoCache[liuNianZhi].canggan, shensha: [] }
            });
        });
        result.push(daYunPillar);
    });
    return result;
}

function calculateCangGan(zhi, dayGan) {
  const hideGans = ZHI_HIDE_GAN[zhi] || [];
  return hideGans.map(item => {
    const hiddenGan = item.gan;
    const ganType = item.type;
    const shishen = SHI_SHEN_GAN[dayGan][hiddenGan];
    return { gan: hiddenGan, type: ganType, shishen: shishen };
  });
}


export { generateBaziProfile };