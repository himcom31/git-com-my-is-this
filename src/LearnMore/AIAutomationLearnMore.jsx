import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";

/* ─────────────────────────────────────────────
   DATA
───────────────────────────────────────────── */
const SERVICES = [
    { icon: "🤖", title: "Intelligent Workflows", desc: "End-to-end AI pipelines that replace repetitive manual processes — from data ingestion to decision output, fully automated.", tag: "Zero-Touch", color: "#FF3B3B" },
    { icon: "🧠", title: "LLM Integration", desc: "Plug GPT-4, Claude, Gemini, or custom fine-tuned models into your existing stack via clean API layers and prompt engineering.", tag: "Model-Agnostic", color: "#4D8FFF" },
    { icon: "📊", title: "Data Pipeline Automation", desc: "ETL pipelines, real-time stream processing, and AI-powered anomaly detection across structured and unstructured data sources.", tag: "Real-Time", color: "#FFFFFF" },
    { icon: "🔗", title: "System & API Orchestration", desc: "Connect CRMs, ERPs, ticketing tools, and third-party APIs into unified automation flows using event-driven architecture.", tag: "Connected", color: "#FF3B3B" },
    { icon: "💬", title: "Conversational AI Agents", desc: "Custom chatbots and voice agents trained on your data — for support, sales qualification, internal helpdesks, and more.", tag: "Always-On", color: "#4D8FFF" },
    { icon: "📈", title: "Predictive Analytics", desc: "ML models that forecast demand, detect churn, flag fraud, and surface insights before your team even knows to look.", tag: "Proactive", color: "#FFFFFF" },
];

const PROCESS = [
    { num: "01", title: "Audit", desc: "We inventory every manual process and identify automation ROI opportunities ranked by impact and feasibility." },
    { num: "02", title: "Architecture", desc: "AI pipeline design — model selection, data flows, integration points, and failsafe logic documented before build begins." },
    { num: "03", title: "Prototype", desc: "A working proof-of-concept in two weeks. Real data, real integrations — so you can see value before full commitment." },
    { num: "04", title: "Build & Train", desc: "Production pipelines with fine-tuned models, guardrails, logging, and human-in-the-loop fallbacks where needed." },
    { num: "05", title: "Deploy", desc: "Zero-downtime rollout with shadow-mode testing, performance baselines, and Grafana dashboards from day one." },
    { num: "06", title: "Optimise", desc: "Continuous model retraining, drift detection, and monthly automation ROI reviews to keep performance compounding." },
];

const TECH = [
    { name: "OpenAI GPT-4", category: "LLM" },
    { name: "Claude API", category: "LLM" },
    { name: "LangChain", category: "Orchestration" },
    { name: "LlamaIndex", category: "RAG" },
    { name: "Node.js", category: "Backend" },
    { name: "FastAPI", category: "API" },
    { name: "Apache Kafka", category: "Streaming" },
    { name: "Apache Airflow", category: "Pipeline" },
    { name: "Pinecone", category: "Vector DB" },
    { name: "MongoDB", category: "Database" },
    { name: "Redis", category: "Cache" },
    { name: "AWS Lambda", category: "Serverless" },
    { name: "Docker", category: "DevOps" },
    { name: "Terraform", category: "IaC" },
];

const STATS = [
    { value: "80%", label: "Avg Task Reduction" },
    { value: "3.2×", label: "Avg ROI Multiplier" },
    { value: "< 2wk", label: "First Prototype" },
    { value: "99.9%", label: "Pipeline Uptime" },
];

const WHY_US = [
    { icon: "🎯", title: "ROI-First Design", color: "#FF3B3B", desc: "Every pipeline is scoped against measurable business outcomes. If we can't show value in a prototype, we say so." },
    { icon: "🔒", title: "Secure by Default", color: "#4D8FFF", desc: "Data never leaves your infra without consent. SOC 2 aligned, GDPR-ready, with full audit logging baked in." },
    { icon: "🧩", title: "Stack-Agnostic", color: "#FFFFFF", desc: "We integrate with what you have — Salesforce, SAP, HubSpot, Slack, Jira, or fully custom systems." },
    { icon: "📡", title: "Continuous Learning", color: "#FF3B3B", desc: "Models retrain on fresh data, drift alerts fire automatically, and performance compounds over time." },
];

/* ─────────────────────────────────────────────
   THREE.JS 3D BACKGROUND — RED/BLUE/WHITE NEURAL NET
───────────────────────────────────────────── */
function ThreeBackground() {
    const canvasRef = useRef(null);
    const animRef = useRef(null);
    const mouseRef = useRef({ x: 0, y: 0 });

    useEffect(() => {
        let cleanupFn = null;
        const script = document.createElement("script");
        script.src = "https://cdnjs.cloudflare.com/ajax/libs/three.js/r128/three.min.js";
        script.onload = () => { cleanupFn = initThree(); };
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
            const camera = new THREE.PerspectiveCamera(55, window.innerWidth / window.innerHeight, 0.1, 1000);
            camera.position.set(0, 0, 42);

            /* ── Lights ── */
            scene.add(new THREE.AmbientLight(0xFF1A1A, 0.3));
            const pl1 = new THREE.PointLight(0xFF0000, 3.0, 140);
            pl1.position.set(25, 20, 15);
            scene.add(pl1);
            const pl2 = new THREE.PointLight(0x3366FF, 2.0, 100);
            pl2.position.set(-25, -15, 10);
            scene.add(pl2);
            const pl3 = new THREE.PointLight(0xFFFFFF, 1.0, 80);
            pl3.position.set(0, 35, -10);
            scene.add(pl3);

            /* ── Particles — neural node cloud ── */
            const COUNT = 280;
            const pos = new Float32Array(COUNT * 3);
            const cols = new Float32Array(COUNT * 3);
            const palette = [
                new THREE.Color(0xFF2222),   // red
                new THREE.Color(0xFF6666),   // light red
                new THREE.Color(0x3B6FFF),   // blue
                new THREE.Color(0x6699FF),   // light blue
                new THREE.Color(0xFFFFFF),   // white
                new THREE.Color(0xFFAAAA),   // pale red
            ];
            for (let i = 0; i < COUNT; i++) {
                pos[i * 3] = (Math.random() - 0.5) * 140;
                pos[i * 3 + 1] = (Math.random() - 0.5) * 120;
                pos[i * 3 + 2] = (Math.random() - 0.5) * 80;
                const c = palette[Math.floor(Math.random() * palette.length)];
                cols[i * 3] = c.r; cols[i * 3 + 1] = c.g; cols[i * 3 + 2] = c.b;
            }
            const pGeo = new THREE.BufferGeometry();
            pGeo.setAttribute("position", new THREE.BufferAttribute(pos, 3));
            pGeo.setAttribute("color", new THREE.BufferAttribute(cols, 3));
            const pMat = new THREE.PointsMaterial({
                size: 0.6, vertexColors: true, transparent: true, opacity: 0.8, sizeAttenuation: true,
            });
            scene.add(new THREE.Points(pGeo, pMat));

            /* ── Neural connection lines — red, blue, white ── */
            const lineColors = [0xFF2222, 0x3B6FFF, 0xFFFFFF, 0xFF2222, 0x3B6FFF];
            for (let i = 0; i < 90; i++) {
                const ai = Math.floor(Math.random() * COUNT);
                const bi = Math.floor(Math.random() * COUNT);
                const col = lineColors[i % lineColors.length];
                const mat = new THREE.LineBasicMaterial({ color: col, transparent: true, opacity: 0.055 });
                const pts = [
                    new THREE.Vector3(pos[ai * 3], pos[ai * 3 + 1], pos[ai * 3 + 2]),
                    new THREE.Vector3(pos[bi * 3], pos[bi * 3 + 1], pos[bi * 3 + 2]),
                ];
                scene.add(new THREE.Line(new THREE.BufferGeometry().setFromPoints(pts), mat));
            }

            /* ── Central rotating dodecahedron (brain/AI core) ── */
            const dodGeo = new THREE.DodecahedronGeometry(14, 0);
            const dodMat = new THREE.MeshStandardMaterial({
                color: 0xFF0000, wireframe: true, transparent: true, opacity: 0.06,
                emissive: 0xFF0000, emissiveIntensity: 0.3,
            });
            const dod = new THREE.Mesh(dodGeo, dodMat);
            scene.add(dod);

            /* ── Outer sphere cage ── */
            const sphereGeo = new THREE.SphereGeometry(22, 18, 18);
            const sphereMat = new THREE.MeshStandardMaterial({
                color: 0x3B6FFF, wireframe: true, transparent: true, opacity: 0.03,
                emissive: 0x3B6FFF, emissiveIntensity: 0.15,
            });
            const sphere = new THREE.Mesh(sphereGeo, sphereMat);
            scene.add(sphere);

            /* ── Spinning ring (equatorial) ── */
            const ringGeo = new THREE.TorusGeometry(18, 0.5, 8, 80);
            const ringMat = new THREE.MeshStandardMaterial({
                color: 0xFF2222, wireframe: false, transparent: true, opacity: 0.12,
                emissive: 0xFF2222, emissiveIntensity: 0.4,
            });
            const ring = new THREE.Mesh(ringGeo, ringMat);
            ring.rotation.x = Math.PI / 3;
            scene.add(ring);

            /* ── Second ring (tilted blue) ── */
            const ring2Geo = new THREE.TorusGeometry(13, 0.4, 8, 60);
            const ring2Mat = new THREE.MeshStandardMaterial({
                color: 0x3B6FFF, wireframe: false, transparent: true, opacity: 0.1,
                emissive: 0x3B6FFF, emissiveIntensity: 0.35,
            });
            const ring2 = new THREE.Mesh(ring2Geo, ring2Mat);
            ring2.rotation.y = Math.PI / 4;
            ring2.rotation.z = Math.PI / 6;
            scene.add(ring2);

            /* ── Floating tetrahedrons — data nodes ── */
            const tetColors = [0xFF2222, 0x3B6FFF, 0xFFFFFF, 0xFF6666, 0x6699FF];
            const tets = [];
            for (let i = 0; i < 24; i++) {
                const size = 0.3 + Math.random() * 1.2;
                const geo = new THREE.TetrahedronGeometry(size, 0);
                const mat = new THREE.MeshStandardMaterial({
                    color: tetColors[i % tetColors.length],
                    transparent: true, opacity: 0.2 + Math.random() * 0.3,
                    emissive: tetColors[i % tetColors.length], emissiveIntensity: 0.4,
                    wireframe: Math.random() > 0.4,
                });
                const mesh = new THREE.Mesh(geo, mat);
                mesh.position.set(
                    (Math.random() - 0.5) * 90,
                    (Math.random() - 0.5) * 70,
                    (Math.random() - 0.5) * 35,
                );
                mesh.userData = {
                    rx: (Math.random() - 0.5) * 0.018,
                    ry: (Math.random() - 0.5) * 0.022,
                    amp: 0.5 + Math.random() * 1.0,
                    spd: 0.3 + Math.random() * 0.7,
                    off: Math.random() * Math.PI * 2,
                    oy: mesh.position.y,
                };
                scene.add(mesh);
                tets.push(mesh);
            }

            /* ── Grid ── */
            const grid = new THREE.GridHelper(240, 48, 0xFF0000, 0xFF0000);
            grid.material.transparent = true;
            grid.material.opacity = 0.02;
            grid.position.y = -32;
            scene.add(grid);

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
                t += 0.007;

                camera.position.x += (mouseRef.current.x * 5 - camera.position.x) * 0.018;
                camera.position.y += (-mouseRef.current.y * 3.5 - camera.position.y) * 0.018;
                camera.lookAt(0, 0, 0);

                dod.rotation.x += 0.0012; dod.rotation.y += 0.0018;
                sphere.rotation.y += 0.0007; sphere.rotation.z += 0.0004;
                ring.rotation.z += 0.005;
                ring2.rotation.x += 0.006; ring2.rotation.z += 0.003;

                tets.forEach((o) => {
                    const d = o.userData;
                    o.rotation.x += d.rx; o.rotation.y += d.ry;
                    o.position.y = d.oy + Math.sin(t * d.spd + d.off) * d.amp;
                });

                pl1.intensity = 2.5 + Math.sin(t * 1.4) * 0.8;
                pl2.intensity = 1.8 + Math.cos(t * 1.0) * 0.5;

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
            borderRadius: "50%", border: "2px solid #FF2222",
            transform: "translate(-50%,-50%)",
            transition: "width 0.2s, height 0.2s, background 0.2s",
            background: big ? "rgba(255,34,34,0.12)" : "transparent",
            mixBlendMode: "difference",
        }} />
    );
}

/* ─────────────────────────────────────────────
   PAGE COMPONENT
───────────────────────────────────────────── */
export default function AIAutomationLearnMore() {
      const nevigation=useNavigate();


    return (
        <div style={{
            fontFamily: "'Inter', 'JetBrains Mono', monospace",
            background: "#0F0505",
            color: "#F0EAEA",
            minHeight: "100vh",
            overflowX: "hidden",
            cursor: "none",
        }}>
            <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800;900&family=JetBrains+Mono:wght@400;700&display=swap');
        * { box-sizing: border-box; margin: 0; padding: 0; }
        ::-webkit-scrollbar { width: 4px; }
        ::-webkit-scrollbar-track { background: #0F0505; }
        ::-webkit-scrollbar-thumb { background: #FF2222; border-radius: 2px; }
        body { cursor: none; }
        @keyframes marquee   { 0%{transform:translateX(0)} 100%{transform:translateX(-50%)} }
        @keyframes gradShift { 0%{background-position:0% 50%} 50%{background-position:100% 50%} 100%{background-position:0% 50%} }
        @keyframes pulse     { 0%,100%{opacity:1} 50%{opacity:0.35} }
        @keyframes float     { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-20px)} }
        @keyframes scan      { 0%{transform:translateY(-100%)} 100%{transform:translateY(100vh)} }
        .grad-text {
          background: linear-gradient(90deg, #FF2222, #FFFFFF, #3B6FFF, #FF2222);
          background-size: 300% auto;
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          animation: gradShift 5s ease infinite;
        }
        .mono { font-family: 'JetBrains Mono', monospace; }
        .glow-btn-red:hover  { box-shadow: 0 0 32px rgba(255,34,34,0.5),  0 0 8px rgba(255,34,34,0.2); }
        .glow-btn-blue:hover { box-shadow: 0 0 32px rgba(59,111,255,0.5), 0 0 8px rgba(59,111,255,0.2); }
        .card-hover { transition: transform 0.3s ease, box-shadow 0.3s ease; }
        .card-hover:hover { transform: translateY(-6px); }
        .glass-red {
          background: rgba(15,5,5,0.55);
          backdrop-filter: blur(20px) saturate(160%);
          -webkit-backdrop-filter: blur(20px) saturate(160%);
          border: 1px solid rgba(255,34,34,0.14);
        }
        .glass-blue {
          background: rgba(5,5,15,0.55);
          backdrop-filter: blur(20px) saturate(160%);
          -webkit-backdrop-filter: blur(20px) saturate(160%);
          border: 1px solid rgba(59,111,255,0.14);
        }
      `}</style>

            <ThreeBackground />
            <Cursor />

            {/* ══════ HERO ══════ */}
            <section style={{ minHeight: "100vh", display: "flex", alignItems: "center", position: "relative", padding: "120px 2rem 80px", zIndex: 1 }}>
                {/* Scan line effect */}
                <div style={{
                    position: "absolute", inset: 0, zIndex: 0, overflow: "hidden", pointerEvents: "none",
                }}>
                    <div style={{
                        position: "absolute", left: 0, right: 0, height: 2,
                        background: "linear-gradient(90deg, transparent, rgba(255,34,34,0.15), transparent)",
                        animation: "scan 8s linear infinite",
                    }} />
                </div>
                {/* Grid */}
                <div style={{
                    position: "absolute", inset: 0, zIndex: 0,
                    backgroundImage: "linear-gradient(rgba(255,34,34,0.035) 1px, transparent 1px), linear-gradient(90deg, rgba(59,111,255,0.035) 1px, transparent 1px)",
                    backgroundSize: "72px 72px",
                }} />
                {/* Red glow top-right */}
                <div style={{
                    position: "absolute", top: "15%", right: "8%", width: 520, height: 520,
                    borderRadius: "50%", background: "radial-gradient(circle, rgba(255,34,34,0.1) 0%, transparent 70%)",
                    filter: "blur(50px)", zIndex: 0, animation: "float 7s ease-in-out infinite",
                }} />
                {/* Blue glow bottom-left */}
                <div style={{
                    position: "absolute", bottom: "10%", left: "5%", width: 400, height: 400,
                    borderRadius: "50%", background: "radial-gradient(circle, rgba(59,111,255,0.08) 0%, transparent 70%)",
                    filter: "blur(50px)", zIndex: 0, animation: "float 9s ease-in-out infinite reverse",
                }} />

                <div style={{ maxWidth: 1160, margin: "0 auto", position: "relative", zIndex: 1, width: "100%" }}>

                    <AnimSection delay={0}>
                        <div style={{ display: "inline-flex", alignItems: "center", gap: 8, background: "rgba(255,34,34,0.08)", border: "1px solid rgba(255,34,34,0.28)", borderRadius: 100, padding: "6px 18px", marginBottom: 28 }}>
                            <span style={{ width: 6, height: 6, borderRadius: "50%", background: "#FF2222", display: "inline-block", animation: "pulse 2s ease infinite", boxShadow: "0 0 8px #FF2222" }} />
                            <span className="mono" style={{ fontSize: 11, color: "#FF2222", letterSpacing: 1.5 }}>AI AUTOMATION</span>
                        </div>
                    </AnimSection>

                    <AnimSection delay={100}>
                        <h1 style={{ fontFamily: "'Inter',sans-serif", fontWeight: 900, fontSize: "clamp(2.8rem,7vw,5.8rem)", lineHeight: 1.04, letterSpacing: -2.5, marginBottom: 26 }}>
                            Transform Workflows<br />
                            <span className="grad-text">With Intelligent AI.</span>
                        </h1>
                    </AnimSection>

                    <AnimSection delay={200}>
                        <p style={{ fontSize: "clamp(1rem,1.8vw,1.18rem)", color: "#7A5050", maxWidth: 560, lineHeight: 1.78, marginBottom: 44 }}>
                            Reduce manual tasks, cut operational costs, and boost efficiency with tailored AI pipelines — built to integrate with your existing stack and scale without limits.
                        </p>
                    </AnimSection>

                    <AnimSection delay={300}>
                        <div style={{ display: "flex", gap: 14, flexWrap: "wrap" }}>
                            <button
                                className="glow-btn-red"
                                onClick={() => nevigation('/page/contect')}

                                style={{ background: "linear-gradient(135deg,#FF2222,#CC0000)", color: "#fff", border: "none", borderRadius: 10, padding: "16px 40px", fontFamily: "'Inter',sans-serif", fontWeight: 700, fontSize: 16, cursor: "none", transition: "opacity 0.2s, transform 0.2s, box-shadow 0.3s" }}
                                onMouseEnter={e => { e.currentTarget.style.opacity = "0.9"; e.currentTarget.style.transform = "scale(1.03)"; }}
                                onMouseLeave={e => { e.currentTarget.style.opacity = "1"; e.currentTarget.style.transform = "scale(1)"; }}
                            >
                                Let's Start →
                            </button>
                        
                            
                        </div>
                    </AnimSection>

                    <AnimSection delay={450}>
                        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(130px,1fr))", marginTop: 72, borderRadius: 14, overflow: "hidden", maxWidth: 720, backdropFilter: "blur(22px)", background: "rgba(15,5,5,0.6)", border: "1px solid rgba(255,34,34,0.18)" }}>
                            {STATS.map((s, i) => (
                                <div key={i} style={{ padding: "24px 16px", background: "rgba(255,255,255,0.015)", borderRight: i < STATS.length - 1 ? "1px solid rgba(255,34,34,0.1)" : "none", textAlign: "center" }}>
                                    <div style={{ fontSize: "clamp(1.4rem,2.5vw,1.9rem)", fontWeight: 800, color: i % 2 === 0 ? "#FF3B3B" : "#4D8FFF" }}>{s.value}</div>
                                    <div className="mono" style={{ fontSize: 10, color: "#523030", marginTop: 4 }}>{s.label}</div>
                                </div>
                            ))}
                        </div>
                    </AnimSection>
                </div>
            </section>

            {/* ══════ MARQUEE ══════ */}
            <div style={{ background: "linear-gradient(90deg,#CC0000,#1A1A99,#CC0000)", padding: "12px 0", overflow: "hidden", position: "relative", zIndex: 1 }}>
                <div style={{ display: "flex", animation: "marquee 22s linear infinite", whiteSpace: "nowrap", width: "200%" }}>
                    {[...Array(2)].map((_, i) => (
                        <span key={i} style={{ display: "flex", gap: "2.5rem", paddingRight: "2.5rem" }}>
                            {["GPT-4", "Claude API", "LangChain", "LlamaIndex", "Apache Kafka", "Airflow", "Pinecone", "FastAPI", "Node.js", "AWS Lambda", "Terraform", "Docker", "Redis"].map(t => (
                                <span key={t} className="mono" style={{ fontWeight: 700, fontSize: 12, color: "#f0d0d0", letterSpacing: 1 }}>✦ {t}</span>
                            ))}
                        </span>
                    ))}
                </div>
            </div>

            {/* ══════ SERVICES ══════ */}
            <section style={{ padding: "100px 2rem", maxWidth: 1160, margin: "0 auto", position: "relative", zIndex: 1 }}>
                <AnimSection>
                    <div style={{ marginBottom: 52 }}>
                        <p className="mono" style={{ fontSize: 11, color: "#FF2222", letterSpacing: 3, marginBottom: 14 }}>// WHAT WE AUTOMATE</p>
                        <h2 style={{ fontWeight: 800, fontSize: "clamp(1.9rem,4.5vw,3.2rem)", letterSpacing: -1 }}>AI Services That<br />Drive Real Results</h2>
                    </div>
                </AnimSection>
                <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(310px,1fr))", gap: 20 }}>
                    {SERVICES.map((svc, i) => (
                        <AnimSection key={i} delay={i * 80}>
                            <div className={`card-hover ${i % 2 === 0 ? "glass-red" : "glass-blue"}`} data-hover style={{ borderRadius: 18, padding: "32px 28px", position: "relative", overflow: "hidden", cursor: "none" }}>
                                <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 2, background: `linear-gradient(90deg,transparent,${svc.color},transparent)` }} />
                                <div style={{ fontSize: 34, marginBottom: 14 }}>{svc.icon}</div>
                                <div style={{ display: "inline-block", background: `${svc.color === "#FFFFFF" ? "rgba(255,255,255,0.1)" : svc.color + "18"}`, border: `1px solid ${svc.color === "#FFFFFF" ? "rgba(255,255,255,0.3)" : svc.color + "44"}`, borderRadius: 100, padding: "3px 12px", marginBottom: 12, fontFamily: "'JetBrains Mono',monospace", fontSize: 10, color: svc.color, letterSpacing: 1 }}>{svc.tag}</div>
                                <h3 style={{ fontWeight: 700, fontSize: 18, marginBottom: 8, marginTop: 10 }}>{svc.title}</h3>
                                <p style={{ color: "#7A5555", fontSize: 14, lineHeight: 1.7 }}>{svc.desc}</p>
                            </div>
                        </AnimSection>
                    ))}
                </div>
            </section>

            {/* ══════ PROCESS ══════ */}
            <section style={{ padding: "100px 2rem", backdropFilter: "blur(14px)", background: "rgba(15,5,5,0.65)", borderTop: "1px solid rgba(255,34,34,0.08)", borderBottom: "1px solid rgba(59,111,255,0.08)", position: "relative", zIndex: 1 }}>
                <div style={{ maxWidth: 1160, margin: "0 auto" }}>
                    <AnimSection>
                        <div style={{ marginBottom: 60, display: "flex", justifyContent: "space-between", alignItems: "flex-end", flexWrap: "wrap", gap: 20 }}>
                            <div>
                                <p className="mono" style={{ fontSize: 11, color: "#4D8FFF", letterSpacing: 3, marginBottom: 14 }}>// HOW WE WORK</p>
                                <h2 style={{ fontWeight: 800, fontSize: "clamp(1.9rem,4.5vw,3.2rem)", letterSpacing: -1 }}>The Automation<br />Playbook</h2>
                            </div>
                            <p style={{ color: "#5A3030", maxWidth: 320, fontSize: 15, lineHeight: 1.7 }}>A 6-phase framework that takes you from process audit to a fully autonomous, monitored AI pipeline in production.</p>
                        </div>
                    </AnimSection>
                    <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(270px,1fr))", gap: 18 }}>
                        {PROCESS.map((step, i) => (
                            <AnimSection key={i} delay={i * 80}>
                                <div className={`card-hover ${i % 2 === 0 ? "glass-red" : "glass-blue"}`} style={{ display: "flex", gap: 18, padding: "24px 20px", borderRadius: 14, cursor: "none" }}>
                                    <div className="mono" style={{ fontWeight: 700, fontSize: 12, color: i % 2 === 0 ? "#FF3B3B" : "#4D8FFF", minWidth: 28, paddingTop: 2 }}>{step.num}</div>
                                    <div>
                                        <h3 style={{ fontWeight: 700, fontSize: 16, marginBottom: 7 }}>{step.title}</h3>
                                        <p style={{ color: "#7A5555", fontSize: 13, lineHeight: 1.65 }}>{step.desc}</p>
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
                        <p className="mono" style={{ fontSize: 11, color: "#4D8FFF", letterSpacing: 3, marginBottom: 14 }}>// TECHNOLOGY STACK</p>
                        <h2 style={{ fontWeight: 800, fontSize: "clamp(1.9rem,4.5vw,3.2rem)", letterSpacing: -1 }}>Powered by the Best<br />AI Infrastructure</h2>
                    </div>
                </AnimSection>
                <div style={{ display: "flex", flexWrap: "wrap", gap: 12 }}>
                    {TECH.map((t, i) => (
                        <AnimSection key={i} delay={i * 35}>
                            <div
                                data-hover
                                style={{ background: "rgba(15,5,5,0.6)", backdropFilter: "blur(14px)", border: "1px solid rgba(255,255,255,0.07)", borderRadius: 10, padding: "12px 18px", display: "flex", flexDirection: "column", gap: 3, cursor: "none", transition: "border-color 0.2s, background 0.2s" }}
                                onMouseEnter={e => { e.currentTarget.style.borderColor = i % 2 === 0 ? "rgba(255,59,59,0.55)" : "rgba(77,143,255,0.55)"; e.currentTarget.style.background = i % 2 === 0 ? "rgba(255,34,34,0.07)" : "rgba(59,111,255,0.07)"; }}
                                onMouseLeave={e => { e.currentTarget.style.borderColor = "rgba(255,255,255,0.07)"; e.currentTarget.style.background = "rgba(15,5,5,0.6)"; }}
                            >
                                <span style={{ fontWeight: 700, fontSize: 14 }}>{t.name}</span>
                                <span className="mono" style={{ fontSize: 10, color: i % 2 === 0 ? "#FF3B3B" : "#4D8FFF", letterSpacing: 1 }}>{t.category}</span>
                            </div>
                        </AnimSection>
                    ))}
                </div>
            </section>

            {/* ══════ WHY US ══════ */}
            <section style={{ padding: "100px 2rem", backdropFilter: "blur(14px)", background: "rgba(5,5,15,0.65)", borderTop: "1px solid rgba(59,111,255,0.08)", borderBottom: "1px solid rgba(255,34,34,0.08)", position: "relative", zIndex: 1 }}>
                <div style={{ maxWidth: 1160, margin: "0 auto" }}>
                    <AnimSection>
                        <div style={{ marginBottom: 56 }}>
                            <p className="mono" style={{ fontSize: 11, color: "#FF2222", letterSpacing: 3, marginBottom: 14 }}>// WHY CHOOSE US</p>
                            <h2 style={{ fontWeight: 800, fontSize: "clamp(1.9rem,4.5vw,3.2rem)", letterSpacing: -1 }}>Built for Impact,<br />Not Just Automation</h2>
                        </div>
                    </AnimSection>
                    <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(260px,1fr))", gap: 20 }}>
                        {WHY_US.map((item, i) => (
                            <AnimSection key={i} delay={i * 80}>
                                <div className={`card-hover ${i % 2 === 0 ? "glass-red" : "glass-blue"}`} data-hover style={{ borderRadius: 18, padding: "32px 28px", position: "relative", overflow: "hidden", cursor: "none" }}>
                                    <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 2, background: `linear-gradient(90deg,transparent,${item.color},transparent)` }} />
                                    <div style={{ fontSize: 30, marginBottom: 14 }}>{item.icon}</div>
                                    <h3 style={{ fontWeight: 700, fontSize: 17, marginBottom: 9 }}>{item.title}</h3>
                                    <p style={{ color: "#7A5555", fontSize: 14, lineHeight: 1.65 }}>{item.desc}</p>
                                </div>
                            </AnimSection>
                        ))}
                    </div>
                </div>
            </section>

            {/* ══════ TESTIMONIAL ══════ */}
            <section style={{ padding: "100px 2rem", maxWidth: 860, margin: "0 auto", textAlign: "center", position: "relative", zIndex: 1 }}>
                <AnimSection>
                    <p className="mono" style={{ fontSize: 11, color: "#FF2222", letterSpacing: 3, marginBottom: 36 }}>// CLIENT VOICE</p>
                    <div className="glass-red" style={{ borderRadius: 22, padding: "48px 44px", position: "relative" }}>
                        <div style={{ fontSize: 72, color: "#FF2222", fontWeight: 800, lineHeight: 0.7, marginBottom: 28, opacity: 0.25 }}>"</div>
                        <p style={{ fontSize: "clamp(1.05rem,1.8vw,1.28rem)", lineHeight: 1.75, color: "#D8C8C8", marginBottom: 36 }}>
                            Their AI pipeline eliminated 12 hours of manual data processing per day across our ops team. We went live in 3 weeks. The ROI was visible in the first month — nothing short of transformative.
                        </p>
                        <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 14 }}>
                            <div style={{ width: 44, height: 44, borderRadius: "50%", background: "rgba(255,59,59,0.15)", border: "1px solid rgba(255,59,59,0.35)", display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 800, color: "#FF3B3B", fontSize: 17 }}>M</div>
                            <div style={{ textAlign: "left" }}>
                                <div style={{ fontWeight: 700, fontSize: 15 }}>Marcus T.</div>
                                <div className="mono" style={{ fontSize: 11, color: "#523030" }}>COO, Logistics Corp — 500+ Employees</div>
                            </div>
                        </div>
                    </div>
                </AnimSection>
            </section>

            {/* ══════ CTA ══════ */}
            <section style={{ padding: "120px 2rem", textAlign: "center", position: "relative", overflow: "hidden", zIndex: 1 }}>
                <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 2, background: "linear-gradient(90deg,transparent,#FF2222,#FFFFFF,#3B6FFF,transparent)" }} />
                <div style={{ position: "absolute", top: "50%", left: "50%", transform: "translate(-50%,-50%)", width: 700, height: 700, borderRadius: "50%", background: "radial-gradient(circle, rgba(255,34,34,0.07) 0%, rgba(59,111,255,0.05) 50%, transparent 70%)", filter: "blur(60px)", zIndex: 0 }} />
                <div style={{ position: "relative", zIndex: 1, maxWidth: 680, margin: "0 auto" }}>
                    <AnimSection>
                        <p className="mono" style={{ fontSize: 11, color: "#FF2222", letterSpacing: 3, marginBottom: 20 }}>// READY TO AUTOMATE?</p>
                        <h2 style={{ fontWeight: 900, fontSize: "clamp(2.4rem,5.5vw,4.5rem)", letterSpacing: -2, lineHeight: 1.05, marginBottom: 20 }}>
                            Let AI Do the<br /><span className="grad-text">Heavy Lifting.</span>
                        </h2>
                        <p style={{ color: "#5A3030", fontSize: 16, lineHeight: 1.7, maxWidth: 480, margin: "0 auto 44px" }}>
                            Share your workflow challenges. We'll return with an automation blueprint, ROI estimate, and a prototype timeline — within 48 hours.
                        </p>
                        <div style={{ display: "flex", gap: 14, justifyContent: "center", flexWrap: "wrap" }}>
                            <button
                                className="glow-btn-red"
                                onClick={() => nevigation('/page/contect')}

                                style={{ background: "linear-gradient(135deg,#FF2222,#CC0000)", color: "#fff", border: "none", borderRadius: 10, padding: "16px 40px", fontFamily: "'Inter',sans-serif", fontWeight: 700, fontSize: 16, cursor: "none", transition: "opacity 0.2s, transform 0.2s, box-shadow 0.3s" }}
                                onMouseEnter={e => { e.currentTarget.style.opacity = "0.9"; e.currentTarget.style.transform = "scale(1.03)"; }}
                                onMouseLeave={e => { e.currentTarget.style.opacity = "1"; e.currentTarget.style.transform = "scale(1)"; }}
                            >
                                Get Start →
                            </button>

                        </div>
                    </AnimSection>
                </div>
            </section>
        </div>
    );
}
