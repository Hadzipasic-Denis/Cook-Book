import { useContext } from "react";
import Sidebar from "../navigation/Sidebar";
import RecipeCard from "./RecipeCard";
import { AuthContext } from "../../context/AuthProvider";

export default function Recipes() {
  const authContext = useContext(AuthContext);

  return (
    <div className="flex w-full">
      <Sidebar />
      <div className="mx-auto pt-6 px-10 max-h-[100vh] overflow-y-scroll">
        <div className="flex flex-col sm:flex-row items-center justify-between bg-gradient-to-r from-blue-50 via-white to-green-50 p-4 rounded-xl shadow-md gap-4">
          <div className="flex gap-4">
            <select
              value={authContext?.filters.difficulty}
              onChange={(e) =>
                authContext?.setFilters((prev) => ({
                  ...prev,
                  difficulty: e.target.value,
                }))
              }
              className="w-[230px] px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-300 transition hover:bg-gray-100"
            >
              <option value="">All difficulties</option>
              <option value="Easy">Easy</option>
              <option value="Medium">Medium</option>
              <option value="Hard">Hard</option>
            </select>

            <input
              type="number"
              placeholder="Max calories"
              value={authContext?.filters.max_kcal}
              min={0}
              onChange={(e) =>
                authContext?.setFilters((prev) => ({
                  ...prev,
                  max_kcal: e.target.value,
                }))
              }
              className="w-[230px] px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-300 transition hover:bg-gray-100"
            />

            <input
              type="number"
              placeholder="Max cook duration (min)"
              value={authContext?.filters.max_cook_duration || ""}
              min={0}
              onChange={(e) =>
                authContext?.setFilters((prev) => ({
                  ...prev,
                  max_cook_duration: e.target.value,
                }))
              }
              className="w-[230px] px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-300 transition hover:bg-gray-100"
            />

            <select
              value={authContext?.filters.category}
              onChange={(e) =>
                authContext?.setFilters((prev) => ({
                  ...prev,
                  category: e.target.value,
                }))
              }
              className="w-[230px] px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-300 transition hover:bg-gray-100"
            >
              <option value="">All categories</option>
              <option value="Breakfast">Breakfast</option>
              <option value="Lunch">Lunch</option>
              <option value="Dinner">Dinner</option>
              <option value="Dessert">Dessert</option>
            </select>

            <button
              onClick={() =>
                authContext?.setFilters({
                  title: "",
                  difficulty: "",
                  max_kcal: "",
                  max_cook_duration: "",
                  category: "",
                })
              }
              className="flex items-center gap-1 px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width={21}
                height={21}
                viewBox="0 0 21 21"
              >
                <g
                  fill="none"
                  fillRule="evenodd"
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1.5}
                >
                  <path d="M3.578 6.487A8 8 0 1 1 2.5 10.5"></path>
                  <path d="M7.5 6.5h-4v-4"></path>
                </g>
              </svg>
            </button>
          </div>

          <input
            type="text"
            placeholder="Search by title"
            value={authContext?.filters.title || ""}
            onChange={(e) =>
              authContext?.setFilters((prev) => ({
                ...prev,
                title: e.target.value,
              }))
            }
            className="w-[400px] px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-300 transition hover:bg-gray-100"
          />
        </div>

        <div className="py-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-8">
          {authContext?.recipes?.map((recipe) => {
            return <RecipeCard key={recipe.id} recipe={recipe} />;
          })}
        </div>
      </div>
    </div>
  );
}
