import { Icon, Icons } from "../icons";

export const plans = [
  {
    name: "Basic", price: "999", featured: false,
    features: ["5-Page Website", "Responsive Design", "1 Month Support", "Basic SEO Setup", "Contact Form", "2 Revisions"],
  },
  {
    name: "Standard", price: "2,499", featured: true,
    features: ["15-Page Website", "Custom Software Module", "3 Months Support", "Full SEO Package", "CMS Integration", "AI Chatbot", "Unlimited Revisions"],
  },
  {
    name: "Premium", price: "4,999", featured: false,
    features: ["Unlimited Pages", "Full Software Suite", "12 Months Support", "Enterprise SEO", "AI Automation Suite", "Custom AI Agents", "Priority Support", "Dedicated Manager"],
  },
];

export default function Pricing() {
  return (
    <section id="pricing" className="py-[100px] px-[5%] bg-[#111118]">
      <div className="max-w-[1200px] mx-auto">

        {/* Header */}
        <div className="text-center">
          <div className="fade-in inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full mx-auto mb-5
            bg-[rgba(108,99,255,0.1)] text-[#6C63FF] text-xs font-semibold tracking-[0.08em]
            uppercase border border-[rgba(108,99,255,0.2)]">
            Pricing
          </div>
          <h2 className="fade-in fade-in-delay-1 font-display text-[clamp(32px,4vw,56px)]
            font-extrabold leading-[1.1] mb-5">
            Simple, <span className="grad-text">Transparent</span> Pricing
          </h2>
          <p className="fade-in fade-in-delay-2 text-lg text-text2 max-w-[600px] mx-auto leading-[1.7]">
            No hidden fees. Choose the plan that fits your needs and scale anytime.
          </p>
        </div>

        {/* Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-16">
          {plans.map((p, i) => (
            <div
              key={p.name}
              className={`fade-in fade-in-delay-${i + 1}
                relative overflow-hidden rounded-2xl px-8 py-10
                transition-all duration-300 hover:-translate-y-1.5 hover:shadow-[0_30px_60px_rgba(0,0,0,0.2)]
                ${p.featured
                  ? "border border-[#6C63FF] bg-[linear-gradient(180deg,rgba(108,99,255,0.1)_0%,#16161f_100%)]"
                  : "border border-white/[0.08] bg-[#16161f]"
                }`}
            >
              {/* Most Popular ribbon */}
              {p.featured && (
                <div className="absolute top-4 -right-7 grad-bg text-white text-[11px] font-bold
                  px-10 py-1 rotate-[35deg] tracking-[0.06em]">
                  Most Popular
                </div>
              )}

              <div className="text-sm font-semibold uppercase tracking-[0.08em] text-text2 mb-3">
                {p.name}
              </div>

              <div className="flex items-end gap-1 mb-2">
                <span className="font-display text-2xl font-bold text-text2 pb-2">$</span>
                <span className="font-display text-[56px] font-extrabold leading-none grad-text">{p.price}</span>
              </div>
              <div className="text-sm text-text2 mb-7">Starting price / project</div>

              <ul className="flex flex-col gap-3 mb-8 border-t border-white/[0.08] pt-7 list-none">
                {p.features.map((f) => (
                  <li key={f} className="flex items-center gap-2.5 text-sm text-text2">
                    <Icon d={Icons.check} size={18} color="#00D4AA" strokeWidth={2.5} />
                    {f}
                  </li>
                ))}
              </ul>

              <a
                href="#contact"
                className={`w-full flex justify-center items-center px-7 py-3.5 rounded-[10px]
                  text-[15px] font-semibold no-underline transition-all duration-300
                  hover:opacity-85 hover:-translate-y-0.5
                  ${p.featured
                    ? "grad-bg text-white"
                    : "bg-white/[0.07] text-[#f0f0f8] border border-white/20 hover:border-[#6C63FF]"
                  }`}
              >
                Get Started
              </a>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
