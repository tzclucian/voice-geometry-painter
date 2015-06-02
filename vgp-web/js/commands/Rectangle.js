/**
 * Created by Marian on 5/27/2015.
 */
var RectangleCommand = function(commandString) {
    this.commandString = commandString;
};

RectangleCommand.prototype.execute = function(context) {
    var reResults = this.commandString.match(this.REGEXP);

    var pointA = reResults[1].toUpperCase();
    var pointB = reResults[2].toUpperCase();
    var pointC = reResults[3].toUpperCase();
    var pointD = reResults[4].toUpperCase();
    var Ax = parseFloat(reResults[5]);
    var Ay = parseFloat(reResults[6]);
    var smallSize= parseFloat(reResults[7]);
    var longSize = parseFloat(reResults[8]);

    context.drawRectangle(pointA, Ax, Ay, pointB, pointC, pointD, smallSize, longSize);
};

RectangleCommand.prototype.NAME = "Rectangle";

RectangleCommand.prototype.REGEXP = new RegExp('draw\\srectangle\\s([a-zA-Z])([a-zA-Z])([a-zA-Z])([a-zA-Z])\\s(\\d+)\\s' +
    COORDINATE_DELIMITER + '\\s(\\d+)\\s' + COORDINATE_DELIMITER + '\\s(\\d+)\\s'  + COORDINATE_DELIMITER + '\\s(\\d+)', 'i');

// Command's help
RectangleCommand.prototype.HELP = "rectangle ABCD 10 " + COORDINATE_DELIMITER_HELP + " 20 " + COORDINATE_DELIMITER_HELP +
                                    " 5 " + COORDINATE_DELIMITER_HELP + " 10";