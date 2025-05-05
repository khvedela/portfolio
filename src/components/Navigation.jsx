import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import CV from './cv/Cv.jsx';

export default function Navigation() {
    const outerBorderRef = useRef(null);
    const innerBorderRef = useRef(null);
    const titleRef = useRef(null);
    const navigationRef = useRef(null);
    const [showCv, setShowCv] = useState(false);

    useEffect(() => {
        // Set initial states
        gsap.set([outerBorderRef.current, innerBorderRef.current], {
            borderWidth: 0
        });

        gsap.set(titleRef.current, {
            opacity: 0,
            y: -50
        });

        // Create timeline for coordinated animation
        const tl = gsap.timeline({
            defaults: {
                ease: "power2.inOut"
            }
        });

        tl.to(outerBorderRef.current, {
            borderWidth: 25,
            duration: 0.3
        })
        .to(innerBorderRef.current, {
            borderWidth: 15,
            duration: 0.3
        }, "-=0.7")
        .to(titleRef.current, {
            opacity: 1,
            y: 0,
            duration: 0.3
        }, "-=0.5");
    }, []);

    const handleCvToggle = () => {
        const isMobile = window.innerWidth <= 768;
        if (!showCv) {
            gsap.to(navigationRef.current, {
                width: isMobile ? '0' : 'calc(100vw - 600px)',
                duration: 1.1,
                ease: "power2.inOut"
            });
        } else {
            gsap.to(navigationRef.current, {
                width: '100vw',
                duration: 1.1,
                ease: "power2.inOut"
            });
        }
        setShowCv(!showCv);
    };


    return (
        <div style={{
            display: 'flex',
            overflow: 'visible',
            position: 'fixed',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            pointerEvents: 'none',
            zIndex: 100
        }}>
            <div ref={navigationRef} style={{
                display: 'flex',
                position: 'relative',
                pointerEvents: 'none',
                width: '100vw'
            }}>
                <div ref={outerBorderRef} style={{
                    position: 'absolute',
                    zIndex: 9999,
                    top: 0,
                    left: 0,
                    width: '100%',
                    height: '100%',
                    backgroundColor: 'transparent',
                    border: '25px solid white',
                    boxSizing: 'border-box',
                    pointerEvents: 'none',
                    borderRadius: '50px'
                }}>
                </div>
                <div ref={innerBorderRef} style={{
                    position: 'absolute',
                    zIndex: 9999,
                    top: 0,
                    left: 0,
                    width: '100%',
                    height: '100%',
                    pointerEvents: 'none',
                    backgroundColor: 'transparent',
                    border: '15px solid white',
                    boxSizing: 'border-box',
                    display: 'flex',
                    alignItems: 'flex-start',
                    justifyContent: 'center',
                    gap: '1rem',
                }}>
                    <span ref={titleRef} style={{
                        backgroundColor: 'white',
                        padding: '20px 20px 5px 20px',
                        borderRadius: '0 0 5px 5px',
                        fontFamily: 'Courgette',
                        pointerEvents: 'auto'
                    }}>
                        david.
                    </span>
                    <span ref={titleRef} style={{
                        backgroundColor: 'white',
                        padding: '20px 20px 5px 20px',
                        borderRadius: '0 0 5px 5px',
                        fontFamily: 'Courgette',
                        pointerEvents: 'auto'
                    }}>
                        linkedin.
                    </span>
                    <span
                        onClick={handleCvToggle}
                        style={{
                            backgroundColor: 'white',
                            padding: '20px 20px 5px 20px',
                            borderRadius: '0 0 5px 5px',
                            fontFamily: 'Courgette',
                            cursor: 'pointer',
                            pointerEvents: 'auto'
                        }}
                    >
                        cv.
                    </span>
                </div>
            </div>

            <CV isOpen={showCv} onClose={handleCvToggle} />
        </div>
    );
}