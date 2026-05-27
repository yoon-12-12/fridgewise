import type { Ingredient } from "../types/Ingredient";
import { useIngredient } from "../context/IngredientContext";

export default function IngredientCard({
  ingredient,
}: {
  ingredient: Ingredient;
}) {
  const { deleteIngredient } =
    useIngredient();

  return (
    <div className="bg-white dark:bg-slate-800 rounded-3xl shadow-lg hover:shadow-xl hover:-translate-y-1 transition p-6">
      <h3 className="text-2xl font-bold">
        🥬 {ingredient.name}
      </h3>

      <p className="mt-3">
        수량:
        {" "}
        {ingredient.quantity}
      </p>

      <p>
        유통기한:
        {" "}
        {ingredient.expireDate ||
          "-"}
      </p>

      <button
        onClick={() =>
          deleteIngredient(
            ingredient.id
          )
        }
        className="mt-4 text-red-500 hover:text-red-700"
      >
        삭제
      </button>
    </div>
  );
}