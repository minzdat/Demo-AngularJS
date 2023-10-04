app.controller("manageRequestCtrl", function ($scope, $http, sharedService) {
    $scope.isSidebarOpen = sharedService.isSidebarOpen;

    $scope.fromDate = null;
    $scope.toDate = null;
    $scope.fromDateNew = '';
    $scope.toDateNew = '';
    $scope.status = '';
    $scope.senderId = '';
    $scope.paginationPage = [];
    $scope.dataUserRequest = [];
    $scope.dataCreatedBy = [];
    $scope.page = 1;
    $scope.requestCode = '';
    $scope.isShowCreateRequest = false;

    const token = localStorage.getItem('Token');

    const paginationPageRequest = function (totalPage) {
        if ($scope.paginationPage.length === 0) {
            for (let counter = 1; counter <= totalPage; counter++) {
                $scope.paginationPage.push(counter);
            }
        }
    }
    const fetchAllUser = () => {
        $http.get(`http://localhost:63642/api/user/all?page=1&limit=100`, {
            headers: {
                Apccept: 'application/json',
                Authorization: `Bearer ${token}`
            }
        })
            .then(function (response) {
                $scope.dataCreatedBy = response.data.Data.ListData;
            });
    }
    fetchAllUser();

    const fetchListRequest = () => {
        $http.get(`http://localhost:63642/api/request/get-all?requestCode=${$scope.requestCode}&createdFrom=${$scope.fromDateNew}&createdTo=${$scope.toDateNew}&senderId=${$scope.senderId}&status=${$scope.status}&page=${$scope.page}&limit=20&search=`, {
            headers: {
                Apccept: 'application/json',
                Authorization: `Bearer ${token}`
            }
        })
            .then(function (response) {
                const totalPage = response.data.Data.TotalPage;
                $scope.dataUserRequest = response.data.Data.ListData;
                paginationPageRequest(totalPage);
            });
    }
    fetchListRequest();

    $scope.titleTable = ['Request Code', 'Department', 'Created by', 'User', 'Created date', 'From', 'To'];

    $scope.statusRequest = ['Draft', 'Waiting for approval', 'Approved', 'Rejected', 'Canceled', 'Done'];

    $scope.handdlePagination = function (index, event) {
        if (event === 'nextPage' && $scope.page < $scope.paginationPage.length) {
            $scope.page = $scope.page + 1;
        } else if (event === 'previousPage' && $scope.page > 1) {
            $scope.page = $scope.page - 1;
        } else if (event === 'numberPage') {
            $scope.page = index;
        }
    }

    $scope.handdleApplyFilter = function (requestCode, senderId, status, fromDate, toDate) {
        if (fromDate && toDate) {
            let newDateFrom = new Date(fromDate);
            let newDateTo = new Date(toDate);
            newDateFrom = newDateFrom.toLocaleDateString('en-GB').split('/').reverse().join('-');
            newDateTo = newDateTo.toLocaleDateString('en-GB').split('/').reverse().join('-');
            $scope.fromDateNew = newDateFrom;
            $scope.toDateNew = newDateTo;
        } else {
            $scope.fromDateNew = '';
            $scope.toDateNew = '';
        }
        if (status === 'All Request') {
            $scope.status = '';
        } else {
            $scope.status = status;
        }
        $scope.requestCode = requestCode;
        $scope.senderId = senderId;
        fetchListRequest();
    }

    $scope.handdleClearFilter = function () {
        $scope.fromDate = null;
        $scope.toDate = null;
        $scope.requestCode = '';
        $scope.senderId = '';
        $scope.status = '';
        $scope.fromDateNew = '';
        $scope.toDateNew = '';
        fetchListRequest();
    }

    $scope.$watch('page', function (newPage, oldPage) {
        if (newPage !== oldPage) {
            fetchListRequest();
        }
    });

    $scope.$watch(function () {
        return sharedService.isSidebarOpen;
    }, function (newVal, oldVal) {
        if (newVal !== oldVal) {
            $scope.isSidebarOpen = newVal;
        }
    });
});
