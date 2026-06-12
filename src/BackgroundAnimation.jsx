import React, { useEffect, useRef } from 'react';
import styles from './CanvasBackground.module.css';

const CanvasBackground = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const gl = canvas.getContext('webgl') || canvas.getContext('experimental-webgl');
    
    if (!gl) {
      console.warn('WebGL not supported, falling back to static background.');
      return;
    }

    // --- Shader Sources ---
    const vsSource = `
      attribute vec2 position;
      void main() {
        gl_Position = vec4(position, 0.0, 1.0);
      }
    `;

    const fsSource = `
      precision highp float;
      uniform vec2 u_resolution;
      uniform float u_time;
      uniform vec2 u_mouse;
      uniform float u_isMobile;

      // Pseudo-random hash
      float hash(vec2 p) { 
        return fract(sin(dot(p, vec2(12.9898, 78.233))) * 43758.5453); 
      }

      // Smooth Value Noise
      float noise(vec2 p) {
          vec2 i = floor(p);
          vec2 f = fract(p);
          vec2 u = f * f * (3.0 - 2.0 * f);
          return mix(mix(hash(i + vec2(0.0,0.0)), hash(i + vec2(1.0,0.0)), u.x),
                     mix(hash(i + vec2(0.0,1.0)), hash(i + vec2(1.0,1.0)), u.x), u.y);
      }

      // Fractal Brownian Motion (FBM) for fluid layers
      float fbm(vec2 p) {
          float v = 0.0;
          float a = 0.5;
          vec2 shift = vec2(100.0);
          mat2 rot = mat2(cos(0.5), sin(0.5), -sin(0.5), cos(0.5));
          for (int i = 0; i < 5; ++i) {
              v += a * noise(p);
              p = rot * p * 2.0 + shift;
              a *= 0.5;
          }
          return v;
      }

      void main() {
          vec2 uv = gl_FragCoord.xy / u_resolution.xy;
          
          // Aspect ratio correction
          vec2 st = uv;
          st.x *= u_resolution.x / u_resolution.y;

          vec2 mouse = u_mouse / u_resolution.xy;
          mouse.x *= u_resolution.x / u_resolution.y;

          // Theme Colors matching the aura
          vec3 bgColor = vec3(0.06, 0.05, 0.12);   // Deep space background
          vec3 color1 = vec3(0.45, 0.15, 0.75);    // Purple core
          vec3 color2 = vec3(0.85, 0.35, 0.95);    // Bright pink/magenta edge

          // Interactive fluid push (Desktop only)
          vec2 interaction = vec2(0.0);
          float mouseDist = distance(st, mouse);
          
          if (u_isMobile < 0.5) {
              // Smooth repulsion field around the cursor
              interaction = (mouse - st) * smoothstep(0.7, 0.0, mouseDist) * 0.35;
          }

          // Domain warping for fluid simulation
          vec2 q = vec2(0.0);
          q.x = fbm(st + u_time * 0.04);
          q.y = fbm(st + vec2(1.0));

          vec2 r = vec2(0.0);
          r.x = fbm(st + 1.0 * q + vec2(1.7, 9.2) + u_time * 0.12 + interaction);
          r.y = fbm(st + 1.0 * q + vec2(8.3, 2.8) + u_time * 0.11);

          float f = fbm(st + r);

          // Diagonal bias to make the fluid sweep across the screen like an aurora
          float wavePattern = (1.0 - uv.y) * 1.1 - uv.x * 0.3; 
          float intensity = smoothstep(0.1, 0.8, wavePattern * f);

          // Color mixing based on noise intensity
          vec3 color = mix(bgColor, color1, intensity * 1.6);
          color = mix(color, color2, smoothstep(0.3, 1.0, intensity * f * 2.2));

          // Localized interactive glow at the cursor tip
          if (u_isMobile < 0.5) {
              float glow = smoothstep(0.25, 0.0, mouseDist);
              color += color2 * glow * 0.25;
          }

          gl_FragColor = vec4(color, 1.0);
      }
    `;

    // --- WebGL Initialization ---
    const compileShader = (type, source) => {
      const shader = gl.createShader(type);
      gl.shaderSource(shader, source);
      gl.compileShader(shader);
      if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
        console.error('Shader compilation error:', gl.getShaderInfoLog(shader));
        gl.deleteShader(shader);
        return null;
      }
      return shader;
    };

    const vs = compileShader(gl.VERTEX_SHADER, vsSource);
    const fs = compileShader(gl.FRAGMENT_SHADER, fsSource);
    const program = gl.createProgram();
    gl.attachShader(program, vs);
    gl.attachShader(program, fs);
    gl.linkProgram(program);
    gl.useProgram(program);

    // Fullscreen quad geometry
    const vertices = new Float32Array([
      -1, -1,  1, -1,  -1, 1,
      -1,  1,  1, -1,   1, 1
    ]);
    const buffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
    gl.bufferData(gl.ARRAY_BUFFER, vertices, gl.STATIC_DRAW);

    const positionLoc = gl.getAttribLocation(program, 'position');
    gl.enableVertexAttribArray(positionLoc);
    gl.vertexAttribPointer(positionLoc, 2, gl.FLOAT, false, 0, 0);

    // Uniform locations
    const resolutionLoc = gl.getUniformLocation(program, 'u_resolution');
    const timeLoc = gl.getUniformLocation(program, 'u_time');
    const mouseLoc = gl.getUniformLocation(program, 'u_mouse');
    const isMobileLoc = gl.getUniformLocation(program, 'u_isMobile');

    // --- State & Events ---
    let animationFrameId;
    let startTime = Date.now();
    let isMobile = window.innerWidth < 768 ? 1.0 : 0.0;
    
    // Smooth mouse interpolation targets
    let mouse = { x: window.innerWidth / 2, y: window.innerHeight / 2 };
    let targetMouse = { x: window.innerWidth / 2, y: window.innerHeight / 2 };

    const resize = () => {
      // Use devicePixelRatio for sharp rendering on retina displays
      const dpr = window.devicePixelRatio || 1;
      canvas.width = window.innerWidth * dpr;
      canvas.height = window.innerHeight * dpr;
      gl.viewport(0, 0, canvas.width, canvas.height);
      isMobile = window.innerWidth < 768 ? 1.0 : 0.0;
    };

    const handleMouseMove = (e) => {
      targetMouse.x = e.clientX;
      // Invert Y axis for WebGL coordinate space
      targetMouse.y = window.innerHeight - e.clientY; 
    };

    window.addEventListener('resize', resize);
    window.addEventListener('mousemove', handleMouseMove);
    resize();

    // --- Render Loop ---
    const render = () => {
      const elapsed = (Date.now() - startTime) * 0.001;

      // Smoothly interpolate current mouse position towards target
      mouse.x += (targetMouse.x - mouse.x) * 0.08;
      mouse.y += (targetMouse.y - mouse.y) * 0.08;

      gl.uniform2f(resolutionLoc, canvas.width, canvas.height);
      gl.uniform1f(timeLoc, elapsed);
      // Pass normalized mouse coordinates multiplied by DPR
      gl.uniform2f(mouseLoc, mouse.x * (window.devicePixelRatio || 1), mouse.y * (window.devicePixelRatio || 1));
      gl.uniform1f(isMobileLoc, isMobile);

      gl.drawArrays(gl.TRIANGLES, 0, 6);
      animationFrameId = requestAnimationFrame(render);
    };

    render();

    // --- Cleanup ---
    return () => {
      window.removeEventListener('resize', resize);
      window.removeEventListener('mousemove', handleMouseMove);
      cancelAnimationFrame(animationFrameId);
      gl.deleteProgram(program);
    };
  }, []);

  return (
    <div className={styles.canvasContainer}>
      <canvas
        ref={canvasRef}
        className={styles.canvasBackground}
      />
    </div>
  );
};

export default CanvasBackground;