(function () {
    angular.module('BookIt4Me').controller('IndexController', function ($scope, $ionicModal, $timeout, UserService, EventService) {
        //#region Initialization
        //----------------------------------------------------------------------
        // Gets a reference to self
        //----------------------------------------------------------------------
        var vm = this;
        //#endregion
	
        //#region Private Members
		var tickInterval = 1000;
        //#endregion

        //#region Public Properties
		vm.events = [];
		vm.userDisplayName = UserService.getDisplayName();
		vm.bookRoom = bookRoom;
		vm.modal;
		vm.currentTime = "";
		vm.status = {
			available: false,
			color: "#000000",
			nextEventTimeOffset: ""
		};
        //#endregion

        //#region Public Methods
        //#endregion

        //#region Private Methods
       	function init() {
			tick();
			getEvents();			
		}
  
		function updateStatus() {
			angular.forEach(vm.events, function(event) {
				
			});
		}
		
		function getEvents() {
			EventService.getEvents().then(function (data) {
				vm.events = data;
				updateStatus();
			}, function () {
				console.log("An error occured.");
			});
			
			$timeout(getEvents, 60000);
		}
  
		function bookRoom(){
			// Create the login modal that we will use later
			$ionicModal.fromTemplateUrl('templates/login.html', {
				scope: $scope
			}).then(function(modal) {
				vm.modal = modal;
			});
		}
		
		function tick() {
			vm.currentTime = Date.now()
        	$timeout(tick, tickInterval);
		}
        //#endregion

        //#region Initialization
        init();
        //#endregion
    });
}());