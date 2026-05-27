import { ingredientAliases } from "../data/ingredientAliases";

export const normalizeIngredient = (
  ingredient: string
) => {
  const trimmed = ingredient.trim();

  return (
    ingredientAliases[trimmed] ||
    trimmed
  );
};