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

// 返回基于五行的元素类名
const getElementClass = (value: string): string => {
  // 根据天干地支的五行属性返回对应的元素类名
  const elementMap: Record<string, string> = {
    // 木 - 绿色
    '甲': 'element-wood',
    '乙': 'element-wood',
    '寅': 'element-wood',
    '卯': 'element-wood',
    // 火 - 红色
    '丙': 'element-fire',
    '丁': 'element-fire',
    '巳': 'element-fire',
    '午': 'element-fire',
    // 土 - 土黄色
    '戊': 'element-earth',
    '己': 'element-earth',
    '丑': 'element-earth',
    '辰': 'element-earth',
    '未': 'element-earth',
    '戌': 'element-earth',
    // 金 - 金属灰色
    '庚': 'element-metal',
    '辛': 'element-metal',
    '申': 'element-metal',
    '酉': 'element-metal',
    // 水 - 蓝色
    '壬': 'element-water',
    '癸': 'element-water',
    '子': 'element-water',
    '亥': 'element-water',
  };
  
  return elementMap[value] || 'text-gray-800';
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
      <div className="py-1">
        <span className={`font-bold text-2xl ${getElementClass(gan.value)}`} data-element-id={gan.id}>
          {gan.value}
        </span>
      </div>
      {!showSimplified && gan.shishen && (
        <div className="text-center text-xs font-medium mt-1 text-gray-600">
          {gan.shishen}
        </div>
      )}
    </div>
  );

  // 渲染地支
  const renderZhi = (zhi: Zhi) => (
    <div className="mb-1">
      <div className="py-1">
        <span className={`font-bold text-2xl ${getElementClass(zhi.value)}`} data-element-id={zhi.id}>
          {zhi.value}
        </span>
      </div>
      {!showSimplified && zhi.canggan && zhi.canggan.length > 0 && (
        <div className="text-center text-xs font-medium mt-1 text-gray-500">
          {zhi.canggan.map((cg, idx) => (
            <span key={idx} className={`${getElementClass(cg.gan)} mx-0.5`}>
              {cg.gan}
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
      <div className="text-center text-xs mt-2 px-1 py-1 rounded-md bg-gray-50/80 backdrop-blur-sm">
        {shensha.map((item, index) => (
          <div key={index} className="text-gray-600 font-medium leading-snug">{item}</div>
        ))}
      </div>
    );
  };

  return (
    <div className="flex flex-col items-center py-2 animate-fadeIn">
      {/* 根据元素类型渲染不同内容 */}
      {isGan(pillar) && renderGan(pillar)}
      {isZhi(pillar) && renderZhi(pillar)}
      
      {/* 完整柱子 */}
      {isPillar(pillar) && (
        <>
          {/* 纳音信息 */}
          {!showSimplified && pillar.nayin && (
            <div className="text-xs text-gray-500 mb-1 font-medium">
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
        <div className="text-xs text-gray-500 mt-1 font-medium">
          {pillar.type}
        </div>
      )}
    </div>
  );
} 