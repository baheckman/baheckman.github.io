import React from 'react';
import styles from './Projects.module.css';


interface ProjectCardProps {
    title: string;
    description: string;
    imageUrl: string;
    technologies?: string[];
    githubUrl?: string;
    liveUrl?: string;
}

const ProjectCard: React.FC<ProjectCardProps> = ({
    title,
    description,
    imageUrl,
    technologies,
    githubUrl,
    liveUrl
}) => {
    return (
        <div className="project-card">
            <img src={imageUrl} alt={title} />
            <h3>{title}</h3>
            <p>{description}</p>
            {technologies && (
                <div className="technologies">
                    {technologies.map((tech, index) => (
                        <span key={index} className="tech-tag">{tech}</span>
                    ))}
                </div>
            )}
            <div className="project-links">
                {githubUrl && (
                    <a href={githubUrl} target="_blank" rel="noopener noreferrer">GitHub</a>
                )}
                {liveUrl && (
                    <a href={liveUrl} target="_blank" rel="noopener noreferrer">Live Demo</a>
                )}
            </div>
        </div>
    );
};

export default ProjectCard;