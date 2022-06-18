const homeSection = document.getElementById('home');
const workSection = document.getElementById('work');
const aboutSection = document.getElementById('about');
const projectsSection = document.getElementById('projects');
const contactSection = document.getElementById('contact');

const image = document.getElementById('image');
const bottom = document.getElementById('bottom');
const mainText = document.getElementById('main-text');
const cardLeft = document.querySelector('.card-left');
const cardRight = document.querySelector('.card-right');
const containerText = document.querySelector('.container-text');
const aboutImage = document.querySelector('.left-about-me');
const aboutInfo = document.querySelector('.right-about-me');

const homeRoute = document.querySelector('.home');
const workRoute = document.querySelector('.work');
const aboutRoute = document.querySelector('.about');
const projectsRoute = document.querySelector('.projects');
const contactRoute = document.querySelector('.contact');

const projOne = document.querySelector('.projOne');
const projTwo = document.querySelector('.projTwo');
const projThree = document.querySelector('.projThree');

const tl = gsap.timeline();

let currentRoute;

function route(e) {
    switch (e) {
        case 'home':
            currentRoute = homeSection;
            home();
            break;
        case 'work':
            currentRoute = workSection;
            work();
            break;
        case 'about':
            currentRoute = aboutSection;
            about();
            break;
        case 'projects':
            currentRoute = projectsSection;
            projects();
            break;
        case 'contact':
            currentRoute = contactSection;
            contact();
            break;
    }
}

function home() {
    currentRoute.style.display = 'block'

    workSection.style.display = 'none'
    aboutSection.style.display = 'none'
    projectsSection.style.display = 'none'
    contactSection.style.display = 'none'

    homeRoute.classList.add('active');
    workRoute.classList.remove('active')
    aboutRoute.classList.remove('active')
    projectsRoute.classList.remove('active')
    contactRoute.classList.remove('active')

    tl.from(image, {y: 100, opacity: 0, duration: 0.3, ease: "power3.out"});
    tl.from(bottom, {x: 100, opacity: 0, duration: 0.3, ease: "power3.out"});
    tl.from(mainText, {x: -100, opacity: 0, duration: 0.3, ease: "power3.out"});
}

function work() {
    currentRoute.style.display = 'block'

    aboutSection.style.display = 'none'
    projectsSection.style.display = 'none'
    contactSection.style.display = 'none'
    homeSection.style.display = 'none'
    
    homeRoute.classList.remove('active')
    workRoute.classList.add('active');
    aboutRoute.classList.remove('active')
    projectsRoute.classList.remove('active')
    contactRoute.classList.remove('active')

    tl.from(cardLeft, {width: 0, opacity: 0, duration: 0.3, ease: "power3.out"});
    tl.from(cardRight, {height: 0, opacity: 0, duration: 0.3, ease: "power3.out"});
    tl.from(containerText, {opacity: 0, duration: 0.3, ease: "power3.out"});
}

function about() {
    currentRoute.style.display = 'block'
    workSection.style.display = 'none'
    projectsSection.style.display = 'none'
    contactSection.style.display = 'none'
    homeSection.style.display = 'none'
    
    homeRoute.classList.remove('active');
    workRoute.classList.remove('active');
    aboutRoute.classList.add('active');
    projectsRoute.classList.remove('active')
    contactRoute.classList.remove('active')

    tl.from(aboutImage, {width: 0, opacity: 0, duration: 0.3, ease: "power3.out"})
    tl.from(aboutInfo, {width: 0, opacity: 0, duration: 0.3, ease: "power3.out"})
}

function projects() {
    currentRoute.style.display = 'block'
    workSection.style.display = 'none'
    aboutSection.style.display = 'none'
    contactSection.style.display = 'none'
    homeSection.style.display = 'none'
    
    homeRoute.classList.remove('active');
    workRoute.classList.remove('active');
    aboutRoute.classList.remove('active');
    projectsRoute.classList.add('active');
    contactRoute.classList.remove('active')

    tl.fromTo(projOne, {x: -1000, opacity: 0}, {x: 0, opacity: 100, duration: 0.3, ease: "power3.out"})
    tl.fromTo(projTwo, {x: 1000, opacity: 0}, {x: 0, opacity: 100, duration: 0.3, ease: "power3.out"})
    tl.fromTo(projThree, {x: -1000, opacity: 0}, {x: 0, opacity: 100, duration: 0.3, ease: "power3.out"})
    // tl.fromTo(projectsSection, {x: 100, opacity: 0}, {x: 0, opacity: 100, duration: 1});
}

function contact() {
    currentRoute.style.display = 'block'
    workSection.style.display = 'none'
    aboutSection.style.display = 'none'
    projectsSection.style.display = 'none'
    homeSection.style.display = 'none'
    
    homeRoute.classList.remove('active');
    workRoute.classList.remove('active');
    aboutRoute.classList.remove('active');
    projectsRoute.classList.remove('active');
    contactRoute.classList.add('active');

    tl.fromTo(contactSection, {x: 100, opacity: 0}, {x: 0, opacity: 100, duration: 1});
}

function init() {
    workSection.style.display = 'none'
    aboutSection.style.display = 'none'
    projectsSection.style.display = 'none'
    contactSection.style.display = 'none'
}

init();