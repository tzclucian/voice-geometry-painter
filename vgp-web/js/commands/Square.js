/**
 * Created by Marian on 5/27/2015.
 */
var SquareCommand = function(commandString) {
    this.commandString = commandString;
};

SquareCommand.prototype.execute = function(context) {
    var reResults = this.commandString.match(this.REGEXP);

    var pointA = reResults[1].toUpperCase();
    var Ax = parseFloat(reResults[2]);
    var Ay = parseFloat(reResults[3]);

    var pointB = reResults[4].toUpperCase();
    var pointC = reResults[5].toUpperCase();
    var pointD = reResults[6].toUpperCase();
    var size = parseFloat(reResults[7]);

    context.drawSquare(pointA, Ax, Ay, pointB, pointC, pointD, size);
};

SquareCommand.prototype.NAME = "Square";

SquareCommand.prototype.REGEXP = /square\s([a-zA-Z])\s(-?\d+)\s(-?\d+)\s([a-zA-Z])\s([a-zA-Z])\s([a-zA-Z])\s(-?\d+)/i;

// Command's help
SquareCommand.prototype.HELP = "square A 1 2 B C D 3";