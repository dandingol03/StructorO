/**
 * Created by outstudio on 16/7/6.
 */
var JavaScriptObfuscator = require('javascript-obfuscator');
var colors=require('colors');
var obfuscatedCode = JavaScriptObfuscator.obfuscate(
    `
    (function(){
        var variable = 'abc';
        console.log(variable);
    })();
    `,
    {
        rotateUnicodeArray: false
    }
);

console.log(obfuscatedCode.rainbow);