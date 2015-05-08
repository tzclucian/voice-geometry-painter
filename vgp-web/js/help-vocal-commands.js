/**
 * Created by Lucian Tuca on 07/05/15.
 */

var vocalCommand = (function() {

    $('.glyphicon.glyphicon-volume-up.pull-right').popover();

    return {
        // Board speciifc
        clearBoard: "clean whiteboard",
        deleteShape: "delete",
        deselectShape: "deselect",

        point: "new point [Name] [x] [y]",
        line: "new line [Point A] [Point B]"
    }
})();
