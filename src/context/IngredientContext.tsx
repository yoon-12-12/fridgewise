// 파일명: src/context/IngredientContext.tsx
import { createContext, useContext, useEffect, useState } from "react";
import type { Ingredient } from "../types/Ingredient";

interface IngredientContextType {
  ingredients: Ingredient[];
  addIngredient: (ingredient: Ingredient) => void;
  deleteIngredient: (id: string) => void;
}

const IngredientContext = createContext<IngredientContextType | undefined>(undefined);

export const IngredientProvider = ({ children }: { children: React.ReactNode }) => {
  
  // 💡 [핵심 수정] useState가 처음 생성될 때 localStorage에서 직접 데이터를 가져옵니다.
  // 이 방식을 쓰면 새로고침 타이밍에 데이터가 휘발되는 버그를 완벽하게 차단할 수 있습니다.
  const [ingredients, setIngredients] = useState<Ingredient[]>(() => {
    const saved = localStorage.getItem("fridgewise_ingredients");
    return saved ? JSON.parse(saved) : [];
  });

  // ✨ 데이터가 변경될 때마다 로컬 창고에 동기화 (Key 값을 고유하게 명시)
  useEffect(() => {
    localStorage.setItem("fridgewise_ingredients", JSON.stringify(ingredients));
  }, [ingredients]);

  // 식재료 추가 로직
  const addIngredient = (ingredient: Ingredient) => {
    setIngredients((prev) => [...prev, ingredient]);
  };

  // 식재료 삭제 로직
  const deleteIngredient = (id: string) => {
    setIngredients((prev) => prev.filter((i) => i.id !== id));
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
  const context = useContext(IngredientContext);
  if (!context) {
    throw new Error("useIngredient must be used within IngredientProvider");
  }
  return context;
};