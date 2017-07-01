/* tv support remote webapp V0.1a - JS

  StephaneAG - 2017
*/
console.log('tvSupportRemoteWebapp.js loaded');

// TODO: add localStorage settings code

// TODO: write app logic code
  // quick test - setting the domain ip ( the uC one ) on the UI
  var tvSupportRemoteDomainStr = ': ' + document.domain;
  document.querySelector('.connectionStatus').innerHTML += tvSupportRemoteDomainStr;

// TODO: write 'holdToOrient' code
// Usage:
// when pressing the btn, hold still: this will be the reference position
// while still pressing the btn, orient gently iPhone ( above 14xp threshold ) for the movement to be quickly parsed & sent to the uC as a set of or or command

// I need the GYROSCOPE ORIENTATION & NOT the ACCELEROMETER MOTION ;)
/*
window.addEventListener('deviceorientation', function(event) {
  console.log(event.alpha + ' : ' + event.beta + ' : ' + event.gamma);
});
*/

//var ball   = document.querySelector('.ball');
var tvAndSupport = document.querySelector('.tvAndSupport');
var garden = document.querySelector('.tvScreenContainer');
var output = document.querySelector('.output');

function handleOrientation(event) {
  var x = event.beta;  // In degree in the range [-180,180]
  var y = event.gamma; // In degree in the range [-90,90]

  output.innerHTML  = "beta : " + x + "\n";
  output.innerHTML += "gamma: " + y + "\n";

  tvAndSupport.style.transform = 'translateZ(' + Math.floor(event.beta*2) + 'px) rotateY('+ Math.floor(event.gamma*2) +'deg)';
}

window.addEventListener('deviceorientation', handleOrientation);
