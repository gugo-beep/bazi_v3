// page.tsx

'use client';

import { useState, useEffect } from 'react';
import { mockBaziData } from './mock-bazi-data';
import { DaYunPillar, LiuNianPillar, XiaoYun } from '../types/bazi';
import BaziGrid from '../components/BaziGrid';
import { BaziProfile } from '../types/bazi';
import TimeSelector from '../components/TimeSelector';

export default function Home() {
  const [baziData, setBaziData] = useState<BaziProfile | null>(null);
  const [selectedDayun, setSelectedDayun] = useState<DaYunPillar | null>(null);
  const [selectedLiunian, setSelectedLiunian] = useState<LiuNianPillar | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // 模拟API请求的加载状态
    const timer = setTimeout(() => {
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
      setLoading(false);
    }, 600);
    
    return () => clearTimeout(timer);
  }, []);

  const handleSelect = (dayun: DaYunPillar, liunian: LiuNianPillar | null) => {
    setSelectedDayun(dayun);
    setSelectedLiunian(liunian);
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-pulse text-center">
          <div className="w-16 h-16 mx-auto border-t-4 border-b-4 border-primary rounded-full animate-spin"></div>
          <p className="mt-4 text-gray-600 font-medium">正在排盘...</p>
        </div>
      </div>
    );
  }
  
  if (!baziData) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="text-center p-8 glass-card">
          <p className="text-red-500 font-medium">数据加载失败，请稍后重试</p>
        </div>
      </div>
    );
  }
  
  // 判断当前是否处于"起运前"状态
  const isBeforeQiYun = selectedDayun?.id === 'qyq';
  
  // 决定传递给 BaziGrid 的"大运柱"应该是什么
  // 如果是起运前，它应该是当前流年对应的小运；否则，就是正常的大运。
  const dayunForGrid = isBeforeQiYun ? selectedLiunian?.xiaoYun : selectedDayun;

  return (
    <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-6 md:py-10 min-h-screen">
      <header className="mb-8">
        <h1 className="text-3xl font-bold text-center text-gray-800 tracking-tight">
          八字排盘
        </h1>
        {baziData.profile && (
          <div className="mt-2 text-center text-sm text-gray-500">
            <span>{baziData.profile.gregorianDate}</span>
            <span className="mx-2">|</span>
            <span>{baziData.profile.gender}</span>
            <span className="mx-2">|</span>
            <span>日主: <span className={`${baziData.profile.dayMaster.includes('甲') ? 'element-wood' : 
              baziData.profile.dayMaster.includes('乙') ? 'element-wood' :
              baziData.profile.dayMaster.includes('丙') ? 'element-fire' :
              baziData.profile.dayMaster.includes('丁') ? 'element-fire' :
              baziData.profile.dayMaster.includes('戊') ? 'element-earth' :
              baziData.profile.dayMaster.includes('己') ? 'element-earth' :
              baziData.profile.dayMaster.includes('庚') ? 'element-metal' :
              baziData.profile.dayMaster.includes('辛') ? 'element-metal' :
              baziData.profile.dayMaster.includes('壬') ? 'element-water' :
              baziData.profile.dayMaster.includes('癸') ? 'element-water' : ''
            } font-semibold`}>{baziData.profile.dayMaster}</span></span>
          </div>
        )}
      </header>
      
      <div className="glass-card p-6 md:p-8 mb-8">
        <BaziGrid
          yuanju={baziData.yuanju}
          dayun={dayunForGrid} 
          liunian={selectedLiunian}
          relations={baziData.relations}
        />
      </div>
      
      {baziData && (
        <div className="glass-card p-6 md:p-8">
          <TimeSelector
            dayunList={baziData.dayun}
            selectedDayun={selectedDayun}
            selectedLiunian={selectedLiunian}
            onSelect={handleSelect}
            qiyunYear={null}
          />
        </div>
      )}
    </main>
  );
}