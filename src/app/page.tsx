"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, BarChart3, Rocket, Target, Zap } from "lucide-react";
import gsap from "gsap";
import AboutDigitexa from "@/components/home/AboutDigitexa";
import DigitalProductsCTA from "@/components/home/DigitalProductsCTA";
import FeaturedServices from "@/components/home/FeaturedServices";
import OurProcess from "@/components/home/OurProcess";
import CaseStudiesPreview from "@/components/home/CaseStudiesPreview";
import IndustriesWeServe from "@/components/home/IndustriesWeServe";
import TestimonialsSlider from "@/components/home/TestimonialsSlider";
import HomeBlogFAQ from "@/components/home/HomeBlogFAQ";
import ContactCTA from "@/components/home/ContactCTA";
import { useConsultationModal } from "@/context/ConsultationModalContext";

export default function Home() {
  const heroRef = useRef<HTMLDivElement>(null);
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const { openModal } = useConsultationModal();

  useEffect(() => {
    if (!headlineRef.current) return;
    const ctx = gsap.context(() => {
      gsap.from(".hero-element", {
        y: 30,
        opacity: 0,
        duration: 1,
        stagger: 0.15,
        ease: "power3.out",
      });
      gsap.from(".hero-image-wrap", {
        scale: 0.95,
        opacity: 0,
        duration: 1.5,
        ease: "power2.out",
        delay: 0.3
      });
      gsap.from(".floating-card-1", {
        y: -30, opacity: 0, duration: 1.2, ease: "back.out(1.5)", delay: 0.8
      });
      gsap.from(".floating-card-2", {
        y: 30, opacity: 0, duration: 1.2, ease: "back.out(1.5)", delay: 1
      });
    }, heroRef);
    return () => ctx.revert();
  }, []);

  return (
    <div className="flex flex-col w-full">
      {/* Hero Section */}
      <section ref={heroRef} className="relative min-h-[90vh] flex items-center pt-24 pb-20 overflow-hidden">
        {/* Animated Background */}
        <div className="absolute inset-0 z-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-primary/20 via-background to-background"></div>
        <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-primary/20 rounded-full blur-[150px] transform-gpu transform-gpu mix-blend-screen opacity-60 animate-pulse"></div>

        <div className="container mx-auto px-6 max-w-7xl relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            
            {/* Left Content */}
            <div className="flex flex-col items-start text-left">
              <h1 ref={headlineRef} className="hero-element text-5xl md:text-7xl font-heading font-bold tracking-tight text-white mb-6 leading-[1.1]">
                Accelerating Brands Through <span className="text-gradient">Intelligent</span> Marketing.
              </h1>

              <p className="hero-element text-lg md:text-xl text-subtext max-w-xl mb-10 leading-relaxed">
                We combine premium visual storytelling with data-driven performance marketing to turn visitors into loyal customers and scale your revenue.
              </p>

              <div className="hero-element flex flex-col sm:flex-row items-center gap-4">
                <button
                  onClick={openModal}
                  className="px-8 py-4 rounded-full bg-primary text-white font-semibold hover:bg-secondary transition-all shadow-[0_0_20px_rgba(109,94,247,0.3)] hover:shadow-[0_0_40px_rgba(109,94,247,0.6)] flex items-center gap-2"
                >
                  Book Free Consultation
                  <ArrowRight className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Right Visual Composition */}
            <div className="relative h-[600px] w-full hidden lg:block perspective-[1000px]">
               <div className="hero-image-wrap absolute inset-0 right-10 top-10 bottom-10 left-10 rounded-3xl overflow-hidden border border-white/10 shadow-2xl">
                 <img fetchPriority="high" decoding="async" 
                   src="https://images.unsplash.com/photo-1600880292203-757bb62b4baf?q=80&w=2000&auto=format&fit=crop" 
                   alt="Digital Marketing Team" 
                   className="w-full h-full object-cover opacity-80"
                 />
                 <div className="absolute inset-0 bg-gradient-to-t from-[#050816] via-transparent to-transparent"></div>
               </div>

               {/* Floating KPI Card 1 (Top Left) */}
               <motion.div 
                 animate={{ y: [-10, 10, -10] }} 
                 transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
                 className="floating-card-1 absolute top-20 -left-10 glass p-5 rounded-2xl border border-white/10 shadow-2xl backdrop-blur-xl w-64"
               >
                 <div className="flex items-center justify-between mb-4">
                   <span className="text-sm font-medium text-white/70">Organic Traffic</span>
                   <span className="px-2 py-1 rounded-md bg-green-500/20 text-green-400 text-xs font-bold">+124%</span>
                 </div>
                 <div className="flex items-end gap-2 h-16">
                   {[40, 60, 45, 80, 50, 90, 70, 100].map((h, i) => (
                     <div key={i} className="flex-1 bg-gradient-to-t from-primary/80 to-accent/80 rounded-sm" style={{ height: `${h}%` }}></div>
                   ))}
                 </div>
               </motion.div>

               {/* Floating KPI Card 2 (Bottom Right) */}
               <motion.div 
                 animate={{ y: [10, -10, 10] }} 
                 transition={{ duration: 6, repeat: Infinity, ease: "easeInOut", delay: 1 }}
                 className="floating-card-2 absolute bottom-20 -right-10 glass p-5 rounded-2xl border border-white/10 shadow-2xl backdrop-blur-xl w-72 flex items-center gap-4"
               >
                 <div className="w-14 h-14 rounded-full bg-accent/20 flex items-center justify-center shrink-0">
                   <Target className="w-7 h-7 text-accent" />
                 </div>
                 <div>
                   <div className="text-2xl font-bold text-white mb-1">5.2x ROAS</div>
                   <div className="text-xs text-subtext leading-tight">Average return on ad spend across campaigns</div>
                 </div>
               </motion.div>
            </div>
            
          </div>
        </div>
      </section>

      {/* Trusted By Marquee */}
      <section className="py-12 border-y border-white/10 bg-white/[0.02] overflow-hidden flex items-center">
        <div className="container mx-auto px-6 max-w-7xl flex items-center gap-8">
          <p className="text-subtext text-xs font-bold uppercase tracking-widest whitespace-nowrap shrink-0">
            Trusted By
          </p>
          
          <div className="relative flex overflow-x-hidden w-full mask-image-gradient">
            <motion.div 
              animate={{ x: ["0%", "-50%"] }} 
              transition={{ duration: 25, ease: "linear", repeat: Infinity }}
              className="flex items-center gap-16 whitespace-nowrap opacity-50 hover:opacity-100 transition-opacity"
            >
               {/* Original Set */}
               <img loading="lazy" decoding="async" src="https://upload.wikimedia.org/wikipedia/commons/2/2f/Google_2015_logo.svg" className="h-8 grayscale hover:grayscale-0 transition-all filter brightness-0 invert" alt="Google" />
               <img loading="lazy" decoding="async" src="https://upload.wikimedia.org/wikipedia/commons/7/7b/Meta_Platforms_Inc._logo.svg" className="h-6 grayscale hover:grayscale-0 transition-all filter brightness-0 invert" alt="Meta" />
               <img loading="lazy" decoding="async" src="https://upload.wikimedia.org/wikipedia/commons/0/0e/Shopify_logo_2018.svg" className="h-8 grayscale hover:grayscale-0 transition-all filter brightness-0 invert" alt="Shopify" />
               <img loading="lazy" decoding="async" src="https://upload.wikimedia.org/wikipedia/commons/a/a9/Amazon_logo.svg" className="h-8 grayscale hover:grayscale-0 transition-all filter brightness-0 invert" alt="Amazon" />
               <img loading="lazy" decoding="async" src="https://upload.wikimedia.org/wikipedia/commons/b/ba/Stripe_Logo%2C_revised_2016.svg" className="h-8 grayscale hover:grayscale-0 transition-all filter brightness-0 invert" alt="Stripe" />
               <img loading="lazy" decoding="async" src="https://upload.wikimedia.org/wikipedia/commons/d/df/Adobe_Corporate_logo.svg" className="h-8 grayscale hover:grayscale-0 transition-all filter brightness-0 invert" alt="Adobe" />
               
               {/* Duplicate Set for infinite scroll illusion */}
               <img loading="lazy" decoding="async" src="https://upload.wikimedia.org/wikipedia/commons/2/2f/Google_2015_logo.svg" className="h-8 grayscale hover:grayscale-0 transition-all filter brightness-0 invert" alt="Google" />
               <img loading="lazy" decoding="async" src="https://upload.wikimedia.org/wikipedia/commons/7/7b/Meta_Platforms_Inc._logo.svg" className="h-6 grayscale hover:grayscale-0 transition-all filter brightness-0 invert" alt="Meta" />
               <img loading="lazy" decoding="async" src="https://upload.wikimedia.org/wikipedia/commons/0/0e/Shopify_logo_2018.svg" className="h-8 grayscale hover:grayscale-0 transition-all filter brightness-0 invert" alt="Shopify" />
               <img loading="lazy" decoding="async" src="https://upload.wikimedia.org/wikipedia/commons/a/a9/Amazon_logo.svg" className="h-8 grayscale hover:grayscale-0 transition-all filter brightness-0 invert" alt="Amazon" />
               <img loading="lazy" decoding="async" src="https://upload.wikimedia.org/wikipedia/commons/b/ba/Stripe_Logo%2C_revised_2016.svg" className="h-8 grayscale hover:grayscale-0 transition-all filter brightness-0 invert" alt="Stripe" />
               <img loading="lazy" decoding="async" src="https://upload.wikimedia.org/wikipedia/commons/d/df/Adobe_Corporate_logo.svg" className="h-8 grayscale hover:grayscale-0 transition-all filter brightness-0 invert" alt="Adobe" />
            </motion.div>
          </div>
        </div>
      </section>

      <AboutDigitexa />
      <DigitalProductsCTA />
      <FeaturedServices />
      <OurProcess />
      <CaseStudiesPreview />
      <IndustriesWeServe />
      <HomeBlogFAQ />
      <TestimonialsSlider />
      <ContactCTA />
    </div>
  );
}
