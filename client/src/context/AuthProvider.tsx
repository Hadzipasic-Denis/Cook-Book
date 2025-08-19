import { createContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import type {
  AuthContextType,
  LoginData,
  Recipe,
  Recipes,
  User,
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
  const [isLoading, setIsLoading] = useState(true);

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
      .get("/recipe")
      .then((response) => {
        setRecipes(response.data);
        console.log(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

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
      formData.append("image", data.image); // 👈 file
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
      value={{ login, logout, createRecipe, user, recipes, isLoading }}
    >
      {children}
    </AuthContext.Provider>
  );
}
