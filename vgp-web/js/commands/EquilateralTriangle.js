/**
 * Created by Marian on 5/27/2015.
 */
var EquilateralTriangleCommand = function(commandString) {
    this.commandString = commandString;
};

EquilateralTriangleCommand.prototype.execute = function(context) {
    var reResults = this.commandString.match(this.REGEXP);

    var pointA = reResults[2].toUpperCase();
    var Ax = parseFloat(reResults[3]);
    var Ay = parseFloat(reResults[4]);
    var pointB = reResults[5].toUpperCase();
    var pointC = reResults[6].toUpperCase();
    var side = parseFloat(reResults[7]);

    context.drawEquilateralTriangle(pointA, Ax, Ay, pointB, pointC, side);
};

EquilateralTriangleCommand.prototype.NAME = "EquilateralTriangle";

EquilateralTriangleCommand.prototype.REGEXP = /(equal|equilateral)\striangle\s([a-zA-Z])\s(-?\d+)\s(-?\d+)\s([a-zA-Z])\s([a-zA-Z])\s(-?\d+)/i;

// Command's help
EquilateralTriangleCommand.prototype.HELP = "equal|equilateral triangle A -1 2 B C 5";