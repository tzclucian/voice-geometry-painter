/**
 * Created by Marian on 5/27/2015.
 */
var EquilateralTriangleCommand = function(commandString) {
    this.commandString = commandString;
};

EquilateralTriangleCommand.prototype.execute = function(context) {
    var reResults = this.commandString.match(this.REGEXP);

    var pointA = reResults[2].toUpperCase();
    var pointB = reResults[3].toUpperCase();
    var pointC = reResults[4].toUpperCase();
    var Ax = parseFloat(reResults[5]);
    var Ay = parseFloat(reResults[6]);
    var side = parseFloat(reResults[7]);

    context.drawEquilateralTriangle(pointA, Ax, Ay, pointB, pointC, side);
};

EquilateralTriangleCommand.prototype.NAME = "EquilateralTriangle";

EquilateralTriangleCommand.prototype.REGEXP = new RegExp('(equal|equilateral)\\striangle\\s([a-zA-Z])([a-zA-Z])([a-zA-Z])' +
                                                        '\\s(\\d+)\\s' + COORDINATE_DELIMITER + '\\s(\\d+)\\s' +
                                                        COORDINATE_DELIMITER + '\\s(\\d+)', 'i');

// Command's help
EquilateralTriangleCommand.prototype.HELP = "equal|equilateral triangle ABC 10 " + COORDINATE_DELIMITER + " 10 " +
                                            COORDINATE_DELIMITER + " 5";