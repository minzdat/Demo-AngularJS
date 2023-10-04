app.controller("manageUserCtrl", function ($scope) {
    $scope.isShowEdit = false;
    $scope.isShow = false;
    $scope.isHidden = true;
    $scope.dataList = [
        { fullname: 'The Binh', address: 'Tay Ninh', age: '20', email: 'admin0001@gmail.com', phoneNumber: '0534789234' },
        { fullname: 'The Bao', address: 'TP HCM', age: '21', email: 'admin0002@gmail.com', phoneNumber: '0956789234' },
        { fullname: 'Duc Tri', address: 'Tay Ninh', age: '22', email: 'admin0003@gmail.com', phoneNumber: '0745789234' }
    ];
    $scope.columns = [
        'No',
        'Full Name',
        'Address',
        'Age',
        'Email',
        'Phone Number',
    ];
    $scope.showAddUser = function () {
        this.isShow = !this.isShow;
        this.isHidden = !this.isHidden;
    }
    $scope.addUser = function () {
        var newUser = {
            'fullname': this.fullname,
            'address': this.address,
            'age': this.age,
            'email': this.email,
            'phoneNumber': this.phoneNumber
        };
        this.dataList.push(newUser);

        this.fullname = '';
        this.address = '';
        this.age = '';
        this.email = '';
        this.phoneNumber = '';
    }
    $scope.resetUser = function () {
        this.dataList = []
    }
    $scope.deleteUser = function (index) {
        this.dataList.splice(index, 1);
    }
    $scope.editUSer = function (index) {

        this.isShowEdit = !this.isShowEdit;

        this.editfullname = $scope.dataList[index].fullname;
        this.editaddress = this.dataList[index].address;
        this.editage = this.dataList[index].age;
        this.editemail = this.dataList[index].email;
        this.editphoneNumber = this.dataList[index].phoneNumber;

    }
    $scope.saveEditUser = function (index) {
        this.isShowEdit = !this.isShowEdit;

        this.dataList[index].fullname = this.editfullname;
        this.dataList[index].address = this.editaddress;
        this.dataList[index].age = this.editage;
        this.dataList[index].email = this.editemail;
        this.dataList[index].phoneNumber = this.editphoneNumber;

    }
    $scope.cancelEditUser = function () {
        this.isShowEdit = !this.isShowEdit;
    }
});