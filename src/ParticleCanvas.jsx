import React, { useRef, useEffect } from 'react';
import styles from './ParticleCanvas.module.css';

const ParticleCanvas = ({ isDarkMode }) => {
  const canvasRef = useRef(null);
  
  // Use a ref to store theme colors. This allows the animation loop
  // to access the current theme value without restarting.
  const themeColorsRef = useRef({
    particle: '#475569',
    line: '#475569',
  });

  // Update theme colors when isDarkMode changes
  useEffect(() => {
    themeColorsRef.current = {
      particle: isDarkMode ? 'rgba(226, 232, 240, 0.7)' : 'rgba(71, 85, 105, 0.7)',
      line: isDarkMode ? 'rgba(226, 232, 240, 0.2)' : 'rgba(71, 85, 105, 0.2)',
    };
  }, [isDarkMode]);

  // The main effect for setting up and running the canvas animation
  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    let particlesArray = [];
    let animationFrameId;

    // Particle class
    class Particle {
      constructor(x, y, directionX, directionY, size) {
        this.x = x;
        this.y = y;
        this.directionX = directionX;
        this.directionY = directionY;
        this.size = size;
      }

      // Method to draw individual particle
      draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2, false);
        ctx.fillStyle = themeColorsRef.current.particle;
        ctx.fill();
      }

      // Method to update particle position and handle wall collision
      update() {
        if (this.x > canvas.width || this.x < 0) {
          this.directionX = -this.directionX;
        }
        if (this.y > canvas.height || this.y < 0) {
          this.directionY = -this.directionY;
        }
        this.x += this.directionX;
        this.y += this.directionY;
        this.draw();
      }
    }

    // Create particle array
    function init() {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      particlesArray = [];
      let numberOfParticles = (canvas.height * canvas.width) / 25000;
      for (let i = 0; i < numberOfParticles; i++) {
        let size = (Math.random() * 2) + 1;
        let x = (Math.random() * ((window.innerWidth - size * 2) - (size * 2)) + size * 2);
        let y = (Math.random() * ((window.innerHeight - size * 2) - (size * 2)) + size * 2);
        let directionX = (Math.random() * 0.4) - 0.2;
        let directionY = (Math.random() * 0.4) - 0.2;
        particlesArray.push(new Particle(x, y, directionX, directionY, size));
      }
    }

    // Animation loop
    function animate() {
      animationFrameId = requestAnimationFrame(animate);
      ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);

      for (let i = 0; i < particlesArray.length; i++) {
        particlesArray[i].update();
      }
      connect();
    }

    // Draw lines between particles
    function connect() {
      let opacityValue = 1;
      for (let a = 0; a < particlesArray.length; a++) {
        for (let b = a; b < particlesArray.length; b++) {
          let distance = ((particlesArray[a].x - particlesArray[b].x) * (particlesArray[a].x - particlesArray[b].x))
            + ((particlesArray[a].y - particlesArray[b].y) * (particlesArray[a].y - particlesArray[b].y));
          
          if (distance < (canvas.width / 7) * (canvas.height / 7)) {
            opacityValue = 1 - (distance / 20000);
            ctx.strokeStyle = themeColorsRef.current.line.replace(/[^,]+(?=\))/, opacityValue); // Dynamically set line opacity
            ctx.lineWidth = 1;
            ctx.beginPath();
            ctx.moveTo(particlesArray[a].x, particlesArray[a].y);
            ctx.lineTo(particlesArray[b].x, particlesArray[b].y);
            ctx.stroke();
          }
        }
      }
    }

    // Resize event listener
    const handleResize = () => {
      init();
    };
    
    window.addEventListener('resize', handleResize);
    
    // Start animation
    init();
    animate();

    // Cleanup on component unmount
    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationFrameId);
    };
  }, []); // Empty dependency array ensures this runs only once on mount

  return <canvas ref={canvasRef} className={styles.particleCanvas}></canvas>;
};

export default ParticleCanvas;