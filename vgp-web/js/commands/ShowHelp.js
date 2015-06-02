/**
 * Created by Lucian Tuca on 02/06/15.
 */

var ShowHelpCommand = function(commandString) {
    this.commandString = commandString;
};

ShowHelpCommand.prototype.execute = function(context) {
    // Map with the action from the context - basically what the command does.
    context.showHelp();
};

// Command's name
ShowHelpCommand.prototype.NAME = "Help";

// Command's regexp
ShowHelpCommand.prototype.REGEXP = new RegExp('help', 'i');

// Command's help
ShowHelpCommand.prototype.HELP = "help";