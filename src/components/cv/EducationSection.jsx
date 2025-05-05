// src/components/cv/EducationSection.jsx
import React from 'react';
import CvSection from './CvSection';

export default function EducationSection({ education }) {
    return (
        <CvSection title="Education">
            {education.map((edu, index) => (
                <div key={index} className="education-item">
                    <h4 style={{
                        margin: '0 0 5px 0',
                        color: '#333',
                        fontSize: '1.2rem'
                    }}>
                        {edu.degree}
                    </h4>
                    <div style={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        color: '#666',
                        marginBottom: '10px'
                    }}>
                        <span style={{ fontWeight: 'bold' }}>{edu.institution}</span>
                        <span>{edu.year}</span>
                    </div>
                    {edu.details && (
                        <p style={{
                            margin: '10px 0',
                            color: '#444',
                            lineHeight: '1.4'
                        }}>
                            {edu.details}
                        </p>
                    )}
                </div>
            ))}
        </CvSection>
    );
}