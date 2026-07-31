export interface CaseStudy {
  id: string;
  title: string;
  industry: string;
  services: string;
  shortDescription: string;
  keyResults: { icon: string; text: string }[];
}

export const caseStudies: CaseStudy[] = [
  {
    id: "payflow-fintech",
    title: "PayFlow FinTech",
    industry: "Financial Technology",
    services: "SEO • Google Ads • Meta Ads • CRO",
    shortDescription: "Scaled a fast-growing fintech startup from early traction to $10M ARR in just 12 months through an integrated performance marketing strategy, conversion optimization, and AI-powered audience targeting.",
    keyResults: [
      { icon: "💰", text: "$10M Annual Recurring Revenue" },
      { icon: "📈", text: "+340% Organic Traffic" },
      { icon: "🚀", text: "6.3x Return on Ad Spend" },
      { icon: "🎯", text: "58% Lower Customer Acquisition Cost" }
    ]
  },
  {
    id: "luxe-co-ecommerce",
    title: "Luxe & Co eCommerce",
    industry: "Luxury Fashion",
    services: "Shopify Development • Performance Marketing • AI Automation",
    shortDescription: "Redesigned the Shopify experience and implemented AI-powered marketing automation that dramatically increased sales while reducing acquisition costs.",
    keyResults: [
      { icon: "🛒", text: "5.2x ROAS" },
      { icon: "📈", text: "+218% Online Revenue" },
      { icon: "💳", text: "45% Lower CAC" },
      { icon: "⚡", text: "61% Faster Store Performance" }
    ]
  },
  {
    id: "nova-healthcare",
    title: "Nova Healthcare",
    industry: "Healthcare",
    services: "UI/UX Design • Web Development • SEO",
    shortDescription: "Built a patient-first digital experience that improved appointment bookings, enhanced accessibility, and significantly increased organic visibility.",
    keyResults: [
      { icon: "🏥", text: "+180% Appointment Requests" },
      { icon: "📈", text: "+290% Organic Traffic" },
      { icon: "⭐", text: "4.9/5 Patient Satisfaction" },
      { icon: "⚡", text: "82% Faster Website" }
    ]
  },
  {
    id: "edusmart-learning",
    title: "EduSmart Learning",
    industry: "Education",
    services: "SaaS Development • CRM Automation • Analytics",
    shortDescription: "Developed an end-to-end learning platform with integrated CRM automation, enabling personalized student engagement and scalable online education.",
    keyResults: [
      { icon: "👨‍🎓", text: "+65,000 Students" },
      { icon: "📚", text: "3.8x Platform Growth" },
      { icon: "⚙️", text: "75% Process Automation" },
      { icon: "📈", text: "52% Higher Course Completion" }
    ]
  },
  {
    id: "urbannest-real-estate",
    title: "UrbanNest Real Estate",
    industry: "Real Estate",
    services: "Digital Marketing • Lead Generation • Landing Pages",
    shortDescription: "Created a lead-generation ecosystem combining paid advertising, SEO, and high-converting landing pages to consistently generate qualified property inquiries.",
    keyResults: [
      { icon: "🏠", text: "+420% Qualified Leads" },
      { icon: "💰", text: "37% Lower Cost Per Lead" },
      { icon: "📞", text: "68% Higher Conversion Rate" },
      { icon: "📈", text: "3.9x Marketing ROI" }
    ]
  },
  {
    id: "technova-saas",
    title: "TechNova SaaS",
    industry: "Software as a Service",
    services: "AI Automation • Web Development • Analytics",
    shortDescription: "Engineered an AI-powered SaaS platform with intelligent workflows, customer analytics, and automation that accelerated product adoption and retention.",
    keyResults: [
      { icon: "🤖", text: "72% Support Automation" },
      { icon: "📊", text: "+250% User Engagement" },
      { icon: "🚀", text: "+185% Monthly Active Users" },
      { icon: "💼", text: "96% Platform Uptime" }
    ]
  }
];
