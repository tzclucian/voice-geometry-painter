/**
 * Created by Lucian Tuca on 07/05/15.
 */
var app = (function() {



    // Board
    var canvas_id = 'jxgbox';
    var board = JXG.JSXGraph.initBoard(canvas_id, {boundingbox: [-15, 10, 15, -10]});
    var drawingColor = getDrawingColor();

    // Axes
    var axisX = board.createElement('axis', [[0, 0], [1, 0]], {});
    var axisY = board.createElement('axis', [[0, 0], [0, 1]], {});

    var selectedShape = null;
    var selectedColor = 'cyan';

    var shapes = {};

    /**
     * BOARD specific instruments
     */

    function clearBoard() {
        JXG.JSXGraph.freeBoard(board);
        board = JXG.JSXGraph.initBoard('jxgbox', {boundingbox: [-15, 10, 15, -10]});

        axisX = board.createElement('axis', [[0, 0], [1, 0]], {});
        axisY = board.createElement('axis', [[0, 0], [0, 1]], {});
        shapes = {};
    }

    function deleteShape() {
        if (selectedShape != null) {
            var shapeId = selectedShape['id'];

            if (selectedShape.type == JXG.OBJECT_TYPE_POINT) {

            } else if (selectedShape.type == JXG.OBJECT_TYPE_LINE) {
                selectedShape.point1.remove();
                selectedShape.point2.remove();

            } else if (selectedShape.type == JXG.OBJECT_TYPE_POLYGON) {
                for (var i = 0; i < selectedShape.borders.length; i++) {
                    board.removeObject(selectedShape.borders[i]);
                }
            }

            shapes[shapeId].remove();
            shapes[shapeId] = null;
            selectedShape = null;
        }
    }

    function deselectShape() {
        if (selectedShape != null) {
            selectedShape.setProperty({strokeColor: selectedShape['oldStrokeColor']});
        }

        selectedShape = null;
    }

    /**
     * BASIC shapes
     */

    /**
     * Draws a point at x, y
     * @param x
     * @param y
     * @param name
     */
    function drawPoint(drawingColor, x, y, name) {

        var point = board.create('point', [x, y], {
            name: 'A',
            size: 3,
            fillColor: drawingColor,
            strokeColor: drawingColor
        });

        shapes[point.id] = point;

        JXG.addEvent(point.rendNode, 'mousedown', selection, point);
    }

    /**
     *
     * @param Ax
     * @param Ay
     * @param Bx
     * @param By
     */
    function drawLineSegment(drawingColor, Ax, Ay, Bx, By) {

        var pointA = board.create('point', [Ax, Ay], {name: 'A', size: 4});
        var pointB = board.create('point', [Bx, By], {name: 'B', size: 4});

        var line = board.create('line', [pointA, pointB],
            {straightFirst: false, straightLast: false, strokeWidth: 2, strokeColor: drawingColor});

        shapes[line.id] = line;

        JXG.addEvent(line.rendNode, 'mousedown', selection, line);

    }

    function getDrawingColor() {
        return document.getElementById('colorpicker').value;
    }

    function selection() {
        console.log(this.id);

        if (selectedShape != null) {
            selectedShape.setProperty({strokeColor: selectedShape['oldStrokeColor']});
        }

        var object_id = this.id;

        selectedShape = shapes[object_id];
        selectedShape['oldStrokeColor'] = selectedShape.getProperty('strokeColor');
        selectedShape.setProperty({strokeColor: selectedColor});


    }

    return {
        board: board,

        // Board instruments
        clearBoard: clearBoard,
        deleteShape: deleteShape,
        deselectShape: deselectShape,
        getDrawingColor: getDrawingColor,

        // Basic shapes
        drawLineSegment: drawLineSegment,
        drawPoint: drawPoint

        // Triangles
    }
})();
