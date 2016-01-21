;(function(win) {
  win.roun = function (opts) {
    var _events = {};
    var opts = opts || {};
    var hashBase = opts.hashBase || '#';
    var notFoundPath = opts.notFoundPath || '';

    function parse(path) {
      return path.split('/');
    }

    function toRegExp(eventName) {
      var tmp = eventName;
      tmp = tmp.replace(/\//g, '\/');
      tmp = tmp.replace(/:([^\/]+)/g, function (m) {
        return '([^\/]+)'
      });
      return new RegExp('^' + tmp + '$');
    }

    function process() {
      var currentHash = location.hash;
      var eventNames = Object.keys(_events);
      var candidates = [];
      var path = null;
      if (currentHash.indexOf(hashBase) > -1) {
        path = currentHash.substring(hashBase.length);
      }

      for (var i = 0, len = eventNames.length; i < len; i++) {
        var data = {};
        var name = eventNames[i];
        var re = toRegExp(name);
        if (re.test(path)) {
          var matches = path.match(re);
          var args = [].slice.call(matches, 1);
          return _events[name].apply(null, args);
        }
      }
      location.href = hashBase + notFoundPath;
    }

    window.addEventListener('hashchange', process);

    var currentHash = location.hash;
    if (!currentHash) {
      location.href = hashBase + currentHash;
    }

    return {
      on: function (ev, callback) {
        _events[ev] = callback;
        return this;
      },
      exec: process,
    };
  };

})(window);
