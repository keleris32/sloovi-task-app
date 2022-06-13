import React from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';

import { Home, Login, NotFoundRoute } from '../pages';
import { Layout, RequireAuth } from '../components';

function AppRoutes() {
  const location = useLocation();

  return (
    <AnimatePresence exitBeforeEnter>
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<Layout />}>
          {/* Public routes */}
          <Route path="login" element={<Login />} />

          {/* Private routes */}
          <Route element={<RequireAuth />}>
            <Route path="/" element={<Home />} />
          </Route>

          {/* catch all */}
          <Route path="*" element={<NotFoundRoute />} />
        </Route>
      </Routes>
    </AnimatePresence>
  );
}

export default AppRoutes;
