/* -----

	gameScreens
		
	------			*/
/*---------------------------------------------------------------------

	A game playing screen

  ---------------------------------------------------------------------	*/
var PlayScreen = me.ScreenObject.extend(
{

    onResetEvent: function () {
        // stuff to reset on state change
        
        // bind keys
        me.input.bindKey(me.input.KEY.ENTER, "action");
        me.input.bindKey(me.input.KEY.SPACE, "action");
        me.input.bindKey(me.input.KEY.Q, "touch");
        me.input.bindMouse(me.input.mouse.LEFT, me.input.KEY.Q);

        // bind mouse
        me.input.registerMouseEvent('mouseup', me.game.viewport, this.myMouseUp.bind(this));

        // add music
        me.audio.play("Aaron_Krogh_162_Pre_Boss_Battle_Tension", true);

        me.levelDirector.loadLevel("area_001");
        // add a default HUD to the game mngr
        me.game.addHUD(0, 500, 960, 100, '#000000');

        // add a new HUD item 
        me.game.HUD.addItem("gold", new GoldObject(100, 10));

        // make sure everyhting is in the right order
        me.game.sort();
    },
    myMouseUp: function () {
        var mouseX = me.game.viewport.pos.x + me.input.mouse.pos.x;
        var mouseY = me.game.viewport.pos.y + me.input.mouse.pos.y;
        var clickedTile = me.game.currentLevel.getLayerByName("background").getTile(mouseX, mouseY); //Background always have a tile everywhere on the map
        var player = me.game.getEntityByName("mainPlayer");
        var playerX = player[0].collisionBox.pos.x;
        var playerY = player[0].collisionBox.pos.y;
        var playerTile = me.game.currentLevel.getLayerByName("background").getTile(playerX, playerY);
        var gameCollisionLayer = me.game.currentLevel.getLayerByName("collision");


        var gameCollisionMap = new Array();
        var matrix = new Array();
        for (var h = 0; h < gameCollisionLayer.height; h++) {
            gameCollisionMap[h] = new Array();
            for (var i = 0; i < gameCollisionLayer.width; i++) {
                if (jQuery.type(gameCollisionLayer.layerData[i][h]) != "null") {
                    gameCollisionMap[h].push(1);
                }
                else {
                    gameCollisionMap[h].push(0);
                }
            }
        }
        //gameCollisionLayer.layerData.forEach(function (column) {
        //    column.forEach(function (tile, y) {
        //        if (!gameCollisionMap[y])
        //            gameCollisionMap[y] = "";
        //        gameCollisionMap[y] += (tile ? "1" : "0"); // (tile ? tile.tileId - 100 : "-");
        //    });
        //});
        // alert(str.join("\n"));
        var graph = new Graph(gameCollisionMap);
        var start = graph.nodes[0][0];
        var end = graph.nodes[1][2];
        var result = astar.search(graph.nodes, start, end);
        
        //alert(result.join("\n"));
    },


    /* ---
    
         action to perform when game is finished (state change)
        
        ---    */
    onDestroyEvent: function () {
        me.input.unbindKey(me.input.KEY.ENTER);
        me.input.unbindKey(me.input.KEY.SPACE);
        me.input.unbindKey(me.input.KEY.Q);
        me.input.unbindMouse(me.input.mouse.LEFT);

        me.input.releaseMouseEvent('mouseup', me.game.viewport);
        // remove the HUD
        me.game.disableHUD();
    },

});
/*---------------------------------------------------------------------

	A loading screen

  ---------------------------------------------------------------------	*/
var CustomLoadingScreen = me.ScreenObject.extend({
    /*---
    
        constructor
        
        ---*/
    init: function () {
        this.parent(true);
        // melonJS logo
        this.logo1 = new me.Font('Ragnarok', 100, 'white', 'middle');
        this.logo2 = new me.Font('Ragnarok', 100, '#7C8998', 'middle');
        this.logo2.bold();

        // flag to know if we need to refresh the display
        this.invalidate = false;

        // handle for the susbcribe function
        this.handle = null;

        // load progress in percent
        this.loadPercent = 0;

    },

    // call when the loader is resetted
    onResetEvent: function () {
        // setup a callback
        this.handle = me.event.subscribe(me.event.LOADER_PROGRESS, this.onProgressUpdate.bind(this));
    },

    // destroy object at end of loading
    onDestroyEvent: function () {
        // "nullify" all fonts
        this.logo1 = this.logo2 = null;
        // cancel the callback
        if (this.handle) {
            me.event.unsubscribe(this.handle);
            this.handle = null;
        }
    },

    // make sure the screen is refreshed every frame 
    onProgressUpdate: function (progress) {
        this.loadPercent = progress;
        this.invalidate = true;
    },

    // make sure the screen is refreshed every frame 
    update: function () {
        if (this.invalidate === true) {
            // clear the flag
            this.invalidate = false;
            // and return true
            return true;
        }
        // else return false
        return false;
    },

    /*---
    
        draw function
      ---*/

    draw: function (context) {

        // measure the logo size
        var logo1Width = this.logo1.measureText(context, "Ragnarok").width;
        var xpos = (me.video.getWidth() - logo1Width - this.logo2.measureText(context, "RPG").width) / 2;
        var ypos = me.video.getHeight() / 2;

        // clear surface
        me.video.clearSurface(context, "black");

        // draw the melonJS logo
        this.logo1.draw(context, 'Ragnarok', xpos, ypos);
        xpos += logo1Width;
        this.logo2.draw(context, 'RPG', xpos, ypos);

        ypos += this.logo1.measureText(context, "Ragnarok").height / 2;

        // display a progressive loading bar
        var progress = Math.floor(this.loadPercent * me.video.getWidth());

        // draw the progress bar
        context.strokeStyle = "silver";
        context.strokeRect(10, ypos+10, me.video.getWidth()-20, 30);
        context.fillStyle = "#7C8998";
        context.fillRect(12, ypos + 12, progress - 24, 26);
    }

});

/*---------------------------------------------------------------------

	A title screen

  ---------------------------------------------------------------------	*/

var TitleScreen = me.ScreenObject.extend(
{
    init: function () {
        this.parent(true);

    },
    /* ---
		reset function
	   ----*/

    onResetEvent: function () {
        if (this.title == null) {
            // init stuff if not yet done
            // get the background image
            this.title = me.loader.getImage("title_screen");
            // enable the keyboard
            me.input.bindKey(me.input.KEY.ENTER, "touch");
            // map the left button click on the X key
            me.input.bindMouse(me.input.mouse.LEFT, me.input.KEY.ENTER);
        }

    },


    // some callback for the tween objects
    scrollover: function () {

    },

    /*---
		
		update function
		 ---*/

    update: function () {
        // x pressed ?
        if (me.input.isKeyPressed('touch')) {
            me.state.change(me.state.PLAY);
        }
        return true;
    },


    /*---
	
		the manu drawing function
	  ---*/

    draw: function (context) {
        context.drawImage(this.title, 0, 0);
    },

    /*---
	
		the manu drawing function
	  ---*/

    onDestroyEvent: function () {
        me.input.unbindKey(me.input.KEY.ENTER);
        me.input.unbindMouse(me.input.mouse.LEFT);
        //me.input.unbindTouch();
    },

});

