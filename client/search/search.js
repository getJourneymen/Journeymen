angular.module('JourneymenApp.Search',[])
.controller('SearchCtlr', ['$scope', '$state', 'SearchSvc', 'InstrSvc', function($scope, $state, SearchSvc, InstrSvc) {

  //Client should require all fields
  $scope.start = '';
  $scope.end = '';
  $scope.location = '';
  $scope.instrument = '';
  $scope.instruments = InstrSvc.getInstruments();

  $scope.search = function(){
    SearchSvc.search({start: $scope.start, end: $scope.end, location: $scope.location, instrument: $scope.instrument})
      .then(function(data){
        //Search service should have completed, need to redirect user to results state.
        $state.go('results');
      })
      .catch(function(err){
        console.log('An error occured performing the search', err)
      });
    }
  }
])

.controller('ResultsCtlr', ['$scope', 'SearchSvc', function($scope, SearchSvc) {
  $scope.results = SearchSvc.data();
  console.log('Show results for search', $scope.results)

}])
.factory('SearchSvc', ['$http', function($http) {

  var factoryObj = {};
  var results = {};

  var searchUri = '/search';

  factoryObj.data = function() {
    return results;
  }

  factoryObj.search = function(params) {
    //Params should be an object which may contain any of the following keys:
    //start, end, instrument, location
    return $http.get(searchUri, {params: params })
      .then(function(data){
        results = data; //What is the result data going to look like??
      })
      .catch(function(err){
        console.log("Error retreiving data", err);
      })
  }
  return factoryObj;

}]);
