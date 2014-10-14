angular.module('starter.filter', []).filter('URI', function(Host) {
	return function(path,type) {
		var realPath;
		if (path) {
			if (path.indexOf("file://") >= 0 || path.indexOf("http://") >= 0 || path.indexOf("https://") >= 0) {
				realPath= path;
			} else if(path.indexOf("uploads")>=0){
				realPath= Host.host + path;
			}else{
				realPath= path;
			}
		} else {
			if("product" == type){
				realPath= "img/product-default.png";						
			}else if("avatar" == type){
				realPath= "img/avatar-default.jpg";		
			}else if("invoice" == type){
				realPath= "img/invoice-default.jpg";	
			}else if("productActual" == type){		
				realPath= "img/productActual-default.jpg";	
			}else{
				realPath= "img/avatar-default.jpg";					
			}
		}
		return realPath;
	};
}).filter('percent', function() {
	return function(value) {		
		return (value * 100) + '%';
	};
});
