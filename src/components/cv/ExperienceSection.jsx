// src/components/cv/ExperienceSection.jsx
import React from 'react';
import CvSection from './CvSection';

export default function ExperienceSection({ experiences }) {
    return (
        <CvSection title="Experience">
            {experiences.map((exp, index) => (
                <div key={index} className="experience-item">
                    <h4 style={{
                        margin: '0 0 5px 0',
                        color: '#333',
                        fontSize: '1.2rem'
                    }}>
                        {exp.title}
                    </h4>
                    <div style={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        color: '#666',
                        marginBottom: '10px'
                    }}>
                        <span style={{ fontWeight: 'bold' }}>{exp.company}</span>
                        <span>{exp.period}</span>
                    </div>
                    <p style={{
                        margin: '10px 0',
                        lineHeight: '1.6',
                        color: '#444'
                    }}>
                        {exp.description}
                    </p>
                    {exp.highlights && (
                        <ul style={{
                            marginLeft: '20px',
                            color: '#555',
                            lineHeight: '1.4'
                        }}>
                            {exp.highlights.map((highlight, i) => (
                                <li key={i} style={{ marginBottom: '5px' }}>{highlight}</li>
                            ))}
                        </ul>
                    )}
                </div>
            ))}
        </CvSection>
    );
}