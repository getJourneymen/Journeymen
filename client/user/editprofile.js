angular.module('JourneymenApp.ProfileEdit',['JourneymenApp.Auth','JourneymenApp.Profile'])
    .controller('EditprofileCtlr', function($scope,$state, EditprofileSvc, ProfileSvc) {
        $scope.user = {};

        // $scope.first = ProfileSvc.extractName.firstname; //may need to edit access
        // $scope.last = ProfileSvc.extractName.lastname; //may need to edit access
        // $scope.pic = ProfileSvc.extractPic;

        ProfileSvc.retrieveProfile($state.params.uname)
            .then(function(profileData) {
                $scope.user = {
                  first_name: profileData.first_name,
                  last_name: profileData.last_name,
                  email: profileData.email,
                  description: profileData.description
                }
                // $scope.user.instruments = InstrSvc.findInstruments(profileData.instrument);
                console.log('user data is :', $scope.user)
            })
            .catch(function() {
                console.log('Error displaying data')
            })

        $scope.editProfile = function(){
        	EditprofileSvc.storeUser($scope.user)
        }
    })
    //send authtoken and call update user endpoint put endpoin '/user' and put endpoint: '/avail' with updated object
    .factory('EditprofileSvc', function($http) {

        var soundCloudData = {};
        var createUserUri = '/user';

        function extractName() {
            return soundCloudData.name; //verify after return data confirmed
        }

        function extractPic() {
            return soundCloudData.pic; //verify after return data confirmed
        }

        function retrieveProfile() {
            //After Authentication , Auth factory should
            //provide global access to current user (first, last, and pic)
            //so here we would access Auth.currentUser (i.e)
            //soundCloudData = //equal to what auth factory provides
        }

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
            retrieveProfile: retrieveProfile,
            extractName: extractName,
            extractPic: extractPic,
            storeUser: storeUser,
        }
    });
