import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaGithub, FaExternalLinkAlt, FaYoutube } from 'react-icons/fa';
import { projectsData } from '../Data';
import { useNavigate } from 'react-router-dom';
import ProjectDetailsModal from './ProjectDetailsModal';

const Projects = () => {
    const [filter, setFilter] = useState('all');
    const [selectedProject, setSelectedProject] = useState(null);
    const navigate = useNavigate();


    const filteredProjects = projectsData.filter(project => {
        if (filter === 'all') return true;
        return project.type === filter;
    });

    const categories = [
        { name: 'All', value: 'all' },
        { name: 'Development', value: 'development' },
        { name: 'Design', value: 'design' },
        { name: 'Gallery', value: 'gallery' }
    ];

    // Parent variant for staggering children
    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1
            }
        }
    };

    // Child variant for individual cards
    const cardVariants = {
        hidden: { opacity: 0, scale: 0.9 },
        visible: {
            opacity: 1,
            scale: 1,
            transition: { duration: 0.4 }
        },
        exit: {
            opacity: 0,
            scale: 0.9,
            transition: { duration: 0.3 }
        }
    };

    return (
        <section id="projects" className="section">
            <div className="container">
                <motion.h2
                    className="heading text-gradient"
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                >
                    Selected Works
                </motion.h2>

                {/* Filter Buttons */}
                <div style={{ display: 'flex', justifyContent: 'center', gap: '1rem', marginBottom: '3rem', flexWrap: 'wrap' }}>
                    {categories.map((category) => (
                        <button
                            key={category.value}
                            onClick={() => {
                                if (category.value === 'gallery') {
                                    navigate('/gallery');
                                } else {
                                    setFilter(category.value);
                                }
                            }}
                            style={{
                                padding: '0.8rem 1.5rem',
                                borderRadius: '2rem',
                                background: filter === category.value ? 'var(--accent-color)' : 'var(--bg-secondary)',
                                color: filter === category.value ? '#fff' : 'var(--text-secondary)',
                                border: 'none',
                                cursor: 'pointer',
                                fontWeight: '600',
                                fontSize: '1rem',
                                transition: 'all 0.3s ease',
                                boxShadow: filter === category.value ? '0 5px 15px rgba(0,0,0,0.2)' : 'none'
                            }}
                        >
                            {category.name}
                        </button>
                    ))}
                </div>

                <motion.div
                    className="projects-grid"
                    layout
                >
                    <AnimatePresence mode="popLayout">
                        {filteredProjects.map((project) => (
                            <motion.div
                                key={project.id}
                                layout
                                initial="hidden"
                                animate="visible"
                                exit="exit"
                                variants={cardVariants}
                                className="glass-card"
                                onClick={() => setSelectedProject(project)}
                                whileHover={{
                                    y: -10,
                                    boxShadow: '0 20px 40px -10px rgba(0,0,0,0.3)',
                                    scale: 1.02
                                }}
                                style={{
                                    borderRadius: '1.5rem',
                                    overflow: 'hidden',
                                    display: 'flex',
                                    flexDirection: 'column',
                                    transition: 'box-shadow 0.3s ease',
                                    cursor: 'pointer'
                                }}
                            >
                                <div style={{ height: '220px', overflow: 'hidden', position: 'relative' }}>
                                    {/* Image Overlay Effect */}
                                    <div style={{
                                        width: '100%',
                                        height: '100%',
                                        backgroundImage: `url(${project.image})`,
                                        backgroundSize: 'cover',
                                        backgroundPosition: 'center',
                                        transition: 'transform 0.6s ease'
                                    }} className="card-img" />

                                    {/* Overlay Gradient on Image */}
                                    <div style={{
                                        position: 'absolute',
                                        top: 0,
                                        left: 0,
                                        width: '100%',
                                        height: '100%',
                                        background: 'linear-gradient(to bottom, transparent 50%, rgba(0,0,0,0.6))',
                                        opacity: 0.6
                                    }} />
                                </div>

                                <div style={{ padding: '2rem', flex: 1, display: 'flex', flexDirection: 'column' }}>
                                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
                                        <span style={{
                                            fontSize: '0.75rem',
                                            fontWeight: '700',
                                            color: 'var(--accent-color)',
                                            textTransform: 'uppercase',
                                            letterSpacing: '1.5px',
                                            background: 'var(--bg-shape)',
                                            padding: '0.4rem 0.8rem',
                                            borderRadius: '2rem'
                                        }}>
                                            {project.category}
                                        </span>
                                    </div>

                                    <h3 style={{ fontSize: '1.5rem', marginBottom: '0.8rem', color: 'var(--text-primary)', fontWeight: '700' }}>{project.title}</h3>

                                    <p style={{ color: 'var(--text-secondary)', fontSize: '1rem', marginBottom: '1.5rem', flex: 1, lineHeight: '1.6' }}>
                                        {project.description}
                                    </p>

                                    <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap', marginBottom: '2rem' }}>
                                        {project.stack.map(tech => (
                                            <span key={tech} style={{
                                                fontSize: '0.8rem',
                                                padding: '0.3rem 0.8rem',
                                                borderRadius: '0.5rem',
                                                background: 'var(--bg-secondary)',
                                                color: 'var(--text-secondary)',
                                                border: '1px solid var(--border-color)',
                                                fontWeight: '500'
                                            }}>
                                                {tech}
                                            </span>
                                        ))}
                                    </div>

                                    <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', paddingTop: '1rem', borderTop: '1px solid var(--border-color)' }}>
                                        {project.links.github !== "#" && (
                                            <a href={project.links.github} target="_blank" rel="noopener noreferrer"
                                                style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontWeight: '600', fontSize: '0.95rem' }}
                                                className="card-link">
                                                <FaGithub /> Code
                                            </a>
                                        )}
                                        {project.links.demo !== '#' && (
                                            <a href={project.links.demo} target="_blank" rel="noopener noreferrer"
                                                style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontWeight: '600', fontSize: '0.95rem' }}
                                                className="card-link">
                                                <FaExternalLinkAlt /> Live
                                            </a>
                                        )}
                                        {project.links.youtube !== '#' && (
                                            <a href={project.links.youtube} target="_blank" rel="noopener noreferrer"
                                                style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontWeight: '600', fontSize: '0.95rem' }}
                                                className="card-link">
                                                <FaYoutube /> YouTube
                                            </a>
                                        )}
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </AnimatePresence>
                </motion.div>
            </div>

            <AnimatePresence>
                {selectedProject && (
                    <ProjectDetailsModal
                        project={selectedProject}
                        onClose={() => setSelectedProject(null)}
                    />
                )}
            </AnimatePresence>

            <style>{`
        .projects-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(340px, 1fr));
          gap: 3rem;
          margin-top: 4rem;
        }

        .card-img {
            transition: transform 0.6s ease;
        }

        .glass-card:hover .card-img {
            transform: scale(1.1);
        }

        .card-link {
            color: var(--text-primary);
            transition: color 0.2s;
        }
        .card-link:hover {
            color: var(--accent-color);
        }

        @media (max-width: 768px) {
            .projects-grid {
                grid-template-columns: 1fr;
                gap: 2rem;
            }
        }
      `}</style>
        </section>
    );
};

export default Projects;
