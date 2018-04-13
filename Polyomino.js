/* ################################################################
  The Polyomino object simply represents a Polyomino.
  It stores a series of 2D Vectors, called Vec2, that are used to specify the location of squares on the Polyomino.
*/
console.log("Creating the Polyomino.");
ps.Polyomino = function( initVecs ) {

  // instance variables
  // every time we create a Polyomino, it should be able to store the squares that make it up
  var squares = [];
  var width = 0;
  var height = 0;

  this.init = function() {
    // add all the initial vectors to squares
    squares = [...initVecs];
  }

  this.addVec = function( vector ) {
    squares.push( this.vector );
  }

  /*
    @return the index in squares[] of the vector being searched for
  */
  this.searchVec = function( vector ) {
    // for each vector in squares
    for( let i = 0; i < squares.length; i++ )
      // if you find the desired vector
      if( this.vector === squares[i] )
        // return the index in squares
        return i;
    console.log( "A vector was searched for in squares[] but was not found.\nThe vector is being printed:" );
    console.log( this.vector );
  }

  this.deleteVec = function( vector ) {
    // delete
    squares.delete( this.searchVec( this.vector ) );
  }

  /*
    Resetting a Polyomino makes certain that all squares are vectors of non-negative integers,
    and the Polyomino touches the x and y-axis at least once.
  */
  this.reset = function() {
    // only run if there's at least one square in the Polyomino
    if( squares.length > 0 ) {
      // by default, store the first vector's values
      var minX = squares[0].x;
      var minY = squares[0].y;
      // traverse all vectors in the array
      // we want to find the minimum x and y
      for( var i = 1; i < squares.length; i++ ){
        // if we find a new, lower X
        if( squares[i].x < minX )
          minX = squares[i].x;
        // if we find a new, lower Y
        if( squares[i].y < minY )
          minY = squares[i].y;
      }
      // now that we have the lowest values, we can iterate again and shift the entire polyomino
      for( var i = 0; i < squares.length; i++ ) {
        // move every X by the difference of the minimum X
        squares[i].x -= minX;
        // move every Y by the difference of the minimum Y
        squares[i].y -= minY;
      }
    }
  }

  /*
    Rotating a polyomino should only be done by 90, 180, or 270 degrees.
    This function uses matrix multiplication and a 2D rotation matrix.
  */
  this.rotate = function( degrees ) {
    squares.forEach( function(vector) { vector.transform( Math.cos(degrees), -Math.sin(degrees), Math.sin(degrees), Math.cos(degrees) ) } );
  }

  /*
    flipX() takes no parameters and simply flips the polyomino over the x axis.
  */
  this.flipX = function() {
    squares.forEach( function(vector) { vector.transform( 1, 0, 0, -1 ) } );
  }

  /*
    flipY() takes no parameters and simply flips the polyomino over the y axis.
  */
  this.flipY = function() {
    squares.forEach( function(vector) { vector.transform( -1, 0, 0, 1 ) } );
  }

  // initiatlize
  init();
}
