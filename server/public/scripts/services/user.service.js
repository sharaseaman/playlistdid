myApp.service('UserService', function ($http, $location) {
  console.log('UserService Loaded');
  var self = this;

  self.userObject = {};
  self.lists = {};

  self.getuser = function () {
    console.log('UserService -- getuser');
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
    console.log('in getLists function on controller');
    $http({
      method: 'GET',
      url: '/lists',
    }).then(function (response) {
      console.log('Response:', response.data);
      self.lists = response.data;
    });
  }

  // self.getItems = function () {
  //   console.log('in getItems function on controller');
  //   $http({
  //     method: 'GET',
  //     url: '/items',
  //   }).then(function (response) {
  //     console.log('Response:', response.data);
  //     self.items = response.data;
  //   });
  // }

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