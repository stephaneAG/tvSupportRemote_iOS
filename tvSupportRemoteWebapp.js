/* tv support remote webapp V0.1a - JS

  StephaneAG - 2017
*/
console.log('tvSupportRemoteWebapp.js loaded');

// ---- TODO: add localStorage settings code ----
// app config quick setter helper
function setInObj(obj, keyPath, value){
  var currPath = obj;
  var path  = keyPath.split('.');
  console.log('path from keyPath: ' + path);
  for(var i=0; i < path.length-1; i++){
    console.log('path chunk: ' + path[i]);
    if (typeof(currPath[ path[i] ]) !== "undefined") {
      console.log('path chunk exist: ' + currPath[ path[i] ]);
      currPath = currPath[ path[i] ];
      //console.log(obj); // DEBUG
      //console.log(currPath); // DEBUG
    } else {
      //console.log('path added: ' + currPath[ path[i] ]);
      currPath[ path[i] ] = {};
      currPath = currPath[ path[i] ];
      //console.log(obj); // DEBUG
      //console.log(currPath); // DEBUG
    }
  }
  //currPath = value; // not working ?
  currPath[ path[ path.length-1 ] ] = value;
}


/* -- App (re)start -- */
var appConfig = { title: 'check' }; // default app config

// check if browser storage supported ( else we'll run into errors & cie, so better use the default config if this is the case, or provide a way to do so when generating the app)
if (typeof(Storage) !== "undefined") {
    // Code for localStorage/sessionStorage.
    if (typeof(localStorage.appConfig) !== "undefined") {
        // appConfig found
        appConfig = JSON.parse( localStorage.appConfig ); // retrieve the maybe modded but surely saved appConfig
        console.log('not the 1st app launch: previous config loaded ..');
        console.log('appConfig: ', appConfig);
        // CALLBACK APP CONFIG INIT DONE
    } else {
        // No appConfig found -> create one from the defaultl
        localStorage.appConfig = JSON.stringify ( appConfig ); // save the encoded appConfig as JSON
        console.log('1st app launch: default config saved..');
        // CALLBACK APP CONFIG INIT DONE
    }
} else {
    // Sorry! No Web Storage support..
}

// TODO: once fully loaded / after some change in the config, update appConfig & save it to local storage:
//setInObj(appConfig, 'dom.street.view', { this: 'is', another: 'obj'});
//localStorage.appConfig = JSON.stringify ( appConfig ); // save the encoded appConfig as JSON
// localStorage.removeItem('appConfig');  // to erase the appConfig from the local storage

// ---- TODO: write app logic code ----
  // quick test - setting the domain ip ( the uC one ) on the UI
  var tvSupportRemoteDomainStr = ': ' + document.domain;
  document.querySelector('.connectionStatus').innerHTML += tvSupportRemoteDomainStr;



// ---- TODO: write 'holdToOrient' code ----
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

  tvAndSupport.style.transform = 'translateZ(' + Math.floor(event.beta*1.5) + 'px) rotateY('+ Math.floor(event.gamma*1) +'deg)';
}

window.addEventListener('deviceorientation', handleOrientation);
