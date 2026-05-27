import {
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";

interface ThemeContextType {
  darkMode: boolean;
  toggleDarkMode: () => void;
}

const ThemeContext = createContext<
  ThemeContextType | undefined
>(undefined);

export function ThemeProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [darkMode, setDarkMode] =
    useState(false);

  useEffect(() => {
    const saved =
      localStorage.getItem("darkMode");

    if (saved) {
      setDarkMode(
        JSON.parse(saved)
      );
    }
  }, []);

  useEffect(() => {
    localStorage.setItem(
      "darkMode",
      JSON.stringify(darkMode)
    );
  }, [darkMode]);

  const toggleDarkMode = () =>
    setDarkMode((prev) => !prev);

  return (
    <ThemeContext.Provider
      value={{
        darkMode,
        toggleDarkMode,
      }}
    >
      <div
        className={
          darkMode
            ? "dark bg-slate-900 min-h-screen text-white"
            : "bg-slate-50 min-h-screen"
        }
      >
        {children}
      </div>
    </ThemeContext.Provider>
  );
}

export const useTheme = () => {
  const context =
    useContext(ThemeContext);

  if (!context)
    throw new Error(
      "useTheme error"
    );

  return context;
};