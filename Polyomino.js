/* ################################################################
  The Polyomino object simply represents a Polyomino.
  It stores a series of 2D Vectors, called Vec2, that are used to specify the location of squares on the Polyomino.
  The vecArray given in initialization appears as an array [Vec2, Vec2, Vec2 ...]
*/
if (ps.flags.SHOW_LOGS) console.log("Creating the Polyomino.");
ps.Polyomino = function (vecArray) {

  let that = this;

  that.init = function (vecArray) {
    // VARIABLES
    // every time we create a Polyomino, it should be able to store the squares that make it up
    // we use a HashMap, so that if a Polyomino and a Polyomino are compared, it takes O(n) time to check for overlap instead of O(n^2).
    that.updateSquares(vecArray);

    // reset the vectors the moment all of them have been put into the hash table
    that.reset();
    // update the hashcode
    that.updateHash();
  }

  // given a new array of Vec2 objects, forces squares to be an updated HashMap
  that.updateSquares = function (vecArray) {
    // this temporary array will prepare [Vec2.hash, Vec2] pairs that are used to instantiate a HashMap
    let pairs = [];
    // loop through the initially given vector array
    vecArray.forEach(function (vector) {
      // push the [Vec2.hash, Vec2] pairs into the array
      pairs.push([vector.hash, vector]);
    });
    that.squares = new HashMap(pairs);
  }

  /*
    Returns true if the given "polyomino" fits entirely within this Polyomino
    Returns false if the given "polyomino" is not contained within this Polyomino
  */
  that.contains = function (polyomino) {
    // for each squares in the given polyomino
    polyomino.squares.forEach( function (vector, hash) {
      // if the given polyomino's vector isn't in this polyomino's vectors
      if( !that.squares.has(hash) )
        // then the given polyomino is not contained within this one!
        return false;
    });
    // otherwise, all is good
    return true;
  }

  /*
    Returns true if the given "polyomino" shares any vectors with this Polyomino
    Returns false if the two Polyominoes do not overlap
  */
  that.overlaps = function (polyomino) {
    let smallerPolyomino = polyomino;
    let biggerPolyomino = that;
    // first, let's prioritize the smaller polyomino for efficiency
    // if the bigger polyomino (which we assumed was this polyomino) is actually smaller than the given polyomino
    if( biggerPolyomino.squares.size < smallerPolyomino.squares.size ) {
      // swap them
      smallerPolyomino = that;
      biggerPolyomino = polyomino;
    }
    
    // for each vector in the smaller polyomino
    smallerPolyomino.squares.forEach(function(vector, hash) {
      // if the smaller polyomino's vector is the same as one in the bigger polyomino
      if( biggerPolyomino.squares.has(hash) )
        // then they must overlap
        return true;
    });
    // otherwise, they must not overlap
    return false;
  }

  /*
    Returns an object called "max" with an x and y property that are the maximum x and y of the Polyomino
  */
  that.getMax = function () {
    let squaresArray = that.squares.values();
    let maxX = squaresArray[0].x;
    let maxY = squaresArray[0].y;
    // traverse all vectors in the array
    // we want to find the maximum x and y
    for (var i = 1; i < squaresArray.length; i++) {
      // if we find a new, higher X
      if (squaresArray[i].x > maxX)
        maxX = squaresArray[i].x;
      // if we find a new, higher Y
      if (squaresArray[i].y > maxY)
        maxY = squaresArray[i].y;
    }
    let max = {
      x: maxX,
      y: maxY
    };
    return max;
  }

  /*
    Returns an object called "min" with an x and y property that are the minimum x and y of the Polyomino
  */
  that.getMin = function () {
    let squaresArray = that.squares.values();
    let minX = squaresArray[0].x;
    let minY = squaresArray[0].y;
    // traverse all vectors in the array
    // we want to find the maximum x and y
    for (var i = 1; i < squaresArray.length; i++) {
      // if we find a new, lower X
      if (squaresArray[i].x < minX)
        minX = squaresArray[i].x;
      // if we find a new, lower Y
      if (squaresArray[i].y < minY)
        minY = squaresArray[i].y;
    }
    let min = {
      x: minX,
      y: minY
    };
    return min;
  }

  /*
    Sorts the entire HashMap of vectors
  */
  that.sort = function () {
    let squaresArray = that.squares.values();
    squaresArray.sort(function (a, b) {
      return a.x !== b.x ? a.x - b.x : (a.y !== b.y ? a.y - b.y : 0)
    });
    that.updateSquares(squaresArray);
  }

  /*
    Resetting a Polyomino makes certain that all squares are vectors of non-negative integers,
    and the Polyomino touches the x and y-axis at least once.
  */
  that.reset = function () {
    let min = that.getMin();
    // now that we have the lowest values, we can iterate through and shift the entire polyomino
    that.shift(-min.x, -min.y);
  }

  /* 
    Rotating a polyomino should only be done by 90, 180, or 270 degrees.
    This function uses matrix multiplication and a 2D rotation matrix.
  */
  that.rotate = function (degrees) {
    let values = that.squares.values();
    values.forEach(function (vector) {
      vector.transform(Math.cos(degrees), -Math.sin(degrees), Math.sin(degrees), Math.cos(degrees))
    });
    that.updateHash(values);
  }

  that.shift = function (x, y) {
    let values = that.squares.values();
    values.forEach(function (vector) {
      vector.shift(x, y);
    });
    that.updateSquares(values);
  }

  /*
    flipX() takes no parameters and simply flips the polyomino over the x axis.
  */
  that.flipX = function () {
    let values = that.squares.values();
    values.forEach(function (vector) {
      vector.transform(1, 0, 0, -1)
    });
    that.updateHash(values);
  }

  /*f
    flipY() takes no parameters and simply flips the polyomino over the y axis.
  */
  that.flipY = function () {
    let values = that.squares.values();
    values.forEach(function (vector) {
      vector.transform(-1, 0, 0, 1)
    });
    that.updateHash(values);
  }

  /*
    Generates a hashcode for this Polyomino that is supposedly unique for all Polyomino.
    The reason this function exists is to use a HashMap in Polyomino containers.
  */
  that.updateHash = function () {
    that.hash = ps.hashPolyomino(that);
  }

  /*
    Converts the Polyomino into an ASCII form.
    It checks hashes in the HashMap to verify that vectors exist.
  */
  that.toString = function () {
    let temp = "";
    let max = that.getMax();
    for (let i = max.y; i >= 0; i--) {
      for (let j = 0; j <= max.x; j++) {
        if (that.squares.has(ps.hashCoords({
            x: j,
            y: i
          })))
          temp += "#";
        else
          temp += ".";
      }
      temp += "\n";
    }
    return temp;
  }

  /*
    String of all the vectors in the order the HashMap iterates them
  */
  that.toVecString = function () {
    let temp = "";
    that.squares.forEach(function (key, vector) {
      temp += vector.toString();
    });
    return temp;
  }

  // init
  that.init(vecArray);
}
