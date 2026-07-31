"use client";

import { useRef, useEffect } from "react";
import { motion } from "framer-motion";
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';
import { Quote, Star } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";

const testimonials = [
  {
    id: 1,
    content: "Digitexa completely transformed our online presence. Within 6 months, our organic traffic tripled, and our cost per acquisition dropped by 40%. They are strategic partners, not just an agency.",
    author: "Sarah Jenkins",
    role: "CMO, TechNova",
    rating: 5,
  },
  {
    id: 2,
    content: "The level of expertise their team brought to our eCommerce re-platforming was unparalleled. The custom Shopify headless build increased our site speed and conversion rates dramatically.",
    author: "Marcus Chen",
    role: "Founder, Elevate Apparel",
    rating: 5,
  },
  {
    id: 3,
    content: "Their data-driven approach to Meta and Google Ads helped us scale our SaaS product efficiently. The live dashboard reporting makes tracking our ROI incredibly simple.",
    author: "Elena Rodriguez",
    role: "VP of Growth, Syncio",
    rating: 5,
  },
];

export default function TestimonialsSlider() {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    
    if (sectionRef.current) {
      const ctx = gsap.context(() => {
        gsap.from(".testimonial-header", {
          scrollTrigger: { trigger: sectionRef.current, start: "top 80%" , once: true },
          y: 40, opacity: 0, duration: 0.8
        });
        gsap.from(".testimonial-carousel", {
          scrollTrigger: { trigger: sectionRef.current, start: "top 70%" , once: true },
          scale: 0.95, opacity: 0, duration: 1
        });
      }, sectionRef);
      return () => ctx.revert();
    }
  }, []);

  return (
    <section ref={sectionRef} className="py-24 relative overflow-hidden bg-background">
      {/* Background gradients */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary/5 rounded-full blur-[100px] transform-gpu transform-gpu pointer-events-none"></div>

      <div className="container mx-auto px-6 max-w-7xl relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-16 testimonial-header">
          <h2 className="text-3xl md:text-5xl font-heading font-bold text-white mb-6">
            Client Success Stories
          </h2>
          <p className="text-subtext text-lg">
            Hear from the industry leaders who have partnered with us to accelerate their growth.
          </p>
        </div>

        <div className="testimonial-carousel">
          <Swiper
            modules={[Autoplay, Pagination]}
            spaceBetween={30}
            slidesPerView={1}
            breakpoints={{
              768: { slidesPerView: 2 },
              1024: { slidesPerView: 3 },
            }}
            autoplay={{ delay: 5000, disableOnInteraction: false }}
            pagination={{ clickable: true, bulletClass: 'swiper-pagination-bullet !bg-white/30', bulletActiveClass: 'swiper-pagination-bullet-active !bg-primary' }}
            className="pb-16"
          >
            {testimonials.map((testimonial) => (
              <SwiperSlide key={testimonial.id} className="!h-auto">
                <div className="glass p-8 rounded-2xl border border-white/10 h-full flex flex-col">
                  <div className="flex justify-between items-start mb-6">
                    <Quote className="w-10 h-10 text-primary/30" />
                    <div className="flex">
                      {[...Array(testimonial.rating)].map((_, i) => (
                        <Star key={i} className="w-4 h-4 fill-yellow-500 text-yellow-500" />
                      ))}
                    </div>
                  </div>
                  <p className="text-white/90 text-lg leading-relaxed mb-8 flex-grow">
                    "{testimonial.content}"
                  </p>
                  <div className="flex items-center gap-4 mt-auto">
                    <div>
                      <div className="text-white font-bold">{testimonial.author}</div>
                      <div className="text-subtext text-sm">{testimonial.role}</div>
                    </div>
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>
    </section>
  );
}
