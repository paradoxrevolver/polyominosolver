/* ################################################################
  A Vec2 is a 2-dimensional vector, or a vector with only two values: an X and a Y.
*/
console.log("Creating the Vec2.");
ps.Vec2 = function(x, y) {
  // initial variables
  this.x = x || 0;
  this.y = y || 0;

  /*
    Quickly adds to the values of x and y on this vector.
  */
  this.add = function(x,y) {
    this.x + x;
    this.y + y;
  }

  /*
    Performs a transformation on the vector, based on a pair of linear combinations
  */
  this.transform = function(a, b, c, d) {
    // first we do matrix multiplication
    var newX = this.x*a + this.y*b;
    var newY = this.x*c + this.y*d;
    // then we save the results to the vector
    this.x = newX;
    this.y = newY;
  }
}
