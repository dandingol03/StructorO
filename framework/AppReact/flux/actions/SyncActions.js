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

    create:function(vector,callback){
        AppDispatcher.dispatch({
            type: SyncConstants.CREATE,
            vector:vector,
            callback:callback
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

    format:function(ob)
    {
        AppDispatcher.dispatch({
            type:SyncConstants.FORMAT,
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

    paste:function(ob){
        AppDispatcher.dispatch({
            type: SyncConstants.PASTE,
            ob:ob
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
    }

};

module.exports = SyncActions;
