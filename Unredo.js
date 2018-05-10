/**
 * Undo/redo functionality
 * why do we need {source, item}?
 * if needed, we can sort out the sources to have dedicated component buttons to undo and redo
 */
console.log("Creating the Unredo.");
ps.Unredo = function() {

  let that = this;

  // VARIABLES
  // The lists are lists of {source, item} objects
  // the actionlist is a list of items added to any "collections" and their sources
  // and should be pushed to every time anything is saved (ctor->palette, palette->bank, etc.)
  //
  // the undolist is a list of undone actions
  // push to it when you undo something
  that.actionlist = [];
  that.undolist = [];

  /**
   * pop from actionlist
   * remove the item from the source, push to undolist
   */
  that.undo = function() {
    var topush = that.actionlist.pop();
    undolist.push(topush);
  };

  /**
   * pop from undolist
   * add the item back to the source, push to actionlist
   */
  that.redo = function() {
    var topush = that.undolist.pop();
    actionlist.push(topush);
  };

};