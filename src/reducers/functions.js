const Months = {
    "1": "ינואר",
    "2": "פברואר",
    "3": "מרץ",
    "4": "אפריל",
    "5": "מאי",
    "6": "יוני",
    "7": "יולי",
    "8": "אוגוסט",
    "9": "ספטמבר",
    "10": "אוקטובר",
    "11": "נובמבר",
    "12": "דצמבר"
}

export function populateBookApa(action){
    let data = action.value,
        publishYear = data.publishYear,
        bookName = data.bookName,
        location = data.publisherLocation,
        publisherName = data.publisherName,
        writers = getWriters(action.value.editor),
        fullAPA = writers + "' (" + publishYear + "). " + bookName + ". " + location + ": " + publisherName;
    
    return fullAPA;
}

export function populatePaperApa(action){
    let data = action.value,
        sourceOption = data.selectedSourceOption,
        paperName = data.paperName,
        papertHeadline = data.papertHeadline,
        pagesNumber = data.pagesNumber,
        dateOfPublish = data.dateOfPublish,
        paperLink = data.paperLink,
        writers = getWriters(action.value.editor),
        fullAPA;

    if(sourceOption.value == "online")
    {
         let d = new Date();
         let month = d.getMonth() + 1; // +1 because it's start from 0
         let date =  d.getDate();
         date = date.length == 1 ? "0" + date : date;
         month = Months[month];
         fullAPA = writers + "' (" + dateOfPublish + "). " + papertHeadline + ". " + paperName + ", " + pagesNumber + ", נדלה ב " + date + " ב" + month + " מ " + paperLink + ".";
    }
    else
    {
        fullAPA = writers + "' (" + dateOfPublish + "). " + papertHeadline + ". " + paperName + ", " + pagesNumber + ".";
    }
    
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
