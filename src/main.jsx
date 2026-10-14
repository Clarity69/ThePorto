import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import ThemeProvider from './context/ThemeProvider.jsx';

// CSS global (reset, CSS variables tema, font)
import './index.css';

// ThemeProvider membungkus App → semua komponen di dalamnya bisa memakai useTheme()
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ThemeProvider>
      <App />
    </ThemeProvider>
  </React.StrictMode>
);
