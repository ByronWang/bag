Date.prototype.Format = function (fmt) { //author: meizz 
    var o = {
        "M+": this.getMonth() + 1, //月份 
        "d+": this.getDate(), //日 
        "h+": this.getHours(), //小时 
        "m+": this.getMinutes(), //分 
        "s+": this.getSeconds(), //秒 
        "q+": Math.floor((this.getMonth() + 3) / 3), //季度 
        "S": this.getMilliseconds() //毫秒 
    };
    if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
    for (var k in o)
    if (new RegExp("(" + k + ")").test(fmt)) fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
    return fmt;
};

angular.module('starter.controllers', []).controller('GlobalCtrl', function($scope, LoginUser, Cart, Host, $q) {
	$scope.currentUser = LoginUser;
	$scope.cart = Cart;
	$scope.editCart = function() {
		$scope.cart.edit($scope);
	};
	$scope.host = Host.host;
	$scope.setHost = function(host) {
		if (host && host.length > 1) {
			$scope.host = host;
			Host.setHost(host);
		}
	};
}).controller('TabsCtrl', function($scope, $ionicTabsDelegate,$state,LoginUser,Popup) {
	var navs = ['','cart','inventorys','orders.customer','account'];
	$scope.makeSureLogin = function(index){
		LoginUser.needLogin($scope.$new(),function(){
			$ionicTabsDelegate.$getByHandle('rootTabs').select(index);
			$state.go(navs[index]);
		});
	};

}).controller('LoginCtrl', function($scope, Users,Popup) {
	$scope.users = Users.query();
	$scope.user = {};
	$scope.user.host = $scope.$parent.host;

	// for test
	$scope.user.Name = "wangshilian";
	$scope.login = function() {
		$scope.$parent.setHost($scope.user.host);
		$scope.currentUser.login($scope.user.Name, $scope.user.Password, function(user) {
			if (user) {
				$scope.$parent.closeModal(user);
			}
		});
	};
	$scope.showSignup = function() {
		Popup.show($scope, 'templates/modal-signup.html',function(user){
			$scope.users = Users.query(function(){
				$scope.user.Name = user.Name;				
			});
		});
	};
}).controller('SignupCtrl', function($scope, Users,Popup) {
	$scope.user = {};

	$scope.signup = function() {		
		var User = new Users($scope.user);
		User.$save(function() {
			$scope.$parent.closeModal($scope.user);
		});
	};
	$scope.showPurchaserLagel = function(){
		Popup.show($scope, 'templates/modal-purchaser-lagel.html')
	};
}).controller('DashCtrl', function($scope, $ionicSlideBoxDelegate, Category, Popup) {
	$scope.rectHeight = document.body.clientWidth / 3;
	$scope.category = Category.level1Grouped();
	$scope.search = function() {
		Popup.show($scope, 'templates/modal-search.html');
	};
}).controller('ProductsCategoryCtrl', function($scope, $state, $stateParams, Popup, Category, Products) {
	$scope.products = Products.query($stateParams);
	$scope.category = Category.get($stateParams.CategoryLevel1);
	$scope.showDetail = function(product) {
		$scope.product = product;
		Popup.show($scope, 'templates/modal-product-detail.html');
	};
	$scope.back = function() {
		$state.go("dash");
	};

}).controller('ProductDetailCtrl', function($scope, $stateParams, Products, Exts, LoginUser,Category) {
	$scope.product = Products.get({
		productId : $scope.$parent.product.ID
	}, function() {
		$scope.product.Exts = Exts.decode($scope.product.Extends);
		$scope.product.Extends = undefined;
		$scope.product.CategoryDesc = Category.get($scope.product.CategoryID).Desc;
	});
	
	$scope.selectThis = function() {
		LoginUser.needLogin($scope.$new(),function(){
			var item = {};
			item.Product = $scope.product;
			item.Quantity = 1;
			$scope.cart.add(item);
			$scope.closeModal();
		});
		
		return false;
	};
}).controller('CartCtrl', function($scope, Popup, Exts) {

	$scope.next = function() {
		var items = [];

		angular.forEach($scope.cart.Countrys, function(c) {
			angular.forEach(c.Items, function(i) {
				if (i.checked) {
					items.push(i);
					$scope.country = c;
				}
			});
		});

		var order = {};
		order.Items = items;
		$scope.popupOrder(order);
	};

	$scope.checked = function(item) {
		item.checked = !item.checked;
	};

	$scope.newProduct = function() {
		Popup.show($scope, 'templates/modal-new-product.html');
	};

	$scope.popupOrder = function(order) {
		$scope.order = order;
		Popup.show($scope, 'templates/modal-new-order.html');
	};

	$scope.refineCart = function() {
		angular.forEach($scope.cart.Countrys, function(c) {
			var newitems = [];
			angular.forEach(c.Items, function(i) {
				if (!i.checked) {
					newitems.push(i);
				}
			});
			c.Items = newitems;
		});
		$scope.cart.save();
	};
}).controller('NewProductCtrl',
		function($scope, $ionicActionSheet, Popup, $timeout, Products, Camera, Orders, Countries, Category, Exts) {
			$scope.product = {};
			$scope.categories = Category.level1();
			$scope.item = {
				Quantity : 1
			};

			$scope.categoryInEdit = true;

			$scope.product.CategoryDesc = "";

			$scope.selectCat = function(cat) {
				var cs = Category.children(cat.ID);
				if (cs.length > 0) {
					$scope.categories = cs;
					if ($scope.product.CategoryDesc != "") {
						$scope.product.CategoryDesc = $scope.product.CategoryDesc + " > " + cat.Name;
					} else {
						$scope.product.CategoryDesc = cat.Name;
					}
					if (!$scope.product.CategoryLevel1ID) {
						$scope.product.CategoryLevel1ID = cat.ID;
						$scope.product.CategoryLevel1Name = cat.Name;
					}
				} else {
					$scope.categoryInEdit = false;
					if (!$scope.product.CategoryID) {
						$scope.product.CategoryID = cat.ID;
						$scope.product.CategoryName = cat.Name;
					}

					if ($scope.product.CategoryDesc != "") {
						$scope.product.CategoryDesc = $scope.product.CategoryDesc + " > " + cat.Name;
					} else {
						$scope.product.CategoryDesc = cat.Name;
					}
				}
			};

			$scope.product.Image = "img/mcfly.jpg";

			$scope.getPhoto = function(sourceType) {
				$scope.product.ImagePromise = Camera.getPicture({
					sourceType : sourceType,
					correctOrientation : true,
					quality : 50,
					targetWidth : 320,
					targetHeight : 320,
					saveToPhotoAlbum : false
				});

				$scope.product.ImagePromise.then(function(imageURI) {
					$scope.product.Image = imageURI;
				}, function(err) {
					console.err(err);
				});
			};

			$scope.getPhotoFromCamera = function() {
				$scope.getPhoto(Camera.PictureSourceType.CAMERA);
			};

			$scope.getPhotoFromLibrary = function() {
				$scope.getPhoto(Camera.PictureSourceType.PHOTOLIBRARY);
			};

			$scope.popupCountries = function() {
				$scope.datalist = Countries.query();
				Popup.show($scope, 'templates/modal-select.html');

				$scope.ret = function(item) {
					$scope.product.CountryID = item.ID;
					$scope.product.CountryName = item.Name;
				};
			};

			$scope.step = 1;
			$scope.submit = function() {
//				$scope.product.Extends = Exts.encode($scope.product.Exts);
//				$scope.product.Exts = undefined;

				$scope.item.Product = $scope.product;

				$scope.cart.add($scope.item);
				$scope.$parent.closeModal();
			};

            $scope.showCameraMenu = function() {
                $ionicActionSheet.show({
                    buttons: [
                        { text: '拍照' },
                        { text: '从相册选择' }
                    ],
                    cancelText: '取消',
                    cancel: function() {
                        // add cancel code..
                    },
                    buttonClicked: function(index) {
                        switch (index) {
                            case 0:
                                $scope.getPhotoFromCamera();
                                break;
                            case 1:
                                $scope.getPhotoFromLibrary();
                                break;
                        }
                        return true;
                    }
                });
            };
		}).controller('NewOrderCtrl', function($scope, Camera, $q, Popup, Orders, Address, Exts, Statuses, Actions) {
	$scope.Items = [];
	$scope.country = {};

	$scope.popupProvinces = function() {
		Popup.show($scope, 'templates/modal-provinces.html');
		$scope.ret = function(item) {
			if (!$scope.order.Address) {
				$scope.order.Address = {};
			}
			angular.extend($scope.order.Address, item);
		};
	};

	$scope.submit = function() {
		/*
		 * angular.forEach($scope.cart.Countrys,function(c){ var newitems = [];
		 * angular.forEach(c.Items,function(i){ if(!i.checked){
		 * newitems.push(i); } }); c.Items = newitems; });
		 */

		$scope.order.CustomerID = $scope.currentUser.ID;
		$scope.order.CustomerName = $scope.currentUser.Name;
		$scope.order.CustomerNickName = $scope.currentUser.NickName;
		$scope.order.CustomerImage = $scope.currentUser.Image;
		$scope.order.Datetime = new Date().Format("yyyy-MM-dd hh:mm:ss"); 
		
		var promiseArray = [];
		angular.forEach($scope.order.Items, function(newitem) {
			newitem.Product.Extends = Exts.encode(newitem.Product.Exts);
			newitem.Product.Exts = undefined;
			
			newitem.StatusID = Statuses.bid.ID;
			newitem.StatusName = Statuses.bid.Name;
			
			newitem.ActionID = Actions.sendout.ID;
			newitem.ActionName = Actions.sendout.Name;
			
			newitem.CustomerID = $scope.currentUser.ID;
			newitem.CustomerName = $scope.currentUser.Name;
			newitem.CustomerNickName = $scope.currentUser.NickName;
			newitem.CustomerImage = $scope.currentUser.Image;
			
			newitem.CountryID = newitem.Product.CountryID;
			newitem.CountryName = newitem.Product.CountryName;
			
			newitem.Datetime = $scope.order.Datetime;
			
			newitem.Address = $scope.order.Address;
			if (newitem.Product.ImagePromise) {
				var p = Camera.upload(newitem.Product.Image);
				p = p.then(function(result) {
					newitem.Product.Image = result.response;
				});
				promiseArray.push(p);
			}
		});
		$scope.order.CountryID = $scope.order.Items[0].CountryID;
		$scope.order.CountryName = $scope.order.Items[0].CountryName;

		var submitOrder = function() {
			var Order = new Orders($scope.order);
			Order.$save(function() {
				$scope.$parent.refineCart();
				$scope.$parent.closeModal();
			});
		};

		if (promiseArray.length > 0) {
			$q.all(promiseArray).then(function(results) {
				submitOrder();
			});
		} else {
			submitOrder();
		}

	};
}).controller('InventorysCtrl', function($scope, Popup, Inventorys) {
	$scope.countryName = "全部国家";
	$scope.inventorys = Inventorys.query({
		Status : 1
	});

	$scope.filter = function() {
		Popup.show($scope, 'templates/modal-filter.html');
		$scope.changeCountry = function(country){
			$scope.inventorys = Inventorys.query({
				Status : 1,
				Country: country.ID
			},function(){
				$scope.countryName = country.Name;	
			});
		};
	};

	$scope.showDetail = function(item) {
		$scope.item = item;
		Popup.show($scope, 'templates/modal-inventory-detail.html');
	};

	$scope.changeCountry = function(c) {
		$scope.countryID = c.ID;
		$scope.countryName = c.Name;
		$scope.Inventorys = Inventorys.query();
	};
}).controller('InventoryDetailCtrl',
		function($scope, $state, Category, Exts, OrderBiding, $timeout, $state, Popup, DeliveryMethod, Inventorys) {
			$scope.item = Inventorys.get({
				itemId : $scope.$parent.item.ID
			}, function() {
				$scope.item.Product.Exts = Exts.decode($scope.item.Product.Extends);
				$scope.item.Product.Extends = undefined;
				$scope.product  = $scope.item.Product;
				$scope.item.Product.CategoryDesc = Category.get($scope.item.Product.CategoryID).Desc;
				$scope.suitor = {
					PurchaserID : $scope.currentUser.ID, // TODO
					PurchaserName : $scope.currentUser.Name,
					PurchaserNickName : $scope.currentUser.NickName,
					PurchaserImage : $scope.currentUser.Image,
					OrderItemID : $scope.item.ID
				};
				$scope.loadBid();
			});
			$scope.step = 1;

			$scope.showDeliveryMethods = function() {
				$scope.datalist = DeliveryMethod.query();

				Popup.show($scope, 'templates/modal-select.html');

				$scope.ret = function(item) {
					$scope.suitor.DeliveryMethodID = item.ID;
					$scope.suitor.DeliveryMethodName = item.Name;
				};

			};

			$scope.loadBid = function() {
				$scope.bids = OrderBiding.query({
					OrderItem : $scope.suitor.OrderItemID,
					Purchaser : $scope.suitor.PurchaserID
				}, function() {
					if ($scope.bids.length > 0) {
						$scope.step = 3;
						$scope.suitor = $scope.bids[0];
					}

				});
			};

			$scope.submit = function() {
				var post = new OrderBiding($scope.suitor);
				post.$save(function() {
					$scope.loadBid();
				});
			};
}).controller('OrdersCtrl', function($scope) {
	$scope.chooseMe = function(e) {
		var ele = angular.element(e.target);
		ele.parent().find("a").removeClass("active");
		ele.addClass("active");
	};	
}).controller('OrderInListCtrl', function($scope, Orders) {
	$scope.realOrder = Orders.get({
		orderId : $scope.$parent.order.ID
	});	
}).controller('OrdersCustomerCtrl', function($scope, Orders, Popup) {
	$scope.orders = Orders.query({
		Customer : $scope.currentUser.ID
	});

	$scope.showDetail = function(item) {
		$scope.item = item;
		Popup.show($scope, 'templates/modal-order-detail-c.html');
	};

	// Load more after 1 second delay
	$scope.loadMoreItems = function() {
		$scope.$broadcast('scroll.infiniteScrollComplete');
	};
}).controller('OrdersPurchaserCtrl', function($scope, OrderBiding, Popup) {
	$scope.items = OrderBiding.query({
		Purchaser : $scope.currentUser.ID
	}, function() {
		var itemsFail = [];
		var itemsBiding = [];
		var itemsSucceed = [];

		angular.forEach($scope.items, function(item) {
			if (item.StatusID == 2) {
				itemsSucceed.push(item);
			} else if (item.StatusID == 3) {
				itemsFail.push(item);
			} else if (item.StatusID == 1) {
				itemsBiding.push(item);
			}
		});

		$scope.itemsFail = itemsFail;
		$scope.itemsBiding = itemsBiding;
		$scope.itemsSucceed = itemsSucceed;
	});

	$scope.showDetail = function(item) {
		$scope.item = item;
		Popup.show($scope, 'templates/modal-order-detail-p.html');
	};

	// Load more after 1 second delay
	$scope.loadMoreItems = function() {
		$scope.$broadcast('scroll.infiniteScrollComplete');
	};
}).controller(
		'OrderCustomerDetailCtrl',
		function($scope, OrderItems, OrderItemFlowByItem, OrderItemFlow, Statuses, Actions, OrderBiding, $state,
				$ionicSlideBoxDelegate, $timeout, Orders, Category, Exts,Unipay) {
			var $stateParams = {
				itemId : $scope.$parent.item.ID
			};

			$scope.item = OrderItems.get($stateParams, function() {
				loadFlow();
				$scope.item.Product.Exts = Exts.decode($scope.item.Product.Extends);
				$scope.item.Product.Extends = undefined;
				$scope.product  = $scope.item.Product;
				$scope.item.Product.CategoryDesc = Category.get($scope.item.Product.CategoryID).Desc;
			
			});

			$scope.Actions = Actions;

			var loadFlow = function() {
				$scope.flows = OrderItemFlowByItem.query($stateParams, function() {
					if ($scope.flows.length > 0) {
						$scope.current = $scope.flows[$scope.flows.length - 1];
						$scope.statusActiveSlide = $scope.current.StatusID - 1;
					} else {
						$scope.current = {
							StatusID : 1,
							ActionID : 1
						};
						$scope.statusActiveSlide = $scope.current.StatusID - 1;
						$scope.loadBid();
					}
				});
			};

			$scope.statusActiveSlide = 0;

			var flowStepOut = function(status, action, params) {
				var step = {};

				step.Extends = angular.copy($scope.current.Extends);
				step.Bid = angular.copy($scope.current.Bid);
				if (params) {
					step = angular.copy(params, step);
				}
				step.OrderItemID = $scope.item.ID;
				step.StatusID = status.ID;
				step.StatusName = status.Name;
				step.ActionID = action.ID;
				step.ActionName = action.Name;
				step.PaymentID = $scope.current.PaymentID;
				var post = new OrderItemFlow(step);
				post.$save(function() {
					loadFlow();
					$state.reload();
				});
			};

			$scope.loadBid = function() {
				$scope.bids = OrderBiding.query({
					OrderItem : $stateParams.itemId
				}, function() {
				});
			};

			$scope.statusSlide = function(e, to) {
				$ionicSlideBoxDelegate.$getByHandle("orderStatus").slide(to);
				var ele = angular.element(e);
				angular.forEach(ele.parent().parent().find("div"), function(i) {
					var ie = angular.element(i);
					if (ie.hasClass("active"))
						ie.removeClass("active");
				});
				ele.addClass("active");
			};

			$scope.bitSucceed = function(suitor) {

				var params = {
					Bid : {
						"ID" : suitor.ID,
						"OrderItemID" : suitor.OrderItemID,
						"PurchaserID" : suitor.PurchaserID,
						"PurchaserName" : suitor.PurchaserName,
						"PurchaserNickName" : suitor.PurchaserNickName,
						"PurchaserImage" : suitor.PurchaserImage,
						"Commission" : suitor.Commission,
						"SuggestedPrice" : suitor.SuggestedPrice,
						"DeliveryCost" : suitor.DeliveryCost,
						"DeliveryMethodID" : suitor.DeliveryMethodID,
						"DeliveryMethodName" : suitor.DeliveryMethodName
					}
				};

				flowStepOut(Statuses.purchasing, Actions.bitSucceed, params);
			};

			$scope.pay = function() {				
				Unipay.pay($scope.current.TradeNo).then(function(){
					flowStepOut(Statuses.bid, Actions.payFinished);					
				});				
			};
			
			$scope.cancelOrder = function() {
				flowStepOut(Statuses.completed, Actions.cancelOrder);
			};

			$scope.confirmDelivering = function() {
				flowStepOut(Statuses.completed, Actions.delivered);
			};
		}).controller(
		'OrderPurchaserDetailCtrl',
		function($scope, OrderItems, OrderItemFlowByItem, OrderItemFlow, Statuses, Actions, OrderBiding, $state,
				$stateParams, $ionicSlideBoxDelegate, $timeout, Orders, Category, Exts,$ionicActionSheet,Camera) {
			var $stateParams = {
				itemId : $scope.$parent.item.ID
			};

			$scope.item = OrderItems.get($stateParams, function() {
				loadFlow();
				$scope.item.Product.Exts = Exts.decode($scope.item.Product.Extends);
				$scope.item.Product.Extends = undefined;
				$scope.product  = $scope.item.Product;
				$scope.item.Product.CategoryDesc = Category.get($scope.item.Product.CategoryID).Desc;
			});

			$scope.Actions = Actions;

			var loadFlow = function() {
				$scope.flows = OrderItemFlowByItem.query($stateParams, function() {
					if ($scope.flows.length > 0) {
						$scope.current = $scope.flows[$scope.flows.length - 1];
						$scope.statusActiveSlide = $scope.current.StatusID - 1;
					} else {
						$scope.current = {
							StatusID : 1
						};
						$scope.statusActiveSlide = $scope.current.StatusID - 1;
						$scope.loadBid();
					}
				});
			};

			$scope.statusActiveSlide = 0;

			var flowStepOut = function(status, action, params) {
				var step = {};

				step.Extends = angular.copy($scope.current.Extends);
				step.Bid = angular.copy($scope.current.Bid);
				if (params) {
					step = angular.copy(params, step);
				}
				step.OrderItemID = $scope.item.ID;
				step.StatusID = status.ID;
				step.StatusName = status.Name;
				step.ActionID = action.ID;
				step.ActionName = action.Name;
				step.PaymentID = $scope.current.PaymentID;
				var post = new OrderItemFlow(step);
				post.$save(function() {
					loadFlow();
					$state.reload();
				});
			};

			$scope.loadBid = function() {
				$scope.bids = OrderBiding.query({
					OrderItem : $stateParams.itemId
				}, function() {
				});
			};

			$scope.statusSlide = function(e, to) {
				$ionicSlideBoxDelegate.$getByHandle("orderStatus").slide(to);
				var ele = angular.element(e);
				angular.forEach(ele.parent().parent().find("div"), function(i) {
					var ie = angular.element(i);
					if (ie.hasClass("active"))
						ie.removeClass("active");
				});
				ele.addClass("active");
			};

			$scope.beginPurchasing = function() {
				flowStepOut(Statuses.purchasing, Actions.purchasing);
			};

			$scope.cancelPurchasing = function() {
				flowStepOut(Statuses.completed, Actions.cancelPurchasing);
			};

			$scope.finishPurchasing = function() {
				var promiseArray = [];
				if($scope.current.Extends.ProductActualImageSucceed){
					var p = Camera.upload($scope.current.Extends.ProductActualImage);
					p = p.then(function(result) {
						$scope.current.Extends.ProductActualImage = result.response;
					});
					promiseArray.push(p);
				};
				if($scope.current.Extends.InvoiceImageSucceed){
					var p = Camera.upload($scope.current.Extends.InvoiceImage);
					p = p.then(function(result) {
						$scope.current.Extends.InvoiceImage = result.response;
					});
					promiseArray.push(p);
				};
				if (promiseArray.length > 0) {
					$q.all(promiseArray).then(function(results) {
						flowStepOut(Statuses.delivering, Actions.purchased);
					});
				} else {
					flowStepOut(Statuses.delivering, Actions.purchased);
				}
			};

			$scope.startDelivering = function() {
				flowStepOut(Statuses.delivering, Actions.delivering);
			};
			
			$scope.getPhoto = function(sourceType) {
				 return Camera.getPicture({
					sourceType : sourceType,
					correctOrientation : true,
					quality : 50,
					targetWidth : 320,
					targetHeight : 320,
					saveToPhotoAlbum : false
				});
			};
			
            $scope.showProductCameraMenu = function() {
            	var imagePromise = {};
            	
                $ionicActionSheet.show({
                    buttons: [
                        { text: '拍照' },
                        { text: '从相册选择' }
                    ],
                    cancelText: '取消',
                    cancel: function() {
                        // add cancel code..
                    },
                    buttonClicked: function(index) {
                        switch (index) {
                            case 0:
                            	imagePromise = $scope.getPhoto(Camera.PictureSourceType.CAMERA);
                                break;
                            case 1:
                            	imagePromise=$scope.getPhoto(Camera.PictureSourceType.PHOTOLIBRARY);
                                break;
                        }
                        
        				
                    	imagePromise.then(function(imageURI) {
            				$scope.current.Extends.ProductActualImage = imageURI;
            				$scope.current.Extends.ProductActualImageSucceed = true;
            			});
                        return true;
                    }
                });
            };

            $scope.showInvoiceCameraMenu = function() {
            	var imagePromise = {};
            	
                $ionicActionSheet.show({
                    buttons: [
                        { text: '拍照' },
                        { text: '从相册选择' }
                    ],
                    cancelText: '取消',
                    cancel: function() {
                        // add cancel code..
                    },
                    buttonClicked: function(index) {
                        switch (index) {
                            case 0:
                            	imagePromise = $scope.getPhoto(Camera.PictureSourceType.CAMERA);
                                break;
                            case 1:
                            	imagePromise=$scope.getPhoto(Camera.PictureSourceType.PHOTOLIBRARY);
                                break;
                        }
                        
        				
                    	imagePromise.then(function(imageURI) {
            				$scope.current.Extends.InvoiceImage = imageURI;
            				$scope.current.Extends.InvoiceImageSucceed = true;
            			});
                        return true;
                    }
                });
            };

}).controller('AccountCtrl', function($scope, Popup) {

	$scope.showUser = function() {
		Popup.show($scope, 'templates/modal-account-userinfo.html');
	};
	$scope.editUser = function() {
		Popup.show($scope, 'templates/modal-account-setting.html');
	};
	$scope.editBanlance = function() {
		Popup.show($scope, 'templates/modal-account-balance.html');
	};

	$scope.showAbout = function() {
		Popup.show($scope, 'templates/modal-account-about.html');
	};

	$scope.showLegal = function() {
		Popup.show($scope, 'templates/modal-account-legal.html');
	};

}).controller('AccountUserInfoCtrl', function($scope, $state, LoginUser, Users) {
	var $stateParams = {
		userId : LoginUser.ID
	};
	$scope.user = Users.get($stateParams);
	
	$scope.logoff = function(){
		LoginUser.logoff(function(){
			$scope.$parent.closeModal();
		});
	};
}).controller('AccountUserEditCtrl', function($scope, $ionicActionSheet, Camera, $timeout, LoginUser, Users) {
	var $stateParams = {
		userId : LoginUser.ID
	};
	$scope.user = Users.get($stateParams);

	// $scope.user.Image = "img/avatar-default.jpg";

	$scope.getPhoto = function(sourceType) {
		$scope.user.ImagePromise = Camera.getPicture({
			sourceType : sourceType,
			correctOrientation : true,
			quality : 50,
			targetWidth : 320,
			targetHeight : 320,
			saveToPhotoAlbum : false
		});

		$scope.user.ImagePromise.then(function(imageURI) {
			$scope.user.Image = imageURI;
			var uploadPromise = Camera.upload(imageURI);
			uploadPromise.then(function(result) {
				var serverUrl = result.response;
				$scope.$apply(function() {
					$scope.user.Image = serverUrl;
				});
			});
		}, function(err) {
			console.err(err);
		});
	};

	$scope.getPhotoFromCamera = function() {
		$scope.getPhoto(Camera.PictureSourceType.CAMERA);
	};

	$scope.getPhotoFromLibrary = function() {
		$scope.getPhoto(Camera.PictureSourceType.PHOTOLIBRARY);
	};

	$scope.submit = function() {
		if($scope.user.NewPwd == $scope.user.NewPwdConfirm){	
			$scope.user.$save(function() {
				LoginUser.reload();
				$scope.$parent.closeModal();
			});
		}
	};
}).controller('AccountBalanceCtrl', function($scope, $state) {

}).controller('AccountLegalCtrl', function($scope, $state) {

}).controller('AccountAboutCtrl', function($scope, $state) {

}).controller('FilterCtrl', function($scope, $state, Countries) {
	$scope.countries = Countries.query();

	$scope.ok = function(country) {
		$scope.$parent.changeCountry(country);
		$scope.$parent.closeModal();
	};

	$scope.cancel = function() {
		$scope.$parent.closeModal();
	};
}).controller('SelectCtrl', function($scope, $state) {
	$scope.ok = function(item) {
		$scope.$parent.ret(item);
		$scope.$parent.closeModal();
	};

	$scope.cancel = function() {
		$scope.$parent.closeModal();
	};
}).controller('SearchCtrl', function($scope, $state) {
	$scope.ok = function() {
		$scope.$parent.closeModal();
		$state.go('products');
	};

	$scope.cancel = function() {
		$scope.$parent.closeModal();
	};
}).controller('ProvincesCtrl', function($scope, $state, Address) {
	$scope.provinces = Address.provinces();

	$scope.address = {};

	$scope.step = 'province';
	$scope.selectProvince = function(c) {
		$scope.address.Province = c.Name;
		$scope.province = c;
		$scope.step = 'city';
	};
	$scope.selectCity = function(c) {
		$scope.address.City = c.Name;
		$scope.city = c;
		$scope.step = 'area';
	};
	$scope.selectArea = function(c) {
		$scope.address.Area = c.Name;
		$scope.$parent.ret($scope.address);
		$scope.$parent.closeModal();
	};
}).controller(
		'UnionpayCtrl',
		function($scope, $http) {
			// for unionpay test by jih ++++++++++++++++++++++++++
			$scope.pay = function() {

				$http.jsonp("http://www.gouwudai.net.cn:8080/bag-unionpay-server/trade?callback=JSON_CALLBACK")
						.success(function(data, status) {
							cn.xj.bag.plugin.Unionpay.payForTest(data.tn, function(msg) {
								// 支付控件返回字符串:success、fail、cancel
								// 分别代表支付成功，支付失败，支付取消
								alert(msg);
							});
						}).error(function(data, status) {
							alert("error " + data + " " + status);
						});
			}

			$scope.toast = function() {
				// https://github.com/EddyVerbruggen/Toast-PhoneGap-Plugin

				// cordova plugin add
				// https://github.com/EddyVerbruggen/Toast-PhoneGap-Plugin.git
				// cordova prepare

				window.plugins.toast.showShortCenter("这是一个警告！！！\n这是第二个警告！！！\n这是第三个警告！！！")
			}
		})
// ---------------------------------------------------

;

