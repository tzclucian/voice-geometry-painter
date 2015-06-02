/**
 * Created by Lucian Tuca on 01/06/15.
 */
var LineSegmentUtils = (function() {
    var calculateLength = function(pointA, pointB) {
        return Math.sqrt(Math.pow((pointA.x - pointB.x), 2) + Math.pow((pointA.y - pointB.y), 2)).toFixed(2);
    };
    return {
        calculateLength: calculateLength
    }
})();

