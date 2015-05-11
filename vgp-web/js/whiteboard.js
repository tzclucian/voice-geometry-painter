/**
 * Created by Lucian Tuca on 07/05/15.
 */
var DrawingApplication = function() {

    this.drawingContexts = {};
    this.activeDrawingContext = undefined;
    this.commandParser = undefined;
};

DrawingApplication.prototype.setupDrawingContext = function(canvasId) {
    this.drawingContexts[canvasId] = new DrawingContext(canvasId);
};

DrawingApplication.prototype.getContext = function(canvasId) {
    return this.drawingContexts[canvasId];
};

DrawingApplication.prototype.setCommandParser = function(commandParser) {
    this.commandParser = commandParser;
};

DrawingApplication.prototype.registerCommand = function(commandPtr) {
    this.commandParser.registerCommand(commandPtr.prototype.REGEXP, commandPtr);
};

DrawingApplication.prototype.parseAndExecute = function(commandString) {
    var command = this.commandParser.parse(commandString);

    if (command != null) {
        command.execute(this.activeDrawingContext);
    }
    else {
        console.log("Unknown command: " + commandString);
    }
};