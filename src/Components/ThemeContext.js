import React, { createContext, useState, useEffect } from 'react';

export const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState('white');

  // Automatic theme switching based on the time of day
  useEffect(() => {
    const currentHour = new Date().getHours();
    if (currentHour >= 18 || currentHour < 6) {
      setTheme('black');
    } else {
      setTheme('white');
    }
  }, []);

  // Function to manually toggle the theme
  const changeColor = () => {
    setTheme(prevTheme => (prevTheme === 'white' ? 'black' : 'white'));
  };

    return (
    <ThemeContext.Provider value={{ theme, changeColor }}>
      {children}
    </ThemeContext.Provider>
  );
};