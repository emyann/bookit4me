(function () {

    angular.module('BookIt4Me').service('UserService', ['adalAuthenticationService', function (adalAuthenticationService) {
        //#region Initialization
        //----------------------------------------------------------------------
        // Gets a reference to self
        //----------------------------------------------------------------------
        var self = this;
        //#endregion

        //#region Private Properties
        //#endregion
        
        //#region Public Methods
        this.getDisplayName = function () {
            return adalAuthenticationService.userInfo.profile.name;
        };
        //#endregion
    }]);

}());