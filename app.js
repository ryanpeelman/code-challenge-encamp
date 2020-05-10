var express = require('express');
var stringify = require('csv-stringify');

var app = express();
app.use(express.json());

app.get('/', function (req, res) {
    res.send('Hello World!');
});

/*
*** kept for completeness ***

//GET: http://localhost:3000/api/v1/generateTemplate/Name,Email,Phone,Hire%20Date,Address,T-shirt%20Size
app.get('/api/v1/generateTemplate/:fields', function (req, res) {
    //TODO: better error handling, probably include error logging middleware
    if(!req.params || !req.params.fields) {
        errorMessage = "Error - please include the list of fields";
        console.error(errorMessage);
        res.send(errorMessage);
    }
    
    //get user-selected fields from request parameters
    fields = req.params.fields.split(',');

    //set content type and disposition as attachment to facilitate download
    res.setHeader('Content-Type', 'text/csv');
    res.setHeader('Content-Disposition', 'attachment; filename=\"' + 'encamp-template-' + Date.now() + '.csv\"');

    //generate csv file from list of fields; respond with created csv file
    stringify([fields]).pipe(res);
});
*/

//POST: curl -H "Content-Type: application/json" -d '{ "fields": [ "Name", "Email", "Phone", "Hire Date", "Address", "T-shirt Size" ] }" -JLO http://localhost:3000/api/v1/generateTemplate
//[Windows] curl -H "Content-Type: application/json" -d "{ \"fields\": [ \"Name\", \"Email\", \"Phone\", \"Hire Date\", \"Address\", \"T-shirt Size\" ] }" -JLO http://localhost:3000/api/v1/generateTemplate
app.post('/api/v1/generateTemplate', function (req, res) {
    //sanity check req.body & req.body.fields
    //TODO: better error handling, probably include error logging middleware
    if(!req.body || !req.body.fields) {
        errorMessage = "Error - please include the list of fields";
        console.error(errorMessage);
        res.send(errorMessage);
    }
    
    //get user-selected fields from request parameters
    fields = req.body.fields

    //set content type and disposition as attachment to facilitate download
    res.setHeader('Content-Type', 'text/csv');
    res.setHeader('Content-Disposition', 'attachment; filename=\"' + 'encamp-template-' + Date.now() + '.csv\"');

    //generate csv file from list of fields; respond with created csv file
    stringify([fields]).pipe(res);
});

app.get('/api/v1/uploadFile', function (req, res) {
    //get csv file from request 

    //validate 

    //update database 

    //respond with status, including any errors

    res.send('uploadFile');
});

app.listen(3000, function () {
    console.log('code-challenge-encamp app listening on port 3000!');
});