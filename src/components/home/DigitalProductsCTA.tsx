"use client";

import { motion } from "framer-motion";
import { ArrowRight, Sparkles, ShoppingBag } from "lucide-react";
import Link from "next/link";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";

export default function DigitalProductsCTA() {
  const ctaRef = useRef<HTMLElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    
    if (ctaRef.current) {
      const ctx = gsap.context(() => {
        gsap.from(".cta-content", {
          scrollTrigger: { trigger: ctaRef.current, start: "top 80%", once: true },
          y: 30,
          opacity: 0,
          duration: 0.8,
          ease: "power3.out",
        });
      }, ctaRef);
      return () => ctx.revert();
    }
  }, []);

  return (
    <section id="store" ref={ctaRef} className="py-24 relative overflow-hidden">
      {/* Background Gradients */}
      <div className="absolute inset-0 bg-[#030510]"></div>
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] bg-primary/10 rounded-full blur-[100px] pointer-events-none"></div>

      <div className="container mx-auto px-6 max-w-7xl relative z-10">
        <div className="cta-content glass rounded-[2.5rem] border border-white/10 p-10 md:p-16 lg:p-20 overflow-hidden relative shadow-[0_0_50px_rgba(110,86,207,0.15)] flex flex-col md:flex-row items-center justify-between gap-12">
          
          {/* Abstract decor inside the card */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-accent/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/3"></div>
          
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/5 border border-white/10 mb-6">
              <Sparkles className="w-4 h-4 text-accent" />
              <span className="text-xs font-medium text-white/90 uppercase tracking-wider">Premium Assets</span>
            </div>
            
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-heading font-bold text-white mb-6 leading-tight">
              Scale faster with our <span className="text-gradient">Digital Products</span>
            </h2>
            
            <p className="text-subtext text-lg leading-relaxed mb-0">
              Access our exclusive library of professionally crafted templates, UI kits, marketing planners, and business automation workflows. Designed by experts to save you hundreds of hours.
            </p>
          </div>

          <div className="shrink-0">
            <Link 
              href="/products" 
              className="group inline-flex flex-col items-center justify-center p-8 rounded-3xl bg-gradient-to-br from-primary/20 to-accent/20 border border-white/10 hover:border-primary/50 transition-all duration-300 hover:shadow-[0_0_30px_rgba(110,86,207,0.3)] backdrop-blur-md relative overflow-hidden"
            >
              <div className="absolute inset-0 bg-gradient-to-tr from-primary to-accent opacity-0 group-hover:opacity-20 transition-opacity duration-300"></div>
              
              <div className="w-16 h-16 rounded-full bg-white/10 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                <ShoppingBag className="w-8 h-8 text-white" />
              </div>
              
              <span className="text-xl font-bold text-white mb-2">Explore Store</span>
              <span className="flex items-center gap-2 text-sm text-white/70 group-hover:text-white transition-colors">
                View all products <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </span>
            </Link>
          </div>
          
        </div>
      </div>
    </section>
  );
}
