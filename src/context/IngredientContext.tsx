import {
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";
import type { Ingredient } from "../types/Ingredient";

interface IngredientContextType {
  ingredients: Ingredient[];
  addIngredient: (ingredient: Ingredient) => void;
  deleteIngredient: (id: string) => void;
}

const IngredientContext = createContext<
  IngredientContextType | undefined
>(undefined);

export const IngredientProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [ingredients, setIngredients] =
    useState<Ingredient[]>([]);

  useEffect(() => {
    const saved =
      localStorage.getItem("ingredients");

    if (saved) {
      setIngredients(JSON.parse(saved));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem(
      "ingredients",
      JSON.stringify(ingredients)
    );
  }, [ingredients]);

  const addIngredient = (
    ingredient: Ingredient
  ) => {
    setIngredients((prev) => [
      ...prev,
      ingredient,
    ]);
  };

  const deleteIngredient = (id: string) => {
    setIngredients((prev) =>
      prev.filter((i) => i.id !== id)
    );
  };

  return (
    <IngredientContext.Provider
      value={{
        ingredients,
        addIngredient,
        deleteIngredient,
      }}
    >
      {children}
    </IngredientContext.Provider>
  );
};

export const useIngredient = () => {
  const context =
    useContext(IngredientContext);

  if (!context) {
    throw new Error(
      "useIngredient must be used within IngredientProvider"
    );
  }

  return context;
};