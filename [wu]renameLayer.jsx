// written by Lukasz Wieczorek at http://lukasz.io
// Please do not remove this and give credit if you repost. Thanks!
var docRef  = app.activeDocument;

var currentName = docRef.activeLayer.name;
var myName=prompt("new name of layer",currentName);
var layerLength = app.activeDocument.layers.length;

docRef.activeLayer.name = myName;