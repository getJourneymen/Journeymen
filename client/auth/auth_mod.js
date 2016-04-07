angular.module('JourneymenApp.Auth', [])
.factory('AuthSvc', [function() {

  var authToken = null;

  var auth = {};

  auth.retrieveToken = function() {
    return authToken;
  }

  auth.setToken = function(token) {
    authToken = token;
  }

  return auth;
}]);
