myApp.service('UserService', function ($http, $location) {
  // console.log('UserService Loaded');
  var self = this;

  self.userObject = {}; //DONE 
  self.allListsName = {}; //DONE
  self.listItems = {}; //list of Items for getThisList Items //DONE
  self.myListsNames = {};
  self.myListsItems = {};

  //DONE
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

  //DONE // get all the list names for homepage //user.router
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
  // DONE // get List items for homepage //user.router
  self.getThisListItems = function (listName) {
    console.log('get THIS ListItems in service', listName);
    return $http({
      method: 'GET',
      url: '/user/getThisListItems/' + listName
    }).then(function (response) {
      //  console.log('Response:', response.data);
      self.listItems = response.data;
      //  console.log('response.data =', response.data);
      console.log('self.listItems', self.listItems);
    });

  }

  //DONE // displays the names of MyLists
  self.getMyListsNames = function () {
    return $http({
      method: 'GET',
      url: '/lists/getMyListsNames',
    }).then(function (response) {
      self.myListsNames = response.data;
      // console.log('self.getMyListsNames', self.myListsNames);
    });
  }


  //DONE
  self.myListItems = function (myListName) {
    // console.log('in myListItems function on service');
    return $http({
      method: 'GET',
      url: '/lists/' + myListName
    }).then(function (response) {
      console.log('Response:', response.data);
      self.listItems = response.data;
      
      
    });
  }

  // IN PROGRESS 
  // add list from home page to users page //user.router
  self.saveThisList = function () {
    console.log('saveThisList in service');

    // console.log('addThisList worked in service', addListName, addItems);
    $http({
      method: 'POST',
      url: '/user',
      data: {data: self.listItems}
    }).then(function (response) {
      console.log('i am here');
    });
  }

//DONE 
  self.newList = function (obj) {
    // console.log('new List made it to service', obj);

    $http({
      method: 'POST',
      url: '/create',
      data: obj
    }).then(function (response1) {
      // console.log('first post', response1.data);

      var list = response1.data;
      $http({
        method: 'POST',
        url: '/create/insertItems',
        data: response1.data
      }).then(function (response2) {
        // console.log('secont Post', response2.data);
        // console.log('this is list', list);
        // console.log('this is response.data', response2.data);
        $http({
          method: 'POST',
          url: 'create/favorites',
          data: list
        }.then(swal(
          'Success',
          'List Added!',
          'success'
        )));
      });
    });
  }


  //IN Progress
  self.completeTask = function (object, complete) {
    console.log('completeTask function called', object, complete);
    $http({
      method: 'PUT',
      url: '/lists',
      data: { data: object, complete: complete }
    }).then(function (response) {
      console.log('what is object', object);
  
      console.log('second complete log');
    })
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

}); //end myapp 












