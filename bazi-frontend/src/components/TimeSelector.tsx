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

// 可重用的卡片组件
const PillarCard = ({
  item,
  isSelected,
  onClick,
  isDaYun,
  // 新增一个 prop，用于在渲染大运卡片时参考当前选中的流年
  activeLiunianInDayun,
}: {
  item: DaYunPillar | LiuNianPillar;
  isSelected: boolean;
  onClick: () => void;
  isDaYun?: boolean;
  activeLiunianInDayun?: LiuNianPillar | null; // 新增 prop
}) => {
  let year: number | string | undefined;
  let age: number | string | undefined;
  let gan: string | null | undefined;
  let zhi: string | null | undefined;
  let cardTitle: string | undefined;

  const isDayunType = (i: any): i is DaYunPillar => isDaYun || 'start_year' in i;

  // --- 逻辑修改开始 ---
  if (isDayunType(item) && item.id === 'qyq') {
    // Case 1: "起运前" 大运
    cardTitle = "起运前";
    // 优先从当前激活的流年（activeLiunianInDayun）中获取小运信息
    const targetLiunian = activeLiunianInDayun || (item.liunian && item.liunian[0]);
    if (targetLiunian) {
      age = targetLiunian.age;
      // 从新的、结构完整的 xiaoYun 对象中获取干支
      if (targetLiunian.xiaoYun && targetLiunian.xiaoYun.gan && targetLiunian.xiaoYun.zhi) {
        gan = targetLiunian.xiaoYun.gan.value;
        zhi = targetLiunian.xiaoYun.zhi.value;
      }
    }
  } else if (isDayunType(item)) {
    // Case 2: 正常大运
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
}: TimeSelectorProps) { // qiyunYear 已不再需要，可以移除

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
    <div className="bg-white p-4 rounded-lg shadow-lg mt-6 border border-gray-200">
      <h3 className="text-xl font-semibold mb-4 text-gray-800 px-2">大运</h3>
      <div className="flex space-x-3 overflow-x-auto pb-4 px-2">
        {dayunList.map((dayun) => ( // 直接使用传入的 dayunList
          <PillarCard
            key={dayun.id}
            item={dayun}
            isSelected={selectedDayun?.id === dayun.id}
            onClick={() => handleDayunClick(dayun)}
            isDaYun={true}
            // 将当前选中的流年传递给大运卡片，用于同步显示
            activeLiunianInDayun={selectedLiunian} 
          />
        ))}
      </div>
      
      {selectedDayun && selectedDayun.liunian && selectedDayun.liunian.length > 0 && (
        <div className="border-t border-gray-200 pt-4 mt-2">
           <h4 className="font-semibold mb-3 text-gray-700 px-2">
             {selectedDayun.id === 'qyq' ? '起运前' : '大运'}流年
           </h4>
          <div className="flex space-x-3 overflow-x-auto pb-3 px-2">
            {selectedDayun.liunian.map((liunian) => (
              <PillarCard
                key={liunian.id}
                item={liunian}
                isSelected={selectedLiunian?.id === liunian.id}
                onClick={() => handleLiunianClick(liunian)}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}