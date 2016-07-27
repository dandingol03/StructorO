/**
 * Created by outstudio on 16/6/8.
 * @param vector,代表自身在生成树的路径 [1,2,3]
 *                                  1
 *                                |   |
 *                                1   2
 *                                  | | |
 *                                  1 2 3(node)
 * @description: 单个结点所包含的数据
 *        1.ob:{组件名称,组件数据}
 *        2.count:该结点对应的子结点
 *        3.vector
 *        4.本库依赖jquery
 *
 *
 *                                  
 */


var AppDispatcher = require('../dispatcher/AppDispatcher');
var EventEmitter = require('events').EventEmitter;
var SyncConstants = require('../constants/SyncConstants');
var assign = require('object-assign');

var CHANGE_EVENT = 'change';
var EDIT_EVENT='edit';
var CSS_EVENT='css';
var FORMAT_EVENT = 'format';
var FOLDING_EVENT = 'folding';

/**
 *  1._comp,预览后的组件数据
 *  2._edit,等
 */
var _comp = {};
var _edit={};
var _tree={};
var _format = {};
var _css={};
_tree.count=0;


function create(vector,callback) {
    var parent=null;
    //对应第一层组件
   if(vector==null||vector==undefined)
   {
       parent=_tree;
       //初始化本结点数据
       parent[parent.count]=new Object();
       parent[parent.count].ob=_comp;
       parent[parent.count].count=0;
       var arr=new Array();
       arr.push(parent.count);
       parent[parent.count].vector=arr;

       callback(parent);
       parent.count++;
   }else{//对应子层组件
       var command="_tree";
       vector.map(function(p,i) {
          command+="["+p+"]";
       });
       try{
           var parent=eval(command);
           //初始化当前结点
           parent[parent.count]=new Object();
           parent[parent.count].ob=_comp;
           parent[parent.count].count=0;
           parent[parent.count].vector=parent.vector.concat(parent.count);
           callback(parent);
           parent.count++;
       }catch(e)
       {
            alert("node create encount error=========\r\n"+e);
       }

   }
}


function paste(ob)
{
    if(ob!==undefined&&ob!==null)
        _comp=ob;
}

function remove(vector,callback)
{
    if(Object.prototype.toString.call(vector)!='[object Array]')
    {
        throw "use invalid parameter to invoke \"remove()\"";
    }else{
        try{
            var command='_tree';
            if(vector.length==1) //比如删除container->panel，vector=1
                parent=_tree;

            vector.map(function(p,i) {
                command+='['+p+']';
                if(i==vector.length-2)
                {
                    parent = eval(command);
                }
            });
            //eval('delete '+command);
            //重新调整同步数据
            let pos=vector[vector.length-1];
            if(pos==parent.length-1)
            {}
            else{
                parent[pos]={};
                for(let i=parseInt(pos);i<parent.count-1;i++)
                {
                    $.extend(true,parent[pos],parent[i+1]);
                    parent[pos].vector=parent[pos].vector.splice(parent[pos].vector.length-1,1,i);
                    pos++;
                }
            }
            if(parent.count>0)
                delete parent[parent.count-1];
            parent.count=parent.count-1;
            if(callback!==undefined&&callback!==null&&Object.prototype.toString.call(callback)=='[object Function]')
                callback(parent);
        }catch(e)
        {
            alert("error===="+e);
        }
    }
}

function css(ob) {
    _css=ob;
}

function edit(ob, callback) {
    _edit.ob=ob;
    _edit.callback=callback;
}

function format(ob)
{
    _format=ob;
}


function drop(vector,ob,callback) {
    var parent=null;
    //对应第一层组件
    if(vector==null||vector==undefined)
    {
        parent=_tree;
        if(ob.index!==undefined&&ob.index!==null&&!isNaN(parseInt(ob.index))&&Object.prototype.toString.call(parent[ob.index])=='[object Object]')
        {
            parent.count++;
            parent[parent.count-1]={};
            for(let i=parent.count-1;i>ob.index;i--) {
                $.extend(true,parent[i],parent[i-1]);
                parent[i].vector.splice(parent[i].vector.length-1,1,i);
            }
            let pos=ob.index;
            parent[pos].data=ob.data;
            parent[pos].type=ob.type;
        }else{
            parent[parent.count]=new Object();
            parent[parent.count].type=ob.type;
            parent[parent.count].data=ob.data;
            parent[parent.count].count=0;
            var arr=new Array();
            arr.push(parent.count);
            parent[parent.count].vector=arr;
            parent.count++;
        }
        callback(parent);
    }else{//对应子层组件
        var command="_tree";
        vector.map(function(p,i) {
            command+="["+p+"]";
        });
        try{
            var parent=eval(command);
            //初始化当前结点
            parent[parent.count]=new Object();
            parent[parent.count].type=ob.type;
            parent[parent.count].data=ob.data;
            parent[parent.count].count=0;
            parent[parent.count].vector=parent.vector.concat(parent.count);
            callback(parent);
            parent.count++;
        }catch(e)
        {
            alert("node create encount error=========\r\n"+e);
        }

    }
}




function cleanAll() {
    _comp=null;
    _tree=null;
    _edit=null;
    _css=null;
    _format=null;
}


var SyncStore = assign({}, EventEmitter.prototype, {

    getTree:function(){
        return _tree;
    },

    getEdit:function(){
        return _edit;
    },

    getCss:function(){
        return _css;
    },

    getNode:function(vector){
        if(Object.prototype.toString.call(vector)!='[object Array]')
        {
            throw "use invalid parameter to invoke \"remove()\"";
        }else{
            try{
                var command='_tree';
                vector.map(function(p,i) {
                    command+='['+p+']';
                });
                var node=eval(command);
                return node.ob;
            }catch(e)
            {
                alert("error===="+e);
            }
        }

    },

    getFormat:function(){
      return _format;
    },

    emitChange  : function () {
        this.emit(CHANGE_EVENT);
    },

    emitEdit:function(){
        this.emit(EDIT_EVENT);
    },

    emitCss:function() {
        this.emit(CSS_EVENT);
    },

    emitFormat:function(){
        this.emit(FORMAT_EVENT);
    },

    emitFolding:function(){
        this.emit(FOLDING_EVENT);
    },

    /**
     * @param {function} callback
     */
    addChangeListener: function (callback) {
        this.on(CHANGE_EVENT, callback);
    },

    /**
     * @param {function} callback
     */
    removeChangeListener: function (callback) {
        this.removeListener(CHANGE_EVENT, callback);
    },

    addEditListener:function(callback)
    {
        this.on(EDIT_EVENT,callback);
    },

    removeEditListener:function(callback) {
        this.removeListener(EDIT_EVENT,callback);
    },

    addCssListener:function(callback) {
        this.on(CSS_EVENT,callback);
    },

    removeCssListener:function(callback)
    {
        this.removeListener(CSS_EVENT,callback);
    },

    addFormatListener:function(callback) {
        this.on(FORMAT_EVENT,callback);
    },

    removeFormatListener:function(callback) {
        this.removeListener(FORMAT_EVENT, callback);
    },

    addFoldingListener:function(callback) {
        this.on(FOLDING_EVENT, callback);
    },

    removeFoldingListener:function(callback) {
        this.removeListener(FOLDING_EVENT, callback);
    }
});

// Register callback to handle all updates
AppDispatcher.register(function (action) {

    switch (action.type) {
        case SyncConstants.CREATE:
                create(action.vector,action.callback);
                SyncStore.emitChange();
            break;

        case SyncConstants.EDIT:
                edit(action.ob,action.callback);
                SyncStore.emitEdit();
            break;

        case SyncConstants.CSS:
            css(action.ob);
            SyncStore.emitCss();
            break;

        case SyncConstants.FORMAT:
            format(action.ob);
            SyncStore.emitFormat();
            break;

        case SyncConstants.PASTE:
            paste(action.ob);
            SyncStore.emitChange();
            break;

        case SyncConstants.REMOVE:
            remove(action.vector,action.callback);
            SyncStore.emitChange();
            break;
        case SyncConstants.CLEAN_ALL:
            cleanAll();
            SyncStore.emitChange();
            break;
        case SyncConstants.DROP:
            drop(action.vector, action.ob, action.callback);
            break;
        case SyncConstants.FOLDING:
            SyncStore.emitFolding();
            break;
        default:
        // no op
    }
});

module.exports = SyncStore;
