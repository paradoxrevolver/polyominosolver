/*
  The Solver is actually responsible for the algorithm that perform automatic polyomino fitting.
  polyominoes is an array of Polyominoes [Polyomino, Polyomino, ...]
  field is a single Polyomino
  rules is an object with specific attributes that specify solving behavior
*/
if (ps.flags.SHOW_LOGS) console.log("Creating the Solver.");
ps.Solver = function (polyominoes, field, rules) {
  let that = this;

  /*
    Initalizes the Solver
  */
  that.init = function (polyominoes, field, rules) {
    // save variables to Solver
    that.polyominoes = polyominoes;
    that.field = field;
    that.rules = rules;

    // validate the solver
    let validation = that.validateSolver();
    that.solverIsValid = validation.solverIsValid;

    // consider validation results
    if (ps.flags.SHOW_LOGS) console.log(validation.errorMessage);
    if (!validation.solverIsValid) ps.showSnackbar(validation.snackbarMessage);
    // if the validation fails early, just quit.
    if (!that.solverIsValid) return;

    // the solver is now validated, so let's generate Polyexpands.
    that.polyexpands = [];
    // create new Polyexpands
    that.polyominoes.forEach( function(polyomino) {
      let newPolyexpand = new ps.Polyexpand(polyomino, field, rules);
      // only add if the new Polyexpand actually created valid Polyominoes
      if( newPolyexpand.polyominoes.length > 0 ) {
        that.polyexpands.push(newPolyexpand);
      }
      else {
        delete newPolyexpand;
      }
    });
    if (ps.flags.SHOW_LOGS) console.log("All Polyexpands created:");
    if (ps.flags.SHOW_LOGS) console.log(that.polyexpands);
    if (ps.flags.SHOW_LOGS) console.log(that.polyexpands + "\n");
  }

  /*
    Returns an object with important properties about the Solver before solving begins.
  */
  that.validateSolver = function () {
    // initial validation values
    let snackbarMessage = "Solver validation was successful.";
    let errorMessage = "";
    let solverIsValid = true;

    // CASE: no Polyominoes were given to the Solver
    if (!(that.polyominoes.length > 0)) {
      let message = "No Polyominoes were given to solve with!";
      snackbarMessage = message;
      errorMessage += message + "\n";
      solverIsValid = false;
    }
    
    // CASE: there are more squares in Polyominoes than there are in the field
    if (that.getSquareCount(that.polyominoes) > that.field.squares.size ) {
      let message = "The field is too small to fit the given Polyominoes!";
      snackbarMessage = message;
      errorMessage += message + "\n";
      solverIsValid = false;
    }

    // CASE: no errors were found
    if (solverIsValid)
      errorMessage = "There were no errors in validating the Solver."

    // create and pass final validation values
    let validation = {
      snackbarMessage: snackbarMessage,
      errorMessage: errorMessage,
      solverIsValid: solverIsValid
    };
    return validation;
  }

  /*
    Returns the total count of squares in all Polyominoes in the polyArray
    polyArray is an array of Polyominoes [Polyomino, Polyomino, Polyomino, ...]
  */
  that.getSquareCount = function (polyArray) {
    let count = 0;
    polyArray.forEach(function (polyomino) {
      count += polyomino.squares.size;
    });
    return count;
  }
  
  that.init(polyominoes, field, rules);
}
