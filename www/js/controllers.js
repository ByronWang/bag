angular.module('starter.controllers', [])

.controller('GlobalCtrl', function($scope,$ionicModal,LoginUser,Cart) {
	$scope.currentUser = LoginUser;
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
	
	$scope.neworder = function(){
		
		  $ionicModal.fromTemplateUrl('templates/modal-order-new.html', {
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
.controller('CartCtrl', function($scope,$ionicModal, Orders,DeliveryMethods) {
	$scope.step = 1;
	$scope.deliveryMethods = DeliveryMethods.all();
	$scope.order = { Items:[]};
	$scope.Items = [];
	$scope.country = {};
	$scope.next = function(){
		angular.forEach($scope.cart.Countrys,function(c){
			angular.forEach(c.Items,function(i){
				if(i.checked){
					$scope.Items.push(i);
					$scope.country = c;
				}
			});
		});
		$scope.order.country = $scope.country.name;
		$scope.order.Items = $scope.Items;
		$scope.step = 2;
	}
	$scope.checked = function(item){
		item.checked = !item.checked;
	}
	$scope.pay = function(){
		angular.forEach($scope.cart.Countrys,function(c){
			var newitems = [];
			angular.forEach(c.Items,function(i){
				if(!i.checked){
					newitems.push(i);
				}
			});
			c.Items = newitems;
		});
		Orders.add($scope.order);
		$scope.step = 1;
	};
	
	$scope.neworder = function(){
		  $ionicModal.fromTemplateUrl('templates/modal-order-new.html', {
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
.controller('LoginCtrl', function($scope, Users) {
	$scope.user= {};
	
	// for test
	$scope.user.username = "wangshilian";
	$scope.login = function() {
		if($scope.currentUser.login($scope.user.username,$scope.user.pwssword)){
	    	$scope.closeModal();
		}
	  };
})

.controller('InventorysCtrl', function($scope,$ionicModal, Inventorys) {
	$scope.country = "";
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
	
	$scope.changeCountry = function(c){
		$scope.country = c;
	};
})

.controller('FilterCtrl', function($scope,$state,Countries) {
	$scope.countries = Countries.all();
	
	$scope.ok = function(country){
		$scope.changeCountry(country);
		$scope.closeModal();
	};
	
	$scope.cancel = function(){
		$scope.closeModal();
	};
})

.controller('tabsMenuCtrl', function($scope) {
  $scope.showThis = function(e){
	  var ele = angular.element(e);
	  ele.parent().find("a").removeClass("tab-item-active"); 
	  ele.addClass("tab-item-active");
  };
})

.controller('InventoryDetailCtrl', function($scope,$state, $stateParams,$timeout,DeliveryMethods,$ionicSlideBoxDelegate, Inventorys) {
	$scope.step = 1;
	$scope.suitor = {suitor: $scope.currentUser.username};
	$scope.deliveryMethods = DeliveryMethods.all();
	$scope.selDeliveryMethod = function(method){
		$scope.step = 1;
		$scope.suitor.deliveryMethod = method.name;
	};
	
	$scope.showDeliveryMethods = function(){
		$scope.step = 2;		
	};
	
  $scope.inventory = Inventorys.get($stateParams.inventoryId);
  $scope.item  = $scope.inventory.Items[$stateParams.itemId];
  
  $scope.submit = function(){
	  $scope.step =  3;
	  $scope.item.suitors.push($scope.suitor);
	 /*$state.go("tab.order-detail-p",{
		  orderId:$scope.inventory.id,
	  	  itemId:$scope.item.id
	  });*/  
  };
  
})
.controller('OrdersCtrl', function($scope, Orders) {
  $scope.orders = Orders.all();
  
  //Load more after 1 second delay
  $scope.loadMoreItems = function() {
     $scope.$broadcast('scroll.infiniteScrollComplete');
  };
})

.controller('NewOrderCtrl', function($scope, $ionicActionSheet,Camera,Orders,DeliveryMethods,Countries,Category) {
	$scope.order = {};
	$scope.category = Category.level1();
	$scope.editCategory=true;
	$scope.countries = Countries.all();
	$scope.deliveryMethods = DeliveryMethods.all();
	
	
	$scope.order.categoryList ="";
	
	$scope.selectCat =function(cat){
		var cs = Category.children(cat.id);
		if(cs.length>0){
			$scope.category = cs;
			if($scope.order.categoryList != ""){
				$scope.order.categoryList = $scope.order.categoryList + " > " + cat.name;				
			}else{
				$scope.order.categoryList = cat.name;
			}
		}else{
			$scope.editCategory=false;
			$scope.order.category = cat.name;
			
			if($scope.order.categoryList!=""){
				$scope.order.categoryList = $scope.order.categoryList + " > " + cat.name;				
			}else{
				$scope.order.categoryList = cat.name;
			}
		}
	};

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
	 $scope.editProductAvatar= function() {

	   // Show the action sheet
	   var hideSheet = $ionicActionSheet.show({
	     buttons: [
	       { text: '拍照' },
	       { text: '从手机相册选择' }
	     ],
	     titleText: '更改产品简介',
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

	$scope.step = 1;
	$scope.addToCart = function(){
		 $scope.cart.add($scope.order);
		 $scope.closeModal();		
	};
	$scope.checkout = function(){
		$scope.step = 2;
		
	};
	 $scope.pay = function(){
		 $scope.closeModal();
	 };
	 
})

.controller('OrderCustomerDetailCtrl', function($scope, $state,$stateParams,$ionicSlideBoxDelegate,$timeout, Orders) {
	  $scope.order = Orders.get($stateParams.orderId);
	  $scope.item  = Orders.getItem($stateParams.orderId,$stateParams.itemId);
  
  
  $scope.fromStatusToIndex = function(status){
	  if(status>2){
		  return status-2;
	  }else{
		  return status-1;
	  }
  };
  
  $scope.statusSlide = function(e,to){
	  $ionicSlideBoxDelegate.$getByHandle("orderStatus").slide(to);
	  var ele = angular.element(e);
	  angular.forEach(ele.parent().parent().find("div"),function(i){
		  var ie =angular.element(i);
		 if(ie.hasClass("active"))ie.removeClass("active"); 
	  });
	  ele.addClass("active");
  };
  
  $scope.statusActiveSlide = $scope.fromStatusToIndex($scope.item.current.statusId);

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
  $scope.bitSucceed = function(suitor){	  
	  Orders.done($scope.item,Orders.StatusType.purchasing,'bitSucceed',suitor);
	  
	  $scope.statusActiveSlide = $scope.fromStatusToIndex($scope.item.current.statusId);
	  $state.reload();
  };
  
  $scope.cancelOrder = function(){
	  Orders.done($scope.item,Orders.StatusType.completed,'cancelOrder',{});
	  
	  $scope.statusActiveSlide = $scope.fromStatusToIndex($scope.item.current.statusId);
	  $state.reload();
  };
  
  $scope.confirmDelivering= function(){
	  Orders.done($scope.item,Orders.StatusType.completed,'delivered',{});
	  
	  $scope.statusActiveSlide = $scope.fromStatusToIndex($scope.item.current.statusId);
	  $state.reload();
  };
})


.controller('OrderPurchaserDetailCtrl', function($scope, $state,$stateParams,$ionicSlideBoxDelegate,$timeout, Orders) {
  $scope.order = Orders.get($stateParams.orderId);
  $scope.item  = Orders.getItem($stateParams.orderId,$stateParams.itemId);
  
  
  $scope.fromStatusToIndex = function(status){
	  if(status>2){
		  return status-2;
	  }else{
		  return status-1;
	  }
  };
  
  $scope.statusSlide = function(e,to){
	  $ionicSlideBoxDelegate.$getByHandle("orderStatus").slide(to);
	  var ele = angular.element(e);
	  angular.forEach(ele.parent().parent().find("div"),function(i){
		  var ie =angular.element(i);
		 if(ie.hasClass("active"))ie.removeClass("active"); 
	  });
	  ele.addClass("active");
  };

  $scope.statusActiveSlide = $scope.fromStatusToIndex($scope.item.current.statusId);

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

  
  $scope.beginPurchasing = function(){
	  Orders.done($scope.item,Orders.StatusType.purchasing,'purchasing',{});
	  
	  $scope.statusActiveSlide = $scope.fromStatusToIndex($scope.item.current.statusId);
	  $state.reload();
  };
  
  $scope.finishPurchasing = function(){
	  Orders.done($scope.item,Orders.StatusType.delivering,'purchased',{});
	  
	  $scope.statusActiveSlide = $scope.fromStatusToIndex($scope.item.current.statusId);
	  $state.reload();
  };
  

  $scope.startDelivering = function(){
	  Orders.done($scope.item,Orders.StatusType.delivering,'delivering',$scope.action);
	  
	  $scope.statusActiveSlide = $scope.fromStatusToIndex($scope.item.current.statusId);
	  $state.reload();
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

.controller('AccountCtrl', function($scope) {
	$scope.currentUser.needLogin($scope);
})
.controller('AccountInfoCtrl', function($scope,$state) {
	$scope.logoff = function(){
		$scope.currentUser.logoff();
		$state.go('tab.dash');
	};
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



