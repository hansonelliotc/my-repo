import { Game } from 'game.js';

self.onmessage = function(event) {
    const dimensions = event.data;

    let data = new Array(dimensions[0]*dimensions[1]*4);
    for (let i = 0; i < dimensions[0]*dimensions[1]; i++) {
        data[4*i] = 0;
        data[4*i+1] = 0;
        data[4*i+2] = 0;
        data[4*i+3] = 255;
    }

    self.postMessage(data);
};