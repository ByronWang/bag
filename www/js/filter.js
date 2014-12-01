angular.module('starter.filter', []).filter('URI', function(Host) {
	return function(path, type) {
		var realPath;
		if (path) {
			if (path.indexOf("file://") >= 0 || path.indexOf("http://") >= 0 || path.indexOf("https://") >= 0) {
				realPath = path;
			} else if (path.indexOf("uploads") >= 0) {
				realPath = Host.host + path;
			} else {
				realPath = path;
			}
		} else {
			if ("product" == type) {
				realPath = "img/product-default.png";
			} else if ("avatar" == type) {
				realPath = "img/avatar-default.jpg";
			} else if ("invoice" == type) {
				realPath = "img/invoice-default.jpg";
			} else if ("productActual" == type) {
				realPath = "img/productActual-default.jpg";
			} else {
				realPath = "img/avatar-default.jpg";
			}
		}
		return realPath;
	};
}).filter('percent', function() {
	return function(value) {
		return value + '%';
	};
	
}).filter('currency', function() {
	return function(value) {
		if(value && value!=""){
			return Math.floor(value*100)/100;
		}else{
			return "0";
		}
	};
}).filter('amount', function() {
	return function(value) {
		if(value && value!=""){
			return value + "";
		}else{
			return "0";
		}
	};
}).filter('hours', function() {
	return function(value) {
		if(value && value!=""){
			var days = Math.floor(value / 24);
			var day_hours = value % 24;
			if(days > 0){
				return days + "天" +day_hours + "小时";
			}else{
				return day_hours + "小时";			
			}
		}else{
			return "-";
		}
	};
});


