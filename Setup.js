/*
  This file is completely necessary to attain some sort of object-orientedness between
  all of the different .js files in the PolyominoSolver project.
*/
// essential base object
this.ps = {};

// debug flags
ps.flags = {
  DO_TESTS: false,
  SHOW_LOGS: true
};

// CONSTANTS
// number used for hashing Vec2 objects in Polyominoes
// this assumes that the max size of any Vec2 is 10^HASH_VECTOR_DIGITS.
ps.HASH_VECTOR_DIGITS = 3;

ps.hashVector = function (vector) {
  return vector.x.toString().padStart(ps.HASH_VECTOR_DIGITS, "0")
    .concat(vector.y.toString().padStart(ps.HASH_VECTOR_DIGITS, "0"));
}

/*
  Creates a hashcode identical to the one output from hashVector().
  Input is simply an object with an x and y property.
  The x and y properties should be integers.
*/
ps.hashCoords = function (coords) {
  return coords.x.toString().padStart(ps.HASH_VECTOR_DIGITS, "0")
    .concat(coords.y.toString().padStart(ps.HASH_VECTOR_DIGITS, "0"));
}

ps.hashPolyomino = function (polyomino) {
  // return a string of every 
  let temp = "";
  polyomino.squares.forEach(function (vector) {
    temp += ps.hashVector(vector);
  });
  return temp;
}

// set a button to a new style
ps.buttonToNormal = function ($button) {
  $button.removeClass("mdl-button--disabled");
}

ps.buttonToDisabled = function ($button) {
  $button.removeClass("mdl-button--accent mdl-button--primary").addClass("mdl-button--disabled");
}

ps.buttonToPrimary = function ($button) {
  $button.removeClass("mdl-button--disabled mdl-button--accent").addClass("mdl-button--primary");
}

ps.buttonToAccent = function ($button) {
  $button.removeClass("mdl-button--disabled mdl-button--primary").addClass("mdl-button--accent");
}

// forcefully hides the drawer
ps.hideDrawer = function () {
  $(".mdl-layout__drawer").removeClass("is-visible").attr("aria-hidden", "true");
  $(".mdl-layout__obfuscator").removeClass("is-visible");
}

ps.showSnackbar = function (message) {
  let data = {
    message: message
  };
  $("#snackbar")[0].MaterialSnackbar.showSnackbar(data);
}


if (ps.flags.SHOW_LOGS) console.log("Setup is complete.");
