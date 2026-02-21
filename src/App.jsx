import React, { useState, useEffect, useRef } from 'react';
import { 
  Terminal, Cpu, Code, Database, Globe, Share2, Award, Briefcase, 
  Mail, ArrowRight, Github, Linkedin, Twitter, User, MessageSquare, 
  Send, Sun, Moon, ArrowUpRight, CheckCircle, FileText, Menu, X,
  ExternalLink, ShieldCheck, Trophy, TrendingUp, ChevronDown, ChevronUp,
  GitBranch, PlayCircle, Layers, Disc
} from 'lucide-react';

import './App.css'

//assets
import medai from "./assets/medai.webp"
import carprice from "./assets/carprice.webp"
import marine from "./assets/marine.webp"
import mnist from "./assets/mnist.webp"

// --- UTILITY: Circular Progress (For LeetCode) ---
const DonutChart = ({ data, size = 80, strokeWidth = 8, color, total, totalLimit }) => {
  const radius = (size - strokeWidth) / 2;
  const circumference = radius * 2 * Math.PI;
  
  let accumulatedOffset = 0;

  return (
    <div className="relative flex items-center justify-center" style={{ width: size, height: size }}>
      <svg width={size} height={size} className="transform -rotate-90">
        <circle 
          cx={size / 2} cy={size / 2} r={radius}
          stroke={color} strokeWidth={strokeWidth}
          fill="transparent" opacity="0.1"
        />
        {data.map((segment, i) => {
          const strokeDasharray = `${(segment.value / 100) * circumference} ${circumference}`;
          const strokeDashoffset = -accumulatedOffset;
          accumulatedOffset += (segment.value / 100) * circumference;
          
          return (
            <circle 
              key={i}
              cx={size / 2} cy={size / 2} r={radius}
              stroke={segment.color}
              strokeWidth={strokeWidth}
              fill="transparent"
              strokeDasharray={strokeDasharray}
              strokeDashoffset={strokeDashoffset}
              strokeLinecap="round"
              className="transition-all duration-1000 ease-out"
            />
          );
        })}
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center font-mono font-bold text-[var(--text-muted)] leading-none">
        <span className="text-[7px] uppercase tracking-wider mb-1">Solved</span>
        <span className="text-sm text-[var(--text-main)]">{total}</span>
        <span className="text-[6px] opacity-60 mt-0.5">/ {totalLimit}</span>
      </div>
    </div>
  );
};

// --- UTILITY: Scroll Progress Bar ---
const ScrollProgress = () => {
  const [width, setWidth] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
      const scrollPosition = window.scrollY;
      const progress = (scrollPosition / totalHeight) * 100;
      setWidth(progress);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="fixed top-0 left-0 w-full h-[3px] z-[100] bg-transparent pointer-events-none">
      <div 
        className="h-full bg-[var(--accent)] shadow-[0_0_15px_var(--accent)] transition-all duration-150 ease-out"
        style={{ width: `${width}%` }}
      />
    </div>
  );
};

// --- UTILITY: Scroll Reveal Component ---
const ScrollReveal = ({ children, delay = 0 }) => {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(entry.target);
        }
      },
      { threshold: 0.1 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => {
      if (ref.current) observer.disconnect();
    };
  }, []);

  return (
    <div 
      ref={ref} 
      style={{ transitionDelay: `${delay}ms` }}
      className={`transition-all duration-1000 ease-out transform will-change-transform ${
        isVisible 
          ? 'opacity-100 translate-y-0 blur-0 scale-100' 
          : 'opacity-0 translate-y-12 blur-md scale-95'
      }`}
    >
      {children}
    </div>
  );
};

// --- UTILITY: Decoding Text Animation ---
const DecodingText = ({ text, className }) => {
  const [displayText, setDisplayText] = useState('');
  const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@#$%&";

  useEffect(() => {
    let iteration = 0;
    const interval = setInterval(() => {
      setDisplayText(
        text
          .split("")
          .map((letter, index) => {
            if (index < iteration) return text[index];
            return chars[Math.floor(Math.random() * chars.length)];
          })
          .join("")
      );

      if (iteration >= text.length) clearInterval(interval);
      iteration += 1 / 3;
    }, 30);
    return () => clearInterval(interval);
  }, [text]);

  return <span className={className}>{displayText}</span>;
};

// --- DATA: SKILLS ---
const SKILLS_DATA = [
  { title: "React", subtitle: "Frontend Core", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg" },
  { title: "Python", subtitle: "Data Analysis", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg" },
  { title: "TensorFlow", subtitle: "Machine Learning", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/tensorflow/tensorflow-original.svg" },
  { title: "scikit-learn", subtitle: "Machine Learning", logo: "https://upload.wikimedia.org/wikipedia/commons/0/05/Scikit_learn_logo_small.svg" },
  { title: "MLflow", subtitle: "MLOps", logo: "https://cdn.simpleicons.org/mlflow/0194E2" },
  { title: "FastAPI", subtitle: "API Development", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/fastapi/fastapi-original.svg" },
  { title: "NumPy", subtitle: "Scientific Computing", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/numpy/numpy-original.svg" },
  { title: "Pandas", subtitle: "Data Science", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/pandas/pandas-original.svg" },
  { title: "Matplotlib", subtitle: "Data Visualization", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/matplotlib/matplotlib-original.svg"},
  { title: "Node.js", subtitle: "Backend", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg" },
  { title: "Java", subtitle: "Enterprise Dev", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/java/java-original.svg" },
  { title: "PostgreSQL", subtitle: "RDBMS", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postgresql/postgresql-original.svg" },
  { title: "MongoDB", subtitle: "NoSQL Database", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mongodb/mongodb-original.svg" },
  { title: "Git", subtitle: "Version Control", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg" },
  { title: "C++", subtitle: "Algo Trading", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/cplusplus/cplusplus-original.svg" },
  { title: "Docker", subtitle: "DevOps", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/docker/docker-original.svg" },
];

// --- DATA: PROJECTS (Updated with Descriptions) ---
const PROJECT_DATA = [
  { 
    title: "Med-AI", type: "Medical Ai/Ml Web app", id: "01", category: "DL", imageLink:medai,
    tech: ["React", "CNN", "Sklearn", "FastApi"], links: { git: "https://github.com/aqibraza-dev/Med-AI", live: "https://med-ai-pro.vercel.app/" },
    desc: "Scalable unified web app which include major biotech related projects like Skin Cancer, diabetes prediction..."
  },
  { 
    title: "Car Price Prediction", type: "Regression based car price prediction model with interactive web app", id: "03", category: "ML", imageLink:carprice,
    tech: ["Ensemble Learning", "Sklearn", "FastApi", "React"], links: { git: "https://github.com/aqibraza-dev/Car-Price-Predictor", live: "https://car-price-eight.vercel.app/" },
    desc: "Regression based car price prediction model with interactive web app using react and fastapi."
  },
  { 
    title: "MNIST Handwritten Digit Classification", type: "Hand Digit Classification App", id: "02", category: "ML", imageLink:mnist,
    tech: ["TensorFlow", "FastApi", "React"], links: { git: "https://github.com/aqibraza-dev", live: "https://mnist-hand-digit-classification.vercel.app/" },
    desc: "Hand Digit Classification Wep App."
  },
  { 
    title: "CMLRE Data Platform", type: "AI Driven Marine Data Platform", id: "04", category: "WEB", imageLink:marine,
    tech: ["Mongodb", "FastApi", "React"], links: { git: "https://github.com/aqibraza-dev", live: "https://ai-data-platform-two.vercel.app/" },
    desc: "Unified Platform Containing Fishing Zone, Oceanography, and eDna Data."
  },
  { 
    title: "Grammar Correction App", type: "Offline Grammar-Correction Web application.", id: "05", category: "WEB", imageLink:Github,
    tech: ["TensorFlow", "FastApi", "HTML/CSS", "T5 Transformer Model"], links: { git: "https://github.com/aqibraza-dev/grammar_correction_ai", live: "#" },
    desc: "Unified Platform Containing Fishing Zone, Oceanography, and eDna Data."
  },
  
];

// --- DATA: COMPETITIVE (Updated for Granular Kaggle Stats) ---
const lcEasy = 8;
const lcMed = 1;
const lcHard = 1;

const COMPETITIVE_DATA = [
  { 
    platform: "LeetCode", rank: "", sub: "---", icon: Code, color: "#FFA116", link: "https://leetcode.com/u/aqibrazadev/",
    details: { 
      type: "graph",
      // Segments calc
      segments: [
        { value: (lcEasy / (lcEasy + lcMed + lcHard)) * 100, color: "#00b8a3" }, 
        { value: (lcMed / (lcEasy + lcMed + lcHard)) * 100, color: "#ffc01e" }, 
        { value: (lcHard / (lcEasy + lcMed + lcHard)) * 100, color: "#ff375f" }
      ],
      stats: { easy: lcEasy, med: lcMed, hard: lcHard, totalLimit: 3856 }
    }
  },
  { 
    platform: "Kaggle", rank: "", sub: "---", icon: Database, color: "#20BEFF", link: "https://www.kaggle.com/aqibrazadev",
    details: { 
      type: "kaggle-stats", // New Type
      categories: [
        { name: "Competitions", gold: 0, silver: 0, bronze: 0 },
        { name: "Datasets", gold: 0, silver: 0, bronze: 0 },
        { name: "Code", gold: 0, silver: 0, bronze: 0 }
      ]
    }
  },
  // { 
  //   platform: "CodeForces", rank: "Specialist", stat: "1,480", sub: "Max Rating", icon: Terminal, color: "#F44336", link: "https://codeforces.com/",
  //   details: { type: "simple", value: "1,480" }
  // },
  // { 
  //   platform: "Google Cloud", rank: "Champion", stat: "Top 50", sub: "Global Rank", icon: Trophy, color: "#4285F4", link: "https://cloud.google.com/certification",
  //   details: { type: "simple", value: "Top 50" }
  // },
  {
    platform: "Kaggle Competition", 
    title: "Santa 2025 - Christmas Tree Packing Challenge", 
    desc: "Find the optimal packing solution of cristmas trees", 
    rank: "Rank 740/3357",
    image: "https://www.kaggle.com/competitions/119106/images/thumbnail",
    link: "https://www.kaggle.com/aqibrazadev/competitions",
    color: "#20BEFF",
    icon: Database, // Fallback icon
    details: { type: "image-card" } 
  },
  {
    platform: "Kaggle Competition", 
    title: "Diabetes Prediction Challenge", 
    desc: "Predict the probability that a patient will be diagnosed with diabetes.", 
    rank: "Rank 2733/4206",
    image: "https://www.kaggle.com/competitions/91723/images/thumbnail",
    link: "https://www.kaggle.com/aqibrazadev/competitions",
    color: "#20BEFF",
    icon: Database, // Fallback icon
    details: { type: "image-card" } 
  }

];

// --- DATA: CERTIFICATES (Updated with Verify Link) ---
const CERTIFICATES_DATA = [
  { title: "Google Student Ambassador", issuer: "Google", date: "2026", id: "", link: "#" },
  { title: "Neural Networks and Deep Learning", issuer: "Coursera & Stanford University", date: "Oct 2025", id: "By Andrew Ng", link: "https://coursera.org/share/bcd79d40a2ea3c43e21567880a1000d1" },
  { title: "Machine Learning", issuer: "Coursera & Stanford University", date: "Jul 2025", id: "By Andrew Ng", link: "https://coursera.org/share/826ae507d8c3153108f41915ea95b1f8" },
  { title: "Advanced Learning Algorithms", issuer: "Coursera & Stanford University", date: "Jun 2025", id: "By Andrew Ng", link: "https://coursera.org/share/c8d85ecac62f9634bfa7e9119b46e84f" },
  { title: "Unsupervised Learning, Recommenders, Reinforcement Learning", issuer: "Coursera & Stanford University", date: "Jun 2025", id: "By Andrew Ng", link: "https://coursera.org/share/b9d4db4cc5e6321caeeca69bc7bade5b" },
  { title: "Supervised Machine Learning| Regression and Classification", issuer: "Coursera & Stanford University", date: "Feb 2025", id: "By Andrew Ng", link: "https://coursera.org/share/826ae507d8c3153108f41915ea95b1f8" },
];

const FILTERS = [
  { label: "ALL SYSTEMS", value: "ALL" },
  { label: "ML / AI", value: "ML" },
  { label: "DEEP LEARNING", value: "DL" },
  { label: "WEB / APP", value: "WEB" },
  // { label: "ALGO / QUANT", value: "ALGO" },
];

const App = () => {
  const [mounted, setMounted] = useState(false);
  const [theme, setTheme] = useState('dark'); 
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  
  const [activeFilter, setActiveFilter] = useState("ALL");
  const [showAllProjects, setShowAllProjects] = useState(false);

  const [formState, setFormState] = useState({ name: '', email: '', message: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    setShowAllProjects(false);
  }, [activeFilter]);

  const toggleTheme = () => {
    setTheme(prev => prev === 'dark' ? 'light' : 'dark');
  };

  const filteredProjects = activeFilter === "ALL" 
    ? PROJECT_DATA 
    : PROJECT_DATA.filter(p => p.category === activeFilter);

  const visibleProjects = showAllProjects ? filteredProjects : filteredProjects.slice(0, 6);

  const handleSubmit = (e) => {
  e.preventDefault();

  const yourEmail = "aqibraza.dev@gmail.com"; 
  const subject = `Portfolio Contact from ${formState.name}`;
  const body = `Name: ${formState.name}\nEmail: ${formState.email}\n\nMessage:\n${formState.message}`;

  const mailtoLink = `mailto:${yourEmail}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;

  // The modern, robust way to trigger mailto: without getting blocked
  const link = document.createElement('a');
  link.href = mailtoLink;
  // Some browsers require the link to be in the DOM to be clicked
  document.body.appendChild(link); 
  link.click();
  document.body.removeChild(link);

  setFormState({ name: '', email: '', message: '' });
};

  const handleChange = (e) => {
    setFormState({ ...formState, [e.target.name]: e.target.value });
  };

  if (!mounted) return null;

  return (
    <div className={`min-h-screen flex flex-col font-['Inter',sans-serif] overflow-x-hidden transition-colors duration-700 ease-in-out
      ${theme === 'dark' ? 'bg-[#050505] text-gray-300 selection:bg-[#a3ff00] selection:text-black' : 'bg-[#f5f5f5] text-gray-800 selection:bg-[#a3ff00] selection:text-black'}
    `}>
      
      {/* --- INJECTED STYLES & VARIABLES --- */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Montserrat:wght@300;400;500;600;700;900&family=Sacramento&family=Inter:wght@300;400;500;600&display=swap');
        
        :root {
          --bg-main: ${theme === 'dark' ? '#050505' : '#f5f5f5'};
          --bg-card: ${theme === 'dark' ? '#0a0a0a' : '#ffffff'};
          --bg-overlay: ${theme === 'dark' ? 'rgba(5, 5, 5, 0.95)' : 'rgba(245, 245, 245, 0.95)'};
          --accent: rgb(0, 102, 255); 
          --accent-dim: rgba(0, 9, 63, 0.15);
          --accent-glow: rgba(0, 17, 255, 0.4);
          --text-main: ${theme === 'dark' ? '#ffffff' : '#111111'};
          --text-muted: ${theme === 'dark' ? '#9ca3af' : '#6b7280'};
          --border-color: ${theme === 'dark' ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.1)'};
        }

        .transition-theme {
          transition-property: background-color, border-color, color, fill, stroke, opacity, box-shadow;
          transition-duration: 700ms;
          transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
        }

        .text-metallic {
          background: ${theme === 'dark' 
            ? 'linear-gradient(to bottom, #ffffff 10%, #9ca3af 50%, #d1d5db 60%, #4b5563 100%)' 
            : 'linear-gradient(to bottom, #111111 10%, #4b5563 50%, #6b7280 60%, #9ca3af 100%)'};
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          filter: contrast(1.25);
          transition: background 0.7s ease; 
        }
        
        .bg-noise-texture {
          background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)' opacity='0.07'/%3E%3C/svg%3E");
        }
        
        .cinematic-card {
          background: var(--bg-card);
          border: 1px solid var(--border-color);
          transition: all 0.5s cubic-bezier(0.25, 0.46, 0.45, 0.94), background-color 0.7s ease, border-color 0.7s ease;
        }
        .cinematic-card:hover {
          border-color: var(--accent);
          transform: translateY(-5px);
          box-shadow: 0 10px 30px -10px rgba(0,0,0,0.5);
        }

        .cert-card {
          background: linear-gradient(135deg, var(--bg-card) 0%, rgba(0,0,0,0.02) 100%);
          position: relative;
          overflow: hidden;
        }
        .cert-card::before {
          content: '';
          position: absolute;
          top: 0; left: -100%;
          width: 100%; height: 100%;
          background: linear-gradient(90deg, transparent, rgba(255,255,255,0.05), transparent);
          transition: 0.5s;
        }
        .cert-card:hover::before {
          left: 100%;
        }

        .animate-title-expand {
           animation: tracking-in-expand 1.5s cubic-bezier(0.215, 0.610, 0.355, 1.000) both;
        }
        @keyframes tracking-in-expand {
          0% { letter-spacing: -0.5em; opacity: 0; }
          40% { opacity: 0.6; }
          100% { opacity: 1; }
        }

        .signature-path {
          stroke-dasharray: 600;
          stroke-dashoffset: 600;
          animation: sign 3.5s ease-out forwards;
          animation-delay: 0.5s;
        }
        @keyframes sign { to { stroke-dashoffset: 0; } }

        .shadow-orb-glow { box-shadow: 0 0 120px 40px rgba(255, 255, 255, 0.15); }
        
        .input-cinematic {
           background: transparent;
           border-bottom: 1px solid var(--border-color);
           transition: border-color 0.3s ease, color 0.7s ease;
        }
        .input-cinematic:focus { outline: none; border-color: var(--accent); }

        @keyframes scan {
          0% { top: 0%; opacity: 0; }
          100% { top: 100%; opacity: 0; }
        }
      `}</style>

      <ScrollProgress />

      {/* --- NAVBAR --- */}
      <nav className="fixed top-0 w-full z-50 px-6 py-6 flex justify-between items-center mix-blend-difference text-white opacity-90 transition-all duration-500">
        <div className="text-sm tracking-widest uppercase font-light flex items-center gap-2">
          <span className={`w-2 h-2 rounded-full bg-[#a3ff00] ${isMenuOpen ? 'animate-ping' : ''}`}></span>
          Open To Work 
        </div>
        <div className="hidden md:flex gap-8 text-sm font-light items-center">
          {['About', 'Skills','Projects', 'Achievements', 'Experience', 'Contact'].map((item) => (
            <a key={item} href={`#${item.toLowerCase()}`} className="hover:text-[var(--accent)] transition-colors cursor-pointer">
              {item}
            </a>
          ))}
          <button onClick={toggleTheme} className="p-2 rounded-full hover:text-[var(--accent)] transition-colors">
            {theme === 'dark' ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
          </button>
        </div>
        <div className="flex md:hidden items-center gap-4">
           <button onClick={toggleTheme} className="p-2 rounded-full hover:text-[var(--accent)] transition-colors">
            {theme === 'dark' ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
          </button>
          <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="z-50 p-2 text-[var(--accent)] hover:bg-[var(--accent-dim)] rounded-full transition-all">
            {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </nav>

      {/* --- MOBILE OVERLAY --- */}
      <div className={`fixed inset-0 z-40 bg-[var(--bg-overlay)] backdrop-blur-xl transition-all duration-500 flex flex-col justify-center items-center ${isMenuOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`}>
          <div className="flex flex-col gap-8 text-center">
            {['About', 'Skills', 'Achievements', 'Experience', 'Projects', 'Contact'].map((item, i) => (
               <a key={item} href={`#${item.toLowerCase()}`} onClick={() => setIsMenuOpen(false)}
                 className="text-4xl font-black uppercase tracking-tighter text-metallic hover:text-[var(--accent)] transition-all transform hover:scale-110"
                 style={{ transitionDelay: `${i * 50}ms` }}>
                 {item}
               </a>
            ))}
          </div>
      </div>
      
      <div className={`fixed inset-0 pointer-events-none z-0 transition-colors duration-1000 ${theme === 'dark' ? 'bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-gray-900 via-black to-black' : 'bg-white'}`}></div>
      <div className="fixed inset-0 bg-noise-texture opacity-40 pointer-events-none z-0"></div>

      {/* --- HERO SECTION --- */}
      <main className="relative flex-none flex items-center justify-center overflow-hidden w-full h-screen z-10">
        <div className="relative z-10 w-full max-w-7xl mx-auto px-4 flex flex-col items-center justify-center translate-y-[-5%]">
          <ScrollReveal>
             <h2 className="text-[var(--text-muted)] font-light tracking-[0.2em] text-sm md:text-lg mb-2 md:mb-[-1rem] md:self-start md:ml-[10%] uppercase z-20 transition-theme">
              <DecodingText text="Software Engineer // AI Specialist" />
            </h2>
          </ScrollReveal>
          <div className="relative w-full text-center">
            <h1 className="font-['Montserrat'] font-black text-[15vw] leading-[0.8] tracking-tighter select-none flex justify-center items-center gap-[0.5vw] animate-title-expand">
              <span className="text-metallic drop-shadow-2xl transition-theme">Portf</span>
              <div className="relative w-[12vw] h-[12vw] flex justify-center items-center mx-[-1vw] z-0">
                <div className={`absolute w-[18vw] h-[18vw] blur-[60px] rounded-full z-0 transition-theme ${theme === 'dark' ? 'bg-white/10' : 'bg-black/5'}`}></div>
                <div className={`w-[10vw] h-[10vw] rounded-full shadow-orb-glow z-20 relative animate-pulse transition-theme ${theme === 'dark' ? 'bg-white' : 'bg-black'}`}></div>
              </div>
              <span className="text-metallic drop-shadow-2xl z-0 transition-theme">lio</span>
            </h1>
            <ScrollReveal delay={200}>
              <div className="absolute bottom-[-15%] right-[5%] md:right-[15%] z-40 transform rotate-[-5deg]">
                 <div className="relative w-[300px] h-[100px]">
                   <svg width="300" height="100" viewBox="0 0 300 100" className="absolute top-0 left-0">
                      <path d="M30,60 C50,50 60,90 90,60 C100,50 110,30 140,50 C160,70 170,80 200,50 C220,30 250,20 280,70" 
                        fill="none" stroke="var(--accent)" strokeWidth="2" className="signature-path" strokeLinecap="round" strokeLinejoin="round" />
                   </svg>
                   <span className="absolute top-0 left-0 font-['Sacramento',cursive] text-6xl md:text-8xl text-[var(--accent)] drop-shadow-[0_0_10px_rgba(0, 102, 255,0.5)] opacity-90 mix-blend-screen">
                     Aqib Raza
                   </span>
                 </div>
              </div>
            </ScrollReveal>
          </div>
        </div>
        <div className="absolute bottom-8 left-0 w-full px-8 flex justify-between items-end text-[var(--text-muted)] text-xs font-mono uppercase transition-theme">
          <div>
            <p className="mb-2">Scroll to explore</p>
            <div className={`h-12 w-[1px] mx-auto animate-pulse transition-colors duration-700 ${theme === 'dark' ? 'bg-white/20' : 'bg-black/20'}`}></div>
          </div>
        </div>
      </main>

      {/* --- ABOUT SECTION --- */}
      <section id="about" className="relative w-full py-24 px-6 md:px-12 lg:px-24 z-20 bg-[var(--bg-main)] transition-colors duration-700">
        <div className="max-w-7xl mx-auto">
           <ScrollReveal>
            <h3 className="text-metallic text-4xl md:text-6xl font-['Montserrat'] font-bold uppercase tracking-tighter mb-16 opacity-90">Profile</h3>
           </ScrollReveal>
           <div className="grid md:grid-cols-2 gap-16 items-center">
              <ScrollReveal delay={150}>
                <div className="text-lg md:text-xl font-light leading-relaxed text-[var(--text-muted)] transition-theme">
                  <p className="mb-8">
                    I’m a passionate <span className="text-[var(--text-main)] font-medium transition-theme">Machine Learning Engineer</span> who thrives at the intersection of innovation and execution. 
                    I transform complex Machine Learning systems into seamless, intuitive React experiences that users genuinely enjoy.
                  </p>

                  <p>
                  My core focus lies in Data Science, and building High-Performance Web Applications — delivering scalable, data-driven solutions that are both technically robust and elegantly designed.
                  </p>

                  <div className="mt-8">
                    <div className="flex items-center gap-4 text-xs font-mono text-[var(--accent)]">
                    <CheckCircle className="w-4 h-4" /> <span>OPEN TO COLLABORATION & NEW OPPORTUNITIES</span>
                    </div>
                  </div>
                </div>

              </ScrollReveal>
              <ScrollReveal delay={300}>
                 <div className="relative group mx-auto w-full max-w-sm">
                    <div className="absolute -inset-1 bg-gradient-to-r from-[var(--accent)] to-[var(--text-main)] opacity-20 blur transition duration-500 group-hover:opacity-40"></div>
                    <div className="relative aspect-[3/4] overflow-hidden rounded-sm border border-[var(--border-color)] bg-[var(--bg-card)] transition-theme">
                      <img src="https://media.licdn.com/dms/image/v2/D5603AQG8kFP425b7zA/profile-displayphoto-scale_200_200/B56ZeDHHD3HUAY-/0/1750251371061?e=2147483647&v=beta&t=S2XV-tk-hTeri5msoD7qYRZOVF7kVxmGFoL0XYBsIOA" 
                        alt="Profile" className="w-full h-full object-cover filter grayscale sepia-[0.2] opacity-80 transition-all duration-700 group-hover:grayscale-0 group-hover:sepia-0 group-hover:opacity-100 group-hover:scale-105" />
                      <div className="absolute inset-0 bg-[linear-gradient(transparent_50%,rgba(163,255,0,0.05)_50%)] bg-[length:100%_4px] pointer-events-none z-10"></div>
                      <div className="absolute top-0 left-0 w-full h-[2px] bg-[var(--accent)] shadow-[0_0_15px_var(--accent)] opacity-60 animate-[scan_4s_linear_infinite] z-20"></div>
                    </div>
                 </div>
              </ScrollReveal>
           </div>
        </div>
      </section>

      {/* --- SKILLS SECTION --- */}
<section id="skills" className="relative w-full py-24 px-6 md:px-12 lg:px-24 z-20 bg-[var(--bg-main)] transition-colors duration-700">
   <div className="max-w-7xl mx-auto">
      <ScrollReveal>
         <h3 className="text-metallic text-4xl md:text-6xl font-['Montserrat'] font-bold uppercase tracking-tighter mb-16 opacity-90 text-right">
           Capabilities
         </h3>
      </ScrollReveal>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {SKILLS_DATA.map((skill, i) => (
          <ScrollReveal key={i} delay={i * 30}>
            <div className="cinematic-card p-6 flex flex-col items-center justify-center text-center h-48 group relative overflow-hidden">
              
              {/* Background - Added md:group-hover and scroll-bg-effect */}
              <div className="absolute inset-0 bg-gradient-to-b from-transparent to-[var(--bg-card)] opacity-0 md:group-hover:opacity-20 transition-opacity scroll-bg-effect"></div>
              
              {/* Icon Wrapper - Safely removed the translation class here since the child animations handle it on mobile, and desktop hover handles it here */}
              <div className="w-12 h-12 mb-5 relative flex items-center justify-center transition-transform duration-500 md:group-hover:scale-110 md:group-hover:-translate-y-2">
                 {skill.logo ? (
                   /* Image - Added scroll-img-effect */
                   <img src={skill.logo} alt={skill.title} className="w-full h-full object-contain filter grayscale md:group-hover:grayscale-0 transition-all duration-500 scroll-img-effect" />
                 ) : (
                   /* Icon - Added scroll-icon-effect */
                   <Code className="w-full h-full text-[var(--text-muted)] md:group-hover:text-[var(--accent)] transition-colors duration-500 scroll-icon-effect" />
                 )}
              </div>

              <h4 className="text-[var(--text-main)] font-bold uppercase tracking-widest text-sm mb-1 transition-theme z-10">{skill.title}</h4>
              <p className="text-[var(--text-muted)] text-[10px] font-mono uppercase transition-theme z-10">{skill.subtitle}</p>
            </div>
          </ScrollReveal>
        ))}
      </div>
   </div>
</section>

      {/* --- PROJECTS SECTION (UPDATED WITH MOBILE FIX & SMOOTH ANIMATION) --- */}
<section id="projects" className="relative w-full py-24 px-6 md:px-12 lg:px-24 z-20 bg-[var(--bg-main)] transition-colors duration-700">
  <div className="max-w-7xl mx-auto">
    <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
      <ScrollReveal>
         <h3 className="text-metallic text-4xl md:text-6xl font-['Montserrat'] font-bold uppercase tracking-tighter opacity-90 text-left">Selected Works</h3>
      </ScrollReveal>
      <ScrollReveal delay={70}>
         <div className="flex flex-wrap gap-2 md:justify-end">
            {FILTERS.map((filter) => (
              <button key={filter.value} onClick={() => setActiveFilter(filter.value)}
                className={`px-4 py-2 text-[10px] md:text-xs font-mono uppercase tracking-widest border transition-all duration-300 ${
                  activeFilter === filter.value 
                  ? 'border-[var(--accent)] text-[var(--accent)] bg-[var(--accent-dim)] shadow-[0_0_10px_var(--accent-dim)]' 
                  : 'border-[var(--border-color)] text-[var(--text-muted)] hover:border-[var(--text-muted)]'
                }`}>
                {filter.label}
              </button>
            ))}
         </div>
      </ScrollReveal>
    </div>

    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
       {visibleProjects.map((proj, i) => (
          <ScrollReveal key={proj.id} delay={i * 100}>
             {/* 1. Mobile Tap Fix: tabIndex="0", cursor-pointer, focus:outline-none */}
             <div tabIndex="0" className="cinematic-card aspect-square relative group overflow-hidden flex flex-col justify-between cursor-pointer focus:outline-none">
                
                {/* Background */}
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent opacity-60 z-10 transition-opacity duration-500 group-hover:opacity-90 group-focus:opacity-90 group-focus-within:opacity-90"></div>
                <div className={`w-full h-full absolute inset-0 transition-all duration-700 group-hover:scale-110 group-focus:scale-110 group-focus-within:scale-110 ${theme === 'dark' ? 'bg-gray-900' : 'bg-gray-200'}`}>
                   <div className="flex items-center justify-center w-full h-full">
                     <div className="absolute inset-0 z-0">
                       <img src={proj.imageLink} alt={proj.title} className="w-full h-full object-cover opacity-60 group-hover:opacity-40 group-focus:opacity-40 group-focus-within:opacity-40 group-hover:scale-110 group-focus:scale-110 group-focus-within:scale-110 transition-all duration-700" />
                       <div className="absolute inset-0 bg-gradient-to-t from-[var(--bg-card)] via-[var(--bg-card)]/80 to-transparent"></div>
                     </div>
                   </div>
                </div>

                {/* Header (Category) */}
                <div className="relative z-20 p-6 flex justify-between items-start opacity-0 group-hover:opacity-100 group-focus:opacity-100 group-focus-within:opacity-100 transition-opacity duration-300 transform -translate-y-2 group-hover:translate-y-0 group-focus:translate-y-0 group-focus-within:translate-y-0">
                   <span className="px-2 py-1 bg-[var(--accent)] text-black text-[10px] font-bold font-mono">{proj.category}</span>
                </div>
                
                {/* 2. Action Buttons Fix: Removed max-md opacity hack, added pointer-events toggle */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-30 flex items-center justify-center gap-4 opacity-0 group-hover:opacity-100 group-focus:opacity-100 group-focus-within:opacity-100 transition-all duration-500 delay-100 pointer-events-none group-hover:pointer-events-auto group-focus:pointer-events-auto group-focus-within:pointer-events-auto">
                   <a href={proj.links.git} target='_blank' rel="noreferrer" className="p-3 rounded-full bg-white/10 backdrop-blur-md border border-white/20 hover:bg-[var(--accent)] hover:border-[var(--accent)] hover:text-black text-white transition-all transform hover:scale-110" title="View Code">
                      <Github className="w-5 h-5" />
                   </a>
                   <a href={proj.links.live} target='_blank' rel="noreferrer" className=" p-3 rounded-full bg-white/10 backdrop-blur-md border border-white/20 hover:bg-[var(--accent)] hover:border-[var(--accent)] hover:text-black text-white transition-all transform hover:scale-110" title="Live Demo">
                      <ExternalLink className="w-5 h-5" />
                   </a>
                </div>

                {/* Footer Info & Description Slide-Up */}
                <div className="relative z-20 p-8 pt-0 transform transition-transform duration-500 group-hover:-translate-y-2 group-focus:-translate-y-2 group-focus-within:-translate-y-2">
                   <div className="flex justify-between items-end">
                      <div>
                         <h4 className="text-xl font-bold text-white mb-1 tracking-wider group-hover:text-[var(--accent)] group-focus:text-[var(--accent)] group-focus-within:text-[var(--accent)] transition-colors">{proj.title}</h4>
                         <p className="text-gray-400 text-xs font-mono uppercase tracking-widest mb-3">{proj.type}</p>
                         
                         {/* 3. Smooth h-auto Trick: Grid rows 0fr to 1fr */}
                         <div className="grid grid-rows-[0fr] opacity-0 group-hover:grid-rows-[1fr] group-focus:grid-rows-[1fr] group-focus-within:grid-rows-[1fr] group-hover:opacity-100 group-focus:opacity-100 group-focus-within:opacity-100 transition-all duration-500 overflow-hidden">
                           <div className="overflow-hidden">
                             {/* Description Text */}
                             <p className="text-[10px] text-gray-300 mb-3 mt-1 leading-relaxed border-l-2 border-[var(--accent)] pl-2">
                               {proj.desc}
                             </p>
                             
                             {/* Tech Pills */}
                             <div className="flex flex-wrap gap-2 pb-1">
                               {proj.tech.map((t, idx) => (
                                 <span key={idx} className="text-[9px] font-mono text-[var(--accent)] border border-[var(--accent)]/30 px-2 py-0.5 rounded bg-[var(--accent)]/10">
                                   {t}
                                 </span>
                               ))}
                             </div>
                           </div>
                         </div>
                      </div>
                   </div>
                </div>
             </div>
          </ScrollReveal>
       ))}
    </div>
    
    {filteredProjects.length > 6 && (
       <div className="mt-12 flex justify-center">
          <button onClick={() => setShowAllProjects(!showAllProjects)} className="group flex items-center gap-2 px-8 py-3 border border-[var(--border-color)] bg-[var(--bg-card)] text-[var(--text-muted)] hover:text-[var(--text-main)] hover:border-[var(--accent)] transition-all duration-300 uppercase tracking-widest text-xs font-mono">
             <span>{showAllProjects ? 'System_Collapse' : 'Load_More_Data'}</span>
             {showAllProjects ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
          </button>
       </div>
    )}
  </div>
</section>

      {/* --- COMPETITIVE INDEX (UPDATED WITH KAGGLE BREAKDOWN) --- */}
      <section id="achievements" className="relative w-full py-24 px-6 md:px-12 lg:px-24 z-20 bg-[var(--bg-main)] border-t border-[var(--border-color)] transition-colors duration-700">
        <div className="max-w-7xl mx-auto">
          <ScrollReveal>
            <h3 className="text-metallic text-4xl md:text-6xl font-['Montserrat'] font-bold uppercase tracking-tighter mb-16 opacity-90">
              Competitive Index
            </h3>
          </ScrollReveal>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {COMPETITIVE_DATA.map((item, index) => {
              let dynamicTotal = 0;
              if (item.details?.stats) {
                 dynamicTotal = item.details.stats.easy + item.details.stats.med + item.details.stats.hard;
              }

              return (
                <ScrollReveal key={index} delay={index * 100}>
                  <a href={item.link} target="_blank" rel="noopener noreferrer" className="block h-full">
                    <div className="cinematic-card p-0 flex flex-col h-72 relative overflow-hidden group">
                      
                      {item.details.type === 'image-card' ? (
                        <>
                           <div className="absolute inset-0 z-0">
                             <img src={item.image} alt={item.title} className="w-full h-full object-cover opacity-60 group-hover:opacity-40 group-hover:scale-110 transition-all duration-700" />
                             <div className="absolute inset-0 bg-gradient-to-t from-[var(--bg-card)] via-[var(--bg-card)]/80 to-transparent"></div>
                           </div>
                           <div className="absolute top-6 right-6 z-10">
                              <ExternalLink className="w-5 h-5 text-white opacity-0 group-hover:opacity-100 transition-opacity" />
                           </div>
                           <div className="relative z-10 h-full flex flex-col justify-end p-6">
                              <div className="flex items-center gap-2 mb-2 text-[var(--accent)]">
                                 <Trophy className="w-4 h-4" />
                                 <span className="text-[10px] font-bold uppercase tracking-widest">{item.rank}</span>
                              </div>
                              <h4 className="text-xl font-bold text-white mb-1 leading-tight">{item.title}</h4>
                              <p className="text-xs text-gray-400 font-mono mb-4">{item.desc}</p>
                           </div>
                        </>
                      ) : (
                        <>
                          {/* Standard Card Content */}
                          <item.icon className="absolute -right-8 -bottom-8 w-40 h-40 opacity-[0.03] group-hover:opacity-10 transition-opacity duration-500" />
                          
                          {/* Card Header */}
                          <div className="p-6 pb-2 flex justify-between items-start z-10">
                            <div className="p-2 rounded border border-[var(--border-color)] bg-[var(--bg-main)] transition-theme group-hover:border-[var(--accent)]">
                              <item.icon className="w-6 h-6 text-[var(--text-main)] transition-theme" style={{ color: item.color }} />
                            </div>
                            <div className="text-[10px] font-mono uppercase tracking-widest text-[var(--text-muted)] transition-theme flex items-center gap-1">
                              {item.platform}
                            </div>
                          </div>

                          {/* Dynamic Content */}
                          <div className="flex-grow flex items-center justify-center p-4 z-10 w-full">
                            {item.details?.type === 'graph' ? (
                              <div className="flex items-center w-full justify-between px-2">
                                  <div className="space-y-1 text-xs font-mono text-[var(--text-muted)]">
                                    <div className="flex items-center gap-2"><div className="w-1.5 h-1.5 rounded-full bg-[#00b8a3]"></div>Easy: {item.details.stats.easy}</div>
                                    <div className="flex items-center gap-2"><div className="w-1.5 h-1.5 rounded-full bg-[#ffc01e]"></div>Med: {item.details.stats.med}</div>
                                    <div className="flex items-center gap-2"><div className="w-1.5 h-1.5 rounded-full bg-[#ff375f]"></div>Hard: {item.details.stats.hard}</div>
                                  </div>
                                  <DonutChart data={item.details.segments} color={item.color} total={dynamicTotal} totalLimit={item.details.stats.totalLimit} />
                              </div>
                            ) : item.details?.type === 'kaggle-stats' ? (
                              // --- UPDATED: Detailed Kaggle Stats ---
                              <div className="w-full px-4 text-xs">
                                {item.details.categories.map((cat, idx) => (
                                  <div key={idx} className="flex justify-between items-center py-1 border-b border-[var(--border-color)] last:border-0">
                                    <span className="text-[var(--text-muted)] w-20 font-mono text-[10px] uppercase">{cat.name}</span>
                                    <div className="flex gap-2">
                                      {cat.gold > 0 && (
                                        <div className="flex items-center gap-1" title="Gold">
                                           <div className="w-3 h-3 rounded-full bg-[#FFD700] border border-[#FFD700]/50 shadow-[0_0_5px_#FFD700]"></div>
                                           <span className="font-mono text-[10px] text-[var(--text-main)]">{cat.gold}</span>
                                        </div>
                                      )}
                                      {cat.silver > 0 && (
                                        <div className="flex items-center gap-1" title="Silver">
                                           <div className="w-3 h-3 rounded-full bg-[#C0C0C0] border border-[#C0C0C0]/50 shadow-[0_0_5px_#C0C0C0]"></div>
                                           <span className="font-mono text-[10px] text-[var(--text-main)]">{cat.silver}</span>
                                        </div>
                                      )}
                                      {cat.bronze > 0 && (
                                        <div className="flex items-center gap-1" title="Bronze">
                                           <div className="w-3 h-3 rounded-full bg-[#CD7F32] border border-[#CD7F32]/50 shadow-[0_0_5px_#CD7F32]"></div>
                                           <span className="font-mono text-[10px] text-[var(--text-main)]">{cat.bronze}</span>
                                        </div>
                                      )}
                                      {cat.gold === 0 && cat.silver === 0 && cat.bronze === 0 && <span className="text-[var(--text-muted)] opacity-30">-</span>}
                                    </div>
                                  </div>
                                ))}
                              </div>
                            ) : (
                              <div className="text-center">
                                  <div className="text-4xl font-black text-[var(--text-main)] transition-theme tracking-tighter" style={{ textShadow: `0 0 20px ${item.color}30` }}>
                                    {item.stat}
                                  </div>
                                  <div className="w-12 h-1 bg-[var(--border-color)] mx-auto mt-4 relative overflow-hidden">
                                    <div className="absolute top-0 left-0 h-full w-full bg-[var(--accent)]" style={{backgroundColor: item.color}}></div>
                                  </div>
                              </div>
                            )}
                          </div>

                          {/* Card Footer */}
                          <div className="p-6 pt-2 z-10">
                            <h4 className="text-[var(--text-muted)] text-xs uppercase tracking-widest mb-1 transition-theme text-right group-hover:text-[var(--text-main)]">{item.rank}</h4>
                            <p className="text-[10px] font-mono text-[var(--text-muted)] opacity-60 flex justify-end items-center gap-1 transition-theme">
                              <TrendingUp className="w-3 h-3" /> {item.sub}
                            </p>
                          </div>
                        </>
                      )}
                    </div>
                  </a>
                </ScrollReveal>
              );
            })}
          </div>
        </div>
      </section>

      {/* --- EXPERIENCE SECTION --- */}
      <section id="experience" className="relative w-full py-24 px-6 md:px-12 lg:px-24 z-20 bg-[var(--bg-main)] transition-colors duration-700">
        <div className="max-w-7xl mx-auto">
          <ScrollReveal>
            <h3 className="text-metallic text-4xl md:text-6xl font-['Montserrat'] font-bold uppercase tracking-tighter mb-16 opacity-90">Experience</h3>
          </ScrollReveal>
          <div className="relative border-l border-[var(--border-color)] ml-4 md:ml-10 space-y-16 transition-colors duration-700">
            <ScrollReveal delay={150}>
              <div className="relative pl-12 md:pl-16 group">
                <div className="absolute -left-[5px] top-2 w-[10px] h-[10px] rounded-full bg-[var(--accent)] shadow-[0_0_10px_var(--accent)] transition-transform duration-300 group-hover:scale-150"></div>
                <div className="flex flex-col md:flex-row md:items-baseline justify-between mb-2">
                  <h4 className="text-2xl md:text-3xl font-bold text-[var(--text-main)] group-hover:text-[var(--accent)] transition-all duration-300">Google Student Ambassador</h4>
                  <span className="text-[var(--text-muted)] font-mono text-sm md:text-base tracking-wider mt-1 md:mt-0 transition-theme">Sept 2025 — Jan 2026</span>
                </div>
                <p className="text-lg md:text-xl text-[var(--text-muted)] mb-4 font-light transition-theme">Google</p>
                <p className="text-[var(--text-muted)] opacity-60 max-w-2xl font-light leading-relaxed transition-theme">
                  • Organised small events to introduce Google Gemini in the campus. <br />
                  • Collaborated with faculty and student developer clubs to promote AI tools and innovation.
                </p>
              </div>
              <br />
              <div className="relative pl-12 md:pl-16 group">
                <div className="absolute -left-[5px] top-2 w-[10px] h-[10px] rounded-full bg-[var(--accent)] shadow-[0_0_10px_var(--accent)] transition-transform duration-300 group-hover:scale-150"></div>
                <div className="flex flex-col md:flex-row md:items-baseline justify-between mb-2">
                  <h4 className="text-2xl md:text-3xl font-bold text-[var(--text-main)] group-hover:text-[var(--accent)] transition-all duration-300">Deep Learning Intern</h4>
                  <span className="text-[var(--text-muted)] font-mono text-sm md:text-base tracking-wider mt-1 md:mt-0 transition-theme">Nov 2025 — Dec 2025</span>
                </div>
                <p className="text-lg md:text-xl text-[var(--text-muted)] mb-4 font-light transition-theme">UptoSkills</p>
                <p className="text-[var(--text-muted)] opacity-60 max-w-2xl font-light leading-relaxed transition-theme">
                  • Built recommendation system for personalized courses, study plans, and learning resources aligned with specific interview requirements.<br />
                  • Evaluated candidate performance in mock interviews to identify communication and technical skill gaps. <br />
                  • Provided score and performance to students after mock interview.
                </p>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>


      {/* --- CERTIFICATES SECTION (UPDATED WITH LINKS) --- */}
      <section id="certificates" className="relative w-full py-24 px-6 md:px-12 lg:px-24 z-20 bg-[var(--bg-main)] border-t border-[var(--border-color)] transition-colors duration-700">
        <div className="max-w-7xl mx-auto">
          <ScrollReveal>
             <h3 className="text-metallic text-4xl md:text-6xl font-['Montserrat'] font-bold uppercase tracking-tighter opacity-90 text-right mb-16">
                Licenses & Certs
             </h3>
          </ScrollReveal>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {CERTIFICATES_DATA.map((cert, index) => (
              <ScrollReveal key={index} delay={index * 100}>
                <div className="cinematic-card cert-card p-8 h-full flex flex-col justify-between group cursor-default">
                   <div>
                      <div className="flex justify-between items-start mb-6">
                        <Award className="w-8 h-8 text-[var(--accent)]" strokeWidth={1.5} />
                        <ShieldCheck className="w-5 h-5 text-[var(--text-muted)] group-hover:text-[var(--accent)] transition-colors" />
                      </div>
                      <h4 className="text-lg font-bold text-[var(--text-main)] leading-tight mb-2 group-hover:translate-x-1 transition-transform">{cert.title}</h4>
                      <p className="text-[var(--text-muted)] text-sm transition-theme">{cert.issuer}</p>
                   </div>
                   <div className="mt-8 pt-4 border-t border-[var(--border-color)] flex justify-between items-center text-xs font-mono text-[var(--text-muted)] transition-theme">
                      <span>{cert.date}</span>
                      <a href={cert.link} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 group-hover:text-[var(--text-main)] transition-colors cursor-pointer hover:underline">
                         <span>VERIFY</span>
                         <ExternalLink className="w-3 h-3" />
                      </a>
                   </div>
                   <div className="absolute top-2 right-2 text-[11px] font-mono opacity-50 tracking-widest">{cert.id}</div>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* --- CONTACT SECTION --- */}
      <section className="relative w-full bg-[var(--bg-main)] py-24 px-6 md:px-12 lg:px-24 overflow-hidden transition-colors duration-700" id="contact">
        <div className="absolute top-0 left-0 w-full h-64 bg-gradient-to-b from-[var(--bg-card)] to-transparent z-10 pointer-events-none transition-colors duration-700"></div>
        <div className="max-w-7xl mx-auto relative z-20">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-32 items-start pt-24">
            <div className="space-y-12">
              <ScrollReveal>
                <div>
                  <h3 className="text-metallic text-5xl md:text-7xl font-bold uppercase tracking-tighter mb-6 leading-none">Let's<br/>Connect</h3>
                  <p className="text-[var(--text-muted)] text-lg font-light max-w-md transition-theme">Currently available for freelance projects.</p>
                </div>
              </ScrollReveal>
              <div className="flex flex-col space-y-4">
  {[{ name: "LinkedIn", url: "https://in.linkedin.com/in/aqibraza-dev" }, { name: "GitHub", url: "https://github.com/aqibrazadev" }, { name: "Email", url: "mailto:aqibraza.dev@gmail.com" }]
    .map((link, i) => {
      // Check if the link is an email
      const isMail = link.url.startsWith('mailto:');
      
      return (
       <ScrollReveal key={i} delay={i * 100}>
        <a 
          href={link.url}
          // Only apply target="_blank" and rel attributes if it's NOT an email
          target={isMail ? undefined : '_blank'}
          rel={isMail ? undefined : 'noopener noreferrer'}
          className="text-2xl text-[var(--text-main)] hover:text-[var(--accent)] flex items-center group cursor-pointer transition-theme transition-colors" 
        >
          <span className="mr-4 text-[var(--text-muted)] group-hover:text-[var(--accent)] opacity-50 transition-theme transition-colors">
            0{i + 1}.
          </span> 
          {link.name}
          <ArrowUpRight className="ml-2 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all text-[var(--accent)] w-5 h-5" />
        </a>
       </ScrollReveal>
      );
  })}
</div>
            </div>
            <ScrollReveal delay={200}>
              <form onSubmit={handleSubmit} className="space-y-8 w-full">
  <div className="group">
    <label className="block text-xs uppercase tracking-widest text-[var(--text-muted)] mb-2 group-focus-within:text-[var(--accent)]">Your Name</label>
    <input name="name" value={formState.name} onChange={handleChange} className="input-cinematic w-full py-4 text-xl text-[var(--text-main)] placeholder-[var(--text-muted)]/30 bg-transparent border-b border-[var(--border-color)] focus:border-[var(--accent)] outline-none transition-colors" placeholder="Enter your name" type="text" required />
  </div>
  
  <div className="group">
    <label className="block text-xs uppercase tracking-widest text-[var(--text-muted)] mb-2 group-focus-within:text-[var(--accent)]">Email Address</label>
    <input name="email" value={formState.email} onChange={handleChange} className="input-cinematic w-full py-4 text-xl text-[var(--text-main)] placeholder-[var(--text-muted)]/30 bg-transparent border-b border-[var(--border-color)] focus:border-[var(--accent)] outline-none transition-colors" placeholder="hello@example.com" type="email" required />
  </div>
  
  <div className="group">
    <label className="block text-xs uppercase tracking-widest text-[var(--text-muted)] mb-2 group-focus-within:text-[var(--accent)]">Message</label>
    <textarea name="message" value={formState.message} onChange={handleChange} className="input-cinematic w-full py-4 text-xl text-[var(--text-main)] placeholder-[var(--text-muted)]/30 bg-transparent border-b border-[var(--border-color)] focus:border-[var(--accent)] outline-none transition-colors resize-none" placeholder="Tell me about your project..." rows="4" required></textarea>
  </div>
  
  <button type="submit" className="group relative px-8 py-4 bg-[var(--text-main)] text-[var(--bg-main)] font-bold uppercase tracking-wider overflow-hidden hover:text-black transition-colors mt-8 w-full md:w-auto">
    <span className="relative z-10 flex items-center gap-2 justify-center">
      Send
      <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
    </span>
    <div className="absolute inset-0 bg-[var(--accent)] transform translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-in-out z-0"></div>
  </button>
</form>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* --- FOOTER --- */}
      <footer className="bg-[var(--bg-card)] text-[var(--text-muted)] py-12 px-6 border-t border-[var(--border-color)] relative z-20 transition-colors duration-700">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-8">
          <div className="flex flex-col items-center md:items-start">
            <span className="font-['Sacramento',cursive] text-4xl text-[var(--accent)] drop-shadow-[0_0_5px_rgba(163,0,225,0.3)] mb-2">Aqib Raza</span>
            <p className="text-xs uppercase tracking-widest font-mono opacity-60">Software Engineer & AI Specialist</p>
          </div>
          <div className="text-xs font-mono uppercase text-center md:text-right opacity-60 transition-theme">
            <p>© 2026 Aqib Raza. All rights reserved.</p>
            <p className="mt-2">Designed with Passion & Code.</p>
            <p>aqibraza.dev@gmail.com</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default App;