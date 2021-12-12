import React from 'react'
import { Routes, Route } from 'react-router-dom';
import CatsPage from './containers/CatsPage';
import DogsPage from './containers/DogsPage';
import HomePage from './containers/HomePage';
const App = () => {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/cats" element={<CatsPage />} />
      <Route path="/dogs" element={<DogsPage />} />
    </Routes>
  );
};

export default App;

