app.controller("menuCtrl", function ($scope, $http, sharedService) {
    const token = localStorage.getItem('Token');
    $scope.$watch(function () {
        return sharedService.isSidebarOpen;
    }, function (newVal, oldVal) {
        if (newVal !== oldVal) {
            $scope.isSidebarOpen = newVal;
        }
    });
    $scope.titleMenu = [
        {
            title: 'Return',
            url: '#!carBooking'
        },
        {
            title: 'Save Draft',
            url: '#!carBooking'
        },
        {
            title: 'Submit',
            url: '#!carBooking'
        },
    ];
    $scope.postCreateRequest = function (action) {
        if (action === 'Submit' | action === 'Save Draft') {
            const url = "http://localhost:63642/api/request/create";
            const headers = {
                'Content-Type': undefined,
                'Authorization': 'Bearer ' + token
            };
            // if (action === 'Save Draft') {
            //     formData.Status = 'Draft'
            // }
            const formData = new FormData();
            if (action === 'Save Draft') {
                $scope.formData.Status = 'Draft';
            }
            for (var key in $scope.formData) {
                if (Array.isArray($scope.formData[key])) {
                    for (var i = 0; i < $scope.formData[key].length; i++) {
                        formData.append(key, $scope.formData[key][i]);
                    }
                } else {
                    formData.append(key, $scope.formData[key]);
                }
            }
            $http.post(url, formData, { headers: headers })
                .then(function (response) {
                    // console.log(response.data);
                })
                .catch(function (error) {
                    console.error("Error:", error);
                });
        }
    };
})