"use client";

import { useRef, useEffect } from "react";
import { motion } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
import { HeartPulse, Building2, GraduationCap, Landmark, Scale, Utensils, Plane, Car, Shirt, Laptop, Cloud, Factory } from "lucide-react";

const industries = [
  { name: "Healthcare", icon: HeartPulse },
  { name: "Real Estate", icon: Building2 },
  { name: "Education", icon: GraduationCap },
  { name: "Finance", icon: Landmark },
  { name: "Legal", icon: Scale },
  { name: "Restaurants", icon: Utensils },
  { name: "Travel", icon: Plane },
  { name: "Automotive", icon: Car },
  { name: "Fashion", icon: Shirt },
  { name: "Technology", icon: Laptop },
  { name: "SaaS", icon: Cloud },
  { name: "Manufacturing", icon: Factory },
];

export default function IndustriesWeServe() {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    
    if (sectionRef.current) {
      const ctx = gsap.context(() => {
        gsap.from(".industry-card", {
          scrollTrigger: { trigger: sectionRef.current, start: "top 80%", once: true },
          scale: 0.9,
          opacity: 0,
          duration: 0.5,
          stagger: 0.05,
          ease: "power2.out",
        });
      }, sectionRef);
      return () => ctx.revert();
    }
  }, []);

  return (
    <section ref={sectionRef} className="py-24 relative overflow-hidden bg-[#030510]">
      <div className="container mx-auto px-6 max-w-7xl relative z-10">
        
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl md:text-5xl font-heading font-bold text-white mb-6">
            Industries We Serve
          </h2>
          <p className="text-subtext text-lg">
            We adapt our proven growth methodologies to the unique challenges and opportunities of your specific vertical.
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {industries.map((ind, idx) => (
            <motion.div
              key={idx}
              whileHover={{ y: -5 }}
              className="industry-card group glass border border-white/10 rounded-2xl p-6 flex flex-col items-center justify-center text-center hover:border-primary/50 hover:bg-white/5 transition-colors cursor-pointer"
            >
              <div className="w-12 h-12 rounded-full bg-white/5 flex items-center justify-center mb-4 group-hover:bg-primary group-hover:shadow-[0_0_15px_rgba(109,94,247,0.5)] transition-all">
                <ind.icon className="w-5 h-5 text-white/70 group-hover:text-white transition-colors" />
              </div>
              <h3 className="text-sm font-medium text-white/90">{ind.name}</h3>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
