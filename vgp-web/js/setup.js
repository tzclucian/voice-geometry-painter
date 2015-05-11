function AppViewModel() {

    $('.glyphicon.glyphicon-volume-up.pull-right').popover();

    this.config = {
        vocalCommandHelpMessages: {
            clearBoard: "Clean whiteboard from knockout",
            deleteShape: "Delete Shape By Name",
            deselectShape: "Deselect Shape",
            point: "Select The Point Element",
            line: "Select the Line Element",
            none: "TO BE ADDED"
        }
    };
}

ko.applyBindings(new AppViewModel());

$(document).ready(function() {

    $('.edit').editable(function(value, settings) {
        return (value);
    }, {
        type: 'text'
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



