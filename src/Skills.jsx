import React, { useState, useEffect } from 'react';
// Make sure to import any necessary icons (like Code, ChevronDown, ChevronUp from lucide-react)
import { Code, ChevronDown, ChevronUp } from 'lucide-react';
import ScrollReveal from './ScrollReveal'; // Assuming you have a ScrollReveal component for animations

export default function Skills({ SKILLS_DATA }) {
  // State for Mobile limits and Load More functionality
  const [showAll, setShowAll] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    // Check if device is mobile on mount and window resize
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    handleResize(); // Initial check
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Determine which skills to render based on device and toggle state
  const visibleSkills = isMobile && !showAll ? SKILLS_DATA.slice(0, 10) : SKILLS_DATA;

  return (
    <section id="skills" className="relative w-full py-24 px-6 md:px-12 lg:px-24 z-20 bg-[var(--bg-main)]/50 transition-colors duration-700 overflow-hidden">
      
      {/* Optional: Subtle ambient background glow for modern depth */}
      <div className="absolute top-0 right-1/4 w-[500px] h-[500px] bg-[var(--accent)] opacity-[0.03] blur-[150px] rounded-full pointer-events-none"></div>

      <div className="max-w-7xl mx-auto relative z-10">
        <ScrollReveal>
          <h3 className="text-metallic text-4xl md:text-6xl font-['Montserrat'] font-bold uppercase tracking-tighter mb-12 md:mb-16 opacity-90 text-right">
            Capabilities
          </h3>
        </ScrollReveal>

        {/* Adjusted grid for better desktop fluid layout */}
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4 md:gap-5">
          {visibleSkills.map((skill, i) => (
            <ScrollReveal key={i} delay={i * (isMobile ? 30 : 20)}>
              <div 
                className="group relative flex flex-col items-center justify-center text-center h-40 md:h-48 p-6 rounded-2xl border border-white/5 bg-white/[0.015] backdrop-blur-sm cursor-pointer transition-all duration-500 hover:-translate-y-1 hover:bg-white/[0.04] hover:shadow-[0_8px_30px_rgb(0,0,0,0.12)] hover:border-white/10 overflow-hidden"
                style={{
                  // The Fluid Top-Left to Reset animation for Web
                  animation: !isMobile ? `fluidTopLeft 0.7s cubic-bezier(0.2, 0.8, 0.2, 1) ${i * 0.05}s both` : 'none'
                }}
              >
                {/* Modern Hover Effect: Top-Left Glare Sweep */}
                <div className="absolute -top-12 -left-12 w-32 h-32 bg-[var(--accent,rgba(255,255,255,0.4))] blur-[50px] opacity-0 group-hover:opacity-40 transition-opacity duration-700 pointer-events-none rounded-full" />
                
                {/* Secondary Sweep Gradient */}
                <div className="absolute inset-0 bg-gradient-to-br from-[var(--accent,rgba(255,255,255,0.05))] via-transparent to-transparent opacity-0 group-hover:opacity-10 transition-opacity duration-700 pointer-events-none" />

                <div className="w-10 h-10 md:w-12 md:h-12 mb-4 relative flex items-center justify-center transition-transform duration-500 md:group-hover:scale-110 md:group-hover:-translate-y-1">
                  {skill.logo ? (
                    <img 
                      src={skill.logo} 
                      alt={skill.title} 
                      className="w-full h-full object-contain filter grayscale opacity-70 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-500 drop-shadow-md" 
                    />
                  ) : (
                    <Code className="w-full h-full text-[var(--text-muted)] group-hover:text-[var(--accent)] transition-colors duration-500" />
                  )}
                </div>

                <h4 className="text-[var(--text-main)] font-semibold uppercase tracking-wider text-xs md:text-sm mb-1 z-10 transition-colors">
                  {skill.title}
                </h4>
                <p className="text-[var(--text-muted)] text-[9px] md:text-[10px] font-mono uppercase tracking-widest z-10 opacity-70 group-hover:opacity-100 transition-opacity">
                  {skill.subtitle}
                </p>
              </div>
            </ScrollReveal>
          ))}
        </div>

        {/* Mobile "Load More" Button */}
        {isMobile && SKILLS_DATA.length > 10 && (
          <div className="mt-12 flex justify-center w-full">
            <button 
              onClick={() => setShowAll(!showAll)}
              className="flex items-center justify-center gap-2 px-8 py-3.5 rounded-full border border-white/10 bg-white/5 backdrop-blur-md text-[11px] font-mono uppercase tracking-[0.2em] text-[var(--text-main)] hover:bg-white/10 hover:border-white/20 transition-all duration-300 active:scale-95 z-20"
            >
              {showAll ? (
                <>Show Less <ChevronUp className="w-4 h-4" /></>
              ) : (
                <>View All {SKILLS_DATA.length} <ChevronDown className="w-4 h-4" /></>
              )}
            </button>
          </div>
        )}
      </div>

      {/* Embedded CSS for the Keyframe Animation */}
      <style>{`
        @keyframes fluidTopLeft {
          0% {
            opacity: 0;
            transform: translate(-30px, -30px) scale(0.95);
            filter: blur(4px);
          }
          100% {
            opacity: 1;
            transform: translate(0, 0) scale(1);
            filter: blur(0px);
          }
        }
      `}</style>
    </section>
  );
}