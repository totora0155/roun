# Roun

[![npm version](https://badge.fury.io/js/roun.svg)](https://badge.fury.io/js/roun)

[![Build Status](https://travis-ci.org/totora0155/roun.svg?branch=master)](https://travis-ci.org/totora0155/roun)

A hash base route library ( `< 3KB` )

## Install

### npm

```
npm i -S roun
```

### bower
```
bower i -S roun
```

## Example

### On browser

As was installed using the bower

```js
<script src="bower_components/roun/roun.js"></script>
<script>
  var route = roun({
    notFoundPath: '/404',
    hashBase: '#!',
  });
  route.on('/', function () {
    console.log('/#!/');
  });
  route.on('/foo/:id/bar/:name', function (data) {
    console.info('id is %s, name is %s', data.id, data.name)
    console.log('/#!/foo/123/bar/john');
  });
  route.on('/foo/bar/:id', function (data) {
    console.info('id is %s', data.id)
    console.log('/#!/foo/bar/789');
  });
  route.on('/404', function () {
    console.log('/#!/404');
  });
  route.exec();
  //
  // or
  //
  // route
  //   .on('/', function () {...})
  //   .on('/foo/:id/bar/:name', function (data) {...})
  //   .on('/foo/bar/:id', function (data) {...})
  //   .on('/404', function () {...})
  //   .exec();
</script>
```

### With browserify

```js
const roun = require('roun');
roun().on('/', () => {});
```

```
browserify xxx.js -o bundle.js
```

### With webpack

```js
const roun = require('roun');
roun().on('/', () => {});
```

```
webpack xxx.js bundle.js
```

### With rollup

```js
import roun from 'roun/es/roun';
roun().on('/', () => {});
```

```
rollup xxxx.js -o bundle.js -f umd -n xxx
```

## Options

name         | description                        | example                   | default
:----------- | :--------------------------------- | :------------------------ |
notFoundPath | Redirect path, when undefined path | `/404`                    | '/404'
hashBase     | Hash type                          | `#` and `#!` and the like | `#`

## Change log
