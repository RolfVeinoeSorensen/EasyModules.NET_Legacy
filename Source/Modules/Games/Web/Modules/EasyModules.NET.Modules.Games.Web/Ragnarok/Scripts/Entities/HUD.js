/****************************/
/*                         */
/* a GoldObject HUD Item  */
/*						   */
/***************************/
var GoldObject = me.HUD_Item.extend(
{
    init: function (x, y) {
        // call the parent constructor
        this.parent(x, y);
        // create a font
        this.font = new me.BitmapFont("16x16_font", 16);
    },
    /* -----

        draw our score
        
    ------			*/
    draw: function (context, x, y) {
        this.font.draw(context, 'GOLD ' + this.value, this.pos.x + x, this.pos.y + y);
    }

});