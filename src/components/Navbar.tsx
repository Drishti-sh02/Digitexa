"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Menu, X, Download } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { usePathname } from "next/navigation";
import { useCart } from "@/context/CartContext";
import { ShoppingCart, Heart } from "lucide-react";

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const pathname = usePathname();
  const { cartItems, likedItemIds } = useCart();

  useEffect(() => {
    let ticking = false;
    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          setIsScrolled(window.scrollY > 20);
          ticking = false;
        });
        ticking = true;
      }
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Hide Navbar on individual blog pages, case studies page, about page, and legal pages
  if (pathname.startsWith("/blog/") || pathname === "/case-studies" || pathname === "/about" || pathname === "/privacy" || pathname === "/terms") {
    return null;
  }

  const navLinks = [
    { name: "Home", href: "/" },
    { name: "Services", href: "/#services" },
    { name: "Store", href: "/#store" },
    { name: "Case Studies", href: "/#case-studies" },
    { name: "Blog", href: "/#blog" },
    { name: "About Us", href: "/about" },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled
        ? "py-4 bg-background/80 backdrop-blur-md border-b border-white/10"
        : "py-6 bg-transparent"
        }`}
    >
      <div className="container mx-auto px-6 max-w-7xl flex items-center justify-between">
        <Link href="/" className="flex items-center transition-transform hover:scale-105">
          <img loading="lazy" decoding="async"
            src="/Logo.png"
            alt="Digitexa"
            className="h-20 md:h-24 w-auto object-contain drop-shadow-[0_0_15px_rgba(109,94,247,0.3)]"
          />
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              className="text-sm font-medium text-white/80 hover:text-white transition-colors"
            >
              {link.name}
            </Link>
          ))}
        </nav>

        {/* Desktop CTA */}
        <div className="hidden md:flex items-center gap-4">
          <Link href="/downloads" className="p-2 text-white/80 hover:text-white transition-colors" title="My Downloads">
            <Download className="w-5 h-5" />
          </Link>
          <Link href="/wishlist" className="relative p-2 text-white/80 hover:text-white transition-colors" title="My Wishlist">
            <Heart className="w-5 h-5" />
            {likedItemIds.length > 0 && (
              <span className="absolute top-0 right-0 w-4 h-4 bg-red-500 rounded-full flex items-center justify-center text-[10px] font-bold text-white border border-background">
                {likedItemIds.length}
              </span>
            )}
          </Link>
          <Link href="/cart" className="relative p-2 text-white/80 hover:text-white transition-colors" title="My Cart">
            <ShoppingCart className="w-5 h-5" />
            {cartItems.length > 0 && (
              <span className="absolute top-0 right-0 w-4 h-4 bg-red-500 rounded-full flex items-center justify-center text-[10px] font-bold text-white border border-background">
                {cartItems.length}
              </span>
            )}
          </Link>
          <Link
            href="/contact"
            className="px-6 py-2.5 rounded-full bg-primary text-white text-sm font-semibold hover:bg-secondary transition-all shadow-[0_0_20px_rgba(109,94,247,0.3)] hover:shadow-[0_0_30px_rgba(109,94,247,0.5)]"
          >
            Get Started
          </Link>
        </div>

        {/* Mobile Toggle */}
        <button
          className="md:hidden text-white"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="absolute top-full left-0 right-0 bg-background/95 backdrop-blur-xl border-b border-white/10 p-6 md:hidden flex flex-col gap-4"
          >
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className="text-lg font-medium text-white/80 hover:text-white"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                {link.name}
              </Link>
            ))}
            <Link href="/downloads" className="flex items-center justify-between text-sm font-medium text-white/80 hover:text-white transition-colors py-2" onClick={() => setIsMobileMenuOpen(false)}>
              Downloads
              <Download className="w-5 h-5" />
            </Link>
            <Link href="/wishlist" className="flex items-center justify-between text-sm font-medium text-white/80 hover:text-white transition-colors py-2" onClick={() => setIsMobileMenuOpen(false)}>
              Wishlist
              {likedItemIds.length > 0 && (
                <span className="w-5 h-5 bg-red-500 rounded-full flex items-center justify-center text-xs font-bold text-white">
                  {likedItemIds.length}
                </span>
              )}
            </Link>
            <Link href="/cart" className="flex items-center justify-between text-sm font-medium text-white/80 hover:text-white transition-colors py-2" onClick={() => setIsMobileMenuOpen(false)}>
              Cart
              {cartItems.length > 0 && (
                <span className="w-5 h-5 bg-red-500 rounded-full flex items-center justify-center text-xs font-bold text-white">
                  {cartItems.length}
                </span>
              )}
            </Link>
            <Link
              href="/contact"
              className="mt-4 px-6 py-3 text-center rounded-xl bg-primary text-white font-semibold"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Get Started
            </Link>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
