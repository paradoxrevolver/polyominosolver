/*
  A Polyexpand object is container dedicated to boolean logic involving groups of Polyomino objects.
  Polyexpand is capable of expanding a Polyomino into

  @param polyomino is a single Polyomino object that the Polyexpand houses to begin with.
  @param field is a Vec2[] array that represents all the spaces Polyominoes can be put into.
  @param rules is a boolean[] array that represents all the rules that Polyomino expansion must follow.
*/
ps.Polyexpand = function( polyomino, field, rules ) {

  /*

  */
  this.init = function( polyomino, field, rules ) {

  }

  this.expandReflections = function() {

  }

  this.expandRotations = function() {

  }

  this.expandPositions = function( field ) {

  }

  // initialize
  this.init( polyomino, field, rules );
}
