/**
 * Created by Marian on 5/27/2015.
 */
var TriangleCommand = function(commandString) {
    this.commandString = commandString;
};

TriangleCommand.prototype.execute = function(context) {
    var reResults = this.commandString.match(this.REGEXP);

    var pointA = reResults[1].toUpperCase();
    var Ax = parseFloat(reResults[2]);
    var Ay = parseFloat(reResults[3]);

    var pointB = reResults[4].toUpperCase();
    var Bx = parseFloat(reResults[5]);
    var By = parseFloat(reResults[6]);

    var pointC = reResults[7].toUpperCase();
    var Cx = parseFloat(reResults[8]);
    var Cy = parseFloat(reResults[9]);

    context.drawTriangle(pointA, Ax, Ay, pointB, Bx, By, pointC, Cx, Cy);
};

TriangleCommand.prototype.NAME = "Triangle";

TriangleCommand.prototype.REGEXP = /triangle\s([a-zA-Z])\s(-?\d+)\s(-?\d+)\s([a-zA-Z])\s(-?\d+)\s(-?\d+)\s([a-zA-Z])\s(-?\d+)\s(-?\d+)/i;

// Command's help
TriangleCommand.prototype.HELP = "triangle A -1 2 B 3 -4 C 2 3";