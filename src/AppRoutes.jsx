import React from "react";
import { Routes, Route } from "react-router-dom";

import { Home, ItemDetails } from "./page";

const AppRoutes = () => (
  <Routes>
    <Route exact path="/" element={<Home />} />
    <Route path="/:id" element={<ItemDetails />} />
  </Routes>
);

export default AppRoutes;
