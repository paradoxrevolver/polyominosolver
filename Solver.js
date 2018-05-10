/*
  The Solver is actually responsible for the algorithm that perform automatic polyomino fitting.
  Warning: Not for the faint of heart.
*/
if(ps.flags.SHOW_LOGS) console.log("Creating the Solver.");
ps.Solver = function() {

  polyexpands = [];

  this.solve = function() {
    if(ps.flags.SHOW_LOGS) console.log("CURRENTLY SOLVING...");

  }

  /*
    expand() loads every Polyomino in polyominoes into a individual Polyexpand objects.
    Then, based on the field and the set of rules currently specified, the Polyexpands are expanded,
    creating many new Polyomino objects representing all valid orientations.
  */
  this.expand = function( polyominoes, field, rules ) {
    // fill the polyexpands array with Polyexpand objects, each holding one Polyomino
    // each new Polyexpand object will immediately increase in size according the rules the user gave it
    for( let i = 0; i < polyominoes.length; i++ ) {
      polyexpands.push( new ps.Polyexpand( polyominoes[i], rules ) );
    }
    console.log(polyexpands);
  }

  this.init = function() {
    if(ps.flags.SHOW_LOGS) console.log("Solver initiatlized.");
  }

  this.init();
}
