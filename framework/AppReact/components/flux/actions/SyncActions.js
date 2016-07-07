/**
 * Created by outstudio on 16/6/8.
 */


var AppDispatcher = require('../dispatcher/AppDispatcher');
var SyncConstants = require('../constants/SyncConstants');

var SyncActions = {


    create: function (ob) {
        AppDispatcher.dispatch({
            type: SyncConstants.TODO_CREATE,
            sync: ob
        });
    },

    updateData: function (route, ob, label) {
        AppDispatcher.dispatch({
            type : SyncConstants.TODO_UPDATE_DATA,
            route: route,
            sync : ob,
            label: label
        });
    },


    cleanRoute: function (route) {
        AppDispatcher.dispatch({
            type : SyncConstants.CLEAN_ROUTE,
            route: route
        });
    },


    cleanAll: function () {
        AppDispatcher.dispatch({
            type: SyncConstants.CLEAN_ALL
        });
    }

};

module.exports = SyncActions;
