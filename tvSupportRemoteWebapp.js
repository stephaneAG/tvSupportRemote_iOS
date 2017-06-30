/* tv support remote webapp V0.1a - JS

  StephaneAG - 2017
*/
console.log('tvSupportRemoteWebapp.js loaded');

// TODO: add localStorage settings code

// TODO: write app logic code

// TODO: write 'holdToOrient' code
// Usage:
// when pressing the btn, hold still: this will be the reference position
// while still pressing the btn, orient gently iPhone ( above 14xp threshold ) for the movement to be quickly parsed & sent to the uC as a set of or or command

var lastStatus = 0;
var status = 0;
var orientationStatusLog = document.querySelector('.orientationStatus');
var statusmsg;
//Detect if the browser supports DeviceMotionEvent ( accelerometer )
if (window.DeviceMotionEvent != undefined) {

  //ondevicemotion is fired when iOS device detects motion
  window.ondevicemotion = function(evt) {
    //ax is the movement on the x axis.
    //This motion is used to move the ship in the game
    var ax = evt.accelerationIncludingGravity.x * 5;
    var ay = evt.accelerationIncludingGravity.y * 5;

    //Status 0 is start, 1 is left, 2 is right, 3 is stay on X, 4 is up, 5 is down, 6 is stay on Y, 7 is stay on X&Y - TODO: mod also for diagonals ?
    if(status == 0){ //initial condition
      status = 3; //stay
      //socket.emit('spaceChange', {'ax': 3});
      statusmsg = 'Waiting for movement';
    }
    else if(ax > 14 && status != 2){ //move right on device
      status = 2;
      //socket.emit('spaceChange', {'ax': 2});
      statusmsg = 'Moving right';
    }
    else if(ax < -14 && status != 1){ //move left on device
      status = 1;
      //socket.emit('spaceChange', {'ax': 1});
      statusmsg = 'Moving left';
    }
    else if(ax > -14 && ax < 14 && status != 3){ //device held steady on X
      status = 3;
      //socket.emit('spaceChange', {'ax': 3});
      statusmsg = 'Held steady on left-right / X-axis';
    }
    else if(ay > 14 && status != 4){ //move up on device
      status = 4;
      //socket.emit('spaceChange', {'ax': 2});
      statusmsg = 'Moving up/in';
    }
    else if(ay < -14 && status != 5){ //move down on device
      status = 5;
      //socket.emit('spaceChange', {'ax': 1});
      statusmsg = 'Moving down/out';
    }
    else if(ay > -14 && ay < 14 && status != 6){ //device held steady on Y
      status = 6;
      //socket.emit('spaceChange', {'ax': 3});
      statusmsg = 'Held steady on up/in-down/out / Y-axis';
    }
    else if(ax > -14 && ax < 14 && ay > -14 && ay < 14 && status != 7){ //device held steady
      status = 7;
      //socket.emit('spaceChange', {'ax': 3});
      statusmsg = 'Held steady on up/in-down/out / Y-axis';
    }

    // map orientation change to commands to be sent ot the uC
    if( status != lastStatus ){
      orientationStatusLog.innerHTML = statusmsg;
      // if status is steady on both, send 'ok' command
      // if status is steady on either X or Y but not on the other one, send 'ok' command then 'new direction command'
      // [ if status isn't steady at all ( diagonals ) - not currently handled ]
      // if status changed to any other flag, send 'ok' command then 'new direction command'
    }
  }
}

/*
//Detect if the browser supports DeviceMotionEvent
if (window.DeviceMotionEvent != undefined) {

  //ondevicemotion is fired when iOS device detects motion
  window.ondevicemotion = function(e) {
    //ax is the movement on the x axis.
    //This motion is used to move the ship in the game
    ax = event.accelerationIncludingGravity.x * 5;
    ay = event.accelerationIncludingGravity.y * 5;

    //Status 0 is start, 1 is left, 2 is right, 3 is stay
    if(status == 0){ //initial condition
      status = 3; //stay
      //socket.emit('spaceChange', {'ax': 3});
      statusmsg = 'Waiting for movement';
    }
    if(ax > 14 && status != 2){ //move right on device
      status = 2;
      //socket.emit('spaceChange', {'ax': 2});
      statusmsg = 'Moving ship right';
    }
    if(ax < -14 && status != 1){ //move left on device
      status = 1;
      //socket.emit('spaceChange', {'ax': 1});
      statusmsg = 'Moving ship left';
    }
    if(ax > -14 && ax < 14 && status != 3){ //device held steady
      status = 3;
      //socket.emit('spaceChange', {'ax': 3});
      statusmsg = 'Ship held steady';
    }

  }
}

//iOS detection and corresponding action
var lastkey = 37;
var dataStart=0;
  socket.on('connect', function() {
   //if sockets gets disconnected then mention room again
   socket.emit('setChannel',
              {'channelName': '<!--?php echo $randRoom; ?-->'});
  });

  socket.on('spaceChanges', function (data) {
     if(dataStart == 0){
        //First movement data arrived
        document.getElementById('status').innerHTML
                  = 'Receiving data from your iOS device';
        dataStart = 1;
     }
    ax = data.ax;
    var posob=new Object();
    if(ax == 2){
        //move right
        lastkey = 39;
        posob.keyCode = lastkey;
        posob.type = 'keydown';
        document.getElementById('status').innerHTML
                   = 'iOS device tilted right';
    }
    if(ax == 1){
        //move left
        lastkey = 37;
        posob.keyCode = lastkey;
        posob.type = 'keydown';
        document.getElementById('status').innerHTML
                   = 'iOS device tilted left';
    }
    if(ax == 3){
        //hold ship in place
        posob.keyCode = lastkey;
    posob.type = 'keyup';
        document.getElementById('status').innerHTML
                   = 'iOS device held steady';
    }
    //Send action received above
    keypressaction(posob);
  });

//Fire automatically once first data starts
window.setInterval(function(){
  if(dataStart == 1){
    var posob=new Object();
    posob.keyCode = 32;
    posob.type = 'keydown';
    keypressaction(posob);
    posob.keyCode = 32;
    posob.type = 'keyup';
    keypressaction(posob);
  }
//Timer is correctly a shot ever 200ms.
//Decrease 200 to lower for even faster firing!
}, 200);
*/
