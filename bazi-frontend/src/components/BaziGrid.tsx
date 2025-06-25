import { useRef, useEffect, useState } from 'react';
import { OriginalPillar, DaYunPillar, LiuNianPillar, Relation, Gan, Zhi, XiaoYun } from '../types/bazi';
import PillarDisplay from './PillarDisplay';

// 定义组件属性
interface BaziGridProps {
  pillars: {
    year: OriginalPillar;
    month: OriginalPillar;
    day: OriginalPillar;
    hour: OriginalPillar;
  };
  dayun: DaYunPillar | XiaoYun | null;
  liunian: LiuNianPillar | null;
  relations: Relation[];
}

// 定义元素位置数据结构
interface ElementPosition {
  id: string;
  x: number;
  y: number;
  width: number;
  height: number;
}

// 判断是否为DaYunPillar类型
const isDaYunPillar = (pillar: DaYunPillar | XiaoYun | null): pillar is DaYunPillar => {
  return pillar !== null && 'start_year' in pillar;
};

// 判断是否为XiaoYun类型
const isXiaoYun = (pillar: DaYunPillar | XiaoYun | null): pillar is XiaoYun => {
  return pillar !== null && !('start_year' in pillar) && 'gan' in pillar && 'zhi' in pillar;
};

export default function BaziGrid({ pillars, dayun, liunian, relations }: BaziGridProps) {
  // 创建对各元素位置的引用
  const gridRef = useRef<HTMLDivElement>(null);
  const [elementPositions, setElementPositions] = useState<ElementPosition[]>([]);
  const [ganRelations, setGanRelations] = useState<Relation[]>([]);
  const [zhiRelations, setZhiRelations] = useState<Relation[]>([]);
  
  // 在组件挂载和更新时收集元素位置信息
  useEffect(() => {
    if (gridRef.current) {
      const positions: ElementPosition[] = [];
      const elements = gridRef.current.querySelectorAll('[data-element-id]');
      
      elements.forEach((el) => {
        const id = el.getAttribute('data-element-id');
        if (id) {
          const rect = el.getBoundingClientRect();
          const gridRect = gridRef.current!.getBoundingClientRect();
          
          positions.push({
            id,
            x: rect.left - gridRect.left + rect.width / 2,
            y: rect.top - gridRect.top + rect.height / 2,
            width: rect.width,
            height: rect.height
          });
        }
      });
      
      setElementPositions(positions);
    }
  }, [pillars, dayun, liunian]);
  
  // 根据当前显示的元素过滤并分类关系
  useEffect(() => {
    // 获取当前显示的元素ID列表
    const visibleElementIds = elementPositions.map(pos => pos.id);
    
    // 过滤只涉及可见元素的关系
    const filtered = relations.filter(relation => {
      return relation.elements.every(el => visibleElementIds.includes(el));
    });
    
    // 分类为天干关系和地支关系
    const ganRels: Relation[] = [];
    const zhiRels: Relation[] = [];
    
    filtered.forEach(relation => {
      // 根据ID判断元素类型
      const isGanRelation = relation.elements.some(id => id.includes('g') && !id.includes('z'));
      const isZhiRelation = relation.elements.some(id => id.includes('z'));
      
      if (isGanRelation) {
        ganRels.push(relation);
      } else if (isZhiRelation) {
        zhiRels.push(relation);
      }
    });
    
    setGanRelations(ganRels);
    setZhiRelations(zhiRels);
  }, [relations, elementPositions]);

  // 创建关系连线
  const renderRelationLines = (relations: Relation[], isGan: boolean) => {
    const relationClass = isGan ? 'gan-relation' : 'zhi-relation';
    
    return relations.map((relation, index) => {
      // 找到关系中涉及的元素位置
      const points = relation.elements.map(id => {
        return elementPositions.find(pos => pos.id === id);
      }).filter(p => p) as ElementPosition[];
      
      // 如果找不到所有点，跳过该连线
      if (points.length !== relation.elements.length) return null;
      
      // 如果只有两个点，画一条直线
      if (points.length === 2) {
        return (
          <g key={`relation-${index}`} className={relationClass}>
            <line
              x1={points[0].x}
              y1={points[0].y}
              x2={points[1].x}
              y2={points[1].y}
              strokeWidth="2"
            />
            <text
              x={(points[0].x + points[1].x) / 2}
              y={(points[0].y + points[1].y) / 2 - 10}
              fontSize="12"
              textAnchor="middle"
              dominantBaseline="middle"
              className="relation-text"
            >
              {relation.type}
            </text>
          </g>
        );
      }
      
      // 如果有多个点，创建折线或曲线
      const path = points.map((p, i) => {
        return `${i === 0 ? 'M' : 'L'} ${p.x} ${p.y}`;
      }).join(' ');
      
      // 计算路径中点作为文本位置
      const midPoint = {
        x: points.reduce((sum, p) => sum + p.x, 0) / points.length,
        y: points.reduce((sum, p) => sum + p.y, 0) / points.length - 10
      };
      
      return (
        <g key={`relation-${index}`} className={relationClass}>
          <path
            d={path}
            fill="none"
            strokeWidth="2"
          />
          <text
            x={midPoint.x}
            y={midPoint.y}
            fontSize="12"
            textAnchor="middle"
            dominantBaseline="middle"
            className="relation-text"
          >
            {relation.type}
          </text>
        </g>
      );
    });
  };

  // 合并所有神煞信息
  const getAllShensha = (pillar: OriginalPillar) => {
    const ganShensha = pillar.gan.shensha || [];
    const zhiShensha = pillar.zhi.shensha || [];
    const pillarShensha = pillar.shensha || [];
    
    // 合并所有神煞并去重
    return [...new Set([...ganShensha, ...zhiShensha, ...pillarShensha])];
  };

  // 大运或小运的神煞信息
  const getDayunShensha = (dayun: DaYunPillar | XiaoYun | null) => {
    if (!dayun) return [];
    
    const ganShensha = dayun.gan?.shensha || [];
    const zhiShensha = dayun.zhi?.shensha || [];
    const pillarShensha = dayun.shensha || [];
    
    return [...new Set([...ganShensha, ...zhiShensha, ...pillarShensha])];
  };

  // 流年的神煞信息
  const getLiunianShensha = (liunian: LiuNianPillar) => {
    if (!liunian) return [];
    
    const ganShensha = liunian.gan?.shensha || [];
    const zhiShensha = liunian.zhi?.shensha || [];
    const pillarShensha = liunian.shensha || [];
    
    return [...new Set([...ganShensha, ...zhiShensha, ...pillarShensha])];
  };
  
  // 主网格CSS类
  const gridClass = "grid grid-cols-[100px_1fr_4px_320px] gap-0";
  
  return (
    <div ref={gridRef} className="relative pb-6">
      {/* 头部标题行 */}
      <div className={`${gridClass} mb-8`}>
        <div className="bg-primary/10 backdrop-blur-md flex items-center justify-center py-4 rounded-l-xl border border-r-0 border-gray-200">
          <div className="text-primary font-semibold text-sm">类别</div>
        </div>
        <div className="bg-primary/10 backdrop-blur-md border-t border-b border-gray-200">
          <div className="grid grid-cols-4 gap-0 h-full">
            <div className="flex items-center justify-center py-4 border-r border-gray-200/50">
              <div className="text-primary font-semibold text-sm">年柱</div>
            </div>
            <div className="flex items-center justify-center py-4 border-r border-gray-200/50">
              <div className="text-primary font-semibold text-sm">月柱</div>
            </div>
            <div className="flex items-center justify-center py-4 border-r border-gray-200/50">
              <div className="text-primary font-semibold text-sm">日柱</div>
            </div>
            <div className="flex items-center justify-center py-4">
              <div className="text-primary font-semibold text-sm">时柱</div>
            </div>
          </div>
        </div>
        <div className="bg-white border-t border-b border-gray-200"></div>
        <div className="bg-secondary/10 backdrop-blur-md border-t border-b border-r border-gray-200 rounded-r-xl">
          <div className="grid grid-cols-2 gap-0 h-full">
            <div className="flex items-center justify-center py-4 border-r border-gray-200/50">
              <div className="text-secondary font-semibold text-sm">大运</div>
            </div>
            <div className="flex items-center justify-center py-4">
              <div className="text-secondary font-semibold text-sm">流年</div>
            </div>
          </div>
        </div>
      </div>
      
      {/* 天干关系连线区域 */}
      <div className="relative h-16 mb-4">
        <svg className="absolute top-0 left-0 w-full h-full pointer-events-none">
          {renderRelationLines(ganRelations, true)}
        </svg>
      </div>
      
      {/* 十神行 */}
      <div className={`${gridClass} mb-4 py-3 glass-card`}>
        <div className="flex items-center justify-center px-3">
          <div className="font-medium text-gray-700 text-[13px] tracking-wide">十神</div>
        </div>
        <div className="grid grid-cols-4 gap-0">
          <div className="flex items-center justify-center px-3 py-2">
            <div data-element-id={`${pillars.year.gan.id}_shishen`} className="text-center text-[13px] font-semibold text-gray-800 tracking-wide">
              {pillars.year.gan.shishen}
            </div>
          </div>
          <div className="flex items-center justify-center px-3 py-2">
            <div data-element-id={`${pillars.month.gan.id}_shishen`} className="text-center text-[13px] font-semibold text-gray-800 tracking-wide">
              {pillars.month.gan.shishen}
            </div>
          </div>
          <div className="flex items-center justify-center px-3 py-2">
            <div data-element-id={`${pillars.day.gan.id}_shishen`} className="text-center text-[13px] font-semibold text-gray-800 tracking-wide">
              {pillars.day.gan.shishen}
            </div>
          </div>
          <div className="flex items-center justify-center px-3 py-2">
            <div data-element-id={`${pillars.hour.gan.id}_shishen`} className="text-center text-[13px] font-semibold text-gray-800 tracking-wide">
              {pillars.hour.gan.shishen}
            </div>
          </div>
        </div>
        <div></div>
        <div className="grid grid-cols-2 gap-0">
          {dayun && dayun.gan && (
            <div className="flex items-center justify-center px-3 py-2">
              <div data-element-id={`${dayun.gan.id}_shishen`} className="text-center text-[13px] font-semibold text-gray-800 tracking-wide">
                {dayun.gan.shishen}
              </div>
            </div>
          )}
          {liunian && (
            <div className="flex items-center justify-center px-3 py-2">
              <div data-element-id={`${liunian.gan.id}_shishen`} className="text-center text-[13px] font-semibold text-gray-800 tracking-wide">
                {liunian.gan.shishen}
              </div>
            </div>
          )}
        </div>
      </div>
      
      {/* 天干行 */}
      <div className={`${gridClass} mb-4 py-3 glass-card`}>
        <div className="flex items-center justify-center px-3">
          <div className="font-medium text-gray-700 text-[13px] tracking-wide">天干</div>
        </div>
        <div className="grid grid-cols-4 gap-0">
          <div className="flex items-center justify-center px-3 py-2">
            <div data-element-id={pillars.year.gan.id}>
              <PillarDisplay pillar={pillars.year.gan} showShensha={false} showSimplified={true} />
            </div>
          </div>
          <div className="flex items-center justify-center px-3 py-2">
            <div data-element-id={pillars.month.gan.id}>
              <PillarDisplay pillar={pillars.month.gan} showShensha={false} showSimplified={true} />
            </div>
          </div>
          <div className="flex items-center justify-center px-3 py-2">
            <div data-element-id={pillars.day.gan.id}>
              <PillarDisplay pillar={pillars.day.gan} showShensha={false} showSimplified={true} />
            </div>
          </div>
          <div className="flex items-center justify-center px-3 py-2">
            <div data-element-id={pillars.hour.gan.id}>
              <PillarDisplay pillar={pillars.hour.gan} showShensha={false} showSimplified={true} />
            </div>
          </div>
        </div>
        <div></div>
        <div className="grid grid-cols-2 gap-0">
          {dayun && dayun.gan && (
            <div className="flex items-center justify-center px-3 py-2">
              <div data-element-id={dayun.gan.id}>
                <PillarDisplay pillar={dayun.gan} showShensha={false} showSimplified={true} />
              </div>
            </div>
          )}
          {liunian && (
            <div className="flex items-center justify-center px-3 py-2">
              <div data-element-id={liunian.gan.id}>
                <PillarDisplay pillar={liunian.gan} showShensha={false} showSimplified={true} />
              </div>
            </div>
          )}
        </div>
      </div>
      
      {/* 地支行 */}
      <div className={`${gridClass} mb-4 py-3 glass-card`}>
        <div className="flex items-center justify-center px-3">
          <div className="font-medium text-gray-700 text-[13px] tracking-wide">地支</div>
        </div>
        <div className="grid grid-cols-4 gap-0">
          <div className="flex items-center justify-center px-3 py-2">
            <div data-element-id={pillars.year.zhi.id}>
              <PillarDisplay pillar={pillars.year.zhi} showShensha={false} showSimplified={true} />
            </div>
          </div>
          <div className="flex items-center justify-center px-3 py-2">
            <div data-element-id={pillars.month.zhi.id}>
              <PillarDisplay pillar={pillars.month.zhi} showShensha={false} showSimplified={true} />
            </div>
          </div>
          <div className="flex items-center justify-center px-3 py-2">
            <div data-element-id={pillars.day.zhi.id}>
              <PillarDisplay pillar={pillars.day.zhi} showShensha={false} showSimplified={true} />
            </div>
          </div>
          <div className="flex items-center justify-center px-3 py-2">
            <div data-element-id={pillars.hour.zhi.id}>
              <PillarDisplay pillar={pillars.hour.zhi} showShensha={false} showSimplified={true} />
            </div>
          </div>
        </div>
        <div></div>
        <div className="grid grid-cols-2 gap-0">
          {dayun && dayun.zhi && (
            <div className="flex items-center justify-center px-3 py-2">
              <div data-element-id={dayun.zhi.id}>
                <PillarDisplay pillar={dayun.zhi} showShensha={false} showSimplified={true} />
              </div>
            </div>
          )}
          {liunian && (
            <div className="flex items-center justify-center px-3 py-2">
              <div data-element-id={liunian.zhi.id}>
                <PillarDisplay pillar={liunian.zhi} showShensha={false} showSimplified={true} />
              </div>
            </div>
          )}
        </div>
      </div>
      
      {/* 藏干行 */}
      <div className={`${gridClass} mb-4 py-3 glass-card`}>
        <div className="flex items-center justify-center px-3">
          <div className="font-medium text-gray-700 text-[13px] tracking-wide">藏干</div>
        </div>
        <div className="grid grid-cols-4 gap-0">
          <div className="flex items-center justify-center px-3 py-2">
            <div className="text-center text-[11px] leading-relaxed text-gray-700">
              {pillars.year.zhi.canggan.map((cg: any, idx: number) => (
                <div key={idx}>
                  <span className={`font-bold ${cg.gan.includes('甲') || cg.gan.includes('乙') ? 'element-wood' :
                    cg.gan.includes('丙') || cg.gan.includes('丁') ? 'element-fire' :
                    cg.gan.includes('戊') || cg.gan.includes('己') ? 'element-earth' :
                    cg.gan.includes('庚') || cg.gan.includes('辛') ? 'element-metal' :
                    'element-water'}`}>{cg.gan}</span>
                  <span className="text-gray-500 ml-1">({cg.shishen})</span>
                </div>
              ))}
            </div>
          </div>
          <div className="flex items-center justify-center px-3 py-2">
            <div className="text-center text-[11px] leading-relaxed text-gray-700">
              {pillars.month.zhi.canggan.map((cg: any, idx: number) => (
                <div key={idx}>
                  <span className={`font-bold ${cg.gan.includes('甲') || cg.gan.includes('乙') ? 'element-wood' :
                    cg.gan.includes('丙') || cg.gan.includes('丁') ? 'element-fire' :
                    cg.gan.includes('戊') || cg.gan.includes('己') ? 'element-earth' :
                    cg.gan.includes('庚') || cg.gan.includes('辛') ? 'element-metal' :
                    'element-water'}`}>{cg.gan}</span>
                  <span className="text-gray-500 ml-1">({cg.shishen})</span>
                </div>
              ))}
            </div>
          </div>
          <div className="flex items-center justify-center px-3 py-2">
            <div className="text-center text-[11px] leading-relaxed text-gray-700">
              {pillars.day.zhi.canggan.map((cg: any, idx: number) => (
                <div key={idx}>
                  <span className={`font-bold ${cg.gan.includes('甲') || cg.gan.includes('乙') ? 'element-wood' :
                    cg.gan.includes('丙') || cg.gan.includes('丁') ? 'element-fire' :
                    cg.gan.includes('戊') || cg.gan.includes('己') ? 'element-earth' :
                    cg.gan.includes('庚') || cg.gan.includes('辛') ? 'element-metal' :
                    'element-water'}`}>{cg.gan}</span>
                  <span className="text-gray-500 ml-1">({cg.shishen})</span>
                </div>
              ))}
            </div>
          </div>
          <div className="flex items-center justify-center px-3 py-2">
            <div className="text-center text-[11px] leading-relaxed text-gray-700">
              {pillars.hour.zhi.canggan.map((cg: any, idx: number) => (
                <div key={idx}>
                  <span className={`font-bold ${cg.gan.includes('甲') || cg.gan.includes('乙') ? 'element-wood' :
                    cg.gan.includes('丙') || cg.gan.includes('丁') ? 'element-fire' :
                    cg.gan.includes('戊') || cg.gan.includes('己') ? 'element-earth' :
                    cg.gan.includes('庚') || cg.gan.includes('辛') ? 'element-metal' :
                    'element-water'}`}>{cg.gan}</span>
                  <span className="text-gray-500 ml-1">({cg.shishen})</span>
                </div>
              ))}
            </div>
          </div>
        </div>
        <div></div>
        <div className="grid grid-cols-2 gap-0">
          {dayun && dayun.zhi && (
            <div className="flex items-center justify-center px-3 py-2">
              <div className="text-center text-[11px] leading-relaxed text-gray-700">
                {dayun.zhi.canggan.map((cg: any, idx: number) => (
                  <div key={idx}>
                    <span className={`font-bold ${cg.gan.includes('甲') || cg.gan.includes('乙') ? 'element-wood' :
                      cg.gan.includes('丙') || cg.gan.includes('丁') ? 'element-fire' :
                      cg.gan.includes('戊') || cg.gan.includes('己') ? 'element-earth' :
                      cg.gan.includes('庚') || cg.gan.includes('辛') ? 'element-metal' :
                      'element-water'}`}>{cg.gan}</span>
                    <span className="text-gray-500 ml-1">({cg.shishen})</span>
                  </div>
                ))}
              </div>
            </div>
          )}
          {liunian && (
            <div className="flex items-center justify-center px-3 py-2">
              <div className="text-center text-[11px] leading-relaxed text-gray-700">
                {liunian.zhi.canggan.map((cg: any, idx: number) => (
                  <div key={idx}>
                    <span className={`font-bold ${cg.gan.includes('甲') || cg.gan.includes('乙') ? 'element-wood' :
                      cg.gan.includes('丙') || cg.gan.includes('丁') ? 'element-fire' :
                      cg.gan.includes('戊') || cg.gan.includes('己') ? 'element-earth' :
                      cg.gan.includes('庚') || cg.gan.includes('辛') ? 'element-metal' :
                      'element-water'}`}>{cg.gan}</span>
                    <span className="text-gray-500 ml-1">({cg.shishen})</span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
      
      {/* 纳音行 */}
      <div className={`${gridClass} mb-4 py-3 glass-card`}>
        <div className="flex items-center justify-center px-3">
          <div className="font-medium text-gray-700 text-[13px] tracking-wide">纳音</div>
        </div>
        <div className="grid grid-cols-4 gap-0">
          <div className="flex items-center justify-center px-3 py-2">
            <div className="text-center text-[12px] text-gray-600 font-medium">
              {pillars.year.nayin}
            </div>
          </div>
          <div className="flex items-center justify-center px-3 py-2">
            <div className="text-center text-[12px] text-gray-600 font-medium">
              {pillars.month.nayin}
            </div>
          </div>
          <div className="flex items-center justify-center px-3 py-2">
            <div className="text-center text-[12px] text-gray-600 font-medium">
              {pillars.day.nayin}
            </div>
          </div>
          <div className="flex items-center justify-center px-3 py-2">
            <div className="text-center text-[12px] text-gray-600 font-medium">
              {pillars.hour.nayin}
            </div>
          </div>
        </div>
        <div></div>
        <div className="grid grid-cols-2 gap-0">
          {dayun && (
            <div className="flex items-center justify-center px-3 py-2">
              <div className="text-center text-[12px] text-gray-600 font-medium">
                {dayun.nayin}
              </div>
            </div>
          )}
          {liunian && (
            <div className="flex items-center justify-center px-3 py-2">
              <div className="text-center text-[12px] text-gray-600 font-medium">
                {liunian.nayin}
              </div>
            </div>
          )}
        </div>
      </div>
      
      {/* 神煞行 */}
      <div className={`${gridClass} mb-4 py-3 glass-card`}>
        <div className="flex items-center justify-center px-3">
          <div className="font-medium text-gray-700 text-[13px] tracking-wide">神煞</div>
        </div>
        <div className="grid grid-cols-4 gap-0">
          <div className="flex items-center justify-center px-3 py-2">
            <div className="text-center text-[11px] leading-relaxed text-gray-600">
              {getAllShensha(pillars.year).map((shensha, index) => (
                <div key={index} className="mb-1 px-1.5 py-0.5 rounded-sm bg-primary/5">{shensha}</div>
              ))}
            </div>
          </div>
          <div className="flex items-center justify-center px-3 py-2">
            <div className="text-center text-[11px] leading-relaxed text-gray-600">
              {getAllShensha(pillars.month).map((shensha, index) => (
                <div key={index} className="mb-1 px-1.5 py-0.5 rounded-sm bg-primary/5">{shensha}</div>
              ))}
            </div>
          </div>
          <div className="flex items-center justify-center px-3 py-2">
            <div className="text-center text-[11px] leading-relaxed text-gray-600">
              {getAllShensha(pillars.day).map((shensha, index) => (
                <div key={index} className="mb-1 px-1.5 py-0.5 rounded-sm bg-primary/5">{shensha}</div>
              ))}
            </div>
          </div>
          <div className="flex items-center justify-center px-3 py-2">
            <div className="text-center text-[11px] leading-relaxed text-gray-600">
              {getAllShensha(pillars.hour).map((shensha, index) => (
                <div key={index} className="mb-1 px-1.5 py-0.5 rounded-sm bg-primary/5">{shensha}</div>
              ))}
            </div>
          </div>
        </div>
        <div></div>
        <div className="grid grid-cols-2 gap-0">
          {dayun && (
            <div className="flex items-center justify-center px-3 py-2">
              <div className="text-center text-[11px] leading-relaxed text-gray-600">
                {getDayunShensha(dayun).map((shensha, index) => (
                  <div key={index} className="mb-1 px-1.5 py-0.5 rounded-sm bg-primary/5">{shensha}</div>
                ))}
              </div>
            </div>
          )}
          {liunian && (
            <div className="flex items-center justify-center px-3 py-2">
              <div className="text-center text-[11px] leading-relaxed text-gray-600">
                {getLiunianShensha(liunian).map((shensha, index) => (
                  <div key={index} className="mb-1 px-1.5 py-0.5 rounded-sm bg-primary/5">{shensha}</div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
      
      {/* 地支关系连线区域 */}
      <div className="relative h-16 mt-4">
        <svg className="absolute top-0 left-0 w-full h-full pointer-events-none">
          {renderRelationLines(zhiRelations, false)}
        </svg>
      </div>
    </div>
  );
} 