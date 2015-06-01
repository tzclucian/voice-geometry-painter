/**
 * Created by Marian on 6/1/2015.
 */
var QuadrilateralCommand = function(commandString) {
    this.commandString = commandString;
};

QuadrilateralCommand.prototype.execute = function(context) {
    var reResults = this.commandString.match(this.REGEXP);

    var pointA = reResults[1].toUpperCase();
    var pointB = reResults[2].toUpperCase();
    var pointC = reResults[3].toUpperCase();
    var pointD = reResults[4].toUpperCase();

    var Ax = parseFloat(reResults[5]);
    var Ay = parseFloat(reResults[6]);

    var Bx = parseFloat(reResults[7]);
    var By = parseFloat(reResults[8]);

    var Cx = parseFloat(reResults[9]);
    var Cy = parseFloat(reResults[10]);

    var Dx = parseFloat(reResults[11]);
    var Dy = parseFloat(reResults[12]);

    context.drawQuadrilateral(pointA, Ax, Ay, pointB, Bx, By, pointC, Cx, Cy, pointD, Dx, Dy);
};

QuadrilateralCommand.prototype.NAME = "Quadrilateral";

QuadrilateralCommand.prototype.REGEXP = new RegExp('quadrilateral\\s([a-zA-Z])([a-zA-Z])([a-zA-Z])([a-zA-Z])\\s(\\d+)\\s' +
    COORDINATE_DELIMITER + '\\s(\\d+)\\s' + COORDINATE_DELIMITER + '\\s(\\d+)\\s' + COORDINATE_DELIMITER + '\\s(\\d+)\\s' +
    COORDINATE_DELIMITER + '\\s(\\d+)\\s' + COORDINATE_DELIMITER + '\\s(\\d+)\\s' + COORDINATE_DELIMITER + '\\s(\\d+)\\s' +
    COORDINATE_DELIMITER + '\\s(\\d+)', 'i');

// Command's help
QuadrilateralCommand.prototype.HELP = "quadrilateral ABCD 10 " + COORDINATE_DELIMITER + " 20 " + COORDINATE_DELIMITER +
    " 20 " + COORDINATE_DELIMITER + " 20 " + COORDINATE_DELIMITER + " 20 " + COORDINATE_DELIMITER + " 10 " +
    COORDINATE_DELIMITER + " 10 " + COORDINATE_DELIMITER + " 10";