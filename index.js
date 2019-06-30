/*
 ___________  _________________ _   _ _   _ _____ 
|_   _| ___ \/  ___| ___ \ ___ \ | | | \ | |  _  |
  | | | |_/ /\ `--.| |_/ / |_/ / | | |  \| | | | |
  | | |  __/  `--. \ ___ \    /| | | | . ` | | | |
 _| |_| |    /\__/ / |_/ / |\ \| |_| | |\  \ \_/ /
 \___/\_|    \____/\____/\_| \_|\___/\_| \_/\___/ 
 
 Tool: amazon-s3-scanner
 Date: 30/06/2019
 */

var fs = require('fs');
var request = require('request');

var sites = fs.readFileSync('sitesCheckout.log').toString().split('\n');
var configsInicial = fs.readFileSync('sitesInicio.log').toString().split('\n');
var configsSubdomains = fs.readFileSync('subdomais.log').toString().split('\n');
var configsFinal = fs.readFileSync('sitesFinal.log').toString().split('\n');
var proxyList = fs.readFileSync('proxyList.log').toString().split('\n');



var curTHREADS = 0
var curCHECK = -1

var maxConcurrentConnection = 5
var currentConnection = 0
var checkeds = 0

var sitesEx = []
var more = sites.length;


var totalScan = sites.length * (1);
console.log("Vamos scanear: ", totalScan, " sites");
setInterval(function() {
    while (curTHREADS < 1000) {
        if (sites.length == curCHECK + 1) {
            return true;
        }
        curCHECK++;

        check(sites[curCHECK]);
    }
}, 1000);

function check(name) {
    curTHREADS++;
    var array = fuzzer(name);
    requestArray(array, 0)
}

function requestArray(array, i) {
    if (currentConnection < maxConcurrentConnection && array.length > i) {
        checkS3(array[i])
        if (array.length > i) {
            return setTimeout(requestArray, 10, array, i + 1);
        }
    }
    if (array.length > i) {
        return setTimeout(requestArray, 10, array, i);
    }
    return curTHREADS--;
}

function checkS3(name) {
    checkeds++

    var url = 'http://' + name.trim() + '.s3.amazonaws.com'.toString()

    currentConnection++
    request({
        timeout: 5000,
        method: 'HEAD',
        proxy: 'http://' +
            proxyList[Math.floor(Math.random() * proxyList.length)].trim(),
        url: url,
        headers: {
            'User-Agent': 'Mozilla/5.0'
        }
    }, function(error, response, body) {

        if (response && response.statusCode != 503) {
            currentConnection--
            console.log("(" + checkeds + "/" + totalScan + ") Requesting " + (response ? response.statusCode : 400) + ": " + url)
            if (response.statusCode == 200) checkS3WithoutProxy(name)
        } else if ((response && response.statusCode == 429) || (response && response.statusCode == 503) || error) {
            checkS3WithoutProxy(name)
        }
    })
}


function checkS3WithoutProxy(name) {

    var url = 'http://' + name.trim() + '.s3.amazonaws.com'.toString()

    request({
        timeout: 5000,
        method: 'GET',
        url: url,
        headers: {
            'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/73.0.3683.103 Safari/537.36 OPR/60.0.3255.151'
        }
    }, function(error, response, body) {

        if (response && response.statusCode != 503) {
            currentConnection--
            console.log("(" + checkeds + "/" + totalScan + ") Requesting " + (response ? response.statusCode : 400) + ": " + url)
            if (response.statusCode == 200) sucess(name)
        } else if ((response && response.statusCode == 429) || (response && response.statusCode == 503) || error) {
            checkS3WithoutProxy(name)
        }

        double(name)
    })

}

function sucess(name) {
    fs.appendFileSync('findUris.log', name + '\r\n');
}

function double(name) {
    fs.appendFileSync('doublefindUris.log', name + '\r\n');
}


// Aqui farei fuzzer do subsolo no inicio e no fim
// mercadolivre.com.br
// mercadolivre
// mercadolivre-app
// app.mercadolivre
// etc

function fuzzer(uri) {
    var blocks = []

    blocks.push(uri.trim())
    blocks.push(uri.trim().split('.')[0])
    for (var j in configsFinal) {
        blocks.push(uri.trim().split('.')[0].trim() + configsFinal[j].trim())
    }

    for (var j in configsSubdomains) {
        blocks.push(configsSubdomains[j].trim() + uri.trim())
    }
    for (var j in configsInicial) {
        blocks.push(configsInicial[j].trim() + uri.trim())
        blocks.push(configsInicial[j].trim() + uri.trim().split('.')[0].trim())
    }
    return blocks
}
