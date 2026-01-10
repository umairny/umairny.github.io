import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { projectsData } from '../Data';
import ProjectCard3D from './ProjectCard3D';
import ProjectDetailsModal from './ProjectDetailsModal';
import '../styles/Gallery.css';

const Gallery = () => {
    const [filter, setFilter] = useState('all');
    const [activeProject, setActiveProject] = useState(null);

    // Filter projects based on type/category logic
    const filteredProjects = projectsData.filter(project => {
        if (filter === 'all') return true;
        const type = project.type ? project.type.toLowerCase() : '';
        if (filter === 'development') return type.includes('development');
        if (filter === 'design') return type.includes('design');
        return true;
    });

    return (
        <div className="gallery-page">
            <div className="gallery-bg-overlay"></div>

            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="gallery-header"
            >
                <h1 className="gallery-title">
                    Premium Gallery
                </h1>
                <p className="gallery-subtitle">
                    Explore a curated collection of my most ambitious design and development work.
                </p>
            </motion.div>

            {/* Filter Controls */}
            <div className="filter-container">
                {['all', 'development', 'design'].map((cat) => (
                    <button
                        key={cat}
                        onClick={() => setFilter(cat)}
                        className={`filter-btn ${filter === cat ? 'active' : ''}`}
                    >
                        {cat.charAt(0).toUpperCase() + cat.slice(1)}
                    </button>
                ))}
            </div>

            {/* Grid View of 3D Cards */}
            <motion.div
                layout
                className="gallery-grid"
            >
                <AnimatePresence mode="popLayout">
                    {filteredProjects.map((project) => (
                        <motion.div
                            layout
                            key={project.id}
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.8 }}
                            transition={{ duration: 0.3 }}
                            onClick={() => setActiveProject(project)}
                        >
                            <ProjectCard3D project={project} />
                        </motion.div>
                    ))}
                </AnimatePresence>
            </motion.div>

            {/* Project Details Modal */}
            <AnimatePresence>
                {activeProject && (
                    <ProjectDetailsModal
                        project={activeProject}
                        onClose={() => setActiveProject(null)}
                    />
                )}
            </AnimatePresence>
        </div>
    );
};

export default Gallery;
