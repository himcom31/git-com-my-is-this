import { useEffect, useRef, useState } from "react";
import { Icon, Icons } from "../icons";

/* ── CSS ─────────────────────────────────────────────────────────────────── */
const CSS = `
@import url('https://fonts.googleapis.com/css2?family=Syne:wght@700;800&family=DM+Sans:wght@300;400;500&display=swap');

/* ── Section ── */
.atm-section {
  position: relative;
  padding: 110px 5% 130px;
  background: #06060f;
  overflow: hidden;
  font-family: 'DM Sans', sans-serif;
}
@media(max-width:560px) { .atm-section { padding: 72px 4% 90px; } }

/* ── Orbs ── */
.atm-orb {
  position: absolute; border-radius: 50%;
  filter: blur(100px); pointer-events: none;
  animation: atmOrb ease-in-out infinite alternate;
}
.atm-orb1 { width:500px;height:500px;background:#4f46e5;top:-180px;left:-130px;opacity:.15;animation-duration:13s; }
.atm-orb2 { width:360px;height:360px;background:#e040fb;bottom:-100px;right:-80px;opacity:.13;animation-duration:10s;animation-delay:-5s; }
.atm-orb3 { width:280px;height:280px;background:#00e5ff;top:45%;left:55%;opacity:.08;animation-duration:16s;animation-delay:-8s; }
.atm-orb4 { width:200px;height:200px;background:#ff6b6b;top:20%;right:8%;opacity:.07;animation-duration:11s;animation-delay:-3s; }
@keyframes atmOrb {
  0%   { transform:translate(0,0) scale(1); }
  50%  { transform:translate(26px,-22px) scale(1.07); }
  100% { transform:translate(-18px,20px) scale(.94); }
}

/* ── Grid bg ── */
.atm-grid-bg {
  position:absolute;inset:0;pointer-events:none;
  background-image:
    linear-gradient(rgba(108,99,255,.05) 1px,transparent 1px),
    linear-gradient(90deg,rgba(108,99,255,.05) 1px,transparent 1px);
  background-size:65px 65px;
  animation:atmGridMove 20s linear infinite;
}
@keyframes atmGridMove { to { background-position:65px 65px; } }

/* ── Scan line ── */
.atm-scan {
  position:absolute;left:0;right:0;height:1.5px;pointer-events:none;z-index:1;
  background:linear-gradient(90deg,transparent,rgba(108,99,255,.45),rgba(224,64,251,.35),transparent);
  animation:atmScan 8s linear infinite;
}
@keyframes atmScan {
  0%   { top:-2px;opacity:0; }
  5%   { opacity:1; }
  95%  { opacity:1; }
  100% { top:100%;opacity:0; }
}

/* ── Stars ── */
.atm-stars { position:absolute;inset:0;pointer-events:none; }

/* ── Particles ── */
.atm-particles { position:absolute;inset:0;pointer-events:none;overflow:hidden; }
.atm-particle {
  position:absolute;border-radius:50%;opacity:0;
  animation:atmFloat linear infinite;
}
@keyframes atmFloat {
  0%   { transform:translateY(0) scale(1);opacity:0; }
  10%  { opacity:.55; }
  90%  { opacity:.22; }
  100% { transform:translateY(-400px) scale(.3);opacity:0; }
}

/* ── Inner ── */
.atm-inner { position:relative;z-index:2;max-width:1200px;margin:0 auto; }

/* ── Badge ── */
.atm-badge {
  display:inline-flex;align-items:center;gap:7px;
  padding:6px 16px;border-radius:99px;
  background:rgba(108,99,255,.12);
  border:1px solid rgba(108,99,255,.25);
  color:#a89cff;font-size:11px;font-weight:600;
  letter-spacing:.1em;text-transform:uppercase;
  margin-bottom:20px;
  animation:atmFadeUp .7s ease both;
}
.atm-badge-dot {
  width:6px;height:6px;border-radius:50%;
  background:#6C63FF;box-shadow:0 0 8px rgba(108,99,255,.9);
  animation:atmDotPulse 1.6s ease-in-out infinite;
}
@keyframes atmDotPulse {
  0%,100% { transform:scale(1);opacity:1; }
  50%     { transform:scale(1.6);opacity:.5; }
}

/* ── Title ── */
.atm-title {
  font-family:'Syne',sans-serif;
  font-size:clamp(28px,4vw,56px);font-weight:800;line-height:1.1;
  color:#fff;margin-bottom:18px;
  animation:atmFadeUp .7s .1s ease both;
}
.atm-grad {
  background:linear-gradient(135deg,#6C63FF 0%,#e040fb 50%,#00e5ff 100%);
  -webkit-background-clip:text;-webkit-text-fill-color:transparent;
  background-clip:text;background-size:200% 100%;
  animation:atmGradShift 4s linear infinite alternate;
}
@keyframes atmGradShift {
  0%   { background-position:0% 0%; }
  100% { background-position:100% 0%; }
}

.atm-subtitle {
  font-size:clamp(14px,2vw,16px);
  color:rgba(255,255,255,.45);
  max-width:580px;margin:0 auto 0;
  line-height:1.78;font-weight:300;
  animation:atmFadeUp .7s .2s ease both;
}

/* ── Marquee strip ── */
.atm-marquee-wrap {
  overflow:hidden;margin:52px -5% 0;
  -webkit-mask:linear-gradient(90deg,transparent,#000 10%,#000 90%,transparent);
  mask:linear-gradient(90deg,transparent,#000 10%,#000 90%,transparent);
}
.atm-marquee-track {
  display:flex;gap:24px;
  animation:atmMarquee 30s linear infinite;
  width:max-content;
}
.atm-marquee-track:hover { animation-play-state:paused; }
@keyframes atmMarquee { to { transform:translateX(-50%); } }

/* ── Card ── */
.atm-card {
  position:relative;overflow:hidden;
  border-radius:22px;
  border:1px solid rgba(255,255,255,.08);
  background:rgba(255,255,255,.03);
  backdrop-filter:blur(14px);
  padding:30px 28px 28px;
  width:360px;flex-shrink:0;
  transition:transform .45s cubic-bezier(.34,1.56,.64,1),
             box-shadow .45s ease, border-color .4s ease;
  cursor:default;
}
@media(max-width:560px) { .atm-card { width:300px; padding:22px 20px; } }

.atm-card:hover {
  transform:translateY(-8px) scale(1.02);
  border-color:rgba(108,99,255,.4);
  box-shadow:0 24px 50px rgba(0,0,0,.5), 0 0 30px rgba(108,99,255,.12);
}

/* shimmer */
.atm-card::after {
  content:'';position:absolute;inset:0;
  background:linear-gradient(120deg,transparent 30%,rgba(255,255,255,.04) 50%,transparent 70%);
  background-size:200% 100%;
  animation:atmShimmer 5s linear infinite;
  pointer-events:none;
}
@keyframes atmShimmer { to { background-position:-200% 0; } }

/* inner glow blob */
.atm-card-glow {
  position:absolute;
  width:180px;height:180px;border-radius:50%;
  filter:blur(55px);
  top:-50px;right:-50px;
  opacity:.1;pointer-events:none;
  transition:opacity .4s ease;
}
.atm-card:hover .atm-card-glow { opacity:.2; }

/* ── Stars row ── */
.atm-stars-row {
  display:flex;gap:4px;margin-bottom:18px;
}
.atm-star {
  font-size:14px;color:#FFB800;
  animation:atmStarPop .5s ease both;
}
.atm-star:nth-child(1) { animation-delay:.05s; }
.atm-star:nth-child(2) { animation-delay:.10s; }
.atm-star:nth-child(3) { animation-delay:.15s; }
.atm-star:nth-child(4) { animation-delay:.20s; }
.atm-star:nth-child(5) { animation-delay:.25s; }
@keyframes atmStarPop {
  from { transform:scale(0) rotate(-30deg);opacity:0; }
  to   { transform:scale(1) rotate(0deg);opacity:1; }
}

/* ── Quote mark ── */
.atm-quote-icon {
  position:absolute;top:24px;right:22px;
  font-family:'Syne',sans-serif;font-size:72px;
  line-height:1;color:rgba(255,255,255,.04);
  font-weight:800;user-select:none;pointer-events:none;
  transition:color .4s ease;
}
.atm-card:hover .atm-quote-icon { color:rgba(255,255,255,.07); }

/* ── Text ── */
.atm-text {
  font-size:14px;color:rgba(255,255,255,.55);
  line-height:1.78;margin-bottom:24px;
  font-style:italic;font-weight:300;
  position:relative;z-index:1;
}

/* ── Author ── */
.atm-author {
  display:flex;align-items:center;gap:12px;
  padding-top:18px;border-top:1px solid rgba(255,255,255,.07);
  position:relative;z-index:1;
}
.atm-avatar {
  width:44px;height:44px;border-radius:50%;
  display:flex;align-items:center;justify-content:center;
  font-family:'Syne',sans-serif;font-size:14px;
  font-weight:800;color:#fff;flex-shrink:0;
  position:relative;
  transition:transform .4s cubic-bezier(.34,1.56,.64,1);
}
.atm-card:hover .atm-avatar { transform:scale(1.1); }

/* pulsing ring on avatar */
.atm-avatar::after {
  content:'';
  position:absolute;inset:-3px;border-radius:50%;
  border:1.5px solid currentColor;
  opacity:0;
  animation:atmAvatarRing 2.2s ease-in-out infinite;
}
.atm-card:hover .atm-avatar::after { opacity:.35; }
@keyframes atmAvatarRing {
  0%,100% { transform:scale(1);opacity:.35; }
  50%     { transform:scale(1.18);opacity:0; }
}

.atm-author-name { font-size:14.5px;font-weight:600;color:#fff;line-height:1.2; }
.atm-author-role { font-size:12px;color:rgba(255,255,255,.35);margin-top:2px; }

/* ── Scroll cards (mobile) ── */
.atm-scroll-wrap {
  display:none;
  overflow-x:auto;
  -webkit-overflow-scrolling:touch;
  scroll-snap-type:x mandatory;
  gap:16px;
  padding-bottom:16px;
  scrollbar-width:none;
  margin-top:0;
}
.atm-scroll-wrap::-webkit-scrollbar { display:none; }
.atm-scroll-wrap .atm-card {
  scroll-snap-align:center;
  width:85vw;max-width:340px;flex-shrink:0;
}
@media(max-width:768px) {
  .atm-marquee-wrap { display:none; }
  .atm-scroll-wrap  { display:flex; margin-top:44px; }
}

/* ── Scroll dots ── */
.atm-scroll-dots {
  display:none;justify-content:center;gap:6px;margin-top:18px;
}
@media(max-width:768px) { .atm-scroll-dots { display:flex; } }
.atm-dot {
  width:6px;height:6px;border-radius:50%;
  background:rgba(255,255,255,.15);
  transition:all .3s ease;
}
.atm-dot.active {
  background:#6C63FF;width:18px;border-radius:99px;
  box-shadow:0 0 8px rgba(108,99,255,.7);
}

/* ── Trust strip ── */
.atm-trust {
  display:flex;align-items:center;justify-content:center;
  gap:36px;flex-wrap:wrap;
  margin-top:70px;padding-top:50px;
  border-top:1px solid rgba(255,255,255,.07);
  animation:atmFadeUp .7s .5s ease both;
}
.atm-trust-item {
  text-align:center;
}
.atm-trust-num {
  font-family:'Syne',sans-serif;font-size:36px;font-weight:800;
  background:linear-gradient(135deg,#6C63FF,#e040fb);
  -webkit-background-clip:text;-webkit-text-fill-color:transparent;
  background-clip:text;line-height:1;
}
.atm-trust-label {
  font-size:11.5px;color:rgba(255,255,255,.3);
  letter-spacing:.1em;text-transform:uppercase;margin-top:5px;
}

@keyframes atmFadeUp {
  from { opacity:0;transform:translateY(18px); }
  to   { opacity:1;transform:translateY(0); }
}
`;

/* ── Data ─────────────────────────────────────────────────────────────────── */
const TESTIMONIALS = [
  {
    text:     "C&S completely transformed our digital presence. Their AI automation solution saved us 40+ hours per week. Truly world-class work.",
    name:     "Sarah Mitchell",
    role:     "CEO, TechVentures Inc.",
    initials: "SM",
    color:    "#6C63FF",
  },
  {
    text:     "The website they built for us outperforms every competitor. Clean code, stunning design, and delivered ahead of schedule. Exceptional team.",
    name:     "James Okafor",
    role:     "Founder, GrowthLab",
    initials: "JO",
    color:    "#00D4AA",
  },
  {
    text:     "Their AI agent has become the backbone of our customer support. Response time went from hours to seconds. Absolutely game-changing.",
    name:     "Priya Sharma",
    role:     "CTO, Nexus Systems",
    initials: "PS",
    color:    "#FF6B6B",
  },
  {
    text:     "We went from 0 to fully automated in 3 weeks. The team is sharp, communicative, and genuinely cares about results. Outstanding.",
    name:     "Lena Fischer",
    role:     "Head of Ops, FinTrack",
    initials: "LF",
    color:    "#FFB800",
  },
  {
    text:     "The brand identity C&S created gave us a 60% uplift in user trust within the first month. Creativity meets execution perfectly.",
    name:     "Marco Reyes",
    role:     "CMO, Velox Studio",
    initials: "MR",
    color:    "#FF4DC4",
  },
  {
    text:     "From backend architecture to pixel-perfect UI — they do it all and they do it brilliantly. Our best vendor relationship by far.",
    name:     "Aisha Nkosi",
    role:     "VP Engineering, DataSpark",
    initials: "AN",
    color:    "#00e5ff",
  },
];

const TRUST = [
];

const PARTICLE_COLORS = ["#6C63FF","#e040fb","#00e5ff","#f9a825","#ff6b6b"];

/* ── Component ───────────────────────────────────────────────────────────── */
export default function Testimonials() {
  const canvasRef     = useRef(null);
  const rafRef        = useRef(null);
  const particlesRef  = useRef(null);
  const scrollRef     = useRef(null);
  const [activeDot, setActiveDot] = useState(0);

  /* inject CSS */
  useEffect(() => {
    if (document.getElementById("atm-css")) return;
    const s = document.createElement("style");
    s.id = "atm-css"; s.textContent = CSS;
    document.head.appendChild(s);
  }, []);

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
    return () => { cancelAnimationFrame(rafRef.current); window.removeEventListener("resize", resize); };
  }, []);

  /* particles */
  useEffect(() => {
    const el = particlesRef.current;
    if (!el) return;
    el.innerHTML = "";
    for (let i = 0; i < 18; i++) {
      const p = document.createElement("div");
      p.className = "atm-particle";
      const sz = Math.random() * 4 + 2;
      Object.assign(p.style, {
        width: `${sz}px`, height: `${sz}px`,
        background: PARTICLE_COLORS[Math.floor(Math.random() * PARTICLE_COLORS.length)],
        left: `${Math.random() * 100}%`,
        bottom: `${Math.random() * 40}px`,
        animationDuration: `${Math.random() * 9 + 5}s`,
        animationDelay: `${Math.random() * 9}s`,
        filter: `blur(${Math.random()}px)`,
      });
      el.appendChild(p);
    }
  }, []);

  /* scroll dot tracker */
  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;
    const onScroll = () => {
      const idx = Math.round(el.scrollLeft / (el.offsetWidth * 0.85));
      setActiveDot(Math.min(idx, TESTIMONIALS.length - 1));
    };
    el.addEventListener("scroll", onScroll, { passive: true });
    return () => el.removeEventListener("scroll", onScroll);
  }, []);

  /* duplicate for infinite marquee */
  const doubled = [...TESTIMONIALS, ...TESTIMONIALS];

  const CardContent = ({ t }) => (
    <>
      <div className="atm-card-glow" style={{ background: t.color }} />
      <div className="atm-quote-icon">"</div>

      <div className="atm-stars-row">
        {[...Array(5)].map((_, j) => (
          <span key={j} className="atm-star">★</span>
        ))}
      </div>

      <p className="atm-text">"{t.text}"</p>

      <div className="atm-author">
        <div
          className="atm-avatar"
          style={{
            background: `linear-gradient(135deg, ${t.color}cc, ${t.color}55)`,
            boxShadow: `0 4px 16px ${t.color}44`,
            color: t.color,
          }}
        >
          {t.initials}
        </div>
        <div>
          <div className="atm-author-name">{t.name}</div>
          <div className="atm-author-role">{t.role}</div>
        </div>
      </div>
    </>
  );

  return (
    <section id="testimonials" className="atm-section">
      {/* BG FX */}
      <div className="atm-orb atm-orb1" />
      <div className="atm-orb atm-orb2" />
      <div className="atm-orb atm-orb3" />
      <div className="atm-orb atm-orb4" />
      <div className="atm-grid-bg" />
      <div className="atm-scan" />
      <canvas ref={canvasRef} className="atm-stars" />
      <div ref={particlesRef} className="atm-particles" />

      <div className="atm-inner">
        {/* Header */}
        <div style={{ textAlign:"center" }}>
          <div className="atm-badge">
            <span className="atm-badge-dot" />
            Testimonials
          </div>
          <h2 className="atm-title">
            Loved by <span className="atm-grad">Clients</span>
          </h2>
          <p className="atm-subtitle">
            Don't take our word for it. Here's what our clients say about working with &amp; S.
          </p>
        </div>

        {/* ── Marquee (desktop) ── */}
        <div className="atm-marquee-wrap">
          <div className="atm-marquee-track">
            {doubled.map((t, i) => (
              <div key={i} className="atm-card">
                <CardContent t={t} />
              </div>
            ))}
          </div>
        </div>

        {/* ── Scroll (mobile) ── */}
        <div ref={scrollRef} className="atm-scroll-wrap">
          {TESTIMONIALS.map((t, i) => (
            <div key={i} className="atm-card">
              <CardContent t={t} />
            </div>
          ))}
        </div>

        {/* scroll dots */}
        <div className="atm-scroll-dots">
          {TESTIMONIALS.map((_, i) => (
            <div
              key={i}
              className={`atm-dot${activeDot === i ? " active" : ""}`}
              onClick={() => {
                const el = scrollRef.current;
                if (el) el.scrollTo({ left: i * el.offsetWidth * 0.85, behavior: "smooth" });
              }}
            />
          ))}
        </div>

        {/* Trust strip */}
        <div className="atm-trust">
          {TRUST.map(({ num, label }) => (
            <div key={label} className="atm-trust-item">
              <div className="atm-trust-num">{num}</div>
              <div className="atm-trust-label">{label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}