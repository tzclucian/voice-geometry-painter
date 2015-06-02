/**
 * Created by Marian on 6/1/2015.
 */
var ParallelogramCommand = function(commandString) {
    this.commandString = commandString;
};

ParallelogramCommand.prototype.execute = function(context) {
    var reResults = this.commandString.match(this.REGEXP);

    var pointA = reResults[1].toUpperCase();
    var pointB = reResults[2].toUpperCase();
    var pointC = reResults[3].toUpperCase();
    var pointD = reResults[4].toUpperCase();
    var Ax = parseFloat(reResults[5]);
    var Ay = parseFloat(reResults[6]);
    var smallSize= parseFloat(reResults[7]);
    var longSize = parseFloat(reResults[8]);
    var angle = parseFloat(reResults[9]);

    context.drawParallelogram(pointA, Ax, Ay, pointB, pointC, pointD, smallSize, longSize, angle);
};

ParallelogramCommand.prototype.NAME = "Parallelogram";

ParallelogramCommand.prototype.REGEXP = new RegExp('draw\\sparallelogram\\s([a-zA-Z])([a-zA-Z])([a-zA-Z])([a-zA-Z])\\s(\\d+)\\s' +
    COORDINATE_DELIMITER + '\\s(\\d+)\\s' + COORDINATE_DELIMITER + '\\s(\\d+)\\s' + COORDINATE_DELIMITER + '\\s(\\d+)\\s' +
    COORDINATE_DELIMITER + '\\s(\\d+)', 'i');

// Command's help
ParallelogramCommand.prototype.HELP = "parallelogram ABCD 10 " + COORDINATE_DELIMITER_HELP + " 20 " + COORDINATE_DELIMITER_HELP +
    " 5 " + COORDINATE_DELIMITER_HELP + " 10 " + COORDINATE_DELIMITER_HELP + " 45";