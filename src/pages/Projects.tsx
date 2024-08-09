import React from 'react';
import ProjectCard from '../components/ProjectCard';

// You might want to move this to a separate types file later
interface Project {
    id: number;
    title: string;
    description: string;
    imageUrl: string;
    technologies: string[];
    githubUrl?: string;
    liveUrl?: string;
}

const Projects: React.FC = () => {
    // This could be moved to a separate data file or fetched from an API
    const projects: Project[] = [
        {
            id: 1,
            title: "E-commerce Website",
            description: "A fully functional e-commerce site built with React and Node.js",
            imageUrl: "/images/ecommerce.jpg",
            technologies: ["React", "Node.js", "Express", "MongoDB"],
            githubUrl: "https://github.com/yourusername/ecommerce-project",
            liveUrl: "https://your-ecommerce-site.com"
        },
        {
            id: 2,
            title: "Weather App",
            description: "A weather application using OpenWeatherMap API",
            imageUrl: "/images/weather-app.jpg",
            technologies: ["React", "API integration", "CSS Modules"],
            githubUrl: "https://github.com/yourusername/weather-app"
        },
        // Add more projects as needed
    ];

    return (
        <div className="projects-container">
            <h1>My Projects</h1>
            <div className="projects-grid">
                {projects.map((project) => (
                    <ProjectCard
                        key={project.id}
                        title={project.title}
                        description={project.description}
                        imageUrl={project.imageUrl}
                    />
                ))}
            </div>
        </div>
    );
};

export default Projects;