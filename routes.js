// ROUTES
itunesApp.config(function ($routeProvider) {

    $routeProvider

        .when('/', {
            templateUrl: 'pages/home.html',
            controller: 'homeController'
        })
});