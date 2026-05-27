import { createWorker } from "tesseract.js";
import { v4 as uuidv4 } from "uuid";

import { useIngredient } from "../context/IngredientContext";
import { ingredientSuggestions } from "../data/ingredientSuggestions";
import { normalizeIngredient } from "../utils/normalizeIngredient";

export default function ReceiptUpload() {
  const { addIngredient } =
    useIngredient();

  const handleUpload = async (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file =
      e.target.files?.[0];

    if (!file) return;

    try {
      const worker =
        await createWorker("kor");

      const {
        data: { text },
      } =
        await worker.recognize(
          file
        );

      const foundIngredients =
        ingredientSuggestions.filter(
          (ingredient) =>
            text.includes(
              ingredient
            )
        );

      foundIngredients.forEach(
        (ingredient) => {
          addIngredient({
            id: uuidv4(),
            name: normalizeIngredient(
              ingredient
            ),
            quantity: 1,
            expireDate: "",
          });
        }
      );

      await worker.terminate();

      alert(
        `${foundIngredients.length}개의 재료가 등록되었습니다.`
      );
    } catch (error) {
      console.error(error);

      alert(
        "영수증 분석 중 오류가 발생했습니다."
      );
    }
  };

  return (
    <div className="bg-white rounded-2xl shadow p-6 mb-6">
      <h2 className="text-xl font-bold mb-3">
        📸 영수증 등록
      </h2>

      <p className="text-gray-600 mb-4">
        마트 영수증 사진을 업로드하면
        재료를 자동으로 추가합니다.
      </p>

      <input
        type="file"
        accept="image/*"
        onChange={handleUpload}
      />
    </div>
  );
}