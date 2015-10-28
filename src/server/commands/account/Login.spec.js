describe('Login', function() {
  it('should do something', function(done) {
    //given
    var Login, req, res, next;

    Login = require('./Login')
    req = { body: {} };
    res = { status: function() { return { json: noop } } };
    next = noop;

    //when
    Login.exec(req, res, next);

    //then

    done();
  });
});