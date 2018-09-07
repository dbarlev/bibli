export function populateBookApa(action){
    let data = action.value;
    var fName = "";
    var lName = "";
    var publishYear = data.publishYear;
    var bookName = data.bookName;
    var location = data.publisherLocation;
    var publisherName = data.publisherName;
    var writers = getWriters(action.value.editor);
    var fullAPA = writers + "' (" + publishYear + "). " + bookName + ". " + location + ": " + publisherName;
    
    return fullAPA;
}


function getWriters(writers)
{
    var nameStr = "";
    writers.forEach(function(writer,i){
        i++;
        let keys = Object.keys(writer);
        let name = writer[keys[0]];
        if(i == writers.length - 1) // first name of the last editor
        {
            if(writers.length < 3) // in case there is only one writer
            {
                nameStr += " " + name + ",";
            }
            else
            {
                nameStr += " ו" + name + ",";
            } 
        }
        else if(i == writers.length) // last name of the last editor
        {
            name = name.substr(0,1);
            nameStr += " " + name;
        }
        else if(i % 2 == 0) // last name
        {
            name = name.substr(0,1);
            nameStr += " " + name + ".";
        }
        else // first name
        {
            nameStr += " " + name + ",";
        }
    });
    return nameStr;
}