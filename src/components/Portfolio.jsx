import { useState, useEffect, useRef } from "react";

/* ── CSS ─────────────────────────────────────────────────────────────────── */
const CSS = `
@import url('https://fonts.googleapis.com/css2?family=Syne:wght@700;800&family=DM+Sans:wght@300;400;500&display=swap');

/* ── Section base ── */
.ap-section {
  position: relative;
  padding: 110px 5% 120px;
  background: #06060f;
  overflow: hidden;
  font-family: 'DM Sans', sans-serif;
}

/* ── Background orbs ── */
.ap-orb {
  position: absolute; border-radius: 50%;
  filter: blur(100px); pointer-events: none;
  animation: apOrb ease-in-out infinite alternate;
}
.ap-orb1 { width:500px;height:500px;background:#4f46e5;
  top:-180px;left:-120px;opacity:.15;animation-duration:13s; }
.ap-orb2 { width:350px;height:350px;background:#e040fb;
  bottom:-100px;right:-80px;opacity:.13;animation-duration:10s;animation-delay:-5s; }
.ap-orb3 { width:260px;height:260px;background:#00e5ff;
  top:40%;left:55%;opacity:.09;animation-duration:15s;animation-delay:-8s; }

@keyframes apOrb {
  0%   { transform:translate(0,0) scale(1); }
  50%  { transform:translate(28px,-24px) scale(1.07); }
  100% { transform:translate(-18px,22px) scale(.94); }
}

/* ── Animated grid ── */
.ap-grid-bg {
  position:absolute; inset:0; pointer-events:none;
  background-image:
    linear-gradient(rgba(108,99,255,.05) 1px,transparent 1px),
    linear-gradient(90deg,rgba(108,99,255,.05) 1px,transparent 1px);
  background-size:70px 70px;
  animation: apGridMove 22s linear infinite;
}
@keyframes apGridMove { to { background-position:70px 70px; } }

/* ── Scan line ── */
.ap-scan {
  position:absolute; left:0; right:0; height:1.5px; pointer-events:none; z-index:1;
  background:linear-gradient(90deg,transparent,rgba(108,99,255,.4),rgba(224,64,251,.35),transparent);
  animation:apScan 8s linear infinite;
}
@keyframes apScan {
  0%   { top:-2px; opacity:0; }
  5%   { opacity:1; }
  95%  { opacity:1; }
  100% { top:100%; opacity:0; }
}

/* ── Stars ── */
.ap-stars { position:absolute; inset:0; pointer-events:none; }

/* ── Particles ── */
.ap-particles { position:absolute; inset:0; pointer-events:none; overflow:hidden; }
.ap-particle  {
  position:absolute; border-radius:50%; opacity:0;
  animation:apFloat linear infinite;
}
@keyframes apFloat {
  0%   { transform:translateY(0) scale(1); opacity:0; }
  10%  { opacity:.55; }
  90%  { opacity:.25; }
  100% { transform:translateY(-420px) scale(.3); opacity:0; }
}

/* ── Inner ── */
.ap-inner { position:relative; z-index:2; max-width:1200px; margin:0 auto; }

/* ── Header ── */
.ap-badge {
  display:inline-flex; align-items:center; gap:6px;
  padding:6px 16px; border-radius:99px;
  background:rgba(108,99,255,.12);
  border:1px solid rgba(108,99,255,.25);
  color:#a89cff; font-size:11px; font-weight:600;
  letter-spacing:.1em; text-transform:uppercase;
  margin-bottom:20px;
  animation:apFadeUp .7s ease both;
}
.ap-badge-dot {
  width:6px; height:6px; border-radius:50%;
  background:#6C63FF;
  box-shadow:0 0 8px rgba(108,99,255,.9);
  animation:apDotPulse 1.5s ease-in-out infinite;
}
@keyframes apDotPulse {
  0%,100% { transform:scale(1); opacity:1; }
  50%     { transform:scale(1.5); opacity:.6; }
}

.ap-title {
  font-family:'Syne',sans-serif;
  font-size:clamp(30px,4vw,56px);
  font-weight:800; line-height:1.1;
  color:#fff; margin-bottom:18px;
  animation:apFadeUp .7s .1s ease both;
}
.ap-grad {
  background:linear-gradient(135deg,#6C63FF 0%,#e040fb 50%,#00e5ff 100%);
  -webkit-background-clip:text; -webkit-text-fill-color:transparent;
  background-clip:text;
  background-size:200% 100%;
  animation:apGradShift 4s linear infinite alternate;
}
@keyframes apGradShift {
  0%   { background-position:0% 0%; }
  100% { background-position:100% 0%; }
}

.ap-subtitle {
  font-size:16px; color:rgba(255,255,255,.48);
  max-width:580px; margin:0 auto 44px;
  line-height:1.75; font-weight:300;
  animation:apFadeUp .7s .2s ease both;
}

/* ── Filter tabs ── */
.ap-tabs {
  display:flex; gap:10px; flex-wrap:wrap;
  justify-content:center;
  margin-bottom:52px;
  animation:apFadeUp .7s .3s ease both;
}
.ap-tab {
  padding:8px 22px; border-radius:99px;
  font-size:13px; font-weight:500;
  cursor:pointer;
  border:1px solid rgba(255,255,255,.15);
  background:transparent; color:rgba(255,255,255,.45);
  transition:all .3s cubic-bezier(.34,1.56,.64,1);
  position:relative; overflow:hidden;
  font-family:'DM Sans',sans-serif;
}
.ap-tab::before {
  content:'';
  position:absolute; inset:0;
  background:linear-gradient(135deg,#6C63FF,#e040fb);
  opacity:0; transition:opacity .3s ease;
  z-index:0;
}
.ap-tab span { position:relative; z-index:1; }
.ap-tab:hover { color:#fff; border-color:transparent; transform:translateY(-2px); }
.ap-tab:hover::before { opacity:1; }
.ap-tab.active {
  color:#fff; border-color:transparent;
  box-shadow:0 4px 20px rgba(108,99,255,.45);
}
.ap-tab.active::before { opacity:1; }

/* ── Grid ── */
.ap-cards {
  display:grid;
  grid-template-columns:repeat(3,1fr);
  gap:24px;
}
@media(max-width:900px) { .ap-cards { grid-template-columns:repeat(2,1fr); } }
@media(max-width:560px) { .ap-cards { grid-template-columns:1fr; } }

/* ── Card ── */
.ap-card {
  border-radius:20px; overflow:hidden;
  border:1px solid rgba(255,255,255,.08);
  background:rgba(255,255,255,.03);
  backdrop-filter:blur(10px);
  transition:transform .4s cubic-bezier(.34,1.56,.64,1),
             box-shadow .4s ease, border-color .4s ease;
  animation:apCardIn .6s ease both;
  cursor:pointer;
}
.ap-card:hover {
  transform:translateY(-10px) scale(1.02);
  box-shadow:0 28px 60px rgba(0,0,0,.5), 0 0 40px rgba(108,99,255,.15);
  border-color:rgba(108,99,255,.4);
}
@keyframes apCardIn {
  from { opacity:0; transform:translateY(30px) scale(.96); }
  to   { opacity:1; transform:translateY(0) scale(1); }
}
.ap-card:nth-child(1) { animation-delay:.05s; }
.ap-card:nth-child(2) { animation-delay:.12s; }
.ap-card:nth-child(3) { animation-delay:.19s; }
.ap-card:nth-child(4) { animation-delay:.05s; }
.ap-card:nth-child(5) { animation-delay:.12s; }
.ap-card:nth-child(6) { animation-delay:.19s; }

/* ── Thumbnail ── */
.ap-thumb {
  height:220px; position:relative; overflow:hidden;
  display:flex; align-items:center; justify-content:center;
}
.ap-thumb-icon {
  font-size:56px; opacity:.22;
  animation:apIconSpin 12s linear infinite;
  color:#fff; user-select:none;
}
@keyframes apIconSpin {
  0%   { transform:rotate(0deg) scale(1); }
  50%  { transform:rotate(180deg) scale(1.15); opacity:.35; }
  100% { transform:rotate(360deg) scale(1); }
}

/* shine sweep */
.ap-thumb::after {
  content:'';
  position:absolute; inset:0;
  background:linear-gradient(120deg,
    transparent 30%,rgba(255,255,255,.12) 50%,transparent 70%);
  background-size:200% 100%;
  animation:apShine 3s linear infinite;
  pointer-events:none;
}
@keyframes apShine { to { background-position:-200% 0; } }

/* hover overlay */
.ap-overlay {
  position:absolute; inset:0;
  background:rgba(0,0,0,.72); backdrop-filter:blur(6px);
  display:flex; align-items:center; justify-content:center;
  opacity:0;
  transition:opacity .35s ease;
}
.ap-card:hover .ap-overlay { opacity:1; }

.ap-overlay-btn {
  display:inline-flex; align-items:center; gap-8px;
  padding:10px 24px; border-radius:12px;
  background:linear-gradient(135deg,#6C63FF,#e040fb);
  color:#fff; font-size:13px; font-weight:600;
  text-decoration:none; border:none; cursor:pointer;
  font-family:'DM Sans',sans-serif;
  transform:translateY(12px);
  transition:transform .35s cubic-bezier(.34,1.56,.64,1);
  box-shadow:0 4px 20px rgba(108,99,255,.5);
  gap:8px;
}
.ap-card:hover .ap-overlay-btn { transform:translateY(0); }
.ap-overlay-btn:hover { box-shadow:0 8px 30px rgba(108,99,255,.7); }

/* ── Corner badge on thumb ── */
.ap-corner-tag {
  position:absolute; top:14px; right:14px;
  padding:4px 11px; border-radius:99px;
  font-size:10px; font-weight:700;
  letter-spacing:.08em; text-transform:uppercase;
  backdrop-filter:blur(8px);
  border:1px solid rgba(255,255,255,.15);
  color:#fff;
  background:rgba(0,0,0,.45);
}

/* ── Info ── */
.ap-info { padding:22px 22px 24px; }

.ap-chip {
  display:inline-block; padding:4px 12px; border-radius:99px;
  font-size:10.5px; font-weight:700;
  letter-spacing:.07em; text-transform:uppercase;
  margin-bottom:12px;
}

.ap-card-title {
  font-family:'Syne',sans-serif;
  font-size:17px; font-weight:700; color:#fff;
  margin-bottom:6px; line-height:1.3;
}
.ap-card-desc {
  font-size:13px; color:rgba(255,255,255,.45);
  line-height:1.65;
}

/* ── Bottom line ── */
.ap-card-footer {
  display:flex; align-items:center; justify-content:space-between;
  margin-top:16px; padding-top:14px;
  border-top:1px solid rgba(255,255,255,.07);
}
.ap-card-link {
  font-size:12px; color:rgba(255,255,255,.3);
  text-decoration:none; display:flex; align-items:center; gap:5px;
  transition:color .25s ease, gap .25s ease;
  font-weight:500;
}
.ap-card-link:hover { color:#6C63FF; gap:8px; }
.ap-card-link svg { transition:transform .25s ease; }
.ap-card-link:hover svg { transform:translateX(3px); }

.ap-card-dots { display:flex; gap:4px; }
.ap-card-dot  { width:5px; height:5px; border-radius:50%; background:rgba(255,255,255,.12); }

/* ── Counter strip ── */
.ap-counter-strip {
  display:flex; justify-content:center; gap:60px; flex-wrap:wrap;
  margin-top:72px; padding-top:52px;
  border-top:1px solid rgba(255,255,255,.07);
  animation:apFadeUp .7s .5s ease both;
}
.ap-counter-item { text-align:center; }
.ap-counter-num {
  font-family:'Syne',sans-serif;
  font-size:40px; font-weight:800;
  background:linear-gradient(135deg,#6C63FF,#e040fb);
  -webkit-background-clip:text; -webkit-text-fill-color:transparent;
  background-clip:text;
  line-height:1;
}
.ap-counter-label {
  font-size:12px; color:rgba(255,255,255,.3);
  letter-spacing:.1em; text-transform:uppercase;
  margin-top:6px; font-weight:400;
}

@keyframes apFadeUp {
  from { opacity:0; transform:translateY(20px); }
  to   { opacity:1; transform:translateY(0); }
}
`;

/* ── Data ────────────────────────────────────────────────────────────────── */
const PROJECTS = [
  {
    title:    "NexaCommerce Platform",
    desc:     "Full-stack e-commerce with AI recommendations and real-time inventory sync.",
    cat:      "Web",
    gradient: "linear-gradient(135deg,#6C63FF 0%,#00D4AA 100%)",
    icon:     "◈",
    tag:      "Web",
  },
  {
    title:    "AutoFlow AI Suite",
    desc:     "End-to-end business process automation powered by multi-agent orchestration.",
    cat:      "AI",
    gradient: "linear-gradient(135deg,#FF6B6B 0%,#FFB800 100%)",
    icon:     "⬡",
    tag:      "AI",
  },
  {
    title:    "PulseUI Design System",
    desc:     "Accessible component library & token system for a large-scale SaaS platform.",
    cat:      "Design",
    gradient: "linear-gradient(135deg,#FF4DC4 0%,#6C63FF 100%)",
    icon:     "◉",
    tag:      "Design",
  },
  {
    title:    "TradeSense Analytics",
    desc:     "Real-time market intelligence dashboard with AI-powered signal detection.",
    cat:      "Web",
    gradient: "linear-gradient(135deg,#00D4AA 0%,#6C63FF 100%)",
    icon:     "◈",
    tag:      "Web",
  },
  {
    title:    "SupportBot Pro",
    desc:     "Multi-lingual AI support agent with long-term memory and escalation routing.",
    cat:      "AI",
    gradient: "linear-gradient(135deg,#FFB800 0%,#FF6B6B 100%)",
    icon:     "⬡",
    tag:      "AI",
  },
  {
    title:    "BrandForge Identity",
    desc:     "Complete visual rebrand — strategy, identity system, and motion guidelines.",
    cat:      "Design",
    gradient: "linear-gradient(135deg,#6C63FF 0%,#FF4DC4 100%)",
    icon:     "◉",
    tag:      "Design",
  },
];

const TAG_COLORS = {
  Web:    { bg: "rgba(108,99,255,.18)",  color: "#a89cff" },
  AI:     { bg: "rgba(0,212,170,.15)",   color: "#00D4AA" },
  Design: { bg: "rgba(255,77,196,.15)",  color: "#FF4DC4" },
};

const CATS = ["All", "Web", "AI", "Design"];

const COUNTERS = [

];

const PARTICLE_COLORS = ["#6C63FF","#e040fb","#00e5ff","#f9a825"];

/* ── Component ───────────────────────────────────────────────────────────── */
export default function Portfolio() {
  const [active, setActive]   = useState("All");
  const [gridKey, setGridKey] = useState(0);
  const canvasRef    = useRef(null);
  const rafRef       = useRef(null);
  const particlesRef = useRef(null);

  const filtered = active === "All"
    ? PROJECTS
    : PROJECTS.filter((p) => p.cat === active);

  /* inject CSS once */
  useEffect(() => {
    if (document.getElementById("ap-css")) return;
    const s = document.createElement("style");
    s.id = "ap-css"; s.textContent = CSS;
    document.head.appendChild(s);
  }, []);

  /* re-trigger card animations on filter change */
  const handleFilter = (cat) => {
    setActive(cat);
    setGridKey((k) => k + 1);
  };

  /* stars */
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    const resize = () => { canvas.width = canvas.offsetWidth; canvas.height = canvas.offsetHeight; };
    resize();
    window.addEventListener("resize", resize);

    const stars = Array.from({ length: 80 }, () => ({
      x: Math.random(), y: Math.random(),
      r: Math.random() * 1.1 + .25,
      speed: Math.random() * .012 + .004,
      phase: Math.random() * Math.PI * 2,
    }));

    let t = 0;
    const draw = () => {
      t++;
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      stars.forEach(s => {
        const a = .1 + .65 * Math.abs(Math.sin(s.phase + t * s.speed));
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
    for (let i = 0; i < 18; i++) {
      const p = document.createElement("div");
      p.className = "ap-particle";
      const sz = Math.random() * 4 + 2;
      Object.assign(p.style, {
        width: `${sz}px`, height: `${sz}px`,
        background: PARTICLE_COLORS[Math.floor(Math.random() * PARTICLE_COLORS.length)],
        left: `${Math.random() * 100}%`,
        bottom: `${Math.random() * 40}px`,
        animationDuration: `${Math.random() * 9 + 5}s`,
        animationDelay:    `${Math.random() * 9}s`,
        filter: `blur(${Math.random()}px)`,
      });
      el.appendChild(p);
    }
  }, []);

  return (
    <section id="portfolio" className="ap-section">
      {/* BG FX */}
      <div className="ap-orb ap-orb1" />
      <div className="ap-orb ap-orb2" />
      <div className="ap-orb ap-orb3" />
      <div className="ap-grid-bg" />
      <div className="ap-scan" />
      <canvas ref={canvasRef} className="ap-stars" />
      <div ref={particlesRef} className="ap-particles" />

      <div className="ap-inner">

        {/* ── Header ── */}
        <div style={{ textAlign: "center" }}>
          <div className="ap-badge">
            <span className="ap-badge-dot" />
            Our Work
          </div>
          <h2 className="ap-title">
            Featured <span className="ap-grad">Projects</span>
          </h2>
          <p className="ap-subtitle">
            A selection of our finest work — each project a testament to
            technical excellence and creative ambition.
          </p>
        </div>

        {/* ── Filter tabs ── */}
        <div className="ap-tabs">
          {CATS.map((c) => (
            <button
              key={c}
              className={`ap-tab${active === c ? " active" : ""}`}
              onClick={() => handleFilter(c)}
            >
              <span>{c}</span>
            </button>
          ))}
        </div>

        {/* ── Cards ── */}
        <div className="ap-cards" key={gridKey}>
          {filtered.map((p) => (
            <div key={p.title} className="ap-card">

              {/* Thumbnail */}
              <div className="ap-thumb" style={{ background: p.gradient }}>
                <div className="ap-thumb-icon">{p.icon}</div>
                <div className="ap-corner-tag">{p.tag}</div>
                <div className="ap-overlay">
                  <a href="#contact" className="ap-overlay-btn">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none"
                      stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/>
                      <polyline points="15 3 21 3 21 9"/><line x1="10" y1="14" x2="21" y2="3"/>
                    </svg>
                    View Project
                  </a>
                </div>
              </div>

              {/* Info */}
              <div className="ap-info">
                <span
                  className="ap-chip"
                  style={{ background: TAG_COLORS[p.tag].bg, color: TAG_COLORS[p.tag].color }}
                >
                  {p.tag}
                </span>
                <div className="ap-card-title">{p.title}</div>
                <p className="ap-card-desc">{p.desc}</p>

                <div className="ap-card-footer">
                  <a href="#contact" className="ap-card-link">
                    View case study
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none"
                      stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <line x1="5" y1="12" x2="19" y2="12"/>
                      <polyline points="12 5 19 12 12 19"/>
                    </svg>
                  </a>
                  <div className="ap-card-dots">
                    {[0,1,2].map(i => (
                      <div key={i} className="ap-card-dot"
                        style={{ background: i === 0 ? TAG_COLORS[p.tag].color : undefined, opacity: i === 0 ? .8 : .2 }} />
                    ))}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* ── Counter strip ── */}
        <div className="ap-counter-strip">
          {COUNTERS.map(({ num, label }) => (
            <div key={label} className="ap-counter-item">
              <div className="ap-counter-num">{num}</div>
              <div className="ap-counter-label">{label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}