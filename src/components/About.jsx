import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { aboutData } from '../Data';
import { FaRocket, FaCode, FaPaintBrush } from 'react-icons/fa';
import '../styles/About.css';

const About = () => {
    const [filter, setFilter] = useState('all');

    const categories = [
        { name: 'All', value: 'all' },
        { name: 'Dev', value: 'Development' },
        { name: 'Design', value: 'Design' }
    ];

    const filteredSkills = aboutData.skills.flatMap(cat => {
        if (filter === 'all') return cat.items;
        return cat.category === filter ? cat.items : [];
    });

    // Helper to dedupe if "all" creates duplicates (though current data structure separates them well)
    // For now, let's stick to the existing structure but flatten for the grid view if "all" is selected
    const displaySkills = filter === 'all'
        ? [...aboutData.skills[0].items, ...aboutData.skills[1].items]
        : filteredSkills;

    return (
        <section id="about" className="about-section">
            <div className="about-bg-glow" />
            <div className="about-bg-grid" />

            <div className="container about-content">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                >
                    <h2 className="heading">About <span className="text-gradient">Me</span></h2>

                    <div className="bento-grid">
                        {/* Main Bio Card */}
                        <div className="bento-card hero-bio">
                            <div className="journey-title">
                                <FaRocket className="text-gradient" />
                                <span>The Creator</span>
                            </div>
                            <p className="bio-text">
                                I am a passionate creative who loves what I do. With over a decade of experience as a
                                <span> Graphic Designer</span>, I have honed my eye for aesthetics.
                                Recently, I discovered a new passion for <span>Computer Science</span>, expanding my skillset to include
                                <span> Full Stack Web Development</span>.
                            </p>
                            <p className="bio-text">
                                I now blend my design background with technical expertise to build beautiful, functional web applications.
                            </p>
                        </div>

                        {/* Journey/Philosophy Card */}
                        <div className="bento-card journey-card">
                            <h3 className="journey-title">
                                <FaCode /> My Journey
                            </h3>
                            <p className="journey-desc">
                                From pixel-perfect designs in Photoshop to robust backends in Django.
                                My transition from design to development allows me to bridge the gap between
                                <span> UI/UX </span> and <span> Engineering</span>.
                            </p>
                        </div>

                        {/* Design Philosophy Card */}
                        <div className="bento-card">
                            <h3 className="journey-title">
                                <FaPaintBrush /> Design Philosophy
                            </h3>
                            <p className="journey-desc">
                                "Design is not just what it looks like and feels like. Design is how it works."
                                I strive for simplicity, clarity, and impactful user experiences.
                            </p>
                        </div>

                        {/* Tech Stack Section */}
                        <div className="skills-container">
                            <div className="skills-header">
                                <h3 className="skills-title">Tech Arsenal</h3>
                                <div className="skill-tabs">
                                    {categories.map(cat => (
                                        <button
                                            key={cat.value}
                                            onClick={() => setFilter(cat.value)}
                                            className={`tab-btn ${filter === cat.value ? 'active' : ''}`}
                                        >
                                            {cat.name}
                                        </button>
                                    ))}
                                </div>
                            </div>

                            <motion.div layout className="tech-grid">
                                <AnimatePresence mode="popLayout">
                                    {displaySkills.map((skill, idx) => (
                                        <motion.div
                                            layout
                                            key={skill.name + idx} // Unique key
                                            initial={{ opacity: 0, scale: 0.8 }}
                                            animate={{ opacity: 1, scale: 1 }}
                                            exit={{ opacity: 0, scale: 0.8 }}
                                            transition={{ duration: 0.3 }}
                                            className="tech-card"
                                        >
                                            {typeof skill.icon === 'string' ? (
                                                <img src={skill.icon} alt={skill.name} className="tech-icon" style={{ width: '40px', height: '40px' }} />
                                            ) : (
                                                <skill.icon className="tech-icon" style={{ color: skill.color }} />
                                            )}
                                            <span className="tech-name">{skill.name}</span>
                                        </motion.div>
                                    ))}
                                </AnimatePresence>
                            </motion.div>
                        </div>
                    </div>
                </motion.div>
            </div>
        </section>
    );
};

export default About;
