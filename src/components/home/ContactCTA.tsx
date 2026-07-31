"use client";

import { motion } from "framer-motion";
import { ArrowRight, Calendar } from "lucide-react";
import Link from "next/link";
import { useConsultationModal } from "@/context/ConsultationModalContext";

export default function ContactCTA() {
  const { openModal } = useConsultationModal();
  return (
    <section className="py-24 relative overflow-hidden bg-background">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom,_var(--tw-gradient-stops))] from-primary/20 via-background to-background"></div>
      
      <div className="container mx-auto px-6 max-w-5xl relative z-10">
        <div className="glass rounded-3xl border border-white/10 p-12 md:p-20 text-center relative overflow-hidden">
          
          <div className="absolute top-0 right-0 w-64 h-64 bg-accent/20 rounded-full blur-[80px] transform-gpu transform-gpu"></div>
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-primary/20 rounded-full blur-[80px] transform-gpu transform-gpu"></div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="relative z-10 flex flex-col items-center"
          >
            <h2 className="text-4xl md:text-6xl font-heading font-bold text-white mb-6 leading-tight">
              Ready to accelerate <br/> your <span className="text-gradient">growth?</span>
            </h2>
            <p className="text-subtext text-lg max-w-2xl mx-auto mb-10">
              Book a free strategic consultation with our experts. We'll audit your current digital presence and outline a custom roadmap to scale your business.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto relative group">
              {/* Glowing animated background */}
              <div className="absolute -inset-1 bg-gradient-to-r from-[#6C63FF] to-[#00D4FF] rounded-full blur opacity-50 group-hover:opacity-100 transition duration-500 animate-pulse"></div>
              
              <button 
                onClick={openModal} 
                className="relative px-8 py-4 rounded-full bg-[#070B18] border border-white/10 text-white font-semibold hover:bg-primary/20 transition-all flex items-center justify-center gap-2 shadow-[0_0_20px_rgba(109,94,247,0.3)]"
              >
                <Calendar className="w-5 h-5 text-accent" />
                Schedule a Call for Enquiry
                <ArrowRight className="w-5 h-5 ml-1 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all text-accent" />
              </button>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
