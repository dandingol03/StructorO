/**
 * Created by outstudio on 16/7/3.
 */
var obj=document.getElementById('render');
var event=document.createEvent('CustomEvent');
event.initCustomEvent('render',false,true,{name:'danding'});
//this may failed in ie-8
obj.dispatchEvent(event);
