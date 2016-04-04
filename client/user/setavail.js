angular.module('JourneymenApp')
    .controller('AvailCtlr', function($scope, $state, 'AvailSvc') {
        $scope.start = '';
        $scope.end = '';
        $scope.instrument = {}; //What is the return format from the form checkboxes?

        $scope.setAvailability = function() {
            AvailSvc.setAvail({
                time: {
                    journeymen_id: AvailSvc.retrieveID(), //timing?
                    start: $scope.start,
                    end: $scope.end,
                    instrument: $scope.instrument
                }
            })
            //.then ? //handle state transition to $state.go('profile')

        }

    })
    .factory('AvailSvc', function($http) {

        function retrieveID() {
            //retriev ID from local storage?
        }

        var setAvailUri = '/avail';

        function setAvail(availData) {
            $http.post(setAvailUri, availData)
                .then(function successCB(res) {
                    console.log('Successfully set availibility: ', res.statusText)
                }, function errorCB(err) {
                    console.log('Error setting availibility: ', err.statusText)
                });

        }
        return {
            retrieveID: retrieveID,
            setAvail: setAvail
        }
    });