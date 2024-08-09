import React from 'react';
import ExperienceCard from '../components/ExperienceCard';
import GELogo from '../assets/GE-logo.png';
import VanguardLogo from '../assets/Vanguard-logo.png';
import DensityLogo from '../assets/Density-logo.png';
import GATechLogo from '../assets/GATech-logo.png';
import SyracuseLogo from '../assets/Syracuse-logo.png';
import PursuitLogo from '../assets/Pursuit-logo.png';

// TODO: this could be modeled much better.
interface Experience {
    id: number;
    companyLogo: string;
    companyName: string;
    jobTitle: string;
    accomplishments: string[];
    technologies: string[];
    startDate: string;
    endDate: string;
}

const Experience: React.FC = ({
}) => {
    const professionalExperiences: Experience[] = [
        {
            id: 3,
            companyLogo: DensityLogo,
            companyName: "Density",
            jobTitle: "Sr Software Engineer",
            accomplishments: [
                "Refactored main metadata service api to increase performance 10 fold.",
                "Implemented and oversaw scaling efforts to support 5x increase in storage.",
                "Optimized database schema and infrastructure to cut RDS hosting costs by 40%.",
                "Introduced multiple first class product features including metadata tagging and third party integrations.",
                "Built data pipelines using Kafka to ingest and transform over 1 billion sensor events per day.",
                "Contributed small features and bug fixes for client ui.",
                "Led multiple projects lasting several quarters across different functional groups.",
                "Mentored junior team mates."
            ],
            technologies: ["Python", "Django", "FastAPI", "Go", "Postgres", "ArangoDB", "Redis", "Kafka", "TypeScript", "React"],
            startDate: "March 2021",
            endDate: "Present"
        },
        {
            id: 2,
            companyLogo: VanguardLogo,
            companyName: "Vanguard",
            jobTitle: "Machine Learning Engineer",
            accomplishments: [
                "Built multiple APIs enabling marketing and trading teams to leverage machine learning models.",
                "Created system performance dashboards for real time monitoring and troubleshooting.",
                "Mentored junior team mates."
            ],
            technologies: ["Python", "Java", "ECS", "SageMaker", "Postgres"],
            startDate: "June 2019",
            endDate: "March 2021"
        },
        {
            id: 1,
            companyLogo: GELogo,
            companyName: "GE",
            jobTitle: "Software Engineer - Digital Technology Leadership Program",
            accomplishments: [
                "",
                "Added on-demand analytics workload orchestration and scheduling service for GE cloud service.",
                "Leadership training at GE's Crotonville Leadership Institute."
            ],
            technologies: ["C#", "Python", "Apache Airflow", "Postgres", "PL/pgSQL", "Tableau"],
            startDate: "July 2017",
            endDate: "June 2019"
        },
        // Add more projects as needed
    ];

    const teachingExperiences: Experience[] = [
        {
            id: 3,
            companyLogo: PursuitLogo,
            companyName: "Pursuit",
            jobTitle: "Mentor Volunteer",
            accomplishments: [
                "Pursuit is a four-year intensive program, which trains adults from underrepresented backgrounds with the most need and potential to get their first tech jobs, advance in their careers, and become the next generation of leaders in tech.",
                "Coach Pursuit fellows in prepping for technical interviews",
            ],
            technologies: ["JavaScript", "Node"],
            startDate: "August 2024",
            endDate: "Present"
        },
        {
            id: 2,
            companyLogo: GATechLogo,
            companyName: "Georgia Institute of Technology",
            jobTitle: "Instructional Associate, CS-7280 Network Science",
            accomplishments: [
                "Grade homeworks and quizes",
                "Devise new homework and quiz questions",
                "Hold weekly office hours to discuss course content and help students with materials",
                "Cover materials such a basic network structures, network dynamics, communities, pandemics, and learning on graphs."
            ],
            technologies: ["Python", "NetworkX"],
            startDate: "January 2023",
            endDate: "Present"
        },
        {
            id: 1,
            companyLogo: SyracuseLogo,
            companyName: "Syracuse University",
            jobTitle: "Teaching Assistant, CS-351 Data Structures",
            accomplishments: [
                "Grade homeworks and quizes",
                "Devise new homework and quiz questions",
                "Hold weekly office hours to discuss course content and help students with materials",
                "Cover materials such as LinkedList, Hashing, Trees, Stacks, Queues, Heaps, and Graphs"
            ],
            technologies: ["Java"],
            startDate: "January 2016",
            endDate: "May 2016"
        },
    ];

    const education: Experience[] = [
        {
            id: 2,
            companyLogo: GATechLogo,
            companyName: "Georgia Institute of Technology",
            jobTitle: "M.S. Computer Science",
            accomplishments: [],
            technologies: [],
            startDate: "Fall 2020",
            endDate: "Spring 2023"
        },
        {
            id: 1,
            companyLogo: SyracuseLogo,
            companyName: "Syracuse University",
            jobTitle: "B.S. Computer Science",
            accomplishments: [],
            technologies: [],
            startDate: "Fall 2013",
            endDate: "Spring 2017"
        },
    ]

    return (
        <div className="experiences-container">
            <h2>Professional Experience</h2>
            <div className="experiences-grid">
                {professionalExperiences.map((experience) => (
                    <ExperienceCard
                        key={experience.id}
                        companyLogo={experience.companyLogo}
                        companyName={experience.companyName}
                        jobTitle={experience.jobTitle}
                        accomplishments={experience.accomplishments}
                        technologies={experience.technologies}
                        startDate={experience.startDate}
                        endDate={experience.endDate}
                    />
                ))}
            </div>
            <h2>Teaching and Mentoring Experience</h2>
            <div className="experiences-grid">
                {teachingExperiences.map((experience) => (
                    <ExperienceCard
                        key={experience.id}
                        companyLogo={experience.companyLogo}
                        companyName={experience.companyName}
                        jobTitle={experience.jobTitle}
                        accomplishments={experience.accomplishments}
                        technologies={experience.technologies}
                        startDate={experience.startDate}
                        endDate={experience.endDate}
                    />
                ))}
            </div>
            <h2>Education</h2>
            <div className="experiences-grid">
                {education.map((edu) => (
                    <ExperienceCard
                        key={edu.id}
                        companyLogo={edu.companyLogo}
                        companyName={edu.companyName}
                        jobTitle={edu.jobTitle}
                        accomplishments={edu.accomplishments}
                        technologies={edu.technologies}
                        startDate={edu.startDate}
                        endDate={edu.endDate}
                    />
                ))}
            </div>
        </div>
    );

};
export default Experience;