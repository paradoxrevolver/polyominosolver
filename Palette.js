/*

*/
if (ps.flags.SHOW_LOGS) console.log("Creating the Palette.");
ps.Palette = function () {
  let that = this;

  that.init = function () {
    // stores Polyomino objects
    that.polyominoes = new HashMap();
  }

  /*
    Adds a given Polyomino to the Palette
  */
  that.add = function (polyomino) {
    that.polyominoes.set(ps.hashPolyomino(polyomino), polyomino);
  }
  
  /*
    Removes a Polyomino from the Palette given a hashcode of a Polyomino
  */
  that.remove = function(hash) {
    that.polyominoes.remove(hash);
  }
  
  /*
    Returns a String of ASCII Polyominoes that resembles the contents of the Palette
  */
  that.toString = function() {
    let temp = "The contents of the Palette:\n";
    that.polyominoes.forEach( function(polyomino, hash) {
      temp += polyomino.toString() + "\n";
    });
    return temp;
  }
  
  // init
  that.init();
}
