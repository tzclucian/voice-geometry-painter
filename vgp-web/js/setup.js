function AppViewModel() {

    $('.glyphicon.glyphicon-volume-up.pull-right').popover();

    this.commands = []

    this.config = {
        vocalCommandHelpMessages: {
            SetColor: SetColorCommand.prototype.HELP,
            SetWidth: SetWidthCommand.prototype.HELP,

            ClearBoard: ClearBoardCommand.prototype.HELP,
            DeleteSelected: DeleteSelectedCommand.prototype.HELP,
            Deselect: DeselectCommand.prototype.HELP,

            Point: PointCommand.prototype.HELP,
            Line: LineCommand.prototype.HELP,
            none: "TO BE ADDED"
        }
    };
}

ko.applyBindings(new AppViewModel());

$(document).ready(function() {

    $('.edit').editable(function(value, settings) {
        return (value);
    }, {
        type: 'text',
        cssclass : 'white-board-title-input',
    });

    $("div.sublinks a").on("click", function() {
        $('#toolbox a.active').removeClass('active');
        $('#toolbox div.sublinks a.active-item').removeClass('active-item');

        var currentElement = $(this);
        currentElement.addClass("active-item");
        $('#toolbox a[data-target=#' + $(currentElement.parent()).attr("id") + ']').addClass('active');
    });
});

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
speech.setMicImgId(mic_img);
speech.setMicImageSources('img/mic.gif', 'img/mic-animate.gif', 'img/mic-slash.gif');
speech.setOutputBoxId(helpInput);
speech.init();
