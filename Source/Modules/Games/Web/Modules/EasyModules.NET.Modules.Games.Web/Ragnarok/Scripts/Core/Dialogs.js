﻿/* Dialog box */
game.dialog = function dialog(script, callback) {
    var background = document.createElement("img");
    background.src = gamePath + "Screens/dialog.png";
    background.width = 577;
    background.height = 96;
    // game.getImage("dialog");
    var font = new me.Font("Tahoma", 18, "#eee");

    game.modal = true;

    var dialog_box = new game.DialogObject(
        // x, y
        10,
        450,

        // Background image.
        background,

        // Text to display.
        script,

        // width, height.
        577,
        96,

        // Text offset x, y.
        12,
        12,

        // Font to display it in.
        font,

        // Which key to watch for.
        "touch",

        // What to do when dialog has closed.
        callback
    );
    me.game.add(dialog_box);
    //me.game.add(new NpcThorEntity(50, 400));
    me.game.sort.defer(game.sort);
};


/**
 * A simple dialog manager.
 * @class
 * @extends me.SpriteObject
 * @constructor
 * @param {int} x the x coordinates of the dialog box
 * @param {int} y the y coordinates of the dialog box
 * @param {me.loader#getImage} background image
 * @param {array} an array of dialog phrases (strings)
 * @param {int} width of the textbox
 * @param {int} height of the textbox
 * @param {int} x offset of the textbox inside the background image
 * @param {int} y offset of the textbox inside the background image
 * @param {me#Font} the font used to write the dialog
 * @param {String} tag of the key used to pass the dialog pages
 * @param {function} an optional callback function to be called when the dialog is done
 * @example
 * dialog = new DialogObject(10, 10, background, dialog, background.width - OFFSET_SIZE_TEXT_X, background.width - OFFSET_SIZE_TEXT_Y, OFFSET_DIALOG_X, OFFSET_DIALOG_Y, new me.Font("acmesa",20,"#880D0D", "center"), "enter", activateControls);
 */
game.DialogObject = me.SpriteObject.extend({
    "init": function init(x, y, background, dialog, widthText, heightText, offsetTextX, offsetTextY, font, tagKey, callback) {
        this.parent(x, y, background);
        this.background = background;
        this.font = font;
        this.tagKey = tagKey;
        this.widthText = widthText;
        this.heightText = heightText;
        this.rowCount = Math.floor(this.heightText / (this.font.height * 1.1));
        this.offsetTextX = offsetTextX;
        this.offsetTextY = offsetTextY;
        this.dialog = dialog;
        this.counter = 0;
        this.rows = [this.getWords(this.dialog[0])];
        this.currentRow = 0;
        this.callback = callback;
        this.z = 1000;
    },

    "getWords": function getWords(text) {
        var totalSize = 0;
        var wordSize = 0;
        var substrings = [];
        var substringsCounter = 0;
        var counter = 0;
        var words = text.split(" ");
        while (typeof (words[counter]) !== 'undefined') {
            wordSize = this.font.measureText(me.video.getScreenFrameBuffer(), words[counter] + " ").width;
            if (counter != 0 && wordSize + totalSize > this.widthText) {
                totalSize = wordSize;
                substringsCounter++;
                substrings[substringsCounter] = words[counter];
            }
            else {
                totalSize += wordSize;
                if (typeof (substrings[substringsCounter]) === 'undefined') {
                    substrings[substringsCounter] = words[counter];
                }
                else {
                    substrings[substringsCounter] += " " + words[counter];
                }
            }
            counter++;
        }
        return substrings;
    },

    "update": function update() {
        if (me.input.isKeyPressed(this.tagKey)) {
            if (this.currentRow !== 0) {
                this.currentRow += this.rowCount;
            }
            else {
                this.currentRow = 0;
                this.counter++;
                if (typeof (this.dialog[this.counter]) === 'undefined') {
                    game.modal = true;
                    if (typeof (this.callback) !== 'undefined' && this.callback != null) {
                        this.callback();
                    }
                    me.game.remove.defer(this);
                }
                else {
                    this.rows[this.counter] = this.getWords(this.dialog[this.counter]);
                }
            }
            return true;
        }
        else {
            return false;
        }
    },

    /* -----

    draw the dialog

    ------ */
    "draw": function draw(context) {
        if (typeof (this.dialog[this.counter]) !== 'undefined') {
            // Convert screen coordinates to world coordinates.
            var map_pos = me.game.currentLevel.pos;

            context.drawImage(
                this.background,
                this.pos.x - map_pos.x,
                this.pos.y - map_pos.y
            );
            var offset = 0;
            for (var i = 0; i < this.rowCount; i++) {
                if (typeof (this.rows[this.counter][this.currentRow + i]) !== 'undefined') {
                    this.font.draw(
                        context,
                        this.rows[this.counter][this.currentRow + i],
                        this.pos.x + this.offsetTextX - map_pos.x,
                        this.pos.y + this.offsetTextY - map_pos.y + offset
                    );
                    offset += (this.font.height * 1.1);
                }
            }
        }
    }
});
