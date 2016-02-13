import "babel-polyfill";

const _events = {}
let hashBase, notFoundPath;

export default roun;

function roun(_opts) {
  let opts = _opts || {};
  hashBase = opts.hashBase || '#';
  notFoundPath = opts.notFoundPath || '';

  window.addEventListener('hashchange', process);

  const currentHash = location.hash;
  if (!currentHash) {
    location.href = hashBase + currentHash;
  }

  return {
    on(ev, callback) {
      _events[ev] = callback;
      return this;
    },
    exec: process,
  };
}

function parse(path) {
  return path.split('/');
}

function toRegExp(eventName) {
  let tmp = eventName;
  let keys = [];

  tmp = tmp.replace(/\//g, '\/');
  tmp = tmp.replace(/:([^\/]+)/g, (m) => {
    keys.push(m.substr(1));
    return '([^\/]+)';
  });
  return {
    keys,
    re: new RegExp('^' + tmp + '$'),
  };
}

function process() {
  const currentHash = location.hash;
  const eventNames = Object.keys(_events);
  const candidates = [];
  let path = null;
  if (~currentHash.indexOf(hashBase)) {
    path = currentHash.substr(hashBase.length);
  }


  for (let eventName of eventNames) {
    const {re, keys} = toRegExp(eventName);
    const result = {};
    if (re.test(path)) {
      const matches = path.match(re);
      for (let i = 0, len = keys.length; i < len; i++) {
        result[keys[i]] = matches[i+1];
      }
      return _events[eventName].call(null, result);
    }
  }
  location.href = hashBase + notFoundPath;
}
