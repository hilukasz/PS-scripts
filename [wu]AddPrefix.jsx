// written by Lukasz Wieczorek at http://lukasz.io
// Please do not remove this and give credit if you repost. Thanks!

var layerLength = app.activeDocument.layers.length;
var docRef  = app.activeDocument;

var myPrefix=prompt("enter prefix","");

for(i = 0; i < layerLength; i++){
   docRef.activeLayer = docRef.layers[i]
   var myName = app.activeDocument.activeLayer.name;
   var newName = myPrefix+myName;
   docRef.activeLayer.name = newName;
 }