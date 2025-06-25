import { useState } from 'react';
import { DaYunPillar, LiuNianPillar } from '../types/bazi';

interface DayunSelectorProps {
  dayun: DaYunPillar[];
  selectedDayun: DaYunPillar | null;
  selectedLiunian: LiuNianPillar | null;
  onDayunSelect: (dayun: DaYunPillar) => void;
  onLiunianSelect: (liunian: LiuNianPillar) => void;
}

export default function DayunSelector({
  dayun,
  selectedDayun,
  selectedLiunian,
  onDayunSelect,
  onLiunianSelect
}: DayunSelectorProps) {
  // 活动标签：'dayun'(大运) 或 'liunian'(流年)
  const [activeTab, setActiveTab] = useState<'dayun' | 'liunian'>('dayun');

  return (
    <div>
      <div className="flex border-b mb-4">
        <button
          className={`px-4 py-2 font-medium text-sm ${
            activeTab === 'dayun'
              ? 'text-purple-600 border-b-2 border-purple-600'
              : 'text-gray-500 hover:text-gray-700'
          }`}
          onClick={() => setActiveTab('dayun')}
        >
          大运选择
        </button>
        <button
          className={`px-4 py-2 font-medium text-sm ${
            activeTab === 'liunian'
              ? 'text-purple-600 border-b-2 border-purple-600'
              : 'text-gray-500 hover:text-gray-700'
          }`}
          onClick={() => setActiveTab('liunian')}
          disabled={!selectedDayun}
        >
          流年选择
        </button>
      </div>

      {/* 大运选择区域 */}
      {activeTab === 'dayun' && (
        <div className="flex flex-wrap gap-2">
          {dayun.map((dy) => {
            // 判断是否为起运前
            const isQianqi = dy.id === 'qyq';
            return (
              <button
                key={dy.id}
                onClick={() => onDayunSelect(dy)}
                className={`px-3 py-2 rounded-md text-sm transition-colors ${
                  selectedDayun?.id === dy.id
                    ? 'bg-purple-600 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {isQianqi ? '起运前' : dy.value} ({dy.start_year}-{dy.end_year})
              </button>
            );
          })}
        </div>
      )}

      {/* 流年选择区域 */}
      {activeTab === 'liunian' && selectedDayun && (
        <div>
          <h4 className="text-sm font-medium text-gray-700 mb-2">
            {selectedDayun.id === 'qyq' ? '起运前流年' : `${selectedDayun.value}大运流年`}
          </h4>
          <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-8 gap-2">
            {selectedDayun.liunian.map((ln) => (
              <button
                key={ln.id}
                onClick={() => onLiunianSelect(ln)}
                className={`px-3 py-2 rounded-md text-sm transition-colors ${
                  selectedLiunian?.id === ln.id
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {ln.value} ({ln.year}年 {ln.age}岁)
                {ln.xiaoYun && <div className="text-xs mt-1">小运: {ln.xiaoYun.value}</div>}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
} 