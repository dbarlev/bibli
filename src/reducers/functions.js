import {HeMonths, EnMonths} from './consts';

export function populateAPAData(action)
{    
    if(action.value.length == 0)
        return;
        
     var records = []; 
     action.value.map((data,index)=>{
        let name = data.name,
        lang = checkLanguage(name);
        records.push({
            location: data.publishcity,
            publisherName: data.publishname,
            year: data.year,
            kereh: data.kereh,
            name,
            bibListName: data.Name,
            date: data.retrived,
            type: data.type,
            url: data.url,
            articleHeadline: data.title,
            pages: data.pages,
            recordID: data.bookid,
            lang, // get the first letter of the first writer and check it's language
            writers: getWriters(data, lang)
        });        
    });
    return records;  
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


/**user data */

export function addUserDataTOdb(action)
{    
    console.log('addUserDataTOdb ', action);
}