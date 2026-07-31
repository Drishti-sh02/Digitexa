"use client";

import { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { X, CheckCircle2 } from "lucide-react";
import Link from "next/link";

export interface ServiceDataNew {
  title: string;
  icon: any;
  shortDesc: string;
  featuredImage: string;
  thumbnails: string[];
  keyServices: string[];
  benefits: string[];
}

interface ServiceInfoCardProps {
  service: ServiceDataNew | null;
  isOpen: boolean;
  onClose: () => void;
  slideDirection?: "left" | "right"; // Kept for compatibility with FeaturedServices
}

export default function ServiceInfoCard({ service, isOpen, onClose }: ServiceInfoCardProps) {
  const popupRef = useRef<HTMLDivElement>(null);

  // Close on ESC and manage body scroll
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };

    if (isOpen) {
      document.body.style.overflow = "hidden";
      window.addEventListener("keydown", handleKeyDown);
    } else {
      document.body.style.overflow = "unset";
    }

    return () => {
      document.body.style.overflow = "unset";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen || !service) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      {/* Backdrop */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.4 }}
        className="absolute inset-0 bg-[#050816]/80 backdrop-blur-md"
        onClick={onClose}
      />

      {/* Floating Card */}
      <motion.div
        ref={popupRef}
        initial={{ y: "-100vh", opacity: 1 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: "-100vh", opacity: 1 }}
        transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }} // Smooth deceleration (custom easeOut)
        className="relative z-10 w-full max-w-[800px] bg-[#0B1020] rounded-[20px] shadow-[0_0_50px_rgba(109,94,247,0.3),_0_0_80px_rgba(109,94,247,0.15)] border border-primary/30 overflow-hidden flex flex-col"
      >
        {/* Header / Close Button */}
        <div className="absolute top-4 right-4 z-20">
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-white/5 hover:bg-white/10 flex items-center justify-center text-white/70 hover:text-white transition-colors border border-white/10"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Top Section: Split Layout */}
        <div className="p-8 pb-6 flex flex-col md:flex-row gap-8 relative">
          {/* Subtle Glow */}
          <div className="absolute top-0 left-0 w-full h-full bg-primary/20 blur-[100px] transform-gpu transform-gpu rounded-full pointer-events-none" />

          {/* Left: Featured Image */}
          <div className="shrink-0 w-full md:w-[220px] h-[150px] rounded-xl overflow-hidden border border-white/10 group relative z-10">
            <img loading="lazy" decoding="async"
              src={service.featuredImage}
              alt={service.title}
              className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
            />
          </div>

          {/* Right: Info */}
          <div className="flex-grow relative z-10 space-y-4">
            <div>
              <h2 className="text-2xl font-bold text-white mb-2 drop-shadow-[0_0_10px_rgba(255,255,255,0.3)]">{service.title}</h2>
              <p className="text-subtext text-sm leading-relaxed">{service.shortDesc}</p>
            </div>

            <div className="grid grid-cols-2 gap-4">
              {/* Key Services */}
              <div>
                <h4 className="text-white text-xs font-semibold uppercase tracking-wider mb-2">Key Services</h4>
                <ul className="space-y-1.5">
                  {service.keyServices.map((item, idx) => (
                    <li key={idx} className="flex items-start gap-2 text-sm">
                      <CheckCircle2 className="w-4 h-4 text-primary shrink-0 mt-0.5 drop-shadow-[0_0_5px_rgba(109,94,247,0.8)]" />
                      <span className="text-white/80">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Benefits */}
              <div>
                <h4 className="text-white text-xs font-semibold uppercase tracking-wider mb-2">Benefits</h4>
                <ul className="space-y-1.5">
                  {service.benefits.map((item, idx) => (
                    <li key={idx} className="flex items-start gap-2 text-sm">
                      <div className="w-4 h-4 rounded-full bg-secondary/20 flex items-center justify-center shrink-0 mt-0.5">
                        <div className="w-1.5 h-1.5 rounded-full bg-secondary drop-shadow-[0_0_5px_rgba(255,0,255,0.8)]" />
                      </div>
                      <span className="text-white/80">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>

        {/* Middle Section: Thumbnails */}
        <div className="px-8 pb-8 relative z-10">
          <div className="flex gap-4 overflow-x-auto pb-2 custom-scrollbar">
            {service.thumbnails.map((thumb, idx) => (
              <div 
                key={idx} 
                className="shrink-0 w-[90px] h-[70px] rounded-[12px] overflow-hidden border border-white/10 group relative shadow-[0_0_15px_rgba(0,0,0,0.5)] cursor-pointer hover:border-primary/50 transition-colors"
              >
                <img loading="lazy" decoding="async"
                  src={thumb}
                  alt={`${service.title} thumbnail ${idx + 1}`}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors" />
              </div>
            ))}
          </div>
        </div>
      </motion.div>
    </div>
  );
}
