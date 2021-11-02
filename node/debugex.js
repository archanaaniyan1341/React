var fs = require('fs');

fs.readFile('FHIR.docx', 'utf8', function (err, data) {
    
    debugger;

    if (err) throw err;
    
    console.log(data);
});