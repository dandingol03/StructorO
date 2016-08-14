/**
 * Created by outstudio on 16/6/8.
 */


var AppDispatcher = require('../dispatcher/AppDispatcher');
var SyncConstants = require('../constants/SyncConstants');

var SyncActions = {

    cleanAll: function () {
        AppDispatcher.dispatch({
            type: SyncConstants.CLEAN_ALL
        });
    },

    edit:function(ob,callback){
        AppDispatcher.dispatch({
            type: SyncConstants.EDIT,
            ob:ob,
            callback:callback
        });
    },

    css:function(ob){
      AppDispatcher.dispatch({
          type:SyncConstants.CSS,
          ob:ob
      });
    },

    remove:function(vector,callback){
        AppDispatcher.dispatch({
            type: SyncConstants.REMOVE,
            vector:vector,
            callback:callback
        });
    },

    sync:function(ob,callback)
    {
        AppDispatcher.dispatch({
            type: SyncConstants.SYNC,
            ob:ob,
            callback:callback
        });
    },

    drop:function(vector,ob,callback) {
        AppDispatcher.dispatch({
            type:SyncConstants.DROP,
            vector:vector,
            ob:ob,
            callback:callback
        });
    },

    folding:function()
    {
        AppDispatcher.dispatch({
           type:SyncConstants.FOLDING
        });
    },

    move:function(_x,_y)
    {
        AppDispatcher.dispatch({
            type:SyncConstants.MOVE,
            point:{x:_x,y:_y}
        });
    },

    dragEnd:function(){
        AppDispatcher.dispatch({
            type:SyncConstants.DRAG_END
        });
    }



};

module.exports = SyncActions;
