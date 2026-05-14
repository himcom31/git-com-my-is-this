import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";


/* ─────────────────────────────────────────────
   DATA
───────────────────────────────────────────── */
const SERVICES = [
    { icon: "⚙️", title: "Custom Software", desc: "Bespoke applications engineered from the ground up — tailored exactly to your domain, workflow, and scale requirements.", tag: "Tailor-Made", color: "#4ADE80" },
    { icon: "🔌", title: "API Development", desc: "RESTful & GraphQL APIs built for performance. Versioned, documented, rate-limited, and secured with OAuth 2.0 out of the box.", tag: "API-First", color: "#FCD34D" },
    { icon: "🏗️", title: "Backend Engineering", desc: "High-throughput server systems using Node.js or Go. Microservices, event queues, and caching layers built for millions of requests.", tag: "Scalable", color: "#86EFAC" },
    { icon: "☁️", title: "Cloud & DevOps", desc: "AWS / GCP infrastructure with Terraform, Kubernetes orchestration, and CI/CD pipelines. Ship code in minutes, not days.", tag: "Cloud-Native", color: "#FCD34D" },
    { icon: "🗄️", title: "Database Architecture", desc: "Schema design, query optimization, and replication for PostgreSQL, MongoDB, and Redis. Tuned for your read/write profile.", tag: "Data-First", color: "#4ADE80" },
    { icon: "🔐", title: "Security & Compliance", desc: "SOC 2, HIPAA, GDPR-ready systems. Pen testing, encryption at rest, audit logging, and zero-trust architecture baked in.", tag: "Enterprise-Grade", color: "#86EFAC" },
];

const PROCESS = [
    { num: "01", title: "Discovery", desc: "We map your domain, stakeholders, and data flows before writing a single line — architecture doc delivered in week one." },
    { num: "02", title: "System Design", desc: "ERDs, API contracts, infrastructure diagrams, and a tech-stack decision rooted in your traffic projections." },
    { num: "03", title: "Sprint Build", desc: "Two-week sprints with live staging access. You see working software every fortnight — no black boxes." },
    { num: "04", title: "QA & Load Test", desc: "Automated test suites, chaos engineering, and load simulation at 10× projected peak traffic before a single user touches it." },
    { num: "05", title: "Launch", desc: "Zero-downtime deployment with Datadog / Grafana dashboards, alerting, and a war-room for the first 48 hours." },
    { num: "06", title: "Evolve", desc: "Monitoring reviews, performance retainers, and a team that stays on call as your product scales past MVP." },
];

const TECH = [
    { name: "Node.js", category: "Runtime" },
    { name: "Node.js", category: "Backend" },
    { name: "javascript", category: "AI/Scripts" },
    { name: "PostgreSQL", category: "Database" },
    { name: "MongoDB", category: "Database" },
    { name: "Redis", category: "Cache" },
    { name: "Kafka", category: "Messaging" },
    { name: "REST", category: "API" },
    { name: "Epress.js", category: "API" },
    { name: "Terraform", category: "IaC" },
    { name: "AWS", category: "Cloud" },
    { name: "Docker", category: "DevOps" },
    { name: "Datadog", category: "Monitoring" },
];

const STATS = [
    { value: "5+", label: "Systems Shipped" },
    { value: "90%", label: "Avg Uptime SLA" },
    { value: "700K", label: "Req / Sec Peak" },
    { value: "< 48h", label: "First Deploy" },
];

const WHY_US = [
    { icon: "📐", title: "Architecture First", color: "#4ADE80", desc: "System design docs delivered before week one ends. We map every dependency before a line of code is written." },
    { icon: "🔄", title: "Async-First Team", color: "#FCD34D", desc: "Structured PRs, ADRs, and weekly async demos. Multi-timezone but single-voice in code quality." },
    { icon: "📦", title: "Full IP Ownership", color: "#86EFAC", desc: "Every repo, config, and deployment — yours. No vendor lock-in, ever. We train your team to own it." },
    { icon: "📊", title: "Transparent Pricing", color: "#FCD34D", desc: "Fixed-price milestones or T&M with weekly burn reports. No surprise invoices, ever." },
];

/* ─────────────────────────────────────────────
   THREE.JS 3D BACKGROUND
───────────────────────────────────────────── */
function ThreeBackground() {
    const canvasRef = useRef(null);
    const animRef = useRef(null);
    const mouseRef = useRef({ x: 0, y: 0 });

    useEffect(() => {
        let cleanupFn = null;

        const script = document.createElement("script");
        script.src = "https://cdnjs.cloudflare.com/ajax/libs/three.js/r128/three.min.js";
        script.onload = () => {
            cleanupFn = initThree();
        };
        document.head.appendChild(script);

        function initThree() {
            const THREE = window.THREE;
            const canvas = canvasRef.current;
            if (!canvas || !THREE) return () => { };

            /* ── Renderer ── */
            const renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true });
            renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
            renderer.setSize(window.innerWidth, window.innerHeight);
            renderer.setClearColor(0x000000, 0);

            /* ── Scene & Camera ── */
            const scene = new THREE.Scene();
            const camera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 0.1, 1000);
            camera.position.set(0, 0, 35);

            /* ── Lights ── */
            scene.add(new THREE.AmbientLight(0x4ADE80, 0.35));
            const pl1 = new THREE.PointLight(0x22C55E, 2.5, 130);
            pl1.position.set(20, 20, 20);
            scene.add(pl1);
            const pl2 = new THREE.PointLight(0xFCD34D, 1.5, 90);
            pl2.position.set(-22, -16, 10);
            scene.add(pl2);
            const pl3 = new THREE.PointLight(0x86EFAC, 1.0, 70);
            pl3.position.set(0, 30, -12);
            scene.add(pl3);

            /* ── Particles ── */
            const COUNT = 220;
            const pos = new Float32Array(COUNT * 3);
            const cols = new Float32Array(COUNT * 3);
            const palette = [
                new THREE.Color(0x4ADE80),
                new THREE.Color(0x22C55E),
                new THREE.Color(0xFCD34D),
                new THREE.Color(0x86EFAC),
                new THREE.Color(0x16A34A),
            ];
            for (let i = 0; i < COUNT; i++) {
                pos[i * 3] = (Math.random() - 0.5) * 130;
                pos[i * 3 + 1] = (Math.random() - 0.5) * 120;
                pos[i * 3 + 2] = (Math.random() - 0.5) * 80;
                const c = palette[Math.floor(Math.random() * palette.length)];
                cols[i * 3] = c.r; cols[i * 3 + 1] = c.g; cols[i * 3 + 2] = c.b;
            }
            const pGeo = new THREE.BufferGeometry();
            pGeo.setAttribute("position", new THREE.BufferAttribute(pos, 3));
            pGeo.setAttribute("color", new THREE.BufferAttribute(cols, 3));
            const pMat = new THREE.PointsMaterial({ size: 0.52, vertexColors: true, transparent: true, opacity: 0.72, sizeAttenuation: true });
            const particles = new THREE.Points(pGeo, pMat);
            scene.add(particles);

            /* ── Large wireframe icosahedron ── */
            const icoGeo = new THREE.IcosahedronGeometry(18, 1);
            const icoMat = new THREE.MeshStandardMaterial({ color: 0x22C55E, wireframe: true, transparent: true, opacity: 0.055, emissive: 0x22C55E, emissiveIntensity: 0.25 });
            const ico = new THREE.Mesh(icoGeo, icoMat);
            scene.add(ico);

            /* ── Torus (right side) ── */
            const torusGeo = new THREE.TorusGeometry(10, 2.8, 22, 64);
            const torusMat = new THREE.MeshStandardMaterial({ color: 0xFCD34D, wireframe: true, transparent: true, opacity: 0.065, emissive: 0xFCD34D, emissiveIntensity: 0.18 });
            const torus = new THREE.Mesh(torusGeo, torusMat);
            torus.position.set(24, -8, -6);
            scene.add(torus);

            /* ── Second torus (left, small) ── */
            const torus2Geo = new THREE.TorusGeometry(5, 1.4, 16, 40);
            const torus2Mat = new THREE.MeshStandardMaterial({ color: 0x86EFAC, wireframe: true, transparent: true, opacity: 0.07, emissive: 0x86EFAC, emissiveIntensity: 0.2 });
            const torus2 = new THREE.Mesh(torus2Geo, torus2Mat);
            torus2.position.set(-26, 12, -4);
            scene.add(torus2);

            /* ── Floating octahedrons ── */
            const octColors = [0x4ADE80, 0xFCD34D, 0x86EFAC, 0x22C55E, 0x16A34A];
            const octs = [];
            for (let i = 0; i < 20; i++) {
                const size = 0.35 + Math.random() * 1.3;
                const geo = new THREE.OctahedronGeometry(size, 0);
                const mat = new THREE.MeshStandardMaterial({
                    color: octColors[i % octColors.length],
                    transparent: true, opacity: 0.22 + Math.random() * 0.28,
                    emissive: octColors[i % octColors.length], emissiveIntensity: 0.35,
                    wireframe: Math.random() > 0.45,
                });
                const mesh = new THREE.Mesh(geo, mat);
                mesh.position.set((Math.random() - 0.5) * 85, (Math.random() - 0.5) * 65, (Math.random() - 0.5) * 32);
                mesh.userData = {
                    rx: (Math.random() - 0.5) * 0.013,
                    ry: (Math.random() - 0.5) * 0.016,
                    amp: 0.4 + Math.random() * 0.9,
                    spd: 0.4 + Math.random() * 0.65,
                    off: Math.random() * Math.PI * 2,
                    oy: mesh.position.y,
                };
                scene.add(mesh);
                octs.push(mesh);
            }

            /* ── Grid ── */
            const grid = new THREE.GridHelper(220, 44, 0x22C55E, 0x22C55E);
            grid.material.transparent = true;
            grid.material.opacity = 0.025;
            grid.position.y = -30;
            scene.add(grid);

            /* ── Connection lines ── */
            const lineMat = new THREE.LineBasicMaterial({ color: 0x22C55E, transparent: true, opacity: 0.07 });
            for (let i = 0; i < 65; i++) {
                const ai = Math.floor(Math.random() * COUNT);
                const bi = Math.floor(Math.random() * COUNT);
                const pts = [
                    new THREE.Vector3(pos[ai * 3], pos[ai * 3 + 1], pos[ai * 3 + 2]),
                    new THREE.Vector3(pos[bi * 3], pos[bi * 3 + 1], pos[bi * 3 + 2]),
                ];
                scene.add(new THREE.Line(new THREE.BufferGeometry().setFromPoints(pts), lineMat));
            }

            /* ── Mouse ── */
            const onMouse = (e) => {
                mouseRef.current.x = (e.clientX / window.innerWidth - 0.5) * 2;
                mouseRef.current.y = (e.clientY / window.innerHeight - 0.5) * 2;
            };
            window.addEventListener("mousemove", onMouse);

            /* ── Resize ── */
            const onResize = () => {
                camera.aspect = window.innerWidth / window.innerHeight;
                camera.updateProjectionMatrix();
                renderer.setSize(window.innerWidth, window.innerHeight);
            };
            window.addEventListener("resize", onResize);

            /* ── Animate ── */
            let t = 0;
            function animate() {
                animRef.current = requestAnimationFrame(animate);
                t += 0.008;

                camera.position.x += (mouseRef.current.x * 4 - camera.position.x) * 0.02;
                camera.position.y += (-mouseRef.current.y * 3 - camera.position.y) * 0.02;
                camera.lookAt(0, 0, 0);

                ico.rotation.x += 0.0016; ico.rotation.y += 0.001;
                torus.rotation.x += 0.007; torus.rotation.y += 0.004;
                torus2.rotation.z += 0.009; torus2.rotation.x += 0.005;

                particles.rotation.y += 0.00055;
                particles.rotation.x += 0.00025;

                octs.forEach((o) => {
                    const d = o.userData;
                    o.rotation.x += d.rx;
                    o.rotation.y += d.ry;
                    o.position.y = d.oy + Math.sin(t * d.spd + d.off) * d.amp;
                });

                pl1.intensity = 2.0 + Math.sin(t * 1.2) * 0.65;
                pl2.intensity = 1.2 + Math.cos(t * 0.9) * 0.4;

                renderer.render(scene, camera);
            }
            animate();

            return () => {
                window.removeEventListener("mousemove", onMouse);
                window.removeEventListener("resize", onResize);
                cancelAnimationFrame(animRef.current);
                renderer.dispose();
            };
        }

        return () => {
            if (typeof cleanupFn === "function") cleanupFn();
            cancelAnimationFrame(animRef.current);
            if (script.parentNode) script.parentNode.removeChild(script);
        };
    }, []);

    return (
        <canvas
            ref={canvasRef}
            style={{
                position: "fixed", top: 0, left: 0,
                width: "100vw", height: "100vh",
                zIndex: 0, pointerEvents: "none",
            }}
        />
    );
}

/* ─────────────────────────────────────────────
   SHARED HOOKS & COMPONENTS
───────────────────────────────────────────── */
function useInView(threshold = 0.15) {
    const ref = useRef(null);
    const [inView, setInView] = useState(false);
    useEffect(() => {
        const obs = new IntersectionObserver(
            ([e]) => { if (e.isIntersecting) setInView(true); },
            { threshold }
        );
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
        const over = (e) => setBig(!!e.target.closest("button, a, [data-hover]"));
        window.addEventListener("mousemove", move);
        window.addEventListener("mouseover", over);
        return () => {
            window.removeEventListener("mousemove", move);
            window.removeEventListener("mouseover", over);
        };
    }, []);
    return (
        <div style={{
            position: "fixed", left: pos.x, top: pos.y,
            pointerEvents: "none", zIndex: 9999,
            width: big ? 48 : 16, height: big ? 48 : 16,
            borderRadius: "50%", border: "2px solid #22C55E",
            transform: "translate(-50%,-50%)",
            transition: "width 0.2s, height 0.2s, background 0.2s",
            background: big ? "rgba(34,197,94,0.12)" : "transparent",
            mixBlendMode: "difference",
        }} />
    );
}

/* ─────────────────────────────────────────────
   PAGE COMPONENT
───────────────────────────────────────────── */
export default function SoftwareDevLearnMore() {

    const nevigation = useNavigate();
    return (
        <div style={{
            fontFamily: "'Inter', 'JetBrains Mono', monospace",
            background: "#0A0F0D",
            color: "#E4EDE8",
            minHeight: "100vh",
            overflowX: "hidden",
            cursor: "none",
        }}>
            <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800;900&family=JetBrains+Mono:wght@400;700&display=swap');
        * { box-sizing: border-box; margin: 0; padding: 0; }
        ::-webkit-scrollbar { width: 4px; }
        ::-webkit-scrollbar-track { background: #0A0F0D; }
        ::-webkit-scrollbar-thumb { background: #22C55E; border-radius: 2px; }
        body { cursor: none; }
        @keyframes marquee   { 0%{transform:translateX(0)} 100%{transform:translateX(-50%)} }
        @keyframes gradShift { 0%{background-position:0% 50%} 50%{background-position:100% 50%} 100%{background-position:0% 50%} }
        @keyframes pulse     { 0%,100%{opacity:1} 50%{opacity:0.4} }
        .grad-text {
          background: linear-gradient(90deg, #4ADE80, #FCD34D, #86EFAC, #4ADE80);
          background-size: 300% auto;
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          animation: gradShift 5s ease infinite;
        }
        .mono { font-family: 'JetBrains Mono', monospace; }
        .glow-btn:hover { box-shadow: 0 0 32px rgba(34,197,94,0.45), 0 0 8px rgba(34,197,94,0.2); }
        .card-hover { transition: transform 0.3s ease, box-shadow 0.3s ease; }
        .card-hover:hover { transform: translateY(-6px); box-shadow: 0 12px 40px rgba(34,197,94,0.12); }
        .glass {
          background: rgba(10,15,13,0.52);
          backdrop-filter: blur(20px) saturate(160%);
          -webkit-backdrop-filter: blur(20px) saturate(160%);
          border: 1px solid rgba(74,222,128,0.13);
        }
      `}</style>

            {/* Fixed 3D canvas */}
            <ThreeBackground />
            <Cursor />

            {/* ══════ HERO ══════ */}
            <section style={{ minHeight: "100vh", display: "flex", alignItems: "center", position: "relative", padding: "120px 2rem 80px", zIndex: 1 }}>
                <div style={{ maxWidth: 1160, margin: "0 auto", width: "100%" }}>

                    <AnimSection delay={0}>
                        <div style={{ display: "inline-flex", alignItems: "center", gap: 8, background: "rgba(34,197,94,0.08)", border: "1px solid rgba(34,197,94,0.25)", borderRadius: 100, padding: "6px 16px", marginBottom: 28 }}>
                            <span style={{ width: 6, height: 6, borderRadius: "50%", background: "#22C55E", display: "inline-block", animation: "pulse 2s ease infinite" }} />
                            <span className="mono" style={{ fontSize: 11, color: "#22C55E", letterSpacing: 1.5 }}>SOFTWARE DEVELOPMENT</span>
                        </div>
                    </AnimSection>

                    <AnimSection delay={100}>
                        <h1 style={{ fontFamily: "'Inter',sans-serif", fontWeight: 900, fontSize: "clamp(2.8rem,7vw,5.8rem)", lineHeight: 1.04, letterSpacing: -2.5, marginBottom: 26 }}>
                            Custom Software<br />
                            <span className="grad-text">Engineered to Scale.</span>
                        </h1>
                    </AnimSection>

                    <AnimSection delay={200}>
                        <p style={{ fontSize: "clamp(1rem,1.8vw,1.15rem)", color: "#7A9082", maxWidth: 540, lineHeight: 1.75, marginBottom: 44 }}>
                            Robust backends, APIs, and enterprise systems that power your business — built to handle your next 10 million users without breaking a sweat.
                        </p>
                    </AnimSection>

                    <AnimSection delay={300}>
                        <div style={{ display: "flex", gap: 14, flexWrap: "wrap" }}>
                            <button
                                className="glow-btn"
                                onClick={() => nevigation('/page/contect')}
                                style={{ background: "linear-gradient(135deg,#22C55E,#16A34A)", color: "#fff", border: "none", borderRadius: 10, padding: "16px 40px", fontFamily: "'Inter',sans-serif", fontWeight: 700, fontSize: 16, cursor: "none", transition: "opacity 0.2s, transform 0.2s, box-shadow 0.3s" }}
                                onMouseEnter={e => { e.currentTarget.style.opacity = "0.9"; e.currentTarget.style.transform = "scale(1.03)"; }}
                                onMouseLeave={e => { e.currentTarget.style.opacity = "1"; e.currentTarget.style.transform = "scale(1)"; }}
                            >
                                Start a Project →
                            </button>

                        </div>
                    </AnimSection>

                    <AnimSection delay={450}>
                        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(120px,1fr))", marginTop: 72, borderRadius: 14, overflow: "hidden", maxWidth: 680, backdropFilter: "blur(22px)", background: "rgba(10,15,13,0.55)", border: "1px solid rgba(74,222,128,0.18)" }}>
                            {STATS.map((s, i) => (
                                <div key={i} style={{ padding: "24px 20px", background: "rgba(255,255,255,0.02)", borderRight: i < STATS.length - 1 ? "1px solid rgba(74,222,128,0.1)" : "none", textAlign: "center" }}>
                                    <div style={{ fontSize: "clamp(1.4rem,2.5vw,1.9rem)", fontWeight: 800, color: "#4ADE80" }}>{s.value}</div>
                                    <div className="mono" style={{ fontSize: 11, color: "#52635A", marginTop: 3 }}>{s.label}</div>
                                </div>
                            ))}
                        </div>
                    </AnimSection>
                </div>
            </section>

            {/* ══════ MARQUEE ══════ */}
            <div style={{ background: "linear-gradient(135deg,#22C55E,#15803D)", padding: "12px 0", overflow: "hidden", position: "relative", zIndex: 1 }}>
                <div style={{ display: "flex", animation: "marquee 20s linear infinite", whiteSpace: "nowrap", width: "200%" }}>
                    {[...Array(2)].map((_, i) => (
                        <span key={i} style={{ display: "flex", gap: "2.5rem", paddingRight: "2.5rem" }}>
                            {["Node.js", "Go", "Javascript", "PostgreSQL", "Redis", "Kafka", "Kubernetes", "Terraform", "AWS", "Docker", "GraphQL", "REST APIs", "Express.js", "MongoDB"].map(t => (
                                <span key={t} className="mono" style={{ fontWeight: 700, fontSize: 12, color: "#052e10", letterSpacing: 1 }}>✦ {t}</span>
                            ))}
                        </span>
                    ))}
                </div>
            </div>

            {/* ══════ SERVICES ══════ */}
            <section style={{ padding: "100px 2rem", maxWidth: 1160, margin: "0 auto", position: "relative", zIndex: 1 }}>
                <AnimSection>
                    <div style={{ marginBottom: 52 }}>
                        <p className="mono" style={{ fontSize: 11, color: "#22C55E", letterSpacing: 3, marginBottom: 14 }}>// WHAT WE BUILD</p>
                        <h2 style={{ fontWeight: 800, fontSize: "clamp(1.9rem,4.5vw,3.2rem)", letterSpacing: -1 }}>Services That Move<br />the Needle</h2>
                    </div>
                </AnimSection>
                <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(310px,1fr))", gap: 20 }}>
                    {SERVICES.map((svc, i) => (
                        <AnimSection key={i} delay={i * 80}>
                            <div className="card-hover glass" data-hover style={{ borderRadius: 18, padding: "32px 28px", position: "relative", overflow: "hidden", cursor: "none" }}>
                                <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 2, background: `linear-gradient(90deg,transparent,${svc.color},transparent)` }} />
                                <div style={{ fontSize: 34, marginBottom: 14 }}>{svc.icon}</div>
                                <div style={{ display: "inline-block", background: `${svc.color}18`, border: `1px solid ${svc.color}44`, borderRadius: 100, padding: "3px 12px", marginBottom: 12, fontFamily: "'JetBrains Mono',monospace", fontSize: 10, color: svc.color, letterSpacing: 1 }}>{svc.tag}</div>
                                <h3 style={{ fontWeight: 700, fontSize: 18, marginBottom: 8, marginTop: 10 }}>{svc.title}</h3>
                                <p style={{ color: "#5A7A65", fontSize: 14, lineHeight: 1.7 }}>{svc.desc}</p>
                            </div>
                        </AnimSection>
                    ))}
                </div>
            </section>

            {/* ══════ PROCESS ══════ */}
            <section style={{ padding: "100px 2rem", backdropFilter: "blur(14px)", background: "rgba(10,15,13,0.62)", borderTop: "1px solid rgba(74,222,128,0.08)", borderBottom: "1px solid rgba(74,222,128,0.08)", position: "relative", zIndex: 1 }}>
                <div style={{ maxWidth: 1160, margin: "0 auto" }}>
                    <AnimSection>
                        <div style={{ marginBottom: 60, display: "flex", justifyContent: "space-between", alignItems: "flex-end", flexWrap: "wrap", gap: 20 }}>
                            <div>
                                <p className="mono" style={{ fontSize: 11, color: "#FCD34D", letterSpacing: 3, marginBottom: 14 }}>// HOW WE WORK</p>
                                <h2 style={{ fontWeight: 800, fontSize: "clamp(1.9rem,4.5vw,3.2rem)", letterSpacing: -1 }}>The Process</h2>
                            </div>
                            <p style={{ color: "#44654A", maxWidth: 320, fontSize: 15, lineHeight: 1.7 }}>A battle-tested 6-step framework that eliminates guesswork and ships production-grade software on time.</p>
                        </div>
                    </AnimSection>
                    <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(270px,1fr))", gap: 18 }}>
                        {PROCESS.map((step, i) => (
                            <AnimSection key={i} delay={i * 80}>
                                <div className="card-hover glass" style={{ display: "flex", gap: 18, padding: "24px 20px", borderRadius: 14, cursor: "none" }}>
                                    <div className="mono" style={{ fontWeight: 700, fontSize: 12, color: "#FCD34D", minWidth: 28, paddingTop: 2 }}>{step.num}</div>
                                    <div>
                                        <h3 style={{ fontWeight: 700, fontSize: 16, marginBottom: 7 }}>{step.title}</h3>
                                        <p style={{ color: "#5A7A65", fontSize: 13, lineHeight: 1.65 }}>{step.desc}</p>
                                    </div>
                                </div>
                            </AnimSection>
                        ))}
                    </div>
                </div>
            </section>

            {/* ══════ TECH STACK ══════ */}
            <section style={{ padding: "100px 2rem", maxWidth: 1160, margin: "0 auto", position: "relative", zIndex: 1 }}>
                <AnimSection>
                    <div style={{ marginBottom: 40 }}>
                        <p className="mono" style={{ fontSize: 11, color: "#FCD34D", letterSpacing: 3, marginBottom: 14 }}>// TECHNOLOGY</p>
                        <h2 style={{ fontWeight: 800, fontSize: "clamp(1.9rem,4.5vw,3.2rem)", letterSpacing: -1 }}>Built with the Best</h2>
                    </div>
                </AnimSection>
                <div style={{ display: "flex", flexWrap: "wrap", gap: 12 }}>
                    {TECH.map((t, i) => (
                        <AnimSection key={i} delay={i * 40}>
                            <div
                                data-hover
                                style={{ background: "rgba(10,15,13,0.55)", backdropFilter: "blur(14px)", border: "1px solid rgba(255,255,255,0.08)", borderRadius: 10, padding: "12px 18px", display: "flex", flexDirection: "column", gap: 3, cursor: "none", transition: "border-color 0.2s, background 0.2s" }}
                                onMouseEnter={e => { e.currentTarget.style.borderColor = "rgba(252,211,77,0.5)"; e.currentTarget.style.background = "rgba(252,211,77,0.06)"; }}
                                onMouseLeave={e => { e.currentTarget.style.borderColor = "rgba(255,255,255,0.08)"; e.currentTarget.style.background = "rgba(10,15,13,0.55)"; }}
                            >
                                <span style={{ fontWeight: 700, fontSize: 14 }}>{t.name}</span>
                                <span className="mono" style={{ fontSize: 10, color: "#FCD34D", letterSpacing: 1 }}>{t.category}</span>
                            </div>
                        </AnimSection>
                    ))}
                </div>
            </section>

            {/* ══════ WHY US ══════ */}
            <section style={{ padding: "100px 2rem", backdropFilter: "blur(14px)", background: "rgba(10,15,13,0.62)", borderTop: "1px solid rgba(74,222,128,0.08)", borderBottom: "1px solid rgba(74,222,128,0.08)", position: "relative", zIndex: 1 }}>
                <div style={{ maxWidth: 1160, margin: "0 auto" }}>
                    <AnimSection>
                        <div style={{ marginBottom: 56 }}>
                            <p className="mono" style={{ fontSize: 11, color: "#86EFAC", letterSpacing: 3, marginBottom: 14 }}>// WHY US</p>
                            <h2 style={{ fontWeight: 800, fontSize: "clamp(1.9rem,4.5vw,3.2rem)", letterSpacing: -1 }}>The Difference<br />Is in the Details</h2>
                        </div>
                    </AnimSection>
                    <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(260px,1fr))", gap: 20 }}>
                        {WHY_US.map((item, i) => (
                            <AnimSection key={i} delay={i * 80}>
                                <div className="card-hover glass" data-hover style={{ borderRadius: 18, padding: "32px 28px", position: "relative", overflow: "hidden", cursor: "none" }}>
                                    <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 2, background: `linear-gradient(90deg,transparent,${item.color},transparent)` }} />
                                    <div style={{ fontSize: 30, marginBottom: 14 }}>{item.icon}</div>
                                    <h3 style={{ fontWeight: 700, fontSize: 17, marginBottom: 9 }}>{item.title}</h3>
                                    <p style={{ color: "#5A7A65", fontSize: 14, lineHeight: 1.65 }}>{item.desc}</p>
                                </div>
                            </AnimSection>
                        ))}
                    </div>
                </div>
            </section>

            {/* ══════ TESTIMONIAL ══════ */}
            <section style={{ padding: "100px 2rem", maxWidth: 860, margin: "0 auto", textAlign: "center", position: "relative", zIndex: 1 }}>
                <AnimSection>
                    <p className="mono" style={{ fontSize: 11, color: "#22C55E", letterSpacing: 3, marginBottom: 36 }}>// CLIENT VOICE</p>
                    <div className="glass" style={{ borderRadius: 22, padding: "48px 44px", position: "relative" }}>
                        <div style={{ fontSize: 72, color: "#22C55E", fontWeight: 800, lineHeight: 0.7, marginBottom: 28, opacity: 0.28 }}>"</div>
                        <p style={{ fontSize: "clamp(1.05rem,1.8vw,1.3rem)", lineHeight: 1.75, color: "#C8D8CE", marginBottom: 36 }}>
                            They rebuilt our entire payment processing backend in 3 months. It now handles 10× the volume at half the infrastructure cost. Zero incidents post-launch.
                        </p>
                        <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 14 }}>
                            <div style={{ width: 44, height: 44, borderRadius: "50%", background: "rgba(74,222,128,0.15)", border: "1px solid rgba(74,222,128,0.3)", display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 800, color: "#4ADE80", fontSize: 17 }}>S</div>
                            <div style={{ textAlign: "left" }}>
                                <div style={{ fontWeight: 700, fontSize: 15 }}>Sarah K.</div>
                                <div className="mono" style={{ fontSize: 11, color: "#44554A" }}>CTO, FinTech Startup — Series B</div>
                            </div>
                        </div>
                    </div>
                </AnimSection>
            </section>

            {/* ══════ CTA ══════ */}
            <section style={{ padding: "120px 2rem", textAlign: "center", position: "relative", overflow: "hidden", zIndex: 1 }}>
                <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 2, background: "linear-gradient(90deg,transparent,#22C55E,#FCD34D,transparent)" }} />
                <div style={{ position: "relative", zIndex: 1, maxWidth: 660, margin: "0 auto" }}>
                    <AnimSection>
                        <p className="mono" style={{ fontSize: 11, color: "#22C55E", letterSpacing: 3, marginBottom: 20 }}>// READY?</p>
                        <h2 style={{ fontWeight: 900, fontSize: "clamp(2.4rem,5.5vw,4.5rem)", letterSpacing: -2, lineHeight: 1.05, marginBottom: 20 }}>
                            Let's Build Something<br /><span className="grad-text">Resilient.</span>
                        </h2>
                        <p style={{ color: "#44654A", fontSize: 16, lineHeight: 1.7, maxWidth: 460, margin: "0 auto 44px" }}>
                            Share your requirements. We'll come back with a system architecture, timeline, and a team that gets it — within 48 hours.
                        </p>
                        <div style={{ display: "flex", gap: 14, justifyContent: "center", flexWrap: "wrap" }}>
                            <button
                                className="glow-btn"
                                onClick={() => nevigation('/page/contect')}

                                style={{ background: "linear-gradient(135deg,#22C55E,#16A34A)", color: "#fff", border: "none", borderRadius: 10, padding: "16px 40px", fontFamily: "'Inter',sans-serif", fontWeight: 700, fontSize: 16, cursor: "none", transition: "opacity 0.2s, transform 0.2s, box-shadow 0.3s" }}
                                onMouseEnter={e => { e.currentTarget.style.opacity = "0.9"; e.currentTarget.style.transform = "scale(1.03)"; }}
                                onMouseLeave={e => { e.currentTarget.style.opacity = "1"; e.currentTarget.style.transform = "scale(1)"; }}
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