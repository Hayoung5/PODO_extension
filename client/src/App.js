import React from 'react';
import Main from './pages/Main';
import Login from './pages/Login';
import { Route, Routes, Link } from "react-router-dom";

function App() {
  return (
    <Routes>
      <Route path="/*" element={<Main />} />
      <Route path="/login" element={<Login />} />
    </Routes>
  );
}

export default App;