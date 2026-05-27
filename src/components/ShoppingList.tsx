import { useIngredient } from "../context/IngredientContext";
import { recipes } from "../data/recipes";

export default function ShoppingList() {
  const { ingredients } =
    useIngredient();

  const ingredientNames =
    ingredients.map(
      (ingredient) =>
        ingredient.name
    );

  const missingIngredients =
    recipes.flatMap((recipe) =>
      recipe.ingredients.filter(
        (ingredient) =>
          !ingredientNames.includes(
            ingredient
          )
      )
    );

  const uniqueMissing = [
    ...new Set(
      missingIngredients
    ),
  ];

  if (!uniqueMissing.length) {
    return (
      <div className="bg-white rounded-2xl shadow p-6">
        냉장고 재료만으로 만들 수 있는 요리가 충분해요 🍳
      </div>
    );
  }

  return (
    <div className="bg-white rounded-2xl shadow p-6">
      <h2 className="text-xl font-bold mb-4">
        🛒 장보기 리스트
      </h2>

      <div className="space-y-2">
        {uniqueMissing.map(
          (item) => (
            <div key={item}>
              ☐ {item}
            </div>
          )
        )}
      </div>
    </div>
  );
}