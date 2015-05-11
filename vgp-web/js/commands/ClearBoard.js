/**
 * Created by Lucian Tuca on 11/05/15.
 */

var ClearBoardCommand = function(commandString) {
    this.commandString = commandString;
};

ClearBoardCommand.prototype.execute = function(context) {
    // Map with the action from the context - basically what the command does.
    context.resetBoard();
};

// Command's name
ClearBoardCommand.prototype.NAME = "Clear board";

// Command's regexp
ClearBoardCommand.prototype.REGEXP = /clear\sboard/i;