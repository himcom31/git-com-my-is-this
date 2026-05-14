import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
// HashLink ko import karein
import { HashLink } from 'react-router-hash-link';

const LINKS = ["About", "Services", "Portfolio", "Contact"];

export default function Navbar({ theme, toggleTheme }) {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-[1000] h-[85px] flex items-center px-[5%]
          transition-all duration-700 ease-in-out
          ${scrolled
            ? "bg-black/40 backdrop-blur-xl py-2 border-b border-white/5 shadow-[0_10px_30px_-10px_rgba(0,0,0,0.5)]"
            : "bg-transparent py-4"}`}
      >
        <div className="w-full max-w-[1400px] mx-auto flex items-center justify-between">

          {/* Logo */}
          <Link to="/" className="group cursor-pointer relative">
            <div className="font-display text-3xl font-black tracking-tighter text-white transition-all duration-500 group-hover:tracking-widest group-hover:drop-shadow-[0_0_15px_rgba(108,99,255,0.8)]">
              <span className="grad-text">&S .com</span>
            </div>
            <div className={`absolute -right-2 top-1 w-1.5 h-1.5 rounded-full grad-bg transition-opacity duration-500 ${scrolled ? "opacity-100 animate-pulse" : "opacity-0"}`} />
          </Link>

          {/* Desktop Links */}
          <ul className="hidden md:flex gap-12 list-none items-center">
            {LINKS.map((l) => (
              <li key={l} className="relative group overflow-hidden">
                {/* Yaha HashLink use kiya hai smooth scroll ke liye */}
                <HashLink
                  smooth
                  to={`/#${l.toLowerCase()}`}
                  className="block text-purple-500/70 text-xs font-bold uppercase tracking-[0.2em]
                    transition-all duration-300 group-hover:text-pink-500/80 group-hover:-translate-y-1"
                >
                  {l}
                </HashLink>
                <span className="absolute bottom-0 left-0 w-full h-[2px] bg-white/10 scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-right group-hover:origin-left" />
                <span className="absolute bottom-0 left-0 w-full h-[2px] grad-bg scale-x-0 group-hover:scale-x-100 transition-transform duration-700 delay-75 origin-right group-hover:origin-left" />
              </li>
            ))}

            <li className="relative group overflow-hidden">
              <Link
                to="/our-team"
                className="block text-purple-500/70 text-xs font-bold uppercase tracking-[0.2em]
                  transition-all duration-300 group-hover:text-pink-500/80 group-hover:-translate-y-1"
              >
                Our Team
              </Link>
              <span className="absolute bottom-0 left-0 w-full h-[2px] bg-white/10 scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-right group-hover:origin-left" />
              <span className="absolute bottom-0 left-0 w-full h-[2px] grad-bg scale-x-0 group-hover:scale-x-100 transition-transform duration-700 delay-75 origin-right group-hover:origin-left" />
            </li>
          </ul>

          <div className="flex items-center gap-6">
            <HashLink
              smooth
              to="/#contact"
              className="hidden md:flex relative group items-center px-8 py-3 rounded-full overflow-hidden"
            >
              <div className="absolute inset-0 grad-bg transition-transform duration-500 group-hover:scale-110" />
              <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-500" />
              <span className="relative text-white text-xs font-black uppercase tracking-widest">
                Get Started
              </span>
            </HashLink>

            <button
              className="md:hidden relative w-10 h-10 flex flex-col justify-center items-center gap-1.5 z-[1001]"
              onClick={() => setMenuOpen(!menuOpen)}
            >
              <span className={`h-[2px] bg-purple-500 transition-all duration-500 ${menuOpen ? "w-6 rotate-45 translate-y-2" : "w-6"}`} />
              <span className={`h-[2px] bg-purple-500 transition-all duration-500 ${menuOpen ? "opacity-0" : "w-4 self-end"}`} />
              <span className={`h-[2px] bg-purple-500 transition-all duration-500 ${menuOpen ? "w-6 -rotate-45 -translate-y-2" : "w-6"}`} />
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu */}
      <div
        className={`fixed inset-0 z-[999] bg-[#050508] transition-all duration-700 ease-in-out
          ${menuOpen ? "opacity-100 scale-100 pointer-events-auto" : "opacity-0 scale-95 pointer-events-none"}`}
      >
        <div className="relative h-full flex flex-col items-center justify-center gap-4">
          {LINKS.map((l, i) => (
            <div key={l} className="overflow-hidden">
              <HashLink
                smooth
                to={`/#${l.toLowerCase()}`}
                onClick={() => setMenuOpen(false)}
                style={{
                  transitionDelay: menuOpen ? `${400 + i * 100}ms` : "0ms",
                  transform: menuOpen ? "translateY(0)" : "translateY(100%)",
                }}
                className="block text-purple-500/50 text-5xl font-black tracking-tighter transition-all duration-700 hover:text-white hover:scale-110"
              >
                {l}
              </HashLink>
            </div>
          ))}

          <div className="overflow-hidden">
            <Link
              to="/our-team"
              onClick={() => setMenuOpen(false)}
              style={{
                transitionDelay: menuOpen ? `${400 + LINKS.length * 100}ms` : "0ms",
                transform: menuOpen ? "translateY(0)" : "translateY(100%)",
              }}
              className="block text-purple-500/50 text-5xl font-black tracking-tighter transition-all duration-700 hover:text-white hover:scale-110"
            >
              Our Team
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}