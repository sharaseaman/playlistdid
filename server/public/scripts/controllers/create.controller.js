myApp.controller('CreateController', function($http, $location, UserService) {
    console.log('CreateController created');
    var vm = this;

  vm.newList = UserService.newList;

  

  vm.newList = function(){
    console.log('newList controller function');
    UserService.newList(vm.newList.listNameIn,vm.newList.itemIn);
    console.log('listNameIn', vm.newList.listNameIn);
    console.log('listNameIn', vm.newList.itemIn);

    
  }



  });