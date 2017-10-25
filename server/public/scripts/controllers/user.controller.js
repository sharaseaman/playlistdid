myApp.controller('UserController', function($http, $location,UserService) {
  // console.log('UserController created');
  var vm = this;
  // vm.userObject = UserService.userObject;
  console.log('vm.getThisListItems', vm.listItems);
  
  vm.showList = false;

  // Gets all List Names for homepage /all users
  UserService.getAllListsNames().then(function(){
    // console.log('UserService.allListsName',UserService.allListsName);  
    vm.allListsNames = UserService.allListsName;  
});


  //Gets all List Items for homepage/ all users/inject listname
  vm.getThisListItems = function(listName){
    UserService.getThisListItems(listName).then( function(){
      console.log(' UserService.listItems',  UserService.listItems);
      vm.listItems = UserService.listItems;
      
    });
    
    // UserService.listItems;
    // console.log('vm.getThisListItems', vm.listItems);
    
  
  }




  vm.addThisList = function(addListName, addItems){
    
    // console.log('click controller working', addListName, addItems);

    // var objectToSend = {name: addListName,
    //                     items: addItems}
    
    UserService.addThisList(addListName,addItems);
    //  console.log('sending objectToSend', objectToSend);
  }


});


