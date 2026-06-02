// ============================================================================
// Site Configuration
// ============================================================================

export interface SiteConfig {
  title: string;
  description: string;
  language: string;
}

export const siteConfig: SiteConfig = {
  title: "Vijay Shirsath | Full Stack & Cloud Engineer",
  description:
    "Full Stack & Cloud Engineer specializing in GenAI systems, cloud infrastructure, CI/CD automation, and production deployments.",
  language: "en",
};

// ============================================================================
// Navigation Configuration
// ============================================================================

export interface NavItem {
  label: string;
  href: string;
}

export interface NavigationConfig {
  logo: string;
  items: NavItem[];
}

export const navigationConfig: NavigationConfig = {
  logo: "VS",
  items: [
    { label: "About", href: "#about" },
    { label: "Experience", href: "#experience" },
    { label: "Projects", href: "#projects" },
    { label: "Skills", href: "#skills" },
    { label: "Contact", href: "#contact" },
  ],
};

// ============================================================================
// Hero Section Configuration
// ============================================================================

export interface SocialLink {
  name: string;
  url: string;
  icon: string;
}

export interface HeroConfig {
  title: string;
  subtitle: string;
  summary: string;
  backgroundImage: string;
  servicesLabel: string;
  copyright: string;
  resumeUrl: string;
  socialLinks: SocialLink[];
}

export const heroConfig: HeroConfig = {
  title: "Vijay Shirsath",
  subtitle: "Full Stack & Cloud Engineer",
  summary:
    "Building production GenAI agents, cloud infrastructure & scalable systems. Currently at Capgemini, transforming ideas into high-performance solutions with 85% latency reduction & 90% faster deployments.",
  backgroundImage: "/hero-bg.jpg",
  servicesLabel: "GenAI | Cloud | Full Stack",
  copyright: "© 2025 Vijay Shirsath",
  resumeUrl: "/yatharth_mishra_resume.pdf",
  socialLinks: [
    {
      name: "LinkedIn",
      url: "https://linkedin.com/in/yatharth-mishra2609",
      icon: "Linkedin",
    },
    {
      name: "GitHub",
      url: "https://github.com/Yatharth2609",
      icon: "Github",
    },
    {
      name: "Email",
      url: "mailto:vijayshirsath2015@gmail.com",
      icon: "Mail",
    },
  ],
};

// ============================================================================
// About Section Configuration
// ============================================================================

export interface AboutConfig {
  titleLine1: string;
  titleLine2: string;
  description: string;
  image1: string;
  image1Alt: string;
  image2: string;
  image2Alt: string;
  authorImage: string;
  authorName: string;
  authorBio: string;
}

export const aboutConfig: AboutConfig = {
  titleLine1: "Building intelligent systems that scale,",
  titleLine2: "from concept to production deployment.",
  description:
    "I'm a Full Stack & Cloud Engineer with hands-on experience in GenAI systems, cloud infrastructure, CI/CD automation, and production deployments. Currently working at Capgemini as a Software Engineer – AI, I specialize in building production-ready GenAI agents, optimizing LLM performance, and architecting scalable cloud solutions. With strong ownership across APIs, authentication, infrastructure, and performance optimization, I bring ideas to life with code.",
  image1: "/about-1.jpg",
  image1Alt: "Vijay Shirsath - Full Stack Engineer",
  image2: "/about-2.jpg",
  image2Alt: "Cloud and AI Development",
  authorImage: "/profile_pic.png",
  authorName: "Vijay Shirsath",
  authorBio:
    "Software Engineer at Capgemini | GenAI & Cloud Specialist | AWS & Azure Certified",
};

// ============================================================================
// Works/Projects Section Configuration
// ============================================================================

export interface WorkItem {
  id: number;
  title: string;
  category: string;
  image: string;
  repoUrl?: string;
  demoUrl?: string;
  description: string;
  techStack: string[];
}

export interface WorksConfig {
  title: string;
  subtitle: string;
  projects: WorkItem[];
}

export const worksConfig: WorksConfig = {
  title: "Featured Projects",
  subtitle:
    "A showcase of my technical work across GenAI, cloud infrastructure, and full-stack development.",
  projects: [
    {
      id: 1,
      title: "CogniSuite",
      category: "Multi-Agent GenAI Platform",
      image: "cogni.png",
      repoUrl: "https://github.com/Yatharth2609/CogniSuite",
      description:
        "Full-stack GenAI platform with RAG, document intelligence, SVG generation, and voice-based AI using Azure services.",
      techStack: ["LangChain", "React.js", "FastAPI", "Azure AI", "Python"],
    },
    {
      id: 2,
      title: "CareerCompass",
      category: "AI Career Assistant",
      image: "/CareerCompass.png",
      repoUrl: "https://github.com/Yatharth2609/ai-job-helper",
      description:
        "Intelligent career assistant empowering job seekers with AI-driven resume optimization, real-time job matching, interview preparation, and personalized career insights.",
      techStack: ["Langchain", "Gemini LLM", "FastAPI", "React", "TypeScript"],
    },
    // {
    //   id: 3,
    //   title: "GenAI Agent Architecture",
    //   category: "Multi-Agent Supervisor Pattern",
    //   image: "/project-agent.jpg",
    //   repoUrl: "https://github.com",
    //   description:
    //     "Re-architected monolithic LangGraph workflows into Multi-Agent Supervisor pattern, reducing latency by 85%.",
    //   techStack: ["LangGraph", "LangChain", "FastAPI", "Python", "GCP"],
    // },
    // {
    //   id: 4,
    //   title: "CI/CD Pipeline Automation",
    //   category: "DevOps & Cloud Infrastructure",
    //   image: "/project-cicd.jpg",
    //   repoUrl: "https://github.com",
    //   description:
    //     "Automated deployment pipelines reducing release effort by 90% with Docker, Terraform, and GitHub Actions.",
    //   techStack: ["Docker", "Terraform", "GitHub Actions", "AWS", "GCP"],
    // },
  ],
};

// ============================================================================
// Services/Skills Section Configuration
// ============================================================================

export interface ServiceItem {
  id: string;
  title: string;
  description: string;
  image: string;
}

export interface ServicesConfig {
  title: string;
  subtitle: string;
  services: ServiceItem[];
}

export const servicesConfig: ServicesConfig = {
  title: "Technical Expertise",
  subtitle: "Technologies and domains where I deliver exceptional results.",
  services: [
    {
      id: "01",
      title: "GenAI & LLM Systems",
      description:
        "Building production GenAI agents with LangChain, LangGraph, and FastAPI. Expertise in prompt engineering, LLM optimization, and multi-agent orchestration.",
      image: "/GenAI.png",
    },
    {
      id: "02",
      title: "Cloud Infrastructure",
      description:
        "AWS, Azure, and GCP deployment with Terraform. Designing scalable architectures, managing environments, and implementing infrastructure as code.",
      image: "Cloud-Infra.jpg",
    },
    {
      id: "03",
      title: "Full Stack Development",
      description:
        "React.js, Angular, Next.js frontend with Node.js, Express.js, Django backend. Building responsive, performant web applications.",
      image: "/full-stack.png",
    },
    {
      id: "04",
      title: "DevOps & CI/CD",
      description:
        "Automated deployment pipelines, Docker containerization, Git/GitHub workflows. Reducing release effort by 90% through automation.",
      image: "/ci-cd.png",
    },
  ],
};

// ============================================================================
// Testimonials/Achievements Section Configuration
// ============================================================================

export interface TestimonialItem {
  id: number;
  name: string;
  title: string;
  quote: string;
  image: string;
}

export interface TestimonialsConfig {
  title: string;
  testimonials: TestimonialItem[];
}

export const testimonialsConfig: TestimonialsConfig = {
  title: "Achievements & Recognition",
  testimonials: [
    {
      id: 1,
      name: "GEM Award",
      title: "Capgemini",
      quote:
        "Received GEM Award at Capgemini for exceptional ownership and impact in delivering production GenAI systems.",
      image: "/cg.jfif",
    },
    {
      id: 2,
      name: "First to Deploy",
      title: "Capgemini Internship",
      quote:
        "First intern in Capgemini batch to be deployed on a live project, ahead of 200+ peers.",
      image: "/deployment.png",
    },
    {
      id: 3,
      name: "800+ DSA Problems",
      title: "LeetCode & GeeksForGeeks",
      quote:
        "Solved 800+ Data Structures and Algorithms problems, demonstrating strong problem-solving skills.",
      image: "/dsa.jfif",
    },
  ],
};

// ============================================================================
// Experience Section - Timeline Structure
// ============================================================================

export interface ExperienceItem {
  id: number;
  role: string;
  company: string;
  location: string;
  period: string;
  current: boolean;
  description: string;
  achievements: string[];
  techStack: string[];
}

export interface ExperienceConfig {
  title: string;
  subtitle: string;
  experiences: ExperienceItem[];
}

export const experienceConfig: ExperienceConfig = {
  title: "Professional Experience",
  subtitle:
    "My journey through roles that shaped my expertise in AI, cloud, and full-stack development.",
  experiences: [
    {
      id: 1,
      role: "Software Engineer – AI",
      company: "Capgemini",
      location: "India",
      period: "April 2025 – Present",
      current: true,
      description:
        "Building and deploying production GenAI systems with focus on performance optimization and scalable architecture.",
      achievements: [
        "Built 5+ production GenAI agents using LangChain/LangGraph and FastAPI on GCP",
        "Reduced agent latency by 85% (from 12s+ to <3s) with Multi-Agent Supervisor pattern",
        "Optimized LLM performance with prompt caching and state-trimming logic",
        "Owned Dev, Staging, and Production environments with deployment planning",
        "Designed CI/CD pipelines reducing release effort by 90%",
        "Introduced Redis-based caching for API response optimization",
      ],
      techStack: [
        "LangChain",
        "LangGraph",
        "FastAPI",
        "GCP",
        "Redis",
        "Python",
      ],
    },
    {
      id: 2,
      role: "Full Stack Developer Intern",
      company: "Moneyy.ai",
      location: "India",
      period: "February 2025 – March 2025",
      current: false,
      description:
        "Developed backend services and frontend components for a fintech trading platform.",
      achievements: [
        "Developed backend services managing 10K+ trading records with optimized queries",
        "Optimized React frontend performance reducing response time to ~1.2 seconds",
        "Integrated 25+ APIs for trading and investor workflows",
        "Built real-time investor dashboard with live data updates",
      ],
      techStack: [
        "React.js",
        "Node.js",
        "PostgreSQL",
        "Express.js",
        "REST APIs",
      ],
    },
  ],
};

// ============================================================================
// FAQ Section Configuration
// ============================================================================

export interface FAQItem {
  question: string;
  answer: string;
}

export interface FAQConfig {
  title: string;
  faqs: FAQItem[];
}

export const faqConfig: FAQConfig = {
  title: "Common Questions",
  faqs: [
    {
      question: "What technologies do you specialize in?",
      answer:
        "I specialize in GenAI technologies (LangChain, LangGraph, LangSmith), cloud platforms (AWS, Azure, GCP), full-stack development (React, Next.js, Node.js, Python), and DevOps practices (CI/CD, Docker, Terraform). I'm also proficient in Java, TypeScript, and various databases including PostgreSQL and MongoDB.",
    },
    {
      question: "What kind of projects have you worked on?",
      answer:
        "I've built production GenAI agents with multi-agent orchestration, trading platform backends handling 10K+ records, RAG-based document intelligence systems, and cloud infrastructure with automated CI/CD pipelines. My work spans from AI/ML systems to full-stack web applications.",
    },
    {
      question: "What certifications do you hold?",
      answer:
        "I'm AWS Certified Cloud Practitioner, Microsoft Azure Fundamentals (AZ-900) certified, and Microsoft Azure AI Fundamentals (AI-900) certified. These certifications validate my expertise in cloud architecture and AI services.",
    },
    {
      question: "How do you approach performance optimization?",
      answer:
        "I use a data-driven approach with tools like LangSmith for deep-trace analysis. I've achieved 85% latency reduction by re-architecting workflows, implemented prompt caching for LLM optimization, and used Redis for API response caching. I focus on measurable improvements with monitoring at every stage.",
    },
  ],
};

// ============================================================================
// Blog Section Configuration (Hidden - empty config)
// ============================================================================

export interface BlogPost {
  id: number;
  title: string;
  excerpt: string;
  readTime: string;
  date: string;
  image: string;
  category: string;
}

export interface BlogConfig {
  title: string;
  subtitle: string;
  allPostsLabel: string;
  readMoreLabel: string;
  readTimePrefix: string;
  posts: BlogPost[];
}

export const blogConfig: BlogConfig = {
  title: "",
  subtitle: "",
  allPostsLabel: "",
  readMoreLabel: "",
  readTimePrefix: "",
  posts: [],
};

// ============================================================================
// Contact Section Configuration
// ============================================================================

export interface ContactFormOption {
  value: string;
  label: string;
}

export interface ContactConfig {
  title: string;
  subtitle: string;
  nameLabel: string;
  emailLabel: string;
  projectTypeLabel: string;
  projectTypePlaceholder: string;
  projectTypeOptions: ContactFormOption[];
  messageLabel: string;
  submitButtonText: string;
  image: string;
}

export const contactConfig: ContactConfig = {
  title: "Let's Build Together",
  subtitle:
    "Have a project in mind? Let's discuss how we can bring your ideas to life.",
  nameLabel: "Name *",
  emailLabel: "Email *",
  projectTypeLabel: "Project Type",
  projectTypePlaceholder: "Select project type...",
  projectTypeOptions: [
    { value: "genai", label: "GenAI / LLM Application" },
    { value: "cloud", label: "Cloud Infrastructure" },
    { value: "fullstack", label: "Full Stack Development" },
    { value: "devops", label: "DevOps / CI/CD" },
    { value: "other", label: "Other" },
  ],
  messageLabel: "Message",
  submitButtonText: "Send Message",
  image: "/connect.png",
};

// ============================================================================
// Footer Configuration
// ============================================================================

export interface FooterLink {
  label: string;
  href: string;
  icon?: string;
}

export interface FooterConfig {
  marqueeText: string;
  marqueeHighlightChars: string[];
  navLinks1: FooterLink[];
  navLinks2: FooterLink[];
  ctaText: string;
  ctaHref: string;
  copyright: string;
  tagline: string;
}

export const footerConfig: FooterConfig = {
  marqueeText: "Building the Future with Code",
  marqueeHighlightChars: ["F", "C"],
  navLinks1: [
    { label: "Home", href: "#hero" },
    { label: "About", href: "#about" },
    { label: "Experience", href: "#experience" },
    { label: "Projects", href: "#projects" },
  ],
  navLinks2: [
    { label: "LinkedIn", href: "https://linkedin.com", icon: "Instagram" },
    { label: "GitHub", href: "https://github.com", icon: "Dribbble" },
  ],
  ctaText: "Get In Touch",
  ctaHref: "#contact",
  copyright: "© 2025 Vijay Shirsath. All rights reserved.",
  tagline: "Crafted with passion for technology",
};
