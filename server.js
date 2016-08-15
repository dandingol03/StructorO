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


var middle=webpackMiddleware(compiler,
    {
        hooks:[
            function(){
                console.log('i am just a hook');}
        ]
    });


app.use(middle);
app.use(webpackHotMiddleware(compiler));


app.get('/', function (req, res) {
    res.sendfile('build/structor.html');
});

app.post('/sduyingxin/*',function(req,res) {
    console.log("proxy sduyingxin======");
    try{
        proxy.web(req, res, {target:'http://localhost:8080'});
    }
    catch(e)
    {
        res.send({re: -1, content: "tomcat has not been started"});
    }
});

app.get('/gradms/*',function(req,res) {
    console.log("proxy gradms action======");
    try{
        proxy.web(req, res, {target:'http://localhost:8090'});
    }catch(e)
    {
        res.send({re: -1, content: "tomcat has not been started"});
    }
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


app.post('/get_node.do',function(req,res) {

    var name=req.body.name;
    var path=req.body.url;
    try{
        var existed=fs.existsSync('./src/client/gen/graduate/serviceHobby/'+path+name+'.json');
        if(existed)
        {
            var content = fs.readFileSync('./src/client/gen/graduate/serviceHobby' + path + name + '.json', 'utf-8');
            if(content!==undefined&&content!==null)
                res.send({_node: content});
        }else{
            res.send({re: -1});
        }
    }catch(e)
    {
        res.send({re: -1});
    }
});

app.get('/get_gen.do',function(req,res) {
    var name='App';
    var path='/';
    try{
        res.send({path:'../../../../src/client/gen/graduate/serviceHobby'+path+name+'.jsx'});
    }catch(e)
    {
        res.send({re: -1});
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
    _tree.type='Basic';

    var framework=req.body.framework;
    var route=req.body.route;
    if(Object.prototype.toString.call(route)=='[object String]')
        route=JSON.parse(route);
    var indent='        ';
    var indent_step='   ';



    var modules={};
    try{
        if(route.url=='/')
        {
            var json = JSON.stringify(_tree);
            fs.writeFileSync('./src/client/gen/graduate/serviceHobby'+route.url+route.name+'.json',json,'utf-8');
        }

        var nesting=function(in$param,indent){
            var out$param='';
            out$param+=indent+'\<'+in$param.type+' ';
            if(modules[in$param.type]==undefined||modules[in$param.type]==null&&in$param.type!='div')
                modules[in$param.type]=true;
            if(in$param.data!==undefined&&in$param.data!==null)
            {
                for(var field in in$param.data)
                {
                    out$param+=field+'={'+JSON.stringify(in$param.data[field])+'}';
                    out$param+=' ';
                }
            }
            out$param+=' \>\n';
            var isLeaf=false;
            if(in$param.nodes!==undefined&&in$param.nodes!==null)
            {
                isLeaf=true;
                in$param.nodes.map(function (node,i) {
                    out$param+=nesting(node,indent+indent_step);
                });
            }
            if(isLeaf==false)
            {
                return out$param.substring(0,out$param.length-2)+'/\>\n';
            }else{
                if(in$param.type=='Basic')
                    out$param+=indent+'   {this.props.children}\n';
                out$param+=indent+'\</'+in$param.type+'\>\n';
                return out$param;
            }
        };
        var before_compile=new Object();
        before_compile.content='';
        before_compile.content=nesting(_tree,indent);
        var dependencies= fs.readFileSync('framework/' + framework + '/dependencies.json','utf-8');
        if(dependencies!==null&&dependencies!==undefined)
            dependencies=JSON.parse(dependencies);
        var filters=[];
        dependencies.map(function(dep,i) {
           if(modules[dep.name]==true)
               filters.push(dep);
        });
        var content=null;
        content=fs.readFileSync('./src/structor/template/main.tpl','utf-8');
        var  se = _.template(content);

        var compiled=se({'func':'function','className':route.name,'dependencies':filters,'content':'\n'+before_compile.content},{escape:['<','function']});
        var existed=fs.existsSync('./src/client/gen/graduate/serviceHobby/'+route.url+route.name+'.jsx');
        if(existed) {
            fs.unlinkSync('./src/client/gen/graduate/serviceHobby/'+route.url+route.name+'.jsx');
        }
        fs.writeFileSync('./src/client/gen/graduate/serviceHobby/'+route.url+route.name+'.jsx',compiled,'utf-8');
        res.send({re: 1, content: 'document has been generated successfully'});
    }catch(e)
    {
        console.error(e.toString());
        res.send({re: -1});
    }
});

app.post('/save_newRoute.do',function(req,res) {
    try{
        var route=req.body.route;
        if(route!==undefined&&route!==null&&Object.prototype.toString.call(route)=='[object String]')
            route=JSON.parse(route);
        var routes = fs.readFileSync('./src/client/gen/graduate/serviceHobby/routes.json', 'utf-8');
        routes=JSON.parse(routes);
        routes[route.name] = {url: route.url};
        //TOOD:change to this path
        fs.writeFileSync('./src/client/gen/graduate/serviceHobby/routes.json',JSON.stringify(routes),'utf-8');
        var olds = fs.readFileSync('./src/structor/backup.js', 'utf-8');
        fs.writeFileSync('./src/structor/index.js', olds, 'utf-8');
        middle.hook(function(){
            res.send({re: 1, content: 'configure changed successfully'});
        });

    }catch(e)
    {
        console.error(e.toString());
        res.send({re: -1});
    }
});

app.get('/get_render_page.do',function(req,res) {
    res.sendfile('build/index.html');
});

app.post('/get_render_page.do',function(req,res) {
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

app.get('/get_routes.do', function (req, res) {
    try{
        var client='graduate/serviceHobby';
        var path='./src/client/gen/'+client+'/routes.json';
        var content = fs.readFileSync(path, 'utf-8');
        if(Object.prototype.toString.call(content)!='[object Object]'||Object.prototype.toString.call(content)!='[object Array]')
            content = JSON.parse(content);
        res.send({routes: content});
    }catch(e)
    {
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


/**
 * 搜索特定路径下的路由配置文件
 */
app.get('/get/gen/graduate/serviceHobby/routes',function(req,res)
{
    try{
        var configures = fs.readFileSync('./src/client/gen/graduate/serviceHobby/routes.json', 'utf-8');
        res.send({configures:configures});
    }catch(e)
    {
        console.error(e.toString());
        res.send({re: -1});
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

app.get('/downloads/*',function(req,res) {
    var path=null;
    if(Object.prototype.toString.call(req.params)=='[object Object]')
    {
        path=req.params[0];
        path=__dirname+'/framework/AppReact/build/downloads/'+path;
        try{
            res.sendFile(path);
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