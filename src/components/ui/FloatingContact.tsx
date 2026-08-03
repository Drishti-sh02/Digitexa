"use client";

import { useState } from "react";
import { Phone, Mail, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const WhatsappIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M3 21l1.65-3.8a9 9 0 1 1 3.4 2.9L3 21"></path>
    <path d="M9 10a.5.5 0 0 0 1 0V9a.5.5 0 0 0-1 0v1a5 5 0 0 0 5 5h1a.5.5 0 0 0 0-1h-1a.5.5 0 0 0 0 1"></path>
  </svg>
);

export default function FloatingContact() {
  const [isOpen, setIsOpen] = useState(false);

  const contactOptions = [
    {
      name: "WhatsApp",
      icon: <WhatsappIcon />,
      href: "https://wa.me/919971123820",
      color: "bg-[#25D366] hover:bg-[#22c15e]",
    },
    {
      name: "Phone",
      icon: <Phone className="w-5 h-5" />,
      href: "tel:+919971123820",
      color: "bg-blue-600 hover:bg-blue-700",
    },
    {
      name: "Email",
      icon: <Mail className="w-5 h-5" />,
      href: "mailto:info@digitexa.co.in",
      color: "bg-[#6C63FF] hover:bg-[#5a52d5]",
    },
  ];

  return (
    <div className="fixed bottom-6 right-6 z-[100] flex flex-col items-end gap-3">
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.9 }}
            className="flex flex-col gap-3"
          >
            {contactOptions.map((option) => (
              <a
                key={option.name}
                href={option.href}
                className={`w-12 h-12 rounded-full shadow-lg ${option.color} text-white flex items-center justify-center hover:scale-110 transition-transform cursor-pointer`}
                title={option.name}
                target={option.name === "WhatsApp" ? "_blank" : undefined}
                rel={option.name === "WhatsApp" ? "noopener noreferrer" : undefined}
              >
                {option.icon}
                <span className="sr-only">{option.name}</span>
              </a>
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-14 h-14 rounded-full bg-gradient-to-r from-[#6C63FF] to-[#00D4FF] text-white shadow-[0_0_20px_rgba(108,99,255,0.4)] flex items-center justify-center hover:scale-110 transition-transform"
        aria-label="Contact Options"
      >
        <AnimatePresence mode="wait">
          {isOpen ? (
            <motion.div
              key="close"
              initial={{ rotate: -90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: 90, opacity: 0 }}
              transition={{ duration: 0.2 }}
            >
              <X className="w-6 h-6" />
            </motion.div>
          ) : (
            <motion.div
              key="open"
              initial={{ rotate: 90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: -90, opacity: 0 }}
              transition={{ duration: 0.2 }}
            >
              <WhatsappIcon />
            </motion.div>
          )}
        </AnimatePresence>
      </button>
    </div>
  );
}
