$(document).mousemove(function(event){
    var xPos = (event.clientX/$(window).width())-0.5,
        yPos = (event.clientY/$(window).height())-0.5,
        box = $('.wrapper'),
        coord = $('.coordinates');
   
   TweenLite.to(box, 0.6, {
     rotationY: 5 * xPos, 
     rotationX: 5 * yPos,
     ease: Power1.easeOut,
     transformPerspective: 900,
     transformOrigin: 'center'
   });
 });