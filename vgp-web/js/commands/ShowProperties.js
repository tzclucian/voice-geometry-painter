/**
 * Created by Lucian Tuca on 1/06/15.
 */

var ShowPropertiesCommand = function(commandString) {
    this.commandString = commandString;
};

ShowPropertiesCommand.prototype.execute = function(context) {
    // Map with the action from the context - basically what the command does.
    var reResults = this.commandString.match(this.REGEXP);
    var shapeName = reResults[1];

    context.showPropertiesOf(shapeName);
};

// Command's name
ShowPropertiesCommand.prototype.NAME = "Show properties";

// Command's regexp
ShowPropertiesCommand.prototype.REGEXP = /show\sproperties\sof\s(\w+)/i;

// Command's help
ShowPropertiesCommand.prototype.HELP = "show properties of ABC";