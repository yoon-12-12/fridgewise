import {
  useMemo,
  useState,
} from "react";

import { v4 as uuidv4 } from "uuid";

import { useIngredient } from "../context/IngredientContext";
import { ingredientSuggestions } from "../data/ingredientSuggestions";
import { normalizeIngredient } from "../utils/normalizeIngredient";

export default function AddIngredientForm() {
  const { addIngredient } =
    useIngredient();

  const [name, setName] =
    useState("");

  const [quantity, setQuantity] =
    useState(1);

  const [expireDate, setExpireDate] =
    useState("");

  const filteredSuggestions =
    useMemo(() => {
      if (!name.trim()) return [];

      return ingredientSuggestions.filter(
        (ingredient) =>
          ingredient.includes(name)
      );
    }, [name]);

  const handleSubmit = (
    e: React.FormEvent
  ) => {
    e.preventDefault();

    if (!name.trim()) return;

    addIngredient({
      id: uuidv4(),
      name: normalizeIngredient(name),
      quantity,
      expireDate,
    });

    setName("");
    setQuantity(1);
    setExpireDate("");
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white p-6 rounded-2xl shadow"
    >
      <input
        className="w-full border rounded-xl p-3"
        placeholder="재료명 입력"
        value={name}
        onChange={(e) =>
          setName(e.target.value)
        }
      />

      {filteredSuggestions.length >
        0 && (
        <div className="mt-2 border rounded-xl overflow-hidden">
          {filteredSuggestions.map(
            (ingredient) => (
              <div
                key={ingredient}
                onClick={() =>
                  setName(
                    ingredient
                  )
                }
                className="p-2 hover:bg-gray-100 cursor-pointer"
              >
                {ingredient}
              </div>
            )
          )}
        </div>
      )}

      <input
        className="w-full border rounded-xl p-3 mt-3"
        type="number"
        min={1}
        value={quantity}
        onChange={(e) =>
          setQuantity(
            Number(
              e.target.value
            )
          )
        }
      />

      <input
        className="w-full border rounded-xl p-3 mt-3"
        type="date"
        value={expireDate}
        onChange={(e) =>
          setExpireDate(
            e.target.value
          )
        }
      />

      <button
        className="bg-green-600 text-white px-6 py-3 rounded-xl mt-4"
      >
        재료 추가
      </button>
    </form>
  );
}