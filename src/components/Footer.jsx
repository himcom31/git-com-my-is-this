import { useEffect, useRef } from "react";
import { Link } from "react-router-dom";

// ── Inline icon paths (no external dep needed) ──────────────────────────────
const Icons = {
  twitter:
    "M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.744l7.73-8.835L1.254 2.25H8.08l4.253 5.622zm-1.161 17.52h1.833L7.084 4.126H5.117z",
  linkedin:
    "M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z",
  github:
    "M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12",
};

const SOCIAL = [
  { key: "twitter",  href: "#", label: "Twitter / X",  d: Icons.twitter  },
  { key: "linkedin", href: "#", label: "LinkedIn",      d: Icons.linkedin },
  { key: "github",   href: "#", label: "GitHub",        d: Icons.github   },
];

const SERVICES = [
  "Website Development",
  "Software Development",
  "AI Automation",
  "AI Agents",
  "Graphic Design",
];

const COMPANY = ["About Us", "Portfolio", "Pricing", "Contact", "Blog"];
const LEGAL   = ["Privacy Policy", "Terms of Service", "Cookie Policy", "Disclaimer"];

const PARTICLE_COLORS = ["#6C63FF", "#ff6fd8", "#43e7ad", "#f9a825", "#ffffff"];

// ── CSS injected once ────────────────────────────────────────────────────────
const CSS = `
@import url('https://fonts.googleapis.com/css2?family=Syne:wght@700;800&family=DM+Sans:wght@300;400;500&display=swap');

.as-footer {
  position: relative;
  overflow: hidden;
  background: #060612;
  padding: 70px 5% 32px;
  font-family: 'DM Sans', sans-serif;
}

/* ── Aurora orbs ── */
.as-orb {
  position: absolute;
  border-radius: 50%;
  filter: blur(80px);
  pointer-events: none;
}
.as-orb1 { width:420px;height:420px;background:#6C63FF;top:-120px;left:-80px;opacity:.18;
  animation: asOrb 14s ease-in-out infinite alternate; }
.as-orb2 { width:300px;height:300px;background:#ff6fd8;top:40px;right:10%;opacity:.18;
  animation: asOrb 11s ease-in-out infinite alternate; animation-delay:-4s; }
.as-orb3 { width:260px;height:260px;background:#43e7ad;bottom:-60px;left:35%;opacity:.12;
  animation: asOrb 16s ease-in-out infinite alternate; animation-delay:-7s; }
.as-orb4 { width:200px;height:200px;background:#f9a825;bottom:0;right:0;opacity:.10;
  animation: asOrb 10s ease-in-out infinite alternate; animation-delay:-2s; }

@keyframes asOrb {
  0%   { transform: translate(0,0) scale(1); }
  33%  { transform: translate(30px,-20px) scale(1.08); }
  66%  { transform: translate(-20px,30px) scale(0.95); }
  100% { transform: translate(15px,-10px) scale(1.05); }
}

/* ── Animated grid ── */
.as-grid {
  position: absolute; inset: 0; pointer-events: none;
  background-image:
    linear-gradient(rgba(108,99,255,.07) 1px, transparent 1px),
    linear-gradient(90deg, rgba(108,99,255,.07) 1px, transparent 1px);
  background-size: 60px 60px;
  animation: asGrid 20s linear infinite;
}
@keyframes asGrid {
  to { background-position: 60px 60px; }
}

/* ── Scan line ── */
.as-scan {
  position: absolute; left: 0; right: 0; height: 2px; pointer-events: none; z-index: 1;
  background: linear-gradient(90deg,transparent,rgba(108,99,255,.55),rgba(255,111,216,.45),transparent);
  animation: asScan 6s linear infinite;
}
@keyframes asScan {
  0%   { top: -2px; opacity: 0; }
  5%   { opacity: 1; }
  95%  { opacity: 1; }
  100% { top: 100%; opacity: 0; }
}

/* ── Top glow ── */
.as-topglow {
  position: absolute; top: 0; left: 0; right: 0; height: 1px; pointer-events: none;
  background: linear-gradient(90deg,transparent 0%,#6C63FF 30%,#ff6fd8 60%,transparent 100%);
  animation: asGlow 3s ease-in-out infinite alternate;
}
@keyframes asGlow {
  0%   { opacity: .5; }
  100% { opacity: 1; box-shadow: 0 0 20px rgba(108,99,255,.6); }
}

/* ── Stars canvas ── */
.as-stars { position: absolute; inset: 0; pointer-events: none; }

/* ── Particles wrapper ── */
.as-particles { position: absolute; inset: 0; pointer-events: none; overflow: hidden; }
.as-particle {
  position: absolute; border-radius: 50%; opacity: 0;
  animation: asFloat linear infinite;
}
@keyframes asFloat {
  0%   { transform: translateY(0) scale(1); opacity: 0; }
  10%  { opacity: .6; }
  90%  { opacity: .3; }
  100% { transform: translateY(-320px) scale(.4); opacity: 0; }
}

/* ── Inner layout ── */
.as-inner { position: relative; z-index: 2; max-width: 1200px; margin: 0 auto; }

.as-grid-cols {
  display: grid;
  grid-template-columns: 2fr 1fr 1fr 1fr;
  gap: 52px;
  margin-bottom: 52px;
}
@media (max-width: 900px) {
  .as-grid-cols { grid-template-columns: 1fr 1fr; gap: 36px; }
  .as-brand-col { grid-column: 1 / -1; }
}
@media (max-width: 520px) {
  .as-grid-cols { grid-template-columns: 1fr; }
}

/* ── Brand ── */
.as-logo {
  font-family: 'Syne', sans-serif;
  font-size: 34px; font-weight: 800;
  background: linear-gradient(135deg, #6C63FF 0%, #ff6fd8 50%, #43e7ad 100%);
  -webkit-background-clip: text; -webkit-text-fill-color: transparent;
  background-clip: text;
  display: inline-block;
  letter-spacing: -0.5px;
  animation: asLogoPulse 4s ease-in-out infinite alternate;
}
@keyframes asLogoPulse {
  0%   { filter: brightness(1); }
  100% { filter: brightness(1.35) drop-shadow(0 0 16px rgba(108,99,255,.75)); }
}

.as-tagline {
  color: rgba(255,255,255,.48);
  font-size: 13.5px; line-height: 1.78;
  margin-top: 14px; max-width: 268px; font-weight: 300;
}

/* ── Social row ── */
.as-socials { display: flex; gap: 10px; margin-top: 22px; }
.as-social {
  width: 38px; height: 38px; border-radius: 50%;
  border: 1px solid rgba(255,255,255,.15);
  display: flex; align-items: center; justify-content: center;
  cursor: pointer; color: rgba(255,255,255,.42);
  text-decoration: none;
  transition: transform .35s cubic-bezier(.34,1.56,.64,1),
              box-shadow .35s ease, border-color .3s ease, color .3s ease;
  position: relative; overflow: hidden;
}
.as-social::before {
  content: '';
  position: absolute; inset: 0; border-radius: 50%;
  background: linear-gradient(135deg,#6C63FF,#ff6fd8);
  opacity: 0; transition: opacity .3s ease; z-index: 0;
}
.as-social:hover::before { opacity: 1; }
.as-social:hover {
  border-color: transparent; color: #fff;
  transform: translateY(-4px) scale(1.12);
  box-shadow: 0 8px 26px rgba(108,99,255,.52);
}
.as-social svg { position: relative; z-index: 1; }

/* ── Column heading ── */
.as-col-head {
  font-family: 'Syne', sans-serif;
  font-size: 11px; font-weight: 700;
  letter-spacing: .12em; text-transform: uppercase;
  color: rgba(255,255,255,.32);
  margin-bottom: 20px;
  padding-bottom: 10px; position: relative;
}
.as-col-head::after {
  content: '';
  position: absolute; bottom: 0; left: 0;
  height: 1.5px; width: 0;
  background: linear-gradient(90deg,#6C63FF,#ff6fd8);
  border-radius: 2px;
  animation: asLineGrow 1.2s .4s ease forwards;
}
@keyframes asLineGrow { to { width: 24px; } }

/* ── Links ── */
.as-links { list-style: none; padding: 0; margin: 0; display: flex; flex-direction: column; gap: 10px; }
.as-links li a {
  color: rgba(255,255,255,.42);
  text-decoration: none; font-size: 13.5px; font-weight: 400;
  display: inline-flex; align-items: center; gap: 0;
  transition: color .25s ease, gap .25s ease, padding-left .25s ease;
  position: relative;
}
.as-links li a::before {
  content: '';
  display: inline-block; width: 0; height: 1.5px;
  background: linear-gradient(90deg,#6C63FF,#ff6fd8);
  transition: width .3s ease; flex-shrink: 0;
  margin-right: 0; border-radius: 2px;
  vertical-align: middle; transform: translateY(-0.5px);
}
.as-links li a:hover { color: #fff; padding-left: 6px; }
.as-links li a:hover::before { width: 10px; margin-right: 6px; }

/* ── Bottom bar ── */
.as-bottom {
  border-top: 1px solid rgba(255,255,255,.07);
  padding-top: 24px;
  display: flex; align-items: center; justify-content: space-between; flex-wrap: wrap; gap: 12px;
}
.as-copy, .as-love {
  font-size: 12.5px; color: rgba(255,255,255,.25);
  margin: 0;
}
.as-love { display: flex; align-items: center; gap: 5px; }
.as-heart {
  display: inline-block; color: #ff6fd8;
  animation: asHeart 1.4s ease-in-out infinite;
}
@keyframes asHeart {
  0%,100% { transform: scale(1); }
  14%     { transform: scale(1.28); }
  28%     { transform: scale(1); }
  42%     { transform: scale(1.18); }
  70%     { transform: scale(1); }
}

/* ── Entrance animations ── */
.as-col-enter {
  animation: asFadeUp .7s ease both;
}
.as-col-enter:nth-child(1) { animation-delay: .05s; }
.as-col-enter:nth-child(2) { animation-delay: .15s; }
.as-col-enter:nth-child(3) { animation-delay: .25s; }
.as-col-enter:nth-child(4) { animation-delay: .35s; }
.as-bottom-enter { animation: asFadeUp .7s .45s ease both; }

@keyframes asFadeUp {
  from { opacity: 0; transform: translateY(24px); }
  to   { opacity: 1; transform: translateY(0); }
}
`;

// ── Component ────────────────────────────────────────────────────────────────
export default function Footer() {
  const canvasRef    = useRef(null);
  const starsRef     = useRef([]);
  const rafRef       = useRef(null);
  const particlesRef = useRef(null);

  // Inject CSS once
  useEffect(() => {
    if (document.getElementById("as-footer-css")) return;
    const tag = document.createElement("style");
    tag.id = "as-footer-css";
    tag.textContent = CSS;
    document.head.appendChild(tag);
  }, []);

  // Stars canvas
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");

    const resize = () => {
      canvas.width  = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
    };
    resize();
    window.addEventListener("resize", resize);

    starsRef.current = Array.from({ length: 90 }, () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      r: Math.random() * 1.3 + 0.25,
      speed: Math.random() * 0.013 + 0.004,
      phase: Math.random() * Math.PI * 2,
    }));

    const draw = (t) => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      starsRef.current.forEach((s) => {
        const a = 0.15 + 0.65 * Math.abs(Math.sin(s.phase + t * s.speed));
        ctx.beginPath();
        ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255,255,255,${a})`;
        ctx.fill();
      });
      rafRef.current = requestAnimationFrame(draw);
    };
    rafRef.current = requestAnimationFrame(draw);

    return () => {
      cancelAnimationFrame(rafRef.current);
      window.removeEventListener("resize", resize);
    };
  }, []);

  // Floating particles
  useEffect(() => {
    const container = particlesRef.current;
    if (!container) return;
    container.innerHTML = "";

    for (let i = 0; i < 20; i++) {
      const el   = document.createElement("div");
      el.className = "as-particle";
      const size  = Math.random() * 4 + 2;
      const color = PARTICLE_COLORS[Math.floor(Math.random() * PARTICLE_COLORS.length)];
      Object.assign(el.style, {
        width:            `${size}px`,
        height:           `${size}px`,
        background:       color,
        left:             `${Math.random() * 100}%`,
        bottom:           `${Math.random() * 40}px`,
        animationDuration:`${Math.random() * 9 + 5}s`,
        animationDelay:   `${Math.random() * 9}s`,
        filter:           `blur(${Math.random() * 1}px)`,
      });
      container.appendChild(el);
    }
  }, []);

  return (
    <footer className="as-footer">
      {/* Top glow border */}
      <div className="as-topglow" />

      {/* Aurora blobs */}
      <div className="as-orb as-orb1" />
      <div className="as-orb as-orb2" />
      <div className="as-orb as-orb3" />
      <div className="as-orb as-orb4" />

      {/* Grid */}
      <div className="as-grid" />

      {/* Scan line */}
      <div className="as-scan" />

      {/* Twinkling stars */}
      <canvas ref={canvasRef} className="as-stars" />

      {/* Floating particles */}
      <div ref={particlesRef} className="as-particles" />

      {/* ── Content ── */}
      <div className="as-inner">
        <div className="as-grid-cols">

          {/* Brand */}
          <div className="as-brand-col as-col-enter">
            <div className="as-logo">&amp; S</div>
            <p className="as-tagline">
              Building future-ready digital solutions. From websites and software
              to AI — we engineer what's next.
            </p>
            <div className="as-socials">
              {SOCIAL.map(({ key, href, label, d }) => (
                <a key={key} href={href} aria-label={label} className="as-social">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                    <path d={d} />
                  </svg>
                </a>
              ))}
            </div>
          </div>

          {/* Services */}
          <div className="as-col-enter">
            <div className="as-col-head">Services</div>
            <ul className="as-links">
              {SERVICES.map((s) => (
                <li key={s}>
                  <a href="#services">{s}</a>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div className="as-col-enter">
            <div className="as-col-head">Company</div>
            <ul className="as-links">
              {COMPANY.map((s) => (
                <li key={s}>
                  <a href={`#${s.toLowerCase().replace(/\s+/g, "")}`}>{s}</a>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal */}
          <div className="as-col-enter">
            <div className="as-col-head">Legal</div>
            <ul className="as-links">
              {LEGAL.map((s) => (
                <li key={s}>
                  <Link to="/page/policy">{s}</Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="as-bottom as-bottom-enter">
          <p className="as-copy">
            © {new Date().getFullYear()} &amp; S Digital. All rights reserved.
          </p>
          <p className="as-love">
            Built with <span className="as-heart">♥</span> for the future
          </p>
        </div>
      </div>
    </footer>
  );
}