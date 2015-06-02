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
	this.shapeProperties = {};
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

DrawingContext.prototype.setFillOpacity = function (opacity) {
	document.getElementById('shapeOpacity').value = opacity;
};

DrawingContext.prototype.getFillOpacity = function () {
	return document.getElementById('shapeOpacity').value;
};


/**
 *
 * @param x
 * @param y
 * @param pointName
 */
DrawingContext.prototype.drawPoint = function (x, y, pointName) {
	if (this.isShapeAlreadyDrawn(pointName)) return;

	var lineColor = this.getLineColor();
	var pointWidth = this.getPointDrawingWidth();

	var point = this.board.create('point', [x, y], {
		name: pointName,
		size: pointWidth,
		fillColor: lineColor,
		strokeColor: lineColor
	});

	var pointShape = new Point(pointName, x, y);
	this.shapes[point.id] = point;
	this.shapeProperties[point.id] = pointShape.getProperties();

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
	if (this.isShapeAlreadyDrawn(A + B)) return;
	var lineColor = this.getLineColor();

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
        { straightFirst: false, straightLast: false, strokeWidth: lineWidth, strokeColor: lineColor, name: A + B });

	var lineShape = new LineSegment(new Point(A, Ax, Ay), new Point(B, Bx, By));
	this.shapes[line.id] = line;
	this.shapeProperties[line.id] = lineShape.getProperties();

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
	var shapeFillOpacity = this.getFillOpacity();

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
		hasInnerPoints: true,
		fillColor: fillColor,
		fillOpacity: shapeFillOpacity,
		name: A + B + C
	});

	pointA = new Point(A, Ax, Ay);
	pointB = new Point(B, Bx, By);
	pointC = new Point(C, Cx, Cy);

	var triangleShape = new Triangle(pointA, pointB, pointC);

	this.shapes[triangle.id] = triangle;
	this.shapeProperties[triangle.id] = triangleShape.getProperties();

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
	var Bx = Ax + cat2;
	var By = Ay;

	var Cx = Ax;
	var Cy = Ay + cat1;

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
	var shapeFillOpacity = this.getFillOpacity();

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
		hasInnerPoints: true,
		fillColor: fillColor,
		fillOpacity: shapeFillOpacity,
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
 * @param C
 * @param Cx
 * @param Cy
 * @param radius
 */
DrawingContext.prototype.drawCircle = function (C, Cx, Cy, radius) {
	var lineColor = this.getLineColor();
	var fillColor = this.getFillColor();
	var shapeFillOpacity = this.getFillOpacity();

	var lineWidth = this.getLineDrawingWidth();
	var pointWidth = this.getPointDrawingWidth();

	var centerPoint = this.board.create('point', [Cx, Cy], {
		name: C,
		size: pointWidth, fillColor: lineColor,
		strokeColor: lineColor
	});

	var point = this.board.create('point', [Cx + radius, Cy], {
		name: 'R',
		size: pointWidth, fillColor: lineColor,
		strokeColor: lineColor,
		visible: false
	});

	var circle = this.board.create('circle', [centerPoint, point], {
		strokeColor: lineColor,
		strokeWidth: lineWidth,

		fillColor: fillColor,
		fillOpacity: shapeFillOpacity,
		name: C
	});

	this.shapes[circle.id] = circle;
	JXG.addEvent(circle.rendNode, 'mousedown', this.selection(), circle);
};

DrawingContext.prototype.isShapeAlreadyDrawn = function (shapeNameToBeChecked) {
	var shapesArray = Object.getOwnPropertyNames(this.shapes);
	for (var i = 0; i < shapesArray.length ; i++) {
		var shape = this.shapes[shapesArray[i]];
		var shapeName = shape["name"];
		if (this.compareShapeNames(shapeName, shapeNameToBeChecked)) {
			showErrorMessage("Shape with name: " + shapeName + " already exists.", true);
			return true;
		}
	}
	return false;
};

/**
 * Deletes a shape given by its name
 *
 * @param shapeNameToBeDeleted
 */
DrawingContext.prototype.deleteShape = function (shapeNameToBeDeleted) {
	var shapesArray = Object.getOwnPropertyNames(this.shapes);
	for (var i = 0; i < shapesArray.length ; i++) {
		var shape = this.shapes[shapesArray[i]];
		var shapeName = shape["name"];

		if (this.compareShapeNames(shapeName, shapeNameToBeDeleted)) {
			// Delete the shape
			var shapeId = shape['id'];

			if (shape.type == JXG.OBJECT_TYPE_POINT) {
				this.board.removeObject(shape);

			} else if (shape.type == JXG.OBJECT_TYPE_LINE) {
				this.board.removeObject(shape);
				this.board.removeObject(shape.point1);
				this.board.removeObject(shape.point2);

			} else if (shape.type == JXG.OBJECT_TYPE_POLYGON) {
				for (var j = 0; j < shape.borders.length; j++) {
					this.board.removeObject(shape.borders[j]);
				}
				for (var k = 0; k < shape.vertices.length; k++) {
					this.board.removeObject(shape.vertices[k]);
				}

			} else if (shape.type == JXG.OBJECT_TYPE_CIRCLE) {
				var centerPoint = shape.center;
				this.board.removeObject(centerPoint);
				this.board.removeObject(shape);
			}

			this.shapes[shapeId].remove();
			delete this.shapes[shapeId];

			delete this.shapeProperties[shapeId];
		}
	}
};

/**
 *
 * @param shapeName
 */
DrawingContext.prototype.showPropertiesOf = function (shapeNameToBeDeleted) {
	var shapesArray = Object.getOwnPropertyNames(this.shapes);
	for (var i = 0; i < shapesArray.length; i++) {
		var shape = this.shapes[shapesArray[i]];
		var shapeName = shape["name"];
		if (this.compareShapeNames(shapeName, shapeNameToBeDeleted)) {
			var shapeProperties = this.shapeProperties[shape["id"]];
			var json = JSON.stringify(shapeProperties);
			var data = JSON.parse(json);

			var yml = window.YAML.stringify(data);
			openFigureProperties({ shapeName: yml });
		}
	}
};

/**
 * Closes any visible popup.
 */
DrawingContext.prototype.closeAnyPopup = function () {
	$('.modal').modal('hide');
};

DrawingContext.prototype.showHelp = function () {
	alert('show the help!');
};

/**
 * Compares 2 shape names by ignoring the letter order.
 * This way triangle ABC is the same with triangle BAC
 *
 * @param shape1
 * @param shape2
 * @returns {boolean}
 */
DrawingContext.prototype.compareShapeNames = function (shape1, shape2) {
	shape1 = shape1.split('').sort().join('');
	shape2 = shape2.split('').sort().join('');

	if (shape1 == shape2) return true;
	return false;
};

/**
 * Used to retrieve tha data from the canvas.
 *
 * @returns {string}
 */
DrawingContext.prototype.getCanvasData = function () {
	return this.board.renderer.canvasRoot.toDataURL();
};

/**
 * Downloads the canvas as png.
 *
 * @param fileName
 */
DrawingContext.prototype.downloadAsPNG = function (fileName) {
	fileName = fileName || "File";
	var canvas = this.board.renderer.canvasRoot;
	canvas.toBlob(function (blob) {
		saveAs(blob, fileName + ".png");
	});
};

/**
 * Saves the canvas as png on users dropbox account.
 *
 * @param type
 * @param fileName
 */
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
