// 파일명: src/pages/Recipes.tsx
import { useState } from "react";
import { useIngredient } from "../context/IngredientContext";
import ShoppingList from "../components/ShoppingList";
// 📦 정식 패키지(@google/genai)
import { GoogleGenAI } from "@google/genai";

export default function Recipes() {
  const { ingredients } = useIngredient();
  const [aiRecipe, setAiRecipe] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const myIngredientNames = ingredients.map((i) => i.name);

  // ✨ Gemini API 연동 실시간 냉장고 파먹기 AI 함수
  const generateAIRecipe = async () => {
    if (ingredients.length === 0) {
      alert("냉장고에 재료가 최소 하나 이상 있어야 AI가 요리를 추천할 수 있습니다!");
      return;
    }

    const API_KEY = import.meta.env.VITE_GEMINI_API_KEY; 

    if (!API_KEY || API_KEY === "YOUR_GEMINI_API_KEY") {
      setAiRecipe(`### 🔑 API Key 세팅이 필요합니다.\n
1. 프로젝트 최상위 폴더에 \`.env.local\` 파일을 생성하세요.
2. 파일 내부에 \`VITE_GEMINI_API_KEY=발급받은키\` 를 입력하고 저장하세요.`);
      return;
    }

    setIsLoading(true);
    try {
      // 🛠️ 구글 정식 인스턴스 초기화
      const ai = new GoogleGenAI({ apiKey: API_KEY });

      const prompt = `너는 세계 최고의 미슐랭 3스타 셰프야. 현재 내 냉장고에는 [${myIngredientNames.join(", ")}] 요리 재료들이 있어. 이 재료들을 최대한 활용(추가적인 양념이나 기본 재료는 소량 가미 가능)해서 만들 수 있는 환상적인 식사 레시피 1개를 추천해줘.
      반드시 아래 형식을 지켜서 한국어로 마크다운(Markdown) 예쁘게 적용해서 대답해줘:
      ### 🍽️ 추천 요리 이름: [이름]
      * **소요 시간 및 난이도**: 
      * **필요한 주재료**:
      * **상세 조리 순서(Step-by-Step)**:`;

      // 💡 [수정] 최신 SDK 엔진이 올바르게 인식하도록 가장 안정적인 "gemini-2.5-flash"로 변경
      // 만약 1.5 버전을 꼭 써야 한다면 "gemini-1.5-flash" 그대로 들어가되, 최신 패키지 구조가 정상 인지하도록 매핑합니다.
      const response = await ai.models.generateContent({
        model: "gemini-2.5-flash", 
        contents: prompt,
      });
      
      const textResponse = response.text;
      setAiRecipe(textResponse || "레시피를 생성하지 못했습니다.");
    } catch (error) {
      console.error("AI 레시피 생성 실패:", error);
      setAiRecipe("### ❌ AI 통신 실패\n구글 인공지능 엔진과 연결하는 과정에서 에러가 발생했습니다. 패키지 설치 상태나 API 키를 다시 확인해 주세요.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="p-8 max-w-5xl mx-auto space-y-8 min-h-screen">
      {/* 헤더 섹션 */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between border-b border-gray-100 dark:border-zinc-700 pb-6 gap-4">
        <div>
          <h1 className="text-4xl font-black tracking-tight text-gray-800 dark:text-white">
            🍳 AI 맞춤형 퀴진
          </h1>
          <p className="text-gray-400 text-sm mt-1">보유 중인 식재료를 기반으로 정밀 매칭된 다이닝 레시피를 제안합니다.</p>
        </div>

        {/* 인공지능 레시피 제안 버튼 */}
        <button
          onClick={generateAIRecipe}
          disabled={isLoading}
          className="relative inline-flex items-center justify-center p-0.5 overflow-hidden text-sm font-bold text-gray-900 rounded-2xl group bg-gradient-to-br from-purple-600 to-blue-500 group-hover:from-purple-600 group-hover:to-blue-500 hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-blue-300 shadow-xl transition-all duration-300 transform hover:-translate-y-1 disabled:opacity-50"
        >
          <span className="relative px-6 py-3.5 transition-all ease-in duration-75 bg-white dark:bg-zinc-900 rounded-xl group-hover:bg-opacity-0">
            {isLoading ? "🤖 AI 셰프가 조합법 생각 중..." : "🔮 실시간 냉장고 파먹기 AI 레시피 실행"}
          </span>
        </button>
      </div>

      {/* AI 추천 레시피 결과 화면 판넬 */}
      {aiRecipe && (
        <div className="bg-gradient-to-br from-indigo-50 to-purple-50 dark:from-zinc-800 dark:to-zinc-800/80 p-8 rounded-3xl shadow-inner border border-indigo-100 dark:border-zinc-700 relative animate-fadeIn">
          <div className="absolute top-4 right-4 bg-indigo-600 text-white text-xs font-black uppercase px-3 py-1 rounded-full tracking-widest shadow-md">
            Gemini Engine
          </div>
          <div className="prose prose-stone dark:prose-invert max-w-none text-gray-700 dark:text-gray-200 whitespace-pre-line leading-relaxed">
            {aiRecipe}
          </div>
        </div>
      )}

      {/* 로딩 인디케이터 */}
      {isLoading && (
        <div className="bg-white dark:bg-zinc-800 p-8 rounded-3xl shadow-md border border-gray-100 dark:border-zinc-700 space-y-4 animate-pulse">
          <div className="h-6 bg-gray-200 dark:bg-zinc-700 rounded-md w-1/3"></div>
          <div className="h-4 bg-gray-200 dark:bg-zinc-700 rounded-md w-1/4"></div>
          <div className="space-y-2 pt-4">
            <div className="h-4 bg-gray-200 dark:bg-zinc-700 rounded-md w-full"></div>
            <div className="h-4 bg-gray-200 dark:bg-zinc-700 rounded-md w-5/6"></div>
            <div className="h-4 bg-gray-200 dark:bg-zinc-700 rounded-md w-4/5"></div>
          </div>
        </div>
      )}

      {/* 쇼핑 리스트 섹션 고도화 */}
      <div className="bg-white dark:bg-zinc-800 rounded-3xl shadow-xl p-6 border border-gray-100 dark:border-zinc-700">
        <ShoppingList />
      </div>
    </div>
  );
}