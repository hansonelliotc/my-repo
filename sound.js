let song = []
let numLayers = 1;
let numNotes = 0;
const sampleRate = 44100;
const bitsPerSample = 16;
const numChannels = 1;
const bytePerBloc = numChannels * bitsPerSample / 8;
const bytePerSec = sampleRate * bytePerBloc;
const shortestNote = 0.01;
const impactSamples = sampleRate/50;
let defaultIter = 10;
let pure = true;
let round = false;

let blob = new Blob([], { type: 'audio/wav' });
let url = "";

function addLayer() {
    numLayers++;
    const newDiv = document.createElement("div");
    newDiv.id = "layer-" + numLayers.toString();
    const newHeader = document.createElement("h2");
    newHeader.innerHTML = "Layer " + numLayers.toString();
    const layers = document.getElementById("layer-info");
    layers.appendChild(newDiv);
    newDiv.appendChild(newHeader);
}

function addNote() {
    const layerObject = document.getElementById("layer");
    const layerStr = layerObject.value;
    const layer = Number(layerStr);
    const frequencyObject = document.getElementById("frequency");
    const frequencyStr = frequencyObject.value;
    const frequency = Number(frequencyStr);
    const startObject = document.getElementById("start");
    const startStr = startObject.value;
    const start = Number(startStr);
    const durationObject = document.getElementById("duration");
    const durationStr = durationObject.value;
    const end = Number(durationStr) + start;
    const volumeObject = document.getElementById("volume");
    const volumeStr = volumeObject.value;
    const volume = Number(volumeStr);
    // const optionsObject = document.getElementById("fractal-options");
    // const optionsStr = optionsObject.value;

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
    if (end - start < shortestNote) {
        alert("Duration must be greater than " + shortestNote.toString() + ".");
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
    newNote.class = "note";
    const text = document.createElement("span");
    text.innerHTML = frequencyStr + " hz for " + durationStr + "s at time " + startStr + ", volume " + volume;
    const deletionButton = document.createElement("input");
    deletionButton.type = "button";
    deletionButton.value = "Delete";
    deletionButton.style = "margin: 0 0 10px 10px;";
    function deleteNote() {
        newNote.remove();
        layerObject.value = layerStr;
        frequencyObject.value = frequencyStr;
        startObject.value = startStr;
        durationObject.value = durationStr;
        volumeObject.value = volumeStr;
        // optionsObject.value = optionsStr;
        noteField();
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

    document.getElementById("frequency").value = "";
    document.getElementById("start").value = "";
    document.getElementById("duration").value = "";
    document.getElementById("volume").value = "100";
    document.getElementById("layer").value = "1";
}

function addFractal() {
    const betaLayerObject = document.getElementById("beta-layer");
    const betaLayerStr = betaLayerObject.value;
    const betaLayer = Number(betaLayerStr);
    const betaStartObject = document.getElementById("beta-start");
    const betaStartStr = betaStartObject.value;
    const betaStart = Number(betaStartStr);
    const betaDurationObject = document.getElementById("beta-duration");
    const betaDurationStr = betaDurationObject.value;
    const betaEnd = Number(betaDurationStr) + betaStart;
    const alphaLayersObject = document.getElementById("alpha-layers");
    const alphaLayersStr = alphaLayersObject.value;
    const alphaLayers = new Set();
    if (alphaLayersStr == "all" || alphaLayersStr == "All" || alphaLayersStr == "ALL") {
        for (let i = 1; i <= numLayers; i++)
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
    const alphaStartObject = document.getElementById("alpha-start");
    const alphaStartStr = alphaStartObject.value;
    const alphaStart = Number(alphaStartStr);
    const alphaDurationObject = document.getElementById("alpha-duration");
    const alphaDurationStr = alphaDurationObject.value;
    const alphaEnd = Number(alphaDurationStr) + alphaStart;
    const volumeObject = document.getElementById("relative-volume");
    const volumeStr = volumeObject.value;
    const volume = Number(volumeStr);
    const recurVolumeObject = document.getElementById("recurring-volume");
    const recurVolumeStr = recurVolumeObject.value;
    const recurVol = Number(recurVolumeStr);
    // const optionsObject = document.getElementById("fractal-options");
    // const optionsStr = optionsObject.value;
    const reversedObject = document.getElementById("fractal-reversed");
    const reversed = reversedObject.checked;

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
    if (betaEnd - betaStart < shortestNote) {
        alert("\u03B2-duration must be greater than " + shortestNote.toString() + ".");
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
    song.push({ type: "fractal", number: number, layer: betaLayer, start: betaStart, end: betaEnd, alphaLayers: alphaLayers, alphaStart: alphaStart, alphaEnd: alphaEnd, volume: volume, recurVol: recurVol, reversed: reversed });
    const div = document.getElementById("layer-" + betaLayerStr);
    const newNote = document.createElement("div");
    newNote.class = "note";
    const text = document.createElement("span");
    if (!reversed)
        text.innerHTML = "time " + alphaStart + "-" + alphaEnd + " of layers \"" + alphaLayersStr + "\" onto " + betaStart + "-" + betaEnd + " of layer " + betaLayer + ", relative volume " + volume + ", recurring volume " + recurVol;
    else
        text.innerHTML = "time " + alphaStart + "-" + alphaEnd + " of layers \"" + alphaLayersStr + "\" onto " + betaEnd + "-" + betaStart + " of layer " + betaLayer + ", relative volume " + volume + ", recurring volume " + recurVol;
    const deletionButton = document.createElement("input");
    deletionButton.type = "button";
    deletionButton.value = "Delete";
    deletionButton.style = "margin: 0 0 10px 10px;";
    function deleteNote() {
        newNote.remove();
        betaLayerObject.value = betaLayerStr;
        betaStartObject.value = betaStartStr;
        betaDurationObject.value = betaDurationStr;
        alphaLayersObject.value = alphaLayersStr;
        alphaStartObject.value = alphaStartStr;
        alphaDurationObject.value = alphaDurationStr;
        volumeObject.value = volumeStr;
        recurVolumeObject.value = recurVolumeStr;
        // optionsObject.value = optionsStr;
        reversedObject.checked = reversed;
        fractalField();
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

    document.getElementById("beta-layer").value = "1";
    document.getElementById("beta-start").value = "";
    document.getElementById("beta-duration").value = "";
    document.getElementById("alpha-layers").value = "all";
    document.getElementById("alpha-start").value = "";
    document.getElementById("alpha-duration").value = "";
    document.getElementById("relative-volume").value = "100";
    document.getElementById("recurring-volume").value = "60";
    document.getElementById("fractal-reversed").checked = false;
}

function noteVolume(t, a=20, b=1, c=1.8) {
    const max = (b/(c-1))**(1/c)/(a*b*c);
    return t/((a*t)**c+b)/max;
}

function writeNote(buffer, start, end, frequency, volume, maxVolume) {
    const firstSample = Math.round(start*sampleRate);
    const lastSample = Math.round(end*sampleRate);
    const offset = Math.random();

    for (let i = firstSample; i < lastSample; i++) {
        let scale = 1;
        if (!round) {
            if (i - firstSample < impactSamples) {
                scale *= (i - firstSample) / impactSamples;
            } else if (lastSample - i < impactSamples) {
                scale *= (lastSample - i) / impactSamples
            }
        }
        let value = 0;
        for (let j = 0; j < bitsPerSample/8; j++)
            value += buffer[j+i*bitsPerSample/8+44] * 256 ** j;
        let overtones = [1,0,0,0,0,0,0,0];
        if (!pure) {
            overtones = [0.621118, 0.0621118, 0.204969, 0.0434783, 0.0310559, 0.0310559, 0.,0.00621118];
        }
        for (let k = 1; k < overtones.length; k++) {
            value += scale * overtones[k-1] *(volume/maxVolume * Math.sin(k * 2 * Math.PI * frequency * (i / sampleRate + offset)) * (2 ** (bitsPerSample-1) - 1));
        }
        if (!pure) {
            value *= noteVolume(i/sampleRate);
        } else if (round) {
            value *= Math.sin(Math.PI * (i/sampleRate-start) / (end - start));
        }
        for (let j = 0; j < bitsPerSample/8; j++)
            buffer[j+i*bitsPerSample/8+44] = (value / 256 ** j) % 256;
    }
}

function writeFractal(buffer, alphaStart, alphaEnd, alphaLayers, betaStart, betaEnd, volume, recurVol, maxVolume, reversed, iter) {
    if (iter == 0) return;
    const alphaDuration = alphaEnd - alphaStart;
    const betaDuration = betaEnd - betaStart;
    for (let note of song) {
        if (alphaLayers.has(note.layer) && (note.start >= alphaStart && note.start <= alphaEnd || note.end >= alphaStart && note.end <= alphaEnd)) {
            if (note.type == "note") {
                if (!reversed) {
                    writeNote(buffer, (Math.max(note.start, alphaStart)-alphaStart) * betaDuration/alphaDuration + betaStart,
                                    (Math.min(note.end, alphaEnd)-alphaStart) * betaDuration/alphaDuration + betaStart, 
                                    note.frequency, note.volume * volume/100, maxVolume);
                } else {
                    writeNote(buffer, betaEnd - (Math.min(note.end, alphaEnd)-alphaStart) * betaDuration/alphaDuration,
                                    betaEnd - (Math.max(note.start, alphaStart)-alphaStart) * betaDuration/alphaDuration, 
                                    note.frequency, note.volume * volume/100, maxVolume);
                }
            } else if (note.type == "fractal") {
                let newAlphaStart = 0;
                let newAlphaEnd = 0;
                if (note.start >= alphaStart) {
                    newAlphaStart = note.alphaStart;
                } else {
                    newAlphaStart = note.alphaStart + (alphaStart - note.start) * (note.alphaEnd - note.alphaStart) / (note.end - note.start);
                }
                if (note.end <= alphaEnd) {
                    newAlphaEnd = note.alphaEnd;
                } else {
                    newAlphaEnd = note.alphaEnd - (note.end - alphaEnd) * (note.alphaEnd - note.alphaStart) / (note.end - note.start);
                }
                if (!reversed) {
                    writeFractal(buffer, newAlphaStart, newAlphaEnd, note.alphaLayers,
                                    (Math.max(note.start, alphaStart)-alphaStart) * betaDuration/alphaDuration + betaStart,
                                    (Math.min(note.end, alphaEnd)-alphaStart) * betaDuration/alphaDuration + betaStart,
                                    note.volume * volume/100 * recurVol / 100, recurVol, maxVolume, note.reversed, iter - 1);
                } else {
                    writeFractal(buffer, newAlphaStart, newAlphaEnd, note.alphaLayers,
                                    betaEnd - (Math.min(note.end, alphaEnd)-alphaStart) * betaDuration/alphaDuration,
                                    betaEnd - (Math.max(note.start, alphaStart)-alphaStart) * betaDuration/alphaDuration,
                                    note.volume * volume/100 * recurVol / 100, recurVol, maxVolume, !note.reversed, iter - 1);
                }
            }
        }
    }
}

function createFile() {
    // get the global settings
    const roundBox = document.getElementById("round-notes");
    round = roundBox.checked;
    const iterDepth = document.getElementById("iter-depth");
    defaultIter = Number(iterDepth.value);

    // find the duration
    let duration = 0;
    for (let note of song) {
        if (note.end > duration)
            duration = note.end;
    }
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

    let maxVolume = 100;
    for (let time = 0; time < duration; time += shortestNote) {
        let volume = 0;
        for (let note of song) {
            if (time >= note.start && time <= note.end)
                volume += note.volume;
        }
        if (volume > maxVolume) maxVolume = volume;
    }

    for (let note of song) {
        if (note.type == "note")
            writeNote(buffer, note.start, note.end, note.frequency, note.volume, maxVolume);
        else if (note.type == "fractal")
            writeFractal(buffer, note.alphaStart, note.alphaEnd, note.alphaLayers, note.start, note.end, note.volume, note.recurVol, maxVolume, note.reversed, defaultIter);
    }

    const now = Date();
    const path = "fractal-" + now.substring(4,7).toLowerCase() + "-" + now.substring(8,10) + "-" + now.substring(16,18) + now.substring(19,21) + ".wav";

    URL.revokeObjectURL(url);
    blob = new Blob([buffer], { type: 'audio/wav' });
    url = URL.createObjectURL(blob);
    document.getElementById("download").innerHTML = "Download this audio";
    document.getElementById("download").href = url;
    document.getElementById("download").download = path;
    document.getElementById("audio").src = url;
}

function noteField() {
    const noteButton = document.getElementById("note-button");
    const fractalButton = document.getElementById("fractal-button");
    noteButton.classList.remove("unselected");
    fractalButton.classList.add("unselected");
    const noteField = document.getElementById("note-field");
    const fractalField = document.getElementById("fractal-field");
    noteField.style = "";
    fractalField.style = "display: none;";
}

function fractalField() {
    const noteButton = document.getElementById("note-button");
    const fractalButton = document.getElementById("fractal-button");
    noteButton.classList.add("unselected");
    fractalButton.classList.remove("unselected");
    const noteField = document.getElementById("note-field");
    const fractalField = document.getElementById("fractal-field");
    noteField.style = "display:none;";
    fractalField.style = "";
}