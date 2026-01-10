import React from 'react';
import { motion } from 'framer-motion';
import { FaEnvelope, FaMapMarkerAlt, FaPhone, FaGithub, FaLinkedin } from 'react-icons/fa';
import { contactData } from '../Data';

const Contact = () => {
    return (
        <>
            <section id="contact" className="section" style={{ background: 'var(--bg-secondary)' }}>
                <div className="container">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        style={{ textAlign: 'center', maxWidth: '800px', margin: '0 auto' }}
                    >
                        <h2 className="heading">Get In Touch</h2>
                        <p style={{ fontSize: '1.2rem', color: 'var(--text-secondary)', marginBottom: '3rem' }}>
                            Whether you have a question, a project in mind, or just want to say hi, feel free to reach out!
                        </p>

                        <div className="contact-cards">
                            <a href={`mailto:${contactData.email}`} className="contact-card">
                                <FaEnvelope className="icon" />
                                <h3>Email</h3>
                                <p>{contactData.email}</p>
                            </a>

                            <div className="contact-card">
                                <FaMapMarkerAlt className="icon" />
                                <h3>Location</h3>
                                <p>{contactData.location}</p>
                            </div>

                            <div className="contact-card">
                                <FaPhone className="icon" />
                                <h3>Phone</h3>
                                <p>{contactData.phone}</p>
                            </div>
                        </div>

                        <div style={{ marginTop: '3rem', display: 'flex', justifyContent: 'center', gap: '1.5rem' }}>
                            {contactData.social.map((social) => (
                                <a key={social.name} href={social.url} target="_blank" rel="noopener noreferrer"
                                    style={{ fontSize: '2rem', color: 'var(--text-secondary)', transition: 'color 0.3s' }}
                                    className="social-icon"
                                >
                                    {social.name === 'Github' && <FaGithub />}
                                    {social.name === 'LinkedIn' && <FaLinkedin />}
                                </a>
                            ))}
                        </div>
                    </motion.div>
                </div>

                <style>{`
        .contact-cards {
          display: flex;
          justify-content: center;
          gap: 2rem;
          flex-wrap: wrap;
        }
        
        .contact-card {
          background: var(--card-bg);
          padding: 2rem;
          border-radius: 1rem;
          box-shadow: var(--card-shadow);
          border: 1px solid var(--border-color);
          flex: 1;
          min-width: 250px;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 1rem;
          transition: transform 0.3s;
          cursor: pointer;
        }

        .contact-card:hover {
          transform: translateY(-5px);
        }

        .contact-card .icon {
          font-size: 2rem;
          color: var(--accent-color);
        }

        .contact-card h3 {
           color: var(--text-primary);
        }

        .contact-card p {
           color: var(--text-secondary);
        }

        .social-icon:hover {
            color: var(--accent-color) !important;
        }
      `}</style>
            </section>

            <footer style={{ background: 'var(--bg-primary)', padding: '2rem', borderTop: '1px solid var(--border-color)', textAlign: 'center' }}>
                <p style={{ color: 'var(--text-secondary)' }}>
                    &copy; {new Date().getFullYear()} {contactData.name}. All rights reserved.
                </p>
            </footer>
        </>
    );
};

export default Contact;
