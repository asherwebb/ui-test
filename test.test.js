var Nightmare = require('nightmare');
jest.setTimeout(30000)

describe( 'integration testing', () => {
  it( 'should be able to reach home page', done => {
    var nightmare = new Nightmare();
    nightmare
      .viewport(1500 + Math.floor(Math.random() * 400), 700 + Math.floor(Math.random() * 300))
      .goto('http://staging.usedequipmentguide.com')
      .wait(1000)
      .wait('.category-link')
      .evaluate( () => {
        return {
          url: window.location.href,
          html: document.querySelector("[href='/Construction-Equipment-for-sale'] div .category-count span").innerHTML
        }
      })
      .end()
      .then( (result) => {
        // console.log('console')
        // expect( result.html ).toBeTruthy()
        done()
      })
      .catch( done )
  })
})
