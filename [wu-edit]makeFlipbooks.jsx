//*************************************************************************************************************
/** @file ExportToEdgeAnimate.jsx
	@author Avinash Rao P <arao@adobe.com> This work is released to Public Domain, do whatever you want with it.

Setup:
1.Ensure that you have the latest version of Adobe Adobe Photoshop CC installed. 
    Copy the attached extension file ExportToEdgeAnimate.jsx ) to Scripts folder in Adobe Photoshop  Install location.  
        Mac: <hard drive>/Applications/Adobe Photoshop  CC/Presets/Scripts/
        PC: C:\Program Files\Adobe\Adobe Photoshop  CC\Presets\Scripts\
2.Restart Adobe Photoshop  and ensure you see the script loaded , File -> Scripts -> ExportToEdgeAnimate
3.The following assumptions are made by the extend script:

Optional Setup:
1.PLEASE SAVE AND BACKUP YOUR PSD FILE!!
2.Increase the history states count ( optional ) if you want the psd file restored back to its original state
*/
//*************************************************************************************************************

// Save the current preferences
var startRulerUnits = app.preferences.rulerUnits;
var startTypeUnits = app.preferences.typeUnits;
var startDisplayDialogs = app.displayDialogs;


var layerNum = app.activeDocument.layers.length;
var docWidth = app.activeDocument.width;
var docHeight = app.activeDocument.height;
var rows;
var columns;
var activeLayerCount = layerNum;

var OUTPUT_FORMAT = 'eas';

var docName = app.activeDocument.name.toString().replace(".psd", "");


//Edge Animate needs a json file with META header.
function outputEAS(doc) {
    var i = doc.layers.length - 1;
    var limit = 0;
    var format = OUTPUT_FORMAT.toLowerCase();
    var Path = app.activeDocument.path;
    var saveFile = File(Path + "/" + docName + "." + format);

    if (saveFile.exists)
        saveFile.remove();

    //Edge Animate works with UTF8 encoded json files
    saveFile.encoding = "UTF8";
    saveFile.open("e", "TEXT", "????");
    saveFile.write('\ufeff');
    saveFile.writeln('{"frames": [');
    saveFile.writeln("");

    //Spritesheet is packed from left -> right , top -> bottom
    //The spritesheet is packed with layer0 being the first sprite ( bottom to top )
    var layerCount = 0;
    //You can change the order of layers below
    for (var rowCount = 1; rowCount <= rows; rowCount++) {
        for (var colCount = 1; colCount <= columns; colCount++) {
            layerCount++;
            if (layerNum >= layerCount) {
                //Code writes the correspong .eas json file thate Edge Animate 4.0 understands
                saveFile.writeln('{');
                saveFile.writeln('   "filename": "' + doc.layers[layerNum - layerCount].name + '",');
                saveFile.write('   "frame": {"x":' + docWidth.toString().replace("px", "") * (colCount - 1) + ', "y":' + docHeight.toString().replace("px", "") * (rowCount - 1));
                saveFile.writeln(',"w":' + docWidth.toString().replace("px", "") + ', "h":' + docHeight.toString().replace("px", "") + '},');
                //Assuming that trim and rotation on sprites are not present
                saveFile.writeln('   "rotated": false,');
                saveFile.writeln('   "trimmed": false,');
                saveFile.write('   "spriteSourceSize": {"x":' + 0 + ',"y":' + 0);
                saveFile.writeln(',"w":' + docWidth.toString().replace("px", "") + ', "h":' + docHeight.toString().replace("px", "") + '},');
                saveFile.writeln('   "sourceSize": {"w":' + docWidth.toString().replace("px", "") + ',"h":' + docHeight.toString().replace("px", "") + '}');
                saveFile.writeln('}');

                if (layerCount > 0 && layerCount < layerNum) {
                    saveFile.write(',');
                }
            }
        };
    };
    saveFile.writeln('],');

    //write the meta tag needed for the .eas file 
    saveFile.writeln('"meta": {');
    saveFile.writeln('   "app": "Adobe Flash Professional",');
    saveFile.writeln('   "version": "14.0",');
    saveFile.writeln('   "Target": "Edge Animate",');
    saveFile.writeln('   "Target Version": "4.0",');
    saveFile.writeln('   "image": "' + docName + ".png" + '",');
    saveFile.writeln('   "format": "RGBA8888",');

    var new_width = app.activeDocument.width.toString().replace("px", "");
    var new_height = app.activeDocument.height.toString().replace("px", "");

    saveFile.writeln('   "size": {"w":' + new_width + ',"h":' + new_height + '},');
    saveFile.writeln('   "scale": "1"');
    saveFile.writeln('}');
    saveFile.writeln('}');
    saveFile.close();
};


//Exports the packed sprite to PNG format in the root folder
function saveTheFileToPNG() {
    var doc = app.activeDocument;
    var Path = doc.path;
    var saveFile = File(Path + "/" + docName + ".png");
    var pngSaveOptions = new PNGSaveOptions();
    pngSaveOptions.transparency = true;
    pngSaveOptions.format = SaveDocumentType.PNG; // Document Type
    doc.saveAs(saveFile, pngSaveOptions, true, Extension.LOWERCASE);
    outputEAS(doc);
    //comment this out incase you dont need an alert dialog
    alert("Spritesheet and corresponding .eas file generated !");
};

function translateActiveLayer(deltaX, deltaY) {
    //see http://wwwimages.adobe.com/content/dam/Adobe/en/devnet/photoshop/pdfs/photoshop-cc-scripting-guide.pdf on how to use script listener.
    var desc = new ActionDescriptor();
    var ref = new ActionReference();
    ref.putEnumerated(charIDToTypeID('Lyr '), charIDToTypeID('Ordn'), charIDToTypeID('Trgt'));
    desc.putReference(charIDToTypeID('null'), ref);
    var coords = new ActionDescriptor();
    coords.putUnitDouble(charIDToTypeID('Hrzn'), charIDToTypeID('#Pxl'), deltaX);
    coords.putUnitDouble(charIDToTypeID('Vrtc'), charIDToTypeID('#Pxl'), deltaY);
    desc.putObject(charIDToTypeID('T   '), charIDToTypeID('Ofst'), coords);
    executeAction(charIDToTypeID('move'), desc, DialogModes.NO);
};

function main() {
    // Set Photoshop to use pixels and display no dialogs
    app.preferences.rulerUnits = Units.PIXELS;
    app.preferences.typeUnits = TypeUnits.PIXELS;
    app.displayDialogs = DialogModes.NO;

    //preserve history 
    var historyIndex = app.activeDocument.historyStates.length - 1;

    rows = Math.round(Math.sqrt(layerNum));
    columns = Math.ceil(layerNum / rows);

    app.activeDocument.resizeCanvas(docWidth * columns, docHeight * rows, AnchorPosition.TOPLEFT);

    for (var rowCount = 1; rowCount <= rows; rowCount++) {
        for (var colCount = 1; colCount <= columns; colCount++) {
           
            if (activeLayerCount >= 0) {
                app.activeDocument.activeLayer = activeDocument.layers[layerNum - activeLayerCount];
                translateActiveLayer(docWidth * (colCount - 1), docHeight * (rowCount - 1));
            };
            activeLayerCount--;
        };
    };

    //Save the spritesheet packaged above in png format.
    saveTheFileToPNG();

    //restore the history 
    app.activeDocument.activeHistoryState = app.activeDocument.historyStates[historyIndex];
    app.purge(PurgeTarget.HISTORYCACHES);

    // Reset the application preferences
    app.preferences.rulerUnits = startRulerUnits;
    app.preferences.typeUnits = startTypeUnits;
    app.displayDialogs = startDisplayDialogs;
};


if (!app.activeDocument.saved)
    alert("Please save and Backup the document before running this !");
else
    main();