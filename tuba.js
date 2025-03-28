/*    C201 - Back-end Programming
 *    Exercise 01_04_01

 *    Tuba Farm Equipment
 *    Variables and functions
 *    
 *    Author: Justin Aybar
 *    Date: 08/06/2019

 *    Filename: tuba.js
 */

/* global variables tracking status of each form section */
var acresComplete = true;
var cropsComplete = true;
var monthsComplete = true;
var fuelComplete = true;

/* global variables referencing sidebar h2 and p elements */
var messageHeadElement = document.getElementById("messageHead");
var messageElement = document.getElementById("message");

/* global variables referencing fieldset elements */
var acresFieldset = document.getElementsByTagName("fieldset")[0];
var cropsFieldset = document.getElementsByTagName("fieldset")[1];
var monthsFieldset = document.getElementsByTagName("fieldset")[2];
var fuelFieldset = document.getElementsByTagName("fieldset")[3];

/* global variables referencing text input elements */
var monthsBox = document.forms[0].months;
var acresBox = document.forms[0].acres;

/* verify acres text box entry is a positive number */
function verifyAcres() {
   var validity = true;
   var messageText = "";
   try {
       if (!(acresBox.value > 0)) {
           throw "Please enter a number of acres greater than 0.";
       }

   } catch (message) {
       validity = false;
       messageText = message;
       // remove erroneous entry from input box
       acresBox.value = "";
   } finally {
       acresComplete = validity;
       // remove former recommendation
       messageElement.innerHTML = messageText;
       messageHeadElement.innerHTML = "";
       testFormCompleteness();
   }
}
            
/* verify at least one crops checkbox is checked */
function verifyCrops() {
   testFormCompleteness();
}

/* verify months text box entry is between 1 and 12 */
function verifyMonths() {
   var validity = true;
    var messageText = "";
    try {
        if (!(monthsBox.value >= 1 && monthsBox.value <= 12)) {
            throw "Please enter a number of months between 1 and 12.";
        }
    } catch (message) {
        validity = false;
        messageText = message;
        // remove erroneous entry from input box
        monthsBox.value = "";
    } finally {
        monthsComplete = validity;
        // remove former recommendation
        messageElement.innerHTML = messageText;
        messageHeadElement.innerHTML = "";
        testFormCompleteness();
    }
}

/* verify that a fuel option button is selected */
function verifyFuel() {
   testFormCompleteness();
}

/* check if all four form sections are completed */
function testFormCompleteness() {
   if (acresComplete && cropsComplete && monthsComplete && fuelComplete) {
      createRecommendation();
   }
}

/* generate tractor recommendation based on user selections */
function createRecommendation() {
   if (acresBox.value <= 5000) { // 5000 acres or less, no crop test needed
      if (monthsBox.value <= 10) { // 10+ months of farming per year
         messageHeadElement.innerHTML = "E3250";
         messageElement.innerHTML = "A workhorse for a small farm or a big backyard. A medium- to heavy-duty tractor that can haul whatever you throw at it year-round.";
      } else { // 9 or fewer months per year
         messageHeadElement.innerHTML = "E2600";
         messageElement.innerHTML = "Perfect for a small farm, or just a big backyard. A light- to medium-duty tractor that can make short work of most any chore.";             
      }
   } else { // more than 5000 acres
      if (monthsBox.value <= 9) { // 9 or fewer months per year, no crop test needed
         messageHeadElement.innerHTML = "W1205";
         messageElement.innerHTML = "Can't be beat for the general tasks of a large farm. Medium- to heavy-duty muscle that's there then you need it.";
      } else { // 10+ months of farming per year
         if (document.getElementById("wheat").checked || document.getElementById("corn").checked && document.getElementById("soy").checked) {
            messageHeadElement.innerHTML = "W2500";
            messageElement.innerHTML = "Our heavy-duty tractor designed especially for the needs of wheat, corn, and soy farmers. A reliable piece of equipment that you can turn to all year long.";
         } else {
            messageHeadElement.innerHTML = "W2550";
            messageElement.innerHTML = "Our heavy-duty tractor for general use. A reliable piece of equipment that you can turn to all year long.";
         }
      }
   }
   if (document.getElementById("E85").checked) { // add suffix to model name based on fuel choice
      messageHeadElement.innerHTML += "E";
   } else if (document.getElementById("biodiesel").checked) {
      messageHeadElement.innerHTML = "B";
   } else {
      messageHeadElement.innerHTML += "D";  
   }
}

/* create event listeners for all input elements */
function createEventListeners() {
   acresBox.value = ""; // clear acres text box on page load
   monthsBox.value = ""; // clear months text box on page load

   if (acresBox.addEventListener) {
     acresBox.addEventListener("input", verifyAcres, false); 
   } else if (acresBox.attachEvent)  {
     acresBox.attachEvent("onchange", verifyAcres);
   }
   
   var cropsBox;
   for (var i = 0; i < 7; i++) {
      cropsBox = cropsFieldset.getElementsByTagName("input")[i];
      cropsBox.checked = false;      
      if (cropsBox.addEventListener) {
        cropsBox.addEventListener("click", verifyCrops, false); 
      } else if (cropsBox.attachEvent)  {
        cropsBox.attachEvent("onclick", verifyCrops);
      }
   }
   
   if (monthsBox.addEventListener) {
     monthsBox.addEventListener("input", verifyMonths, false); 
   } else if (monthsBox.attachEvent)  {
     monthsBox.attachEvent("onchange", verifyMonths);
   }

   var fuelBox;
   for (var i = 0; i < 3; i++) {
      fuelBox = fuelFieldset.getElementsByTagName("input")[i];
      fuelBox.checked = false;      
      if (fuelBox.addEventListener) {
        fuelBox.addEventListener("click", verifyFuel, false); 
      } else if (fuelBox.attachEvent)  {
        fuelBox.attachEvent("onclick", verifyFuel);
      }
   }
}

/* create event listeners when page finishes loading */
if (window.addEventListener) {
   window.addEventListener("load", createEventListeners, false);
} else if (window.attachEvent) {
   window.attachEvent("onload", createEventListeners);
}