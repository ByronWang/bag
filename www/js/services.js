angular.module('starter.services', []).factory('Host', function() {
	var host = window.location.host;
	var pc = false;// For Test
	if (host) {
		host = host.substr(0, host.indexOf(":"));
		host = "http://" + host + ":8686";
		pc = true;
	} else {
		// host = "192.168.12.100";
		host = "192.168.0.101";
		// host = "10.0.0.57";
		host = "http://" + host + ":8686";
		pc = false;
	}
	// host = "http://www.gouwudai.net.cn:8686";
	return {
		host : host,
		pc : pc,
		setHost : function(newhost) {
			host = newhost;
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
	return $resource(Host.host + '/d/OrderItem/:itemId');
}).factory('DeliveryMethod', function($resource, Host) {
	var list = $resource(Host.host + '/d/DeliveryMethod/:itemId').query();
	return {
		query : function(a, b, c) {
			return list;
		}
	};
}).factory('Countries', function($resource, Host) {
	var list = $resource(Host.host + '/d/Country/:countryId').query();
	return {
		query : function(a, b, c) {
			return list;
		}
	};
}).factory('Products', function($resource, Host) {
	return $resource(Host.host + '/d/Product/:productId');
}).factory('Orders', function($resource, Host) {
	var url = Host.host + '/d/Order/:orderId';
	return $resource(url);
}).factory('OrderItems', function($resource, Host) {
	var url = Host.host + '/d/OrderItem/:itemId';
	return $resource(url);
}).factory('Users', function($resource, Host) {
	var url = Host.host + '/d/User/:userId';
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
	return $resource(Host.host + '/d/OrderItem/:itemId/OrderItemFlow/:flowId');
}).factory('OrderItemFlow', function($resource, Host) {
	return $resource(Host.host + '/d/OrderItemFlow/:flowId');
}).factory('Payments', function($resource, Host) {
	return $resource(Host.host + '/d/Payment/:paymentId');
}).factory('PaymentFlow', function($resource, Host) {
	return $resource(Host.host + '/d/PaymentFlow/:flowId');
}).factory('PaymentFlowByUser', function($resource, Host) {
	return $resource(Host.host + '/d/User/:userId/PaymentFlow/:flowId');
}).factory('OrderBiding', function($resource, Host) {
	return $resource(Host.host + '/d/Bid/:bidId');
}).factory('Camera', [ '$q', 'Host', function($q, Host) {

	return {
		getPicture : function(options) {
			var q = $q.defer();

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

			var options = new FileUploadOptions();
			options.fileKey = "file";
			options.fileName = imageURI.substr(imageURI.lastIndexOf('/') + 1);
			options.mimeType = "multipart/form-data";
			options.chunkedMode = false;
			ft = new FileTransfer();
			var uploadUrl = encodeURI(Host.host + "/f/uploads/");
			ft.upload(imageURI, uploadUrl, function(result) {
				q.resolve(result);
			}, function(err) {
				q.reject(err);
			}, options);

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
	}
}).factory('Exts', function() {
	return {
		encode : function(o) {
			var es = "";
			angular.forEach(o, function(v, k) {
				es = es + k + ":" + v + ";";
			});

			if (es.length > 0) {
				es = es.substr(0, es.length - 1);
			}
			return es;
		},
		decode : function(str) {
			var o = {};
			if (str) {
				var kva = str.split(";");
				angular.forEach(kva, function(kv) {
					var k_v = kv.split(":");
					o[k_v[0]] = k_v[1];
				});
			}
			return o;
		}
	};
}).factory('LoginUser', function($ionicModal, $resource, $http, Host, Users, Cart) {
	var loginUsers = $resource(Host.host + '/d/User/:userId');

	var defaultUser = {
		isLogin : false,
		BePurchaser : false,
		Name : "未登录",
		Image : "img/avatar-default.jpg",
		Address : {}
	};

	return {
		isLogin : false,
		BePurchaser : false,
		needLogin : function($scope, funcSucceed) {
			if (!this.isLogin) { // f/login
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
					Cart.load(user);
					if (funcSucceed) {
						funcSucceed(user);
					}
				};
			} else {
				if (funcSucceed) {
					funcSucceed();
				}
			}
		},
		login : function(username, pwd, funcSucceed) {
			var _this = this;
			$http.post(Host.host + '/f/access/', {
				Name : username,
				Password : pwd
			}).success(function(response) { // TODO
				var users = loginUsers.query({
					Name : username
				}, function() {
					var user = users[0];
					_this.ID = user.ID;
					_this.isLogin = true;
					_this.isPurchase = user.isPurchase;
					_this.Name = user.Name;
					_this.NickName = user.NickName;
					_this.Image = user.Image;
					_this.BePurchaser = user.BePurchaser;
					_this.Address = user.Address;
					
					if (!_this.Image) {
						_this.Image = "img/avatar-default.jpg";
					}
					_this.isLogin = true;
					funcSucceed(user);
				});
			});
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
		}
	};
}).factory('Unipay', function($q, Host) {
	return {
		pay : function(tradeNo) {
			var q = $q.defer();

			if (Host.pc) {
				q.resolve("succeed");
				return q.promise;
			}
			// q.resolve("succeed");
			cn.xj.bag.plugin.Unionpay.payForTest(tradeNo, function(result) {
				// Do any magic you need
				q.resolve(result);
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
}).factory('Cart', function($localstorage) {

	var _user = {};

	return {
		Countrys : [],
		load : function(user) {
			_user = user;
			var localCart = $localstorage.getObject("Cart" + _user.ID);
			if (localCart.Countrys) {
				this.Countrys = localCart.Countrys;
			} else {
				this.Countrys = [];
			}
		},

		size : function() {
			var len = 0;
			angular.forEach(this.Countrys, function(o) {
				len = len + o.Items.length;
			});
			return len;
		},

		add : function(item) {
			var countryAlreadyExist = false;
			var itemAlreadyExist = false;

			var countryAlready;
			var itemAlready;

			if (this.Countrys) {
				angular.forEach(this.Countrys, function(o) {
					if (o.Name == item.Product.CountryName) {
						countryAlreadyExist = true;
						countryAlready = o;
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
			} else {
				var country = {
					Name : item.Product.CountryName,
					selected : false,
					Items : []
				};
				country.Items.push(item);
				this.Countrys.push(country);
			}
			this.save();
		},
		save : function() {
			var _this = this;
			$localstorage.setObject("Cart" + _user.ID, {
				Countrys : _this.Countrys
			});
		}
	};
});
