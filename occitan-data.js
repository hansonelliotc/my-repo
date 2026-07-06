const defaultColor = "#ccc";
let numPoems = 0;
const colors = ["red","blue","green","purple","orange"];
let selectedPoets = Array(colors.length).fill(null);

const poets = ["461","082","248","434a","242","335","246","167","010","364","080","406","070","437","457","293","389","366","392",
    "282","030","210","434","375","106","323","155","076","016","194","101","330","009","124","029","305","132","074","244","234",
    "355","156","173","097","404","370","225","236","133","096","461a","217","202","047","421","243","183","227","372","266","319",
    "297","154","213","281","063","356","136","205","174","401","349","112","223","427","240","119","192","226","436","443","262",
    "189","377","449","410","027","185","396","249","450","344","310","052","306","197","386","411","315","409","046","416","231",
    "238","289","057","071","353","230","388","129","204","003","304","066","011","184","233","229","201","206","162","142","103",
    "077","109","265","016a","342","558","017","069","065","273","393","075","Glo","339","095","290","456","209","352","034","102",
    "432","371","005","367","150","021","025","407","362","048","180","332","140","058","081","084","350","341","245","087","088",
    "104","415","126","111","446","422","050","272","283","023","420","451","442","381","454","380","121","460","186","182","294",
    "002","235","448","254","309","296","259","285","331","178","379","403","168","165","376","216","433","258","098","042a","043",
    "220","044","138","049","390","054","067","079","083","085","300","115a","1i9","120","405","327","123","134","137","363","139",
    "143","144","145","149","150a","157","257","158","163","166","171","187","193","198","200a","195","429","208","114","359","267",
    "280","320","424","107","292","293a","298","015","141","314","100","302","307","311","312","329","313","326","340","342b","039",
    "343","357","032","441","051","286","365","172","322b","151","369","179","382","384","159","094","391","395","167a","334","397a",
    "398","413a","419","026a","425","338","430","435","440","322a","418","022","001","328","115","361","453","447","007","284","055",
    "006","008","345","092","147","438","019","056","020","012b","459","160","455","177","295","230a","261","358","336","022a","439",
    "263","268","428","190","270","062","276","028","346","084b","569","012","108","200","013","218","128","252","131","053","041",
    "241","325","149a","068","040","026","181","373","031","237","214","458","413","452","414","261a","250","21","203","006a","175a",
    "211","219","012a","256","394","374","308","337","299","444","016b","059","397","269","317","215"];
let json;

function parseData(text) {
    json = Papa.parse(text, {
        header: true,
        dynamicTyping: true,
        skipEmptyLines: true
    });
}

fetch('https://elliothanson.com/files/data.csv')
    .then(response => response.text())
    .then(result => parseData(result))
    .catch(error => console.error('Error:', error))
    .then(init);

function sigmoid(x) {
    return 1/(1+Math.exp(-x));
}

function colorFunction(value,vMode) {
    let colors = [[0,0,255],[255,0,255],[255,0,0]];
    let cutoffs = [0,0.5,1];
    const result = [0,0,0];
    for (let i = 1; i <= cutoffs.length; i++) {
        if (value <= cutoffs[i]) {
            for (let j = 0; j < 3; j++)
                result[j] = Math.floor((1-(value-cutoffs[i-1])/(cutoffs[i]-cutoffs[i-1]))*colors[i-1][j] + (value-cutoffs[i-1])/(cutoffs[i]-cutoffs[i-1])*colors[i][j]);
        return result;
        }
    }
}

function init() {
    // 30
    // const dataNorms = json.data.map(poem => norm(poem));

    const dataX = json.data.map(poem => poem.UMAP1);
    const dataY = json.data.map(poem => poem.UMAP2);
    numPoems = dataX.length;

    const minX = Math.min(...dataX);
    const maxX = Math.max(...dataX);
    const minY = Math.min(...dataY);
    const maxY = Math.max(...dataY);

    const pic = document.getElementById("pic");
    const picPadding = 20;
    const picWidth = pic.width.baseVal.value - picPadding*2;

    for (let i = 0; i < numPoems; i++) {
        const newPoint = document.createElementNS("http://www.w3.org/2000/svg", "circle");
        newPoint.setAttribute("r",3);
        newPoint.setAttribute("fill",defaultColor);
        // const color = colorFunction(sigmoid(dataNorms[i])*2-1);
        // const color = colorFunction(dataE[i]);
        // newPoint.setAttribute("fill",`rgb(${color[0]},${color[1]},${color[2]})`);
        newPoint.setAttribute("cx",picWidth*(dataX[i]-minX)/(maxX-minX)+picPadding);
        newPoint.setAttribute("cy",picWidth*(dataY[i]-minY)/(maxY-minY)+picPadding);
        newPoint.setAttribute("id","point"+i);
        const title = document.createElementNS("http://www.w3.org/2000/svg","title");
        title.innerHTML = json.data[i].id;
        newPoint.addEventListener("click",()=>{
            showNearestNeighbors(i);
        });
        newPoint.appendChild(title);
        pic.appendChild(newPoint);
    }

    for (let i = 0; i < poets.length; i++) {
        const newDiv = document.createElement("div");
        const newButton = document.createElement("button");
        newButton.innerHTML = poets[i];
        newButton.id = "button" + i;
        newButton.classList.add("button");
        newButton.addEventListener("click",()=>{
            showPoet(i);
        });
        newDiv.appendChild(newButton);
        document.getElementById("poet-list").appendChild(newDiv);
    }

    const textInput = document.getElementById("text-input");
    textInput.addEventListener("keydown", (event) => {
        if (event.key === "Enter") {
            const poem = json.data.find(poem => poem.id === textInput.value);
            const poet = poets.indexOf(textInput.value);
            if (typeof poem !== 'undefined') {
                showNearestNeighbors(poem);
            } else if (poet != -1) {
                showPoet(poet);
            } else {
                alert("\"" + textInput.value + "\" does not exist. Input should be of form \"242\", \"355,012\", \"101,011a=433,001\", etc.");
            }
            textInput.value = "";
        }
    });

    document.getElementById("x-axis").addEventListener('change', () => {
        update_picture();
    });
    document.getElementById("y-axis").addEventListener('change', () => {
        update_picture();
    });
}

function showPoet(poet) {
    const poems = [];
    for (let i = 0; i < json.data.length; i++) {
        if (json.data[i].poet_1 == poets[poet] || json.data[i].poet_2 == poets[poet] || json.data[i].poet_3 == poets[poet] || json.data[i].poet_4 == poets[poet]) {
            poems.push(i);
        }
    }
    if (selectedPoets.includes(poet)) {
        for (let i of poems) {
            const point = document.getElementById("point"+i);
            point.setAttribute("fill", defaultColor);
            d3.select("#point"+i).lower();
        }
        selectedPoets[selectedPoets.indexOf(poet)] = null;
        const button = document.getElementById("button"+poet)
        button.classList.remove("selected");
        button.style.color = "";
        document.getElementById("header").innerHTML = selectedPoets.filter(x => x !== null).map((x) => '<span style="color:'+colors[selectedPoets.indexOf(x)]+'">'+poets[x]+"</span>").join(", ");
    } else if (selectedPoets.includes(null)) {
        document.getElementById("body").replaceChildren(body.firstElementChild);
        if (selectedPoets.every(val => val === null)) {
            for (let i = 0; i < numPoems; i++) {
                const point = document.getElementById("point"+i);
                point.setAttribute("fill", defaultColor);
            }
        }
        let index = 0;
        while (selectedPoets[index] != null) index++;
        selectedPoets[index] = poet;
        for (let i of poems) {
            const point = document.getElementById("point"+i);
            point.setAttribute("fill", colors[index]);
            d3.select("#point"+i).raise();
        }
        const button = document.getElementById("button"+poet)
        button.classList.add("selected");
        button.style.color = colors[index];
        document.getElementById("header").innerHTML = selectedPoets.filter(x => x !== null).map((x) => '<span style="color:'+colors[selectedPoets.indexOf(x)]+'">'+poets[x]+"</span>").join(", ");
    } else {
        alert("There are no unused colors.");
    }
}

function distance(a,b) {
    let result = 0;
    for (let i = 1; i <= 30; i++) {
        result += Math.pow(a["DM"+i.toString()]-b["DM"+i.toString()],2);
    }
    return result;
}

function norm(a) {
    let result = 0;
    for (let i = 1; i <= 30; i++) {
        result += Math.pow(a["DM"+i.toString()],2);
    }
    return result;
}

function showNearestNeighbors(x) {
    const distances = json.data.map(poem => distance(json.data[x],poem));
    let neighbors = [...Array(distances.length).keys()];
    neighbors.sort(function(a, b){return distances[a] - distances[b]});
    const selected = [...document.getElementsByClassName("selected")];
    for (let e of selected) {
        e.classList.remove("selected");
        e.style.color = "";
    }
    selectedPoets.fill(null);
    for (let i = 0; i < numPoems; i++) {
        const point = document.getElementById("point"+i);
        point.setAttribute("fill", defaultColor);
    }

    document.getElementById("header").innerHTML = json.data[x].id;
    const body = document.getElementById("body");
    const labels = ["Closest: ", "Second closest: ", "Third closest: ", "Fourth closest: ", "Fifth closest: ", "Sixth closest: ", "Seventh closest: ", "Eighth closest: ", "Ninth closest: "];
    body.replaceChildren(body.firstElementChild);
    for (let i = 1; i < 10; i++) {
        const point = document.getElementById("point"+neighbors[i]);
        point.setAttribute("fill", "black");
        const p = document.createElement("p");
        p.innerHTML = labels[i-1] + json.data[neighbors[i]].id;
        p.addEventListener("click", () => showNearestNeighbors(neighbors[i]));
        p.classList.add("neighbor");
        body.appendChild(p);
        d3.select("#point"+neighbors[i]).raise();
    }
    const point = document.getElementById("point"+x);
    point.setAttribute("fill", "red");
    d3.select("#point"+x).raise();
}

function showPoem(poem) {
    const selected = [...document.getElementsByClassName("selected")];
    for (let e of selected) {
        e.classList.remove("selected");
        e.style.color = "";
    }
    for (let i = 0; i < numPoems; i++) {
        const point = document.getElementById("point"+i);
        point.setAttribute("fill", defaultColor);
    }
    const point = document.getElementById("point"+poem);
    point.setAttribute("fill", "red");
    d3.select("#point"+poem).raise();
}

function update_picture() {
    const pic = document.getElementById("pic");
    const picPadding = 20;
    const picWidth = pic.width.baseVal.value - picPadding*2;

    const xAxis = document.getElementById("x-axis").value;
    const yAxis = document.getElementById("y-axis").value;

    const dataX = (xAxis == "none" || yAxis == "none") ? json.data.map(poem => poem.UMAP1) : json.data.map(poem => poem["DM"+xAxis]);
    const dataY = (xAxis == "none" || yAxis == "none") ? json.data.map(poem => poem.UMAP2) : json.data.map(poem => poem["DM"+yAxis]);

    const minX = Math.min(...dataX);
    const maxX = Math.max(...dataX);
    const minY = Math.min(...dataY);
    const maxY = Math.max(...dataY);

    for (let i = 0; i < json.data.length; i++) {
        const point = document.getElementById("point"+i);
        point.setAttribute("cx", picWidth * (dataX[i] - minX) / (maxX - minX) + picPadding);
        point.setAttribute("cy", picWidth * (dataY[i] - minY) / (maxY - minY) + picPadding);
    }
}