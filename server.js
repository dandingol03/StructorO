/**
 * Created by dandi_000 on 2016/6/27.
 */

var express = require('express');
var app = require('express')();
var static = require("express-static");
var bodyParser=require('body-parser');
var httpProxy = require("http-proxy");
var proxy = httpProxy.createProxyServer({});


var webpack =require( 'webpack');
var webpackMiddleware = require('webpack-dev-middleware');
var webpackHotMiddleware = require('webpack-hot-middleware');
var config = require('./webpack.config');
var ulr = require('url');
var compiler = webpack(config);
var fs=require('fs');
var colors=require('colors');


app.enable('trust proxy');

/**
 * proxy part
 */


app.use(static(__dirname + '/public'));
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));
// parse application/json
app.use(bodyParser.json());

app.use(webpackMiddleware(compiler));
app.use(webpackHotMiddleware(compiler));


app.get('/', function (req, res) {
    res.sendfile('build/structor.html');
});

app.post('/sduyingxin/*',function(req,res) {
    console.log("req======");
    proxy.web(req, res, {target:'http://localhost:8080'});
});

app.post('/get_css.do',function(req,res) {
    var path=req.body.path;
    var filename=req.body.filename;
    var content=fs.readFileSync(path+'/components/'+'basic/'+filename,'utf-8');
    console.log(content.rainbow);
    //TODO:modify this file

    res.send('hey,it is ok');
});

app.get('/get_render_page.do',function(req,res) {
    res.sendfile('build/index.html');
});

app.get('/bundle.js',function(req,res) {
   res.sendfile('build/bundle.js');
});

app.post('/app/changeType',function(req,res) {
    var type=req.body.type;
    console.log("type====" + type);
    res.send("i got it");
});

app.get("/generate/apiDoc.do",function(req,res) {

});

app.listen(9010);