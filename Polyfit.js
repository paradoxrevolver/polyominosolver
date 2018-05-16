/*
  A Polyfit is a permutation of Polyominoes that follows specific rules.
  
  @param polyominoes is an array of Polyomino objects that still compromises a valid polyfit.
         [Polyomino, Polyomino, ...]
  @param polyexpands is an array of Polyexpand objects that still need to be inserted to complete the fit
         [Polyexpand, Polyexpand, ...]
*/
if (ps.flags.SHOW_LOGS) console.log("Creating the Polyfit.");
ps.Polyfit = function (polyominoes, polyexpands, field) {
  let that = this;
  that.init = function (polyominoes, polyexpands, field) {
    // create a shallow copy of the array for the Polyomino references to sit in.
    // this is important because we may later remove references and we don't want to alter the arrays of anything else.
    that.solution = polyominoes;
    that.polyexpands = polyexpands;
    that.field = field;
    that.isValid = that.solutionIsValid();
  }

  /*
    Returns an array of Polyfits [Polyfit, Polyfit, ...] such that the entire array is
    a new set of combinations of Polyominoes that is still valid.
    The new set of Polyfits will all have one more Polyomino in their solutions.
    Every Polyfit is also given a new array of references to Polyominoes and a new array of references to Polyexpands to add 
  */
  that.next = function () {
    // start array of Polyfits to return
    let polyfits = [];
    // for each work in progress solution in this polyfit
    that.polyexpands.forEach( function(polyexpand, i) {
      if (ps.flags.SHOW_LOOP_LOGS) console.log("--- Now accessing Polyexpand #" + i);
      
      polyexpand.polyominoes.forEach(function(polyomino, j) {
        if (ps.flags.SHOW_LOOP_LOGS) console.log("----- Checking solution #" + i + "-" + j);
        // create a new solution and add the current polyomino from this polyexpand
        let newSolution = that.solution.slice(0);
        newSolution.push(polyomino);
        // create a new Polyexpand that is missing the Polyexpand we're looking at
        let newPolyexpands = that.polyexpands.slice(0);
        newPolyexpands.splice(i, 1);
        // create a new Polyfit with the new solution and set of Polyexpands
        let newPolyfit = new ps.Polyfit(newSolution, newPolyexpands, that.field);
        // once initalization passes, we'll know if the new Polyfit is valid or not so we can save it
        if( newPolyfit.isValid ) {
          if (ps.flags.SHOW_LOOP_LOGS) console.log("----- The following Polyfit was valid:\n" + newPolyfit.toString());
          polyfits.push(newPolyfit);
        }
        else {
          if (ps.flags.SHOW_LOOP_LOGS) console.log("----- An invalid Polyfit was deleted.")
          delete newPolyfit;
        }
      });
    });
    return polyfits;
  }
  
  /*
    Returns true if the current solution follows a set of specific rules that makes a Polyfit valid.
    Returns false otherwise.
  */
  that.solutionIsValid = function() {
    // CASE: if there are no problems, this will remain true
    let result = true;
    
    // CASE: there is overlap 
    // for every element in this Polyfit's solution
    for( let i = 0; i < that.solution.length; i++ ) {
      // for every element behind the element in this solution
      if( result ) {
        for( let j = 0; j < i; j++ ) {
          // if there's overlap, the solution isn't valid
          if( that.solution[i].overlaps(that.solution[j]) ) {
            result = false;
          }
        }
      }
    }
    
    return result;
  }
  
  /*
    Returns a String that resembles the current 
  */
  that.toString = function() {
    let result = "";
    let max = that.field.getMax();
    
    for( let j = max.y; j >= 0 ; j-- ) {
      for( let i = 0; i <= max.x; i++ ) {
        let coords = {x:i, y:j};
        result += that.getPolyominoCharacter(coords);
      }
      result += "\n";
    }
    return result;
  }
  
  /*
    Returns a single character representing the Polyomino at x, y. Returns "." if there is no Polyomino at this location.
  */
  that.getPolyominoCharacter = function(coords) {
    let result = ".";
    let characterWasFound = false;
    // run through every Polyomino in the solution
    that.solution.forEach(function(polyomino, i) {
      // check if (x,y) can be found in this polyomino
      if( !characterWasFound && polyomino.squares.has(ps.hashCoords(coords)) ) {
        result = String.fromCharCode(97 + i);
        characterWasFound = true;
      }
    });
    // if nothing was found in the solution, it doesn't exist, return "."
    return result;
  }

  that.init(polyominoes, polyexpands, field);
}
