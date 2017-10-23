myApp.service('UserService', function ($http, $location) {
  // console.log('UserService Loaded');
  var self = this;

  self.userObject = {};
  self.lists = {};
  self.allLists = {};
  self.newList = {};

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
        // console.log('UserService -- getuser -- User Data: ', self.userObject.userName);
      } else {
        // console.log('UserService -- getuser -- failure', response);
        // user has no session, bounce them back to the login page
        $location.path("/home");
      }
    });
  };

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

  self.getAllLists = function () {
    console.log('in getALLLists function on service');
   return $http({
     method: 'GET',
     url: '/user/allLists',
   }).then(function (response) {
     console.log('Response:', response.data);
     self.allLists = response.data;
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
            item: inputItem}
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
});