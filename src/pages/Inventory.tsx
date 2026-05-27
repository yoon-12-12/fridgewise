import {
  useMemo,
  useState,
} from "react";

import AddIngredientForm from "../components/AddIngredientForm";
import IngredientCard from "../components/IngredientCard";
import NotificationBanner from "../components/NotificationBanner";
import ExportExcelButton from "../components/ExportExcelButton";
import ReceiptUpload from "../components/ReceiptUpload";

import { useIngredient } from "../context/IngredientContext";

export default function Inventory() {
  const { ingredients } =
    useIngredient();

  const [search, setSearch] =
    useState("");

  const [sortBy, setSortBy] =
    useState("latest");

  const filteredIngredients =
    useMemo(() => {
      let filtered =
        ingredients.filter(
          (ingredient) =>
            ingredient.name.includes(
              search
            )
        );

      if (
        sortBy === "name"
      ) {
        filtered.sort((a, b) =>
          a.name.localeCompare(
            b.name
          )
        );
      }

      if (
        sortBy ===
        "expireDate"
      ) {
        filtered.sort(
          (a, b) =>
            new Date(
              a.expireDate
            ).getTime() -
            new Date(
              b.expireDate
            ).getTime()
        );
      }

      return filtered;
    }, [
      ingredients,
      search,
      sortBy,
    ]);

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-6">
        🧊 내 냉장고
      </h1>

      <NotificationBanner />

      <div className="flex gap-4 mb-6">
        <input
          value={search}
          onChange={(e) =>
            setSearch(
              e.target.value
            )
          }
          placeholder="🔍 재료 검색"
          className="border rounded-xl p-3"
        />

        <select
          value={sortBy}
          onChange={(e) =>
            setSortBy(
              e.target.value
            )
          }
          className="border rounded-xl p-3"
        >
          <option value="latest">
            최신순
          </option>

          <option value="name">
            이름순
          </option>

          <option value="expireDate">
            유통기한순
          </option>
        </select>
      </div>

      <ExportExcelButton />

      <ReceiptUpload />

      <AddIngredientForm />

      <div className="grid md:grid-cols-3 gap-5 mt-8">
        {filteredIngredients.map(
          (ingredient) => (
            <IngredientCard
              key={ingredient.id}
              ingredient={
                ingredient
              }
            />
          )
        )}
      </div>
    </div>
  );
}