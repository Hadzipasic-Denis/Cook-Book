import { createContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  type AuthContextType,
  type LoginData,
  type Recipes,
  type User,
  type PendingApprovals,
  type AllIngredients,
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
  const [pendingApprovals, setPendingApprovals] =
    useState<PendingApprovals | null>([]);
  const [allIngredients, setAllIngredients] = useState<AllIngredients | null>(
    []
  );
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
      })
      .catch(() => {
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
      .catch(() => {});

    axiosClient
      .get("/ingredient/getAllPendingApprovals")
      .then((response) => {
        setPendingApprovals(response.data);
      })
      .catch(() => {});

    axiosClient
      .get("/ingredient/getAllIngredients")
      .then((response) => {
        setAllIngredients(response.data);
      })
      .catch(() => {});

    axiosClient
      .get("/recipe/recipesWithouthFilter")
      .then((response) => {
        setRecipesWithouthFilter(response.data);
      })
      .catch(() => {
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
      .catch(() => {})
      .finally(() => {
        setIsLoading(false);
      });
  };

  const logout = async () => {
    axiosClient
      .post("/user/logout")
      .then(() => {
        setUser(null);
        navigate("/");
      })
      .catch(() => {});
  };

  return (
    <AuthContext.Provider
      value={{
        login,
        logout,
        user,
        recipes,
        recipesWithouthFilter,
        pendingApprovals,
        isLoading,
        filters,
        setFilters,
        allIngredients,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
