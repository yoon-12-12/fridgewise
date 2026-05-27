import * as XLSX from "xlsx";
import type { Ingredient } from "../types/Ingredient";

export const exportIngredientsToExcel = (
  ingredients: Ingredient[]
) => {
  const worksheet =
    XLSX.utils.json_to_sheet(
      ingredients.map(
        (ingredient) => ({
          재료명: ingredient.name,
          수량: ingredient.quantity,
          유통기한:
            ingredient.expireDate || "",
        })
      )
    );

  const workbook =
    XLSX.utils.book_new();

  XLSX.utils.book_append_sheet(
    workbook,
    worksheet,
    "냉장고 재료 목록"
  );

  XLSX.writeFile(
    workbook,
    "fridgewise-ingredients.xlsx"
  );
};