angular.module('starter.services', [])

/**
 * A simple example service that returns some data.
 */
.factory('Host', function() {
	var host = window.location.host;
	if(host){
		host = host.substr(0, host.indexOf(":"));
		host = "http://" + host + ":8686";		
	}else{
		host = "192.168.0.1";
		host = "http://" + host + ":8686";		
	}
	return {
		host : host
	};
})

.factory('Inventorys', function($resource, Host) {
	return $resource(Host.host + '/d/OrderItem/:itemId');
})

.factory('DeliveryMethod', function($resource, Host) {
	return $resource(Host.host + '/d/DeliveryMethod/:itemId');
})

.factory('Countries', function($resource, Host) {
	return $resource(Host.host + '/d/Country/:countryId');
})

.factory('Products', function($resource, Host) {
	return $resource(Host.host + '/d/Product/:productId');
})

.factory('Orders', function($resource, Host) {
	var url = Host.host + '/d/Order/:orderId';
	return $resource(url);
})

.factory('OrderItems', function($resource, Host) {
	var url = Host.host + '/d/OrderItem/:itemId';
	return $resource(url);
})

.factory('Statuses', function() {
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
			Name : "完成"
		},
	};
}).factory('Actions', function() {
	return {
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
})

.factory('OrderItemFlowByItem', function($resource, Host) {
	return $resource(Host.host + '/d/OrderItem/:itemId/OrderItemFlow/:flowId');
}).factory('OrderItemFlow', function($resource, Host) {
	return $resource(Host.host + '/d/OrderItemFlow/:flowId');
})

.factory('OrderBiding', function($resource, Host) {
	return $resource(Host.host + '/d/Bid/:bidId');
})

.factory('Orders333', function() {
	// Might use a resource here that returns a JSON array

	// Some fake testing data
	var orders = [ {
		id : 0,
		country : '韩国',
		date : '2013-11-11',
		Items : [ {
			id : 0,
			name : '自然堂凝时鲜颜肌活乳液',
			type : '化妆品',
			country : '韩国',
			description : "",
			Amount : 3,
			expectedPrice : '3000',
			StatusID : 1,
			status : "买手已接单"
		}, {
			id : 1,
			name : '苹果手机',
			type : '数码',
			country : '美国',
			description : "",
			Amount : 3,
			expectedPrice : '5000',
			seller : '买手一',
			StatusID : 2,
			status : "买手购买中"
		}, {
			id : 2,
			name : '花王婴儿尿布',
			type : '妇婴',
			country : '日本',
			description : "",
			Amount : 3,
			expectedPrice : '500',
			seller : '买手一',
			StatusID : 4,
			status : "寻求买手中"
		}, {
			id : 3,
			name : '惠氏奶粉',
			type : '妇婴',
			country : '美国',
			description : "",
			Amount : 3,
			expectedPrice : '290',
			seller : '买手一',
			StatusID : 5,
			status : "买手已接单"
		} ]
	}, {
		id : 1,
		country : '美国',
		date : '2013-11-11',
		Items : [ {
			id : 0,
			name : '自然堂凝时鲜颜肌活乳液',
			type : '化妆品',
			country : '韩国',
			description : "",
			Amount : 3,
			expectedPrice : '3000',
			StatusID : 1,
			status : "买手已接单"
		}, {
			id : 1,
			name : '苹果手机',
			type : '数码',
			country : '美国',
			description : "",
			Amount : 3,
			expectedPrice : '5000',
			seller : '买手一',
			StatusID : 2,
			status : "买手购买中"
		}, {
			id : 2,
			name : '花王婴儿尿布',
			type : '妇婴',
			country : '日本',
			description : "",
			Amount : 3,
			expectedPrice : '500',
			seller : '买手一',
			StatusID : 4,
			status : "寻求买手中"
		}, {
			id : 3,
			name : '惠氏奶粉',
			type : '妇婴',
			country : '美国',
			description : "",
			Amount : 3,
			expectedPrice : '290',
			seller : '买手一',
			StatusID : 5,
			status : "买手已接单"
		} ]
	}, {
		id : 2,
		country : '日本',
		date : '2013-11-11',
		Items : [ {
			id : 0,
			name : '自然堂凝时鲜颜肌活乳液',
			type : '化妆品',
			country : '韩国',
			description : "",
			Amount : 3,
			expectedPrice : '3000',
			StatusID : 2,
			status : "买手已接单"
		}, {
			id : 1,
			name : '苹果手机',
			type : '数码',
			country : '美国',
			description : "",
			Amount : 3,
			expectedPrice : '5000',
			seller : '买手一',
			StatusID : 2,
			status : "买手购买中"
		}, {
			id : 2,
			name : '花王婴儿尿布',
			type : '妇婴',
			country : '日本',
			description : "",
			Amount : 3,
			expectedPrice : '500',
			seller : '买手一',
			StatusID : 2,
			status : "寻求买手中"
		}, {
			id : 3,
			name : '惠氏奶粉',
			type : '妇婴',
			country : '美国',
			description : "",
			Amount : 3,
			expectedPrice : '290',
			seller : '买手一',
			StatusID : 2,
			status : "买手已接单"
		} ]
	} ];

	return {
		all : function() {
			return orders;
		},
		get : function(orderId) {
			// Simple index lookup
			return orders[orderId];
		},
		add : function(order) {
			orders.push(order);
			order.id = orders.length - 1;
			angular.forEach(order.Items, function(i) {
				i.StatusID = 1;
			});

			return order.id;
		},
		done : function(item, StatusID, Action, params) {
			if (!params) {
				params = {};
			}

			params.StatusID = StatusID;
			params.ActionId = Action;
			params.timestamp = new Date();
			if (!item.actions) {
				item.actions = [];
			}
			item.actions.push(params);
			item.current = params;
		},
		getItem : function(orderId, itemId) {
			var item = orders[orderId].Items[itemId];
			if (!item.actions) {
				item.actions = [];
				item.current = {
					StatusID : 1
				};
			} else if (item.actions.length > 0) {
				item.current = item.actions[item.actions.length - 1];
			} else {
				item.current = {
					StatusID : 1
				};
			}
			return item;
		}
	};
})

.factory('Camera', [ '$q', function($q) {

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
		 uploadPhoto: function(imageURI) {

		       var options = new FileUploadOptions();

		       //用于设置参数，服务端的Request字串

		       options.fileKey = "fileAddPic";

		       options.fileName = imageURI.substr(imageURI.lastIndexOf('/') + 1);

		 

		       //如果是图片格式，就用image/jpeg，其他文件格式上官网查API

		       options.mimeType = "image/jpeg";

		 

		       //这里的uri根据自己的需求设定，是一个接收上传图片的地址

		        varuri = encodeURI("http://192.168.0.131:88/uploadHandler.ashx");

		       options.chunkedMode = false;

		       var ft = newFileTransfer();

		       ft.upload(imageURI, uri, uploadOK, onFail, options);

			   function uploadOK(msg) {

			       var response = msg.response;

			       alert(response);

			   }
		   }
	};
} ])

.factory('Address', function($http) {
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
})

.factory('Exts', function() {
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
}).factory('LoginUser', function($ionicModal, Users) {
	// Might use a resource here that returns a JSON array

	var defaultUser = {
		isLogin : false,
		isPurchase : false,
		username : "未登录"
	};

	return {
		isLogin : false,
		isPurchase : false,
		needLogin : function($scope) {
			if (!this.isLogin) {
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
			}
		},
		login : function(username, pwd) {
			var user = Users.get(username);
			if (user) {
				angular.extend(this, user);
				this.isLogin = true;
				return true;
			} else {
				return false;
			}
		},
		logoff : function() {
			angular.extend(this, defaultUser);
		}
	};
}).factory('Users', function() {
	// Might use a resource here that returns a JSON array

	// Some fake testing data
	var users = [ {
		ID : 1,
		Name : 'wangshilian',
		Password : '1234567',
		Nickname : "alian",
		AvatarPath : "",
		isPurchase : true
	}, {
		ID : 2,
		Name : 'jihua',
		Password : '1234567',
		Nickname : "alian",
		AvatarPath : "",
		isPurchase : false
	}, {
		ID : 3,
		Name : 'liubo',
		Password : '1234567',
		Nickname : "alian",
		AvatarPath : "",
		isPurchase : false
	} ];

	return {
		all : function() {
			return users;
		},
		get : function(Name) {
			var user;
			angular.forEach(users, function(u) {
				if (angular.equals(u.Name, Name)) {
					user = u;
				}
			});
			// Simple index lookup
			return user;
		}
	};
})

.factory('Popup', function($ionicModal) {
	return {
		show: function($scope,templateUrl,callback){
				var scope = $scope.$new();
			  $ionicModal.fromTemplateUrl(templateUrl, {
			    scope: scope,
			    animation: 'slide-left-right'
			  }).then(function(modal) {
			    $scope.modal = modal;
			    $scope.modal.show();
			  });
			  
			  scope.closeModal = function() {	    			  
				  scope.modal.hide();
			  };	
		}
	};
})


.factory(
		'Category',
		function($http) {
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

			$http.get('js/Categories.json').then(
					function(resp) {
						var cats = resp.data;

						var colors = [ "#6cc143", "#f5c132", "#fd8e35", "#ff565b", "#fe8864", "#42bde8", "#7b7ad7",
								"#f8cc58", "#fd8e35", "#f5c132", "#da70d6" ];

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

							if (index < colors.length) {
								index = index + 1;
							} else {
								index = 0;
							}

							if (nscat.length >= 4) {
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
		})

.factory('Cart', function($ionicModal) {
	return {
		cnt : 0,
		Countrys : [],

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
					if (o.name == item.Product.Country) {
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
					name : item.Product.Country,
					Items : []
				};
				country.Items.push(item);
				this.Countrys.push(country);
			}
		},
		edit : function($scope) {
			$ionicModal.fromTemplateUrl('templates/modal-orders-cart.html', {
				scope : $scope,
				animation : 'slide-in-up'
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
		}
	};

});
