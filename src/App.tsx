import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";

import Header from "./components/Header";

import Home from "./pages/Home";
import Inventory from "./pages/Inventory";
import Recipes from "./pages/Recipes";
import Dashboard from "./pages/Dashboard";

import { IngredientProvider } from "./context/IngredientContext";
import { ThemeProvider } from "./context/ThemeContext";

function App() {
  return (
    <ThemeProvider>
      <IngredientProvider>
        <BrowserRouter>
          <Header />

          <Routes>
            <Route
              path="/"
              element={<Home />}
            />

            <Route
              path="/inventory"
              element={<Inventory />}
            />

            <Route
              path="/recipes"
              element={<Recipes />}
            />

            <Route
              path="/dashboard"
              element={<Dashboard />}
            />
          </Routes>
        </BrowserRouter>
      </IngredientProvider>
    </ThemeProvider>
  );
}

export default App;