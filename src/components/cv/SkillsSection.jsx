import CvSection from "./CvSection.jsx";

export default function SkillsSection({ skills }) {
    return (
        <CvSection title="Skills">
            {skills.map((skillGroup, index) => (
                <div key={index} className="skill-group" style={{ marginBottom: '1rem' }}>
                    <h4 style={{ marginBottom: '0.5rem' }}>{skillGroup.category}</h4>
                    <div className="skill-items">
                        {skillGroup.items.map((skill, i) => (
                            <span
                                key={i}
                                className="skill-tag"
                                style={{
                                    background: '#f0f0f0',
                                    padding: '5px 10px',
                                    borderRadius: '15px',
                                    margin: '5px',
                                    display: 'inline-block',
                                    fontSize: '0.9rem'
                                }}
                            >
                                {skill}
                            </span>
                        ))}
                    </div>
                </div>
            ))}
        </CvSection>
    );
}