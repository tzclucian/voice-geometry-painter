/**
 * Created by Lucian Tuca on 02/06/15.
 */

var Angle = function(line1, line2) {
    this.line1 = line1;
    this.line2 = line2;
    this.name = "<(" + this.line1.name + "," + this.line2.name + ")";
    this.size = Math.abs((180 - LineSegmentUtils.calculateAngleWithLine(this.line1, this.line2) * (180 / Math.PI))).toFixed(2) + " degrees"
};


Angle.prototype.getProperties = function() {
    return {
        'Angle': {
            'Name': this.name,
            'Forming lines': {
                'Line 1': this.line1.name,
                'Line 2': this.line2.name
            },
            'Size': this.size
        }
    }
};
