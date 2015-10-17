(function () {

    angular.module('BookIt4Me').service('EventService', function ($http, $q, UserService, Azureservice) {
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
            
            var uri = baseUrl + "?$filter=Start+gt+" + currentDateFormated + "Z+and+Start+lt+" + date24LaterFormated + "Z&$orderby=Start";
            var promise = $http.get(uri).then(function (data, status, headers, config) {
                return data.data.value;                
            }).catch(function (data, status, headers, config) {
            });
            
			return promise;
        };
        
        this.getNextEvent = function () {
            var currentDate = new Date();
            var formatedDate = formatDateForQuery(currentDate);
            var uri = baseUrl + "?$filter=Start+ge+" + formatedDate +"Z&$top=1&$orderby=Start";
            
            var promise = $http.get(uri).then(function (data, status, headers, config) {
               return data.data.value[0]; 
           }).catch(function (data, status, headers, config) {
               
           });
           
           return promise;
        };
        
        this.hasCurrentEvent = function() {
            var currentDate = new Date();
            var formatedDate = formatDateForQuery(currentDate);
            var uri = baseUrl + "?$filter=Start+le+" + formatedDate +"Z+and+End+ge+" + formatedDate + "Z&$top=1&$orderby=Start";
           
            var promise = $http.get(uri).then(function (data, status, headers, config) {
                return data.data.value.length > 0;
            }).catch(function (data, status, headers, config) {
            });
           
            return promise;
        }
        
        this.getCurrentEvent = function() {
            var currentDate = new Date();
            var formatedDate = formatDateForQuery(currentDate);
            var uri = baseUrl + "?$filter=Start+le+" + formatedDate +"Z+and+End+ge+" + formatedDate + "Z&$top=1&$orderby=Start";
           
            var promise = $http.get(uri).then(function (data, status, headers, config) {
                return data.data.value[0];
            }).catch(function (data, status, headers, config) {
            });
           
            return promise;
        }
        
        this.createEvent = function(startDate, endDate){
            var uri = baseUrl;
           
            var Body = 
            {
                "Subject" : "Auto Booking",
                "Body": {
                    "ContentType": "HTML",
                    "Content": "Auto Booking by " + UserService.getDisplayName()
                },
                "Start": startDate,
                "StartTimeZone": "Eastern Standard Time",
                "End": endDate,
                "EndTimeZone": "Eastern Standard Time",
                "Attendees": []
            }
           
            var promise = $http.post(uri, Body).then(function (data, status, headers, config) {   
               return data;             
            }).catch(function (data, status, headers, config) {
            });        
           
            return promise;
        };
        
        this.deleteStatus = function(busy, id) {
            return Azureservice.query('book', null).then(function(items) {
                // Assigin the results to a $scope variable 
                var items = items;
                
                angular.forEach(items, function(item) {
                    Azureservice.del('book', {
                        id: item.id
                    }).then(function() {
                        console.log(item.id);
                    });
                });
            }, function(err) {
                console.error('There was an error quering Azure ' + err);
            });
        };
        
        this.addStatus = function(busy, id) {
             if(busy) {
                Azureservice.insert('book', {
                    idsalle: id, 
                    busy: busy
                }).then(function() {
                    
                });   
            }
        }
        
        function msToTime(duration) {
            var milliseconds = parseInt((duration % 1000) / 100);
            var seconds = parseInt((duration / 1000) % 60);
            var minutes = parseInt((duration / (1000 * 60)) % 60);
            var hours = parseInt((duration / (1000 * 60 * 60)) % 24);
            
            hours = (hours < 10) ? "0" + hours : hours;
            minutes = (minutes < 10) ? "0" + minutes : minutes;
            seconds = (seconds < 10) ? "0" + seconds : seconds;
            
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
    });

}());