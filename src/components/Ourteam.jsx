import React, { useState, useEffect, useRef } from "react";
import * as THREE from "three";

// ─── Team Data ────────────────────────────────────────────────────────────────
// facePosition controls which part of the photo is shown in the card crop.
// Format: "X% Y%" — X = left/right, Y = top/bottom
// Examples:
//   "center 30%"  → face in upper-center of photo
//   "70% 25%"     → face in upper-right of photo
//   "center 60%"  → face in lower-center of photo
// Tweak these values until each face is perfectly centered in the card.
const TEAM = [
  {
    id: 1,
    name: "Himanshu Chaudhary",
    role: "Full-Stack Developer",
    image: "/IMG202302171459051.jpg",
    facePosition: "center 25%",
    bio: "I am a passionate Full Stack Developer with strong knowledge of frontend and backend technologies. I specialize in building responsive, scalable, and user-friendly web applications using modern technologies",
    initials: "HC",
    color: "#6C63FF",
    skills: ["MERN Developer", "DSA", "OOPs", "WordPress", "Ai Agent", "Ai Automation"],
    stats: [{ label: "Projects Led", value: "10+" }, { label: "Years Exp.", value: "3+" }, { label: "Clients", value: "15+" }],
    social: { linkedin: "#", twitter: "#", github: "#" },
  },
  {
    id: 2,
    name: "Bittu Kumar",
    role: "Full-Stack Developer",
    image: "/hgcg.jpeg",
    facePosition: "center 40%",   // photo shot from below — pull focus lower
    bio: "Full Stack Developer with hands-on experience in designing and developing modern web applications from frontend to backend.",
    initials: "BK",
    color: "#00D4AA",
    skills: ["Node.js", "React", "AWS", "System Design", "WordPress"],
    stats: [{ label: "Systems Built", value: "8+" }, { label: "Years Exp.", value: "1+" }, { label: "Uptime", value: "99.9%" }],
    social: { linkedin: "#", twitter: "#", github: "#" },
  },
  {
    id: 3,
    name: "Aditya Raghuvanshi",
    role: "Lead UI/UX Designer",
    image: "/cgdc.jpeg",
    facePosition: "75% 20%",      // face is on right side of frame — shift X right
    bio: "Award-winning designer with a philosophy that great design is invisible. Aditya crafts experiences that convert visitors into loyal customers.",
    initials: "AR",
    color: "#FF6B9D",
    skills: ["Figma", "Motion", "Branding", "Prototyping"],
    stats: [{ label: "Designs Shipped", value: "100+" }, { label: "Years Exp.", value: "2+" }, { label: "Awards", value: "12" }],
    social: { linkedin: "#", twitter: "#", github: "#" },
  },
];

// ─── Three.js Background ──────────────────────────────────────────────────────
const ThreeBackground = () => {
  const mountRef = useRef(null);
  useEffect(() => {
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    mountRef.current.appendChild(renderer.domElement);

    const particlesCount = 2000;
    const posArray = new Float32Array(particlesCount * 3);
    for (let i = 0; i < particlesCount * 3; i++) posArray[i] = (Math.random() - 0.5) * 10;
    const geo = new THREE.BufferGeometry();
    geo.setAttribute("position", new THREE.BufferAttribute(posArray, 3));
    const mat = new THREE.PointsMaterial({ size: 0.005, color: "#8888ff", transparent: true, opacity: 0.8, blending: THREE.AdditiveBlending });
    const mesh = new THREE.Points(geo, mat);
    scene.add(mesh);
    camera.position.z = 3;

    let mx = 0, my = 0;
    const onMove = (e) => { mx = e.clientX / window.innerWidth - 0.5; my = e.clientY / window.innerHeight - 0.5; };
    window.addEventListener("mousemove", onMove);
    const animate = () => {
      requestAnimationFrame(animate);
      mesh.rotation.y += 0.001; mesh.rotation.x += 0.0005;
      camera.position.x += (mx * 0.5 - camera.position.x) * 0.05;
      camera.position.y += (-my * 0.5 - camera.position.y) * 0.05;
      camera.lookAt(scene.position);
      renderer.render(scene, camera);
    };
    animate();
    const onResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };
    window.addEventListener("resize", onResize);
    return () => {
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("resize", onResize);
      mountRef.current?.removeChild(renderer.domElement);
    };
  }, []);
  return <div ref={mountRef} className="tm-three-container" />;
};

// ─── Icons ────────────────────────────────────────────────────────────────────
const SocialIcon = ({ type }) => {
  const icons = {
    linkedin: <path d="M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-2-2 2 2 0 00-2 2v7h-4v-7a6 6 0 016-6zM2 9h4v12H2z" />,
    twitter:  <path d="M23 3a10.9 10.9 0 01-3.14 1.53 4.48 4.48 0 00-7.86 3v1A10.66 10.66 0 013 4s-4 9 5 13a11.64 11.64 0 01-7 2c9 5 20 0 20-11.5a4.5 4.5 0 00-.08-.83A7.72 7.72 0 0023 3z" />,
    github:   <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 00-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0020 4.77 5.07 5.07 0 0019.91 1S18.73.65 16 2.48a13.38 13.38 0 00-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 005 4.77a5.44 5.44 0 00-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 009 18.13V22" />,
  };
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
      {icons[type]}
      {type === "linkedin" && <circle cx="4" cy="4" r="2" />}
    </svg>
  );
};

// ─── Avatar (Modal) ───────────────────────────────────────────────────────────
const Avatar = ({ member, size = 100 }) => {
  const [imgError, setImgError] = useState(false);
  return (
    <div style={{
      width: size, height: size, borderRadius: "50%",
      background: `linear-gradient(135deg, ${member.color}, ${member.color}44)`,
      display: "flex", alignItems: "center", justifyContent: "center",
      fontSize: size * 0.32, fontWeight: "900", color: "#fff",
      boxShadow: `0 0 0 3px ${member.color}66, 0 0 25px ${member.color}55`,
      border: `3px solid ${member.color}`,
      overflow: "hidden", flexShrink: 0,
    }}>
      {member.image && !imgError ? (
        <img
          src={member.image} alt={member.name}
          style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: member.facePosition || "center 25%" }}
          onError={() => setImgError(true)}
        />
      ) : member.initials}
    </div>
  );
};

// ─── Team Card ────────────────────────────────────────────────────────────────
const TeamCard = ({ member, index, onSelect }) => {
  const [imgError, setImgError] = useState(false);
  return (
    <div className="tm-card" style={{ "--accent": member.color, "--delay": index }} onClick={() => onSelect(member)}>
      <div className="tm-card-front">

        {/* Cover image — fills top of card */}
        <div className="tm-card-cover">
          {member.image && !imgError ? (
            <img
              src={member.image}
              alt={member.name}
              className="tm-card-cover-img"
              style={{ objectPosition: member.facePosition || "center 25%" }}
              onError={() => setImgError(true)}
            />
          ) : (
            <div className="tm-card-cover-initials"
              style={{ background: `linear-gradient(135deg, ${member.color}cc, ${member.color}33)` }}>
              {member.initials}
            </div>
          )}
          <div className="tm-card-cover-fade" />
          <div className="tm-online-pulse" />
        </div>

        {/* Info strip below image */}
        <div className="tm-card-body">
          <h3 className="tm-name">{member.name}</h3>
          <p className="tm-role">{member.role}</p>
          <div className="tm-card-footer">
            <div className="tm-skill-dots">
              {member.skills.slice(0, 3).map((s) => <span key={s} className="tm-dot" />)}
            </div>
            <span className="tm-view-btn">View Profile →</span>
          </div>
        </div>

      </div>
    </div>
  );
};

// ─── Modal ────────────────────────────────────────────────────────────────────
const Modal = ({ member, onClose }) => {
  if (!member) return null;
  return (
    <div className="tm-modal-overlay" onClick={onClose}>
      <div className="tm-modal-content" onClick={(e) => e.stopPropagation()} style={{ "--accent": member.color }}>
        <button className="tm-modal-close" onClick={onClose}>×</button>
        <div className="tm-modal-grid">
          <div className="tm-modal-left">
            <div className="tm-modal-avatar-ring">
              <Avatar member={member} size={160} />
            </div>
            <h2 className="tm-modal-name">{member.name}</h2>
            <p className="tm-modal-role">{member.role}</p>
            <div className="tm-social-grid">
              {Object.entries(member.social).map(([key, val]) => val && (
                <a key={key} href={val} className="tm-social-icon"><SocialIcon type={key} /></a>
              ))}
            </div>
          </div>
          <div className="tm-modal-right">
            <div className="tm-modal-stats">
              {member.stats.map((s) => (
                <div key={s.label} className="tm-stat">
                  <span className="tm-stat-val">{s.value}</span>
                  <span className="tm-stat-lbl">{s.label}</span>
                </div>
              ))}
            </div>
            <div className="tm-modal-bio">
              <h4>Background</h4>
              <p>{member.bio}</p>
            </div>
            <div className="tm-modal-skills">
              <h4>Expertise</h4>
              <div className="tm-skills-list">
                {member.skills.map((s) => <span key={s} className="tm-skill-tag">{s}</span>)}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// ─── Main Export ──────────────────────────────────────────────────────────────
export default function OurTeam() {
  const [selected, setSelected] = useState(null);
  return (
    <div className="tm-app-container">
      <style>{`
        :root { --bg: #030014; --glass: rgba(255,255,255,0.03); --border: rgba(255,255,255,0.1); }
        * { box-sizing: border-box; }

        .tm-app-container {
          background: var(--bg); color: white; min-height: 100vh;
          font-family: 'Inter', system-ui, sans-serif;
          position: relative; overflow-x: hidden; padding: 80px 20px;
        }
        .tm-three-container { position: fixed; inset: 0; z-index: 1; pointer-events: none; }
        .tm-content { position: relative; z-index: 2; max-width: 1200px; margin: 0 auto; }

        /* Header */
        .tm-header { text-align: center; margin-bottom: 72px; }
        .tm-header-badge {
          display: inline-block; padding: 6px 20px;
          background: rgba(108,99,255,0.12); border: 1px solid rgba(108,99,255,0.35);
          border-radius: 100px; color: #a5b4fc; font-size: 0.75rem; font-weight: 600;
          letter-spacing: 0.12em; text-transform: uppercase; margin-bottom: 24px;
          animation: fadeInDown 0.8s ease;
        }
        .tm-main-title {
          font-size: clamp(2.5rem, 6vw, 4.5rem); font-weight: 800; margin: 0 0 16px;
          background: linear-gradient(to bottom, #fff 40%, #555);
          -webkit-background-clip: text; -webkit-text-fill-color: transparent; letter-spacing: -0.02em;
        }
        .tm-header p { color: #777; max-width: 560px; margin: 0 auto; line-height: 1.7; font-size: 1rem; }

        /* Grid */
        .tm-team-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(300px, 1fr)); gap: 28px; }

        /* Card */
        .tm-card {
          cursor: pointer; opacity: 0;
          animation: cardEntrance 0.6s ease forwards;
          animation-delay: calc(var(--delay) * 0.12s);
          border-radius: 20px; overflow: hidden;
          transition: transform 0.35s cubic-bezier(0.23,1,0.32,1), box-shadow 0.35s, border-color 0.35s;
          box-shadow: 0 8px 32px rgba(0,0,0,0.5);
          border: 1px solid var(--border); background: #0d0d1a;
        }
        .tm-card:hover {
          transform: translateY(-8px) scale(1.015);
          box-shadow: 0 24px 60px rgba(0,0,0,0.7), 0 0 0 1px var(--accent)88;
          border-color: var(--accent)88;
        }
        .tm-card-front { display: flex; flex-direction: column; }

        /* Cover — tall so face always fits */
        .tm-card-cover {
          position: relative; width: 100%; height: 280px;
          overflow: hidden; background: #111;
        }
        .tm-card-cover-img {
          width: 100%; height: 100%; object-fit: cover;
          display: block; transition: transform 0.5s ease;
        }
        .tm-card:hover .tm-card-cover-img { transform: scale(1.05); }

        .tm-card-cover-initials {
          width: 100%; height: 100%; display: flex; align-items: center; justify-content: center;
          font-size: 4rem; font-weight: 900; color: rgba(255,255,255,0.85);
        }

        /* Fade bottom of image so text below is readable */
        .tm-card-cover-fade {
          position: absolute; bottom: 0; left: 0; right: 0; height: 80px;
          background: linear-gradient(to bottom, transparent, #0d0d1a);
          pointer-events: none;
        }

        .tm-online-pulse {
          position: absolute; top: 14px; right: 14px;
          width: 11px; height: 11px; background: #10b981;
          border-radius: 50%; border: 2px solid #0d0d1a; animation: pulse 2s infinite;
        }
        @keyframes pulse {
          0%,100% { box-shadow: 0 0 5px #10b981; }
          50%      { box-shadow: 0 0 16px #10b981, 0 0 26px #10b98155; }
        }

        /* Card body */
        .tm-card-body { padding: 16px 20px 18px; display: flex; flex-direction: column; }
        .tm-name { margin: 0 0 3px; font-size: 1.1rem; font-weight: 700; color: #fff; letter-spacing: -0.01em; }
        .tm-role { font-size: 0.8rem; color: var(--accent); margin: 0 0 13px; font-weight: 500; }
        .tm-card-footer {
          display: flex; justify-content: space-between; align-items: center;
          padding-top: 11px; border-top: 1px solid var(--border);
        }
        .tm-dot { width: 6px; height: 6px; border-radius: 50%; background: var(--accent); margin-right: 5px; display: inline-block; opacity: 0.7; }
        .tm-view-btn { font-size: 0.7rem; font-weight: 700; text-transform: uppercase; color: var(--accent); letter-spacing: 0.05em; }

        /* Modal */
        .tm-modal-overlay {
          position: fixed; inset: 0; background: rgba(0,0,0,0.88); backdrop-filter: blur(18px);
          z-index: 1000; display: flex; align-items: center; justify-content: center;
          padding: 20px; animation: fadeIn 0.3s ease;
        }
        .tm-modal-content {
          background: #080810; border: 1px solid var(--accent);
          border-radius: 32px; width: 100%; max-width: 860px; max-height: 92vh;
          overflow-y: auto; position: relative; padding: 48px 44px;
          box-shadow: 0 30px 80px rgba(0,0,0,0.9), 0 0 100px var(--accent)18;
          animation: modalIn 0.45s cubic-bezier(0.19,1,0.22,1);
        }
        .tm-modal-content::-webkit-scrollbar { width: 4px; }
        .tm-modal-content::-webkit-scrollbar-thumb { background: var(--accent)55; border-radius: 4px; }

        .tm-modal-close {
          position: absolute; top: 18px; right: 22px;
          background: rgba(255,255,255,0.05); border: 1px solid rgba(255,255,255,0.1);
          border-radius: 50%; width: 36px; height: 36px;
          display: flex; align-items: center; justify-content: center;
          color: #666; font-size: 1.4rem; cursor: pointer; transition: all 0.2s;
        }
        .tm-modal-close:hover { background: rgba(255,255,255,0.12); color: #fff; }

        .tm-modal-grid { display: grid; grid-template-columns: 220px 1fr; gap: 48px; align-items: start; }
        @media (max-width: 700px) {
          .tm-modal-grid { grid-template-columns: 1fr; gap: 32px; }
          .tm-modal-left { display: flex; flex-direction: column; align-items: center; text-align: center; }
          .tm-modal-content { padding: 32px 24px; }
          .tm-social-grid { justify-content: center; }
        }

        .tm-modal-avatar-ring {
          display: inline-block; padding: 4px; border-radius: 50%;
          background: linear-gradient(135deg, var(--accent), var(--accent)44); margin-bottom: 20px;
        }
        .tm-modal-name { font-size: 1.8rem; font-weight: 800; margin: 0 0 6px; color: #fff; letter-spacing: -0.02em; line-height: 1.2; }
        .tm-modal-role { color: var(--accent); font-weight: 600; font-size: 0.9rem; margin: 0; }

        .tm-social-grid { display: flex; gap: 10px; margin-top: 24px; flex-wrap: wrap; }
        .tm-social-icon {
          width: 42px; height: 42px; display: flex; align-items: center; justify-content: center;
          background: rgba(255,255,255,0.05); border: 1px solid rgba(255,255,255,0.08);
          border-radius: 12px; color: #777; transition: all 0.25s; text-decoration: none;
        }
        .tm-social-icon:hover { background: var(--accent); border-color: var(--accent); color: white; transform: translateY(-3px); }

        .tm-modal-stats { display: grid; grid-template-columns: repeat(3,1fr); gap: 14px; margin-bottom: 32px; }
        .tm-stat {
          background: rgba(255,255,255,0.03); padding: 18px 12px;
          border-radius: 18px; border: 1px solid rgba(255,255,255,0.07); text-align: center; transition: border-color 0.2s;
        }
        .tm-stat:hover { border-color: var(--accent)55; }
        .tm-stat-val { display: block; font-size: 1.7rem; font-weight: 800; color: var(--accent); line-height: 1; margin-bottom: 6px; }
        .tm-stat-lbl { font-size: 0.68rem; color: #555; text-transform: uppercase; letter-spacing: 0.1em; }

        .tm-modal-bio { margin-bottom: 28px; }
        .tm-modal-bio h4, .tm-modal-skills h4 {
          font-size: 0.72rem; text-transform: uppercase; color: #444; margin: 0 0 12px; letter-spacing: 0.14em; font-weight: 600;
        }
        .tm-modal-bio p { color: #999; line-height: 1.75; font-size: 0.95rem; margin: 0; }

        .tm-skills-list { display: flex; flex-wrap: wrap; gap: 10px; }
        .tm-skill-tag {
          padding: 7px 16px; background: rgba(255,255,255,0.04);
          border: 1px solid rgba(255,255,255,0.09); border-radius: 10px; font-size: 0.82rem; color: #bbb; transition: all 0.2s;
        }
        .tm-skill-tag:hover { background: var(--accent)18; border-color: var(--accent)55; color: var(--accent); }

        .tm-glow {
          position: fixed; top: 0; left: 50%; width: 100vw; height: 100vh;
          background: radial-gradient(circle at 50% 20%, #6C63FF1a 0%, transparent 65%);
          transform: translateX(-50%); z-index: 1; pointer-events: none;
        }

        @keyframes fadeInDown { from { opacity:0; transform:translateY(-20px); } to { opacity:1; transform:translateY(0); } }
        @keyframes cardEntrance { from { opacity:0; transform:translateY(40px) scale(0.88); } to { opacity:1; transform:translateY(0) scale(1); } }
        @keyframes fadeIn { from { opacity:0; } to { opacity:1; } }
        @keyframes modalIn { from { opacity:0; transform:scale(0.82) translateY(50px); } to { opacity:1; transform:scale(1) translateY(0); } }
      `}</style>

      <ThreeBackground />
      <div className="tm-glow" />

      <main className="tm-content">
        <header className="tm-header">
          <span className="tm-header-badge">Collaborative Intelligence</span>
          <h1 className="tm-main-title">Digital Architects</h1>
          <p>We combine high-performance engineering with avant-garde design to build the future of the decentralized web.</p>
        </header>
        <section className="tm-team-grid">
          {TEAM.map((member, i) => (
            <TeamCard key={member.id} member={member} index={i} onSelect={setSelected} />
          ))}
        </section>
      </main>

      {selected && <Modal member={selected} onClose={() => setSelected(null)} />}
    </div>
  );
}