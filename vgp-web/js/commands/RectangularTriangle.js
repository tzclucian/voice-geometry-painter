/**
 * Created by Marian on 6/1/2015.
 */
var RectangularTriangleCommand = function(commandString) {
    this.commandString = commandString;
};

RectangularTriangleCommand.prototype.execute = function(context) {
    var reResults = this.commandString.match(this.REGEXP);

    var pointA = reResults[1].toUpperCase();
    var pointB = reResults[2].toUpperCase();
    var pointC = reResults[3].toUpperCase();
    var Ax = parseFloat(reResults[4]);
    var Ay = parseFloat(reResults[5]);
    var cat1 = parseFloat(reResults[6]);
    var cat2 = parseFloat(reResults[7]);

    context.drawRectangularTriangle(pointA, Ax, Ay, pointB, pointC, cat1, cat2);
};

RectangularTriangleCommand.prototype.NAME = "RectangularTriangle";

RectangularTriangleCommand.prototype.REGEXP = new RegExp('rectangular\\striangle\\s([a-zA-Z])([a-zA-Z])([a-zA-Z])' +
    '\\s(\\d+)\\s' + COORDINATE_DELIMITER + '\\s(\\d+)\\s' + COORDINATE_DELIMITER + '\\s(\\d+)\\s' +
    COORDINATE_DELIMITER + '\\s(\\d+)', 'i');

// Command's help
RectangularTriangleCommand.prototype.HELP = "rectangular triangle ABC 10 " + COORDINATE_DELIMITER + " 10 " +
    COORDINATE_DELIMITER + " 5 " + COORDINATE_DELIMITER + " 7";