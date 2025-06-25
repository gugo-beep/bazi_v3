// page.tsx

'use client';

import { useState, useEffect } from 'react';
import { mockBaziData } from './mock-bazi-data';
import { DaYunPillar, LiuNianPillar, XiaoYun, Pillar } from '../types/bazi'; // 引入 Pillar 和 XiaoYun
import BaziGrid from '../components/BaziGrid';
import { BaziProfile } from '../types/bazi';
import TimeSelector from '../components/TimeSelector';

export default function Home() {
  const [baziData, setBaziData] = useState<BaziProfile | null>(null);
  const [selectedDayun, setSelectedDayun] = useState<DaYunPillar | null>(null);
  const [selectedLiunian, setSelectedLiunian] = useState<LiuNianPillar | null>(null);

  useEffect(() => {
    const data: BaziProfile = mockBaziData;
    setBaziData(data);
    
    // 设置默认选择
    if (data.dayun.length > 0) {
      const firstDayun = data.dayun[0];
      setSelectedDayun(firstDayun);
      if (firstDayun.liunian.length > 0) {
        setSelectedLiunian(firstDayun.liunian[0]);
      }
    }
  }, []);

  const handleSelect = (dayun: DaYunPillar, liunian: LiuNianPillar | null) => {
    setSelectedDayun(dayun);
    setSelectedLiunian(liunian);
  };

  if (!baziData) {
    return <div>加载中...</div>;
  }
  
  // --- 逻辑修改开始 ---
  // 判断当前是否处于“起运前”状态
  const isBeforeQiYun = selectedDayun?.id === 'qyq';
  
  // 决定传递给 BaziGrid 的“大运柱”应该是什么
  // 如果是起运前，它应该是当前流年对应的小运；否则，就是正常的大运。
  const dayunForGrid = isBeforeQiYun ? selectedLiunian?.xiaoYun : selectedDayun;
  // --- 逻辑修改结束 ---

  return (
    <main className="container mx-auto p-4 sm:p-6 lg:p-8 bg-gray-50 min-h-screen">
      <h1 className="text-3xl font-bold text-center mb-8 text-gray-800">
        八字排盘
      </h1>
      
      <div className="bg-white p-6 rounded-lg shadow-lg">
        <BaziGrid
          pillars={baziData.pillars}
          // 传递我们刚刚计算好的“柱”
          dayun={dayunForGrid} 
          liunian={selectedLiunian}
          relations={baziData.relations}
        />
      </div>
      
      {baziData && (
        <TimeSelector
          dayunList={baziData.dayun}
          selectedDayun={selectedDayun}
          selectedLiunian={selectedLiunian}
          onSelect={handleSelect}
        />
      )}
    </main>
  );
}