angular.module('starter.services', [])

/**
 * Areas service
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
 * Stations service
 */
.factory('Stations', function() {
  var stations = [
   {"id":100016,"name":"大利嘉城","logo":"http://img.159song.com/picture/station/dlj.png"},
   {"id":100022,"name":"中融商务公馆","logo":"http://img.159song.com/picture/station/zlswgg.png"},
   {"id":100017,"name":"汇福花园","logo":"http://img.159song.com/picture/station/hfhy.png"},
   {"id":100018,"name":"金钻世家/抽纱大厦/阿波罗","logo":"http://img.159song.com/picture/station/jzsj.png"},
   {"id":100019,"name":"源利明珠","logo":"http://img.159song.com/picture/station/ylmz.png"},
   {"id":100020,"name":"华能大厦","logo":"http://img.159song.com/picture/station/hnds.png"},
   {"id":100021,"name":"五一公馆","logo":"http://img.159song.com/picture/station/hy.png"},
   {"id":100023,"name":"联信大厦","logo":"http://img.159song.com/picture/station/lxds.png"},
   {"id":100024,"name":"天丰电子城","logo":"http://img.159song.com/picture/station/tfdzc.png"},
   {"id":100025,"name":"中选路广告城","logo":"http://img.159song.com/picture/station/jy.png"},
   {"id":100026,"name":"茂泰世纪大厦","logo":"http://img.159song.com/picture/station/mtds.png"},
  ];
  return {
    getStationsByAreaid: function(areaId) {
      return stations;
    },
    getStationById: function(stationId) {
      return {"name":"中融商务公馆","logo":"http://img.159song.com/picture/station/zlswgg.png"};
    }
  }
})

/**
 * Settings service
 */
.constant('DEFAULT_SETTINGS', {
  "HTML5":true,
  "Javascript":false,
  "CSS3":true,
  "XHTML":false,
})
.factory('Settings', function($rootScope, $localstorage, DEFAULT_SETTINGS) {
  var _settings = $localstorage.getObject('settins');
  _settings = angular.extend({}, DEFAULT_SETTINGS, _settings);
  
  var obj = {
    getSettings: function() {
      return _settings;
    },
    // Save the settings to localStorage
    save: function() {
      $localstorage.setObject('settins', _settings);
      $rootScope.$broadcast('settings.changed', _settings);
    },
    // Get a settings value
    get: function(k) {
      return _settings[k];
    },
    // Set a settings value
    set: function(k, v) {
      _settings[k] = v;
      this.save();
    }
  }
  // Save the settings to be safe
  obj.save();
  return obj;
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
