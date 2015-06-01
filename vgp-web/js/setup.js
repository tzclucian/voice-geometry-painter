function AppViewModel() {

	$('span.voice-command').popover();

	this.commands = [];
	var volumeUpIcon = '<i class="fa fa-volume-up"></i> ';

	this.config = {
		vocalCommandHelpMessages: {
			SetFillColor: volumeUpIcon + SetFillColorCommand.prototype.HELP,
			SetLineColor: volumeUpIcon + SetLineColorCommand.prototype.HELP,
			SetWidth: volumeUpIcon + SetWidthCommand.prototype.HELP,
			SetOpacity: volumeUpIcon + 'Set Opacity',

			ClearBoard: volumeUpIcon + ClearBoardCommand.prototype.HELP,
			DeleteCommand: volumeUpIcon + DeleteCommand.prototype.HELP,

			Point: volumeUpIcon + PointCommand.prototype.HELP,
			Line: volumeUpIcon + LineCommand.prototype.HELP,

			Download: volumeUpIcon + "Download",
			SendToGmail: volumeUpIcon + "Send to Gmail",
			ShareOnDropbox: volumeUpIcon + "Share On Dropbox",

			Triangle: volumeUpIcon + TriangleCommand.prototype.HELP,
			IsoscelesTriangle: volumeUpIcon + "Isosceles Triangle",
			EquilateralTriangle: volumeUpIcon + RectangularTriangleCommand.prototype.HELP,
			RightTriangle: volumeUpIcon + "Right Triangle",

			Parallelogram: volumeUpIcon + "Parallelogram",
			Rectangle: volumeUpIcon + RectangleCommand.prototype.HELP,
			Square: volumeUpIcon + SquareCommand.prototype.HELP,

			Circle: volumeUpIcon + CircleCommand.prototype.HELP,

			Undo: volumeUpIcon + UndoCommand.prototype.HELP,
			Redo: volumeUpIcon + RedoCommand.prototype.HELP
		},
		vocalCommandTitleMessage: {
			SetFillColor: SetFillColorCommand.prototype.NAME,
			SetLineColor: SetLineColorCommand.prototype.NAME,
			SetWidth: SetWidthCommand.prototype.NAME,
			SetOpacity: 'Set Opacity',

			ClearBoard: ClearBoardCommand.prototype.NAME,
			DeleteCommand: DeleteCommand.prototype.NAME,

			Point: PointCommand.prototype.NAME,
			Line: LineCommand.prototype.NAME,

			Download: "Download",
			SendToGmail: "Send to Gmail",
			ShareOnDropbox: "Share On Dropbox",
			none: "TO BE ADDED",

			Triangle: TriangleCommand.prototype.NAME,
			IsoscelesTriangle: "Isosceles Triangle",
			RegularTriangle: "Regular Triangle",
			EquilateralTriangle: RectangularTriangleCommand.prototype.NAME,
			RightTriangle: "Right Triangle",

			Parallelogram: "Parallelogram",
			Rectangle: RectangleCommand.prototype.NAME,
			Square: SquareCommand.prototype.NAME,
			RightQuadrilateral: "Right Quadrilateral",

			Circle: CircleCommand.prototype.NAME,

			Undo: UndoCommand.prototype.NAME,
			Redo: RedoCommand.prototype.NAME
		}

	};

	this.settings = ko.observableArray([
		{
			name: 'First Setting',
			value: true
		},
		{
			name: 'Second Setting',
			value: true
		},
		{
			name: 'Third Setting',
			value: false
		},
		{
			name: 'Forth Setting',
			value: false
		},
		{
			name: 'Fifth Setting',
			value: true
		},
	]);

	this.downloadSettings = ko.observable({
		fileName: ko.observable($('#div_1').text()),
		download: function (type) {
			switch (type) {
				case 'svg':
					app.downloadAsSVG(canvasId, ko.utils.unwrapObservable(this.fileName));
					break;
				case 'png':
				default:
					app.downloadAsPNG(canvasId, ko.utils.unwrapObservable(this.fileName));
					break;
			}
		}
	});

	this.shareSettings = ko.observable({
		fileName: ko.observable($('#div_1').text()),
		shareOnDropbox: function (type) {
			var fileName = ko.utils.unwrapObservable(this.fileName);

			app.shareOnDropbox(canvasId, type, fileName);
		}
	});


	this.figureProperties = ko.observableArray([
		{
			name: 'First Setting',
			value: "Value 1"
		},
		{
			name: 'Second Setting',
			value: "Value 1"

		},
		{
			name: 'Third Setting',
			value: "Value 1"
		},
		{
			name: 'Forth Setting',
			value: "Value 1"
		},
		{
			name: 'Fifth Setting',
			value: "Value 1"
		},
	]);

	this.updateFigureProperties = function (properties) {
		this.figureProperties(properties);
	}
}
var appModel = new AppViewModel();
ko.applyBindings(appModel);

$(document).ready(function () {

	$('.edit').editable(function (value, settings) {
		return (value);
	}, {
		type: 'text',
		cssclass: 'white-board-title-input'
	});

	$('#menuBtn').on('click', function () {
		var element = $('.horizontal-expand');
		var isMenuShown = element.css("display") === "block";

		if (isMenuShown) {
			element.css("display", "none");
			$('.menu-btn').removeClass('active');
		} else {
			element.css("display", "block");
			$('.menu-btn').addClass('active');
		}
	});




});

var canvasId = 'jxgbox';
var app = new DrawingApplication();
app.setupDrawingContext(canvasId);
app.activeDrawingContext = app.getContext(canvasId);
app.activeDrawingContext.setLineColor("#00008B");
app.activeDrawingContext.setFillColor("#F8F8FF");

app.setCommandParser(new CommandParser());

app.registerCommand(DownloadCommand);
app.registerCommand(DropboxCommand);

app.registerCommand(UndoCommand);
app.registerCommand(RedoCommand);

app.registerCommand(ClearBoardCommand);
app.registerCommand(PointCommand);
app.registerCommand(LineCommand);
app.registerCommand(TriangleCommand);
app.registerCommand(IsoscelesTriangleCommand);
app.registerCommand(EquilateralTriangleCommand);
app.registerCommand(RectangularTriangleCommand);
app.registerCommand(QuadrilateralCommand);
app.registerCommand(ParallelogramCommand);
app.registerCommand(RectangleCommand);
app.registerCommand(SquareCommand);
app.registerCommand(CircleCommand);

app.registerCommand(DeselectCommand);
app.registerCommand(DeleteCommand);
app.registerCommand(ShowPropertiesCommand);
app.registerCommand(SetWidthCommand);
app.registerCommand(SetFillOpacityCommand);
app.registerCommand(SetLineColorCommand);
app.registerCommand(SetFillColorCommand);
app.registerCommand(SetTitle);

var speech = new SpeechApplication(app.getCommandParser());
speech.setOutputBoxId(helpInput);
speech.setMicButtonId(start_button);
speech.init();

var client = new Dropbox.Client({ key: '803oowr6qcc8vpd' });

client.authenticate(function (error, client) {
	if (error) {
		alert('Error: ' + error);
	}
});


function showSuccessMessage(message, autoClose) {
	$('#successMessage #messageContent').text(message);
	$('#successMessage').removeClass('hide');

	if (autoClose) {
		setTimeout(function () {
			closeSuccessMessage();
		}, 1500);
	}
}

function closeSuccessMessage() {
	$('#successMessage #messageContent').text("");
	$('#successMessage').addClass('hide');

}

function showErrorMessage(message, autoClose) {
	$('#errorMessage #messageContent').text(message);
	$('#errorMessage').removeClass('hide');

	if (!!autoClose) {
		setTimeout(function () {
			closeErrorMessage();
		}, 1500);
	}
}

function closeErrorMessage() {
	$('#errorMessage #messageContent').text("");
	$('#errorMessage').addClass('hide');
}


function handleCommandKeyPress(e) {
	var key = e.keyCode || e.which;
	if (key == 13) {
		app.parseAndExecute(document.getElementById('helpInput').value);
	}
}

function openFigureProperties(objectWithProperties) {
	var properties = [];
	objectWithProperties && Object.getOwnPropertyNames(objectWithProperties).forEach(function (propertyName) {
		properties.push({
			name: propertyName,
			value: objectWithProperties[propertyName]
		});
	});

	appModel.updateFigureProperties(properties);
	$('#figurePropertiesModal').modal('show');
}