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

.controller('AccountCtrl', function($scope) {
});
