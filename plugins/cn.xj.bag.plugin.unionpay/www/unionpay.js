
var argscheck = require('cordova/argscheck'),
    utils = require('cordova/utils'),
    exec = require('cordova/exec');
   
var Unionpay = function() {
};

Unionpay.pay = function(tn) {
    exec(null, null, "Unionpay", "pay", [tn]);
};

module.exports = Unionpay;



