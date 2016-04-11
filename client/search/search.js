angular.module('JourneymenApp.Search',[])
.controller('SearchCtlr', ['$scope', '$state', 'SearchSvc', 'InstrSvc', function($scope, $state, SearchSvc, InstrSvc) {

  //Initialize scope parameters to be sent in the search query.
  $scope.start = '';
  $scope.end = '';
  $scope.location = '';
  $scope.instrument = '';

  //Utilize instruments service to scoped variable which contains all potential instruments. This will be used in the template to populate a drop down list for search.
  $scope.instruments = InstrSvc.getInstruments();

  // This function, which wraps a factory in this module, is invoked by by the submit button in the search template.
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
  console.log('Show results for search', $scope.results);
}])

.factory('SearchSvc', ['$http', function($http) {

  //Factory methods will be attached to the factoryObj, which will be returned by this factory.
  var factoryObj = {};

  //Data returned by the search API call will be stored in results.
  var results = {};
  var searchUri = '/search';

  //Data() function allows controllers to indirectly access the results data.
  factoryObj.data = function() {
    return results;
  }

  factoryObj.search = function(params) {
    //Params should be an object which may contain any of the following keys:
    //start, end, instrument, location
    return $http.get(searchUri, {params: params })
      .then(function(data){
        results = data;
      })
      .catch(function(err){
        console.log("Error retreiving data", err);
      })
  }
  return factoryObj;

}]);
