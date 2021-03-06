angular.module('starter.services', []).factory('Host', function($http,$timeout) {
	var host = window.location.host;
	var pc = false;// For Test
	if (host) {
		host = host.substr(0, host.indexOf(":"));
		//host = "www.gouwudai.net.cn";
		host = "http://" + host + ":8686";
		pc = true;
	} else {
//		host = "192.168.0.101";
		 host = "192.168.12.101";
		// host = "10.0.0.57";
		 host = "172.20.10.2";
		host = "www.gouwudai.net.cn";
		host = "http://" + host + ":8686";
		pc = false;
	}
	 
	var server = {
			Live: "none",
			isLive: function(){
				return this.Live == "live";
			}
	};
	
	var tryConnection = function(){
		$http.get(host + '/start.json').then(function(resp) {
			if(200<=resp.status && resp.status < 300 ){
				angular.extend(server,resp.data);			
			}else{
				server.Live = "error";	
				server.Msg = "当前无法正确连接到服务器，请确认网络连接!";		
				retryConnection();
			}
		},function(err) {
			server.Live = "error";	
			server.Msg = "当前无法正确连接到服务器，请确认网络连接!";
			retryConnection();
		});
	};
	
	var retryConnection = function(){
		var timer ={};
		 timer = $timeout(
	             function() {
	            	 $timeout.cancel(timer);
	            	 tryConnection();
	             },
	             2000
	      );
	};
	
	tryConnection();
	
	var debugMode = true;
	
	return {
		host :  function(){
			return host;
		},
		isDebugMode: function(){
			return debugMode;
		},
		isPc : function(){
			return pc;
		},
		setHost : function(newhost) {
			host = newhost;
		},
		getServer : function(){
			return server;
		},
		retry: function(){
			retryConnection();
		},
		setDebugMode : function(debug){
			debugMode = debug;
		}
	};
}).factory('$localstorage', [ '$window', function($window) {
	return {
		set : function(key, value) {
			$window.localStorage[key] = value;
		},
		get : function(key, defaultValue) {
			return $window.localStorage[key] || defaultValue;
		},
		setObject : function(key, value) {
			$window.localStorage[key] = JSON.stringify(value);
		},
		getObject : function(key) {
			return JSON.parse($window.localStorage[key] || '{}');
		}
	};
} ]).factory('Inventorys', function($resource, Host) {
	return $resource(Host.host() + '/d/Inventory/:itemId');
} ).factory('InventoryItems', function($resource, Host) {
	return $resource(Host.host() + '/d/OrderItem/:itemId');
} ).factory('Balances', function($resource, Host) {
	return $resource(Host.host() + '/d/Balance/:userId');
}).factory('DeliveryMethod', function($resource, Host) {
	var list = $resource(Host.host() + '/d/DeliveryMethod/:itemId').query();
	return {
		query : function(a, b, c) {
			return list;
		}
	};
}).factory('Countries', function($http) {
	var countries = [];
	$http.get('js/Country.json').then(function(resp) {	
		countries = resp.data;
	});
	return {
		query : function(a, b, c) {
			return countries;
		}
	};
}).factory('Products', function($resource, Host) {
	return $resource(Host.host() + '/d/Product/:productId');
}).factory('Orders', function($resource, Host) {
	var url = Host.host() + '/d/Order/:orderId';
	return $resource(url);
}).factory('PurchaserOrdes', function($resource, Host) {
	var url = Host.host() + '/d/PurchaserOrder/:orderId';
	return $resource(url);
}).factory('OrderItems', function($resource, Host) {
	var url = Host.host() + '/d/OrderItem/:itemId';
	return $resource(url);
}).factory('Users', function($resource, Host) {
	var url = Host.host() + '/d/User/:userId';
	return $resource(url, {
		userId : '@ID'
	}, {
		update : {
			method : 'PUT'
		}
	});
}).factory('Statuses', function() {
	return {
		bid : {
			ID : 1,
			Name : "发布中"
		},
		purchasing : {
			ID : 2,
			Name : "代购中"
		},
		delivering : {
			ID : 3,
			Name : "收货中"
		},
		completed : {
			ID : 4,
			Name : "已完结"
		},
		cancelOrder : {
			ID : 5,
			Name : "放弃订单"
		},
		cancelPurchase : {
			ID : 6,
			Name : "放弃购买"
		},
	};
}).factory('Actions', function() {
	return {
		payConfirmed : {
			"ID" : 11,
			"Name" : "支付已确认"
		},
		payFinished : {
			"ID" : 10,
			"Name" : "支付已提交"
		},
		payPrepare : {
			"ID" : 9,
			"Name" : "支付准备"
		},
		cancelOrder : {
			"ID" : 8,
			"Name" : "放弃订单"
		},
		cancelPurchasing : {
			"ID" : 7,
			"Name" : "放弃购买"
		},
		delivered : {
			"ID" : 6,
			"Name" : "确认收货"
		},
		delivering : {
			"ID" : 5,
			"Name" : "开始发货"
		},
		purchased : {
			"ID" : 4,
			"Name" : "购买完成"
		},
		purchasing : {
			"ID" : 3,
			"Name" : "开始购买"
		},
		bitSucceed : {
			"ID" : 2,
			"Name" : "选中买手"
		},
		sendout : {
			"ID" : 1,
			"Name" : "已发布"
		}
	};
}).factory('OrderItemFlowByItem', function($resource, Host) {
	return $resource(Host.host() + '/d/OrderItemFlow/?OrderItem=:itemId');
}).factory('OrderItemFlow', function($resource, Host) {
	return $resource(Host.host() + '/d/OrderItemFlow/:flowId');
}).factory('ChatMessages', function($resource, Host) {
	return $resource(Host.host() + '/d/ChatMessage/:id');
}).factory('Payments', function($resource, Host) {
	return $resource(Host.host() + '/d/Payment/:paymentId');
}).factory('PaymentFlow', function($resource, Host) {
	return $resource(Host.host() + '/d/PaymentFlow/:flowId');
}).factory('PaymentFlowByUser', function($resource, Host) {
	return $resource(Host.host() + '/d/User/:userId/PaymentFlow/:flowId');
}).factory('OrderBiding', function($resource, Host) {
	return $resource(Host.host() + '/d/Bid/:bidId');
}).factory('Camera', [ '$q', 'Host', function($q, Host) {

	return {
		getPicture : function(options) {
			var q = $q.defer();

			
			if (!navigator.camera && Host.isDebugMode()) {
				q.resolve("img/productActual-default.jpg");
				return q.promise;
			}
			navigator.camera.getPicture(function(result) {
				// Do any magic you need
				q.resolve(result);
			}, function(err) {
				q.reject(err);
			}, options);

			return q.promise;
		},
		DestinationType : {
			DATA_URL : 0, // Return image as base64-encoded string
			FILE_URI : 1, // Return image file URI
			NATIVE_URI : 2
		// Return image native URI (e.g., assets-library:// on iOS or content://
		// on Android)
		},
		PictureSourceType : {
			PHOTOLIBRARY : 0,
			CAMERA : 1,
			SAVEDPHOTOALBUM : 2
		},
		upload : function(imageURI) {
			var q = $q.defer();
			
			if (Host.isDebugMode()) {
				q.resolve({	response:"img/productActual-default.jpg"});
				return q.promise;
			}
			{
				var options = new FileUploadOptions();
				options.fileKey = "file";
				options.fileName = imageURI.substr(imageURI.lastIndexOf('/') + 1);
				options.mimeType = "multipart/form-data";
				options.chunkedMode = false;
				var ft = new FileTransfer();
				var uploadUrl = encodeURI(Host.host() + "/f/uploads/");
				ft.upload(imageURI, uploadUrl, function(result) {
					q.resolve(result);
				}, function(err) {
					q.reject(err);
				}, options);
			}

			return q.promise;
		}
	};
}]).factory('Geolocation', [ '$q', 'Host', '$http',function($q, Host,$http) {

	return {
		getGeolocation : function(options) {
			var q = $q.defer();

			
			if (Host.isPc() && Host.isDebugMode()) {
				var position = {};
				position.coords = {
						latitude: 31.21,
						longitude: 121.52
				};				
				q.resolve(position);
				return q.promise;
			}
		
			navigator.geolocation.getCurrentPosition(function(result) {
				q.resolve(result);
			}, function(err) {
				$ionicLoading.hide();
				q.reject(err);
			});

			return q.promise;
		},
		getRegion : function() {
			var q = $q.defer();			
			var qLocation = this.getGeolocation();
			qLocation.then(function(position){
				var url = 'http://111.221.29.14/REST/v1/Locations/' + position.coords.latitude + ',' + position.coords.longitude + '?includeEntityTypes=Address&o=json&key=AlVuxcZtD7dY3Hb8ZFcOx_JSm0Vnqq1m82cx77HLguQ-7Em9e0Hul0pNfFLuPCwg&c=zh-Hans' + "&jsonp=JSON_CALLBACK";
				$http.jsonp(url).success(function(result) {		
					var resources = result.resourceSets[0].resources;
					var region = resources[resources.length - 1];
					region.coords = position.coords;
					q.resolve(region);
				}, function(err) {
					q.reject(err);
				});
			});
			return q.promise;
		}
	};
	
} ]).factory('Address', function($http) {
	var provinces = [];
	// Might use a resource here that returns a JSON array
	$http.get('js/ProvinceAndCityJson.json').then(function(resp) {
		console.log('Success', resp);
		provinces = resp.data;
	}, function(err) {
		console.error('ERR', err);
		// err.status will contain the status code
	});

	return {
		provinces : function() {
			return provinces;
		}
	};
}).factory('Exts', function() {
	return {
		encode : function(o) {
			var str = JSON.stringify(o||{});
			str = str.replace(/"([^"]*)"/g, "'$1'");			
			return str;
		},
		decode : function(str) {
			var slocal = str || "";
			slocal = slocal.replace(/'([^']*)'/g, "\"$1\"");	
			return JSON.parse(slocal || '{}');
		}
	};
}).factory('LoginUser', function($ionicModal, $resource, $http,Exts, Host, Users,$localstorage, $timeout) {
	var loginUsers = $resource(Host.host() + '/d/User/:userId');

	var defaultUser = {
		isLogin : false,
		BePurchaser : false,
		Name : "未登录",
		Image : "img/avatar-default.jpg",
		Address : {}
	};
	
	

	return {
		rememberme : {},
		readedItems :{},
		cart :{},
		waitingUpdateReadList: false,
		isLogin : false,
		BePurchaser : false,
		needLogin : function($scope, funcSucceed) {
			var _this = this;
			if (!_this.isLogin) { // f/login
				var rememberme = $localstorage.getObject("rememberme");
				if(rememberme.rememberme){
					_this.login(rememberme.username, rememberme.md5Password,rememberme, funcSucceed,function(){
						_this.doPopupLogin($scope, funcSucceed) ;
					});
				}else{
					_this.doPopupLogin($scope, funcSucceed) ;
				}
			} else {
				if (funcSucceed)	funcSucceed();
			};
				
		},
		doPopupLogin : function($scope, funcSucceed) {
			$scope.user = {};
			$ionicModal.fromTemplateUrl('templates/modal-login.html', {
				scope : $scope,
				animation : 'slide-in-up'
			}).then(function(modal) {
				$scope.modal = modal;
				$scope.modal.show();
				return;
			});
			
			$scope.openModal = function() {
				$scope.modal.show();
			};
			
			$scope.closeModal = function() {
				$scope.modal.hide();
			};
			
			$scope.ret = function(user) {
				if (funcSucceed) {
					funcSucceed(user);
				}
				$scope.modal.hide();
			};
		},
		login : function(username, md5Password,options, funcSucceed,funcError) {
			var _this = this;
			
			if(options.rememberme){
				$localstorage.setObject("rememberme",{
					username: username,
					md5Password :md5Password,
					rememberme : true
				});
			}else{
				$localstorage.setObject("rememberme",null);					
			}
			
			$http.post(Host.host() + '/f/access/', {
				Name : username,
				Password : md5Password
			}).then(function(resp) { // TODO
				if(resp.status == 200){
					var user = resp.data;
					_this.ID = user.ID;
					_this.isLogin = true;
					_this.isPurchase = user.isPurchase;
					_this.Name = user.Name;
					_this.NickName = user.NickName;
					_this.Image = user.Image;
					_this.BePurchaser = user.BePurchaser;
					_this.Address = user.Address;

					_this.readedItems = Exts.decode(user.ExtendsReaded);
					_this.cart = Exts.decode(user.ExtendsCart) || {};
					_this.cart.Countrys = _this.cart.Countrys || [];
					_this.refreshChecked(_this.cart.Countrys);
					

					if (!_this.Image) {
						_this.Image = "img/avatar-default.jpg";
					}
					_this.isLogin = true;
					funcSucceed(user);
				}else{
					if(funcError){
						funcError("认证失败，请确认你的用户名密码！");
						return;
					}					
				}
			});
		},
		checkReadedForOrderList : function(orderList){
			var _this = this;
			angular.forEach(orderList, function(o) {
				angular.forEach(o.Items,function(item){
					item.Readed = (_this.readedItems[item.ID]  && _this.readedItems[item.ID] == item.LastUpdated);
				});
			});
		},
		checkReadedForItemList : function(itemList){
			var _this = this;
			angular.forEach(itemList,function(item){
				item.Readed = (_this.readedItems[item.ID]  && _this.readedItems[item.ID] == item.LastUpdated);
			});
		},
		checkReadedForItem : function(item){
			var _this = this;
			item.Readed = (_this.readedItems[item.ID]  && _this.readedItems[item.ID] == item.LastUpdated);
		},
		saveExtends : function(){
			var _this = this;
			if(!_this.waitingUpdateReadList){
				_this.waitingUpdateReadList = true;
				var timer = {};
				timer= $timeout(
			             function() {
			            	 _this.waitingUpdateReadList = false;
			            	 $timeout.cancel(timer);
			 				 var user = Users.get({userId : _this.ID},function(){
			 					user.ExtendsReaded = Exts.encode(_this.readedItems);
			 					user.ExtendsCart = Exts.encode(_this.cart);
			 					user.$update();
							});
			             },
			             1
			      );		
			}
		},
		read : function(item){
			var old = this.readedItems[item.ID];
			if(old == item.LastUpdated){
				return;
			}
			
			this.readedItems[item.ID] = item.LastUpdated;
			this.saveExtends();
		},
		hasReaded : function(itemID,lastUpdated){
			return lastUpdated==ReadedItems[itemID] ;
		},
		reload : function() {
			var _this = this;
			var user = loginUsers.get({
				userId : this.ID
			}, function() {
				_this.ID = user.ID;
				_this.isLogin = true;
				_this.isPurchase = user.isPurchase;
				_this.Name = user.Name;
				_this.NickName = user.NickName;
				_this.Image = user.Image;
				_this.BePurchaser = user.BePurchaser;
				_this.Address = user.Address;				
				_this.readedItems = Exts.decode(user.ExtendsReaded);
				_this.cart = Exts.decode(user.ExtendsCart) || {};
				_this.cart.Countrys = _this.cart.Countrys || [];
				_this.refreshChecked(_this.cart.Countrys);
			});
		},
		logoff : function(funcSucceed) {
			var _this = this;
			_this.ID = undefined;
			_this.isLogin = defaultUser.isLogin;
			_this.Name = defaultUser.Name;
			_this.NickName = defaultUser.NickName;
			_this.Image = defaultUser.Image;
			_this.BePurchaser = defaultUser.BePurchaser;
			_this.Address = defaultUser.Address;
			funcSucceed();
		},
		refreshChecked : function(countrys){
			var hasSelected = false;
			angular.forEach(countrys, function(c) {
				if(!hasSelected){
					var checkall = true;
					var hasChecked = false;
					angular.forEach(c.Items, function(i) {
						checkall = checkall && i.checked;
						hasChecked = hasChecked ||  i.checked;
					});
					if(hasChecked){
						c.selected = true;			
						hasSelected = true;	
					}			
					if (checkall) {
						c.checked = checkall;
					}
				}else{
					c.checked = false;
					angular.forEach(c.Items, function(i) {
						i.checked = false;
					});
				}
			});
		},
	};
}).factory('Unipay', function($q, Host) {
	return {
		pay : function(tradeNo) {
			var q = $q.defer();

			if (Host.isPc() && Host.isDebugMode()) {
				q.resolve("succeed");
				return q.promise;
			}
			// q.resolve("succeed");
			cn.xj.bag.plugin.Unionpay.payForTest(tradeNo, function(result) {
                                                 if(result == "success"){
                                                 q.resolve(result);
                                                 
                                                 }else{
                                                 q.reject(result)
                                                 }
                                                 

			}, function(err) {
				q.reject(err);
			});

			return q.promise;
		},

	};
}).factory('Popup', function($ionicModal) {
	return {
		show : function($scope, templateUrl, onSucceed, onCancel) {
			var scope = $scope.$new();
			var thisModal = {};
			$ionicModal.fromTemplateUrl(templateUrl, {
				scope : scope,
				animation : 'slide-left-right'
			}).then(function(modal) {
				thisModal = modal;
				thisModal.show();
			});

			scope.closeModal = function(result) {
				if (onSucceed) {
					onSucceed();
				}
				thisModal.hide();
				thisModal.remove();
			};

			scope.done = function(result) {
				if (onSucceed) {
					onSucceed(result);
				}
				thisModal.hide();
				thisModal.remove();
			};
			scope.cancel = function(result) {
				if (onCancel) {
					onCancel(result);
				}
				thisModal.hide();
				thisModal.remove();
			};
		}
	};
}).factory('Category', function($http) {
	// Might use a resource here that returns a JSON array

	// Some fake testing data
	var categories = [];
	var categoriesLevel1 = [];
	var categoriesGrouped = [];

	function desc(id, name) {
		angular.forEach(categories, function(c) {
			if (c.ParentID == id) {
				c.Desc = name + ">" + c.Name;
				desc(c.ID, c.Name);
			}
		});
	}

	$http.get('js/Categories.json').then(function(resp) {
		var cats = resp.data;

		var colors = [ "#6cc143", "#f5c132", "#fd8e35", "#ff565b", "#fe8864", "#42bde8", "#7b7ad7", "#f8cc58", "#fd8e35", "#f5c132", "#da70d6" ];

		angular.forEach(cats, function(c) {
			categories.push(c);
			if (c.Level == 1) {
				categoriesLevel1.push(c);
			}
		});

		var index = 0;

		var nscat = [];
		categoriesGrouped.push(nscat);
		angular.forEach(categoriesLevel1, function(c) {
			c.Color = colors[index];

			if (index < colors.length - 1) {
				index = index + 1;
			} else {
				index = 0;
			}

			if (nscat.length >= 3) {
				nscat = [];
				categoriesGrouped.push(nscat);
			}
			nscat.push(c);

			desc(c.ID, c.Name);
		});

	}, function(err) {
		console.error('ERR', err);
		// err.status will contain the status code
	});

	return {
		all : function() {
			return categories;
		},
		level1Grouped : function() {
			return categoriesGrouped;
		},
		level1 : function() {
			return categoriesLevel1;
		},
		get : function(id) {
			var cat;
			angular.forEach(categories, function(c) {
				if (c.ID == id) {
					cat = c;
				}
			});
			return cat;
		},
		children : function(id) {
			var cren = [];
			angular.forEach(categories, function(c) {
				if (c.ParentID == id) {
					cren.push(c);
				}
			});

			// Simple index lookup
			return cren;
		}
	};
}).factory('Cart', function(LoginUser) {

	return {
		Countrys  : function(){
			return LoginUser.cart.Countrys;
		},
		size : function() {
			var len = 0;
			angular.forEach(this.Countrys(), function(o) {
				len = len + o.Items.length;
			});
			return len;
		},

		add : function(item) {
			var countryAlreadyExist = false;
			var itemAlreadyExist = false;

			var countryAlready;
			var itemAlready;
			
			item.checked = true;

			if (this.Countrys) {
				angular.forEach(this.Countrys(), function(o) {
					if (o.Name == item.Product.CountryName) {
						countryAlreadyExist = true;
						countryAlready = o;
					}else{
						angular.forEach(o.Items, function(i) {
							i.checked = false;
						});
					}
				});
			}

			if (countryAlreadyExist) {
				angular.forEach(countryAlready.Items, function(o) {
					if (angular.equals(item.Product, o.Product)) {
						itemAlreadyExist = true;
						itemAlready = o;
					}
				});
				if (itemAlreadyExist) {
					itemAlready.Quantity = itemAlready.Quantity + item.Quantity;
				} else {
					countryAlready.Items.push(item);
				}
				var checkall = true;
				angular.forEach(countryAlready.Items, function(i) {
					checkall = checkall && i.checked;
				});
				countryAlready.selected = true;		
				if (checkall) {
					countryAlready.checked = checkall;
				}
			} else {
				var country = {
					Name : item.Product.CountryName,
					selected : false,
					Items : []
				};
				country.Items.push(item);
				this.Countrys().push(country);
				country.selected = true;		
				country.checked = true;
			}
			this.save();
			LoginUser.refreshChecked(this.Countrys);
		},
		save : function() {
			LoginUser.saveExtends();
		}
	};
});
