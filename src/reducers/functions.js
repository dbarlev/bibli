import {HeMonths, EnMonths} from './consts';

export function populateBookApa(action){
    // let data = action.value,
    //     publishYear = data.publishYear,
    //     bookName = data.bookName,
    //     location = data.publisherLocation,
    //     publisherName = data.publisherName,
        
    let data = action.value,
        location = data.publishcity,
        publisherName = data.publishname,
        year = data.publishyear,
        bookName = data.bookname,
        bookID = data.bookid,
        lang = checkLanguage(bookName), // get the first letter of the first writer and check it's language
        writers = getWriters(data, lang);
        let fullAPA = {apa: writers + "(" + year + "). " + bookName + ". " + location + ": " + publisherName, bookID};


    return fullAPA;
}

export function populateWebisteApa(action){

    let data = action.value,
        publishYear = data.publishYear,
        linkToPage = data.linkToPage,
        articleHeadline = data.articleHeadline,
        lang = checkLanguage(articleHeadline), // get the first letter of the first writer and check it's language
        writers = getWriters(action.value.editor, lang);

        let month = getOutputMonth();
        let date =  getOutputDate();
        let fullAPA = writers + "(" + publishYear + "). " + articleHeadline + ". " + date + " ב" + month + " מ " + linkToPage + ".";

        if(lang == "en")
        {
            month = getOutputMonth("en");
            fullAPA = writers + "(" + publishYear + "). " + articleHeadline + ". " + "Retrieved " + month + " " + date + " From " + linkToPage + ".";
        }

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
        lang = checkLanguage(paperName), // get the first letter of the first writer and check it's language
        writers = getWriters(action.value.editor, lang),
        fullAPA;

    if(sourceOption.value == "online")
    {
         let month = getOutputMonth();
         let date =  getOutputDate();
         fullAPA = writers + "(" + dateOfPublish + "). " + papertHeadline + ". " + paperName + ", " + pagesNumber + ", נדלה ב " + date + " ב" + month + " מ " + paperLink + ".";
         
        if(lang == "en")
        {
            month = getOutputMonth("en");
            fullAPA = writers + "(" + dateOfPublish + "). " + papertHeadline + ". " + paperName + ", " + pagesNumber + ", Retrieved " + month + " " + date + " From " + paperLink + ".";
        }
    }
    else
    {
        fullAPA = writers + "(" + dateOfPublish + "). " + papertHeadline + ". " + paperName + ", " + pagesNumber + ".";
    }
    
    return fullAPA;
}

export function populateArticleApa(action){
    let data = action.value,
        sourceOption = data.selectedSourceOption,
        noteName = data.noteName,
        articleName = data.articleName,
        episode = data.episode,
        pages = data.pages,
        publishYear = data.publishYear,
        paperLink = data.paperLink,
        lang = checkLanguage(noteName), // get the first letter of the first writer and check it's language
        writers = getWriters(action.value.editor, lang),
        fullAPA;

    if(sourceOption.value == "online")
    {
         let month = getOutputMonth();
         let date =  getOutputDate();
         fullAPA = writers + "(" + publishYear + "). " + articleName + ". " + noteName + ", " + episode + ", " + pages + ", נדלה ב " + date + " ב" + month + " מ " + paperLink + ".";
         
        if(lang == "en")
        {
            month = getOutputMonth("en");
            fullAPA = writers + "(" + publishYear + "). " + articleName + ". " + noteName + ", " + episode + ", " + pages + ", Retrieved " + month + " " + date + " From " + paperLink + ".";
        }
    }
    else
    {
        fullAPA = writers + "(" + publishYear + "). " + articleName + ". " + noteName + ", " + episode + ", " + pages + ".";
    }
    
    return fullAPA;
}

function checkLanguage(text)
{
    var lang = "he";
    if(/^[a-zA-Z]+$/.test(text))
    {
        lang = "en";
    }
    return lang;
}

function getOutputMonth(langCode)
{
    let d = new Date();
    let CurrentMonth = d.getMonth() + 1; // +1 because it's start from 0
    let month = HeMonths[CurrentMonth];
    if(langCode == "en" || langCode == "english")
    {
        month = EnMonths[CurrentMonth];
    }
    return month;
}

function getOutputDate()
{
    let d = new Date();
    let date =  d.getDate();
    return date.length == 1 ? "0" + date : date;
}

function getWriters(writers, lang)
{
    // if there is no writers, exit the function
    if(writers.wFname == false)
        return "";

    // retrive from db
    if(writers.wFname != undefined)
    {
        var data = writers;
        var fname = data.wFname.join().split(",");
        var lname = data.wLname.join().split(",");
        var length = fname.length;
        writers = [];

        for(var i = 0; i < length; i++)
        {
            let writerFname = {
                firstNamefield: fname[i].trim()
            }
            let writerLname = {
                lastNamefield: lname[i].trim()
            }
            writers.push(writerFname);
	        writers.push(writerLname);
        }
    }
    
    
    var nameStr = "";
    var seperator = " ו";
    if(lang == "en") seperator = " & ";

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
                nameStr += seperator + name + ",";
            } 
        }
        else if(i == writers.length) // last name of the last editor
        {
            name = name.substr(0,1);
            nameStr += " " + name + "' ";
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
