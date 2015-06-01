/**
 * Created by Lucian Tuca on 11/05/15.
 */

var DrawingContext = function (canvasId) {
	this.canvasId = canvasId;
	this.initBoard();

	this.selectedShape = null;
	this.selectedColor = 'cyan';

	this.executedCommands = [];
	this.commandIndex = 0;

	this.shapes = {};
	this.selectedShape = null;
};

DrawingContext.prototype.initBoard = function () {
	JXG.Options.renderer = 'canvas';
	this.board = JXG.JSXGraph.initBoard(this.canvasId,
		{
			boundingbox: [-0.5, 50, 50, -2],
			keepaspectratio: true,
			showCopyright: false
		});

	// Axes
	this.axisX = this.board.createElement('axis', [[0, 0], [1, 0]], {});
	this.axisY = this.board.createElement('axis', [[0, 0], [0, 1]], {});

	this.shapes = {};
	this.selectedShape = null;
};

DrawingContext.prototype.resetBoard = function () {
	JXG.JSXGraph.freeBoard(this.board);
	this.initBoard();
};

DrawingContext.prototype.repaint = function () {
	for (var i = 0; i < this.commandIndex; i++) {
		this.executedCommands[i].execute(this);
	}
};

DrawingContext.prototype.undo = function () {
	if (this.commandIndex <= 0) return;
	this.resetBoard();
	this.commandIndex--;
	this.repaint();
};

DrawingContext.prototype.redo = function () {
	if (this.commandIndex >= this.executedCommands.length) return;
	this.resetBoard();
	this.commandIndex++;
	this.repaint();
};

DrawingContext.prototype.addCommand = function (command) {
	this.executedCommands.splice(this.commandIndex + 1, 0, command);
	this.commandIndex++;
};

DrawingContext.prototype.deleteShape = function () {
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

DrawingContext.prototype.selection = function () {
	var context = this;
	return function () {

		if (context.selectedShape != null) {
			context.selectedShape.setProperty({ strokeColor: context.selectedShape['oldStrokeColor'] });
		}

		var object_id = this.id;

		context.selectedShape = context.shapes[object_id];
		context.selectedShape['oldStrokeColor'] = context.selectedShape.getProperty('strokeColor');
		context.selectedShape.setProperty({ strokeColor: context.selectedColor });
	};
};

DrawingContext.prototype.deselectShape = function () {
	if (this.selectedShape != null) {
		this.selectedShape.setProperty({ strokeColor: this.selectedShape['oldStrokeColor'] });
	}

	this.selectedShape = null;
};


DrawingContext.prototype.getLineColor = function () {
	return document.getElementById('colorpickerLine').value;
};

DrawingContext.prototype.setLineColor = function (color) {
	document.getElementById('colorpickerLine').value = color;
};

DrawingContext.prototype.getFillColor = function () {
	return document.getElementById('colorpickerFill').value;
};

DrawingContext.prototype.setFillColor = function (color) {
	document.getElementById('colorpickerFill').value = color;
};

DrawingContext.prototype.getLineDrawingWidth = function () {
	return document.getElementById('lineStroke').value;
};

DrawingContext.prototype.setLineDrawingWidth = function (size) {
	document.getElementById('lineStroke').value = size;
};

DrawingContext.prototype.getPointDrawingWidth = function () {
	return this.getLineDrawingWidth() * 1.5;
};


/**
 *
 * @param x
 * @param y
 * @param name
 */
DrawingContext.prototype.drawPoint = function (x, y, name) {
	var lineColor = this.getLineColor();
	var fillColor = this.getFillColor();

	var lineWidth = this.getLineDrawingWidth();
	var pointWidth = this.getPointDrawingWidth();

	var point = this.board.create('point', [x, y], {
		name: name,
		size: pointWidth,
		fillColor: lineColor,
		strokeColor: lineColor
	});

	this.shapes[point.id] = point;

	JXG.addEvent(point.rendNode, 'mousedown', this.selection(), point);
};

/**
 *
 * @param A
 * @param Ax
 * @param Ay
 * @param B
 * @param Bx
 * @param By
 */
DrawingContext.prototype.drawLineSegment = function (A, Ax, Ay, B, Bx, By) {
	var lineColor = this.getLineColor();
	var fillColor = this.getFillColor();

	var lineWidth = this.getLineDrawingWidth();
	var pointWidth = this.getPointDrawingWidth();

	var pointA = this.board.create('point', [Ax, Ay], {
		name: A, size: pointWidth, fillColor: lineColor,
		strokeColor: lineColor
	});
	var pointB = this.board.create('point', [Bx, By], {
		name: B, size: pointWidth, fillColor: lineColor,
		strokeColor: lineColor
	});

	var line = this.board.create('line', [pointA, pointB],
        { straightFirst: false, straightLast: false, strokeWidth: lineWidth, strokeColor: lineColor, name : A + B });

	this.shapes[line.id] = line;

	JXG.addEvent(line.rendNode, 'mousedown', this.selection(), line);
};

/**
 *
 * @param A
 * @param Ax
 * @param Ay
 * @param B
 * @param Bx
 * @param By
 * @param C
 * @param Cx
 * @param Cy
 */
DrawingContext.prototype.drawTriangle = function (A, Ax, Ay, B, Bx, By, C, Cx, Cy) {
	var lineColor = this.getLineColor();
	var fillColor = this.getFillColor();

	var lineWidth = this.getLineDrawingWidth();
	var pointWidth = this.getPointDrawingWidth();

	var pointA = this.board.create('point', [Ax, Ay], {
		name: A, size: pointWidth, fillColor: lineColor,
		strokeColor: lineColor
	});
	var pointB = this.board.create('point', [Bx, By], {
		name: B, size: pointWidth, fillColor: lineColor,
		strokeColor: lineColor
	});
	var pointC = this.board.create('point', [Cx, Cy], {
		name: C, size: pointWidth, fillColor: lineColor,
		strokeColor: lineColor
	});

	var triangle = this.board.createElement('polygon', [pointA, pointB, pointC], {
		borders: {
			strokeColor: lineColor,
			strokeWidth: lineWidth
		},

		fillColor: fillColor,
		fillOpacity: 0,
		name: A + B + C
	});

	this.shapes[triangle.id] = triangle;

	JXG.addEvent(triangle.rendNode, 'mousedown', this.selection(), triangle);

};

/**
 *
 * @param A
 * @param Ax
 * @param Ay
 * @param B
 * @param C
 * @param side
 * @param angle
 */
DrawingContext.prototype.drawIsoscelesTriangle = function (A, Ax, Ay, B, C, side, angle) {
	var lineColor = this.getLineColor();
	var fillColor = this.getFillColor();

	var lineWidth = this.getLineDrawingWidth();
	var pointWidth = this.getPointDrawingWidth();

	var angleInRadians = angle * (Math.PI / 180) / 2;

	var Bx = Ax - side * Math.cos(angleInRadians);
	var By = Ay - side * Math.sin(angleInRadians);

	var Cx = Ax + side * Math.cos(angleInRadians);
	var Cy = Ay - side * Math.sin(angleInRadians);

	this.drawTriangle(A, Ax, Ay, B, Bx, By, C, Cx, Cy);
};

/**
 *
 * @param A
 * @param Ax
 * @param Ay
 * @param B
 * @param C
 * @param cat1
 * @param cat2
 */
DrawingContext.prototype.drawRectangularTriangle = function (A, Ax, Ay, B, C, cat1, cat2) {
	var lineColor = this.getLineColor();
	var fillColor = this.getFillColor();

	var lineWidth = this.getLineDrawingWidth();
	var pointWidth = this.getPointDrawingWidth();

	var Bx = Ax + cat2;
	var By = Ay;

	var Cx = Ax;
	var Cy = Ay + cat1;

	var pointC = this.board.create('point', [Cx, Cy], {
		name: C, size: pointWidth, fillColor: lineColor,
		strokeColor: lineColor
	});

	this.drawTriangle(A, Ax, Ay, B, Bx, By, C, Cx, Cy);
};

/**
 *
 * @param A
 * @param Ax
 * @param Ay
 * @param B
 * @param C
 * @param side
 */
DrawingContext.prototype.drawEquilateralTriangle = function (A, Ax, Ay, B, C, side) {
	var Cx = Ax + side * Math.cos(Math.PI / 3);
	var Cy = Ay + side * Math.sin(Math.PI / 3);

	var Bx = Ax + side;
	var By = Ay;

	this.drawTriangle(A, Ax, Ay, B, Bx, By, C, Cx, Cy);

};

/**
 *
 * @param A
 * @param Ax
 * @param Ay
 * @param B
 * @param Bx
 * @param By
 * @param C
 * @param Cx
 * @param Cy
 * @param D
 * @param Dx
 * @param Dy
 */
DrawingContext.prototype.drawQuadrilateral = function (A, Ax, Ay, B, Bx, By, C, Cx, Cy, D, Dx, Dy) {
	var lineColor = this.getLineColor();
	var fillColor = this.getFillColor();

	var lineWidth = this.getLineDrawingWidth();
	var pointWidth = this.getPointDrawingWidth();

	var pointA = this.board.create('point', [Ax, Ay], {
		name: A, size: pointWidth, fillColor: lineColor,
		strokeColor: lineColor
	});
	var pointB = this.board.create('point', [Bx, By], {
		name: B, size: pointWidth, fillColor: lineColor,
		strokeColor: lineColor
	});
	var pointC = this.board.create('point', [Cx, Cy], {
		name: C, size: pointWidth, fillColor: lineColor,
		strokeColor: lineColor
	});
	var pointD = this.board.create('point', [Dx, Dy], {
		name: D, size: pointWidth, fillColor: lineColor,
		strokeColor: lineColor
	});

	var quadri = this.board.createElement('polygon', [pointA, pointB, pointC, pointD], {
		borders: {
			strokeColor: lineColor,
			strokeWidth: lineWidth
		},

		fillColor: fillColor,
		fillOpacity: 0,
		name: A + B + C + D
	});

	this.shapes[quadri.id] = quadri;

	JXG.addEvent(quadri.rendNode, 'mousedown', this.selection(), quadri);

};

/**
 *
 * @param A
 * @param Ax
 * @param Ay
 * @param B
 * @param C
 * @param D
 * @param smallSide
 * @param longSide
 * @param angle
 */
DrawingContext.prototype.drawParallelogram = function (A, Ax, Ay, B, C, D, smallSide, longSide, angle) {

	angle = angle * (Math.PI / 180.0);

	var Bx = Ax + longSide;
	var By = Ay;

	var Cx = Bx + smallSide * Math.cos(angle);
	var Cy = By + smallSide * Math.sin(angle);

	var Dx = Cx - longSide;
	var Dy = Cy;

	this.drawQuadrilateral(A, Ax, Ay, B, Bx, By, C, Cx, Cy, D, Dx, Dy);
};

/**
 *
 * @param A
 * @param Ax
 * @param Ay
 * @param B
 * @param C
 * @param D
 * @param smallSide
 * @param longSide
 */
DrawingContext.prototype.drawRectangle = function (A, Ax, Ay, B, C, D, smallSide, longSide) {
	this.drawParallelogram(A, Ax, Ay, B, C, D, smallSide, longSide, 90);
};

/**
 *
 * @param A
 * @param Ax
 * @param Ay
 * @param B
 * @param C
 * @param D
 * @param side
 */
DrawingContext.prototype.drawSquare = function (A, Ax, Ay, B, C, D, side) {
	this.drawRectangle(A, Ax, Ay, B, C, D, side, side);
};

/**
 *
 * @param center
 * @param centerX
 * @param centerY
 * @param radius
 */
DrawingContext.prototype.drawCircle = function (center, centerX, centerY, radius) {
	var lineColor = this.getLineColor();
	var fillColor = this.getFillColor();

	var lineWidth = this.getLineDrawingWidth();
	var pointWidth = this.getPointDrawingWidth();

	var center = this.board.create('point', [centerX, centerY], {
		name: center,
		size: pointWidth, fillColor: lineColor,
		strokeColor: lineColor
	});

	var point = this.board.create('point', [centerX + radius, centerY], {
		name: 'R',
		size: pointWidth, fillColor: lineColor,
		strokeColor: lineColor,
		visible: false
	});

	var circle = this.board.create('circle', [center, point], {
		strokeColor: lineColor,
		strokeWidth: lineWidth,

		fillColor: fillColor,
		fillOpacity: 0,
		name: center
	});

	this.shapes[circle.id] = circle;
	JXG.addEvent(circle.rendNode, 'mousedown', this.selection(), circle);
};



DrawingContext.prototype.downloadAsPNG = function (fileName) {
	fileName = fileName || "File";
	var canvas = this.board.renderer.canvasRoot;
	canvas.toBlob(function (blob) {
		saveAs(blob, fileName + ".png");
	});
};



DrawingContext.prototype.getCanvasData = function () {
	return this.board.renderer.canvasRoot.toDataURL();
};

DrawingContext.prototype.shareOnDropbox = function (type, fileName) {
	var fileExtension = type === 'png' ? '.png' : '.svg';

	var imageStringData = this.getCanvasData();
	var imageData = _base64ToArrayBuffer(imageStringData);
	var fileName = fileName + fileExtension;

	client.writeFile(fileName, imageData, function (error, stat) {
		if (error) {
			console.log('Error: ' + error);
		} else {
			console.log('File written successfully!');
			showSuccessMessage('File Shared Successfuly on Dropbox', true);
		}
	})
};

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
};
