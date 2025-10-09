let song = []
let numLayers = 1;
let numNotes = 0;
let duration = 60;

let blob = new Blob([], { type: 'audio/wav' });
const url = URL.createObjectURL(blob);
document.getElementById("download").href = url;
document.getElementById("download").download = "test.wav";
document.getElementById("audio").src = url;

function addLayer() {
    numLayers++;
    const newDiv = document.createElement("div");
    newDiv.id = "layer-" + numLayers.toString();
    const newHeader = document.createElement("h2");
    newHeader.innerHTML = "Layer " + numLayers.toString();
    document.body.appendChild(newDiv);
    newDiv.appendChild(newHeader);
}

function addNote() {
    const layerStr = document.getElementById("layer").value;
    const layer = Number(layerStr);
    const frequencyStr = document.getElementById("frequency").value;
    const frequency = Number(frequencyStr);
    const startStr = document.getElementById("start").value;
    const start = Number(startStr);
    const durationStr = document.getElementById("duration").value;
    const end = Number(durationStr) + start;
    const volumeStr = document.getElementById("volume").value;
    const volume = Number(volumeStr);
    const options = document.getElementById("fractal-options");

    if (!Number.isInteger(layer) || layerStr == "") {
        alert("Layer must be an integer.");
        return;
    }
    if (Number.isNaN(frequency) || frequencyStr == "") {
        alert("Frequency must be a number.");
        return;
    }
    if (frequency <= 0) {
        alert("Frequency must be positive.");
        return;
    }
    if (Number.isNaN(start) || startStr == "") {
        alert("Start must be a number.");
        return;
    }
    if (start < 0) {
        alert("Start cannot be negative.");
        return;
    }
    if (Number.isNaN(end) || durationStr == "") {
        alert("Duration must be a number.");
        return;
    }
    if (end <= start) {
        alert("Duration must be positive.");
        return;
    }
    if (layer > numLayers || layer < 1) {
        alert("Layer " + layerStr + " does not exist.");
        return;
    }
    if (Number.isNaN(volume) || volume <= 0) {
        alert("Volume must be a positive number.");
        return;
    }

    numNotes++;
    const number = numNotes;
    song.push({ type: "note", number: number, layer: layer, frequency: frequency, start: start, end: end, volume: volume });
    const div = document.getElementById("layer-" + layerStr);
    const newNote = document.createElement("div");
    newNote.id = "note-" + number.toString();
    const text = document.createElement("span");
    text.innerHTML = frequencyStr + " hz for " + durationStr + "s at time " + startStr + ", volume " + volume;
    const deletionButton = document.createElement("input");
    deletionButton.type = "button";
    deletionButton.value = "Delete";
    function deleteNote() {
        newNote.remove();
        for (let i = 0; i < song.length; i++) {
            if (song[i].number == number) {
                song.splice(i, 1);
                return;
            }
        }
    }
    deletionButton.addEventListener("click", deleteNote);
    div.appendChild(newNote);
    newNote.appendChild(text);
    newNote.appendChild(deletionButton);

    //document.getElementById("frequency").value = "";
    document.getElementById("start").value = "";
    document.getElementById("duration").value = "";
}

function addFractal() {
    const betaLayerStr = document.getElementById("beta-layer").value;
    const betaLayer = Number(betaLayerStr);
    const betaStartStr = document.getElementById("beta-start").value;
    const betaStart = Number(betaStartStr);
    const betaDurationStr = document.getElementById("beta-duration").value;
    const betaEnd = Number(betaDurationStr) + betaStart;
    const alphaLayersStr = document.getElementById("alpha-layers").value;
    const alphaLayers = new Set();
    if (alphaLayersStr == "all" || alphaLayersStr == "All" || alphaLayersStr == "ALL") {
        for (let i = 1; i <=numLayers; i++)
            alphaLayers.add(i);
    } else {
        for (let nbrStr of alphaLayersStr.split(",")) {
            const nbr = Number(nbrStr);
            if (!Number.isInteger(nbr)) {
                alert("\u0391-layers must be integers separated by commas.");
                return;
            }
            if (nbr < 0 || nbr > numLayers) {
                alert("Layer " + nbr + " does not exist.");
                return;
            }
            alphaLayers.add(nbr);
        }
    }
    const alphaStartStr = document.getElementById("alpha-start").value;
    const alphaStart = Number(alphaStartStr);
    const alphaDurationStr = document.getElementById("alpha-duration").value;
    const alphaEnd = Number(alphaDurationStr) + alphaStart;
    const volumeStr = document.getElementById("relative-volume").value;
    const volume = Number(volumeStr);
    const recurVolumeStr = document.getElementById("recurring-volume").value;
    const recurVol = Number(recurVolumeStr);
    const options = document.getElementById("fractal-options").value;

    if (!Number.isInteger(betaLayer) || betaLayerStr == "") {
        alert("\u03B2-layer must be an integer.");
        return;
    }
    if (betaLayer < 0 || betaLayer > numLayers) {
        alert("Layer " + betaLayer + " does not exist.");
        return;
    }
    if (Number.isNaN(betaStart) || betaStartStr == "") {
        alert("\u03B2-start must be a number.");
        return;
    }
    if (betaStart < 0) {
        alert("\u03B2-start cannot be negative.");
        return;
    }
    if (Number.isNaN(betaEnd) || betaDurationStr == "") {
        alert("\u03B2-duration must be a number.");
        return;
    }
    if (betaEnd <= betaStart) {
        alert("\u03B2-duration must be positive.");
        return;
    }
    if (Number.isNaN(alphaStart) || alphaStartStr == "") {
        alert("\u0391-start must be a number.");
        return;
    }
    if (alphaStart < 0) {
        alert("\u0391-start cannot be negative.");
        return;
    }
    if (Number.isNaN(alphaEnd) || alphaDurationStr == "") {
        alert("\u0391-duration must be a number.");
        return;
    }
    if (alphaEnd <= alphaStart) {
        alert("\u0391-duration must be positive.");
        return;
    }
    if (Number.isNaN(volume) || volume <= 0) {
        alert("Relative volume must be a positive number.");
        return;
    }
    if (Number.isNaN(recurVol) || recurVol <= 0) {
        alert("Recurring volume must be a positive number.");
        return;
    }
    if (recurVol > 100) {
        alert("Recurring volume cannot be greater than 100.");
        return;
    }

    numNotes++;
    const number = numNotes;
    song.push({ type: "fractal", number: number, layer: betaLayer, start: betaStart, end: betaEnd, alphaLayers: alphaLayers, alphaStart: alphaStart, alphaEnd: alphaEnd, volume: volume, recurVol: recurVol });
    const div = document.getElementById("layer-" + betaLayerStr);
    const newNote = document.createElement("div");
    newNote.id = "note-" + number.toString();
    const text = document.createElement("span");
    text.innerHTML = "time " + alphaStart + "-" + alphaEnd + " of layers \"" + alphaLayersStr + "\" onto " + betaStart + "-" + betaEnd + " of layer " + betaLayer + ", relative volume " + volume + ", recurring volume " + recurVol;
    const deletionButton = document.createElement("input");
    deletionButton.type = "button";
    deletionButton.value = "Delete";
    function deleteNote() {
        newNote.remove();
        for (let i = 0; i < song.length; i++) {
            if (song[i].number == number) {
                song.splice(i, 1);
                return;
            }
        }
    }
    deletionButton.addEventListener("click", deleteNote);
    div.appendChild(newNote);
    newNote.appendChild(text);
    newNote.appendChild(deletionButton);

    //document.getElementById("frequency").value = "";
    document.getElementById("start").value = "";
    document.getElementById("duration").value = "";
}

function createFile() {
    const sampleRate = 44100;
    const bitsPerSample = 16;
    const numChannels = 1;
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

    let totalVolume = 0;
    for (let note of song) {
        totalVolume += note.volume;
    }

    for (let i = 0; i < numSamples; i++) {
        const time = i / sampleRate;
        let value = 0;
        for (let note of song) {
            value += note.volume * Math.sin(2 * Math.PI * note.frequency * i / sampleRate) * (2 ** (bitsPerSample-1)-1)
        }
        value /= totalVolume;
        for (let j = 0; j < bitsPerSample/8; j++) buffer[j+i*bitsPerSample/8+44] = (value / 256 ** j) % 256;
    }

    blob = new Blob([buffer], { type: 'audio/wav' });
}
