
export class FormatWriters {

  formatWriters(names)
  {
    var writers = [];
    var fname = [];
    var lname = [];
    var writersTemp = [];

    names.forEach(function(item, i){
      fname.push(item.firstName);
      lname.push(item.lastName)
      writers.push(item);
    });

    return {
      fname,
      lname,
      writers
    }
  }
}


