# Roun

Maybe, route library by Javascript

## Example

```js
var roun = roun({
  notFoundPath: '404',
  hashBase: '#!',
});
roun.on('', function () {
  console.log('/#!');
});
roun.on('foo/:id/bar/:name', function (id, name) {
  console.info('id is %s, name is %s', id, name)
  console.log('foo/:id/bar/:name');
});
roun.on('foo/bar/:id', function (id) {
  console.info('id is %s', id)
  console.log('foo/bar/:id');
});
roun.on('404', function () {
  console.log('404');
});
//
// or
//
// roun
//   .on('', function () {...})
//   .on('foo/:id/bar/:name', function (id, name) {...})
//   .on('foo/bar/:id', function (id) {...})
//   .on('404', function () {...})
//   .exec();

```
