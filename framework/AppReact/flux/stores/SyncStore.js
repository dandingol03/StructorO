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
 *
 *                                  
 */


var AppDispatcher = require('../dispatcher/AppDispatcher');
var EventEmitter = require('events').EventEmitter;
var SyncConstants = require('../constants/SyncConstants');
var assign = require('object-assign');

var CHANGE_EVENT = 'change';
var EDIT_EVENT='edit';


var _comp = {};
var _edit={};
var _tree={};
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
            {
                _tree.count=_tree.count-1;
                parent=_tree;
            }

            vector.map(function(p,i) {
                command+='['+p+']';
                if(i==vector.length-2)
                {
                    parent = eval(command);
                    parent.count=parent.count-1;
                }
            });
            eval('delete '+command);
            //回调在被删除结点的父结点上进行响应,重新塞入数据
            if(callback!==undefined&&callback!==null&&Object.prototype.toString.call(callback)=='[object Function]')
                callback(parent);
        }catch(e)
        {
            alert("error===="+e);
        }
    }
}


/**
 *
 * @param ob
 * @param callback
 */
function edit(ob, callback) {
    _edit.ob=ob;
    _edit.callback=callback;
}


function cleanAll() {
    _comp=null;
    _tree=null;
    _edit=null;
}


var SyncStore = assign({}, EventEmitter.prototype, {

    getTree:function(){
        return _tree;
    },

    getEdit:function(){
        return _edit;
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

    emitChange  : function () {
        this.emit(CHANGE_EVENT);
    },

    emitEdit:function(){
        this.emit(EDIT_EVENT);
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
        default:
        // no op
    }
});

module.exports = SyncStore;
