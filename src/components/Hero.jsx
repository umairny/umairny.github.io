import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useScroll, useTransform, useSpring, useMotionValue } from 'framer-motion';
import { FaCode, FaPaintBrush, FaReact, FaLaptopCode, FaPalette } from 'react-icons/fa';
import { SiAdobephotoshop, SiAdobeillustrator } from 'react-icons/si';
import { heroData } from '../Data';

const Hero = () => {
  const [roleIndex, setRoleIndex] = useState(0);
  const ref = useRef(null);

  // Scroll Parallax
  const { scrollY } = useScroll();
  const yRange = useTransform(scrollY, [0, 500], [0, 200]);
  const opacityRange = useTransform(scrollY, [0, 400], [1, 0]);

  // Mouse Parallax & Tilt
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const mouseXSpring = useSpring(x);
  const mouseYSpring = useSpring(y);

  // Calculate rotation based on mouse position
  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["10deg", "-10deg"]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-10deg", "10deg"]);

  const handleMouseMove = (e) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;

    // Calculate mouse position relative to center (range -0.5 to 0.5)
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;

    const xPct = mouseX / width - 0.5;
    const yPct = mouseY / height - 0.5;

    x.set(xPct);
    y.set(yPct);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  useEffect(() => {
    const interval = setInterval(() => {
      setRoleIndex((prev) => (prev + 1) % heroData.roles.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  // Floating Element Component
  const FloatingElement = ({ children, xOffset, yOffset, delay, depth = 1 }) => {
    return (
      <motion.div
        style={{
          position: 'absolute',
          translateX: useTransform(mouseXSpring, [-0.5, 0.5], [-20 * depth, 20 * depth]),
          translateY: useTransform(mouseYSpring, [-0.5, 0.5], [-20 * depth, 20 * depth]),
          top: `calc(50% + ${yOffset}px)`,
          left: `calc(50% + ${xOffset}px)`,
          zIndex: 0,
          color: 'var(--text-secondary)',
          fontSize: '2rem',
          opacity: 0.2
        }}
        animate={{
          y: [0, -15, 0],
          rotate: [0, 5, -5, 0],
          opacity: [0.2, 0.4, 0.2]
        }}
        transition={{
          duration: 6,
          delay: delay,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      >
        {children}
      </motion.div>
    )
  }

  return (
    <section
      id="home"
      ref={ref}
      className="section"
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        textAlign: 'center',
        paddingTop: '80px',
        position: 'relative',
        overflow: 'hidden',
        perspective: '1000px'
      }}
    >
      {/* Animated Background Blobs */}
      <motion.div
        style={{
          position: 'absolute', top: 0, left: 0, width: '100%', height: '100%',
          zIndex: -1,
          translateX: useTransform(mouseXSpring, [-0.5, 0.5], [-30, 30]),
          translateY: useTransform(mouseYSpring, [-0.5, 0.5], [-30, 30]),
        }}
      >
        <motion.div
          animate={{ x: [0, 100, 0], y: [0, -50, 0], scale: [1, 1.2, 1] }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
          style={{
            position: 'absolute',
            top: '20%',
            left: '20%',
            width: '300px',
            height: '300px',
            background: 'var(--accent-glow)',
            borderRadius: '50%',
            filter: 'blur(80px)',
            opacity: 0.5
          }}
        />
        <motion.div
          animate={{ x: [0, -100, 0], y: [0, 50, 0], scale: [1, 1.5, 1] }}
          transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
          style={{
            position: 'absolute',
            top: '50%',
            right: '20%',
            width: '400px',
            height: '400px',
            background: 'rgba(168, 85, 247, 0.2)', // Purple tint
            borderRadius: '50%',
            filter: 'blur(100px)',
            opacity: 0.5
          }}
        />
      </motion.div>

      {/* Floating 3D Elements */}
      <div style={{ position: 'absolute', width: '100%', height: '100%', pointerEvents: 'none', perspective: '500px' }}>
        {/* Dev Icons */}
        <FloatingElement xOffset={-350} yOffset={-150} delay={0} depth={2}>
          <FaCode />
        </FloatingElement>
        <FloatingElement xOffset={380} yOffset={100} delay={1} depth={1.5}>
          <FaLaptopCode />
        </FloatingElement>
        <FloatingElement xOffset={-250} yOffset={200} delay={2} depth={1}>
          <span style={{ fontFamily: 'monospace', fontWeight: 'bold' }}>{`</>`}</span>
        </FloatingElement>

        {/* Design Icons */}
        <FloatingElement xOffset={300} yOffset={-200} delay={0.5} depth={2}>
          <FaPaintBrush />
        </FloatingElement>
        <FloatingElement xOffset={-400} yOffset={50} delay={1.5} depth={1.2}>
          <SiAdobeillustrator style={{ fontSize: '1.5rem' }} /> {/* Using text fallback for simplicity if module issues */}
          {/* Fallback to Palette if strict */}
          <FaPalette />
        </FloatingElement>
        <FloatingElement xOffset={200} yOffset={250} delay={2.5} depth={1.8}>
          <div style={{ width: '30px', height: '30px', border: '3px solid currentColor', borderRadius: '50%' }} />
        </FloatingElement>
      </div>

      {/* Main Content - 3D Tilt Container */}
      <motion.div
        className="container"
        style={{
          zIndex: 1,
          rotateX,
          rotateY,
          y: yRange,
          opacity: opacityRange,
          transformStyle: "preserve-3d"
        }}
      >
        <motion.h3
          style={{
            fontSize: '1.5rem',
            color: 'var(--accent-color)',
            fontWeight: '600',
            marginBottom: '1rem',
            textTransform: 'uppercase',
            letterSpacing: '2px',
            transform: "translateZ(30px)"
          }}
        >
          Hello, I am
        </motion.h3>

        <motion.h1
          className="text-gradient"
          style={{
            fontSize: 'clamp(3rem, 8vw, 6rem)',
            fontWeight: '800',
            lineHeight: '1.1',
            marginBottom: '1.5rem',
            transform: "translateZ(60px)"
          }}
        >
          {heroData.name}
        </motion.h1>

        <div style={{
          fontSize: 'clamp(1.5rem, 4vw, 2.5rem)',
          fontWeight: '300',
          color: 'var(--text-secondary)',
          marginBottom: '2rem',
          height: '3rem',
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'center',
          alignItems: 'center',
          gap: '10px',
          transform: "translateZ(40px)"
        }}>
          <span style={{ color: 'var(--text-secondary)', fontWeight: '600' }}>I am a</span>
          <AnimatePresence mode="wait">
            <motion.span
              key={roleIndex}
              initial={{ opacity: 0, y: 20, rotateX: 90 }}
              animate={{ opacity: 1, y: 0, rotateX: 0 }}
              transition={{ duration: 0.5 }}
              style={{ color: 'var(--text-primary)', fontWeight: '600', display: 'inline-block' }}
            >
              {heroData.roles[roleIndex]}
            </motion.span>
          </AnimatePresence>
        </div>

        <motion.p
          style={{
            maxWidth: '600px',
            margin: '0 auto 3rem',
            fontSize: '1.1rem',
            color: 'var(--text-secondary)',
            transform: "translateZ(20px)"
          }}
        >
          {heroData.tagline}
        </motion.p>

        <motion.button
          whileHover={{ scale: 1.05, boxShadow: '0 0 20px var(--accent-glow)' }}
          whileTap={{ scale: 0.95 }}
          onClick={() => document.getElementById('projects').scrollIntoView({ behavior: 'smooth' })}
          style={{
            padding: '1rem 2.5rem',
            fontSize: '1.1rem',
            fontWeight: '600',
            background: 'var(--accent-color)',
            color: '#fff',
            borderRadius: '50px',
            boxShadow: '0 10px 20px -10px var(--accent-color)',
            transform: "translateZ(50px)",
            cursor: 'pointer'
          }}
        >
          View Work
        </motion.button>
      </motion.div>
    </section>
  );
};

export default Hero;
