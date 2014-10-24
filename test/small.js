describe('css', function() {
  describe('background color', function() {
    it('should be #0f0 on a small viewport', function() {
      var color = window.getComputedStyle(document.getElementById('test-context')).getPropertyValue('background-color');
      expect(color).to.equal('rgb(0, 255, 0)');
    });
  });
});
