"use client";

import { useRef, useEffect } from "react";
import { motion } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
import { ArrowRight, CheckCircle2, TrendingUp, Users, Award } from "lucide-react";
import Link from "next/link";

export default function AboutDigitexa() {
  const sectionRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    
    if (sectionRef.current) {
      const ctx = gsap.context(() => {
        gsap.from(".about-content", {
          scrollTrigger: { trigger: sectionRef.current, start: "top 80%", once: true },
          y: 50,
          opacity: 0,
          duration: 1,
          stagger: 0.15,
          ease: "power3.out",
        });
        
        gsap.from(".about-img-large", {
          scrollTrigger: { trigger: sectionRef.current, start: "top 80%" , once: true },
          scale: 0.9, opacity: 0, duration: 1.2, ease: "power3.out",
        });
        
        gsap.from(".about-img-small-1", {
          scrollTrigger: { trigger: sectionRef.current, start: "top 75%" , once: true },
          x: -40, opacity: 0, duration: 1, ease: "power3.out", delay: 0.3
        });
        
        gsap.from(".about-img-small-2", {
          scrollTrigger: { trigger: sectionRef.current, start: "top 70%" , once: true },
          y: 40, opacity: 0, duration: 1, ease: "power3.out", delay: 0.6
        });
      }, sectionRef);
      return () => ctx.revert();
    }
  }, []);

  return (
    <section ref={sectionRef} className="py-24 md:py-32 relative overflow-hidden bg-background">
      <div className="absolute left-0 top-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-primary/10 rounded-full blur-[150px] transform-gpu transform-gpu mix-blend-screen opacity-50"></div>
      
      <div className="container mx-auto px-6 max-w-7xl relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
          
          {/* Content */}
          <div className="order-2 lg:order-1">
            <div className="about-content inline-flex items-center gap-2 px-4 py-2 rounded-full glass mb-6">
              <span className="w-2 h-2 rounded-full bg-accent"></span>
              <span className="text-sm font-medium text-white/90 uppercase tracking-wider">About Digitexa</span>
            </div>
            
            <h2 className="about-content text-4xl md:text-5xl lg:text-6xl font-heading font-bold text-white mb-6 leading-[1.1]">
              We are a next-gen <br/> <span className="text-gradient">AI-powered</span> digital agency.
            </h2>
            
            <p className="about-content text-subtext text-lg mb-8 leading-relaxed max-w-lg">
              Digitexa helps startups, enterprises, and eCommerce brands scale through performance marketing, SEO, web development, and AI-driven growth strategies. We turn complex data into measurable business results.
            </p>
            
            <div className="about-content grid grid-cols-1 sm:grid-cols-2 gap-5 mb-10">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center shrink-0">
                  <CheckCircle2 className="text-primary w-4 h-4" />
                </div>
                <span className="text-white font-medium">Data-Driven Growth</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center shrink-0">
                  <CheckCircle2 className="text-primary w-4 h-4" />
                </div>
                <span className="text-white font-medium">AI Automation</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center shrink-0">
                  <CheckCircle2 className="text-primary w-4 h-4" />
                </div>
                <span className="text-white font-medium">Performance Marketing</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center shrink-0">
                  <CheckCircle2 className="text-primary w-4 h-4" />
                </div>
                <span className="text-white font-medium">Global Reach</span>
              </div>
            </div>
            
            <Link href="/about" className="about-content px-8 py-4 rounded-full bg-white/10 hover:bg-white/20 text-white font-semibold transition-all inline-flex items-center gap-2 border border-white/10 group">
              Discover Our Story
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
          
          {/* Asymmetrical Visual Collage */}
          <div className="order-1 lg:order-2 relative h-[500px] md:h-[650px] w-full mt-10 lg:mt-0">
            {/* Main Large Image */}
            <div className="about-img-large absolute top-0 right-0 w-[80%] h-[75%] rounded-3xl overflow-hidden glass border border-white/10 shadow-2xl z-10">
               <img loading="lazy" decoding="async" src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?q=80&w=2000&auto=format&fit=crop" alt="Creative Team" className="w-full h-full object-cover opacity-90" />
               <div className="absolute inset-0 bg-gradient-to-tr from-background/80 via-transparent to-transparent"></div>
            </div>

            {/* Small Overlapping Image 1 (Left Middle) */}
            <div className="about-img-small-1 absolute top-[30%] left-0 w-[45%] h-[40%] rounded-2xl overflow-hidden glass border-4 border-background shadow-2xl z-20">
               <img loading="lazy" decoding="async" src="https://images.unsplash.com/photo-1497366216548-37526070297c?q=80&w=1000&auto=format&fit=crop" alt="Modern Office" className="w-full h-full object-cover opacity-90" />
            </div>

            {/* Small Overlapping Image 2 (Bottom Right) */}
            <div className="about-img-small-2 absolute bottom-0 right-[10%] w-[50%] h-[40%] rounded-2xl overflow-hidden glass border-4 border-background shadow-2xl z-30">
               <img loading="lazy" decoding="async" src="https://images.unsplash.com/photo-1542744173-8e7e53415bb0?q=80&w=1000&auto=format&fit=crop" alt="Team Meeting" className="w-full h-full object-cover opacity-90" />
            </div>
            
            {/* Floating Experience Badge */}
            <motion.div 
              animate={{ y: [0, -15, 0] }} 
              transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
              className="absolute -top-6 right-[20%] z-40 glass p-4 rounded-xl border border-white/10 shadow-xl flex items-center gap-3 backdrop-blur-xl"
            >
              <div className="w-10 h-10 rounded-full bg-accent/20 flex items-center justify-center">
                <Award className="text-accent w-5 h-5" />
              </div>
              <div>
                <div className="text-xl font-bold text-white">10+ Years</div>
                <div className="text-xs text-subtext">Industry Experience</div>
              </div>
            </motion.div>

            {/* Floating Stats Badge */}
            <motion.div 
              animate={{ y: [0, 10, 0] }} 
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", delay: 1 }}
              className="absolute bottom-10 -left-6 z-40 glass p-5 rounded-2xl border border-white/10 shadow-2xl backdrop-blur-xl"
            >
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center">
                  <TrendingUp className="text-primary w-6 h-6" />
                </div>
                <div>
                  <div className="text-3xl font-bold text-white">300+</div>
                  <div className="text-sm text-subtext">Brands Scaled</div>
                </div>
              </div>
            </motion.div>
          </div>
          
        </div>
      </div>
    </section>
  );
}
