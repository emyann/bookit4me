angular.module('BookIt4Me.controllers', [])

.controller('AppCtrl', function($scope, $ionicModal, $timeout, UserService) {

  // With the new view caching in Ionic, Controllers are only called
  // when they are recreated or on app start, instead of every page change.
  // To listen for when this page is active (for example, to refresh data),
  // listen for the $ionicView.enter event:
  //$scope.$on('$ionicView.enter', function(e) {
  //});

  // Form data for the login modal

  var vm = this;
  $scope.loginData = {};

  vm.patate = "test";
  vm.events = [];
  vm.userDisplayName = UserService.getDisplayName();
  vm.bookRoom = bookRoom;
  vm.modal;

  init();

  function bookRoom(){
      // Create the login modal that we will use later
      $ionicModal.fromTemplateUrl('templates/login.html', {
        scope: $scope
      }).then(function(modal) {
        vm.modal = modal;
      });
  }

});
