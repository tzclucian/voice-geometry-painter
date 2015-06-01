/**
 * Created by Lucian Tuca on 1/06/15.
 */

var SetTitle = function(commandString) {
    this.commandString = commandString;
};

SetTitle.prototype.execute = function(context) {
    // Map with the action from the context - basically what the command does.
    var reResults = this.commandString.match(this.REGEXP);
    var title = reResults[1];
    $('#div_1').text(title);
};

// Command's name
SetTitle.prototype.NAME = "Set title";

// Command's regexp
SetTitle.prototype.REGEXP = /set\stitle\s(.*)/i;

// Command's help
SetTitle.prototype.HELP = "set title Triangles";