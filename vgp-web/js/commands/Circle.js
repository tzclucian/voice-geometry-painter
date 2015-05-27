/**
 * Created by Marian on 5/27/2015.
 */
var CircleCommand = function(commandString) {
    this.commandString = commandString;
};

CircleCommand.prototype.execute = function(context) {
    var reResults = this.commandString.match(this.REGEXP);

    var center = reResults[1].toUpperCase();
    var centerX = parseFloat(reResults[2]);
    var centerY = parseFloat(reResults[3]);
    var radius = parseFloat(reResults[4]);

    context.drawCircle(center, centerX, centerY, radius);
};

CircleCommand.prototype.NAME = "Circle";

CircleCommand.prototype.REGEXP = /circle\s([a-zA-Z])\s(-?\d+)\s(-?\d+)\s(-?\d+)/i;

// Command's help
CircleCommand.prototype.HELP = "circle C 3 3 2";