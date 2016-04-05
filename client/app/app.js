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
    $urlRouterProvider.otherwise("/signin");
});
// //prevent transition if not authenticated
// .run(function($rootScope, $state, AuthService){
// 	$rootScope.$on('$stateChangeStart', function(event,toState, toParams,fromState,fromParams){
// 		if(toState.authenticate && !AuthService.isAuthenticated()){
// 			$state.transitionTo('login');
// 			event.preventDefault();
// 		}
// 	})
// })
