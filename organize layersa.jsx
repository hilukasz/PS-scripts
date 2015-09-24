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

function printObj(obj) {
    var key;
    $.write("----------\n");
    $.write("keys: \n\n");
        for(key in obj) {
                try{
               $.write(key + " : " + obj[key].toString() +'\n'); 
               }
        catch(e){};
        }
    $.write("----------\n");
};

printObj(selectedLayers[0]);


//app.activeDocument.activeLayer = selectedLayers[1];
function print(i) {
    if(i == "object"){ 
        print("you are trying to printObject, use printObj(); function"); 
    }
    else {  
        $.write(i+"\n"); 
    }
};

selectedLayersIndex= [];
for(i = 0; i < selectedLayers.length; i++){
    selectedLayersIndex.push(selectedLayers[i].itemIndex+1);
}

print(selectedLayersIndex[1]);

//alert(selectedLayers[2].name)