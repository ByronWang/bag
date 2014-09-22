angular.module('starter.controllers', [])

.controller('GlobalCtrl', function($scope,$ionicModal,LoginUser,Cart) {
	$scope.currentUser = LoginUser;
	$scope.cart = Cart;
	$scope.editCart = function(){
		$scope.cart.edit($scope);
	};
	$scope.host = "http://localhost:8686/";
})

.controller('DashCtrl', function($scope, $ionicSlideBoxDelegate,Category,$ionicModal) {
	$scope.category = Category.level1Grouped();
	$scope.search = function(){
		  $ionicModal.fromTemplateUrl('templates/modal-search.html', {
		    scope: $scope,
		    animation: 'slide-left-right'
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

.controller('CartCtrl', function($scope,$ionicModal, Orders,DeliveryMethods,Address) {
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
	

	$scope.popupProvinces = function(){
		  
		  $ionicModal.fromTemplateUrl('templates/modal-provinces.html', {
		    scope: $scope,
		    animation: 'slide-left-right'
		  }).then(function(modal) {
		    $scope.modal = modal;
		    $scope.modal.show();
		  });
		  	
		  $scope.ret = function(item) {
			  if(!$scope.order.address){$scope.order.address={};}
			  
				angular.extend($scope.order.address,item);
		  };

		  $scope.closeModal = function() {	    			  
			  	$scope.modal.hide();
		    	$scope.modal.remove();
		    	$scope.datalist = undefined;
		  };	
		  
	};
	
	$scope.neworder = function(){
		  $ionicModal.fromTemplateUrl('templates/modal-order-new.html', {
		    scope: $scope,
		    animation: 'slide-left-right'
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
	    	$scope.$parent.closeModal();
		}
	  };
})

.controller('InventorysCtrl', function($scope,$ionicModal, Inventorys) {
	$scope.country = "";
	$scope.inventorys = Inventorys.all();
	$scope.filter = function(){
		  $ionicModal.fromTemplateUrl('templates/modal-filter.html', {
		    scope: $scope,
		    animation: 'slide-left-right'
		  }).then(function(modal) {
		    $scope.modal = modal;
		    $scope.modalFilter.show();
		  });
		
		  $scope.openModal = function() {
		    $scope.modalFilter.show();
		  };
		  
		  $scope.closeModal = function() {	    			  
		    $scope.modalFilter.hide();
		  };	
	};
	
	$scope.changeCountry = function(c){
		$scope.country = c;
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

.controller('OrderInListCtrl', function($scope, Orders) {
  $scope.realOrder =Orders.get({ id:$scope.$parent.order.ID});
  
  //Load more after 1 second delay
  $scope.loadMoreItems = function() {
     $scope.$broadcast('scroll.infiniteScrollComplete');
  };
})

.controller('OrdersCustomerCtrl', function($scope, Orders) {
  $scope.orders = Orders.query();
  
  //Load more after 1 second delay
  $scope.loadMoreItems = function() {
     $scope.$broadcast('scroll.infiniteScrollComplete');
  };
})


.controller('OrdersPurchaserCtrl', function($scope, Orders) {
  $scope.orders = Orders.query();
  
  //Load more after 1 second delay
  $scope.loadMoreItems = function() {
     $scope.$broadcast('scroll.infiniteScrollComplete');
  };
})

.controller('NewProductCtrl', function($scope, $ionicActionSheet,$ionicModal, $timeout,Products,Camera,Orders,DeliveryMethods,Countries,Category) {
	$scope.product = {};
	$scope.categories = Category.level1();
	$scope.item = {
    		Amount:1
    };
	
	$scope.categoryInEdit=true;
	
	$scope.product.ProductDetailKind ="";
	
	$scope.selectCat =function(cat){
		var cs = Category.children(cat.id);
		if(cs.length>0){
			$scope.categories = cs;
			if($scope.product.ProductDetailKind != ""){
				$scope.product.ProductDetailKind = $scope.product.ProductDetailKind + " > " + cat.name;				
			}else{
				$scope.product.ProductDetailKind = cat.name;
			}
			if(!$scope.product.ProductKind){
				$scope.product.ProductKind = cat.name;				
			}
		}else{
			$scope.categoryInEdit=false;
			if(!$scope.product.ProductKind){
				$scope.product.ProductKind = cat.name;				
			}
			
			if($scope.product.ProductDetailKind!=""){
				$scope.product.ProductDetailKind = $scope.product.ProductDetailKind + " > " + cat.name;				
			}else{
				$scope.product.ProductDetailKind = cat.name;
			}
		}
	};

	$scope.product.Image ="img/mcfly.jpg";

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
	      $scope.product.lastPhoto = imageURI;
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
		    	
	      $scope.product.lastPhoto = imageURI;
	      
	    }, function(err) {
	      console.err(err);
	    });
	  };
	  
		$scope.popupCountries = function(){
			  $scope.datalist = Countries.all();
			  
			  $ionicModal.fromTemplateUrl('templates/modal-select.html', {
			    scope: $scope,
			    animation: 'slide-left-right'
			  }).then(function(modal) {
			    $scope.modal = modal;
			    $scope.modal.show();
			  });
			  	
			  $scope.ret = function(item) {
					$scope.product.Country =item.name;
			  };
			  			  
			  $scope.closeModal = function() {	    			  
				  	$scope.modal.hide();
			    	$scope.modal.remove();
			    	$scope.datalist = undefined;
			  };	
			  
		};
		var encode = function(o){
			var es = "";
			angular.forEach(o,function(v,k){
				es = es + k + ":" + v +";";
			});
			
			if(es.length>0){
				es = es.substr(0,es.length-1);
			}
			return es;
			
		};
		
	$scope.step = 1;
	$scope.submit = function(){
		$scope.product.Extends = encode($scope.product.Extends);
	    var post = new Products($scope.product);
	    post.$save();
	    
	    $scope.item.Product = $scope.product;
		 $scope.cart.add($scope.item);
		 $scope.$parent.closeModal();
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
  $scope.products = Products.query();
})

.controller('ProductDetailCtrl', function($scope, $stateParams, Products) {
  $scope.product = Products.get($stateParams);
  $scope.selectThis = function(){
	  var item = {};
	  item.Product = $scope.product;
	  item.Amount = 1;
	  $scope.cart.add(item);
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


.controller('FilterCtrl', function($scope,$state,Countries) {
	$scope.countries = Countries.all();
	
	$scope.ok = function(country){
		$scope.changeCountry(country);
		$scope.$parent.closeModal();
	};
	
	$scope.cancel = function(){
		$scope.$parent.closeModal();
	};
})

.controller('SelectCtrl', function($scope,$state) {	
	$scope.ok = function(item){
		$scope.$parent.ret(item);
		$scope.$parent.closeModal();
	};
	
	$scope.cancel = function(){
		$scope.$parent.closeModal();
	};
})


.controller('SearchCtrl', function($scope,$state) {
	$scope.ok = function(){
		$scope.$parent.closeModal();
		$state.go('tab.products');
	};
	
	$scope.cancel = function(){
		$scope.$parent.closeModal();
	};
})

.controller('ProvincesCtrl', function($scope,$state,Address) {	
	$scope.provinces = Address.provinces();
	
	$scope.address = {};

	$scope.step = 'province';
	$scope.selectProvince = function(c){
		$scope.address.province = c.name;
		$scope.province = c;
		$scope.step = 'city';
	};
	$scope.selectCity= function(c){
		$scope.address.city = c.name;
		$scope.city = c;
		$scope.step = 'area';
	};
	$scope.selectArea = function(c){
		$scope.address.area = c.name;
		$scope.$parent.ret($scope.address);
		$scope.$parent.closeModal();
	};
})


.controller('ProductsCategoryCtrl', function($scope, $stateParams,Category,Products) {
  $scope.products = Products.query($stateParams);
  $scope.category = Category.get($stateParams.categoryId);
})

;



