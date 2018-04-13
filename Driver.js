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

  // this is the side length of the constructor in pixels
  let constructorSize;
  // this is the side length of the constructor in grid squares
  // this value can be changed by the user
  let constructorSquareLength;


  $(document).ready( function() {
    init();
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
  }

  // set a button to disabled, accent, or primary styles
  this.buttonToDisabled = function( $button ) { $button.removeClass("mdl-button--accent mdl-button--primary").addClass("mdl-button--disabled"); }
  this.buttonToAccent = function( $button ) { $button.removeClass("mdl-button--disabled mdl-button--primary").addClass("mdl-button--accent"); }
  // this forcefully hides the drawer
  this.hideDrawer = function() { $(".mdl-layout__drawer").removeClass("is-visible").attr("aria-hidden", "true"); $(".mdl-layout__obfuscator").removeClass("is-visible"); }

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

  this.initButtons = function() {
    // grab references to every button that needs to be listened to
    let $constructorClear = $("#polyomino-constructor-clear");
    let $constructorSave = $("#polyomino-constructor-save");
    let $fieldSolve = $("#polyomino-field-solve");
    let $fieldStop = $("#polyomino-field-stop");
    let $fieldClear = $("#polyomino-field-clear");
    let $drawerSave = $("#drawer-local-save");
    let $drawerLoad = $("#drawer-local-load");
    let $drawerAbout = $("#drawer-about");
    let $drawerHelp = $("#drawer-help");

    // when the Clear button on the Constructor screen is clicked
    $constructorClear.on("click", ()=>{
      console.log("The Constructor was cleared.");
    });

    $constructorSave.on("click", ()=>{
      console.log("The polyomino in the Constructor was saved.");
    });

    // when the Solve button is pressed
    $fieldSolve.on("click", ()=>{
      that.buttonToDisabled($fieldSolve);
      that.buttonToAccent($fieldStop);
      Solver.solve();
    });

    // when the Stop button is pressed
    $fieldStop.on("click", ()=>{
      that.buttonToDisabled($fieldStop);
      that.buttonToAccent($fieldSolve);
      console.log("SOLVING WAS STOPPED.");
    });

    // when the Clear button on the Field screen is clicked
    $fieldClear.on("click", ()=> {
      console.log("The field was cleared.");
    });

    $drawerSave.on("click", ()=> {
      console.log("Local save committed.");
      that.hideDrawer();
    });

    $drawerLoad.on("click", ()=> {
      console.log("Local load committed.");
      that.hideDrawer();
    })
  }
}
