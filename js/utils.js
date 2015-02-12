angular.module('ionic.utils', [])

.factory('$localstorage', ['$window', function($window) {
  return {
    set: function(key, value) {
      $window.localStorage[key] = value;
    },
    get: function(key, defaultValue) {
      return $window.localStorage[key] || defaultValue;
    },
    setObject: function(key, value) {
      $window.localStorage[key] = JSON.stringify(value);
    },
    getObject: function(key) {
      return JSON.parse($window.localStorage[key] || '{}');
    }
  }
}])

.factory('$im', [function() {
  return {
    client: undefined,
    connect: function(ws_server) {
      client = mqtt.connect(ws_server);
    },
    sendmsg: function(target, message) {
      client.publish(target, message);
    },
    recvmsg: function(callback) {
      client.subscribe("mqtt/demo");
      client.on("message", callback);
    },
    disconnect: function() {
      client.end();
    }
  }
}]);
