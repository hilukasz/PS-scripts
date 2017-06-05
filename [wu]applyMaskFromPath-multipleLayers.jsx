﻿// Select all layers you want to put mask on// Make a working path in paths named "Work Path" it will apply mask based on "work path"/*<javascriptresource> <name>Apply Mask to layers from Path</name><category>Lukasz Wieczorek Plugins</category></javascriptresource>*/var docRef = app.activeDocument;doesPathExist();function doesPathExist() {    try {         app.activeDocument.pathItems.getByName("Work Path")           runScript();    }    catch(err) { alert("Please make Path named \"Work Path\" Path Does not currently exist"); };  }function runScript(){    cTID = function(s) { return app.charIDToTypeID(s); };    sTID = function(s) { return app.stringIDToTypeID(s); };    function newGroupFromLayers(docRef) {        var desc = new ActionDescriptor();        var ref = new ActionReference();        ref.putClass( sTID('layerSection') );        desc.putReference( cTID('null'), ref );        var lref = new ActionReference();        lref.putEnumerated( cTID('Lyr '), cTID('Ordn'), cTID('Trgt') );        desc.putReference( cTID('From'), lref);        executeAction( cTID('Mk  '), desc, DialogModes.NO );    };    function undo() {       executeAction(cTID("undo", undefined, DialogModes.NO));    };    function getSelectedLayers(docRef) {      var selLayers = [];      newGroupFromLayers();      var group = docRef.activeLayer;      var layers = group.layers;      for (var i = 0; i < layers.length; i++) {        selLayers.push(layers[i]);      }      undo();      return selLayers;    };    var selectedLayers = getSelectedLayers(app.activeDocument);    for( i = 0; i < selectedLayers.length; i++) {        var numberLayers = app.activeDocument.layers.length        app.activeDocument.activeLayer  = app.activeDocument.layers[numberLayers-1];        docRef.activeLayer = selectedLayers[i];        makeMask();     }    function makeMask(){    var currentPathItem = app.activeDocument.pathItems.getByName("Work Path");    currentPathItem.makeSelection();        // =======================================================        var idMk = charIDToTypeID( "Mk  " );            var desc12 = new ActionDescriptor();            var idNw = charIDToTypeID( "Nw  " );            var idChnl = charIDToTypeID( "Chnl" );            desc12.putClass( idNw, idChnl );            var idAt = charIDToTypeID( "At  " );                var ref8 = new ActionReference();                var idChnl = charIDToTypeID( "Chnl" );                var idChnl = charIDToTypeID( "Chnl" );                var idMsk = charIDToTypeID( "Msk " );                ref8.putEnumerated( idChnl, idChnl, idMsk );            desc12.putReference( idAt, ref8 );            var idUsng = charIDToTypeID( "Usng" );            var idUsrM = charIDToTypeID( "UsrM" );            var idRvlS = charIDToTypeID( "RvlS" );            desc12.putEnumerated( idUsng, idUsrM, idRvlS );        executeAction( idMk, desc12, DialogModes.NO );    }}