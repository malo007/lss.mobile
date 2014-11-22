angular.module('starter.controllers', [])

.controller('DashCtrl', function($scope, Areas) {
  var areas = Areas.all();
  $scope.areas_row1 = areas.slice(0, 8);
  $scope.areas_row2 = areas.slice(8, 16);
})

.controller('AreasCtrl', function($scope, Areas) {
  $scope.areas_rows = [];
  var areas = Areas.all();
  var i, elements_per_row = 8, 
   full_row_count = parseInt(areas.length/elements_per_row), 
   last_elem_number = areas.length%elements_per_row;
  for (i=0; i < full_row_count; i++) {
    $scope.areas_rows.push(areas.slice(i*elements_per_row, (i+1)*elements_per_row));
  }
  //
  var last_row = areas.slice(full_row_count*elements_per_row);
  for (i=last_elem_number; i <= elements_per_row; i++) {
    last_row.push({"id":0,"name":"","logo":""});
  }
  $scope.areas_rows.push(last_row);
})

.controller('FriendsCtrl', function($scope, Friends) {
  $scope.friends = Friends.all();
})

.controller('FriendDetailCtrl', function($scope, $stateParams, Friends) {
  $scope.friend = Friends.get($stateParams.friendId);
})

.controller('AccountCtrl', function($scope) {
});
