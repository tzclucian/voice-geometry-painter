/**
 * Created by Marian on 5/27/2015.
 */
var TriangleCommand = function(commandString) {
    this.commandString = commandString;
};

TriangleCommand.prototype.execute = function(context) {
    var reResults = this.commandString.match(this.REGEXP);

    var pointA = reResults[1].toUpperCase();
    var pointB = reResults[2].toUpperCase();
    var pointC = reResults[3].toUpperCase();

    var Ax = parseFloat(reResults[4]);
    var Ay = parseFloat(reResults[5]);

    var Bx = parseFloat(reResults[6]);
    var By = parseFloat(reResults[7]);

    var Cx = parseFloat(reResults[8]);
    var Cy = parseFloat(reResults[9]);

    context.drawTriangle(pointA, Ax, Ay, pointB, Bx, By, pointC, Cx, Cy);
};

TriangleCommand.prototype.NAME = "Triangle";

TriangleCommand.prototype.REGEXP = new RegExp('draw\\striangle\\s([a-zA-Z])([a-zA-Z])([a-zA-Z])\\s(\\d+)\\s' +
                                            COORDINATE_DELIMITER + '\\s(\\d+)\\s' + COORDINATE_DELIMITER +
                                            '\\s(\\d+)\\s' + COORDINATE_DELIMITER + '\\s(\\d+)\\s' +
                                            COORDINATE_DELIMITER + '\\s(\\d+)\\s' + COORDINATE_DELIMITER + '\\s(\\d+)', 'i');

// Command's help
TriangleCommand.prototype.HELP = "triangle ABC 1 [Ax] " + COORDINATE_DELIMITER_HELP + " 4 [Ay] " + COORDINATE_DELIMITER_HELP +
                                " 8 [Bx] " + COORDINATE_DELIMITER_HELP + " 6 [By] " + COORDINATE_DELIMITER_HELP + " 9 [Cx] " + COORDINATE_DELIMITER_HELP + " 8 [Cy]";