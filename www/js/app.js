// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.services' is found in services.js
// 'starter.controllers' is found in controllers.js
angular.module('starter', ['ionic','ngResource', 'starter.controllers','starter.filter', 'starter.services', 'starter.directives'])

.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if(window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
    }
    if(window.StatusBar) {
      // org.apache.cordova.statusbar required
      StatusBar.styleDefault();
    }
  });
})

/* global loading dialog  */
.config(function($httpProvider) {
  $httpProvider.interceptors.push(function($rootScope) {
    return {
      request: function(config) {
        $rootScope.$broadcast('loading:show');
        return config;
      },
      response: function(response) {
        $rootScope.$broadcast('loading:hide');
        return response;
      }
    };
  })
})

.run(function($rootScope, $ionicLoading) {
/*  $rootScope.$on('loading:show', function() {
    $ionicLoading.show({template: 'Loading...'});
  });

  $rootScope.$on('loading:hide', function() {
    $ionicLoading.hide();
  });*/
})

/* Photo */

.config(function($compileProvider){
  $compileProvider.imgSrcSanitizationWhitelist(/^\s*(https?|ftp|mailto|file|tel):/);
})

.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    if(window.StatusBar) {
      // org.apache.cordova.statusbar required
      StatusBar.styleDefault();
    }
  });
})

.config(function($stateProvider, $urlRouterProvider) {

  // Ionic uses AngularUI Router which uses the concept of states
  // Learn more here: https://github.com/angular-ui/ui-router
  // Set up the various states which the app can be in.
  // Each state's controller can be found in controllers.js
  $stateProvider

    // Each tab has its own nav history stack:

    .state('dash', {
      url: '/dash',
      views: {
        'tab-dash': {
          templateUrl: 'templates/tab-dash.html',
          controller: 'DashCtrl'
        }
      }
    })
    
    .state('cart', {
        url: '/cart',
        views: {
          'tab-cart': {
            templateUrl: 'templates/tab-cart.html',
            controller: 'CartCtrl'
          }
        }
      })

    .state('products-caterory', {
      url: '/products-category/:CategoryLevel1',
      views: {
        'tab-dash': {
          templateUrl: 'templates/products.html',
          controller: 'ProductsCategoryCtrl'
        }
      }
    })
        
    .state('product-detail', {
      url: '/product/:productId',
      views: {
        'tab-dash': {
          templateUrl: 'templates/product-detail.html',
          controller: 'ProductDetailCtrl'
        }
      }
    })
    
    .state('inventorys', {
      url: '/inventorys',
      views: {
        'tab-inventorys': {
          templateUrl: 'templates/tab-inventorys.html',
          controller: 'InventorysCtrl'
        }
      }
    })
          
    .state('orders-customer', {
        url: '/orders-customer',
        views: {
          'tab-orders': {
            templateUrl: 'templates/orders-sendout.html',
            controller: 'OrdersCustomerCtrl'
          }
        }
      })
            
    .state('orders-purchaser', {
        url: '/orders-purchaser',
        views: {
          'tab-orders': {
            templateUrl: 'templates/orders-requested.html',
            controller: 'OrdersPurchaserCtrl'
          }
        }
      })
      
    .state('account', {
      url: '/account',
      views: {
        'tab-account': {
          templateUrl: 'templates/tab-account.html',
          controller: 'AccountCtrl'
        }
      }
    })
    
    .state('account-setting', {
        url: '/accounts/setting',
        views: {
          'tab-account': {
            templateUrl: 'templates/account-setting.html',
            controller: 'AccountSettingCtrl'
          }
        }
      })
      
      .state('account-about', {
          url: '/accounts/about',
          views: {
            'tab-account': {
              templateUrl: 'templates/account-about.html',
              controller: 'AccountCtrl'
            }
          }
      })
      
      .state('account-info', {
          url: '/accounts/info',
          views: {
            'tab-account': {
              templateUrl: 'templates/account-info.html',
              controller: 'AccountInfoCtrl'
            }
          }
      })
      
      .state('account-account', {
          url: '/accounts/account',
          views: {
            'tab-account': {
              templateUrl: 'templates/account-account.html',
              controller: 'AccountCtrl'
            }
          }
      })
      
      .state('account-message', {
          url: '/accounts/message',
          views: {
            'tab-account': {
              templateUrl: 'templates/account-message.html',
              controller: 'AccountCtrl'
            }
          }
      })
        
      .state('account-myorders', {
          url: '/accounts/myorders',
          views: {
            'tab-account': {
              templateUrl: 'templates/account-myorders.html',
              controller: 'AccountCtrl'
            }
          }
      })
      .state('account-legal', {
          url: '/accounts/legal',
          views: {
            'tab-account': {
              templateUrl: 'templates/account-legal.html',
              controller: 'TestCtrl'
            }
          }
      })
      
      ;

  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/dash');

});