/**
 * Created by Marian on 5/27/2015.
 */
var RectangleCommand = function(commandString) {
    this.commandString = commandString;
};

RectangleCommand.prototype.execute = function(context) {
    var reResults = this.commandString.match(this.REGEXP);

    var pointA = reResults[1].toUpperCase();
    var Ax = parseFloat(reResults[2]);
    var Ay = parseFloat(reResults[3]);

    var pointB = reResults[4].toUpperCase();
    var pointC = reResults[5].toUpperCase();
    var pointD = reResults[6].toUpperCase();
    var smallSize= parseFloat(reResults[7]);
    var longSize = parseFloat(reResults[8]);

    context.drawRectangle(pointA, Ax, Ay, pointB, pointC, pointD, smallSize, longSize);
};

RectangleCommand.prototype.NAME = "Rectangle";

RectangleCommand.prototype.REGEXP = /rectangle\s([a-zA-Z])\s(-?\d+)\s(-?\d+)\s([a-zA-Z])\s([a-zA-Z])\s([a-zA-Z])\s(-?\d+)\s(-?\d+)/i;

// Command's help
RectangleCommand.prototype.HELP = "rectangle A -1 2 B C D 3 4";