export default function CvSection({ title, children }) {
    return (
        <section className="cv-section" style={{ marginBottom: '2rem' }}>
            <h3 style={{
                borderBottom: '2px solid #f0f0f0',
                paddingBottom: '0.5rem',
                marginBottom: '1rem'
            }}>
                {title}
            </h3>
            {children}
        </section>
    );
}