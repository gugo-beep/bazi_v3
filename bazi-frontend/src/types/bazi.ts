// 八字排盘数据类型定义

// 天干对象
export interface Gan {
  id: string;
  type: string;
  value: string;
  shishen: string;
  shensha: string[];
}

// 地支对象
export interface Zhi {
  id: string;
  type: string;
  value: string;
  canggan: {
    gan: string;
    shishen: string;
    type: string;
  }[];
  shensha: string[];
}

// 小运对象
export interface XiaoYun extends Pillar {
  gan: Gan;
  zhi: Zhi;
}

// 基础柱接口
interface Pillar {
  id: string;
  type: string;
  value: string | null;
  nayin: string | null;
  shensha: string[];
}

// 原局柱
export interface OriginalPillar extends Pillar {
  gan: Gan;
  zhi: Zhi;
}

// 大运柱
export interface DaYunPillar extends Pillar {
  gan: Gan | null;
  zhi: Zhi | null;
  start_year: number;
  end_year: number;
  start_age?: number;
  liunian: LiuNianPillar[];
}

// 流年柱
export interface LiuNianPillar extends Pillar {
  gan: Gan;
  zhi: Zhi;
  year: number;
  age: number;
  xiaoYun: XiaoYun | null;
}

// 关系对象
export interface Relation {
  type: string;
  elements: string[];
  result: string | null;
}

// 完整的八字档案
export interface BaziProfile {
  profile: {
    gregorianDate: string;
    gender: string;
    dayMaster: string;
  };
  yuanju: {
    year: OriginalPillar;
    month: OriginalPillar;
    day: OriginalPillar;
    hour: OriginalPillar;
  };
  dayun: DaYunPillar[];
  relations: Relation[];
} 