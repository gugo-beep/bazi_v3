import { Relation } from '../types/bazi';

interface RelationsDisplayProps {
  relations: Relation[];
}

// 关系类型对照颜色
const relationTypeColors: Record<string, string> = {
  '六冲': 'bg-red-300 text-red-700 border-red-200',
  '三合': 'bg-green-200 text-green-700 border-green-200',
  '六合': 'bg-blue-200 text-blue-700 border-blue-200',
  '三会': 'bg-cyan-200 text-cyan-700 border-cyan-200',
  '相刑': 'bg-orange-200 text-orange-700 border-orange-200',
  '三刑': 'bg-indigo-200 text-indigo-700 border-indigo-200',
  '自刑': 'bg-amber-200 text-amber-700 border-amber-200',
  '冲运': 'bg-purple-200 text-purple-700 border-purple-200',
  '刑流年': 'bg-pink-200 text-pink-700 border-pink-200',
  '四冲': 'bg-rose-200 text-rose-700 border-rose-200',
  '盲派四刑': 'bg-amber-200 text-amber-700 border-amber-200',
  '六穿': 'bg-orange-200 text-orange-700 border-orange-200',
};

export default function RelationsDisplay({ relations }: RelationsDisplayProps) {
  // 对关系进行分组
  const groupedRelations = relations.reduce((acc: Record<string, Relation[]>, relation) => {
    if (!acc[relation.type]) {
      acc[relation.type] = [];
    }
    acc[relation.type].push(relation);
    return acc;
  }, {});
  
  return (
    <div className="my-6 space-y-4">
      <h3 className="text-lg font-semibold text-gray-800 mb-4">刑冲合害关系</h3>
      
      {/* 按类型分组显示 */}
      {Object.entries(groupedRelations).map(([type, rels]) => (
        <div key={type} className="mb-4">
          <h4 className="text-sm font-medium text-gray-700 mb-2">{type} ({rels.length})</h4>
          <div className="flex flex-wrap gap-2">
            {rels.slice(0, 10).map((relation, index) => {
              const colorClass = relationTypeColors[relation.type] || 'bg-gray-200 text-gray-700 border-gray-200';
              
              return (
                <div 
                  key={index}
                  className={`px-2 py-1 rounded-md shadow-sm border ${colorClass} text-xs font-medium`}
                >
                  {relation.elements.join('、')}
                  {relation.result && <span> → {relation.result}</span>}
                </div>
              );
            })}
            
            {rels.length > 10 && (
              <div className="px-2 py-1 rounded-md bg-gray-100 text-gray-600 text-xs font-medium">
                ...还有 {rels.length - 10} 个
              </div>
            )}
          </div>
        </div>
      ))}
    </div>
  );
} 