angular.module('JourneymenApp.Avail',['JourneymenApp.Instruments'])
.controller('AvailCtlr', ['$scope', '$state', 'AvailSvc', 'InstrSvc', function($scope, $state, AvailSvc, InstrSvc) {
        $scope.start = '';
        $scope.end = '';
        $scope.instruments = InstrSvc.getInstruments();
        $scope.selectedInstrument = null;
        $scope.startDate = null;
        $scope.startTime = null;

        $scope.setAvailability = function() {

          var dd = new Date($scope.startDate).getDate();
          var mm = new Date($scope.startDate).getMonth()+1;
          var yy = new Date($scope.startDate).getFullYear();
          var hh = new Date($scope.startTime).getHours();
          var ms = new Date($scope.startTime).getMinutes();
          var startDate = mm + '/' + dd + '/' + yy + ' ' + hh + ':' + ms + ":00";

            AvailSvc.setAvail({
                        start: combineDateTime($scope.startDate, $scope.startTime),
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

        var setAvailUri = '/avail';

        function setAvail(availData) {
            return $http.post(setAvailUri, availData);
        }

        return {
            setAvail: setAvail
        }
    });
