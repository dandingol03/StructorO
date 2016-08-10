/**
 * Created by outstudio on 16/4/22.
 */

window.App = new Object();

window.Deploy = new Object();

window.App._instances = new Object();

window.App.getModel = function () {
    return "debug";
}
window.App.getLoadModel = function () {
    return "true";
}
window.App.load = function () {
    $("#loading").fakeLoader({prolong: true});
}
window.App.unload = function () {
    $("#loading").fadeOut();
}

window.Deploy.getResourceDeployPrefix = function () {
    return "";
}

window.App.getResourceDeployPrefix = function () {
    return "";
}
window.App.getAppRoute = function () {
    return "";
}
window.App.swing = function (ob) {
    var $ob;
    if (Object.prototype.toString.call(ob) == '[object String]')
        $ob = $(ob);
    $ob.addClass('animated swing');
    $ob.on('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend',
        function () {
            $ob.removeClass('animated swing');
            App._instances[$ob.selector] = setTimeout("App.swing('" + ob + "')", 1000);
        });
}
window.App.unSwing = function (ob) {
    var $ob;
    if (Object.prototype.toString.call(ob) == '[object String]')
        $ob = $(ob);
    if ($ob !== undefined && $ob !== null) {
        if (App._instances[ob] !== undefined && App._instances[ob] !== null) {
            clearTimeout(App._instances[ob]);
            delete App._instances[ob];
        }
    }

}


window.App.remodal=new Object();

window.App.remodal.show=function(ob){
    window.parent.Structor.remodal.show(ob);
}
window.App.remodal.hide=function(){
    window.parent.Structor.remodal.hide();
}

