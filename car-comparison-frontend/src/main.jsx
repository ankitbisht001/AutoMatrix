import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';// Importing BrowserRouter to enable client-side routing

import App from './App';// Main App component with defined routes
import './index.css';// Global styles, including Tailwind

ReactDOM.createRoot(document.getElementById('root')).render(
  <BrowserRouter>
  {/* Defining the root route to render App component */}
    <Routes>
      <Route path="/*" element={<App />} />
    </Routes>
  </BrowserRouter>
);
