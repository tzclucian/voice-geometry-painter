/**
 * Created by Lucian Tuca on 10/06/16.
 */

var ZoomInCommand = function(commandString) {
    this.commandString = commandString;
};

ZoomInCommand.prototype.execute = function(context) {
    // Map with the action from the context - basically what the command does.
    context.zoomIn();
};

// Command's name
ZoomInCommand.prototype.NAME = "Zoom In";

// Command's regexp
ZoomInCommand.prototype.REGEXP = new RegExp('zoom in', 'i');

// Command's help
ZoomInCommand.prototype.HELP = "Zooms In";