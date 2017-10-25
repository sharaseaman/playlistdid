myApp.service('UserService', function ($http, $location) {
  // console.log('UserService Loaded');
  var self = this;

  self.userObject = {};
  self.lists = {};
  self.allListsName = {};
  self.newList = {};
  self.listItems = {}; //list of Items for getThisList Items

  self.getuser = function () {
    // console.log('UserService -- getuser');
    $http({
      method: 'GET',
      url: '/user',
    }).then(function (response) {
      if (response.data.username) {
        // user has a curret session on the server
        self.userObject.userName = response.data.username;
        self.userObject.id = response.data.id;
        //  console.log('UserService -- getuser -- User Data: ', self.userObject.userName);
      } else {
        // console.log('UserService -- getuser -- failure', response);
        // user has no session, bounce them back to the login page
        $location.path("/home");
      }
    });
  };

  // get all the list names for homepage
  self.getAllListsNames = function () {
    // console.log('in getALLLists function on service');
   return $http({
     method: 'GET',
     url: '/user/allListsName',
   }).then(function (response) {
    //  console.log('Response:', response.data);
     self.allListsName = response.data;
    // console.log('response.data =', response.data);
    //  console.log('self.allListsName', self.allListsName);
   });
 }
//  get List items for homepage
  self.getThisListItems = function(listName){
    console.log('getListItems in service',listName);
    return $http({
      method: 'GET',
      url: '/user/getThisListItems/'+ listName
    }).then(function (response) {
     //  console.log('Response:', response.data);
      self.listItems = response.data;
    //  console.log('response.data =', response.data);
      console.log('self.listItems', self.listItems);
    });
  
  }
  });





 self.getLists = function () {
  console.log('in getLists function on service');
 return $http({
   method: 'GET',
   url: '/lists',
 }).then(function (response) {
   console.log('Response:', response.data);
   self.lists = response.data;
 });
}
  self.completeTask = function(object, complete){
    console.log('completeTask function called', object, complete);
    $http({
      method: 'PUT',
      url: '/lists',
      data: {data: object, complete: complete}
    }).then(function(response){
      console.log('what is object', object);
      
      console.log('second complete log');
    })
  }

  self.newList = function (inputName, inputItem) {
    console.log('new List made it to service',inputName, inputItem);
  
    $http({
      method: 'POST',
      url: '/create',
      data: {name: inputName,
            item: [inputItem]}
      }).then(function(response){
      console.log('newList success');
    });
  }

  self.logout = function () {
    console.log('UserService -- logout');
    $http({
      method: 'GET',
      url: '/user/logout'
    }).then(function (response) {
      console.log('UserService -- logout -- logged out');
      $location.path('/home');
    });
  };


// add list from home page to users page
self.addThisList = function(addListName,addItems, addUserName){
  console.log( 'addThisList worked in service',addListName, addItems);
  $http({
    method: 'POST',
    url: '/user',
    data: {name: addListName, item: addItems, userName: addUserName}
  }).then(function(response){
    console.log('i am here');
  });
}
