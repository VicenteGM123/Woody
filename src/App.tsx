import React from "react";
import "./App.css";
import { HashRouter, Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import Home from "./pages/Home";
import Train from "./pages/Train";

function App() {
  return (
    <HashRouter>
      <Routes>
        <Route path="" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="train" element={<Train />} />
        </Route>
      </Routes>
    </HashRouter>
  );
}

export default App;
