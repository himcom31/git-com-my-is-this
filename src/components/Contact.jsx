import { useState, useEffect, useRef } from "react";
import emailjs from "@emailjs/browser";

// ── 🔑 Replace these three values with your EmailJS credentials ───────────────
const SERVICE_ID  = "service_leor8zo";   // EmailJS → Email Services → Service ID
const TEMPLATE_ID = "template_b3m0b1m"; // EmailJS → Email Templates → Template ID
const PUBLIC_KEY  = "Vutzf7qJCrIjbNKOd";  // EmailJS → Account → Public Key
// ─────────────────────────────────────────────────────────────────────────────

// ── Inline SVG icons ──────────────────────────────────────────────────────────
const MailIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none"
    stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
    <polyline points="22,6 12,13 2,6"/>
  </svg>
);
const PhoneIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none"
    stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.07 8.81a19.79 19.79 0 01-3.07-8.64A2 2 0 012 .18h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L6.09 7.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 16.92z"/>
  </svg>
);
const ArrowIcon = () => (
  <svg width="15" height="15" viewBox="0 0 24 24" fill="none"
    stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <line x1="5" y1="12" x2="19" y2="12"/>
    <polyline points="12 5 19 12 12 19"/>
  </svg>
);
const CheckIcon = () => (
  <svg width="28" height="28" viewBox="0 0 24 24" fill="none"
    stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="20 6 9 17 4 12"/>
  </svg>
);
const SpinnerIcon = () => (
  <svg width="17" height="17" viewBox="0 0 24 24" fill="none"
    stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
    <style>{`@keyframes spin{to{transform:rotate(360deg)}}.spin-el{transform-origin:center;animation:spin .75s linear infinite}`}</style>
    <circle className="spin-el" cx="12" cy="12" r="9" strokeDasharray="42" strokeDashoffset="20" />
  </svg>
);

// ── Response times data ───────────────────────────────────────────────────────
const RESPONSE_TIMES = [
  ["Initial Response", "< 2 hours"],
  ["Proposal",         "Within 24 hours"],
  ["Project Kickoff",  "Within 1 week"],
];

// ── Particle / starfield canvas hook ─────────────────────────────────────────
function useStarCanvas(canvasRef) {
  useEffect(() => {
    const c = canvasRef.current;
    if (!c) return;
    const ctx = c.getContext("2d");
    let W, H, animId;
    const pts = [];
    const shooting = [];

    function resize() {
      W = c.width = c.offsetWidth;
      H = c.height = c.offsetHeight;
    }
    resize();
    const ro = new ResizeObserver(resize);
    ro.observe(c.parentElement);

    for (let i = 0; i < 170; i++) {
      pts.push({
        x: Math.random() * 2000,
        y: Math.random() * 1400,
        r: Math.random() * 1.3 + 0.2,
        a: Math.random() * 0.65 + 0.15,
        pa: Math.random() * Math.PI * 2,
        ps: Math.random() * 0.015 + 0.004,
      });
    }

    const mouse = { x: -999, y: -999 };
    const onMouseMove = (ev) => {
      const r = c.getBoundingClientRect();
      mouse.x = ev.clientX - r.left;
      mouse.y = ev.clientY - r.top;
    };
    c.parentElement.addEventListener("mousemove", onMouseMove);

    let shootTimer;
    function spawnShoot() {
      shooting.push({
        x: Math.random() * W,
        y: 0,
        vx: (Math.random() - 0.3) * 3,
        vy: Math.random() * 3 + 2,
        life: 60 + Math.random() * 40,
        maxLife: 60 + Math.random() * 40,
      });
      shootTimer = setTimeout(spawnShoot, 2800 + Math.random() * 4000);
    }
    spawnShoot();

    function draw() {
      ctx.clearRect(0, 0, W, H);
      const sx = W / 2000, sy = H / 1400;
      for (const p of pts) {
        p.pa += p.ps;
        const a = p.a * (0.6 + 0.4 * Math.sin(p.pa));
        const px = p.x * sx, py = p.y * sy;
        const dist = Math.hypot(px - mouse.x, py - mouse.y);
        const boost = dist < 100 ? 1 + (100 - dist) / 80 : 1;
        ctx.beginPath();
        ctx.arc(px, py, p.r * boost, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(200,190,255,${a * Math.min(boost, 1.6)})`;
        ctx.fill();
        if (dist < 130) {
          ctx.beginPath();
          ctx.moveTo(px, py);
          ctx.lineTo(mouse.x, mouse.y);
          ctx.strokeStyle = `rgba(108,99,255,${(1 - dist / 130) * 0.22})`;
          ctx.lineWidth = 0.5;
          ctx.stroke();
        }
      }
      for (let j = shooting.length - 1; j >= 0; j--) {
        const s = shooting[j];
        s.x += s.vx; s.y += s.vy; s.life--;
        if (s.life <= 0 || s.x < 0 || s.x > W || s.y > H) {
          shooting.splice(j, 1); continue;
        }
        const frac = s.life / s.maxLife;
        const grd = ctx.createLinearGradient(
          s.x - s.vx * 8, s.y - s.vy * 8, s.x, s.y
        );
        grd.addColorStop(0, "rgba(180,160,255,0)");
        grd.addColorStop(1, `rgba(210,190,255,${frac * 0.75})`);
        ctx.beginPath();
        ctx.moveTo(s.x - s.vx * 8, s.y - s.vy * 8);
        ctx.lineTo(s.x, s.y);
        ctx.strokeStyle = grd;
        ctx.lineWidth = 1.6;
        ctx.stroke();
      }
      animId = requestAnimationFrame(draw);
    }
    draw();

    return () => {
      cancelAnimationFrame(animId);
      clearTimeout(shootTimer);
      ro.disconnect();
      c.parentElement.removeEventListener("mousemove", onMouseMove);
    };
  }, [canvasRef]);
}

// ── Main Component ────────────────────────────────────────────────────────────
export default function Contact() {
  const [form, setForm]       = useState({ name: "", email: "", subject: "", message: "" });
  const [sent, setSent]       = useState(false);
  const [loading, setLoading] = useState(false); // ← NEW: sending state
  const [error, setError]     = useState(false);
  const [sendErr, setSendErr] = useState("");    // ← NEW: server error message
  const canvasRef             = useRef(null);

  useStarCanvas(canvasRef);

  const handle = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  // ── Submit handler with EmailJS ───────────────────────────────────────────
  const submit = async (e) => {
    e.preventDefault();
    const { name, email, subject, message } = form;

    // Basic validation
    if (!name || !email || !subject || !message) {
      setError(true);
      setTimeout(() => setError(false), 600);
      return;
    }

    setLoading(true);
    setSendErr("");

    try {
      // EmailJS sends the form data to your email template
      // Make sure your EmailJS template uses these variable names:
      //   {{from_name}}  → sender's name
      //   {{from_email}} → sender's email
      //   {{subject}}    → subject
      //   {{message}}    → message body
      await emailjs.send(
        SERVICE_ID,
        TEMPLATE_ID,
        {
          from_name:  name,
          from_email: email,
          subject:    subject,
          message:    message,
        },
        PUBLIC_KEY
      );

      setSent(true);
    } catch (err) {
      console.error("EmailJS error:", err);
      setSendErr("Failed to send. Please try again or email us directly.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <style>{`
        .contact-section {
          position: relative;
          min-height: 100vh;
          background: #07050f;
          overflow: hidden;
          padding: 90px 5% 80px;
        }
        .contact-canvas {
          position: absolute;
          inset: 0;
          z-index: 0;
          pointer-events: none;
          width: 100%;
          height: 100%;
        }
        .contact-grid-lines {
          position: absolute;
          inset: 0;
          z-index: 1;
          pointer-events: none;
          background-image:
            linear-gradient(rgba(108,99,255,.04) 1px, transparent 1px),
            linear-gradient(90deg, rgba(108,99,255,.04) 1px, transparent 1px);
          background-size: 60px 60px;
        }
        .contact-orb {
          position: absolute;
          border-radius: 50%;
          pointer-events: none;
          z-index: 1;
        }
        .contact-orb-1 {
          width: 520px; height: 520px;
          background: radial-gradient(circle, rgba(108,60,220,.22) 0%, transparent 70%);
          top: -130px; right: -110px;
          animation: contactOrb1 9s ease-in-out infinite;
        }
        .contact-orb-2 {
          width: 380px; height: 380px;
          background: radial-gradient(circle, rgba(0,180,140,.13) 0%, transparent 70%);
          bottom: -90px; left: -80px;
          animation: contactOrb2 11s ease-in-out infinite;
        }
        .contact-orb-3 {
          width: 260px; height: 260px;
          background: radial-gradient(circle, rgba(180,60,255,.12) 0%, transparent 70%);
          top: 42%; left: 34%;
          animation: contactOrb3 7s ease-in-out infinite;
        }
        @keyframes contactOrb1 {
          0%,100% { transform: translate(0,0) scale(1); }
          50%      { transform: translate(-28px,22px) scale(1.07); }
        }
        @keyframes contactOrb2 {
          0%,100% { transform: translate(0,0) scale(1); }
          50%      { transform: translate(22px,-18px) scale(1.05); }
        }
        @keyframes contactOrb3 {
          0%,100% { transform: translate(0,0); }
          50%      { transform: translate(-15px,15px); }
        }
        .contact-inner {
          position: relative;
          z-index: 5;
          max-width: 1100px;
          margin: 0 auto;
        }
        .contact-header {
          text-align: center;
          animation: contactFadeUp .6s ease both;
        }
        .contact-badge {
          display: inline-flex;
          align-items: center;
          gap: 7px;
          padding: 7px 18px;
          border-radius: 999px;
          background: rgba(108,99,255,.12);
          border: 1px solid rgba(108,99,255,.3);
          color: #b09fff;
          font-size: 11px;
          font-weight: 700;
          letter-spacing: .1em;
          text-transform: uppercase;
          margin-bottom: 18px;
        }
        .contact-badge-dot {
          width: 7px; height: 7px;
          border-radius: 50%;
          background: #6C63FF;
          animation: contactDotPulse 1.5s infinite;
        }
        @keyframes contactDotPulse {
          0%,100% { opacity:1; transform:scale(1); box-shadow:0 0 0 0 rgba(108,99,255,.5); }
          60%      { opacity:.4; transform:scale(.6); box-shadow:0 0 0 6px rgba(108,99,255,0); }
        }
        .contact-title {
          font-size: clamp(28px, 4.5vw, 54px);
          font-weight: 800;
          line-height: 1.1;
          color: #ede8ff;
          margin-bottom: 14px;
        }
        .contact-title-grad {
          background: linear-gradient(130deg, #6C63FF 0%, #b06fff 50%, #00D4AA 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }
        .contact-subtitle {
          font-size: 15px;
          color: #6e6890;
          max-width: 540px;
          margin: 0 auto 52px;
          line-height: 1.75;
        }
        .contact-cols {
          display: grid;
          grid-template-columns: 1fr 1.55fr;
          gap: 44px;
          align-items: start;
        }
        @media (max-width: 760px) {
          .contact-cols { grid-template-columns: 1fr; gap: 28px; }
        }
        .contact-glass-card {
          background: rgba(255,255,255,.028);
          border: 1px solid rgba(108,99,255,.15);
          border-radius: 22px;
          padding: 28px;
          backdrop-filter: blur(18px);
          -webkit-backdrop-filter: blur(18px);
          transition: border-color .4s, transform .4s;
          animation: contactFadeUp .65s .15s ease both;
        }
        .contact-glass-card:hover {
          border-color: rgba(108,99,255,.35);
          transform: translateY(-3px);
        }
        .contact-info-title {
          font-size: 19px;
          font-weight: 800;
          color: #ede8ff;
          margin-bottom: 8px;
        }
        .contact-info-sub {
          font-size: 13px;
          color: #6e6890;
          line-height: 1.6;
          margin-bottom: 20px;
        }
        .contact-row {
          display: flex;
          align-items: center;
          gap: 14px;
          padding: 14px 0;
          border-bottom: 1px solid rgba(108,99,255,.1);
          cursor: default;
        }
        .contact-row:last-of-type { border-bottom: none; padding-bottom: 0; }
        .contact-icon-box {
          width: 44px; height: 44px; min-width: 44px;
          border-radius: 13px;
          background: rgba(108,99,255,.1);
          border: 1px solid rgba(108,99,255,.22);
          display: flex; align-items: center; justify-content: center;
          color: #9b8fff;
          transition: transform .3s, background .3s, box-shadow .3s;
        }
        .contact-row:hover .contact-icon-box {
          background: rgba(108,99,255,.22);
          transform: scale(1.1) rotate(-6deg);
          box-shadow: 0 0 18px rgba(108,99,255,.3);
        }
        .contact-clabel {
          font-size: 10px;
          text-transform: uppercase;
          letter-spacing: .07em;
          color: #4e4a6a;
          font-weight: 700;
          margin-bottom: 2px;
        }
        .contact-cval {
          font-size: 13px;
          color: #c8c0f0;
          font-weight: 500;
        }
        .contact-resp-box {
          background: rgba(0,212,170,.05);
          border: 1px solid rgba(0,212,170,.18);
          border-radius: 15px;
          padding: 18px;
          margin-top: 16px;
        }
        .contact-resp-head {
          font-size: 11px;
          text-transform: uppercase;
          letter-spacing: .08em;
          color: #00D4AA;
          font-weight: 700;
          margin-bottom: 12px;
        }
        .contact-resp-row {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 8px 0;
          border-bottom: 1px solid rgba(0,212,170,.08);
        }
        .contact-resp-row:last-child { border-bottom: none; padding-bottom: 0; }
        .contact-resp-key { font-size: 12px; color: #6e6890; }
        .contact-resp-val {
          font-size: 11px; font-weight: 700; color: #00D4AA;
          background: rgba(0,212,170,.1);
          padding: 3px 9px; border-radius: 999px;
          border: 1px solid rgba(0,212,170,.2);
        }
        .contact-form-card {
          background: rgba(255,255,255,.028);
          border: 1px solid rgba(108,99,255,.18);
          border-radius: 22px;
          padding: 30px;
          backdrop-filter: blur(18px);
          -webkit-backdrop-filter: blur(18px);
          transition: border-color .4s, box-shadow .4s;
          animation: contactFadeUp .65s .25s ease both;
        }
        .contact-form-card:hover { border-color: rgba(108,99,255,.38); }
        .contact-form-card.contact-shake {
          animation: contactShake .35s ease;
          border-color: rgba(220,60,60,.5) !important;
        }
        @keyframes contactShake {
          0%,100% { transform:translateX(0); }
          25%      { transform:translateX(-7px); }
          75%      { transform:translateX(7px); }
        }
        .contact-form-row2 {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 14px;
        }
        @media (max-width: 460px) {
          .contact-form-row2 { grid-template-columns: 1fr; }
        }
        .contact-field {
          display: flex;
          flex-direction: column;
          gap: 5px;
          margin-bottom: 14px;
        }
        .contact-field label {
          font-size: 11px;
          font-weight: 700;
          color: #5a5678;
          text-transform: uppercase;
          letter-spacing: .06em;
        }
        .contact-field input,
        .contact-field textarea {
          background: rgba(108,99,255,.06);
          border: 1px solid rgba(108,99,255,.18);
          border-radius: 11px;
          padding: 11px 14px;
          font-size: 14px;
          color: #e0dcff;
          font-family: inherit;
          outline: none;
          transition: border-color .3s, box-shadow .3s, background .3s;
          resize: none;
        }
        .contact-field input::placeholder,
        .contact-field textarea::placeholder {
          color: #3d3960;
          font-size: 13px;
        }
        .contact-field input:focus,
        .contact-field textarea:focus {
          border-color: #7C6FFF;
          box-shadow: 0 0 0 3px rgba(108,99,255,.14);
          background: rgba(108,99,255,.1);
        }
        .contact-btn {
          display: inline-flex;
          align-items: center;
          gap: 9px;
          padding: 13px 26px;
          border-radius: 12px;
          background: linear-gradient(135deg, #5a50ef, #9b5de5);
          border: none;
          color: #fff;
          font-size: 14px;
          font-weight: 700;
          cursor: pointer;
          font-family: inherit;
          transition: transform .25s, box-shadow .25s, opacity .25s;
          box-shadow: 0 4px 22px rgba(108,99,255,.38);
          position: relative;
          overflow: hidden;
        }
        .contact-btn::before {
          content: '';
          position: absolute; inset: 0;
          background: linear-gradient(135deg, rgba(255,255,255,.12), transparent);
          opacity: 0;
          transition: opacity .2s;
        }
        .contact-btn:hover:not(:disabled) {
          transform: translateY(-2px);
          box-shadow: 0 8px 32px rgba(108,99,255,.55);
        }
        .contact-btn:hover:not(:disabled)::before { opacity: 1; }
        .contact-btn:active:not(:disabled) { transform: scale(.97); }
        .contact-btn:disabled {
          opacity: .7;
          cursor: not-allowed;
        }
        .contact-btn-arrow { transition: transform .3s; }
        .contact-btn:hover:not(:disabled) .contact-btn-arrow { transform: translateX(4px); }

        /* ── NEW: Error banner ── */
        .contact-send-err {
          display: flex;
          align-items: center;
          gap: 9px;
          background: rgba(220,60,60,.1);
          border: 1px solid rgba(220,60,60,.3);
          border-radius: 10px;
          padding: 11px 14px;
          margin-bottom: 14px;
          font-size: 13px;
          color: #ff8080;
          animation: contactFadeUp .3s ease both;
        }

        /* Success state */
        .contact-success {
          text-align: center;
          padding: 48px 20px;
          animation: contactFadeUp .5s ease both;
        }
        .contact-check-circle {
          width: 66px; height: 66px;
          border-radius: 50%;
          background: rgba(0,212,170,.1);
          border: 1px solid rgba(0,212,170,.28);
          display: flex; align-items: center; justify-content: center;
          margin: 0 auto 20px;
          color: #00D4AA;
          animation: contactPop .55s .1s cubic-bezier(.34,1.56,.64,1) both;
        }
        @keyframes contactPop {
          from { transform:scale(0); opacity:0; }
          to   { transform:scale(1); opacity:1; }
        }
        .contact-success h3 {
          font-size: 21px;
          font-weight: 800;
          color: #ede8ff;
          margin-bottom: 8px;
        }
        .contact-success p {
          font-size: 13px;
          color: #6e6890;
          line-height: 1.65;
        }
        @keyframes contactFadeUp {
          from { opacity:0; transform:translateY(22px); }
          to   { opacity:1; transform:translateY(0); }
        }
      `}</style>

      <section id="contact" className="contact-section">
        <canvas ref={canvasRef} className="contact-canvas" />
        <div className="contact-grid-lines" />
        <div className="contact-orb contact-orb-1" />
        <div className="contact-orb contact-orb-2" />
        <div className="contact-orb contact-orb-3" />

        <div className="contact-inner">

          {/* ── Header ── */}
          <div className="contact-header">
            <div className="contact-badge">
              <span className="contact-badge-dot" />
              Contact Us
            </div>
            <h2 className="contact-title">
              Let's Build <span className="contact-title-grad">Together</span>
            </h2>
            <p className="contact-subtitle">
              Have a project in mind? We'd love to hear about it. Send us a message
              and we'll get back to you within 24 hours.
            </p>
          </div>

          {/* ── Two-column grid ── */}
          <div className="contact-cols">

            {/* ── Left: Info card ── */}
            <div className="contact-glass-card">
              <div className="contact-info-title">Get In Touch</div>
              <p className="contact-info-sub">
                Our team of experts is standing by to help you build something extraordinary.
              </p>
              <div className="contact-row">
                <div className="contact-icon-box"><MailIcon /></div>
                <div>
                  <div className="contact-clabel">Email Us</div>
                  <div className="contact-cval">himanshurchaudhary499@gmail.com</div>
                </div>
              </div>
              <div className="contact-row">
                <div className="contact-icon-box"><PhoneIcon /></div>
                <div>
                  <div className="contact-clabel">Call Us</div>
                  <div className="contact-cval">+91 7563883929</div>
                </div>
              </div>
              <div className="contact-resp-box">
                <div className="contact-resp-head">⚡ Response Time</div>
                {RESPONSE_TIMES.map(([k, v]) => (
                  <div key={k} className="contact-resp-row">
                    <span className="contact-resp-key">{k}</span>
                    <span className="contact-resp-val">{v}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* ── Right: Form card ── */}
            <div className={`contact-form-card${error ? " contact-shake" : ""}`}>
              {sent ? (
                <div className="contact-success">
                  <div className="contact-check-circle"><CheckIcon /></div>
                  <h3>Message Sent!</h3>
                  <p>
                    Thanks for reaching out, {form.name}!<br />
                    We'll be in touch within 24 hours.
                  </p>
                </div>
              ) : (
                <form onSubmit={submit}>

                  {/* ── Error banner (only shown when EmailJS call fails) ── */}
                  {sendErr && (
                    <div className="contact-send-err">
                      ⚠ {sendErr}
                    </div>
                  )}

                  <div className="contact-form-row2">
                    <div className="contact-field">
                      <label>Full Name *</label>
                      <input
                        name="name"
                        value={form.name}
                        onChange={handle}
                        placeholder="John Smith"
                        required
                      />
                    </div>
                    <div className="contact-field">
                      <label>Email Address *</label>
                      <input
                        name="email"
                        type="email"
                        value={form.email}
                        onChange={handle}
                        placeholder="john@company.com"
                        required
                      />
                    </div>
                  </div>

                  <div className="contact-field">
                    <label>Subject *</label>
                    <input
                      name="subject"
                      value={form.subject}
                      onChange={handle}
                      placeholder="Tell us about your project..."
                      required
                    />
                  </div>

                  <div className="contact-field">
                    <label>Message *</label>
                    <textarea
                      name="message"
                      rows={6}
                      value={form.message}
                      onChange={handle}
                      placeholder="Describe your project in detail..."
                      required
                    />
                  </div>

                  <button type="submit" className="contact-btn" disabled={loading}>
                    {loading ? (
                      <>
                        <SpinnerIcon />
                        Sending…
                      </>
                    ) : (
                      <>
                        Send Message
                        <span className="contact-btn-arrow"><ArrowIcon /></span>
                      </>
                    )}
                  </button>

                </form>
              )}
            </div>

          </div>
        </div>
      </section>
    </>
  );
}