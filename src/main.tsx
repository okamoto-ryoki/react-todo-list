import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { createRoot } from 'react-dom/client'
import { Todo } from './Todo.tsx';
import React from 'react';


createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Router>
      <Routes>
        <Route path="*" element={<Todo />} />
      </Routes>
    </Router>
  </React.StrictMode>
);
