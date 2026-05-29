// 파일명: src/pages/Home.tsx
import { useNavigate } from "react-router-dom";

export default function Home() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50/50 via-white to-slate-50 dark:from-zinc-900 dark:via-zinc-900 dark:to-zinc-950 text-gray-800 dark:text-gray-100 transition-colors duration-500">
      
      {/* 🧊 메인 히어로 섹션 (Hero Section) */}
      <div className="max-w-5xl mx-auto px-8 pt-20 pb-16 text-center space-y-6 animate-fadeIn">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 text-xs font-black tracking-widest text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-950/40 rounded-full shadow-sm uppercase">
          ✨ Next-Gen Kitchen Solution
        </div>
        
        <h1 className="text-5xl md:text-7xl font-black tracking-tight leading-none">
          🧊 <span className="bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 bg-clip-text text-transparent">FridgeWise</span>
        </h1>
        
        <p className="max-w-2xl mx-auto text-lg md:text-xl font-medium text-gray-500 dark:text-gray-400 leading-relaxed">
          유통기한 마감 경보부터 구글 제미나이 AI 기반 맞춤형 퀴진 제안까지, <br />
          내 손안에서 실시간으로 조율되는 스마트 냉장고 자산 관리 플랫폼.
        </p>

        {/* ⚡ 퀵 스타트 네비게이션 버튼 세트 */}
        <div className="flex flex-col sm:flex-row justify-center items-center gap-4 pt-4">
          <button
            onClick={() => navigate("/dashboard")}
            className="w-full sm:w-auto px-8 py-4 font-bold text-white bg-gradient-to-r from-blue-600 to-indigo-600 rounded-2xl shadow-lg shadow-blue-500/20 hover:shadow-xl hover:shadow-blue-500/30 transform hover:-translate-y-1 transition-all duration-300"
          >
            📊 인텔리전스 대시보드 진입
          </button>
          
          <button
            onClick={() => navigate("/recipes")}
            className="w-full sm:w-auto px-8 py-4 font-bold text-gray-700 dark:text-gray-200 bg-white dark:bg-zinc-800 border border-gray-200 dark:border-zinc-700 rounded-2xl shadow-md hover:bg-gray-50 dark:hover:bg-zinc-700/80 transform hover:-translate-y-1 transition-all duration-300"
          >
            🍳 AI 맞춤형 레시피 생성
          </button>
        </div>
      </div>

      {/* 🛠️ 플랫폼 주요 기능 하이라이트 그리드 */}
      <div className="max-w-5xl mx-auto px-8 pb-24">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          
          {/* 카드 1: 실시간 관리 */}
          <div className="bg-white dark:bg-zinc-800 p-8 rounded-3xl shadow-xl border border-gray-100/80 dark:border-zinc-700/50 transform hover:-translate-y-2 transition-all duration-300 group">
            <div className="w-12 h-12 bg-blue-50 dark:bg-blue-950/50 rounded-2xl flex items-center justify-center text-2xl group-hover:scale-110 transition-transform">
              📊
            </div>
            <h3 className="text-xl font-bold mt-6 mb-2">실시간 인벤토리 관리</h3>
            <p className="text-sm text-gray-400 dark:text-gray-400 leading-relaxed">
              냉장고 속 재료의 수량과 적재 포화도를 고급 도넛 차트 스케일로 직관적으로 모니터링합니다.
            </p>
          </div>

          {/* 카드 2: 신선도 경보 */}
          <div className="bg-white dark:bg-zinc-800 p-8 rounded-3xl shadow-xl border border-gray-100/80 dark:border-zinc-700/50 transform hover:-translate-y-2 transition-all duration-300 group">
            <div className="w-12 h-12 bg-rose-50 dark:bg-rose-950/50 rounded-2xl flex items-center justify-center text-2xl group-hover:animate-bounce">
              🚨
            </div>
            <h3 className="text-xl font-bold mt-6 mb-2">신선도 경보 센터</h3>
            <p className="text-sm text-gray-400 dark:text-gray-400 leading-relaxed">
              유통기한 마감이 3일 이내로 임박한 골든아워 재료들을 타임라인 레이아웃으로 추출해 시각적 알림을 제공합니다.
            </p>
          </div>

          {/* 카드 3: 제미나이 인공지능 */}
          <div className="bg-white dark:bg-zinc-800 p-8 rounded-3xl shadow-xl border border-gray-100/80 dark:border-zinc-700/50 transform hover:-translate-y-2 transition-all duration-300 group">
            <div className="w-12 h-12 bg-purple-50 dark:bg-purple-950/50 rounded-2xl flex items-center justify-center text-2xl group-hover:rotate-12 transition-transform">
              🔮
            </div>
            <h3 className="text-xl font-bold mt-6 mb-2">Gemini AI 파먹기 퀴진</h3>
            <p className="text-sm text-gray-400 dark:text-gray-400 leading-relaxed">
              보유 중인 재료 조합을 구글 인공지능이 실시간 분석하여 미슐랭 스타 급의 상세 조리 마크다운 레시피를 설계합니다.
            </p>
          </div>

        </div>
      </div>

    </div>
  );
}