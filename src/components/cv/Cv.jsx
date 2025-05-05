// src/components/cv/CV.jsx
import React, {useEffect, useRef} from 'react';
import CvHeader from './CvHeader';
import CvSection from './CvSection';
import SkillsSection from './SkillsSection';
import ExperienceSection from './ExperienceSection';
import EducationSection from './EducationSection';
import { cvData } from './cvData';
import gsap from 'gsap';

export default function CV({ isOpen, onClose }) {
    const containerRef = useRef(null);

    useEffect(() => {
        if (containerRef.current) {
            gsap.to(containerRef.current, {
                width: isOpen ? '600px' : '0',
                duration: 1.1,
                ease: "power2.inOut"
            });
        }
    }, [isOpen]);

    return (
        <div
            ref={containerRef}
            className="cv-container"
            style={{
                position: 'fixed',
                right: 0,
                top: 0,
                height: '100vh',
                width: '0',
                backgroundColor: 'white',
                pointerEvents: 'auto',
                overflow: 'hidden',
                fontFamily: 'arial, sans-serif'

            }}
        >
            <CvHeader name={cvData.name} title={cvData.title} onClose={onClose} />

            <div className="cv-content"
                 style={{
                     padding: '20px',
                     overflowY: 'auto',
                     height: 'calc(100% - 80px)',
                     pointerEvents: 'auto'
                 }}
            >
                <CvSection title="Objective">
                    <p style={{ lineHeight: '1.6', color: '#444' }}>{cvData.objective}</p>
                </CvSection>

                <ExperienceSection experiences={cvData.experience} />
                <EducationSection education={cvData.education} />
                <SkillsSection skills={cvData.skills} />

                <CvSection title="Languages">
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px' }}>
                        {cvData.languages.map((lang, index) => (
                            <span key={index} style={{
                                background: '#f0f0f0',
                                padding: '5px 10px',
                                borderRadius: '15px',
                                fontSize: '0.9rem'
                            }}>
                                {lang.language} ({lang.level})
                            </span>
                        ))}
                    </div>
                </CvSection>

                <CvSection title="Contact">
                    <div style={{ lineHeight: '1.6', color: '#444' }}>
                        <p>{cvData.contact.phone}</p>
                        <p>{cvData.contact.email}</p>
                        <p>{cvData.contact.website}</p>
                        <p>{cvData.contact.location}</p>
                    </div>
                </CvSection>

                <CvSection title="Interests">
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px' }}>
                        {cvData.interests.map((interest, index) => (
                            <span key={index} style={{
                                background: '#f0f0f0',
                                padding: '5px 10px',
                                borderRadius: '15px',
                                fontSize: '0.9rem'
                            }}>
                                {interest}
                            </span>
                        ))}
                    </div>
                </CvSection>
            </div>
        </div>
    );
}