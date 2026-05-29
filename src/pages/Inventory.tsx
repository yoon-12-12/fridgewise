import { useMemo, useState } from "react";
import AddIngredientForm from "../components/AddIngredientForm";
import IngredientCard from "../components/IngredientCard";
import NotificationBanner from "../components/NotificationBanner";
import ExportExcelButton from "../components/ExportExcelButton";
import ReceiptUpload from "../components/ReceiptUpload";
import { useIngredient } from "../context/IngredientContext";

export default function Inventory() {
  const { ingredients } = useIngredient();
  const [search, setSearch] = useState("");
  const [sortBy, setSortBy] = useState("latest");

  // 정렬 전략을 객체로 분리하여 유지보수성 향상
  const sortStrategies: Record<string, (a: any, b: any) => number> = {
    name: (a, b) => a.name.localeCompare(b.name),
    expireDate: (a, b) => new Date(a.expireDate).getTime() - new Date(b.expireDate).getTime(),
    latest: () => 0, // 기본값(입력순)
  };

  const filteredIngredients = useMemo(() => {
    return [...ingredients]
      .filter((item) => item.name.toLowerCase().includes(search.toLowerCase()))
      .sort(sortStrategies[sortBy] || sortStrategies.latest);
  }, [ingredients, search, sortBy]);

  return (
    <div className="p-8 max-w-5xl mx-auto">
      <h1 className="text-3xl font-black mb-6 text-gray-800 dark:text-white">🧊 내 냉장고</h1>

      <NotificationBanner />

      <div className="flex flex-col sm:flex-row gap-4 mb-8">
        <input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="🔍 재료명 검색 (예: 양파)"
          className="flex-1 border border-gray-200 dark:border-zinc-700 rounded-2xl p-4 bg-white dark:bg-zinc-800 outline-none focus:ring-2 focus:ring-blue-500"
        />

        <select
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value)}
          className="border border-gray-200 dark:border-zinc-700 rounded-2xl p-4 bg-white dark:bg-zinc-800 outline-none"
        >
          <option value="latest">최신순</option>
          <option value="name">이름순</option>
          <option value="expireDate">유통기한순</option>
        </select>
      </div>

      <div className="flex gap-2 mb-6">
        <ExportExcelButton />
        <ReceiptUpload />
      </div>

      <AddIngredientForm />

      {/* 결과가 없을 경우 예외 처리 */}
      {filteredIngredients.length > 0 ? (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5 mt-8">
          {filteredIngredients.map((ingredient) => (
            <IngredientCard key={ingredient.id} ingredient={ingredient} />
          ))}
        </div>
      ) : (
        <div className="text-center py-20 text-gray-400">
          <p className="text-5xl mb-4">🔍</p>
          <p>검색 결과가 없습니다.</p>
        </div>
      )}
    </div>
  );
}