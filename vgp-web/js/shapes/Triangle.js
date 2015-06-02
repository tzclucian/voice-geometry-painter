/**
 * Created by Lucian Tuca on 02/06/15.
 */

var Triangle = function(point1, point2, point3) {
    this.point1 = point1;
    this.point2 = point2;
    this.point3 = point3;

    this.side1 = new LineSegment(point1, point2);
    this.side2 = new LineSegment(point2, point3);
    this.side3 = new LineSegment(point3, point1);

    this.angle1 = new Angle(this.side1, this.side2);
    this.angle2 = new Angle(this.side2, this.side3);
    this.angle3 = new Angle(this.side3, this.side1);
};

Triangle.prototype.getProperties = function() {
    return {
        'Triangle': {
            'Points': {
                'Point 1': this.point1,
                'Point 2': this.point2,
                'Point 3': this.point3
            },
            'Sides': {
                'Side 1': {
                    'Name': this.side1.name,
                    'Length': this.side1.length
                },
                'Side 2': {
                    'Name': this.side2.name,
                    'Length': this.side2.length
                },
                'Side 3': {
                    'Name': this.side3.name,
                    'Length': this.side3.length
                }
            },
            'Angles': {
                'Angle 1': {
                    'Name': this.angle1.name,
                    'Size': this.angle1.size
                },
                'Angle 2': {
                    'Name': this.angle2.name,
                    'Size': this.angle2.size
                },
                'Angle 3': {
                    'Name': this.angle3.name,
                    'Size': this.angle3.size
                }
            }
        }
    }
};
