angular.module('starter.controllers', [])

.controller('GlobalCtrl', function($scope,$ionicModal,LoginUser,Cart) {
	$scope.user = LoginUser.get();
	$scope.cart = Cart;
	$scope.editCart = function(){
		$scope.cart.edit($scope);
	};
	
})

.controller('DashCtrl', function($scope, $ionicSlideBoxDelegate,Category,$ionicModal) {
	$scope.category = Category.level1();
	$scope.search = function(){
		  $ionicModal.fromTemplateUrl('templates/modal-search.html', {
		    scope: $scope,
		    animation: 'slide-in-up'
		  }).then(function(modal) {
		    $scope.modal = modal;
		    $scope.modal.show();
		  });
		
		  $scope.openModal = function() {
		    $scope.modal.show();
		  };
		  
		  $scope.closeModal = function() {	    			  
		    $scope.modal.hide();
		  };	
	};

	$scope.onScroll = function(){
		$ionicSlideBoxDelegate.$getByHandle('band').stop();
	}
	$scope.onScrollComplete = function(){
		$ionicSlideBoxDelegate.$getByHandle('band').start();
	}
})
.controller('SearchCtrl', function($scope,$state) {
	$scope.ok = function(){
		$scope.closeModal();
		$state.go('tab.products');
	};
	
	$scope.cancel = function(){
		$scope.closeModal();
	};
})
.controller('FilterCtrl', function($scope,$state) {
	$scope.ok = function(country){
		$scope.country = country;
		$scope.closeModal();
	};
	
	$scope.cancel = function(){
		$scope.closeModal();
	};
})
.controller('CartCtrl', function($scope, $ionicSlideBoxDelegate) {

})
.controller('LoginCtrl', function($scope, Users) {
	$scope.user= {};
	
	// for test
	$scope.user.username = "wangshilian";
	
	$scope.login = function() {
		var user = Users.get($scope.user.username);
		if(user){
	    	islogin = true;
	    	$scope.closeModal(user);
		}
	  };
})

.controller('InventorysCtrl', function($scope,$ionicModal, Inventorys) {
	$scope.country = "美国";
  $scope.inventorys = Inventorys.all();
	$scope.filter = function(){
		  $ionicModal.fromTemplateUrl('templates/modal-filter.html', {
		    scope: $scope,
		    animation: 'slide-in-up'
		  }).then(function(modal) {
		    $scope.modal = modal;
		    $scope.modal.show();
		  });
		
		  $scope.openModal = function() {
		    $scope.modal.show();
		  };
		  
		  $scope.closeModal = function() {	    			  
		    $scope.modal.hide();
		  };	
	};
})

.controller('tabsMenuCtrl', function($scope) {
  $scope.showThis = function(e){
	  var ele = angular.element(e);
	  ele.parent().find("a").removeClass("tab-item-active"); 
	  ele.addClass("tab-item-active");
  };
})

.controller('InventoryDetailCtrl', function($scope, $stateParams,$timeout,$ionicSlideBoxDelegate, Inventorys) {
  $scope.inventory = Inventorys.get($stateParams.inventoryId);
  $scope.activeItem  = $scope.inventory.Items[$stateParams.itemId];
  
  $scope.slideSize = function(){
	  return $scope.inventory.Items.length;
  };
  
  $scope.slideActiveSlide = function(){
	  var delegateInstance  = $ionicSlideBoxDelegate.$getByHandle('inventory');
	  if(delegateInstance){
		  return delegateInstance.currentIndex() + 1;
	  }else{
		  return 0;
	  }
  };  
  $timeout( function() {
      $scope.$broadcast('slideBox.setSlide', $stateParams.itemId);
  }, 300);
  
  $scope.slideHasChanged=function($index){
	  $scope.activeItem = $scope.inventory.Items[$index];
  };
})
.controller('OrdersCtrl', function($scope, Orders) {
  $scope.orders = Orders.all();
  
  //Load more after 1 second delay
  $scope.loadMoreItems = function() {
     $scope.$broadcast('scroll.infiniteScrollComplete');
  };
})

.controller('OrderDetailCtrl', function($scope, $stateParams,$ionicSlideBoxDelegate,$timeout, Orders) {
  $scope.order = Orders.get($stateParams.orderId);
  $scope.activeItem  = $scope.order.Items[$stateParams.itemId];
  
  
  $scope.fromStatusToIndex = function(status){
	  if(status>2){
		  return status-2;
	  }else{
		  return status-1;
	  }
  };
  
  $scope.$watch('statusActiveSlide',function(){
	  
  });
  
  $scope.statusSlide = function(e,to){
	  $ionicSlideBoxDelegate.$getByHandle("orderStatus").slide(to);
	  var ele = angular.element(e);
	  angular.forEach(ele.parent().parent().find("div"),function(i){
		  var ie =angular.element(i);
		 if(ie.hasClass("active"))ie.removeClass("active"); 
	  });
	  ele.addClass("active");
  };
  
  /*
  $scope.$curStatus = $scope.item.statusId;
  
  $scope.initSlide = function(){
	  if($scope.item.statusId>2){
		  return $scope.item.statusId-2;
	  }else{
		  return $scope.item.statusId-1;
	  }
  };
  $scope.$watch($scope.item.statusId,function(){
	  if($scope.item.statusId){
		  $timeout( function() {
		      $scope.$broadcast('slideBox.setSlide', $scope.initSlide());
		  }, 300);
	  };
  });
  

*/
  

  $scope.slideSize = function(){
	  return $scope.order.Items.length;
  };
  
  $scope.slideActiveSlide = function(){
	  var delegateInstance  = $ionicSlideBoxDelegate.$getByHandle('order');
	  if(delegateInstance){
		  return delegateInstance.currentIndex() + 1;
	  }else{
		  return 0;
	  }
  };  
  $timeout( function() {
      $scope.$broadcast('slideBox.setSlide', $stateParams.itemId);
  }, 300);
  
  $scope.slideHasChanged=function($index){
	  $scope.activeItem = $scope.order.Items[$index];
	  $scope.statusActiveSlide = $scope.fromStatusToIndex($scope.activeItem.statusId);
  };
})

.controller('ProductsCtrl', function($scope, Products) {
  $scope.products = Products.all();
})

.controller('ProductsCategoryCtrl', function($scope, $stateParams,Category,Products) {
  $scope.products = Products.byCategory($stateParams.categoryId);
  $scope.category = Category.get($stateParams.categoryId);
})

.controller('ProductDetailCtrl', function($scope, $stateParams, Products) {
  $scope.product = Products.get($stateParams.productId);
  $scope.selectThis = function(){
	  $scope.cart.add($scope.product);
	  return false;
  };
})


.controller('TestCtrl', function($scope, $http) {
	  $scope.items = [];
	  for (var i = 0; i < 20; i++) {
	    $scope.items.push(i);
	  }

	  //Load more after 1 second delay
	  $scope.loadMoreItems = function() {
	     var i = $scope.items.length;
	     var j = $scope.items.length + 5;
	     for (; i < j; i++) {
	       $scope.items.push('Item ' + i);
	     }
	     $scope.$broadcast('scroll.infiniteScrollComplete');
	  };
})

.controller('LoadingCtrl', function($http, $ionicLoading) {/*test*/
  var _this = this

  $http.jsonp('http://api.openbeerdatabase.com/v1/breweries.json?callback=JSON_CALLBACK').then(function(result) {
    _this.breweries = result.data.breweries
  })
})

.controller('AccountCtrl', function($scope,LoginUser) {
	setTimeout(function() {
		LoginUser.requireUser($scope,function(user){
			$scope.currentUser = user;
		});
	}, 0);
})
.controller('AccountSettingCtrl', function($scope,$ionicActionSheet,Camera,$timeout,LoginUser) {
	$scope.user = $scope.currentUser; 
	$scope.lastPhoto ="img/mcfly.jpg";

	$scope.getPhotoFromCamera = function() {
	    Camera.getPicture( {
		      sourceType : Camera.PictureSourceType.CAMERA,
		      correctOrientation: true,
		      quality: 50,
		      targetWidth: 320,
		      targetHeight: 320,
		      saveToPhotoAlbum: false
		    }).then(function(imageURI) {
	      console.log(imageURI);
	      $scope.lastPhoto = imageURI;
	    }, function(err) {
	      console.err(err);
	    });
	  };
  
	$scope.getPhotoFromLibrary = function() {
	    Camera.getPicture({
		      sourceType : Camera.PictureSourceType.PHOTOLIBRARY,
		      correctOrientation: true,
		      quality: 50,
		      targetWidth: 320,
		      targetHeight: 320,
		      saveToPhotoAlbum: false
		    }).then(function(imageURI) {
	      console.log(imageURI);
	      $scope.lastPhoto = imageURI;
	    }, function(err) {
	      console.err(err);
	    });
	  };
	  

		$scope.getPhotoFromAlbum = function() {
		    Camera.getPicture({
			      sourceType : Camera.PictureSourceType.SAVEDPHOTOALBUM,
			      correctOrientation: true,
			      quality: 50,
			      targetWidth: 320,
			      targetHeight: 320,
			      saveToPhotoAlbum: false
			    }).then(function(imageURI) {
		      console.log(imageURI);
		      $scope.lastPhoto = imageURI;
		    }, function(err) {
		      console.err(err);
		    });
		  };
		  

	
	 // Triggered on a button click, or some other target
	 $scope.editAvatar= function() {

	   // Show the action sheet
	   var hideSheet = $ionicActionSheet.show({
	     buttons: [
	       { text: '拍照' },
	       { text: '从手机相册选择' }
	     ],
	     titleText: '更改头像',
	     cancelText: '取消',
	     cancel: function() {
	          // add cancel code..
	        },
	     buttonClicked: function(index) {
	    	if(index==0){
	    		 $scope.getPhotoFromCamera();	  
	    	 }else if(index==1){
	    		 $scope.getPhotoFromLibrary();    		 
	    	 }
	       return true;
	     }
	   });
	   
	   // For example's sake, hide the sheet after two seconds
	   $timeout(function() {
	     hideSheet();
	   }, 2000);

	 };
})
;



