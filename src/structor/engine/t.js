/**
 * Created by outstudio on 16/7/4.
 */
var _=require('lodash');
var colors=require('colors');
var returnPattern=/\d/gi;
try{
    var fs=require('fs');
    //content belong to tempalte t
    //var content=fs.readFileSync('../template/Table','utf-8');
    var re=returnPattern.
    console.log(re.rainbow);
    fs.writeFileSync('../gen/gen.jsx',re,'utf8');
}catch(e)
{
    alert("errpr=====\r\n"+e);
}




//var files=fs.readdirSync('./components/basic');
//files.map(function(filename,i) {
//   console.log('filename==='+filename);
//});