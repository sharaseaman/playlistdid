myApp.controller('UserController', function ($http, $location, UserService) {
  // console.log('UserController created');
  var vm = this;
  vm.userObject = UserService.userObject;
  vm.userService = UserService;
  vm.showList = false;


  //DONE // Gets all List Names for homepage /all users
  UserService.getAllListsNames().then(function () {
    // console.log('UserService.allListsName',UserService.allListsName);  
    vm.allListsNames = UserService.allListsName;    
  
  });

  //DONE //Gets all List Items for homepage/ all users/inject listname
  vm.getThisListItems = function (listName) {
    UserService.getThisListItems(listName).then(function () {
      console.log(' UserService.listItems', UserService.listItems);
      vm.listItems = UserService.listItems;
    });
  }
  // vm.getThisListItems = UserService.listItems;
  // vm.listItems = UserService.listItems

  vm.saveThisList = function (listId) {
    UserService.saveThisList(listId);
    console.log('saveThisList in controller -> ', listId);
  }

}); //end myapp


