import { useContext } from "react";
import { AuthContext } from "../../context/AuthProvider";
import Sidebar from "../navigation/Sidebar";

export default function IngredientApproval() {
  const authContext = useContext(AuthContext);
  const ingredients = authContext?.unapprovedIngredients ?? [];

  return (
    <div className="flex w-full">
      <Sidebar />
      <div className="w-full max-h-[100vh] bg-slate-50 overflow-y-scroll p-6">
        <h1 className="text-2xl text-center font-bold mb-6">Unapproved Ingredients</h1>

        {ingredients.length === 0 ? (
          <div className="bg-white shadow-md rounded-2xl p-6 text-center">
            <p className="text-gray-600">✅ All ingredients are approved!</p>
          </div>
        ) : (
          <div className="flex justify-center">
            {ingredients.map((ingredient) => (
              <div
                key={ingredient.id}
                className="w-[20%] bg-white shadow-md rounded-2xl p-6 flex flex-col justify-between"
              >
                <div>
                  <h2 className="text-lg font-semibold mb-2">
                    {ingredient.name}
                  </h2>
                  <p className="text-sm text-gray-500">
                    Status:{" "}
                    <span className="font-medium text-orange-500">
                      Waiting approval
                    </span>
                  </p>
                </div>
                <div className="mt-4 flex justify-center gap-3">
                  <button className="px-4 py-1 rounded-xl bg-green-500 text-white hover:bg-green-600 transition">
                    Approve
                  </button>
                  <button className="px-4 py-1 rounded-xl bg-red-500 text-white hover:bg-red-600 transition">
                    Reject
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
