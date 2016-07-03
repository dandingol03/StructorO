/**
 * Created by outstudio on 16/7/3.
 */
window.Structor=new Object();
window.Structor.queryHandle=function (type, url, params, dataType, callback) {

    $.ajax({
        type    : type !== undefined && type !== null ? type : 'POST',
        url     : url,
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


/**
 * @description,this event bind to the element[id='clipboard'] in iframe
 * @param component
 */
window.Structor.dispatchClipboardRenderEvent=function(component)
{
    var iframe=$("#desktop-page").children("iframe")[0];
    var document=iframe.contentDocument;
    var obj=document.getElementById("clipboard");
    //fit to advance web-browser such as firefox,chrome
    var event=document.createEvent('CustomEvent');
    event.initCustomEvent('clipboardRender',false,true,{component:component});
    obj.dispatchEvent(event);

}