myApp.controller('ListController', function($http, $location, UserService) {
    // console.log('ListController created');
    var vm = this;

    var lists = UserService.lists;
    // vm.listsToDisplay = [];


    UserService.getLists().then(function(){
        vm.listsToDisplay = UserService.lists;  
        console.log(vm.listsToDisplay);
    });

    vm.completeTask = function(object, index){
        console.log(object, index);
        
       console.log("here",vm.listsToDisplay.checkboxs[index]);
       vm.listsToDisplay.checkboxs[index] = !vm.listsToDisplay.checkboxs[index];
       console.log("there",vm.listsToDisplay.checkboxs[index]);

        // UserService.completeTask(object,complete);
        // console.log('click controller working', object,complete)
    }
    // for (var i = 0; i < lists.length; i++) {
    //     var items = lists[i].items;
    //     var completes = lists[i].checkboxs;
    //     var combined = [];
    //     for (var j = 0; j < items.length; j++) {
    //         combined.push({
    //             item: items[j],
    //             complete: completes[j]
    //         })
    //     }

    //     vm.listsToDisplay.push({
    //         title: lists[i].name,
    //         items: combined
    //     })
    // }

    // vm.completeTask = function(object){
    // UserService.completeTask(object);
    // console.log('click controller working')
    // }
    // console.log('list to display', vm.listsToDisplay);



    // UserService.getLists();
});