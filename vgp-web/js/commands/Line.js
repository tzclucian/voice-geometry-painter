/**
 * Created by Lucian Tuca on 11/05/15.
 */
var LineCommand = function(commandString) {
    this.commandString = commandString;
};

LineCommand.prototype.execute = function(context) {
    var reResults = this.commandString.match(this.REGEXP);

    var pointA = reResults[1].toUpperCase();
    var pointB = reResults[2].toUpperCase();
    var Ax = parseFloat(reResults[3]);
    var Ay = parseFloat(reResults[4]);
    var Bx = parseFloat(reResults[5]);
    var By = parseFloat(reResults[6]);

    context.drawLineSegment(pointA, Ax, Ay, pointB, Bx, By);
};

LineCommand.prototype.NAME = "Line";

LineCommand.prototype.REGEXP = new RegExp('line\\s([a-zA-Z])([a-zA-Z])\\s(\\d+)\\s' + COORDINATE_DELIMITER  +
                                        '\\s(\\d+)\\s' + COORDINATE_DELIMITER + '\\s(\\d+)\\s' + COORDINATE_DELIMITER +
                                        '\\s(\\d+)','i');

// Command's help
LineCommand.prototype.HELP = "line MN 2 " + COORDINATE_DELIMITER + " 3 " + COORDINATE_DELIMITER + " 5 " + COORDINATE_DELIMITER + " 7";
