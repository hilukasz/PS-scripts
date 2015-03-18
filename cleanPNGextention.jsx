var text = "Foundation.png32 asdfasdf";
text = text.replace(/\..*$/,"");

var layers = [];
var doc = app.activeDocument;

for(i = 0; i < doc.layers.length; i++){
    var layerName = doc.layers[i].name;
    var newLayerName = layerName.replace(/\..*$/,"");
    doc.layers[i].name = newLayerName;
}

