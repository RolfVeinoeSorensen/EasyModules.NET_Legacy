/**
 * sprite animations for a single animation sheet
 */
var spriteAnimationSheetSmall = {
    'stand-down': [0], 'run-down': [0, 1, 2, 3],
    'stand-left': [4], 'run-left': [4, 5, 6, 7],
    'stand-right': [8], 'run-right': [8, 9, 10, 11],
    'stand-up': [12], 'run-up': [12, 13, 14, 15]
},

/**
 * sprite animations for standing npcs
 */
spriteAnimationSheetStanding = {
    1: { 'standing': [1], 'look-around': [13, 1, 25, 1] },
    2: { 'standing': [4], 'look-around': [16, 4, 28, 4] },
    3: { 'standing': [7], 'look-around': [19, 7, 31, 7] },
    4: { 'standing': [10], 'look-around': [22, 10, 34, 10] },
    5: { 'standing': [49], 'look-around': [61, 49, 73, 49] },
    6: { 'standing': [51], 'look-around': [64, 51, 76, 51] },
    7: { 'standing': [55], 'look-around': [67, 55, 79, 55] },
    8: { 'standing': [58], 'look-around': [70, 58, 82, 58] }
};

//this.addAnimation("stand-down", [0]);
//this.addAnimation("stand-left", [4]);
//this.addAnimation("stand-up", [12]);
//this.addAnimation("stand-right", [8]);
//this.addAnimation("down", [0, 1, 2, 3]);
//this.addAnimation("left", [4, 5, 6, 7]);
//this.addAnimation("up", [12, 13, 14, 15]);
//this.addAnimation("right", [8, 9, 10, 11]);