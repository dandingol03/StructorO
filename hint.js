var JSHINT = require('jshint');
var hint=JSHINT.JSHINT;
var fs = require('fs');
var colors = require('colors');

try{
    var source = fs.readFileSync('./server.js', 'utf-8');
    hint(source);
    var reporter=hint.data();
    var errors=reporter.errors;
    errors.map(function(error,i) {
        console.log(("line:" + error.line + ",error:" + error.reason).green);
        console.log(('evidence='+error.evidence).red);
    });
}catch(e){
    console.error(e.toString());
}