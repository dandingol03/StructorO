
var ProxyQ = {
    keyInArray: function (val, key, arr) {
        var index = -1;
        arr.map(function (item, i) {
            if (item[key] == val) {
                index = i;
            }
        });
        if (index !== -1) {
            return index;
        }
        else {
            return false;
        }
    },
    es6Props: function (fields, ob) {
        var filter = new Object();
        var other = new Object();
        fields.map(function (field, i) {
            if (ob[field] !== undefined && ob[field] !== null)
                filter[field] = ob[field];
            else
                other[field] = ob[field];
        });
        return ({filter: filter, other: other});

    },
    queryHandle: function (type, url, params, dataType, callback) {
        var proxyUrl = url;
        console.log("proxyUrl===="+proxyUrl);
        $.ajax({
            type    : type !== undefined && type !== null ? type : 'POST',
            url     : proxyUrl,
            dataType: dataType !== undefined && dataType !== null ? dataType : 'json',
            data    : params,
            cache   : false,
            success : function (response) {
                if (callback !== undefined && callback !== null)
                    callback(response);
            },
            error   : function (xhr, status, err) {
                console.error("error=" + err);
            }
        });

    }


};


module.exports = ProxyQ;