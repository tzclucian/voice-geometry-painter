/**
 * Created by Marian on 6/1/2015.
 */
var IsoscelesTriangleCommand = function(commandString) {
    this.commandString = commandString;
};

IsoscelesTriangleCommand.prototype.execute = function(context) {
    var reResults = this.commandString.match(this.REGEXP);

    var pointA = reResults[1].toUpperCase();
    var pointB = reResults[2].toUpperCase();
    var pointC = reResults[3].toUpperCase();

    var Ax = parseFloat(reResults[4]);
    var Ay = parseFloat(reResults[5]);

    var side = parseFloat(reResults[6]);
    var angle = parseFloat(reResults[7]);

    context.drawIsoscelesTriangle(pointA, Ax, Ay, pointB, pointC, side, angle);
};

IsoscelesTriangleCommand.prototype.NAME = "Isosceles Triangle";

IsoscelesTriangleCommand.prototype.REGEXP = new RegExp('isosceles\\striangle\\s([a-zA-Z])([a-zA-Z])([a-zA-Z])\\s(\\d+)\\s' +
    COORDINATE_DELIMITER + '\\s(\\d+)\\s' + COORDINATE_DELIMITER + '\\s(\\d+)\\s' + COORDINATE_DELIMITER + '\\s(\\d+)', 'i');

// Command's help
IsoscelesTriangleCommand.prototype.HELP = "isosceles triangle ABC 5 " + COORDINATE_DELIMITER + " 5 " + COORDINATE_DELIMITER +
    " 3 " + COORDINATE_DELIMITER + " 30 ";