angular.module('JourneymenApp.Avail',['JourneymenApp.Instruments'])
.controller('AvailCtlr', ['$scope', '$state', 'AvailSvc', 'InstrSvc', function($scope, $state, AvailSvc, InstrSvc) {
  //Initialize scoped variables, including full instruments list.
        $scope.instruments = InstrSvc.getInstruments();
        $scope.selectedInstrument = null;
        $scope.startDate = null;
        $scope.startTime = null;
        $scope.endDate = null;
        $scope.endTime = null;

        // setAvailability is called by the submit button in the template. It wraps around a setAvail function defined in the AvailSvc in this module.
        $scope.setAvailability = function() {

            AvailSvc.setAvail({
                        start: combineDateTime($scope.startDate, $scope.startTime),
                        end: combineDateTime($scope.endDate,$scope.endTime),
                        instrument: $scope.selectedInstrument
                })
                .then(function(res) {
                    console.log('Successfully set availibility: ', res.statusText);
                    $state.go('profile');
                })
                .catch(function(err) {
                    console.log('Error setting availibility: ', err.statusText);
                });

                //Helper function to convert seperate date and time (from HTML5 inputs) to a combined value to compare to stored db values.
              function combineDateTime(date, time) {
                var dd = new Date(date).getDate();
                var mm = new Date(date).getMonth()+1;
                var yy = new Date(date).getFullYear();
                var hh = new Date(time).getHours();
                var ms = new Date(time).getMinutes();
                return mm + '/' + dd + '/' + yy + ' ' + hh + ':' + ms + ":00";
              }
        }
    }])
.factory('AvailSvc', function($state,$http) {
  //This simple service posts whatever data is passed to it to the setAvailUri.

        var setAvailUri = '/avail';

        function setAvail(availData) {
            return $http.post(setAvailUri, availData);
        }

        return {
            setAvail: setAvail
        }
    });
