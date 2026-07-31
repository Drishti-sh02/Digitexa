"use client";

import { useRef, useEffect } from "react";
import { motion } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
import { ArrowRight, BarChart, Code2, PenTool, ShoppingCart, Cpu, Paintbrush, LineChart, Cloud, Check, Zap } from "lucide-react";
import Link from "next/link";

const products = [
  {
    id: "marketing-toolkit",
    title: "Digital Marketing Toolkit",
    icon: BarChart,
    description: "A complete collection of marketing templates, campaign planners, content calendars, ad creatives, and strategy documents to help businesses execute successful marketing campaigns.",
    benefits: ["Marketing Templates", "Campaign Planners", "Content Calendar", "Social Media Assets"],
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=2000&auto=format&fit=crop",
    tag: "Best Seller"
  },
  {
    id: "automation-kit",
    title: "Business Automation Kit",
    icon: Cpu,
    description: "Ready-to-use automation workflows, CRM templates, email sequences, and AI-powered productivity systems to streamline daily business operations.",
    benefits: ["CRM Templates", "Automation Workflows", "Email Sequences", "AI Prompt Library"],
    image: "https://images.unsplash.com/photo-1677442136019-21780ecad995?q=80&w=2000&auto=format&fit=crop",
    tag: "Most Popular"
  },
  {
    id: "branding-starter-pack",
    title: "Branding Starter Pack",
    icon: Paintbrush,
    description: "Everything needed to build a memorable brand identity, including logo templates, brand guidelines, typography systems, and color palettes.",
    benefits: ["Logo Templates", "Brand Guidelines", "Color Systems", "Typography Kit"],
    image: "https://images.unsplash.com/photo-1522542550221-31fd19575a2d?q=80&w=2000&auto=format&fit=crop",
    tag: "Creative Suite"
  },
  {
    id: "website-ui-kit",
    title: "Website UI Kit",
    icon: Code2,
    description: "Modern UI components and professionally designed website layouts for agencies, startups, SaaS businesses, and eCommerce brands.",
    benefits: ["Landing Pages", "Dashboard UI", "Mobile Screens", "Component Library"],
    image: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?q=80&w=2000&auto=format&fit=crop",
    tag: "UI Library"
  },
  {
    id: "ecommerce-growth-bundle",
    title: "eCommerce Growth Bundle",
    icon: ShoppingCart,
    description: "A complete toolkit for Shopify and online store owners, including CRO checklists, product page templates, sales funnels, and optimization guides.",
    benefits: ["Shopify Templates", "CRO Checklist", "Sales Funnels", "Product Assets"],
    image: "https://images.unsplash.com/photo-1556740749-887f6717d7e4?q=80&w=2000&auto=format&fit=crop",
    tag: "Growth Bundle"
  },
  {
    id: "ai-productivity-bundle",
    title: "AI Productivity Bundle",
    icon: Zap,
    description: "A premium collection of AI prompts, automation resources, workflow templates, and business productivity tools designed to increase efficiency.",
    benefits: ["AI Prompt Library", "Workflow Templates", "Automation Guides", "Productivity Systems"],
    image: "https://images.unsplash.com/photo-1535378917042-10a22c95931a?q=80&w=2000&auto=format&fit=crop",
    tag: "AI Collection"
  }
];

export default function DigitalProducts() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    
    if (sectionRef.current) {
      const ctx = gsap.context(() => {
        gsap.utils.toArray('.product-row').forEach((row: any, i) => {
          gsap.from(row, {
            scrollTrigger: { trigger: row, start: "top 80%", once: true },
            y: 100,
            scale: 0.95,
            opacity: 0,
            duration: 1.2,
            ease: "power3.out",
          });
        });
      }, sectionRef);
      return () => ctx.revert();
    }
  }, []);

  return (
    <section ref={sectionRef} className="py-32 relative bg-[#030510]">
      {/* Background elements */}
      <div className="absolute top-0 right-0 w-1/2 h-[600px] bg-primary/5 rounded-full blur-[120px] transform-gpu transform-gpu mix-blend-screen pointer-events-none"></div>
      
      <div className="container mx-auto px-6 max-w-7xl relative z-10">
        <div className="flex flex-col md:flex-row justify-between items-end mb-24 gap-6">
          <div className="max-w-3xl">
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-heading font-bold text-white mb-6 leading-tight">
              Premium Digital Products for <span className="text-gradient">Modern Businesses</span>
            </h2>
            <p className="text-subtext text-lg">
              Accelerate your business with professionally crafted digital resources designed to save time, improve productivity, and drive measurable results. Our premium products are instantly accessible worldwide through trusted marketplaces.
            </p>
          </div>
          <Link href="/products" className="px-6 py-3 rounded-full border border-white/20 text-white font-medium hover:bg-white/10 transition-colors inline-flex items-center gap-2 shrink-0">
            Explore All Products
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="space-y-32">
          {products.map((product, idx) => {
            const isEven = idx % 2 === 1;
            return (
              <div key={product.id} className={`product-row grid grid-cols-1 lg:grid-cols-2 gap-16 items-center`}>
                
                {/* Content Block */}
                <div className={`flex flex-col ${isEven ? 'lg:order-2' : 'lg:order-1'}`}>
                  <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center mb-8 border border-white/5 shadow-[0_0_20px_rgba(109,94,247,0.15)]">
                    <product.icon className="w-7 h-7 text-white" />
                  </div>
                  
                  <h3 className="text-3xl md:text-4xl font-bold text-white mb-6 font-heading">{product.title}</h3>
                  <p className="text-subtext text-lg mb-8 leading-relaxed max-w-lg">
                    {product.description}
                  </p>
                  
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-10">
                    {product.benefits.map((benefit, i) => (
                      <div key={i} className="flex items-center gap-3">
                        <div className="w-6 h-6 rounded-full bg-primary/20 flex items-center justify-center shrink-0">
                           <Check className="w-3 h-3 text-primary" />
                        </div>
                        <span className="text-white/90 font-medium">{benefit}</span>
                      </div>
                    ))}
                  </div>
                </div>
                
                {/* Image Block (Large Responsive & Animated) */}
                <div className={`flex items-center justify-center w-full ${isEven ? 'lg:order-1' : 'lg:order-2'}`}>
                  <div className="relative w-full max-w-sm sm:max-w-md lg:max-w-[500px] aspect-square rounded-[2rem] overflow-hidden glass border border-white/10 shadow-[0_0_50px_rgba(109,94,247,0.15)] group cursor-pointer hover:border-primary/50 transition-colors">
                    <img loading="lazy" decoding="async" 
                      src={product.image} 
                      alt={product.title} 
                      className="w-full h-full object-cover opacity-80 group-hover:scale-110 group-hover:-rotate-3 transition-transform duration-700" 
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#030510]/80 via-transparent to-transparent opacity-60"></div>
                    
                    {/* Floating Tech/Stat element for visual interest */}
                    <motion.div 
                       animate={{ y: [-5, 5, -5] }} 
                       transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                       className="absolute bottom-6 left-6 right-6 glass p-4 rounded-xl border border-white/10 backdrop-blur-md flex items-center justify-between"
                    >
                       <div className="flex items-center gap-3">
                          <div className="w-2 h-2 rounded-full bg-accent animate-ping"></div>
                          <span className="text-sm font-medium text-white">Product Tag</span>
                       </div>
                       <span className="text-xs font-bold text-accent uppercase tracking-wider">{product.tag}</span>
                    </motion.div>
                  </div>
                </div>
                
              </div>
            );
          })}
        </div>
        
        <div className="mt-16 text-center">
          <Link href="/products" className="inline-flex items-center gap-2 bg-gradient-to-r from-primary to-accent px-8 py-4 rounded-full text-white font-bold text-lg hover:shadow-[0_0_30px_rgba(110,86,207,0.5)] transition-all transform hover:scale-105">
            Explore All Products <ArrowRight className="w-5 h-5" />
          </Link>
        </div>
      </div>
    </section>
  );
}
