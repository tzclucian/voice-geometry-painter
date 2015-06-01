/**
 * Created by Lucian Tuca on 1/06/15.
 */

var DownloadCommand = function(commandString) {
    this.commandString = commandString;
};

DownloadCommand.prototype.execute = function(context) {
    // Map with the action from the context - basically what the command does.
    var filename = $('#div_1').text();
    context.downloadAsPNG(filename);
};

// Command's name
DownloadCommand.prototype.NAME = "Download";

// Command's regexp
DownloadCommand.prototype.REGEXP = /download/i;

// Command's help
DownloadCommand.prototype.HELP = "download";