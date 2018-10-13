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

    self.getData = function (artistName) {

        return $q(function (resolve, reject) {

            var resObj = $resource("http://itunes.apple.com/search");
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