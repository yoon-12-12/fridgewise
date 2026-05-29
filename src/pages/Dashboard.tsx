import { useIngredient } from "../context/IngredientContext";
import { ResponsiveContainer, PieChart, Pie, Cell, Tooltip } from "recharts";
import { checkCategory } from "../utils/ingredientUtils";
import Fridge3DPhysics from "../components/Fridge3DPhysics";

export default function Dashboard() {
  const { ingredients } = useIngredient();

  // 1. 오늘 날짜 및 날짜 오차 보정 (시간 자정으로 설정)
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  // 2. 유통기한 D-Day 계산 알고리즘: 3일 이내 임박 재료 판별
  const warningIngredients = ingredients.filter((item) => {
    if (!item.expireDate) return false;
    const expiry = new Date(item.expireDate);
    expiry.setHours(0, 0, 0, 0);
    const diffTime = expiry.getTime() - today.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays <= 3 && diffDays >= 0;
  });

  // 3. 카테고리별 분류 (기존 로직 유지)
  const categories = {
    "채소🌾": ingredients.filter(i => checkCategory(i).isVegetable).length,
    "육류🥩": ingredients.filter(i => checkCategory(i).isMeat).length,
    "유제품🥛": ingredients.filter(i => checkCategory(i).isDairy).length,
    "기타🥫": ingredients.filter(i => !checkCategory(i).isVegetable && !checkCategory(i).isMeat && !checkCategory(i).isDairy).length,
  };

  const totalCapacity = 20;
  const currentCount = ingredients.length;
  const emptySpace = Math.max(totalCapacity - currentCount, 0);

  const chartData = [
    { name: "보유 재료", value: currentCount, color: "#2563eb" },
    { name: "여유 공간", value: emptySpace, color: "#f3f4f6" },
  ];

  return (
    <div className="p-8 max-w-6xl mx-auto space-y-8 min-h-screen bg-slate-50/50 dark:bg-zinc-900 transition-all duration-500">
      
      {/* 헤더 섹션 */}
      <div className="flex flex-col space-y-2 animate-fadeIn">
        <div className="inline-flex items-center gap-2 px-3 py-1 text-xs font-semibold text-blue-600 bg-blue-50 dark:bg-blue-950/50 rounded-full w-fit shadow-sm">
          ⚡ Real-time Fridge Analytics Engine
        </div>
        <h1 className="text-4xl font-black tracking-tight bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 bg-clip-text text-transparent">
          📊 스마트 인사이트 대시보드
        </h1>
      </div>

      {/* 3단 프리미엄 요약 카드 (기존 호버 애니메이션 포함) */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {[
          { label: "전체 보유 식재료", value: `${currentCount} / ${totalCapacity} 개`, icon: "📦", color: "blue" },
          { label: "소비 위험 품목 (3일 내)", value: `${warningIngredients.length} 개`, icon: "⚠️", color: warningIngredients.length > 0 ? "rose" : "emerald" },
          { label: "냉장고 최적화 효율", value: `${Math.round((emptySpace / totalCapacity) * 100)}%`, icon: "⚙️", color: "purple" }
        ].map((card, i) => (
          <div key={i} className="bg-white dark:bg-zinc-800 p-6 rounded-3xl shadow-xl border border-gray-100/80 dark:border-zinc-700/50 flex flex-col justify-between transform hover:-translate-y-2 hover:shadow-2xl transition-all duration-300 group">
            <div className="flex items-center justify-between">
              <span className="text-gray-400 font-bold text-sm">{card.label}</span>
              <span className="p-2.5 bg-gray-50 dark:bg-zinc-900 rounded-2xl text-xl">{card.icon}</span>
            </div>
            <span className={`text-4xl font-black mt-4 text-${card.color}-500`}>{card.value}</span>
          </div>
        ))}
      </div>

      {/* 메인 분석 섹션 (도넛 차트 + 카테고리 게이지) */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="bg-white dark:bg-zinc-800 p-6 rounded-3xl shadow-xl border border-gray-100 dark:border-zinc-700 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="relative w-full md:w-1/2 h-64 flex items-center justify-center">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie data={chartData} innerRadius={72} outerRadius={95} paddingAngle={4} dataKey="value">
                  {chartData.map((e, i) => <Cell key={i} fill={e.color} />)}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div className="w-full md:w-1/2 space-y-4">
            {Object.entries(categories).map(([name, count]) => {
              const p = currentCount > 0 ? Math.round((count / currentCount) * 100) : 0;
              return (
                <div key={name}>
                  <div className="flex justify-between text-xs font-bold mb-1"><span>{name}</span><span>{p}%</span></div>
                  <div className="w-full bg-gray-100 h-2 rounded-full overflow-hidden"><div className="bg-blue-500 h-full" style={{ width: `${p}%` }} /></div>
                </div>
              );
            })}
          </div>
        </div>

        {/* 신선도 경보 센터 리스트 */}
        <div className="bg-white dark:bg-zinc-800 p-6 rounded-3xl shadow-xl border border-gray-100 dark:border-zinc-700">
          <h3 className="text-lg font-black mb-4">🚨 신선도 경보 센터</h3>
          <div className="space-y-3 max-h-64 overflow-y-auto">
            {warningIngredients.map((item) => (
              <div key={item.id} className="flex justify-between p-4 bg-rose-50 rounded-2xl border border-rose-100">
                <span className="font-bold text-gray-800">{item.name}</span>
                <span className="text-xs font-black bg-rose-500 text-white px-3 py-1.5 rounded-xl animate-pulse">D-Day 임박</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* 3D 피직스 냉장고 컴포넌트 */}
      <div className="bg-white dark:bg-zinc-800 p-6 rounded-3xl shadow-xl border border-gray-100 dark:border-zinc-700">
        <Fridge3DPhysics />
      </div>
    </div>
  );
}