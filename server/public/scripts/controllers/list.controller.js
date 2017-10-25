myApp.controller('ListController', function($http, $location, UserService) {
    // console.log('ListController created');
    var vm = this;

    var lists = UserService.lists;
    vm.user = {};

    vm.userObject = UserService.userObject;    

    //in progress // get my saved lists/items/boolean
    UserService.getMyLists().then(function(){
        vm.listsToDisplay = UserService.lists;  
        // vm.user.id  = vm.userObject.id;        
        console.log(vm.listsToDisplay);
        // console.log("what is this?",vm.user.id);
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