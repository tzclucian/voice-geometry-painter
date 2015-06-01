function AppViewModel() {

	$('span.voice-command').popover();

	this.commands = [];
	var volumeUpIcon = '<i class="fa fa-volume-up"></i> ';

	this.config = {
		vocalCommandHelpMessages: {
			SetFillColor: SetFillColorCommand.prototype.HELP,
			SetLineColor: SetLineColorCommand.prototype.HELP,
			SetWidth: SetWidthCommand.prototype.HELP,
			SetOpacity: 'Set Opacity',

			ClearBoard: volumeUpIcon + ClearBoardCommand.prototype.HELP,
			DeselectElement: DeselectCommand.prototype.HELP,
			DuplicateElement: "Duplicate Element",
			SelectElement: "Select",

			Point: PointCommand.prototype.HELP,
			Line: LineCommand.prototype.HELP,

			Download: "Download",
			SendToGmail: "Send to Gmail",
			ShareOnDropbox: "Share On Dropbox",
			none: "TO BE ADDED",

			Triangle: TriangleCommand.prototype.HELP,
			IsoscelesTriangle: "Isosceles Triangle",
			EquilateralTriangle: RectangularTriangleCommand.prototype.HELP,
			RightTriangle: "Right Triangle",

			Parallelogram: "Parallelogram",
			Rectangle: RectangleCommand.prototype.HELP,
			Square: SquareCommand.prototype.HELP,

			Circle: CircleCommand.prototype.HELP,
			Elipse: "Elipse",
			CustomCircle: "CustomCircle",
			CustomElipse: "Custom Elipse",

			Undo: UndoCommand.prototype.HELP,
			Redo: RedoCommand.prototype.HELP
		},
		vocalCommandTitleMessage: {
			SetFillColor: SetFillColorCommand.prototype.NAME,
			SetLineColor: SetLineColorCommand.prototype.NAME,
			SetWidth: SetWidthCommand.prototype.NAME,
			SetOpacity: 'Set Opacity',

			ClearBoard: ClearBoardCommand.prototype.NAME,
			DeselectElement: DeselectCommand.prototype.NAME,
			DuplicateElement: "Duplicate Element",
			SelectElement: "Select",

			Point: PointCommand.prototype.NAME,
			Line: LineCommand.prototype.NAME,

			Download: "Download",
			SendToGmail: "Send to Gmail",
			ShareOnDropbox: "Share On Dropbox",
			none: "TO BE ADDED",

			Triangle: TriangleCommand.prototype.NAME,
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
		fileName: ko.observable('Image'),
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
		fileName: ko.observable('Image'),
		shareOnDropbox: function (type) {
			var fileName = ko.utils.unwrapObservable(this.fileName);

			app.shareOnDropbox(canvasId, type, fileName);
		}
	});
}

ko.applyBindings(new AppViewModel());

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
app.registerCommand(SetWidthCommand);
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
		}, 1000);
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