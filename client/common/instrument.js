angular.module('JourneymenApp.Instruments', [])
    .controller('InstrumentsCtlr', ['$scope', 'InstrSvc', function ($scope, InstrSvc) {
      $scope.instruments = InstrSvc.getInstruments();
    }])
    .factory('InstrSvc', function() {
        //instrument object that holds all instrument options
        var instruments = {
            1: 'Guitar',
            2: 'Piano',
            3: 'Flute',
            4: 'Drums',
            5: 'Saxophone',
            6: 'Trumpet'
        }

        function getInstruments() {
            //returns instrument object that contain all instruments
            return instruments;
        }

        //fct that takes an array of instrument IDs and returns and object with the id properties pointing to correct instrument
        function findInstruments(IDarray){
            var instrumentsResult = {};

            IDarray.forEach(function(id){
                instrumentsResult[id] = instruments[id];
            })
            return instrumentsResult;
        }

        //fct that takes a single id string and returns the name of the instrument
        function instrumentById (id)  {
            var result ='';
            for (key in instruments){
                if(id===key){
                    result = instruments[key];
                }
            }
            return result;
        }

        return {
            getInstruments: getInstruments,
            findInstruments: findInstruments,
            instrumentById: instrumentById
        }
    });
