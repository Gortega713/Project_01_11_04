/*  Project 01_11_04

    Author: Gabriel Ortega
    Date: 9.4.18  

    Filename: script.js 
*/

"use strict";

// Global Variables

var httpRequest = false;
var countrySel;

// Function to create an XHR object
function getRequestObject() {
    try {
        httpRequest = new XMLHttpRequest();
    } catch (requestError) {
        document.getElementById("zipset").style.visibility = "visible";
        return false;
        var germany = document.getElementById("germany");
        var us = document.getElementById("us");
        var zip = document.getElementById("zip").value;
        if (zip.addEventListener) {
            germany.removeEventListener("click", checkButtons, false);
            us.removeEventListener("click", checkButtons, false);
            zip.removeEventListener("keyup", checkInput, false)
        } else if (zip.attachEvent){
            germany.detachEvent("onclick", checkButtons);
            us.detachEvent("onclick", checkButtons);
            zip.detachEvent("onkeyup", checkInput)
        }
    }
    document.getElementById("csset").style.visibility = "visible";
    var zip = document.getElementById("zip");
    if (zip.addEventListener) {
        zip.removeEventListener("keyup", checkInput, false)
    } else if (zip.attachEvent) {
        zip.detachEvent("onkeyup", checkInput);
    }
    return httpRequest;
}

// Event Listeners
var zip = document.getElementById("zip");
if (zip.addEventListener) {
    zip.addEventListener("keyup", checkInput, false)
} else if (zip.attachEvent) {
    zip.attachEvent("onkeyup", checkInput);
}

// Function to test for the radio buttons ("Germany" and "United States")
function checkButtons() {
    var germany = document.getElementById("germany");
    var us = document.getElementById("us");
    if (germany.checked || us.checked) {
        document.getElementById("zipset").style.visibility = "visible";
        if (germany.checked) {
            countrySel = "de"
        } else {
            countrySel = "us"
        }
    }
}

// Function to check if the value is a vlaid 5-digit zip code, if so, run getLocation()
function checkInput() {
    var zip = document.getElementById("zip").value;
    if (zip.length === 5) {
        getLocation();
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
    }
    httpRequest.abort();
    httpRequest.open("get", "http://api.zippopotam.us/" + countrySel + "/" + zip, true);
    httpRequest.send(null);

    httpRequest.onreadystatechange = displayData;

}

// Function to display data from the API
function displayData() {
    if (httpRequest.readyState === 4 && httpRequest.status === 200) {
        var resultData = JSON.parse(httpRequest.responseText);
        console.log(resultData);
    }
    var city = document.getElementById("city");
    var state = document.getElementById("state");
    city.value = resultData.places[0]["place name"];
    state.value = resultData.places[0]["state abbreviation"];
    document.getElementById("zip").blur();
    document.getElementById("csset").style.visibility = "visible";
}

var germany = document.getElementById("germany");
var us = document.getElementById("us");
if (us.addEventListener) {
    germany.addEventListener("click", checkButtons, false);
    us.addEventListener("click", checkButtons, false);
} else if (us.attachEvent) {
    germany.attachEvent("onclick", checkButtons);
    us.attchEvent("onclick", checkButtons);
}
