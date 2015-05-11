/**
 * Created by Lucian Tuca on 11/05/15.
 */

var DeselectCommand = function(commandString) {
    this.commandString = commandString;
};

DeselectCommand.prototype.execute = function(context) {
    // Map with the action from the context - basically what the command does.
    context.deselectShape();
};

// Command's name
DeselectCommand.prototype.NAME = "Deselect";

// Command's regexp
DeselectCommand.prototype.REGEXP = /deselect/i;