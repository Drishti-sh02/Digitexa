"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Mail, Phone, MapPin, Send, ArrowRight, Globe, MessageSquare, Share2, CheckCircle2 } from "lucide-react";

export default function ContactPage() {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const fadeInUp = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" as const } }
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
    <div className="bg-[#050816] min-h-screen text-white pt-24 pb-0 flex flex-col">
      
      {/* Background Orbs */}
      <div className="absolute top-0 left-0 w-full h-[500px] bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-primary/20 via-background to-background z-0 pointer-events-none"></div>
      
      <main className="flex-1 relative z-10 container mx-auto px-6 max-w-7xl mb-24">
        
        {/* Hero Section */}
        <motion.div 
          initial="hidden"
          animate="visible"
          variants={staggerContainer}
          className="text-center max-w-3xl mx-auto mb-20"
        >
          <motion.div variants={fadeInUp} className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full glass mb-6 border border-primary/30">
            <span className="w-2 h-2 rounded-full bg-accent animate-pulse"></span>
            <span className="text-xs font-bold text-white tracking-widest uppercase">Start Your Journey</span>
          </motion.div>
          <motion.h1 variants={fadeInUp} className="text-4xl md:text-6xl lg:text-7xl font-heading font-bold text-white mb-6 leading-tight">
            Let's Build Something <br className="hidden md:block" />
            <span className="text-gradient">Extraordinary.</span>
          </motion.h1>
          <motion.p variants={fadeInUp} className="text-subtext text-lg md:text-xl max-w-2xl mx-auto leading-relaxed">
            Ready to accelerate your business growth? Drop us a line and let's discuss how we can transform your digital presence.
          </motion.p>
        </motion.div>

        {/* Contact Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-stretch">
          
          {/* Left Column: Info */}
          <motion.div 
            initial="hidden"
            animate="visible"
            variants={staggerContainer}
            className="lg:col-span-5 flex flex-col gap-8 relative h-full"
          >
            {/* Decorative Glow */}
            <div className="absolute top-1/4 -left-20 w-64 h-64 bg-accent/20 rounded-full blur-[100px] transform-gpu transform-gpu pointer-events-none"></div>

            <motion.div variants={fadeInUp} className="glass p-8 md:p-10 rounded-[2rem] border border-white/10 relative overflow-hidden group hover:border-primary/30 transition-colors duration-500 flex-1 flex flex-col justify-center">
              <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              
              <h3 className="text-2xl font-heading font-bold text-white mb-8 relative z-10">Contact Information</h3>
              
              <div className="flex flex-col gap-8 relative z-10">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center shrink-0 border border-primary/20 group-hover:bg-primary/20 transition-colors">
                    <Mail className="w-5 h-5 text-accent" />
                  </div>
                  <div>
                    <p className="text-sm text-subtext mb-1">Email Us</p>
                    <a href="mailto:digitexatech@gmail.com" className="text-lg font-medium text-white hover:text-accent transition-colors">digitexatech@gmail.com</a>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center shrink-0 border border-primary/20 group-hover:bg-primary/20 transition-colors">
                    <Phone className="w-5 h-5 text-accent" />
                  </div>
                  <div>
                    <p className="text-sm text-subtext mb-1">Call Us</p>
                    <a href="tel:+919971123820" className="text-lg font-medium text-white hover:text-accent transition-colors">9971123820</a>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center shrink-0 border border-primary/20 group-hover:bg-primary/20 transition-colors">
                    <MapPin className="w-5 h-5 text-accent" />
                  </div>
                  <div>
                    <p className="text-sm text-subtext mb-1">Visit Us</p>
                    <p className="text-lg font-medium text-white">43 NEAR MOTHER SCHOOL, ADHCHINI , MMTC/STC Colony, SOUTH DELHI, DELHI, 110017.</p>
                  </div>
                </div>
              </div>
            </motion.div>

            <motion.div variants={fadeInUp} className="glass p-8 rounded-[2rem] border border-white/10 text-center">
              <h4 className="text-sm font-bold text-white uppercase tracking-widest mb-6">Follow Our Journey</h4>
              <div className="flex items-center justify-center gap-4">
                {[Globe, MessageSquare, Share2].map((Icon, idx) => (
                  <a key={idx} href="#" className="w-12 h-12 rounded-full bg-white/5 border border-white/10 flex items-center justify-center hover:bg-primary hover:border-primary transition-all hover:scale-110 hover:shadow-[0_0_20px_rgba(109,94,247,0.4)]">
                    <Icon className="w-5 h-5 text-white" />
                  </a>
                ))}
              </div>
            </motion.div>
          </motion.div>

          {/* Right Column: Form */}
          <motion.div 
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2, ease: "easeOut" }}
            className="lg:col-span-7 relative group"
          >
            
            <div className="relative glass p-8 md:p-12 rounded-[2.5rem] border border-white/10 bg-[#070B18]/90 backdrop-blur-3xl overflow-hidden min-h-[600px] flex flex-col justify-center">
              <div className="absolute top-0 right-0 w-64 h-64 bg-accent/10 rounded-full blur-[80px] transform-gpu transform-gpu pointer-events-none"></div>
              
              <AnimatePresence mode="wait">
                {!isSubmitted ? (
                  <motion.form 
                    key="form"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{ duration: 0.3 }}
                    className="relative z-10 flex flex-col gap-6" 
                    onSubmit={(e) => { 
                      e.preventDefault(); 
                      const formData = new FormData(e.currentTarget);
                      const name = formData.get('name');
                      const email = formData.get('email');
                      const company = formData.get('company');
                      const budget = formData.get('budget') || 'Not specified';
                      const details = formData.get('details');
                      
                      const text = `Hi Digitexa,\n\nMy name is ${name} (${email}).\nCompany: ${company}\nBudget: ${budget}\n\nProject Details:\n${details}`;
                      window.open(`https://wa.me/919971123820?text=${encodeURIComponent(text)}`, '_blank');
                      setIsSubmitted(true); 
                    }}
                  >
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="flex flex-col gap-2">
                    <label className="text-sm font-medium text-white/80 ml-2">Full Name</label>
                    <input 
                      name="name"
                      type="text" 
                      required
                      placeholder="John Doe" 
                      className="w-full px-6 py-4 rounded-xl bg-white/5 border border-white/10 focus:border-primary focus:bg-white/10 focus:outline-none transition-all text-white placeholder-white/30"
                    />
                  </div>
                  <div className="flex flex-col gap-2">
                    <label className="text-sm font-medium text-white/80 ml-2">Email Address</label>
                    <input 
                      name="email"
                      type="email" 
                      required
                      placeholder="john@example.com" 
                      className="w-full px-6 py-4 rounded-xl bg-white/5 border border-white/10 focus:border-primary focus:bg-white/10 focus:outline-none transition-all text-white placeholder-white/30"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="flex flex-col gap-2">
                    <label className="text-sm font-medium text-white/80 ml-2">Company / Organization</label>
                    <input 
                      name="company"
                      type="text" 
                      required
                      placeholder="Acme Corp" 
                      className="w-full px-6 py-4 rounded-xl bg-white/5 border border-white/10 focus:border-primary focus:bg-white/10 focus:outline-none transition-all text-white placeholder-white/30"
                    />
                  </div>
                  <div className="flex flex-col gap-2">
                    <label className="text-sm font-medium text-white/80 ml-2">Estimated Budget <span className="text-white/40 font-normal">(Optional)</span></label>
                    <select 
                      name="budget"
                      defaultValue=""
                      className="w-full px-6 py-4 rounded-xl bg-white/5 border border-white/10 focus:border-primary focus:bg-white/10 focus:outline-none transition-all text-white/80 appearance-none cursor-pointer"
                    >
                      <option value="" disabled className="bg-[#0f172a] text-white">Select a range</option>
                      <option value="5k-10k" className="bg-[#0f172a] text-white">$5,000 - $10,000</option>
                      <option value="10k-25k" className="bg-[#0f172a] text-white">$10,000 - $25,000</option>
                      <option value="25k-50k" className="bg-[#0f172a] text-white">$25,000 - $50,000</option>
                      <option value="50k+" className="bg-[#0f172a] text-white">$50,000+</option>
                    </select>
                  </div>
                </div>

                <div className="flex flex-col gap-2">
                  <label className="text-sm font-medium text-white/80 ml-2">Project Details</label>
                  <textarea 
                    name="details"
                    placeholder="Tell us about your goals, timeline, and what you're looking to achieve..." 
                    rows={5}
                    required
                    className="w-full px-6 py-4 rounded-xl bg-white/5 border border-white/10 focus:border-primary focus:bg-white/10 focus:outline-none transition-all text-white placeholder-white/30 resize-none custom-scrollbar"
                  ></textarea>
                </div>

                <button 
                  type="submit"
                  className="mt-4 group relative w-full inline-flex items-center justify-center gap-2 px-8 py-5 rounded-xl bg-primary text-white font-bold text-lg hover:bg-secondary transition-all overflow-hidden"
                >
                  <span className="relative z-10 flex items-center gap-2">
                    Send Message
                    <Send className="w-5 h-5 group-hover:-mt-1 group-hover:ml-1 transition-all" />
                  </span>
                </button>
                
                <p className="text-center text-xs text-subtext mt-4">
                  By submitting this form, you agree to our privacy policy and terms of service.
                </p>

                  </motion.form>
                ) : (
                  <motion.div 
                    key="success"
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.4 }}
                    className="relative z-10 flex flex-col items-center justify-center text-center gap-6 h-full py-12"
                  >
                    <div className="w-24 h-24 rounded-full bg-green-500/10 flex items-center justify-center border border-green-500/20 mb-2">
                      <CheckCircle2 className="w-12 h-12 text-green-400" />
                    </div>
                    <div>
                      <h3 className="text-3xl font-bold text-white mb-3">Message Sent!</h3>
                      <p className="text-subtext text-lg max-w-sm mx-auto">Thank you for reaching out. Our team will get back to you within 24 hours to discuss your project.</p>
                    </div>
                    <button 
                      onClick={() => setIsSubmitted(false)}
                      className="mt-6 px-8 py-4 rounded-full bg-white/5 text-white font-semibold hover:bg-white/10 transition-all border border-white/10"
                    >
                      Send Another Message
                    </button>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </motion.div>

        </div>
      </main>
    </div>
  );
}
