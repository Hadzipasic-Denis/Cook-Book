import { Route, Routes } from "react-router-dom";
import Home from "./components/public/Home";
import Inspiration from "./components/public/Inspiration";
import Login from "./components/public/Login";
import Protected from "./components/admin/Protected";
import RecipeForm from "./components/admin/RecipeForm";
import Recipes from "./components/public/Recipes";
import RecipeDetails from "./components/public/RecipeDetails";
import IngredientApproval from "./components/admin/IngredientApproval";
import Plan from "./components/public/Plan";
import { Bounce, ToastContainer } from "react-toastify";

function App() {
  return (
    <>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick={false}
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
        transition={Bounce}
      />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/recipes" element={<Recipes />} />
        <Route path="/recipes/:id" element={<RecipeDetails />} />
        <Route path="/inspiration" element={<Inspiration />} />
        <Route path="/plan" element={<Plan />} />
        <Route path="/auth/login" element={<Login />} />

        <Route path="/" element={<Protected />}>
          <Route path="/createNewRecipe" element={<RecipeForm />} />
          <Route path="/approveIngredients" element={<IngredientApproval />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
