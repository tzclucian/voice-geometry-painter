function AppViewModel() {

	$('span.voice-command').popover();

	this.commands = [];
	var volumeUpIcon = '<i class="fa fa-volume-up"></i> ';

	this.config = {
		vocalCommandHelpMessages: {
			SetFillColor: SetFillColorCommand.prototype.HELP,
			SetLineColor: SetLineColorCommand.prototype.HELP,
			SetWidth: SetWidthCommand.prototype.HELP,

			ClearBoard: volumeUpIcon + ClearBoardCommand.prototype.HELP,
			DeleteSelected: DeleteSelectedCommand.prototype.HELP,
			DeselectElement: DeselectCommand.prototype.HELP,
			DuplicateElement: "Duplicate Element",
			SelectElement: "Select",

			Point: PointCommand.prototype.HELP,
			Line: LineCommand.prototype.HELP,

			Download: "Download",
			SendToGmail: "Send to Gmail",
			ShareOnDropbox: "Share On Dropbox",
			none: "TO BE ADDED",

			RegularTriangle: "Regular Triangle",
			EquilateralTriangle: "Equilateral Triangle",
			RightTriangle: "Right Triangle",

			Parallelogram: "Parallelogram",
			Rectangle: "Rectangle",
			Square: "Square",
			RightQuadrilateral: "Right Quadrilateral",

			Circle: "Circle",
			Elipse: "Elipse",
			CustomCircle: "CustomCircle",
			CustomElipse: "Custom Elipse",

			LineWidth: "Line Width",
			LineColor: "Line Color",
			FillColor: "Fill Color",
			Undo: "Undo",
			Redo: "Redo",
		},
		vocalCommandTitleMessage: {
			SetFillColor: SetFillColorCommand.prototype.HELP,
			SetLineColor: SetLineColorCommand.prototype.HELP,
			SetWidth: SetWidthCommand.prototype.HELP,

			ClearBoard: 'Clear Board Command',
			DeleteSelected: DeleteSelectedCommand.prototype.HELP,
			DeselectElement: DeselectCommand.prototype.HELP,
			DuplicateElement: "Duplicate Element",
			SelectElement: "Select",

			Point: PointCommand.prototype.HELP,
			Line: LineCommand.prototype.HELP,

			Download: "Download",
			SendToGmail: "Send to Gmail",
			ShareOnDropbox: "Share On Dropbox",
			none: "TO BE ADDED",

			RegularTriangle: "Regular Triangle",
			EquilateralTriangle: "Equilateral Triangle",
			RightTriangle: "Right Triangle",

			Parallelogram: "Parallelogram",
			Rectangle: "Rectangle",
			Square: "Square",
			RightQuadrilateral: "Right Quadrilateral",

			Circle: "Circle",
			Elipse: "Elipse",
			CustomCircle: "CustomCircle",
			CustomElipse: "Custom Elipse",

			LineWidth: "Line Width",
			LineColor: "Line Color",
			FillColor: "Fill Color",
			Undo: "Undo",
			Redo: "Redo",
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
		downloadAsPNG: function () {
			app.downloadAsPNG(canvasId, ko.utils.unwrapObservable(this.fileName));
		},
		downloadAsSVG: function () {
			app.downloadAsSVG(canvasId, ko.utils.unwrapObservable(this.fileName));
		},
	});
}

ko.applyBindings(new AppViewModel());

$(document).ready(function () {

	$('.edit').editable(function (value, settings) {
		return (value);
	}, {
		type: 'text',
		cssclass: 'white-board-title-input',
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

app.registerCommand(UndoCommand);
app.registerCommand(RedoCommand);

app.registerCommand(ClearBoardCommand);
app.registerCommand(PointCommand);
app.registerCommand(LineCommand);
app.registerCommand(TriangleCommand);
app.registerCommand(EquilateralTriangleCommand);
app.registerCommand(RectangleCommand);
app.registerCommand(SquareCommand);
app.registerCommand(CircleCommand);
app.registerCommand(DeselectCommand);
app.registerCommand(DeleteSelectedCommand);
app.registerCommand(SetWidthCommand);
app.registerCommand(SetLineColorCommand);
app.registerCommand(SetFillColorCommand);

var speech = new SpeechApplication(app.getCommandParser());
speech.setOutputBoxId(helpInput);
speech.setMicButtonId(start_button);
speech.init();