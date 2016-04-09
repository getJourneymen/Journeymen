angular.module('JourneymenApp.ProfileEdit',['JourneymenApp.Auth','JourneymenApp.Profile','JourneymenApp.Instruments'])
.controller('EditprofileCtlr', ['$scope','$state','EditprofileSvc', 'ProfileSvc', 'InstrSvc', function($scope,$state, EditprofileSvc, ProfileSvc, InstrSvc) {
        $scope.user = {};
        $scope.instruments = InstrSvc.getInstruments();
        $scope.selectedInstruments = { ids: [] };


        ProfileSvc.retrieveProfile($state.params.uname)
            .then(function(profileData) {
                //uncomment line below after db instrument is changed back to array of id strings
                $scope.selectedInstruments.ids.push(profileData.instrument)
                //line below this just shows that is working expecting array of instrument id strings
                $scope.selectedInstruments.ids.push('2','4')
                $scope.user = {
                  first_name: profileData.first_name,
                  last_name: profileData.last_name,
                  email: profileData.email,
                  description: profileData.description,
                  instrument: $scope.selectedInstruments.ids

                }
                console.log('instData ',profileData.instrument)
                console.log('user data is :', $scope.user)
            })
            .catch(function() {
                console.log('Error displaying data')
            })

        $scope.editProfile = function(){
        	EditprofileSvc.storeUser($scope.user)
        }
    }])
    .factory('EditprofileSvc', function($http) {

        var createUserUri = '/user';

        function storeUser(userData) {
          console.log('Going to update user', userData)
            return $http
                .put(createUserUri, userData)
                .then(function(res) {
                    console.log('Successfully modified user: ', res)
                })
                .catch(function(err) {
                    console.log('Error adding user: ', err)
                })
        }

        return {
            storeUser: storeUser,
        }
    });
