if (documents.length == 0) {
    alert("There are no documents open.");
}
else {
    var docRef = activeDocument;
    
    
    if ($.os.search(/windows/i) != -1) {
    fileLineFeed = "Windows"
    } else {
    fileLineFeed = "Macintosh"
    }

    fileOut = new File("~/Desktop/Guides.txt")
    fileOut.lineFeed = fileLineFeed
    fileOut.open("r", "TEXT", "????")
    var line = "";
    while((line = fileOut.readln()) !== "")
    {
            var dir = line.split(",")[0];
            var amt = line.split(",")[1].split(" ")[0];
            var unit = line.split(",")[1].split(" ")[1];
            var cmd = "docRef.guides.add("+dir+",UnitValue("+amt+","+"\""+unit+"\"))";
            eval(cmd);
    }
    fileOut.close();
    alert("Guides imported!");
}

