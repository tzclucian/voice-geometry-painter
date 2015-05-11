/**
 * Created by Lucian Tuca on 11/05/15.
 */

var CommandParser = function() {
    this.commands = [];
};

CommandParser.prototype.registerCommand = function(regexp, commandPtr) {
    this.commands.push(new CommandDefinition(regexp, commandPtr));
};

CommandParser.prototype.parse = function(commandString) {
    for (var i = 0; i < this.commands.length; i++) {
        var commandDefinition = this.commands[i];
        if (commandDefinition instanceof CommandDefinition) {
            if (commandDefinition.match(commandString)) {
                return commandDefinition.build(commandString);
            }
        }
    }
    return null;
};