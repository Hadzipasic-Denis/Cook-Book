import { useEffect, useState } from "react";
import Sidebar from "../navigation/Sidebar";
import { NavLink } from "react-router-dom";

type WeeklyPlan = {
  [day: string]: {
    breakfast: string[];
    lunch: string[];
    dinner: string[];
  };
};

export default function Plan() {
  const [plan, setPlan] = useState<WeeklyPlan>({});

  const days: (keyof WeeklyPlan)[] = [
    "monday",
    "tuesday",
    "wednesday",
    "thursday",
    "friday",
    "saturday",
    "sunday",
  ];
  const meals: ("breakfast" | "lunch" | "dinner")[] = [
    "breakfast",
    "lunch",
    "dinner",
  ];

  const mealColors: Record<(typeof meals)[number], string> = {
    breakfast: "bg-yellow-50 border-yellow-200 text-yellow-800",
    lunch: "bg-green-50 border-green-200 text-green-800",
    dinner: "bg-red-50 border-red-200 text-red-800",
  };

  useEffect(() => {
    const savedPlan = localStorage.getItem("weeklyPlan");
    if (savedPlan) setPlan(JSON.parse(savedPlan));
  }, []);

  const handleDelete = (day: keyof WeeklyPlan, meal: typeof meals[number], index: number) => {
    const updatedPlan = { ...plan };
    updatedPlan[day][meal] = updatedPlan[day][meal].filter((_, i) => i !== index);
    setPlan(updatedPlan);
    localStorage.setItem("weeklyPlan", JSON.stringify(updatedPlan));
  };

  return (
    <div className="flex w-full">
      <Sidebar />
      <div className="w-full bg-slate-50 pt-6 px-4 min-h-[100vh] overflow-x-auto">
        <h1 className="text-2xl font-bold mb-6 text-center">
          Your Weekly Plan
        </h1>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-7">
          {days.map((day) => (
            <div
              key={day}
              className="bg-white p-4 rounded-2xl shadow-lg border border-slate-200 flex flex-col"
            >
              <h2 className="font-bold text-lg capitalize mb-4 border-b border-slate-300 pb-2">
                {day}
              </h2>
              {meals.map((meal) => (
                <div
                  key={meal}
                  className={`min-h-[80px] mb-4 py-2 px-4 rounded-lg border ${mealColors[meal]}`}
                >
                  <h3 className="font-semibold text-center text-sm capitalize mb-2">
                    {meal}
                  </h3>
                  <div className="flex flex-col gap-2">
                    {(plan[day]?.[meal] || []).map((recipeId, i) => (
                      <div
                        key={i}
                        className="flex items-center justify-between bg-blue-100 p-2 rounded-lg"
                      >
                        <NavLink
                          to={`/recipes/${recipeId}`}
                          target="_blank"
                          className="flex-1 px-3 py-1 bg-blue-400 text-white rounded hover:bg-blue-600 text-sm font-medium text-center"
                        >
                          View Recipe
                        </NavLink>
                        <button
                          onClick={() => handleDelete(day, meal, i)}
                          className="ml-2 px-1 bg-red-500 text-white rounded hover:bg-red-600 text-xs"
                        >
                          ✕
                        </button>
                      </div>
                    ))}
                    {(plan[day]?.[meal] || []).length === 0 && (
                      <span className="text-gray-400 text-sm italic">
                        No recipes saved
                      </span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
