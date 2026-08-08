import React from "react";
import "@/App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "@/components/site/Layout";
import Home from "@/pages/Home";
import ServicePlaceholder from "@/pages/ServicePlaceholder";
import LocationPlaceholder from "@/pages/LocationPlaceholder";
import NotFound from "@/pages/NotFound";

export default function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Layout>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/services/:slug" element={<ServicePlaceholder />} />
            <Route path="/movers/:slug" element={<LocationPlaceholder />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Layout>
      </BrowserRouter>
    </div>
  );
}
