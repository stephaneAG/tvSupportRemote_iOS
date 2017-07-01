<main-view>
  <h1>Welcome !</h1>
  <p>This is the main-view</p>

  <!-- Logic -->
  <script>

    // listen for Riot evts
  	// all evts debug
  	this.on('*', function(eventName){
  		//console.log(eventName);
  	});
  	// specific evts
  	this.on('before-mount', function(){ // fires before tag is mounted
  		console.log('app-main will be mounted');
  	});
  	this.on('mount', function(stuff){ // fires once per mount ( R: DOM elements aren't instanciated until - aka any attempt to select an elem before this will fail )
  		console.log('app-main mounted');
  		console.log('stuff', stuff);

      // trigger an appConfig change evt ( lastView ) which 'll trigger in turn an appConfig save evt ( to save the view to local storage )
      // has to be done for each view that should appear when the app regain focus ( after quit or backgrounded )
  		appConfigUpdateService.trigger('update', { key: 'lastView', value: 'main-view' }); // TODO: make it dynamic
  	});
    this.on('app-main-evt', function(){
      console.log('app-main-evt received on app-main from app-main');
    });

  	this.on('update', function(){ // fires on every update - allow recalculation of context data before the update
  		console.log('app-main will be updated');
  	});
  	this.on('updated', function(){ // fires once tag is updated after an update call
  		console.log('app-main updated');
  	});
  	this.on('before-unmount', function(){ // fires before tag is unmounted
  		console.log('app-main will be un mounted');
  	});
  	this.on('unmount', function(){ // fires once tag is mounted
  		console.log('app-main unmounted');
  	});

  	</script>


  <!-- Styles Transitions & Animation -->
    <style>
      :scope { color: green; }
  		h3 { color: #444; }
  		ul { color: #7EF7EF }
  	</style>

</main-view>
