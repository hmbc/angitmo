/* global process */
var reader = require('line-reader');
var repository = require('./store-repository');
var path = require('path');

var args = {};

parseArgs();
recreateIndex()
    .then(function () {
        readLinesAndIndex('album.json', repository.indexAlbum);
        readLinesAndIndex('genre.json', repository.indexGenre);
    });

function parseArgs() {
    args = {
        filePath: process.argv[2],
        maxLinesToRead: process.argv[3]
    };

    if (!args.filePath) {
        throw new Error('path not specified!');
    }
}

function recreateIndex() {
    return repository.recreateIndex();
}

function readLinesAndIndex(fileName, index) {
    var readedLines = 0;

    var fullFilePath = path.join(args.filePath, fileName);

    reader.eachLine(fullFilePath, { encoding: 'utf8', bufferSize: 1024 * 1024 }, function (line, last, cb) {
        line = removeBom(line);

        if (line.length > 0) { // ignore empty lines
            if (readedLines > args.maxLinesToRead) {
                return false;
            }
            var obj = JSON.parse(line); // parse the JSON
		
            index(obj).asCallback(cb);
            readedLines++;
        }
    });

    var isBomRemoved = false;
    function removeBom(line) {
        if (isBomRemoved)
            return line;

        isBomRemoved = true;
        return line.replace(/^\uFEFF/, '');
    }
}