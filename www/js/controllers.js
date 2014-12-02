Date.prototype.Format = function(fmt) { // author: meizz
	var o = {
		"M+" : this.getMonth() + 1, // 月份
		"d+" : this.getDate(), // 日
		"h+" : this.getHours(), // 小时
		"m+" : this.getMinutes(), // 分
		"s+" : this.getSeconds(), // 秒
		"q+" : Math.floor((this.getMonth() + 3) / 3), // 季度
		"S" : this.getMilliseconds()
	// 毫秒
	};
	if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
	for ( var k in o)
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
}).controller('TabsCtrl', function($scope, $ionicTabsDelegate, $state, LoginUser, Popup) {
	var navs = [ 'dash', 'cart', 'inventorys', 'orders.customer', 'account' ];
	$scope.makeSureLogin = function(index) {
		LoginUser.needLogin($scope.$new(), function() {
			$ionicTabsDelegate.$getByHandle('rootTabs').select(index);
			$state.go(navs[index]);
		});
	};

}).controller('LoginCtrl', function($scope, Users, Popup) {
	$scope.user = {};
	$scope.user.host = $scope.$parent.host;
	$scope.users = Users.query();
	// for test
	$scope.user.Name = "wangshilian";
	$scope.login = function() {
		$scope.$parent.setHost($scope.user.host);
		$scope.currentUser.login($scope.user.Name, $scope.user.Password, function(user) {
			if (user) {
				$scope.$parent.ret(user);
			}
		});
	};
	$scope.showSignup = function() {
		Popup.show($scope, 'templates/modal-signup.html', function(user) {
			$scope.currentUser.login(user.Name, user.Password, function(user) {
				if (user) {
					$scope.$parent.ret(user);
				}
			});
		});
	};

}).controller('BecomePurchaserCtrl', function($scope, Users, Popup) {
	$scope.user = $scope.currentUser;
	$scope.pay = function() {
		Popup.show($scope, 'templates/modal-pay-for-purchaser.html', function(user) {
			$scope.currentUser.reload();
		});
	};
}).controller('PayForPurchaserCtrl', function($scope, Users, Popup) {
	$scope.user = $scope.$parent.user;
	$scope.payment = {
		FromUserID : $scope.user.ID,
		ToUserID : $scope.user.ID,
		Amount : 200,// 金额
		PayTypeID : 1,// 买手保证金
		PayMethodID : 2,// Bank
		Description : "买手支付保证金",// Bank
		OrderNo : $scope.user.ID,
		ActionID : 1
	};
	$scope.done = function() {
		$scope.$parent.done($scope.user);
	};
}).controller('BalanceWithdrawCtrl', function($scope, Users, Popup) {
	$scope.user = $scope.currentUser;
	$scope.payment = {
		FromUserID : $scope.user.ID,
		ToUserID : $scope.user.ID,
		Amount : $scope.$parent.Amount,// 金额
		PayTypeID : 3,// 提现
		PayMethodID : 1,// 个人账户
		Description : "提现",// Bank
		OrderNo : $scope.user.ID,
		ActionID : 1
	};
	$scope.done = function() {
		$scope.$parent.done($scope.user);
	};
}).controller('PaymentCtrl', function($scope, Users, Popup, PaymentFlow, Unipay) {
	// getTradeNO PaymentRequest
	$scope.payment = $scope.$parent.payment;
	$scope.current = {};

	$scope.doPay = function() {
		if ($scope.payment.PayMethodID == 1) {
			payByPersonalAccount();
		} else {
			payByBank();
		}
	};

	var payByPersonalAccount = function() {
		flowStepOut(1, $scope.payment, function(payment) {
			$scope.payment = payment;
		});
	};

	var payByBank = function() {
		flowStepOut(1, $scope.payment, function(payment) {
			$scope.payment = payment;
			doPayFromBank(payment.TradeNo);
		});
	};

	var doPayFromBank = function(tradeNo) {
		Unipay.pay(tradeNo).then(function() {
			finishPayment();
		});
	};

	var finishPayment = function() {
		flowStepOut(2, $scope.payment, function(payment) {
			$scope.payment = payment;
		});
	};

	var flowStepOut = function(actionID, params, succeed) {
		var step = {};

		if (params) {
			step = angular.copy(params, step);
		}
		step.ActionID = actionID;
		step.PaymentID = params.PaymentID;
		var paymentFlow = new PaymentFlow(step);
		paymentFlow.$save(function(resp) {
			succeed(resp);
		});
	};
}).controller('SignupCtrl', function($scope, Users, Popup) {
	$scope.user = {};

	$scope.signup = function() {
		if ($scope.user.TobePurchaser) {
			var User = new Users($scope.user);
			User.$save(function(resp) {
				$scope.user.ID = resp.ID;
				Popup.show($scope, 'templates/modal-pay-for-purchaser.html', function() {
					$scope.$parent.done($scope.user);
				});
			});
		} else {
			var User = new Users($scope.user);
			User.$save(function() {
				$scope.$parent.done($scope.user);
			});
		}
	};

	$scope.showPurchaserLagel = function() {
		Popup.show($scope, 'templates/modal-purchaser-lagel.html');
	};

	$scope.loadBid = function() {
		$scope.bids = OrderBiding.query({
			OrderItem : $stateParams.itemId
		}, function() {
		});
	};

}).controller('DashCtrl', function($scope, $ionicSlideBoxDelegate, Category, Popup) {
	$scope.rectHeight = document.body.clientWidth / 3;
	$scope.category = Category.level1Grouped();
	$scope.search = function() {
		Popup.show($scope, 'templates/modal-search.html', function() {

		});
	};
}).controller('ProductsCategoryCtrl', function($scope, $state, $stateParams, Popup, Category, Products) {
	$scope.doRefresh = function() {
		load(function() {
			$scope.$broadcast('scroll.refreshComplete');
		});
	};

	var load = function(funcPageLoadSucceed) {
		$scope.category = Category.get($stateParams.CategoryLevel1);

		$scope.data = {
			products : []
		};
		$scope.hasmore = true;
		$scope.page = 1;
		$scope.pagesize = 10;

		var params = angular.extend($stateParams, {
			page : $scope.page,
			pagesize : $scope.pagesize
		});
		var realList = undefined;
		realList = Products.query(params, function() {
			$scope.data.products = $scope.data.products.concat(realList);
			if (realList.length < $scope.pagesize) {
				$scope.hasmore = false;
			}
			if (funcPageLoadSucceed) funcPageLoadSucceed();
		});
	};
	load();

	$scope.showDetail = function(product) {
		$scope.product = product;
		Popup.show($scope, 'templates/modal-product-detail.html');
	};
	$scope.back = function() {
		$state.go("dash");
	};

	// Load more after 1 second delay
	$scope.loadMoreItems = function() {
		$scope.page = $scope.page + 1;

		var params = angular.extend($stateParams, {
			page : $scope.page,
			pagesize : $scope.pagesize
		});

		var realList = undefined;
		realList = Products.query(params, function() {
			if (realList.length > 0) {
				$scope.data.products = $scope.data.products.concat(realList);
			} else {
				$scope.hasmore = false;
			}
			$scope.$broadcast('scroll.infiniteScrollComplete');
		});
	};
	$scope.moreDataCanBeLoaded = function() {
		return $scope.hasmore;
	};

}).controller('ProductDetailCtrl', function($scope, $stateParams, Products, Exts, LoginUser, Category) {

	$scope.product = Products.get({
		productId : $scope.$parent.product.ID
	}, function() {
		$scope.product.Exts = Exts.decode($scope.product.Extends);
		$scope.product.Extends = undefined;
		$scope.product.CategoryDesc = Category.get($scope.product.CategoryID).Desc;
	});

	$scope.selectThis = function() {
		LoginUser.needLogin($scope.$new(), function() {
			var item = {};
			item.Product = $scope.product;
			if (!item.Product.CopyFromID) {
				item.Product.CopyFromID = $scope.product.ID;
			}
			item.Quantity = 1;
			$scope.cart.add(item);
			$scope.closeModal();
		});

		return false;
	};
}).controller('CartCtrl', function($scope, Popup, Exts, $ionicListDelegate) {

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

	// $scope.checked = function(item) {
	// item.checked = !item.checked;
	// };

	$scope.newProduct = function() {
		var scope = $scope.$new();
		Popup.show(scope, 'templates/modal-new-product.html');
	};

	$scope.editProduct = function(item) {
		var scope = $scope.$new();
		scope.item = item;
		scope.product = item.Product;
		Popup.show(scope, 'templates/modal-new-product.html', function() {
			$ionicListDelegate.closeOptionButtons();
		});
	};

	$scope.popupOrder = function(order) {
		$scope.order = order;
		Popup.show($scope, 'templates/modal-new-order.html');
	};

	$scope.checkAll = function($event, country) {
		var checked = country.checked;
		if (checked) {
			country.selected = true;
			angular.forEach($scope.cart.Countrys, function(c) {
				if (c != country) {
					c.selected = false;
					c.checked = false;
					angular.forEach(c.Items, function(i) {
						i.checked = false;
					});
				}
			});
		}
		angular.forEach(country.Items, function(i) {
			i.checked = checked;
		});

		sumAll();
	};

	$scope.check = function($event, country, item) {
		if (item.checked && !country.selected) {
			angular.forEach($scope.cart.Countrys, function(c) {
				if (c != country) {
					c.selected = false;
					c.checked = false;
					angular.forEach(c.Items, function(i) {
						i.checked = false;
					});
				}
			});
			country.selected = true;
		}
		;

		var checkall = true;
		angular.forEach(country.Items, function(i) {
			checkall = checkall && i.checked;
		});
		country.checked = checkall;
		sumAll();
	};

	$scope.allSum = 0;
	$scope.allCnt = 0;
	$scope.CountryName = "";

	var sumAll = function() {
		var sum = 0;
		var cnt = 0;
		angular.forEach($scope.cart.Countrys, function(c) {
			if (c.selected) {
				var checkall = true;
				angular.forEach(c.Items, function(i) {
					checkall = checkall && i.checked;
					if (i.checked) {
						sum += (i.Quantity * i.Product.ExpectedPrice);
						cnt += 1;
					}
				});
				c.checked = checkall;
				$scope.CountryName = c.Name;
			}
		});
		$scope.allSum = sum;
		$scope.allCnt = cnt;
	};

	sumAll();
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
}).controller('NewProductCtrl', function($scope, $ionicActionSheet, $ionicScrollDelegate, Popup, $timeout, Products, Camera, Orders, Countries, Category, Exts) {
	var productScrollDelegate = $ionicScrollDelegate.$getByHandle('product');

	if ($scope.$parent.product) {
		$scope.product = $scope.$parent.product;
		$scope.product.ExpectedPrice = $scope.product.Price;
		$scope.item = $scope.$parent.item;
		$scope.categoryInEdit = false;
	} else {
		$scope.product = {};
		$scope.product.Image = "img/mcfly.jpg";
		$scope.isNew = true;
		$scope.categoryInEdit = true;
		$scope.item = {
			Quantity : 1
		};
	}
	$scope.categories = Category.level1();

	$scope.product.CategoryDesc = "请选择分类！";

	$scope.anchers = [];
	$scope.desc = function() {
		if ($scope.anchers.length > 0) {
			var desc = "";
			angular.forEach($scope.anchers, function(cat) {
				desc = desc + ">" + cat.Name;
			});
			return desc.substring(1);
		} else {
			return "请选择分类！";
		}
	};

	$scope.selectCat = function(cat) {
		$scope.anchers.push(cat);
		var cs = Category.children(cat.ID);
		if (cs.length > 0) {
			productScrollDelegate.scrollTop();
			$scope.categories = cs;
			$scope.product.CategoryDesc = $scope.desc();

			if (!$scope.product.CategoryLevel1ID) {
				$scope.product.CategoryLevel1ID = cat.ID;
				$scope.product.CategoryLevel1Name = cat.Name;
			}
		} else {
			productScrollDelegate.scrollTop();
			$scope.categoryInEdit = false;
			if (!$scope.product.CategoryID) {
				$scope.product.CategoryID = cat.ID;
				$scope.product.CategoryName = cat.Name;
			}
			$scope.product.CategoryDesc = $scope.desc();
		}
	};

	$scope.getPhoto = function(sourceType) {
		var imagePromise = Camera.getPicture({
			sourceType : sourceType,
			correctOrientation : true,
			quality : 50,
			targetWidth : 320,
			targetHeight : 320,
			saveToPhotoAlbum : false
		});
		// $scope.product.ImagePromise
		imagePromise.then(function(imageURI) {
			$scope.product.Image = imageURI;

			var _product = $scope.product;
			$scope.product.ImageUploadPromise = Camera.upload(imageURI);
			$scope.product.ImageUploadPromise.then(function(result) {
				_product.Image = result.response;
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

	$scope.popupCountries = function() {
		$scope.datalist = Countries.query();
		Popup.show($scope, 'templates/modal-select.html', function(item) {
			$scope.product.CountryID = item.ID;
			$scope.product.CountryName = item.Name;
		});
	};

	$scope.editDescription = function() {
		$scope.bigText = $scope.product.Description;
		Popup.show($scope, 'templates/modal-text.html', function(text) {
			$scope.product.Description = text;
		});
	};

	$scope.step = 1;
	$scope.submit = function() {
		// $scope.product.Extends =
		// Exts.encode($scope.product.Exts);
		// $scope.product.Exts = undefined;

		$scope.product.Price = $scope.product.ExpectedPrice;
		if ($scope.isNew) {
			$scope.item.Product = $scope.product;
			$scope.cart.add($scope.item);
		} else {

		}
		$scope.$parent.closeModal();
	};

	$scope.showCameraMenu = function() {
		$ionicActionSheet.show({
			buttons : [ {
				text : '拍照'
			}, {
				text : '从相册选择'
			} ],
			cancelText : '取消',
			cancel : function() {
				// add cancel code..
			},
			buttonClicked : function(index) {
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
	$scope.back = function() {
		if (!$scope.categoryInEdit) {
			$scope.$parent.closeModal();
		} else {
			if ($scope.anchers.length == 0) {
				$scope.$parent.closeModal();
			} else if ($scope.anchers.length > 1) {
				$scope.anchers.pop();
				var cat = $scope.anchers.pop();
				$scope.selectCat(cat);
			} else {
				$scope.anchers.pop();
				$scope.categories = Category.level1();
				$scope.product.CategoryDesc = "请选择分类！";
			}
		}
	};
}).controller('NewOrderCtrl', function($scope, Camera, $q, Popup, Orders, $ionicPopup, Address, Exts, Statuses, Actions) {
	$scope.Items = [];
	$scope.country = {};
	$scope.order.Address = $scope.currentUser.Address;

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
		var confirmPopup = $ionicPopup.confirm({
			title : '确认',
			cancelText : '取消',
			okText : '确定',
			template : '确定提交订单吗?'
		});
		confirmPopup.then(function(res) {
			if (res) {
				doSubmit();
			}
		});
	};
	var doSubmit = function() {
		$scope.order.CustomerID = $scope.currentUser.ID;
		$scope.order.CustomerName = $scope.currentUser.Name;
		$scope.order.CustomerNickName = $scope.currentUser.NickName;
		$scope.order.CustomerImage = $scope.currentUser.Image;
		$scope.order.Datetime = new Date().Format("yyyy-MM-dd hh:mm:ss");

		var promiseArray = [];
		angular.forEach($scope.order.Items, function(newitem) {
			var ni = newitem;
			ni.Product.Extends = Exts.encode(ni.Product.Exts);
			ni.Product.Exts = undefined;

			ni.StatusID = Statuses.bid.ID;
			ni.StatusName = Statuses.bid.Name;

			ni.ActionID = Actions.sendout.ID;
			ni.ActionName = Actions.sendout.Name;

			ni.CustomerID = $scope.currentUser.ID;
			ni.CustomerName = $scope.currentUser.Name;
			ni.CustomerNickName = $scope.currentUser.NickName;
			ni.CustomerImage = $scope.currentUser.Image;

			ni.CountryID = ni.Product.CountryID;
			ni.CountryName = ni.Product.CountryName;

			ni.Datetime = $scope.order.Datetime;

			ni.Address = $scope.order.Address;
			if (ni.Product.ImageUploadPromise) {
				promiseArray.push(ni.Product.ImageUploadPromise);
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

}).controller('InventorysCtrl', function($scope, Popup, Inventorys, Countries) {
	$scope.doRefresh = function() {
		load(function() {
			$scope.$broadcast('scroll.refreshComplete');
		});
	};

	var load = function(funcPageLoadSucceed) {
		$scope.countryName = "全部国家";

		$scope.data = {
			inventorys : []
		};
		$scope.hasmore = true;
		$scope.page = 1;
		$scope.pagesize = 10;

		var params = {
			Action : 1,
			Status : 1,
			page : $scope.page,
			pagesize : $scope.pagesize
		};

		if ($scope.countryID) {
			params.Country = $scope.countryID;
		}

		var realList = undefined;
		realList = Inventorys.query(params, function() {
			$scope.data.inventorys = $scope.data.inventorys.concat(realList);
			if (realList.length < $scope.pagesize) {
				$scope.hasmore = false;
			}
			if (funcPageLoadSucceed) funcPageLoadSucceed();
		});
	};

	load();

	$scope.filter = function() {
		$scope.countries = Countries.query();
		Popup.show($scope, 'templates/modal-filter.html', function(country) {
			$scope.countryID = country.ID;
			$scope.countryName = country.Name;
			load();
		});
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

	// Load more after 1 second delay
	$scope.loadMoreItems = function() {
		$scope.page = $scope.page + 1;

		var params = {
			page : $scope.page,
			pagesize : $scope.pagesize
		};

		var realList = undefined;
		realList = Inventorys.query(params, function() {
			if (realList.length > 0) {
				$scope.data.inventorys = $scope.data.inventorys.concat(realList);
			} else {
				$scope.hasmore = false;
			}
			$scope.$broadcast('scroll.infiniteScrollComplete');
		});
	};
	$scope.moreDataCanBeLoaded = function() {
		return $scope.hasmore;
	};

	$scope.becomePurchaser = function() {
		Popup.show($scope, 'templates/modal-become-purchaser.html');
	};
}).controller('InventoryDetailCtrl', function($scope, $state, Category, Exts, OrderBiding, $timeout, $state, Popup, DeliveryMethod, Inventorys) {
	$scope.doRefresh = function() {
		load(function() {
			$scope.$broadcast('scroll.refreshComplete');
		});
	};
	var load = function(funcPageLoadSucceed) {
		$scope.triger1 = false;
		$scope.item = Inventorys.get({
			itemId : $scope.$parent.item.ID
		}, function() {
			$scope.item.Product.Exts = Exts.decode($scope.item.Product.Extends);
			$scope.item.Product.Extends = undefined;
			$scope.product = $scope.item.Product;
			$scope.item.Product.CategoryDesc = Category.get($scope.item.Product.CategoryID).Desc;
			$scope.suitor = {
				PurchaserID : $scope.currentUser.ID, // TODO
				PurchaserName : $scope.currentUser.Name,
				PurchaserNickName : $scope.currentUser.NickName,
				PurchaserImage : $scope.currentUser.Image,
				OrderItemID : $scope.item.ID
			};
			$scope.loadBid();
			if (funcPageLoadSucceed) funcPageLoadSucceed();
		});
		$scope.step = 1;
	};
	load();

	$scope.showDeliveryMethods = function() {
		$scope.datalist = DeliveryMethod.query();

		Popup.show($scope, 'templates/modal-select.html', function(item) {
			$scope.suitor.DeliveryMethodID = item.ID;
			$scope.suitor.DeliveryMethodName = item.Name;
		});
	};

	$scope.editDescription = function() {
		$scope.bigText = $scope.suitor.Comment;
		Popup.show($scope, 'templates/modal-text.html', function(text) {
			$scope.suitor.Comment = text;
		});
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
		if (!$scope.suitor.DeliveryCost) {
			$scope.suitor.DeliveryCost = 0;
		}
		var bid = new OrderBiding($scope.suitor);
		bid.$save(function() {
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
}).controller('OrdersCustomerCtrl', function($scope, Orders, Popup, $timeout) {
	$scope.doRefresh = function() {
		load(function() {
			$scope.$broadcast('scroll.refreshComplete');
		});
	};
	var load = function(funcPageLoadSucceed) {
		$scope.data = {
			orders : []
		};
		$scope.hasmore = true;
		$scope.page = 1;
		$scope.pagesize = 3;
		var ordersList = undefined;
		ordersList = Orders.query({
			Customer : $scope.currentUser.ID,
			page : $scope.page,
			pagesize : $scope.pagesize
		}, function() {
			$scope.data.orders = $scope.data.orders.concat(ordersList);
			if (ordersList.length < $scope.pagesize) {
				$scope.hasmore = false;
			}
			if (funcPageLoadSucceed) funcPageLoadSucceed();
		});
	};
	load();

	$scope.showDetail = function(item) {
		$scope.item = item;
		Popup.show($scope, 'templates/modal-order-detail-c.html');
	};

	// Load more after 1 second delay
	$scope.loadMoreItems = function() {
		$scope.page = $scope.page + 1;
		var ordersList = undefined;
		ordersList = Orders.query({
			Customer : $scope.currentUser.ID,
			page : $scope.page,
			pagesize : $scope.pagesize
		}, function() {
			if (ordersList.length > 0) {
				$scope.data.orders = $scope.data.orders.concat(ordersList);
			} else {
				$scope.hasmore = false;
			}
			$scope.$broadcast('scroll.infiniteScrollComplete');
		});
	};
	$scope.moreDataCanBeLoaded = function() {
		return $scope.hasmore;
	};
}).controller('OrdersPurchaserCtrl', function($scope, PurchaserOrdes, OrderBiding, Popup) {
	$scope.doRefresh = function() {
		load(function() {
			$scope.$broadcast('scroll.refreshComplete');
		});
	};
	var load = function(funcPageLoadSucceed) {
		$scope.data = {
			orders : []
		};
		$scope.hasmore = true;
		$scope.page = 1;
		$scope.pagesize = 3;
		var ordersList = undefined;
		ordersList = PurchaserOrdes.query({
			Purchaser : $scope.currentUser.ID,
			page : $scope.page,
			pagesize : $scope.pagesize
		}, function() {
			var id = $scope.currentUser.ID;
			angular.forEach(ordersList, function(o) {
				var items = o.Items;
				for ( var i = items.length - 1; i >= 0; i--) {
					var item = items[i];
					if (item.PurchaserID != id) {
						items.splice(i, 1);
					}
				}
			});

			$scope.data.orders = $scope.data.orders.concat(ordersList);
			if (ordersList.length < $scope.pagesize) {
				$scope.hasmore = false;
			}
			if (funcPageLoadSucceed) funcPageLoadSucceed();
		});
	};
	load();

	$scope.showDetail = function(item) {
		$scope.item = item;
		Popup.show($scope, 'templates/modal-order-detail-p.html');
	};

	// Load more after 1 second delay
	$scope.loadMoreItems = function() {
		$scope.page = $scope.page + 1;
		var ordersList = undefined;
		ordersList = PurchaserOrdes.query({
			Purchaser : $scope.currentUser.ID,
			page : $scope.page,
			pagesize : $scope.pagesize
		}, function() {
			var id = $scope.currentUser.ID;
			angular.forEach(ordersList, function(o) {
				var items = o.Items;
				for ( var i = items.length - 1; i >= 0; i--) {
					var item = items[i];
					if (item.PurchaserID != id) {
						items.splice(i, 1);
					}
				}
			});
			if (ordersList.length > 0) {
				$scope.data.orders = $scope.data.orders.concat(ordersList);
			} else {
				$scope.hasmore = false;
			}
			$scope.$broadcast('scroll.infiniteScrollComplete');
		});
	};
	$scope.moreDataCanBeLoaded = function() {
		return $scope.hasmore;
	};
}).controller('PayForOrderCtrl', function($scope, Users, Popup) {
	$scope.item = $scope.$parent.item;
	$scope.bid = $scope.item.Bid;
	$scope.payment = {
		FromUserID : $scope.currentUser.ID,
		ToUserID : $scope.currentUser.ID,
		Amount : $scope.item.Bid.Amount,// 金额
		PayTypeID : 2,// 购买保证金
		PayMethodID : 2,// Bank
		Description : "订单支付",// Bank
		OrderNo : $scope.item.ID,
		ActionID : 1
	};
	$scope.done = function(payment) {
		$scope.$parent.done(payment);
	};
}).controller('OrderCustomerDetailCtrl', function($scope, OrderItems, OrderItemFlowByItem, $ionicPopup, OrderItemFlow, Popup, Statuses, Actions, OrderBiding, $state, $ionicSlideBoxDelegate, $timeout, Orders, Category, Exts, Unipay) {

	var $stateParams = {
		itemId : $scope.$parent.item.ID
	};

	$scope.doRefresh = function() {
		load(function() {
			$scope.$broadcast('scroll.refreshComplete');
		});
	};
	var load = function(funcPageLoadSucceed) {
		$scope.Actions = Actions;
		$scope.Statuses = Statuses;

		$scope.statuses = [ {}, {
			ActionID : 1,
			class : "doing"
		}, {
			ActionID : 1,
			class : "disable"
		}, {
			ActionID : 1,
			class : "disable"
		}, {
			ActionID : 1,
			class : "disable"
		} ];

		$scope.statusActiveSlide = 0;

		$scope.item = OrderItems.get($stateParams, function() {
			if (funcPageLoadSucceed) funcPageLoadSucceed();
			loadFlow();
			$scope.item.Product.Exts = Exts.decode($scope.item.Product.Extends);
			$scope.item.Product.Extends = undefined;
			$scope.product = $scope.item.Product;
			$scope.item.Product.CategoryDesc = Category.get($scope.item.Product.CategoryID).Desc;
		});

	};
	load();

	var loadFlow = function() {
		$scope.flows = OrderItemFlowByItem.query($stateParams, function() {
			if ($scope.flows.length > 0) {
				$scope.current = $scope.flows[0];
				$scope.statusActiveSlide = $scope.current.StatusID - 1;
				var maxStatusID = $scope.flows[0].StatusID;
				if (!maxStatusID) {
					maxStatusID = 1;
				}

				angular.forEach($scope.flows.reverse(), function(f) {
					var statusID = f.StatusID;
					if (!statusID) {
						statusID = 1;
					}
					if (statusID < maxStatusID) {
						$scope.statuses[statusID].ActionID = f.ActionID;
						$scope.statuses[statusID].class = "done";
					} else if (statusID == 4) {
						$scope.statuses[statusID].ActionID = f.ActionID;
						$scope.statuses[statusID].class = "done";
					} else if (statusID == maxStatusID) {
						$scope.statuses[statusID].ActionID = f.ActionID;
						$scope.statuses[statusID].class = "doing";
					}
				});

				if ($scope.item.StatusID == 5 || $scope.item.StatusID == 6) {
					$scope.statuses[maxStatusID].class = "cancel";

				}

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

	var flowStepOut = function(status, action, params, succeed) {
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
		var flow = new OrderItemFlow(step);
		flow.$save(function(resp) {
			if (succeed) {
				succeed(resp);
			} else {
				load();
				$state.reload();

			}
		});
	};

	$scope.loadBid = function() {
		$scope.bids = OrderBiding.query({
			OrderItem : $stateParams.itemId
		}, function() {
		});
	};

	$scope.statusSlide = function(e, to) {
		if ($scope.statuses[to + 1].class == "disable") {
			return;
		}

		$scope.statusActiveSlide = to;

		var ele = angular.element(e);
		angular.forEach(ele.parent().parent().find("div"), function(i) {
			var ie = angular.element(i);
			if (ie.hasClass("active")) ie.removeClass("active");
		});
		ele.addClass("active");
	};

	$scope.bitSucceed = function(suitor) {
		var confirmPopup = $ionicPopup.confirm({
			title : '确认',
			cancelText : '取消',
			okText : '确定',
			template : '确认选中此买家吗?'
		});
		confirmPopup.then(function(res) {
			if (res) {
				var params = {
					Bid : {
						"ID" : suitor.ID,
						"OrderItemID" : suitor.OrderItemID,
						"PurchaserID" : suitor.PurchaserID,
						"PurchaserName" : suitor.PurchaserName,
						"PurchaserNickName" : suitor.PurchaserNickName,
						"PurchaserImage" : suitor.PurchaserImage,
						"ProductAmount" : suitor.ProductAmount,
						"ProductCommissionAmount" : suitor.ProductCommissionAmount,
						"Amount" : suitor.Amount,
						"Commission" : suitor.Commission,
						"SuggestedPrice" : suitor.SuggestedPrice,
						"DeliveryCost" : suitor.DeliveryCost,
						"DeliveryMethodID" : suitor.DeliveryMethodID,
						"DeliveryMethodName" : suitor.DeliveryMethodName
					}
				};

				flowStepOut(Statuses.purchasing, Actions.bitSucceed, params, function(resp) {
					load(function() {
						$scope.gotoPay();
					});

				});
			}
		});

	};

	$scope.gotoPay = function() {
		$scope.item = $scope.item;
		Popup.show($scope, 'templates/modal-pay-for-order.html', function(payment) {
			load();
			$state.reload();
		});
	};

	$scope.cancelOrder = function() {
		if ($scope.current.StatusID > 1) {
			var confirmPopup = $ionicPopup.prompt({
				title : '确认',
				cancelText : '取消',
				okText : '确定',
				inputPlaceholder : "请输入放弃原因",
				template : '当前取消订单将扣除一定比例的佣金给买手，仍然确认取消订单吗?'
			});

			confirmPopup.then(function(reason) {
				if (reason) {
					if (!$scope.current.Extends) {
						$scope.current.Extends = {};
					}
					$scope.current.Extends.CancelOrderComment = reason;
					flowStepOut($scope.current.StatusID, Actions.cancelOrder, params);
				}
			});
		} else {
			var confirmPopup = $ionicPopup.prompt({
				title : '确认',
				cancelText : '取消',
				okText : '确定',
				inputPlaceholder : "请输入放弃原因",
				template : '确认取消订单吗?'
			});
			confirmPopup.then(function(reason) {
				if (reason) {
					if (!$scope.current.Extends) {
						$scope.current.Extends = {};
					}
					$scope.current.Extends.CancelOrderComment = reason;
					flowStepOut($scope.current.StatusID, Actions.cancelOrder);
				}
			});
		}
	};

	$scope.confirmDelivering = function() {
		var confirmPopup = $ionicPopup.confirm({
			title : '确认',
			cancelText : '取消',
			okText : '确定',
			template : '确定要确认收货吗？一旦确认收货，将支付保证金给买手。'
		});
		confirmPopup.then(function(res) {
			if (res) {
				flowStepOut(Statuses.completed, Actions.delivered);
			}
		});
	};

	$scope.showChat = function(item, customerID, purchaserID, iampurchaser) {
		var scope = $scope.$new();
		scope.item = item;
		scope.customerID = customerID;
		scope.purchaserID = purchaserID;
		scope.iampurchaser = iampurchaser;
		Popup.show(scope, 'templates/modal-chat.html');
	};

}).controller('OrderPurchaserDetailCtrl', function($scope, $q, Popup, OrderItems, $ionicPopup, Geolocation, OrderItemFlowByItem, OrderItemFlow, Statuses, Actions, OrderBiding, $state, $stateParams, $ionicSlideBoxDelegate, $timeout, Orders, Category, Exts, $ionicActionSheet, Camera) {

	var $stateParams = {
		itemId : $scope.$parent.item.ID
	};

	$scope.doRefresh = function() {
		load(function() {
			$scope.$broadcast('scroll.refreshComplete');
		});
	};
	var load = function(funcPageLoadSucceed) {
		$scope.Actions = Actions;
		$scope.Statuses = Statuses;

		$scope.statuses = [ {}, {
			ActionID : 1,
			class : "doing"
		}, {
			ActionID : 1,
			class : "disable"
		}, {
			ActionID : 1,
			class : "disable"
		}, {
			ActionID : 1,
			class : "disable"
		} ];

		$scope.statusActiveSlide = 0;

		$scope.item = OrderItems.get($stateParams, function() {
			if (funcPageLoadSucceed) funcPageLoadSucceed();
			loadFlow();
			if ($scope.item.Product.Extends) {
				$scope.item.Product.Exts = Exts.decode($scope.item.Product.Extends);
				$scope.item.Product.Extends = undefined;
			}
			$scope.product = $scope.item.Product;
			$scope.item.Product.CategoryDesc = Category.get($scope.item.Product.CategoryID).Desc;
		});

	};
	load();

	var loadFlow = function() {
		$scope.flows = OrderItemFlowByItem.query($stateParams, function() {
			if ($scope.flows.length > 0) {
				$scope.current = $scope.flows[0];
				$scope.statusActiveSlide = $scope.current.StatusID - 1;
				var maxStatusID = $scope.flows[0].StatusID;
				if (!maxStatusID) {
					maxStatusID = 1;
				}

				angular.forEach($scope.flows.reverse(), function(f) {
					var statusID = f.StatusID;
					if (!statusID) {
						statusID = 1;
					}
					if (statusID < maxStatusID) {
						$scope.statuses[statusID].ActionID = f.ActionID;
						$scope.statuses[statusID].class = "done";
					} else if (statusID == 4) {
						$scope.statuses[statusID].ActionID = f.ActionID;
						$scope.statuses[statusID].class = "done";
					} else if (statusID == maxStatusID) {
						$scope.statuses[statusID].ActionID = f.ActionID;
						$scope.statuses[statusID].class = "doing";
					}
				});

				if ($scope.item.StatusID == 5 || $scope.item.StatusID == 6) {
					$scope.statuses[maxStatusID].class = "cancel";

				}

			} else {
				$scope.current = {
					StatusID : 1,
					ActionID : 1
				};
				$scope.statusActiveSlide = $scope.current.StatusID - 1;
				$scope.loadBid();
			}

			$scope.promiseRegion = Geolocation.getRegion();
			$scope.promiseRegion.then(function(region) {
				$scope.currentRegion = {};

				var location = region.address.countryRegion + "-" + region.address.adminDistrict;
				if (region.address.adminDistrict2) {
					location = location + "-" + region.address.adminDistrict2;
				}
				$scope.currentRegion.Location = location;
				$scope.currentRegion.Latitude = region.coords.latitude;
				$scope.currentRegion.Longitude = region.coords.longitude;
			});
		});
	};

	var flowStepOut = function(status, action, params, succeed) {
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
		var flow = new OrderItemFlow(step);
		flow.$save(function(resp) {
			if (succeed) {
				succeed(resp);
			} else {
				load();
				$state.reload();

			}
		});
	};

	$scope.loadBid = function() {
		$scope.bids = OrderBiding.query({
			OrderItem : $stateParams.itemId,
			Purchaser : $scope.currentUser.ID
		}, function() {
		});
	};

	$scope.statusSlide = function(e, to) {
		if ($scope.statuses[to + 1].class == "disable") {
			return;
		}

		$scope.statusActiveSlide = to;

		var ele = angular.element(e);
		angular.forEach(ele.parent().parent().find("div"), function(i) {
			var ie = angular.element(i);
			if (ie.hasClass("active")) ie.removeClass("active");
		});
		ele.addClass("active");
	};

	$scope.beginPurchasing = function() {
		var promiseArray = [];

		promiseArray.push($scope.promiseRegion);

		$q.all(promiseArray).then(function(results) {
			$scope.current.Extends.PurchasingStartLocation = $scope.currentRegion.Location;
			$scope.current.Extends.PurchasingStartLatitude = $scope.currentRegion.Latitude;
			$scope.current.Extends.PurchasingStartLongitude = $scope.currentRegion.Longitude;

			flowStepOut(Statuses.purchasing, Actions.purchasing);
		});
	};

	$scope.cancelPurchasing = function() {
		var confirmPopup = $ionicPopup.prompt({
			title : '确认',
			cancelText : '取消',
			okText : '确定',
			inputPlaceholder : "请输入放弃原因",
			template : '确定要放弃购买吗?'
		});
		confirmPopup.then(function(reason) {
			if (reason) {
				if (!$scope.current.Extends) {
					$scope.current.Extends = {};
				}
				$scope.current.Extends.CancelPurchasingComment = reason;
				flowStepOut($scope.current.StatusID, Actions.cancelPurchasing);
			}
		});
	};

	var doFinishPurchasing = function() {
		var promiseArray = [];
		if ($scope.current.Extends.ProductActualImageList) {
			angular.forEach($scope.current.Extends.ProductActualImageList, function(im) {
				promiseArray.push(im.uploadPromise);
			});
		}

		if ($scope.current.Extends.InvoiceImageList) {
			angular.forEach($scope.current.Extends.InvoiceImageList, function(im) {
				promiseArray.push(im.uploadPromise);
			});
		}

		$scope.promiseRegion.then(function(region) {
		});

		promiseArray.push($scope.promiseRegion);

		$q.all(promiseArray).then(function(results) {
			var imagesProduct = [];
			if ($scope.current.Extends.ProductActualImageList) {
				angular.forEach($scope.current.Extends.ProductActualImageList, function(im) {
					imagesProduct.push(im.uri);
				});
			}
			var imagesInvoice = [];
			if ($scope.current.Extends.InvoiceImageList) {
				angular.forEach($scope.current.Extends.InvoiceImageList, function(im) {
					imagesInvoice.push(im.uri);
				});
			}
			$scope.current.Extends.ProductActualImage = imagesProduct;
			$scope.current.Extends.InvoiceImage = imagesInvoice;

			$scope.current.Extends.PurchasingEndLocation = $scope.currentRegion.Location;
			$scope.current.Extends.PurchasingEndLatitude = $scope.currentRegion.Latitude;
			$scope.current.Extends.PurchasingEndLongitude = $scope.currentRegion.Longitude;

			flowStepOut(Statuses.delivering, Actions.purchased);
		});
	};

	$scope.finishPurchasing = function() {
		var confirmPopup = $ionicPopup.confirm({
			title : '确认',
			cancelText : '取消',
			okText : '确定',
			template : '你当前输入的实际价格为' + $scope.current.Extends.ActualPrice + '元，该值一旦输入不可修改，确定要完成购买吗?'
		});
		confirmPopup.then(function(res) {
			if (res) {
				doFinishPurchasing();
			}
		});
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
			buttons : [ {
				text : '拍照'
			}, {
				text : '从相册选择'
			} ],
			cancelText : '取消',
			cancel : function() {
				// add cancel code..
			},
			buttonClicked : function(index) {
				switch (index) {
					case 0:
						imagePromise = $scope.getPhoto(Camera.PictureSourceType.CAMERA);
						break;
					case 1:
						imagePromise = $scope.getPhoto(Camera.PictureSourceType.PHOTOLIBRARY);
						break;
				}

				imagePromise.then(function(imageURI) {
					if (!$scope.current.Extends.ProductActualImageList) {
						$scope.current.Extends.ProductActualImageList = [];
					}
					var img = {
						uri : imageURI,
						loading : true
					};
					$scope.current.Extends.ProductActualImageList.push(img);
					var p = Camera.upload(imageURI);
					p = p.then(function(result) {
						img.uri = result.response;
						img.loading = false;
					});
					img.uploadPromise = p;
				});
				return true;
			}
		});
	};

	$scope.showInvoiceCameraMenu = function() {
		var imagePromise = {};

		$ionicActionSheet.show({
			buttons : [ {
				text : '拍照'
			}, {
				text : '从相册选择'
			} ],
			cancelText : '取消',
			cancel : function() {
				// add cancel code..
			},
			buttonClicked : function(index) {
				switch (index) {
					case 0:
						imagePromise = $scope.getPhoto(Camera.PictureSourceType.CAMERA);
						break;
					case 1:
						imagePromise = $scope.getPhoto(Camera.PictureSourceType.PHOTOLIBRARY);
						break;
				}

				imagePromise.then(function(imageURI) {

					if (!$scope.current.Extends.InvoiceImageList) {
						$scope.current.Extends.InvoiceImageList = [];
					}
					var img = {
						uri : imageURI,
						loading : true
					};
					$scope.current.Extends.InvoiceImageList.push(img);
					var p = Camera.upload(imageURI);
					p = p.then(function(result) {
						img.uri = result.response;
						img.loading = false;
					});
					img.uploadPromise = p;
				});
				return true;
			}
		});
	};

	$scope.showChat = function(item, customerID, purchaserID, iampurchaser) {
		var scope = $scope.$new();
		scope.item = item;
		scope.customerID = customerID;
		scope.purchaserID = purchaserID;
		scope.iampurchaser = iampurchaser;
		Popup.show(scope, 'templates/modal-chat.html');
	};

}).controller('ChatCtrl', function($scope, $ionicScrollDelegate, Users, ChatMessages, $timeout) {
	var chatsScrollDelegate = $ionicScrollDelegate.$getByHandle('chats');

	$scope.doRefresh = function() {
		load(function() {
			$scope.$broadcast('scroll.refreshComplete');
		});
	};
	var load = function(funcPageLoadSucceed) {

		$scope.item = $scope.$parent.item;
		$scope.customerID = $scope.$parent.customerID;
		$scope.purchaserID = $scope.$parent.purchaserID;
		$scope.iampurchaser = $scope.$parent.iampurchaser;

		if ($scope.iampurchaser) {
			$scope.himID = $scope.customerID;
			$scope.meID = $scope.purchaserID;
		} else {
			$scope.himID = $scope.purchaserID;
			$scope.meID = $scope.customerID;
		}

		$scope.him = Users.get({
			userId : $scope.himID
		});
		$scope.me = $scope.currentUser;

		var chats = ChatMessages.query({
			OrderItem : $scope.item.ID,
			Customer : $scope.customerID,
			Purchaser : $scope.purchaserID
		}, function() {
			chatsScrollDelegate.scrollBottom();
			if (funcPageLoadSucceed) funcPageLoadSucceed();
			$scope.chats = chats.reverse();
		});
	};
	load();

	$scope.say = function(event) {
		var newchat = {
			OrderItemID : $scope.item.ID,
			UserID : $scope.currentUser.ID,
			CustomerID : $scope.customerID,
			PurchaserID : $scope.purchaserID,
			Message : $scope.message,
			loading : true
		};
		/*
		 * Datetime; Customer User; Purchaser User; User;
		 */
		var msg = new ChatMessages(newchat);
		msg.$save(function() {
			$scope.chats.push(newchat);
			$scope.message = "";
			chatsScrollDelegate.scrollBottom();
			angular.element(event.target).parent().find("input")[0].focus();
		});

	};
}).controller('TextCtrl', function($scope) {
	$scope.data = {};
	$scope.data.bigText = $scope.$parent.bigText;
}).controller('AccountCtrl', function($scope, Popup, LoginUser) {
	$scope.showLogin = function() {
		// Popup.show($scope, 'templates/modal-login.html');
		LoginUser.needLogin($scope.$new(), function() {
		});
	};

	$scope.becomePurchaser = function() {
		Popup.show($scope, 'templates/modal-become-purchaser.html');
	};

	$scope.showChat = function() {
		Popup.show($scope, 'templates/modal-chat.html');
	};

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

	$scope.logoff = function() {
		LoginUser.logoff(function() {
			$scope.$parent.closeModal();
		});
	};
}).controller('AccountUserEditCtrl', function($scope, $q, $ionicActionSheet, Popup, Camera, LoginUser, Users) {
	var $stateParams = {
		userId : LoginUser.ID
	};
	$scope.user = Users.get($stateParams);

	// $scope.user.Image = "img/avatar-default.jpg";

	$scope.popupProvinces = function() {
		Popup.show($scope, 'templates/modal-provinces.html');
		$scope.ret = function(item) {
			if (!$scope.user.Address) {
				$scope.user.Address = {};
			}
			angular.extend($scope.user.Address, item);
		};
	};

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
			$scope.uploadPromise = Camera.upload(imageURI);
			$scope.uploadPromise.then(function(result) {
				var serverUrl = result.response;
				$scope.user.Image = serverUrl;
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

	$scope.showCameraMenu = function() {
		$ionicActionSheet.show({
			buttons : [ {
				text : '拍照'
			}, {
				text : '从相册选择'
			} ],
			cancelText : '取消',
			cancel : function() {
				// add cancel code..
			},
			buttonClicked : function(index) {
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

	$scope.getPhotoFromCamera = function() {
		$scope.getPhoto(Camera.PictureSourceType.CAMERA);
	};

	$scope.getPhotoFromLibrary = function() {
		$scope.getPhoto(Camera.PictureSourceType.PHOTOLIBRARY);
	};

	$scope.submit = function() {
		if (!$scope.user.NewPwd && $scope.user.NewPwd != $scope.user.NewPwdConfirm) {

		} else {
			$q.all([ $scope.uploadPromise ]).then(function(results) {
				doSubmit();
			});
		}
	};
	var doSubmit = function() {
		if ($scope.user.NewPwd == $scope.user.NewPwdConfirm) {
			$scope.user.$update(function() {
				LoginUser.reload();
				$scope.$parent.closeModal();
			});
		}
	};
}).controller('AccountBalanceCtrl', function($scope, Payments, Balances, Popup) {
	$scope.doRefresh = function() {
		load(function() {
			$scope.$broadcast('scroll.refreshComplete');
		});
	};
	var load = function(funcPageLoadSucceed) {

		var $stateParams = {
			userId : $scope.currentUser.ID
		};
		$scope.balance = Balances.get($stateParams);

		$scope.payments = Payments.query({
			User : $scope.currentUser.ID
		},function(){
			funcPageLoadSucceed();
		});
	};
	load();

	$scope.showDetail = function(payment) {
		$scope.payment = payment;
		Popup.show($scope, 'templates/modal-account-payment.html');
	};

	$scope.withdraw = function() {
		var scope = $scope.$new();
		scope.Amount = $scope.balance.Amount;
		Popup.show(scope, 'templates/modal-balance-withdraw.html', function(payment) {
			load();
		});
	};

}).controller('PaymentInfoCtrl', function($scope, $state, Payments) {

	var $stateParams = {
		paymentId : $scope.$parent.payment.ID
	};

	$scope.payment = Payments.get($stateParams);

}).controller('AccountLegalCtrl', function($scope, $state) {

}).controller('AccountAboutCtrl', function($scope, $state) {

}).controller('SearchCtrl', function($scope, $state, Countries, Popup) {
	$scope.req = {};
	$scope.popupCountries = function() {
		$scope.datalist = Countries.query();
		Popup.show($scope, 'templates/modal-select.html', function(item) {
			$scope.req.Country = item.ID;
			$scope.req.CountryName = item.Name;
		});
	};

	$scope.ok = function() {
		$scope.$parent.closeModal();
		var params = {};
		if (angular.isDefined($scope.req.Name)) {
			params.Name = "@" + $scope.req.Name;
		}
		if (angular.isDefined($scope.req.Country)) {
			params.Country = $scope.req.Country;
		}

		if (angular.isDefined($scope.req.priceFrom) || angular.isDefined($scope.req.priceTo)) {
			params.ExpectedPrice = ($scope.req.priceFrom || "") + "~" + ($scope.req.priceTo || "");
		}
		$state.go('products-search', params);
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
}).controller('UnionpayCtrl', function($scope, $http, Popup) {
	// for unionpay test by jih ++++++++++++++++++++++++++
	$scope.pay = function() {

		$http.jsonp("http://www.gouwudai.net.cn:8080/bag-unionpay-server/trade?callback=JSON_CALLBACK").success(function(data, status) {
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

	$scope.popupPay = function() {
		Popup.show($scope, 'templates/modal-order-pay.html');
		alert(window.document.getElementsByTagName("body")[0].clientWidth);
		alert(window.devicePixelRatio);
		alert(screen.width);
	}

})
// ---------------------------------------------------

;

