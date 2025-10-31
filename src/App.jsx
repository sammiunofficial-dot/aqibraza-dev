import React, { useState, useEffect } from 'react';
import './App.css';
import Projects from './pages/Projects';
import Skills from './pages/Skills';
import Certificates from './pages/Certificates';
import ParticleCanvas from './ParticleCanvas';
import Contact from './components/Contact';
import Footer from './components/Footer';

// --- Dark Mode Hook ---
// This custom hook manages the dark mode state and persists it to localStorage.
const useDarkMode = () => {
  const [isDarkMode, setIsDarkMode] = useState(() => {
    const storedTheme = localStorage.getItem('theme');
    if (storedTheme) {
      return storedTheme === 'dark';
    }
    return window.matchMedia('(prefers-color-scheme: dark)').matches;
  });

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  }, [isDarkMode]);

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
  };

  return [isDarkMode, toggleDarkMode];
};

// --- Header Component ---
const Header = ({ isDarkMode, toggleDarkMode, navLinks, activeLink, onNavClick }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const handleLinkClick = (e, id) => {
    e.preventDefault();
    setIsMobileMenuOpen(false); // Close mobile menu on click
    onNavClick(id); // Use the function passed from App
  };

  return (
    <header className="header">
      <nav className="container header-nav">
        <a href="#home" className="logo" onClick={(e) => handleLinkClick(e, 'home')}>

            <img className='logo-icon' src="https://media.licdn.com/dms/image/v2/D5603AQG8kFP425b7zA/profile-displayphoto-scale_200_200/B56ZeDHHD3HUAY-/0/1750251371061?e=2147483647&v=beta&t=S2XV-tk-hTeri5msoD7qYRZOVF7kVxmGFoL0XYBsIOA" alt="" />
          
          <span className="logo-text">Aqib Raza</span>
        </a>
        
        {/* Desktop Navigation */}
        <div className="nav-links-desktop">
          {navLinks.map((link) => (
            <a
              key={link.id}
              href={`#${link.id}`}
              className={activeLink === link.id ? 'active' : ''}
              onClick={(e) => handleLinkClick(e, link.id)}
            >
              {link.name}
            </a>
          ))}
        </div>

        {/* Mobile Navigation (conditionally rendered) */}
        {isMobileMenuOpen && (
          <div className="nav-links-mobile">
            {navLinks.map((link) => (
              <a
                key={link.id}
                href={`#${link.id}`}
                className={activeLink === link.id ? 'active' : ''}
                onClick={(e) => handleLinkClick(e, link.id)}
              >
                {link.name}
              </a>
            ))}
          </div>
        )}

        <div className="header-buttons">
          <button className="dark-mode-toggle" onClick={toggleDarkMode} aria-label="Toggle dark mode">
            {isDarkMode ? (
              <span className="material-symbols-outlined">light_mode</span>
            ) : (
              <span className="material-symbols-outlined">dark_mode</span>
            )}
          </button>
          <button className="menu-button" onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} aria-label="Toggle menu">
            <span className="material-symbols-outlined">
              {isMobileMenuOpen ? 'close' : 'menu'}
            </span>
          </button>
        </div>
      </nav>
    </header>
  );
};

// Define styles as objects
const socialLinksStyle = {
  display: 'flex',
  justifyContent: 'center',
  gap: '1.5rem', // 24px
  marginTop: '2rem' // 32px
};

const socialIconStyle = {
  display: 'inline-block',
  // NOTE: This color is hardcoded from your theme's light mode.
  // It will NOT respond to dark mode.
  color: '#475569', // This was var(--text-light-secondary)
  transition: 'color 0.2s ease-in-out, transform 0.2s ease-in-out'
  // NOTE: :hover effects CANNOT be applied here.
};

const svgStyle = {
  width: '28px',
  height: '28px',
  fill: 'currentColor'
};

// --- Home (Hero) Component ---
const Home = () => (
  // Note: We now use a section tag for scroll-spying
  <section id="home" className="hero-section">
    <div className="hero-content">
      <div className="hero-image-container">
        <div className="hero-image-wrapper">
          <div className="hero-image-blur"></div>
          <img
            alt="Portrait of the AI Researcher"
            className="hero-image"
            src="https://media.licdn.com/dms/image/v2/D5603AQG8kFP425b7zA/profile-displayphoto-scale_200_200/B56ZeDHHD3HUAY-/0/1750251371061?e=2147483647&v=beta&t=S2XV-tk-hTeri5msoD7qYRZOVF7kVxmGFoL0XYBsIOA"
          />
        </div>
      </div>
      <h1 className="hero-headline">
        Machine Learning & AI Enthusiast
      </h1>
      <p className="hero-subheadline">
        Undergraduate Computer Science and Engineering student, passionate about learning and exploring Machine Learning and Artificial Intelligence.
      </p>
      <div className="hero-buttons">
        <a href="#projects" className="btn btn-primary">
          Explore My Work
        </a>
        <a href="#contact" className="btn btn-secondary">
          Get In Touch
        </a>
      </div>
      <div style={socialLinksStyle}>
      <a
        href="https://github.com/aqibraza-dev" // <-- Replace with your link
        target="_blank"
        rel="noopener noreferrer"
        style={socialIconStyle}
        aria-label="GitHub"
        // To simulate hover, you would need onMouseOver/onMouseOut event handlers
      >
        <svg style={svgStyle} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
          <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
        </svg>
      </a>
      <a
        href="https://linkedin.com/in/aqibraza-dev" // <-- Replace with your link
        target="_blank"
        rel="noopener noreferrer"
        style={socialIconStyle}
        aria-label="LinkedIn"
      >
        <svg style={svgStyle} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
          <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
        </svg>
      </a>
    </div>
    </div>
  </section>
);

// --- Placeholder Section Component ---
const PlaceholderSection = ({ id, title }) => (
  <section id={id} className="placeholder-section">
    <div className="container">
      <h2>{title}</h2>
      <p>coming soon...</p>
    </div>
  </section>
);


// --- Main App Component ---
function App() {
  const [isDarkMode, toggleDarkMode] = useDarkMode();
  const [activeLink, setActiveLink] = useState('home');

  const navLinks = [
    { name: 'Home', id: 'home' },
    { name: 'Projects', id: 'projects' },
    { name: 'Skills', id: 'skills' },
    { name: 'Certificates', id: 'certificates' },
    { name: 'Articles', id: 'articles' },
    { name: 'About', id: 'about' },
    { name: 'Contact', id: 'contact' },
  ];

  // Effect for scroll-spying
  useEffect(() => {
    const sections = navLinks.map(link => document.getElementById(link.id));
    
    const handleScroll = () => {
      // Get header height to offset scroll position
      const headerHeight = document.querySelector('.header')?.offsetHeight || 80;
      // Add a 50px buffer for better accuracy
      const scrollPosition = window.scrollY + headerHeight + 50; 
      
      let currentSectionId = 'home'; // Default to 'home'

      // Find the last section that is "above" the scroll position
      for (let i = sections.length - 1; i >= 0; i--) {
        const section = sections[i];
        if (section && section.offsetTop <= scrollPosition) {
          currentSectionId = section.id;
          break; // Found the current section
        }
      }

      setActiveLink(currentSectionId);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll(); // Run once on load to set the initial state
    
    // Clean up
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []); // Empty dependency array, as navLinks is constant

  // This function handles *manual* clicks on nav links
  const handleNavClick = (id) => {
    // Set active link immediately for responsive feel
    setActiveLink(id);
    const section = document.getElementById(id);
    if (section) {
      // Manually calculate position to account for fixed header
      const headerHeight = document.querySelector('.header')?.offsetHeight || 80;
      const sectionTop = section.offsetTop - headerHeight;
      
      window.scrollTo({
        top: sectionTop,
        behavior: 'smooth'
      });
    }
  };

  return (
    <div className="app-wrapper">
      <ParticleCanvas isDarkMode={isDarkMode} />
      <Header 
        isDarkMode={isDarkMode} 
        toggleDarkMode={toggleDarkMode}
        navLinks={navLinks}
        activeLink={activeLink}
        onNavClick={handleNavClick}
      />
      
      {/* Sections */}
      <Home />
      <Projects id="projects" title="Projects"/>
      <Skills/>
      <Certificates/>
      <PlaceholderSection id="articles" title="Articles" />
      <PlaceholderSection id="about" title="About" />
      <Contact/>

      <Footer/>

    </div>
  );
}

export default App;