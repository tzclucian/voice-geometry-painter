function AppViewModel() {
    this.config = {
        vocalCommanHelpMessages: {
            clearBoard: "Clean whiteboard from knockout",
            deleteShape: "Delete Shape By Name",
            deselectShape: "Deselect Shape",
            point: "Select The Point Element",
            line: "Select the Line Element",
            none: "",
        }
    };
}

ko.applyBindings(new AppViewModel());

$(document).ready(function() {

    $('.edit').editable(function(value, settings) {
        console.log(this);
        console.log(value);
        console.log(settings);
        return (value);
    }, {
        type: 'text',
        //submit: 'OK',
    });

    $("div.sublinks a").on("click", function() {
        $('#toolbox a.active').removeClass('active');
        $('#toolbox div.sublinks a.active-item').removeClass('active-item');

        var currentElement = $(this);
        currentElement.addClass("active-item");
        $('#toolbox a[data-target=#' + $(currentElement.parent()).attr("id") + ']').addClass('active');
    });
});



