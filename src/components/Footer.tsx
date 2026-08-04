"use client";

import Link from "next/link";
import { Mail, MapPin, Phone, ArrowRight, Send } from "lucide-react";
import { usePathname } from "next/navigation";

const WhatsappIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M3 21l1.65-3.8a9 9 0 1 1 3.4 2.9L3 21"></path>
    <path d="M9 10a.5.5 0 0 0 1 0V9a.5.5 0 0 0-1 0v1a5 5 0 0 0 5 5h1a.5.5 0 0 0 0-1h-1a.5.5 0 0 0 0 1"></path>
  </svg>
);

export default function Footer() {
  const pathname = usePathname();

  if (pathname === "/case-studies" || pathname === "/about" || pathname.startsWith("/blog/") || pathname === "/privacy" || pathname === "/terms") {
    return null;
  }

  return (
    <footer className="bg-[#030510] border-t border-white/5 relative overflow-hidden">
      {/* Visual Header / Newsletter Section */}


      <div className="container mx-auto px-6 max-w-7xl pt-20 pb-10 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          {/* Brand */}
          <div className="flex flex-col gap-6">
            <Link href="/" className="text-3xl font-heading font-bold text-white flex items-center gap-2">
              Digi<span className="text-gradient">texa</span>
            </Link>
            <p className="text-subtext text-sm leading-relaxed pr-6">
              Accelerating Brands Through Intelligent Digital Marketing. We blend creativity with data to drive measurable business growth globally.
            </p>
            <div className="flex items-center gap-4 mt-2">
              <Link href="https://wa.me/919971123820" className="w-12 h-12 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-white hover:bg-primary hover:border-primary transition-all">
                <WhatsappIcon />
              </Link>
              <Link href="mailto:info@digitexa.co.in" className="w-12 h-12 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-white hover:bg-primary hover:border-primary transition-all" title="info@digitexa.co.in">
                <Mail size={18} />
              </Link>
              <Link href="tel:+919971123820" className="w-12 h-12 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-white hover:bg-primary hover:border-primary transition-all">
                <Phone size={18} />
              </Link>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-white font-heading font-bold mb-8 text-lg">Quick Links</h4>
            <ul className="flex flex-col gap-4">
              <li><Link href="/about" className="text-subtext hover:text-primary transition-colors text-sm flex items-center gap-2 group"><ArrowRight className="w-3 h-3 opacity-0 -ml-5 group-hover:opacity-100 group-hover:ml-0 transition-all" /> About Us</Link></li>
              <li><Link href="/case-studies" className="text-subtext hover:text-primary transition-colors text-sm flex items-center gap-2 group"><ArrowRight className="w-3 h-3 opacity-0 -ml-5 group-hover:opacity-100 group-hover:ml-0 transition-all" /> Case Studies</Link></li>
              <li><Link href="/blog/ai-performance-marketing" className="text-subtext hover:text-primary transition-colors text-sm flex items-center gap-2 group"><ArrowRight className="w-3 h-3 opacity-0 -ml-5 group-hover:opacity-100 group-hover:ml-0 transition-all" /> Insights & Blog</Link></li>
              <li><Link href="/contact" className="text-subtext hover:text-primary transition-colors text-sm flex items-center gap-2 group"><ArrowRight className="w-3 h-3 opacity-0 -ml-5 group-hover:opacity-100 group-hover:ml-0 transition-all" /> Get Started</Link></li>
            </ul>
          </div>

          {/* Services */}
          <div>
            <h4 className="text-white font-heading font-bold mb-8 text-lg">Services</h4>
            <ul className="flex flex-col gap-4">
              <li><span className="text-subtext hover:text-primary transition-colors text-sm flex items-center gap-2 group cursor-default"><ArrowRight className="w-3 h-3 opacity-0 -ml-5 group-hover:opacity-100 group-hover:ml-0 transition-all" /> SEO Optimization</span></li>
              <li><span className="text-subtext hover:text-primary transition-colors text-sm flex items-center gap-2 group cursor-default"><ArrowRight className="w-3 h-3 opacity-0 -ml-5 group-hover:opacity-100 group-hover:ml-0 transition-all" /> Performance Marketing</span></li>
              <li><span className="text-subtext hover:text-primary transition-colors text-sm flex items-center gap-2 group cursor-default"><ArrowRight className="w-3 h-3 opacity-0 -ml-5 group-hover:opacity-100 group-hover:ml-0 transition-all" /> Social Media Management</span></li>
              <li><span className="text-subtext hover:text-primary transition-colors text-sm flex items-center gap-2 group cursor-default"><ArrowRight className="w-3 h-3 opacity-0 -ml-5 group-hover:opacity-100 group-hover:ml-0 transition-all" /> Web Development</span></li>
              <li><span className="text-subtext hover:text-primary transition-colors text-sm flex items-center gap-2 group cursor-default"><ArrowRight className="w-3 h-3 opacity-0 -ml-5 group-hover:opacity-100 group-hover:ml-0 transition-all" /> Branding & Design</span></li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-white font-heading font-bold mb-8 text-lg">Contact Us</h4>
            <ul className="flex flex-col gap-6">
              <li className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center shrink-0">
                  <MapPin size={18} className="text-primary" />
                </div>
                <div className="flex flex-col pt-2">
                  <span className="text-white font-medium text-sm mb-1">Headquarters</span>
                  <span className="text-subtext text-sm leading-relaxed">43 NEAR MOTHER SCHOOL, ADHCHINI , MMTC/STC Colony, SOUTH DELHI, DELHI, 110017.</span>
                </div>
              </li>
              <li className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center shrink-0">
                  <Phone size={18} className="text-primary" />
                </div>
                <div className="flex flex-col pt-2">
                  <span className="text-white font-medium text-sm mb-1">Phone</span>
                  <span className="text-subtext text-sm">+91 9971123820</span>
                </div>
              </li>
              <li className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center shrink-0">
                  <Mail size={18} className="text-primary" />
                </div>
                <div className="flex flex-col pt-2 gap-1">
                  <span className="text-white font-medium text-sm mb-1">Email</span>
                  <span className="text-subtext text-sm">info@digitexa.co.in</span>
                  <span className="text-subtext text-sm">digitech@gmail.com</span>
                </div>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row items-center justify-between gap-4 mt-8">
          <p className="text-subtext text-sm font-medium">
            © {new Date().getFullYear()} Digitexa. All rights reserved.
          </p>
          <div className="flex gap-8">
            <Link href="/privacy" className="text-subtext hover:text-white transition-colors text-sm font-medium">Privacy Policy</Link>
            <Link href="/terms" className="text-subtext hover:text-white transition-colors text-sm font-medium">Terms of Service</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
