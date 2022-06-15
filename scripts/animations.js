const image = document.getElementById('image');
const bottom = document.getElementById('bottom');
const mainText = document.getElementById('main-text');
const cardLeft = document.querySelector('.card-left');
const cardRight = document.querySelector('.card-right');
const containerText = document.querySelector('.container-text');

const tl = gsap.timeline();

tl.from(image, {y: 100, opacity: 0, duration: 1});
tl.from(bottom, {x: 100, opacity: 0, duration: 1});
tl.from(mainText, {x: -100, opacity: 0, duration: 1});
tl.from(cardLeft, {width: 0, opacity: 0, duration: 1});
tl.from(cardRight, {height: 0, opacity: 0, duration: 1});
tl.from(containerText, {opacity: 0, duration: 1});