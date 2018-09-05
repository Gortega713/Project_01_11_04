/*  Project 01_11_04

    Author: Gabriel Ortega
    Date: 9.4.18  

    Filename: script.js
*/

"use strict";

// Global Variables

var httpRequest = false;



// Event Listeners
var zip = document.getElementById("zip");
if (zip.addEventListener) {
    zip.addEventListener("keyup", checkInput, false)
} else if (zip.attachEvent){
    zip.attachEvent("onkeyup", checkInput);
}

function checkInput() {
    alert("checkInput()");
}