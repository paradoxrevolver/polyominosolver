/*
  The Driver function completes the tie between the frontend and backend of the program.
  It generates and assigns listeners to HTML elements to perform JS functions.
  It can change HTML content in response to user input.
*/
// start driving
console.log("Starting the Driver.");
Driver();
function Driver() {
  // in case we need to reference Driver
  let that = this;
  // create a Solver object that performs solving
  let Solver = new ps.Solver();

  // CONSTANTS
  let DO_TESTS = false;

  // VARIABLES
  // this is the side length of the constructor in pixels
  let constructorSize;
  // this is the side length of the constructor in grid squares
  // this value can be changed by the user
  let constructorSquareLength;


  $(document).ready( function() {
    that.init();
  });

  /*
    This function initiatlizes the Driver when the page loads.
  */
  this.init = function() {
    // initalize all variables
    this.constructorSize = 500;
    this.constructorSquareLength = 4;
    // initalize the functions of every button
    this.initButtons();
    // load the grid that shows the Constructor
    this.displayConstructorGrid();

    if(DO_TESTS)
      this.performTests();
  }

  this.displayConstructorGrid = function() {
    let $constructorGrid = $("#polyomino-constructor-svg")
                            .attr("xmlns", "http://www.w3.org/TR/SVG11/")
                            .attr("width", "500")
                            .attr("height", "500");
    let gridSquareLength = 500 / this.constructorSquareLength + "px";
    let gridSquare = $("<rect></rect>")
                      .attr("fill", "#ff0000")
                      .attr("width", gridSquareLength)
                      .attr("height", gridSquareLength);
    $constructorGrid.append( gridSquare );
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
      
    $drawer.on("click", ()=> {
      that.hideDrawer();
    });
      
    $drawerSave.on("click", ()=> {
      console.log("Local save committed.");
    });

    $drawerLoad.on("click", ()=> {
      console.log("Local load committed.");
    })

    $drawerAbout.on("click", ()=> {
      console.log("About opened.");
    });

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
