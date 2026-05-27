import { useTheme } from "../context/ThemeContext";

export default function ThemeToggle() {
  const {
    darkMode,
    toggleDarkMode,
  } = useTheme();

  return (
    <button
      onClick={toggleDarkMode}
      className="ml-auto bg-white/20 px-4 py-2 rounded-xl"
    >
      {darkMode ? "☀️" : "🌙"}
    </button>
  );
}