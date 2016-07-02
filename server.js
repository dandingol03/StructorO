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

app.enable('trust proxy');

/**
 * proxy part
 */


app.use(static(__dirname + '/public'));
app.use(webpackMiddleware(compiler));
app.use(webpackHotMiddleware(compiler));


app.get('/', function (req, res) {
    res.sendfile('build/structor.html');
});

app.post('/serviceHall/*',function(req,res) {
    console.log("req======");
    var str="";
    for(var field in req)
    {
        str+=field+":"+req[field];
    }
    console.log(str);
    proxy.web(req, res, {target:'http://localhost:8090'});
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