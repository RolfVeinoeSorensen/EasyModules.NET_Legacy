/*************************/
/*                      */
/*   a player entity    */
/*                      */
/************************/
var PlayerEntity = me.ObjectEntity.extend(
{
    /* -----

        constructor
        
      ------            */

    init: function (x, y, settings) {
        // call the constructor
        this.parent(x, y, settings);

        // set the walking speed
        this.setVelocity(2.5, 2.5);

        this.setFriction(0.2, 0.2);

        // adjust the bounding box
        this.updateColRect(20, 24, 44, 16);

        // disable gravity
        this.gravity = 0;

        this.firstUpdates = 2;
        this.direction = 'down';

        // set the display to follow our position on both axis
        me.game.viewport.follow(this.pos, me.game.viewport.AXIS.BOTH);

        // This will work for any character tileset with 16 images and 4 directions
        this.addAnimation("stand-down", [0]);
        this.addAnimation("stand-left", [4]);
        this.addAnimation("stand-up", [12]);
        this.addAnimation("stand-right", [8]);
        this.addAnimation("down", [0, 1, 2, 3]);
        this.addAnimation("left", [4, 5, 6, 7]);
        this.addAnimation("up", [12, 13, 14, 15]);
        this.addAnimation("right", [8, 9, 10, 11]);
        // original from the rpg example on melonjs
        //this.addAnimation("stand-down", [0]);
        //this.addAnimation("stand-left", [7]);
        //this.addAnimation("stand-up", [14]);
        //this.addAnimation("stand-right", [21]);
        //this.addAnimation("down", [1, 2, 3, 4, 5, 6]);
        //this.addAnimation("left", [8, 9, 10, 11, 12, 13]);
        //this.addAnimation("up", [15, 16, 17, 18, 19, 20]);
        //this.addAnimation("right", [22, 23, 24, 25, 26, 27]);

    },

    /* -----

        update the player pos
        
      ------            */
    update: function () {
        var hadSpeed = this.vel.y != 0 || this.vel.x != 0;
        me.game.remove.defer(game.DialogObject);
        if (me.input.isKeyPressed("touch")) {
            var a = me.game.viewport.pos.x + me.input.mouse.pos.x,
                b = me.game.viewport.pos.y + me.input.mouse.pos.y,
                c = Math.abs(a - this.pos.x),
                d = Math.abs(b - this.pos.y),
                e = 1.25 * c / (c + d);
            a > this.pos.x + this.width / 4 && a < this.pos.x + 3 * this.width / 4 && (e = 0, c = 1);
            b > this.pos.y + this.height / 4 && b < this.pos.y + 3 * this.height / 4 && (e = 1, c = 0);
            a < this.pos.x + this.width / 4 ? (this.vel.x -= this.accel.x * me.timer.tick * e, this.setCurrentAnimation("left")) : a > this.pos.x + 3 * this.width / 4 && (this.vel.x += this.accel.x * me.timer.tick * e, this.setCurrentAnimation("right"));
            b < this.pos.y + this.height / 4 ? (this.vel.y -= this.accel.y * me.timer.tick * c, e < c && this.setCurrentAnimation("up")) : b > this.pos.y + 3 * this.height / 4 && (this.vel.y += this.accel.y * me.timer.tick * c, e < c && this.setCurrentAnimation("down"));
        } else
            if (me.input.isKeyPressed("menu")) {
            game.dialog(["Some text"]);
        }
        else if (me.input.isKeyPressed('left')) {
            this.vel.x -= this.accel.x * me.timer.tick;
            this.setCurrentAnimation('left');
            this.direction = 'left';
        }
        else if (me.input.isKeyPressed('right')) {
            this.vel.x += this.accel.x * me.timer.tick;
            this.setCurrentAnimation('right');
            this.direction = 'right';
        }

        if (me.input.isKeyPressed('up')) {
            this.vel.y = -this.accel.y * me.timer.tick;
            this.setCurrentAnimation('up');
            this.direction = 'up';
        }
        else if (me.input.isKeyPressed('down')) {
            this.vel.y = this.accel.y * me.timer.tick;
            this.setCurrentAnimation('down');
            this.direction = 'down';
        }

        // check & update player movement
        var updated = this.updateMovement();

        if (this.vel.y == 0 && this.vel.x == 0) {
            this.setCurrentAnimation('stand-' + this.direction);
            if (hadSpeed) {
                updated = true;
            }
        }
        // check for collision
        me.game.collide(this);

        // update animation
        if (updated) {
            // update object animation
            this.parent(this);
        }
        return updated;
    }

});