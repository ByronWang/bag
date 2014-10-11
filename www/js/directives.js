angular.module('starter.directives', []).directive('ngExts', [ '$http', '$controller', '$resource', function($http) {
	return {
		link : function(scope, element, attr, ctrl) {
			scope.$watch(function() {
				return scope.$eval(attr.ngExts);
			}, function() {
				scope.exts = scope.$eval(attr.ngExts);
			});
		}
	};
} ]);