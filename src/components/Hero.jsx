import { useEffect, useRef, useState } from "react";

// Inline icons
const ArrowIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M5 12h14M12 5l7 7-7 7"/>
  </svg>
);
const CheckIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="20 6 9 17 4 12"/>
  </svg>
);
const AIIcon = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="3"/><path d="M12 2v2m0 16v2M2 12h2m16 0h2m-3.07-8.93-1.41 1.41M5.48 18.52l-1.41 1.41m0-14.06 1.41 1.41m12.62 12.62 1.41 1.41"/>
  </svg>
);

// Particle canvas
function ParticleField() {
  const canvasRef = useRef(null);
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    let animId;
    const particles = [];
    const resize = () => {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
    };
    resize();
    window.addEventListener("resize", resize);
    // Fewer particles on mobile
    const count = window.innerWidth < 768 ? 40 : 80;
    for (let i = 0; i < count; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 0.4,
        vy: (Math.random() - 0.5) * 0.4,
        r: Math.random() * 1.5 + 0.5,
        alpha: Math.random() * 0.5 + 0.1,
      });
    }
    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      const connectDist = window.innerWidth < 768 ? 70 : 100;
      particles.forEach((p, i) => {
        p.x += p.vx; p.y += p.vy;
        if (p.x < 0 || p.x > canvas.width) p.vx *= -1;
        if (p.y < 0 || p.y > canvas.height) p.vy *= -1;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(108,99,255,${p.alpha})`;
        ctx.fill();
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[j].x - p.x, dy = particles[j].y - p.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < connectDist) {
            ctx.beginPath();
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.strokeStyle = `rgba(108,99,255,${0.08 * (1 - dist / connectDist)})`;
            ctx.lineWidth = 0.5;
            ctx.stroke();
          }
        }
      });
      animId = requestAnimationFrame(draw);
    };
    draw();
    return () => { cancelAnimationFrame(animId); window.removeEventListener("resize", resize); };
  }, []);
  return <canvas ref={canvasRef} className="absolute inset-0 w-full h-full pointer-events-none z-0" />;
}

// Typewriter hook
function useTypewriter(words, speed = 80, pause = 1800) {
  const [display, setDisplay] = useState("");
  const [wordIdx, setWordIdx] = useState(0);
  const [charIdx, setCharIdx] = useState(0);
  const [deleting, setDeleting] = useState(false);
  useEffect(() => {
    const current = words[wordIdx];
    const timeout = setTimeout(() => {
      if (!deleting) {
        setDisplay(current.slice(0, charIdx + 1));
        if (charIdx + 1 === current.length) {
          setTimeout(() => setDeleting(true), pause);
        } else setCharIdx(c => c + 1);
      } else {
        setDisplay(current.slice(0, charIdx - 1));
        if (charIdx - 1 === 0) {
          setDeleting(false);
          setWordIdx(i => (i + 1) % words.length);
          setCharIdx(0);
        } else setCharIdx(c => c - 1);
      }
    }, deleting ? speed / 2 : speed);
    return () => clearTimeout(timeout);
  }, [charIdx, deleting, wordIdx, words, speed, pause]);
  return display;
}

// Magnetic button — disabled on touch devices
function MagneticButton({ children, className, href }) {
  const ref = useRef(null);
  const handleMouseMove = (e) => {
    if (window.matchMedia("(hover: none)").matches) return;
    const el = ref.current;
    const rect = el.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    el.style.transform = `translate(${x * 0.25}px, ${y * 0.25}px)`;
  };
  const handleMouseLeave = () => {
    if (ref.current) ref.current.style.transform = "translate(0,0)";
  };
  return (
    <a ref={ref} href={href} className={className}
      onMouseMove={handleMouseMove} onMouseLeave={handleMouseLeave}
      style={{ transition: "transform 0.3s cubic-bezier(0.23,1,0.32,1), box-shadow 0.3s, opacity 0.3s" }}>
      {children}
    </a>
  );
}

// Stats counter
function CountUp({ target, suffix = "" }) {
  const [val, setVal] = useState(0);
  const ref = useRef(null);
  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (!entry.isIntersecting) return;
      let start = 0;
      const num = parseInt(target);
      const step = Math.ceil(num / 40);
      const timer = setInterval(() => {
        start = Math.min(start + step, num);
        setVal(start);
        if (start >= num) clearInterval(timer);
      }, 30);
      observer.disconnect();
    });
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [target]);
  return <span ref={ref}>{val}{suffix}</span>;
}

const TYPEWRITER_WORDS = ["Digital Solutions", "AI Automation", "Web Experiences", "SaaS Products"];

const STATS = [
  { num: "30", suffix: "+", label: "Projects Delivered" },
  { num: "20",  suffix: "%", label: "Client Satisfaction" },
  { num: "1",   suffix: "+", label: "Years Experience" },
  { num: "20",  suffix: "+", label: "Enterprise Clients" },
];

const TERMINAL_LINES = [
  { prefix: "→", text: "Initializing AI engine...", color: "#6C63FF" },
  { prefix: "✓", text: "Neural stack loaded", color: "#00D4AA" },
  { prefix: "→", text: "Deploying solution...", color: "#6C63FF" },
  { prefix: "✓", text: "Client project live", color: "#00D4AA" },
];

export default function Hero() {
  const typed = useTypewriter(TYPEWRITER_WORDS);
  const [termLine, setTermLine] = useState(0);
  useEffect(() => {
    const t = setInterval(() => setTermLine(l => (l + 1) % TERMINAL_LINES.length), 1600);
    return () => clearInterval(t);
  }, []);

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Syne:wght@700;800;900&family=DM+Sans:wght@400;500;600&display=swap');

        *, *::before, *::after { box-sizing: border-box; }

        .hero-root {
          font-family: 'DM Sans', sans-serif;
          --purple: #6C63FF;
          --teal: #00D4AA;
          --bg: #07060F;
          --text1: #f0f0f8;
          --text2: #9898b8;
          --card-bg: rgba(255,255,255,0.035);
          --card-border: rgba(255,255,255,0.1);
        }

        .hero-section {
          min-height: 100vh;
          display: flex;
          align-items: center;
          position: relative;
          overflow: hidden;
          padding: 120px 5% 100px;
          background: var(--bg);
          color: var(--text1);
        }

        /* Orb blobs */
        .orb1 {
          position: absolute; border-radius: 50%; pointer-events: none; z-index: 0;
          width: min(900px, 120vw); height: min(900px, 120vw);
          top: -250px; right: -250px;
          background: radial-gradient(circle, rgba(108,99,255,0.18) 0%, transparent 65%);
          animation: orbDrift 12s ease-in-out infinite alternate;
        }
        .orb2 {
          position: absolute; border-radius: 50%; pointer-events: none; z-index: 0;
          width: min(700px, 100vw); height: min(700px, 100vw);
          bottom: -150px; left: -150px;
          background: radial-gradient(circle, rgba(0,212,170,0.12) 0%, transparent 65%);
          animation: orbDrift2 14s ease-in-out infinite alternate;
        }
        .orb3 {
          position: absolute; border-radius: 50%; pointer-events: none; z-index: 0;
          width: min(400px, 80vw); height: min(400px, 80vw);
          top: 40%; left: 40%;
          background: radial-gradient(circle, rgba(255,100,150,0.07) 0%, transparent 70%);
          animation: orbDrift 18s ease-in-out infinite alternate-reverse;
        }
        @keyframes orbDrift { 0%{transform:translate(0,0) scale(1)} 100%{transform:translate(40px,-40px) scale(1.08)} }
        @keyframes orbDrift2 { 0%{transform:translate(0,0) scale(1)} 100%{transform:translate(-30px,50px) scale(1.05)} }

        /* Grid overlay */
        .grid-overlay {
          position: absolute; inset: 0; z-index: 0; pointer-events: none;
          background-image:
            linear-gradient(rgba(108,99,255,0.04) 1px, transparent 1px),
            linear-gradient(90deg, rgba(108,99,255,0.04) 1px, transparent 1px);
          background-size: 60px 60px;
          mask-image: radial-gradient(ellipse 80% 80% at 50% 50%, black 40%, transparent 100%);
        }

        /* ── Layout ── */
        .hero-inner {
          max-width: 1200px;
          margin: 0 auto;
          position: relative; z-index: 10;
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 60px;
          align-items: center;
          width: 100%;
        }

        /* ── MOBILE: single column ── */
        @media (max-width: 900px) {
          .hero-section {
            padding: 100px 6% 80px;
            align-items: flex-start;
          }
          .hero-inner {
            grid-template-columns: 1fr;
            gap: 48px;
          }
        }

        @media (max-width: 480px) {
          .hero-section {
            padding: 90px 5% 70px;
          }
          .hero-inner {
            gap: 40px;
          }
        }

        /* Badge */
        .badge {
          display: inline-flex; align-items: center; gap: 8px;
          padding: 8px 18px; border: 1px solid rgba(255,255,255,0.15);
          border-radius: 100px; background: rgba(255,255,255,0.04);
          backdrop-filter: blur(10px); font-size: 13px; color: var(--text2);
          margin-bottom: 28px;
          animation: fadeUp 0.6s ease both;
        }
        .badge-dot {
          width: 7px; height: 7px; border-radius: 50%; flex-shrink: 0;
          background: var(--teal);
          box-shadow: 0 0 8px var(--teal);
          animation: blink 1.8s ease-in-out infinite;
        }
        @keyframes blink { 0%,100%{opacity:1;transform:scale(1)} 50%{opacity:0.4;transform:scale(0.85)} }

        /* Heading */
        .hero-h1 {
          font-family: 'Syne', sans-serif;
          font-size: clamp(38px, 6vw, 76px);
          font-weight: 900; line-height: 1.02;
          margin: 0 0 24px; letter-spacing: -1.5px;
          animation: fadeUp 0.6s 0.15s ease both;
        }
        .grad-text {
          background: linear-gradient(135deg, #a78bfa 0%, #6C63FF 40%, #00D4AA 100%);
          -webkit-background-clip: text; -webkit-text-fill-color: transparent;
          background-clip: text;
        }
        .cursor-blink::after {
          content: '|';
          color: var(--purple);
          animation: blink 0.9s step-start infinite;
          margin-left: 2px;
        }

        .hero-sub {
          font-size: clamp(15px, 2vw, 17px);
          color: var(--text2); line-height: 1.75;
          max-width: 480px; margin-bottom: 40px;
          animation: fadeUp 0.6s 0.28s ease both;
        }

        /* Buttons */
        .btn-row {
          display: flex; gap: 12px; flex-wrap: wrap;
          animation: fadeUp 0.6s 0.4s ease both;
        }
        .btn-primary {
          display: inline-flex; align-items: center; gap: 8px;
          padding: 14px 28px; border-radius: 12px;
          background: linear-gradient(135deg, #8b7cf8, #6C63FF 50%, #4ecdc4);
          color: #fff; font-weight: 700; font-size: 15px;
          text-decoration: none; position: relative; overflow: hidden;
          box-shadow: 0 8px 32px rgba(108,99,255,0.35);
          -webkit-tap-highlight-color: transparent;
          touch-action: manipulation;
        }
        .btn-primary::before {
          content: ''; position: absolute; inset: 0;
          background: linear-gradient(135deg, rgba(255,255,255,0.15), transparent);
          opacity: 0; transition: opacity 0.3s;
        }
        .btn-primary:hover::before { opacity: 1; }
        .btn-primary:hover { box-shadow: 0 16px 48px rgba(108,99,255,0.5); }
        .btn-secondary {
          display: inline-flex; align-items: center; gap: 8px;
          padding: 14px 28px; border-radius: 12px;
          background: rgba(255,255,255,0.06);
          color: var(--text1); font-weight: 600; font-size: 15px;
          text-decoration: none; border: 1px solid rgba(255,255,255,0.14);
          transition: border-color 0.3s, background 0.3s;
          -webkit-tap-highlight-color: transparent;
          touch-action: manipulation;
        }
        .btn-secondary:hover { border-color: var(--purple); background: rgba(108,99,255,0.1); }

        @media (max-width: 400px) {
          .btn-primary, .btn-secondary {
            flex: 1 1 auto;
            justify-content: center;
            padding: 13px 20px;
            font-size: 14px;
          }
        }

        /* ── Right card ── */
        .hero-right { position: relative; }

        .main-card {
          background: rgba(255,255,255,0.03); border: 1px solid rgba(255,255,255,0.1);
          border-radius: 24px; padding: 28px; backdrop-filter: blur(60px);
          box-shadow: 0 0 0 1px rgba(255,100,150,0.08), 0 40px 80px rgba(0,0,0,0.4);
          animation: fadeUp 0.7s 0.35s ease both;
          position: relative; overflow: hidden;
        }
        .main-card::before {
          content: ''; position: absolute;
          top: -1px; left: 30px; right: 30px; height: 1px;
          background: linear-gradient(90deg, transparent, rgba(108,99,255,0.6), transparent);
        }

        @media (max-width: 480px) {
          .main-card { padding: 20px; border-radius: 18px; }
        }

        .card-header { display: flex; align-items: center; gap: 12px; margin-bottom: 20px; }
        .card-icon {
          width: 46px; height: 46px; border-radius: 14px; flex-shrink: 0;
          background: linear-gradient(135deg, #8b7cf8, #6C63FF);
          display: flex; align-items: center; justify-content: center;
          box-shadow: 0 8px 20px rgba(108,99,255,0.4);
        }
        .card-title { font-family: 'Syne', sans-serif; font-weight: 800; font-size: 16px; }
        .card-subtitle { font-size: 12px; color: var(--text2); margin-top: 2px; }

        .card-desc { font-size: 13px; color: var(--text2); line-height: 1.7; margin-bottom: 20px; }

        /* Stats grid */
        .stats-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 12px; }

        @media (max-width: 380px) {
          .stats-grid { grid-template-columns: 1fr 1fr; gap: 8px; }
        }

        .stat-cell {
          background: rgba(255,255,255,0.05); border-radius: 14px; padding: 16px;
          border: 1px solid rgba(255,255,255,0.07);
          position: relative; overflow: hidden;
          transition: transform 0.3s, background 0.3s;
        }
        .stat-cell:hover { transform: translateY(-2px); background: rgba(108,99,255,0.08); }
        .stat-cell::after {
          content:''; position:absolute; bottom:0; left:0; right:0; height:2px;
          background: linear-gradient(90deg, var(--purple), var(--teal));
          transform: scaleX(0); transform-origin: left;
          transition: transform 0.4s ease;
        }
        .stat-cell:hover::after { transform: scaleX(1); }
        .stat-num {
          font-family: 'Syne', sans-serif;
          font-size: clamp(22px, 4vw, 30px); font-weight: 900;
          background: linear-gradient(135deg, #a78bfa, #00D4AA);
          -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text;
        }
        .stat-label { font-size: 11px; color: var(--text2); margin-top: 4px; }

        /* Terminal card */
        .terminal-card {
          margin-top: 16px;
          background: rgba(7,6,15,0.8); border: 1px solid rgba(255,255,255,0.1);
          border-radius: 14px; padding: 14px 16px; backdrop-filter: blur(20px);
          font-family: 'Courier New', monospace; font-size: 12.5px;
        }
        .terminal-header {
          display: flex; align-items: center; gap: 6px; margin-bottom: 10px;
        }
        .t-dot { width: 8px; height: 8px; border-radius: 50%; flex-shrink: 0; }
        .terminal-line {
          display: flex; align-items: center; gap: 8px;
          animation: termSlide 0.4s ease;
          overflow: hidden;
        }
        @keyframes termSlide { from{opacity:0;transform:translateX(-8px)} to{opacity:1;transform:translateX(0)} }

        /* Floating badges */
        .float-badge {
          position: absolute; border-radius: 14px; padding: 10px 16px;
          background: rgba(7,6,15,0.85); backdrop-filter: blur(20px);
          border: 1px solid rgba(255,255,255,0.12);
          display: flex; align-items: center; gap: 10px;
          font-size: 13px; font-weight: 600;
          box-shadow: 0 8px 32px rgba(0,0,0,0.4);
          white-space: nowrap;
        }
        .badge-top {
          top: -18px; right: -12px;
          animation: floatA 4s ease-in-out infinite;
        }
        .badge-bot {
          bottom: -18px; left: -12px;
          animation: floatB 5s ease-in-out infinite;
        }

        /* On small screens, tuck floating badges inside the card area */
        @media (max-width: 600px) {
          .badge-top { top: -14px; right: 8px; font-size: 11px; padding: 7px 12px; }
          .badge-bot { bottom: -14px; left: 8px; font-size: 11px; padding: 7px 12px; }
        }

        @keyframes floatA { 0%,100%{transform:translateY(0) rotate(-1deg)} 50%{transform:translateY(-10px) rotate(1deg)} }
        @keyframes floatB { 0%,100%{transform:translateY(0) rotate(1deg)} 50%{transform:translateY(10px) rotate(-1deg)} }

        /* Glow ring behind card */
        .glow-ring {
          position: absolute; inset: -30px; border-radius: 30px; z-index: -1;
          background: conic-gradient(from 180deg, rgba(108,99,255,0.15), rgba(0,212,170,0.1), rgba(255,100,150,0.08), rgba(108,99,255,0.15));
          filter: blur(30px);
          animation: spinSlow 12s linear infinite;
        }
        @keyframes spinSlow { to{transform:rotate(360deg)} }

        @keyframes fadeUp { from{opacity:0;transform:translateY(24px)} to{opacity:1;transform:translateY(0)} }

        /* ── Mobile stats strip (shown only on mobile instead of right card) ── */
        .mobile-stats {
          display: none;
        }
        @media (max-width: 900px) {
          .mobile-stats {
            display: grid;
            grid-template-columns: repeat(2, 1fr);
            gap: 10px;
            animation: fadeUp 0.6s 0.5s ease both;
          }
          .mobile-stats .stat-cell {
            padding: 14px 12px;
          }
        }
        @media (max-width: 400px) {
          .mobile-stats {
            grid-template-columns: repeat(2, 1fr);
          }
        }

        /* Scroll indicator */
        .scroll-hint {
          position: absolute; bottom: 28px; left: 50%; transform: translateX(-50%);
          display: flex; flex-direction: column; align-items: center; gap: 6px;
          font-size: 11px; color: var(--text2); letter-spacing: 2px; text-transform: uppercase;
          z-index: 10; animation: fadeIn 1s 1.2s both;
        }
        .scroll-mouse {
          width: 22px; height: 34px; border: 1.5px solid rgba(255,255,255,0.2);
          border-radius: 12px; display: flex; justify-content: center; padding-top: 6px;
        }
        .scroll-wheel {
          width: 3px; height: 6px; background: var(--purple);
          border-radius: 2px; animation: scrollDown 1.6s ease-in-out infinite;
        }
        @keyframes scrollDown { 0%{transform:translateY(0);opacity:1} 100%{transform:translateY(10px);opacity:0} }
        @keyframes fadeIn { from{opacity:0} to{opacity:1} }

        /* Hide desktop right panel on mobile */
        @media (max-width: 900px) {
          .hero-right-desktop { display: none !important; }
        }
        /* Hide mobile stats on desktop */
        @media (min-width: 901px) {
          .mobile-stats { display: none !important; }
        }
      `}</style>

      <section className="hero-root hero-section" id="hero">
        {/* Backgrounds */}
        <div className="orb1" />
        <div className="orb2" />
        <div className="orb3" />
        <div className="grid-overlay" />
        <ParticleField />

        <div className="hero-inner">
          {/* ── LEFT COLUMN ── */}
          <div>
            <div className="badge">
              <span className="badge-dot" />
              Available for new projects
            </div>

            <h1 className="hero-h1">
              We Build<br />
              <span className="grad-text cursor-blink">{typed}</span>
            </h1>

            <p className="hero-sub">
              From cutting-edge websites and custom software to intelligent AI automation
              and autonomous agents — we turn your boldest ideas into reality.
            </p>

            <div className="btn-row">
              <MagneticButton href="#contact" className="btn-primary">
                Get Started <ArrowIcon />
              </MagneticButton>
              <MagneticButton href="#services" className="btn-secondary">
                View Services
              </MagneticButton>
            </div>

            {/* Mobile-only stats strip */}
            <div className="mobile-stats" style={{ marginTop: 36 }}>
              {STATS.map(({ num, suffix, label }) => (
                <div className="stat-cell" key={label}>
                  <div className="stat-num"><CountUp target={num} suffix={suffix} /></div>
                  <div className="stat-label">{label}</div>
                </div>
              ))}
            </div>
          </div>

          {/* ── RIGHT COLUMN (desktop only) ── */}
          <div className="hero-right hero-right-desktop">
            <div className="glow-ring" />
            <div className="main-card">
              <div className="card-header">
                <div className="card-icon">
                  <AIIcon />
                </div>
                <div>
                  <div className="card-title">&amp; S Digital</div>
                  <div className="card-subtitle">Full-Service Tech Agency</div>
                </div>
              </div>
              <div className="card-desc">
                Delivering innovative digital solutions across web, software, and AI verticals
                with measurable results.
              </div>

              <div className="stats-grid">
                {STATS.map(({ num, suffix, label }) => (
                  <div className="stat-cell" key={label}>
                    <div className="stat-num"><CountUp target={num} suffix={suffix} /></div>
                    <div className="stat-label">{label}</div>
                  </div>
                ))}
              </div>

              {/* Terminal */}
              <div className="terminal-card">
                <div className="terminal-header">
                  <div className="t-dot" style={{ background: "#ff5f57" }} />
                  <div className="t-dot" style={{ background: "#febc2e" }} />
                  <div className="t-dot" style={{ background: "#28c840" }} />
                  <span style={{ marginLeft: 8, color: "#555", fontSize: 11 }}>~/as-digital</span>
                </div>
                <div className="terminal-line" key={termLine}>
                  <span style={{ color: TERMINAL_LINES[termLine].color, fontWeight: "bold" }}>
                    {TERMINAL_LINES[termLine].prefix}
                  </span>
                  <span style={{ color: "#c8c8e8" }}>{TERMINAL_LINES[termLine].text}</span>
                  <span style={{ color: TERMINAL_LINES[termLine].color, animation: "blink 0.8s step-start infinite" }}>▋</span>
                </div>
              </div>
            </div>

            {/* Floating badges */}
            <div className="float-badge badge-top">
              <span style={{ width: 8, height: 8, borderRadius: "50%", background: "#00D4AA", boxShadow: "0 0 8px #00D4AA", flexShrink: 0 }} />
              <span style={{ color: "#00D4AA" }}>&S.com System Online</span>
            </div>
            <div className="float-badge badge-bot">
              <span style={{ color: "#6C63FF" }}><CheckIcon /></span>
              <span style={{ color: "#f0f0f8" }}>Project Delivered ✓</span>
            </div>
          </div>
        </div>

        {/* Scroll hint */}
        <div className="scroll-hint">
          <div className="scroll-mouse">
            <div className="scroll-wheel" />
          </div>
          Scroll
        </div>
      </section>
    </>
  );
}