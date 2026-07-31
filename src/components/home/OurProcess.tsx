"use client";

import { useRef, useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
import { ChevronDown, Search, Lightbulb, PenTool, Code2, Rocket, Settings, TrendingUp } from "lucide-react";

const processSteps = [
  { id: 1, title: "Discovery", icon: Search, desc: "We dive deep into your brand, understanding your goals, target audience, and current market positioning to establish a baseline for growth." },
  { id: 2, title: "Research", icon: Lightbulb, desc: "Comprehensive competitive analysis and market research to identify untapped opportunities and craft a data-backed approach." },
  { id: 3, title: "Strategy", icon: Target, desc: "Developing a robust, multi-channel roadmap tailored to your specific objectives, ensuring every marketing dollar is optimized." },
  { id: 4, title: "Design", icon: PenTool, desc: "Creating world-class visual assets and intuitive UI/UX that captures attention and builds immediate trust with your audience." },
  { id: 5, title: "Development", icon: Code2, desc: "Engineering fast, scalable, and secure digital platforms that serve as the foundation for your marketing campaigns." },
  { id: 6, title: "Marketing", icon: Rocket, desc: "Executing high-performance campaigns across SEO, PPC, and Social Media to drive highly qualified traffic to your assets." },
  { id: 7, title: "Optimization", icon: Settings, desc: "Continuous A/B testing and data analysis to refine campaigns, lower acquisition costs, and maximize conversion rates." },
  { id: 8, title: "Scaling", icon: TrendingUp, desc: "Leveraging AI and automation to exponentially scale winning campaigns and drive long-term, sustainable revenue growth." },
];

// Reusable Target icon since it wasn't imported from lucide
function Target(props: any) {
  return <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><circle cx="12" cy="12" r="10"/><circle cx="12" cy="12" r="6"/><circle cx="12" cy="12" r="2"/></svg>;
}

export default function OurProcess() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [activeStep, setActiveStep] = useState<number | null>(1);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    
    if (sectionRef.current) {
      const ctx = gsap.context(() => {
        gsap.from(".process-header", {
          scrollTrigger: { trigger: sectionRef.current, start: "top 75%" , once: true },
          y: 30, opacity: 0, duration: 0.8
        });
        gsap.from(".process-step", {
          scrollTrigger: { trigger: sectionRef.current, start: "top 60%" , once: true },
          x: -30, opacity: 0, duration: 0.6, stagger: 0.1
        });
      }, sectionRef);
      return () => ctx.revert();
    }
  }, []);

  return (
    <section ref={sectionRef} className="py-24 relative bg-[#050816]">
      <div className="container mx-auto px-6 max-w-4xl relative z-10">
        
        <div className="text-center mb-16 process-header">
          <h2 className="text-3xl md:text-5xl font-heading font-bold text-white mb-6">
            Our Proven Process
          </h2>
          <p className="text-subtext text-lg">
            A systematic, data-driven approach to predictable growth. We leave nothing to chance.
          </p>
        </div>

        <div className="relative border-l border-white/10 ml-6 md:ml-12 space-y-4 pb-8">
          {processSteps.map((step, idx) => {
            const isActive = activeStep === step.id;
            return (
              <div 
                key={step.id} 
                className="process-step relative pl-8 md:pl-12 cursor-pointer group"
                onClick={() => setActiveStep(isActive ? null : step.id)}
              >
                {/* Timeline Dot */}
                <div className={`absolute -left-[21px] top-4 w-10 h-10 rounded-full border-4 border-background flex items-center justify-center transition-colors duration-300 ${isActive ? 'bg-primary' : 'bg-white/10 group-hover:bg-white/20'}`}>
                  <step.icon className={`w-4 h-4 ${isActive ? 'text-white' : 'text-subtext group-hover:text-white'}`} />
                </div>
                
                <div className={`glass p-6 rounded-2xl border transition-all duration-300 ${isActive ? 'border-primary/50 shadow-[0_0_20px_rgba(109,94,247,0.15)]' : 'border-white/5 hover:border-white/20'}`}>
                  <div className="flex items-center justify-between">
                    <h3 className={`text-xl font-bold font-heading transition-colors ${isActive ? 'text-primary' : 'text-white group-hover:text-primary/80'}`}>
                      {step.id}. {step.title}
                    </h3>
                    <ChevronDown className={`w-5 h-5 text-subtext transition-transform duration-300 ${isActive ? 'rotate-180' : ''}`} />
                  </div>
                  
                  <AnimatePresence>
                    {isActive && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        className="overflow-hidden"
                      >
                        <p className="text-subtext text-sm leading-relaxed mt-4 pt-4 border-t border-white/10">
                          {step.desc}
                        </p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </div>
            );
          })}
        </div>
        
      </div>
    </section>
  );
}
