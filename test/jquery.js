var assert = require("assert")
var sinon = require("sinon");
var window = require('jsdom').jsdom().parentWindow
var jquery = require("jquery")(window);

describe('jquery.ajax', function() {
    before(function() {
        sinon.spy(jquery, 'ajax')
    });
    after(function() {
        jquery.ajax.restore()
    });
    it('should be used by $.getJSON', function() {
        jquery.getJSON('/some/resource')
        assert(jquery.ajax.calledOnce)
        assert.equal('json', jquery.ajax.getCall(0).args[0].dataType)
        assert.equal('/some/resource', jquery.ajax.getCall(0).args[0].url)
    });
});
