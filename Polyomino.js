/* ################################################################
  The Polyomino object simply represents a Polyomino.
  It stores a series of 2D Vectors, called Vec2, that are used to specify the location of squares on the Polyomino.
*/
console.log("Creating the Polyomino.");
ps.Polyomino = function( initVecs ) {
  
  let that = this;
  
  // VARIABLES
  // every time we create a Polyomino, it should be able to store the squares that make it up
  // we use a WeakMap, so that if a Polyomino and a Polyomino are compared, it takes O(n) time to check for overlap instead of O(n^2).
  that.squares = new WeakMap();
  // we also need to store the keys anyways, so that if a Polyomino and the Field are compared, we can iterate through the Polyomino's squares.
  that.keys = [];

  that.add = function( vector ) {
    that.squares.set( vector.hash, vector );
  }

  /*
    @return the index in squares[] of the vector being searched for, otherwise returns null
  */
  that.has = function( vector ) {
    that.squares.has( vector.hash );
  }

  /*
    Resetting a Polyomino makes certain that all squares are vectors of non-negative integers,
    and the Polyomino touches the x and y-axis at least once.
  */
  that.reset = function() {
    // only run if there's at least one square in the Polyomino
    if( that.squares.length > 0 ) {
      // by default, store the first vector's values
      var minX = that.squares[0].x;
      var minY = that.squares[0].y;
      // traverse all vectors in the array
      // we want to find the minimum x and y
      for( var i = 1; i < squares.length; i++ ){
        // if we find a new, lower X
        if( that.squares[i].x < minX )
          minX = that.squares[i].x;
        // if we find a new, lower Y
        if( that.squares[i].y < minY )
          minY = that.squares[i].y;
      }
      // now that we have the lowest values, we can iterate again and shift the entire polyomino
      for( var i = 0; i < that.squares.length; i++ ) {
        // move every X by the difference of the minimum X
        that.squares[i].x -= minX;
        // move every Y by the difference of the minimum Y
        that.squares[i].y -= minY;
      }
    }
  }

  /*
    Rotating a polyomino should only be done by 90, 180, or 270 degrees.
    This function uses matrix multiplication and a 2D rotation matrix.
  */
  that.rotate = function( degrees ) {
    that.squares.forEach( function(vector) { vector.transform( Math.cos(degrees), -Math.sin(degrees), Math.sin(degrees), Math.cos(degrees) ) } );
  }

  /*
    flipX() takes no parameters and simply flips the polyomino over the x axis.
  */
  that.flipX = function() {
    squares.forEach( function(vector) { vector.transform( 1, 0, 0, -1 ) } );
  }

  /*
    flipY() takes no parameters and simply flips the polyomino over the y axis.
  */
  that.flipY = function() {
    squares.forEach( function(vector) { vector.transform( -1, 0, 0, 1 ) } );
  }
  
  /*
    
  */
  that.toVecString = function() {
    let temp = "";
    that.squares.forEach( function(vector) {
      temp += vector.toString() + " ";
    });
    return temp;
  }

  that.init = function( initVecs ) {
    // set squares to all the initial vectors given
    that.squares = initVecs;
  }

  // initiatlize
  that.init( initVecs );
}
