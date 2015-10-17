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
			EventService.hasCurrentEvent().then(function (hasCurrentEvent) {
				vm.status.available = hasCurrentEvent;
				var currentDate = new Date();
				
				if(hasCurrentEvent) {
					EventService.getCurrentEvent().then(function (currentEvent) {
						var diff = new Date(currentEvent.End) - currentDate;
						console.log(diff);
						if(diff > (15 * 60 * 1000))	{
							vm.status.color = "red";
						} else {
							vm.status.color = "orange";	
						}
					}, function() {
						console.log("An error occured");
					});
				} else {
					EventService.getNextEvent().then(function (nextEvent) {
						var diff = new Date(nextEvent.Start) - currentDate;
						console.log(diff);
						if(diff > (15 * 60 * 1000))	{
							vm.status.color = "green";
						} else {
							vm.status.color = "orange";	
						}
					}, function() {
						console.log("An error occured");
					});
				}
				
				
			}, function() {
				console.log("An error occured");
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

		$scope.closeModal = function(){
			vm.modal.hide();
		}
  
		function bookRoom(){
			// Create the login modal that we will use later
			$ionicModal.fromTemplateUrl('templates/modal-booking.html', {
				scope: $scope
			}).then(function(modal) {
				vm.modal = modal;
				vm.modal.show();
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