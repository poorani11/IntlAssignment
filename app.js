// MODULE
var itunesApp = angular.module('itunesApp', ['ngRoute', 'ngResource','ngMaterial','ngAnimate','ngAria']);

// ROUTES
itunesApp.config(function ($routeProvider) {

    $routeProvider

        .when('/', {
            templateUrl: 'pages/home.html',
            controller: 'homeController'
        })
});

//SERVICES
itunesApp.service('artistService', ['$resource', '$q', function ($resource, $q) {
    var self = this;

    self.getApi = function (artistName, limit) {

        return $q(function (resolve, reject) {

            var resObj = $resource("http://itunes.apple.com/search");
            var resp = resObj.get({
                term: artistName,
                limit: limit
            });
            resp.$promise.then(function (data) {
                console.log('Got data');
                self.data = data;
                resolve('success')
            }, function (err) {
                console.log(err);
                console.log('error');
                reject('error')
            });
        })

    }
    self.getArtistData = function () {
        return self.data;
    }
}]);

//CONTROLLERS
itunesApp.controller('homeController', ['$scope', 'artistService', function ($scope, artistService) {
    $scope.gotData = false;
    $scope.artistData = {};

    $scope.getArtistData = function () {
        artistService.getApi($scope.artistName, $scope.limit)
            .then(function (result) {
                var artistData = artistService.getArtistData();
                $scope.artistData = artistData.results;
                $scope.gotData = true;
            console.log($scope.artistData)

            })
    }

}]);
