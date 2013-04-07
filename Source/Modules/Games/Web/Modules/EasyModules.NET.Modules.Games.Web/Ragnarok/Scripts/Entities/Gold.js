/****************************/
/*                         */
/*		a Gold entity	   */
/*						   */
/***************************/
var GoldEntity = me.CollectableEntity.extend(
{

    init: function (x, y, settings) {
        // call the parent constructor
        this.parent(x, y, settings);
    },

    onCollision: function () {
        // do something when collide
        me.audio.play("coins");
        // Get level
        var level = parseInt(me.game.currentLevel.name) || 1;
        // give some score
        me.game.HUD.updateItemValue("gold", 1 * level);
        //game.dialog(["test."]);
        // make sure it cannot be collected "again"
        this.collidable = false;
        // remove it
        me.game.remove(this);
    }


});
/****************************/
/*                         */
/*		a Silver entity	   */
/*						   */
/***************************/
var SilverEntity = me.CollectableEntity.extend(
{

    init: function (x, y, settings) {
        // call the parent constructor
        this.parent(x, y, settings);
    },

    onCollision: function () {
        // do something when collide
        me.audio.play("coins");
        // Get level
        var level = parseInt(me.game.currentLevel.name) || 1;
        // give some score
        me.game.HUD.updateItemValue("gold", 0.5 * level);

        // make sure it cannot be collected "again"
        this.collidable = false;
        // remove it
        me.game.remove(this);
    }


});
/****************************/
/*                         */
/*		a Copper entity	   */
/*						   */
/***************************/
var CopperEntity = me.CollectableEntity.extend(
{

    init: function (x, y, settings) {
        // call the parent constructor
        this.parent(x, y, settings);
    },

    onCollision: function () {
        // do something when collide
        me.audio.play("coins");
        // Get level
        var level = parseInt(me.game.currentLevel.name) || 1;
        // give some score
        me.game.HUD.updateItemValue("gold", 0.25 * level);
        // make sure it cannot be collected "again"
        this.collidable = false;
        // remove it
        me.game.remove(this);
    }


});

