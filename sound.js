// const slider = document.getElementById("pitch-slider");
// slider.addEventListener("click", init);
// let initiated = false;

// function init() {
//     if (initiated)
//         return;

//     const audioCtx = new (window.AudioContext || window.webkitAudioContext);

//     const oscillator = audioCtx.createOscillator();
//     const gainNode = audioCtx.createGain();

//     // Set the type of waveform (e.g., 'sine', 'square', 'sawtooth', 'triangle')
//     oscillator.type = 'sine';

//     const pitch = document.getElementById("pitch-slider");
//     oscillator.frequency.value = pitch.value; // A4 note
//     function updateFreq(e) {oscillator.frequency.value = pitch.value;}
//     //pitch.addEventListener("pointerdown", updateFreq);
//     pitch.addEventListener("mousemove", updateFreq);

//     oscillator.connect(gainNode);
//     gainNode.connect(audioCtx.destination);

//     oscillator.start();

//     const maxVol = 0.5;
//     const initialVol = 0.1;

//     gainNode.gain.value = initialVol;
//     gainNode.gain.minValue = initialVol;
//     gainNode.gain.maxValue = maxVol;

//     initiated = true;
// }

let blob = new Blob([], { type: 'audio/wav' });

function addFrequency() {
    const div = document.getElementById("frequencies");
    const newInput = document.createElement("input");
    newInput.type = "text";
    div.appendChild(newInput);
}

function createFile() {
    const sampleRate = 44100;
    const bitsPerSample = 16;
    const duration = 60;
    const numChannels = 1;
    const frequency = 440;
    const bytePerBloc = numChannels * bitsPerSample / 8;
    const bytePerSec = sampleRate * bytePerBloc;

    const numSamples = sampleRate * duration;
    const samplesSize = numSamples * bytePerBloc;
    const fileSize = 44 + samplesSize - 8;
    const buffer = new Int8Array(fileSize);

    // fill out header data
    buffer[0] = 0x52; buffer[1] = 0x49; buffer[2] = 0x46; buffer[3] = 0x46;
    for (let i = 0; i < 4; i++) buffer[i+4] = (fileSize / 256 ** i) % 256;
    buffer[8] = 0x57; buffer[9] = 0x41; buffer[10] = 0x56; buffer[11] = 0x45;
    buffer[12] = 0x66; buffer[13] = 0x6d; buffer[14] = 0x74; buffer[15] = 0x20;
    buffer[16] = 0x10; buffer[17] = 0; buffer[18] = 0; buffer[19] = 0;
    buffer[20] = 1; buffer[21] = 0;
    for (let i = 0; i < 2; i++) buffer[i+22] = (numChannels / 256 ** i) % 256;
    for (let i = 0; i < 4; i++) buffer[i+24] = (sampleRate / 256 ** i) % 256;
    for (let i = 0; i < 4; i++) buffer[i+28] = (bytePerSec / 256 ** i) % 256;
    for (let i = 0; i < 2; i++) buffer[i+32] = (bytePerBloc / 256 ** i) % 256;
    for (let i = 0; i < 2; i++) buffer[i+34] = (bitsPerSample / 256 ** i) % 256;
    buffer[36] = 0x64; buffer[37] = 0x61; buffer[38] = 0x74; buffer[39] = 0x61;
    for (let i = 0; i < 4; i++) buffer[i+40] = (samplesSize / 256 ** i) % 256;


    for (let i = 0; i < numSamples; i++) {
        const value = Math.sin(2 * Math.PI * frequency * i / sampleRate) * (2 ** (bitsPerSample-1)-1);
        for (let j = 0; j < bitsPerSample/8; j++) buffer[j+i*bitsPerSample/8+44] = (value / 256 ** j) % 256;
    }

    blob = new Blob([buffer], { type: 'audio/wav' });

    // generate url for download
    const url = URL.createObjectURL(blob);

    const audio = new Audio(url);
    //audio.src = url;
    audio.controls = true;
    audio.preload = "none";
    document.body.appendChild(audio);
    //audio.play();

    const a = document.createElement('a');
    document.body.appendChild(a);
    a.style.display = 'none';
    a.href = url;
    a.download = 'test.wav';
    a.click();
    window.URL.revokeObjectURL(url);
}

const download = document.getElementById("download-button");

download.onclick = createFile;
