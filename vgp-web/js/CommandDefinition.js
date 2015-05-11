/**
 * Created by Lucian Tuca on 11/05/15.
 */

var CommandDefinition = function(regexp, commandPtr) {
    this.regexp = regexp;
    this.commandPtr = commandPtr;

};

CommandDefinition.prototype.build = function(commandString) {
    return new this.commandPtr(commandString);
};

CommandDefinition.prototype.match = function(inputCommand) {
    return inputCommand.match(this.regexp);
};