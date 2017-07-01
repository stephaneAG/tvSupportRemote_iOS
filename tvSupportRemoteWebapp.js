/* tv support remote webapp V0.1a - JS

  StephaneAG - 2017
*/
console.log('tvSupportRemoteWebapp.js loaded');


/* --  Riotjs observable to dispatch config update -- */
function appConfig_UpdateService(){
  console.log('appConfig_UpdateService instance created');

  // make instance observable
  riot.observable(this);
  // listen to 'update' event ( something has been updated )
  this.on('update', function(data){
    console.log('appConfig_UpdateService received an UPDATE event');
    // update value of key specified ( appConfig as app then some.stuff.like.so )
    //appConfig.the.stuff.to.be.updated.and.saved = someVal; // update the appConfig js Object
    setInObj(appConfig, data.key, data.value);
    // dispatch update event to the storage service AS WELL AS observable for that value ?
    console.log('appConfig_UpdateService dispatching an appConfig_SaveService SAVE event');
    appConfigUpdateService.trigger('save');
  })
}
// make a new instance
var appConfigUpdateService = new appConfig_UpdateService();
//appConfigUpdateService.trigger('update', { key: 'the.app.config.key', value: 'The value to be saved' });


/* --  Riotjs observable to dispatch config save -- */
function appConfig_SaveService(){
  console.log('appConfig_SaveService instance created');
  // make instance observable
  riot.observable(this);
  // listen to 'save' event ( something has likely been updated & needs to be saved )
  this.on('save', function(){
    console.log('appConfig_SaveService received a SAVE event')
    // save value to key specified ( appConfig as app then some.stuff.like.so )
    localStorage.appConfig = JSON.stringify ( appConfig ); // save the encoded appConfig as JSON
    // dispatch saved event ?
  });
  // listen to 'reset' event ( resets the appConfig to the default one )
  this.on('reset', function(){
    console.log('appConfig_SaveService received a RESET event')
    // save value to key specified ( appConfig as app then some.stuff.like.so )
    localStorage.removeItem( 'appConfig' ); // remove the appConfig from the local storage
    // dispatch saved event ?
  });

}
// make a new instance
var appConfig_saveService = new appConfig_SaveService();
//appConfigUpdateService.trigger('save');
//appConfigUpdateService.trigger('reset');


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

// ---- TODO: write Riotjs quick test code ----
// 'll hold a ref to the currently mounted page - could be useful later ;)
var currentPage = null;

// 'll setup a quick way to handle basic routes between views - TODO: add transition between views logic, structure, & js code :D
route(function goTo(path) {
  console.log('routing to path: ' + path);

  if(currentPage){
    currentPage.unmount(true); // necessary since both pages 'll be in the same place ( good practice to trigger their unmount evt )
    // TODO: the above unmounting 'll be done on transiton end when using transitions between views :p
  }
  // handle basic paths ( ex: link with href="#hello" )
  if(path === 'secondview'){
    currentPage = riot.mount('div#riotViewsContainer', 'second-view')[0];
  }
  else if(path === 'thirdview'){
    currentPage = riot.mount('div#riotViewsContainer', 'third-view')[0];
  }
  else {
    currentPage = riot.mount('div#riotViewsContainer', 'main-view')[0];
  }

});
route.start(true);


// Riotjs helper to get the lastPage before app quit or app backgrounded
function getBackTo(path) {
  if(currentPage){
    currentPage.unmount(true); // necessary since both pages 'll be in the same place ( good practice to trigger their unmount evt )
    // TODO: the above unmounting 'll be done on transiton end when using transitions between views :p
  }
  // handle basic paths ( ex: link with href="#hello" )
  if(path === 'secondview'){
    currentPage = riot.mount('div#riotviews', 'second-view')[0];
  }
  else if(path === 'thirdview'){
    currentPage = riot.mount('div#riotviews', 'third-view')[0];
  }
  else {
    currentPage = riot.mount('div#riotviews', 'main-view')[0];
  }
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

        // TODO: Riotjs wip implm - handle the last views visible before app quit or app backgrounded
        // make sure we have a lastView & if so load it, else load the main-view ( for more advanced needs, we could check the appStates after lastView )
        if( appConfig.lastView ) {
          getBackTo( appConfig.lastView ); // route to the last view visible
          console.log('appConfig lastView: ', appConfig.lastView);
        }
        else {
          currentPage = riot.mount('div#riotviews', 'main-view')[0]; // untested yet
          //route('main-view'); // load main Riotjs view - causing troubles ?
        }


    } else {
        // No appConfig found -> create one from the defaultl
        localStorage.appConfig = JSON.stringify ( appConfig ); // save the encoded appConfig as JSON
        console.log('1st app launch: default config saved..');
        // CALLBACK APP CONFIG INIT DONE

        currentPage = riot.mount('div#riotviews', 'main-view')[0]; // untested yet
        //route('main-view'); // load main Riotjs view - causing troubles ?
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
