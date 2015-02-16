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
    self_user: '',
    connect: function(server, imuser, imcred) {
      self_user = imuser;
      client = mqtt.connect(server, {auth:imuser+':'+imcred});
    },
    sendusermsg: function(target_user, message) {
      if (self_user<target_user) {
        topic = "convs/p|"+self_user+"|"+target_user;
      } else {
        topic = "convs/p|"+self_user+"|"+self_user;
      }
      client.publish(topic, message);
    },
    recvmsg: function(callback) {
      client.subscribe("users/"+self_user+"/msgs");
      client.on("message", callback);
    },
    disconnect: function() {
      client.end();
    }
  }
}]);
