angular.module('starter.filter', []).filter('URI', function(Host) {
	return function(path) {
		if (path.indexOf("file://") >= 0 || path.indexOf("http://") >= 0 || path.indexOf("https://") >= 0) {
			return path;
		} else {
			return Host.host + path;
		}
	};
});
