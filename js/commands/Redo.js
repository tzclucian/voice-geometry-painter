/**
 * Created by Lucian Tuca on 27/05/15.
 */

var RedoCommand = function(commandString) {
    this.commandString = commandString;
};

RedoCommand.prototype.execute = function(context) {
    // Map with the action from the context - basically what the command does.
    context.redo();
};

// Command's name
RedoCommand.prototype.NAME = "Redo";

// Command's regexp
RedoCommand.prototype.REGEXP = new RegExp('redo', 'i');

// Command's help
RedoCommand.prototype.HELP = "redo";