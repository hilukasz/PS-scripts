if ( app.documents.length > 0 ) {
    var doc = app.activeDocument;
    
    var verticalLine = doc.pathItems.add();
    var centerVertical = doc.width/2;
    verticalLine.setEntirePath( Array( Array(centerVertical, 0), Array(centerVertical, doc.height) ) );
    verticalLine.guides = true;
    
    var horizLine = doc.pathItems.add();
    var centerHorizontal = doc.height/2;  
    horizLine.setEntirePath( Array( Array(0, centerHorizontal), Array(doc.width,centerHorizontal) ) );
    horizLine.guides = true;
    
}