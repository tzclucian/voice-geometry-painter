/**
 * Created by Lucian Tuca on 11/05/15.
 */

var DrawingContext = function(canvasId) {
    this.canvasId = canvasId;
    this.initBoard();

    this.selectedShape = null;
    this.selectedColor = 'cyan';
};


DrawingContext.prototype.getDrawingColor = function() {
    return document.getElementById('colorpicker').value;
};

DrawingContext.prototype.initBoard = function() {
    this.board = JXG.JSXGraph.initBoard(this.canvasId, {boundingbox: [-15, 10, 15, -10]});
    this.drawingColor = this.getDrawingColor();

    // Axes
    this.axisX = this.board.createElement('axis', [[0, 0], [1, 0]], {});
    this.axisY = this.board.createElement('axis', [[0, 0], [0, 1]], {});

    this.shapes = {};
};

DrawingContext.prototype.resetBoard = function() {
    JXG.JSXGraph.freeBoard(this.board);
    this.initBoard();
};

DrawingContext.prototype.deleteShape = function() {
    if (this.selectedShape != null) {
        var shapeId = this.selectedShape['id'];

        if (this.selectedShape.type == JXG.OBJECT_TYPE_POINT) {

        } else if (this.selectedShape.type == JXG.OBJECT_TYPE_LINE) {
            this.selectedShape.point1.remove();
            this.selectedShape.point2.remove();

        } else if (this.selectedShape.type == JXG.OBJECT_TYPE_POLYGON) {
            for (var i = 0; i < this.selectedShape.borders.length; i++) {
                board.removeObject(this.selectedShape.borders[i]);
            }
        }

        this.shapes[shapeId].remove();
        this.shapes[shapeId] = null;
        this.selectedShape = null;
    }
};

DrawingContext.prototype.deselectShape = function() {
    if (this.selectedShape != null) {
        this.selectedShape.setProperty({strokeColor: this.selectedShape['oldStrokeColor']});
    }

    this.selectedShape = null;
};

DrawingContext.prototype.selection = function() {
    var context = this;
    return function() {

        if (context.selectedShape != null) {
            context.selectedShape.setProperty({strokeColor: context.selectedShape['oldStrokeColor']});
        }

        var object_id = this.id;

        context.selectedShape = context.shapes[object_id];
        context.selectedShape['oldStrokeColor'] = context.selectedShape.getProperty('strokeColor');
        context.selectedShape.setProperty({strokeColor: context.selectedColor});
    };
};


/**
 * Draws a point at x, y
 * @param x
 * @param y
 * @param name
 */
DrawingContext.prototype.drawPoint = function(x, y, name) {
    var drawingColor = this.getDrawingColor();
    var point = this.board.create('point', [x, y], {
        name: name,
        size: 3,
        fillColor: drawingColor,
        strokeColor: drawingColor
    });

    this.shapes[point.id] = point;

    JXG.addEvent(point.rendNode, 'mousedown', this.selection(), point);
};

/**
 *
 * @param Ax
 * @param Ay
 * @param Bx
 * @param By
 */
DrawingContext.prototype.drawLineSegment = function(A, Ax, Ay, B, Bx, By) {
    var drawingColor = this.getDrawingColor();
    var pointA = this.board.create('point', [Ax, Ay], {
        name: A, size: 4, fillColor: drawingColor,
        strokeColor: drawingColor
    });
    var pointB = this.board.create('point', [Bx, By], {
        name: B, size: 4, fillColor: drawingColor,
        strokeColor: drawingColor
    });

    var line = this.board.create('line', [pointA, pointB],
        {straightFirst: false, straightLast: false, strokeWidth: 2, strokeColor: drawingColor});

    this.shapes[line.id] = line;

    JXG.addEvent(line.rendNode, 'mousedown', this.selection(), line);

};
