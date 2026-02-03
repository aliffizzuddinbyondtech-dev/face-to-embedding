import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import App from "./App";
import ExtractPage from "./pages/ExtractPage";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/extract" element={<ExtractPage />} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);
