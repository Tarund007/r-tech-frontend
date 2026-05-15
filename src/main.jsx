import React, { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.jsx';
import './index.css';
import axios from 'axios';

axios.defaults.withCredentials = true; // ✅ Always send cookies with requests

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>
);
