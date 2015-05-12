/**
 * Created by Lucian Tuca on 11/05/15.
 */
var SetWidthCommand = function(commandString) {
    this.commandString = commandString;
};

SetWidthCommand.prototype.execute = function(context) {
    var reResults = this.commandString.match(this.REGEXP);

    var size = parseFloat(reResults[1]);

    if (size > 0 && size < 13) {
        context.setDrawingWidth(document.getElementById('lineStroke').value);
    }
    else throw ("Invalid width size!");
};

SetWidthCommand.prototype.NAME = "Set size";

SetWidthCommand.prototype.REGEXP = /set\ssize\s(\d?\d)/i;

SetWidthCommand.prototype.HELP = "set size 2";