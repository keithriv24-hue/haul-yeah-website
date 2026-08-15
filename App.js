import React from "react";
import "@/App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "@/components/site/Layout";
import Home from "@/pages/Home";
import ServicePage from "@/pages/ServicePage";
import LocationPage from "@/pages/LocationPage";
import NotFound from "@/pages/NotFound";
import ThankYou from "@/pages/ThankYou";
import About from "@/pages/About";

export default function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Layout>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/services/:slug" element={<ServicePage />} />
            <Route path="/movers/:slug" element={<LocationPage />} />
            <Route path="/about" element={<About />} />
            {/* Conversion page. noindex + absent from sitemap.xml,
                but prerendered via EXTRA_ROUTES in scripts/prerender.js. */}
            <Route path="/thank-you" element={<ThankYou />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Layout>
      </BrowserRouter>
    </div>
  );
}
