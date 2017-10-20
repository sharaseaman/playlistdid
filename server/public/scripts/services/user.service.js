myApp.service('UserService', function ($http, $location) {
  // console.log('UserService Loaded');
  var self = this;

  self.userObject = {};
  self.lists = {};
  self.create = {};

  self.getuser = function () {
    // console.log('UserService -- getuser');
    $http({
      method: 'GET',
      url: '/user',
    }).then(function (response) {
      if (response.data.username) {
        // user has a curret session on the server
        self.userObject.userName = response.data.username;
        // console.log('UserService -- getuser -- User Data: ', self.userObject.userName);
      } else {
        // console.log('UserService -- getuser -- failure', response);
        // user has no session, bounce them back to the login page
        $location.path("/home");
      }
    });
  };
  //get lists in db
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
  

  self.createList = function () {
    console.log('in createList function on user.service');
    $http({
      method: 'GET',
      url: '/create',
    }).then(function (response) {
      console.log('Response:', response.data);
      self.create = response.data;
    });
  }


  //logout 
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