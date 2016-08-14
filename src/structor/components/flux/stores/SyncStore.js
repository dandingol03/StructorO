/**
 * Created by outstudio on 16/6/8.
 * @param vector,代表自身在生成树的路径 [1,2,3]
 *                                  1
 *                                |   |
 *                                1   2
 *                                  | | |
 *                                  1 2 3(node)
 * @description: 单个结点所包含的数据
 *        1.data,本组件中包含的控件
 *        2.type,本组件对应的类名
 *        2.count:该结点对应的子结点
 *        3.vector:根结点为[],子结点为[1,2]
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
var MOVE_EVENT='move';
var DRAG_END_EVENT = 'drag_end';
var SYNC_EVENT='sync';


/**
 *  1._comp,预览后的组件数据
 *  2._edit,等
 */
var _comp = {};
var _edit={};
var _tree={};
var _format = {};
var _css={};
var dragged=
{
    point: {x:0, y:0},
    offset:{x:0,y:0},
    velocity:{x:0,y:0},
    width:0,
    height:0
};





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
            if(pos==parent.nodes.length-1)
            {}
            else
            {
                //删除的如果不是末尾结点,要重新调整结点下标
                parent.nodes[pos]={};
                for(let i=parseInt(pos);i<parent.nodes.length-1;i++)
                {
                    $.extend(true,parent.nodes[pos],parent.nodes[i+1]);
                    parent.nodes[pos].vector=parent.nodes[pos].vector.splice(parent.nodes[pos].vector.length-1,1,i);
                    pos++;
                }
            }
            if(parent.nodes.length>0)
                parent.nodes.splice(parent.nodes.length - 1, 1);
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




function drop(vector,ob,callback) {
    var parent=null;
    //对应第一层组件
    if(vector==null||vector==undefined)
    {
        parent=_tree;
        //ob.index表明同等容器内的组件平行拖拽行为
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
            //一层结点的添加行为
            if(parent.nodes==undefined||parent.nodes==null)
                parent.nodes=[];
            let index=parent.nodes.length;
            parent.nodes[index]={};
            parent.nodes[index].type=ob.type;
            parent.nodes[index].data=ob.data;
            var arr=new Array();
            arr.push(index);
            parent.nodes[index].vector=arr;
        }
        callback(parent);
    }else{//对应二层及子层
        var command="_tree";
        vector.map(function(p,i) {
            command+="["+p+"]";
        });
        try{
            var parent=eval(command);
            //初始化当前结点
            let index=null;
            if(parent.nodes!==undefined&&parent.nodes!==null)
                index=parent.nodes.length;
            else
            {
                index=0;
                parent.nodes=[];
            }
            parent.nodes[index]=new Object();
            parent.nodes[index].type=ob.type;
            parent.nodes[index].data=ob.data;
            parent.nodes[index].vector=parent.vector.concat(index);
            callback(parent);
        }catch(e)
        {
            alert("node create encount error=========\r\n"+e);
        }

    }
}


function setPoint(point){
    dragged.velocity.x=point.x-dragged.point.x;
    dragged.velocity.y=point.y-dragged.point.y;
    dragged.point.x=point.x;
    dragged.point.y=point.y;
}

function sync(ob,callback){
    _tree=ob;
    if(Object.prototype.toString.call(callback)=='[object Function]')
    {
        callback();
    }
}

function cleanAll() {
    _tree=null;
    _edit=null;
    _css=null;
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

    setDragged:function(ob){
        dragged.width=ob.width;
        dragged.height=ob.height;
        dragged.offset=ob.offset;
    },

    getDragged:function(){
      return dragged;
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

    emitFolding:function(){
        this.emit(FOLDING_EVENT);
    },

    emitMovement:function(){
        this.emit(MOVE_EVENT);
    },

    emitDragEnd:function(){
        this.emit(DRAG_END_EVENT);
    },

    emitSync:function()
    {
        this.emit(SYNC_EVENT);
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

    addFoldingListener:function(callback) {
        this.on(FOLDING_EVENT, callback);
    },

    removeFoldingListener:function(callback) {
        this.removeListener(FOLDING_EVENT, callback);
    },

    addMoveListener:function(callback) {
        this.on(MOVE_EVENT, callback);
    },

    removeMoveListener:function(callback) {
        this.removeListener(MOVE_EVENT, callback);
    },

    addDragEndListener:function(callback) {
        this.on(DRAG_END_EVENT, callback);
    },

    removeDragEndListener:function(callback) {
        this.removeListener(DRAG_END_EVENT, callback);
    },

    addSyncListener:function(callback) {
        this.on(SYNC_EVENT, callback);
    },

    removeSyncListener:function(callback) {
        this.removeListener(SYNC_EVENT, callback);
    }
});

// Register callback to handle all updates
AppDispatcher.register(function (action) {

    switch (action.type) {

        case SyncConstants.EDIT:
                edit(action.ob,action.callback);
                SyncStore.emitEdit();
            break;

        case SyncConstants.CSS:
            css(action.ob);
            SyncStore.emitCss();
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
        case SyncConstants.MOVE:
            setPoint(action.point);
            SyncStore.emitMovement();
            break;
        case SyncConstants.DRAG_END:
            SyncStore.emitDragEnd();
            break;
        case SyncConstants.SYNC:
            sync(action.ob,action.callback);
            SyncStore.emitSync();
            break;
        default:
        // no op
    }
});

module.exports = SyncStore;
