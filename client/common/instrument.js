angular.module('JourneymenApp.Instruments', [])
    .controller('InstrumentsCtlr', ['$scope', 'InstrSvc', function ($scope, InstrSvc) {
      $scope.instruments = InstrSvc.getInstruments();
    }])
    .factory('InstrSvc', function() {
        var instruments = {
            1: 'Guitar',
            2: 'Piano',
            3: 'Flute',
            4: 'Drums',
            5: 'Saxophone',
            6: 'Trumpet'
        }

        function getInstruments() {
            return instruments;
        }

        function findInstruments(IDarray){
            var instrumentsResult = {};

            IDarray.forEach(function(id){
                instrumentsResult[id] = instruments[id];
            })
            return instrumentsResult;
        }

        return {
            getInstruments: getInstruments,
            findInstruments: findInstruments
        }
    });
