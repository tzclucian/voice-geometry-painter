/**
 * Created by Lucian Tuca on 11/05/15.
 */
var PointCommand = function(commandString) {
    this.commandString = commandString;
};

PointCommand.prototype.execute = function(context) {
    var reResults = this.commandString.match(this.REGEXP);

    var name = reResults[1];
    var x = parseFloat(reResults[2]);
    var y = parseFloat(reResults[3]);

    context.drawPoint(x, y, name);
};

PointCommand.prototype.NAME = "Point";

PointCommand.prototype.REGEXP = /point\s([a-zA-Z])\s(-?\d)\s(-?\d)/i;

PointCommand.prototype.HELP = "point A 2 3";