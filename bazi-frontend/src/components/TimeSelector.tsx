// TimeSelector.tsx

import React from 'react';
import { DaYunPillar, LiuNianPillar } from '../types/bazi';

interface TimeSelectorProps {
  dayunList: DaYunPillar[];
  selectedDayun: DaYunPillar | null;
  selectedLiunian: LiuNianPillar | null;
  onSelect: (dayun: DaYunPillar, liunian: LiuNianPillar | null) => void;
  qiyunYear: number | null;
}

// --- 新增：可复用的五行颜色工具函数 ---
const getElementClass = (value: string | null | undefined): string => {
  if (!value) return '';
  const elementMap: Record<string, string> = {
    '甲': 'element-wood', '乙': 'element-wood', '寅': 'element-wood', '卯': 'element-wood',
    '丙': 'element-fire', '丁': 'element-fire', '巳': 'element-fire', '午': 'element-fire',
    '戊': 'element-earth', '己': 'element-earth', '丑': 'element-earth', '辰': 'element-earth', '未': 'element-earth', '戌': 'element-earth',
    '庚': 'element-metal', '辛': 'element-metal', '申': 'element-metal', '酉': 'element-metal',
    '壬': 'element-water', '癸': 'element-water', '子': 'element-water', '亥': 'element-water',
  };
  return elementMap[value] || 'text-gray-800';
};



// 可重用的卡片组件
const PillarCard = ({
  item,
  isSelected,
  onClick,
  isDaYun,

  activeLiunianInDayun,
}: {
  item: DaYunPillar | LiuNianPillar;
  isSelected: boolean;
  onClick: () => void;
  isDaYun?: boolean;
  activeLiunianInDayun?: LiuNianPillar | null;
}) => {
  let year: number | string | undefined;
  let age: number | string | undefined;
  let gan: string | null | undefined;
  let zhi: string | null | undefined;
  let cardTitle: string | undefined;

  const isDayunType = (i: any): i is DaYunPillar => isDaYun || 'start_year' in i;

  // --- 逻辑修改开始 ---
  if (isDayunType(item) && item.id === 'qyq') {
    // Case 1: "起运前" 大运卡片
    cardTitle = "起运前";
    let targetLiunian: LiuNianPillar | undefined | null = null;

    if (isSelected) {
      // 如果"起运前"卡片是当前选中的大运，则其显示应同步当前选中的流年
      targetLiunian = activeLiunianInDayun;
    } else {
      // 如果"起运前"卡片不是当前选中的大运，则应始终显示其列表中的第一个流年（即初始状态）
      targetLiunian = item.liunian && item.liunian[0];
    }
    
    if (targetLiunian) {
      age = targetLiunian.age;
      // 从新的、结构完整的 xiaoYun 对象中获取干支
      if (targetLiunian.xiaoYun && targetLiunian.xiaoYun.gan && targetLiunian.xiaoYun.zhi) {
        gan = targetLiunian.xiaoYun.gan.value;
        zhi = targetLiunian.xiaoYun.zhi.value;
      }
    }
  } else if (isDayunType(item)) {
    // Case 2: 正常大运卡片
    cardTitle = `${item.start_year}-${item.end_year}`;
    year = item.start_year;
    age = item.start_age;
    gan = item.gan?.value;
    zhi = item.zhi?.value;
  } else {
    // Case 3: 流年卡片（逻辑不变）
    const liunian = item as LiuNianPillar;
    year = liunian.year;
    age = liunian.age;
    gan = liunian.gan.value;
    zhi = liunian.zhi.value;
  }
  // --- 逻辑修改结束 ---
  
  const selectionClass = isSelected 
    ? (isDaYun ? 'border-indigo-500 bg-indigo-50 shadow-md' : 'border-purple-500 bg-purple-50')
    : 'border-gray-200 bg-gray-50 hover:border-gray-400';

  return (
    <div
      onClick={onClick}
      className={`cursor-pointer p-3 rounded-lg text-center border-2 min-w-[90px] transition-all duration-200 flex-shrink-0 ${selectionClass}`}
    >
      <div className="text-sm font-semibold text-gray-600">{cardTitle || year}</div>
      <div className="text-xs text-gray-400 my-1">{age}岁</div>
      <div className={`font-bold text-2xl ${gan ? 'text-slate-700' : 'text-transparent'}`}>{gan || '-'}</div>
      <div className={`font-bold text-2xl ${zhi ? 'text-slate-700' : 'text-transparent'}`}>{zhi || '-'}</div>
    </div>
  );
};



export default function TimeSelector({
  dayunList,
  selectedDayun,
  selectedLiunian,
  onSelect,
  qiyunYear,
}: TimeSelectorProps) {

  const handleDayunClick = (dayun: DaYunPillar) => {
    const firstLiunian = dayun.liunian && dayun.liunian.length > 0 ? dayun.liunian[0] : null;
    onSelect(dayun, firstLiunian);
  };

  const handleLiunianClick = (liunian: LiuNianPillar) => {
    if (selectedDayun) {
      onSelect(selectedDayun, liunian);
    }
  };

  return (
    <div>
      <h3 className="text-xl font-bold mb-5 text-gray-800">大运</h3>
      <div className="overflow-hidden">
        <div className="flex space-x-4 overflow-x-auto pb-4 -mx-2 px-2 snap-x snap-mandatory">
          {dayunList.map((dayun) => (
            <div key={dayun.id} className="snap-start">
              <PillarCard
                item={dayun}
                isSelected={selectedDayun?.id === dayun.id}
                onClick={() => handleDayunClick(dayun)}
                isDaYun={true}
                activeLiunianInDayun={selectedLiunian} 
              />
            </div>
          ))}
        </div>
      </div>
      
      {selectedDayun && selectedDayun.liunian && selectedDayun.liunian.length > 0 && (
        <div className="mt-6">
          <h4 className="text-lg font-semibold mb-4 text-gray-700">
            {selectedDayun.id === 'qyq' ? '起运前' : '大运'}流年
          </h4>
          <div className="overflow-hidden">
            <div className="flex space-x-4 overflow-x-auto pb-4 -mx-2 px-2 snap-x snap-mandatory">
              {selectedDayun.liunian.map((liunian) => (
                <div key={liunian.id} className="snap-start">
                  <PillarCard
                    item={liunian}
                    isSelected={selectedLiunian?.id === liunian.id}
                    onClick={() => handleLiunianClick(liunian)}
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}