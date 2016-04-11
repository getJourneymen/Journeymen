angular.module('JourneymenApp', [
    'ui.router',
    'ui.bootstrap',
    'checklist-model',
    'JourneymenApp.Search',
    'JourneymenApp.Auth',
    'JourneymenApp.Instruments',
    'JourneymenApp.Profile',
    'JourneymenApp.Avail',
    'JourneymenApp.ProfileEdit'
])

.config(function($stateProvider, $urlRouterProvider) {
    $stateProvider
        .state('signin', {
            url: '/signin',
            templateUrl: '../auth/signin.html',
            authenticate: false
        })
        .state('search', {
            url: '/search',
            templateUrl: '../search/search.html',
            controller: 'SearchCtlr',
            authenticate: true
        })
        .state('results', {
          //Search transitions to this state once complete.
            url: '/results',
            templateUrl: '../search/results.html',
            controller: 'ResultsCtlr',
            authenticate: true
        })
        .state('profile', {
          //Optionally include a username in the path which is passed to $stateParams; defaults to null. This is used by the controller to lookup profiles of any user. See links in search results.
            url: '/profile/:uname',
            params: {
              uname: {
                value: null,
                squash: true
              }
            },
            templateUrl: '../user/profile.html',
            controller: 'ProfileCtlr',
            authenticate: true
        })
        .state('profile-edit', {
          //Allow profile editing for current logged in user.
            url: '/profile-edit',
            templateUrl: '../user/editprofile.html',
            controller: 'EditprofileCtlr',
            authenticate: true
        })
        .state('setavail', {
          //Allow setting new availability for current logged in user.
            url: '/setavail',
            templateUrl: '../user/setavail.html',
            controller: 'AvailCtlr',
            authenticate: true
        })
    $urlRouterProvider.otherwise("/search");
})

//The following factory (authHttpResponseInterceptor) and config intercept any 401 responses and redirect the user to the signin page. See: http://blog.thesparktree.com/post/75952317665/angularjs-interceptors-globally-handle-401-and.

.factory('authHttpResponseInterceptor',['$q','$location',function($q,$location){
    return {
        response: function(response){
            if (response.status === 401) {
                console.log("Response 401");
            }
            return response || $q.when(response);
        },
        responseError: function(rejection) {
            if (rejection.status === 401) {
                console.log("Response Error 401",rejection);
                $location.path('/signin').search('returnTo', $location.path());
            }
            return $q.reject(rejection);
        }
    }
}])
.config(['$httpProvider',function($httpProvider) {
    //Http Intercpetor to check auth failures for xhr requests
    $httpProvider.interceptors.push('authHttpResponseInterceptor');
}]);
