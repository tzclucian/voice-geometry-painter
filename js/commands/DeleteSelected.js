/**
 * Created by Lucian Tuca on 11/05/15.
 */

var DeleteSelectedCommand = function(commandString) {
    this.commandString = commandString;
};

DeleteSelectedCommand.prototype.execute = function(context) {
    // Map with the action from the context - basically what the command does.
    context.deleteShape();
};

// Command's name
DeleteSelectedCommand.prototype.NAME = "Delete selected";

// Command's regexp
DeleteSelectedCommand.prototype.REGEXP = new RegExp('delete\\sselected', 'i');

// Command's help
DeleteSelectedCommand.prototype.HELP = "delete selected";