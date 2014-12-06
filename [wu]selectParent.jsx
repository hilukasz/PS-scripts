try{
    var activeLayerParent = app.activeDocument.activeLayer.parent;
    app.activeDocument.activeLayer = activeLayerParent;
 } catch(e){ alert("No parents foo, why you so cray")}