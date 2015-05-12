/**
 * Created by Lucian Tuca on 11/05/15.
 */
var LineCommand = function(commandString) {
    this.commandString = commandString;
};

LineCommand.prototype.execute = function(context) {
    var reResults = this.commandString.match(this.REGEXP);

    var pointA = reResults[1].toUpperCase();
    var Ax = parseFloat(reResults[2]);
    var Ay = parseFloat(reResults[3]);

    var pointB = reResults[4].toUpperCase();
    var Bx = parseFloat(reResults[5]);
    var By = parseFloat(reResults[6]);

    context.drawLineSegment(pointA, Ax, Ay, pointB, Bx, By);
};

LineCommand.prototype.NAME = "Line";

LineCommand.prototype.REGEXP = /line\s([a-zA-Z])\s(-?\d)\s(-?\d)\s([a-zA-Z])\s(-?\d)\s(-?\d)/i;

// Command's help
LineCommand.prototype.HELP = "line A -1 2 B 3 -4";
