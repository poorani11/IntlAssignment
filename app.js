// MODULE
var itunesApp = angular.module('itunesApp', ['ngRoute', 'ngResource', 'ngMaterial', 'ngAnimate', 'ngAria']);

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

            var resObj = $resource("https://itunes.apple.com/search");
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

    self.getData = function (artistName) {

        return $q(function (resolve, reject) {

            var resObj = $resource("https://itunes.apple.com/search");
            var resp = resObj.get({
                term: artistName,
                limit: 1
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
    self.getTabData = function () {
        return self.data;
    }
}]);

//CONTROLLERS
itunesApp.controller('homeController', ['$scope', 'artistService', function ($scope, artistService) {
    $scope.gotData = false;
    $scope.submitted = false;
    $scope.artistData = {};

    $scope.getArtistData = function () {
        $scope.submitted = true;
        artistService.getApi($scope.artistName, $scope.limit)
            .then(function (result) {
                var artistData = artistService.getArtistData();
                $scope.artistData = artistData.results;
                $('#addArtist').modal('hide');
                $scope.artistName = '';
                $scope.limit = '';
                $scope.gotData = true;

            })
    }

    $scope.onTabSelected = function (tab) {
        var artistName = tab.artistName.replace(/\s/g, '');
        artistService.getData(artistName)
            .then(function (result) {
                var tabData = artistService.getTabData();
                $scope.tabData = tabData.results[0];
                $scope.tabData.description = strip($scope.tabData.description);
                console.log($scope.tabData)

            })
    }

    function strip(html) {
        var tmp = document.implementation.createHTMLDocument("New").body;
        tmp.innerHTML = html;
        return tmp.textContent || tmp.innerText || "";
    }


}]);
