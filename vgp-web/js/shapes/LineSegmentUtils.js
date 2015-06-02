/**
 * Created by Lucian Tuca on 01/06/15.
 */
var LineSegmentUtils = (function() {
    var calculateLength = function(pointA, pointB) {
        return Math.sqrt(Math.pow((pointA.x - pointB.x), 2) + Math.pow((pointA.y - pointB.y), 2)).toFixed(2);
    };

    var calculateAngleWithOX = function(line1) {
        var sin = line1.point2.x - line1.point1.x;
        var cos = line1.point2.y - line1.point1.y;

        return Math.atan2(cos, sin);
    };

    var calculateAngleWithLine = function(line1, line2) {
        var angle1 = calculateAngleWithOX(line1);
        var angle2 = calculateAngleWithOX(line2);

        return Math.abs(angle2 - angle1);
    };
    return {
        calculateLength: calculateLength,
        calculateAngleWithOX: calculateAngleWithOX,
        calculateAngleWithLine: calculateAngleWithLine
    }
})();

