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
