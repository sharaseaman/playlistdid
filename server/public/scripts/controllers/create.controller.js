myApp.controller('CreateController', function ($http, $location, UserService) {
  console.log('CreateController created');
  var vm = this;

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
    UserService.newList(vm.newList.listNameIn, vm.itemsArray);
    console.log('listNameIn', vm.newList.listNameIn);
    console.log('listNameIn', vm.newList.itemIn);

  }

  vm.addItems = function () {
    var newItem = {
      item: vm.newList.itemIn
    }
    vm.itemsArray.push(newItem);
    console.log('newItem', vm.itemsArray);
    vm.newList.itemIn = ''
  };
});