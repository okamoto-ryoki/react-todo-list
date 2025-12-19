import { StrictMode } from 'react'
import { BrowserRouter as Router, Routes, Route, Navigate, Outlet } from 'react-router-dom';
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { Todo } from './Todo.tsx';
import React from 'react';
import "react-datepicker/dist/react-datepicker.css";


createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Router>
      <Routes>
        <Route path="*" element={<App />} />
        <Route path="/todo" element={<Todo />} />
      </Routes>
    </Router>
  </React.StrictMode>
);
