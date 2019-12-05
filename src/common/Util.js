import React from 'react';


export const TogglePass = () => {
    /* see password */
    let open = "glyphicon-eye-open";
    let close = "glyphicon-eye-close";
    let ele = document.getElementById("password");
    let eve = document.getElementById("toggleBtn");
    console.log("e", eve);
    if (eve.classList.contains(open)) {
      ele.type = "text";
      eve.classList.remove(open);
      eve.className += " " + close;
    } else {
      ele.type = "password";
      eve.classList.remove(close);
      eve.className += " " + open;
    }

  };