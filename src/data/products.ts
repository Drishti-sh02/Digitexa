export interface Product {
  id: string;
  title: string;
  description: string;
  category: string;
  price: number;
  rating: number;
  downloads: string;
  image: string;
  badge: string;
  version: string;
  fileSize: string;
  createdAt: string;
  downloadUrl?: string;
  cardImage?: string;
}

export const products: Product[] = [
  {
    id: "marketing-toolkit",
    title: "Digital Marketing Toolkit",
    description: "A complete collection of marketing templates, campaign planners, content calendars, ad creatives, and strategy documents to help businesses execute successful marketing campaigns.",
    category: "Marketing",
    price: 39,
    rating: 5,
    downloads: "12K+",
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=2000&auto=format&fit=crop",
    badge: "Digistore24",
    version: "2.1",
    fileSize: "156 MB",
    createdAt: "2025-05-12T00:00:00Z"
  },
  {
    id: "automation-kit",
    title: "Business Automation Kit",
    description: "Ready-to-use automation workflows, CRM templates, email sequences, and AI-powered productivity systems to streamline daily business operations.",
    category: "Business",
    price: 59,
    rating: 4.9,
    downloads: "8.5K+",
    image: "https://images.unsplash.com/photo-1677442136019-21780ecad995?q=80&w=2000&auto=format&fit=crop",
    badge: "ClickBank",
    version: "1.4",
    fileSize: "89 MB",
    createdAt: "2025-08-20T00:00:00Z"
  },
  {
    id: "branding-starter-pack",
    title: "Branding Starter Pack",
    description: "Everything needed to build a memorable brand identity, including logo templates, brand guidelines, typography systems, and color palettes.",
    category: "Design",
    price: 29,
    rating: 4.8,
    downloads: "15K+",
    image: "https://images.unsplash.com/photo-1522542550221-31fd19575a2d?q=80&w=2000&auto=format&fit=crop",
    badge: "CopeCart",
    version: "3.0",
    fileSize: "450 MB",
    createdAt: "2024-11-05T00:00:00Z"
  },
  {
    id: "website-ui-kit",
    title: "Website UI Kit",
    description: "Modern UI components and professionally designed website layouts for agencies, startups, SaaS businesses, and eCommerce brands.",
    category: "Design",
    price: 49,
    rating: 5,
    downloads: "20K+",
    image: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?q=80&w=2000&auto=format&fit=crop",
    badge: "Digistore24",
    version: "1.0",
    fileSize: "1.2 GB",
    createdAt: "2026-01-15T00:00:00Z"
  },
  {
    id: "ecommerce-growth-bundle",
    title: "eCommerce Growth Bundle",
    description: "Conversion-optimized landing pages, ad copy templates, abandoned cart sequences, and scaling strategies for online stores.",
    category: "eCommerce",
    price: 69,
    rating: 4.7,
    downloads: "5K+",
    image: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?q=80&w=2000&auto=format&fit=crop",
    badge: "ClickBank",
    version: "1.2",
    fileSize: "320 MB",
    createdAt: "2025-09-30T00:00:00Z"
  },
  {
    id: "seo-masterclass-docs",
    title: "SEO Masterclass Docs",
    description: "Comprehensive SEO checklists, keyword research frameworks, backlink outreach templates, and technical audit guides.",
    category: "Marketing",
    price: 19,
    rating: 4.9,
    downloads: "22K+",
    image: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?q=80&w=2000&auto=format&fit=crop",
    badge: "CopeCart",
    version: "4.0",
    fileSize: "45 MB",
    createdAt: "2024-03-22T00:00:00Z"
  },
  {
    id: "secret-of-the-universe",
    title: "The Secrets Of The Universe",
    description: "Explore the fascinating mysteries of space, stars, galaxies, black holes, and the origins of the universe in this beautifully designed educational eBook. Perfect for science enthusiasts, students, and curious readers. Product type: eBook.",
    category: "eBook",
    price: 100,
    rating: 5,
    downloads: "500+",
    image: "/TSOU COVER.png",
    badge: "New",
    version: "1.0",
    fileSize: "15 MB",
    createdAt: "2026-07-31T00:00:00Z",
    downloadUrl: "/The_Secret_Of_The_Universe.pdf",
    cardImage: "/TSOU PC.png"
  },

  {
    id: "future-technologies-ai-vol1",
    title: "Future Technologies: Artificial Intelligence",
    description: "Future Technologies is a premium 4-volume eBook series exploring the innovations shaping tomorrow.\n\nVolume I – Artificial Intelligence: Discover how AI is transforming industries, businesses, and everyday life through easy-to-understand explanations and stunning infographics.\n\nComing Next:\n\nVolume II – Blockchain & Web3\nVolume III – Internet of Things & Robotics\nVolume IV – Quantum Computing & Future Innovations\n\nPerfect for students, professionals, and technology enthusiasts who want to understand the future—one innovation at a time.",
    category: "eBook",
    price: 120,
    rating: 5,
    downloads: "0+",
    image: "/AI V1 COVER.png",
    badge: "New",
    version: "1.0",
    fileSize: "15 MB",
    createdAt: "2026-08-02T00:00:00Z",
    downloadUrl: "/Future technologies volume 1 AI.pdf",
    cardImage: "/AI V1 PC.png"
  },
  {
    id: "future-technologies-blockchain-vol2",
    title: "Future Technologies: Blockchain & Web3",
    description: "Future Technologies is a premium 4-volume eBook series exploring the innovations shaping tomorrow.\n\nVolume II – Blockchain & Web3: Discover the decentralized digital world through blockchain, cryptocurrencies, smart contracts, NFTs, DeFi, DAOs, and the next generation of the internet.\n\nThe internet is evolving, and Blockchain & Web3 are at the heart of this transformation. This volume provides a clear and engaging introduction to the technologies powering the next generation of the digital world. Designed for students, professionals, and technology enthusiasts, it explains complex concepts through simple language, practical examples, and visually rich infographics.\n\nExplore the fundamentals of blockchain, understand how cryptocurrencies like Bitcoin work, and discover the power of Ethereum, smart contracts, NFTs, Decentralized Finance (DeFi), DAOs, and Web3 applications. Learn how cryptography secures digital transactions, why decentralization matters, and how blockchain is transforming industries such as finance, healthcare, supply chains, education, and digital identity.\n\nThe book also examines blockchain security, privacy, regulatory challenges, and the future of decentralized technologies, providing a balanced perspective on both opportunities and limitations. Bonus sections include additional learning resources, real-world case studies, expert tips, and quick-reference guides to reinforce your understanding.\n\nWhether you're beginning your blockchain journey or looking to strengthen your knowledge, Blockchain & Web3 offers the essential insights needed to understand one of the most revolutionary technologies of the 21st century and prepares you to navigate the decentralized future with confidence.",
    category: "eBook",
    price: 125,
    rating: 5,
    downloads: "0+",
    image: "/BLOCKCHAIN COVER.jpeg",
    badge: "New",
    version: "1.0",
    fileSize: "15 MB",
    createdAt: "2026-08-02T00:00:00Z",
    downloadUrl: "/Future technologies V2 blockchain.pdf",
    cardImage: "/BLOCKCHAIN PC.png"
  }
];
