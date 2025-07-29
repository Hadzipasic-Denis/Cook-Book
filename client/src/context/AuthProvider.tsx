import { createContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import type {
  AuthContextType,
  LoginData,
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
  const [recipes, setRecipes] = useState<Recipes | null>(null)
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // axiosClient
    //   .get("/user/getProfile")
    //   .then((response) => {
    //     setUser(response.data);
    //     console.log(response.data);
    //   })
    //   .catch((error) => {
    //     console.log(error);
    //     setUser(null);
    //   })
    //   .finally(() => {
    //     setIsLoading(false);
    //   });

        axiosClient
    .get("/recipe")
    .then((response) => {
      setRecipes(response.data);
      // console.log(response.data);
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
        navigate("/");
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <AuthContext.Provider value={{ login, logout, user, recipes, isLoading }}>
      {children}
    </AuthContext.Provider>
  );
}
