/*
  The Driver function completes the tie between the frontend and backend of the program.
  It generates and assigns listeners to HTML elements to perform JS functions.
  It can change HTML content in response to user input.
*/
// start driving
if(ps.flags.SHOW_LOGS) console.log("Starting the Driver.");
Driver();
function Driver() {
  
  // in case we need to reference Driver
  let that = this;

  // CONSTANTS
  
  // side length restraints for the grid
  that.CONSTRUCTOR_MIN_LENGTH = 4;
  that.CONSTRUCTOR_MAX_LENGTH = 8;
  that.FIELD_MIN_LENGTH = 6;
  that.FIELD_MAX_LENGTH = 12;
  
  // VARIABLES
  
  // create single objects from other js files
  that.constructor = new ps.Constructor();
  that.palette = new ps.Palette();
  that.bank = new ps.Bank();
  that.field = new ps.Field();
  that.solver = new ps.Solver();
  
  /*
    This function initiatlizes the Driver when the page loads.
  */
  that.init = function() {
    
    // VARIABLES
    // the pixel length of the sides of either of the editors
    that.editorPixelLength = 500;
    // the pixel length of the sides 
    that.constructorSquareLength = CONSTRUCTOR_MIN_LENGTH;
    that.fieldSquareLength = FIELD_MIN_LENGTH;
    // is the mouse currently clicking?
    that.mouseIsDown = false;
    // on mousedown, was the mouse trying to draw?
    that.mouseIsDrawing = true;
    
    // initialize the functions of every button
    that.initButtons();
    // initialize the grid that shows the Constructor
    that.constructorGrid = that.initGrid( $("#polyomino-constructor-svg"), that.constructorSquareLength);
    // init the grid that shows the Field
    that.fieldGrid = that.initGrid( $("#polyomino-field-svg"), that.fieldSquareLength);
    
    // STUFF TO DO ONLY FOR TESTING
    if(ps.flags.DO_TESTS) { that.performTests(); }
  }
  
  /* 
    This function runs only for debugging purposes, and facilitates testing
  */
  that.performTests = function() {
    console.log("########## NOW PERFORMING TESTS ##########");
    let test = [new ps.Vec2(1, 1), 
                new ps.Vec2(0, 1), 
                new ps.Vec2(1, 0), 
                new ps.Vec2(0, 2), 
                new ps.Vec2(2, 1)];
    /* The "torcado" test Polyomino, a tribute to a friend
    let test = [new ps.Vec2(0,2), new ps.Vec2(1,2), new ps.Vec2(1,1), new ps.Vec2(1,0), 
                new ps.Vec2(2,2), new ps.Vec2(4,2), new ps.Vec2(4,1), new ps.Vec2(4,0),
                new ps.Vec2(5,2), new ps.Vec2(5,0), new ps.Vec2(6,2), new ps.Vec2(6,1),
                new ps.Vec2(6,0), new ps.Vec2(8,2), new ps.Vec2(8,1), new ps.Vec2(8,0),
                new ps.Vec2(9,2), new ps.Vec2(9,1), new ps.Vec2(10,0), new ps.Vec2(12,2),
                new ps.Vec2(12,1), new ps.Vec2(12,0), new ps.Vec2(13,2), new ps.Vec2(13,0),
                new ps.Vec2(14,2), new ps.Vec2(14,0), new ps.Vec2(16,1), new ps.Vec2(16,0),
                new ps.Vec2(17,2), new ps.Vec2(17,1), new ps.Vec2(18,1), new ps.Vec2(18,0),
                new ps.Vec2(20,2), new ps.Vec2(20,1), new ps.Vec2(20,0), new ps.Vec2(21,2),
                new ps.Vec2(21,0), new ps.Vec2(22,1), new ps.Vec2(24,2), new ps.Vec2(24,1),
                new ps.Vec2(24,0), new ps.Vec2(25,2), new ps.Vec2(25,0), new ps.Vec2(26,2),
                new ps.Vec2(26,1), new ps.Vec2(26,0)]; */
    console.log("Preparing an array of the following vectors:\n" + test);
    //test.sort( function(a, b) { return a.x !== b.x ? a.x-b.x : (a.y !== b.y ? a.y-b.y : 0 ) });
    //console.log("After performing test.sort():\n" + test);
    let polyomino = new ps.Polyomino(test);
    console.log("Polyomino squares before sorting:\n" + polyomino.toVecString());
    polyomino.sort();
    console.log("Polyomino squares after sorting:\n" + polyomino.toVecString());
    console.log("Printing the created Polyomino:\n" + polyomino);
    console.log("Printing the hash of the created Polyomino:\n" + ps.hashPolyomino(polyomino));
  }
    
  // functions for using on grid squares
  that.activateSquare = function( $element ) {
    $element.addClass("is-active");
    $element.attr("fill", "#3f51b5");
    if( $element.attr("svgname") === "polyomino-constructor-svg" ) {
      that.constructor.add( $element.attr("j"), $element.attr("i") );
    }
  };
  
  that.deactivateSquare = function( $element ) {
    $element.removeClass("is-active");
    $element.attr("fill", "white");
    if( $element.attr("svgname") === "polyomino-constructor-svg" ) {
      that.constructor.delete( $element.attr("j"), $element.attr("i") );
    }
  };
  
  /*
    Initalizes a grid given the XHTML location of its svg and its default side length.
  */
  that.initGrid = function( $svg, sideLength ) {
    // store a variable from the given svg
    let $grid = $svg.attr("width", that.editorPixelLength )
                    .attr("height", that.editorPixelLength );
    
    // register the click being lifted anywhere on the page
    $("body").on("mouseup", ()=>{
      that.mouseIsDown = false;
    });
    
    // get the svg namespace
    let svgNS = $grid[0].namespaceURI;
    
    // this is the size that a grid square should be in pixels
    let gridSquareLength = that.editorPixelLength/sideLength;
    
    // keep an array handy for saving references to every square
    let gridSquares = [];
    
    // now we loop an awful lot for every grid square that needs to exist
    for( let i = 0; i < sideLength; i++ ) {
      // set up a row for storing a row of squares
      let gridRow = [];
      for( let j = 0; j < sideLength; j++ ) {
        // time to make a temporary grid square. set up the element with the right namespace
        let gridSquare = document.createElementNS(svgNS, "rect");
        // grid squares start out filled in white
        $(gridSquare).attr("fill", "white");
        // stroke a thin line with light gray
        $(gridSquare).attr("stroke", "#cccccc");
        $(gridSquare).attr("stroke-width", "1");
        // the size of the square is just a little bit larger so that overlap looks good
        $(gridSquare).attr("width", gridSquareLength+1);
        $(gridSquare).attr("height", gridSquareLength+1);
        // place properly
        $(gridSquare).attr("x", j*gridSquareLength);
        $(gridSquare).attr("y", (sideLength-i-1)*gridSquareLength);
        // leave index values (very important for creating Vec2 on click)
        $(gridSquare).attr("i", i);
        $(gridSquare).attr("j", j);
        // save the name of the svg for activation later
        $(gridSquare).attr("svgname", $grid.attr("id"));
        
        $(gridSquare).on("mousedown", function() {
          that.mouseIsDown = true;
          // if the user starts mousedown on a NON-ACTIVE square...
          if( !$(gridSquare).hasClass("is-active") ) {
            // the user is trying to draw
            that.mouseIsDrawing = true;
            that.activateSquare($(gridSquare));
          }
          else {
            // the user is trying to erase
            that.mouseIsDrawing = false;
            that.deactivateSquare($(gridSquare));
          }
        });
        
        // check mouseover for when the user is drawing or erasing
        $(gridSquare).on("mouseover", function() {
          if(that.mouseIsDown) {
            if(that.mouseIsDrawing) {
              if(!$(gridSquare).hasClass("is-active")) {
                that.activateSquare($(gridSquare));
              }
            }
            else
            {
              if($(gridSquare).hasClass("is-active")) {
                that.deactivateSquare($(gridSquare));
              }
            }
          }
        });
        
        // finally, send to the grid
        $grid.append(gridSquare);
        // and save it a row
        gridRow.push(gridSquare);
      }
      // add the row to the array, making a 2D array
      gridSquares.push(gridRow);
    }
    // return the 2D array of grid squares
    return gridSquares;
  }

  /*
    This function initalizes the function of LITERALLY EVERY BUTTON.
  */
  that.initButtons = function() {
      
    // grab references to every button or region that needs to be listened to
    let $constructorClear = $("#polyomino-constructor-clear");
    let $constructorSave = $("#polyomino-constructor-save");
    
    let $constructorInc = $("#polyomino-constructor-inc");
    let $constructorDec = $("#polyomino-constructor-dec");
      
    let $fieldFlood = $("#polyomino-field-flood");
    let $fieldSolve = $("#polyomino-field-solve");
    let $fieldStop = $("#polyomino-field-stop");
    let $fieldClear = $("#polyomino-field-clear");
    
    let $fieldInc = $("#polyomino-field-inc");
    let $fieldDec = $("#polyomino-field-dec");
      
    let $drawer = $(".drawer-button");
    let $drawerSave = $("#drawer-local-save");
    let $drawerLoad = $("#drawer-local-load");
    let $drawerAbout = $("#drawer-about");
    let $drawerHelp = $("#drawer-help");
    
    let $snackbar = $("#snackbar");
    
    // CONSTRUCTOR BUTTONS ##################################################
    
    
    // when the Clear button on the Constructor screen is clicked
    $constructorClear.on("click", ()=>{
      if( !$constructorClear.hasClass("mdl-button--disabled") ) {
        for( let i = 0; i < that.constructorSquareLength; i++ ) {
          for( let j = 0; j < that.constructorSquareLength; j++ ) {
            if($(that.constructorGrid[i][j]).hasClass("is-active")) {
              that.deactivateSquare( $(that.constructorGrid[i][j]) );
            }
          }
        }
        ps.buttonToDisabled($constructorSave);
        if(ps.flags.SHOW_LOGS) console.log("The Constructor was cleared.");
      }
    });

    // when the user saves the Polyomino in the Constructor
    $constructorSave.on("click", ()=>{
      if( !$constructorSave.hasClass("mdl-button--disabled") ) {
        
        if(ps.flags.SHOW_LOGS) console.log("The polyomino in the Constructor was saved.");
      }
    });
    
    $constructorInc.on("click", ()=>{
      if( !$constructorInc.hasClass("mdl-button--disabled") ) {
        that.constructorSquareLength += 1;
        ps.buttonToNormal($constructorDec);
        if( that.constructorSquareLength >= that.CONSTRUCTOR_MAX_LENGTH ) { ps.buttonToDisabled( $constructorInc ) };
        // update the constructor grid
        that.constructorGrid = that.initGrid( $("#polyomino-constructor-svg"), that.constructorSquareLength);
        
        if(ps.flags.SHOW_LOGS) console.log("The Constructor was increased in size to " + that.constructorSquareLength + "." );
      }
    });

    $constructorDec.on("click", ()=>{
      if( !$constructorDec.hasClass("mdl-button--disabled") ) {
        that.constructorSquareLength -= 1;
        ps.buttonToNormal($constructorInc);
        if( that.constructorSquareLength <= that.CONSTRUCTOR_MIN_LENGTH ) { ps.buttonToDisabled( $constructorDec ) };
        // update the constructor grid
        that.constructorGrid = that.initGrid( $("#polyomino-constructor-svg"), that.constructorSquareLength);
        
        if(ps.flags.SHOW_LOGS) console.log("The Constructor was decreased in size to " + that.constructorSquareLength + "." );
      }
    });

      
      
    // FIELD BUTTONS ##################################################
      
    // when the Solve button is pressed
    $fieldSolve.on("click", ()=>{
      // run if the button isn't disabled
      if( !$fieldSolve.hasClass("mdl-button--disabled") ) {
        // changed buttons enabled/disabled
        ps.buttonToDisabled($fieldFlood);
        ps.buttonToDisabled($fieldClear);
        ps.buttonToDisabled($fieldSolve);
        ps.buttonToAccent($fieldStop);

        that.solver.solve();
        that.solver.expand();
      }
    });
      
    // when the Stop button is pressed
    $fieldStop.on("click", ()=>{
      // run if the button isn't disabled
      if( !$fieldStop.hasClass("mdl-button--disabled") ) {
        // changed buttons enabled/disabled
        ps.buttonToDisabled($fieldStop);
        ps.buttonToPrimary($fieldFlood);
        ps.buttonToPrimary($fieldClear);
        ps.buttonToAccent($fieldSolve);

        if(ps.flags.SHOW_LOGS) console.log("SOLVING WAS STOPPED.");
      }
    });
    
    $fieldFlood.on("click", ()=>{
      if( !$fieldFlood.hasClass("mdl-button--disabled") ) {
        for( let i = 0; i < that.fieldSquareLength; i++ ) {
          for( let j = 0; j < that.fieldSquareLength; j++ ) {
            if(!$(that.fieldGrid[i][j]).hasClass("is-active")) {
              that.activateSquare($(that.fieldGrid[i][j]));
            }
          }
        }
        if(ps.flags.SHOW_LOGS) console.log("The field was flooded.");
      }
    });
    
    // when the Clear button on the Field screen is clicked
    $fieldClear.on("click", ()=> {
      // run if the button isn't disabled
      if( !$fieldClear.hasClass("mdl-button--disabled") ) {
        for( let i = 0; i < that.fieldSquareLength; i++ ) {
          for( let j = 0; j < that.fieldSquareLength; j++ ) {
            if($(that.fieldGrid[i][j]).hasClass("is-active")) {
              that.deactivateSquare($(that.fieldGrid[i][j]));
            }
          }
        }
        if(ps.flags.SHOW_LOGS) console.log("The field was cleared.");
      }
    });
    
    $fieldInc.on("click", ()=>{
      if( !$fieldInc.hasClass("mdl-button--disabled") ) {
        that.fieldSquareLength += 1;
        ps.buttonToNormal($fieldDec);
        if( that.fieldSquareLength >= that.FIELD_MAX_LENGTH ) { ps.buttonToDisabled( $fieldInc ) };
        // update the field grid
        that.fieldGrid = that.initGrid( $("#polyomino-field-svg"), that.fieldSquareLength);
        
        if(ps.flags.SHOW_LOGS) console.log("The Field was increased in size to " + that.fieldSquareLength + "." );
      }
    });

    $fieldDec.on("click", ()=>{
      if( !$fieldDec.hasClass("mdl-button--disabled") ) {
        that.fieldSquareLength -= 1;
        ps.buttonToNormal($fieldInc);
        if( that.fieldSquareLength <= that.FIELD_MIN_LENGTH ) { ps.buttonToDisabled( $fieldDec ) };
        // update the field grid
        that.fieldGrid = that.initGrid( $("#polyomino-field-svg"), that.fieldSquareLength);
        
        if(ps.flags.SHOW_LOGS) console.log("The Field was decreased in size to " + that.fieldSquareLength + "." );
      }
    });

      
      
    // DRAWER BUTTONS ##################################################
    
    // when any drawer button is clicked
    $drawer.on("click", ()=> {
      ps.hideDrawer();
    });
    
    // the Local Save button in the drawer
    $drawerSave.on("click", ()=> {
      var data = {message: "Local save committed."};
      $snackbar[0].MaterialSnackbar.showSnackbar(data);
      
      if(ps.flags.SHOW_LOGS) console.log("Local save committed.");
    });

    // the Local Load button in the drawer
    $drawerLoad.on("click", ()=> {
      var data = {message: "Local load committed."};
      $snackbar[0].MaterialSnackbar.showSnackbar(data);
      
      if(ps.flags.SHOW_LOGS) console.log("Local load committed.");
    })

    // the About button in the drawer
    $drawerAbout.on("click", ()=> {
      if(ps.flags.SHOW_LOGS) console.log("About opened.");
      window.open("https://github.com/paradoxrevolver/polyominosolver", "_blank");
    });
    
    // the Help button in the drawer
    $drawerHelp.on("click", ()=> {
      if(ps.flags.SHOW_LOGS) console.log("Help opened.");
      window.open("https://github.com/paradoxrevolver/polyominosolver", "_blank");
    })
  }
  // start initialization as soon as the document is ready to go
  $(document).ready( function() {
    that.init();
  });
}








