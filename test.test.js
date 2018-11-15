var Nightmare = require('nightmare');

describe( 'integration testing', () => {
  it( 'should be able to reach home page', () => {
    var nightmare = new Nightmare();
    nightmare
      .viewport(1500 + Math.floor(Math.random() * 400), 700 + Math.floor(Math.random() * 300))
      .goto('http://staging.usedequipmentguide.com/whatatatata')
      .wait(1000)
      .wait('.category-link')
      .evaluate(function() {
        return {
          url: window.location.href,
          html: document.querySelector("[href='/Construction-Equipment-for-sale'] div .category-count span").innerHTML
        };
      })
      .end()
      .then(function(result) {
        console.log('console')
        expect( result.html ).toBeTruthy()
      }.bind(this))
      .catch(function(error) {
        console.log('Error: ' + error)
      }.bind(this));
  })
})
