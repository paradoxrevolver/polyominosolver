/*
 * using Node.js perhaps?
 */

console.log("Creating the SaveObject.");
ps.SaveObject = function(aPalette, aBank) {
    let that = this;

    /**
     * noteworthy things to save, the palette, bank, and field.
     * what should be saved in the palette and bank are Polyominoes, which are collections of vec2.
     * and what should be saved in the field is a set of vec2.
     */
    that.obj = {
        constuctor: [],
        palette: [],
        bank: [],
        field: []
    };

    /**
     * push polyominoes to palette and bank.
     * could i just push the set of polyominoes to the palette
     * instead of iterating?
     */
    that.init = function(aPalette, aBank) {
        // WEAKMAPS DON'T HAVE SIZE
        for (var i = 0; i < aPalette.size; i++) {
            // keep in mind polyominoes are made of vec2
            that.obj.palette.push( /* key : value */ );
        }

        for (var i = 0; i < aBank.size; i++) {
            // same as above
            that.obj.bank.push( /*k : v*/ );
        }

    }

    that.export = function() {

    }
}