const chai = require('chai');
const sinon = require('sinon');
const sinonChai = require('sinon-chai');
const expect = chai.expect;
chai.use(sinonChai);
const roun = require('..');

const window = global.window = {};
window.addEventListener = () => {};
global.location = {};

describe('RounJS', () => {
  before(() => {
    existsSpy = sinon.spy();
    notFoundSpy = sinon.spy();
    route = this.route = roun({
      notFoundPath: '/404',
      hashBase: '#!'
    });
    route
      .on('/:name/:id', existsSpy)
      .on('/404', notFoundSpy);

    location = global.location = {
      set href(url) {
        location.hash = url;
        route.exec();
      }
    };
  });

  it('expect `{name: foo, id: 123}`, when `#1/foo/123`', () => {
    location.hash = '#!/foo/123';
    this.route.exec();
    expect(existsSpy).to.have.been.calledWith({name: 'foo', id: '123'});
  });

  it('expect to redirect to 404', () => {
    location.hash = '#!/oh-yeah';
    this.route.exec();
    expect(notFoundSpy).to.have.been.called;
    expect(location.hash).to.equal('#!/404');
  });
});
