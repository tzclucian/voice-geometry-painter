/**
 * Created by Lucian Tuca on 01/06/15.
 */

var Point = function(name, x, y) {
    this.name = name;
    this.x = x;
    this.y = y;
};

Point.prototype.getProperties = function() {
    return {
        'Point' : {
            name: this.name,
            x: this.x,
            y: this.y
        }
    }
};
