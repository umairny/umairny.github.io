import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FaEnvelope, FaMapMarkerAlt, FaGithub, FaLinkedin, FaPaperPlane } from 'react-icons/fa';
import { contactData, heroData } from '../Data';

const Contact = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        message: ''
    });
    const [status, setStatus] = useState('');

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setStatus('sending');

        try {
            const response = await fetch("https://formspree.io/f/xeerepqk", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    ...formData,
                    _subject: `New Portfolio Message from ${formData.name}`
                })
            });

            if (response.ok) {
                setStatus('success');
                setFormData({ name: '', email: '', message: '' });
                setTimeout(() => setStatus(''), 5000);
            } else {
                setStatus('error');
            }
        } catch (error) {
            setStatus('error');
        }
    };

    return (
        <>
            <section id="contact" className="section" style={{ background: 'var(--bg-secondary)' }}>
                <div className="container">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        style={{ textAlign: 'center', maxWidth: '1000px', margin: '0 auto' }}
                    >
                        <h2 className="heading">Get In Touch</h2>
                        <p style={{ fontSize: '1.2rem', color: 'var(--text-secondary)', marginBottom: '3.5rem' }}>
                            Whether you have a question, a project in mind, or just want to say hi, feel free to reach out!
                        </p>

                        <div className="contact-layout">
                            {/* Contact Info Side */}
                            <div className="contact-info">
                                <motion.a
                                    href={`mailto:${contactData.email}`}
                                    className="contact-card-mini"
                                    whileHover={{ scale: 1.02 }}
                                >
                                    <div className="icon-wrapper">
                                        <FaEnvelope className="icon" />
                                    </div>
                                    <div className="info-content">
                                        <h3>Email</h3>
                                        <p>{contactData.email}</p>
                                    </div>
                                </motion.a>

                                <motion.div
                                    className="contact-card-mini"
                                    whileHover={{ scale: 1.02 }}
                                >
                                    <div className="icon-wrapper">
                                        <FaMapMarkerAlt className="icon" />
                                    </div>
                                    <div className="info-content">
                                        <h3>Location</h3>
                                        <p>{contactData.location}</p>
                                    </div>
                                </motion.div>

                                <div className="social-links-container">
                                    <h3>Connect With Me</h3>
                                    <div className="social-icons">
                                        {contactData.social.map((social) => (
                                            <a key={social.name} href={social.url} target="_blank" rel="noopener noreferrer"
                                                className="social-icon"
                                            >
                                                {social.name === 'Github' && <FaGithub />}
                                                {social.name === 'LinkedIn' && <FaLinkedin />}
                                            </a>
                                        ))}
                                    </div>
                                </div>
                            </div>

                            {/* Contact Form Side */}
                            <div className="contact-form-wrapper">
                                <form onSubmit={handleSubmit} className="contact-form">
                                    <div className="form-group">
                                        <input
                                            type="text"
                                            name="name"
                                            placeholder="Your Name"
                                            value={formData.name}
                                            onChange={handleChange}
                                            required
                                        />
                                    </div>
                                    <div className="form-group">
                                        <input
                                            type="email"
                                            name="email"
                                            placeholder="Your Email"
                                            value={formData.email}
                                            onChange={handleChange}
                                            required
                                        />
                                    </div>
                                    <div className="form-group">
                                        <textarea
                                            name="message"
                                            placeholder="Your Message"
                                            rows="5"
                                            value={formData.message}
                                            onChange={handleChange}
                                            required
                                        ></textarea>
                                    </div>
                                    <button
                                        type="submit"
                                        className="submit-btn"
                                        disabled={status === 'sending'}
                                    >
                                        {status === 'sending' ? (
                                            'Sending...'
                                        ) : (
                                            <>
                                                Send Message <FaPaperPlane className="btn-icon" />
                                            </>
                                        )}
                                    </button>
                                    {status === 'success' && (
                                        <p className="status-msg success">Message sent successfully!</p>
                                    )}
                                    {status === 'error' && (
                                        <p className="status-msg error">Oops! Something went wrong.</p>
                                    )}
                                </form>
                            </div>
                        </div>
                    </motion.div>
                </div>

                <style>{`
        .contact-layout {
          display: grid;
          grid-template-columns: 1fr 1.5fr;
          gap: 3rem;
          text-align: left;
        }

        @media (max-width: 850px) {
          .contact-layout {
            grid-template-columns: 1fr;
          }
        }

        .contact-info {
          display: flex;
          flex-direction: column;
          gap: 1.5rem;
        }

        .contact-card-mini {
          background: var(--card-bg);
          padding: 1.5rem;
          border-radius: 1rem;
          border: 1px solid var(--border-color);
          display: flex;
          align-items: center;
          gap: 1.5rem;
          transition: all 0.3s;
          text-decoration: none;
        }

        .icon-wrapper {
          width: 50px;
          height: 50px;
          border-radius: 12px;
          background: rgba(79, 70, 229, 0.1);
          display: flex;
          align-items: center;
          justify-content: center;
        }
        
        [data-theme='dark'] .icon-wrapper {
           background: rgba(56, 189, 248, 0.1);
        }

        .contact-card-mini .icon {
          font-size: 1.5rem;
          color: var(--accent-color);
        }

        .info-content h3 {
          font-size: 0.9rem;
          text-transform: uppercase;
          letter-spacing: 1px;
          color: var(--text-secondary);
          margin-bottom: 0.2rem;
        }

        .info-content p {
          font-size: 1.1rem;
          font-weight: 500;
          color: var(--text-primary);
        }

        .social-links-container {
          margin-top: 1rem;
          padding: 1.5rem;
        }

        .social-links-container h3 {
          font-size: 1.1rem;
          margin-bottom: 1.5rem;
          color: var(--text-primary);
        }

        .social-icons {
          display: flex;
          gap: 1.5rem;
        }

        .social-icon {
          font-size: 1.8rem;
          color: var(--text-secondary);
          transition: all 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275);
        }

        .social-icon:hover {
          color: var(--accent-color);
          transform: translateY(-5px);
        }

        /* Form Styles */
        .contact-form-wrapper {
          background: var(--card-bg);
          padding: 2.5rem;
          border-radius: 1.5rem;
          border: 1px solid var(--border-color);
          box-shadow: 0 10px 30px -10px rgba(0,0,0,0.1);
        }

        .contact-form {
          display: flex;
          flex-direction: column;
          gap: 1.5rem;
        }

        .form-group input, 
        .form-group textarea {
          width: 100%;
          padding: 1rem 1.2rem;
          border-radius: 0.8rem;
          border: 2px solid var(--border-color);
          background: var(--bg-primary);
          color: var(--text-primary);
          font-family: inherit;
          font-size: 1rem;
          transition: all 0.3s;
          outline: none;
        }

        .form-group input:focus, 
        .form-group textarea:focus {
          border-color: var(--accent-color);
          box-shadow: 0 0 0 4px var(--accent-glow);
        }

        .submit-btn {
          background: var(--accent-color);
          color: white;
          padding: 1rem 2rem;
          border-radius: 0.8rem;
          font-weight: 600;
          font-size: 1.1rem;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 0.8rem;
          transition: all 0.3s;
          border: none;
          cursor: pointer;
        }

        .submit-btn:hover {
          transform: translateY(-2px);
          box-shadow: 0 5px 15px var(--accent-glow);
          filter: brightness(1.1);
        }

        .submit-btn:disabled {
          opacity: 0.7;
          cursor: not-allowed;
        }

        .btn-icon {
          transition: transform 0.3s;
        }

        .submit-btn:hover .btn-icon {
          transform: translateX(3px) translateY(-3px);
        }

        .status-msg {
          margin-top: 1rem;
          text-align: center;
          font-weight: 500;
          padding: 0.8rem;
          border-radius: 0.6rem;
        }

        .status-msg.success {
          background: rgba(34, 197, 94, 0.1);
          color: #22c55e;
        }

        .status-msg.error {
          background: rgba(239, 68, 68, 0.1);
          color: #ef4444;
        }

        @media (max-width: 600px) {
          .contact-form-wrapper {
            padding: 1.5rem;
          }
        }
      `}</style>
            </section>

            <footer style={{ background: 'var(--bg-primary)', padding: '2rem', borderTop: '1px solid var(--border-color)', textAlign: 'center' }}>
                <p style={{ color: 'var(--text-secondary)' }}>
                    &copy; {new Date().getFullYear()} {heroData.name}. All rights reserved.
                </p>
            </footer>
        </>
    );
};

export default Contact;
