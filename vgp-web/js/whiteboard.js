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
    function drawPoint(x, y, name) {
        updateDrawingColor();

        var point = board.create('point', [x, y], {
            name: 'A',
            size: 3,
            fillColor: drawingColor,
            strokeColor: drawingColor
        });
        shapes[point.id] = point;

        point.on('mousedown', function(e) {
            if (selectedShape != null) {
                selectedShape.setProperty({strokeColor: selectedShape['oldStrokeColor']});
            }

            var object_id = e.target['id'].replace(canvas_id + '_', '');

            selectedShape = shapes[object_id];
            selectedShape['oldStrokeColor'] = selectedShape.getProperty('strokeColor');
            selectedShape.setProperty({strokeColor: selectedColor});
        });

    }

    /**
     *
     * @param Ax
     * @param Ay
     * @param Bx
     * @param By
     */
    function drawLineSegment(Ax, Ay, Bx, By) {
        updateDrawingColor();

        var pointA = board.create('point', [-1, 1], {name: 'A', size: 4});
        var pointB = board.create('point', [2, -1], {name: 'B', size: 4});

        var line = board.create('line', [pointA, pointB],
            {straightFirst: false, straightLast: false, strokeWidth: 2, strokeColor: drawingColor});

        console.log(line);

        line.on('mousedown', function(e) {
            console.log(e.target);
            var object_id = e.target['id'].replace(canvas_id + '_', '');

            selectedShape = shapes[object_id];
            selectedShape.setProperty({strokeColor: selectedColor});
        });
    }

    function getDrawingColor() {
        return document.getElementById('colorpicker').value;
    }

    function updateDrawingColor() {
        drawingColor = getDrawingColor();
    }

    return {
        board: board,

        // Board instruments
        clearBoard: clearBoard,
        deleteShape: deleteShape,
        deselectShape: deselectShape,

        // Basic shapes
        drawLineSegment: drawLineSegment,
        drawPoint: drawPoint

        // Triangles
    }
})();
