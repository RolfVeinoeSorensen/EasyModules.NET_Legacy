var jsV = 0.1;
var debug = false;
var myids = [1];
var backLayer = 500;
var persoLayer = 1001;
var effectLayer = 1052;
var interfaceLayer = 1103;
var myfont = null;
var oList = new Array();
var playScreen = null;
var waitRoom = null;
var map = null;
var screenMapKeyb = false;
var date = new Date();

function preparedate() {
    date.setMilliseconds(date.getMilliseconds() + 100)
}
setInterval(preparedate, 100);
var jsApp = {
    onload: function () {
        if (!me.video.init("jsapp", 800, 600, false, 1)) {
            alert("Sorry but your browser does not support html 5 canvas.");
            return
        }
        me.sys.interpolation = true;
        me.debug.renderHitBox = false;
        me.debug.displayFPS = true;
        me.loader.onload = this.loaded.bind(this);
        me.state.pause = function () { };
        me.state.resume = function () { };
        me.loader.preload(g_resources);
        me.state.transition("fade", "#FFFFFF", 0);
        me.input.registerMouseEvent("mouseup", null, mouseUI);
        me.state.change(me.state.LOADING)
    },
    loaded: function () {
        me.state.set(me.state.NFO, new TitleScreen());
        playScreen = new PlayScreen();
        me.state.set(me.state.PLAY, playScreen);
        map = new MapScreen();
        me.state.set("map", map);
        me.state.change(me.state.NFO)
    }
};
var win = null;

function findPersoByID(a) {
    if (a == null) {
        return null
    }
    for (var b = 0; b < oList.length; b++) {
        if (oList[b].ID == a) {
            return oList[b]
        }
    }
    return null
}
curID = 0;

function stopAttack(a) {
    for (var b = 0; b < oList.length; b++) {
        oList[b].stopattacked()
    }
}
mX = mY = 0;
window.onReady(function () {
    jsApp.onload()
});

function mo() {
    mX = me.input.mouse.pos.x;
    mY = me.input.mouse.pos.y
}
function reloadCall(a, c) {
    var b = new XHRConnection();
    b.sendAndLoad(c, "GET", a)
}
function answerAnalyse(c) {
    var b = c.responseText.split("\n");
    for (var a = 0; a < b.length; a++) {
        line = b[a];
        action = line.substring(0, 2);
        result = line.substring(3);
        switch (action) {
            case "PA":
                action = line.split("|");
                var f = findPersoByID(action[1]);
                if (f == null) {
                    alert("Player no listed");
                    return
                }
                f.selected();
                if (action[2] == "YES") {
                    myTurn(f)
                }
                break;
            case "MA":
                action = line.split("|");
                if (action[1] > 0) {
                    var f = findPersoByID(action[1]);
                    f.mana = action[2]
                } else {
                    alert("Not nought Mana !");
                    var f = findPersoByID(action[2]);
                    f.selected();
                    myTurn(f)
                }
                break;
            case "PI":
                oList = new Array();
                players = result.split("|");
                for (var e = 0; e < players.length; e++) {
                    player = players[e].split("-");
                    var d = null;
                    d = new myPerso(parseInt(player[1]), parseInt(player[3]), parseInt(player[4]), player[2], player[0], parseInt(player[6]), parseInt(player[7]), player[8], parseInt(player[9]));
                    if (player.length > 5 && player[5] == "flip") {
                        d.flipX()
                    }
                    oList.push(d);
                    me.game.add(d, persoLayer)
                }
                curID = 3;
                break;
            case "NO":
                break;
            case "EN":
                global_text = result;
                curID = 5;
                me.state.change("over");
                break;
            case "CH":
                data = result.split("|");
                findPersoByID(data[0]).speak(data[1]);
                break;
            case "AT":
                data = result.split("|");
                findPersoByID(data[0]).play(data[1], data[2], findPersoByID(data[3]));
                break;
            case "SK":
                skills = result.split("|");
                skillManager = new Array();
                for (var e = 0; e < skills.length; e++) {
                    skill = skills[e].split("-");
                    skillManager.push(new skillClass(skill[0], skill[1], skill[2], skill[3]))
                }
                curID = 5;
                break;
            case "DG":
                players = result.split("|");
                for (var e = 0; e < players.length; e++) {
                    player = players[e].split("*");
                    var f = findPersoByID(parseInt(player[0]));
                    if (f == null) {
                        alert("Player no listed");
                        return
                    }
                    f.setHp(parseInt(player[1]), parseInt(player[2]))
                }
                break;
            case "ID":
                break;
            default:
                if (line != "") {
                    alert(line)
                }
                break
        }
    }
}
function analyseWaitingRoom(c) {
    var b = c.responseText.split("\n");
    for (var a = 0; a < b.length; a++) {
        line = b[a];
        action = line.substring(0, 2);
        result = line.substring(3);
        switch (action) {
            case "LS":
                waitRoom.setLstPlayer(result.split("|"));
                break;
            case "FA":
                waitRoom.fightAccepted(result);
                break;
            case "FR":
                waitRoom.fightRequested(result);
                break;
            case "WA":
                waitRoom.waiting();
                break;
            case "WC":
                waitRoom.waitingCancel();
                break;
            case "WW":
                waitRoom.waitingStill();
                break;
            case "NO":
                break;
            default:
                alert(line);
                break
        }
    }
}
color = new Array("red", "green", "orange", "blue", "purple", "yellow", "white", "black");
warpObj = me.SpriteObject.extend({
    init: function (a, e, d, b, c) {
        this.parent(a, e, d, b, c);
        me.input.registerMouseEvent("mouseup", this.collisionBox, this.mouseClick.bind(this), false)
    },
    draw: function (a) {
        this.angle += 0.1;
        if (this.angle > 2 * 3.14) {
            this.angle = 0
        }
        this.parent(a)
    },
    mouseClick: function () {
        mouseUI();
        return false
    },
});
MyBasicObject = me.Rect.extend({
    scale: null,
    scaleFlag: false,
    z: 0,
    offset: null,
    autodestroy: true,
    visible: true,
    collisionBox: null,
    flickering: false,
    flickerTimer: -1,
    flickercb: null,
    flickerState: false,
    vp: null,
    init: function (a, d, b, c) {
        this.parent(new me.Vector2d(a, d), b, c);
        this.scale = new me.Vector2d(1, 1);
        this.collisionBox = new me.Rect(this.pos, this.width, this.height);
        this.vp = me.game.viewport;
        this.offset = new me.Vector2d(0, 0)
    },
    isFlickering: function () {
        return this.flickering
    },
    flicker: function (a, b) {
        this.flickerTimer = a;
        if (this.flickerTimer < 0) {
            this.flickering = false;
            this.flickercb = null
        } else {
            if (!this.flickering) {
                this.flickercb = b;
                this.flickering = true
            }
        }
    },
    resize: function (a) {
        if (a > 0) {
            this.scale.x = this.scale.x < 0 ? -a : a;
            this.scale.y = this.scale.y < 0 ? -a : a;
            this.scaleFlag = ((this.scale.x != 1) || (this.scale.y != 1))
        }
    },
    update: function () {
        if (this.flickering) {
            this.flickerTimer -= me.timer.tick;
            if (this.flickerTimer < 0) {
                if (this.flickercb) {
                    this.flickercb()
                }
                this.flicker(-1)
            }
            return true
        }
        return false
    },
    draw: function (b) {
        if (this.flickering) {
            this.flickerState = !this.flickerState;
            if (!this.flickerState) {
                return
            }
        }
        var a = ~~(this.pos.x - this.vp.pos.x),
            c = ~~(this.pos.y - this.vp.pos.y);
        if (this.scaleFlag) {
            b.translate(a + this.hWidth, c + this.hHeight);
            b.scale(this.scale.x, this.scale.y);
            b.translate(-this.hWidth, -this.hHeight);
            a = c = 0
        }
        if (this.scaleFlag) {
            b.setTransform(1, 0, 0, 1, 0, 0)
        }
        if (me.debug.renderHitBox) {
            this.parent(b, "blue");
            this.collisionBox.draw(b, "red")
        }
    },
    destroy: function () {
        if (this.autodestroy) {
            this.onDestroyEvent()
        }
        return this.autodestroy
    },
    onDestroyEvent: function () { }
});
basicGuiObject = MyBasicObject.extend({
    init: function (a, d, b, c) {
        this.parent(a, d, b, c);
        me.input.registerMouseEvent("mouseup", this.collisionBox, this.mouseClick.bind(this))
    },
    cbMouseMove: null,
    setCBMouseMove: function (a) {
        this.cbMouseMove = a
    },
    mouseMove: function () {
        if (this.cbMouseMove != null) {
            this.cbMouseMove(this)
        }
    },
    cbMouseClick: null,
    setCBMouseClick: function (a) {
        this.cbMouseClick = a
    },
    mouseClick: function () {
        if (this.cbMouseClick != null) {
            this.cbMouseClick(this)
        }
    },
    onDestroyEvent: function () {
        me.input.releaseMouseEvent("mouseup", this.collisionBox)
    }
});
mytriangle = basicGuiObject.extend({
    color: null,
    up: false,
    lineWidth: 2,
    init: function (a, f, c, e, b, d) {
        this.up = d;
        this.color = b;
        this.parent(a, f, c, e)
    },
    draw: function (b) {
        this.parent(b);
        var c = this.width;
        var a = this.height;
        var e = this.pos.x;
        var d = this.pos.y;
        if (this.up == true) {
            b.beginPath();
            b.moveTo(e + c / 2, d);
            b.lineTo(e + c, d + a);
            b.lineTo(e, d + a);
            b.closePath();
            b.fillStyle = this.color;
            b.fill();
            b.lineWidth = this.lineWidth;
            b.lineJoin = "round";
            b.strokeStyle = "#333";
            b.stroke()
        } else {
            b.beginPath();
            b.moveTo(e + c / 2, d + a);
            b.lineTo(e + c, d);
            b.lineTo(e, d);
            b.closePath();
            b.fillStyle = "#ffffff";
            b.fill();
            b.lineWidth = this.lineWidth;
            b.lineJoin = "round";
            b.strokeStyle = "#333";
            b.stroke()
        }
    },
});
label = basicGuiObject.extend({
    text: null,
    myfont: null,
    fontname: "century gothic",
    fontcolor: "white",
    sizefont: 14,
    init: function (a, c, b) {
        this.text = b;
        this.chargeFont();
        this.parent(a, c - this.textHeight, this.textWidth, this.textHeight)
    },
    textWidth: 0,
    textHeight: 0,
    setText: function (a) {
        this.text = a;
        this.chargeFont();
        me.game.sort()
    },
    changeColor: function (a) {
        this.fontcolor = a;
        this.chargeFont()
    },
    chargeFont: function () {
        var a = me.video.getScreenFrameBuffer();
        this.myfont = new me.Font(this.fontname, this.sizefont, this.fontcolor);
        this.textWidth = this.myfont.measureText(a, this.text).width;
        this.textHeight = this.myfont.measureText(a, this.text).height
    },
    draw: function (b, a, c) {
        this.parent(b);
        this.myfont.draw(b, this.text, this.pos.x, this.pos.y + this.textHeight)
    }
});
var winDown = me.AnimationSheet.extend({
    dataList: null,
    call: null,
    param: null,
    init: function (a, e, c, d, b) {
        this.param = b;
        this.call = c;
        this.time = new Date().getTime();
        this.dataList = d;
        image = me.loader.getImage("interf_winBack");
        this.parent(a, e, image, 216, 111);
        this.myfont = new me.Font("century gothic", 20, "white");
        me.input.bindKey(me.input.KEY.DOWN, "down", true);
        me.input.bindKey(me.input.KEY.UP, "up", true);
        me.input.bindKey(me.input.KEY.C, "validate", true);
        me.game.add(this, interfaceLayer);
        me.game.sort()
    },
    draw: function (c) {
        this.parent(c);
        if (this.dataList.split == undefined) {
            return
        }
        curLinePosY = this.pos.y + 30;
        curLinePosX = this.pos.x + 10;
        var a = "";
        var e = this.dataList.split(" ");
        for (var b = 0; b < e.length; b++) {
            var d = a;
            a += e[b] + " ";
            var f = this.myfont;
            logo_width = f.measureText(c, a).width;
            logo_height = f.measureText(c, a).height;
            if (logo_width >= this.width) {
                f.draw(c, d, curLinePosX, curLinePosY);
                curLinePosY += logo_height;
                a = e[b]
            }
        }
        if (a != "") {
            f.draw(c, a, curLinePosX, curLinePosY)
        }
    },
    update: function () {
        if (me.input.isKeyPressed("down")) { }
        if (me.input.isKeyPressed("up")) { }
        if (me.input.isKeyPressed("validate")) {
            me.game.remove(this);
            this.call(this.param)
        }
    },
    onDestroyEvent: function () {
        me.input.unbindKey(me.input.KEY.DOWN);
        me.input.unbindKey(me.input.KEY.UP);
        me.input.unbindKey(me.input.KEY.C)
    }
});
var myChoiceListFight = winDown.extend({
    time: null,
    persoObj: null,
    lines: null,
    triangleUp: null,
    triangleDown: null,
    init: function (b, h, f, g, e, a) {
        this.lines = new Array();
        this.parent(b, h, f, g, a);
        this.persoObj = e;
        this.myfontS = new me.Font("century gothic", 20, "red");
        curLinePosY = this.pos.y + 30;
        curLinePosX = this.pos.x + 10;
        for (var d = 0; d < this.maxLine; d++) {
            var c = new label(curLinePosX, curLinePosY, this.dataList[d], this);
            c.setCBMouseMove(this.MouseSelection.bind(this));
            c.setCBMouseClick(this.select.bind(this));
            this.lines.push(c);
            curLinePosY += c.textHeight;
            if (d == 0) {
                c.changeColor("red");
                this.selected = 0
            }
            me.game.add(c, interfaceLayer + 1)
        }
        this.triangleUp = new mytriangle(this.pos.x + this.getRect().width - 25, this.pos.y + 10, 15, 15, "white", true);
        this.triangleUp.setCBMouseClick(this.goUp.bind(this));
        this.triangleUp.visible = false;
        me.game.add(this.triangleUp, interfaceLayer + 1);
        this.triangleDown = new mytriangle(this.pos.x + this.getRect().width - 25, this.pos.y + this.getRect().height - 25, 15, 15, "red", false);
        this.triangleDown.setCBMouseClick(this.goDown.bind(this));
        this.triangleDown.visible = false;
        me.game.add(this.triangleDown, interfaceLayer + 1)
    },
    chargeText: function () {
        for (var b = 0; b < this.maxLine; b++) {
            var a = this.lines[b];
            a.setText(this.dataList[b + this.span])
        }
    },
    MouseSelection: function (a) {
        for (var b = 0; b < this.lines.length; b++) {
            if (this.lines[b] == a) {
                this.lines[this.selected - this.span].changeColor("white");
                this.selected = this.span + b;
                this.lines[this.selected - this.span].changeColor("red")
            }
        }
    },
    selected: -1,
    draw: function (b) {
        this.parent(b);
        if (this.span != 0) {
            this.triangleUp.visible = true
        } else {
            this.triangleUp.visible = false
        }
        if (this.span + this.maxLine < this.dataList.length) {
            this.triangleDown.visible = true
        } else {
            this.triangleDown.visible = false
        }
        myfont2 = new me.Font("Arial", 15, "white");
        var a = "X:" + mX + " Y:" + mY;
        logo_width = myfont2.measureText(b, a).width;
        logo_height = myfont2.measureText(b, a).height;
        myfont2.draw(b, a, 0, b.canvas.height - logo_height)
    },
    goDown: function () {
        if (this.lines == null) {
            return
        }
        this.lines[this.selected - this.span].changeColor("white");
        this.selected++;
        if (this.selected >= this.maxLine) {
            if (this.selected < this.dataList.length) {
                this.span++;
                this.chargeText()
            } else {
                this.selected--
            }
        }
        this.lines[this.selected - this.span].changeColor("red")
    },
    goUp: function () {
        if (this.lines == null) {
            return
        }
        this.lines[this.selected - this.span].changeColor("white");
        this.selected--;
        if (this.selected < 0) {
            this.selected++
        } else {
            if (this.selected < this.span > 0) {
                this.span--;
                this.chargeText()
            }
        }
        this.lines[this.selected - this.span].changeColor("red")
    },
    maxLine: 4,
    span: 0,
    update: function () {
        if (me.input.isKeyPressed("down")) {
            this.goDown()
        }
        if (me.input.isKeyPressed("up")) {
            this.goUp()
        }
        if (me.input.isKeyPressed("validate")) {
            this.select()
        }
        var a = new Date().getTime();
        if (this.persoObj.ia != null && a - this.time > 2000) {
            this.selected = this.persoObj.ia()
        }
        if (this.persoObj.ia != null && a - this.time > 4000 && this.selected != -1) {
            this.select()
        }
    },
    select: function () {
        this.call(this.selected, this.persoObj, this.param);
        me.game.remove(this)
    },
    onDestroyEvent: function () {
        if (this.lines == null) {
            return
        }
        me.game.remove(this.triangleUp);
        me.game.remove(this.triangleDown);
        for (var a = 0; a < this.lines.length; a++) {
            me.game.remove(this.lines[a])
        }
        this.lines = null
    },
});
dataBar = basicGuiObject.extend({
    value: 100,
    color1: "green",
    color2: "silver",
    max: 100,
    init: function (c, g, e, f, d, b, a) {
        this.parent(c, g, e, f);
        this.setMax(a);
        if (d != null) {
            this.color1 = d
        }
        if (b != null) {
            this.color2 = b
        }
    },
    setMax: function (a) {
        if (a != null) {
            this.max = a
        }
    },
    setValue: function (a) {
        if (a == null) {
            return
        }
        this.value = a;
        if (this.value > this.max) {
            this.value = this.max;
            return null
        } else {
            if (this.value < 0) {
                this.value = 0;
                return null
            }
        }
    },
    draw: function (a) {
        this.parent(a);
        value = this.width * this.value / this.max;
        value2 = this.width - value;
        a.strokeStyle = "silver";
        a.strokeRect(this.pos.x, this.pos.y, this.width, this.height);
        a.fillStyle = this.color2;
        a.fillRect(this.pos.x, this.pos.y, this.width, this.height);
        a.fillStyle = this.color1;
        a.fillRect(this.pos.x, this.pos.y, value, this.height)
    },
    update: function () { },
    onDestroyEvent: function () { }
});
skeletonObj = basicGuiObject.extend({
    init: function (a, d, b, c) {
        this.parent(a, d, b, c)
    },
    draw: function (a) {
        this.parent(a)
    },
    update: function () { },
    onDestroyEvent: function () { }
});
var hpLabel = label.extend({
    timeStart: null,
    init: function (a, c, b) {
        this.timeStart = new Date().getTime();
        if (b > 0) {
            this.fontcolor = "green"
        } else {
            if (b < 0) {
                this.fontcolor = "red"
            } else {
                this.fontcolor = "yellow";
                b = "miss"
            }
        }
        setTimeout(this.timer.bind(this), 100);
        this.parent(a, c, b)
    },
    timer: function () {
        if (new Date().getTime() - this.timeStart > 5000) {
            me.game.remove(this);
            return
        }
        this.pos.y--;
        setTimeout(this.timer.bind(this), 100)
    },
});
label2 = basicGuiObject.extend({
    text: null,
    myfont: null,
    fontname: "century gothic",
    fontcolor: "white",
    sizefont: 20,
    init: function (a, c, b) {
        this.text = b;
        this.chargeFont();
        this.parent(a, c - this.textHeight, this.textWidth, this.textHeight)
    },
    textWidth: 0,
    textHeight: 0,
    setText: function (a) {
        this.text = a
    },
    changeColor: function (a) {
        this.fontcolor = a;
        this.chargeFont()
    },
    chargeFont: function () {
        var a = me.video.getScreenFrameBuffer();
        this.myfont = new me.Font(this.fontname, this.sizefont, this.fontcolor);
        this.textWidth = this.myfont.measureText(a, this.text).width;
        this.textHeight = this.myfont.measureText(a, this.text).height
    },
    draw: function (a) {
        this.parent(a);
        this.myfont.draw(a, this.text, this.pos.x, this.pos.y + this.textHeight);
        value = 30;
        value2 = Math.floor(this.width - value);
        a.strokeStyle = "silver";
        a.strokeRect(this.pos.x, this.pos.y, this.width, this.height);
        a.fillStyle = "red";
        a.fillRect(this.pos.x, this.pos.y, this.width, this.height);
        a.fillStyle = "green";
        a.fillRect(this.pos.x, this.pos.y, value, this.height)
    }
});
var chatBuble = me.AnimationSheet.extend({
    text: null,
    myfont: null,
    fontname: "Arial",
    fontcolor: "white",
    sizefont: 16,
    init: function (a, d, b, c) {
        this.text = b;
        this.chargeFont();
        image = me.loader.getImage("interf_chat");
        this.parent(a, d, image, 67, 61);
        setTimeout(this.endMe.bind(this), c)
    },
    endMe: function () {
        me.game.remove(this)
    },
    textWidth: 0,
    textHeight: 0,
    setText: function (a) {
        this.text = a
    },
    changeColor: function (a) {
        this.fontcolor = a;
        this.chargeFont()
    },
    chargeFont: function () {
        var a = me.video.getScreenFrameBuffer();
        this.myfont = new me.Font(this.fontname, this.sizefont, this.fontcolor);
        this.textWidth = this.myfont.measureText(a, this.text).width;
        this.textHeight = this.myfont.measureText(a, this.text).height
    },
    draw: function (a) {
        this.parent(a);
        this.myfont.draw(a, this.text, this.pos.x + 30, this.pos.y + 25)
    }
});
var myPict = me.AnimationSheet.extend({
    init: function (b, e, d, a, c) {
        image = me.loader.getImage(c);
        this.parent(b, e, image, d, a);
        this.addAnimation("default", [0]);
        this.setCurrentAnimation("default")
    }
});
var miniAnim = me.AnimationSheet.extend({
    isClickable: false,
    isMovable: false,
    init: function (b, f, a, e, d, c) {
        image = me.loader.getImage(d);
        this.parent(b, f, image, a, e);
        if (c == false) {
            this.resetAnim = this.stopAnim
        }
    },
    stopAnim: function () {
        this.visible = false
    }
});
var CursorEntity = me.ObjectEntity.extend({
    init: function () {
        var a = {};
        a.image = "cursor";
        a.spritewidth = 12;
        a.spriteheight = 12;
        this.parent(me.input.mouse.pos.x, me.input.mouse.pos.y, a);
        this.addAnimation("default", [4, 5, 6]);
        this.setCurrentAnimation("default");
        this.pos = me.input.mouse.pos;
        this.resize(1.5)
    }
});
var skillBar;
var myPerso = me.AnimationSheet.extend({
    type: "perso",
    SPELL: 0,
    ATTACK: 1,
    ITEM: 2,
    NOTHING: 3,
    spellIDList: null,
    ActionList: ["Sort", "Attaque", "Item (not yet)", "Passer"],
    hpBar: null,
    manaBar: null,
    initAnimData: function () {
        this.addAnimation("default", [12]);
        this.addAnimation("down", [0, 1, 2]);
        this.addAnimation("left", [12, 13, 14]);
        this.addAnimation("right", [24, 25, 26]);
        this.addAnimation("up", [36, 37, 38]);
        this.addAnimation("mort", [87, 88, 89]);
        this.addAnimation("spell", [66, 67, 68, 78, 79, 80, 90, 91, 92]);
        this.addAnimation("attacked", [60, 61, 62, 62, 62, 62]);
        this.addAnimation("atk1", [54]);
        this.addAnimation("atk2", [54, 55, 56, 66, 67, 68]);
        this.addAnimation("endspell", [92, 92, 92, 92, 92, 92, 92, 92, 92, 92, 92, 92, 92, 92, 92, 92, 92, 92, 92, 92]);
        this.setCurrentAnimation("default")
    },
    ID: 0,
    Name: "",
    init: function (b, h, g, c, a, i, f, e, d) {
        this.ID = b;
        this.Name = a;
        image = me.loader.getImage(c);
        this.parent(h, g, image, 32, 32);
        this.initAnimData();
        this.selectedPic = new miniAnim(this.pos.x + 5, this.pos.y - this.height, 26, 33, "interf_selectPerso", true);
        this.selectedPic.visible = false;
        me.game.add(this.selectedPic, persoLayer);
        this.selectedPicCible = new miniAnim(this.pos.x - 33, this.pos.y, 33, 26, "interf_selectPersoRed", true);
        this.selectedPicCible.visible = false;
        me.game.add(this.selectedPicCible, persoLayer);
        this.hpBar = new dataBar(this.pos.x, this.pos.y + this.height + 5, 30, 5, "green", "red");
        this.hpBar.setValue(i);
        this.hp = i;
        if (d) {
            this.manaBar = new dataBar(this.pos.x, this.pos.y + this.height + 10, 30, 5, "blue", "red");
            this.manaBar.setValue(f);
            this.mana = f;
            me.game.add(this.manaBar, interfaceLayer)
        }
        this.spellIDList = e.split("*");
        me.game.add(this.hpBar, interfaceLayer)
    },
    play: function (b, c, a) {
        this.unselect();
        if (b == this.SPELL) {
            this.spell(c, a)
        }
        if (b == this.ATTACK) {
            this.attack(a)
        }
        id = a == null ? null : a.ID
    },
    attacked: function () {
        this.setCurrentAnimation("attacked")
    },
    stopattacked: function () {
        if (this.hp > 0) {
            this.setCurrentAnimation("default")
        }
    },
    atkAnim: false,
    checkDead: function () {
        if (this.hp <= 0 && !this.isCurrentAnimation("mort")) {
            this.setCurrentAnimation("mort")
        }
    },
    attack: function (a) {
        atkAnim = true;
        this.setCurrentAnimation("atk1", function () {
            this.setCurrentAnimation("atk2", function () {
                this.setCurrentAnimation("default");
                a.setCurrentAnimation("attacked");
                var b = new miniAnim(a.pos.x, a.pos.y, 300 / 8, 190 / 5, "ATK_DEGAT", false);
                b.setCurrentAnimation("default", function () {
                    a.setCurrentAnimation("default");
                    me.game.remove(b)
                });
                me.game.add(b, effectLayer);
                me.game.sort()
            })
        })
    },
    selectedPic: null,
    selected: function () {
        this.selectedPic.visible = true
    },
    unselect: function () {
        this.selectedPic.visible = false
    },
    selectedPicCible: null,
    cibleSelected: function () {
        if (this.hp <= 0) {
            return false
        }
        this.selectedPicCible.visible = true
    },
    cibleUnselected: function () {
        this.selectedPicCible.visible = false
    },
    curEffect: null,
    choiceSpell: function (a) {
        return skillManager[a].Anim
    },
    spellObj: function (a) {
        return skillManager[this.spellIDList[a]]
    },
    spell: function (c, b) {
        var a, d = 0;
        if (b == null) {
            a = this.pos.x;
            d = this.pos.y
        } else {
            a = b.pos.x;
            d = b.pos.y
        }
        this.setCurrentAnimation("spell", function () {
            var e = this.spellObj(c).getEffect(a, d);
            me.game.add(e, effectLayer);
            me.game.sort();
            this.setCurrentAnimation("endspell", function () {
                stopAttack(b);
                this.setCurrentAnimation("default")
            })
        })
    },
    subChoiceExist: function (c) {
        switch (c) {
            case this.SPELL:
                var b = new Array();
                for (var a = 0; a < this.spellIDList.length; a++) {
                    b.push(this.spellObj(a).Name)
                }
                return b
        }
        return false
    },
    isCibleNeeded: function (a, b) {
        switch (a) {
            case this.SPELL:
                return this.spellObj(b).cibleNeeded;
            case this.ATTACK:
                return true
        }
        return false
    },
    draw: function (a) {
        this.hpBar.setValue(this.hp);
        if (this.manaBar != null) {
            this.manaBar.setValue(this.mana)
        }
        this.checkDead();
        this.parent(a)
    },
    onDestroyEvent: function () {
        me.game.remove(this.selectedPic);
        me.game.remove(this.selectedPicCible)
    },
    hp: 100,
    mana: 100,
    actHp: function () {
        value = this.curhptodrop;
        this.curhptodrop = 0;
        if (value < 0) {
            this.attacked()
        }
        var a = new hpLabel(this.pos.x, this.pos.y, value);
        me.game.add(a, interfaceLayer);
        this.hp = this.hpfinal
    },
    curhptodrop: 0,
    hpfinal: 0,
    setHp: function (b, a) {
        this.hpfinal = a;
        this.curhptodrop = b;
        setTimeout(this.actHp.bind(this), 400)
    },
    getHp: function () {
        return this.hp
    },
    getAction: function () {
        return this.ActionList
    },
    speak: function (a) {
        me.game.add(new chatBuble(this.pos.x + this.width, this.pos.y - this.height, a, 2000), interfaceLayer)
    }
});
var myPersoMo = myPerso.extend({
    type: "mob",
    init: function (e, a, d, b, c) {
        this.parent(e, a, d, b, c);
        this.flipX()
    },
    ia: function () {
        return 1
    }
});
var g_resources = [{
    name: "Effect1",
    type: "image",
    src: "data/effect/cast_001.png"
}, {
    name: "Effect2",
    type: "image",
    src: "data/effect/cast_002.png"
}, {
    name: "Effect3",
    type: "image",
    src: "data/effect/cast_003.png"
}, {
    name: "Effect4",
    type: "image",
    src: "data/effect/cast_004.png"
}, {
    name: "Effect5",
    type: "image",
    src: "data/effect/cast_006.png"
}, {
    name: "Effect6",
    type: "image",
    src: "data/effect/cast_007.png"
}, {
    name: "Effect7",
    type: "image",
    src: "data/effect/cast_008.png"
}, {
    name: "Effect10",
    type: "image",
    src: "data/effect/heal_002.png"
}, {
    name: "Effect11",
    type: "image",
    src: "data/effect/heal_003.png"
}, {
    name: "fire_001",
    type: "image",
    src: "data/effect/fire_001.png"
}, {
    name: "fire_002",
    type: "image",
    src: "data/effect/fire_002.png"
}, {
    name: "Perso1",
    type: "image",
    src: "data/perso/Evil_005_8D.png"
}, {
    name: "Actor_011_8D",
    type: "image",
    src: "data/perso/Actor_011_8D.png"
}, {
    name: "Actor_005_8D",
    type: "image",
    src: "data/perso/Actor_005_8D.png"
}, {
    name: "isometric_tileset",
    type: "image",
    src: "data/tmx/isometric_tileset.png"
}, {
    name: "map2",
    type: "tmx",
    src: "data/tmx/map1.tmx"
}, {
    name: "tmw_desert_spacing",
    type: "image",
    src: "data/tmx/tmw_desert_spacing.png"
}, {
    name: "map",
    type: "tmx",
    src: "data/tmx/desert.tmx"
}, {
    name: "map01",
    type: "tmx",
    src: "data/tmx/area01.tmx"
}, {
    name: "ForestSet",
    type: "image",
    src: "data/tmx/sprite/ForestSet.png"
}, {
    name: "_mobgreen",
    type: "image",
    src: "data/mob/_mobgreen.png"
}, {
    name: "_bluemob",
    type: "image",
    src: "data/mob/_blueMob.png"
}, {
    name: "_king",
    type: "image",
    src: "data/mob/_king.png"
}, {
    name: "casque",
    type: "image",
    src: "data/items/casque.png"
}, {
    name: "warp",
    type: "image",
    src: "data/warp/AuraRune6.png"
}, ];
var MapScreen = me.ScreenObject.extend({
    objList: null,
    hpBar: null,
    manaBar: null,
    myChar: null,
    map: null,
    grid: [],
    graph: [],
    onPause: function () { },
    cleanData: function () {
        this.hpBar = null;
        this.manaBar = null;
        this.myChar = null;
        this.objList = []
    },
    init: function (a) {
        this.cleanData();
        this.parent(true);
        this.map = a
    },
    onResetEvent: function () {
        console.log("Reset Even");
        connection.send(JSON.stringify({
            type: "initMap",
            iAm: myID,
            ver: jsV
        }))
    },
    openMap: function (a) {
        screenMapKeyb = true;
        this.cleanData();
        this.map = a;
        me.levelDirector.loadLevel(this.map);
        me.game.sort();
        var e = me.game.currentLevel.getLayerByName("collision");
        if (!e.layerData) {
            alert("no LAYER COL");
            return
        }
        var g = e.height;
        var f = e.width;
        for (var d = 0; d < f; d += 1) {
            this.grid[d] = [];
            for (var c = 0; c < g; c += 1) {
                var b = convertToPixel(d, c);
                if (e.getTile(b.x, b.y) == null) {
                    this.grid[d][c] = 0
                } else {
                    this.grid[d][c] = 1
                }
            }
        }
        this.graph = new Graph(this.grid);
        $("#chat").show()
    },
    prepareStat: function () {
        data = this.myChar.data;
        if (radar2 == null) {
            radar2 = new RGraph.Radar("radar2", [data.str, data.vit, data.luk, data["int"], data.dex, data.agi])
        } else {
            radar2.data[0] = [data.str, data.vit, data.luk, data["int"], data.dex, data.agi]
        }
        radar2.Set("chart.zoom.factor", 1);
        radar2.Set("chart.labels", ["STR", "VIT", "LUK", "INT", "DEX", "AGI"]);
        radar2.Set("chart.background.circles.poly", true);
        radar2.Set("chart.background.circles.spacing", 10);
        radar2.Set("chart.colors", ["rgba(255, 0, 0,0.5)"]);
        radar2.Set("chart.axes.color", "transparent");
        radar2.Set("chart.text.size", 6);
        radar2.Set("chart.text.color", "#FFFFFF");
        radar2.Set("chart.ymax", 100);
        RGraph.isOld() ? radar2.Draw() : RGraph.Effects.Radar.Grow(radar2)
    },
    spawnMe: function (a) {
        nc = convertToPixel(a.posX, a.posY);
        vel = a.vel;
        if (this.myChar == null) {
            console.log("MyChar null !!!");
            this.myChar = new myPerso(a.id, a.Sprite, nc.x, nc.y, a.Name, a.curHP, a.curMana, vel, this, {}, a, a.wearing);
            this.prepareStat();
            me.game.add(this.myChar, 7);
            this.hpBar = new dataBar(40, 50, 80, 5, "green", "red", a.maxHP);
            this.manaBar = new dataBar(40, 70, 80, 5, "blue", "red", a.maxMana);
            this.hpBar.setValue(this.myChar.curHP);
            this.manaBar.setValue(this.myChar.curMana);
            me.game.add(new label(15, 55, "HP:"), interfaceLayer);
            me.game.add(this.hpBar, interfaceLayer);
            me.game.add(new label(15, 75, "AP:"), interfaceLayer);
            me.game.add(this.manaBar, interfaceLayer);
            me.game.sort();
            this.objList.push(this.myChar)
        } else {
            console.log("RESPAWN");
            console.log(a);
            this.myChar.nextPos = null;
            this.myChar.data = a;
            this.myChar.curHP = a.curHp;
            this.myChar.curMana = a.curMana;
            this.myChar.pos.x = nc.x;
            this.myChar.pos.y = nc.y;
            this.myChar.setCurrentAnimation("down")
        }
    },
    spawn: function (e) {
        nc = convertToPixel(e.posX, e.posY);
        console.log("SPAWN:");
        console.log(e);
        var f = null;
        if (this.objList != null) {
            for (var c = 0; c < this.objList.length; c++) {
                if (e.id == this.objList[c].id) {
                    f = this.objList[c]
                }
            }
        }
        if (f == null) {
            f = new persoEntity(e.id, e.Sprite, nc.x, nc.y, e.Name, e.vel, {}, e.wearing);
            me.game.add(f, 7);
            this.objList.push(f);
            f.setCurrentAnimation("stand-down")
        } else {
            f.pos.x = nc.x;
            f.pos.y = nc.y;
            f.Sprite = e.Sprite;
            f.setCurrentAnimation("stand-down")
        }
        if (e.alive == false) {
            f.dead()
        }
        if (e.path != null) {
            var a = e.path;
            f.starttoMove(a)
        }
    },
    draw: function (a) { },
    addEntity: function (a) { },
    findIObj: function (b) {
        for (var a = 0; a < this.objList.length; a++) {
            perso = this.objList[a];
            if (perso.id == b) {
                return a
            }
        }
        return null
    },
    findObj: function (b) {
        for (var a = 0; a < this.objList.length; a++) {
            perso = this.objList[a];
            if (perso.id == b) {
                return this.objList[a]
            }
        }
        return null
    },
    deleteObj: function (b) {
        var a = this.findIObj(b);
        if (a == null) {
            return
        }
        me.game.remove(this.objList[a]);
        this.objList.splice(a, 1)
    },
    getClicked: function () {
        for (var a = 0; a < this.objList.length; a++) {
            o = this.objList[a];
            if (o.clicked) {
                return o
            }
        }
        return null
    },
    castR: function (f, a, d, c) {
        var e = this.findObj(f);
        if (a == 1) {
            var b = getSkill(d);
            if (b == null) {
                return
            }
            if (b.spellType == SPELL.SELF) {
                b.startEffect(b, this.myChar)
            } else {
                b.startEffect(b, c.target)
            }
            e.direction = "down"
        } else {
            if (d && d != "") {
                kami("<font color=yellow>" + d + "</font><br/>")
            }
            e.castStop();
            e.setCurrentAnimation("stand-down");
            e.direction = "down"
        }
    },
    cast: function (b) {
        var a = this.findObj(b);
        a.setCurrentAnimation("startSpell", function () {
            a.setCurrentAnimation("castTime")
        });
        a.direction = "spell"
    },
    positionObj: function (e, a, d, b) {
        var c = this.findObj(e);
        if (c == null) {
            return
        }
        c.pos.x = parseInt(a);
        c.pos.y = parseInt(d);
        if (!c.isCurrentAnimation(b)) {
            c.setCurrentAnimation(b);
            c.direction = b
        }
    },
    onDestroyEvent: function () {
        console.log("Destroy Even")
    },
    castFinished: function () {
        connection.send(JSON.stringify({
            type: "castFinished"
        }))
    },
    WSManagement: function (m) {
        if (m.type == "cast") {
            this.cast(m.id)
        }
        if (m.type == "player_skill") {
            this.updateSkill(m.data)
        }
        if (m.type == "castR") {
            this.castR(m.id, m.data, m.skID, m)
        }
        if (m.type == "castW") {
            this.manaBar.setValue(m.mana);
            this.myChar.castW(m.timems);
            setTimeout(this.castFinished, m.timems)
        }
        if (m.type == "spawnMe") {
            console.log(m.data);
            if (m.map) {
                this.openMap(m.map)
            }
            this.spawnMe(m.data);
            if (m.items) {
                this.updateItems(m.items)
            }
            if (m.skill) {
                this.updateSkill(m.skill)
            }
            if (m.warp) {
                for (var e = 0; e < m.warp.length; e++) {
                    var g = m.warp[e];
                    var k = convertToPixel(g.posX, g.posY);
                    g = new warpObj(k.x, k.y, me.loader.getImage("warp"), 32, 32);
                    me.game.add(g, interfaceLayer)
                }
                me.game.sort()
            }
            $("#nfoData").html(this.myChar.getHtmlData())
        }
        if (m.type == "userNFO") {
            this.myChar.nfoUpd(m.nfo, m.data)
        }
        if (m.type == "position") { }
        if (m.type == "getGrid") {
            console.log("Grid requested");
            connection.send(JSON.stringify({
                type: "grid",
                grid: this.grid
            }))
        }
        if (m.type == "spawn") {
            console.log("SPAWN RECEIVED !!");
            console.log(m.data);
            for (var e = 0; e < m.data.length; e++) {
                cur = m.data[e];
                console.log("SPAWN LOOP !!");
                console.log(cur);
                this.spawn(cur)
            }
            me.game.sort()
        }
        if (m.type == "delete") {
            this.deleteObj(m.id)
        }
        if (m.type == "msg") {
            addInChat(m.msg + "<br/>")
        }
        if (m.type == "chat") {
            addInChat(m.name + " : " + m.msg + "<br/>")
        }
        if (m.type == "item") {
            this.updateItems(m.data)
        }
        if (m.type == "goto") {
            var f = this.findObj(m.id);
            if (f == null) {
                return
            }
            f.starttoMove(m.path)
        }
        if (m.type == "NFO_WEAR") {
            console.log("NFO_WEAR:");
            console.log(m.data);
            var f = this.findObj(m.id);
            console.log(f);
            if (f == null) {
                return
            }
            f.wearing = m.data
        }
        if (m.type == "NFO_DATA") {
            console.log("Received DATA");
            console.log(m.data);
            this.myChar.data = m.data;
            $("#nfoData").html(this.myChar.getHtmlData());
            this.prepareStat()
        }
        if (m.type == "NPC_MSG") {
            if ($("#chat").is(":visible")) {
                $("#chat").hide()
            }
            if (!$("#npcZone").is(":visible")) {
                $("#npcZone").show()
            }
            console.log(m);
            if (m.id) {
                globalNPC = m.id
            }
            if (m.data) {
                $("#npcMsg2").html(m.data)
            }
            if (m.name) {
                $("#npcName").html(m.name)
            }
            if (m.pict) {
                $("#npcPict").html("<img src=./data/npc/big/" + m.pict + "></img>")
            }
            if (m.minipict) {
                $("#npcPict2").html("<img src=./data/npc/mini/" + m.minipict + "></img>")
            }
            if (m.status == "next") {
                $("#npcMsg3").html("<a href=# onclick='npc_next();'>Continue>></a>")
            }
            if (m.status == "accept") {
                $("#npcMsg3").html("<a href=# onclick='npc_accept_n();'>Non merci.</a> &nbsp;&nbsp;&nbsp;&nbsp;<a href=# onclick='npc_accept_y();'>Oui.</a>")
            }
            if (m.status == "finish") {
                $("#npcMsg3").html("<a href=# onclick='npc_end();'>See ya !</a>")
            }
        }
        if (m.type == "exp") {
            addInChat("You get " + m.nfo + "pt of experience that lead you up to " + m.exp + "<br/>")
        }
        if (m.type == "stopM") {
            var f = this.findObj(m.id);
            if (f == null) {
                return
            }
            console.log("Stop Move:" + m.id);
            f.stopToMove();
            var d = convertToCase(f.pos.x, f.pos.y);
            var c = {
                x: m.x,
                y: m.y
            };
            if (myDistance(d, c) > 3) {
                console.log("Distance too big:" + myDistance(d, c));
                path = this.prepareMove(d, c);
                f.starttoMove(path)
            }
        }
        if (m.type == "dead") {
            var f = this.findObj(m.id);
            if (f == null) {
                return
            }
            f.dead()
        }
        if (m.type == "degatW") {
            var f = this.findObj(m.cible);
            if (f == null) {
                return
            }
            f.atked(m.deg)
        }
        if (m.type == "degatP") {
            var f = this.findObj(m.id);
            if (f == null) {
                return
            }
            var a = this.findObj(m.cible);
            if (a == null) {
                return
            }
            console.log(f.id + " ATK " + a.id);
            console.log(m);
            f.atk(m.deg);
            a.atked(m.deg);
            case1 = convertToCase(f.pos.x, f.pos.y);
            case2 = {
                x: m.x,
                y: m.y
            };
            if (myDistance(case1, case2) > 3) {
                console.log("Distance too big:" + myDistance(case1, case2));
                path = this.prepareMove(case1, case2);
                f.starttoMove(path)
            }
            case1 = convertToCase(a.pos.x, a.pos.y);
            case2 = {
                x2: m.x,
                y2: m.y
            };
            if (myDistance(case1, case2) > 3) {
                console.log("Distance too big:" + myDistance(case1, case2));
                path = this.prepareMove(case1, case2);
                a.starttoMove(path)
            }
        }
        if (m.type == "keepAlive") {
            var l = date.getTime();
            var j = Math.abs(l - m.at)
        }
        if (m.type == "reminder") {
            var f = this.findObj(m.id);
            if (f == null) {
                return
            }
            if (myDistance({
                x: m.x,
                y: m.y
            }, convertToCase(f.posX, f.posY)) > 4) {
                console.log(f.personame + " : Zone Diff > 4")
            }
            return;
            if (m.nc == null && (f.path == null || f.path.length == 0)) {
                f.setVelocity(f.persoVel, f.persoVel);
                return
            }
            if (m.nc == null && f.path.length > 0) {
                f.setVelocity(f.accel.x + 1, f.accel.y + 1);
                return
            }
            if (f.path == null || f.path.length == 0) {
                if (myDistance({
                    x: f.posX,
                    y: f.posY
                }, {
                    x: m.x,
                    y: m.y
                }) > 2) {
                    console.log("Change Position manually");
                    var l = convertToPixel(m.x, m.y);
                    f.posX = l.x;
                    f.posY = l.y
                }
                return
            }
            if (myDistance(m.nc, f.path[0]) > 4) {
                f.setVelocity(f.accel.x + 1, f.accel.y + 1);
                return
            }
        }
        if (m.type == "gotoP") {
            var f = this.findObj(m.id);
            if (f == null) {
                return
            }
            if (debug) {
                console.log("GOTO : " + perso.personame + ":" + m.startX + "-" + m.startY + ":" + m.endX + "-" + m.endY)
            }
            var h = m.path;
            perso.starttoMove(h)
        }
    },
    updateSkill: function (b) {
        for (var a = 0; a < b.length; a++) {
            var c = "<div id=skill_" + b[a] + "><a href=# onclick=\"$('#skillBox').hide();map.myChar.useSkill(" + b[a] + '); return false;">' + skillManager[b[a]]["text"] + "(" + skillManager[b[a]]["manaCost"] + " AP)</a></div>";
            if ($("#skill_" + b[a]).html() != null) {
                $("#skill_" + b[a]).html(c)
            } else {
                $("#skillList").append(c)
            }
        }
    },
    prepareMove: function (b, a) {
        var b = this.graph.nodes[b.x][b.y];
        var a = this.graph.nodes[a.x][a.y];
        return astar.search(this.graph.nodes, b, a)
    },
    updateItems: function (b) {
        for (var a = 0; a < b.length; a++) {
            var c = itemManager[b[a]["id"]]["name"];
            if ($("#inv_" + b[a]["id"]).html() != null) {
                if (b[a]["quantity"] <= 0) {
                    $("#inv_" + b[a]["id"]).html("")
                } else {
                    $("#inv_" + b[a]["id"]).html('<a href=# onclick="map.myChar.useItem(' + b[a]["id"] + '); return false;">' + b[a]["quantity"] + "*" + c + "</a>")
                }
            } else {
                $("#inventory").append("<div id=inv_" + b[a]["id"] + '><a href=# onclick="map.myChar.useItem(' + b[a]["id"] + '); return false;">' + b[a]["quantity"] + "*" + c + "</a></div>")
            }
        }
    },
});
var persoEntity = me.ObjectEntity.extend({
    personame: null,
    persoVel: 1,
    Sprite: null,
    isMe: false,
    wearing: null,
    init: function (f, b, i, h, a, j, c, e) {
        this.persoVel = j;
        this.id = f;
        this.personame = a;
        this.Sprite = b;
        var g = convertToCase(i, h);
        g = convertToPixel(g.x, g.y);
        i = g.x;
        h = g.y;
        this.wearing = e;
        c.image = b;
        if (b[0] == "_") {
            c.spritewidth = 24
        } else {
            c.spritewidth = 32
        }
        c.spriteheight = 32;
        this.parent(i, h, c);
        this.setFriction(0, 0);
        this.gravity = 0;
        this.direction = "down";
        this.startX = i;
        this.endX = i + c.width - c.spritewidth;
        this.direction = "down";
        this.vel.x = 0;
        this.vel.y = 0;
        this.setVelocity(this.persoVel, this.persoVel);
        this.collidable = true;
        this.type = me.game.ENEMY_OBJECT;
        if (b[0] == "_") {
            this.addAnimation("down", [6, 7, 8]);
            this.addAnimation("right", [3, 4, 5]);
            this.addAnimation("left", [9, 10, 11]);
            this.addAnimation("up", [0, 1, 2]);
            this.addAnimation("die", [18, 19, 19]);
            this.addAnimation("stand-down", [6]);
            this.addAnimation("stand-right", [3]);
            this.addAnimation("stand-left", [9]);
            this.addAnimation("stand-up", [0]);
            this.addAnimation("mort2", [20]);
            this.addAnimation("mort", [18, 19, 18, 19, 18, 19, 18, 19, 18, 19, 18, 19]);
            this.addAnimation("attacked", [12, 12, 13, 13, 14, 14]);
            this.addAnimation("atk1", [12]);
            this.addAnimation("atk2", [12, 12, 13, 13, 13, 14, 14])
        } else {
            this.addAnimation("down", [0, 1, 2]);
            this.addAnimation("right", [24, 25, 26]);
            this.addAnimation("left", [12, 13, 14]);
            this.addAnimation("up", [36, 37, 38]);
            this.addAnimation("die", [87, 88, 89]);
            this.addAnimation("stand-down", [0]);
            this.addAnimation("stand-right", [24]);
            this.addAnimation("stand-left", [12]);
            this.addAnimation("stand-up", [36]);
            this.addAnimation("mort2", [87, 88, 89]);
            this.addAnimation("mort", [87, 88, 89]);
            this.addAnimation("startSpell", [66, 67, 68, 78, 79, 80, 90, 91, 92]);
            this.addAnimation("castTime", [92]);
            this.addAnimation("attacked", [60, 61, 62, 62, 62, 62]);
            this.addAnimation("atk1", [54]);
            this.addAnimation("atk2", [54, 54, 55, 55, 56, 56, 56]);
            this.addAnimation("endspell", [92, 92, 92, 92, 92, 92, 92, 92, 92, 92, 92, 92, 92, 92, 92, 92, 92, 92, 92, 92])
        }
        this.setCurrentAnimation("down");
        me.input.registerMouseEvent("mouseup", this.collisionBox, click.bind(this), false)
    },
    clicked: false,
    mouseClick: function () {
        console.log(this.personame + ": clicked");
        this.clicked = true
    },
    onCollision: function (a, b) { },
    atked: function (b) {
        if (!this.isCurrentAnimation("atk2")) {
            this.setCurrentAnimation("attacked", function () {
                if (this.isCurrentAnimation("attacked")) {
                    this.setCurrentAnimation("down")
                }
            })
        }
        var a = new hpLabel(this.pos.x - me.game.viewport.pos.x + myrand(-10, 10), this.pos.y - me.game.viewport.pos.y, b);
        me.game.add(a, interfaceLayer);
        me.game.sort()
    },
    atk: function (a) {
        console.log("Change ATK !!");
        this.setCurrentAnimation("atk2", function () {
            if (this.isCurrentAnimation("atk2")) {
                this.setCurrentAnimation("down")
            }
        })
    },
    dead: function () {
        this.setCurrentAnimation("mort", "mort2")
    },
    go: function (a) {
        this.animationspeed = me.sys.fps / 20;
        switch (a) {
            case "left":
                this.vel.x = -this.accel.x * me.timer.tick;
                this.vel.y = 0;
                break;
            case "right":
                this.vel.x = this.accel.x * me.timer.tick;
                this.vel.y = 0;
                break;
            case "up":
                this.vel.y = -this.accel.y * me.timer.tick;
                this.vel.x = 0;
                break;
            case "down":
                this.vel.y = this.accel.y * me.timer.tick;
                this.vel.x = 0;
                break;
            case "stop":
                a = this.direction;
                this.path = null;
                this.nextPos = null;
                this.setVelocity(this.persoVel, this.persoVel);
                this.vel.x = 0;
                this.vel.y = 0;
                break
        }
        if (!this.isCurrentAnimation(a) && !this.isCurrentAnimation("atk1") && !this.isCurrentAnimation("atk2") && !this.isCurrentAnimation("mort") && !this.isCurrentAnimation("mort2")) {
            this.setCurrentAnimation(a);
            this.direction = a
        }
    },
    beforeNextCase: function () {
        switch (this.direction) {
            case "left":
                if (this.pos.x <= this.nextPos.x) {
                    return false
                }
                break;
            case "right":
                if (this.pos.x >= this.nextPos.x) {
                    return false
                }
                break;
            case "up":
                if (this.pos.y <= this.nextPos.y) {
                    return false
                }
                break;
            case "down":
                if (this.pos.y >= this.nextPos.y) {
                    return false
                }
                break
        }
        return true
    },
    t: 0,
    update: function (a) {
        hadSpeed = this.vel.y != 0 || this.vel.x != 0;
        updated = this.updateMovement();
        if (this.nextPos != null && !this.beforeNextCase()) {
            this.pos.x = this.nextPos.x;
            this.pos.y = this.nextPos.y;
            this.starttoMove();
            this.t = 0
        }
        if (this.isCurrentAnimation("strike-left") || this.isCurrentAnimation("strike-right") || this.isCurrentAnimation("strike-up") || this.isCurrentAnimation("strike-down") || this.direction == "spell" || this.isCurrentAnimation("atk1") || this.isCurrentAnimation("atk2") || this.isCurrentAnimation("attacked") || this.isCurrentAnimation("mort") || this.isCurrentAnimation("mort2")) {
            updated = true
        } else {
            if (this.vel.y == 0 && this.vel.x == 0) {
                this.setCurrentAnimation("stand-" + this.direction);
                if (hadSpeed) {
                    updated = true
                }
            }
        }
        if (updated || a) {
            this.parent(this)
        }
        return updated
    },
    stopToMove: function () {
        this.go("stop")
    },
    nextPos: null,
    nextPath: [],
    starttoMove: function (a) {
        if (a != null) {
            this.path = a
        }
        if (this.path != null && this.path.length > 0) {
            this.nextPos = convertToPixel(this.path[0].pos.x, this.path[0].pos.y);
            this.manageDirection(this.pos.x, this.pos.y, this.nextPos.x, this.nextPos.y);
            this.path.shift()
        } else {
            if (this.path != null) {
                this.go("stop");
                if (this.isMe) {
                    connection.send(JSON.stringify({
                        type: "position"
                    }))
                }
            }
        }
    },
    manageDirection: function (b, d, a, c) {
        if (b > a) {
            this.go("left")
        } else {
            if (b < a) {
                this.go("right")
            } else {
                if (d > c) {
                    this.go("up")
                } else {
                    this.go("down")
                }
            }
        }
    },
    draw: function (c) {
        var a = ~~(this.pos.x - this.vp.pos.x),
            e = ~~(this.pos.y - this.vp.pos.y);
        for (var b = 0; b < 5; b++) {
            if (this.wearing && this.wearing[b] != null) {
                if (!this.wearing[b]["img"]) {
                    this.wearing[b]["img"] = me.loader.getImage(this.wearing[b]["Sprite"])
                }
                c.drawImage(this.wearing[b]["img"], this.offset.x, this.offset.y, this.width, this.height, a, e, this.width, this.height)
            }
        }
        var d = this.parent(c);
        return d
    },
});
var globImg = null;
var myPerso = persoEntity.extend({
    curHP: null,
    curMana: null,
    parentCtrl: null,
    skillList: null,
    data: null,
    name: null,
    nameFont: null,
    init: function (h, b, j, i, a, l, c, k, f, e, g, d) {
        this.data = g;
        this.curHP = l;
        this.curMana = c;
        this.parentCtrl = f;
        this.parent(h, b, j, i, a, k, e, d);
        me.game.viewport.follow(this.pos, me.game.viewport.AXIS.BOTH);
        if (g.Name) {
            this.name = g.Name
        }
        this.castB = new dataBar(this.pos.x + this.width - 5, this.pos.y - this.height - 4, 30, 5, "yellow", "black", 100);
        this.castB.visible = false;
        me.game.add(this.castB, interfaceLayer);
        this.nameFont = new me.Font("century gothic", 16, "white")
    },
    draw: function (a) {
        if (this.name != null) {
            var c = this.name;
            var b = this.nameFont.measureText(a, c);
            this.nameFont.draw(a, c, this.pos.x - me.game.viewport.pos.x + this.width / 2 - b.width / 2, this.pos.y + this.height - me.game.viewport.pos.y + 16)
        }
        this.castB.pos.x = this.pos.x + this.width / 2 - this.castB.width / 2 - me.game.viewport.pos.x;
        this.castB.pos.y = this.pos.y - this.castB.height - me.game.viewport.pos.y;
        return this.parent(a)
    },
    onCollision: function (a, b) { },
    castB: null,
    strike: function (a) {
        this.useSkill(a)
    },
    castpad: 0,
    castestart: 0,
    castW: function (a) {
        this.castB.value = 0;
        this.castB.visible = true;
        this.castpad = a;
        this.caststart = (new Date()).getTime();
        this.updCast()
    },
    castStop: function () {
        this.castB.value = 100;
        this.castB.visible = false
    },
    updCast: function () {
        var a = (new Date()).getTime() - this.caststart;
        a = a * 100 / this.castpad;
        this.castB.setValue(a);
        if (this.castB.value >= 100) {
            this.castB.visible = false
        } else {
            setTimeout(this.updCast.bind(this), 10)
        }
    },
    getHtmlData: function () {
        var b = "";
        var a = ["str", "vit", "luk", "int", "dex", "agi"];
        b += "<table cellspacing=1 cellpadding=0><tr><th>Base</th><th>Bonus</th><th>Obj Bonus</th></tr>";
        for (var c = 0; c < a.length; c++) {
            b += "<tr><td>" + a[c] + " :</td><td>" + this.data[a[c]] + "</td>";
            b += "<td>";
            if (this.data.bonus && this.data.bonus[a[c]]) {
                var d = this.data.bonus[a[c]];
                if (d > 0) {
                    b += "<font color=green>+" + d + "</font>"
                }
                if (d < 0) {
                    b += "<font color=red>-" + d + "</font>"
                }
            }
            b += "</td>";
            b += "<td>";
            if (this.data.wearingBonus && this.data.wearingBonus[a[c]]) {
                var d = this.data.wearingBonus[a[c]];
                if (d > 0) {
                    b += "<font color=green>+" + d + "</font>"
                }
                if (d < 0) {
                    b += "<font color=red>-" + d + "</font>"
                }
            }
            b += "</td>";
            if (this.data.lvlPts > this.data[a[c]] / 10) {
                b += "<td><a href=# onclick=\"addStat('" + a[c] + "')\">+</a></td>"
            }
            b += "</tr>"
        }
        b += "<tr><td>Point Cpts :</td><td colspan=10>" + this.data.lvlPts + "</td></tr>";
        b += "</table>";
        return b
    },
    lastP: 0,
    update: function () {
        this.parentCtrl.hpBar.setValue(this.curHP);
        this.parentCtrl.manaBar.setValue(this.curMana);
        if (this.curHP <= 0) {
            this.dead()
        }
        if (!this.visible) {
            return false
        }
        var b = convertToCase(this.pos.x, this.pos.y);
        this.parent();
        var a = convertToCase(this.pos.x, this.pos.y);
        if (b.x != a.x || b.y != a.y) {
            dX = Math.floor(this.pos.x / 32);
            dY = Math.floor(this.pos.y / 32)
        }
        this.castB.pos.x = this.pos.x + this.height / 2 - this.castB.width / 2;
        this.castB.pos.y = this.pos.y + this.height + this.castB.height
    },
    useItem: function (a) {
        connection.send(JSON.stringify({
            type: "useItem",
            id: a
        }))
    },
    useSkillT: function (a, b) {
        tmpType = this.tmpSkill.spellType;
        if (tmpType == SPELL.TARGET) {
            this.useSkill(this.tmpSkill.ID, b)
        } else {
            this.useSkill(this.tmpSkill.ID, a)
        }
        selectingObj = false
    },
    tmpSkill: 0,
    useSkill: function (b, c) {
        var a = getSkill(b);
        tmpType = a.spellType;
        if ((tmpType == SPELL.TARGET || tmpType == SPELL.ZONE) && c == null) {
            selectingObj = true;
            this.tmpSkill = a;
            kami("<font color=yellow>Please Choice a target </font><br/>");
            return
        }
        if (this.path != null && this.path.length > 0) {
            console.log("Please finish you move before any skill !!!");
            return
        }
        if (tmpType == SPELL.TARGET) {
            c = c.id
        }
        this.vel.x = 0;
        this.vel.y = 0;
        this.setCurrentAnimation("startSpell", function () {
            this.setCurrentAnimation("castTime")
        });
        this.direction = "spell";
        connection.send(JSON.stringify({
            type: "cast",
            data: b,
            target: c
        }));
        console.log("sent");
        striked = true;
        changed = true
    },
    nfoUpd: function (a, b) {
        switch (a) {
            case "hp":
                this.curHP = b;
                break;
            case "mana":
                this.curMana = b;
                break;
            default:
                break
        }
    },
    path: null,
    gotoL: function (b, a) {
        connection.send(JSON.stringify({
            type: "goto",
            endX: b,
            endY: a
        }))
    },
    follow: function (a) {
        if (a != null) {
            globalNPC = a.id;
            connection.send(JSON.stringify({
                type: "atk",
                id: a.id
            }))
        }
    },
    isMe: true,
});

function notInPath(c, a) {
    if (c == null) {
        return true
    }
    for (var b = 0; b < c.length; b++) {
        if (c[b].x == a.x && c[b].y == a.y) {
            return false
        }
    }
    return true
}
var PlayScreen = me.ScreenObject.extend({
    onPause: function () { },
    init: function () {
        this.parent(true);
        this.myfont8 = new me.Font("myFONT", 14, "white");
        this.mybg = me.loader.getImage("BG_PLAY")
    },
    onResetEvent: function () {
        me.input.bindKey(me.input.KEY.LEFT, "left", true);
        me.input.bindKey(me.input.KEY.RIGHT, "right", true);
        me.input.bindKey(me.input.KEY.X, "SPELL", true)
    },
    update: function () {
        me.game.sort();
        if (me.input.isKeyPressed("SPELL")) { }
        if (cibleSelection[0]) {
            if (me.input.isKeyPressed("right")) {
                oList[cibleSelection[1]].cibleUnselected();
                if (cibleSelection[1] < oList.length - 1) {
                    cibleSelection[1]++
                } else {
                    cibleSelection[1] = 0
                }
                oList[cibleSelection[1]].cibleSelected()
            } else {
                if (me.input.isKeyPressed("left")) {
                    oList[cibleSelection[1]].cibleUnselected();
                    if (cibleSelection[1] > 0) {
                        cibleSelection[1]--
                    } else {
                        cibleSelection[1] = oList.length - 1
                    }
                    oList[cibleSelection[1]].cibleSelected()
                }
            }
        }
    },
    draw: function (a) {
        me.video.clearSurface(a, "black");
        a.drawImage(this.mybg, 0, 0);
        this.parent(a)
    },
    onDestroyEvent: function () {
        this.end = true
    }
});
var TitleScreen = me.ScreenObject.extend({
    init: function () {
        this.parent(true);
        this.font = null;
        this.title = null;
        this.myfont = new me.Font("myFONT", 32, "white");
        this.myfont16 = new me.Font("myFONT", 16, "white");
        initWS()
    },
    onResetEvent: function () {
        curID = 1;
        me.input.bindKey(me.input.KEY.X, "enter", true);
        me.input.bindMouse(me.input.mouse.LEFT, me.input.KEY.X)
    },
    update: function () {
        if (me.input.isKeyPressed("enter") && skillManager.length > 0) {
            me.state.change("map")
        }
        return true
    },
    draw: function (b) {
        this.parent(b);
        me.video.clearSurface(b, "black");
        var a = "Moko RT !";
        logo_width = this.myfont.measureText(b, a).width;
        logo_height = this.myfont.measureText(b, a).height;
        this.myfont.draw(b, a, ((b.canvas.width - logo_width) / 2), (b.canvas.height / 2 - logo_height));
        if (skillManager.length <= 0) {
            var a = "Skill Loading ..."
        } else {
            var a = "Press X to continue"
        }
        logo_width = this.myfont16.measureText(b, a).width;
        logo_height = this.myfont16.measureText(b, a).height;
        this.myfont16.draw(b, a, b.canvas.width / 2 - logo_width / 2, b.canvas.height / 2);
        var a = "MELONJS DEMO : 7";
        txt_width = this.myfont16.measureText(b, a).width;
        txt_height = this.myfont16.measureText(b, a).height;
        this.myfont16.draw(b, a, b.canvas.width - txt_width, 0 + txt_height);
        var a = "NORB";
        txt_width = this.myfont16.measureText(b, a).width;
        txt_height = this.myfont16.measureText(b, a).height;
        this.myfont16.draw(b, a, 0, b.canvas.height - txt_height)
    },
    onDestroyEvent: function () {
        me.input.unbindKey(me.input.KEY.X)
    }
});
var SPELL = {
    SELF: 0,
    TARGET: 1,
    GROUP: 2,
    ZONE: 3
};

function skillClass(f) {
    var c = f.id;
    var b = f.text;
    var d = f.effect;
    var e = f.type;
    var a = f.width;
    var g = f.height;
    if (a > 0) {
        this.sizeX = a
    } else {
        this.sizeX = 192
    }
    if (g > 0) {
        this.sizeY = g
    } else {
        this.sizeY = 192
    }
    this.ID = c;
    this.Name = b;
    this.Anim = d;
    this.spellType = e;
    this.startEffect = function (h, k) {
        var i;
        if (h.spellType == SPELL.SELF) {
            i = new miniAnim(k.pos.x - this.sizeX / 2, k.pos.y - this.sizeY / 2, this.sizeX, this.sizeY, this.Anim, false)
        } else {
            if (h.spellType == SPELL.TARGET) {
                var j = map.findObj(k);
                if (j == null) {
                    return alert("Target no found !")
                }
                i = new miniAnim(j.pos.x - this.sizeX / 2, j.pos.y - this.sizeY / 2, this.sizeX, this.sizeY, this.Anim, false)
            } else {
                if (h.spellType == SPELL.ZONE) {
                    i = new miniAnim(k.x * 32 - this.sizeX / 2, k.y * 32 - this.sizeY / 2, this.sizeX, this.sizeY, this.Anim, false)
                } else {
                    if (h.spellType == SPELL.GROUP) {
                        return alert("GROUP No Done !!!")
                    }
                }
            }
        }
        me.game.add(i, interfaceLayer);
        me.game.sort()
    }
}
function getSkill(a) {
    if (skillManager[a]) {
        return new skillClass(skillManager[a])
    }
    return null
}
var skillManager = new Array();
var chatOn = false;
var radar2;
var globalNPC = null;
$(document).ready(function () {
    $("div.draggable").draggable({
        start: function (a, b) {
            $(this).css({
                opacity: 0.5
            })
        },
        stop: function (a, b) {
            $(this).css({
                opacity: 1
            })
        }
    });
    $("div.draggable").disableSelection();
    $("#chat").mouseenter(function () {
        chatOn = true;
        $("#chat").animate({
            opacity: 1
        }, 200);
        $("#chat_input").focus()
    });
    $("#jsapp").mouseenter(function () {
        chatOn = false;
        $("#chat").animate({
            opacity: 0.5
        }, 200);
        $("#c_msgs").focus();
        $("#chat_input").blur()
    });
    $("#chat").mouseup(function () {
        chatOn = true;
        $("#chat").animate({
            opacity: 1
        }, 200);
        $("#chat_input").focus()
    });
    $(document).keypress(function (a) {
        if (screenMapKeyb) {
            console.log("Key : " + a.keyCode + ":" + a.charCode);
            if (a.keyCode == 13) {
                $("#chat").show();
                if (chatOn) {
                    connection.send(JSON.stringify({
                        type: "msg",
                        msg: $("#chat_input").val()
                    }));
                    chatOn = false;
                    $("#chat").animate({
                        opacity: 0.5
                    }, 200);
                    $("#c_msgs").focus();
                    $("#chat_input").val("");
                    $("#chat_input").blur()
                } else {
                    chatOn = true;
                    $("#chat").animate({
                        opacity: 1
                    }, 200);
                    $("#chat_input").focus()
                }
            }
            if (a.charCode == 99) {
                if (!chatOn) {
                    if ($("#nfoZone").is(":visible")) {
                        $("#nfoZone").hide()
                    } else {
                        $("#nfoZone").show();
                        map.prepareStat()
                    }
                }
            }
            if (a.charCode == 97) {
                if (!chatOn) {
                    map.myChar.strike(1)
                }
            }
            if (a.charCode == 122) {
                if (!chatOn) {
                    map.myChar.strike(2)
                }
            }
            if (a.charCode == 101) {
                if (!chatOn) {
                    map.myChar.strike(3)
                }
            }
            if (a.charCode == 114) {
                if (!chatOn) {
                    map.myChar.strike(4)
                }
            }
            if (a.charCode == 115) {
                if (!chatOn) {
                    if ($("#skillBox").is(":visible")) {
                        $("#skillBox").hide()
                    } else {
                        $("#skillBox").show()
                    }
                }
            }
            if (a.charCode == 105) {
                if (!chatOn) {
                    if ($("#inventoryBox").is(":visible")) {
                        $("#inventoryBox").hide()
                    } else {
                        $("#inventoryBox").show()
                    }
                }
            }
        } else {
            if (a.keyCode == 13) { }
        }
    });
    $("#jsapp").focus()
});
var selectingObj = false;

function click() {
    if (selectingObj == true) {
        map.myChar.useSkillT(null, this)
    } else {
        if (map.myChar != null) {
            globalNPC = null;
            map.myChar.follow(this)
        }
    }
    return false
}
function mouseUI() {
    var c = convertToCase(me.game.viewport.pos.x + me.input.mouse.pos.x, me.game.viewport.pos.y + me.input.mouse.pos.y);
    var b = c.x;
    var a = c.y;
    $("#xyinput").val(b + "-" + a);
    if (selectingObj == true) {
        map.myChar.useSkillT(c, null)
    } else {
        if (map.myChar != null) {
            c = convertToCase(map.myChar.pos.x, map.myChar.pos.y);
            map.myChar.gotoL(b, a)
        }
    }
    return true
}
function convertToCase(a, d) {
    var b = Math.floor(a / 32);
    var c = Math.floor(d / 32);
    return {
        x: b,
        y: c
    }
}
function convertToPixel(a, d) {
    var b = Math.floor(a * 32);
    var c = Math.floor(d * 32);
    return {
        x: b,
        y: c
    }
}
function addInChat(a) {
    $("#c_msgs").append(a);
    $("#c_msgs").animate({
        scrollTop: document.getElementById("c_msgs").scrollHeight
    }, 1000)
}
function kamiClear() {
    $("#kamiZone").html("")
}
function kami(a) {
    $("#kamiZone").html(a);
    setTimeout(kamiClear, 3000)
}
var onObj = null;

function changeMouse() {
    onObj = this;
    return false
}
function changeMouseOff() {
    if (onObj != null) {
        onObj.flicker(0);
        onObj = null
    }
}
function myDistance(b, a) {
    return Math.abs(b.x - a.x) + Math.abs(b.y - a.y)
}
function npc_next() {
    if (globalNPC != null) {
        connection.send(JSON.stringify({
            type: "atk",
            id: globalNPC
        }))
    }
}
function npc_accept_y() {
    if (globalNPC != null) {
        connection.send(JSON.stringify({
            type: "atk",
            id: globalNPC,
            rest: "Y"
        }))
    }
}
function npc_accept_n() {
    if (globalNPC != null) {
        connection.send(JSON.stringify({
            type: "atk",
            id: globalNPC,
            rest: "N"
        }))
    }
}
function npc_end() {
    $("#chat").show();
    $("#npcZone").hide()
}
function addStat(a) {
    connection.send(JSON.stringify({
        type: "NFO_ADD",
        tpe: a
    }))
}
function mvStart(a) {
    if ($(a).is(":animated")) {
        $(a).stop();
        $(a).css({
            opacity: 0.5
        });
        return
    }
    $(a).animate({
        opacity: 0.5
    }, 200)
}
function mvStop(a) {
    if ($(a).is(":animated")) {
        $(a).stop();
        $(a).css({
            opacity: 1
        });
        return
    }
    $(a).animate({
        opacity: 1
    }, 200)
}
var connection = null;
var ip = "88.191.152.74";
var port = 1337;

function initWS() {
    window.WebSocket = window.WebSocket || window.MozWebSocket;
    if (!window.WebSocket) {
        alert("Socket KO");
        return
    }
    connection = new WebSocket("ws://88.191.152.74:1337");
    connection.onopen = function () { };
    connection.onerror = function (a) {
        document.location = "?action=deco"
    };
    connection.onclose = function (a) {
        document.location = "?action=deco"
    };
    connection.onmessage = function (b) {
        try {
            var a = JSON.parse(b.data)
        } catch (c) {
            console.log("This doesn't look like a valid JSON: ", b.data);
            return
        }
        if (a.type == "time") { }
        if (a.type == "ERR") {
            alert(a.data)
        }
        if (me.state.isCurrent("map")) {
            map.WSManagement(a)
        }
        if (a.type == "skillList") {
            skillManager = a.data
        }
        if (a.type == "itemList") {
            itemManager = a.data
        }
    }
};