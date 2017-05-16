/**
 * Created by Lucian Tuca on 27/05/15.
 */

var UndoCommand = function(commandString) {
    this.commandString = commandString;
};

UndoCommand.prototype.execute = function(context) {
    // Map with the action from the context - basically what the command does.
    context.undo();
};

// Command's name
UndoCommand.prototype.NAME = "Undo";

// Command's regexp
UndoCommand.prototype.REGEXP = new RegExp('undo', 'i');

// Command's help
UndoCommand.prototype.HELP = "undo";