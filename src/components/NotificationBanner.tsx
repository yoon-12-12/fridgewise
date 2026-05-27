import { useIngredient } from "../context/IngredientContext";

export default function NotificationBanner() {
  const { ingredients } =
    useIngredient();

  const today = new Date();

  const expiringSoon =
    ingredients.filter(
      (ingredient) => {
        if (
          !ingredient.expireDate
        )
          return false;

        const expireDate =
          new Date(
            ingredient.expireDate
          );

        const diff =
          (expireDate.getTime() -
            today.getTime()) /
          (1000 *
            60 *
            60 *
            24);

        return (
          diff >= 0 &&
          diff <= 3
        );
      }
    );

  if (!expiringSoon.length)
    return null;

  return (
    <div className="bg-orange-100 border border-orange-300 rounded-2xl p-4 mb-6">
      <div className="font-bold">
        ⚠ 유통기한 임박 알림
      </div>

      <div className="mt-2">
        {expiringSoon
          .map(
            (
              ingredient
            ) =>
              ingredient.name
          )
          .join(", ")}
      </div>
    </div>
  );
}