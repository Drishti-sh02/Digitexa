"use client";

import { useRef, useEffect } from "react";
import { motion } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
import { BrainCircuit, Users, BarChart4, Zap, Target, Palette, Award, Headset } from "lucide-react";

const features = [
  { icon: BrainCircuit, title: "AI-Powered Strategies", desc: "We leverage advanced AI models to optimize campaigns and predict market trends in real-time." },
  { icon: Users, title: "Dedicated Experts", desc: "Your brand gets a dedicated team of certified marketing specialists focused solely on your growth." },
  { icon: BarChart4, title: "Real-Time Reporting", desc: "Transparent, live dashboards so you always know exactly how your campaigns are performing." },
  { icon: Zap, title: "Fast Execution", desc: "Agile methodologies ensure rapid deployment of campaigns to capture market opportunities immediately." },
  { icon: Target, title: "ROI-Focused Campaigns", desc: "Every strategy we deploy is strictly measured against return on investment and bottom-line growth." },
  { icon: Palette, title: "Creative Branding", desc: "World-class visual storytelling that elevates your brand identity and captivates your target audience." },
  { icon: Award, title: "Certified Professionals", desc: "Our team holds premier certifications from Google, Meta, HubSpot, and other industry leaders." },
  { icon: Headset, title: "24×7 Support", desc: "Round-the-clock monitoring and dedicated support to ensure your marketing engine never sleeps." },
];

export default function WhyChooseUs() {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    
    if (sectionRef.current) {
      const ctx = gsap.context(() => {
        gsap.from(".feature-card", {
          scrollTrigger: { trigger: sectionRef.current, start: "top 75%", once: true },
          y: 40,
          opacity: 0,
          duration: 0.8,
          stagger: 0.1,
          ease: "power2.out",
        });
      }, sectionRef);
      return () => ctx.revert();
    }
  }, []);

  return (
    <section ref={sectionRef} className="py-24 relative overflow-hidden bg-background border-t border-white/5">
      <div className="container mx-auto px-6 max-w-7xl relative z-10">
        
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl md:text-5xl font-heading font-bold text-white mb-6">
            Why Choose Digitexa
          </h2>
          <p className="text-subtext text-lg">
            We don't just run ads; we engineer scalable growth engines. Here's why leading brands trust us with their digital presence.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, idx) => (
            <motion.div
              key={idx}
              whileHover={{ y: -5 }}
              className="feature-card glass p-8 rounded-2xl border border-white/10 hover:border-primary/50 transition-colors group cursor-default"
            >
              <div className="w-14 h-14 rounded-xl bg-white/5 flex items-center justify-center mb-6 group-hover:bg-primary/20 transition-colors">
                <feature.icon className="w-7 h-7 text-primary" />
              </div>
              <h3 className="text-xl font-bold text-white mb-3 font-heading">{feature.title}</h3>
              <p className="text-subtext text-sm leading-relaxed">
                {feature.desc}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
