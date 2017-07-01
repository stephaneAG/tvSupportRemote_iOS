<third-view>
  <h1>Il est temps de vous dire Bonjour !</h1>
  <p>Vous etes sur la third-view</p>

  <script>
    this.on('mount', function(stuff){ // fires once per mount ( R: DOM elements aren't instanciated until - aka any attempt to select an elem before this will fail )

      // trigger an appConfig change evt ( lastView ) which 'll trigger in turn an appConfig save evt ( to save the view to local storage )
      // has to be done for each view that should appear when the app regain focus ( after quit or backgrounded )
  	  appConfigUpdateService.trigger('update', { key: 'lastView', value: 'third-view' }); // TODO: make it dynamic
  	});
  </script>

</third-view>
