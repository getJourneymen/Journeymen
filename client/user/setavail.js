angular.module('JourneymenApp')
    .controller('AvailCtlr', function($scope,$state, 'AvailSvc') {


    })
    .factory('AvailSvc', function($http) {

        var setAvailUri = '/avail';

        function setAvail(availData) {
            $http.post(setAvailUri, availData)
                .then(function(res) {
                    console.log('Successfully set availibility: ', res)
                })
                .catch(function(err) {
                    console.log('Error setting availibility: ', err)
                })
        }
        return {

            setAvail: setAvail
        }
    });