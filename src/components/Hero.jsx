import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useScroll, useTransform, useSpring, useMotionValue } from 'framer-motion';
import { FaCode, FaPaintBrush, FaReact, FaLaptopCode, FaPalette, FaArrowRight } from 'react-icons/fa';
import { SiAdobephotoshop, SiAdobeillustrator } from 'react-icons/si';
import { heroData } from '../Data';




// Typewriter Effect Component
const TypewriterText = ({ text }) => {
  const characters = Array.from(text);

  return (
    <motion.span
      key={text} // Force re-render on text change
      initial="hidden"
      animate="visible"
      exit={{ opacity: 0, transition: { duration: 0.2 } }}
      style={{ display: 'inline-flex', alignItems: 'center' }}
    >
      {characters.map((char, index) => (
        <motion.span
          key={`${text}-${index}`}
          variants={{
            hidden: { opacity: 0, display: 'none' },
            visible: { opacity: 1, display: 'inline' }
          }}
          transition={{ duration: 0, delay: index * 0.05 }}
          style={{ whiteSpace: 'pre' }}
        >
          {char}
        </motion.span>
      ))}
      <motion.span
        initial={{ opacity: 0 }}
        animate={{ opacity: [0, 1, 0] }}
        transition={{ duration: 0.8, repeat: Infinity, ease: 'linear' }}
        style={{
          display: 'inline-block',
          width: '2px',
          height: '1.2em',
          background: 'var(--accent-color)',
          marginLeft: '4px',
          verticalAlign: 'middle'
        }}
      />
    </motion.span>
  );
}; // End TypewriterText

// Game Style Text Component
const GameText = ({ text, className, style, delay = 0, isHeading = false }) => {
  const items = isHeading ? Array.from(text) : text.split(" ");

  const container = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: isHeading ? 0.05 : 0.02, delayChildren: delay }
    }
  };

  const child = {
    hidden: isHeading
      ? { opacity: 0, scale: 0.5, y: 20 }
      : { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      scale: 1,
      y: 0,
      transition: { type: "spring", damping: 10, stiffness: 100 }
    }
  };

  return (
    <motion.div
      className={className}
      style={{ display: 'inline-block', ...style }}
      variants={container}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
    >
      {items.map((item, index) => (
        <motion.span
          variants={child}
          key={index}
          style={{
            display: "inline-block",
            marginRight: isHeading ? "0.02em" : "0.25em",
            whiteSpace: "pre"
          }}
          whileHover={isHeading ? {
            scale: 1.2,
            rotate: Math.random() * 10 - 5,
            color: 'var(--accent-color)'
          } : {}}
        >
          {item}
        </motion.span>
      ))}
    </motion.div>
  );
};

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
          y: yRange,
          opacity: opacityRange
        }}
      >
        <h3 style={{ marginBottom: '1rem' }}>
          <GameText
            text="Hello, I am"
            isHeading={true}
            delay={0.2}
            style={{
              fontSize: '1.5rem',
              color: 'var(--accent-color)',
              fontWeight: '600',
              textTransform: 'uppercase',
              letterSpacing: '2px',
            }}
          />
        </h3>

        <h1 style={{ marginBottom: '1.5rem' }}>
          <GameText
            text={heroData.name}
            isHeading={true}
            delay={0.5}
            className="text-gradient"
            style={{
              fontSize: 'clamp(2rem, 8vw, 6rem)',
              fontWeight: '800',
              lineHeight: '1.1',
            }}
          />
        </h1>

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
          <GameText text="I am a" isHeading={true} delay={1.0} style={{ color: 'var(--text-secondary)', fontWeight: '600' }} />
          <AnimatePresence mode="wait">
            <TypewriterText text={heroData.roles[roleIndex]} />
          </AnimatePresence>
        </div>

        <div style={{ maxWidth: '600px', margin: '0 auto 3rem' }}>
          <GameText
            text={heroData.tagline}
            delay={1.2}
            style={{
              fontSize: '1.1rem',
              color: 'var(--text-secondary)',
            }}
          />
        </div>

        <motion.button
          initial="initial"
          whileHover="hover"
          whileTap={{ scale: 0.95 }}
          onClick={() => document.getElementById('projects').scrollIntoView({ behavior: 'smooth' })}
          style={{
            position: 'relative',
            padding: '1rem 3rem',
            fontSize: '1.2rem',
            fontWeight: '600',
            background: 'transparent',
            color: 'var(--text-primary)', // Default text color
            border: '2px solid var(--accent-color)',
            borderRadius: '50px',
            cursor: 'pointer',
            display: 'inline-flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '12px',
            overflow: 'hidden',
            zIndex: 1,
            boxShadow: '0 4px 15px rgba(0,0,0,0.05)'
          }}
        >
          {/* Animated Background Fill */}
          <motion.div
            variants={{
              initial: { scaleX: 0, originX: 0 },
              hover: { scaleX: 1 }
            }}
            transition={{ type: 'tween', ease: 'easeInOut', duration: 0.3 }}
            style={{
              position: 'absolute',
              top: 0, left: 0, right: 0, bottom: 0,
              background: 'var(--accent-color)',
              zIndex: -1,
            }}
          />

          {/* Button Text */}
          <motion.span
            variants={{
              initial: { color: 'var(--accent-color)' }, // Matches border initally
              hover: { color: '#ffffff' }
            }}
            style={{ zIndex: 1, display: 'inline-block' }}
          >
            View Work
          </motion.span>

          {/* Arrow Icon */}
          <motion.span
            variants={{
              initial: { x: 0, color: 'var(--accent-color)' },
              hover: { x: 5, color: '#ffffff' }
            }}
            style={{ zIndex: 1, display: 'flex', alignItems: 'center' }}
          >
            <FaArrowRight />
          </motion.span>
        </motion.button>
      </motion.div>
    </section>
  );
};

export default Hero;
