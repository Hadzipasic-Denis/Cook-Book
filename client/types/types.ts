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

export interface Recipe {
  id: number;
  title: string,
  cook_duration: number;
  prep_duration: number;
  servings: number;
  ingredients: Ingredient[];
  steps: string[];
  tags: string[];
  image: string | null;
  category: string,
  short_description: string,
  kcal: number
}

export type Recipes = Recipe[]

export interface LoginData {
  email: string;
  password: string;
}

export interface AuthContextType {
  login: (data: LoginData) => void;
  logout: () => void;
  createRecipe: (data: Recipe) => void;
  recipes: Recipes | null;
  user: User | null;
  isLoading: boolean;
}
