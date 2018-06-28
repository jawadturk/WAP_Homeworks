var fs = require('fs');
var zlib = require('zlib');
var gzip = zlib.createGzip();
var gunzip = zlib.createGunzip();

/** this will create a zip from source uncomment these lines first and comment them back when finished */

// var readable = fs.createReadStream(__dirname + '/source.txt');
// var compresed = fs.createWriteStream(__dirname + '/destination.txt.gz');
// readable.pipe(gzip).pipe(compresed);

/** this will unzip a file from zip source */

// var readable2 = fs.createReadStream(__dirname + '/destination.txt.gz');
// var compresed2 = fs.createWriteStream(__dirname + '/destination.txt');
// readable2.pipe(gunzip).pipe(compresed2);