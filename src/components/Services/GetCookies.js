const CryptoJS = require("crypto-js");

export function getCookie(cname) {
  var name = cname + "=";
  var decodedCookie = decodeURIComponent(document.cookie);
  console.log('cookie',name )
  var ca = decodedCookie.split(';');
  for (var i = 0; i < ca.length; i++) {
    var c = ca[i];
    while (c.charAt(0) == ' ') {
      c = c.substring(1);
    }
    if (c.indexOf(name) == 0) {
      let value = c.substring(name.length, c.length);
      if (name.startsWith("userid")) {
        let bytes = CryptoJS.AES.decrypt(value, 'bibli data');
        return bytes.toString(CryptoJS.enc.Utf8);
      }
      return value;
    }
  }
  return "";
}