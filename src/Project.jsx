import React, { useState, useEffect, useRef } from 'react';
import { Github, Globe, TerminalSquare, ChevronLeft, ChevronRight } from 'lucide-react';
import medai from "./assets/medai.webp"
import marine from "./assets/marine.webp"
import mnist from "./assets/mnist.webp"

// --- Data ---
const demoData = [
  {
    id: '01',
    category: 'Med-AI',
    title: 'Medical Ai/Ml Web app',
    description: 'Scalable unified web app which include major biotech related projects like Skin Cancer, diabetes prediction....',
    // FIX: Changed from './assets' to '/assets' so the public folder resolves it correctly
    image: medai, 
    windowTitle: 'terax · medai',
    githubUrl: 'https://github.com/aqibraza-dev/Med-AI',
    websiteUrl: 'https://med-ai-pro.vercel.app/'
  },
  {
    id: '02',
    category: 'e-Yantra(Organized by IIT Bombay)',
    title: 'Crop-Drop Bot',
    description: 'Build and program a RL bot to autonomously pick and place crops, showcasing precision and efficiency in agricultural robotics.',
    image: 'src/assets/eyantra.mp4',
    windowTitle: 'projects · e-yantra',
    githubUrl: 'https://github.com'
  },
  {
    id: '03',
    category: 'CMLRE Data Platform',
    title: 'AI Driven Marine Data Platform App',
    description: 'Unified Platform Containing Fishing Zone, Oceanography, and eDna Data',
    image: marine,
    windowTitle: 'terax ·marine-data',
    githubUrl: 'https://github.com/aqibraza-dev',
    websiteUrl: 'https://ai-data-platform-two.vercel.app/'
  },
  {
    id: '04',
    category: 'MNIST Handwritten Digit Classification',
    title: 'Hand Digit Classification App',
    description: 'A distraction-free environment that puts your code and terminal output front and center.',
    image: mnist,
    windowTitle: 'terax · mnist',
    githubUrl: 'https://github.com/aqibraza-dev',
    websiteUrl:'https://ai-data-platform-two.vercel.app/',
  }
];

// --- Helper: Detect if URL is a video ---
const isVideo = (url) => {
  if (!url) return false;
  const cleanUrl = url.split('?')[0]; 
  return cleanUrl.match(/\.(mp4|webm|ogg)$/i) !== null;
};

// --- Subcomponent: The Terminal Card ---
const ProjectCard = ({ project, className = "" }) => {
  const videoRef = useRef(null);

  // FIX: Force browser autoplay by applying muted state directly to the DOM node
  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.defaultMuted = true;
      videoRef.current.muted = true;
      videoRef.current.play().catch((error) => {
        console.log("Autoplay prevented by browser:", error);
      });
    }
  }, []);

  return (
    <div className={`flex flex-col w-full h-full rounded-xl overflow-hidden border border-[#27272a] shadow-[0_20px_60px_rgba(0,0,0,0.6)] bg-[#09090b] group ${className}`}>
      {/* macOS Style Window Title Bar */}
      <div className="h-8 md:h-10 bg-[#121214] border-b border-[#27272a] flex items-center px-3 md:px-4 shrink-0 relative z-20">
        <div className="flex gap-1.5 md:gap-2 items-center absolute left-3 md:left-4">
          <div className="w-2.5 h-2.5 md:w-3 md:h-3 rounded-full bg-[#ff5f56] border border-[#e0443e]"></div>
          <div className="w-2.5 h-2.5 md:w-3 md:h-3 rounded-full bg-[#ffbd2e] border border-[#dea123]"></div>
          <div className="w-2.5 h-2.5 md:w-3 md:h-3 rounded-full bg-[#27c93f] border border-[#1aab29]"></div>
        </div>
        <div className="w-full text-center text-[#71717a] text-[10px] md:text-[11px] tracking-wider font-mono select-none opacity-70">
          {project.windowTitle}
        </div>
      </div>

      {/* Media Content Area (Image or Video) */}
      <div className="relative w-full aspect-video bg-[#000000] overflow-hidden shrink-0">
        {isVideo(project.image) ? (
          <video 
            ref={videoRef}
            src={project.image}
            autoPlay
            loop
            muted
            playsInline
            className="w-full h-full object-cover opacity-70 group-hover:scale-105 group-hover:opacity-100 transition-all duration-700 ease-out pointer-events-none"
          />
        ) : (
          <img 
            src={project.image} 
            alt={project.title}
            className="w-full h-full object-cover opacity-70 group-hover:scale-105 group-hover:opacity-100 transition-all duration-700 ease-out"
            loading="lazy"
          />
        )}
      </div>

      {/* Text & Details Area */}
      <div className="flex flex-col flex-1 p-5 md:p-6 bg-gradient-to-b from-[#09090b] to-[#050505]">
        <div className="flex items-center gap-3 text-[10px] md:text-xs font-mono tracking-[0.2em] text-[#71717a] mb-3 md:mb-4">
          <span>{project.id}</span>
          <div className="h-[1px] w-4 bg-[#3f3f46]"></div>
          <span>{project.category}</span>
        </div>
        
        <h3 className="text-xl md:text-2xl font-bold text-white mb-2 md:mb-3 tracking-tight">
          {project.title}
        </h3>
        
        <p className="text-sm text-[#a1a1aa] font-light mb-6 flex-1 line-clamp-3">
          {project.description}
        </p>

        {/* Links */}
        <div className="flex flex-wrap gap-2 md:gap-3 mt-auto">
          {project.githubUrl && (
            <a 
              href={project.githubUrl} 
              target="_blank" 
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 bg-white/5 hover:bg-white/10 border border-white/10 text-white px-3 md:px-4 py-2 rounded-lg text-xs md:text-sm transition-all hover:scale-105 active:scale-95 flex-1"
            >
              <Github size={16} />
              <span>GitHub</span>
            </a>
          )}
          {project.websiteUrl && (
            <a 
              href={project.websiteUrl} 
              target="_blank" 
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 bg-white text-black hover:bg-white/90 border border-white px-3 md:px-4 py-2 rounded-lg text-xs md:text-sm font-medium transition-all hover:scale-105 active:scale-95 flex-1"
            >
              <Globe size={16} />
              <span>Demo</span>
            </a>
          )}
          {!project.githubUrl && !project.websiteUrl && (
            <div className="flex items-center justify-center gap-2 bg-white/5 border border-white/10 text-white/40 px-4 py-2 rounded-lg text-sm w-full cursor-not-allowed">
              <TerminalSquare size={16} />
              <span>Internal</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default function App() {
  const [activeIndex, setActiveIndex] = useState(0);
  const touchStartX = useRef(null);

  // Auto-advance for Mobile Arch
  useEffect(() => {
    const timer = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % demoData.length);
    }, 4000);
    return () => clearInterval(timer);
  }, []);

  // --- Mobile Touch Handlers ---
  const handleTouchStart = (e) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = (e) => {
    if (touchStartX.current === null) return;
    const touchEndX = e.changedTouches[0].clientX;
    const diff = touchStartX.current - touchEndX;

    if (diff > 50) {
      setActiveIndex((prev) => (prev + 1) % demoData.length);
    } else if (diff < -50) {
      setActiveIndex((prev) => (prev - 1 + demoData.length) % demoData.length);
    }
    touchStartX.current = null;
  };

  const nextSlide = () => setActiveIndex((prev) => (prev + 1) % demoData.length);
  const prevSlide = () => setActiveIndex((prev) => (prev - 1 + demoData.length) % demoData.length);

  return (
    <div className="min-h-screen bg-[#050505] text-white font-sans overflow-hidden relative flex flex-col selection:bg-white/20">
      
      {/* Background Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[150%] h-[150%] bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.03)_0%,transparent_50%)] pointer-events-none blur-3xl z-0"></div>

      <style>{`
        /* Infinite Marquee Animation for Desktop */
        @keyframes scrollX {
          0% { transform: translateX(0); }
          100% { transform: translateX(calc(-50% - 1rem)); } 
        }
        .animate-marquee {
          animation: scrollX 40s linear infinite;
        }
        .marquee-container:hover .animate-marquee {
          animation-play-state: paused;
        }
        
        /* Mobile Arch CSS */
        .arch-card {
          transition: all 0.5s cubic-bezier(0.25, 1, 0.5, 1);
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
        }
        .no-scrollbar::-webkit-scrollbar { display: none; }
        .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
      `}</style>

      {/* Header Section */}
      <div className="relative z-10 pt-20 pb-12 px-6 flex flex-col items-center text-center">
        <h1 className="text-4xl md:text-5xl lg:text-[56px] font-bold tracking-tight text-[#f4f4f5] mb-4">
          Building
        </h1>
        <p className="text-lg md:text-xl text-[#a1a1aa] max-w-2xl font-light">
            the solutions that matters the most.
        </p>
      </div>

      {/* ========================================
        MOBILE VIEW: 3D Arch / Cover Flow Carousel 
        ========================================
      */}
      <div className="flex md:hidden flex-col items-center justify-center flex-1 w-full relative z-10 px-4 pb-20">
        <div 
          className="relative w-full max-w-[340px] aspect-[4/5] perspective-[1200px]"
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}
        >
          {demoData.map((project, index) => {
            const diff = (index - activeIndex + demoData.length) % demoData.length;
            
            let transformStyles = '';
            let opacity = 0;
            let zIndex = 0;

            if (diff === 0) {
              transformStyles = 'translateZ(0px) translateX(0) scale(1) rotateY(0deg)';
              opacity = 1;
              zIndex = 30;
            } else if (diff === 1 || diff === - (demoData.length - 1)) {
              transformStyles = 'translateZ(-100px) translateX(45%) scale(0.85) rotateY(-15deg)';
              opacity = 0.5;
              zIndex = 20;
            } else if (diff === demoData.length - 1 || diff === -1) {
              transformStyles = 'translateZ(-100px) translateX(-45%) scale(0.85) rotateY(15deg)';
              opacity = 0.5;
              zIndex = 20;
            } else {
              transformStyles = 'translateZ(-200px) translateX(0) scale(0.7) rotateY(0deg)';
              opacity = 0;
              zIndex = 10;
            }

            return (
              <div 
                key={`mobile-${project.id}`}
                className="arch-card origin-center"
                style={{ 
                  transform: transformStyles, 
                  opacity: opacity,
                  zIndex: zIndex,
                  pointerEvents: diff === 0 ? 'auto' : 'none'
                }}
              >
                <ProjectCard project={project} />
              </div>
            );
          })}
        </div>

        {/* Mobile Controls */}
        <div className="flex items-center gap-6 mt-12">
          <button onClick={prevSlide} className="p-3 rounded-full bg-white/5 text-white active:bg-white/20 transition">
            <ChevronLeft size={20} />
          </button>
          
          <div className="flex gap-2">
            {demoData.map((_, idx) => (
              <div 
                key={`dot-${idx}`}
                className={`h-1.5 rounded-full transition-all duration-300 ${idx === activeIndex ? 'w-6 bg-white' : 'w-2 bg-white/20'}`}
              />
            ))}
          </div>

          <button onClick={nextSlide} className="p-3 rounded-full bg-white/5 text-white active:bg-white/20 transition">
            <ChevronRight size={20} />
          </button>
        </div>
      </div>

      {/* ========================================
        DESKTOP VIEW: Infinite Horizontal Marquee 
        ========================================
      */}
      <div className="hidden md:flex flex-1 w-full items-center relative z-10 pb-12 overflow-hidden marquee-container">
        
        <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-[#050505] to-transparent z-20 pointer-events-none"></div>
        <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-[#050505] to-transparent z-20 pointer-events-none"></div>

        <div className="flex gap-8 w-max animate-marquee pl-8 hover:[animation-play-state:paused]">
          {[...demoData, ...demoData].map((project, index) => (
            <div 
              key={`desktop-${project.id}-${index}`} 
              className="w-[450px] lg:w-[500px] xl:w-[600px] h-[450px] lg:h-[600px] shrink-0"
            >
              <ProjectCard project={project} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}