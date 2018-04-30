/*
 * using Node.js perhaps?
 */

ps.SaveObject = function(aPalette, aBank) {
    let that = this;

    var obj = {
        palette: [],
        bank: []
    };

    that.init = function(aPalette, aBank) {
        /*
         * push polyominoes to palette and bank
         * 
         */
        for (var i = 0; i < aPalette.size; i++) {
            // keep in mind polyominoes are made of vec2
            that.obj.palette.push( /* key : value */ );
        }

        for (var i = 0; i < aBank.size; i++) {
            // same as above
            that.obj.bank.push( /*k : v*/ );
        }

    }

}