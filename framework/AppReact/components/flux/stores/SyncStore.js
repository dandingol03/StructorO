/**
 * Created by outstudio on 16/6/8.
 */


var AppDispatcher = require('../dispatcher/AppDispatcher');
var EventEmitter = require('events').EventEmitter;
var SyncConstants = require('../constants/SyncConstants');
var assign = require('object-assign');

var CHANGE_EVENT = 'change';

var _todos = {};

function create(ob) {
    if (ob.route !== undefined && ob.route !== null && ob.data !== undefined && ob.data !== null) {
        var id = (+new Date() + Math.floor(Math.random() * 999999)).toString(36);
        _todos[id] = {
            id   : id,
            route: ob.route,
            data : ob.data,
            label: ob.label
        };
    }

}

function update(route, updates, label) {
    var catched = false;
    for (var id in _todos) {
        var todo = _todos[id];
        if (todo.route == route) {
            todo.data = updates;
            todo.label = label;
            catched = true;
            break;
        }
    }
    if (!catched) {
        create({route: route, data: updates, label: label});
    }
}

function getAll() {
    return _todos;
}


function destroy(id) {
    delete _todos[id];
}


function cleanRouteData(route) {
    for (var id in _todos) {
        var todo = _todos[id];
        if (todo.route == route)
            destroy(id);
    }
}

function cleanAll() {
    for (var id in _todos) {
        destroy(id);
    }
}


var SyncStore = assign({}, EventEmitter.prototype, {

    getAll: function () {
        return _todos;
    },

    getInContext: function (route) {
        if (route !== undefined && route !== null) {
            for (var id in _todos) {
                var todo = _todos[id];
                if (todo.route == route)
                    return todo.data;
            }
        }
        return null;
    },
    emitChange  : function () {
        this.emit(CHANGE_EVENT);
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
    }
});

// Register callback to handle all updates
AppDispatcher.register(function (action) {
    var sync;

    switch (action.type) {
        case SyncConstants.TODO_CREATE:
            sync = action.sync;
            if (sync !== '') {
                create(sync);
                SyncStore.emitChange();
            }
            break;

        case SyncConstants.TODO_UPDATE_DATA:
            sync = action.sync;
            if (sync !== '') {
                update(action.route, sync, action.label);
                SyncStore.emitChange();
            }
            break;

        case SyncConstants.CLEAN_ROUTE:
            cleanRouteData(action.route);
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
