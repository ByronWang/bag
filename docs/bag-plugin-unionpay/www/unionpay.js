
var argscheck = require('cordova/argscheck'),
    utils = require('cordova/utils'),
    exec = require('cordova/exec');
   
var Unionpay = function() {
};

Unionpay.pay = function(tn, successFunction, failFunction) {
    exec(successFunction, failFunction, "Unionpay", "pay", [tn, "00"]);
};

Unionpay.payForTest = function(tn, successFunction, failFunction) {
    exec(successFunction, failFunction, "Unionpay", "pay", [tn, "01"]);
};

module.exports = Unionpay;



