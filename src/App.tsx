import { useEffect } from "react";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import MobileBottomBar from "@/components/MobileBottomBar";
import Index from "./pages/Index";

import Services from "./pages/Services";
import Shop from "./pages/Shop";
import Reviews from "./pages/Reviews";
import About from "./pages/About";
import Contact from "./pages/Contact";
import NotFound from "./pages/NotFound";
import Blog from "./pages/Blog";
import BlogPost from "./pages/BlogPost";
import Privacy from "./pages/Privacy";
import ServiceAreas from "./pages/ServiceAreas";
import Location from "./pages/Location";

const ScrollToTop = () => {
  const { pathname, hash } = useLocation();
  useEffect(() => {
    // Pages with a hash (e.g. /services#plumbing) handle their own scrolling.
    if (!hash) window.scrollTo({ top: 0, left: 0, behavior: "instant" as ScrollBehavior });
  }, [pathname, hash]);
  return null;
};

export const AppLayout = () => (
  <>
    <a href="#main" className="skip-link">
      Skip to main content
    </a>
    <ScrollToTop />
    <Navbar />
    <main id="main">

        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/services" element={<Services />} />
          <Route path="/shop" element={<Shop />} />
          <Route path="/reviews" element={<Reviews />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/service-areas" element={<ServiceAreas />} />
          <Route path="/service-areas/:slug" element={<Location />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="/blog/:slug" element={<BlogPost />} />
          <Route path="/privacy-policy" element={<Privacy />} />
          <Route path="*" element={<NotFound />} />
        </Routes>

    </main>
    <Footer />
    <MobileBottomBar />
  </>
);

const App = () => (
  <BrowserRouter>
    <AppLayout />
  </BrowserRouter>
);

export default App;
