/**
 * Created by Lucian Tuca on 15/06/16.
 */
var FunctionGraphCommand = function (commandString) {
    this.commandString = commandString;
};

FunctionGraphCommand.prototype.execute = function (context) {
    var reResults = this.commandString.match(this.REGEXP);
    var functionSymbol = reResults[1];
    var functionString = reResults[2];
    context.drawFunctionGraph(functionSymbol, functionString);
};

FunctionGraphCommand.prototype.NAME = "Function Graph";

FunctionGraphCommand.prototype.REGEXP = new RegExp('draw\\sgraph\\s([a-zA-Z])\\s(\.*)', 'i');

FunctionGraphCommand.prototype.HELP = "graph f 2x + 3";