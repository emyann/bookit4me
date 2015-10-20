// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.controllers' is found in controllers.js
angular.module('BookIt4Me', ['ionic', 'AdalAngular','LocalStorageModule', 'angularMoment', 'azure-mobile-service.module','timer' ])

.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if (window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
      cordova.plugins.Keyboard.disableScroll(true);

    }
    if (window.StatusBar) {
      // org.apache.cordova.statusbar required
      StatusBar.styleDefault();
    }
  });
})

.config(function($stateProvider, $urlRouterProvider, $httpProvider, adalAuthenticationServiceProvider, localStorageServiceProvider, $ionicMaterialConfigProvider) {

      var endpoints = {
        // o365 files api
        "https://graph.microsoft.com/": "https://graph.microsoft.com"
    };
    adalAuthenticationServiceProvider.init(
      {
          //tenant:'emyann.onmicrosoft.com',
          tenant:"a204560f-5ffc-4cf5-a723-22981d99c4f9",
          clientId: "255b6b34-2f09-4d3f-8c02-9acd2427ff34", // Required
          //clientId:'69983f0c-ce7a-43ca-b1df-4ab09cf52e05',
          endpoints: endpoints,
          cacheLocation: 'localStorage'
      },
      $httpProvider   // pass http provider to inject request interceptor to attach tokens
      );

    localStorageServiceProvider.setPrefix('BookIt4Me');
  
    $ionicMaterialConfigProvider.enableForAllPlatforms();


  $stateProvider

    .state('app', {
      url: '',
      abstract: true,
      templateUrl: 'templates/menu.html',
      controller: 'MenuController'
  })
   .state('app.index', {
      url: '/',
      views: {
        'menuContent': {
          templateUrl: 'templates/accueil.html',
          controller: 'IndexController as vm',
          
        }
      },
       requireADLogin: true

  })
    ;
  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/');




});

 angular.module('BookIt4Me').constant('AzureMobileServiceClient', {
    API_URL : 'https://hackathonbookit4me.azure-mobile.net/',
    API_KEY : 'UZAKiiqVFMgGTbnvpVHtdGQMUZqoWw51',
});
