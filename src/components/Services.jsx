import { useEffect, useRef } from "react";
import { Icon, Icons } from "../icons";
import { Link } from "react-router-dom";

/* ── CSS ─────────────────────────────────────────────────────────────────── */
const CSS = `
@import url('https://fonts.googleapis.com/css2?family=Syne:wght@700;800&family=DM+Sans:wght@300;400;500&display=swap');

/* ── Section ── */
.asv-section {
  position: relative;
  padding: 110px 5% 130px;
  background: #06060f;
  overflow: hidden;
  font-family: 'DM Sans', sans-serif;
}

/* ── Orbs ── */
.asv-orb {
  position: absolute; border-radius: 50%;
  filter: blur(100px); pointer-events: none;
  animation: asvOrb ease-in-out infinite alternate;
}
.asv-orb1 { width:520px;height:520px;background:#4f46e5;
  top:-200px;left:-130px;opacity:.16;animation-duration:13s; }
.asv-orb2 { width:380px;height:380px;background:#e040fb;
  bottom:-120px;right:-80px;opacity:.13;animation-duration:10s;animation-delay:-5s; }
.asv-orb3 { width:300px;height:300px;background:#00e5ff;
  top:50%;left:60%;opacity:.08;animation-duration:16s;animation-delay:-8s; }
.asv-orb4 { width:220px;height:220px;background:#ff6b6b;
  top:30%;right:5%;opacity:.07;animation-duration:11s;animation-delay:-3s; }

@keyframes asvOrb {
  0%   { transform:translate(0,0) scale(1); }
  50%  { transform:translate(26px,-22px) scale(1.07); }
  100% { transform:translate(-18px,20px) scale(.94); }
}

/* ── Grid bg ── */
.asv-grid-bg {
  position:absolute; inset:0; pointer-events:none;
  background-image:
    linear-gradient(rgba(108,99,255,.05) 1px,transparent 1px),
    linear-gradient(90deg,rgba(108,99,255,.05) 1px,transparent 1px);
  background-size:65px 65px;
  animation:asvGridMove 20s linear infinite;
}
@keyframes asvGridMove { to { background-position:65px 65px; } }

/* ── Scan line ── */
.asv-scan {
  position:absolute; left:0; right:0; height:1.5px; pointer-events:none; z-index:1;
  background:linear-gradient(90deg,transparent,rgba(108,99,255,.45),rgba(224,64,251,.35),transparent);
  animation:asvScan 7s linear infinite;
}
@keyframes asvScan {
  0%   { top:-2px; opacity:0; }
  5%   { opacity:1; }
  95%  { opacity:1; }
  100% { top:100%; opacity:0; }
}

/* ── Stars ── */
.asv-stars { position:absolute; inset:0; pointer-events:none; }

/* ── Particles ── */
.asv-particles { position:absolute; inset:0; pointer-events:none; overflow:hidden; }
.asv-particle  {
  position:absolute; border-radius:50%; opacity:0;
  animation:asvFloat linear infinite;
}
@keyframes asvFloat {
  0%   { transform:translateY(0) scale(1); opacity:0; }
  10%  { opacity:.55; }
  90%  { opacity:.22; }
  100% { transform:translateY(-400px) scale(.3); opacity:0; }
}

/* ── Inner ── */
.asv-inner { position:relative; z-index:2; max-width:1200px; margin:0 auto; }

/* ── Badge ── */
.asv-badge {
  display:inline-flex; align-items:center; gap:7px;
  padding:6px 16px; border-radius:99px;
  background:rgba(108,99,255,.12);
  border:1px solid rgba(108,99,255,.25);
  color:#a89cff; font-size:11px; font-weight:600;
  letter-spacing:.1em; text-transform:uppercase;
  margin-bottom:20px;
  animation:asvFadeUp .7s ease both;
}
.asv-badge-dot {
  width:6px; height:6px; border-radius:50%;
  background:#6C63FF;
  box-shadow:0 0 8px rgba(108,99,255,.9);
  animation:asvDotPulse 1.6s ease-in-out infinite;
}
@keyframes asvDotPulse {
  0%,100% { transform:scale(1); opacity:1; }
  50%     { transform:scale(1.6); opacity:.5; }
}

/* ── Title ── */
.asv-title {
  font-family:'Syne',sans-serif;
  font-size:clamp(28px,4vw,56px);
  font-weight:800; line-height:1.1; color:#fff;
  margin-bottom:18px;
  animation:asvFadeUp .7s .1s ease both;
}
.asv-grad {
  background:linear-gradient(135deg,#6C63FF 0%,#e040fb 50%,#00e5ff 100%);
  -webkit-background-clip:text; -webkit-text-fill-color:transparent;
  background-clip:text; background-size:200% 100%;
  animation:asvGradShift 4s linear infinite alternate;
}
@keyframes asvGradShift {
  0%   { background-position:0% 0%; }
  100% { background-position:100% 0%; }
}

.asv-subtitle {
  font-size:clamp(14px,2vw,16px);
  color:rgba(255,255,255,.45);
  max-width:580px; margin:0 auto 64px;
  line-height:1.78; font-weight:300;
  animation:asvFadeUp .7s .2s ease both;
}

/* ── Cards grid ── */
.asv-grid {
  display:grid;
  grid-template-columns:repeat(3,1fr);
  gap:22px;
}
@media(max-width:960px) {
  .asv-grid { grid-template-columns:repeat(2,1fr); }
}
@media(max-width:560px) {
  .asv-grid { grid-template-columns:1fr; gap:16px; }
  .asv-section { padding:70px 4% 90px; }
}

/* ── Card ── */
.asv-card {
  position:relative; overflow:hidden;
  border-radius:22px;
  border:1px solid rgba(255,255,255,.08);
  background:rgba(255,255,255,.03);
  backdrop-filter:blur(12px);
  padding:32px 28px 28px;
  display:flex; flex-direction:column;
  transition:
    transform .45s cubic-bezier(.34,1.56,.64,1),
    box-shadow .45s ease,
    border-color .4s ease;
  animation:asvCardIn .65s ease both;
  cursor:default;
}

/* stagger */
.asv-card:nth-child(1) { animation-delay:.05s; }
.asv-card:nth-child(2) { animation-delay:.13s; }
.asv-card:nth-child(3) { animation-delay:.21s; }
.asv-card:nth-child(4) { animation-delay:.29s; }
.asv-card:nth-child(5) { animation-delay:.37s; }

@keyframes asvCardIn {
  from { opacity:0; transform:translateY(32px) scale(.96); }
  to   { opacity:1; transform:translateY(0) scale(1); }
}

.asv-card:hover {
  transform:translateY(-10px) scale(1.015);
  box-shadow:0 30px 60px rgba(0,0,0,.5);
}

/* ── Glow ring on hover (color per card) ── */
.asv-card::before {
  content:'';
  position:absolute; inset:-1px; border-radius:23px;
  opacity:0;
  transition:opacity .4s ease;
  z-index:0;
  pointer-events:none;
}
.asv-card:hover::before { opacity:1; }

/* ── Shimmer sweep ── */
.asv-card::after {
  content:'';
  position:absolute; inset:0;
  background:linear-gradient(120deg,
    transparent 30%,rgba(255,255,255,.04) 50%,transparent 70%);
  background-size:200% 100%;
  animation:asvShimmer 4s linear infinite;
  pointer-events:none; z-index:0;
}
@keyframes asvShimmer { to { background-position:-200% 0; } }

/* ── Radial glow blob inside card ── */
.asv-card-glow {
  position:absolute;
  width:200px; height:200px;
  border-radius:50%;
  filter:blur(60px);
  top:-60px; right:-60px;
  opacity:.12;
  transition:opacity .4s ease, transform .4s ease;
  pointer-events:none; z-index:0;
}
.asv-card:hover .asv-card-glow { opacity:.22; transform:scale(1.15); }

/* ── Number label ── */
.asv-card-num {
  position:absolute; top:20px; right:24px;
  font-family:'Syne',sans-serif;
  font-size:42px; font-weight:800;
  opacity:.05; line-height:1;
  color:#fff; user-select:none; z-index:0;
  transition:opacity .4s ease;
}
.asv-card:hover .asv-card-num { opacity:.09; }

/* ── Icon box ── */
.asv-icon-wrap {
  position:relative; z-index:1;
  width:58px; height:58px; border-radius:16px;
  display:flex; align-items:center; justify-content:center;
  margin-bottom:22px;
  transition:transform .4s cubic-bezier(.34,1.56,.64,1), box-shadow .4s ease;
  flex-shrink:0;
}
.asv-card:hover .asv-icon-wrap {
  transform:translateY(-4px) scale(1.08);
}

/* pulsing ring around icon */
.asv-icon-ring {
  position:absolute; inset:-6px; border-radius:22px;
  border:1px solid currentColor;
  opacity:0;
  animation:asvRingPulse 2.4s ease-in-out infinite;
}
.asv-card:hover .asv-icon-ring { opacity:.25; }
@keyframes asvRingPulse {
  0%,100% { transform:scale(1);   opacity:.25; }
  50%     { transform:scale(1.12); opacity:0;   }
}

/* ── Content ── */
.asv-card-content { position:relative; z-index:1; flex:1; display:flex; flex-direction:column; }

.asv-card-title {
  font-family:'Syne',sans-serif;
  font-size:18px; font-weight:700; color:#fff;
  margin-bottom:10px; line-height:1.25;
}

.asv-card-desc {
  font-size:13.5px; color:rgba(255,255,255,.42);
  line-height:1.72; font-weight:300; flex:1;
}

/* ── Learn more ── */
.asv-link {
  display:inline-flex; align-items:center; gap:6px;
  font-size:12.5px; font-weight:600;
  text-decoration:none;
  margin-top:20px; padding-top:18px;
  border-top:1px solid rgba(255,255,255,.07);
  transition:gap .25s ease, opacity .25s ease;
  position:relative; z-index:1;
}
.asv-link:hover { gap:10px; opacity:.85; }
.asv-link svg { transition:transform .25s ease; }
.asv-link:hover svg { transform:translateX(3px); }

/* ── Divider line accent ── */
.asv-link::before {
  content:'';
  position:absolute; top:0; left:0;
  height:1px; width:0;
  transition:width .4s ease;
}
.asv-card:hover .asv-link::before { width:100%; }

/* ── Bottom strip ── */
.asv-bottom-strip {
  display:flex; align-items:center; justify-content:center;
  gap:10px; flex-wrap:wrap;
  margin-top:70px; padding-top:50px;
  border-top:1px solid rgba(255,255,255,.07);
  animation:asvFadeUp .7s .55s ease both;
}
.asv-strip-pill {
  display:inline-flex; align-items:center; gap:7px;
  padding:8px 18px; border-radius:99px;
  background:rgba(255,255,255,.04);
  border:1px solid rgba(255,255,255,.09);
  font-size:12.5px; color:rgba(255,255,255,.45);
  font-weight:400;
  transition:all .3s ease;
}
.asv-strip-pill:hover {
  background:rgba(108,99,255,.12);
  border-color:rgba(108,99,255,.3);
  color:#a89cff;
}
.asv-strip-dot { width:5px; height:5px; border-radius:50%; flex-shrink:0; }

@keyframes asvFadeUp {
  from { opacity:0; transform:translateY(18px); }
  to   { opacity:1; transform:translateY(0); }
}
`;

/* ── Data ─────────────────────────────────────────────────────────────────── */
const SERVICES = [
  {
    icon:  "web",
    title: "Website Development",
    desc:  "Crafting stunning, high-performance websites with modern tech. From landing pages to complex web apps — digital experiences that convert.",
    color: "#6C63FF",
    bg:    "rgba(108,99,255,0.15)",
    glow:  "#6C63FF",
    border:"rgba(108,99,255,0.45)",
    link:"/learn/website"
  },
  {
    icon:  "code",
    title: "Software Development",
    desc:  "Custom software solutions engineered for scale. Robust backends, APIs, and enterprise systems that power your business.",
    color: "#00D4AA",
    bg:    "rgba(0,212,170,0.15)",
    glow:  "#00D4AA",
    border:"rgba(0,212,170,0.45)",
    link:"/learn/software"
  },
  {
    icon:  "ai",
    title: "AI Automation",
    desc:  "Transform workflows with intelligent automation. Reduce manual tasks, cut costs, and boost efficiency with tailored AI pipelines.",
    color: "#FF6B6B",
    bg:    "rgba(255,107,107,0.15)",
    glow:  "#FF6B6B",
    border:"rgba(255,107,107,0.45)",
    link:"/learn/aiautomation"
  },
  {
    icon:  "design",
    title: "Graphic Design",
    desc:  "Visual identities that leave a lasting impression. Brand systems, UI/UX design, and marketing collateral crafted with precision.",
    color: "#FF4DC4",
    bg:    "rgba(255,77,196,0.15)",
    glow:  "#FF4DC4",
    border:"rgba(255,77,196,0.45)",
    link:"/learn/graphic"
  },
];

const STRIP_PILLS = [
  { label:"Agile Delivery",      color:"#6C63FF" },
  { label:"24/7 Support",        color:"#00D4AA" },
  { label:"NDA Protected",       color:"#FFB800" },
  { label:"Scalable Architecture",color:"#FF4DC4"},
  { label:"On-Time Delivery",    color:"#FF6B6B" },
];

const PARTICLE_COLORS = ["#6C63FF","#e040fb","#00e5ff","#f9a825","#ff6b6b"];

/* ── Component ───────────────────────────────────────────────────────────── */
export default function Services() {
  const canvasRef    = useRef(null);
  const rafRef       = useRef(null);
  const particlesRef = useRef(null);

  /* inject CSS once */
  useEffect(() => {
    if (document.getElementById("asv-css")) return;
    const s = document.createElement("style");
    s.id = "asv-css"; s.textContent = CSS;
    document.head.appendChild(s);
  }, []);

  /* stars */
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

    const stars = Array.from({ length: 80 }, () => ({
      x: Math.random(), y: Math.random(),
      r: Math.random() * 1.1 + .2,
      speed: Math.random() * .012 + .004,
      phase: Math.random() * Math.PI * 2,
    }));

    let t = 0;
    const draw = () => {
      t++;
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      stars.forEach(s => {
        const a = .08 + .62 * Math.abs(Math.sin(s.phase + t * s.speed));
        ctx.beginPath();
        ctx.arc(s.x * canvas.width, s.y * canvas.height, s.r, 0, Math.PI * 2);
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

  /* particles */
  useEffect(() => {
    const el = particlesRef.current;
    if (!el) return;
    el.innerHTML = "";
    for (let i = 0; i < 18; i++) {
      const p = document.createElement("div");
      p.className = "asv-particle";
      const sz = Math.random() * 4 + 2;
      Object.assign(p.style, {
        width:           `${sz}px`,
        height:          `${sz}px`,
        background:      PARTICLE_COLORS[Math.floor(Math.random() * PARTICLE_COLORS.length)],
        left:            `${Math.random() * 100}%`,
        bottom:          `${Math.random() * 40}px`,
        animationDuration:`${Math.random() * 9 + 5}s`,
        animationDelay:   `${Math.random() * 9}s`,
        filter:          `blur(${Math.random()}px)`,
      });
      el.appendChild(p);
    }
  }, []);

  return (
    <section id="services" className="asv-section">
      {/* ── BG FX ── */}
      <div className="asv-orb asv-orb1" />
      <div className="asv-orb asv-orb2" />
      <div className="asv-orb asv-orb3" />
      <div className="asv-orb asv-orb4" />
      <div className="asv-grid-bg" />
      <div className="asv-scan" />
      <canvas ref={canvasRef} className="asv-stars" />
      <div ref={particlesRef} className="asv-particles" />

      <div className="asv-inner">

        {/* ── Header ── */}
        <div style={{ textAlign:"center" }}>
          <div className="asv-badge">
            <span className="asv-badge-dot" />
            What We Do
          </div>
          <h2 className="asv-title">
            Services That <span className="asv-grad">Scale</span>
          </h2>
          <p className="asv-subtitle">
            End-to-end digital services designed to accelerate your growth —
            from concept to deployment and beyond.
          </p>
        </div>

        {/* ── Cards ── */}
        <div className="asv-grid">
          {SERVICES.map((s, i) => (
            <div
              key={s.title}
              className="asv-card"
              style={{
                "--card-border": s.border,
                "--card-glow":   s.glow,
              }}
              onMouseEnter={e => {
                e.currentTarget.style.boxShadow =
                  `0 30px 60px rgba(0,0,0,.5), 0 0 0 1px ${s.border}, 0 0 40px ${s.glow}22`;
              }}
              onMouseLeave={e => {
                e.currentTarget.style.boxShadow = "";
              }}
            >
              {/* inner glow blob */}
              <div className="asv-card-glow" style={{ background: s.glow }} />

              {/* faint number */}
              <div className="asv-card-num">0{i + 1}</div>

              {/* icon */}
              <div
                className="asv-icon-wrap"
                style={{ background: s.bg }}
              >
                <div
                  className="asv-icon-ring"
                  style={{ color: s.color, borderColor: s.color }}
                />
                <Icon d={Icons[s.icon]} size={26} color={s.color} />
              </div>

              {/* text */}
              <div className="asv-card-content">
                <h3 className="asv-card-title">{s.title}</h3>
                <p className="asv-card-desc">{s.desc}</p>

                <Link to={s.link} className="asv-link" style={{ color: s.color }}>
                  <span>Learn more</span>
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none"
                    stroke="currentColor" strokeWidth="2.2"
                    strokeLinecap="round" strokeLinejoin="round">
                    <line x1="5" y1="12" x2="19" y2="12"/>
                    <polyline points="12 5 19 12 12 19"/>
                  </svg>
                </Link>
              </div>
            </div>
          ))}
        </div>

        {/* ── Bottom strip ── */}
        <div className="asv-bottom-strip">
          {STRIP_PILLS.map(({ label, color }) => (
            <div key={label} className="asv-strip-pill">
              <span className="asv-strip-dot" style={{ background: color, boxShadow:`0 0 6px ${color}` }} />
              {label}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}