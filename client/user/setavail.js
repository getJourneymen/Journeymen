angular.module('JourneymenApp.Avail',['JourneymenApp.Instruments'])
.controller('AvailCtlr', ['$scope', '$state', 'AvailSvc', 'InstrSvc', function($scope, $state, AvailSvc, InstrSvc) {
        $scope.start = '';
        $scope.end = '';
        $scope.instruments = InstrSvc.getInstruments();
        $scope.selectedInstrument = null;

        $scope.setAvailability = function() {
            AvailSvc.setAvail({
                        start: $scope.start,
                        end: $scope.end,
                        instrument: $scope.selectedInstrument
                })
                .then(function(res) {
                    console.log('Successfully set availibility: ', res.statusText);
                    $state.go('profile');
                })
                .catch(function(err) {
                    console.log('Error setting availibility: ', err.statusText);
                });
        }
    }])
.factory('AvailSvc', function($state,$http) {

        var setAvailUri = '/avail';

        function setAvail(availData) {
            return $http.post(setAvailUri, availData);
        }

        return {
            setAvail: setAvail
        }
    });
