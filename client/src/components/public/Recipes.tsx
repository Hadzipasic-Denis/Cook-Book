import { useContext } from "react";
import Sidebar from "../navigation/Sidebar";
import RecipeCard from "./RecipeCard";
import { AuthContext } from "../../context/AuthProvider";

export default function Recipes() {
  const authContext = useContext(AuthContext);

  return (
    <div className="flex w-full">
      <Sidebar />
      <div className="w-[80%] mx-auto mt-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-8">
          {authContext?.recipes?.map((recipe) => {
            return <RecipeCard key={recipe.id} recipe={recipe} />;
          })}
        </div>
      </div>
    </div>
  );
}
