"use client";

import { motion } from "framer-motion";
import { 
  Home, Target, Search, PenTool, CheckCircle2, 
  BarChart, Lightbulb, Zap, Server, Shield, 
  MapPin, Users, Heart, Star, Globe, TrendingUp,
  Cpu, Rocket, Layout, Smartphone
} from "lucide-react";
import Link from "next/link";
import Footer from "@/components/Footer";
import WhyChooseUs from "@/components/home/WhyChooseUs";

export default function AboutUsPage() {
  const fadeInUp = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" as const } }
  };

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15
      }
    }
  };

  return (
    <div className="bg-[#050816] min-h-screen text-white pb-0">
      
      {/* Top Bar */}
      <div className="p-4 border-b border-white/10 mb-2 grid grid-cols-3 items-center bg-[#070B18]">
        <div className="flex justify-start">
          <Link 
            href="/" 
            className="inline-flex items-center gap-2 text-subtext hover:text-white transition-colors"
          >
            <Home className="w-4 h-4" />
            <span className="font-medium text-sm">Go Back to Home</span>
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
      <section className="container mx-auto px-6 max-w-6xl mb-12 pt-2">
        <motion.div 
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={staggerContainer}
          className="text-center max-w-3xl mx-auto"
        >
          <motion.div variants={fadeInUp} className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full glass mb-4">
            <span className="w-1.5 h-1.5 rounded-full bg-accent animate-pulse"></span>
            <span className="text-xs font-medium text-white/90 uppercase tracking-wider">About Digitexa</span>
          </motion.div>
          
          <motion.h1 variants={fadeInUp} className="text-3xl md:text-4xl lg:text-5xl font-heading font-bold text-white mb-6 leading-tight">
            Building Digital Experiences That Drive <span className="text-gradient">Real Business Growth</span>
          </motion.h1>
          
          <motion.p variants={fadeInUp} className="text-subtext text-base md:text-lg leading-relaxed mb-12 max-w-2xl mx-auto">
            At Digitexa, we combine strategy, creativity, and technology to help businesses grow in the digital world. We partner with startups, entrepreneurs, eCommerce brands, and enterprises to create meaningful digital experiences that generate measurable results and long-term success.
          </motion.p>

          <motion.div variants={fadeInUp} className="relative aspect-video max-w-4xl w-full rounded-[1.5rem] overflow-hidden glass border border-white/10 shadow-2xl mx-auto">
            <img loading="lazy" decoding="async" 
              src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?q=80&w=2000&auto=format&fit=crop" 
              alt="Digitexa Team" 
              className="w-full h-full object-cover opacity-90"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-transparent to-transparent"></div>
          </motion.div>
        </motion.div>
      </section>

      {/* Our Story */}
      <section className="py-20 bg-[#070B18] border-y border-white/5 relative overflow-hidden">
        <div className="container mx-auto px-6 max-w-6xl relative z-10">
          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={staggerContainer}
            className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center"
          >
            <div className="order-2 lg:order-1">
              <motion.h2 variants={fadeInUp} className="text-2xl md:text-3xl lg:text-4xl font-heading font-bold text-white mb-4">Our <span className="text-gradient">Story</span></motion.h2>
              <motion.p variants={fadeInUp} className="text-subtext text-base leading-relaxed mb-4">
                Digitexa was founded with a vision to bridge the gap between innovative ideas and exceptional digital execution. As businesses increasingly embraced digital transformation, we recognized the need for an agency that focuses not only on beautiful designs and advanced technology but also on measurable business outcomes.
              </motion.p>
              <motion.p variants={fadeInUp} className="text-subtext text-base leading-relaxed">
                Today, we work with clients across multiple industries, delivering strategic solutions that combine creativity, innovation, and performance to help brands achieve sustainable growth.
              </motion.p>
            </div>
            
            <motion.div variants={fadeInUp} className="order-1 lg:order-2 relative aspect-video lg:aspect-square w-full max-w-md mx-auto rounded-2xl overflow-hidden glass border border-white/10 shadow-xl">
              <img loading="lazy" decoding="async" 
                src="https://images.unsplash.com/photo-1552664730-d307ca884978?q=80&w=1000&auto=format&fit=crop" 
                alt="Our Story" 
                className="w-full h-full object-cover opacity-80"
              />
            </motion.div>
          </motion.div>
        </div>
      </section>

      <WhyChooseUs />

      {/* Our Approach / Timeline */}
      <section className="py-24 container mx-auto px-6 max-w-6xl">
        <motion.div 
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={staggerContainer}
          className="text-center mb-16"
        >
          <motion.h2 variants={fadeInUp} className="text-2xl md:text-3xl lg:text-4xl font-heading font-bold text-white mb-3">How We <span className="text-gradient">Work</span></motion.h2>
          <motion.p variants={fadeInUp} className="text-subtext text-base max-w-xl mx-auto">A proven, systematic approach to delivering excellence.</motion.p>
        </motion.div>

        <motion.div 
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={staggerContainer}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 relative"
        >
          {/* Connector Line (Desktop) */}
          <div className="hidden lg:block absolute top-[40px] left-0 w-full h-0.5 bg-white/5 z-0"></div>

          {[
            { title: "Discover", icon: Search, desc: "Understand business goals, target audience, competitors, and market opportunities." },
            { title: "Strategize", icon: Target, desc: "Develop customized digital strategies aligned with measurable objectives." },
            { title: "Execute", icon: PenTool, desc: "Design, develop, market, and launch high-quality digital solutions." },
            { title: "Optimize", icon: TrendingUp, desc: "Continuously analyze performance and improve results using real data." }
          ].map((step, idx) => (
            <motion.div key={idx} variants={fadeInUp} className="relative z-10 flex flex-col items-center text-center group">
              <div className="w-16 h-16 rounded-full bg-[#050816] glass border-4 border-[#070B18] flex items-center justify-center mb-4 shadow-xl group-hover:scale-110 group-hover:border-primary transition-all duration-300">
                <step.icon className="w-6 h-6 text-white group-hover:text-primary transition-colors" />
              </div>
              <h3 className="text-lg font-bold text-white mb-2">0{idx + 1}. {step.title}</h3>
              <p className="text-subtext text-sm leading-relaxed max-w-[220px]">{step.desc}</p>
            </motion.div>
          ))}
        </motion.div>
      </section>

      {/* Our Expertise */}
      <section className="relative py-24 overflow-hidden">
        {/* Background Image */}
        <div className="absolute inset-0">
          <img loading="lazy" decoding="async" 
            src="https://images.unsplash.com/photo-1516321318423-f06f85e504b3?q=80&w=2000&auto=format&fit=crop" 
            alt="Expertise Background" 
            className="w-full h-full object-cover opacity-20"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-[#050816] via-[#050816]/80 to-[#050816]"></div>
        </div>

        <div className="container mx-auto px-6 max-w-5xl relative z-10">
          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={staggerContainer}
            className="text-center mb-16"
          >
            <motion.h2 variants={fadeInUp} className="text-2xl md:text-3xl lg:text-4xl font-heading font-bold text-white mb-4">Our <span className="text-gradient">Expertise</span></motion.h2>
            <motion.p variants={fadeInUp} className="text-subtext text-base max-w-2xl mx-auto leading-relaxed">
              Digitexa brings together specialists in marketing, development, UI/UX, automation, branding, analytics, and business strategy to deliver seamlessly integrated digital solutions.
            </motion.p>
          </motion.div>

          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={staggerContainer}
            className="grid grid-cols-2 md:grid-cols-3 gap-4 lg:gap-6"
          >
            {[
              { title: "Digital Strategy", icon: Target },
              { title: "Creative Thinking", icon: Lightbulb },
              { title: "Technical Excellence", icon: Server },
              { title: "AI Innovation", icon: Cpu },
              { title: "Business Growth", icon: BarChart },
              { title: "Continuous Optimization", icon: TrendingUp }
            ].map((exp, idx) => (
              <motion.div key={idx} variants={fadeInUp} className="glass border border-white/10 rounded-2xl p-6 flex flex-col items-center justify-center text-center group hover:border-primary/50 transition-colors shadow-lg">
                <div className="w-12 h-12 rounded-xl bg-white/5 flex items-center justify-center mb-4 group-hover:scale-110 group-hover:bg-primary/20 transition-all duration-300">
                  <exp.icon className="w-6 h-6 text-white group-hover:text-primary transition-colors" />
                </div>
                <h3 className="text-base md:text-lg font-bold text-white">{exp.title}</h3>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Beyond Client Services (Marketplace) */}
      <section className="py-24 bg-[#070B18] border-y border-white/5 relative overflow-hidden">
        <div className="container mx-auto px-6 max-w-6xl relative z-10">
          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={staggerContainer}
            className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center"
          >
            <div>
              <motion.div variants={fadeInUp} className="text-xs font-bold uppercase tracking-widest text-primary mb-3">Beyond Client Services</motion.div>
              <motion.h2 variants={fadeInUp} className="text-2xl md:text-3xl lg:text-4xl font-heading font-bold text-white mb-4 leading-tight">Global Digital Products <span className="text-gradient">Marketplace</span></motion.h2>
              <motion.p variants={fadeInUp} className="text-subtext text-base leading-relaxed mb-4">
                Alongside our client services, Digitexa creates premium digital products designed for entrepreneurs, marketers, agencies, and business professionals worldwide.
              </motion.p>
              <motion.p variants={fadeInUp} className="text-subtext text-base leading-relaxed mb-6">
                Our products include business templates, marketing resources, automation toolkits, educational guides, productivity assets, and digital learning materials. These products are securely distributed through internationally recognized marketplaces.
              </motion.p>
            </div>
            
            <motion.div variants={staggerContainer} className="flex flex-col gap-4">
              {[
                { name: "CopeCart", color: "bg-blue-500/10 border-blue-500/20 text-blue-400 hover:border-blue-500/50 hover:bg-blue-500/20" },
                { name: "Digistore24", color: "bg-green-500/10 border-green-500/20 text-green-400 hover:border-green-500/50 hover:bg-green-500/20" },
                { name: "ClickBank", color: "bg-orange-500/10 border-orange-500/20 text-orange-400 hover:border-orange-500/50 hover:bg-orange-500/20" }
              ].map((logo, idx) => (
                <motion.div key={idx} variants={fadeInUp} className={`w-full p-6 rounded-xl glass border flex items-center justify-center transition-all duration-300 cursor-pointer ${logo.color}`}>
                  <span className="text-xl md:text-2xl font-heading font-bold tracking-wider">{logo.name}</span>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Why Businesses Trust Us */}
      <section className="py-24 container mx-auto px-6 max-w-6xl">
        <motion.div 
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={staggerContainer}
          className="text-center mb-12"
        >
          <motion.h2 variants={fadeInUp} className="text-2xl md:text-3xl lg:text-4xl font-heading font-bold text-white mb-4">Why Businesses <span className="text-gradient">Trust Digitexa</span></motion.h2>
        </motion.div>

        <motion.div 
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={staggerContainer}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5"
        >
          {[
            { title: "Results-Focused", desc: "Every project is built around measurable business outcomes." },
            { title: "Innovation", desc: "We continuously adopt modern technologies and AI-powered solutions." },
            { title: "Transparency", desc: "Open communication and detailed reporting throughout every project." },
            { title: "Long-Term Partnership", desc: "We grow alongside our clients through continuous support and optimization." },
            { title: "Quality Assurance", desc: "Every solution undergoes rigorous testing before launch." }
          ].map((item, idx) => (
            <motion.div key={idx} variants={fadeInUp} className={`glass p-6 rounded-2xl border border-white/10 shadow-lg hover:border-white/20 transition-all ${idx === 3 ? 'md:col-span-2 lg:col-span-1' : ''} ${idx === 4 ? 'md:col-span-2' : ''}`}>
              <CheckCircle2 className="w-6 h-6 text-primary mb-3" />
              <h3 className="text-lg font-bold text-white mb-2">{item.title}</h3>
              <p className="text-subtext text-sm leading-relaxed">{item.desc}</p>
            </motion.div>
          ))}
        </motion.div>
      </section>

      {/* Industries We Work With & Company Info */}
      <section className="py-20 bg-[#070B18] border-y border-white/5 relative overflow-hidden">
        <div className="container mx-auto px-6 max-w-6xl relative z-10">
          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={staggerContainer}
            className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center"
          >
            {/* Industries */}
            <div>
              <motion.h2 variants={fadeInUp} className="text-2xl md:text-3xl font-heading font-bold text-white mb-6">Industries We <span className="text-gradient">Work With</span></motion.h2>
              <motion.div variants={staggerContainer} className="flex flex-wrap gap-3">
                {["Technology", "SaaS", "eCommerce", "Healthcare", "Finance", "Education", "Real Estate", "Manufacturing", "Professional Services", "Startups"].map((ind, idx) => (
                  <motion.div key={idx} variants={fadeInUp} className="px-4 py-2 rounded-full glass border border-white/10 text-white/90 text-xs font-medium hover:bg-white/10 hover:border-white/20 transition-all cursor-pointer">
                    {ind}
                  </motion.div>
                ))}
              </motion.div>
            </div>

            {/* Company Info */}
            <motion.div variants={fadeInUp} className="glass p-8 rounded-2xl border border-white/10 shadow-xl relative overflow-hidden">
              <div className="absolute top-0 right-0 w-24 h-24 bg-primary/20 rounded-full blur-[40px] transform-gpu transform-gpu"></div>
              <h2 className="text-xl font-bold text-white mb-6">Company Information</h2>
              <div className="space-y-5 relative z-10">
                <div>
                  <div className="text-[10px] text-subtext uppercase tracking-widest font-bold mb-1">Company Name</div>
                  <div className="text-lg font-heading font-bold text-white">Digitexa</div>
                </div>
                <div>
                  <div className="text-[10px] text-subtext uppercase tracking-widest font-bold mb-2">Office Address</div>
                  <div className="flex items-start gap-3 p-3 rounded-lg bg-white/5 border border-white/5">
                    <MapPin className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                    <p className="text-white/90 leading-relaxed text-xs">
                      43 Near Mother School,<br/>
                      Adhchini, MMTC/STC Colony,<br/>
                      South Delhi, Delhi – 110017,<br/>
                      India
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Vision & Mission & Stats */}
      <section className="py-24 container mx-auto px-6 max-w-6xl">
        <motion.div 
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={staggerContainer}
          className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-16"
        >
          <motion.div variants={fadeInUp} className="p-8 rounded-2xl glass border border-white/10 bg-gradient-to-br from-white/5 to-transparent shadow-lg">
            <Globe className="w-8 h-8 text-primary mb-4" />
            <h3 className="text-xl font-bold text-white mb-3">Our Vision</h3>
            <p className="text-subtext leading-relaxed text-base">To become a globally trusted digital partner recognized for innovation, transparency, and measurable business growth.</p>
          </motion.div>
          
          <motion.div variants={fadeInUp} className="p-8 rounded-2xl glass border border-white/10 bg-gradient-to-bl from-white/5 to-transparent shadow-lg">
            <Rocket className="w-8 h-8 text-accent mb-4" />
            <h3 className="text-xl font-bold text-white mb-3">Our Mission</h3>
            <p className="text-subtext leading-relaxed text-base">To empower businesses through technology, creativity, and strategic digital solutions that create long-term value.</p>
          </motion.div>
        </motion.div>

        {/* Statistics */}
        <motion.div 
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={staggerContainer}
          className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4"
        >
          {[
            { value: "200+", label: "Projects Delivered" },
            { value: "100+", label: "Happy Clients" },
            { value: "15+", label: "Industries Served" },
            { value: "98%", label: "Client Satisfaction" },
            { value: "5+", label: "Years of Experience" }
          ].map((stat, idx) => (
            <motion.div key={idx} variants={fadeInUp} className="text-center p-5 glass rounded-xl border border-white/5">
              <div className="text-2xl md:text-3xl font-heading font-bold text-white mb-1">{stat.value}</div>
              <div className="text-[10px] text-subtext uppercase tracking-wider font-medium">{stat.label}</div>
            </motion.div>
          ))}
        </motion.div>
      </section>

      {/* Meet Our Values */}
      <section className="py-24 bg-[#070B18] border-t border-white/5 relative overflow-hidden">
        <div className="container mx-auto px-6 max-w-6xl relative z-10">
          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={staggerContainer}
            className="text-center mb-12"
          >
            <motion.h2 variants={fadeInUp} className="text-2xl md:text-3xl lg:text-4xl font-heading font-bold text-white">Meet Our <span className="text-gradient">Values</span></motion.h2>
          </motion.div>

          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={staggerContainer}
            className="grid grid-cols-2 md:grid-cols-3 gap-4 lg:gap-6"
          >
            {[
              { title: "Innovation", icon: Lightbulb },
              { title: "Integrity", icon: Shield },
              { title: "Collaboration", icon: Users },
              { title: "Excellence", icon: Star },
              { title: "Transparency", icon: Search },
              { title: "Customer Success", icon: Heart }
            ].map((value, idx) => (
              <motion.div key={idx} variants={fadeInUp} className="glass p-6 rounded-2xl border border-white/10 text-center flex flex-col items-center hover:bg-white/5 transition-colors group">
                <value.icon className="w-8 h-8 text-white/50 group-hover:text-primary transition-colors mb-3" />
                <h3 className="text-base font-bold text-white">{value.title}</h3>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Final CTA Section */}
      <section className="relative py-24 overflow-hidden border-t border-white/10">
        <div className="absolute inset-0">
          <img loading="lazy" decoding="async" 
            src="https://images.unsplash.com/photo-1497366754035-f200968a6e72?q=80&w=2000&auto=format&fit=crop" 
            alt="Office CTA" 
            className="w-full h-full object-cover opacity-20"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#050816] via-primary/10 to-[#050816]"></div>
        </div>
        
        <div className="container mx-auto px-6 max-w-3xl relative z-10 text-center">
          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={staggerContainer}
            className="glass p-10 md:p-12 rounded-[1.5rem] border border-white/20 shadow-[0_0_60px_rgba(109,94,247,0.15)] backdrop-blur-xl"
          >
            <motion.h2 variants={fadeInUp} className="text-2xl md:text-4xl lg:text-5xl font-heading font-bold text-white mb-4 leading-tight">
              Let's Build Something <span className="text-gradient">Extraordinary</span>
            </motion.h2>
            <motion.p variants={fadeInUp} className="text-subtext text-base mb-8 max-w-xl mx-auto leading-relaxed">
              Whether you're launching a startup, scaling an eCommerce business, or transforming an established enterprise, Digitexa is ready to help you achieve measurable growth.
            </motion.p>
            <motion.div variants={fadeInUp} className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link href="/contact" className="px-6 py-3 w-full sm:w-auto rounded-full bg-white/10 text-white text-sm font-semibold hover:bg-white/20 transition-all border border-white/10">
                Contact Our Team
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </section>

    </div>
  );
}
