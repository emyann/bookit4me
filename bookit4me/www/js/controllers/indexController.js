(function () {
    angular.module('BookIt4Me').controller('IndexController', function ($scope, $ionicModal, $timeout, UserService, EventService) {
        //#region Initialization
        //----------------------------------------------------------------------
        // Gets a reference to self
        //----------------------------------------------------------------------
        var vm = this;
        //#endregion

        //#region Private Members
        //#endregion

        //#region Public Properties
		vm.events = [];
		vm.userDisplayName = UserService.getDisplayName();
		vm.bookRoom = bookRoom;
		vm.modal;
        //#endregion

        //#region Public Methods
        //#endregion

        //#region Private Methods
       	function init() {

			EventService.getEvents().then(function (data) {
				vm.events = data;
				updateStatus();
			}, function () {
				console.log("An error occured.");
			});
		}
  
		function updateStatus() {
		
		}

		$scope.closeModal = function(){
			vm.modal.hide();
		}
  
		function bookRoom(){
			console.log("ici")
			// Create the login modal that we will use later
			$ionicModal.fromTemplateUrl('templates/modal-booking.html', {
				scope: $scope
			}).then(function(modal) {
				vm.modal = modal;
				vm.modal.show();
			});
		}
        //#endregion

        //#region Initialization
        init();
        //#endregion
    });
}());