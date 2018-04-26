console.log("Created TestPolyomino.");
ps.TestPolyomino = function() {

  this.init = function() {
    console.log("-- TestPolyomino is being initalized");
    let initVecs = [];
    for( let y = 0; y < 2; y++ )
      for( let x = 0; x < 4; x++ ) {
        //console.log("-- adding the following Vec2:");
        //console.log("-- <"+x+", "+y+">");
        let temp = new ps.Vec2(x, y)
        //console.log(temp);
        initVecs.push( temp );
      }
    //console.log(initVecs);
    let polyomino = new ps.Polyomino(initVecs);
    console.log(polyomino);
    console.log("-- created the Polyomino object to test");
    console.log("-- printing the Polyomino's squares");
    console.log(polyomino.squares);
    console.log("-- " + polyomino.toVecString());
    console.log("-- testing ");
  }

  this.init();
}
