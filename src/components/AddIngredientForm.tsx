import { useMemo, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { useIngredient } from "../context/IngredientContext";
import { ingredientSuggestions } from "../data/ingredientSuggestions";
import { normalizeIngredient } from "../utils/normalizeIngredient";
import { checkCategory } from "../utils/ingredientUtils";

export default function AddIngredientForm() {
  const { addIngredient } = useIngredient();
  const [name, setName] = useState("");
  const [quantity, setQuantity] = useState(1); // 💡 기본값 1 유지
  const [expireDate, setExpireDate] = useState("");

  const filteredSuggestions = useMemo(() => {
    if (!name.trim()) return [];
    return ingredientSuggestions.filter((i) => i.includes(name)).slice(0, 5);
  }, [name]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return;

    // 💡 유통기한 자동 계산 로직: 입력 없으면 오늘 + 3일
    let finalExpireDate = expireDate;
    if (!finalExpireDate) {
      const date = new Date();
      date.setDate(date.getDate() + 3); // 3일 뒤 날짜
      finalExpireDate = date.toISOString().split("T")[0];
    }

    const normalizedName = normalizeIngredient(name);
    const { isVegetable, isMeat, isDairy } = checkCategory({ name: normalizedName } as any);
    
    let emoji = isVegetable ? "🌾" : isMeat ? "🥩" : isDairy ? "🥛" : "🥫";

    addIngredient({
      id: uuidv4(),
      name: `${normalizedName} ${emoji}`,
      quantity: quantity || 1, // 수량 비어있으면 1로 강제
      expireDate: finalExpireDate,
    });

    setName("");
    setQuantity(1);
    setExpireDate("");
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white dark:bg-zinc-800 p-6 rounded-3xl shadow-xl border border-gray-100 dark:border-zinc-700">
      <h2 className="text-lg font-black text-gray-800 dark:text-white mb-4">➕ 재료 추가</h2>
      
      <input
        className="w-full border border-gray-200 dark:border-zinc-600 rounded-2xl p-4 mb-3"
        placeholder="재료명 입력"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />

      <div className="grid grid-cols-2 gap-3">
        <div>
          <label className="text-xs font-bold text-gray-400 ml-1">수량</label>
          <input
            className="w-full border p-4 rounded-2xl"
            type="number"
            min={1}
            value={quantity}
            onChange={(e) => setQuantity(Number(e.target.value))}
          />
        </div>
        <div>
          <label className="text-xs font-bold text-gray-400 ml-1">유통기한 (미입력시 +3일)</label>
          <input
            className="w-full border p-4 rounded-2xl"
            type="date"
            value={expireDate}
            onChange={(e) => setExpireDate(e.target.value)}
          />
        </div>
      </div>

      <button type="submit" className="w-full bg-blue-600 text-white font-bold py-4 rounded-2xl mt-4">
        추가하기
      </button>
    </form>
  );
}