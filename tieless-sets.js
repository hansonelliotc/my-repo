const illegal = new Set();
const valuesSet = new Set(); // only used if allowDuplicates is true
const values = new Array();
const numValues = 150;
const maxValue = 1000000;
let allowDuplicates = false;
update();

function update() {
    const p = document.getElementById("values");
    while (p.firstChild) {
        p.removeChild(p.firstChild);
    }
    for (let i of values) {
        const newValue = document.createElement("span");
        newValue.innerHTML = i;
        newValue.style.padding = "10px";
        p.appendChild(newValue);
    }

    const div = document.getElementById("legal-values");
    while (div.firstChild) {
        div.removeChild(div.firstChild);
    }
    let n = 0;
    for (let i = 1; n < numValues; i++) {
        if (i > maxValue) break;
        if (!illegal.has(i)) {
            const newValue = document.createElement("input");
            newValue.type = "button";
            newValue.value = i;
            newValue.addEventListener("click", () => addValue(i));
            div.appendChild(newValue);
            n++;
        }
    }
}

function addValue(n) {
    values.push(n);
    values.sort((a, b) => a - b);

    const newIllegal = new Set();
    for (let i of illegal) {
        newIllegal.add(n+i);
        if (n - i > 0)
            newIllegal.add(n-i);
    }
    for (let i of newIllegal)
        illegal.add(i);
    if (allowDuplicates) {
        const newIllegal2 = new Set();
        for (let i of valuesSet) {
            newIllegal2.add(n+i);
            if (n - i > 0)
                newIllegal2.add(n-i);
        }
        for (let i of newIllegal2)
            illegal.add(i);
        valuesSet.add(n);
    }
    else {
        illegal.add(n);
    }

    update();
}

function allowButton() {
    const button = document.getElementById("duplicate-button");
    if (!allowDuplicates) {
        allowDuplicates = true;
        button.value = "Clear and disallow duplicates";
    }
    else {
        allowDuplicates = false;
        button.value = "Clear and allow duplicates";
    }
    illegal.clear();
    valuesSet.clear();
    values.length = 0;
    update();
}

function clearAll() {
    illegal.clear();
    valuesSet.clear();
    values.length = 0;
    update();

}
