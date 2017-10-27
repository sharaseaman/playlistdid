myApp.controller('CreateController', function ($http, $location, UserService) {
  var vm = this;
  
  vm.userObject = UserService.userObject;    
  vm.user = {};
  console.log('CreateController created',vm.userObject);
  
  vm.newList = UserService.newList;

  vm.itemsArray = [];
  
  vm.toggleTesty = function(){
    if( vm.activeList ){
        console.log( 'found a testy' );
        vm.activeList = '';
    }
    else{
        vm.activeList = {
            user_id: 3,
            title: 'Beaches',
            items: []
        }
    }
}

  vm.newList = function () {
    console.log('newList controller function');
    console.log('ListTitle =', vm.newList.listNameIn);
    // UserService.newList(vm.newList.listNameIn, vm.itemsArray);
    console.log('purple rain =', vm.itemsArray);

  }

  vm.addItems = function () {
    var newItem = {
      item: vm.newList.itemIn
    }
    vm.itemsArray.push(newItem);
    console.log('newItem', vm.itemsArray);
    vm.newList.itemIn = ''
  };

  vm.submitNewList = function(){
    console.log('in submitNewList');
    var obj = {
      list: vm.newList.listNameIn,
      itemArray: vm.itemsArray
    }
    UserService.newList(obj);
  }
});

