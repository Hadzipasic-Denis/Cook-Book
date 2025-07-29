import { Route, Routes } from "react-router-dom";
import Home from "./components/public/Home";
import Inspiration from "./components/public/Inspiration";
import Plan from "./components/public/Plan";
import Login from "./components/public/Login";
import Recipes from "./components/public/Test";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/recipes" element={<Recipes />} />
        <Route path="/inspiration" element={<Inspiration />} />
        <Route path="/plan" element={<Plan />} />
        <Route path="/auth/login" element={<Login />} />
      </Routes>
    </>
  );
}

export default App;
