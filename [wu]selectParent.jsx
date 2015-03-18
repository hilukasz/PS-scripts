// written by Lukasz Wieczorek at http://lukasz.io
// Please do not remove this and give credit if you repost. Thanks!

try{
    var activeLayerParent = app.activeDocument.activeLayer.parent;
    app.activeDocument.activeLayer = activeLayerParent;
 } catch(e){ alert("No parents foo, why you so cray")}