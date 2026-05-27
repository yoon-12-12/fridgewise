import { useIngredient } from "../context/IngredientContext";
import { exportIngredientsToExcel } from "../utils/exportToExcel";

export default function ExportExcelButton() {
  const { ingredients } =
    useIngredient();

  return (
    <button
      onClick={() =>
        exportIngredientsToExcel(
          ingredients
        )
      }
      className="bg-emerald-600 text-white px-5 py-3 rounded-xl"
    >
      📄 엑셀 다운로드
    </button>
  );
}