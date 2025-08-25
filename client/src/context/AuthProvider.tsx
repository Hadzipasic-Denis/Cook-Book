import { createContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  type UnapprovedIngredients,
  type AuthContextType,
  type LoginData,
  type Recipe,
  type Recipes,
  type User,
} from "../../../client/types/types";
import axiosClient from "../../axiosClient/axiosClient";

export const AuthContext = createContext<AuthContextType | null>(null);

export default function AuthProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const navigate = useNavigate();

  const [user, setUser] = useState<User | null>(null);
  const [recipes, setRecipes] = useState<Recipes | null>(null);
  const [recipesWithouthFilter, setRecipesWithouthFilter] =
    useState<Recipes | null>(null);
  const [unapprovedIngredients, setUnapprovedIngredients] =
    useState<UnapprovedIngredients | null>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [filters, setFilters] = useState({
    category: "",
    difficulty: "",
    max_kcal: "",
    max_cook_duration: "",
    title: "",
  });

  useEffect(() => {
    axiosClient
      .get("/user/getUserProfile")
      .then((response) => {
        setUser(response.data);
        console.log(response.data);
      })
      .catch((error) => {
        console.log(error);
        setUser(null);
      })
      .finally(() => {
        setIsLoading(false);
      });

    axiosClient
      .get("/recipe", { params: filters })
      .then((response) => {
        setRecipes(response.data);
      })
      .catch((error) => {
        console.log(error);
      });

    axiosClient
      .get("/ingredient/getAllUnapprovedIngredients")
      .then((response) => {
        setUnapprovedIngredients(response.data);
        console.log(response.data);
      })
      .catch((error) => {
        console.log(error);
      });

    axiosClient
      .get("/recipe/recipesWithouthFilter")
      .then((response) => {
        setRecipesWithouthFilter(response.data);
        console.log(response.data);
      })
      .catch((error) => {
        console.log(error);
        setRecipesWithouthFilter(null);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, [filters]);

  const login = async (data: LoginData) => {
    axiosClient
      .post("/user/login", data)
      .then((response) => {
        setUser(response.data);
        navigate("/");
      })
      .catch((error) => {
        console.log(error);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  const logout = async () => {
    axiosClient
      .post("/user/logout")
      .then(() => {
        console.log("Logged out!");
        setUser(null);
        navigate("/");
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const createRecipe = async (data: Recipe) => {
    const formData = new FormData();

    for (const key in data) {
      if (key === "ingredients" || key === "steps" || key === "tags") {
        formData.append(key, JSON.stringify(data[key as keyof Recipe]));
      } else if (key !== "image") {
        formData.append(key, data[key as keyof Recipe] as any);
      }
    }

    if (data.image) {
      formData.append("image", data.image);
    }

    await axiosClient
      .post("/recipe/createNewRecipe", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      })
      .then(() => {
        console.log("Upload successful!");
        navigate("/");
      })
      .catch((error) => {
        console.log(error);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  return (
    <AuthContext.Provider
      value={{
        login,
        logout,
        createRecipe,
        user,
        recipes,
        recipesWithouthFilter,
        unapprovedIngredients,
        isLoading,
        filters,
        setFilters,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
