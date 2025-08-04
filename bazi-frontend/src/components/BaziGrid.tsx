import { useRef, useEffect, useState, useMemo } from 'react';
import { OriginalPillar, DaYunPillar, LiuNianPillar, Relation, XiaoYun } from '../types/bazi';

// 可复用的五行颜色工具函数
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

// 单个宫位内容的展示组件
const PillarContent = ({ pillar, contentType }: { pillar: any, contentType: string }) => {
    if (!pillar) return <div className="h-full"></div>;

    const renderContent = () => {
        switch (contentType) {
            case 'shishen':
                return pillar.gan?.shishen;
            case 'tiangan':
                return <span className={`text-2xl font-bold ${getElementClass(pillar.gan?.value)}`}>{pillar.gan?.value}</span>;
            case 'dizhi':
                return <span className={`text-2xl font-bold ${getElementClass(pillar.zhi?.value)}`}>{pillar.zhi?.value}</span>;
            case 'canggan':
                return (
                    <div className="text-[11px] leading-relaxed text-gray-700">
                        {pillar.zhi?.canggan?.map((cg: any, idx: number) => (
                            <div key={idx}>
                                <span className={`font-bold ${getElementClass(cg.gan)}`}>{cg.gan}</span>
                                <span className="text-gray-500 ml-1">({cg.shishen})</span>
                            </div>
                        ))}
                    </div>
                );
            case 'nayin':
                return pillar.nayin;
            case 'shensha':
                const allShensha = [...new Set([...(pillar.shensha || []), ...(pillar.gan?.shensha || []), ...(pillar.zhi?.shensha || [])])];
                return (
                    <div className="text-[11px] leading-relaxed text-gray-600">
                        {allShensha.map((shensha, index) => (
                            <div key={index} className="mb-1 px-1.5 py-0.5 rounded-sm bg-primary/5">{shensha}</div>
                        ))}
                    </div>
                );
            default:
                return null;
        }
    };
    return <div className="h-full flex items-center justify-center text-center px-1 py-2">{renderContent()}</div>;
};

export default function BaziGrid({ yuanju, dayun, liunian, relations }: {
  yuanju: {
    year: OriginalPillar;
    month: OriginalPillar;
    day: OriginalPillar;
    hour: OriginalPillar;
  };
  dayun: DaYunPillar | XiaoYun | null;
  liunian: LiuNianPillar | null;
  relations: Relation[];
}) {
    const gridRef = useRef<HTMLDivElement>(null);
    const [positions, setPositions] = useState<Record<string, number>>({});

    const allVisiblePillars = useMemo(() => ({
        yp: yuanju.year, mp: yuanju.month, dp: yuanju.day, tp: yuanju.hour,
        dy: dayun, ln: liunian
    }), [yuanju, dayun, liunian]);

    const elementValueMap = useMemo(() => {
        const map: Record<string, string> = {};
        Object.values(allVisiblePillars).forEach(p => {
            if (p) {
                if (p.gan) map[p.gan.id] = p.gan.value;
                if (p.zhi) map[p.zhi.id] = p.zhi.value;
            }
        });
        return map;
    }, [allVisiblePillars]);

    useEffect(() => {
        const calculatePositions = () => {
            if (gridRef.current) {
                const newPositions: Record<string, number> = {};
                const elements = gridRef.current.querySelectorAll('[data-col-id]');
                const gridRect = gridRef.current.getBoundingClientRect();
                elements.forEach(el => {
                    const id = el.getAttribute('data-col-id');
                    if (id) {
                        const rect = el.getBoundingClientRect();
                        newPositions[id] = rect.left - gridRect.left + rect.width / 2;
                    }
                });
                setPositions(newPositions);
            }
        };

        const resizeObserver = new ResizeObserver(() => requestAnimationFrame(calculatePositions));
        if (gridRef.current) resizeObserver.observe(gridRef.current);
        calculatePositions();

        return () => {
            if (gridRef.current) resizeObserver.unobserve(gridRef.current);
        };
    }, [yuanju, dayun, liunian]);

    const visibleIds = useMemo(() => {
        const ids = new Set<string>();
        Object.values(allVisiblePillars).forEach(p => {
            if (p) {
                if (p.gan) ids.add(p.gan.id);
                if (p.zhi) ids.add(p.zhi.id);
            }
        });
        return ids;
    }, [allVisiblePillars]);

    const filteredRelations = useMemo(() => relations.filter(r => r.elements.every(el => visibleIds.has(el))), [relations, visibleIds]);
    
    // --- 新增：关系合并逻辑 ---
    const mergeRelations = (rels: Relation[]) => {
        const merged = new Map<string, { types: string[], result: (string | null)[], elements: string[] }>();
        
        rels.forEach(rel => {
            const key = [...rel.elements].sort().join('-');
            if (!merged.has(key)) {
                merged.set(key, { types: [], result: [], elements: rel.elements });
            }
            const existing = merged.get(key)!;
            existing.types.push(rel.type);
            if (rel.result) {
                existing.result.push(rel.result);
            }
        });

        return Array.from(merged.values()).map(m => ({
            elements: m.elements,
            type: m.types.join('、'),
            result: [...new Set(m.result)].filter(Boolean).join('、') || null
        }));
    };

    const ganRelations = mergeRelations(filteredRelations.filter(r => r.elements.every(id => id.endsWith('g'))));
    const zhiRelations = mergeRelations(filteredRelations.filter(r => r.elements.every(id => id.endsWith('z'))));

    const renderRelationRow = (relation: any, index: number, isGan: boolean) => {
        const getColumnId = (elementId: string): string => {
            if (elementId.startsWith('y')) return 'yp';
            if (elementId.startsWith('m')) return 'mp';
            if (elementId.startsWith('d') && !elementId.startsWith('dy')) return 'dp';
            if (elementId.startsWith('t')) return 'tp';
            if (elementId.startsWith('dy')) return 'dy';
            if (elementId.startsWith('ln')) return 'ln';
            if (elementId.startsWith('xy')) return 'dy';
            return '';
        };

        const points = relation.elements.map((id: string) => ({ id, x: positions[getColumnId(id)] })).filter((p: any) => p.x);
        if (points.length < 2) return null;
        points.sort((a: any, b: any) => a.x - b.x);

        const y = 22;
        const pathD = `M ${points[0].x} ${y} ` + points.slice(1).map((p: any) => `L ${p.x} ${y}`).join(' ');
        const midX = (points[0].x + points[points.length - 1].x) / 2;

        return (
            <div key={`${index}-${relation.elements.join('-')}`} className="relative h-12 my-1"> {/* 增加行高 */}
                <svg width="100%" height="48" className="absolute top-0 left-0 pointer-events-none">
                    <g className={isGan ? 'gan-relation' : 'zhi-relation'}>
                        <path d={pathD} strokeWidth="1.5" fill="none" />
                        <text x={midX} y={y - 14} textAnchor="middle" className="relation-text">
                            {relation.result ? `${relation.type} ${relation.result}` : relation.type}
                        </text>
                    </g>
                </svg>
                {points.map((p: any) => (
                    <div key={p.id} className="relation-item" style={{ left: `${p.x}px`, top: '8px' }}>
                        <div className={`relation-circle ${getElementClass(elementValueMap[p.id])}`}>
                            {elementValueMap[p.id]}
                        </div>
                    </div>
                ))}
            </div>
        );
    };

    const Row = ({ title, type }: { title: string, type: string }) => (
        <div className="grid grid-cols-[100px_1fr] items-stretch border-b border-gray-200/80">
            <div className="font-medium text-gray-700 text-[13px] tracking-wide text-center py-2 border-r border-gray-200/80 flex items-center justify-center">{title}</div>
            <div className="grid grid-cols-6 h-full">
                <div className="border-r border-gray-200/50"><PillarContent pillar={allVisiblePillars.yp} contentType={type} /></div>
                <div className="border-r border-gray-200/50"><PillarContent pillar={allVisiblePillars.mp} contentType={type} /></div>
                <div className="border-r border-gray-200/50"><PillarContent pillar={allVisiblePillars.dp} contentType={type} /></div>
                <div className="border-r border-gray-200/50"><PillarContent pillar={allVisiblePillars.tp} contentType={type} /></div>
                <div className="border-r border-gray-200/50"><PillarContent pillar={allVisiblePillars.dy} contentType={type} /></div>
                <div><PillarContent pillar={allVisiblePillars.ln} contentType={type} /></div>
            </div>
        </div>
    );

    return (
        <div className="glass-card p-4 md:p-6">
            {/* 头部和关系行共享一个外层容器，用于对齐 */}
            <div className="grid grid-cols-[100px_1fr]">
                {/* 左侧空白列，用于对齐 */}
                <div></div> 
                {/* 右侧包含标题和关系行的容器 */}
                <div ref={gridRef}>
                    <div className="grid grid-cols-6 text-center font-semibold text-sm text-gray-700 bg-gray-100/80 rounded-t-lg">
                        <div data-col-id="yp" className="py-3 border-r border-gray-200/50">年柱</div>
                        <div data-col-id="mp" className="py-3 border-r border-gray-200/50">月柱</div>
                        <div data-col-id="dp" className="py-3 border-r border-gray-200/50">日柱</div>
                        <div data-col-id="tp" className="py-3 border-r border-gray-200/50">时柱</div>
                        <div data-col-id="dy" className="py-3 border-r border-gray-200/50">大运</div>
                        <div data-col-id="ln" className="py-3">流年</div>
                    </div>
                </div>
            </div>
            
            {/* 主体网格 */}
            <div className="border border-t-0 border-gray-200/80 rounded-b-lg">
                {/* 天干关系区域 */}
                {ganRelations.length > 0 && (
                     <div className="border-b border-gray-200/80 grid grid-cols-[100px_1fr]">
                        <div></div>
                        <div className="py-2">
                           {ganRelations.map((rel, index) => renderRelationRow(rel, index, true))}
                        </div>
                    </div>
                )}
                
                {/* 核心信息行 */}
                <Row title="十神" type="shishen" />
                <Row title="天干" type="tiangan" />
                <Row title="地支" type="dizhi" />
                <Row title="藏干" type="canggan" />
                <Row title="纳音" type="nayin" />
                <Row title="神煞" type="shensha" />
                
                {/* 地支关系区域 */}
                {zhiRelations.length > 0 && (
                     <div className="border-t border-gray-200/80 grid grid-cols-[100px_1fr]">
                        <div></div>
                        <div className="py-2">
                           {zhiRelations.map((rel, index) => renderRelationRow(rel, index, false))}
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}