const projOne = document.querySelector('.projOne');
const projTwo = document.querySelector('.projTwo');
const projThree = document.querySelector('.projThree');

const tl = gsap.timeline()

projOne.addEventListener('click', () => {
    tl.to(projOne, {x: 1000, opacity: 0, duration: 0.3, ease: "power3.out"});
    tl.from(projOne, {x: -1000, opacity: 0, duration: 0.3, ease: "power3.out"});
    window.open('https://github.com/khvedela')
});

projTwo.addEventListener('click', () => {
    tl.to(projTwo, {x: 1000, opacity: 0, duration: 0.3, ease: "power3.out"});
    tl.from(projTwo, {x: -1000, opacity: 0, duration: 0.3, ease: "power3.out"});
    window.open('https://github.com/khvedela')
});

projThree.addEventListener('click', () => {
    tl.to(projThree, {x: 1000, opacity: 0, duration: 0.3, ease: "power3.out"});
    tl.from(projThree, {x: -1000, opacity: 0, duration: 0.3, ease: "power3.out"});
    window.open('https://www.youtube.com/watch?v=dQw4w9WgXcQ')
});