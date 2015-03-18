// written by Lukasz Wieczorek at http://lukasz.io
// Please do not remove this and give credit if you repost. Thanks!

var parentName =  app.activeDocument.activeLayer.parent.name;
var parent =  app.activeDocument.activeLayer.parent;
var numParents = getNumberOfParents();

for(i = 0; i < numParents; i++){
    if(parentName.indexOf("[parent]") != -1){
      alert("found parent with name parent"); 
     }
    else {
        alert("not found"); 
        app.activeDocument.activeLayer = app.activeDocument.activeLayer.parent;
    }
}

function getNumberOfParents(){
    var currentActiveLayer = app.activeDocument.activeLayer;
    var theCount = 0;
     while(app.activeDocument.activeLayer.parent != app.activeDocument){
        var activeLayerParent = app.activeDocument.activeLayer.parent;
        app.activeDocument.activeLayer = activeLayerParent;
        theCount++
    }
    app.activeDocument.activeLayer =currentActiveLayer;
    alert("parents: "+theCount);
    return theCount
 }

// add indexOf method
Array.prototype.indexOf = Array.prototype.indexOf || function(value, start) {
  for (var i = 0, length = this.length; i < length; i++) {
    if (this[i] == value) {
      return i;
    }
  }
  return -1;
}
