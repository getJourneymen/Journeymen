angular.module('JourneymenApp')
    .controller('AvailCtlr', function($scope, $state, 'AvailSvc', 'AuthSvc') {
        $scope.start = '';
        $scope.end = '';
        $scope.instrument = {}; //What is the return format from the form checkboxes?

        $scope.setAvailability = function() {
            AvailSvc.setAvail({
                    time: {
                        authToken: AuthSvc.retrieveToken(),
                        start: $scope.start,
                        end: $scope.end,
                        instrument: $scope.instrument
                    }
                })
                .then(function(res) {
                    console.log('Successfully set availibility: ', res.statusText);
                    $state.go('profile');
                })
                .catch(function(err) {
                    console.log('Error setting availibility: ', err.statusText);
                });
        }
    })
    .factory('AvailSvc', function($http) {

        var setAvailUri = '/avail';

        function setAvail(availData) {
            return $http.post(setAvailUri, availData);
        }

        return {
            setAvail: setAvail
        }
    });