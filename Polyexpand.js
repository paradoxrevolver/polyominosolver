/*
  A Polyexpand object is container dedicated to boolean logic involving groups of Polyomino objects.
  Polyexpand is capable of expanding a Polyomino into all possible locations on the Field.

  @param polyomino is a single Polyomino object that the Polyexpand houses to begin with.
  @param field is also a single Polyomino that represents all the spaces Polyominoes can be put into.
  @param rules is an object with several boolean variables specifying rules for expansion.
*/
if (ps.flags.SHOW_LOGS) console.log("Creating the Polyexpand.");
ps.Polyexpand = function (polyomino, field, rules) {
  let that = this;

  /*
    Initalize the Polyexpand
  */
  that.init = function (polyomino, field, rules) {
    // save given objects
    that.polyominoes = [polyomino];
    that.field = field;
    that.rules = rules;

    // if this Polyexpand should have reflections of this Polyomino, add all the reflections
    if (that.rules.allowReflections) {
      that.expandReflections();
    }

    // if this Polyexpand should have rotations of this Polyomino, add all the rotations
    if (that.rules.allowRotations) {
      that.expandRotations();
    }
    
    // now that all unique variation of Polyominoes exist, we can account for the field.
    // this function will take a while. by the end, this Polyexpand will have all possible fitting positions on the Field.
    that.expandPositions();
  }

  /*
    Creates all unique reflection over the Y axis of all polyominoes currently in this Polyexpand
  */
  that.expandReflections = function () {
    // we'll create reflections of any currently existing Polyominoes
    that.polyominoes.forEach(function (polyomino) {
      let newPoly = polyomino.clone();
      newPoly.flipY();
      newPoly.reset();
      newPoly.sort();
      // if the new Polyomino already exists in this Polyexpand
      if (that.alreadyExists(newPoly))
        // delete it
        delete newPoly;
      else
        // otherwise, add it
        that.polyominoes.push(newPoly);
    });
  }

  /*
    Creates all unique rotations of all polyominoes currently in this Polyexpand
  */
  that.expandRotations = function () {
    // we'll create reflections of any currently existing Polyominoes
    that.polyominoes.forEach(function (polyomino) {
      for (let i = 1; i <= 3; i++) {
        let newPoly = polyomino.clone();
        newPoly.rotate(i * 90);
        newPoly.reset();
        newPoly.sort();
        // if the new Polyomino already exists in this Polyexpand
        if (that.alreadyExists(newPoly))
          // delete it
          delete newPoly;
        else
          // otherwise, add it
          that.polyominoes.push(newPoly);
      }
    });
  }

  /*
    Creates all unique positions of all polyominoes 
  */
  that.expandPositions = function () {
    let newPolyominoes = [];
    let max = field.getMax();
    // for every Polyomino...
    that.polyominoes.forEach(function(polyomino) {
      let polyMax = polyomino.getMax();
      // for every row in the Field...
      for( let i = 0; i <= max.x - polyMax.x; i++ ) {
        // for every column in every row...
        for( let j = 0; j <= max.y - polyMax.y; j++ ) {
          let newPoly = polyomino.clone();
          newPoly.shift(i, j);
          if( that.fits(newPoly) ) {
            newPolyominoes.push(newPoly);
          }
          else {
            delete newPoly;
          }
        }
      }
    });
    // replace this Polyexpand's polyominoes entirely. all positions have been found.
    delete that.polyominoes;
    that.polyominoes = newPolyominoes;
  }

  /*
    Returns true if the given Polyomino, in its current orientation, will fit in the Field
    Returns false otherwise.
  */
  that.fits = function (polyomino) {
    return that.field.contains(polyomino);
  }

  /*
    Return true if the given Polyomino already exists within this Polyexpand
    Return false otherwise.
  */
  that.alreadyExists = function (given) {
    let result = false;
    // run through all polyominoes in this Polyexpand
    that.polyominoes.forEach(function (polyomino) {
      // if there's an equality at any point
      if (given.equals(polyomino))
        result = true;
    });
    return result;
  }
  
  that.toString = function() {
    let temp = "";
    let customMax = field.getMax();
    that.polyominoes.forEach(function(polyomino) {
      temp += polyomino.toString(customMax) + "\n";
    });
    return temp;
  }

  // initialize
  that.init(polyomino, field, rules);
}
