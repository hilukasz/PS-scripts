var layerLength = app.activeDocument.layers.length;
var docRef  = app.activeDocument;
var myPrefix=prompt("enter prefix","").toLowerCase().replace(/ /g, "_");
docRef.activeLayer.name = "drawable-xxxhdpi/"+myPrefix+", 75% drawable-xxhdpi/"+myPrefix+", 50% drawable-xhdpi/"+myPrefix+",  37.5% drawable-hdpi/"+myPrefix+", 25% drawable-mdpi/"+myPrefix+"" 