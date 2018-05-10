/*
  Constructor represents a grid used for collecting and manipulative 2D vectors.
  It stores a map of vectors for quickly inserting and removing vectors to pass to the Palette when making a Polyomino
*/
if(ps.flags.SHOW_LOGS) console.log("Creating the Constructor.");
ps.Constructor = function() {
  let that = this;
  
  /*
    Initalization function
  */
  that.init = function() {
    that.vectors = new HashMap();
  }
  
  /*
    Add a new vector to the Constructor's HashMap
  */
  that.add = function(x,y) {
    let temp = new ps.Vec2(x,y);
    that.vectors.set( temp.hash, temp );
    that.updateButtons();
    if(ps.flags.SHOW_LOGS) console.log( temp.toString() + " was added to the constructor." );
  }
  
  /*
    Delete a vector from the Constructor's HashMap
  */
  that.delete = function(x,y) {
    let temp = new ps.Vec2(x,y);
    that.vectors.delete( temp.hash, temp );
    that.updateButtons();
    if(ps.flags.SHOW_LOGS) console.log( temp.toString() + " was deleted from the constructor." );
  }
  
  /*
    Update any buttons that can only be updated from the Constructor remotely
  */
  that.updateButtons = function() {
    if( that.vectors.size === 0 ) {
      ps.buttonToDisabled($("#polyomino-constructor-save"));
    } else {
      ps.buttonToAccent($("#polyomino-constructor-save"));
    }
  }
  
  // init
  that.init();
}
