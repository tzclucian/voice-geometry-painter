/**
 * Created by Lucian Tuca on 01/06/15.
 */

var LineSegment = function(pointA, pointB) {
    this.name = pointA.name + pointB.name;
    this.pointA = pointA;
    this.pointB = pointB;
};

LineSegment.prototype.getProperties = function() {
    return {
        line: {
            name: this.name,
            length: LineSegmentUtils.calculateLength(this.pointA, this.pointB),
            pointA: this.pointA,
            pointB: this.pointB
        }
    }
};
