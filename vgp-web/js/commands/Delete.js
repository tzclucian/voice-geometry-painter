/**
 * Created by Lucian Tuca on 1/06/15.
 */

var DeleteCommand = function(commandString) {
    this.commandString = commandString;
};

DeleteCommand.prototype.execute = function(context) {
    // Map with the action from the context - basically what the command does.
    var reResults = this.commandString.match(this.REGEXP);
    var shapeName = reResults[1];

    context.deleteShape(shapeName);
};

// Command's name
DeleteCommand.prototype.NAME = "Delete shape";

// Command's regexp
DeleteCommand.prototype.REGEXP = /delete\s(\w+)/i;

// Command's help
DeleteCommand.prototype.HELP = "delete ABC";