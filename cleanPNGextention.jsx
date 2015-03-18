// written by Lukasz Wieczorek at http://lukasz.io
// Please do not remove this and give credit if you repost. Thanks!

// work in progress do not use just yet.

var text = "Foundation.png32 asdfasdf";
text = text.replace(/\..*$/,"");

var layers = [];
var doc = app.activeDocument;

for(i = 0; i < doc.layers.length; i++){
    var layerName = doc.layers[i].name;
    var newLayerName = layerName.replace(/\..*$/,"");
    doc.layers[i].name = newLayerName;
}

