import React from 'react'
import { Routes, Route } from 'react-router-dom';
import Authentication from './containers/AuthenticationPage';
import CatsPage from './containers/CatsPage';
import DogsPage from './containers/DogsPage';
import HomePage from './containers/HomePage';


const App = () => {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/cats" element={<CatsPage />} />
      <Route path="/dogs" element={<DogsPage />} />
      <Route path="/authenticate" element={<Authentication />} />
    </Routes>
  );
};

export default App;

