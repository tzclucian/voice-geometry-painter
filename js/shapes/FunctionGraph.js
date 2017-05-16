/**
 * Created by Lucian Tuca on 15/06/16.
 */

var FunctionGraph = function (functionString, fn, name) {
    this.functionString = functionString;
    this.name = name;
};

FunctionGraph.prototype.getProperties = function () {
    return {
        'Graph': {
            'Name': this.name,
            'Expression': this.functionString
        }
    }
};
