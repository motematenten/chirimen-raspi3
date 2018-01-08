(() => {
  'use strict'

  const MAX = 700;

  function update(value) {
    this.el.setAttribute('opacity', value / MAX)
    document.getElementById('light-value').setAttribute('value', value)
  }

  AFRAME.registerComponent('lighting', {
    init () {
      navigator.requestI2CAccess().then(i2cAccess => {
        var port = i2cAccess.ports.get(1)
        var grovelight = new GROVELIGHT(port, 0x29)
        grovelight.init().then(() => {
          setInterval(() => {
            grovelight.read().then(update.bind(this))
          }, 200)
        })
      })
      .catch(console.error.bind(this))
    }
  })
})()
