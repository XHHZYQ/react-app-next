"use client"
import { useState, useContext, createContext } from 'react';

const ThemeContext = createContext();

const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState('light');
  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};


const ThemeButton = () => {
  const { theme, setTheme } = useContext(ThemeContext);

  return (
    <button
      onClick={() => {
        setTheme(theme === 'light' ? 'dark' : 'light');
      }}
      className={`btn-${theme}`}
    >
      {theme === 'light' ? 'Dark' : 'Light'}
    </button>
  );
};

export default function () {
  return (
    <ThemeProvider>
      <div>
        <div>
          <ThemeButton />
        </div>
      </div>
    </ThemeProvider>
  );
}