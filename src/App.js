import React, { useState, useEffect } from 'react';
import './App.css';
import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home';

function App() {
  const [theme, setTheme] = useState(() => {
    return localStorage.getItem('theme') || 'light';
  });

  useEffect(() => {
    const root = document.documentElement;
    root.classList.remove('light', 'dark');
    root.classList.add(theme);
    localStorage.setItem('theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme(t => (t === 'light' ? 'dark' : 'light'));
  };

  return (
    <Routes>
      <Route path="/" element={<Home theme={theme} toggleTheme={toggleTheme} />} />
    </Routes>
  );
}

export default App;