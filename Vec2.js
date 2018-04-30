/* ################################################################
  A Vec2 is a 2-dimensional vector, or a vector with only two values: an X and a Y.
*/
console.log("Creating the Vec2.");
ps.Vec2 = function(x, y) {
  
  let that = this;
  
  // CONSTANTS
  // number used for hashing Vec2 objects in Polyominoes
  // this value should never be less than or equal to the max value expected for width or length of a Polyomino or the Field
  that.POLYOMINO_HASH = 1000;
  
  // VARIABLES
  that.x = x || 0;
  that.y = y || 0;

  /*
    Quickly adds to the values of x and y on this vector.
  */
  that.shift = function(x,y) {
    that.x + x;
    that.y + y;
    // values were changed, update the hash
    that.updateHash();
  }

  /*
    Checks if this Vec2 is equal to another Vec2
  */
  that.equals = function(vector) {
    if( that.x == vector.x && that.y == vector.y )
      return true;
    return false;
  }

  /*
    Performs a transformation on the vector, based on a pair of linear combinations
  */
  that.transform = function(a, b, c, d) {
    // first we do matrix multiplication
    var newX = that.x*a + that.y*b;
    var newY = that.x*c + that.y*d;
    // then we save the results to the vector
    that.x = newX;
    that.y = newY;
    // values were changed, update the hash
    that.updateHash();
  }
  
  /*
    Generates a hashcode for this Vec2 that is supposedly unique for all Vec2, dependent on the POLYOMINO_HASH constant.
    The returned hashcode is simply an integer.
    The reason this function exists is because in order to create hash tables for Polyominoes otherwise, a Vec2 would have to be stringified to get a key every time, which would be more expensive than an arithmetic operation.
  */
  that.updateHash = function() { that.hash = that.x*that.POLYOMINO_HASH + that.y; }
  
  /*
    Converts Vec2 to a String
  */
  that.toString = function() { return "<" + that.x + ", " + that.y + ">"; }
  
  // initalization
  that.updateHash();
}
