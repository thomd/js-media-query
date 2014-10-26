// testing a large viewport
// to be called with a width larger than 500px
describe('jquery plugin', function() {

  it('onMediaMatch() should check for correct arguments', function() {
    expect($.fn.onMediaMatch.bind(undefined, 'string')).to.throw(/wrong arguments/);
    expect($.fn.onMediaMatch.bind(undefined, function(){})).to.throw(/wrong arguments/);
    expect($.fn.onMediaMatch.bind(undefined, 'string', function(){})).to.not.throw(/wrong arguments/);
    expect($.fn.onMediaMatch.bind(undefined, 'string', function(){}, function(){})).to.not.throw(/wrong arguments/);
  });
});

describe('large viewport (width = 1200 px)', function() {

  var context = $('#test-context');

  describe('css media query', function() {
    it('background color should be #f00', function() {
      var color = window.getComputedStyle(context[0]).getPropertyValue('background-color');
      expect(color).to.equal('rgb(255, 0, 0)');
    });
  });

  describe('javascript media query with "large" breakpoint', function() {

    var matchingCallback, nonMatchingCallback;
    var _matchingCallback, _nonMatchingCallback;

    before(function(){
      matchingCallback = sinon.spy();
      nonMatchingCallback = sinon.spy();
      context.onMediaMatch('large', matchingCallback, nonMatchingCallback);

      _matchingCallback = sinon.spy();
      _nonMatchingCallback = sinon.spy();
      context.onMediaMatch('small', _matchingCallback, _nonMatchingCallback);
    });

    it('matching event handler should be called', function() {
      expect(matchingCallback.called).to.be.true;
      expect(matchingCallback.calledOnce).to.be.true;
    });

    it('matching event handler should be called on selected element', function() {
      expect(matchingCallback.calledOn(context[0])).to.be.true;
    });

    it('matching event handler should be called twice if attached twice', function() {
      context.onMediaMatch('large', matchingCallback);
      expect(matchingCallback.callCount).to.be.equal(2);
    });

    it('non-matching event handler should not be called', function() {
      expect(nonMatchingCallback.called).to.be.false;
    });

    it('matching event handler should not be called for a non existing breakpoint', function() {
      expect(_matchingCallback.called).to.be.false;
    });

    it('non matching event handler should be called for a non existing breakpoint', function() {
      expect(_nonMatchingCallback.called).to.be.true;
    });
  });

});
