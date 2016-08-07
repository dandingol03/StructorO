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

/**
 * @description,this action notify the Dragged.jsx to render the dragged component
 */
window.Structor.dispatchRenderDraggedEvent=function(ob) {
    var iframe=$("#desktop-page").children("iframe")[0];
    var document=iframe.contentDocument;
    var obj=document.getElementById("drag");
    //fit to advance web-browser such as firefox,chrome
    var event=document.createEvent('CustomEvent');
    event.initCustomEvent('draggedRender',false,true,ob);
    obj.dispatchEvent(event);
};

/**
 * @description,this event bind to the export action in iframe
 *
 */
window.Structor.dispatchExportEvent=function(){
    var iframe=$("#desktop-page").children("iframe")[0];
    var document=iframe.contentDocument;
    var obj=document.getElementById("export");
    //fit to advance web-browser such as firefox,chrome
    var event=document.createEvent('CustomEvent');
    event.initCustomEvent('export',false,true,{export:true});
    obj.dispatchEvent(event);
}


window.Structor.remodal=new Object();
window.Structor.remodal.inst=null;
window.Structor.remodal.content=function(content){
    if(content==undefined||content==null)//fetch
    {

    }else//set
    {

    }
}
window.Structor.remodal.clear=function(con){
    con.find("input[name='url']").val('');
    con.find("input[name='reactPage']").val('');
    con.find("input[name='reactAction']").val('');
}
window.Structor.remodal.show=function(ob){
    if(ob==null||ob==undefined)
    {}
    else{
        let remodal=$("div[data-remodal-id='re-modal']");
        let con=remodal.find(".modal-content");
        con.empty();
        for(var field in ob)
        {
            let div=document.createElement('div');
            div.setAttribute('style','margin-bottom: 5px');
            div.innerHTML=' <span style="width:100px;display: inline-block;">'+field+':</span>\n'+
                '<input type="text" placeholder="'+ob[field]+'" name="'+field+'" style="width: 200px"/>';
            con.append(div);
        }
    }
    window.Structor.remodal.inst.open();
}
window.Structor.remodal.hide=function(){
    window.Structor.remodal.inst.close();
}

window.Structor.dispatchConfigInPanelEvent=function(target){
    var iframe=$("#desktop-page").children("iframe")[0];
    var document=iframe.contentDocument;
    var obj=document.getElementById("_config");
    //fit to advance web-browser such as firefox,chrome
    var event=document.createEvent('CustomEvent');
    let con=$(target).parent('div').children('.modal-content');
    let ob={};
    let ctrls=con.find('input[name!=""]');
    ctrls.map(function(i,ctrl) {
        let value='';
       if($(ctrl).val()=='')
       {
           if($(ctrl).attr('plcaeholder')!==undefined&&$(ctrl).attr('placeholder')!==null)
               value = $(ctrl).attr('placeholder');
       }
       else{
           value=$(ctrl).val();
       }
        ob[$(ctrl).attr('name')]=value;
    });
    window.Structor.remodal.clear(con);
    event.initCustomEvent('config',false,true,ob);
    obj.dispatchEvent(event);
}
