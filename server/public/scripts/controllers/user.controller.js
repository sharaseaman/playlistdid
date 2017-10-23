myApp.controller('UserController', function($http, $location,UserService) {
  // console.log('UserController created');
  var vm = this;
  vm.userService = UserService;
  vm.userObject = UserService.userObject;

  vm.addThisList = UserService.addThisList;
  

  vm.showList = false;

  UserService.getAllLists().then(function(){
    vm.allListsToDisplay = UserService.allLists;  
    // vm.user.id  = vm.userObject.id;        
    console.log(vm.allListsToDisplay);
    // console.log("what is this?",vm.user.id);
});

vm.addThisList = function(){
  console.log('add entire list button working');
  // vm.getAllLists();
  }



});


