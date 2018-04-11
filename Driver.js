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
  /*
    This function initiatlizes the Driver when the page loads.
  */
  this.init = function() {
    console.log("now listening to #polyomino-field-solve");

    $("#polyomino-field-solve").ready( function() {
      console.log("polyomino-field-solve exists!");

      $(this).on("click", function() {
         $(this).removeClass("mdl-button--accent").addClass("mdl-button--disabled");
         $("#polyomino-field-stop").removeClass("mdl-button--disabled").addClass("mdl-button--accent");
      });
    });

    // load the grid that shows the Constructor
    //this.displayConstructorGrid();
  }

  this.displayConstructorGrid = function() {
    let constructGrid = $( "#polyomino-constructor-svg" )
    console.log(constructGrid);
  }

  // after all is said and done, initiatlize Driver
  this.init();
}
