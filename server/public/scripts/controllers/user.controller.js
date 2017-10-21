myApp.controller('UserController', function($http, $location,UserService) {
  // console.log('UserController created');
  var vm = this;
  vm.userService = UserService;
  vm.userObject = UserService.userObject;

  UserService.getAllLists().then(function(){
    vm.allListsToDisplay = UserService.allLists;  
    // vm.user.id  = vm.userObject.id;        
    console.log(vm.allListsToDisplay);
    // console.log("what is this?",vm.user.id);
});
  
});


