app.controller('apiProductsCtrl', function ($scope, $http) {
    $http.get("https://dummyjson.com/products")
        .then(function (response) {
            $scope.dataProduct = response.data.products;
            // console.log($scope.dataProduct);
        });
}); 