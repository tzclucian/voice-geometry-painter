/**
 * Created by Lucian Tuca on 07/05/15.
 */
var DrawingApplication = function () {

	this.drawingContexts = {};
	this.activeDrawingContext = undefined;
	this.commandParser = undefined;
};

DrawingApplication.prototype.setupDrawingContext = function (canvasId) {
	this.drawingContexts[canvasId] = new DrawingContext(canvasId);
};

DrawingApplication.prototype.getContext = function (canvasId) {
	return this.drawingContexts[canvasId];
};

DrawingApplication.prototype.setCommandParser = function (commandParser) {
	this.commandParser = commandParser;
};

DrawingApplication.prototype.getCommandParser = function (commandParser) {
	return this.commandParser;
};

DrawingApplication.prototype.registerCommand = function (commandPtr) {
	this.commandParser.registerCommand(commandPtr.prototype.REGEXP, commandPtr);
};

DrawingApplication.prototype.parseAndExecute = function (commandString) {
	var command = this.commandParser.parse(commandString);

	if (command != null) {
		command.execute(this.activeDrawingContext);
		if (command instanceof ZoomOutCommand == false &&
            command instanceof RedoCommand == false &&
			command instanceof ShowPropertiesCommand == false &&
			command instanceof ClosePopupCommand == false &&
			command instanceof ShowHelpCommand == false
		) {
			this.activeDrawingContext.addCommand(command);
		}
	}
	else {
		console.log("Unknown command: " + commandString);
	}
};

/**
 * Downloads the cavans as png
 *
 * @param canvasId
 * @param fileName
 */
DrawingApplication.prototype.downloadAsPNG = function (canvasId, fileName) {
	fileName = fileName || "File";
	this.drawingContexts[canvasId].downloadAsPNG(fileName);
};



DrawingApplication.prototype.downloadAsSVG = function (canvasId, fileName) {
	fileName = fileName || "Image";
	var svg = new XMLSerializer().serializeToString(this.drawingContexts[canvasId].board.renderer.svgRoot)


	//console.log(svg);
	//canvas.toBlob(function (blob) {
	//	saveAs(blob, fileName + ".png");
	//});


	//var bb = new window.WebKitBlobBuilder;
	////var svg = $('#designpanel').svg('get');
	//bb.append(svg.toSVG());
	//var blob = bb.getBlob("application/svg+xml;charset=" + svg.characterSet);
	//saveAs(blob, "name.svg");

	//this is the other option to try
	//saveAs(new Blob([svg], { type: "application/svg+xml" }), "name.svg");
};

DrawingApplication.prototype.getCanvasData = function (canvasId) {
	return this.drawingContexts[canvasId].getCanvasData();
};

DrawingApplication.prototype.shareOnDropbox = function (canvasId, type, fileName) {
	return this.drawingContexts[canvasId].shareOnDropbox(type, fileName);
};





