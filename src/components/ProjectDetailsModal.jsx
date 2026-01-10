import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaTimes, FaExternalLinkAlt, FaGithub, FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import '../styles/ProjectDetailsModal.css';

const ProjectDetailsModal = ({ project, onClose }) => {
    const [currentImageIndex, setCurrentImageIndex] = useState(0);

    // Handle case where images array might be missing or empty
    const images = project.images && project.images.length > 0 ? project.images : [project.image];

    const nextImage = () => {
        setCurrentImageIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
    };

    const prevImage = () => {
        setCurrentImageIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
    };

    if (!project) return null;

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="modal-overlay"
            onClick={onClose}
        >
            <motion.div
                initial={{ y: 50, opacity: 0, scale: 0.95 }}
                animate={{ y: 0, opacity: 1, scale: 1 }}
                exit={{ y: 50, opacity: 0, scale: 0.95 }}
                transition={{ type: "spring", duration: 0.5 }}
                className="modal-content"
                onClick={(e) => e.stopPropagation()}
            >
                <button className="modal-close-btn" onClick={onClose}>
                    <FaTimes />
                </button>

                <div className="modal-body">
                    {/* Image Slider */}
                    <div className="modal-gallery">
                        <AnimatePresence mode="wait">
                            <motion.img
                                key={currentImageIndex}
                                src={images[currentImageIndex]}
                                alt={`${project.title} view ${currentImageIndex + 1}`}
                                initial={{ opacity: 0, x: 20 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: -20 }}
                                transition={{ duration: 0.3 }}
                                className="modal-gallery-image"
                            />
                        </AnimatePresence>

                        {images.length > 1 && (
                            <>
                                <button className="slider-btn prev" onClick={prevImage}><FaChevronLeft /></button>
                                <button className="slider-btn next" onClick={nextImage}><FaChevronRight /></button>

                                <div className="slider-dots">
                                    {images.map((_, idx) => (
                                        <div
                                            key={idx}
                                            className={`slider-dot ${idx === currentImageIndex ? 'active' : ''}`}
                                            onClick={() => setCurrentImageIndex(idx)}
                                        />
                                    ))}
                                </div>
                            </>
                        )}
                    </div>

                    {/* Info Section */}
                    <div className="modal-info">
                        <div className="modal-header">
                            <span className="modal-category">{project.category}</span>
                            <h2 className="modal-title">{project.title}</h2>
                        </div>

                        <p className="modal-desc">{project.description}</p>

                        <div className="modal-stack">
                            {project.stack.map((tech, i) => (
                                <span key={i} className="stack-tag">{tech}</span>
                            ))}
                        </div>

                        <div className="modal-actions">
                            {project.links.demo && project.links.demo !== '#' && (
                                <a href={project.links.demo} target="_blank" rel="noopener noreferrer" className="action-btn btn-primary">
                                    View Live <FaExternalLinkAlt />
                                </a>
                            )}
                            {project.links.github && project.links.github !== '#' && (
                                <a href={project.links.github} target="_blank" rel="noopener noreferrer" className="action-btn btn-secondary">
                                    View Code <FaGithub />
                                </a>
                            )}
                        </div>
                    </div>
                </div>
            </motion.div>
        </motion.div>
    );
};

export default ProjectDetailsModal;
