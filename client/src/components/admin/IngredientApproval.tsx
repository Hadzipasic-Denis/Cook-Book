import { useContext } from "react";
import { AuthContext } from "../../context/AuthProvider";
import Sidebar from "../navigation/Sidebar";
import axiosClient from "../../../axiosClient/axiosClient";
import { toast } from "react-toastify";

export default function IngredientApproval() {
  const authContext = useContext(AuthContext);
  const ingredients = authContext?.pendingApprovals ?? [];

  const handleApproval = (id: number, status: "yes" | "no") => {
    axiosClient
      .put(`/api//ingredient/approval/${id}`, { status })
      .then(() => {
        toast.success(`Submitted`);
      })
      .catch(() => {
        toast.error("Something went wrong!");
      });
  };

  return (
    <div className="flex w-full">
      <Sidebar />
      <div className="w-full max-h-[100vh] bg-slate-50 p-6">
        <h1 className="text-2xl text-center font-bold">Ingredient Approval</h1>

        {ingredients.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-[90vh] w-full text-center">
            <div className="flex flex-col items-center justify-center bg-slate-200 p-12 rounded-xl shadow-xl">
              <svg
                className="w-16 h-16 text-gray-400 mb-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 12l2 2 4-4m6 4a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
              <h2 className="text-2xl font-semibold text-gray-700 mb-2">
                Great job!
              </h2>
              <p className="text-gray-500">
                There are no current pending approvals at the moment
              </p>
            </div>
          </div>
        ) : (
          <div className="flex justify-center gap-6 mt-4">
            {ingredients.map((ingredient) => (
              <div
                key={ingredient.id}
                className="w-[20%] bg-white shadow-md rounded-2xl p-6 flex flex-col justify-between"
              >
                <div>
                  <h2 className="text-lg text-center font-semibold mb-2">
                    {ingredient.name}
                  </h2>
                  <p className="text-sm text-gray-500">
                    Status:{" "}
                    <span className="font-medium text-orange-500">
                      Waiting approval
                    </span>
                  </p>
                </div>

                <div className="flex justify-center gap-2 mt-4">
                  <button
                    className="px-4 py-1 rounded-md bg-green-100 border-green-400 font-semibold border-[1.5px] text-green-800 hover:border-green-700 transition"
                    onClick={() => handleApproval(ingredient.id, "yes")}
                  >
                    Approve
                  </button>

                  <button
                    className="px-4 py-1 rounded-md bg-red-100 border-red-400 font-semibold border-[1.5px] text-red-800 hover:border-red-700 transition"
                    onClick={() => handleApproval(ingredient.id, "no")}
                  >
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
