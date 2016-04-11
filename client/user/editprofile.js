angular.module('JourneymenApp.ProfileEdit',['JourneymenApp.Auth','JourneymenApp.Profile','JourneymenApp.Instruments'])
.controller('EditprofileCtlr', ['$scope','$state','EditprofileSvc', 'ProfileSvc', 'InstrSvc', function($scope,$state, EditprofileSvc, ProfileSvc, InstrSvc) {
        $scope.user = {};
        //retrieve all instruments
        $scope.instruments = InstrSvc.getInstruments();
        //selected ids are stored here
        $scope.selectedInstruments = { ids: [] };

        //retrieving profile to fill form input allowing user to modify
        ProfileSvc.retrieveProfile($state.params.uname)
            .then(function(profileData) {
                //preselect/check instruments specific to user profile
                $scope.selectedInstruments.ids = profileData.instrument.split(',');
                $scope.user = {
                    //first and last if contained in soundcloud prefilled otherwise blank
                  first_name: profileData.first_name,
                  last_name: profileData.last_name,
                  email: profileData.email,
                  description: profileData.description,
                  instrument: $scope.selectedInstruments.ids

                }
            })
            .catch(function() {
                console.log('Error displaying data')
            })

        $scope.editProfile = function(){
            //convert selected ids array into a string before storing
            $scope.user.instrument = $scope.selectedInstruments.ids.toString();
            EditprofileSvc.storeUser($scope.user)
             .then(function(res) {
                    console.log('Successfully modified user: ', res)
                })
                .catch(function(err) {
                    console.log('Error adding user: ', err)
                })
        }
    }])
    .factory('EditprofileSvc', function($http) {
        //retrieve user profile endpoint
        var createUserUri = '/user';

        function storeUser(userData) {
          console.log('Going to update user', userData)
            return $http.put(createUserUri, userData)

        }

        return {
            storeUser: storeUser,
        }
    });

