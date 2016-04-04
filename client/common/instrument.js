angular.module('JourneymenApp')
    .factory('InstrSvc', function() {
        var instruments = {
            1: Guitar,
            2: Piano,
            3: Flute,
            4: Drums,
            5: Saxophone,
            6: Trumpet
        }

        function getInstruments() {
            return instruments;
        }

        return {
            getInstruments: getInstruments
        }
    });