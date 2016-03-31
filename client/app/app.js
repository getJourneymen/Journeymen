
angular.module('myApp', ['ui.router'])

.config(function($stateProvider, $urlRouterProvider) {
  $stateProvider
    .state('signin', {
      url: '/sigin',
      templateUrl: ''
    })
});