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
var _ = require('lodash');

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

app.get('/gradms/*',function(req,res) {
    console.log("proxy gradms action======");
    proxy.web(req, res, {target:'http://localhost:8090'});
});


app.post('/get_css.do',function(req,res) {
    var path=req.body.path;
    var component=req.body.component;
    try{
        var exist=fs.existsSync(path+'/css/'+'basic/'+component+'.css');
        if(exist)
        {
            var content=fs.readFileSync(path+'/css/'+'basic/'+component+'.css','utf-8');
            res.send({re: 1, data: content});
        }
        else
            res.send({re: -1,content:"file doesn't exists"});
    }catch(e)
    {
        console.error("error====\r\n"+e);
        res.send({re: -1, content: "encounter error"});
    }

});

app.post('/save_css.do',function(req,res) {
    var path=req.body.path;
    var component=req.body.component;
    var data=req.body.data;
    try{
        var exist=fs.existsSync(path+'/css/'+'basic/'+component+'.css');
        if(exist)
        {
            fs.writeFileSync(path+'/css/'+'basic/'+component+'.css',data,'utf-8');
            res.send({re: 1});
        }
        else
            res.send({re: -1,content:"file doesn't exists"});
    }catch(e)
    {
        console.error("error====\r\n"+e);
        res.send({re: -1, content: "encounter error"});
    }
});

app.post('/do_export.do',function(req,res) {
    var _tree=null;
    if(req.body._tree!==undefined&&req.body._tree!==null)
    {
        if(Object.prototype.toString.call(req.body._tree)=='[object String]')
            _tree = JSON.parse(req.body._tree);
        else
            _tree=req.body._tree;
    }
    _tree.ob=new Object();
    _tree.ob.type='div';
    var framework=req.body.framework;
    try{
        var indent='        ';
        var nesting=function(in$param){
            var out$param='';
            out$param+=indent+'\<'+in$param.ob.type+' ';
            if(in$param.ob.data!==undefined&&in$param.ob.data!==null)
            {
                for(var field in in$param.ob.data)
                {
                    out$param+=field+'={'+JSON.stringify(in$param.ob.data[field])+'}';
                    out$param+=' ';
                }
            }
            out$param+=' \>\n';
            var isLeaf=false;
            for(var index in in$param)
            {
                if(isNaN(parseInt(index)))
                    continue;
                isLeaf=true;
                out$param+=nesting(in$param[index],out$param);
            }
            if(isLeaf==false)
            {
                return out$param.substring(0,out$param.length-2)+'/\>\n';
            }else{
                out$param+=indent+'\</'+in$param.ob.type+'\>\n';
                return out$param;
            }
        };
        var before_compile=new Object();
        before_compile.content='';
        before_compile.content=nesting(_tree);
        var dependencies= fs.readFileSync('framework/' + framework + '/dependencies.json','utf-8');
        if(dependencies!==null&&dependencies!==undefined)
            dependencies=JSON.parse(dependencies);
        var  content=fs.readFileSync('./src/structor/template/main.tpl','utf-8');
        var  se = _.template(content);
        var compiled=se({'dependencies':dependencies,'content':'\n'+before_compile.content},{escape:'<'});
        fs.writeFileSync('./src/client/gen/index.js',compiled,'utf-8');
        res.send({re: 1, content: 'document has been generated successfully'});
    }catch(e)
    {
        console.error(e.toString());
        res.send({re: -1});
    }
});

app.get('/get_render_page.do',function(req,res) {
    res.sendfile('build/index.html');
});

app.post('/get_metadata.do',function(req,res) {
    try{
        var frameworks = fs.readdirSync('./framework');

        frameworks.map(function(framework,i) {
            var path='';
            path+='./framework'+'/'+framework;
            var exist = fs.existsSync(path + '/' + 'metadata');
            if(exist) {
                exist = fs.existsSync(path + '/' + 'metadata' + '/' + 'components.json');
                if(exist) {
                    var content = fs.readFileSync(path + '/' + 'metadata' + '/' + 'components.json', 'utf-8');
                    if(Object.prototype.toString.call(content)=='[object String]')
                        content = eval('(' + content + ')');
                    res.send({data: content});
                }
            }
        });
    }catch(e)
    {
        console.error(e.toString());
        res.send({re: -1});
    }
});

app.get('/bundle.js',function(req,res) {
   res.sendfile('build/bundle.js');
});

app.get('/get/AppReact/*',function(req,res) {
    var path=null;
    if(Object.prototype.toString.call(req.params)=='[object Object]')
    {
        path=req.params[0];
        console.log('path==' + path);
        path='./framework/AppReact/'+path;
        try{
            var content=fs.readFileSync(path,'utf-8');
            res.send(content);
        }catch(e)
        {
            console.error('error=' + e.toString());
        }
    }
});

app.get('/images/*',function(req,res) {
    var path=null;
    if(Object.prototype.toString.call(req.params)=='[object Object]')
    {
        path=req.params[0];
        path='./framework/AppReact/build/images/'+path;
        try{
            var content=fs.readFileSync(path,'binary');
            res.writeHead(200, {"Content-Type": "image/png"});
            res.write(content, "binary");
            res.end();
        }catch(e)
        {
            console.error('error=' + e.toString());
        }
    }
});

app.post('/app/changeType',function(req,res) {
    var type=req.body.type;
    console.log("type====" + type);
    res.send("i got it");
});

app.get("/generate/apiDoc.do",function(req,res) {

});

app.listen(9010);