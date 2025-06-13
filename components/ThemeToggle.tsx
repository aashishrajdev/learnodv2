"use client";

import React, { useState, useEffect } from "react";

interface ThemeToggleProps {
  onThemeChange?: (darkMode: boolean) => void;
}

const ThemeToggle: React.FC<ThemeToggleProps> = ({ onThemeChange }) => {
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    const isDark = localStorage.getItem("darkMode") === "true";
    setDarkMode(isDark);
    if (isDark) {
      document.documentElement.classList.add("dark");
    }
    // Notify parent of initial theme state
    if (onThemeChange) {
      onThemeChange(isDark);
    }
  }, [onThemeChange]);

  useEffect(() => {
    // Add transition class for smooth background and color change
    document.documentElement.classList.add("transition-colors", "duration-500");
    document.body.classList.add("transition-colors", "duration-500");
    return () => {
      document.documentElement.classList.remove(
        "transition-colors",
        "duration-500"
      );
      document.body.classList.remove("transition-colors", "duration-500");
    };
  }, []);

  const toggleDarkMode = () => {
    const newDarkMode = !darkMode;
    setDarkMode(newDarkMode);
    localStorage.setItem("darkMode", newDarkMode.toString());

    if (newDarkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }

    // Notify parent of theme change
    if (onThemeChange) {
      onThemeChange(newDarkMode);
    }
  };

  return (
    <button
      onClick={toggleDarkMode}
      className="p-2 rounded-lg bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors duration-500 focus:outline-none focus:ring-2 focus:ring-blue-400"
      aria-label="Toggle dark mode"
    >
      <span
        key={darkMode ? "light" : "dark"}
        className="inline-block transition-all duration-500 ease-in-out transform"
      >
        {darkMode ? "Light Mode" : "Dark Mode"}
      </span>
    </button>
  );
};

export default ThemeToggle;
