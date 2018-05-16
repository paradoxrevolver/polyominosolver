/*
  The Driver function completes the tie between the frontend and backend of the program.
  It generates and assigns listeners to HTML elements to perform JS functions.
  It can change HTML content in response to user input.
*/
// start driving
if (ps.flags.SHOW_LOGS) console.log("Starting the Driver.");
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

  // start initialization as soon as the document is ready to go
  $(document).ready(function () {
    that.init();
  });

  /*
    This function initiatlizes the Driver when the page loads.
  */
  that.init = function () {

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
    that.constructorGrid = that.initGrid($("#polyomino-constructor-svg"), that.constructorSquareLength);
    // init the grid that shows the Field
    that.fieldGrid = that.initGrid($("#polyomino-field-svg"), that.fieldSquareLength);

    // STUFF TO DO ONLY FOR TESTING
    if (ps.flags.DO_TESTS) {
      that.performTests();
    }
  }

  /* 
    This function runs only for debugging purposes.
  */
  that.performTests = function () {
    console.log("########## NOW PERFORMING TESTS ##########");
    
    ///*
    // THE 3x4 TEST
    
    let polyominoA = new ps.Polyomino([
      new ps.Vec2(0,2),
      new ps.Vec2(0,1),
      new ps.Vec2(0,0), new ps.Vec2(1,0)
    ]);
    
    let polyominoB = new ps.Polyomino([
                        new ps.Vec2(1,2),
                        new ps.Vec2(1,1),
      new ps.Vec2(0,0), new ps.Vec2(1,0)
    ]);
    
    let polyominoC = new ps.Polyomino([
      new ps.Vec2(0,1), new ps.Vec2(1,1),
      new ps.Vec2(0,0), new ps.Vec2(1,0)
    ]);
    
    let polyominoD = new ps.Polyomino([
      new ps.Vec2(0,3),
      new ps.Vec2(0,2),
      new ps.Vec2(0,1),
      new ps.Vec2(0,0)
    ]);
    
    that.field.add(0,3); that.field.add(1,3); that.field.add(2,3); that.field.add(3,3);
    that.field.add(0,2); that.field.add(1,2); that.field.add(2,2); that.field.add(3,2);
    that.field.add(0,1); that.field.add(1,1); that.field.add(2,1); that.field.add(3,1);
    that.field.add(0,0); that.field.add(1,0); that.field.add(2,0); that.field.add(3,0);
    
    that.palette.add(polyominoA);
    that.palette.add(polyominoB);
    that.palette.add(polyominoC);
    that.palette.add(polyominoD);
    //*/
    
    /*
    // THE 6x10 TEST
    
    
    let polyomino = new ps.Polyomino([
      new ps.Vec2(0,4), new ps.Vec2(1,4), new ps.Vec2(2,4),
      new ps.Vec2(0,3), new ps.Vec2(1,3), new ps.Vec2(2,3),
      new ps.Vec2(0,2), new ps.Vec2(1,2), new ps.Vec2(2,2),
      new ps.Vec2(0,1), new ps.Vec2(1,1), new ps.Vec2(2,1),
      new ps.Vec2(0,0), new ps.Vec2(1,0), new ps.Vec2(2,0)
    ]);
    
    let polyominoF = new ps.Polyomino([
                        new ps.Vec2(1,2), new ps.Vec2(2,2),
      new ps.Vec2(0,1), new ps.Vec2(1,1),
                        new ps.Vec2(1,0)
    ]);
    
    let polyominoI = new ps.Polyomino([
      new ps.Vec2(0,4),
      new ps.Vec2(0,3),
      new ps.Vec2(0,2),
      new ps.Vec2(0,1),
      new ps.Vec2(0,0)
    ]);
    
    let polyominoL = new ps.Polyomino([
      new ps.Vec2(0,3), 
      new ps.Vec2(0,2), 
      new ps.Vec2(0,1), 
      new ps.Vec2(0,0), new ps.Vec2(1,0)
    ]);
    
    let polyominoN = new ps.Polyomino([
                        new ps.Vec2(1,3),
                        new ps.Vec2(1,2),
      new ps.Vec2(0,1), new ps.Vec2(1,1),
      new ps.Vec2(0,0)
    ]);
    
    
    let polyominoP = new ps.Polyomino([
      new ps.Vec2(0,2), new ps.Vec2(1,2),
      new ps.Vec2(0,1), new ps.Vec2(1,1),
      new ps.Vec2(0,0)
    ]);
    
    let polyominoT = new ps.Polyomino([
                        new ps.Vec2(1,2),
                        new ps.Vec2(1,1),
      new ps.Vec2(0,0), new ps.Vec2(1,0), new ps.Vec2(2,0)
    ]);
    
    let polyominoU = new ps.Polyomino([
      new ps.Vec2(0,1),                   new ps.Vec2(2,1),
      new ps.Vec2(0,0), new ps.Vec2(1,0), new ps.Vec2(2,0)
    ]);
    
    let polyominoV = new ps.Polyomino([
      new ps.Vec2(0,2), 
      new ps.Vec2(0,1), 
      new ps.Vec2(0,0), new ps.Vec2(1,0), new ps.Vec2(2,0)
    ]);
    
    let polyominoW = new ps.Polyomino([
      new ps.Vec2(0,2),
      new ps.Vec2(0,1), new ps.Vec2(1,1),
                        new ps.Vec2(1,0), new ps.Vec2(2,0)
    ]);
    
    let polyominoX = new ps.Polyomino([
                        new ps.Vec2(1,2),
      new ps.Vec2(0,1), new ps.Vec2(1,1), new ps.Vec2(2,1),
                        new ps.Vec2(1,0)
    ]);
    
    let polyominoY = new ps.Polyomino([
                        new ps.Vec2(1,3),
      new ps.Vec2(0,2), new ps.Vec2(1,2),
                        new ps.Vec2(1,1),
                        new ps.Vec2(1,0)
    ]);
    
    let polyominoZ = new ps.Polyomino([
      new ps.Vec2(0,2), new ps.Vec2(1,2),
                        new ps.Vec2(1,1),
                        new ps.Vec2(1,0), new ps.Vec2(2,0)
    ]);
    
    that.palette.add(polyominoF);
    that.palette.add(polyominoI);
    that.palette.add(polyominoL);
    that.palette.add(polyominoN);
    that.palette.add(polyominoP);
    that.palette.add(polyominoT);
    that.palette.add(polyominoU);
    that.palette.add(polyominoV);
    that.palette.add(polyominoW);
    that.palette.add(polyominoX);
    that.palette.add(polyominoY);
    that.palette.add(polyominoZ);
    
    that.field.add(0,5); that.field.add(1,5); that.field.add(2,5); that.field.add(3,5); that.field.add(4,5); that.field.add(5,5); that.field.add(6,5); that.field.add(7,5); that.field.add(8,5); that.field.add(9,5);
    that.field.add(0,4); that.field.add(1,4); that.field.add(2,4); that.field.add(3,4); that.field.add(4,4); that.field.add(5,4); that.field.add(6,4); that.field.add(7,4); that.field.add(8,4); that.field.add(9,4);
    that.field.add(0,3); that.field.add(1,3); that.field.add(2,3); that.field.add(3,3); that.field.add(4,3); that.field.add(5,3); that.field.add(6,3); that.field.add(7,3); that.field.add(8,3); that.field.add(9,3);
    that.field.add(0,2); that.field.add(1,2); that.field.add(2,2); that.field.add(3,2); that.field.add(4,2); that.field.add(5,2); that.field.add(6,2); that.field.add(7,2); that.field.add(8,2); that.field.add(9,2);
    that.field.add(0,1); that.field.add(1,1); that.field.add(2,1); that.field.add(3,1); that.field.add(4,1); that.field.add(5,1); that.field.add(6,1); that.field.add(7,1); that.field.add(8,1); that.field.add(9,1);
    that.field.add(0,0); that.field.add(1,0); that.field.add(2,0); that.field.add(3,0); that.field.add(4,0); that.field.add(5,0); that.field.add(6,0); that.field.add(7,0); that.field.add(8,0); that.field.add(9,0);
    
    */
    
    that.solve();
  }

  // functions for using on grid squares
  that.activateSquare = function ($element) {
    $element.addClass("is-active");
    $element.attr("fill", "#3f51b5");
    if ($element.attr("svgname") === "polyomino-constructor-svg") {
      that.constructor.add(parseInt($element.attr("j")), parseInt($element.attr("i")));
    } else if ($element.attr("svgname") === "polyomino-field-svg") {
      that.field.add(parseInt($element.attr("j")), parseInt($element.attr("i")));
    }
  };

  that.deactivateSquare = function ($element) {
    $element.removeClass("is-active");
    $element.attr("fill", "white");
    if ($element.attr("svgname") === "polyomino-constructor-svg") {
      that.constructor.delete(parseInt($element.attr("j")), parseInt($element.attr("i")));
    } else if ($element.attr("svgname") === "polyomino-field-svg") {
      that.field.delete(parseInt($element.attr("j")), parseInt($element.attr("i")));
    }
  };

  /*
    Initalizes a grid given the XHTML location of its svg and its default side length.
  */
  that.initGrid = function ($svg, sideLength) {
    // store a variable from the given svg
    let $grid = $svg.attr("width", that.editorPixelLength)
      .attr("height", that.editorPixelLength);

    // register the click being lifted anywhere on the page
    $("body").on("mouseup", () => {
      that.mouseIsDown = false;
    });

    // get the svg namespace
    let svgNS = $grid[0].namespaceURI;

    // this is the size that a grid square should be in pixels
    let gridSquareLength = that.editorPixelLength / sideLength;

    // keep an array handy for saving references to every square
    let gridSquares = [];

    // now we loop an awful lot for every grid square that needs to exist
    for (let i = 0; i < sideLength; i++) {
      // set up a row for storing a row of squares
      let gridRow = [];
      for (let j = 0; j < sideLength; j++) {
        // time to make a temporary grid square. set up the element with the right namespace
        let gridSquare = document.createElementNS(svgNS, "rect");
        // grid squares start out filled in white
        $(gridSquare).attr("fill", "white");
        // stroke a thin line with light gray
        $(gridSquare).attr("stroke", "#cccccc");
        $(gridSquare).attr("stroke-width", "1");
        // the size of the square is just a little bit larger so that overlap looks good
        $(gridSquare).attr("width", gridSquareLength + 1);
        $(gridSquare).attr("height", gridSquareLength + 1);
        // place properly
        $(gridSquare).attr("x", j * gridSquareLength);
        $(gridSquare).attr("y", (sideLength - i - 1) * gridSquareLength);
        // leave index values (very important for creating Vec2 on click)
        $(gridSquare).attr("i", i);
        $(gridSquare).attr("j", j);
        // save the name of the svg for activation later
        $(gridSquare).attr("svgname", $grid.attr("id"));

        $(gridSquare).on("mousedown", function () {
          that.mouseIsDown = true;
          // if the user starts mousedown on a NON-ACTIVE square...
          if (!$(gridSquare).hasClass("is-active")) {
            // the user is trying to draw
            that.mouseIsDrawing = true;
            that.activateSquare($(gridSquare));
          } else {
            // the user is trying to erase
            that.mouseIsDrawing = false;
            that.deactivateSquare($(gridSquare));
          }
        });

        // check mouseover for when the user is drawing or erasing
        $(gridSquare).on("mouseover", function () {
          if (that.mouseIsDown) {
            if (that.mouseIsDrawing) {
              if (!$(gridSquare).hasClass("is-active")) {
                that.activateSquare($(gridSquare));
              }
            } else {
              if ($(gridSquare).hasClass("is-active")) {
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
    This function initalizes the function of every button in the program.
  */
  that.initButtons = function () {

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

    // CONSTRUCTOR BUTTONS ##################################################


    // when the Clear button on the Constructor screen is clicked
    $constructorClear.on("click", () => {
      if (!$constructorClear.hasClass("mdl-button--disabled")) {
        for (let i = 0; i < that.constructorSquareLength; i++) {
          for (let j = 0; j < that.constructorSquareLength; j++) {
            if ($(that.constructorGrid[i][j]).hasClass("is-active")) {
              that.deactivateSquare($(that.constructorGrid[i][j]));
            }
          }
        }
        ps.buttonToDisabled($constructorSave);
        if (ps.flags.SHOW_LOGS) console.log("The Constructor was cleared.");
      }
    });

    // when the user saves the Polyomino in the Constructor
    $constructorSave.on("click", () => {
      if (!$constructorSave.hasClass("mdl-button--disabled")) {
        that.saveToPalette();

        if (ps.flags.SHOW_LOGS) console.log("The polyomino in the Constructor was saved.");
      }
    });

    $constructorInc.on("click", () => {
      if (!$constructorInc.hasClass("mdl-button--disabled")) {
        that.constructorSquareLength += 1;
        ps.buttonToNormal($constructorDec);
        if (that.constructorSquareLength >= that.CONSTRUCTOR_MAX_LENGTH) {
          ps.buttonToDisabled($constructorInc)
        };
        // update the constructor grid
        that.constructorGrid = that.initGrid($("#polyomino-constructor-svg"), that.constructorSquareLength);
        that.constructor.clear();

        if (ps.flags.SHOW_LOGS) console.log("The Constructor was increased in size to " + that.constructorSquareLength + ".");
      }
    });

    $constructorDec.on("click", () => {
      if (!$constructorDec.hasClass("mdl-button--disabled")) {
        that.constructorSquareLength -= 1;
        ps.buttonToNormal($constructorInc);
        if (that.constructorSquareLength <= that.CONSTRUCTOR_MIN_LENGTH) {
          ps.buttonToDisabled($constructorDec)
        };
        // update the constructor grid
        that.constructorGrid = that.initGrid($("#polyomino-constructor-svg"), that.constructorSquareLength);
        that.constructor.clear();

        if (ps.flags.SHOW_LOGS) console.log("The Constructor was decreased in size to " + that.constructorSquareLength + ".");
      }
    });



    // FIELD BUTTONS ##################################################

    // when the Solve button is pressed
    $fieldSolve.on("click", () => {
      // run if the button isn't disabled
      if (!$fieldSolve.hasClass("mdl-button--disabled")) {
        // changed buttons enabled/disabled
        ps.buttonToDisabled($fieldFlood);
        ps.buttonToDisabled($fieldClear);
        ps.buttonToDisabled($fieldSolve);
        ps.buttonToAccent($fieldStop);

        // start solving!
        that.solve();
      }
    });

    // when the Stop button is pressed
    $fieldStop.on("click", () => {
      // run if the button isn't disabled
      if (!$fieldStop.hasClass("mdl-button--disabled")) {
        that.stop();
      }
    });

    $fieldFlood.on("click", () => {
      if (!$fieldFlood.hasClass("mdl-button--disabled")) {
        for (let i = 0; i < that.fieldSquareLength; i++) {
          for (let j = 0; j < that.fieldSquareLength; j++) {
            if (!$(that.fieldGrid[i][j]).hasClass("is-active")) {
              that.activateSquare($(that.fieldGrid[i][j]));
            }
          }
        }
        if (ps.flags.SHOW_LOGS) console.log("The field was flooded.");
      }
    });

    // when the Clear button on the Field screen is clicked
    $fieldClear.on("click", () => {
      // run if the button isn't disabled
      if (!$fieldClear.hasClass("mdl-button--disabled")) {
        for (let i = 0; i < that.fieldSquareLength; i++) {
          for (let j = 0; j < that.fieldSquareLength; j++) {
            if ($(that.fieldGrid[i][j]).hasClass("is-active")) {
              that.deactivateSquare($(that.fieldGrid[i][j]));
            }
          }
        }
        if (ps.flags.SHOW_LOGS) console.log("The field was cleared.");
      }
    });

    $fieldInc.on("click", () => {
      if (!$fieldInc.hasClass("mdl-button--disabled")) {
        that.fieldSquareLength += 1;
        ps.buttonToNormal($fieldDec);
        if (that.fieldSquareLength >= that.FIELD_MAX_LENGTH) {
          ps.buttonToDisabled($fieldInc)
        };
        // update the field grid
        that.fieldGrid = that.initGrid($("#polyomino-field-svg"), that.fieldSquareLength);
        that.field.clear();

        if (ps.flags.SHOW_LOGS) console.log("The Field was increased in size to " + that.fieldSquareLength + ".");
      }
    });

    $fieldDec.on("click", () => {
      if (!$fieldDec.hasClass("mdl-button--disabled")) {
        that.fieldSquareLength -= 1;
        ps.buttonToNormal($fieldInc);
        if (that.fieldSquareLength <= that.FIELD_MIN_LENGTH) {
          ps.buttonToDisabled($fieldDec)
        };
        // update the field grid
        that.fieldGrid = that.initGrid($("#polyomino-field-svg"), that.fieldSquareLength);
        that.field.clear();

        if (ps.flags.SHOW_LOGS) console.log("The Field was decreased in size to " + that.fieldSquareLength + ".");
      }
    });



    // DRAWER BUTTONS ##################################################

    // when any drawer button is clicked
    $drawer.on("click", () => {
      ps.hideDrawer();
    });

    // the Local Save button in the drawer
    $drawerSave.on("click", () => {
      that.save();
      ps.showSnackbar("Local save committed.");

      if (ps.flags.SHOW_LOGS) console.log("Local save committed.");
    });

    // the Local Load button in the drawer
    $drawerLoad.on("click", () => {
      ps.showSnackbar("Local load committed.");

      if (ps.flags.SHOW_LOGS) console.log("Local load committed.");
    })

    // the About button in the drawer
    $drawerAbout.on("click", () => {
      if (ps.flags.SHOW_LOGS) console.log("About opened.");
      window.open("https://github.com/paradoxrevolver/polyominosolver", "_blank");
    });

    $drawerHelp.on("click", () => {
      if (ps.flags.SHOW_LOGS) console.log("Help opened.");
      window.open("https://github.com/paradoxrevolver/polyominosolver", "_blank");
    })
  }

  /*
    Prepares to and starts the solver.
  */
  that.solve = function () {
    if (ps.flags.SHOW_LOGS) console.log("SOLVING WAS STARTED!");
    // we need to give the solver several things to work with
    // first, an array of all the available Polyominoes to solver with
    let polyominoes = that.palette.polyominoes.values();
    // then, the field that the solver has to work with, in the form of a Polyomino
    let newFieldVecs = [];
    that.field.vectors.values().forEach(function(vector) {
      newFieldVecs.push(vector.clone());
    });
    let field = new ps.Polyomino(newFieldVecs);
    // finally, a set of rules that the solver must adhere to
    let rules = {
      allowReflections: false,
      allowRotations: true
    };
    
    if(ps.flags.SHOW_LOGS) {
      console.log("OBJECTS PASSED TO SOLVER:");
      console.log("Polyominoes:");
      console.log(polyominoes);
      polyominoes.forEach(function(polyomino) {
        console.log(polyomino.toString());
      });
      console.log("Field:");
      console.log(field);
      console.log(field + "\n");
      console.log("Rules:");
      console.log(rules);
    }
    
    // create the Solver, which will immediately begin solving
    that.solver = new ps.Solver(polyominoes, field, rules); 
    
    that.stop();
  }
  
  that.stop = function() {
    if (ps.flags.SHOW_LOGS) console.log("SOLVING WAS STOPPED.");
    // changed buttons enabled/disabled
    ps.buttonToDisabled($("#polyomino-field-stop"));
    ps.buttonToPrimary($("#polyomino-field-flood"));
    ps.buttonToPrimary($("#polyomino-field-clear"));
    ps.buttonToAccent($("#polyomino-field-solve"));
  }

  /*
    Takes whatever is currently in the Constructor, clones it, passes it to the Palette as a Polyomino.
  */
  that.saveToPalette = function () {
    // temp array
    let newVectors = [];
    // for each vector in the constructor
    that.constructor.vectors.values().forEach(function (vector) {
      // push a completely new vector object into the vector array. cloning
      newVectors.push(new ps.Vec2(vector.x, vector.y));
    });
    // create a new Polyomino containing the cloned vectors
    let newPoly = new ps.Polyomino(newVectors);
    if (ps.flags.SHOW_LOGS) console.log("The following Polyomino was just pushed to the Palette:\n" + newPoly.toString());

    // save the new Polyomino to the Palette
    that.palette.add(newPoly);
  }

  /*
    
  */
  that.encode = function (s) {
    var out = [];
    for (var i = 0; i < s.length; i++) {
      out[i] = s.charCodeAt(i);
    }
    return new Uint8Array(out);
  }

  /*
    Returns an object used for turning into a JSON object to save.
  */
  that.makeJSON = function () {
    return {
      myconst: that.constructor || [],
      mypal: that.palette || [],
      mybank: that.bank || [],
      myfield: that.field || []
    };
  }

  /*
    Performs a local save of all the vital data current in PolyominoSolver
  */
  that.save = function () {
    var myjson = that.makeJSON();
    var data = encode(JSON.stringify(myjson, null, 4));

    var blob = new Blob([data], {
      type: 'application/octet-stream'
    });

    url = URL.createObjectURL(blob);
    var link = document.createElement('a');
    link.setAttribute('href', url);
    link.setAttribute('download', 'myfile.poly');

    var event = document.createEvent('MouseEvents');
    event.initMouseEvent('click', true, true, window, 1, 0, 0, 0, 0, false, false, false, false, 0, null);
    link.dispatchEvent(event);
  };

}
