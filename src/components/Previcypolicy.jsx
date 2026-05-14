import { useState, useEffect, useRef } from "react";

const sections = [
  {
    icon: "📋",
    title: "Information We Collect",
    content: [
      "Personal identification information (name, email address, phone number, etc.)",
      "Usage data including IP address, browser type, pages visited, and time spent",
      "Cookies and tracking technologies to enhance your experience",
      "Payment information (processed securely through third-party providers)",
      "Communications you send us, including support requests and feedback",
    ],
  },
  {
    icon: "🔒",
    title: "How We Use Your Information",
    content: [
      "To provide, operate, and maintain our website and services",
      "To personalize your experience and deliver tailored content",
      "To send transactional emails, updates, and promotional materials",
      "To analyze usage patterns and improve our platform",
      "To detect and prevent fraudulent or unauthorized activity",
    ],
  },
  {
    icon: "🌐",
    title: "Data Sharing & Third Parties",
    content: [
      "We do not sell, trade, or rent your personal data to third parties",
      "Service providers may access data only to perform tasks on our behalf",
      "We may disclose data if required by law or legal process",
      "Analytics partners receive anonymized, aggregated data only",
      "Business transfers may involve data migration under strict agreements",
    ],
  },
  {
    icon: "🍪",
    title: "Cookies Policy",
    content: [
      "Essential cookies are required for core site functionality",
      "Analytics cookies help us understand how visitors interact with our site",
      "Preference cookies remember your settings and choices",
      "You can control cookie preferences through your browser settings",
      "Disabling certain cookies may affect your site experience",
    ],
  },
  {
    icon: "🛡️",
    title: "Data Security",
    content: [
      "We use industry-standard SSL/TLS encryption for all data transfers",
      "Access to personal data is restricted to authorized personnel only",
      "Regular security audits and vulnerability assessments are performed",
      "Data breach response protocols are in place to notify users promptly",
      "We store data in secure, certified cloud infrastructure",
    ],
  },
  {
    icon: "⚖️",
    title: "Your Rights",
    content: [
      "Right to access: Request a copy of the personal data we hold about you",
      "Right to rectification: Correct inaccurate or incomplete data",
      "Right to erasure: Request deletion of your personal data",
      "Right to portability: Receive your data in a structured format",
      "Right to object: Opt out of certain data processing activities",
    ],
  },
  {
    icon: "👶",
    title: "Children's Privacy",
    content: [
      "Our services are not directed to children under the age of 13",
      "We do not knowingly collect personal data from minors",
      "Parents or guardians may contact us to request removal of their child's data",
      "We comply with COPPA and applicable children's privacy regulations",
    ],
  },
  {
    icon: "🔄",
    title: "Policy Updates",
    content: [
      "We may update this Privacy Policy from time to time",
      "Changes will be posted on this page with an updated effective date",
      "Significant changes will be communicated via email or site notification",
      "Continued use of the site after changes constitutes acceptance",
    ],
  },
];

function FloatingOrb({ style }) {
  return (
    <div
      className="absolute rounded-full pointer-events-none"
      style={{
        ...style,
        animation: `float ${style.duration || "6s"} ease-in-out infinite`,
        animationDelay: style.delay || "0s",
      }}
    />
  );
}

function ParticleField() {
  const particles = Array.from({ length: 30 }, (_, i) => ({
    id: i,
    left: `${Math.random() * 100}%`,
    top: `${Math.random() * 100}%`,
    size: Math.random() * 4 + 1,
    duration: `${Math.random() * 10 + 8}s`,
    delay: `${Math.random() * 5}s`,
    opacity: Math.random() * 0.5 + 0.1,
  }));

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
      {particles.map((p) => (
        <div
          key={p.id}
          className="absolute rounded-full bg-purple-400"
          style={{
            left: p.left,
            top: p.top,
            width: p.size,
            height: p.size,
            opacity: p.opacity,
            animation: `particle ${p.duration} ease-in-out infinite`,
            animationDelay: p.delay,
          }}
        />
      ))}
    </div>
  );
}

function PolicyCard({ section, index }) {
  const [isHovered, setIsHovered] = useState(false);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const cardRef = useRef(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), index * 120);
    return () => clearTimeout(timer);
  }, [index]);

  const handleMouseMove = (e) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width - 0.5) * 20;
    const y = ((e.clientY - rect.top) / rect.height - 0.5) * 20;
    setMousePos({ x, y });
  };

  return (
    <div
      ref={cardRef}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => {
        setIsHovered(false);
        setMousePos({ x: 0, y: 0 });
      }}
      onMouseMove={handleMouseMove}
      className="relative group cursor-default"
      style={{
        transform: isVisible ? "translateY(0) opacity(1)" : "translateY(40px)",
        opacity: isVisible ? 1 : 0,
        transition: `all 0.6s cubic-bezier(0.34, 1.56, 0.64, 1) ${index * 0.08}s`,
      }}
    >
      <div
        className="relative rounded-2xl p-6 h-full"
        style={{
          background: isHovered
            ? "linear-gradient(135deg, rgba(139,92,246,0.15), rgba(59,130,246,0.1))"
            : "rgba(255,255,255,0.04)",
          border: "1px solid rgba(255,255,255,0.1)",
          backdropFilter: "blur(12px)",
          transform: isHovered
            ? `perspective(1000px) rotateX(${-mousePos.y * 0.5}deg) rotateY(${mousePos.x * 0.5}deg) scale(1.02) translateZ(10px)`
            : "perspective(1000px) rotateX(0deg) rotateY(0deg) scale(1) translateZ(0px)",
          transition: "transform 0.3s ease, background 0.3s ease, box-shadow 0.3s ease",
          boxShadow: isHovered
            ? "0 20px 60px rgba(139,92,246,0.3), 0 0 0 1px rgba(139,92,246,0.2), inset 0 1px 0 rgba(255,255,255,0.15)"
            : "0 4px 20px rgba(0,0,0,0.3)",
        }}
      >
        {/* Glowing corner accent */}
        <div
          className="absolute top-0 right-0 w-20 h-20 rounded-tr-2xl rounded-bl-full opacity-20 pointer-events-none"
          style={{
            background: "radial-gradient(circle at top right, rgba(139,92,246,0.8), transparent)",
            transition: "opacity 0.3s",
            opacity: isHovered ? 0.4 : 0.1,
          }}
        />

        {/* Icon */}
        <div
          className="text-4xl mb-4 inline-block"
          style={{
            filter: "drop-shadow(0 0 8px rgba(139,92,246,0.6))",
            transform: isHovered ? "scale(1.15) rotate(-5deg)" : "scale(1) rotate(0deg)",
            transition: "transform 0.4s cubic-bezier(0.34, 1.56, 0.64, 1)",
          }}
        >
          {section.icon}
        </div>

        {/* Title */}
        <h3
          className="text-xl font-bold mb-4"
          style={{
            background: "linear-gradient(135deg, #c4b5fd, #93c5fd)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            backgroundClip: "text",
          }}
        >
          {section.title}
        </h3>

        {/* Content */}
        <ul className="space-y-2">
          {section.content.map((item, i) => (
            <li key={i} className="flex items-start gap-2 text-sm text-gray-300 leading-relaxed">
              <span
                className="mt-1.5 flex-shrink-0 w-1.5 h-1.5 rounded-full"
                style={{
                  background: "linear-gradient(135deg, #8b5cf6, #3b82f6)",
                  boxShadow: "0 0 6px rgba(139,92,246,0.8)",
                }}
              />
              {item}
            </li>
          ))}
        </ul>

        {/* Bottom shimmer line */}
        <div
          className="absolute bottom-0 left-6 right-6 h-px rounded-full"
          style={{
            background: "linear-gradient(90deg, transparent, rgba(139,92,246,0.5), transparent)",
            opacity: isHovered ? 1 : 0,
            transition: "opacity 0.3s",
          }}
        />
      </div>
    </div>
  );
}

function Logo3D() {
  const [angle, setAngle] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setAngle((a) => (a + 1) % 360);
    }, 30);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative inline-flex items-center justify-center">
      {/* Rotating ring */}
      <div
        className="absolute w-24 h-24 rounded-full border-2 border-transparent"
        style={{
          borderTopColor: "rgba(139,92,246,0.8)",
          borderRightColor: "rgba(59,130,246,0.4)",
          animation: "spin 3s linear infinite",
          boxShadow: "0 0 20px rgba(139,92,246,0.4)",
        }}
      />
      <div
        className="absolute w-16 h-16 rounded-full border border-transparent"
        style={{
          borderBottomColor: "rgba(168,85,247,0.8)",
          borderLeftColor: "rgba(99,102,241,0.4)",
          animation: "spin 2s linear infinite reverse",
        }}
      />
      {/* Logo text */}
      <div
        className="text-3xl font-black z-10"
        style={{
          background: "linear-gradient(135deg, #c4b5fd, #93c5fd, #a78bfa)",
          WebkitBackgroundClip: "text",
          WebkitTextFillColor: "transparent",
          backgroundClip: "text",
          textShadow: "none",
          filter: "drop-shadow(0 0 12px rgba(139,92,246,0.8))",
        }}
      >
        =&S
      </div>
    </div>
  );
}

export default function PrivacyPolicy() {
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState(null);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div
      className="min-h-screen relative overflow-x-hidden"
      style={{
        background: "linear-gradient(135deg, #0f0a1e 0%, #0d1224 40%, #0a0f1e 100%)",
        fontFamily: "'Inter', sans-serif",
      }}
    >
      {/* CSS Animations */}
      <style>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px) scale(1); }
          50% { transform: translateY(-30px) scale(1.05); }
        }
        @keyframes particle {
          0%, 100% { transform: translateY(0px) translateX(0px); opacity: 0.2; }
          25% { transform: translateY(-20px) translateX(10px); opacity: 0.6; }
          75% { transform: translateY(10px) translateX(-10px); opacity: 0.3; }
        }
        @keyframes spin {
          to { transform: rotate(360deg); }
        }
        @keyframes shimmer {
          0% { background-position: -200% center; }
          100% { background-position: 200% center; }
        }
        @keyframes pulse-glow {
          0%, 100% { box-shadow: 0 0 20px rgba(139,92,246,0.3); }
          50% { box-shadow: 0 0 40px rgba(139,92,246,0.6), 0 0 80px rgba(139,92,246,0.2); }
        }
        @keyframes gradientShift {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
        @keyframes lineGrow {
          from { transform: scaleX(0); }
          to { transform: scaleX(1); }
        }
      `}</style>

      {/* Particle field */}
      <ParticleField />

      {/* Background orbs */}
      <FloatingOrb
        style={{
          width: 500,
          height: 500,
          top: "-200px",
          left: "-200px",
          background: "radial-gradient(circle, rgba(139,92,246,0.12) 0%, transparent 70%)",
          duration: "8s",
        }}
      />
      <FloatingOrb
        style={{
          width: 400,
          height: 400,
          bottom: "10%",
          right: "-150px",
          background: "radial-gradient(circle, rgba(59,130,246,0.1) 0%, transparent 70%)",
          duration: "10s",
          delay: "2s",
        }}
      />
      <FloatingOrb
        style={{
          width: 300,
          height: 300,
          top: "40%",
          left: "50%",
          background: "radial-gradient(circle, rgba(168,85,247,0.08) 0%, transparent 70%)",
          duration: "7s",
          delay: "4s",
        }}
      />

      {/* Grid pattern overlay */}
      <div
        className="fixed inset-0 pointer-events-none z-0"
        style={{
          backgroundImage: `
            linear-gradient(rgba(139,92,246,0.03) 1px, transparent 1px),
            linear-gradient(90deg, rgba(139,92,246,0.03) 1px, transparent 1px)
          `,
          backgroundSize: "60px 60px",
        }}
      />

      {/* Navbar */}

      {/* Hero Section */}
      <div className="relative z-10 text-center px-6 pt-16 pb-20">
        {/* Badge */}
        <div className="inline-flex items-center gap-2 mb-6">
          <div
            className="px-4 py-2 rounded-full text-xs font-medium text-purple-300 border"
            style={{
              border: "1px solid rgba(139,92,246,0.3)",
              background: "rgba(139,92,246,0.08)",
              animation: "pulse-glow 3s ease-in-out infinite",
            }}
          >
            🔐 Last Updated: May 15, 2026
          </div>
        </div>

        {/* Main title */}
        <h1
          className="text-5xl md:text-7xl font-black mb-6 leading-none"
          style={{
            background:
              "linear-gradient(135deg, #ffffff 0%, #c4b5fd 30%, #93c5fd 60%, #a78bfa 100%)",
            backgroundSize: "200% auto",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            backgroundClip: "text",
            animation: "gradientShift 4s ease infinite",
          }}
        >
          Privacy Policy
        </h1>

        {/* Subtitle */}
        <p className="text-gray-400 text-lg md:text-xl max-w-2xl mx-auto mb-10 leading-relaxed">
          At{" "}
          <span
            className="font-bold"
            style={{
              background: "linear-gradient(135deg, #c4b5fd, #93c5fd)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
            }}
          >
            =&S.com
          </span>
          , your privacy is our priority. We are committed to protecting your personal
          information and being transparent about how we use it.
        </p>

        {/* Animated divider */}
        <div className="flex items-center justify-center gap-4 mb-8">
          <div
            className="h-px w-32 origin-right"
            style={{
              background: "linear-gradient(90deg, transparent, rgba(139,92,246,0.6))",
              animation: "lineGrow 1.5s ease forwards",
            }}
          />
          <div
            className="w-2 h-2 rounded-full"
            style={{
              background: "#8b5cf6",
              boxShadow: "0 0 12px rgba(139,92,246,0.8)",
              animation: "pulse-glow 2s ease-in-out infinite",
            }}
          />
          <div
            className="h-px w-32 origin-left"
            style={{
              background: "linear-gradient(90deg, rgba(139,92,246,0.6), transparent)",
              animation: "lineGrow 1.5s ease forwards",
            }}
          />
        </div>

        {/* Stats row */}
        <div className="flex flex-wrap justify-center gap-6 mt-4">
          {[
            { label: "Sections", value: "8" },
            { label: "GDPR Compliant", value: "✓" },
            { label: "Data Encrypted", value: "✓" },
            { label: "No Data Selling", value: "✓" },
          ].map((stat, i) => (
            <div
              key={i}
              className="px-5 py-3 rounded-xl text-center"
              style={{
                background: "rgba(255,255,255,0.04)",
                border: "1px solid rgba(255,255,255,0.08)",
                backdropFilter: "blur(8px)",
                animation: `float 6s ease-in-out infinite`,
                animationDelay: `${i * 0.5}s`,
              }}
            >
              <div
                className="text-xl font-bold"
                style={{
                  background: "linear-gradient(135deg, #c4b5fd, #93c5fd)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                }}
              >
                {stat.value}
              </div>
              <div className="text-xs text-gray-500 mt-1">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Policy Grid */}
      <div className="relative z-10 max-w-6xl mx-auto px-6 pb-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">
          {sections.map((section, index) => (
            <PolicyCard key={index} section={section} index={index} />
          ))}
        </div>
      </div>

      {/* Contact Section */}
      <div className="relative z-10 max-w-3xl mx-auto px-6 pb-24 text-center">
        <div
          className="rounded-3xl p-10 relative overflow-hidden"
          style={{
            background: "rgba(255,255,255,0.03)",
            border: "1px solid rgba(139,92,246,0.2)",
            backdropFilter: "blur(20px)",
            boxShadow: "0 0 60px rgba(139,92,246,0.1), inset 0 1px 0 rgba(255,255,255,0.08)",
          }}
        >
          {/* Inner glow */}

        
        
        
        
        
        
        
        
        
        
        
        
        
        
        </div>
      </div>

      {/* Footer */}
    </div>
  );
}