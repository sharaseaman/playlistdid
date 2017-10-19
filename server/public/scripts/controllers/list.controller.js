myApp.controller('ListController', function($http, $location, UserService) {
    // console.log('ListController created');
    var vm = this;

    var lists = UserService.lists;

    vm.listsToDisplay = [];

    UserService.getLists();

    for (var i = 0; i < lists.length; i++) {
        vm.listsToDisplay.push({
            title: lists[i].name,
            items: lists[i].array_agg
        })
    }

    vm.completeTask = function(item){
    UserService.completeTask(item);
    console.log('click controller working')
    }




    // UserService.getItems();
});