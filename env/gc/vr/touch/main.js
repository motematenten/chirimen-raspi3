(() => {
  'use strict'

  navigator.requestI2CAccess()
  .then((i2cAccess) => {
    const port = i2cAccess.ports.get(1);
    const touchSensor = new GroveTouch(port, 0x5a);
    touchSensor.init().then(() => {
      setInterval(() => {
        touchSensor.read().then(data => {
          for (const index of lights.keys()) {
            const light = lights[index]
            const isOn = data[index]
            light.el.setAttribute('intensity', isOn ? 1.0 : 0.0)
          }
        });
      }, 100);
    });
  })
  .catch(console.error.bind(this));

  var lights = [];

  AFRAME.registerComponent('touch-light', {
    init () {
      lights.push(this);
    }
  })
})()
