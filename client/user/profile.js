angular.module('JourneymenApp.Profile', ['JourneymenApp.Auth', 'JourneymenApp.Instruments'])
    .controller('ProfileCtlr', ['$scope', '$state', 'ProfileSvc', 'AuthSvc', 'InstrSvc', function($scope, $state, ProfileSvc, AuthSvc, InstrSvc) {
        $scope.user = {};
        $scope.avail = {};

        ProfileSvc.retrieveProfile($state.params.uname)
            .then(function(profileData) {
                $scope.user.pic = profileData.img_url;
                $scope.user.first = profileData.first_name;
                $scope.user.last = profileData.last_name;
                $scope.user.email = profileData.email;
                $scope.user.description = profileData.description;
                $scope.user.instruments = InstrSvc.findInstruments(profileData.instrument.split(','));

                //retrieve users availibiiity
                ProfileSvc.getAvail($state.params.uname)
                    .then(function(availData) {
                        //loop over return object data property (avail.data) and run intrumentById to convert id to instrument anme
                        for (var key in availData.data) {
                            availData.data[key].instrument = InstrSvc.instrumentById(availData.data[key].instrument)
                        }

                        $scope.avail = availData.data;
                    })
                    .catch(function() {
                        console.log('Error retrieving availibility')
                    })
            })
            .catch(function() {
                console.log('Error displaying data')
            });
    }])
    .factory('ProfileSvc', function($state, $http) {
        //if username is null(default) go to '/user' endpoint otherwise '/user/me'
        var getUserUri = $state.params.uname ? '/user' : '/user/me';

        function retrieveProfile(username) {
            var queryParams = {};
            //if username is defined set queryParams with username and pass username as queryparams to endpoint
            if (username) queryParams = { username: username };

            return $http.get(getUserUri, { params: queryParams })
            .then(function(profileData) {
                    console.log('Successfully retrieved profile', profileData);
                    return profileData.data
                })
                .catch(function(err) {
                    console.log('Error retrieving profile: ', err)
                })
        }

        //if username is defined endpoint goes to '/avail/username' otherwise it will retrieve logged in users availibiility using
        //endpoint '/avail'
        var getAvailUri = $state.params.uname ? '/avail/username' : '/avail';

        //gets users availibiity
        function getAvail(username) {
            //if username is defined pass it as queryparams in the request
            var queryParams = {};
            if (username) queryParams = { username: username };
            return $http.get(getAvailUri, { params: queryParams });
        }


        return {
            retrieveProfile: retrieveProfile,
            getAvail: getAvail
        }
    });