
#targetengine main;  
  
var pfad = "C:\Program Files\Adobe\Adobe Illustrator CC 2014\Presets\en_US\Scripts"  
  
var win = new Window('palette', 'Lukasz\'s super badass panel of awesome');  
var tpanel = win.add ("tabbedpanel");  
tpanel.alignChildren = ["fill", "fill"];  
tpanel.preferredSize = [100,20];  
win.margins = 0;  
win.spacing = 0;  
var subtab1panel = tpanel.add ("tab", undefined, "Custom Art Scripts");  
subtab1panel.orientation="row";  
subtab1panel.alignChildren = ["fill", "fill"];  
  
  
var t1group = subtab1panel.add("group");  
t1group.orientation = "column";  
t1group.alignChildren = ["fill", "fill"];  
  
  
var btnSelect1 = t1group.add('button', undefined, 'Mirror on Horz Axis');  
//var scriptToLoad1 = new File("C:\Program Files\Adobe\Adobe Illustrator CC 2014\Presets\en_US\Scripts\mirrorOnRightAxis.jsx");  
  
var btnSelect2 = t1group.add('button', undefined, 'Omni Ungroup');   
var scriptToLoad2 = new File(pfad+"mirrorOnRightAxis.jsx");   
  
  
  
btnSelect1.onClick = function(){  
      
    flipHorizontally();
    flipHorizontally(duplicateObject());
    moveObject();

    function moveObject(){
        var idoc = app.activeDocument;  
        var sel = idoc.selection[0];  
        sel.left = sel.left+sel.width;  
    }

    function duplicateObject(){
        selection = app.activeDocument.selection;
        newItem = selection[0].duplicate();
        return newItem;
    }

    function flipHorizontally(objectToFlip) {
        mySelection = objectToFlip;
        var doc = app.activeDocument;              
        var s    = doc.selection;                            
        var sl   = s.length;                                    
        var m  = app.getScaleMatrix(-100,100);      
        for(var i = 0 ; i < sl; i++) s[i].transform(m);
        app.redraw();
    }

}// end function  
  
  
btnSelect2.onClick = function(){  
      
   var des = scriptToLoad2;  
   des.open("r");  
         
   var bt = new BridgeTalk;  
   bt.target = "illustrator";  
         
   var script = des.read();  
   des.close();  
              
   bt.body = script;  
   bt.send();  
  
}// end function  
  
win.center();  
win.show(); 