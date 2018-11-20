var Nightmare = require('nightmare')

describe( 'integration testing', () => {
  jest.setTimeout('60000')

  let nightmare = null

  beforeEach(() => {
    nightmare = new Nightmare()
  })

  it( 'should be able to reach home page', done => {
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
        expect( result.html ).toBeTruthy()
        done()
      })
      .catch( done )
  })

  it( 'should be able to reach the filter links on the search page', done => {
    nightmare
      .viewport(1500 + Math.floor(Math.random() * 400), 700 + Math.floor(Math.random() * 300))
      .goto('http://staging.usedequipmentguide.com/search')
      .wait(5000)
      .wait('#filters-bucket')
      .evaluate( () => {
        return {
          url: window.location.href,
          html: document.querySelector("[href='/search?category=On-Highway']").innerHTML
        }
      })
      .end()
      .then( (result) => {
        const decodedStr = result.html.replace( /&amp;/gi, '&' )
        expect( decodedStr ).toMatch(/On-Highway Trucks & Trailers/)
        done()
      })
      .catch(done)
  })

})
