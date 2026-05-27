import { useIngredient } from "../context/IngredientContext";
import { recipes } from "../data/recipes";

import ShoppingList from "../components/ShoppingList";

export default function Recipes() {
  const { ingredients } =
    useIngredient();

  const ingredientNames =
    ingredients.map(
      ingredient =>
        ingredient.name
    );

  return (
    <div className="p-8 space-y-6">
      <h1 className="text-3xl font-bold">
        🍳 추천 레시피
      </h1>

      <div className="grid md:grid-cols-2 gap-5">
        {recipes.map(
          recipe => {
            const owned =
              recipe.ingredients.filter(
                ingredient =>
                  ingredientNames.includes(
                    ingredient
                  )
              );

            const missing =
              recipe.ingredients.filter(
                ingredient =>
                  !ingredientNames.includes(
                    ingredient
                  )
              );

            return (
              <div
                key={recipe.name}
                className="bg-white rounded-3xl shadow-lg p-6"
              >
                <h2 className="text-2xl font-bold">
                  {recipe.name}
                </h2>

                <div className="mt-4">
                  <div className="font-semibold">
                    보유 재료
                  </div>

                  {owned.map(item => (
                    <div key={item}>
                      ✅ {item}
                    </div>
                  ))}
                </div>

                <div className="mt-4">
                  <div className="font-semibold">
                    부족한 재료
                  </div>

                  {missing.map(item => (
                    <div key={item}>
                      ❌ {item}
                    </div>
                  ))}
                </div>
              </div>
            );
          }
        )}
      </div>

      <ShoppingList />
    </div>
  );
}