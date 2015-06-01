/**
 * Created by Lucian Tuca on 1/06/15.
 */
var SetFillOpacityCommand = function(commandString) {
    this.commandString = commandString;
};

SetFillOpacityCommand.prototype.execute = function(context) {
    var reResults = this.commandString.match(this.REGEXP);

    var opacity = parseInt(reResults[1]);

    if (opacity < 0 || opacity > 100) {
        showErrorMessage("Invalid opacity value. Please set a value between 0 and 100.", true);
        return;
    }

    context.setFillOpacity(opacity);

};

SetFillOpacityCommand.prototype.NAME = "Set fill opacity";

SetFillOpacityCommand.prototype.REGEXP = /set\sfill\sopacity\s(\d?\d\d)/i;

SetFillOpacityCommand.prototype.HELP = "set fill opacity 50";
