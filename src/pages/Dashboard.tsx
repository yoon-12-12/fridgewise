import { useIngredient } from "../context/IngredientContext";

import {
  PieChart,
  Pie,
  Tooltip,
  Cell,
} from "recharts";

export default function Dashboard() {
  const { ingredients } =
    useIngredient();

  const data = [
    {
      name: "재료 수",
      value:
        ingredients.length,
    },
    {
      name: "빈 공간",
      value: Math.max(
        20 -
          ingredients.length,
        0
      ),
    },
  ];

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-6">
        📊 Dashboard
      </h1>

      <PieChart
        width={400}
        height={300}
      >
        <Pie
          data={data}
          cx="50%"
          cy="50%"
          outerRadius={100}
          dataKey="value"
        >
          <Cell fill="#16a34a" />
          <Cell fill="#d1d5db" />
        </Pie>

        <Tooltip />
      </PieChart>
    </div>
  );
}