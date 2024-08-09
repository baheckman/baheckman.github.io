import React from 'react';
import styles from '../pages/Experience.module.css';

interface ExperienceCardProps {
    companyLogo: string;
    companyName: string;
    jobTitle: string;
    accomplishments: string[];
    technologies: string[];
    startDate: string;
    endDate: string;
}

const ExperienceCard: React.FC<ExperienceCardProps> = ({
    companyLogo,
    companyName,
    jobTitle,
    accomplishments,
    technologies,
    startDate,
    endDate
}) => {
    return (
        <div className={styles.card}>
            <div className={styles.colorBar} style={{ backgroundColor: '#74992e' }}></div>

            <div className={styles.header}>
                <div className={styles.titleContainer}>
                    {/* <h3 className={styles.companyName}>{companyName}</h3> */}
                    <h4 className={styles.jobTitle}>{jobTitle}</h4>
                    <div className={styles.accomplishments}>
                        {accomplishments.map((acc, index) => (
                            <p key={index} className={styles.accomplishments}>{acc}</p>
                        ))}
                    </div>
                </div>
                <img src={companyLogo} alt={`${companyName} logo`} className={styles.logo} />
            </div>

            <div className={styles.technologies}>
                {technologies.map((tech, index) => (
                    <span key={index} className={styles.tech}>{tech}</span>
                ))}
            </div>
            <div className={styles.dates}>
                {startDate} - {endDate}
            </div>

        </div>
    );
};

export default ExperienceCard;