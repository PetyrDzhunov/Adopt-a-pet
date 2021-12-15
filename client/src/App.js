import React from 'react'
import { Routes, Route } from 'react-router-dom';
import Authentication from './containers/AuthenticationPage';
import CatsPage from './containers/CatsPage';
import DogsPage from './containers/DogsPage';
import HomePage from './containers/HomePage';
import CreateAnimalPage from './containers/CreateAnimalPage';
import useAuth from './hooks/useAuth';

const App = () => {
  const isLoggedIn = useAuth();

  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/cats" element={<CatsPage />} />
      <Route path="/dogs" element={<DogsPage />} />
      {!isLoggedIn && <Route path="/authenticate" element={<Authentication />} />}
      {isLoggedIn && <Route path="/create-animal" element={<CreateAnimalPage />} />}
    </Routes>
  );
};

export default App;

