angular.module('starter.controllers', [])

.controller('DashCtrl', function($scope, $rootScope, Areas) {
  var areas = Areas.all();
  $scope.station = "未设置地点";
  if ($rootScope.station != undefined) {
    $scope.station = $rootScope.station["name"];
  }
  $scope.areas_row1 = areas.slice(0, 8);
  $scope.areas_row2 = areas.slice(8, 16);
})

.controller('AreasCtrl', function($scope, Areas) {
  $scope.areas_rows = [];
  var areas = Areas.all();
  var i, elements_per_row = 4, 
   full_row_count = parseInt(areas.length/elements_per_row), 
   last_elem_number = areas.length%elements_per_row;
  for (i=0; i < full_row_count; i++) {
    $scope.areas_rows.push(areas.slice(i*elements_per_row, (i+1)*elements_per_row));
  }
  //
  if (last_elem_number > 0) {
    var last_row = areas.slice(full_row_count*elements_per_row);
    for (i=last_elem_number; i <= elements_per_row; i++) {
      last_row.push({"id":0,"name":"","logo":""});
    }
    $scope.areas_rows.push(last_row);
  }
})

.controller('StationsCtrl', function($scope, $rootScope, $stateParams, $location, Stations) {
  $scope.area_id = $stateParams.areaId;
  $scope.stations_rows = [];
  var stations = Stations.getStationsByAreaid($scope.area_id);
  var i, elements_per_row = 4, 
   full_row_count = parseInt(stations.length/elements_per_row), 
   last_elem_number = stations.length%elements_per_row;
  for (i=0; i < full_row_count; i++) {
    $scope.stations_rows.push(stations.slice(i*elements_per_row, (i+1)*elements_per_row));
  }
  //
  if (last_elem_number > 0) {
    var last_row = stations.slice(full_row_count*elements_per_row);
    for (i=last_elem_number; i < elements_per_row; i++) {
      last_row.push({"id":0,"name":"","logo":""});
    }
    $scope.stations_rows.push(last_row);
  }
  // change area and station
  $scope.changeToStation = function(stationId) {
    $rootScope.area = {"id": $scope.area_id};
    $rootScope.station = {"id": stationId};
    var station = Stations.getStationById(stationId);
    for (var attr in station) {
      $rootScope.station[attr] = station[attr];
    }
    $location.path("#/tab/dash");
  };
})

.controller('FriendsCtrl', function($scope, Friends) {
  $scope.friends = Friends.all();
})

.controller('FriendDetailCtrl', function($scope, $stateParams, Friends) {
  $scope.friend = Friends.get($stateParams.friendId);
})

.controller('AccountCtrl', function($scope, Settings) {
  $scope.username = Settings.get('username');
  $scope.type = typeof($scope.username);
})

.controller('LoginCtrl', function($scope, $state, Settings) {
  $scope.loginData = {};
  // do login
  $scope.doLogin = function(loginData) {
    Settings.set('username', loginData.username);
    Settings.save();
    // redirect
    $state.go($state.current.data.from);
  };
})

.controller('SettingsCtrl', function($scope, $rootScope, $state, $ionicHistory, Settings) {
  //console.log('SettingsCtrl enter');//
  var settins = Settings.getSettings();
  //var settins_list = [];
  //for (setting in settins) {
  // settins[setting] = !settins[setting];
  // settins_list.push({"text":setting, "checked":settins[setting]});
  //}
  $scope.settings = settins;
  
  // on $ionicView.enter
  $scope.$on('$ionicView.enter', function() {
    $rootScope.$emit('app.tabshide', '');
    console.log('SettingsCtrl $ionicView.enter');//
  });
  // on $ionicView.leave
  $scope.$on('$ionicView.leave', function() {
    Settings.save();
    $rootScope.$emit('app.tabsshow', '');
    console.log('SettingsCtrl $ionicView.leave');//
  });
  // go back
  $scope.goBack = function() {
    $rootScope.$emit('app.tabsshow', '');
    $ionicHistory.goBack();
  };
  // do logout
  $scope.doLogout = function() {
    Settings.set('username', '');
    Settings.save();
    //$location.path("#/tab/dash");
    $state.go('tab.dash');
  };
})

.controller('ContactsCtrl', function($scope, $rootScope, $ionicHistory, $http) {
  $scope.friends = [];
  $http.get('http://61.131.37.30:8080/users/1/friends.json').
    success(function(data) {
      for (var index in data) {
        $scope.friends.push({"id":data[index],"name":"user"+data[index]});
      }
    });
  // on $ionicView.beforeEnter
  $scope.$on('$ionicView.beforeEnter', function() {
    $rootScope.$emit('app.tabshide', '');
  });
  // on $ionicView.beforeLeave
  $scope.$on('$ionicView.beforeLeave', function() {
    $rootScope.$emit('app.tabsshow', '');
  });
  // go back
  $scope.goBack = function() {
    $rootScope.$emit('app.tabsshow', '');
    $ionicHistory.goBack();
  };
})

.controller('ChatCtrl', function($scope, $rootScope, $ionicScrollDelegate, $ionicHistory, $stateParams, Settings, Im) {
  $scope.myUid = 153153;
  $scope.chatmsg = '';
  $scope.friendname = $stateParams.convId;
  $scope.messages = [{'uid':0,'text':'Hello'}, {'uid':0,'text':', world!'}];
  
  // on $ionicView.loaded
  $scope.$on('$ionicView.loaded', function() {
    console.log('ChatCtrl $ionicView.loaded');
    Im.login(Settings.get('username'), 'fixsecret');
    Im.recvmsg(function(topic, message, messageId) {
      $scope.messages.push({'uid':0, 'text':[topic, messageId, message].join(": ")});
      $ionicScrollDelegate.scrollBottom(true);
    });
  });
  // on $ionicView.unloaded
  $scope.$on('$ionicView.unloaded', function() {
    console.log('ChatCtrl $ionicView.unloaded');
    Im.logout();
  });
  // on $ionicView.beforeEnter
  $scope.$on('$ionicView.beforeEnter', function() {
    console.log('ChatCtrl $ionicView.beforeEnter');
    $rootScope.$emit('app.tabshide', '');
  });
  // on $ionicView.beforeLeave
  $scope.$on('$ionicView.beforeLeave', function() {
    console.log('ChatCtrl $ionicView.beforeLeave');
    $rootScope.$emit('app.tabsshow', '');
  });
  // go back
  $scope.goBack = function() {
    $rootScope.$emit('app.tabsshow', '');
    $ionicHistory.goBack();
  };
  // send chat message
  $scope.sendChatMsg = function(chatmsg) {
    Im.sendmsg('153153', chatmsg);
    $scope.messages.push({'uid':$scope.myUid, 'text':chatmsg});
    $scope.chatmsg = '';
    $ionicScrollDelegate.scrollBottom(true);
  };
})
;
