var assert = require('assert')
var sinon = require('sinon')
var once = require('../once')
var obj = require('../foo')

describe('foo', function() {
    before(function(){
        sinon.spy(obj, 'foo')
    })
    it('should be called', function() {
        obj.foo('bar')
        obj.foo('baz')
        assert(obj.foo.calledTwice)
        assert(obj.foo.calledWith('bar'))
    });
});

describe('once', function() {
    it('calls the original function', function() {
        var callback = sinon.spy()
        var proxy = once(callback)
        proxy()
        assert(callback.called)
    });
    it('calls the original function only once', function() {
        var callback = sinon.spy()
        var proxy = once(callback)
        proxy()
        proxy()
        assert(callback.calledOnce)
    });
    it('calls the original function with the right this', function() {
        var callback = sinon.spy()
        var proxy = once(callback)
        var obj = {}
        proxy.call(obj, 1, 2)
        assert(callback.calledOn(obj))
    });
    it('calls the original function with the right arguments', function() {
        var callback = sinon.spy()
        var proxy = once(callback)
        var obj = {}
        proxy.call(obj, 1, 2)
        assert(callback.calledWith(1, 2))
    });
})

