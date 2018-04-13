/*
  The Solver is actually responsible for the algorithm that perform automatic polyomino fitting.
  Warning: Not for the faint of heart.
*/
console.log("Creating the Solver.");
ps.Solver = function() {

  this.init = function() {
    console.log("Solver initiatlized.");
  }

  this.solve = function() {
    console.log("CURRENTLY SOLVING...");

    // let polyominoes = array of Polyominoes the user wants to fill with
    // let field = array of Vec2 the user wants to fill
    // let polyexpands = []; array of Polyexpand objects
    // let rules = [true, false]; array of rules

    // FIRST, ESTABLISH RULES FOR POLYEXPANDS

    // PLUG POLYOMINOES INTO POLYEXPANDS
    // for( let i = 0, i < polyominoes.length; i++ )
      // polyexpands[i] = new ps.Polyexpand( polyominoes[i], field, rules );

    // SO THE POLYOMINOES EXPAND INTO ALL OF THEIR OTHER FORMS BASED ON RULES AND THE FIELD
    // NOW, WE WILL USE POLYFIT OBJECTS TO BEGIN 
  }

  this.init();
}
