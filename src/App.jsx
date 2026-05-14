import { useState, useEffect } from "react";
import { useScrollAnimation } from "./hooks";
import { Routes, Route, useLocation } from "react-router-dom";

import Loader from "./components/Loader";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import About from "./components/About";
import Services from "./components/Services";
import Portfolio from "./components/Portfolio";
import Features from "./components/Features";
import Testimonials from "./components/Testimonials";
import Contact from "./components/Contact";
import Footer from "./components/Footer";
import OurTeam from "./components/Ourteam";
import WebDevLearnMore from "./LearnMore/Website";
import SoftwareDevLearnMore from "./LearnMore/Softwere";
import AIAutomationLearnMore from "./LearnMore/AIAutomationLearnMore";
import GraphicDesignLearnMore from "./LearnMore/GraphicDesignLearnMore";
import PrivacyPolicy from "./components/Previcypolicy";


function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    // Har baar jab path badlega, page top par chala jayega
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}

export default function App() {
  const [theme, setTheme] = useState("dark");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const t = setTimeout(() => setLoading(false), 2000);
    return () => clearTimeout(t);
  }, []);

  useEffect(() => {
    document.documentElement.className = theme === "light" ? "light" : "";
  }, [theme]);

  useScrollAnimation();

  // Home page ke liye ek alag component ya function bana sakte hain
  const HomePage = () => (
    <>
      <Hero />
      <About />
      <Services />
      {/* <Portfolio /> */}
      <Features />
      <Testimonials />
      <Contact />
    </>
  );



  return (
    <div className={theme === "light" ? "light" : ""}>
      <Loader hidden={!loading} />
      <ScrollToTop />
      {/* Navbar aur Footer hamesha dikhenge */}
      <Navbar theme={theme} toggleTheme={() => setTheme((t) => (t === "dark" ? "light" : "dark"))} />

      <main>
        <Routes>
          {/* Main Home Route */}
          <Route path="/" element={<HomePage />} />
          <Route path="/learn/website" element={<WebDevLearnMore />} />
          <Route path="/learn/software" element={<SoftwareDevLearnMore />} />
          <Route path="/learn/aiautomation" element={<AIAutomationLearnMore />} />
          <Route path="/learn/graphic" element={<GraphicDesignLearnMore />} />
          <Route path="/page/policy" element={<PrivacyPolicy />} />



          <Route path="/page/contect" element={<Contact />} />



          {/* Our Team Route */}
          <Route path="/our-team" element={<OurTeam />} />
        </Routes>
      </main>

      <Footer />
    </div>
  );
}