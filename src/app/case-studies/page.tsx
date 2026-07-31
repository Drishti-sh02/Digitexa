"use client";

import { motion } from "framer-motion";
import { ArrowRight, Home, CheckCircle2, ChevronRight, BarChart, Settings, Users, Target } from "lucide-react";
import Link from "next/link";
import { fullCaseStudies } from "@/data/fullCaseStudies";
import Footer from "@/components/Footer";
import { useConsultationModal } from "@/context/ConsultationModalContext";

export default function CaseStudiesPage() {
  const { openModal } = useConsultationModal();
  const fadeInUp = {
    hidden: { opacity: 0, y: 40 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" as const } }
  };

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  return (
    <div className="bg-[#050816] min-h-screen text-white pb-24">
      
      {/* Top Bar */}
      <div className="p-4 border-b border-white/10 mb-12 grid grid-cols-3 items-center bg-[#070B18]">
        <div className="flex justify-start">
          <Link 
            href="/" 
            className="inline-flex items-center gap-2 text-subtext hover:text-white transition-colors px-2"
          >
            <Home className="w-4 h-4" />
            <span className="font-medium text-sm hidden md:inline">Go Back to Home</span>
          </Link>
        </div>
        <div className="flex justify-center">
          <Link href="/" className="transition-transform hover:scale-105">
            <img loading="lazy" decoding="async" 
              src="/Logo.png" 
              alt="Digitexa" 
              className="h-16 md:h-20 w-auto object-contain drop-shadow-[0_0_10px_rgba(109,94,247,0.2)]" 
            />
          </Link>
        </div>
        <div className="flex justify-end"></div>
      </div>

      {/* Hero Section */}
      <section className="container mx-auto px-6 max-w-7xl mb-24">
        <motion.div 
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={staggerContainer}
          className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center"
        >
          <div>
            <motion.div variants={fadeInUp} className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass mb-6">
              <span className="w-2 h-2 rounded-full bg-accent animate-pulse"></span>
              <span className="text-sm font-medium text-white/90 uppercase tracking-wider">Success Stories</span>
            </motion.div>
            
            <motion.h1 variants={fadeInUp} className="text-4xl md:text-5xl lg:text-6xl font-heading font-bold text-white mb-6 leading-tight">
              Real Businesses.<br/>Real Growth.<br/><span className="text-gradient">Real Results.</span>
            </motion.h1>
            
            <motion.p variants={fadeInUp} className="text-subtext text-lg leading-relaxed max-w-xl">
              Every business has unique challenges, goals, and opportunities. At Digitexa, we combine strategy, creativity, technology, and performance marketing to help brands scale sustainably. Explore how our team has delivered measurable growth across eCommerce, SaaS, FinTech, Healthcare, and Enterprise businesses.
            </motion.p>
          </div>
          
          <motion.div variants={fadeInUp} className="relative h-[400px] lg:h-[550px] w-full rounded-3xl overflow-hidden glass border border-white/10 shadow-2xl">
            <img loading="lazy" decoding="async" 
              src="https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=2000&auto=format&fit=crop" 
              alt="Dashboard Results" 
              className="w-full h-full object-cover opacity-80"
            />
            <div className="absolute inset-0 bg-gradient-to-tr from-background via-transparent to-transparent"></div>
          </motion.div>
        </motion.div>
      </section>

      {/* Case Studies List */}
      <section className="container mx-auto px-6 max-w-7xl space-y-32 mb-32">
        {fullCaseStudies.map((cs, index) => {
          const isEven = index % 2 === 0;
          
          return (
            <motion.div 
              key={cs.id}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              variants={staggerContainer}
              className={`flex flex-col ${isEven ? 'lg:flex-row' : 'lg:flex-row-reverse'} gap-12 lg:gap-20 items-start`}
            >
              {/* Image & Gallery Column */}
              <div className="w-full lg:w-1/2 flex flex-col gap-8">
                <motion.div variants={fadeInUp} className="relative aspect-video max-w-lg mx-auto lg:mx-0 w-full rounded-2xl overflow-hidden glass border border-white/10 group shadow-2xl">
                  <img loading="lazy" decoding="async" 
                    src={cs.featuredImage} 
                    alt={cs.title} 
                    className="w-full h-full object-cover opacity-90 group-hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-transparent to-transparent"></div>
                </motion.div>
                
                {/* Gallery Row */}
                <motion.div 
                  variants={staggerContainer} 
                  initial="hidden" 
                  whileInView="visible" 
                  viewport={{ once: true }} 
                  className="flex flex-wrap gap-4 justify-center lg:justify-start"
                >
                  {cs.galleryImages.map((img, i) => (
                    <motion.div 
                      key={i} 
                      variants={fadeInUp}
                      whileHover={{ scale: 1.15, rotate: i % 2 === 0 ? 3 : -3, zIndex: 20 }}
                      className="w-20 h-20 md:w-24 md:h-24 rounded-2xl overflow-hidden glass border border-white/20 shadow-xl cursor-pointer relative z-10"
                    >
                      <img loading="lazy" decoding="async" 
                        src={img} 
                        alt="Gallery Image" 
                        className="w-full h-full object-cover"
                      />
                    </motion.div>
                  ))}
                </motion.div>
              </div>

              {/* Content Column */}
              <div className="w-full lg:w-1/2 flex flex-col">
                <motion.div variants={fadeInUp} className="mb-4 text-xs font-bold uppercase tracking-widest text-primary flex items-center gap-2">
                  <span>{cs.industry}</span>
                  <span className="w-1.5 h-1.5 rounded-full bg-white/30"></span>
                  <span className="text-subtext">{cs.services}</span>
                </motion.div>
                
                <motion.h2 variants={fadeInUp} className="text-3xl md:text-4xl font-heading font-bold text-white mb-6">
                  {cs.title}
                </motion.h2>
                
                <motion.p variants={fadeInUp} className="text-subtext text-base leading-relaxed mb-10">
                  {cs.overview}
                </motion.p>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-10 mb-12">
                  <motion.div variants={fadeInUp}>
                    <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
                      <span className="w-8 h-8 rounded-full bg-red-500/10 flex items-center justify-center text-red-500">!</span>
                      The Challenge
                    </h3>
                    <ul className="space-y-3">
                      {cs.challenge.map((item, i) => (
                        <li key={i} className="text-sm text-subtext flex items-start gap-2">
                          <ChevronRight className="w-4 h-4 text-white/30 shrink-0 mt-0.5" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </motion.div>
                  
                  <motion.div variants={fadeInUp}>
                    <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
                      <span className="w-8 h-8 rounded-full bg-green-500/10 flex items-center justify-center text-green-500">✓</span>
                      Our Solution
                    </h3>
                    <ul className="space-y-3">
                      {cs.solution.map((item, i) => (
                        <li key={i} className="text-sm text-subtext flex items-start gap-2">
                          <CheckCircle2 className="w-4 h-4 text-green-500 shrink-0 mt-0.5" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </motion.div>
                </div>
                
                {/* Results Grid */}
                <motion.div variants={fadeInUp} className="grid grid-cols-2 gap-4 p-6 rounded-2xl glass border border-white/10 relative overflow-hidden">
                  <div className="absolute top-0 right-0 w-32 h-32 bg-primary/20 rounded-full blur-[50px] transform-gpu transform-gpu"></div>
                  {cs.results.map((res, i) => (
                    <div key={i} className="relative z-10">
                      <div className="text-2xl md:text-3xl font-heading font-bold text-white mb-1">{res.value}</div>
                      <div className="text-xs text-subtext uppercase tracking-wider">{res.label}</div>
                    </div>
                  ))}
                </motion.div>
                
              </div>
            </motion.div>
          );
        })}
      </section>



    </div>
  );
}
