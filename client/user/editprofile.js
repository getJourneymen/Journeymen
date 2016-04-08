angular.module('JourneymenApp.ProfileEdit',[])
    .controller('EditprofileCtlr', function($scope,$state, EditprofileSvc) {
        $scope.pic;
        $scope.first = '';
        $scope.last = '';
        $scope.description = '';

        // $scope.first = ProfileSvc.extractName.firstname; //may need to edit access
        // $scope.last = ProfileSvc.extractName.lastname; //may need to edit access
        // $scope.pic = ProfileSvc.extractPic;

        $scope.editProfile = function(){
        	//create user and set avail?
        }

    })
    //send authtoken and call update user endpoint put endpoin '/user' and put endpoint: '/avail' with updated object
    .factory('EditprofileSvc', function($http) {

        var soundCloudData = {};
        var createUserUri = '/signup';

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
            $http.post(createUserUri, userData)
                .then(function(res) {
                    console.log('Successfully added user: ', res)
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
