(() => {
  'use strict'

  let port
  navigator.requestGPIOAccess()
    .then(gpioAccess => {
      port = gpioAccess.ports.get(26)
      return port.export('out')
    })
    .catch(console.error.bind(this))

  function changeLight (isOn) {
    port.write(isOn ? 1 : 0)
    console.info(isOn ? 'turning on' : 'turning off')
  }

  AFRAME.registerComponent('stare-to-turn-on', {
    init () {
      this.el.addEventListener('click', () => changeLight(true))
    }
  })

  AFRAME.registerComponent('stare-to-turn-off', {
    init () {
      this.el.addEventListener('click', () => changeLight(false))
    }
  })
})()
