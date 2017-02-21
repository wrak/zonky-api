var express = require('express');
var fs = require('fs');
var app = express();
var JsonStream = require('JSONStream');

app.get('/loans', function (req, res) {
    res.set({
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
    });
    fs.createReadStream('./data.json').pipe(res);
});

app.get('/loan/:id', function (req, res) {
    res.set({
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
    });

    var stream = fs
        .createReadStream('./data.json')
        .pipe(JsonStream.parse('*'));

    var result = {};

    stream.on('data', function (data) {
        if (data.id == req.params.id) {
            result = data;
            stream.end();
        }
    });

    stream.on('close', function () {
        res.json(result);
    });

});

app.listen(3003);
