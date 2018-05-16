/*

*/
if (ps.flags.SHOW_LOGS) console.log("Creating the Field.");
ps.Field = function () {
  let that = this;

  /*
    Initalization function
  */
  that.init = function () {
    that.vectors = new HashMap();
  }

  /*
    Add a new vector to the Field's HashMap
  */
  that.add = function (x, y) {
    let temp = new ps.Vec2(x, y);
    that.vectors.set(temp.hash, temp);
    that.updateButtons();
    if (ps.flags.SHOW_LOGS) console.log(temp.toString() + " was added to the field.");
  }
  
  /*
    Delete a vector from the Field's HashMap
  */
  that.delete = function(x,y) {
    that.vectors.delete( ps.hashCoords({x: x, y: y}) );
    that.updateButtons();
    if(ps.flags.SHOW_LOGS) console.log( "<" + x + ", " + y + "> was deleted from the field." );
  }

  /*
    Clears the Field of all vectors.
  */
  that.clear = function () {
    that.vectors.clear();
    that.updateButtons();
  }


  that.toString = function () {
    console.log("Field vectors in the order the HashMap is holding them:\n");
    that.vectors.forEach(function (vector) {
      console.log(vector + "\n");
    });
  }

  /*
    Update any buttons that can only be updated from the Field remotely
  */
  that.updateButtons = function () {
    if (that.vectors.size === 0) {
      ps.buttonToDisabled($("#polyomino-field-solve"));
    } else {
      ps.buttonToAccent($("#polyomino-field-solve"));
    }
  }

  // initalize
  that.init();
}
