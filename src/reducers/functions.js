import { HeMonths, EnMonths } from './consts';

export function populateAPAData(action) {
    if (action.value.length == 0)
        return;

    var records = [];
    action.value.map((data, index) => {
        let name = data.name,
            lang = checkLanguage(name ? name : data.title);
        records.push({
            location: data.publishcity,
            publisherName: data.publishname,
            year: data.year,
            kereh: data.kereh,
            BiblistID: data.BiblistID,
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

function checkLanguage(text) {
    var lang = "he";
    if (/.*[a-zA-Z]/.test(text)) {
        lang = "en";
    }
    return lang;
}

function getWriters(writers, lang) {
    if (writers.wFname.length !== writers.wLname.length)
        return;

    let length = writers.wFname.length;
    let combinedWritersName = [];
    let printedWriter = "";

    writers.wFname = writers.wFname.map((f) => {
        return f.charAt(0).toUpperCase() + f.slice(1);
    });

    writers.wLname = writers.wLname.map((l) => {
        return l.charAt(0).toUpperCase() + l.slice(1);
    });

    for (let i = 0; i < length; i++) {
        let fname = writers.wFname[i].substr(0, 1);
        let lname = writers.wLname[i];
        combinedWritersName.push({ fname, lname })
    }

    for (let index = 0; index < combinedWritersName.length; index++) {
        let writer = combinedWritersName[index];
        let HEseperatorStart = "";
        let HEseperatorEnd = "";
        let ENseperatorStart = "";
        let ENseperatorEnd = "";

        if (index == 0) // first writer
        {
            HEseperatorStart = "";
            ENseperatorStart = "";
            if (combinedWritersName.length === 1) {
                HEseperatorEnd = "'";
                ENseperatorEnd = ".";
            }
            else {
                HEseperatorEnd = "'.";
                ENseperatorEnd = ".";
            }
        }
        else if (index > 5) {
            if (lang === "en")
                printedWriter += "et al. ";
            else
                printedWriter += " ואחרים";

            break;
        }
        else if (index === combinedWritersName.length - 1) // last writer
        {
            HEseperatorStart = " ו";
            ENseperatorStart = " & ";

            HEseperatorEnd = "'";
            ENseperatorEnd = ".";
        }
        else if (index === combinedWritersName.length - 2) // before last writer
        {
            HEseperatorStart = "";
            ENseperatorStart = "";

            HEseperatorEnd = "'";
            ENseperatorEnd = "";
        }
        else {
            HEseperatorStart = "";
            ENseperatorStart = "";

            HEseperatorEnd = "'.";
            ENseperatorEnd = ".";
        }
        if (lang == "en")
            printedWriter += `${ENseperatorStart}${writer.lname}, ${writer.fname}${ENseperatorEnd} `
        else
            printedWriter += `${HEseperatorStart}${writer.lname}, ${writer.fname}${HEseperatorEnd} `
    }

    return printedWriter;
}


/**user data */

export function addUserDataTOdb(action) {
    console.log('addUserDataTOdb ', action);
}


export function editListName(newList, currentActive) {
    return newList.filter((item) => {
        return item.id == currentActive.id;
    })[0];
}
