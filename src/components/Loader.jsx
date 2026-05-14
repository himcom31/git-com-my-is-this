import { useEffect, useRef, useState } from "react";

/* ── CSS injected once ─────────────────────────────────────────────────────── */
const CSS = `
@import url('https://fonts.googleapis.com/css2?family=Syne:wght@700;800&family=DM+Sans:wght@300;400&display=swap');

.asl-root {
  position: fixed; inset: 0; z-index: 9999;
  background: #06060f;
  display: flex; flex-direction: column;
  align-items: center; justify-content: center;
  gap: 0;
  font-family: 'DM Sans', sans-serif;
  transition: opacity .7s ease, visibility .7s ease;
}
.asl-root.hidden { opacity: 0; visibility: hidden; pointer-events: none; }

/* ── Orbs ── */
.asl-orb {
  position: absolute; border-radius: 50%;
  filter: blur(90px); pointer-events: none;
  animation: aslOrb ease-in-out infinite alternate;
}
.asl-orb1 { width:500px;height:500px;background:#4f46e5;
  top:-160px;left:-100px;opacity:.2;animation-duration:12s; }
.asl-orb2 { width:380px;height:380px;background:#e040fb;
  bottom:-80px;right:-60px;opacity:.18;animation-duration:9s;animation-delay:-4s; }
.asl-orb3 { width:280px;height:280px;background:#00e5ff;
  bottom:10%;left:20%;opacity:.10;animation-duration:14s;animation-delay:-7s; }

@keyframes aslOrb {
  0%   { transform: translate(0,0) scale(1); }
  50%  { transform: translate(25px,-30px) scale(1.08); }
  100% { transform: translate(-20px,20px) scale(.94); }
}

/* ── Grid lines ── */
.asl-grid {
  position: absolute; inset: 0; pointer-events: none;
  background-image:
    linear-gradient(rgba(108,99,255,.06) 1px, transparent 1px),
    linear-gradient(90deg, rgba(108,99,255,.06) 1px, transparent 1px);
  background-size: 60px 60px;
  animation: aslGridMove 18s linear infinite;
}
@keyframes aslGridMove { to { background-position: 60px 60px; } }

/* ── Stars canvas ── */
.asl-stars { position: absolute; inset: 0; pointer-events: none; }

/* ── Scan line ── */
.asl-scan {
  position: absolute; left:0; right:0; height:2px; pointer-events:none;
  background: linear-gradient(90deg,transparent,rgba(108,99,255,.6),rgba(232,64,251,.5),transparent);
  animation: aslScan 5s linear infinite;
}
@keyframes aslScan {
  0%   { top:-2px; opacity:0; }
  5%   { opacity:1; }
  95%  { opacity:1; }
  100% { top:100%; opacity:0; }
}

/* ── Particles ── */
.asl-particles { position:absolute; inset:0; pointer-events:none; overflow:hidden; }
.asl-particle  {
  position:absolute; border-radius:50%; opacity:0;
  animation: aslFloat linear infinite;
}
@keyframes aslFloat {
  0%   { transform:translateY(0) scale(1); opacity:0; }
  10%  { opacity:.7; }
  90%  { opacity:.3; }
  100% { transform:translateY(-380px) scale(.3); opacity:0; }
}

/* ── Content ── */
.asl-content {
  position: relative; z-index: 2;
  display: flex; flex-direction: column; align-items: center; gap: 0;
}

/* ── Ring spinner ── */
.asl-ring-wrap {
  position: relative;
  width: 130px; height: 130px;
  margin-bottom: 36px;
  animation: aslRingEnter .8s ease both;
}
@keyframes aslRingEnter {
  from { opacity:0; transform:scale(.6) rotate(-30deg); }
  to   { opacity:1; transform:scale(1) rotate(0deg); }
}

.asl-ring {
  position: absolute; inset: 0;
  border-radius: 50%;
  border: 2px solid transparent;
}
.asl-ring1 {
  border-top-color: #6C63FF;
  border-right-color: rgba(108,99,255,.3);
  animation: aslSpin 1.6s linear infinite;
  filter: drop-shadow(0 0 8px rgba(108,99,255,.7));
}
.asl-ring2 {
  inset: 10px;
  border-bottom-color: #e040fb;
  border-left-color: rgba(224,64,251,.3);
  animation: aslSpin 1.1s linear infinite reverse;
  filter: drop-shadow(0 0 6px rgba(224,64,251,.6));
}
.asl-ring3 {
  inset: 20px;
  border-top-color: #00e5ff;
  border-right-color: rgba(0,229,255,.25);
  animation: aslSpin 2s linear infinite;
  filter: drop-shadow(0 0 5px rgba(0,229,255,.5));
}
@keyframes aslSpin { to { transform:rotate(360deg); } }

/* ── Logo inside ring ── */
.asl-logo-wrap {
  position: absolute; inset: 0;
  display: flex; align-items: center; justify-content: center;
}
.asl-logo {
  font-family: 'Syne', sans-serif;
  font-size: 30px; font-weight: 800;
  background: linear-gradient(135deg, #6C63FF 0%, #e040fb 50%, #00e5ff 100%);
  -webkit-background-clip: text; -webkit-text-fill-color: transparent;
  background-clip: text;
  letter-spacing: -1px;
  animation: aslLogoPulse 2.5s ease-in-out infinite alternate;
}
@keyframes aslLogoPulse {
  0%   { filter: brightness(1); }
  100% { filter: brightness(1.4) drop-shadow(0 0 14px rgba(108,99,255,.9)); }
}

/* ── Tagline ── */
.asl-tagline {
  font-size: 11px; letter-spacing: .22em; text-transform: uppercase;
  color: rgba(255,255,255,.3); font-weight: 300;
  margin-bottom: 28px;
  animation: aslFadeUp .8s .3s ease both;
}

/* ── Progress bar ── */
.asl-bar-wrap {
  width: 200px; position: relative;
  animation: aslFadeUp .8s .5s ease both;
}
.asl-bar-track {
  width: 100%; height: 2px;
  background: rgba(255,255,255,.08);
  border-radius: 99px; overflow: hidden;
  position: relative;
}
.asl-bar-fill {
  height: 100%; border-radius: 99px;
  background: linear-gradient(90deg, #6C63FF, #e040fb, #00e5ff);
  background-size: 200% 100%;
  animation: aslBarShift 1.5s linear infinite;
  transition: width .12s ease;
  box-shadow: 0 0 10px rgba(108,99,255,.7);
}
@keyframes aslBarShift {
  0%   { background-position: 0% 0%; }
  100% { background-position: 200% 0%; }
}

/* ── Shimmer on track ── */
.asl-bar-track::after {
  content: '';
  position: absolute; inset: 0;
  background: linear-gradient(90deg,transparent 0%,rgba(255,255,255,.12) 50%,transparent 100%);
  background-size: 60% 100%;
  animation: aslShimmer 1.8s linear infinite;
}
@keyframes aslShimmer { to { background-position: 200% 0; } }

/* ── Percent label ── */
.asl-pct {
  margin-top: 10px; text-align: center;
  font-size: 11px; letter-spacing: .15em;
  color: rgba(255,255,255,.28);
  font-variant-numeric: tabular-nums;
  font-family: 'DM Sans', monospace;
}

/* ── Dots ── */
.asl-dots {
  display: flex; gap: 6px; margin-top: 22px;
  animation: aslFadeUp .8s .7s ease both;
}
.asl-dot {
  width: 5px; height: 5px; border-radius: 50%;
  background: rgba(255,255,255,.18);
  animation: aslDot 1.4s ease-in-out infinite;
}
.asl-dot:nth-child(2) { animation-delay: .2s; }
.asl-dot:nth-child(3) { animation-delay: .4s; }
@keyframes aslDot {
  0%,100% { transform:scale(1); background:rgba(255,255,255,.18); }
  50%     { transform:scale(1.5); background:#6C63FF;
            box-shadow: 0 0 8px rgba(108,99,255,.8); }
}

@keyframes aslFadeUp {
  from { opacity:0; transform:translateY(14px); }
  to   { opacity:1; transform:translateY(0); }
}
`;

const COLORS = ["#6C63FF","#e040fb","#00e5ff","#f9a825","#fff"];

export default function Loader({ hidden }) {
  const canvasRef    = useRef(null);
  const rafRef       = useRef(null);
  const starsRef     = useRef([]);
  const particlesRef = useRef(null);
  const [pct, setPct]     = useState(0);
  const [width, setWidth] = useState(0);

  /* inject CSS */
  useEffect(() => {
    if (document.getElementById("asl-css")) return;
    const s = document.createElement("style");
    s.id = "asl-css"; s.textContent = CSS;
    document.head.appendChild(s);
  }, []);

  /* animated progress */
  useEffect(() => {
    if (hidden) return;
    let v = 0;
    const tick = () => {
      /* fast at first, slow near 90, never quite reaches 100 until hidden */
      const step = v < 60 ? 1.4 : v < 85 ? 0.5 : 0.12;
      v = Math.min(v + step, 92);
      setPct(Math.round(v));
      setWidth(v);
    };
    const id = setInterval(tick, 40);
    return () => clearInterval(id);
  }, [hidden]);

  /* jump to 100 when hidden */
  useEffect(() => {
    if (hidden) { setPct(100); setWidth(100); }
  }, [hidden]);

  /* stars */
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    const resize = () => { canvas.width = canvas.offsetWidth; canvas.height = canvas.offsetHeight; };
    resize();
    window.addEventListener("resize", resize);

    starsRef.current = Array.from({ length: 100 }, () => ({
      x: Math.random(), y: Math.random(),
      r: Math.random() * 1.2 + .25,
      speed: Math.random() * .013 + .004,
      phase: Math.random() * Math.PI * 2,
    }));

    let t = 0;
    const draw = () => {
      t += 1;
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      starsRef.current.forEach(s => {
        const a = .12 + .7 * Math.abs(Math.sin(s.phase + t * s.speed));
        ctx.beginPath();
        ctx.arc(s.x * canvas.width, s.y * canvas.height, s.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255,255,255,${a})`;
        ctx.fill();
      });
      rafRef.current = requestAnimationFrame(draw);
    };
    rafRef.current = requestAnimationFrame(draw);
    return () => { cancelAnimationFrame(rafRef.current); window.removeEventListener("resize", resize); };
  }, []);

  /* particles */
  useEffect(() => {
    const el = particlesRef.current;
    if (!el) return;
    el.innerHTML = "";
    for (let i = 0; i < 22; i++) {
      const p = document.createElement("div");
      p.className = "asl-particle";
      const sz = Math.random() * 4 + 2;
      Object.assign(p.style, {
        width: `${sz}px`, height: `${sz}px`,
        background: COLORS[Math.floor(Math.random() * COLORS.length)],
        left: `${Math.random() * 100}%`,
        bottom: `${Math.random() * 30}px`,
        animationDuration: `${Math.random() * 9 + 5}s`,
        animationDelay:    `${Math.random() * 9}s`,
        filter: `blur(${Math.random()}px)`,
      });
      el.appendChild(p);
    }
  }, []);

  return (
    <div className={`asl-root${hidden ? " hidden" : ""}`}>
      {/* bg fx */}
      <div className="asl-orb asl-orb1" />
      <div className="asl-orb asl-orb2" />
      <div className="asl-orb asl-orb3" />
      <div className="asl-grid" />
      <div className="asl-scan" />
      <canvas ref={canvasRef} className="asl-stars" />
      <div ref={particlesRef} className="asl-particles" />

      {/* content */}
      <div className="asl-content">

        {/* triple-ring spinner with logo */}
        <div className="asl-ring-wrap">
          <div className="asl-ring asl-ring1" />
          <div className="asl-ring asl-ring2" />
          <div className="asl-ring asl-ring3" />
          <div className="asl-logo-wrap">
            <span className="asl-logo">&amp; S</span>
          </div>
        </div>

        {/* tagline */}
        <p className="asl-tagline">Engineering what's next</p>

        {/* progress bar */}
        <div className="asl-bar-wrap">
          <div className="asl-bar-track">
            <div className="asl-bar-fill" style={{ width: `${width}%` }} />
          </div>
          <p className="asl-pct">{pct}%</p>
        </div>

        {/* bouncing dots */}
        <div className="asl-dots">
          <div className="asl-dot" />
          <div className="asl-dot" />
          <div className="asl-dot" />
        </div>
      </div>
    </div>
  );
}