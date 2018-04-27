/*
  The Driver function completes the tie between the frontend and backend of the program.
  It generates and assigns listeners to HTML elements to perform JS functions.
  It can change HTML content in response to user input.
*/
// start driving
console.log("Starting the Driver.");
Driver();
function Driver() {
  
  // "OBJECTS"
  // in case we need to reference Driver
  let that = this;
  // create a Solver object that performs solving
  let Solver = new ps.Solver();

  // CONSTANTS
  let DO_TESTS = false;

  // start initialization as soon as the document is ready to go
  $(document).ready( function() {
    that.init();
  });

  /*
    This function initiatlizes the Driver when the page loads.
  */
  this.init = function() {
    
    // VARIABLES (these are tied to the Driver)
    
    // the pixel length of the sides of either of the editors
    this.editorPixelLength = 500;
    // the pixel length of the sides 
    this.constructorSquareLength = 4;
    this.fieldSquareLength = 10;
    // initialize the functions of every button
    this.initButtons();
    // initialize the grid that shows the Constructor
    this.initGrid( $("#polyomino-constructor-svg"), constructorSquareLength);
    this.initGrid( $("#polyomino-field-svg"), fieldSquareLength);
 
    // STUFF TO DO ONLY FOR TESTING
    if(DO_TESTS) {
      this.performTests();
    }
  }

  this.initGrid = function(svg, sideLength) {
    // store a variable from the given svg
    let $grid = svg
                .attr("width", that.editorPixelLength )
                .attr("height", that.editorPixelLength );
    // get the svg namespace
    let svgNS = $grid[0].namespaceURI;
    
    // this is the size that a grid square should be in pixels
    let gridSquareLength = that.editorPixelLength/sideLength;
    let gridSquares = [][];
    
    // now we loop an awful lot for every grid square that needs to exist
    for( let i = 0; i < sideLength; i++ ) {
      for( let j = 0; j < sideLength; j++ ) {
        // time to make a grid square. set up the element with the right namespace
        let $gridSquare = document.createElementNS(svgNS, "rect");
        // grid squares start out filled in white
        $gridSquare.setAttribute("fill", "white");
        // stroke a thin line with light gray
        $gridSquare.setAttribute("stroke", "#cccccc");
        $gridSquare.setAttribute("stroke-width", "1");
        // the size of the square is just a little bit larger so that overlap looks good
        $gridSquare.setAttribute("width", gridSquareLength+1);
        $gridSquare.setAttribute("height", gridSquareLength+1);
        // place properly
        $gridSquare.setAttribute("x", i*gridSquareLength);
        $gridSquare.setAttribute("y", j*gridSquareLength);
        // leave index values (very important for creating Vec2 on click)
        $gridSquare.setAttribute("i", i);
        $gridSquare.setAttribute("j", j);
        // finally, send to the grid
        $grid.append($gridSquare);
      }
    }
  }

  this.performTests = function() {
    let testPolyomino = new ps.TestPolyomino();
  }

  /*
    This function initalizes the function of LITERALLY EVERY BUTTON.
  */
  this.initButtons = function() {
      
    // grab references to every button that needs to be listened to
    let $constructorClear = $("#polyomino-constructor-clear");
    let $constructorSave = $("#polyomino-constructor-save");
      
    let $fieldSolve = $("#polyomino-field-solve");
    let $fieldStop = $("#polyomino-field-stop");
    let $fieldClear = $("#polyomino-field-clear");
      
    let $drawer = $(".drawer-button");
    let $drawerSave = $("#drawer-local-save");
    let $drawerLoad = $("#drawer-local-load");
    let $drawerAbout = $("#drawer-about");
    let $drawerHelp = $("#drawer-help");
      
      
      
    // CONSTRUCTOR BUTTONS ##################################################

    // when the Clear button on the Constructor screen is clicked
    $constructorClear.on("click", ()=>{
      if( !$constructorClear.hasClass("mdl-button--disabled") ) {
        console.log("The Constructor was cleared.");
      }
    });

    $constructorSave.on("click", ()=>{
      if( !$constructorSave.hasClass("mdl-button--disabled") ) {
        console.log("The polyomino in the Constructor was saved.");
      }
    });

      
      
    // FIELD BUTTONS ##################################################
      
    // when the Solve button is pressed
    $fieldSolve.on("click", ()=>{
      // run if the button isn't disabled
      if( !$fieldSolve.hasClass("mdl-button--disabled") ) {
        // changed buttons enabled/disabled
        that.buttonToDisabled($fieldClear);
        that.buttonToDisabled($fieldSolve);
        that.buttonToAccent($fieldStop);

        Solver.solve();
        Solver.expand();
      }
    });
      
    // when the Stop button is pressed
    $fieldStop.on("click", ()=>{
      // run if the button isn't disabled
      if( !$fieldStop.hasClass("mdl-button--disabled") ) {
        // changed buttons enabled/disabled
        that.buttonToDisabled($fieldStop);
        that.buttonToPrimary($fieldClear);
        that.buttonToAccent($fieldSolve);

        console.log("SOLVING WAS STOPPED.");
      }
    });

    // when the Clear button on the Field screen is clicked
    $fieldClear.on("click", ()=> {
      // run if the button isn't disabled
      if( !$fieldClear.hasClass("mdl-button--disabled") ) {
        console.log("The field was cleared.");
      }
    });

      
      
    // DRAWER BUTTONS ##################################################
    
    // when any drawer button is clicked
    $drawer.on("click", ()=> {
      that.hideDrawer();
    });
    
    // the Local Save button in the drawer
    $drawerSave.on("click", ()=> {
      console.log("Local save committed.");
    });

    // the Local Load button in the drawer
    $drawerLoad.on("click", ()=> {
      console.log("Local load committed.");
    })

    // the About button in the drawer
    $drawerAbout.on("click", ()=> {
      console.log("About opened.");
    });

    // the Help button in the drawer
    $drawerHelp.on("click", ()=> {
      console.log("Help opened.");
    })


    // set a button to disabled, accent, or primary styles
    this.buttonToDisabled = function( $button ) { $button.removeClass("mdl-button--accent mdl-button--primary").addClass("mdl-button--disabled"); }
    this.buttonToPrimary = function( $button ) { $button.removeClass("mdl-button--disabled mdl-button--accent").addClass("mdl-button--primary"); }
    this.buttonToAccent = function( $button ) { $button.removeClass("mdl-button--disabled mdl-button--primary").addClass("mdl-button--accent"); }
    // this forcefully hides the drawer
    this.hideDrawer = function() { $(".mdl-layout__drawer").removeClass("is-visible").attr("aria-hidden", "true"); $(".mdl-layout__obfuscator").removeClass("is-visible"); }

  }
}
