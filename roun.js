(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
  typeof define === 'function' && define.amd ? define(factory) :
  (global.roun = factory());
}(this, function () { 'use strict';

  var _events = {};
  var hashBase = undefined;
  var notFoundPath = undefined;
  function roun(_opts) {
    var opts = _opts || {};
    hashBase = opts.hashBase || '#';
    notFoundPath = opts.notFoundPath || '/404';

    window.addEventListener('hashchange', process);

    var currentHash = location.hash;
    if (!currentHash) {
      location.href = hashBase + currentHash;
    }

    return {
      on: function on(ev, callback) {
        _events[ev] = callback;
        return this;
      },

      exec: process
    };
  }

  function toRegExp(eventName) {
    var tmp = eventName;
    var keys = [];

    tmp = tmp.replace(/\//g, '\/');
    tmp = tmp.replace(/:([^\/]+)/g, function (m) {
      keys.push(m.substr(1));
      return '([^\/]+)';
    });
    return {
      keys: keys,
      re: new RegExp('^' + tmp + '$')
    };
  }

  function process() {
    var currentHash = location.hash;
    var eventNames = Object.keys(_events);
    var candidates = [];
    var path = null;
    if (~currentHash.indexOf(hashBase)) {
      path = currentHash.substr(hashBase.length);
    }

    var _iteratorNormalCompletion = true;
    var _didIteratorError = false;
    var _iteratorError = undefined;

    try {
      for (var _iterator = eventNames[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
        var eventName = _step.value;

        var _toRegExp = toRegExp(eventName);

        var re = _toRegExp.re;
        var keys = _toRegExp.keys;

        var result = {};
        if (re.test(path)) {
          var matches = path.match(re);
          for (var i = 0, len = keys.length; i < len; i++) {
            result[keys[i]] = matches[i + 1];
          }
          return _events[eventName].call(null, result);
        }
      }
    } catch (err) {
      _didIteratorError = true;
      _iteratorError = err;
    } finally {
      try {
        if (!_iteratorNormalCompletion && _iterator.return) {
          _iterator.return();
        }
      } finally {
        if (_didIteratorError) {
          throw _iteratorError;
        }
      }
    }

    location.href = hashBase + notFoundPath;
  }

  return roun;

}));