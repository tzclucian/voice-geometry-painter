/**
 * Created by Lucian Tuca on 1/06/15.
 */

var DropboxCommand = function(commandString) {
    this.commandString = commandString;
};

DropboxCommand.prototype.execute = function(context) {
    // Map with the action from the context - basically what the command does.
    var filename = $('#div_1').text();
    context.shareOnDropbox('png', filename);
};

// Command's name
DropboxCommand.prototype.NAME = "Share on dropbox";

// Command's regexp
DropboxCommand.prototype.REGEXP = /share\son\sdropbox/i;

// Command's help
DropboxCommand.prototype.HELP = "share on dropbox";