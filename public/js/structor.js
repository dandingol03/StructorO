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
    let route={};
    let $ul=$("ul[class='dropdown-menu routes']");
    route.name=$("button[title='View page info']").children('span').text().trim();
    route.url=$ul.find('li a[data-name="'+route.name+'"]').attr('data-url');
    var iframe=$("#desktop-page").children("iframe")[0];
    var document=iframe.contentDocument;
    var obj=document.getElementById("export");
    //fit to advance web-browser such as firefox,chrome
    var event=document.createEvent('CustomEvent');
    event.initCustomEvent('export',false,true,{export:true,route:route});
    obj.dispatchEvent(event);
}

window.Structor.dispatchUrlChangedEvent=function(url){
    let route={};
    let $ul=$("ul[class='dropdown-menu routes']");
    route.name=$("button[title='View page info']").children('span').text().trim();
    route.url=url;
    var iframe=$("#desktop-page").children("iframe")[0];
    var document=iframe.contentDocument;
    var obj=document.getElementById("_url_change");
    //fit to advance web-browser such as firefox,chrome
    var event=document.createEvent('CustomEvent');
    event.initCustomEvent('__url__change',false,true,{route:route});
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
            if(field=="data-row")
            {
                remodal.attr("data-row",ob[field]);
                continue;
            }
            if(field=="data-column")
            {
                remodal.attr("data-column",ob[field]);
                continue;
            }
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

window.Structor.Route={};
window.Structor.Route.remodal={};
window.Structor.Route.remodal.inst=null;
window.Structor.Route.remodal.callback_queue=[];
window.Structor.Route.remodal.show=function() {
    window.Structor.Route.remodal.inst.open();
};
window.Structor.Route.remodal.confirm=function(target){
    let con = $(target).parent('div').find('.modal-content');
    let route={};
    route.name=con.find('input[name="route_name"]').val();
    route.url=con.find('input[name="route_url"]').val();
    //TODO:invoke new route to local server
    window.Structor.queryHandle('POST','/save_newRoute.do',{route:JSON.stringify(route)},null,function(response) {
        console.log(response.content);
    });
    con.find('input[name="route_name"]').val('');
    con.find('input[name="route_url"]').val('')
    window.Structor.Route.remodal.inst.close();
}

window.Structor.dispatchConfigInPanelEvent=function(target){
    var iframe=$("#desktop-page").children("iframe")[0];
    var document=iframe.contentDocument;
    var obj=document.getElementById("_config");
    //fit to advance web-browser such as firefox,chrome
    var event=document.createEvent('CustomEvent');
    let re_modal=$(target).parent('div');
    let con=$(target).parent('div').children('.modal-content');
    let ob={};
    let ctrls=con.find('input[name!=""]');
    ctrls.map(function(i,ctrl) {
        let value='';
       if($(ctrl).val()=='')
       {
           if($(ctrl).attr('placeholder')!==undefined&&$(ctrl).attr('placeholder')!==null)
               value = $(ctrl).attr('placeholder');
       }
       else{
           value=$(ctrl).val();
       }
        ob[$(ctrl).attr('name')]=value;
    });
    if(re_modal.attr("data-row")!==undefined&&re_modal.attr("data-row")!==null)
    {
        ob["data-row"] = re_modal.attr("data-row");
        re_modal.removeAttr("data-row");
    }
    if(re_modal.attr("data-column")!==undefined&&re_modal.attr("data-column")!==null)
    {
        ob["data-column"] = re_modal.attr("data-column");
        re_modal.removeAttr("data-column");
    }

    window.Structor.remodal.clear(con);
    event.initCustomEvent('config',false,true,ob);
    obj.dispatchEvent(event);
}

window.Structor.createNewComponentEvent=function(target){
    let con=$(target).parent('div').parent('.modal-content').children('.modal-body');
    let name=con.find('input[name="name"]').val();
    let url=con.find('input[name="url"]').val();
    var iframe=$("#desktop-page").children("iframe")[0];
    var document=iframe.contentDocument;
    var obj=document.getElementById("_url_change");
    var event=document.createEvent('CustomEvent');
    if(url==''||url=='/')
        url = 'blank';
    let route={name:name,url:url,navigator:'/get_render_page.do/edit_component/'+name+'/'+url};
    event.initCustomEvent('__url__change',false,true,{route:route});
    obj.dispatchEvent(event);

    $('#component-modal').modal('hide');
    $('.component-selected').text(name);
}
