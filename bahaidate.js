/*
 * BahaiDate is a JavaScript library for converting between the Gregorian and
 * the Baha'i (Badi) calendars. It also provides events in the Baha'i calendar.
 * https://github.com/lessan/bahai-date-js
 */

(function () { 'use strict';

// -----------------------------------------------

// comment
var result = true;

// comment
function myFunction() {
  return result;
}


// -----------------------------------------------

var BahaiDate = {};

BahaiDate.method = function() {

  return myFunction();

};

// -----------------------------------------------

// export as AMD module / Node module / browser variable
if (typeof define === 'function' && define.amd) define(BahaiDate);
else if (typeof module !== 'undefined') module.exports = BahaiDate;
else window.BahaiDate = BahaiDate;

}());
