<html>

<head>
  <meta charset="UTF-8">
  <title>TvSupportRemote V0.1a  - iOS deployment</title>
  <meta name="viewport" content="initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0, user-scalable=no, width=device-width, shrink-to-fit=no">

  <!-- Web App
	================================== -->
	<link rel="manifest" href="manifest.json">

  <meta name="apple-mobile-web-app-capable" content="yes">
  <meta name="apple-touch-fullscreen" content="yes">
  <meta name="apple-mobile-web-app-status-bar-style" content="black">
	<meta name="mobile-web-app-capable" content="yes">

	<!-- Icons
	================================== -->
	<!-- Android -->
	<link rel="icon" sizes="128x128" href="icons/icon-128.png"/>
	<link rel="icon" sizes="192x192" href="icons/icon-192.png"/>

	<!-- Apple -->
	<link rel="apple-touch-icon" href="icons/icon-72.png"/>
	<link rel="apple-touch-icon" sizes="76x76" href="icons/icon-76.png"/>
	<link rel="apple-touch-icon" sizes="120x120" href="icons/icon-120.png"/>
	<link rel="apple-touch-icon" sizes="128x128" href="icons/icon-128.png">
	<link rel="apple-touch-icon" sizes="152x152" href="icons/icon-152.png"/>
	<link rel="apple-touch-icon-precomposed" sizes="128x128" href="icons/icon-128.png">

	<!-- Startup Image ( If user placed on home screen ) -->
	<link rel="apple-touch-startup-image" href="icons/icon-128.png">

  <!-- Startup Screen ( If user placed on home screen )-->
  <link rel="apple-touch-startup-image" href="startup.png" /> <!-- R: to add ! -->

  <style>
  /* TODO: write & add external CSS file */
  </style>
  <!--
    R: the first one following works fine when testing page through github rawgit ( since files are hosted on the same server )
       while when accessed on the laptop & through an xhr ran from the uC, we get '(index):82 GET http://192.168.1.15/tvSupportRemoteWebapp.css ' errors
  -->
  <!-- <link rel="stylesheet" type="text/css" href="tvSupportRemoteWebapp.css"></link> --> <!-- if stuff was hosted on the uC embedding the original page -->
  <!-- <link rel="stylesheet" type="text/css" href="./tvSupportRemoteWebapp.css"></link> --> <!-- R: those links have to work & ref NOT to local but distant stuff -->
  <link rel="stylesheet" type="text/css" href="https://rawgit.com/stephaneAG/tvSupportRemote_iOS/master/tvSupportRemoteWebapp.css"></link>
</head>
<body onload="bodyLoaded()"> <!-- R: body onload 'll trigger errors if the stuff to be triggered is defined whithin a embed script tag -->
  <!-- TODO: write REAL content - why not using Riotjs ? ( to try mixing it with manifest?json & localStorage stuff )-->
  <h1 class="appName">TvSupportRemote </h1>
  <h2 class="connectionStatus">Connected</h2>
  <p>- Welcome, user :) -</p>
  <div class="tiretSpacer"></div>
  <p class="orientationStatus"></p>

  <!-- tv screen & support css animation -->
  <div class="tvScreenContainer">
    <div class="ball"></div>
    <div class="tvAndSupport"></div>
  </div>
<pre class="output"></pre>

<!-- RIOTJS DEBUG PART -->
<!-- App UI start -->
<div id="appContainer">
  <a href="#second-view" class="btn btn-info">Go to "second-view"</a> <!-- debug view changer -->
  <a href="#third-view" class="btn btn-info">Go to "third-view"</a> <!-- debug view changer -->
  <!-- App View(s) -->
  <div id="riotViewsContainer"> </div> <!-- all Riotjs views are loaded here during debug -->
</div>

<!-- Views -->
<script type="riot/tag" src="./views/main-view.tag"></script> <!-- main-view ( test ) -->
<script type="riot/tag" src="./views/second-view.tag"></script> <!-- 2nde view - could be a param view or a profile view -->
<script type="riot/tag" src="./views/third-view.tag"></script> <!-- 2nde view - could be a param view or a profile view -->

<!-- Riot -->
<script src="https://rawgit.com/stephaneAG/tvSupportRemote_iOS/master/riot+compiler.min.js"></script>
<script src="https://rawgit.com/stephaneAG/tvSupportRemote_iOS/master/route.min.js"></script>

<!-- <script>riot.mount('mainView')</script> -->
<!-- mount normally - done in the below external js file -->

<!-- <script src="tvSupportRemoteWebapp.js"></script> --> <!-- if stuff was hosted on the uC embedding the original page -->
<!-- <script src="./tvSupportRemoteWebapp.js"></script> --> <!-- same as above -->
<script src="https://rawgit.com/stephaneAG/tvSupportRemote_iOS/master/tvSupportRemoteWebapp.js"></script> <!-- TODO: try passing an init param remoteRepUrl -->
<script>
/* TODO: write & add external js file(s) */
// R: add code to check whether or not running from the springboard
// welcome the user that just DL-ed our app
function welcomeUser(){
  console.log('Hello World from Github repo deployment ! ;P');
}
// R: all the above gets preserved when ajax-ing the doc as doc ;)
function bodyLoaded(){
  console.log('body loaded ;P');
}

// what seems to do the trick - to be tested .. but not quite useful from whithin the same page since the script is NOT loaded ;)
//var result = new Function(  document.querySelector('script').innerHTML );
//result();
//welcomeUser();

/* R: anyway, TODO: use external javascript file, which 'd be executed once loaded automatically ;p */

// exec stuff when the page is loaded: - R: never called when ajax-ing the present page in ..
window.onload = function () { welcomeUser(); console.log('-> triggered from page loaded'); } // R: gets entirely stripped from the present file when being ajax-ed
// should be fully called  - to be tested ..
var app = {};
app.init = function(){ console.log('app init triggered'); }
app.init();

(function(){
  console.log('self executing anonymous fcn triggered');
})();

// so: 2 options to get the <script> tag(s) stuff executed ( to be tested ):
// A: using the whole document of the current page instead of just the inner HTML - fine for my project(s), & doesn't have any overhead, just a few mods
// B : re-creating & re-adding on the page tags present within the page - a little overhead but could come quite handy I guess ..
</script>
</body>
</html>
