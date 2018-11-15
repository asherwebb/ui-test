var Nightmare = require('nightmare');

var TestSuite = {
  init: function(){
    this.testHome()
  },
  testHome: function() {
    var nightmare = new Nightmare();
    nightmare
      .viewport(1500 + Math.floor(Math.random() * 400), 700 + Math.floor(Math.random() * 300))
      .goto('http://staging.usedequipmentguide.com')
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
        //console.log(result)
        if(!result.html){
          console.log('HOME: FAIL = Category Count not displaying - test for api or dns problems')
        } else {
          console.log('HOME: SUCCESS = Category Count displaying')
        }
        this.testSearch()
      }.bind(this))
      .catch(function(error) {
        console.log('Error: ' + error)
      }.bind(this));
  },
  testSearch: function(){
    console.log('Testing search...')
    var nightmare = new Nightmare();
    nightmare
      .viewport(1500 + Math.floor(Math.random() * 400), 700 + Math.floor(Math.random() * 300))
      .goto('https://usedequipmentguide.com/search')
      .wait(5000)
      .wait('html')
      .evaluate(function() {
        return {
          url: window.location.href,
          html: document.documentElement.innerHTML
        };
      })
      .end()
      .then(function(result) {
        console.log(result)
        if(!result.html){
          console.log('SEARCH: FAIL')
        } else {
          console.log('SEARCH: SUCCESS')
        }
        //this.testSearch()
      }.bind(this))
      .catch(function(error) {
        console.log('Error: ' + error)
      }.bind(this));
  }
}

TestSuite.init();
