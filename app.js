var express = require('express');

var app = express();

app.get('/', function (req, res) {
    res.send('Hello World!');
});

app.get('/api/v1/generateTemplate', function (req, res) {
    //get user-selected fields from request parameters

    //generate csv file from list of fields 

    //respond with created csv file

    res.send('generateTemplate')
});

app.get('/api/v1/uploadFile', function (req, res) {
    //get csv file from request 

    //validate 

    //update database 

    //respond with status, including any errors

    res.send('uploadFile');
});

app.listen(3000, function () {
    console.log('Example app listening on port 3000!');
});