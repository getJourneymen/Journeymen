angular.module('JourneymenApp', [
    'ui.router',
    'ui.bootstrap',
    'checklist-model'

    //modules placeholder
    // 'JourneymenApp.auth',
    // 'JourneymenApp.user',
])

.config(function($stateProvider, $urlRouterProvider) {
    $stateProvider
        .state('signin', {
            url: '/signin',
            templateUrl: '../auth/signin.html',
            //controller: ,//fill AuthController
            authenticate: false
        })
        .state('search', {
            url: '/search',
            templateUrl: '../search/search.html',
            controller: 'SearchCtlr',
            authenticate: true
        })
        .state('results', {
            url: '/results',
            templateUrl: '../search/results.html',
            controller: 'SearchCtlr',
            authenticate: true
        })
        .state('profile', {
            url: '/profile',
            templateUrl: '../user/profile.html',
            controller: 'ProfileCtlr',
            authenticate: true
        })
        .state('profile-edit', {
            url: '/profile/:username/edit',//add userid to url
            templateUrl: '../user/editprofile.html',
            controller: 'EditprofileCtlr',
            authenticate: true
        })
        .state('setavail', {
            url: '/profile/:username/setavail',
            templateUrl: '../user/setavail.html',
            controller: 'AvailCtlr',
            authenticate: true
        })
    $urlRouterProvider.otherwise("/search");
})
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
// //prevent transition if not authenticated
// .run(function($rootScope, $state, AuthService){
// 	$rootScope.$on('$stateChangeStart', function(event,toState, toParams,fromState,fromParams){
// 		if(toState.authenticate && !AuthService.isAuthenticated()){
// 			$state.transitionTo('login');
// 			event.preventDefault();
// 		}
// 	})
// })
