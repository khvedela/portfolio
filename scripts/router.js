const homeSection = document.getElementById('home');
const workSection = document.getElementById('work');
const aboutSection = document.getElementById('about');
const projectsSection = document.getElementById('projects');
const contactSection = document.getElementById('contact');

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
    console.log(currentRoute)
    tl.fromTo(homeSection, {x: 100, opacity: 0}, {x: 0, opacity: 100, duration: 1});
}

function work() {
    currentRoute.style.display = 'block'
    aboutSection.style.display = 'none'
    projectsSection.style.display = 'none'
    contactSection.style.display = 'none'
    homeSection.style.display = 'none'
    console.log(currentRoute)
    tl.fromTo(workSection, {x: 100, opacity: 0}, {x: 0, opacity: 100, duration: 1});
}

function about() {
    currentRoute.style.display = 'block'
    workSection.style.display = 'none'
    projectsSection.style.display = 'none'
    contactSection.style.display = 'none'
    homeSection.style.display = 'none'
    console.log(currentRoute)
    tl.fromTo(aboutSection, {x: 100, opacity: 0}, {x: 0, opacity: 100, duration: 1});
}

function projects() {
    currentRoute.style.display = 'block'
    workSection.style.display = 'none'
    aboutSection.style.display = 'none'
    contactSection.style.display = 'none'
    homeSection.style.display = 'none'
    console.log(currentRoute)
    tl.fromTo(projectsSection, {x: 100, opacity: 0}, {x: 0, opacity: 100, duration: 1});
}

function contact() {
    currentRoute.style.display = 'block'
    workSection.style.display = 'none'
    aboutSection.style.display = 'none'
    projectsSection.style.display = 'none'
    homeSection.style.display = 'none'
    console.log(currentRoute)
    tl.fromTo(contactSection, {x: 100, opacity: 0}, {x: 0, opacity: 100, duration: 1});
}

function init() {
    workSection.style.display = 'none'
    aboutSection.style.display = 'none'
    projectsSection.style.display = 'none'
    contactSection.style.display = 'none'
}

init();