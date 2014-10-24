describe('css', function() {
  describe('background color', function() {
    it('should be #f00 on a large viewport', function() {
      var color = window.getComputedStyle(document.getElementById('test-context')).getPropertyValue('background-color');
      expect(color).to.equal('rgb(255, 0, 0)');
    });
  });
});
