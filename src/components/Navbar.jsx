
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaMoon, FaSun, FaBars, FaTimes } from 'react-icons/fa';
import { useNavigate, useLocation } from 'react-router-dom';
import { navLinks } from '../Data';


const Navbar = ({ theme, toggleTheme }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const navigate = useNavigate();
  const location = useLocation();


  // Add scroll listener for stronger glass effect and active section tracking
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);

      // Active section logic - only on home page
      if (location.pathname === '/') {
        const scrollPosition = window.scrollY + 100;

        for (const link of navLinks) {
          const section = document.getElementById(link.id);
          if (section) {
            const top = section.offsetTop;
            const height = section.offsetHeight;

            if (scrollPosition >= top && scrollPosition < top + height) {
              setActiveSection(link.id);
            }
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [location.pathname]);

  // Update active section when route changes
  useEffect(() => {
    if (location.pathname === '/gallery') {
      setActiveSection('gallery');
    } else if (location.pathname === '/' && !window.location.hash) {
      setActiveSection('home');
    }
  }, [location.pathname]);

  const toggleMenu = () => setIsOpen(!isOpen);

  const handleNavigation = (id) => {
    if (id === 'gallery') {
      navigate('/gallery');
      setIsOpen(false);
      return;
    }

    if (location.pathname !== '/') {
      navigate('/#' + id);
      setIsOpen(false);
    } else {
      scrollToSection(id);
    }
  };

  const scrollToSection = (id) => {
    const element = document.getElementById(id);
    if (element) {
      const offset = 80; // Navbar height
      const bodyRect = document.body.getBoundingClientRect().top;
      const elementRect = element.getBoundingClientRect().top;
      const elementPosition = elementRect - bodyRect;
      const offsetPosition = elementPosition - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
      setIsOpen(false); // Close mobile menu if open
      setActiveSection(id);
    }
  };

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
      style={{
        position: 'fixed',
        top: 0,
        width: '100%',
        zIndex: 1000,
        height: '80px',
        display: 'flex',
        alignItems: 'center',
        padding: '0 20px',
        transition: 'all 0.3s ease'
      }}
      className={scrolled ? 'glass' : ''}
    >
      <div className="container" style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        width: '100%'
      }}>
        {/* Logo */}
        <div style={{ fontSize: '1.8rem', fontWeight: '800', cursor: 'pointer', zIndex: 1001 }} onClick={() => handleNavigation('home')}>
          <span className="text-gradient">
            {theme === 'dark' ? (
              <img src={`${import.meta.env.BASE_URL}LogoDark.png`} alt="Umair" style={{ height: '40px' }} />
            ) : (
              <img src={`${import.meta.env.BASE_URL}Logo.png`} alt="Umair" style={{ height: '40px' }} />
            )}
          </span>
        </div>

        {/* Desktop Menu */}
        <ul className="desktop-menu" style={{ display: 'flex', gap: '2rem', alignItems: 'center' }}>
          {navLinks.map((link) => (
            <li key={link.id}>
              <button
                onClick={() => handleNavigation(link.id)}
                style={{
                  color: activeSection === link.id ? 'var(--text-primary)' : 'var(--text-secondary)',
                  fontWeight: '500',
                  fontSize: '1rem',
                  transition: 'all 0.3s',
                  position: 'relative'
                }}
                className={`nav-link ${activeSection === link.id ? 'active' : ''}`}
              >
                {link.title}
              </button>
            </li>
          ))}

          {/* Gallery Link */}
          <li>
            <button
              onClick={() => handleNavigation('gallery')}
              style={{
                color: activeSection === 'gallery' ? 'var(--text-primary)' : 'var(--text-secondary)',
                fontWeight: '500',
                fontSize: '1rem',
                transition: 'all 0.3s',
                position: 'relative'
              }}
              className={`nav-link ${activeSection === 'gallery' ? 'active' : ''}`}
            >
              Gallery
            </button>
          </li>

          <motion.button
            onClick={toggleTheme}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            style={{
              fontSize: '1.2rem',
              color: 'var(--text-primary)',
              background: 'var(--bg-secondary)',
              padding: '0.5rem',
              borderRadius: '50%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              boxShadow: 'var(--card-shadow)'
            }}
          >
            <AnimatePresence mode="wait">
              <motion.div
                key={theme}
                initial={{ y: -20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: 20, opacity: 0 }}
                transition={{ duration: 0.2 }}
              >
                {theme === 'light' ? <FaMoon /> : <FaSun />}
              </motion.div>
            </AnimatePresence>
          </motion.button>
        </ul>

        {/* Mobile Toggle */}
        <div className="mobile-toggle" style={{ display: 'none', gap: '1rem', alignItems: 'center', zIndex: 1001 }}>
          <button onClick={toggleTheme} style={{ fontSize: '1.2rem', color: 'var(--text-primary)' }}>
            {theme === 'light' ? <FaMoon /> : <FaSun />}
          </button>
          <button onClick={toggleMenu} style={{ fontSize: '1.5rem', color: 'var(--text-primary)' }}>
            {isOpen ? <FaTimes /> : <FaBars />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, x: '100%' }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            style={{
              position: 'fixed',
              top: 0,
              right: 0,
              width: '100%',
              height: '100vh',
              background: 'var(--bg-primary)',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              alignItems: 'center',
              zIndex: 1000
            }}
          >
            <ul style={{ display: 'flex', flexDirection: 'column', gap: '2rem', alignItems: 'center' }}>
              {navLinks.map((link) => (
                <li key={link.id}>
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => handleNavigation(link.id)}
                    style={{
                      fontSize: '2rem',
                      fontWeight: '700',
                      color: activeSection === link.id ? 'var(--accent-color)' : 'var(--text-primary)'
                    }}
                  >
                    {link.title}
                  </motion.button>
                </li>
              ))}

              {/* Gallery Mobile Link */}
              <li>
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => handleNavigation('gallery')}
                  style={{
                    fontSize: '2rem',
                    fontWeight: '700',
                    color: activeSection === 'gallery' ? 'var(--accent-color)' : 'var(--text-primary)'
                  }}
                >
                  Gallery
                </motion.button>
              </li>
            </ul>
          </motion.div>
        )}
      </AnimatePresence>

      <style>{`
        .nav-link:hover {
          color: var(--text-primary) !important;
        }
        .nav-link::after {
          content: '';
          position: absolute;
          left: 0;
          bottom: -5px;
          width: 0;
          height: 2px;
          background: var(--accent-color);
          transition: width 0.3s ease;
        }
        .nav-link:hover::after,
        .nav-link.active::after {
          width: 100%;
        }

        @media (max-width: 768px) {
          .desktop-menu {
            display: none !important;
          }
          .mobile-toggle {
            display: flex !important;
          }
        }
      `}</style>
    </motion.nav>
  );
};

export default Navbar;
