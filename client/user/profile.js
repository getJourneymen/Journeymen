angular.module('JourneymenApp')
    .controller('ProfileCtlr', function($scope, $state, ProfileSvc, AuthSvc, InstrSvc) {

        ProfileSvc.retrieveProfile(AuthSvc.retrieveID())
            .then(function(profileData) {
                $scope.pic = profileData.img_url;
                $scope.first = profileData.first_name;
                $scope.last = profileData.last_name;
                $scope.email = profileData.email;
                $scope.description = profileData.description;
                $scope.instruments = InstrSvc.findInstruments(profileData.instrument);
            })
            .catch(function() {
                console.log('Error displaying data')
            })
    })
    .factory('ProfileSvc', function($http) {

        var getUserUri = '/user';

        function retrieveProfile(soundCloudId) {
            $http.get(getUserUri, soundCloudId)
                .then(function(profileData) {
                    console.log('Successfully retrieved profile');
                    return JSON.parse(profileData)
                })
                .catch(function(err) {
                    console.log('Error retrieving profile: ', err)
                })
        }

        return {
            retrieveProfile: retrieveProfile
        }
    });