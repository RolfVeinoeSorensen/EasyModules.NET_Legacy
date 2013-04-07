var jsApp = {
    onload: function () {
        me.video.init("jsapp", 640, 480, !0, "auto", !0) ? (me.audio.init("mp3,ogg"), me.loader.onload = this.loaded.bind(this), me.loader.preload(g_resources), me.state.change(me.state.LOADING)) : alert("Sorry but your browser does not support html 5 canvas.")
    },
    loaded: function () {
        me.state.set(me.state.CREDITS, new NineScreen);
        me.state.set(me.state.MENU, new MenuScreen);
        me.state.set(me.state.READY, new InstructionsScreen);
        me.state.set(me.state.PLAY, new PlayScreen);
        me.state.set(me.state.GAMEOVER,
        new GameOverScreen);
        me.state.set(me.state.GAME_END, new LevelCompleteScreen);
        me.state.transition("fade", "#000000", 200);
        me.state.setTransition(me.state.GAMEOVER, !1);
        me.state.setTransition(me.state.GAME_END, !1);
        me.entityPool.add("mainPlayer", PlayerEntity);
        me.entityPool.add("randomVillager", VillagerEntity);
        me.entityPool.add("ZombieEntity", ZombieEntity);
        me.input.bindKey(me.input.KEY.LEFT, "left");
        me.input.bindKey(me.input.KEY.RIGHT, "right");
        me.input.bindKey(me.input.KEY.UP, "up");
        me.input.bindKey(me.input.KEY.DOWN,
            "down");
        me.gamestat.add("zombie_alert_mode", "off");
        me.gamestat.add("level", 1);
        me.audio.playTrack("game_soundtrack");
        me.state.onPause = function () {
            var a = me.video.getScreenFrameBuffer(),
                b = me.video.applyRGBFilter(me.video.getScreenCanvas(), "b&w");
            a.drawImage(b.canvas, 0, 0, b.canvas.width / me.sys.scale.x, b.canvas.height / me.sys.scale.x);
            a.fillStyle = "rgba(0, 0, 0, 0.8)";
            a.fillRect(0, me.video.getHeight() / 2 - 30, me.video.getWidth(), 60);
            b = new me.BitmapFont("font", 64, 0.75);
            b.set("left");
            var c = b.measureText("P A U S E");
            b.draw(a, "P A U S E", me.video.getWidth() / 2 - c.width / 2, me.video.getHeight() / 2 - c.height / 2);
            me.video.blitSurface()
        };
        me.state.change(me.state.CREDITS)
    }
};
window.onReady(function () {
    jsApp.onload()
});
var mainPlayer = null,
    gamePaused = !1,
    demo = !1,
    PlayerEntity = me.ObjectEntity.extend({
        init: function (a, b, c) {
            this.parent(a, b, c);
            this.setVelocity(3, 3);
            this.gravity = 0;
            this.addAnimation("go_left", [9, 10, 11]);
            this.addAnimation("go_right", [3, 4, 5]);
            this.addAnimation("go_up", [0, 1, 2]);
            this.addAnimation("go_down", [6, 7, 8]);
            this.setCurrentAnimation("go_down");
            demo || me.game.viewport.follow(this.pos, me.game.viewport.AXIS.BOTH);
            this.updateColRect(8, 20, 40, 10);
            mainPlayer = this
        },
        update: function () {
            if (gamePaused) return !1;
            if (demo) return this.pos.x += this.accel.x, this.setCurrentAnimation("go_right"), me.game.collide(this), this.parent(this), !0;
            "on" == me.gamestat.getItemValue("zombie_alert_mode") && (me.game.HUD.updateItemValue("life", -0.1 - 0.01 * me.gamestat.getItemValue("level")), 0 == me.game.HUD.getItemValue("life") && (me.gamestat.setValue("zombie_alert_mode", "off"), me.state.change(me.state.GAMEOVER)));
            this.vel.x = 0;
            this.vel.y = 0;
            if (me.input.isKeyPressed("touch")) {
                var a = me.game.viewport.pos.x + me.input.mouse.pos.x,
                    b = me.game.viewport.pos.y + me.input.mouse.pos.y,
                    c = Math.abs(a - this.pos.x),
                    d = Math.abs(b - this.pos.y),
                    e = 1.25 * c / (c + d),
                    c = 1.25 * d / (c + d);
                a > this.pos.x + this.width / 4 && a < this.pos.x + 3 * this.width / 4 && (e = 0, c = 1);
                b > this.pos.y + this.height / 4 && b < this.pos.y + 3 * this.height / 4 && (e = 1, c = 0);
                a < this.pos.x + this.width / 4 ? (this.vel.x -= this.accel.x * me.timer.tick * e, this.setCurrentAnimation("go_left")) : a > this.pos.x + 3 * this.width / 4 && (this.vel.x += this.accel.x * me.timer.tick * e, this.setCurrentAnimation("go_right"));
                b < this.pos.y + this.height / 4 ? (this.vel.y -= this.accel.y * me.timer.tick * c, e < c && this.setCurrentAnimation("go_up")) : b > this.pos.y + 3 * this.height / 4 && (this.vel.y += this.accel.y * me.timer.tick * c, e < c && this.setCurrentAnimation("go_down"))
            } else me.input.isKeyPressed("left") ? (this.vel.x -= this.accel.x * me.timer.tick, this.setCurrentAnimation("go_left")) : me.input.isKeyPressed("right") && (this.vel.x += this.accel.x * me.timer.tick, this.setCurrentAnimation("go_right")), me.input.isKeyPressed("up") ? (this.vel.x ? (this.vel.x *= 0.75, this.vel.y -= 0.75 * this.accel.y * me.timer.tick) : this.vel.y -= this.accel.y * me.timer.tick,
            this.setCurrentAnimation("go_up")) : me.input.isKeyPressed("down") && (this.vel.x ? (this.vel.x *= 0.75, this.vel.y += 0.75 * this.accel.y * me.timer.tick) : this.vel.y += this.accel.y * me.timer.tick, this.setCurrentAnimation("go_down"));
            this.updateMovement();
            me.game.collide(this);
            return 0 != this.vel.x || 0 != this.vel.y ? (this.parent(this), !0) : !1
        }
    }),
    VillagerEntity = me.ObjectEntity.extend({
        init: function (a, b) {
            var c = {
                image: "villager_girl",
                spriteheight: 48,
                spritewidth: 36,
                name: "randomVillager"
            };
            switch (Number.prototype.random(1, 5)) {
                case 1:
                    c.image =
                        "villager_girl";
                    this.gender = "female";
                    break;
                case 2:
                    c.image = "villager_boy";
                    this.gender = "male";
                    break;
                case 3:
                    c.image = "villager_old";
                    this.gender = "male";
                    break;
                case 4:
                    c.image = "villager_grandma";
                    this.gender = "female";
                    break;
                case 5:
                    c.image = "villager_panda";
                    this.gender = "male";
                    break;
                default:
                    c.image = "villager_girl", this.gender = "female"
            }
            this.parent(a, b, c);
            this.setVelocity(1, 1);
            this.gravity = 0;
            this.collidable = !0;
            this.type = me.game.ACTION_OBJECT;
            this.addAnimation("go_left", [9, 10, 11]);
            this.addAnimation("go_right", [3,
            4, 5]);
            this.addAnimation("go_up", [0, 1, 2]);
            this.addAnimation("go_down", [6, 7, 8]);
            this.setCurrentAnimation("go_down");
            this.updateColRect(8, 20, 30, 20)
        },
        update: function () {
            if (gamePaused || demo) return !1;
            this.frame++;
            if ("off" == me.gamestat.getItemValue("zombie_alert_mode")) {
                if (360 < this.frame) {
                    this.frame = Number.prototype.random(0, 120);
                    for (var a = Number.prototype.random(0, 3) ; this.direction == a;) a = Number.prototype.random(0, 3);
                    this.direction = a;
                    switch (this.direction) {
                        case 1:
                            this.setCurrentAnimation("go_up");
                            break;
                        case 2:
                            this.setCurrentAnimation("go_left");
                            break;
                        case 3:
                            this.setCurrentAnimation("go_right");
                            break;
                        default:
                            this.setCurrentAnimation("go_down")
                    }
                } else 180 < this.frame && (this.vel.x = 0, this.vel.y = 0);
                if (180 >= this.frame) switch (this.direction) {
                    case 1:
                        this.vel.x = 0;
                        this.vel.y += -this.accel.y * me.timer.tick;
                        break;
                    case 2:
                        this.vel.x += -this.accel.x * me.timer.tick;
                        this.vel.y = 0;
                        break;
                    case 3:
                        this.vel.x += this.accel.x * me.timer.tick;
                        this.vel.y = 0;
                        break;
                    default:
                        this.vel.x = 0, this.vel.y += this.accel.y * me.timer.tick
                }
                this.updateMovement();
                if (0 != this.vel.x || 0 != this.vel.y) return this.parent(this), !0;
                180 >= this.frame && (this.frame = Number.prototype.random(180, 300))
            } else if (this.vel.y = 0, this.vel.x = 0, 128 > mainPlayer.pos.distance(this.pos) && !this.is_escaping && (this.is_escaping = !0, this.frame = 0), this.has_no_hope) {
                switch (this.direction) {
                    case 1:
                        this.vel.y += -this.accel.y * me.timer.tick;
                        this.setCurrentAnimation("go_up");
                        break;
                    case 2:
                        this.vel.x += -this.accel.x * me.timer.tick;
                        this.setCurrentAnimation("go_left");
                        break;
                    case 3:
                        this.vel.x += this.accel.x * me.timer.tick;
                        this.setCurrentAnimation("go_right");
                        break;
                    default:
                        this.vel.y += this.accel.y * me.timer.tick, this.setCurrentAnimation("go_down")
                }
                60 <= this.frame && (this.has_no_hope = this.is_escaping = !1, this.frame = Number.prototype.random(0, 120), this.direction = Number.prototype.random(0, 3));
                this.updateMovement();
                if (0 != this.vel.x || 0 != this.vel.y) return this.parent(this), !0
            } else if (this.is_escaping) {
                60 <= this.frame && (this.is_escaping = !1, this.frame = Number.prototype.random(0, 120), this.direction = Number.prototype.random(0, 3));
                mainPlayer.pos.x < this.pos.x ? (this.vel.x += this.accel.x * me.timer.tick,
                this.setCurrentAnimation("go_right")) : (this.vel.x += -this.accel.x * me.timer.tick, this.setCurrentAnimation("go_left"));
                this.updateMovement();
                if (0 != this.vel.x || 0 != this.vel.y) return this.parent(this), !0;
                mainPlayer.pos.y < this.pos.y ? (this.vel.y += this.accel.y * me.timer.tick, this.setCurrentAnimation("go_down")) : (this.vel.y += -this.accel.y * me.timer.tick, this.setCurrentAnimation("go_up"));
                this.updateMovement();
                if (0 != this.vel.x || 0 != this.vel.y) return this.parent(this), !0;
                this.has_no_hope = !0;
                this.frame = 0;
                var a = Math.abs(mainPlayer.pos.x - this.pos.x),
                    b = Math.abs(mainPlayer.pos.y - this.pos.y);
                this.direction = a < b ? mainPlayer.pos.x < this.pos.x ? 2 : 3 : mainPlayer.pos.y < this.pos.y ? 1 : 0
            } else {
                180 < this.frame && (this.frame = Number.prototype.random(0, 120), this.direction = Number.prototype.random(0, 3));
                switch (this.direction) {
                    case 1:
                        this.vel.y += -this.accel.y * me.timer.tick;
                        this.setCurrentAnimation("go_up");
                        break;
                    case 2:
                        this.vel.x += -this.accel.x * me.timer.tick;
                        this.setCurrentAnimation("go_left");
                        break;
                    case 3:
                        this.vel.x += this.accel.x * me.timer.tick;
                        this.setCurrentAnimation("go_right");
                        break;
                    default:
                        this.vel.y += this.accel.y * me.timer.tick, this.setCurrentAnimation("go_down")
                }
                this.updateMovement();
                if (0 != this.vel.x || 0 != this.vel.y) return this.parent(this), !0;
                this.direction = 2 > this.direction ? Number.prototype.random(2, 3) : Number.prototype.random(0, 1);
                switch (this.direction) {
                    case 1:
                        this.vel.y += -this.accel.y * me.timer.tick;
                        this.setCurrentAnimation("go_up");
                        break;
                    case 2:
                        this.vel.x += -this.accel.x * me.timer.tick;
                        this.setCurrentAnimation("go_left");
                        break;
                    case 3:
                        this.vel.x += this.accel.x * me.timer.tick;
                        this.setCurrentAnimation("go_right");
                        break;
                    default:
                        this.vel.y += this.accel.y * me.timer.tick, this.setCurrentAnimation("go_down")
                }
                this.updateMovement();
                if (0 != this.vel.x || 0 != this.vel.y) return this.parent(this), !0
            }
            return !1
        },
        onCollision: function () {
            me.game.add(new ZombieEntity(this.pos.x, this.pos.y, this.direction), this.z);
            me.game.remove(this, !0);
            me.game.sort();
            if (!demo) {
                if ("off" == me.gamestat.getItemValue("zombie_alert_mode")) {
                    for (var a = me.game.getEntityByName("randomVillager"), b = 0; b < a.length; b++) a[b] != this && a[b].setVelocity(2, 2);
                    mainPlayer.setVelocity(4, 4);
                    me.gamestat.setValue("zombie_alert_mode", "on")
                }
                "male" == this.gender ? me.audio.play("scream_boy") : Number.prototype.random(0, 1) ? me.audio.play("scream_girl") : me.audio.play("scream_girl_2");
                me.game.HUD.updateItemValue("life", 15);
                this.check_end()
            }
        },
        frame: Number.prototype.random(330, 360),
        direction: 4,
        is_escaping: !1,
        has_no_hope: !1,
        check_end: function () {
            0 == me.game.getEntityByName("randomVillager").length && (0 == me.game.HUD.getItemValue("life") ? (me.gamestat.setValue("zombie_alert_mode",
                "off"), me.state.change(me.state.GAMEOVER)) : (me.gamestat.setValue("zombie_alert_mode", "off"), me.gamestat.updateValue("level", 1), me.state.change(me.state.GAME_END)))
        }
    }),
    ZombieEntity = me.ObjectEntity.extend({
        init: function (a, b, c) {
            this.parent(a, b, {
                image: "zombie",
                spriteheight: 48,
                spritewidth: 36
            });
            c && (this.direction = c);
            this.setVelocity(0.5, 0.5);
            this.gravity = 0;
            this.collidable = !0;
            this.type = me.game.ACTION_OBJECT;
            this.addAnimation("go_left", [9, 10, 11]);
            this.addAnimation("go_right", [3, 4, 5]);
            this.addAnimation("go_up", [0, 1, 2]);
            this.addAnimation("go_down", [6, 7, 8]);
            switch (this.direction) {
                case 1:
                    this.setCurrentAnimation("go_up");
                    break;
                case 2:
                    this.setCurrentAnimation("go_left");
                    break;
                case 3:
                    this.setCurrentAnimation("go_right");
                    break;
                default:
                    this.setCurrentAnimation("go_down")
            }
            this.updateColRect(8, 20, 45, 3)
        },
        update: function () {
            if (gamePaused || demo) return !1;
            this.frame++;
            if (180 < this.frame) {
                this.frame = Number.prototype.random(0, 120);
                for (var a = Number.prototype.random(0, 3) ; this.direction == a;) a = Number.prototype.random(0, 3);
                this.direction = a;
                switch (this.direction) {
                    case 1:
                        this.setCurrentAnimation("go_up");
                        break;
                    case 2:
                        this.setCurrentAnimation("go_left");
                        break;
                    case 3:
                        this.setCurrentAnimation("go_right");
                        break;
                    default:
                        this.setCurrentAnimation("go_down")
                }
            }
            if (180 >= this.frame) switch (this.direction) {
                case 1:
                    this.vel.x = 0;
                    this.vel.y += -this.accel.y * me.timer.tick;
                    break;
                case 2:
                    this.vel.x += -this.accel.x * me.timer.tick;
                    this.vel.y = 0;
                    break;
                case 3:
                    this.vel.x += this.accel.x * me.timer.tick;
                    this.vel.y = 0;
                    break;
                default:
                    this.vel.x = 0, this.vel.y += this.accel.y * me.timer.tick
            }
            this.updateMovement();
            if (0 != this.vel.x || 0 != this.vel.y) return this.parent(this), !0;
            180 >= this.frame && (this.frame = 180);
            return !1
        },
        frame: 180,
        direction: 0
    });
var g_resources = [{
    name: "introbg",
    type: "image",
    src: "data/nine_web_logo.png"
}, {
    name: "metatiles32x32",
    type: "image",
    src: "data/map_tiles/metatiles32x32.png"
}, {
    name: "TileA2",
    type: "image",
    src: "data/map_tiles/TileA2.png"
}, {
    name: "TileB",
    type: "image",
    src: "data/map_tiles/TileB.png"
}, {
    name: "TileE",
    type: "image",
    src: "data/map_tiles/TileE.png"
}, {
    name: "village",
    type: "tmx",
    src: "data/maps/village.tmx"
}, {
    name: "vampire",
    type: "image",
    src: "data/characters/vampire.png"
}, {
    name: "villager_girl",
    type: "image",
    src: "data/characters/villager_girl.png"
}, {
    name: "villager_boy",
    type: "image",
    src: "data/characters/villager_boy.png"
}, {
    name: "villager_old",
    type: "image",
    src: "data/characters/villager_old.png"
}, {
    name: "villager_grandma",
    type: "image",
    src: "data/characters/villager_grandma.png"
}, {
    name: "villager_panda",
    type: "image",
    src: "data/characters/villager_panda.png"
}, {
    name: "zombie",
    type: "image",
    src: "data/characters/zombie.png"
}, {
    name: "font",
    type: "image",
    src: "data/fonts/vampire_1.png"
}, {
    name: "menu_btn",
    type: "image",
    src: "data/ui/menu_button.png"
}, {
    name: "sound_off",
    type: "image",
    src: "data/ui/sound_off.png"
}, {
    name: "sound_on",
    type: "image",
    src: "data/ui/sound_on.png"
}, {
    name: "empty",
    type: "image",
    src: "data/ui/empty_large.png"
}, {
    name: "game_soundtrack",
    type: "audio",
    src: "data/audio/",
    channel: 1
}, {
    name: "scream_boy",
    type: "audio",
    src: "data/audio/",
    channel: 2
}, {
    name: "scream_girl",
    type: "audio",
    src: "data/audio/",
    channel: 2
}, {
    name: "scream_girl_2",
    type: "audio",
    src: "data/audio/",
    channel: 2
}];
var MenuScreen = me.ScreenObject.extend({
    init: function () {
        this.parent(!0)
    },
    onResetEvent: function () {
        this.font4x = new me.BitmapFont("font", 64);
        this.font4x.set("left");
        this.font1x = new me.BitmapFont("font", 64, 0.25);
        this.font1x.set("left");
        me.input.bindKey(me.input.KEY.ENTER, "enter");
        me.input.bindMouse(me.input.mouse.LEFT, me.input.KEY.ENTER);
        me.levelDirector.loadLevel("village");
        me.game.remove(mainPlayer, !0);
        me.game.viewport.reset(200, 30);
        me.game.add(new soundButton(10, 10), 4)
    },
    update: function () {
        me.input.isKeyPressed("enter") && me.state.change(me.state.READY);
        return !1
    },
    draw: function (a) {
        this.font4x.draw(a, "VAMPIRE", 200 + me.video.getWidth() / 2 - this.font4x.measureText("VAMPIRE").width / 2, 90);
        this.font4x.draw(a, "FEAST", 200 + me.video.getWidth() / 2 - this.font4x.measureText("FEAST").width / 2, 190);
        this.font1x.draw(a, "MUSIC BY DAN-O AT DANOSONGS.COM", 200 + me.video.getWidth() / 2 - this.font1x.measureText("MUSIC BY DAN-O AT DANOSONGS.COM").width / 2, 480)
    },
    onDestroyEvent: function () {
        me.input.unbindKey(me.input.KEY.ENTER);
        me.input.unbindMouse(me.input.mouse.LEFT)
    }
}),
    InstructionsScreen = me.ScreenObject.extend({
        init: function () {
            this.parent(!0)
        },
        onResetEvent: function () {
            demo = !0;
            this.font2x = new me.BitmapFont("font", 64, 0.5);
            this.font2x.set("left");
            me.input.bindKey(me.input.KEY.ENTER, "enter");
            me.input.bindMouse(me.input.mouse.LEFT, me.input.KEY.ENTER);
            me.game.add(new me.ColorLayer("background", "#78AB46", -1));
            me.game.add(new soundButton(10, 10), 4);
            me.game.add(new PlayerEntity(120, 150, {
                image: "vampire",
                spriteheight: 48,
                spritewidth: 36,
                name: "mainPlayer"
            }), 4);
            me.game.add(new VillagerEntity(380,
            150), 4);
            me.game.sort();
            this.timecounter = 0
        },
        update: function () {
            me.input.isKeyPressed("enter") && me.state.change(me.state.PLAY);
            240 > this.timecounter ? this.timecounter++ : me.state.change(me.state.PLAY);
            return !0
        },
        draw: function (a) {
            this.font2x.draw(a, "BITE THE VILLAGERS", me.video.getWidth() / 2 - this.font2x.measureText("BITE THE VILLAGERS").width / 2, 320);
            this.font2x.draw(a, "BEFORE TIME IS UP", me.video.getWidth() / 2 - this.font2x.measureText("BEFORE TIME IS UP").width / 2, 380)
        },
        onDestroyEvent: function () {
            me.input.unbindKey(me.input.KEY.ENTER);
            me.input.unbindMouse(me.input.mouse.LEFT);
            demo = !1
        }
    }),
    PlayScreen = me.ScreenObject.extend({
        init: function () {
            this.parent(!0)
        },
        onResetEvent: function () {
            me.levelDirector.loadLevel("village");
            var a = me.gamestat.getItemValue("level");
            me.game.addHUD(0, 0, 640, 80);
            me.game.HUD.addItem("levelitem", new HUDLevelObject(200, 10, a));
            me.game.HUD.addItem("life", new HUDLifeObject(360, 10, 100));
            me.game.add(new soundButton(10, 10), 100);
            me.game.add(new gobackButton(90, 10), 100);
            me.input.bindKey(me.input.KEY.ENTER, "touch");
            me.input.bindMouse(me.input.mouse.LEFT,
            me.input.KEY.ENTER);
            for (var b = 0, c = b = 0; c < 2 * a + 1; c++) {
                b = Number.prototype.random(1, 5);
                switch (b) {
                    case 1:
                        b = Number.prototype.random(5, 28);
                        random_y = Number.prototype.random(3, 6);
                        break;
                    case 2:
                        b = Number.prototype.random(32, 38);
                        random_y = Number.prototype.random(2, 13);
                        break;
                    case 3:
                        b = Number.prototype.random(21, 28);
                        random_y = Number.prototype.random(7, 17);
                        break;
                    case 4:
                        b = Number.prototype.random(13, 18);
                        random_y = Number.prototype.random(10, 17);
                        break;
                    case 5:
                        b = Number.prototype.random(0, 10);
                        random_y = Number.prototype.random(10,
                        13);
                        break;
                    default:
                        b = Number.prototype.random(5, 28), random_y = Number.prototype.random(3, 6)
                }
                me.game.add(new VillagerEntity(32 * b, 32 * random_y), mainPlayer.z)
            }
            me.game.sort()
        },
        onDestroyEvent: function () {
            me.game.disableHUD();
            me.input.unbindKey(me.input.KEY.ENTER);
            me.input.unbindMouse(me.input.mouse.LEFT)
        },
        draw: function (a) {
            if (gamePaused) {
                var b = new me.BitmapFont("font", 64, 0.375);
                b.set("left");
                b.draw(a, "RESUME", 150 + me.game.viewport.pos.x, 240 + me.game.viewport.pos.y);
                b.draw(a, "QUIT", 370 + me.game.viewport.pos.x, 240 + me.game.viewport.pos.y)
            }
        }
    }),
    NineScreen = me.ScreenObject.extend({
        init: function () {
            this.parent(!0)
        },
        onResetEvent: function () {
            this.nineBackground = me.loader.getImage("introbg");
            this.timecounter = 0;
            me.input.bindKey(me.input.KEY.ENTER, "enter", !0);
            me.input.bindMouse(me.input.mouse.LEFT, me.input.KEY.ENTER)
        },
        update: function () {
            me.input.isKeyPressed("enter") && me.state.change(me.state.MENU);
            180 > this.timecounter ? this.timecounter++ : me.state.change(me.state.MENU);
            return !1
        },
        draw: function (a) {
            a.fillStyle = "rgba(0,0,0, 0.9)";
            a.fillRect(0, 0, 640, 480);
            a.drawImage(this.nineBackground, me.video.getWidth() / 2 - this.nineBackground.width / 2, me.video.getHeight() / 2 - this.nineBackground.height / 2)
        },
        onDestroyEvent: function () {
            me.input.unbindKey(me.input.KEY.ENTER);
            me.input.unbindMouse(me.input.mouse.LEFT)
        }
    }),
    LevelCompleteScreen = me.ScreenObject.extend({
        init: function () {
            this.parent(!0)
        },
        onResetEvent: function () {
            this.font4x = new me.BitmapFont("font", 64);
            this.font4x.set("left");
            this.font2x = new me.BitmapFont("font", 64, 0.5);
            this.font2x.set("left");
            this.background = me.video.applyRGBFilter(me.video.getScreenCanvas(), "b&w");
            me.input.bindKey(me.input.KEY.ENTER, "enter");
            me.input.bindMouse(me.input.mouse.LEFT, me.input.KEY.ENTER)
        },
        update: function () {
            me.input.isKeyPressed("enter") && me.state.change(me.state.PLAY);
            return !1
        },
        draw: function (a) {
            a.drawImage(this.background.canvas, 0, 0, this.background.canvas.width / me.sys.scale.x, this.background.canvas.height / me.sys.scale.x);
            this.font4x.draw(a, "LEVEL", me.video.getWidth() / 2 - this.font4x.measureText("LEVEL").width / 2, 150);
            this.font4x.draw(a, "COMPLETE!", me.video.getWidth() / 2 - this.font4x.measureText("COMPLETE!").width / 2, 240);
            this.font2x.draw(a, "GO TO LEVEL " + me.gamestat.getItemValue("level"), me.video.getWidth() / 2 - this.font2x.measureText("GO TO LEVEL " + me.gamestat.getItemValue("level")).width / 2, 380)
        },
        onDestroyEvent: function () {
            me.input.unbindKey(me.input.KEY.ENTER);
            me.input.unbindMouse(me.input.mouse.LEFT)
        }
    }),
    GameOverScreen = me.ScreenObject.extend({
        init: function () {
            this.parent(!0)
        },
        onResetEvent: function () {
            this.font4x = new me.BitmapFont("font", 64);
            this.font4x.set("left");
            me.gamestat.setValue("level", 1);
            this.background = me.video.applyRGBFilter(me.video.getScreenCanvas(), "b&w");
            me.input.bindKey(me.input.KEY.ENTER, "enter");
            me.input.bindMouse(me.input.mouse.LEFT, me.input.KEY.ENTER)
        },
        update: function () {
            me.input.isKeyPressed("enter") && me.state.change(me.state.MENU);
            return !1
        },
        draw: function (a) {
            a.drawImage(this.background.canvas, 0, 0, this.background.canvas.width / me.sys.scale.x, this.background.canvas.height / me.sys.scale.x);
            this.font4x.draw(a, "GAME OVER!", 3, 200)
        },
        onDestroyEvent: function () {
            me.input.unbindKey(me.input.KEY.ENTER);
            me.input.unbindMouse(me.input.mouse.LEFT)
        }
    });
var soundButton = me.GUI_Object.extend({
    init: function (a, b) {
        settings = {};
        settings.image = me.audio.isAudioEnable() ? "sound_off" : "sound_on";
        settings.spritewidth = 70;
        settings.spriteheight = 70;
        this.parent(a, b, settings)
    },
    onClick: function () {
        me.audio.isAudioEnable() ? (me.audio.pauseTrack(), me.audio.disable(), this.image = me.loader.getImage("sound_on")) : (me.audio.enable(), me.audio.resumeTrack(), this.image = me.loader.getImage("sound_off"));
        return !1
    }
}),
    gobackButton = me.GUI_Object.extend({
        init: function (a, b) {
            settings = {
                image: "menu_btn",
                spritewidth: 70,
                spriteheight: 70
            };
            this.parent(a, b, settings)
        },
        onClick: function () {
            gamePaused = !gamePaused;
            me.game.resumebtn = new menuButton(150, 200, "resume");
            me.game.quitbtn = new menuButton(340, 200, "quit");
            me.game.add(me.game.resumebtn, 100);
            me.game.add(me.game.quitbtn, 100);
            me.game.sort();
            return !1
        }
    }),
    menuButton = me.GUI_Object.extend({
        init: function (a, b, c) {
            this.id = c;
            settings = {
                image: "empty",
                spritewidth: 150,
                spriteheight: 100
            };
            this.parent(a, b, settings)
        },
        onClick: function () {
            gamePaused = !1;
            "resume" == this.id ? (me.game.remove(me.game.resumebtn),
            me.game.remove(me.game.quitbtn)) : me.state.change(me.state.MENU);
            return !1
        }
    }),
    HUDLevelObject = me.HUD_Item.extend({
        init: function (a, b, c) {
            this.parent(a, b, c);
            this.font = new me.BitmapFont("font", 64, 0.3);
            this.font.set("left")
        },
        draw: function (a, b, c) {
            this.font.draw(a, "LEVEL " + this.value, this.pos.x + b, this.pos.y + c)
        }
    }),
    HUDLifeObject = me.HUD_Item.extend({
        init: function (a, b, c) {
            this.parent(a, b, c);
            this.font = new me.BitmapFont("font", 64, 0.3);
            this.font.set("left");
            this.maxhp = c
        },
        update: function (a) {
            me.game.frozen || this.set((this.value + a).clamp(0, this.maxhp));
            return !0
        },
        draw: function (a, b, c) {
            this.font.draw(a, "TIME ", this.pos.x + b, this.pos.y + c);
            var d = Math.round(180 * (this.value / this.maxhp));
            a.strokeStyle = "rgba(0,0,0, 0.9)";
            a.strokeRect(this.pos.x + b + 80, this.pos.y + c, 180, 20);
            a.fillStyle = 150 < d ? "rgba(0,200,0, 0.9)" : 75 < d ? "rgba(255,165,0, 0.9)" : "rgba(255,69,0, 0.9)";
            a.fillRect(this.pos.x + b + 81, this.pos.y + c + 1, d - 1, 18)
        }
    });