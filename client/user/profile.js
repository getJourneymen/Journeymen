angular.module('JourneymenApp.Profile',['JourneymenApp.Auth','JourneymenApp.Instruments'])
    .controller('ProfileCtlr', ['$scope','$state','ProfileSvc','AuthSvc', 'InstrSvc', function($scope, $state, ProfileSvc, AuthSvc,InstrSvc) {
     $scope.user = {};
     console.log('state params', $state)
        ProfileSvc.retrieveProfile($state.params.uname)
            .then(function(profileData) {
                $scope.user.pic = profileData.img_url;
                $scope.user.first = profileData.first_name;
                $scope.user.last = profileData.last_name;
                $scope.user.email = profileData.email;
                $scope.user.description = profileData.description;
                // $scope.user.instruments = InstrSvc.findInstruments(profileData.instrument);
                $scope.user.instruments = InstrSvc.findInstruments(profileData.instruments);
     //            console.log('user data is :', $scope.user)
            })
            .catch(function() {
                console.log('Error displaying data')
            })
    }])
    .factory('ProfileSvc', function($state, $http) {

        var getUserUri = $state.params.uname ? '/user' : '/user/me';

        function retrieveProfile(username) {
            var queryParams = {};
            if(username) queryParams = {username: username};
            return $http.get(getUserUri, queryParams)
                .then(function(profileData) {
                    console.log('Successfully retrieved profile', profileData);
                    return profileData.data
                })
                .catch(function(err) {
                    console.log('Error retrieving profile: ', err)
                })
        }

        return {
            retrieveProfile: retrieveProfile
        }
    });
