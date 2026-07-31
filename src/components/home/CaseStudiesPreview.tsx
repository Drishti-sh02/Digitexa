"use client";

import { useRef, useEffect } from "react";
import { motion } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
import { ArrowRight, BarChart, TrendingUp, DollarSign, Users } from "lucide-react";
import Link from "next/link";

export default function CaseStudiesPreview() {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    
    if (sectionRef.current) {
      const ctx = gsap.context(() => {
        gsap.from(".cs-text-content", {
          scrollTrigger: { trigger: sectionRef.current, start: "top 75%", once: true },
          x: -50,
          opacity: 0,
          duration: 1,
          ease: "power3.out",
        });

        gsap.from(".cs-visual-content", {
          scrollTrigger: { trigger: sectionRef.current, start: "top 75%", once: true },
          scale: 0.9,
          opacity: 0,
          duration: 1.2,
          ease: "power3.out",
        });

        gsap.from(".cs-widget", {
          scrollTrigger: { trigger: sectionRef.current, start: "top 60%", once: true },
          y: 30,
          opacity: 0,
          duration: 0.8,
          stagger: 0.2,
          ease: "back.out(1.5)",
        });
      }, sectionRef);
      return () => ctx.revert();
    }
  }, []);

  return (
    <section id="case-studies" ref={sectionRef} className="py-24 md:py-32 relative overflow-hidden bg-[#030510] border-t border-white/5 scroll-mt-24">
      <div className="container mx-auto px-6 max-w-7xl relative z-10">
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          
          {/* Left Text Content */}
          <div className="cs-text-content">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass mb-6">
              <span className="w-2 h-2 rounded-full bg-accent"></span>
              <span className="text-sm font-medium text-white/90 uppercase tracking-wider">Proven Results</span>
            </div>

            <h2 className="text-4xl md:text-5xl lg:text-6xl font-heading font-bold text-white mb-6 leading-[1.1]">
              We build growth engines that <span className="text-gradient">compound.</span>
            </h2>
            
            <p className="text-subtext text-lg mb-10 max-w-lg leading-relaxed">
              Don't just take our word for it. See exactly how our data-driven frameworks have helped ambitious startups and established enterprises shatter their revenue goals.
            </p>

            <div className="space-y-6 mb-10 border-l-2 border-white/10 pl-6">
              <div>
                <h4 className="text-2xl font-bold text-white mb-1">PayFlow FinTech</h4>
                <p className="text-subtext">Scaled to $10M ARR in 12 months via integrated SEO & Meta Ads.</p>
              </div>
              <div>
                <h4 className="text-2xl font-bold text-white mb-1">Luxe & Co eCommerce</h4>
                <p className="text-subtext">Achieved 5.2x ROAS and reduced CAC by 45% using AI automation.</p>
              </div>
            </div>

            <Link href="/case-studies" className="px-8 py-4 rounded-full bg-primary text-white font-semibold hover:bg-secondary transition-all inline-flex items-center gap-2 group">
              View Complete Case Studies
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>

          {/* Right Visual Dashboard Composition */}
          <div className="cs-visual-content relative h-[500px] md:h-[600px] w-full mt-10 lg:mt-0 perspective-[1000px]">
             
             {/* Main Dashboard Image */}
             <div className="absolute inset-0 right-8 top-8 bottom-8 left-8 rounded-3xl overflow-hidden glass border border-white/10 shadow-2xl rotate-y-[-5deg] rotate-x-[5deg] transform-gpu">
               <img loading="lazy" decoding="async" 
                 src="https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=2000&auto=format&fit=crop" 
                 alt="Analytics Dashboard" 
                 className="w-full h-full object-cover opacity-60"
               />
               <div className="absolute inset-0 bg-gradient-to-tr from-background via-transparent to-transparent"></div>
             </div>

             {/* Floating KPI Widget 1: Revenue Growth */}
             <motion.div 
               animate={{ y: [-15, 15, -15] }} 
               transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
               className="cs-widget absolute top-10 -left-6 z-20 glass p-5 rounded-2xl border border-white/10 shadow-2xl backdrop-blur-xl w-64"
             >
               <div className="flex items-center gap-4 mb-4">
                 <div className="w-10 h-10 rounded-full bg-green-500/20 flex items-center justify-center">
                   <DollarSign className="text-green-400 w-5 h-5" />
                 </div>
                 <div>
                   <div className="text-xs text-subtext">Monthly Revenue</div>
                   <div className="text-xl font-bold text-white">$1.24M</div>
                 </div>
               </div>
               {/* Sparkline */}
               <svg className="w-full h-12" viewBox="0 0 100 30">
                 <path d="M0 25 Q 10 20, 20 25 T 40 15 T 60 20 T 80 5 T 100 10" fill="none" stroke="#22c55e" strokeWidth="2" strokeLinecap="round" />
                 <path d="M0 25 Q 10 20, 20 25 T 40 15 T 60 20 T 80 5 T 100 10 L 100 30 L 0 30 Z" fill="url(#green-gradient)" opacity="0.2" />
                 <defs>
                   <linearGradient id="green-gradient" x1="0" y1="0" x2="0" y2="1">
                     <stop offset="0%" stopColor="#22c55e" />
                     <stop offset="100%" stopColor="transparent" />
                   </linearGradient>
                 </defs>
               </svg>
             </motion.div>

             {/* Floating KPI Widget 2: Active Users */}
             <motion.div 
               animate={{ y: [10, -10, 10] }} 
               transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
               className="cs-widget absolute bottom-20 -right-6 z-30 glass p-5 rounded-2xl border border-white/10 shadow-2xl backdrop-blur-xl w-60"
             >
               <div className="flex justify-between items-center mb-3">
                  <div className="text-xs font-bold text-white uppercase tracking-wider">Active Users</div>
                  <span className="text-xs font-bold text-accent">+32%</span>
               </div>
               <div className="text-3xl font-heading font-bold text-white mb-2">48,205</div>
               <div className="flex items-end gap-1 h-10">
                 {[30, 45, 25, 60, 40, 75, 55, 90, 80, 100].map((h, i) => (
                   <div key={i} className="w-full bg-accent/80 rounded-t-sm" style={{ height: `${h}%` }}></div>
                 ))}
               </div>
             </motion.div>

             {/* Floating Client Logo Grid Overlay */}
             <div className="cs-widget absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-10 w-48 h-48 rounded-full border border-white/5 bg-background/40 backdrop-blur-sm flex flex-col items-center justify-center gap-4">
                <Users className="w-8 h-8 text-white/50" />
                <div className="text-center">
                  <div className="text-2xl font-bold text-white">4.9/5</div>
                  <div className="text-xs text-subtext">Client Satisfaction</div>
                </div>
             </div>

          </div>
          
        </div>
      </div>
    </section>
  );
}
