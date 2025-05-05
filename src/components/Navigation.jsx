import React, {useEffect, useRef, useState} from 'react';
import gsap from 'gsap';
import CV from './cv/Cv.jsx';

const ANIMATION_DURATION = 0.8;
const SECONDARY_DURATION = 0.3;

export default function Navigation() {
    const outerBorderRef = useRef(null);
    const innerBorderRef = useRef(null);
    const titleRef1 = useRef(null);
    const titleRef2 = useRef(null);
    const titleRef3 = useRef(null);
    const navigationRef = useRef(null);
    const [showCv, setShowCv] = useState(false);

    useEffect(() => {
        gsap.set([outerBorderRef.current, innerBorderRef.current], {
            borderWidth: 0
        });

        gsap.set([titleRef1.current, titleRef2.current, titleRef3.current], {
            opacity: 0,
            y: -50
        });

        const tl = gsap.timeline({
            defaults: {
                ease: "power2.inOut"
            }
        });

        tl.to(outerBorderRef.current, {
            borderWidth: 25,
            duration: SECONDARY_DURATION
        })
            .to(innerBorderRef.current, {
                borderWidth: 15,
                duration: SECONDARY_DURATION
            }, "-=0.7")
            .to([titleRef1.current, titleRef2.current, titleRef3.current], {
                opacity: 1,
                y: 0,
                duration: SECONDARY_DURATION,
                stagger: 0.1
            }, "-=0.5");
    }, []);

    const handleCvToggle = () => {
        const isMobile = window.innerWidth <= 768;

        if (!showCv) {
            if (isMobile) {
                // titles fade up
                gsap.to(
                    [titleRef1.current, titleRef2.current, titleRef3.current],
                    {
                        autoAlpha: 0,        // opacity→0 + visibility:hidden under the hood
                        y: -50,
                        duration: SECONDARY_DURATION,
                        ease: "power2.inOut",
                        stagger: 0.05,
                    }
                );

                // nav shrinks and hides in one go
                gsap.to(navigationRef.current, {
                    width: "0",
                    autoAlpha: 0,        // both hides and fades
                    duration: ANIMATION_DURATION,
                    ease: "power2.inOut",
                });
            } else {
                gsap.to(navigationRef.current, {
                    width: "calc(100vw - 600px)",
                    duration: ANIMATION_DURATION,
                    ease: "power2.inOut",
                });
            }

        } else {
            if (isMobile) {
                gsap.to(
                    [titleRef1.current, titleRef2.current, titleRef3.current],
                    {
                        autoAlpha: 1,        // opacity→0 + visibility:hidden under the hood
                        duration: SECONDARY_DURATION,
                        ease: "power2.inOut",
                        stagger: 0.05,
                    }
                );
                navigationRef.current.style.visibility = 'visible';
                gsap.to(navigationRef.current, {
                    width: '100vw',
                    autoAlpha: 1,
                    duration: ANIMATION_DURATION,
                    ease: "power2.inOut",
                    onComplete: () => {
                        gsap.to([titleRef1.current, titleRef2.current, titleRef3.current], {
                            opacity: 1,
                            y: 0,
                            duration: SECONDARY_DURATION,
                            stagger: 0.1
                        });
                    }
                });
            } else {
                gsap.to(navigationRef.current, {
                    width: '100vw',
                    duration: ANIMATION_DURATION,
                    ease: "power2.inOut"
                });
            }
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
                    border: '1px solid white',
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
                    border: '5px solid white',
                    boxSizing: 'border-box',
                    display: 'flex',
                    alignItems: 'flex-start',
                    justifyContent: 'center',
                    gap: '1rem',
                }}>
                    <span ref={titleRef1} style={{
                        backgroundColor: 'white',
                        padding: '20px 20px 5px 20px',
                        borderRadius: '0 0 5px 5px',
                        fontFamily: 'Courgette',
                        pointerEvents: 'auto'
                    }}>
                        <a href="https://linkedin.com/in/khvedelidzedavid" style={{
                            textDecoration: 'none',
                            color: 'black',
                        }} target="_blank">LinkedIn</a>
                    </span>
                    <span
                        ref={titleRef2}
                        style={{
                            backgroundColor: 'white',
                            padding: '20px 20px 5px 20px',
                            borderRadius: '0 0 5px 5px',
                            fontFamily: 'Courgette',
                            pointerEvents: 'auto'
                        }}>
                        david.
                    </span>
                    <span
                        ref={titleRef3}
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

            <CV isOpen={showCv} onClose={handleCvToggle}/>
        </div>
    );
}