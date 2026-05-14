import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";



const SERVICES = [
  {
    icon: "⚡",
    title: "Landing Pages",
    desc: "High-converting, blazing-fast landing pages built to capture leads and turn visitors into customers.",
    tag: "Conversion-First",
    color: "#00FFB2",
  },
  {
    icon: "🧩",
    title: "Web Applications",
    desc: "Complex, scalable web apps with real-time features, auth systems, and seamless UX flows.",
    tag: "Full-Stack",
    color: "#FF6BFF",
  },
  {
    icon: "🛒",
    title: "E-Commerce Stores",
    desc: "Revenue-driving storefronts with optimized checkout, inventory management, and analytics.",
    tag: "Revenue-Driven",
    color: "#FFD166",
  },
  {
    icon: "🎨",
    title: "UI/UX Design Systems",
    desc: "Cohesive design languages that scale across products — tokens, components, documentation.",
    tag: "Design-Ops",
    color: "#6BFFF8",
  },
  {
    icon: "📱",
    title: "Responsive & PWA",
    desc: "Mobile-first experiences that feel native on every device, installable as Progressive Web Apps.",
    tag: "Mobile-First",
    color: "#FF8C42",
  },
  {
    icon: "🚀",
    title: "Performance Audits",
    desc: "Deep-dive optimization — Core Web Vitals, bundle splitting, lazy loading, and sub-second load times.",
    tag: "Speed++",
    color: "#AAFF72",
  },
];

const PROCESS = [
  { num: "01", title: "Discovery", desc: "We map your goals, users, and competitive landscape before a single pixel is placed." },
  { num: "02", title: "Blueprint", desc: "Wireframes, architecture diagrams, and a tech-stack decision that fits your scale." },
  { num: "03", title: "Design Sprint", desc: "High-fidelity mockups and interactive prototypes — iterate fast, decide confidently." },
  { num: "04", title: "Build", desc: "Clean, tested code. CI/CD pipelines. Weekly demos so you're never in the dark." },
  { num: "05", title: "Launch", desc: "Staged rollout, monitoring dashboards, and a war-room for the first 48 hours." },
  { num: "06", title: "Evolve", desc: "Analytics reviews, A/B tests, and a retainer model that keeps your product growing." },
];

const TECH = [
  { name: "React", category: "Frontend" },
  { name: "Next.js", category: "Framework" },
  { name: "TypeScript", category: "Language" },
  { name: "Tailwind CSS", category: "Styling" },
  { name: "Framer Motion", category: "Animation" },
  { name: "Node.js", category: "Backend" },
  { name: "PostgreSQL", category: "Database" },
  { name: "MongoDB", category: "Database" },
  { name: "Express.js", category: "API" },
  { name: "Vercel", category: "Hosting" },
  { name: "Figma", category: "Design" },
  { name: "Vitest", category: "Testing" },
  { name: "Docker", category: "DevOps" },
];

const STATS = [
  { value: "20+", label: "Projects Shipped" },
  { value: "98%", label: "Client Retention" },
  { value: "< 1s", label: "Avg Load Time" },
  { value: "4.5★", label: "Average Rating" },
];


function useInView(threshold = 0.15) {
  const ref = useRef(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setInView(true); }, { threshold });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);
  return [ref, inView];
}

function AnimSection({ children, className = "", delay = 0 }) {
  const [ref, inView] = useInView();
  return (
    <div
      ref={ref}
      className={className}
      style={{
        opacity: inView ? 1 : 0,
        transform: inView ? "translateY(0)" : "translateY(40px)",
        transition: `opacity 0.7s ease ${delay}ms, transform 0.7s ease ${delay}ms`,
      }}
    >
      {children}
    </div>
  );
}

function Cursor() {
  const [pos, setPos] = useState({ x: -100, y: -100 });
  const [big, setBig] = useState(false);
  useEffect(() => {
    const move = (e) => setPos({ x: e.clientX, y: e.clientY });
    const over = (e) => { if (e.target.closest("button, a, [data-hover]")) setBig(true); else setBig(false); };
    window.addEventListener("mousemove", move);
    window.addEventListener("mouseover", over);
    return () => { window.removeEventListener("mousemove", move); window.removeEventListener("mouseover", over); };
  }, []);
  return (
    <div
      style={{
        position: "fixed", left: pos.x, top: pos.y, pointerEvents: "none", zIndex: 9999,
        width: big ? 48 : 16, height: big ? 48 : 16,
        borderRadius: "50%", border: "2px solid #00FFB2",
        transform: "translate(-50%, -50%)",
        transition: "width 0.2s, height 0.2s, background 0.2s",
        background: big ? "rgba(0,255,178,0.15)" : "transparent",
        mixBlendMode: "difference",
      }}
    />
  );
}

export default function WebDevLearnMore() {
  const [activeNav, setActiveNav] = useState("Services");
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  const nevigation=useNavigate();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div
      style={{
        fontFamily: "'Syne', 'Space Mono', monospace",
        background: "#080B12",
        color: "#E8E8F0",
        minHeight: "100vh",
        overflowX: "hidden",
        cursor: "none",
      }}
    >
      {/* Custom Google Font */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Syne:wght@400;500;600;700;800&family=Space+Mono:wght@400;700&display=swap');
        * { box-sizing: border-box; margin: 0; padding: 0; }
        ::-webkit-scrollbar { width: 4px; } 
        ::-webkit-scrollbar-track { background: #080B12; }
        ::-webkit-scrollbar-thumb { background: #00FFB2; border-radius: 2px; }
        body { cursor: none; }
        @keyframes marquee { 0%{transform:translateX(0)} 100%{transform:translateX(-50%)} }
        @keyframes pulse-ring { 0%{transform:scale(1);opacity:0.4} 100%{transform:scale(2.2);opacity:0} }
        @keyframes float { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-18px)} }
        @keyframes gradShift { 0%{background-position:0% 50%} 50%{background-position:100% 50%} 100%{background-position:0% 50%} }
        .grad-text {
          background: linear-gradient(90deg, #00FFB2, #6BFFF8, #FF6BFF, #00FFB2);
          background-size: 300% auto;
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          animation: gradShift 4s ease infinite;
        }
        .glow-btn:hover { box-shadow: 0 0 32px #00FFB2aa, 0 0 8px #00FFB244; }
        .card-hover { transition: transform 0.3s ease, box-shadow 0.3s ease; }
        .card-hover:hover { transform: translateY(-6px); }
      `}</style>

      <Cursor />

      {/* HERO */}
      <section style={{ minHeight: "100vh", display: "flex", alignItems: "center", position: "relative", padding: "120px 2rem 80px" }}>
        {/* Grid background */}
        <div style={{
          position: "absolute", inset: 0, zIndex: 0,
          backgroundImage: "linear-gradient(rgba(0,255,178,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(0,255,178,0.04) 1px, transparent 1px)",
          backgroundSize: "60px 60px",
        }} />
        {/* Glow blob */}
        <div style={{
          position: "absolute", top: "20%", right: "10%", width: 500, height: 500,
          borderRadius: "50%", background: "radial-gradient(circle, rgba(0,255,178,0.12) 0%, transparent 70%)",
          filter: "blur(40px)", zIndex: 0,
          animation: "float 6s ease-in-out infinite",
        }} />

        <div style={{ maxWidth: 1200, margin: "0 auto", position: "relative", zIndex: 1, width: "100%" }}>
          <AnimSection delay={0}>
            <div style={{
              display: "inline-flex", alignItems: "center", gap: 8,
              background: "rgba(0,255,178,0.08)", border: "1px solid rgba(0,255,178,0.2)",
              borderRadius: 100, padding: "6px 16px", marginBottom: 28,
            }}>
              <span style={{ width: 6, height: 6, borderRadius: "50%", background: "#00FFB2", display: "inline-block", boxShadow: "0 0 8px #00FFB2" }} />
              <span style={{ fontSize: 12, fontFamily: "'Space Mono',monospace", color: "#00FFB2", letterSpacing: 1 }}>
                WEBSITE DEVELOPMENT
              </span>
            </div>
          </AnimSection>

          <AnimSection delay={100}>
            <h1 style={{
              fontFamily: "'Syne',sans-serif", fontWeight: 800,
              fontSize: "clamp(2.8rem, 7vw, 6rem)", lineHeight: 1.05,
              letterSpacing: -2, marginBottom: 28,
            }}>
              We Build Websites<br />
              <span className="grad-text">That Actually Work.</span>
            </h1>
          </AnimSection>

          <AnimSection delay={200}>
            <p style={{
              fontSize: "clamp(1rem, 2vw, 1.2rem)", color: "#8888A8",
              maxWidth: 560, lineHeight: 1.7, marginBottom: 48,
              fontFamily: "'Syne',sans-serif",
            }}>
              Crafting stunning, high-performance websites with modern tech. From landing pages to complex web apps — digital experiences that convert and scale.
            </p>
          </AnimSection>


          {/* Stats row */}
          <AnimSection delay={450}>
            <div style={{
              display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(120px, 1fr))",
              gap: 2, marginTop: 80,
              border: "1px solid rgba(255,255,255,0.07)",
              borderRadius: 16, overflow: "hidden",
              maxWidth: 700,
            }}>
              {STATS.map((s, i) => (
                <div key={i} style={{
                  padding: "28px 24px",
                  background: "rgba(255,255,255,0.02)",
                  borderRight: i < STATS.length - 1 ? "1px solid rgba(255,255,255,0.07)" : "none",
                  textAlign: "center",
                }}>
                  <div style={{ fontSize: "clamp(1.5rem, 3vw, 2rem)", fontWeight: 800, color: "#00FFB2", fontFamily: "'Syne',sans-serif" }}>{s.value}</div>
                  <div style={{ fontSize: 12, color: "#66667A", marginTop: 4, fontFamily: "'Space Mono',monospace" }}>{s.label}</div>
                </div>
              ))}
            </div>
          </AnimSection>
        </div>
      </section>

      {/* MARQUEE */}
      <div style={{ background: "#00FFB2", padding: "14px 0", overflow: "hidden" }}>
        <div style={{ display: "flex", animation: "marquee 20s linear infinite", whiteSpace: "nowrap", width: "200%" }}>
          {[...Array(2)].map((_, i) => (
            <span key={i} style={{ display: "flex", gap: "3rem", paddingRight: "3rem" }}>
              {["React", "Next.js", "TypeScript", "Tailwind", "Node.js", "PostgreSQL", "Figma", "Vercel", "Docker","MongoDB","Express.js"].map((t) => (
                <span key={t} style={{ fontFamily: "'Space Mono',monospace", fontWeight: 700, fontSize: 13, color: "#080B12", letterSpacing: 1 }}>
                  ✦ {t}
                </span>
              ))}
            </span>
          ))}
        </div>
      </div>

      {/* SERVICES */}
      <section style={{ padding: "120px 2rem", maxWidth: 1200, margin: "0 auto" }}>
        <AnimSection>
          <div style={{ marginBottom: 70 }}>
            <p style={{ fontFamily: "'Space Mono',monospace", fontSize: 12, color: "#00FFB2", letterSpacing: 3, marginBottom: 16 }}>// WHAT WE BUILD</p>
            <h2 style={{ fontFamily: "'Syne',sans-serif", fontWeight: 800, fontSize: "clamp(2rem, 5vw, 3.5rem)", letterSpacing: -1 }}>
              Services That Move<br />the Needle
            </h2>
          </div>
        </AnimSection>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))", gap: 24 }}>
          {SERVICES.map((svc, i) => (
            <AnimSection key={i} delay={i * 80}>
              <div
                className="card-hover"
                data-hover
                style={{
                  background: "rgba(255,255,255,0.025)",
                  border: "1px solid rgba(255,255,255,0.07)",
                  borderRadius: 20, padding: "36px 32px",
                  position: "relative", overflow: "hidden",
                  cursor: "none",
                }}
              >
                <div style={{
                  position: "absolute", top: 0, left: 0, right: 0, height: 2,
                  background: `linear-gradient(90deg, transparent, ${svc.color}, transparent)`,
                }} />
                <div style={{ fontSize: 36, marginBottom: 16 }}>{svc.icon}</div>
                <div style={{
                  display: "inline-block", background: `${svc.color}18`,
                  border: `1px solid ${svc.color}44`, borderRadius: 100,
                  padding: "3px 12px", marginBottom: 14,
                  fontFamily: "'Space Mono',monospace", fontSize: 10, color: svc.color, letterSpacing: 1,
                }}>
                  {svc.tag}
                </div>
                <h3 style={{ fontFamily: "'Syne',sans-serif", fontWeight: 700, fontSize: 20, marginBottom: 10 }}>{svc.title}</h3>
                <p style={{ color: "#7070889", fontSize: 15, lineHeight: 1.65, color: "#88889A" }}>{svc.desc}</p>
              </div>
            </AnimSection>
          ))}
        </div>
      </section>

      {/* PROCESS */}
      <section style={{ padding: "120px 2rem", background: "rgba(255,255,255,0.015)", borderTop: "1px solid rgba(255,255,255,0.05)", borderBottom: "1px solid rgba(255,255,255,0.05)" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto" }}>
          <AnimSection>
            <div style={{ marginBottom: 70, display: "flex", justifyContent: "space-between", alignItems: "flex-end", flexWrap: "wrap", gap: 20 }}>
              <div>
                <p style={{ fontFamily: "'Space Mono',monospace", fontSize: 12, color: "#FF6BFF", letterSpacing: 3, marginBottom: 16 }}>// HOW WE WORK</p>
                <h2 style={{ fontFamily: "'Syne',sans-serif", fontWeight: 800, fontSize: "clamp(2rem, 5vw, 3.5rem)", letterSpacing: -1 }}>
                  The Process
                </h2>
              </div>
              <p style={{ color: "#66667A", maxWidth: 340, fontSize: 15, lineHeight: 1.7 }}>
                A battle-tested 6-step framework that eliminates guesswork and ships on time, every time.
              </p>
            </div>
          </AnimSection>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: 20 }}>
            {PROCESS.map((step, i) => (
              <AnimSection key={i} delay={i * 80}>
                <div
                  className="card-hover"
                  style={{
                    display: "flex", gap: 20, padding: "28px 24px",
                    background: "rgba(255,255,255,0.02)",
                    border: "1px solid rgba(255,255,255,0.07)",
                    borderRadius: 16, cursor: "none",
                  }}
                >
                  <div style={{
                    fontFamily: "'Space Mono',monospace", fontWeight: 700,
                    fontSize: 13, color: "#FF6BFF", minWidth: 32, paddingTop: 2,
                  }}>
                    {step.num}
                  </div>
                  <div>
                    <h3 style={{ fontFamily: "'Syne',sans-serif", fontWeight: 700, fontSize: 17, marginBottom: 8 }}>{step.title}</h3>
                    <p style={{ color: "#77778A", fontSize: 14, lineHeight: 1.65 }}>{step.desc}</p>
                  </div>
                </div>
              </AnimSection>
            ))}
          </div>
        </div>
      </section>

      {/* TECH STACK */}
      <section style={{ padding: "120px 2rem", maxWidth: 1200, margin: "0 auto" }}>
        <AnimSection>
          <div style={{ marginBottom: 60 }}>
            <p style={{ fontFamily: "'Space Mono',monospace", fontSize: 12, color: "#FFD166", letterSpacing: 3, marginBottom: 16 }}>// TECHNOLOGY</p>
            <h2 style={{ fontFamily: "'Syne',sans-serif", fontWeight: 800, fontSize: "clamp(2rem, 5vw, 3.5rem)", letterSpacing: -1 }}>
              Built with the Best
            </h2>
          </div>
        </AnimSection>

        <div style={{ display: "flex", flexWrap: "wrap", gap: 14 }}>
          {TECH.map((t, i) => (
            <AnimSection key={i} delay={i * 40}>
              <div
                data-hover
                style={{
                  background: "rgba(255,255,255,0.03)",
                  border: "1px solid rgba(255,255,255,0.08)",
                  borderRadius: 12, padding: "14px 22px",
                  display: "flex", flexDirection: "column", gap: 4,
                  cursor: "none",
                  transition: "border-color 0.2s, background 0.2s",
                }}
                onMouseEnter={e => { e.currentTarget.style.borderColor = "#FFD16680"; e.currentTarget.style.background = "rgba(255,209,102,0.05)"; }}
                onMouseLeave={e => { e.currentTarget.style.borderColor = "rgba(255,255,255,0.08)"; e.currentTarget.style.background = "rgba(255,255,255,0.03)"; }}
              >
                <span style={{ fontFamily: "'Syne',sans-serif", fontWeight: 700, fontSize: 15 }}>{t.name}</span>
                <span style={{ fontFamily: "'Space Mono',monospace", fontSize: 10, color: "#FFD166", letterSpacing: 1 }}>{t.category}</span>
              </div>
            </AnimSection>
          ))}
        </div>
      </section>


      {/* CTA */}
      <section style={{ padding: "140px 2rem", textAlign: "center", position: "relative", overflow: "hidden" }}>
        <div style={{
          position: "absolute", top: "50%", left: "50%", transform: "translate(-50%, -50%)",
          width: 600, height: 600,
          borderRadius: "50%", background: "radial-gradient(circle, rgba(0,255,178,0.08) 0%, transparent 70%)",
          filter: "blur(60px)", zIndex: 0,
        }} />
        <div style={{ position: "relative", zIndex: 1, maxWidth: 700, margin: "0 auto" }}>
          <AnimSection>
            <p style={{ fontFamily: "'Space Mono',monospace", fontSize: 12, color: "#00FFB2", letterSpacing: 3, marginBottom: 20 }}>// READY?</p>
            <h2 style={{
              fontFamily: "'Syne',sans-serif", fontWeight: 800,
              fontSize: "clamp(2.5rem, 6vw, 5rem)", letterSpacing: -2, lineHeight: 1.05, marginBottom: 24,
            }}>
              Let's Build Something<br /><span className="grad-text">Unforgettable.</span>
            </h2>
            <p style={{ color: "#66667A", fontSize: 16, lineHeight: 1.7, marginBottom: 48, maxWidth: 480, margin: "0 auto 48px" }}>
              Tell us about your project. We'll come back with a strategy, timeline, and a team that gets it.
            </p>
            <div style={{ display: "flex", gap: 16, justifyContent: "center", flexWrap: "wrap" }}>
              <button
              onClick={() => nevigation('/page/contect')}
                className="glow-btn"
                style={{
                  background: "#00FFB2", color: "#080B12",
                  border: "none", borderRadius: 12,
                  padding: "18px 48px", fontFamily: "'Syne',sans-serif",
                  fontWeight: 700, fontSize: 17, cursor: "none",
                  transition: "box-shadow 0.3s",
                }}
              >
                Start a Project →
              </button>
            </div>
          </AnimSection>
        </div>
      </section>

    </div>
  );
}