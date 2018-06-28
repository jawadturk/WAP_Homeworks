var violin = require('./violin');
var playViolin = new violin();

playViolin.on('note', printMessage);

setInterval(emitNote, 1000);

function emitNote() {

    playViolin.emit('note');
}
function printMessage() {
    console.log('violin is playing');
}