app.controller("createNewCtrl", function ($scope, $http, sharedService) {

    const token = localStorage.getItem('Token');
    const senderId = localStorage.getItem("Id");

    $scope.timeFrom = null;
    $scope.timeTo = null;
    $scope.pickTime = null;

    $scope.formData = sharedService.formDataPost;
    $scope.formData.SenderId = senderId;
    $scope.isSidebarOpen = sharedService.isSidebarOpen;
    $scope.Department = [];
    $scope.User = [];
    $scope.DepartmentId = '';
    $scope.SenderUSer = '';
    $scope.selectedDepartment = '';
    $scope.listCardApprover = [];
    $scope.listSendApprover = [];
    $scope.selectedApprover = [];
    let counterApprover = 0;

    const fetchSender = () => {
        $http.get("http://localhost:63642/api/user/profile/" + senderId, {
            headers: {
                Apccept: 'application/json',
                Authorization: `Bearer ${token}`
            }
        })
            .then(function (response) {
                $scope.SenderUSer = response.data.Data.FirstName + ' ' + response.data.Data.LastName;
            });
    }
    fetchSender();

    const fetchDepartment = () => {
        $http.get("http://localhost:63642/api/department/all?page=1&limit=100", {
            headers: {
                Apccept: 'application/json',
                Authorization: `Bearer ${token}`
            }
        })
            .then(function (response) {
                $scope.Department = response.data.Data.ListData;
                $scope.DepartmentId = response.data.Data.ListData[0].Id;
                $scope.selectedDepartment = response.data.Data.ListData[0].Id;
                $scope.formData.DepartmentId = response.data.Data.ListData[0].Id;
                fetchUser();
                fetchSendAppprover();
            });
    }
    fetchDepartment();

    const fetchUser = () => {
        $http.get("http://localhost:63642/api/departmentMember/position?departmentId="
            + $scope.DepartmentId, {
            headers: {
                Apccept: 'application/json',
                Authorization: `Bearer ${token}`
            }
        })
            .then(function (response) {
                $scope.User = response.data.Data;
                $scope.formData.ReceiverId = response.data.Data[0] ? response.data.Data[0].User.Id : '';
            });
    }

    const fetchSendAppprover = () => {
        $http.get("http://localhost:63642/api/userRole/all-approvers/" + $scope.DepartmentId, {
            headers: {
                Apccept: 'application/json',
                Authorization: `Bearer ${token}`
            }
        })
            .then(function (response) {
                $scope.listCardApprover = [];
                $scope.listSendApprover = response.data.Data;
                counterApprover = 0;
                for (let counter = 0; counter < response.data.Data.length; counter++) {
                    if (response.data.Data[counter].Position === 'Supervisor') {
                        counterApprover++;
                        $scope.listCardApprover.push(response.data.Data[counter].Position);
                        $scope.selectedApprover.push(response.data.Data[counter].Id);
                        break;
                    }
                }
                for (let counter = 0; counter < response.data.Data.length; counter++) {
                    if (response.data.Data[counter].Position === 'Manager') {
                        counterApprover++;
                        $scope.listCardApprover.push(response.data.Data[counter].Position);
                        $scope.selectedApprover.push(response.data.Data[counter].Id);
                        break;
                    }
                }
                $scope.formData.ListOfUserId = $scope.selectedApprover;
            });
    }


    $scope.handleAddApprover = function () {
        counterApprover++;
        $scope.listCardApprover.push(counterApprover);
    }
    $scope.handleChangeDepartmentId = function (selectedDepartment) {
        $scope.DepartmentId = selectedDepartment;
        $scope.formData.DepartmentId = selectedDepartment;
        fetchUser();
        fetchSendAppprover();
    }
    $scope.handleChangeReceiverId = function (receiverId) {
        $scope.formData.ReceiverId = receiverId;
    }
    $scope.handleChangeForm = function (Mobile, CostCenter, TotalPassengers, PickLocation, Destination, Reason, timeFrom, timeTo, pickTime, ApplyNote) {
        let timeFromDate = new Date(timeFrom);
        timeFromDate = timeFromDate.toISOString();
        let timeToDate = new Date(timeTo);
        timeToDate = timeToDate.toISOString();
        let pickTimeDate = new Date(pickTime);
        pickTimeDate = pickTimeDate.toISOString();
        $scope.formData.PickTime = pickTimeDate;
        $scope.formData.UsageFrom = timeFromDate;
        $scope.formData.UsageTo = timeToDate;
        $scope.formData.Mobile = Mobile;
        $scope.formData.CostCenter = CostCenter;
        $scope.formData.TotalPassengers = TotalPassengers;
        $scope.formData.PickLocation = PickLocation;
        $scope.formData.Destination = Destination;
        $scope.formData.Reason = Reason;
        $scope.formData.ApplyNote = ApplyNote;
        console.log($scope.formData);
    }
    $scope.$watch(function () {
        return sharedService.isSidebarOpen;
    }, function (newVal, oldVal) {
        if (newVal !== oldVal) {
            $scope.isSidebarOpen = newVal;
        }
    });
})
