angular.module('JourneymenApp.Avail',[])
.controller('AvailCtlr', function($scope, $state, AvailSvc, AuthSvc, InstrSvc) {
        $scope.start = '';
        $scope.end = '';
        $scope.instruments = InstrSvc.getInstruments();
        $scope.selectedInstruments = { ids: [] };

        $scope.setAvailability = function() {
            AvailSvc.setAvail(JSON.stringify({
                    time: {
                        soundcloud_id: AuthSvc.retrieveID(),
                        start: $scope.start,
                        end: $scope.end,
                        instrument: $scope.selectedInstruments.ids
                    }
                }))
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
