// src/components/cv/CvHeader.jsx
import React from 'react';

export default function CvHeader({ name, title, onClose }) {
    return (
        <div style={{
            padding: '20px',
            borderBottom: '1px solid #eee',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            background: 'white',
            height: '80px'
        }}>
            <div>
                <h2 style={{
                    margin: 0,
                    fontSize: '1.8rem',
                    color: '#333'
                }}>
                    {name}
                </h2>
                <h3 style={{
                    margin: '5px 0 0 0',
                    fontWeight: 'normal',
                    fontSize: '1.2rem',
                    color: '#666'
                }}>
                    {title}
                </h3>
            </div>
            <button
                onClick={onClose}
                style={{
                    padding: '8px 16px',
                    border: 'none',
                    borderRadius: '5px',
                    backgroundColor: '#ff5555',
                    color: 'white',
                    cursor: 'pointer',
                    fontFamily: 'Courgette',
                    fontSize: '1rem',
                    transition: 'background-color 0.3s'
                }}
                onMouseOver={(e) => e.target.style.backgroundColor = '#ff3333'}
                onMouseOut={(e) => e.target.style.backgroundColor = '#ff5555'}
            >
                Close
            </button>
        </div>
    );
}