/*
  The Solver is actually responsible for the algorithm that perform automatic polyomino fitting.
  Warning: Not for the faint of heart.
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
    if (true || !validation.solverIsValid) ps.showSnackbar(validation.snackbarMessage);
    // if the validation fails early, just quit.
    if (!that.solverIsValid) return;

    console.log("test early exit");

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
  */
  that.getSquareCount = function (polyArray) {
    let count = 0;
    polyArray.forEach(function(polyomino) {
      count += polyomino.squares.size;
    });
    return count;
  }

  that.expand = function () {

  }

  that.init(polyominoes, field, rules);
}
