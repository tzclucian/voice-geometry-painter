/**
 * Created by Lucian Tuca on 10/06/16.
 */

var ZoomOutCommand = function(commandString) {
    this.commandString = commandString;
};

ZoomOutCommand.prototype.execute = function(context) {
    // Map with the action from the context - basically what the command does.
    context.zoomOut();
};

// Command's name
ZoomOutCommand.prototype.NAME = "Zoom Out";

// Command's regexp
ZoomOutCommand.prototype.REGEXP = new RegExp('zoom out', 'i');

// Command's help
ZoomOutCommand.prototype.HELP = "Zooms out";