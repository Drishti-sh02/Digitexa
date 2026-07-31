"use client";

import { useRef, useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
import { ArrowRight, TrendingUp, Code, PenTool, ShoppingCart, Bot, Sparkles, BarChart3, Cloud } from "lucide-react";
import ServiceInfoCard, { ServiceDataNew } from "./ServiceInfoCard";

const featuredServices: ServiceDataNew[] = [
  {
    title: "Digital Marketing",
    icon: TrendingUp,
    shortDesc: "Grow your business using performance-driven digital marketing strategies focused on increasing traffic, leads, and revenue.",
    featuredImage: "https://images.unsplash.com/photo-1460925895917-afdab827c52f",
    thumbnails: [
      "https://images.unsplash.com/photo-1552664730-d307ca884978",
      "https://images.unsplash.com/photo-1557838923-2985c318be48",
      "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40"
    ],
    keyServices: ["SEO Optimization", "Google Ads", "Meta Ads", "Lead Generation"],
    benefits: ["Higher Website Traffic", "Better Brand Visibility", "Qualified Leads", "Higher ROI"]
  },
  {
    title: "Web Development",
    icon: Code,
    shortDesc: "Build modern, scalable, secure, and lightning-fast websites tailored to your business goals.",
    featuredImage: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3",
    thumbnails: [
      "https://images.unsplash.com/photo-1498050108023-c5249f4df085",
      "https://images.unsplash.com/photo-1515879218367-8466d910aaa4",
      "https://images.unsplash.com/photo-1517694712202-14dd9538aa97"
    ],
    keyServices: ["Corporate Websites", "Landing Pages", "Custom Web Apps", "CMS Development"],
    benefits: ["Fast Loading", "Mobile Responsive", "SEO Ready", "Highly Secure"]
  },
  {
    title: "UI/UX Design",
    icon: PenTool,
    shortDesc: "Create visually stunning and user-centered digital experiences that improve engagement and conversion rates.",
    featuredImage: "https://images.unsplash.com/photo-1558655146-9f40138edfeb",
    thumbnails: [
      "https://images.unsplash.com/photo-1507238691740-187a5b1d37b8",
      "https://images.unsplash.com/photo-1498050108023-c5249f4df085",
      "https://images.unsplash.com/photo-1522542550221-31fd19575a2d"
    ],
    keyServices: ["Website Design", "Mobile App Design", "Dashboard Design", "Design Systems"],
    benefits: ["Better User Experience", "Higher Conversion", "Consistent Branding", "Modern Interfaces"]
  },
  {
    title: "Shopify Development",
    icon: ShoppingCart,
    shortDesc: "Launch high-converting Shopify stores with premium themes, custom functionality, and optimized shopping experiences.",
    featuredImage: "https://images.unsplash.com/photo-1556740749-887f6717d7e4",
    thumbnails: [
      "https://images.unsplash.com/photo-1515169067868-5387ec356754",
      "https://images.unsplash.com/photo-1520607162513-77705c0f0d4a",
      "https://images.unsplash.com/photo-1516321497487-e288fb19713f"
    ],
    keyServices: ["Store Development", "Theme Customization", "Shopify Apps", "Speed Optimization"],
    benefits: ["Faster Store", "Better Sales", "Easy Management", "Scalable"]
  },
  {
    title: "AI Automation",
    icon: Bot,
    shortDesc: "Automate repetitive workflows and customer interactions using AI-powered systems that save time and improve efficiency.",
    featuredImage: "https://images.unsplash.com/photo-1677442136019-21780ecad995",
    thumbnails: [
      "https://images.unsplash.com/photo-1485827404703-89b55fcc595e",
      "https://images.unsplash.com/photo-1535378917042-10a22c95931a",
      "https://images.unsplash.com/photo-1526378722484-bd91ca387e72"
    ],
    keyServices: ["AI Chatbots", "CRM Automation", "Email Automation", "Workflow Automation"],
    benefits: ["Reduced Manual Work", "24/7 Customer Support", "Higher Productivity", "Increased Efficiency"]
  },
  {
    title: "Branding & Creative",
    icon: Sparkles,
    shortDesc: "Develop memorable brand identities that establish trust and create lasting impressions across all digital platforms.",
    featuredImage: "https://images.unsplash.com/photo-1522542550221-31fd19575a2d",
    thumbnails: [
      "https://images.unsplash.com/photo-1455390582262-044cdead277a",
      "https://images.unsplash.com/photo-1516321497487-e288fb19713f",
      "https://images.unsplash.com/photo-1504384308090-c894fdcc538d"
    ],
    keyServices: ["Logo Design", "Brand Guidelines", "Social Media Creatives", "Marketing Assets"],
    benefits: ["Strong Brand Identity", "Better Recognition", "Professional Image", "Customer Trust"]
  },
  {
    title: "Analytics & Reporting",
    icon: BarChart3,
    shortDesc: "Measure every marketing effort using advanced analytics dashboards and business intelligence solutions.",
    featuredImage: "https://images.unsplash.com/photo-1551288049-bebda4e38f71",
    thumbnails: [
      "https://images.unsplash.com/photo-1460925895917-afdab827c52f",
      "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40",
      "https://images.unsplash.com/photo-1552664730-d307ca884978"
    ],
    keyServices: ["Google Analytics", "KPI Dashboards", "Heatmaps", "Performance Reports"],
    benefits: ["Better Decision Making", "Clear ROI", "Actionable Insights", "Growth Tracking"]
  },
  {
    title: "SaaS Product Development",
    icon: Cloud,
    shortDesc: "Design and develop scalable SaaS platforms that streamline business operations and support long-term growth.",
    featuredImage: "https://images.unsplash.com/photo-1451187580459-43490279c0fa",
    thumbnails: [
      "https://images.unsplash.com/photo-1516321318423-f06f85e504b3",
      "https://images.unsplash.com/photo-1517694712202-14dd9538aa97",
      "https://images.unsplash.com/photo-1498050108023-c5249f4df085"
    ],
    keyServices: ["CRM Systems", "Business Automation", "SaaS Dashboards", "Admin Panels"],
    benefits: ["Scalable Architecture", "Cloud Ready", "Secure", "Enterprise Grade"]
  }
];

export default function FeaturedServices() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [selectedService, setSelectedService] = useState<ServiceDataNew | null>(null);
  const [slideDirection, setSlideDirection] = useState<"left" | "right">("right");

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    
    if (sectionRef.current) {
      const ctx = gsap.context(() => {
        gsap.from(".service-card", {
          scrollTrigger: { trigger: sectionRef.current, start: "top 75%", once: true },
          y: 60,
          opacity: 0,
          duration: 0.8,
          stagger: 0.15,
          ease: "power3.out",
        });
      }, sectionRef);
      return () => ctx.revert();
    }
  }, []);

  const handleOpenPopup = (service: ServiceDataNew, index: number) => {
    // If the index is even (left column in 2-col layout), slide from right.
    // If odd (right column), slide from left.
    setSlideDirection(index % 2 === 0 ? "right" : "left");
    setSelectedService(service);
  };

  return (
    <>
      <section id="services" ref={sectionRef} className="py-24 md:py-32 relative overflow-hidden bg-[#050816] scroll-mt-24">
        <div className="container mx-auto px-6 max-w-7xl relative z-10">
          
          <div className="flex flex-col text-center items-center mb-16 max-w-3xl mx-auto">
            <h2 className="text-4xl md:text-5xl font-heading font-bold text-white mb-6">
              Our <span className="text-gradient">Featured Services</span>
            </h2>
            <p className="text-subtext text-lg">
              Specialized teams deploying best-in-class strategies across every digital channel.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {featuredServices.map((service, idx) => (
              <div 
                key={idx} 
                className="service-card group glass rounded-3xl border border-white/10 overflow-hidden hover:border-primary/50 transition-colors flex flex-col h-full bg-white/5"
              >
                {/* Large Image Top */}
                <div className="h-48 w-full relative overflow-hidden">
                  <img loading="lazy" decoding="async" 
                    src={service.featuredImage} 
                    alt={service.title} 
                    className="w-full h-full object-cover opacity-80 group-hover:scale-110 transition-transform duration-700" 
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#15192c] via-transparent to-transparent"></div>
                  
                  {/* Floating Icon */}
                  <div className="absolute bottom-4 left-6 w-12 h-12 rounded-xl bg-primary/20 backdrop-blur-md flex items-center justify-center border border-white/10 shadow-xl group-hover:bg-primary transition-colors">
                    <service.icon className="w-6 h-6 text-white" />
                  </div>
                </div>
                
                <div className="p-8 flex flex-col h-full bg-gradient-to-b from-[#15192c] to-transparent">
                  <h3 className="text-xl font-bold text-white mb-3 font-heading group-hover:text-primary transition-colors line-clamp-1">
                    {service.title}
                  </h3>
                  
                  <p className="text-subtext text-sm mb-6 leading-relaxed flex-grow line-clamp-3">
                    {service.shortDesc}
                  </p>
                  
                  <button 
                    onClick={() => handleOpenPopup(service, idx)}
                    className="mt-auto pt-4 border-t border-white/10 w-full flex items-center justify-between text-white font-medium group/btn cursor-pointer outline-none focus:outline-none"
                  >
                    <span className="group-hover/btn:text-primary transition-colors">Explore Service</span>
                    <div className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center group-hover/btn:bg-primary transition-colors">
                      <ArrowRight className="w-4 h-4" />
                    </div>
                  </button>
                </div>
              </div>
            ))}
          </div>
          
        </div>
      </section>

      <AnimatePresence>
        {selectedService && (
          <ServiceInfoCard
            service={selectedService}
            isOpen={!!selectedService}
            onClose={() => setSelectedService(null)}
            slideDirection={slideDirection}
          />
        )}
      </AnimatePresence>
    </>
  );
}
