// testing a small viewport
// to be called with a width smaller than 500px
describe('small viewport (width = 400 px)', function() {

  var context = $('#test-context');

  describe('css media query', function() {
    it('background color should be #0f0', function() {
      var color = window.getComputedStyle(context[0]).getPropertyValue('background-color');
      expect(color).to.equal('rgb(0, 255, 0)');
    });
  });

  describe('javascript media query with "large" breakpoint', function() {

    var matchingCallback, nonMatchingCallback;

    before(function(){
      matchingCallback = sinon.spy();
      nonMatchingCallback = sinon.spy();
      context.onMediaMatch('large', matchingCallback, nonMatchingCallback);
    });

    it('matching event handler should not be called', function() {
      expect(matchingCallback.called).to.be.false;
    });

    it('non-matching event handler should be called', function() {
      expect(nonMatchingCallback.called).to.be.true;
    });
  });

});
