var express = require('express');
var stringify = require('csv-stringify');
var multer = require('multer');

var storage = multer.memoryStorage();
var upload = multer({ storage: storage });

var app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }))

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
    //TODO: better error handling, probably include error logging middleware
    if (!req.body && !req.body.fields) {
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

//POST: curl -H "Content-Type: multipart/form-data" -F "file=@encamp-template-1589079207933.csv" http://localhost:3000/api/v1/uploadFile
app.post('/api/v1/uploadFile', upload.single('file'), function (req, res) {
    //TODO: better error handling, probably include error logging middleware
    if (!req.file && !req.file.buffer) {
        errorMessage = "Error - could not read file.";
        console.error(errorMessage);
        res.send(errorMessage);
    }
    
    //get csv file from request 
    data = req.file.buffer.toString('utf-8');

    //get rows of data; first row is the header
    rows = data.split('\n');
    header = rows[0];

    //validate
    fieldCount = header.split(',').length;
    invalidRows = [];
    for (i = 1; i < rows.length; i++) {
        //check field count
        rowCount = rows[i].split(',').length
        if(rowCount != fieldCount) {
            invalidRows.push(rows[i]);
            continue;
        }

        //sanity check value types
    }

    //respond with error
    if(invalidRows.length > 0) {
        message = "The following rows contained errors...";
        //TODO: consider adding row indexes for easier reference
        invalidRows.forEach(x => { message += "\n\t" + x });
        
        res.send(message);
        return;
    }

    //update database
    for (i = 1; i < rows.length; i++) {
        console.log("INSERT ROW " + rows[i]);
    }

    res.send('Upload Complete!');
});

app.listen(3000, function () {
    console.log('code-challenge-encamp app listening on port 3000!');
});