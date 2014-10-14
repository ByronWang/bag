angular.module('starter.filter', []).filter('URI', function(Host) {
	return function(path) {
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
			realPath= "img/avatar-default.jpg";
		}
		return realPath;
	};
}).filter('percent', function() {
	return function(value) {		
		return (value * 100) + '%';
	};
});
