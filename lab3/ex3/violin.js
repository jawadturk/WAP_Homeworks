
var util = require('util');
var events = require('events');

var Violin = function () {
    this.message = "violing is playing";
}

util.inherits(Violin, events.EventEmitter);



module.exports = Violin;