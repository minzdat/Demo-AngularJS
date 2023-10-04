app.controller("homeCtrl", function ($scope) {
    $scope.valueExample = 'Learning Angularjs 1';
    $scope.dataList = { fullname: 'Minh Dat', age: '20' };
    $scope.dataListUser = [
        { fullname: 'The Bao', age: '20' },
        { fullname: 'Duc Tri', age: '21' },
        { fullname: 'The Binh', age: '22' }
    ];

    // console.log($scope.dataListUser);

})
app.directive("testDirectiveUser", function () {
    return {
        template: "I was made in a directive constructor!"
    };
})