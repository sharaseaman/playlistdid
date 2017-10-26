myApp.controller('UserController', function ($http, $location, UserService) {
  // console.log('UserController created');
  var vm = this;
  vm.userObject = UserService.userObject;

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

    // UserService.listItems;
    // console.log('vm.getThisListItems', vm.listItems);


  }
//in progress // click save to add to MYlist page
  vm.saveThisList = function (addListName, addItems) {

    UserService.saveThisList(addListName, addItems);
    console.log('saveThisList in controller');
  }

}); //end myapp


