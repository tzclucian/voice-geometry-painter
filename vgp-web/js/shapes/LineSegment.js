/**
 * Created by Lucian Tuca on 01/06/15.
 */

var LineSegment = function(point1, point2) {
    this.name = "[" + point1.name + point2.name + "]";
    this.point1 = point1;
    this.point2 = point2;
    this.length = LineSegmentUtils.calculateLength(this.point1, this.point2)
};

LineSegment.prototype.getProperties = function() {
    return {
        'Line': {
            'Name': this.name,
            'Length': this.length,
            'Point 1': this.line1,
            'Point 2': this.line2
        }
    }
};
