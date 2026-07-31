export interface FullCaseStudy {
  id: string;
  title: string;
  industry: string;
  services: string;
  featuredImage: string;
  galleryImages: string[];
  overview: string;
  challenge: string[];
  solution: string[];
  results: { value: string; label: string }[];
}

export const fullCaseStudies: FullCaseStudy[] = [
  {
    id: "payflow-fintech",
    title: "PayFlow FinTech",
    industry: "Financial Technology",
    services: "SEO • Google Ads • Meta Ads • Conversion Rate Optimization",
    featuredImage: "https://images.unsplash.com/photo-1556740749-887f6717d7e4?q=80&w=2000&auto=format&fit=crop",
    galleryImages: [
      "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?q=80&w=1000&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=1000&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=1000&auto=format&fit=crop",
    ],
    overview: "PayFlow FinTech approached Digitexa to scale customer acquisition while maintaining profitability in a highly competitive financial services market. Their marketing spend was increasing, but conversions were stagnating. Our team developed a full-funnel performance marketing strategy, combining advanced SEO, Google Ads, Meta Ads, and AI-powered audience segmentation.",
    challenge: [
      "High customer acquisition costs",
      "Low conversion rates",
      "Poor organic visibility",
      "Inefficient ad spend"
    ],
    solution: [
      "Advanced keyword strategy",
      "High-converting landing pages",
      "AI audience targeting",
      "Conversion optimization",
      "Performance dashboards"
    ],
    results: [
      { value: "$10M", label: "ARR achieved" },
      { value: "+340%", label: "organic traffic" },
      { value: "6.3x", label: "ROAS" },
      { value: "58%", label: "lower acquisition cost" }
    ]
  },
  {
    id: "luxe-co-ecommerce",
    title: "Luxe & Co eCommerce",
    industry: "Fashion & Luxury Retail",
    services: "Shopify Development • Performance Marketing • CRO",
    featuredImage: "https://images.unsplash.com/photo-1520607162513-77705c0f0d4a?q=80&w=2000&auto=format&fit=crop",
    galleryImages: [
      "https://images.unsplash.com/photo-1515169067868-5387ec356754?q=80&w=1000&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1516321497487-e288fb19713f?q=80&w=1000&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1556740749-887f6717d7e4?q=80&w=1000&auto=format&fit=crop",
    ],
    overview: "Luxe & Co wanted to transform its online store into a premium shopping experience that increased customer trust and maximized sales. We redesigned the Shopify storefront, optimized the checkout journey, and launched targeted advertising campaigns to drive high-quality traffic.",
    challenge: [
      "Cart abandonment",
      "Slow website speed",
      "Low mobile conversions",
      "Poor user experience"
    ],
    solution: [
      "Premium Shopify redesign",
      "Checkout optimization",
      "Store performance improvements",
      "Marketing automation",
      "Conversion-focused product pages"
    ],
    results: [
      { value: "5.2x", label: "ROAS" },
      { value: "+218%", label: "online sales" },
      { value: "45%", label: "lower CAC" },
      { value: "61%", label: "faster website" }
    ]
  },
  {
    id: "nova-healthcare",
    title: "Nova Healthcare",
    industry: "Healthcare",
    services: "Web Development • UI/UX • SEO",
    featuredImage: "https://images.unsplash.com/photo-1576091160550-2173dba999ef?q=80&w=2000&auto=format&fit=crop",
    galleryImages: [
      "https://images.unsplash.com/photo-1581092919535-7146ff1a5903?q=80&w=1000&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1579684385127-1ef15d508118?q=80&w=1000&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1532938911079-1b06ac7ceec7?q=80&w=1000&auto=format&fit=crop",
    ],
    overview: "Nova Healthcare required a modern digital platform to improve patient engagement and simplify online appointment bookings. Digitexa delivered a responsive website with accessibility-focused design, optimized performance, and SEO improvements.",
    challenge: [
      "Low online visibility",
      "Outdated interface",
      "Complicated appointment process",
      "Poor mobile experience"
    ],
    solution: [
      "Website redesign",
      "Mobile-first UI",
      "SEO optimization",
      "Appointment management integration"
    ],
    results: [
      { value: "+180%", label: "appointment bookings" },
      { value: "+290%", label: "organic traffic" },
      { value: "4.9/5", label: "patient satisfaction" },
      { value: "82%", label: "faster website" }
    ]
  },
  {
    id: "technova-saas",
    title: "TechNova SaaS",
    industry: "Software",
    services: "SaaS Development • AI Automation • Analytics",
    featuredImage: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?q=80&w=2000&auto=format&fit=crop",
    galleryImages: [
      "https://images.unsplash.com/photo-1498050108023-c5249f4df085?q=80&w=1000&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?q=80&w=1000&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1515879218367-8466d910aaa4?q=80&w=1000&auto=format&fit=crop",
    ],
    overview: "TechNova wanted to streamline customer onboarding and automate repetitive business workflows. We built a scalable SaaS platform with AI-powered automation, advanced dashboards, and seamless third-party integrations.",
    challenge: [
      "Manual processes",
      "Slow onboarding",
      "Limited reporting",
      "Low user retention"
    ],
    solution: [
      "AI workflow automation",
      "CRM integration",
      "Analytics dashboards",
      "Cloud-native architecture"
    ],
    results: [
      { value: "72%", label: "automated support" },
      { value: "+250%", label: "user engagement" },
      { value: "+185%", label: "monthly active users" },
      { value: "96%", label: "platform uptime" }
    ]
  }
];
