var app = angular.module("manageUser", ["ngRoute"]);
app.config(function ($routeProvider) {
    $routeProvider
        .when("/home", {
            templateUrl: "page/home/home.html",
            controller: "homeCtrl"
        })
        .when("/userManagement", {
            templateUrl: "page/manageUser/manageUser.html",
            controller: "manageUserCtrl"
        })
        .when("/apiProducts", {
            templateUrl: "page/apiProducts/apiProducts.html",
            controller: "apiProductsCtrl"
        })
        .when("/carBooking", {
            templateUrl: "page/manageRequest/manageRequest.html",
            controller: "manageRequestCtrl"
        })
        .when("/createNew", {
            templateUrl: "page/createNewRequest/createNewRequest.html",
            controller: "createNewCtrl"
        })
        .when("/detailRequest/:Id", {
            templateUrl: "page/detailRequest/detailRequest.html",
            controller: "detailRequestCtrl"
        })
        .when("/logout", {
            templateUrl: "page/login/login.html",
            // controller: "loginCtrl"
        })
        .otherwise({ redirectTo: '/home' })
});
app.controller("indexCtrl", function ($scope) {
    $scope.menus = [
        {
            title: 'Home',
            url: '#!home'
        },
        {
            title: 'User Management',
            url: '#!userManagement'
        },
        {
            title: 'Products',
            url: '#!apiProducts'
        },
        {
            title: 'CarBooking',
            url: '#!carBooking'
        },
        {
            title: 'Logout',
            url: '#!logout'
        },
    ];
});
