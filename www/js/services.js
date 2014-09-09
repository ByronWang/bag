angular.module('starter.services', [])

/**
 * A simple example service that returns some data.
 */
.factory('Inventorys', function() {
  // Might use a resource here that returns a JSON array

  // Some fake testing data
  var inventorys = [
        			            {  id:0,country:'韩国',date:'2013-11-11',
        			            	Items:[
        			   	    		    { id: 0, name: '自然堂凝时鲜颜肌活乳液', type:'化妆品', country:'韩国',description:"",amount:3,expectedPrice:'3000',statusId:1,status:"买手已接单"},
        				    		    { id: 1, name: '苹果手机' , type:'数码', country:'美国',description:"",amount:3,expectedPrice:'5000',seller:'买手一',statusId:2,status:"买手购买中"},
        				    		    { id: 2, name: '花王婴儿尿布' , type:'妇婴', country:'日本',description:"",amount:3,expectedPrice:'500',seller:'买手一',statusId:4,status:"寻求买手中"},
        				    		    { id: 3, name: '惠氏奶粉' , type:'妇婴', country:'美国',description:"",amount:3,expectedPrice:'290',seller:'买手一',statusId:5,status:"买手已接单"}
        			            	 ]		            	
        			            },
        			            {id:1,country:'美国',date:'2013-11-11',
        			            	Items:[
        			   	    		    { id: 0, name: '自然堂凝时鲜颜肌活乳液', type:'化妆品', country:'韩国',description:"",amount:3,expectedPrice:'3000',statusId:1,status:"买手已接单"},
        				    		    { id: 1, name: '苹果手机' , type:'数码', country:'美国',description:"",amount:3,expectedPrice:'5000',seller:'买手一',statusId:2,status:"买手购买中"},
        				    		    { id: 2, name: '花王婴儿尿布' , type:'妇婴', country:'日本',description:"",amount:3,expectedPrice:'500',seller:'买手一',statusId:4,status:"寻求买手中"},
        				    		    { id: 3, name: '惠氏奶粉' , type:'妇婴', country:'美国',description:"",amount:3,expectedPrice:'290',seller:'买手一',statusId:5,status:"买手已接单"}
        			            	 ]		            	
        			            },
        			            {id:2,country:'日本',date:'2013-11-11',
        			            	Items:[
        			   	    		    { id: 0, name: '自然堂凝时鲜颜肌活乳液', type:'化妆品', country:'韩国',description:"",amount:3,expectedPrice:'3000',statusId:2,status:"买手已接单"},
        				    		    { id: 1, name: '苹果手机' , type:'数码', country:'美国',description:"",amount:3,expectedPrice:'5000',seller:'买手一',statusId:2,status:"买手购买中"},
        				    		    { id: 2, name: '花王婴儿尿布' , type:'妇婴', country:'日本',description:"",amount:3,expectedPrice:'500',seller:'买手一',statusId:2,status:"寻求买手中"},
        				    		    { id: 3, name: '惠氏奶粉' , type:'妇婴', country:'美国',description:"",amount:3,expectedPrice:'290',seller:'买手一',statusId:2,status:"买手已接单"}
        			            	 ]		            	
        			            }
        		  ];


  return {
    all: function() {
      return inventorys;
    },
    get: function(inventoryId) {
	      // Simple index lookup
	      return inventorys[inventoryId];
	    },
  getItem: function(inventoryId,itemId) {
	      // Simple index lookup
	      return inventorys[inventoryId].Items[itemId];
	    }
  };
})

.factory('Products', function() {
	  // Might use a resource here that returns a JSON array

	  // Some fake testing data
	  var products = [
	    { id: 0, name: 'Scruff McGruff',country:'法国',price:500},
	    { id: 1, name: 'G.I. Joe' ,country:'日本',price:500},
	    { id: 2, name: 'Miss Frizzle' ,country:'美国',price:500},
	    { id: 3, name: 'Ash Ketchum' ,country:'法国',price:5000}
	  ];

	  return {
	    all: function() {
	      return products;
	    },
	    get: function(productId) {
	      // Simple index lookup
	      return products[productId];
	    }
	  };
	})
	
	
.factory('LoginUser', function($ionicModal) {
	  // Might use a resource here that returns a JSON array

	  // Some fake testing data
	  var user={};
	  var islogin = false;

	  return {
	    get: function() {
	      // Simple index lookup
	      return user;
	    },
	    requireUser:function($scope,callback){	    
	    	if(!islogin){
	    		$scope.user={};
	    		$ionicModal.fromTemplateUrl('templates/modal-login.html', {
	    		    scope: $scope,
	    		    animation: 'slide-in-up'
	    		  }).then(function(modal) {
	    		    $scope.modal = modal;
	    		    $scope.modal.show();
	    		    return user;
	    		  });
	    		  $scope.openModal = function() {
	    		    $scope.modal.show();
	    		  };
	    		  $scope.closeModal = function(user) {
	    			  callback(user);
	    		    $scope.modal.hide();
	    		  };
	    	}else{
	    		callback(user);
	    	}
		    return user;
	    },
	    login: function(user,pwd){
	    	user.username = user;
	    	user.pwd = pwd;
	    	islogin = true;
	    	return;
	    }
	  };
	})
	
	.factory('Orders', function() {
		  // Might use a resource here that returns a JSON array

		  // Some fake testing data
		  var orders = [
			            {  id:0,country:'韩国',date:'2013-11-11',
			            	Items:[
			   	    		    { id: 0, name: '自然堂凝时鲜颜肌活乳液', type:'化妆品', country:'韩国',description:"",amount:3,expectedPrice:'3000',statusId:1,status:"买手已接单"},
				    		    { id: 1, name: '苹果手机' , type:'数码', country:'美国',description:"",amount:3,expectedPrice:'5000',seller:'买手一',statusId:2,status:"买手购买中"},
				    		    { id: 2, name: '花王婴儿尿布' , type:'妇婴', country:'日本',description:"",amount:3,expectedPrice:'500',seller:'买手一',statusId:4,status:"寻求买手中"},
				    		    { id: 3, name: '惠氏奶粉' , type:'妇婴', country:'美国',description:"",amount:3,expectedPrice:'290',seller:'买手一',statusId:5,status:"买手已接单"}
			            	 ]		            	
			            },
			            {id:1,country:'美国',date:'2013-11-11',
			            	Items:[
			   	    		    { id: 0, name: '自然堂凝时鲜颜肌活乳液', type:'化妆品', country:'韩国',description:"",amount:3,expectedPrice:'3000',statusId:1,status:"买手已接单"},
				    		    { id: 1, name: '苹果手机' , type:'数码', country:'美国',description:"",amount:3,expectedPrice:'5000',seller:'买手一',statusId:2,status:"买手购买中"},
				    		    { id: 2, name: '花王婴儿尿布' , type:'妇婴', country:'日本',description:"",amount:3,expectedPrice:'500',seller:'买手一',statusId:4,status:"寻求买手中"},
				    		    { id: 3, name: '惠氏奶粉' , type:'妇婴', country:'美国',description:"",amount:3,expectedPrice:'290',seller:'买手一',statusId:5,status:"买手已接单"}
			            	 ]		            	
			            },
			            {id:2,country:'日本',date:'2013-11-11',
			            	Items:[
			   	    		    { id: 0, name: '自然堂凝时鲜颜肌活乳液', type:'化妆品', country:'韩国',description:"",amount:3,expectedPrice:'3000',statusId:2,status:"买手已接单"},
				    		    { id: 1, name: '苹果手机' , type:'数码', country:'美国',description:"",amount:3,expectedPrice:'5000',seller:'买手一',statusId:2,status:"买手购买中"},
				    		    { id: 2, name: '花王婴儿尿布' , type:'妇婴', country:'日本',description:"",amount:3,expectedPrice:'500',seller:'买手一',statusId:2,status:"寻求买手中"},
				    		    { id: 3, name: '惠氏奶粉' , type:'妇婴', country:'美国',description:"",amount:3,expectedPrice:'290',seller:'买手一',statusId:2,status:"买手已接单"}
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
		    getItem: function(orderId,itemId) {
			      // Simple index lookup
			      return orders[orderId].Items[itemId];
			    }
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

	.factory('Users', function() {
		  // Might use a resource here that returns a JSON array

		  // Some fake testing data
		  var users = [
        	    { id: 0, username: 'wangshilian',password:'1234567',nickname:"alian",avatarPath:"",role:'purchase'},
        	    { id: 1, username: 'jihua',password:'1234567',nickname:"alian",avatarPath:""},
        	    { id: 2, username: 'liubo',password:'1234567',nickname:"alian",avatarPath:""}
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
				
				add : function(order){
					var hasExist = false;

					var country;

					angular.forEach(this.Countrys,function(o){
						if(o.name == order.country){
							country = o;
						}
					});
					
					if(country){
						angular.forEach(country.Items,function(o){
							if(o.id == order.id){
								hasExist = true;
							}
						});
						if(hasExist){
							order.amount = order.amount + 1;
						}else{
							order.amount = 1;
							country.Items.push(order);	
						}			
					}else{
						var country = {
								name: order.country,
								Items:[]
						};			
						country.Items.push(order);
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
