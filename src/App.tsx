/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import { AnimatePresence } from "motion/react";
import { Layout } from "./components/Layout";
import { Home } from "./pages/Home";
import { Products } from "./pages/Products";
import { Store } from "./pages/Store";
import { About } from "./pages/About";
import { Join } from "./pages/Join";
import { LanguageProvider } from "./contexts/LanguageContext";
import { CartProvider } from "./contexts/CartContext";

function AnimatedRoutes() {
  const location = useLocation();
  return (
    <AnimatePresence mode="wait">
      <Routes location={location}>
        <Route path="/" element={<Home key={location.pathname} />} />
        <Route path="/products" element={<Products key={location.pathname} />} />
        <Route path="/store" element={<Store key={location.pathname} />} />
        <Route path="/about" element={<About key={location.pathname} />} />
        <Route path="/join" element={<Join key={location.pathname} />} />
      </Routes>
    </AnimatePresence>
  );
}

export default function App() {
  return (
    <LanguageProvider>
      <CartProvider>
        <Router>
          <Layout>
            <AnimatedRoutes />
          </Layout>
        </Router>
      </CartProvider>
    </LanguageProvider>
  );
}
