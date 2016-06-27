/**
 * Created by dandi_000 on 2016/6/27.
 */
var express = require('express')
var app = require('express')();
var static = require("express-static");


app.use(static(__dirname + '/public'));

app.get('/', function (req, res) {
    res.sendfile('build/index.html');
})

app.listen(9000);