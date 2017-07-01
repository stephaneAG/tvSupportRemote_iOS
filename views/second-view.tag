<second-view>
  <h1>It's time to say !</h1>
  <p>That is obviously the second-view</p>

  <script>
    this.on('mount', function(stuff){ // fires once per mount ( R: DOM elements aren't instanciated until - aka any attempt to select an elem before this will fail )

      // trigger an appConfig change evt ( lastView ) which 'll trigger in turn an appConfig save evt ( to save the view to local storage )
      // has to be done for each view that should appear when the app regain focus ( after quit or backgrounded )
  	  appConfigUpdateService.trigger('update', { key: 'lastView', value: 'second-view' }); // TODO: make it dynamic
  	});
  </script>

</second-view>
