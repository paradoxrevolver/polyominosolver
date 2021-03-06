/*
  A Vec2 is a 2-dimensional vector, a vector with only two values: an X and a Y.
*/
ps.Vec2 = function (x, y) {

  let that = this;

  /*
    Initalization
  */
  that.init = function (x, y) {
    // VARIABLES
    // a 2D vector just stores its x and y
    that.x = x || 0;
    that.y = y || 0;

    // initalization
    that.updateHash();
  }

  /*
    Quickly adds to the values of x and y on this vector
  */
  that.shift = function (x, y) {
    that.x += x;
    that.y += y;
    // values were changed, update the hash
    that.updateHash();
  }

  /*
    Checks if this Vec2 is equal to another Vec2
  */
  that.equals = function (vector) {
    if (vector.hash === that.hash)
      return true;
    return false;
  }

  /*
    Performs a transformation on the vector, based on a pair of linear combinations
  */
  that.transform = function (a, b, c, d) {
    
    /*
    console.log("| " + a.toString().padStart(2, " ") + " " + b.toString().padStart(2, " ") + " |\n" +
                "| " + c.toString().padStart(2, " ") + " " + d.toString().padStart(2, " ") + " |");
    */
    // first we do matrix multiplication
    var newX = that.x * a + that.y * b;
    var newY = that.x * c + that.y * d;
    // then we save the results to the vector
    that.x = newX;
    that.y = newY;
    // values were changed, update the hash
    that.updateHash();
  }
  
  /*
    Returns a reference to a new Vec2 that is a clone of this Vec2
  */
  that.clone = function () {
    let newVec = new ps.Vec2(that.x, that.y);
    return newVec;
  }

  /*
    Generates a hashcode for this Vec2 that is supposedly unique for all Vec2.
    The reason this function exists is to use a HashMap in Polyominoes.
  */
  that.updateHash = function () {
    that.hash = ps.hashVector(that);
  }

  /*
    Converts Vec2 to a String
  */
  that.toString = function () {
    return "<" + that.x + ", " + that.y + ">";
  }

  // init
  that.init(x, y);
}
