import React, { createContext, useState, useEffect } from 'react';

export const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState('white');

  useEffect(() => {
    const currentHour = new Date().getHours();
    if (currentHour >= 18 || currentHour < 6) {
      setTheme('black');
    } else {
      setTheme('white');
    }
  }, []);

  const changeColor = () => {
    setTheme(prevTheme => (prevTheme === 'white' ? 'black' : 'white'));
  };

    return (
    <ThemeContext.Provider value={{ theme, changeColor }}>
      {children}
    </ThemeContext.Provider>
  );
};