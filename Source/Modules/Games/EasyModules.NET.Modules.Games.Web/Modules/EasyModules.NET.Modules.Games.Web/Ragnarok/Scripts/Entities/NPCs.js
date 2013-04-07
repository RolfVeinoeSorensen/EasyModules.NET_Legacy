
messages = {};
var Npc = me.ObjectEntity.extend({
    init: function (x, y, settings) {

        if (!settings.spritewidth && !settings.spriteheight) {
            settings.spritewidth = 32;
            settings.spriteheight = 48;
        }
        settings.collidable = true;

        this.moves = true;
        if ("moves" in settings) {
            this.moves = settings.moves;
        }
        this.parent(x, y, settings);

        if (this.moves == false) {
            this.animationspeed = me.sys.fps / 2;
        }

        this.gravity = 0;
        this.friction = 0.5;
        this.accel.x = 1;
        this.accel.y = 1;
        this.stop = false;

        this.minX = x;
        this.minY = y;
        this.maxX = x + settings.width - settings.spritewidth;
        this.maxY = y + settings.height - settings.spriteheight;

        this.destX = randomInt(this.minX, this.maxX);
        this.destY = randomInt(this.minY, this.maxY);

        if (!messages[this.GUID]) {
            var dispText = settings.text,
                face = settings.icon;

            messages[this.GUID] = {
                'text': dispText,
                'face': face
            };
        }

        if (this.moves) {
            this.direction = 'right';
            this.setDirection();
        }
    },

    setDirection: function () {
        this.distanceX = Math.abs(this.destX - this.pos.x);
        this.distanceY = Math.abs(this.destY - this.pos.y);

        if (this.distanceX > this.distanceY) {
            this.direction = this.destX < this.pos.x ? 'left' : 'right';
        } else {
            this.direction = this.destY < this.pos.y ? 'up' : 'down';
        }
    },

    setAnimations: function (animationArray) {
        var curObj = this;
        $.each(animationArray, function (animationName, indexes) {
            curObj.addAnimation(animationName, indexes);
        });
    },
    onCollision: function(res, obj) {
 
        // res.y >0 means touched by something on the bottom
        // which mean at top position for this one
        if (this.alive && (res.y > 0) && obj.falling) {
            this.flicker(45);
        }
    },
    update: function () {
        if (this.moves) {
            this.setCurrentAnimation('run-' + this.direction);
        } else {
            this.setCurrentAnimation('look-around');
        }

        this.updateMovement();
        this.parent(this);

        if (!this.stop && this.moves) {
            if (moveObject(this)) {
                this.destX = randomInt(this.minX, this.maxX);
                this.destY = randomInt(this.minY, this.maxY);
                this.setDirection();
            }
        }

        /**
         * show message box
         *
         * @type {*}
         */
        var res = me.game.collide(this);
        if (res) {
            if (res.obj.name == 'mainplayer' && !messageShowing) {
                if (this.moves) {
                    this.setCurrentAnimation('stand-' + this.direction);
                } else {
                    this.setCurrentAnimation('standing');
                }
                this.stop = true;
                if (!messageShowing) {
                    showMessageLayer(this.GUID);
                }
                messageCollides[this.GUID] = true;
            }
        } else {
            messageCollides[this.GUID] = false;
        }

        if (messageShowing) {
            var isShowing = false;
            $.each(messageCollides, function (key, showing) {
                if (showing) {
                    isShowing = true;
                }
            });
            if (!isShowing) {
                this.stop = false;
                hideMessageLayer();
            }
        }

        return true;
    }
});
var messageCollides = {},
    messageShowTimeout = null;

var InfoBoard = me.ObjectEntity.extend({
    init: function (x, y, settings) {

        settings.image = 'metatiles32x32';
        settings.spritewidth = 32;
        settings.spriteheight = 32;

        this.parent(x, y, settings);

        this.addAnimation('empty', [0]);
        this.updateColRect(0, 32, 0, 38);
        this.setCurrentAnimation('empty');
        this.collidable = true;

        if (!messages[this.GUID]) {
            var dispText = settings.text,
                face = settings.icon;

            messages[this.GUID] = {
                'text': dispText,
                'face': face
            };
        }
    },

    update: function () {
        var res = me.game.collide(this);
        if (res) {
            if (res.obj.name == 'mainplayer') {
                if (!messageShowing) {
                    showMessageLayer(this.GUID);
                }
                messageCollides[this.GUID] = true;
            }
        } else {
            messageCollides[this.GUID] = false;
        }

        if (messageShowing) {
            var isShowing = false;
            $.each(messageCollides, function (key, showing) {
                if (showing) {
                    isShowing = true;
                }
            });
            if (!isShowing) {
                hideMessageLayer();
            }
        }
    }
});
/**
 * The "Labyrinth Man"
 *
 * @type {*}
 */
var LabyrinthMan = Npc.extend({
    init: function (x, y, settings) {
        settings.image = 'player_male_base';
        this.parent(x, y, settings);
        this.updateColRect(-10, 45, -10, 55);
        this.setAnimations(spriteAnimationSheetSmall);
    }
});


/**
 * add all NPCs to the entity pool
 */
function addAllNpcsToPool() {
    me.entityPool.add('LabyrinthMan', LabyrinthMan);

}
/**
 * Displays a message from the message object
 * @param npcName
 */
var messageShowing = false;

/**
 * scroll longer messages
 */
function scrollMessage() {
    if (($('.npcText').scrollTop() + $('.npcText').height()) <= $('#hiddenText').height()) {
        $('.npcText').animate({ scrollTop: $('.npcText').scrollTop() + $('.npcText').height() / 2 }, 250);
    } else {
        $('.npcText').animate({ scrollTop: 0 }, 250);
    }
}

function showMessageLayer(npcName) {
    if (!messageShowing) {
        $('.npcImage').attr({
            'src': 'data/graphics/faces/' + messages[npcName]['face'],
            'alt': messages[npcName]['face']
        });
        $('.npcText,#hiddenText').html(messages[npcName]['text']);

        $('#messageLayer').fadeIn(250, function () {
            $('.npcText').scrollTop(0);
        });
        messageShowing = true;
    }
}

/**
 * Hide message layer
 */
function hideMessageLayer() {
    $('.npcText').scrollTop(0);
    $('#messageLayer').fadeOut();
    messageShowing = false;
}
function randomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}
function moveObject(object) {

    var dx = Math.abs(object.destX - object.pos.x), sx = object.pos.x < object.destX ? object.accel.x : -object.accel.x,
        dy = -Math.abs(object.destY - object.pos.y), sy = object.pos.y < object.destY ? object.accel.y : -object.accel.y,
        err = dx + dy, e2 = 0;

    if (object.pos.x == object.destX && object.pos.y == object.destY) {
        return true;
    }

    e2 = 2 * err;
    if (e2 > dy) {
        err += dy;
        object.pos.x += sx;
    }

    if (e2 < dx) {
        err += dx;
        object.pos.y += sy;
    }

    return false;
}