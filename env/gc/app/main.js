function showVideo() {
    document.getElementById('video-element').removeAttribute("color");
}

function playAudio() {
    document.getElementById('audio').play();
}

function update(value, id) {
    document.getElementById(id).setAttribute('value', `${id}:${value}`);
}

AFRAME.registerComponent('screen', {
    init: function () {
        navigator.requestI2CAccess().then(i2cAccess => {
            const brightness = 20;
            const temperature = 27;
            const seconds = 2;

            const port = i2cAccess.ports.get(1);
            const milliseconds = seconds * 100;

            // light
            const groveLight = new GROVELIGHT(port, 0x29);
            groveLight.init().then(() => {
                setInterval(() => {
                    groveLight.read().then((value) => {
                        update(value, 'light-value');
                        if (value < brightness) {
                            showVideo();
                        }
                    });
                }, milliseconds);
            });

            // temperature
            const adt7410 = new ADT7410(port, 0x48);
            adt7410.init().then(() => {
                setInterval(() => {
                    adt7410.read().then((value) => {
                        update(value, 'adt7410-value');
                        if (value > temperature) {
                            playAudio();
                        }
                    });
                }, milliseconds);
            });
        })
        .catch(console.error.bind(this))
    }
});
