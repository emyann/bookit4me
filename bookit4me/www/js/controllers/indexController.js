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

		vm.meetingRemainingTime;
        //#endregion

        //#region Public Methods
        //#endregion

        //#region Private Methods
       	function init() {
			tick();
			getEvents();		

			$scope.$watch('vm.status',function(oldStatus,newStatus){
				if(!newStatus.available){
					EventService.getCurrentEvent()
					.then(function(event){
						if(event){
							
						var endDate = event.End;

						vm.meetingRemainingTime =  endDate;
						}
					});
				}
			})
		}
  
		function updateStatus() {
			EventService.hasCurrentEvent().then(function (hasCurrentEvent) {
				var currentDate = new Date();
				vm.status.available = true;
				
				if(hasCurrentEvent) {
					EventService.getCurrentEvent().then(function (currentEvent) {
						var diff = new Date(currentEvent.End) - currentDate;
						console.log(diff);
						if(diff > (15 * 60 * 1000))	{
							vm.status.available = false;
							vm.status.color = "red";
						} else {
							vm.status.available = true;
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
			
			EventService.deleteStatus().then(function() {
				EventService.addStatus(vm.status.color != "green", 1);
			}, function () {
			
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
  
  		$scope.bookRoomFor = function(time){
  			EventService.getCurrentEvent()
  				.then(function(event){
  						var startDate  = event ? moment(event.End) : moment();
  						var endDate = event ? moment(event.End) : moment();

  						EventService.createEvent(startDate, endDate.add(time, 'minutes'))
			  				.then(function(){
			  					vm.modal.hide();
			  					getEvents();
			  				});
  				});
  			

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

		function addMinutes(date, minutes) {

    		return new Date(date.getTime() + minutes*60000);
		}
        //#endregion

        //#region Initialization
        init();
        //#endregion
    });
}());