import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";

/* ─────────────────────────────────────────────
   DATA
───────────────────────────────────────────── */
const SERVICES = [
    { num: "01", title: "Brand Identity", desc: "Logo systems, wordmarks, colour palettes, and type hierarchies that crystallise who you are into something unmistakable.", tag: "Identity", color: "#D4A843" },
    { num: "02", title: "UI / UX Design", desc: "Interfaces that feel inevitable — intuitive flows, component libraries, and design systems built for dev handoff.", tag: "Digital", color: "#E8E0D0" },
    { num: "03", title: "Print & Collateral", desc: "Brochures, packaging, annual reports, and signage that command attention and hold up at every scale.", tag: "Print", color: "#D4A843" },
    { num: "04", title: "Motion & Animation", desc: "Logo reveals, UI micro-animations, and full explainer sequences that make brands feel alive and premium.", tag: "Motion", color: "#E8E0D0" },
    { num: "05", title: "Art Direction", desc: "Campaign concepting, photography direction, and visual storytelling that anchors every touchpoint to a single vision.", tag: "Direction", color: "#D4A843" },
    { num: "06", title: "Design Systems", desc: "Scalable token-based systems — spacing, typography, colour, and component rules — that keep your brand consistent at scale.", tag: "Systems", color: "#E8E0D0" },
];

const PROCESS = [
    { num: "I", title: "Immersion", desc: "Brand audit, competitor landscape, stakeholder interviews. We absorb your world before we put pen to paper." },
    { num: "II", title: "Strategy", desc: "Positioning, personality, and visual territory defined — a creative brief that becomes the north star for every decision." },
    { num: "III", title: "Concepting", desc: "Three distinct directions explored in full. No middle-ground mediocrity — each concept commits to a clear point of view." },
    { num: "IV", title: "Refinement", desc: "Your chosen direction taken to full resolution. Every curve, kerning pair, and colour value dialled until it sings." },
    { num: "V", title: "Production", desc: "Print-ready files, developer-ready assets, brand guidelines, and motion specs — delivered in every format you need." },
    { num: "VI", title: "Stewardship", desc: "Quarterly brand reviews, asset library management, and a design partner on retainer to protect what we built together." },
];

const WORK = [
    { label: "Brand Identity", count: "30+", sub: "identities launched" },
    { label: "Design Systems", count: "25+", sub: "systems in production" },
    { label: "Avg NPS", count: "94", sub: "client satisfaction" },
];

const DISCIPLINES = [
    { name: "Figma", cat: "UI Tool" },
    { name: "Adobe Illustrator", cat: "Vector" },
    { name: "After Effects", cat: "Motion" },
    { name: "InDesign", cat: "Print" },
    { name: "Photoshop", cat: "Raster" },
    { name: "Framer", cat: "Prototyping" },
    { name: "Principle", cat: "Interaction" },
    { name: "Spline", cat: "3D Design" },
    { name: "Lottie", cat: "Animation" },
    { name: "Procreate", cat: "Illustration" },
    { name: "Blender", cat: "3D / Render" },
    { name: "Storybook", cat: "Design Sys" },
];

const WHY_US = [
    { num: "A", title: "Strategy Before Aesthetics", color: "#D4A843", desc: "Every visual decision is rooted in brand strategy. Beautiful work that doesn't perform is just decoration." },
    { num: "B", title: "Senior Hands Only", color: "#E8E0D0", desc: "No juniors, no offshore relay. The designers you brief are the designers who deliver." },
    { num: "C", title: "Files You Own Forever", color: "#D4A843", desc: "Every source file, font licence, and asset library transfers to you at project close. No strings." },
    { num: "D", title: "Brand Guardian Retainer", color: "#E8E0D0", desc: "Optional ongoing partnership to ensure every new touchpoint stays true to the system we built." },
];

/* ─────────────────────────────────────────────
   THREE.JS BACKGROUND — EDITORIAL / DESIGN STUDIO
   Concept: Floating geometric constructs — circles, 
   triangles, and lines referencing the golden ratio,
   grid systems, and typographic structure. 
   Palette: cream/gold/charcoal on near-black.
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
            const camera = new THREE.PerspectiveCamera(50, window.innerWidth / window.innerHeight, 0.1, 1000);
            camera.position.set(0, 0, 45);

            /* ── Lights ── */
            scene.add(new THREE.AmbientLight(0xD4A843, 0.25));
            const pl1 = new THREE.PointLight(0xD4A843, 2.0, 120);
            pl1.position.set(30, 20, 15);
            scene.add(pl1);
            const pl2 = new THREE.PointLight(0xF5EDD8, 1.2, 100);
            pl2.position.set(-25, -15, 12);
            scene.add(pl2);
            const pl3 = new THREE.PointLight(0x8B6914, 0.8, 80);
            pl3.position.set(0, 30, -8);
            scene.add(pl3);

            /* ── Gold dust particles ── */
            const COUNT = 200;
            const pos = new Float32Array(COUNT * 3);
            const cols = new Float32Array(COUNT * 3);
            const palette = [
                new THREE.Color(0xD4A843),  // gold
                new THREE.Color(0xF5EDD8),  // cream
                new THREE.Color(0xB8922E),  // dark gold
                new THREE.Color(0xE8D5A0),  // pale gold
                new THREE.Color(0xFFFFFF),  // white
            ];
            for (let i = 0; i < COUNT; i++) {
                pos[i * 3] = (Math.random() - 0.5) * 130;
                pos[i * 3 + 1] = (Math.random() - 0.5) * 110;
                pos[i * 3 + 2] = (Math.random() - 0.5) * 70;
                const c = palette[Math.floor(Math.random() * palette.length)];
                cols[i * 3] = c.r; cols[i * 3 + 1] = c.g; cols[i * 3 + 2] = c.b;
            }
            const pGeo = new THREE.BufferGeometry();
            pGeo.setAttribute("position", new THREE.BufferAttribute(pos, 3));
            pGeo.setAttribute("color", new THREE.BufferAttribute(cols, 3));
            const pMat = new THREE.PointsMaterial({
                size: 0.45, vertexColors: true, transparent: true, opacity: 0.65, sizeAttenuation: true,
            });
            scene.add(new THREE.Points(pGeo, pMat));

            /* ── Large golden ratio spiral approximation — nested toruses ── */
            const spiralRadii = [20, 12.36, 7.64, 4.72, 2.92];
            const spiralMeshes = [];
            spiralRadii.forEach((r, idx) => {
                const geo = new THREE.TorusGeometry(r, 0.18, 6, 80);
                const mat = new THREE.MeshStandardMaterial({
                    color: 0xD4A843, transparent: true,
                    opacity: 0.04 + idx * 0.012,
                    emissive: 0xD4A843, emissiveIntensity: 0.2,
                });
                const mesh = new THREE.Mesh(geo, mat);
                mesh.rotation.x = Math.PI / 2;
                mesh.userData = { speed: 0.0008 + idx * 0.0004 };
                scene.add(mesh);
                spiralMeshes.push(mesh);
            });

            /* ── Floating geometric planes (like design boards) ── */
            const planeColors = [0xD4A843, 0xF5EDD8, 0x1A1410, 0xB8922E];
            const planes = [];
            for (let i = 0; i < 14; i++) {
                const w = 1.5 + Math.random() * 3.5;
                const h = w * (0.5 + Math.random() * 1.2);
                const geo = new THREE.PlaneGeometry(w, h);
                const mat = new THREE.MeshStandardMaterial({
                    color: planeColors[i % planeColors.length],
                    transparent: true, opacity: 0.06 + Math.random() * 0.07,
                    emissive: planeColors[i % planeColors.length], emissiveIntensity: 0.1,
                    side: THREE.DoubleSide,
                });
                const mesh = new THREE.Mesh(geo, mat);
                mesh.position.set(
                    (Math.random() - 0.5) * 80,
                    (Math.random() - 0.5) * 65,
                    (Math.random() - 0.5) * 30,
                );
                mesh.rotation.set(
                    Math.random() * Math.PI,
                    Math.random() * Math.PI,
                    Math.random() * Math.PI,
                );
                mesh.userData = {
                    rx: (Math.random() - 0.5) * 0.006,
                    ry: (Math.random() - 0.5) * 0.009,
                    rz: (Math.random() - 0.5) * 0.004,
                    amp: 0.3 + Math.random() * 0.8,
                    spd: 0.2 + Math.random() * 0.5,
                    off: Math.random() * Math.PI * 2,
                    oy: mesh.position.y,
                };
                scene.add(mesh);
                planes.push(mesh);
            }

            /* ── Wireframe octahedron — gem / logo mark ── */
            const gemGeo = new THREE.OctahedronGeometry(10, 0);
            const gemMat = new THREE.MeshStandardMaterial({
                color: 0xD4A843, wireframe: true,
                transparent: true, opacity: 0.055,
                emissive: 0xD4A843, emissiveIntensity: 0.3,
            });
            const gem = new THREE.Mesh(gemGeo, gemMat);
            gem.position.set(18, 8, -5);
            scene.add(gem);

            /* ── Thin construction lines (design grid) ── */
            const lineMat = new THREE.LineBasicMaterial({ color: 0xD4A843, transparent: true, opacity: 0.04 });
            for (let i = 0; i < 50; i++) {
                const ai = Math.floor(Math.random() * COUNT);
                const bi = Math.floor(Math.random() * COUNT);
                const pts = [
                    new THREE.Vector3(pos[ai * 3], pos[ai * 3 + 1], pos[ai * 3 + 2]),
                    new THREE.Vector3(pos[bi * 3], pos[bi * 3 + 1], pos[bi * 3 + 2]),
                ];
                scene.add(new THREE.Line(new THREE.BufferGeometry().setFromPoints(pts), lineMat));
            }

            /* ── Icosahedron (smaller, right side) ── */
            const icoGeo = new THREE.IcosahedronGeometry(7, 1);
            const icoMat = new THREE.MeshStandardMaterial({
                color: 0xF5EDD8, wireframe: true,
                transparent: true, opacity: 0.045,
                emissive: 0xF5EDD8, emissiveIntensity: 0.15,
            });
            const ico = new THREE.Mesh(icoGeo, icoMat);
            ico.position.set(-20, -10, -6);
            scene.add(ico);

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
                t += 0.006;

                camera.position.x += (mouseRef.current.x * 4 - camera.position.x) * 0.015;
                camera.position.y += (-mouseRef.current.y * 3 - camera.position.y) * 0.015;
                camera.lookAt(0, 0, 0);

                spiralMeshes.forEach((m, idx) => {
                    m.rotation.z += m.userData.speed;
                    m.rotation.y += m.userData.speed * 0.3;
                });

                gem.rotation.y += 0.003; gem.rotation.x += 0.001;
                ico.rotation.y -= 0.002; ico.rotation.z += 0.0015;

                planes.forEach((p) => {
                    const d = p.userData;
                    p.rotation.x += d.rx; p.rotation.y += d.ry; p.rotation.z += d.rz;
                    p.position.y = d.oy + Math.sin(t * d.spd + d.off) * d.amp;
                });

                pl1.intensity = 1.8 + Math.sin(t * 0.9) * 0.4;
                pl2.intensity = 1.0 + Math.cos(t * 0.7) * 0.3;

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
function useInView(threshold = 0.12) {
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

function AnimSection({ children, className = "", delay = 0, from = "bottom" }) {
    const [ref, inView] = useInView();
    const transform = from === "left"
        ? inView ? "translateX(0)" : "translateX(-40px)"
        : from === "right"
            ? inView ? "translateX(0)" : "translateX(40px)"
            : inView ? "translateY(0)" : "translateY(36px)";
    return (
        <div
            ref={ref}
            className={className}
            style={{
                opacity: inView ? 1 : 0,
                transform,
                transition: `opacity 0.8s ease ${delay}ms, transform 0.8s ease ${delay}ms`,
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
        <>
            {/* Outer ring */}
            <div style={{
                position: "fixed", left: pos.x, top: pos.y,
                pointerEvents: "none", zIndex: 9999,
                width: big ? 52 : 32, height: big ? 52 : 32,
                borderRadius: "50%", border: "1px solid rgba(212,168,67,0.6)",
                transform: "translate(-50%,-50%)",
                transition: "width 0.25s, height 0.25s",
                background: big ? "rgba(212,168,67,0.07)" : "transparent",
            }} />
            {/* Inner dot */}
            <div style={{
                position: "fixed", left: pos.x, top: pos.y,
                pointerEvents: "none", zIndex: 10000,
                width: 5, height: 5, borderRadius: "50%",
                background: "#D4A843",
                transform: "translate(-50%,-50%)",
            }} />
        </>
    );
}

/* ─────────────────────────────────────────────
   PAGE COMPONENT
───────────────────────────────────────────── */
export default function GraphicDesignLearnMore() {
      const nevigation=useNavigate();


    return (
        <div style={{
            fontFamily: "'Cormorant Garamond', 'DM Sans', serif",
            background: "#0C0A08",
            color: "#E8DFC8",
            minHeight: "100vh",
            overflowX: "hidden",
            cursor: "none",
        }}>
            <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,600;0,700;1,300;1,400&family=DM+Sans:wght@300;400;500;600&family=DM+Mono:wght@400;500&display=swap');
        * { box-sizing: border-box; margin: 0; padding: 0; }
        ::-webkit-scrollbar { width: 3px; }
        ::-webkit-scrollbar-track { background: #0C0A08; }
        ::-webkit-scrollbar-thumb { background: #D4A843; border-radius: 2px; }
        body { cursor: none; }
        @keyframes marquee   { 0%{transform:translateX(0)} 100%{transform:translateX(-50%)} }
        @keyframes gradShift { 0%{background-position:0% 50%} 50%{background-position:100% 50%} 100%{background-position:0% 50%} }
        @keyframes pulse     { 0%,100%{opacity:1} 50%{opacity:0.3} }
        @keyframes float     { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-14px)} }
        @keyframes rotSlow   { from{transform:rotate(0deg)} to{transform:rotate(360deg)} }
        .serif   { font-family: 'Cormorant Garamond', serif; }
        .sans    { font-family: 'DM Sans', sans-serif; }
        .mono    { font-family: 'DM Mono', monospace; }
        .grad-text {
          background: linear-gradient(90deg, #D4A843, #F5EDD8, #B8922E, #D4A843);
          background-size: 300% auto;
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          animation: gradShift 6s ease infinite;
        }
        .glow-gold:hover { box-shadow: 0 0 28px rgba(212,168,67,0.4), 0 0 6px rgba(212,168,67,0.15); }
        .card-hover { transition: transform 0.4s ease; }
        .card-hover:hover { transform: translateY(-5px); }
        .glass {
          background: rgba(12,10,8,0.5);
          backdrop-filter: blur(18px) saturate(150%);
          -webkit-backdrop-filter: blur(18px) saturate(150%);
          border: 1px solid rgba(212,168,67,0.12);
        }
        .rule { border: none; border-top: 1px solid rgba(212,168,67,0.18); margin: 0; }
        .service-num { font-family:'Cormorant Garamond',serif; font-weight:300; font-size:clamp(3rem,6vw,5rem); color:rgba(212,168,67,0.15); line-height:1; position:absolute; top:-10px; right:20px; }
      `}</style>

            <ThreeBackground />
            <Cursor />

            {/* ══════ HERO ══════ */}
            <section style={{ minHeight: "100vh", display: "flex", alignItems: "center", position: "relative", padding: "130px 2rem 80px", zIndex: 1 }}>
                {/* Decorative rotating circle */}
                <div style={{
                    position: "absolute", top: "12%", right: "6%", width: 320, height: 320,
                    border: "1px solid rgba(212,168,67,0.1)", borderRadius: "50%",
                    animation: "rotSlow 40s linear infinite", zIndex: 0,
                }}>
                    <div style={{ position: "absolute", top: "50%", left: "-4px", width: 8, height: 8, borderRadius: "50%", background: "#D4A843", transform: "translateY(-50%)", opacity: 0.6 }} />
                </div>
                <div style={{
                    position: "absolute", top: "16%", right: "10%", width: 200, height: 200,
                    border: "1px solid rgba(212,168,67,0.07)", borderRadius: "50%",
                    animation: "rotSlow 28s linear infinite reverse", zIndex: 0,
                }} />
                {/* Grid overlay */}
                <div style={{
                    position: "absolute", inset: 0, zIndex: 0,
                    backgroundImage: "linear-gradient(rgba(212,168,67,0.025) 1px, transparent 1px), linear-gradient(90deg, rgba(212,168,67,0.025) 1px, transparent 1px)",
                    backgroundSize: "80px 80px",
                }} />
                {/* Gold glow */}
                <div style={{
                    position: "absolute", top: "20%", left: "30%", width: 600, height: 400,
                    background: "radial-gradient(ellipse, rgba(212,168,67,0.06) 0%, transparent 70%)",
                    filter: "blur(40px)", zIndex: 0, animation: "float 8s ease-in-out infinite",
                }} />

                <div style={{ maxWidth: 1160, margin: "0 auto", position: "relative", zIndex: 1, width: "100%" }}>

                    {/* Editorial issue-number badge */}
                    <AnimSection delay={0}>
                        <div style={{ display: "flex", alignItems: "center", gap: 16, marginBottom: 36 }}>
                            <div style={{ width: 40, height: 1, background: "#D4A843", opacity: 0.6 }} />
                            <span className="mono" style={{ fontSize: 10, color: "#D4A843", letterSpacing: 3, opacity: 0.8 }}>GRAPHIC DESIGN</span>
                            <span style={{ width: 5, height: 5, borderRadius: "50%", background: "#D4A843", display: "inline-block", animation: "pulse 2.5s ease infinite" }} />
                        </div>
                    </AnimSection>

                    <AnimSection delay={80}>
                        <h1 className="serif" style={{ fontWeight: 300, fontSize: "clamp(3.2rem,8vw,7rem)", lineHeight: 0.96, letterSpacing: -1, marginBottom: 8 }}>
                            Visual Identities
                        </h1>
                    </AnimSection>
                    <AnimSection delay={140}>
                        <h1 className="serif" style={{ fontWeight: 700, fontStyle: "italic", fontSize: "clamp(3.2rem,8vw,7rem)", lineHeight: 0.96, letterSpacing: -1, marginBottom: 36 }}>
                            <span className="grad-text">That Leave a Mark.</span>
                        </h1>
                    </AnimSection>

                    <AnimSection delay={220}>
                        <p className="sans" style={{ fontSize: "clamp(1rem,1.6vw,1.12rem)", color: "#7A6A50", maxWidth: 500, lineHeight: 1.8, marginBottom: 48, fontWeight: 300 }}>
                            Brand systems, UI/UX design, and marketing collateral crafted with precision — visual work that earns attention and sustains recognition.
                        </p>
                    </AnimSection>

                    <AnimSection delay={300}>
                        <div style={{ display: "flex", gap: 16, flexWrap: "wrap", alignItems: "center" }}>
                            <button
                                className="glow-gold"
                                onClick={() => nevigation('/page/contect')}

                                style={{ background: "#D4A843", color: "#0C0A08", border: "none", borderRadius: 4, padding: "15px 42px", fontFamily: "'DM Sans',sans-serif", fontWeight: 600, fontSize: 15, cursor: "none", letterSpacing: 0.5, transition: "opacity 0.2s, transform 0.2s, box-shadow 0.3s" }}
                                onMouseEnter={e => { e.currentTarget.style.opacity = "0.88"; e.currentTarget.style.transform = "scale(1.03)"; }}
                                onMouseLeave={e => { e.currentTarget.style.opacity = "1"; e.currentTarget.style.transform = "scale(1)"; }}
                            >
                                Start a Brief →
                            </button>

                        </div>
                    </AnimSection>

                    {/* Stats — editorial table style */}
                    <AnimSection delay={440}>
                        <div style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", marginTop: 80, maxWidth: 700 }}>
                            {WORK.map((w, i) => (
                                <div key={i} style={{ padding: "20px 0", borderTop: `1px solid rgba(212,168,67,${i === 0 ? "0.5" : "0.15"})`, paddingRight: 20 }}>
                                    <div className="serif" style={{ fontSize: "clamp(1.6rem,3vw,2.4rem)", fontWeight: 600, color: "#D4A843", lineHeight: 1 }}>{w.count}</div>
                                    <div className="mono" style={{ fontSize: 10, color: "#5A4A30", marginTop: 6, letterSpacing: 0.5 }}>{w.sub}</div>
                                </div>
                            ))}
                        </div>
                    </AnimSection>
                </div>
            </section>

            {/* ══════ MARQUEE — editorial ticker ══════ */}
            <div style={{ borderTop: "1px solid rgba(212,168,67,0.2)", borderBottom: "1px solid rgba(212,168,67,0.2)", padding: "11px 0", overflow: "hidden", position: "relative", zIndex: 1, background: "rgba(12,10,8,0.8)" }}>
                <div style={{ display: "flex", animation: "marquee 28s linear infinite", whiteSpace: "nowrap", width: "200%" }}>
                    {[...Array(2)].map((_, i) => (
                        <span key={i} style={{ display: "flex", gap: "3rem", paddingRight: "3rem" }}>
                            {["Brand Identity", "UI / UX Design", "Motion Design", "Design Systems", "Art Direction", "Print & Packaging", "Typography", "Illustration", "Photography", "Wayfinding", "Editorial Design", "Visual Strategy"].map(t => (
                                <span key={t} className="mono" style={{ fontWeight: 400, fontSize: 11, color: "#D4A843", letterSpacing: 2, opacity: 0.7 }}>◆ {t.toUpperCase()}</span>
                            ))}
                        </span>
                    ))}
                </div>
            </div>

            {/* ══════ SERVICES — editorial numbered list ══════ */}
            <section style={{ padding: "110px 2rem", maxWidth: 1160, margin: "0 auto", position: "relative", zIndex: 1 }}>
                <AnimSection>
                    <div style={{ display: "flex", alignItems: "flex-end", justifyContent: "space-between", flexWrap: "wrap", gap: 20, marginBottom: 60 }}>
                        <div>
                            <p className="mono" style={{ fontSize: 10, color: "#D4A843", letterSpacing: 3, marginBottom: 16, opacity: 0.8 }}>// DISCIPLINES</p>
                            <h2 className="serif" style={{ fontWeight: 300, fontSize: "clamp(2rem,4.5vw,3.4rem)", letterSpacing: -0.5 }}>
                                What We <em style={{ fontStyle: "italic", fontWeight: 400 }}>Create</em>
                            </h2>
                        </div>
                        <p className="sans" style={{ color: "#5A4A30", maxWidth: 300, fontSize: 14, lineHeight: 1.75, fontWeight: 300 }}>Six core practices. One coherent vision. Every engagement draws on the full breadth of the studio.</p>
                    </div>
                </AnimSection>

                <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(320px,1fr))", gap: 2 }}>
                    {SERVICES.map((svc, i) => (
                        <AnimSection key={i} delay={i * 70}>
                            <div
                                className="card-hover"
                                data-hover
                                style={{
                                    position: "relative", overflow: "hidden",
                                    padding: "36px 32px 32px",
                                    background: "rgba(255,255,255,0.015)",
                                    border: "1px solid rgba(212,168,67,0.08)",
                                    cursor: "none", minHeight: 200,
                                    transition: "background 0.3s, border-color 0.3s",
                                }}
                                onMouseEnter={e => { e.currentTarget.style.background = "rgba(212,168,67,0.04)"; e.currentTarget.style.borderColor = "rgba(212,168,67,0.22)"; }}
                                onMouseLeave={e => { e.currentTarget.style.background = "rgba(255,255,255,0.015)"; e.currentTarget.style.borderColor = "rgba(212,168,67,0.08)"; }}
                            >
                                <span className="service-num">{svc.num}</span>
                                <div style={{ display: "inline-block", background: "transparent", border: `1px solid ${svc.color}44`, borderRadius: 2, padding: "2px 10px", marginBottom: 16, fontFamily: "'DM Mono',monospace", fontSize: 9, color: svc.color, letterSpacing: 2 }}>{svc.tag.toUpperCase()}</div>
                                <h3 className="serif" style={{ fontWeight: 600, fontSize: "clamp(1.1rem,1.8vw,1.4rem)", marginBottom: 12, lineHeight: 1.2 }}>{svc.title}</h3>
                                <p className="sans" style={{ color: "#6A5A40", fontSize: 13.5, lineHeight: 1.72, fontWeight: 300 }}>{svc.desc}</p>
                            </div>
                        </AnimSection>
                    ))}
                </div>
            </section>

            {/* ══════ PROCESS — Roman numerals editorial ══════ */}
            <section style={{ padding: "110px 2rem", background: "rgba(12,10,8,0.7)", backdropFilter: "blur(12px)", borderTop: "1px solid rgba(212,168,67,0.1)", borderBottom: "1px solid rgba(212,168,67,0.1)", position: "relative", zIndex: 1 }}>
                <div style={{ maxWidth: 1160, margin: "0 auto" }}>
                    <AnimSection>
                        <div style={{ marginBottom: 64 }}>
                            <p className="mono" style={{ fontSize: 10, color: "#D4A843", letterSpacing: 3, marginBottom: 16, opacity: 0.8 }}>// THE METHOD</p>
                            <h2 className="serif" style={{ fontWeight: 300, fontSize: "clamp(2rem,4.5vw,3.4rem)", letterSpacing: -0.5 }}>
                                A Process Refined<br /><em style={{ fontStyle: "italic", fontWeight: 400 }}>Over Two Decades</em>
                            </h2>
                        </div>
                    </AnimSection>

                    {/* Roman numeral steps — horizontal rule style */}
                    {PROCESS.map((step, i) => (
                        <AnimSection key={i} delay={i * 60}>
                            <div style={{ display: "flex", gap: "3rem", alignItems: "flex-start", padding: "28px 0", borderTop: "1px solid rgba(212,168,67,0.1)", cursor: "none" }}
                                onMouseEnter={e => { e.currentTarget.style.borderTopColor = "rgba(212,168,67,0.35)"; }}
                                onMouseLeave={e => { e.currentTarget.style.borderTopColor = "rgba(212,168,67,0.1)"; }}
                            >
                                <div className="serif" style={{ fontWeight: 300, fontStyle: "italic", fontSize: "clamp(1.2rem,2vw,1.6rem)", color: "#D4A843", minWidth: 48, opacity: 0.9, lineHeight: 1 }}>{step.num}</div>
                                <div style={{ flex: 1, display: "flex", gap: "3rem", flexWrap: "wrap", alignItems: "baseline" }}>
                                    <h3 className="serif" style={{ fontWeight: 600, fontSize: "clamp(1.1rem,2vw,1.3rem)", minWidth: 160, letterSpacing: -0.2 }}>{step.title}</h3>
                                    <p className="sans" style={{ color: "#6A5A40", fontSize: 14, lineHeight: 1.7, maxWidth: 560, fontWeight: 300, flex: 1 }}>{step.desc}</p>
                                </div>
                            </div>
                        </AnimSection>
                    ))}
                    <hr className="rule" />
                </div>
            </section>

            {/* ══════ TOOLS ══════ */}
            <section style={{ padding: "110px 2rem", maxWidth: 1160, margin: "0 auto", position: "relative", zIndex: 1 }}>
                <AnimSection>
                    <div style={{ display: "flex", alignItems: "flex-end", justifyContent: "space-between", flexWrap: "wrap", gap: 20, marginBottom: 50 }}>
                        <div>
                            <p className="mono" style={{ fontSize: 10, color: "#D4A843", letterSpacing: 3, marginBottom: 16, opacity: 0.8 }}>// TOOLS OF THE TRADE</p>
                            <h2 className="serif" style={{ fontWeight: 300, fontSize: "clamp(2rem,4.5vw,3.4rem)", letterSpacing: -0.5 }}>
                                The Studio <em style={{ fontStyle: "italic" }}>Toolkit</em>
                            </h2>
                        </div>
                    </div>
                </AnimSection>
                <div style={{ display: "flex", flexWrap: "wrap", gap: 10 }}>
                    {DISCIPLINES.map((t, i) => (
                        <AnimSection key={i} delay={i * 30}>
                            <div
                                data-hover
                                style={{ background: "rgba(12,10,8,0.6)", backdropFilter: "blur(12px)", border: "1px solid rgba(212,168,67,0.1)", borderRadius: 3, padding: "11px 18px", display: "flex", flexDirection: "column", gap: 3, cursor: "none", transition: "border-color 0.2s, background 0.2s" }}
                                onMouseEnter={e => { e.currentTarget.style.borderColor = "rgba(212,168,67,0.4)"; e.currentTarget.style.background = "rgba(212,168,67,0.05)"; }}
                                onMouseLeave={e => { e.currentTarget.style.borderColor = "rgba(212,168,67,0.1)"; e.currentTarget.style.background = "rgba(12,10,8,0.6)"; }}
                            >
                                <span className="sans" style={{ fontWeight: 500, fontSize: 13.5, color: "#E8DFC8" }}>{t.name}</span>
                                <span className="mono" style={{ fontSize: 9, color: "#D4A843", letterSpacing: 1, opacity: 0.8 }}>{t.cat.toUpperCase()}</span>
                            </div>
                        </AnimSection>
                    ))}
                </div>
            </section>

            {/* ══════ WHY US — 2-col editorial ══════ */}
            <section style={{ padding: "110px 2rem", background: "rgba(12,10,8,0.7)", backdropFilter: "blur(12px)", borderTop: "1px solid rgba(212,168,67,0.1)", borderBottom: "1px solid rgba(212,168,67,0.1)", position: "relative", zIndex: 1 }}>
                <div style={{ maxWidth: 1160, margin: "0 auto" }}>
                    <AnimSection>
                        <div style={{ marginBottom: 60 }}>
                            <p className="mono" style={{ fontSize: 10, color: "#D4A843", letterSpacing: 3, marginBottom: 16, opacity: 0.8 }}>// THE DIFFERENCE</p>
                            <h2 className="serif" style={{ fontWeight: 300, fontSize: "clamp(2rem,4.5vw,3.4rem)", letterSpacing: -0.5 }}>
                                Why the World's Best<br /><em style={{ fontStyle: "italic", fontWeight: 400 }}>Brands Choose Us</em>
                            </h2>
                        </div>
                    </AnimSection>
                    <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(260px,1fr))", gap: 24 }}>
                        {WHY_US.map((item, i) => (
                            <AnimSection key={i} delay={i * 80}>
                                <div className="card-hover glass" data-hover style={{ borderRadius: 4, padding: "32px 28px", position: "relative", overflow: "hidden", cursor: "none" }}>
                                    <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 1, background: `linear-gradient(90deg,transparent,${item.color},transparent)` }} />
                                    <div className="serif" style={{ fontSize: "3.5rem", fontWeight: 300, color: "rgba(212,168,67,0.12)", lineHeight: 1, marginBottom: 14 }}>{item.num}</div>
                                    <h3 className="serif" style={{ fontWeight: 600, fontSize: "1.1rem", marginBottom: 12, letterSpacing: -0.2 }}>{item.title}</h3>
                                    <p className="sans" style={{ color: "#6A5A40", fontSize: 13.5, lineHeight: 1.72, fontWeight: 300 }}>{item.desc}</p>
                                </div>
                            </AnimSection>
                        ))}
                    </div>
                </div>
            </section>

            {/* ══════ TESTIMONIAL ══════ */}
            <section style={{ padding: "110px 2rem", maxWidth: 820, margin: "0 auto", textAlign: "center", position: "relative", zIndex: 1 }}>
                <AnimSection>
                    <p className="mono" style={{ fontSize: 10, color: "#D4A843", letterSpacing: 3, marginBottom: 40, opacity: 0.8 }}>// CLIENT VOICE</p>
                    <div className="glass" style={{ borderRadius: 6, padding: "52px 48px", position: "relative" }}>
                        <div className="serif" style={{ fontSize: "6rem", color: "#D4A843", fontWeight: 300, lineHeight: 0.6, marginBottom: 32, opacity: 0.2, fontStyle: "italic" }}>"</div>
                        <p className="serif" style={{ fontSize: "clamp(1.1rem,2vw,1.45rem)", lineHeight: 1.72, color: "#C8B898", marginBottom: 40, fontWeight: 300, fontStyle: "italic" }}>
                            They didn't just design a logo — they gave us a complete visual language. Every pitch deck, every social post, every campaign now feels unmistakably us. It transformed how enterprise clients perceive us overnight.
                        </p>
                        <hr style={{ border: "none", borderTop: "1px solid rgba(212,168,67,0.15)", marginBottom: 28 }} />
                        <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 14 }}>
                            <div style={{ width: 42, height: 42, borderRadius: "50%", background: "rgba(212,168,67,0.12)", border: "1px solid rgba(212,168,67,0.28)", display: "flex", alignItems: "center", justifyContent: "center", fontFamily: "'Cormorant Garamond',serif", fontWeight: 600, color: "#D4A843", fontSize: 16 }}>N</div>
                            <div style={{ textAlign: "left" }}>
                                <div className="sans" style={{ fontWeight: 500, fontSize: 14.5 }}>Natalie V.</div>
                                <div className="mono" style={{ fontSize: 10, color: "#5A4A30", letterSpacing: 0.5 }}>CMO, B2B SaaS — Series C</div>
                            </div>
                        </div>
                    </div>
                </AnimSection>
            </section>

            {/* ══════ CTA ══════ */}
            <section style={{ padding: "130px 2rem", textAlign: "center", position: "relative", overflow: "hidden", zIndex: 1 }}>
                <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 1, background: "linear-gradient(90deg,transparent,#D4A843,transparent)" }} />
                <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, height: 1, background: "linear-gradient(90deg,transparent,#D4A843,transparent)" }} />
                <div style={{ position: "absolute", top: "50%", left: "50%", transform: "translate(-50%,-50%)", width: 600, height: 400, borderRadius: "50%", background: "radial-gradient(ellipse, rgba(212,168,67,0.07) 0%, transparent 70%)", filter: "blur(50px)", zIndex: 0 }} />
                {/* Decorative large circle */}
                <div style={{ position: "absolute", top: "50%", left: "50%", transform: "translate(-50%,-50%)", width: 500, height: 500, border: "1px solid rgba(212,168,67,0.06)", borderRadius: "50%", animation: "rotSlow 60s linear infinite", zIndex: 0 }} />

                <div style={{ position: "relative", zIndex: 1, maxWidth: 680, margin: "0 auto" }}>
                    <AnimSection>
                        <p className="mono" style={{ fontSize: 10, color: "#D4A843", letterSpacing: 3, marginBottom: 24, opacity: 0.8 }}>// BEGIN A PROJECT</p>
                        <h2 className="serif" style={{ fontWeight: 300, fontSize: "clamp(2.6rem,6vw,5rem)", letterSpacing: -1, lineHeight: 1.0, marginBottom: 10 }}>
                            Ready to Build
                        </h2>
                        <h2 className="serif" style={{ fontWeight: 700, fontStyle: "italic", fontSize: "clamp(2.6rem,6vw,5rem)", letterSpacing: -1, lineHeight: 1.0, marginBottom: 28 }}>
                            <span className="grad-text">Something Lasting?</span>
                        </h2>
                        <p className="sans" style={{ color: "#5A4A30", fontSize: 15.5, lineHeight: 1.75, maxWidth: 440, margin: "0 auto 52px", fontWeight: 300 }}>
                            Send us your brief — or just an idea. We'll respond with a scoping call, creative direction, and a proposal within 48 hours.
                        </p>
                        <div style={{ display: "flex", gap: 14, justifyContent: "center", flexWrap: "wrap" }}>
                            <button
                                className="glow-gold"
                                onClick={() => nevigation('/page/contect')}

                                style={{ background: "#D4A843", color: "#0C0A08", border: "none", borderRadius: 4, padding: "16px 44px", fontFamily: "'DM Sans',sans-serif", fontWeight: 600, fontSize: 15, cursor: "none", letterSpacing: 0.5, transition: "opacity 0.2s, transform 0.2s, box-shadow 0.3s" }}
                                onMouseEnter={e => { e.currentTarget.style.opacity = "0.88"; e.currentTarget.style.transform = "scale(1.03)"; }}
                                onMouseLeave={e => { e.currentTarget.style.opacity = "1"; e.currentTarget.style.transform = "scale(1)"; }}
                            >
                                Send a Brief →
                            </button>

                        </div>
                    </AnimSection>
                </div>
            </section>
        </div>
    );
}
