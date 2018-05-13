/*

*/
if(ps.flags.SHOW_LOGS) console.log("Creating the Field.");
ps.Field = function() {
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
    if(ps.flags.SHOW_LOGS) console.log( temp.toString() + " was added to the field." );
  }
  
  /*
    Delete a vector from the Constructor's HashMap
  */
  that.delete = function(x,y) {
    let temp = new ps.Vec2(x,y);
    that.vectors.delete( temp.hash );
    if(ps.flags.SHOW_LOGS) console.log( temp.toString() + " was deleted from the field." );
  }
  
  // initalize
  that.init();
}
