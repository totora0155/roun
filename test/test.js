// describe('Roun', function() {
//   it('roun exec', function () {
//     var route = roun({
//       hashBase: '#!',
//     });
//     route.on('foo/:id/bar/:name', function (id, name) {
//       expect(id).to.equal(100);
//       expect(name).to.equal('john');
//     });
//     location.href = '/#!foo/100/bar/john';
//   });
//
//   it('roun notFound', function () {
//     var route = roun({
//       notFoundPath: '404'
//     });
//     route.on('404', function () {
//       expect(true).to.be.ok;
//     });
//     location.href = '/#foo';
//   });
// });
