angular.module('starter.services', [])

/**
 * A simple example service that returns some data.
 */
.factory('Areas', function() {
  var areas = [
   {"id":10001,"name":"仓山万达商圈","logo":"http://img.159song.com/picture/area/wanda.gif?size=100x100"},
   {"id":10002,"name":"中亭街商圈","logo":"http://img.159song.com/picture/area/ztjsq.png?size=100x100"},
   {"id":10003,"name":"大利嘉商圈","logo":"http://img.159song.com/picture/area/dljsq.png?size=100x100"},
   {"id":10004,"name":"五四路商圈","logo":"http://img.159song.com/picture/area/wsl.png?size=100x100"},
   {"id":10005,"name":"五一路商圈","logo":"http://img.159song.com/picture/area/wyl.png?size=100x100"},
   {"id":10006,"name":"东街口商圈","logo":"http://img.159song.com/picture/area/djk.png?size=100x100"},
   {"id":10007,"name":"茶亭世茂商圈","logo":"http://img.159song.com/picture/area/ctsm.png?size=100x100"},
   {"id":10008,"name":"金山社区群","logo":"http://img.159song.com/picture/area/jssqq.png?size=100x100"},
   {"id":10001,"name":"仓山万达商圈","logo":"http://img.159song.com/picture/area/wanda.gif?size=100x100"},
   {"id":10002,"name":"中亭街商圈","logo":"http://img.159song.com/picture/area/ztjsq.png?size=100x100"},
   {"id":10003,"name":"大利嘉商圈","logo":"http://img.159song.com/picture/area/dljsq.png?size=100x100"},
   {"id":10004,"name":"五四路商圈","logo":"http://img.159song.com/picture/area/wsl.png?size=100x100"},
   {"id":10005,"name":"五一路商圈","logo":"http://img.159song.com/picture/area/wyl.png?size=100x100"},
   {"id":10006,"name":"东街口商圈","logo":"http://img.159song.com/picture/area/djk.png?size=100x100"},
   {"id":10007,"name":"茶亭世茂商圈","logo":"http://img.159song.com/picture/area/ctsm.png?size=100x100"},
   {"id":10008,"name":"金山社区群","logo":"http://img.159song.com/picture/area/jssqq.png?size=100x100"},
   {"id":10001,"name":"仓山万达商圈","logo":"http://img.159song.com/picture/area/wanda.gif?size=100x100"},
  ];
  return {
    all: function() {
      return areas;
    }
  }
})

/**
 * A simple example service that returns some data.
 */
.factory('Friends', function() {
  // Might use a resource here that returns a JSON array

  // Some fake testing data
  var friends = [
    { id: 0, name: 'Scruff McGruff' },
    { id: 1, name: 'G.I. Joe' },
    { id: 2, name: 'Miss Frizzle' },
    { id: 3, name: 'Ash Ketchum' }
  ];

  return {
    all: function() {
      return friends;
    },
    get: function(friendId) {
      // Simple index lookup
      return friends[friendId];
    }
  }
});
