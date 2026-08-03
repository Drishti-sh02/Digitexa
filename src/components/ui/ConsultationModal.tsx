"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useConsultationModal } from "@/context/ConsultationModalContext";
import { X, Calendar, Clock, Briefcase, Building2, DollarSign, Mail, Phone, Check, Star, PartyPopper, CheckCircle2 } from "lucide-react";

export default function ConsultationModal() {
  const { isOpen, closeModal } = useConsultationModal();

  const [formState, setFormState] = useState({
    name: "",
    email: "",
    phone: "",
    company: "",
    website: "",
    date: "",
    time: "",
    project: "",
    agree: false,
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  // Close on ESC
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeModal();
    };
    window.addEventListener("keydown", handleEsc);
    return () => window.removeEventListener("keydown", handleEsc);
  }, [closeModal]);

  // Lock body scroll
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
  }, [isOpen]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target;
    const val = type === "checkbox" ? (e.target as HTMLInputElement).checked : value;
    setFormState((prev) => ({ ...prev, [name]: val }));
    // clear error on change
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const validate = () => {
    const newErrors: Record<string, string> = {};
    if (!formState.name) newErrors.name = "Name is required";
    if (!formState.email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formState.email)) newErrors.email = "Valid email is required";
    if (!formState.phone || formState.phone.length < 7) newErrors.phone = "Valid phone is required";
    if (!formState.date) newErrors.date = "Date is required";
    if (!formState.time) newErrors.time = "Time is required";
    if (!formState.project || formState.project.length < 20) newErrors.project = "Description must be at least 20 characters";
    if (!formState.agree) newErrors.agree = "You must agree to be contacted";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (validate()) {
      setIsSubmitting(true);
      setErrors((prev) => ({ ...prev, apiError: "" }));
      
      try {
        const response = await fetch("/api/schedule-call", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formState),
        });

        const data = await response.json();

        if (response.ok) {
          setIsSuccess(true);
        } else {
          setErrors((prev) => ({ ...prev, apiError: data.error || "Failed to schedule call" }));
        }
      } catch (error) {
        setErrors((prev) => ({ ...prev, apiError: "An unexpected error occurred. Please try again." }));
      } finally {
        setIsSubmitting(false);
      }
    }
  };

  const handleReset = () => {
    setIsSuccess(false);
    setFormState({
      name: "", email: "", phone: "", company: "", website: "",
      date: "", time: "",
      project: "", agree: false,
    });
    closeModal();
  };

  // Generate 15-min time slots from 09:00 to 19:00
  const timeSlots = [];
  for (let h = 9; h <= 18; h++) {
    for (let m = 0; m < 60; m += 15) {
      const hour = h > 12 ? h - 12 : h;
      const ampm = h >= 12 ? "PM" : "AM";
      const min = m === 0 ? "00" : m.toString();
      timeSlots.push(`${hour < 10 && h <= 12 ? "0" + hour : hour}:${min} ${ampm} IST`);
    }
  }

  // Disable past dates logic for min attr
  const today = new Date().toISOString().split("T")[0];

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
            className="absolute inset-0 bg-black/70 backdrop-blur-[10px] transform-gpu transform-gpu"
            onClick={closeModal}
          />

          {/* Modal Container */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
            className="relative w-full max-w-[720px] md:max-w-[1000px] h-[90vh] flex flex-col bg-[#070B18] rounded-[24px] overflow-hidden border border-white/10 shadow-[0_0_80px_rgba(108,99,255,0.2)]"
          >
            {/* Glowing Border Background (Behind content) */}
            <div className="absolute inset-0 pointer-events-none z-0 overflow-hidden">
               <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[150%] h-[150%] animate-[spin_4s_linear_infinite] opacity-50" style={{ background: "conic-gradient(from 90deg at 50% 50%, transparent 0%, transparent 35%, #6C63FF 50%, #00D4FF 75%, #7F5AF0 100%)" }}></div>
            </div>

            {/* Inner Content Wrapper */}
            <div className="relative z-10 flex flex-col md:flex-row min-h-0 h-full w-full bg-[#070B18]/95 backdrop-blur-3xl m-[2px] rounded-[22px] overflow-hidden" style={{ width: "calc(100% - 4px)", height: "calc(100% - 4px)" }}>
              
              {/* Left Side: Form Area */}
              <div className="flex-1 flex flex-col h-full overflow-y-auto custom-scrollbar p-6 md:p-10">
                
                <button 
                  onClick={closeModal}
                  className="absolute top-6 right-6 md:hidden w-8 h-8 rounded-full glass flex items-center justify-center border border-white/10 z-20"
                >
                  <X className="w-4 h-4 text-white" />
                </button>

                {!isSuccess ? (
                  <>
                    <div className="mb-8">
                      <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full glass border border-white/10 mb-4">
                        <Calendar className="w-3.5 h-3.5 text-accent" />
                        <span className="text-xs font-bold text-white/90 tracking-wider">SCHEDULE YOUR FREE CONSULTATION</span>
                      </div>
                      <h2 className="text-2xl md:text-3xl font-heading font-bold text-white mb-2">
                        Let's Discuss Your Growth
                      </h2>
                      <p className="text-subtext text-sm">
                        Tell us about your project and choose a convenient time. Our experts will get back to you within 24 hours.
                      </p>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-6">
                      {/* Personal Info */}
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="relative">
                          <input type="text" name="name" value={formState.name} onChange={handleChange} placeholder="Full Name" className={`w-full bg-white/5 border ${errors.name ? 'border-red-500' : 'border-white/10'} rounded-[14px] px-4 py-3 text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all`} />
                          {errors.name && <span className="text-red-500 text-xs absolute -bottom-4 left-2">{errors.name}</span>}
                        </div>
                        <div className="relative">
                          <input type="email" name="email" value={formState.email} onChange={handleChange} placeholder="Email Address" className={`w-full bg-white/5 border ${errors.email ? 'border-red-500' : 'border-white/10'} rounded-[14px] px-4 py-3 text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all`} />
                          {errors.email && <span className="text-red-500 text-xs absolute -bottom-4 left-2">{errors.email}</span>}
                        </div>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="relative">
                          <input type="tel" name="phone" value={formState.phone} onChange={handleChange} placeholder="Phone Number" className={`w-full bg-white/5 border ${errors.phone ? 'border-red-500' : 'border-white/10'} rounded-[14px] px-4 py-3 text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all`} />
                          {errors.phone && <span className="text-red-500 text-xs absolute -bottom-4 left-2">{errors.phone}</span>}
                        </div>
                        <div className="relative">
                          <input type="text" name="company" value={formState.company} onChange={handleChange} placeholder="Company Name (Optional)" className="w-full bg-white/5 border border-white/10 rounded-[14px] px-4 py-3 text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all" />
                        </div>
                      </div>



                      {/* Date / Time */}
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="relative">
                          <input type="date" name="date" min={today} value={formState.date} onChange={handleChange} className={`w-full bg-white/5 border ${errors.date ? 'border-red-500' : 'border-white/10'} rounded-[14px] px-4 py-3 text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all [color-scheme:dark]`} />
                        </div>
                        <div className="relative">
                          <select name="time" value={formState.time} onChange={handleChange} className={`w-full bg-[#0F1322] border ${errors.time ? 'border-red-500' : 'border-white/10'} rounded-[14px] px-4 py-3 text-white/90 focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all appearance-none cursor-pointer`}>
                            <option value="">Preferred Time</option>
                            {timeSlots.map(slot => (
                              <option key={slot} value={slot}>{slot}</option>
                            ))}
                          </select>
                          <Clock className="absolute right-4 top-3.5 w-4 h-4 text-white/40 pointer-events-none" />
                        </div>
                      </div>

                      {/* Description */}
                      <div className="relative">
                        <textarea name="project" rows={4} value={formState.project} onChange={handleChange} placeholder="Describe your goals, business, target audience, timeline, and any specific requirements..." className={`w-full bg-white/5 border ${errors.project ? 'border-red-500' : 'border-white/10'} rounded-[14px] px-4 py-3 text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all resize-none`}></textarea>
                        {errors.project && <span className="text-red-500 text-xs absolute -bottom-5 left-2">{errors.project}</span>}
                      </div>

                      {/* Checkbox */}
                      <div className="relative pt-2">
                        <label className="flex items-start gap-3 cursor-pointer group">
                          <div className="relative flex items-center justify-center mt-0.5">
                            <input type="checkbox" name="agree" checked={formState.agree} onChange={handleChange} className="peer sr-only" />
                            <div className={`w-5 h-5 rounded border ${errors.agree ? 'border-red-500' : 'border-white/30'} peer-checked:bg-primary peer-checked:border-primary transition-colors flex items-center justify-center`}>
                              <Check className={`w-3 h-3 text-white opacity-0 peer-checked:opacity-100 transition-opacity`} />
                            </div>
                          </div>
                          <span className="text-sm text-subtext group-hover:text-white/90 transition-colors leading-snug">
                            I agree to be contacted regarding my inquiry and accept the Privacy Policy.
                          </span>
                        </label>
                      </div>
                      
                      {errors.apiError && (
                        <div className="text-red-500 text-sm font-medium p-3 bg-red-500/10 border border-red-500/20 rounded-[14px]">
                          {errors.apiError}
                        </div>
                      )}

                      <button type="submit" disabled={isSubmitting} className="w-full py-4 rounded-[14px] bg-gradient-to-r from-[#6C63FF] to-[#00D4FF] text-white font-bold text-lg hover:shadow-[0_0_30px_rgba(108,99,255,0.4)] transition-all hover:-translate-y-0.5 disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-2">
                        {isSubmitting ? (
                          <span className="animate-spin w-5 h-5 border-2 border-white/30 border-t-white rounded-full"></span>
                        ) : (
                          "Schedule My Call"
                        )}
                      </button>

                      <div className="pt-6 mt-6 border-t border-white/10 flex flex-col items-center justify-center gap-2">
                        <span className="text-xs text-subtext uppercase tracking-widest font-bold">Need immediate assistance?</span>
                        <div className="flex flex-wrap items-center justify-center gap-6">
                          <a href="mailto:info@digitexa.co.in" className="flex items-center gap-2 text-sm text-white/90 hover:text-primary transition-colors"><Mail className="w-4 h-4" /> info@digitexa.co.in</a>
                          <a href="tel:+919971123820" className="flex items-center gap-2 text-sm text-white/90 hover:text-primary transition-colors"><Phone className="w-4 h-4" /> +91 9971123820</a>
                        </div>
                      </div>
                    </form>
                  </>
                ) : (
                  <motion.div 
                    initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
                    className="flex-1 flex flex-col items-center justify-center text-center py-10"
                  >
                    <div className="w-20 h-20 bg-green-500/20 text-green-400 rounded-full flex items-center justify-center mb-6">
                      <PartyPopper className="w-10 h-10" />
                    </div>
                    <h2 className="text-3xl font-heading font-bold text-white mb-4">Consultation Request Received!</h2>
                    <p className="text-lg text-white/90 mb-6 font-medium">Thank you for choosing Digitexa.</p>
                    <p className="text-subtext mb-8 max-w-sm mx-auto">
                      Your consultation request has been successfully submitted. Our team will review your details and contact you within 24 business hours to confirm your meeting.
                    </p>

                    <div className="flex flex-col sm:flex-row w-full gap-4 max-w-sm">
                      <button onClick={closeModal} className="flex-1 py-3 rounded-[12px] glass border border-white/10 text-white font-medium hover:bg-white/10 transition-colors">
                        Return to Website
                      </button>
                      <button onClick={handleReset} className="flex-1 py-3 rounded-[12px] bg-primary text-white font-medium hover:bg-secondary transition-colors">
                        Book Another
                      </button>
                    </div>
                  </motion.div>
                )}
              </div>

              {/* Right Side: Info Card (Desktop Only) */}
              <div className="hidden md:flex w-[380px] shrink-0 bg-[#0A0F24] relative flex-col border-l border-white/5 overflow-hidden">
                <button 
                  onClick={closeModal}
                  className="absolute top-6 right-6 w-10 h-10 rounded-full glass flex items-center justify-center border border-white/10 hover:bg-white/10 transition-colors z-20 cursor-pointer"
                >
                  <X className="w-5 h-5 text-white" />
                </button>
                
                <div className="absolute inset-0 z-0">
                  <img loading="lazy" decoding="async" src="https://images.unsplash.com/photo-1552664730-d307ca884978?q=80&w=1000&auto=format&fit=crop" alt="Consultation" className="w-full h-full object-cover opacity-20" />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0A0F24] via-[#0A0F24]/80 to-transparent"></div>
                  <div className="absolute inset-0 bg-primary/10 mix-blend-overlay"></div>
                </div>

                <div className="relative z-10 flex flex-col h-full p-10 mt-20">
                  <h3 className="text-2xl font-bold text-white mb-8">Why Book a Consultation?</h3>
                  <div className="space-y-4 mb-auto">
                    {[
                      "Free strategy session",
                      "Business growth roadmap",
                      "Personalized recommendations",
                      "Project timeline estimation",
                      "Budget planning",
                      "No obligation consultation"
                    ].map((item, i) => (
                      <div key={i} className="flex items-start gap-3">
                        <CheckCircle2 className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                        <span className="text-white/90 text-sm">{item}</span>
                      </div>
                    ))}
                  </div>

                  <div className="mt-12 p-6 glass rounded-2xl border border-white/10 backdrop-blur-md">
                    <div className="flex gap-1 mb-2">
                      {[1,2,3,4,5].map(i => <Star key={i} className="w-4 h-4 fill-yellow-500 text-yellow-500" />)}
                    </div>
                    <div className="text-white font-bold mb-1">Rated 4.9/5</div>
                    <div className="text-sm text-subtext mb-4">100+ Businesses Served</div>
                    
                    <div className="flex flex-col gap-2 border-t border-white/10 pt-4">
                      <div className="flex justify-between items-center text-xs">
                        <span className="text-subtext">Client Satisfaction</span>
                        <span className="text-accent font-bold">98%</span>
                      </div>
                      <div className="flex justify-between items-center text-xs">
                        <span className="text-subtext">Response Time</span>
                        <span className="text-accent font-bold">&lt; 24 Hours</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
