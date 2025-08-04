import { Lunar } from 'lunar-javascript';
import NA_YIN from '../data/NA_YIN.js';
import SHI_SHEN_GAN from '../data/SHI_SHEN_GAN.js';
import ZHI_HIDE_GAN from '../data/ZHI_HIDE_GAN.js';
import { calculateHarmRelations } from './harmCalculator.js';
import { calculateShensha } from './shenshaCalculator.js'; // 导入神煞计算器

/**
 * MODIFIED: 创建包含 baziIndex 和 flatMap 的完整上下文
 * @param {Object} baziProfile - 包含四柱、大运等信息的完整排盘对象
 * @param {string} gender - 性别
 * @returns {Object} 完整的上下文对象
 */
function createCalculationContext(baziProfile, gender) {
  const baziIndex = {};
  const flatMap = new Map();
  
  const addToIndex = (ganZhi, id) => {
    if (!baziIndex[ganZhi]) baziIndex[ganZhi] = [];
    baziIndex[ganZhi].push(id);
  };

  const processPillar = (p, prefix) => {
    if (!p) return;
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
    if (p.value) {
      flatMap.set(`${prefix}Pillar`, p.value);}
  };

  // 1. 处理原局
  processPillar(baziProfile.yearPillar, 'year');
  processPillar(baziProfile.monthPillar, 'month');
  processPillar(baziProfile.dayPillar, 'day');
  processPillar(baziProfile.hourPillar, 'hour');

  // 2. 处理大运和流年
  baziProfile.dayun.forEach(d => {
    processPillar(d, d.id); // 使用大运ID作为前缀
    if (d.liunian) {
        d.liunian.forEach(l => processPillar(l, l.id));
    }
  });

  // 3. 处理小运 (现在拥有更丰富的对象结构)
  const qiyunqian = baziProfile.dayun.find(d => d.id === 'qyq');
  if (qiyunqian && qiyunqian.liunian) {
    qiyunqian.liunian.forEach((liunian) => {
      // 检查是否存在结构完整的小运对象及其干支
      if (liunian.xiaoYun && liunian.xiaoYun.gan && liunian.xiaoYun.zhi) {
        const xiaoYunGan = liunian.xiaoYun.gan;
        const xiaoYunZhi = liunian.xiaoYun.zhi;

        // 使用对象中预设的ID和value，注册到baziIndex中
        addToIndex(xiaoYunGan.value, xiaoYunGan.id);
        addToIndex(xiaoYunZhi.value, xiaoYunZhi.id);

        // (可选但推荐) 将小运也添加到 flatMap 中，方便未来可能的直接查找
        flatMap.set(`${liunian.xiaoYun.id}Gan`, xiaoYunGan.value);
        flatMap.set(`${liunian.xiaoYun.id}Zhi`, xiaoYunZhi.value);
      }
    });
  }
  
  return { baziProfile, baziIndex, flatMap, gender };
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
  
  // MODIFIED: 传入 gender 以便 context 包含它
  const context = createCalculationContext(baziProfile, gender);

  const relations = calculateHarmRelations(context);
  calculateShensha(context); // 调用神煞计算，直接修改context

  const finalOutput = {
    profile: {
      gregorianDate: gregorianDate,
      gender: gender,
      dayMaster: dayPillar.gan.value
    },
    pillars: {
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
// (请保留您文件中这些函数的原样)

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
            id: `dy${i}p`, type: '大运', value: daYunGanZhi, nayin: NA_YIN[daYunGanZhi], shensha: [],
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
                id: `ln${i}_${j}p`, type: '流年', value: liuNianGanZhi, nayin: NA_YIN[liuNianGanZhi], shensha: [],
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
