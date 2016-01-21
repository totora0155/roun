# Roun

Maybe, route library by Javascript

```js
var roun = roun();
roun.on('foo/:id', function (id) {
  console.log('id is %s', id)
  console.info('foo/:id');
});
roun.on('foo/bar/:id', function (id) {
  console.log('id is %s', id)
  console.info('foo/bar/:id');
});
```
