app.controller('SearchCtlr', ['$scope', 'SearchSvc', function($scope, SearchSvc) {

}]);

app.controller('ResultsCtlr', ['$scope', 'SearchSvc', function($scope, SearchSvc) {

}]);

app.factory('SearchSvc', ['$http', function($http) {

  var factoryObj = {};
  var results = {};

  var searchUri = '/search';

  factoryObj.data = function() {
    return results;
  }

  factoryObj.search = function(params) {
    //Params should be an object which may contain any of the following keys:
    //start, end, instrument, location
    $http.get(searchUri, {params: params })
      .then(function(data){
        results = data; //What is the result data going to look like??
      })
      .catch(function(err){
        console.log("Error retreiving data", err);
      })
  }
  return factoryObj;

}]);
