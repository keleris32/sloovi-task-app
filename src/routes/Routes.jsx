import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import { Home, Login, NotFoundRoute } from '../pages';

function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="*" element={<NotFoundRoute />} />
      </Routes>
    </BrowserRouter>
  );
}

export default AppRoutes;
