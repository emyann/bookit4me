(function () {

    angular.module('BookIt4Me').service('EventService', ['$http', '$q', function ($http, $q) {
        //#region Initialization
        //----------------------------------------------------------------------
        // Gets a reference to self
        //----------------------------------------------------------------------
        var self = this;
        var baseUrl = "https://graph.microsoft.com/beta/me/events";
        //#endregion

        //#region Private Properties
        //#endregion
        
        //#region Public Methods
        this.getEvents = function () {
            var currentDate = new Date();
            var date24hLater = new Date();
            date24hLater.setDate(currentDate.getDate()+1);
            
            RemoveTimeZone(currentDate);
            RemoveTimeZone(date24hLater);
            var date24LaterFormated = formatDateForQuery(date24hLater);
            var currentDateFormated = formatDateForQuery(currentDate);
            
            var uri = baseUrl + "?$filter=Start+gt+" + date24LaterFormated + "Z+and+Start+lt+" + currentDateFormated + "Z&$orderby=Start"
​
            var promise = $http.get(uri).then(function (data, status, headers, config) {
                return data.data.value;                
            }).catch(function (data, status, headers, config) {
            });
            
			return promise;
        };
        
        this.getNextEvent = function () {
            var uri = baseUrl + "?$filter=Start+ge+2015-10-17T18:54:15Z&$top=1&$orderby=Start";
            
            var promise = $http.get(uri).then(function (data, status, headers, config) {
               var currentDate = new Date();
               var nextEventDate = new Date(data.data.value[0].Start)           
               
               return {
                   //NextEventDate : formatDate(nextEventDate),
                   //NextEventDelay : msToTime(nextEventDate - currentDate)
               };
               
           }).catch(function (data, status, headers, config) {
               
           });
           
           return promise;
        };
        
        this.createEvent = function(date, title) {
            var uri = baseUrl;
        };
        
        function msToTime(duration) {
            var milliseconds = parseInt((duration % 1000) / 100);
            var seconds = parseInt((duration / 1000) % 60);
            var minutes = parseInt((duration / (1000 * 60)) % 60);
            var hours = parseInt((duration / (1000 * 60 * 60)) % 24);
​
            hours = (hours < 10) ? "0" + hours : hours;
            minutes = (minutes < 10) ? "0" + minutes : minutes;
            seconds = (seconds < 10) ? "0" + seconds : seconds;
​
            return hours + ":" + minutes + ":" + seconds + "." + milliseconds;
        }
    
        function RemoveTimeZone(date){
            date.setHours(date.getHours() - 4);
        }
    
        function formatDate(date){
            return date.toISOString().replace('T',' ').replace('Z','').split('.')[0]
        }
    
        function formatDateForQuery(date){
            return date.toISOString().split('.')[0]
        }
        //#endregion
    }]);

}());