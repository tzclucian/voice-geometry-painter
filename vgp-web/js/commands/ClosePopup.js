/**
 * Created by Lucian Tuca on 2/06/15.
 */

var ClosePopupCommand = function(commandString) {
    this.commandString = commandString;
};

ClosePopupCommand.prototype.execute = function(context) {
    // Map with the action from the context - basically what the command does.
    context.closeAnyPopup();
};

// Command's name
ClosePopupCommand.prototype.NAME = "Close";

// Command's regexp
ClosePopupCommand.prototype.REGEXP = /close/i;

// Command's help
ClosePopupCommand.prototype.HELP = "close";