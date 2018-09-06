/*  Project 01_11_04

    Author: Gabriel Ortega
    Date: 9.4.18  

    Filename: script.js
*/

"use strict";

// Global Variables

var httpRequest = false;

// Function to create an XHR object
function getRequestObject() {
    try {
        httpRequest = new XMLHttpRequest();
    } catch (requestError) {
        return false;
    }
    document.getElementById("csset").style.visibility = "visible";
    var zip = document.getElementById("zip");
    if (zip.addEventListener) {
        zip.removeEventListener("keyup", checkInput, false)
    } else if (zip.attachEvent) {
        zip.detachEvent("onkeyup", checkInput);
        return httpRequest;
    }
}

// Event Listeners
var zip = document.getElementById("zip");
if (zip.addEventListener) {
    zip.addEventListener("keyup", checkInput, false)
} else if (zip.attachEvent) {
    zip.attachEvent("onkeyup", checkInput);
}

// Function to check if the value is a vlaid 5-digit zip code, if so, run getLocation()
function checkInput() {
    var zip = document.getElementById("zip").value;
    if (zip.length === 5) {
        getLocation()
    } else {
        document.getElementById("city").value = "";
        document.getElementById("state").value = "";
    }
}

// Function to create a new XHR object or reuse one
function getLocation() {
    var zip = document.getElementById("zip").value;
    if (!httpRequest) {
        httpRequest = getRequestObject();
    } else {
        httpRequest.abort();
        httpRequest.open("get", "http://api.zippopotam.us/us/" + zip, true);
        httpRequest.send(null);
    }
}
