/* global process */
var reader = require('line-reader');
var client = require('./store-repository');

var args = {};

parseArgs();
removeIndex();
readLinesAndSendToElasticsearch();

function parseArgs() {
    args = {
        filePath: process.argv[2],
        maxLinesToRead: process.argv[3]
    };

    if (!args.filePath) {
        throw new Error('path not specified!');
    }
}

function removeIndex() {
    client.removeIndex();
}

function readLinesAndSendToElasticsearch() {
    var readedLines = 0;

    reader.eachLine(args.filePath, { encoding: 'utf8', bufferSize: 1024 * 1024 }, function (line, last, cb) {
        line = removeBom(line);

        if (line.length > 0) { // ignore empty lines
            if (readedLines > args.maxLinesToRead) {
                return false;
            }
            var obj = JSON.parse(line); // parse the JSON
		
            client.index(obj, cb);
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