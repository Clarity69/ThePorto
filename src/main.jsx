import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import ThemeProvider from './context/ThemeProvider.jsx';
import { IconContext } from 'react-icons';

// CSS global (reset, CSS variables tema, font)
import './index.css';

// ThemeProvider membungkus App → semua komponen di dalamnya bisa memakai useTheme()
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
      <ThemeProvider>
      {/* Semua ikon dianggap dekoratif → disembunyikan dari screen reader */}
      <IconContext.Provider value={{ attr: { 'aria-hidden': 'true' } }}>
        <App />
      </IconContext.Provider>
    </ThemeProvider>
  </React.StrictMode>
);
