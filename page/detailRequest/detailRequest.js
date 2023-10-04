app.controller("detailRequestCtrl", function ($scope, $http, $routeParams) {
    const token = localStorage.getItem('Token');
    const requestId = $routeParams.Id; // Lấy requestId từ $routeParams thay vì query string
    $scope.detailRequest = {};
    $scope.workflowData = [];
    const fetchRequest = () => {
        $http.get(`http://localhost:63642/api/request/Id=${requestId}`, {
            headers: {
                Accept: 'application/json',
                Authorization: `Bearer ${token}`
            }
        })
            .then(function (response) {
                $scope.detailRequest = response.data.Data;
            });
        $http.get(`http://localhost:63642/api/request/workflow/requestId=${requestId}`, {
            headers: {
                Accept: 'application/json',
                Authorization: `Bearer ${token}`
            }
        })
            .then(function (response) {
                $scope.workflowData = response.data.Data;
                console.log($scope.workflowData);
            });
    }
    fetchRequest();
});
