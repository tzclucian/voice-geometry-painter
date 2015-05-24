function AppViewModel() {

	$('span.voice-command').popover();

	this.commands = [];

	this.config = {
		vocalCommandHelpMessages: {
			SetColor: SetColorCommand.prototype.HELP,
			SetWidth: SetWidthCommand.prototype.HELP,

			ClearBoard: ClearBoardCommand.prototype.HELP,
			DeleteSelected: DeleteSelectedCommand.prototype.HELP,
			Deselect: DeselectCommand.prototype.HELP,

			Point: PointCommand.prototype.HELP,
			Line: LineCommand.prototype.HELP,

			Download: "Download",
			SendToGmail: "Send to Gmail",
			ShareOnDropbox: "Share On Dropbox",
			none: "TO BE ADDED"
		}
	};
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


	console.log($('body').css('height'));

	setTimeout(function () {
		var app = new DrawingApplication();
		app.setupDrawingContext('jxgbox');
		app.activeDrawingContext = app.getContext('jxgbox');

		app.setCommandParser(new CommandParser());
		app.registerCommand(ClearBoardCommand);
		app.registerCommand(PointCommand);
		app.registerCommand(LineCommand);
		app.registerCommand(DeselectCommand);
		app.registerCommand(DeleteSelectedCommand);
		app.registerCommand(SetWidthCommand);
		app.registerCommand(SetColorCommand);

		var speech = new SpeechApplication();
		speech.setOutputBoxId(helpInput);
		speech.init();
	}, 100);

});


