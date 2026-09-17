import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';

// Impor CSS global (reset CSS, variabel warna, font global)
import './index.css';

// Menghubungkan React ke elemen <div id="root"></div> di index.html
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);