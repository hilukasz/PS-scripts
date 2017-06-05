// written by Lukasz Wieczorek at http://lukasz.io
// Please do not remove this and give credit if you repost. Thanks!

/*
<javascriptresource> 
<name>Make center guides</name>
<category>Lukasz Wieczorek Plugins</category>
</javascriptresource>
*/

preferences.rulerUnits = Units.PIXELS
var mySize = [];
mySize[0] = app.activeDocument.height;
mySize[1] = app.activeDocument.width;
mySize;

mySize[0] = mySize[0]/2;
mySize[1] = mySize[1]/2;

app.activeDocument.guides.add (Direction.HORIZONTAL,new UnitValue(mySize[0],0))
app.activeDocument.guides.add (Direction.VERTICAL,new UnitValue(mySize[1],0))