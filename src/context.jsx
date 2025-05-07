import { createContext, useContext, useEffect, useState } from 'react';

const AppContext = createContext();

// Check preferred/locally stored dark mode. Returns a boolean
const getInitialDarkMode = () => {
  const prefersDarkMode = window.matchMedia(
    '(prefers-color-scheme:dark)'
  ).matches;
  // Get the value of dark theme from local storage
  // Compare if it's ==='true'. Returns a boolean
  const storedDarkMode = localStorage.getItem('darkTheme') === 'true';
  console.log(localStorage.getItem('darkTheme'));
  return storedDarkMode || prefersDarkMode;
};

export const AppProvider = ({ children }) => {
  const [isDarkTheme, setIsDarkTheme] = useState(getInitialDarkMode());
  const [searchTerm, setSearchTerm] = useState('cat');

  const toggleDarkTheme = () => {
    const newDarkTheme = !isDarkTheme;
    setIsDarkTheme(newDarkTheme);
    localStorage.setItem('darkTheme', newDarkTheme);
  };

  useEffect(() => {
    document.body.classList.toggle('dark-theme', isDarkTheme); // Add class name only if 'isDarkTheme' is true
  }, [isDarkTheme]);

  return (
    <AppContext.Provider
      value={{ isDarkTheme, toggleDarkTheme, searchTerm, setSearchTerm }}
    >
      {children}
    </AppContext.Provider>
  );
};

// Custom hook
export const useGlobalContext = () => useContext(AppContext);
