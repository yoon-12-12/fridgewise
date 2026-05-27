import { Link } from "react-router-dom";
import ThemeToggle from "./ThemeToggle";

export default function Header() {
  return (
    <nav className="bg-green-600 text-white px-6 py-4 flex items-center gap-6 shadow-lg">
      <Link to="/">
        Home
      </Link>

      <Link to="/inventory">
        Inventory
      </Link>

      <Link to="/recipes">
        Recipes
      </Link>

      <Link to="/dashboard">
        Dashboard
      </Link>

      <ThemeToggle />
    </nav>
  );
}