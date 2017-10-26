myApp.controller('ListController', function($http, $location, UserService) {
    // console.log('ListController created');
    var vm = this;

    var lists = UserService.lists;
    vm.user = {};

    vm.userObject = UserService.userObject;    

    //DONE
    UserService.getMyListsNames().then(function(){
         console.log('getMyListsNames');

        vm.myListsNames = UserService.myListsNames;  
        // vm.user.id  = vm.userObject.id;        
        console.log('vm.myListsNames',vm.myListsNames);
    });

    //in progress // get my saved lists/items/boolean
    // change this to get items based on getMyListsNames call above
    UserService.myListItems().then(function(){
        vm.myListItems = UserService.myListItems;  
        // vm.user.id  = vm.userObject.id;        
        // console.log('vm.myListItems',vm.myListItems);
    });

    vm.completeTask = function(object, done){
        UserService.completeTask(object, done);
        console.log('click controller working', object, done);
        }
        
    vm.getuser = function(){
        UserService.getuser();
    }
    vm.getuser();
});