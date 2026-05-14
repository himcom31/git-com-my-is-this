import { useEffect, useRef, useState } from "react";
import { Icon, Icons } from "../icons";

/* ─── Animated Background Canvas ─────────────────────────────────────── */
function AnimatedBackground() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    let raf;
    let t = 0;

    const resize = () => {
      canvas.width  = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
    };
    resize();
    window.addEventListener("resize", resize);

    /* — Particles — */
    const COLORS = ["#6C63FF", "#00D4AA", "#f472b6", "#facc15"];
    const isMobile = () => window.innerWidth < 768;
    const makeParticles = () => {
      const count = isMobile() ? 35 : 80;
      return Array.from({ length: count }, () => ({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 0.35,
        vy: (Math.random() - 0.5) * 0.35,
        r: Math.random() * 1.8 + 0.4,
        alpha: Math.random() * 0.55 + 0.1,
        color: COLORS[Math.floor(Math.random() * COLORS.length)],
      }));
    };
    let particles = makeParticles();
    window.addEventListener("resize", () => { particles = makeParticles(); });

    /* — Floating geometric shapes — */
    const shapes = Array.from({ length: isMobile() ? 5 : 10 }, (_, i) => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      size: Math.random() * 40 + 20,
      rotation: Math.random() * Math.PI * 2,
      rotSpeed: (Math.random() - 0.5) * 0.008,
      vx: (Math.random() - 0.5) * 0.18,
      vy: (Math.random() - 0.5) * 0.18,
      type: i % 3, // 0 = triangle, 1 = hexagon, 2 = diamond
      color: COLORS[i % COLORS.length],
      alpha: Math.random() * 0.12 + 0.04,
    }));

    /* — Aurora wave params — */
    const waves = [
      { amp: 0.06, freq: 0.6, speed: 0.4, color: "rgba(108,99,255,", yFrac: 0.3 },
      { amp: 0.05, freq: 0.8, speed: 0.55, color: "rgba(0,212,170,",  yFrac: 0.55 },
      { amp: 0.04, freq: 1.0, speed: 0.3,  color: "rgba(244,114,182,",yFrac: 0.72 },
    ];

    function drawPolygon(ctx, cx, cy, r, sides, rotation) {
      ctx.beginPath();
      for (let i = 0; i < sides; i++) {
        const angle = rotation + (i * Math.PI * 2) / sides;
        const x = cx + r * Math.cos(angle);
        const y = cy + r * Math.sin(angle);
        i === 0 ? ctx.moveTo(x, y) : ctx.lineTo(x, y);
      }
      ctx.closePath();
    }

    function drawDiamond(ctx, cx, cy, r, rotation) {
      ctx.save();
      ctx.translate(cx, cy);
      ctx.rotate(rotation);
      ctx.beginPath();
      ctx.moveTo(0, -r);
      ctx.lineTo(r * 0.6, 0);
      ctx.lineTo(0, r);
      ctx.lineTo(-r * 0.6, 0);
      ctx.closePath();
      ctx.restore();
    }

    function draw() {
      const W = canvas.width, H = canvas.height;
      ctx.clearRect(0, 0, W, H);
      t += 0.012;

      /* Aurora waves */
      waves.forEach((w, wi) => {
        const grad = ctx.createLinearGradient(0, 0, W, 0);
        grad.addColorStop(0,   `${w.color}0)`);
        grad.addColorStop(0.3, `${w.color}0.07)`);
        grad.addColorStop(0.5, `${w.color}0.12)`);
        grad.addColorStop(0.7, `${w.color}0.07)`);
        grad.addColorStop(1,   `${w.color}0)`);

        ctx.beginPath();
        ctx.moveTo(0, H);
        for (let x = 0; x <= W; x += 4) {
          const nx = x / W;
          const y = H * w.yFrac
            + Math.sin(nx * Math.PI * w.freq * 2 + t * w.speed + wi) * H * w.amp
            + Math.sin(nx * Math.PI * w.freq * 3 + t * w.speed * 0.7) * H * w.amp * 0.5;
          ctx.lineTo(x, y);
        }
        ctx.lineTo(W, H);
        ctx.closePath();
        ctx.fillStyle = grad;
        ctx.fill();
      });

      /* Geometric shapes */
      shapes.forEach(s => {
        s.x += s.vx; s.y += s.vy; s.rotation += s.rotSpeed;
        if (s.x < -80) s.x = W + 80;
        if (s.x > W + 80) s.x = -80;
        if (s.y < -80) s.y = H + 80;
        if (s.y > H + 80) s.y = -80;

        ctx.save();
        ctx.globalAlpha = s.alpha;
        ctx.strokeStyle = s.color;
        ctx.lineWidth = 1;

        if (s.type === 0) drawPolygon(ctx, s.x, s.y, s.size, 3, s.rotation);
        else if (s.type === 1) drawPolygon(ctx, s.x, s.y, s.size, 6, s.rotation);
        else drawDiamond(ctx, s.x, s.y, s.size, s.rotation);

        ctx.stroke();
        ctx.restore();
      });

      /* Particles + connections */
      const connectDist = isMobile() ? 80 : 120;
      particles.forEach((p, i) => {
        p.x += p.vx; p.y += p.vy;
        if (p.x < 0 || p.x > W) p.vx *= -1;
        if (p.y < 0 || p.y > H) p.vy *= -1;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = p.color.replace(")", `,${p.alpha})`).replace("#", "rgba(").replace(/^rgba\(([0-9a-f]{2})([0-9a-f]{2})([0-9a-f]{2}),/, (_, r, g, b) =>
          `rgba(${parseInt(r,16)},${parseInt(g,16)},${parseInt(b,16)},`);
        // simpler: just use fixed rgba
        ctx.fillStyle = p.color;
        ctx.globalAlpha = p.alpha;
        ctx.fill();
        ctx.globalAlpha = 1;

        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[j].x - p.x, dy = particles[j].y - p.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < connectDist) {
            ctx.beginPath();
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.strokeStyle = `rgba(108,99,255,${0.07 * (1 - dist / connectDist)})`;
            ctx.lineWidth = 0.5;
            ctx.stroke();
          }
        }
      });

      raf = requestAnimationFrame(draw);
    }

    draw();
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: "absolute", inset: 0,
        width: "100%", height: "100%",
        pointerEvents: "none", zIndex: 0,
      }}
    />
  );
}

export const features = [
  { icon: "fast",  title: "Lightning Fast Delivery",  desc: "On-time delivery with agile sprints and clear milestones. No surprises.", color: "#6C63FF", glow: "rgba(108,99,255,0.35)" },
  { icon: "scale", title: "Scalable Architecture",    desc: "Built to grow with your business. From MVP to enterprise at any scale.", color: "#00D4AA", glow: "rgba(0,212,170,0.35)" },
  { icon: "tech",  title: "Cutting-Edge Tech Stack",  desc: "We use the latest technologies to ensure performance and future-proofing.", color: "#f472b6", glow: "rgba(244,114,182,0.35)" },
  { icon: "price", title: "Transparent Pricing",      desc: "No hidden fees. Clear, upfront pricing that fits your budget perfectly.", color: "#facc15", glow: "rgba(250,204,21,0.35)" },
];

function useInView(threshold = 0.12) {
  const ref = useRef(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setInView(true); obs.disconnect(); } },
      { threshold }
    );
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);
  return [ref, inView];
}

function FeatureCard({ icon, title, desc, color, glow, index, active }) {
  const [hovered, setHovered] = useState(false);

  return (
    <div
      className="feat-card"
      style={{
        "--c": color,
        "--g": glow,
        animationDelay: `${index * 120}ms`,
        opacity: active ? undefined : 0,
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* Card glow blob */}
      <div className="card-blob" />

      {/* Top accent line */}
      <div className="card-topline" />

      {/* Corner number */}
      <div className="card-num">0{index + 1}</div>

      {/* Icon */}
      <div className="card-icon-wrap">
        <div className="icon-ring" />
        <div className="icon-ring2" />
        <Icon d={Icons[icon]} size={26} />
      </div>

      {/* Text */}
      <h3 className="card-title">{title}</h3>
      <p className="card-desc">{desc}</p>

      {/* Bottom bar */}
      <div className="card-bar" />
    </div>
  );
}

export default function Features() {
  const [secRef, secInView] = useInView(0.08);
  const [headRef, headInView] = useInView(0.2);

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Syne:wght@700;800;900&family=DM+Sans:wght@400;500;600&display=swap');

        .feat-root {
          --purple: #6C63FF;
          --teal:   #00D4AA;
          --bg:     #07060F;
          --text1:  #f0f0f8;
          --text2:  #9898b8;
          font-family: 'DM Sans', sans-serif;
          background: var(--bg);
          color: var(--text1);
        }

        .feat-section {
          position: relative;
          padding: 120px 5% 140px;
          overflow: hidden;
        }

        /* ── Ambient ── */
        .feat-orb {
          position: absolute; border-radius: 50%;
          pointer-events: none; z-index: 0; filter: blur(80px);
        }
        .feat-orb-1 {
          width: min(700px,100vw); height: min(700px,100vw);
          top: -200px; left: 50%; transform: translateX(-50%);
          background: radial-gradient(circle, rgba(108,99,255,0.13) 0%, transparent 70%);
          animation: orbDrift 16s ease-in-out infinite alternate;
        }
        .feat-orb-2 {
          width: min(400px,80vw); height: min(400px,80vw);
          bottom: -80px; left: -100px;
          background: radial-gradient(circle, rgba(0,212,170,0.09) 0%, transparent 70%);
          animation: orbDrift 20s ease-in-out infinite alternate-reverse;
        }
        .feat-orb-3 {
          width: min(300px,60vw); height: min(300px,60vw);
          bottom: -60px; right: -60px;
          background: radial-gradient(circle, rgba(244,114,182,0.08) 0%, transparent 70%);
          animation: orbDrift2 14s ease-in-out infinite alternate;
        }
        @keyframes orbDrift  { 0%{transform:translateX(-50%) scale(1)} 100%{transform:translateX(calc(-50% + 30px)) scale(1.1)} }
        @keyframes orbDrift2 { 0%{transform:translate(0,0)} 100%{transform:translate(-20px,-30px)} }

        /* Grid line pattern */
        .feat-grid-bg {
          position: absolute; inset: 0; z-index: 0; pointer-events: none;
          background-image:
            linear-gradient(rgba(108,99,255,0.03) 1px, transparent 1px),
            linear-gradient(90deg, rgba(108,99,255,0.03) 1px, transparent 1px);
          background-size: 64px 64px;
          mask-image: radial-gradient(ellipse 90% 70% at 50% 50%, black 30%, transparent 100%);
        }

        .feat-inner {
          max-width: 1200px;
          margin: 0 auto;
          position: relative; z-index: 10;
        }

        /* ── Header ── */
        .feat-header {
          text-align: center;
          margin-bottom: 72px;
          opacity: 0; transform: translateY(28px);
          transition: opacity 0.7s ease, transform 0.7s ease;
        }
        .feat-header.vis { opacity: 1; transform: translateY(0); }

        .feat-badge {
          display: inline-flex; align-items: center; gap: 8px;
          padding: 7px 18px;
          border-radius: 100px;
          border: 1px solid rgba(108,99,255,0.3);
          background: rgba(108,99,255,0.08);
          font-size: 11px; font-weight: 700;
          letter-spacing: 0.1em; text-transform: uppercase;
          color: var(--purple); margin-bottom: 22px;
        }
        .feat-badge-dot {
          width: 6px; height: 6px; border-radius: 50%;
          background: var(--purple); box-shadow: 0 0 8px var(--purple);
          animation: badgePulse 2s ease-in-out infinite;
        }
        @keyframes badgePulse { 0%,100%{transform:scale(1);opacity:1} 50%{transform:scale(1.5);opacity:0.5} }

        .feat-h2 {
          font-family: 'Syne', sans-serif;
          font-size: clamp(32px, 4.5vw, 60px);
          font-weight: 900; line-height: 1.05;
          letter-spacing: -1px; margin-bottom: 18px;
        }
        .grad-text {
          background: linear-gradient(135deg, #a78bfa 0%, #6C63FF 40%, #00D4AA 100%);
          -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text;
        }
        .feat-sub {
          font-size: clamp(15px, 2vw, 18px);
          color: var(--text2); line-height: 1.75;
          max-width: 580px; margin: 0 auto;
        }

        /* ── Cards grid ── */
        .feat-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 20px;
        }
        @media (max-width: 1024px) { .feat-grid { grid-template-columns: repeat(2, 1fr); } }
        @media (max-width: 560px)  { .feat-grid { grid-template-columns: 1fr; gap: 16px; } }

        /* ── Card ── */
        .feat-card {
          position: relative;
          padding: 32px 24px 28px;
          border-radius: 24px;
          background: rgba(255,255,255,0.03);
          border: 1px solid rgba(255,255,255,0.08);
          overflow: hidden;
          cursor: default;
          animation: cardIn 0.65s both;
          transition: transform 0.4s cubic-bezier(0.23,1,0.32,1),
                      border-color 0.35s, box-shadow 0.35s, background 0.35s;
        }
        @keyframes cardIn {
          from { opacity: 0; transform: translateY(36px) scale(0.94); }
          to   { opacity: 1; transform: translateY(0)   scale(1); }
        }
        .feat-card:hover {
          transform: translateY(-8px) scale(1.02);
          border-color: var(--c);
          background: rgba(255,255,255,0.055);
          box-shadow:
            0 20px 60px rgba(0,0,0,0.4),
            0 0 40px color-mix(in srgb, var(--c) 12%, transparent),
            inset 0 1px 0 rgba(255,255,255,0.1);
        }

        /* Glow blob */
        .card-blob {
          position: absolute; top: -30px; right: -30px;
          width: 120px; height: 120px; border-radius: 50%;
          background: var(--c);
          opacity: 0.07; filter: blur(30px);
          transition: opacity 0.4s, transform 0.4s;
          pointer-events: none;
        }
        .feat-card:hover .card-blob { opacity: 0.22; transform: scale(1.4); }

        /* Top accent line */
        .card-topline {
          position: absolute; top: 0; left: 30px; right: 30px; height: 1px;
          background: linear-gradient(90deg, transparent, var(--c), transparent);
          opacity: 0; transition: opacity 0.4s;
        }
        .feat-card:hover .card-topline { opacity: 1; }

        /* Corner number */
        .card-num {
          position: absolute; top: 16px; right: 20px;
          font-family: 'Syne', sans-serif;
          font-size: 11px; font-weight: 900;
          letter-spacing: 0.08em;
          color: rgba(255,255,255,0.1);
          transition: color 0.3s;
        }
        .feat-card:hover .card-num { color: var(--c); opacity: 0.6; }

        /* Icon */
        .card-icon-wrap {
          position: relative;
          width: 62px; height: 62px;
          border-radius: 18px;
          background: rgba(255,255,255,0.05);
          border: 1px solid rgba(255,255,255,0.1);
          display: flex; align-items: center; justify-content: center;
          color: var(--c);
          margin-bottom: 22px;
          transition: transform 0.4s cubic-bezier(0.23,1,0.32,1),
                      border-color 0.3s, background 0.3s, box-shadow 0.3s;
          overflow: visible;
        }
        .feat-card:hover .card-icon-wrap {
          transform: rotate(-8deg) scale(1.12);
          border-color: var(--c);
          background: color-mix(in srgb, var(--c) 12%, transparent);
          box-shadow: 0 8px 24px var(--g);
        }
        /* Pulsing rings */
        .icon-ring, .icon-ring2 {
          position: absolute; border-radius: 50%;
          border: 1px solid var(--c);
          opacity: 0; pointer-events: none;
          transform: scale(0.5);
          transition: none;
        }
        .icon-ring  { inset: -8px; }
        .icon-ring2 { inset: -16px; }
        .feat-card:hover .icon-ring {
          animation: ringPop 0.6s ease forwards;
        }
        .feat-card:hover .icon-ring2 {
          animation: ringPop 0.8s 0.1s ease forwards;
        }
        @keyframes ringPop {
          0%   { opacity: 0.6; transform: scale(0.7); }
          100% { opacity: 0;   transform: scale(1.4); }
        }

        /* Text */
        .card-title {
          font-family: 'Syne', sans-serif;
          font-size: 17px; font-weight: 800;
          margin-bottom: 10px; line-height: 1.25;
          transition: color 0.3s;
        }
        .feat-card:hover .card-title { color: var(--c); }
        .card-desc {
          font-size: 13.5px;
          color: var(--text2);
          line-height: 1.72;
        }

        /* Bottom bar sweep */
        .card-bar {
          position: absolute; bottom: 0; left: 0; right: 0; height: 2px;
          background: linear-gradient(90deg, var(--c), color-mix(in srgb, var(--c) 50%, #00D4AA));
          transform: scaleX(0); transform-origin: left;
          transition: transform 0.45s cubic-bezier(0.23,1,0.32,1);
        }
        .feat-card:hover .card-bar { transform: scaleX(1); }

        /* ── Bottom tagline ── */
        .feat-tagline {
          text-align: center;
          margin-top: 60px;
          opacity: 0; transform: translateY(20px);
          transition: opacity 0.7s 0.4s ease, transform 0.7s 0.4s ease;
        }
        .feat-tagline.vis { opacity: 1; transform: translateY(0); }
        .feat-tagline-text {
          display: inline-flex; align-items: center; gap: 12px;
          font-size: 13px; color: var(--text2);
          padding: 12px 24px;
          border: 1px solid rgba(255,255,255,0.07);
          border-radius: 100px;
          background: rgba(255,255,255,0.02);
        }
        .tagline-dot {
          width: 5px; height: 5px; border-radius: 50%;
          background: var(--teal); box-shadow: 0 0 6px var(--teal);
          animation: badgePulse 1.8s ease-in-out infinite;
        }
      `}</style>

      <section id="features" className="feat-root feat-section">
        <div className="feat-orb feat-orb-1" />
        <div className="feat-orb feat-orb-2" />
        <div className="feat-orb feat-orb-3" />
        <div className="feat-grid-bg" />

        <div className="feat-inner">
          {/* Header */}
          <div ref={headRef} className={`feat-header ${headInView ? "vis" : ""}`}>
            <div className="feat-badge">
              <span className="feat-badge-dot" />
              Why &amp; S
            </div>
            <h2 className="feat-h2">
              Built for <span className="grad-text">Excellence</span>
            </h2>
            <p className="feat-sub">
              We don't just build products — we engineer outcomes. Here's what sets us apart from the rest.
            </p>
          </div>

          {/* Cards */}
          <div ref={secRef} className="feat-grid">
            {features.map((f, i) => (
              <FeatureCard key={f.title} {...f} index={i} active={secInView} />
            ))}
          </div>

          {/* Tagline */}
          <div className={`feat-tagline ${secInView ? "vis" : ""}`}>
            <span className="feat-tagline-text">
              <span className="tagline-dot" />
              Trusted by 40+ clients across 3 continents
              <span className="tagline-dot" />
            </span>
          </div>
        </div>
      </section>
    </>
  );
}