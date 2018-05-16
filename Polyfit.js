/*
  A Polyfit is a permutation of Polyominoes that follows specific rules.
  
  @param polyominoes is an array of Polyomino objects that still compromises a valid polyfit.
         [Polyomino, Polyomino, ...]
  @param polyexpands is an array of Polyexpand objects that still need to be inserted to complete the fit
         [Polyexpand, Polyexpand, ...]
*/
if (ps.flags.SHOW_LOGS) console.log("Creating the Polyfit.");
ps.Polyfit = function (polyominoes, polyexpands, field, prevHardestSquare) {
  let that = this;
  that.init = function (polyominoes, polyexpands, field, prevHardestSquare) {
    // create a shallow copy of the array for the Polyomino references to sit in.
    // this is important because we may later remove references and we don't want to alter the arrays of anything else.
    that.solution = polyominoes;
    that.polyexpands = polyexpands;
    that.field = field;
    that.prevHardestSquare = prevHardestSquare;
    that.hardestSquare = that.getHardestSquare();
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
    that.polyexpands.forEach(function (polyexpand, i) {
      if (ps.flags.SHOW_LOOP_LOGS) {
        console.log("%c--- Now accessing Polyexpand #" + i + " ######################################################", "background-color:#ccc");
        console.log("--- Inserting the following Polyomino:\n" + polyexpand.polyominoes[0].toString());
        console.log("--- Into the following solution:\n" + that.toString());
      }

      polyexpand.polyominoes.forEach(function (polyomino, j) {
        if (ps.flags.SHOW_LOOP_LOGS) console.log("----- Checking solution #" + i + "-" + j);
        // create a new solution and add the current polyomino from this polyexpand
        let newSolution = that.solution.slice(0);
        newSolution.push(polyomino);
        // create a new Polyexpand that is missing the Polyexpand we're looking at
        let newPolyexpands = that.polyexpands.slice(0);
        newPolyexpands.splice(i, 1);
        // create a new Polyfit with the new solution and set of Polyexpands
        let newPolyfit = new ps.Polyfit(newSolution, newPolyexpands, that.field, that.hardestSquare);
        // once initalization passes, we'll know if the new Polyfit is valid or not so we can save it
        if (newPolyfit.isValid) {
          if (ps.flags.SHOW_LOOP_LOGS) {
            console.log("----- The following Polyfit is %cVALID:\n", "color:#0a0");
            console.log("%c" + newPolyfit.toString(), "color:#0a0");
          }

          polyfits.push(newPolyfit);
        } else {
          if (ps.flags.SHOW_LOOP_LOGS) {
            console.log("----- The following Polyfit was %cDELETED:\n", "color:#a00");
            console.log("%c" + newPolyfit.toString(), "color:#a00");
          }

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
  that.solutionIsValid = function () {
    // CASE: if there are no problems, this will remain true
    let result = true;

    // CASE: there is overlap 
    // for every element in this Polyfit's solution
    for (let i = 0; i < that.solution.length; i++) {
      // for every element behind the element in this solution
      if (result) {
        for (let j = 0; j < i; j++) {
          // if there's overlap, the solution isn't valid
          if (that.solution[i].overlaps(that.solution[j])) {
            if (ps.flags.SHOW_LOOP_LOGS) console.error("----- Polyominoes are overlapping");
            result = false;
          }
        }
      }
    }

    // CASE: polyomino does not follow Gerard's rule
    if (result) {
      // we should count how many times a match could be found
      let successes = 0;
      // for every Polyomino in this Polyfit's solution
      that.solution.forEach(function (polyomino) {
        if (polyomino.squares.has(that.prevHardestSquare.hash)) {
          successes++;
        }
      });
      if( successes === 0 ){
        if( ps.flags.SHOW_LOOP_LOGS) console.error("----- Polyomino couldn't fit in hardest square");
        result = false;
      }
    }
    
    

    return result;
  }

  /*
    Returns a String that resembles the current 
  */
  that.toString = function () {
    let result = "";
    let max = that.field.getMax();

    for (let j = max.y; j >= 0; j--) {
      for (let i = 0; i <= max.x; i++) {
        let coords = {
          x: i,
          y: j
        };
        result += that.getPolyominoCharacter(coords) + " ";
      }
      result += "\n";
    }
    return result;
  }

  /*
    Returns a single Vec2 that is the hardest square to fill in the Polyfit
  */
  that.getHardestSquare = function () {
    // save all the field's vectors
    let vectors = that.field.squares.values();
    let hardestSquare = undefined;
    let hardestSquareCount = 0;
    // for each vector in the field
    vectors.forEach(function (vector) {
      // first make sure the current vector isn't empty
      if (that.isFieldEmpty(vector.x, vector.y)) {
        // if a new vector is more surrounded, it replaces the hardest to fill square
        let currentCount = that.getSurroundingSides(vector.x, vector.y);
        if (currentCount > hardestSquareCount) {
          hardestSquareCount = currentCount;
          hardestSquare = vector;
        }
      }
    });
    return hardestSquare;
  }

  /*
    Returns the number of sides that this square is surrounded by
  */
  that.getSurroundingSides = function (x, y) {
    let result = 0;
    // check all four sides surrounding this square
    if (!that.isFieldEmpty(x + 1, y))
      result++;
    if (!that.isFieldEmpty(x - 1, y))
      result++;
    if (!that.isFieldEmpty(x, y + 1))
      result++;
    if (!that.isFieldEmpty(x, y - 1))
      result++;

    return result;
  }

  /*
    Returns false if the space is not in the field or is occupied by a Polyomino in the solution.
    Returns true otherwise.
  */
  that.isFieldEmpty = function (x, y) {
    // CASE: the space is in the field and is not empty
    let result = true;
    let max = field.getMax();
    let coords = {
      x: x,
      y: y
    };

    // CASE: x is outside of the field entirely
    if (x < 0 || x > max.x)
      result = false;

    // CASE: y is outside of the field entirely
    if (result && (y < 0 || y > max.y))
      result = false;

    // CASE: the square is not actually in the field despite being within its maximum and minimum
    if (result && !(that.field.squares.has(ps.hashCoords(coords))))
      result = false;

    // CASE: the square is already occupied by a Polyomino in the solution
    if (result) {
      that.solution.forEach(function (polyomino) {
        if (polyomino.squares.has(ps.hashCoords(coords))) {
          result = false;
        }
      });
    }
    return result;
  }

  /*
    Returns a single character representing the Polyomino at x, y. Returns "." if there is no Polyomino at this location.
  */
  that.getPolyominoCharacter = function (coords) {
    let result = ".";
    let characterWasFound = false;
    // run through every Polyomino in the solution
    that.solution.forEach(function (polyomino, i) {
      // check if (x,y) can be found in this polyomino
      if (!characterWasFound && polyomino.squares.has(ps.hashCoords(coords))) {
        result = String.fromCharCode(97 + i);
        characterWasFound = true;
      }
    });
    // if nothing was found in the solution, it doesn't exist, return "."
    return result;
  }

  that.init(polyominoes, polyexpands, field, prevHardestSquare);
}
