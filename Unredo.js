/**
 * Undo/redo functionality
 */
console.log("Creating the Unredo.");
 ps.Unredo = function()
 {

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
     * pop from the list of actions
     * remove the item from the source, push to undolist
     */
    that.undo = function()
    {

    };

 }