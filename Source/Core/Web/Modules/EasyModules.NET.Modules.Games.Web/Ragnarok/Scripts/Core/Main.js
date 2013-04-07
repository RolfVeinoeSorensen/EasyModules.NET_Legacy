var game =
{
    /* ---
    
        Initialize the game
        
        ---            */
    onload: function () {

        // init the video
        if (!me.video.init('jsapp', 960, 544, false, 1.0)) {
            alert("Sorry but your browser does not support html 5 canvas.");
            return;
        }

        //me.loadingScreen = CustomLoadingScreen;

        // initialize the "audio"
        me.audio.init("mp3,ogg");

        // set all resources to be loaded
        me.loader.onload = this.loaded.bind(this);
        me.state.set(me.state.LOADING, new CustomLoadingScreen());
        // set all resources to be loaded
        me.loader.preload(g_resources);

        // load everything & display a loading screen
        me.state.change(me.state.LOADING);
    },


    /* ---
    
        callback when everything is loaded
        
        ---                                        */
    loaded: function () {
        // set the "Play/Ingame" Screen Object
        me.state.set(me.state.MENU, new TitleScreen());

        // set the "Play/Ingame" Screen Object
        me.state.set(me.state.PLAY, new PlayScreen());
        
        // set a global fading transition for the screen
        me.state.transition("fade", "#FFFFFF", 250);
        
        // add our player entity in the entity pool
        me.entityPool.add("mainPlayer", PlayerEntity);
        
        // add the gold entity in the entity pool
        me.entityPool.add("GoldEntity", GoldEntity);
        me.entityPool.add("SilverEntity", SilverEntity);
        me.entityPool.add("CopperEntity", CopperEntity);
        // add NPCs
        me.entityPool.add('LabyrinthMan', LabyrinthMan);
        // add monsters

        // enable the keyboard
        me.input.bindKey(me.input.KEY.LEFT, "left");
        me.input.bindKey(me.input.KEY.RIGHT, "right");
        me.input.bindKey(me.input.KEY.UP, "up");
        me.input.bindKey(me.input.KEY.DOWN, "down");
        
        // uncomment line below to view hitboxes around entities
        //me.debug.renderHitBox = true;

        // start the game
        me.state.change(me.state.MENU);
        
 
    },


}; // jsApp




//bootstrap :)
window.onReady(function () {
    game.onload();
});

