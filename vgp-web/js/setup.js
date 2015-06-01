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

			Triangle: TriangleCommand.prototype.HELP,
			IsoscelesTriangle: "Isosceles Triangle",
			EquilateralTriangle: EquilateralTriangleCommand.prototype.HELP,
			RightTriangle: "Right Triangle",

			Parallelogram: "Parallelogram",
			Rectangle: RectangleCommand.prototype.HELP,
			Square: SquareCommand.prototype.HELP,

			Circle: CircleCommand.prototype.HELP,
			Elipse: "Elipse",
			CustomCircle: "CustomCircle",
			CustomElipse: "Custom Elipse",

			Undo: UndoCommand.prototype.HELP,
			Redo: RedoCommand.prototype.HELP,
		},
		vocalCommandTitleMessage: {
			SetFillColor: SetFillColorCommand.prototype.NAME,
			SetLineColor: SetLineColorCommand.prototype.NAME,
			SetWidth: SetWidthCommand.prototype.NAME,

			ClearBoard: ClearBoardCommand.prototype.NAME,
			DeleteSelected: DeleteSelectedCommand.prototype.NAME,
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
			EquilateralTriangle: EquilateralTriangleCommand.prototype.NAME,
			RightTriangle: "Right Triangle",

			Parallelogram: "Parallelogram",
			Rectangle: RectangleCommand.prototype.NAME,
			Square: SquareCommand.prototype.NAME,
			RightQuadrilateral: "Right Quadrilateral",

			Circle: CircleCommand.prototype.NAME,

			Undo: UndoCommand.prototype.NAME,
			Redo: RedoCommand.prototype.NAME,
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
		},
	});

	this.shareSettings = ko.observable({
		fileName: ko.observable('Image'),
		shareOnDropbox: function (type) {
			var fileExtension = type === 'png' ? '.png' : '.svg';

			var imageStringData = app.getCanvasData(canvasId);
			var imageData = _base64ToArrayBuffer(imageStringData);
			var fileName = ko.utils.unwrapObservable(this.fileName) + fileExtension;

			client.writeFile(fileName, imageData, function (error, stat) {
				if (error) {
					console.log('Error: ' + error);
				} else {
					console.log('File written successfully!');
				}
			})
		}
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


var client = new Dropbox.Client({ key: 'gbmcr8wq54fown4' });

client.authenticate({ interactive: false }, function (error, client) {
	if (error) {
		alert('Error: ' + error);
	}
});


function _base64ToArrayBuffer(base64) {
	base64 = base64.split('data:image/png;base64,').join('');
	var binary_string = window.atob(base64),
        len = binary_string.length,
        bytes = new Uint8Array(len),
        i;

	for (i = 0; i < len; i++) {
		bytes[i] = binary_string.charCodeAt(i);
	}
	return bytes.buffer;
}

