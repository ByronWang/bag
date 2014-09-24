angular.module('starter.services', [])

/**
 * A simple example service that returns some data.
 */
.factory('Host', function() {
	var host = window.location.host;
	host  = host.substr(0,host.indexOf(":"));
	host = "http://" + host +":8686" ;
	return {
		host: host
	};
})

.factory('Inventorys', function(Orders) {
  // Might use a resource here that returns a JSON array

	var inventorys = [];
	/*
  // Some fake testing data
  var inventorys = [
        			            {  id:0,country:'韩国',date:'2013-11-11',
        			            	Items:[
        			   	    		    { id: 0, name: '自然堂凝时鲜颜肌活乳液', type:'化妆品', country:'韩国',description:"",Amount:3,expectedPrice:'3000',StatusID:1,status:"买手已接单"},
        				    		    { id: 1, name: '苹果手机' , type:'数码', country:'韩国',description:"",Amount:3,expectedPrice:'5000',seller:'买手一',StatusID:2,status:"买手购买中"},
        				    		    { id: 2, name: '花王婴儿尿布' , type:'妇婴', country:'韩国',description:"",Amount:3,expectedPrice:'500',seller:'买手一',StatusID:4,status:"寻求买手中"},
        				    		    { id: 3, name: '惠氏奶粉' , type:'妇婴', country:'韩国',description:"",Amount:3,expectedPrice:'290',seller:'买手一',StatusID:5,status:"买手已接单"}
        			            	 ]		            	
        			            },
        			            {id:1,country:'美国',date:'2013-11-11',
        			            	Items:[
        			   	    		    { id: 0, name: '自然堂凝时鲜颜肌活乳液', type:'化妆品', country:'韩国',description:"",Amount:3,expectedPrice:'3000',StatusID:1,status:"买手已接单"},
        				    		    { id: 1, name: '苹果手机' , type:'数码', country:'美国',description:"",Amount:3,expectedPrice:'5000',seller:'买手一',StatusID:2,status:"买手购买中"},
        				    		    { id: 2, name: '花王婴儿尿布' , type:'妇婴', country:'美国',description:"",Amount:3,expectedPrice:'500',seller:'买手一',StatusID:4,status:"寻求买手中"},
        				    		    { id: 3, name: '惠氏奶粉' , type:'妇婴', country:'美国',description:"",Amount:3,expectedPrice:'290',seller:'买手一',StatusID:5,status:"买手已接单"}
        			            	 ]		            	
        			            },
        			            {id:2,country:'日本',date:'2013-11-11',
        			            	Items:[
        			   	    		    { id: 0, name: '自然堂凝时鲜颜肌活乳液', type:'化妆品', country:'日本',description:"",Amount:3,expectedPrice:'3000',StatusID:2,status:"买手已接单"},
        				    		    { id: 1, name: '苹果手机' , type:'数码', country:'日本',description:"",Amount:3,expectedPrice:'5000',seller:'买手一',StatusID:2,status:"买手购买中"},
        				    		    { id: 2, name: '花王婴儿尿布' , type:'妇婴', country:'日本',description:"",Amount:3,expectedPrice:'500',seller:'买手一',StatusID:2,status:"寻求买手中"},
        				    		    { id: 3, name: '惠氏奶粉' , type:'妇婴', country:'日本',description:"",Amount:3,expectedPrice:'290',seller:'买手一',StatusID:2,status:"买手已接单"}
        			            	 ]		            	
        			            }
        		  ];

*/
  return {
    all: function() {
    	inventorys = [];
    	angular.forEach(Orders.all(),function(order){
    		
    		var items = [];
        	angular.forEach(order.Items,function(item){
        		if(item.StatusID == 1){
        			items.push(item);
        			if(!item.suitors){
        				item.suitors = [];
        			}
        		}
        	});
        	
        	if(items.length>0){
        		var orderCopy = angular.copy(order);
        		orderCopy.Items = items;
            	inventorys.push(orderCopy);
        	}
    	});
      return inventorys;
    },
    get: function(inventoryId) {
    	if(inventorys.length<1){
    		this.all();
    	}
	      // Simple index lookup
	      return inventorys[inventoryId];
	    },
  getItem: function(inventoryId,itemId) {
	      // Simple index lookup
	      return inventorys[inventoryId].Items[itemId];
	    }
  };
})

.factory('Category', function($http) {
	  // Might use a resource here that returns a JSON array

	  // Some fake testing data
	  var categories =[];
	  var categoriesLevel1 = [];
	  var categoriesGrouped = [];
	  
	  $http.get('js/Categories.json').then(function(resp) {
		     var cats = resp.data;
			  
			 var colors =[ "#6cc143","#f5c132" ,"#fd8e35" ,"#ff565b" ,"#fe8864" ,"#42bde8" ,"#7b7ad7" ,"#f8cc58" ,"#fd8e35" ,"#f5c132" ,"#da70d6"];
			  
			  angular.forEach(cats,function(c){
				  categories.push(c);
				  if(c.Level == 1){
					  categoriesLevel1.push(c);
				  }
			  });
			  
			  var index = 0;

			  var nscat = [];
			  categoriesGrouped.push(nscat);
			  angular.forEach(categoriesLevel1,function(c){
				  c.Color = colors[index];
				  
				  if(index < colors.length){
					  index = index + 1;			  
				  }else{
					  index = 0;
				  }
				  
				  if(nscat.length>=4){
					  nscat = [];
					  categoriesGrouped.push(nscat);
				  }
				  nscat.push(c);
			  });
			  
		  }, function(err) {
		    console.error('ERR', err);
		    // err.status will contain the status code
		  });

	  return {
		    all: function() {
			      return categories;
			},
			level1Grouped: function() {
			      return categoriesGrouped;
			    },
	    level1: function() {
		      return categoriesLevel1;
		    },
	    get: function(name) {
	    	var cat;
			  angular.forEach(categories,function(c){
				  if(c.Name == name){
					 cat =  c;
				  }
			  });
			  return cat;
	    },
	    children: function(id) {
	    	var cren = [];
	  	  angular.forEach(categories,function(c){
			  if(c.ParentID == id){
				  cren.push(c);
			  }
		    });
	  	  
		      // Simple index lookup
		      return cren;
		    }
	  };
})


.factory('Countries', function() {
	  // Might use a resource here that returns a JSON array

	  // Some fake testing data
	  var countries = [
		{id:1,name:'美国',},
		{id:2,name:'韩国'},
		{id:3,name:'日本'},
		{id:3,name:'英国'},
		{id:3,name:'德国'}
	  ];

	  return {
	    all: function() {
	      return countries;
	    },
	    get: function(id) {
	      // Simple index lookup
	      return countries[id-1];
	    }
	  };
})


.factory('DeliveryMethods', function() {
	  // Might use a resource here that returns a JSON array

	  // Some fake testing data
	  var methods = [
		{id:1,name:'邮寄',},
		{id:2,name:'买手选定'}
	  ];

	  return {
	    all: function() {
	      return methods;
	    },
	    get: function(id) {
	      // Simple index lookup
	      return methods[id-1];
	    }
	  };
})

.factory('Products', function($resource,Host) {
  return $resource(Host.host +  '/d/Product/:productId');
})

.factory('Orders', function($resource,Host) {
	var url = Host.host +  '/d/Order/:orderId';
  return $resource(url);
})

.factory('OrderFlow', function($resource,Host) {
  return $resource(Host.host +  '/d/OrderItem/:itemId/OrderItemFlow');
})

.factory('OrderBiding', function($resource,Host) {
  return $resource(Host.host +  '/d/Bid/:bidId');
})

	.factory('Orders333', function() {
		  // Might use a resource here that returns a JSON array

		  // Some fake testing data
		  var orders = [
			            {  id:0,country:'韩国',date:'2013-11-11',
			            	Items:[
			   	    		    { id: 0, name: '自然堂凝时鲜颜肌活乳液', type:'化妆品', country:'韩国',description:"",Amount:3,expectedPrice:'3000',StatusID:1,status:"买手已接单"},
				    		    { id: 1, name: '苹果手机' , type:'数码', country:'美国',description:"",Amount:3,expectedPrice:'5000',seller:'买手一',StatusID:2,status:"买手购买中"},
				    		    { id: 2, name: '花王婴儿尿布' , type:'妇婴', country:'日本',description:"",Amount:3,expectedPrice:'500',seller:'买手一',StatusID:4,status:"寻求买手中"},
				    		    { id: 3, name: '惠氏奶粉' , type:'妇婴', country:'美国',description:"",Amount:3,expectedPrice:'290',seller:'买手一',StatusID:5,status:"买手已接单"}
			            	 ]		            	
			            },
			            {id:1,country:'美国',date:'2013-11-11',
			            	Items:[
			   	    		    { id: 0, name: '自然堂凝时鲜颜肌活乳液', type:'化妆品', country:'韩国',description:"",Amount:3,expectedPrice:'3000',StatusID:1,status:"买手已接单"},
				    		    { id: 1, name: '苹果手机' , type:'数码', country:'美国',description:"",Amount:3,expectedPrice:'5000',seller:'买手一',StatusID:2,status:"买手购买中"},
				    		    { id: 2, name: '花王婴儿尿布' , type:'妇婴', country:'日本',description:"",Amount:3,expectedPrice:'500',seller:'买手一',StatusID:4,status:"寻求买手中"},
				    		    { id: 3, name: '惠氏奶粉' , type:'妇婴', country:'美国',description:"",Amount:3,expectedPrice:'290',seller:'买手一',StatusID:5,status:"买手已接单"}
			            	 ]		            	
			            },
			            {id:2,country:'日本',date:'2013-11-11',
			            	Items:[
			   	    		    { id: 0, name: '自然堂凝时鲜颜肌活乳液', type:'化妆品', country:'韩国',description:"",Amount:3,expectedPrice:'3000',StatusID:2,status:"买手已接单"},
				    		    { id: 1, name: '苹果手机' , type:'数码', country:'美国',description:"",Amount:3,expectedPrice:'5000',seller:'买手一',StatusID:2,status:"买手购买中"},
				    		    { id: 2, name: '花王婴儿尿布' , type:'妇婴', country:'日本',description:"",Amount:3,expectedPrice:'500',seller:'买手一',StatusID:2,status:"寻求买手中"},
				    		    { id: 3, name: '惠氏奶粉' , type:'妇婴', country:'美国',description:"",Amount:3,expectedPrice:'290',seller:'买手一',StatusID:2,status:"买手已接单"}
			            	 ]		            	
			            }
		  ];

		  return {
		    all: function() {
		      return orders;
		    },
		    get: function(orderId) {
			      // Simple index lookup
			      return orders[orderId];
			    },
		    add: function(order) {
		    	  orders.push(order);
		    	  order.id = orders.length-1;
			    	angular.forEach(order.Items,function(i){
			    		i.StatusID = 1;
			    	});
		    	  
			      return order.id;
			    },
			done: function(item,StatusID,Action,params){
				if(!params){params={};}
				
				params.StatusID = StatusID;
				params.ActionId = Action;
				params.timestamp = new Date();
		    	if(!item.actions){
		    		item.actions = [];
		    	}		    	
		    	item.actions.push(params);
		    	item.current = params;
			},
		    getItem: function(orderId,itemId) {
		    	var item = orders[orderId].Items[itemId];
		    	if(!item.actions){
		    		item.actions = [];
		    		item.current ={
		    				StatusID :1
		    		}; 
		    	}else if(item.actions.length>0){
		    		item.current =item.actions[item.actions.length-1];
		    	}else{
		    		item.current ={
		    				StatusID :1
		    		}; 		
		    	}		    	
			    return item;
			},
			   StatusType : {
			  		    bid : 1,
			  		    purchasing : 2,
			  		    delivering : 4 ,
			  		    completed : 5 
			    },
		  };
		})
	
.factory('Camera', ['$q', function($q) {
 
  return {
    getPicture: function(options) {
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
  		    DATA_URL : 0,      // Return image as base64-encoded string
  		    FILE_URI : 1,      // Return image file URI
  		    NATIVE_URI : 2     // Return image native URI (e.g., assets-library:// on iOS or content:// on Android)
    },
    PictureSourceType : {
  		    PHOTOLIBRARY : 0,
  		    CAMERA : 1,
  		    SAVEDPHOTOALBUM : 2
  	}
  }
}])

.factory('Address', function($http) {
	var provinces  = [];
	  // Might use a resource here that returns a JSON array
	$http.get('js/ProvinceAndCityJson.json').then(function(resp) {
	    console.log('Success', resp);
	    provinces = resp.data;
	  }, function(err) {
	    console.error('ERR', err);
	    // err.status will contain the status code
	  });
	 
	  return {
		  provinces: function(){
			  return provinces;
		  },
		  cities: function(province){
			  
		  }		  
	  }
})

.factory('Exts', function() {
	return {
		encode : function(o){
			var es = "";
			angular.forEach(o,function(v,k){
				es = es + k + ":" + v +";";
			});
			
			if(es.length>0){
				es = es.substr(0,es.length-1);
			}
			return es;
		},
		decode : function(str){
			var o = {};
			if(str){
				var kva = str.split(";");
				angular.forEach(kva,function(kv){
					var k_v = kv.split(":");
					o[k_v[0]] = k_v[1];
				});
			}
			return o;
		}		
	};
})
.factory('LoginUser', function($ionicModal,Users) {
	  // Might use a resource here that returns a JSON array

	 var defaultUser = {
			 isLogin : false,
			 isPurchase:false,
			 username: "未登录"
	 };
	 
	  return {
		isLogin :false,
		isPurchase : false,
	    needLogin:function($scope){	    
	    	if(!this.isLogin){
	    		$scope.user = {};
	    		$ionicModal.fromTemplateUrl('templates/modal-login.html', {
	    		    scope: $scope,
	    		    animation: 'slide-in-up'
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
	    login: function(username,pwd){
	    	var user = Users.get(username);
	    	if(user){
		    	angular.extend(this,user);
		    	this.isLogin = true;
		    	return true;	    		
	    	}else{
	    		return false;
	    	}
	    },
	    logoff: function(){
	    	angular.extend(this,defaultUser);
	    }
	  };
	})
	.factory('Users', function() {
		  // Might use a resource here that returns a JSON array

		  // Some fake testing data
		  var users = [
        	    { id: 0, username: 'wangshilian',password:'1234567',nickname:"alian",avatarPath:"",isPurchase:true},
        	    { id: 1, username: 'jihua',password:'1234567',nickname:"alian",avatarPath:"",isPurchase:false},
        	    { id: 2, username: 'liubo',password:'1234567',nickname:"alian",avatarPath:"",isPurchase:false}
		  ];

		  return {
		    all: function() {
		      return users;
		    },
		    get: function(username) {
		    	var user;
		    	angular.forEach(users,function(u){
		    		if(angular.equals(u.username,username)){
		    			user =  u;
		    		}
		    	});
		      // Simple index lookup
		      return user;
		    }
		  };
		})
				
	.factory('Cart', function($ionicModal) {
		return {
				cnt:0,
				Countrys:[],
				
				size:function(){
					var len =0;
					angular.forEach(this.Countrys,function(o){
						len = len + o.Items.length;
					});
					return len;
				},
				
				add : function(item){
					var countryAlreadyExist = false;
					var itemAlreadyExist = false;

					var countryAlready;
					var itemAlready;

					if(this.Countrys){
						angular.forEach(this.Countrys,function(o){
							if(o.name == item.Product.Country){
								countryAlreadyExist = true;
								countryAlready = o;
							}
						});						
					}
					
					if(countryAlreadyExist){
						angular.forEach(countryAlready.Items,function(o){
							if(angular.equals(item.Product,o.Product)){
								itemAlreadyExist = true;
								itemAlready = o;
							}
						});
						if(itemAlreadyExist){
							itemAlready.Amount = itemAlready.Amount + item.Amount;
						}else{
							countryAlready.Items.push(item);	
						}			
					}else{
						var country = {
								name: item.Product.Country,
								Items:[]
						};
						country.Items.push(item);
						this.Countrys.push(country);
					}
				},
				edit : function($scope){
					  $ionicModal.fromTemplateUrl('templates/modal-orders-cart.html', {
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
				}
		};
		
		})
		;
