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
} ]).directive('bgPriceHint', [ '$controller', function() {
	return {
		link : function(scope, element, attr, ctrl) {
			scope.$watch(function() {
				return scope.$eval(attr.bgPriceHint) - scope.$eval(attr.priceFrom);
			}, function() {
				var result = scope.$eval(attr.bgPriceHint) - scope.$eval(attr.priceFrom);
				if (result > 0)
					element.html('<i class="ion-arrow-up-a">&nbsp;</i>' + result + ' 元');
				else if (result < 0)
					element.html('<i class="ion-arrow-down-a">&nbsp;</i>' + result + ' 元');
				else
					element.html('' + result + ' 元');
			});
		}
	};
} ]).directive('bigImage', [ '$controller', 'Popup', function($controller, Popup) {
	return {
		link : function(scope, element, attr, ctrl) {
			element.on("click", function(event) {
				scope.imageUrl = attr.ngSrc;
				scope.title = scope.$eval(attr.bigImage);
				Popup.show(scope, "templates/modal-image.html");
			});
		}
	};
} ]);
