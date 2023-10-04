app.controller("siderbarCtrl", function ($scope, sharedService) {

    $scope.isSidebarOpen = sharedService.isSidebarOpen;

    $scope.sidebarItemsActive = [
        { label: "Requests", link: "" },
        { label: "Status", link: "" },
        { label: "Reports", link: "" },
    ];
    $scope.sidebarItemRequest = [
        { label: "All Request", link: "" },
        { label: "Sent to me", link: "" },
        { label: "Sent to others", link: "" },
        { label: "Shared with me", link: "" }
    ];

    $scope.sidebarItemStatus = [
        { label: "Draft", link: "" },
        { label: "Approving", link: "" },
        { label: "Approved", link: "" },
        { label: "Rejected", link: "" }
    ];

    $scope.toggleSidebar = function () {
        $scope.isSidebarOpen = !$scope.isSidebarOpen;
        sharedService.isSidebarOpen = $scope.isSidebarOpen;
    };
});