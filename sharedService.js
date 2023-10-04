app.factory('sharedService', function () {
    var service = {};

    service.isSidebarOpen = false;
    service.formDataPost = {
        SenderId: "",
        DepartmentId: "",
        ReceiverId: "",
        Mobile: "",
        CostCenter: "",
        TotalPassengers: "",
        PickLocation: '',
        Destination: '',
        Reason: '',
        ApplyNote: false,
        UsageFrom: "",
        UsageTo: "",
        PickTime: "",
        ListOfUserId: [],
        Status: "",
        files: [],
    };

    return service;
});
