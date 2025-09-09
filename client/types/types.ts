import { Dispatch, SetStateAction } from "react";

export interface User {
  id: number;
  role: string;
  email: string;
}

export interface Ingredient {
  name: string;
  unit: string;
  ammount: number;
}

export interface PendingApproval {
  id: number;
  name: string;
  approval_status: string;
}

export type PendingApprovals = PendingApproval[];

export interface EveryIngredient {
  id: number;
  name: string;
  approval_status: string;
}

export type AllIngredients = EveryIngredient[];

export interface Recipe {
  id: number;
  title: string;
  cook_duration: number;
  prep_duration: number;
  servings: number;
  ingredients: Ingredient[];
  steps: string[];
  tags: string[];
  image: File | string | null;
  category: string;
  short_description: string;
  kcal: number;
  difficulty: string;
  rating: number;
}

export type Recipes = Recipe[];

export interface LoginData {
  email: string;
  password: string;
}

export interface AuthContextType {
  login: (data: LoginData) => void;
  logout: () => void;
  recipes: Recipes | null;
  recipesWithouthFilter: Recipes | null;
  user: User | null;
  pendingApprovals: PendingApprovals | null; 
  allIngredients: AllIngredients | null; 
  isLoading: boolean;
  filters: {
    category: string;
    difficulty: string;
    max_kcal: string;
    max_cook_duration: string;
    title: string;
  };
  setFilters: Dispatch<
    SetStateAction<{
      category: string;
      difficulty: string;
      max_kcal: string;
      max_cook_duration: string;
      title: string;
    }>
  >;
}
