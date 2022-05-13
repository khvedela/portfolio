import * as gsap from 'gsap';

const main = document.querySelector('main');
const mainText = document.querySelector('#mainText');
const subText = document.querySelector('#subText');
const btn1 = document.querySelector('#btn1');
const btn2 = document.querySelector('#btn2');
const btn3 = document.querySelector('#btn3');

let tl = gsap.gsap.timeline();

tl.fromTo(main, {height: 0}, {height: '100vh', duration: 1, ease: 'power3.out'})
tl.fromTo(mainText, {opacity: 0, x: '-100%'}, {opacity: 1, x: 0, duration: 1, ease: "power1.out"})
tl.fromTo(subText, {opacity: 0, x: '-100%'}, {opacity: 1, x: 0, duration: .8, ease: "power2.out"})
tl.fromTo(btn1, {opacity: 0, x: '-100%'}, {opacity: 1, x: 0, duration: .2, ease: "expo.out"})
tl.fromTo(btn2, {opacity: 0, x: '-100%'}, {opacity: 1, x: 0, duration: .2, ease: "expo.out"})
tl.fromTo(btn3, {opacity: 0, x: '-100%'}, {opacity: 1, x: 0, duration: .2, ease: "expo.out"})
