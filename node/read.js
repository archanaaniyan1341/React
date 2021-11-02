var fs = require('fs');

fs.readFile('FHIR.docx', function (err, data) {
                    if (err) throw err;

    console.log(data);
});