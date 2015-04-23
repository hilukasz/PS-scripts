// Save the current preferences
var startRulerUnits = app.preferences.rulerUnits;
var startTypeUnits = app.preferences.typeUnits;
var startDisplayDialogs = app.displayDialogs;

// Set Photoshop to use pixels and display no dialogs
app.preferences.rulerUnits = Units.PIXELS;
app.preferences.typeUnits = TypeUnits.PIXELS;
app.displayDialogs = DialogModes.NO;

var layerNum = app.activeDocument.layers.length;
var docWidth = app.activeDocument.width;
var docHeight = app.activeDocument.height;
var rows;
var columns;
var i = 0; // Active layer counter

// layer.Translate is broken, that asshole. Here's the improvised one
function translateActiveLayer( deltaX, deltaY )
    {
        var desc = new ActionDescriptor();
        var ref = new ActionReference();
        ref.putEnumerated( charIDToTypeID('Lyr '), charIDToTypeID('Ordn'), charIDToTypeID('Trgt') );
        desc.putReference( charIDToTypeID('null'), ref );
        var coords = new ActionDescriptor();
        coords.putUnitDouble( charIDToTypeID('Hrzn'), charIDToTypeID('#Pxl'), deltaX );
        coords.putUnitDouble( charIDToTypeID('Vrtc'), charIDToTypeID('#Pxl'), deltaY );
        desc.putObject( charIDToTypeID('T   '), charIDToTypeID('Ofst'), coords );
        executeAction( charIDToTypeID('move'), desc, DialogModes.NO );
};


    columns = app.activeDocument.layers.length;
    rows = 1

    app.activeDocument.resizeCanvas(docWidth*columns, docHeight*rows, AnchorPosition.TOPLEFT);

    for (var rowCount = 1; rowCount<=rows; rowCount++) 
    {
        for (var colCount =1; colCount<=columns; colCount++)
        {
            i++;
            if (layerNum >= i)
            {
                app.activeDocument.activeLayer = activeDocument.layers[layerNum-i];
                translateActiveLayer(docWidth * (colCount-1), docHeight * (rowCount-1)) ;
            };
        };
    };
    alert("Completed!");

// Reset the application preferences
app.preferences.rulerUnits = startRulerUnits;
app.preferences.typeUnits = startTypeUnits;
app.displayDialogs = startDisplayDialogs;