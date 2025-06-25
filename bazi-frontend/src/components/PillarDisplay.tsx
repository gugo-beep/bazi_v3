import React from 'react';
import { Gan, Zhi, OriginalPillar, DaYunPillar, LiuNianPillar } from '../types/bazi';

// 支持展示的元素类型
type DisplayElement = Gan | Zhi | OriginalPillar | DaYunPillar | LiuNianPillar;

interface PillarDisplayProps {
  pillar: DisplayElement;
  type?: 'original' | 'dayun' | 'liunian';
  showShensha?: boolean; // 控制是否显示神煞信息
  showSimplified?: boolean; // 控制是否只显示天干地支的值
}

const getColorClass = (value: string): string => {
  // 根据天干地支的五行属性返回对应的颜色类名
  const colorMap: Record<string, string> = {
    // 木 - 绿色
    '甲': 'text-emerald-600',
    '乙': 'text-emerald-600',
    // 火 - 红色
    '丙': 'text-red-600',
    '丁': 'text-red-600',
    // 土 - 土黄色
    '戊': 'text-amber-600',
    '己': 'text-amber-500',
    // 金 - 灰色
    '庚': 'text-slate-600',
    '辛': 'text-slate-600',
    // 水 - 蓝色
    '壬': 'text-blue-600',
    '癸': 'text-blue-600',
    // 地支的默认颜色处理
    '子': 'text-blue-600',   // 水
    '丑': 'text-amber-500',  // 土
    '寅': 'text-emerald-600',// 木
    '卯': 'text-emerald-600',// 木
    '辰': 'text-amber-500',  // 土
    '巳': 'text-red-600',    // 火
    '午': 'text-red-600',    // 火
    '未': 'text-amber-500',  // 土
    '申': 'text-slate-600',  // 金
    '酉': 'text-slate-600',  // 金
    '戌': 'text-amber-500',  // 土
    '亥': 'text-blue-600',   // 水
  };
  
  return colorMap[value] || 'text-gray-800';
};

// 判断是否为天干
const isGan = (element: DisplayElement): element is Gan => {
  return 'shishen' in element && !('canggan' in element) && !('gan' in element) && !('zhi' in element);
};

// 判断是否为地支
const isZhi = (element: DisplayElement): element is Zhi => {
  return 'canggan' in element && !('gan' in element) && !('shishen' in element);
};

// 判断是否为完整柱子
const isPillar = (element: DisplayElement): element is (OriginalPillar | DaYunPillar | LiuNianPillar) => {
  return 'gan' in element && 'zhi' in element;
};

export default function PillarDisplay({ pillar, type = 'original', showShensha = true, showSimplified = false }: PillarDisplayProps) {
  if (!pillar) return null;
  
  // 渲染天干
  const renderGan = (gan: Gan) => (
    <div className="mb-1">
      <div className="w-7 h-7 rounded-full border-2 border-indigo-400 flex items-center justify-center text-sm font-bold bg-white shadow-sm">
        <span className={`font-bold ${getColorClass(gan.value)}`}>
          {gan.value}
        </span>
      </div>
      {!showSimplified && gan.shishen && (
        <div className="text-center text-xs text-gray-700 mt-1">
          {gan.shishen}
        </div>
      )}
    </div>
  );

  // 渲染地支
  const renderZhi = (zhi: Zhi) => (
    <div className="mb-1">
      <div className="w-7 h-7 rounded-full border-2 border-indigo-400 flex items-center justify-center text-sm font-bold bg-white shadow-sm">
        <span className={`font-bold ${getColorClass(zhi.value)}`}>
          {zhi.value}
        </span>
      </div>
      {!showSimplified && zhi.canggan && zhi.canggan.length > 0 && (
        <div className="text-center text-xs text-gray-500 mt-1">
          {zhi.canggan.map((cg, idx) => (
            <span key={idx} className={`${getColorClass(cg.gan)}`}>
              {cg.gan}
              {idx < zhi.canggan.length - 1 ? ' ' : ''}
            </span>
          ))}
        </div>
      )}
    </div>
  );

  // 渲染神煞信息
  const renderShensha = (shensha: string[]) => {
    if (!showShensha || shensha.length === 0) return null;
    
    return (
      <div className="text-center text-xs text-purple-700 mt-1">
        {shensha.map((item, index) => (
          <div key={index}>{item}</div>
        ))}
      </div>
    );
  };

  return (
    <div className="flex flex-col items-center py-1">
      {/* 根据元素类型渲染不同内容 */}
      {isGan(pillar) && renderGan(pillar)}
      {isZhi(pillar) && renderZhi(pillar)}
      
      {/* 完整柱子 */}
      {isPillar(pillar) && (
        <>
          {/* 纳音信息 */}
          {!showSimplified && pillar.nayin && (
            <div className="text-xs text-gray-500 mb-1">
              {pillar.nayin}
            </div>
          )}
          
          {/* 天干地支 */}
          {pillar.gan && renderGan(pillar.gan)}
          {pillar.zhi && renderZhi(pillar.zhi)}
        </>
      )}
      
      {/* 神煞信息 */}
      {pillar.shensha && renderShensha(pillar.shensha)}
      
      {/* 柱的类型标识 */}
      {!showSimplified && (
        <div className="text-xs text-gray-500 mt-1">
          {pillar.type}
        </div>
      )}
    </div>
  );
} 