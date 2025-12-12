import { jsx as _jsx } from "react/jsx-runtime";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { createRoot } from 'react-dom/client';
import { Todo } from './Todo';
import React from 'react';
createRoot(document.getElementById('root')).render(_jsx(React.StrictMode, { children: _jsx(Router, { children: _jsx(Routes, { children: _jsx(Route, { path: "*", element: _jsx(Todo, {}) }) }) }) }));
