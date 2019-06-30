var request = require('request');
var unzip   = require('unzip');
var csv2    = require('csv2');
var fs = require('fs');
var sites = fs.createWriteStream('sitesCheckout.log', { flags: 'w' });

request.get('http://s3.amazonaws.com/alexa-static/top-1m.csv.zip')
    .pipe(unzip.Parse())
    .on('entry', function (entry) {

        entry.pipe(csv2()).on('data',function(data) {
		
		sites.write(data[1]+'\r\n');
	});
    })
;