// written by Lukasz Wieczorek at http://lukasz.io
// Please do not remove this and give credit if you repost. Thanks!

cTID = function(s) { return app.charIDToTypeID(s); };
sTID = function(s) { return app.stringIDToTypeID(s); };

function newGroupFromLayers(doc) {
    var desc = new ActionDescriptor();
    var ref = new ActionReference();
    ref.putClass( sTID('layerSection') );
    desc.putReference( cTID('null'), ref );
    var lref = new ActionReference();
    lref.putEnumerated( cTID('Lyr '), cTID('Ordn'), cTID('Trgt') );
    desc.putReference( cTID('From'), lref);
    executeAction( cTID('Mk  '), desc, DialogModes.NO );
};

function undo() {
   executeAction(cTID("undo", undefined, DialogModes.NO));
};

function getSelectedLayers(doc) {
  var selLayers = [];
  newGroupFromLayers();

  var group = doc.activeLayer;
  var layers = group.layers;

  for (var i = 0; i < layers.length; i++) {
    selLayers.push(layers[i]);
  }
  undo();
  return selLayers;
};

var selectedLayers = getSelectedLayers(app.activeDocument);
var myColor=prompt("Font color","text size");

for(var i= 0; i < selectedLayers.length; i++){
    selectedLayers[i].textItem.color.rgb.hexValue = myColor;
}


function print(i) {
    if(i == "object"){ 
        print("you are trying to printObject, use printObj(); function"); 
    }
    else {  
        $.write(i+"\n"); 
    }
}