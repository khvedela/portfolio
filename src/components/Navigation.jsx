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
    const titleRefs = [useRef(null), useRef(null), useRef(null)];

    useEffect(() => {
        // Check if all refs are available before proceeding
        if (titleRef1.current && titleRef2.current && titleRef3.current &&
            outerBorderRef.current && innerBorderRef.current) {

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
        }
    }, []);

    const handleCvToggle = () => {
        const isMobile = window.innerWidth <= 768;
        const camera = window.scene?.camera;

        if (!showCv) {
            if (camera) {
                gsap.to(camera.position, {
                    x: -3, // Shift camera slightly to the left
                    duration: ANIMATION_DURATION,
                    ease: "power2.inOut"
                });
            }

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
            if (camera) {
                gsap.to(camera.position, {
                    x: 0, // Return camera to original position
                    duration: ANIMATION_DURATION,
                    ease: "power2.inOut"
                });
            }

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

    const items = [
        {
            ref: titleRefs[0],
            content: <a style={link} href="https://linkedin.com/in/khvedelidzedavid" target="_blank"
                        rel="noopener noreferrer">LinkedIn.</a>,
            style: {},
            onClick: null,
        },
        {
            ref: titleRefs[1],
            content: 'david.',
            style: {},
            onClick: null,
        },
        {
            ref: titleRefs[2],
            content: 'cv.',
            style: {cursor: 'pointer'},
            onClick: handleCvToggle,
        },
    ];

    return (
        <div style={overlayStyle}>
            <div ref={navigationRef} style={navContainerStyle}>
                <div ref={outerBorderRef} style={outerBorderStyle}/>
                <div ref={innerBorderRef} style={innerBorderStyle}>
                    {items.map(({ref, content, style, onClick}, i) => (
                        <span
                            key={i}
                            ref={ref}
                            onClick={onClick}
                            style={{...titleBaseStyle, ...style}}
                        >
              {content}
            </span>
                    ))}
                </div>
            </div>
            <CV isOpen={showCv} onClose={handleCvToggle}/>
        </div>
    );
}

const link = {
    textDecoration: 'none',
    color: 'black',
}

const overlayStyle = {
    display: 'flex',
    overflow: 'visible',
    position: 'fixed',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    pointerEvents: 'none',
    zIndex: 100,
};

const navContainerStyle = {
    display: 'flex',
    position: 'relative',
    pointerEvents: 'none',
    width: '100vw',
};

const baseBorderStyle = {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    backgroundColor: 'transparent',
    boxSizing: 'border-box',
    pointerEvents: 'none',
    zIndex: 9999,
};

const outerBorderStyle = {
    ...baseBorderStyle,
    border: '10px solid white',
    borderRadius: '15px',
};

const innerBorderStyle = {
    ...baseBorderStyle,
    border: '5px solid white',
    display: 'flex',
    alignItems: 'flex-start',
    justifyContent: 'center',
    gap: '1rem',
};

const titleBaseStyle = {
    backgroundColor: 'white',
    padding: '20px 20px 5px 20px',
    borderRadius: '0 0 5px 5px',
    fontFamily: 'Inter',
    fontWeight: 'bold',
    fontSize: '14px',
    pointerEvents: 'auto',
};
