import React, { useRef } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { ASSET_BASE } from '../Data';
import '../styles/Gallery.css'; // Shared CSS

const ProjectCard3D = ({ project }) => {
    const ref = useRef(null);

    const x = useMotionValue(0);
    const y = useMotionValue(0);

    const mouseXSpring = useSpring(x);
    const mouseYSpring = useSpring(y);

    const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["17.5deg", "-17.5deg"]);
    const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-17.5deg", "17.5deg"]);

    const handleMouseMove = (e) => {
        if (!ref.current) return;
        const rect = ref.current.getBoundingClientRect();

        const width = rect.width;
        const height = rect.height;

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

    return (
        <div className="project-card-3d-wrapper">
            <motion.div
                ref={ref}
                onMouseMove={handleMouseMove}
                onMouseLeave={handleMouseLeave}
                style={{
                    rotateX,
                    rotateY,
                    transformStyle: "preserve-3d",
                }}
                className="project-card-3d"
            >
                <div
                    style={{ transform: "translateZ(75px)", transformStyle: "preserve-3d" }}
                    className="card-image-container"
                >
                    <div
                        className="card-bg-image"
                        style={{ backgroundImage: `url(${ASSET_BASE}${project.image})` }}
                    />
                    <div className="card-overlay" />
                </div>

                <div
                    style={{ transform: "translateZ(50px)" }}
                    className="card-content-wrapper"
                >
                    <div className="card-content">
                        <h3 className="card-title">{project.title}</h3>
                        <p className="card-desc">{project.description}</p>
                        <div className="card-tags">
                            {project.stack.slice(0, 3).map((tech, i) => (
                                <span key={i} className="card-tag">
                                    {tech}
                                </span>
                            ))}
                        </div>
                    </div>
                </div>
            </motion.div>
        </div>
    );
};

export default ProjectCard3D;
