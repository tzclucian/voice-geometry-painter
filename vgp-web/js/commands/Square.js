/**
 * Created by Marian on 5/27/2015.
 */
var SquareCommand = function(commandString) {
    this.commandString = commandString;
};

SquareCommand.prototype.execute = function(context) {
    var reResults = this.commandString.match(this.REGEXP);

    var pointA = reResults[1].toUpperCase();
    var pointB = reResults[2].toUpperCase();
    var pointC = reResults[3].toUpperCase();
    var pointD = reResults[4].toUpperCase();
    var Ax = parseFloat(reResults[5]);
    var Ay = parseFloat(reResults[6]);

    var size = parseFloat(reResults[7]);

    context.drawSquare(pointA, Ax, Ay, pointB, pointC, pointD, size);
};

SquareCommand.prototype.NAME = "Square";

SquareCommand.prototype.REGEXP = new RegExp('draw\\ssquare\\s([a-zA-Z])([a-zA-Z])([a-zA-Z])([a-zA-Z])\\s(\\d+)\\s' +
                                        COORDINATE_DELIMITER + '\\s(\\d+)\\s' + COORDINATE_DELIMITER + '\\s(\\d+)', 'i');

// Command's help
SquareCommand.prototype.HELP = "square ABCD 10 " + COORDINATE_DELIMITER_HELP + " 20 " + COORDINATE_DELIMITER_HELP + " 10";