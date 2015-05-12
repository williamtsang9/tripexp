'use strict';
angular.module('tripexp.plotmap', [])

.config(['$routeProvider', function($routeProvider, $locationProvider) {
  $routeProvider.when('/plotmap', {
    templateUrl: 'views/plotmap/plotmap.html',
    controller: 'PlotMapCtrl'
  });
}])

.directive('mapCanvas', function($http) {
  return {
    // opens Google maps Map Canvas
    link: function initialize() {
      var map, myLatlng, tripId, poiMarkers, placePOIMarker;
      var bounds = new google.maps.LatLngBounds();
      var mapOptions = {
        mapTypeId: 'roadmap',
        zoom: 10,
      };

      // Trip Data Package
      var tripRequest = {
        method: "GET",
        url: "http://localhost:3000/api/users/1/trips/1"
      };

      // HTTP call to API for Trip Location
      $http(tripRequest).success(function(tripResponse){
        mapOptions.center = new google.maps.LatLng(tripResponse[0].geocode_latitude, tripResponse[0].geocode_longitude);

        // POI Data Package based off of Trip response
        var poiRequest = {
          method: "GET",
          url: "http://localhost:3000/api/users/1/trips/"+tripResponse[0].id+"/pois"
        };        

        // HTTP Call for POIs
        $http(poiRequest).success(function(poiResponse){
          poiMarkers = poiResponse;
          for (var i = 0; i <= poiMarkers.length; i++){
            placePOIMarker = new google.maps.LatLng(poiMarkers[i])
          }
          map = new google.maps.Map(document.getElementById('map-canvas'), mapOptions);
          map.setTilt(45);                  
        }).error(function(poiResponse){
          console.log('error poi', poiResponse)
        })
      }).error(function(response){
        console.log('error', response)
      })



    }
  };
})

.controller('PlotMapCtrl', function($scope, $http, $route, $location, $window) {

})  // End of controller
  