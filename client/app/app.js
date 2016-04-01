angular.module('JourneymenApp', [
    'ui.router',
    //modules placeholder
    // 'JourneymenApp.auth',
    // 'JourneymenApp.user',
])

.config(function($stateProvider, $urlRouterProvider) {
    $stateProvider
        .state('signin', {
            url: '/sigin',
            templateUrl: '../auth/signin.html',
            //controller: ,//fill AuthController
            authenticate: false
        })
        .state('search', {
            url: '/search',
            templateUrl: '../search/search.html',
            //controller: ,//fill
            authenticate: true
        })
        .state('results', {
            url: '/results',
            templateUrl: '../search/results.html',
            //controller: ,//fill
            authenticate: true
        })
        .state('profile', {
            url: '/profile',
            templateUrl: '../user/profile.html'
            //controller: ,//fill
            authenticate: true
        })
        .state('edit', {
            url: '/editprofile',
            templateUrl: '../user/editprofile.html'
            //controller: ,//fill
            authenticate: true
        })
        .state('setavail', {
            url: '/setavail',
            templateUrl: '../user/setavail.html'
            //controller: ,//fill
            authenticate: true
        })
    $urlRouterProvider.otherwise("/signin");
});
//prevent transition if not authenticated
.run(function($rootScope, $state, AuthService){
	$rootScope.$on('$stateChangeStart', function(event,toState, toParams,fromState,fromParams){
		if(toState.authenticate && !AuthService.isAuthenticated()){
			$state.transitionTo('login');
			event.preventDefault();
		}
	})
})





































