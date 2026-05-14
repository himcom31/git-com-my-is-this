import { useEffect, useRef, useState } from "react";
import { Icon, Icons } from "../icons";

/* ─── Data ─────────────────────────────────────────────────────────────── */
const FEATURES = [
  { icon: "fast",  title: "Expert Team",           desc: "Senior engineers and creative designers with proven track records" },
  { icon: "tech",  title: "Modern Technology",     desc: "Always using the latest, most efficient tools and frameworks" },
  { icon: "scale", title: "Client-First Approach", desc: "Your success is our success. We build long-term partnerships" },
];

const METRICS = [
  { num: 30, suffix: "+", label: "Projects Shipped",  color: "#6C63FF" },
  { num: 20,  suffix: "+", label: "Happy Clients",     color: "#00D4AA" },
  { num: 1,   suffix: "+", label: "Years in Business", color: "#f472b6" },
  { num: 98,  suffix: "%", label: "Satisfaction Rate", color: "#facc15" },
];

/* ─── Hooks ─────────────────────────────────────────────────────────────── */
function useInView(threshold = 0.15) {
  const ref = useRef(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setInView(true); obs.disconnect(); } },
      { threshold }
    );
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, [threshold]);
  return [ref, inView];
}

function useCountUp(target, active, duration = 1400) {
  const [val, setVal] = useState(0);
  useEffect(() => {
    if (!active) return;
    let start = null;
    const step = (ts) => {
      if (!start) start = ts;
      const prog = Math.min((ts - start) / duration, 1);
      const ease = 1 - Math.pow(1 - prog, 3);
      setVal(Math.round(ease * target));
      if (prog < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }, [active, target, duration]);
  return val;
}

/* ─── Sub-components ────────────────────────────────────────────────────── */
function MetricCard({ num, suffix, label, color, active, delay }) {
  const count = useCountUp(num, active);
  return (
    <div
      className="about-metric-card"
      style={{ "--accent": color, animationDelay: `${delay}ms` }}
    >
      <div className="metric-glow" />
      <div className="metric-num">{count}{suffix}</div>
      <div className="metric-label">{label}</div>
      <div className="metric-bar" />
    </div>
  );
}

function FeatureRow({ icon, title, desc, delay, active }) {
  return (
    <div
      className="feature-row"
      style={{ animationDelay: `${delay}ms`, opacity: active ? undefined : 0 }}
    >
      <div className="feature-icon-wrap">
        <div className="feature-icon-ring" />
        <Icon d={Icons[icon]} size={20} />
      </div>
      <div>
        <h4 className="feature-title">{title}</h4>
        <p className="feature-desc">{desc}</p>
      </div>
    </div>
  );
}

/* ─── Main ───────────────────────────────────────────────────────────────── */
export default function About() {
  const [secRef, secInView] = useInView(0.1);
  const [rightRef, rightInView] = useInView(0.1);

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Syne:wght@700;800;900&family=DM+Sans:wght@400;500;600&display=swap');

        .about-root {
          --purple: #6C63FF;
          --teal: #00D4AA;
          --pink: #f472b6;
          --yellow: #facc15;
          --bg: #07060F;
          --card: rgba(255,255,255,0.03);
          --border: rgba(255,255,255,0.08);
          --text1: #f0f0f8;
          --text2: #9898b8;
          font-family: 'DM Sans', sans-serif;
          background: var(--bg);
          color: var(--text1);
        }

        /* ── Section wrapper ── */
        .about-section {
          position: relative;
          padding: 120px 5% 140px;
          overflow: hidden;
        }

        /* Ambient blobs */
        .about-blob {
          position: absolute;
          border-radius: 50%;
          pointer-events: none;
          z-index: 0;
          filter: blur(70px);
        }
        .about-blob-1 {
          width: min(600px, 80vw); height: min(600px, 80vw);
          top: -100px; left: -150px;
          background: radial-gradient(circle, rgba(108,99,255,0.14) 0%, transparent 70%);
          animation: blobFloat1 14s ease-in-out infinite alternate;
        }
        .about-blob-2 {
          width: min(500px, 70vw); height: min(500px, 70vw);
          bottom: -100px; right: -100px;
          background: radial-gradient(circle, rgba(0,212,170,0.10) 0%, transparent 70%);
          animation: blobFloat2 18s ease-in-out infinite alternate;
        }
        .about-blob-3 {
          width: min(300px, 50vw); height: min(300px, 50vw);
          top: 40%; left: 50%;
          background: radial-gradient(circle, rgba(244,114,182,0.07) 0%, transparent 70%);
          animation: blobFloat1 22s ease-in-out infinite alternate-reverse;
        }
        @keyframes blobFloat1 { 0%{transform:translate(0,0)} 100%{transform:translate(30px,-40px)} }
        @keyframes blobFloat2 { 0%{transform:translate(0,0)} 100%{transform:translate(-40px,30px)} }

        /* Noise grain overlay */
        .about-grain {
          position: absolute; inset: 0; z-index: 1; pointer-events: none; opacity: 0.025;
          background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E");
          background-size: 180px;
        }

        /* Horizontal scan line */
        .about-scan {
          position: absolute; top: 0; left: 0; right: 0;
          height: 1px; z-index: 2; pointer-events: none;
          background: linear-gradient(90deg, transparent 0%, rgba(108,99,255,0.5) 30%, rgba(0,212,170,0.5) 70%, transparent 100%);
          animation: scanMove 6s ease-in-out infinite alternate;
          opacity: 0.5;
        }
        @keyframes scanMove { 0%{top:10%} 100%{top:90%} }

        .about-inner {
          max-width: 1200px;
          margin: 0 auto;
          position: relative;
          z-index: 10;
        }

        /* ── Section badge ── */
        .section-badge {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          padding: 6px 16px;
          border-radius: 100px;
          border: 1px solid rgba(108,99,255,0.3);
          background: rgba(108,99,255,0.08);
          font-size: 11px;
          font-weight: 700;
          letter-spacing: 0.1em;
          text-transform: uppercase;
          color: var(--purple);
          margin-bottom: 20px;
        }
        .section-badge-dot {
          width: 6px; height: 6px; border-radius: 50%;
          background: var(--purple);
          box-shadow: 0 0 8px var(--purple);
          animation: pulse 2s ease-in-out infinite;
        }
        @keyframes pulse { 0%,100%{transform:scale(1);opacity:1} 50%{transform:scale(1.4);opacity:0.6} }

        /* ── Section heading ── */
        .about-h2 {
          font-family: 'Syne', sans-serif;
          font-size: clamp(34px, 4.5vw, 60px);
          font-weight: 900;
          line-height: 1.05;
          letter-spacing: -1px;
          margin-bottom: 24px;
        }
        .grad-text {
          background: linear-gradient(135deg, #a78bfa 0%, #6C63FF 40%, #00D4AA 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }

        /* ── Body text ── */
        .about-body {
          color: var(--text2);
          line-height: 1.85;
          font-size: 15px;
          margin-bottom: 14px;
        }

        /* ── Grid ── */
        .about-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 70px;
          align-items: start;
          margin-top: 64px;
        }
        @media (max-width: 900px) {
          .about-grid { grid-template-columns: 1fr; gap: 56px; }
        }

        /* ── Animate-in utility ── */
        .anim-slide-up {
          opacity: 0;
          transform: translateY(32px);
          transition: opacity 0.7s ease, transform 0.7s ease;
        }
        .anim-slide-up.visible {
          opacity: 1;
          transform: translateY(0);
        }
        .anim-slide-left {
          opacity: 0;
          transform: translateX(-32px);
          transition: opacity 0.7s ease, transform 0.7s ease;
        }
        .anim-slide-left.visible {
          opacity: 1;
          transform: translateX(0);
        }
        .anim-slide-right {
          opacity: 0;
          transform: translateX(32px);
          transition: opacity 0.7s ease, transform 0.7s ease;
        }
        .anim-slide-right.visible {
          opacity: 1;
          transform: translateX(0);
        }

        /* ── Feature rows ── */
        .feature-row {
          display: flex;
          align-items: flex-start;
          gap: 16px;
          padding: 16px;
          border-radius: 16px;
          border: 1px solid transparent;
          transition: background 0.35s, border-color 0.35s, transform 0.35s;
          cursor: default;
          animation: featureIn 0.6s both;
        }
        @keyframes featureIn {
          from { opacity: 0; transform: translateX(-20px); }
          to   { opacity: 1; transform: translateX(0); }
        }
        .feature-row:hover {
          background: rgba(108,99,255,0.06);
          border-color: rgba(108,99,255,0.2);
          transform: translateX(6px);
        }
        .feature-icon-wrap {
          position: relative;
          width: 44px; height: 44px;
          min-width: 44px;
          border-radius: 12px;
          background: rgba(108,99,255,0.1);
          border: 1px solid rgba(108,99,255,0.25);
          display: flex; align-items: center; justify-content: center;
          color: var(--purple);
          overflow: hidden;
          transition: transform 0.3s;
        }
        .feature-row:hover .feature-icon-wrap {
          transform: rotate(-6deg) scale(1.1);
        }
        .feature-icon-ring {
          position: absolute; inset: -4px;
          border-radius: 50%;
          border: 1px solid rgba(108,99,255,0.3);
          opacity: 0;
          transform: scale(0.7);
          transition: opacity 0.3s, transform 0.3s;
        }
        .feature-row:hover .feature-icon-ring {
          opacity: 1; transform: scale(1);
        }
        .feature-title {
          font-size: 15px;
          font-weight: 700;
          margin-bottom: 4px;
          color: var(--text1);
        }
        .feature-desc {
          font-size: 13px;
          color: var(--text2);
          line-height: 1.6;
        }

        /* ── Right panel ── */
        .about-panel {
          position: relative;
          border-radius: 28px;
          padding: 32px;
          background: linear-gradient(135deg, rgba(108,99,255,0.06) 0%, rgba(0,212,170,0.04) 100%);
          border: 1px solid rgba(255,255,255,0.08);
          backdrop-filter: blur(40px);
          box-shadow: 0 0 0 1px rgba(108,99,255,0.1), 0 40px 80px rgba(0,0,0,0.35);
          overflow: hidden;
        }
        .about-panel::before {
          content: '';
          position: absolute;
          top: -1px; left: 40px; right: 40px; height: 1px;
          background: linear-gradient(90deg, transparent, rgba(108,99,255,0.7), rgba(0,212,170,0.5), transparent);
        }
        .about-panel::after {
          content: '';
          position: absolute;
          bottom: -1px; left: 60px; right: 60px; height: 1px;
          background: linear-gradient(90deg, transparent, rgba(244,114,182,0.4), transparent);
        }

        @media (max-width: 480px) {
          .about-panel { padding: 20px; border-radius: 20px; }
        }

        /* Panel heading */
        .panel-label {
          font-size: 11px;
          font-weight: 700;
          letter-spacing: 0.12em;
          text-transform: uppercase;
          color: var(--text2);
          margin-bottom: 20px;
          display: flex;
          align-items: center;
          gap: 8px;
        }
        .panel-label::after {
          content: '';
          flex: 1;
          height: 1px;
          background: linear-gradient(90deg, rgba(255,255,255,0.1), transparent);
        }

        /* ── Metrics grid ── */
        .metrics-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 12px;
          margin-bottom: 20px;
        }
        @media (max-width: 380px) {
          .metrics-grid { grid-template-columns: 1fr 1fr; gap: 8px; }
        }

        .about-metric-card {
          position: relative;
          padding: 18px 16px;
          border-radius: 16px;
          background: rgba(255,255,255,0.04);
          border: 1px solid rgba(255,255,255,0.08);
          overflow: hidden;
          transition: transform 0.3s, border-color 0.3s, box-shadow 0.3s;
          cursor: default;
          animation: metricIn 0.55s both;
        }
        @keyframes metricIn {
          from { opacity: 0; transform: scale(0.88) translateY(12px); }
          to   { opacity: 1; transform: scale(1) translateY(0); }
        }
        .about-metric-card:hover {
          transform: translateY(-4px) scale(1.02);
          border-color: var(--accent);
          box-shadow: 0 8px 32px rgba(0,0,0,0.3), 0 0 20px color-mix(in srgb, var(--accent) 20%, transparent);
        }
        .metric-glow {
          position: absolute;
          top: -20px; right: -20px;
          width: 80px; height: 80px;
          border-radius: 50%;
          background: var(--accent);
          opacity: 0.12;
          filter: blur(20px);
          transition: opacity 0.3s;
        }
        .about-metric-card:hover .metric-glow { opacity: 0.25; }
        .metric-num {
          font-family: 'Syne', sans-serif;
          font-size: clamp(28px, 4vw, 38px);
          font-weight: 900;
          color: var(--accent);
          line-height: 1;
          margin-bottom: 4px;
        }
        .metric-label {
          font-size: 12px;
          color: var(--text2);
          font-weight: 500;
        }
        .metric-bar {
          position: absolute;
          bottom: 0; left: 0; right: 0;
          height: 2px;
          background: var(--accent);
          transform: scaleX(0);
          transform-origin: left;
          transition: transform 0.5s ease;
        }
        .about-metric-card:hover .metric-bar { transform: scaleX(1); }

        /* ── Mission / Vision ── */
        .mv-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 12px;
        }
        @media (max-width: 480px) {
          .mv-grid { grid-template-columns: 1fr; }
        }
        .mv-card {
          padding: 18px;
          border-radius: 14px;
          border: 1px solid rgba(255,255,255,0.08);
          background: rgba(255,255,255,0.03);
          transition: border-color 0.3s, transform 0.3s, background 0.3s;
          position: relative;
          overflow: hidden;
        }
        .mv-card::before {
          content: '';
          position: absolute; left: 0; top: 20%; bottom: 20%;
          width: 2px;
          background: linear-gradient(180deg, var(--purple), var(--teal));
          border-radius: 2px;
          transform: scaleY(0);
          transition: transform 0.4s ease;
        }
        .mv-card:hover::before { transform: scaleY(1); }
        .mv-card:hover {
          border-color: rgba(108,99,255,0.3);
          background: rgba(108,99,255,0.05);
          transform: translateY(-3px);
          padding-left: 22px;
        }
        .mv-title {
          font-size: 11px;
          font-weight: 800;
          letter-spacing: 0.1em;
          text-transform: uppercase;
          color: var(--purple);
          margin-bottom: 8px;
        }
        .mv-text {
          font-size: 12.5px;
          color: var(--text2);
          line-height: 1.65;
        }

        /* ── Floating chip ── */
        .chip-float {
          position: absolute;
          display: flex; align-items: center; gap: 8px;
          padding: 8px 14px;
          border-radius: 100px;
          backdrop-filter: blur(20px);
          border: 1px solid rgba(255,255,255,0.12);
          font-size: 12px; font-weight: 600;
          box-shadow: 0 8px 24px rgba(0,0,0,0.4);
          background: rgba(7,6,15,0.85);
          white-space: nowrap;
          z-index: 5;
        }
        .chip-tl {
          top: -16px; left: 20px;
          animation: chipFloat1 4.5s ease-in-out infinite;
        }
        .chip-br {
          bottom: -16px; right: 20px;
          animation: chipFloat2 5.5s ease-in-out infinite;
        }
        @keyframes chipFloat1 { 0%,100%{transform:translateY(0) rotate(-1deg)} 50%{transform:translateY(-8px) rotate(1deg)} }
        @keyframes chipFloat2 { 0%,100%{transform:translateY(0) rotate(1deg)} 50%{transform:translateY(8px) rotate(-1deg)} }
        .chip-dot {
          width: 7px; height: 7px; border-radius: 50%; flex-shrink: 0;
        }

        @media (max-width: 600px) {
          .chip-tl { top: -14px; left: 10px; font-size: 11px; padding: 6px 11px; }
          .chip-br { bottom: -14px; right: 10px; font-size: 11px; padding: 6px 11px; }
        }

        /* ── Left section in-view ── */
        .left-anim { opacity: 0; transform: translateX(-28px); transition: opacity 0.8s ease, transform 0.8s ease; }
        .left-anim.vis { opacity: 1; transform: translateX(0); }
        .right-anim { opacity: 0; transform: translateX(28px); transition: opacity 0.8s ease, transform 0.8s ease; }
        .right-anim.vis { opacity: 1; transform: translateX(0); }
      `}</style>

      <section id="about" className="about-root about-section">
        {/* Ambient */}
        <div className="about-blob about-blob-1" />
        <div className="about-blob about-blob-2" />
        <div className="about-blob about-blob-3" />
        <div className="about-grain" />
        <div className="about-scan" />

        <div className="about-inner">
          {/* Top badge */}
          <div style={{ textAlign: "center" }}>
            <div className="section-badge" style={{ margin: "0 auto 0" }}>
              <span className="section-badge-dot" />
              About Us
            </div>
          </div>

          <div className="about-grid" ref={secRef}>
            {/* ── LEFT ── */}
            <div className={`left-anim ${secInView ? "vis" : ""}`}>
              <h2 className="about-h2">
                We Are <span className="grad-text">&amp; S Digital</span>
              </h2>

              <p className="about-body">
                &amp; S is a forward-thinking digital agency built for the AI era. We combine
                deep technical expertise with creative vision to build solutions that don't
                just meet today's needs — they anticipate tomorrow's.
              </p>
              <p className="about-body">
                Founded by engineers and designers passionate about technology, we've grown
                into a trusted partner for startups, SMEs, and enterprises worldwide.
              </p>

              <div style={{ display: "flex", flexDirection: "column", gap: 4, marginTop: 28 }}>
                {FEATURES.map((f, i) => (
                  <FeatureRow
                    key={f.title}
                    {...f}
                    delay={200 + i * 130}
                    active={secInView}
                  />
                ))}
              </div>
            </div>

            {/* ── RIGHT ── */}
            <div
              ref={rightRef}
              className={`right-anim ${secInView ? "vis" : ""}`}
              style={{ position: "relative", paddingTop: 20, paddingBottom: 20 }}
            >
              {/* Floating chips */}
              <div className="chip-float chip-tl">
                <span className="chip-dot" style={{ background: "#00D4AA", boxShadow: "0 0 8px #00D4AA" }} />
                <span style={{ color: "#00D4AA" }}> &S.com Powered Agency</span>
              </div>
              <div className="chip-float chip-br">
                <span className="chip-dot" style={{ background: "#6C63FF", boxShadow: "0 0 8px #6C63FF" }} />
                <span style={{ color: "#f0f0f8" }}>Trusted Worldwide ✓</span>
              </div>

              <div className="about-panel">
                {/* Metrics */}
                <div className="panel-label">Our Impact</div>
                <div className="metrics-grid">
                  {METRICS.map((m, i) => (
                    <MetricCard key={m.label} {...m} active={rightInView} delay={i * 100} />
                  ))}
                </div>

                {/* Mission / Vision */}
                <div className="panel-label" style={{ marginTop: 20 }}>Our Direction</div>
                <div className="mv-grid">
                  {[
                    ["Mission", "To empower businesses with transformative digital solutions that drive measurable growth and competitive advantage."],
                    ["Vision",  "To be the world's most trusted technology partner, shaping the future of human-computer interaction through AI."],
                  ].map(([title, text]) => (
                    <div className="mv-card" key={title}>
                      <div className="mv-title">{title}</div>
                      <p className="mv-text">{text}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}