let matrixA = [1,2,3,4];
let matrixB = [1,2,3,4];
let coords = [1.5,1.5,1.1,1.1];
let quad = 1;

let changeQuad1 = false;
let changeQuad2 = false;
let hitZero1 = false;
let hitZero2 = false;
let wasPositive1 = false;
let wasPositive2 = false;

const lineWidth = 0.08;
const eqRadii = 0.08;
const cerulean = "#007BA7";
const gold = "#FFCC33";
const lightGreen = "#00ff00";
const bad = "#000000";
const mixedColor = "#898989";
const red = "#FF0000";
const greenBackground = "#d9ffd9";
const ceruleanBackground = "#c4e0eb";
const goldBackground = "#fff3d0";
const grayBackground = "#e6e6e6";

normalize(matrixA);
init();
setInterval('update()', 50);

function init() {
    const diagram = document.getElementById("diagram");
    const line1 = document.getElementById("line1");
    const line2 = document.getElementById("line2");
    const line3 = document.getElementById("line3");
    const line4 = document.getElementById("line4");
    const corner1 = document.getElementById("corner1");
    const corner2 = document.getElementById("corner2");
    const corner3 = document.getElementById("corner3");
    const corner4 = document.getElementById("corner4");

    const diagramWidth = diagram.width.baseVal.value;
    const padding = 0.1*diagramWidth;
    const width = diagramWidth - 2*padding;

    line1.style.stroke = cerulean;
    line1.style.strokeWidth = lineWidth*width;
    line2.style.stroke = gold;
    line2.style.strokeWidth = lineWidth*width;
    line3.style.stroke = cerulean;
    line3.style.strokeWidth = lineWidth*width;
    line4.style.stroke = gold;
    line4.style.strokeWidth = lineWidth*width;
    corner1.style = "fill:" + cerulean;
    corner1.r.baseVal.value = lineWidth*width/2;
    corner2.style = "fill:" + cerulean;
    corner2.r.baseVal.value = lineWidth*width/2;
    corner3.style = "fill:" + cerulean;
    corner3.r.baseVal.value = lineWidth*width/2;
    corner4.style = "fill:" + cerulean;
    corner4.r.baseVal.value = lineWidth*width/2;

    const container = document.getElementById("container");
    const x1label = document.getElementById("x1-label");
    const b1label = document.getElementById("b1-label");
    const maxPicWidth = (container.width.baseVal.value - diagram.width.baseVal.value);
    const maxPicHeight = (container.height.baseVal.value - diagram.height.baseVal.value);
    const minPicPadding1 = (container.width.baseVal.value-maxPicWidth)/2;
    const minPicPadding2 = (container.height.baseVal.value-maxPicHeight)/2;
    const b1coord = document.getElementById("b1coord");
    const b2coord = document.getElementById("b2coord");
    x1label.style.width = (minPicPadding1-12.5).toString()+"px";
    b1label.style.width = (minPicPadding1-12.5).toString()+"px";
    b1coord.style.width = (maxPicWidth/2+25).toString() + "px";
    b2coord.parentElement.style.top = (container.height.baseVal.value/2-12.5).toString()+"px";
    b2coord.style.height = (maxPicHeight/2+25).toString() + "px";

    b1coord.addEventListener("mousedown", ()=>{changeQuad1 = true;});
    b1coord.addEventListener("mouseup", ()=>{changeQuad1 = false; hitZero1 = false; wasPositive1=false;});
    b2coord.addEventListener("mousedown", ()=>{changeQuad2 = true;});
    b2coord.addEventListener("mouseup", ()=>{changeQuad2 = false; hitZero2 = false; wasPositive2=false;});

    const stop1 = document.getElementById("stop1");
    const stop2 = document.getElementById("stop2");
    const stop3 = document.getElementById("stop3");
    const stop4 = document.getElementById("stop4");
    const stop5 = document.getElementById("stop5");
    const stop6 = document.getElementById("stop6");
    stop1.style.stopColor = greenBackground;
    stop2.style.stopColor = grayBackground;
    stop3.style.stopColor = greenBackground;
    stop4.style.stopColor = ceruleanBackground;
    stop5.style.stopColor = goldBackground;
    stop6.style.stopColor = ceruleanBackground;

    const region1 = document.getElementById("region1");
    const region2 = document.getElementById("region2");
    const region3 = document.getElementById("region3");
    const region4 = document.getElementById("region4");
    region1.style.fill = greenBackground;
    region2.style.fill = greenBackground;
    region3.style.fill = "url('#gradient1')";
    region4.style.fill = greenBackground;

    update();
}

function update() {
    const x1coord = document.getElementById("x1coord");
    const x2coord = document.getElementById("x2coord");
    const b1coord = document.getElementById("b1coord");
    const b2coord = document.getElementById("b2coord");

    if (wasPositive1 && changeQuad1 && +b1coord.value == 0) {
        hitZero1 = true;
    } else if (wasPositive2 && changeQuad2 && +b2coord.value == 0) {
        hitZero2 = true;
    } else if (changeQuad1 && +b1coord.value != 0) {
        wasPositive1 = true;
    } else if (changeQuad2 && +b2coord.value != 0) {
        wasPositive2 = true;
    }
    if (hitZero1 && changeQuad1 && +b1coord.value != 0) {
        switchQuadrants(true);
        hitZero1 = false;
    } else if (hitZero2 && changeQuad2 && +b2coord.value != 0) {
        switchQuadrants(false);
        hitZero2 = false;
    }

    coords = [+(x2coord.value), +(x1coord.value), +(b2coord.value), +(b1coord.value)];
    if (quad == 2 || quad == 3) {
        coords[1] = coords[1] - 6;
    }
    if (quad == 3 || quad == 4) {
        coords[0] = coords[0] - 6;
    }

    [matrixA,matrixB] = coordsToMatrices(...coords);
    const a1 = document.getElementById("a1");
    const b1 = document.getElementById("b1");
    const c1 = document.getElementById("c1");
    const d1 = document.getElementById("d1");
    a1.innerHTML = Math.round(matrixA[0]*100)/100;
    b1.innerHTML = Math.round(matrixA[1]*100)/100;
    c1.innerHTML = Math.round(matrixA[2]*100)/100;
    d1.innerHTML = Math.round(matrixA[3]*100)/100;
    const a2 = document.getElementById("a2");
    const b2 = document.getElementById("b2");
    const c2 = document.getElementById("c2");
    const d2 = document.getElementById("d2");
    a2.innerHTML = Math.round(matrixB[0]*100)/100;
    b2.innerHTML = Math.round(matrixB[1]*100)/100;
    c2.innerHTML = Math.round(matrixB[2]*100)/100;
    d2.innerHTML = Math.round(matrixB[3]*100)/100;

    const container = document.getElementById("container");
    const diagram = document.getElementById("diagram");
    const diagramWidth = diagram.width.baseVal.value;
    const picWidth = (container.width.baseVal.value - diagramWidth)*(6 - +b1coord.value)/6;
    const picHeight = (container.height.baseVal.value - diagramWidth)*(6 - +b2coord.value)/6;
    const picPadding1 = (container.width.baseVal.value-picWidth)/2;
    const picPadding2 = (container.height.baseVal.value-picHeight)/2;

    x1coord.style.width = (picWidth+25).toString()+"px";
    x1coord.style.left = (picPadding1-diagram.width.baseVal.value/2).toString()+"px";
    x2coord.style.height = (picHeight+25).toString()+"px";
    x2coord.parentElement.style.top = (picPadding2-12.5).toString()+"px";
    const x2label = document.getElementById("x2-label");
    x2label.style.top = (picPadding2 - diagramWidth/2).toString() + "px";

    const region1 = document.getElementById("region1");
    const region2 = document.getElementById("region2");
    const region3 = document.getElementById("region3");
    const region4 = document.getElementById("region4");
    region1.x.baseVal.value = picPadding1;
    region1.y.baseVal.value = picPadding2;
    region1.width.baseVal.value = picWidth/2;
    region1.height.baseVal.value = picHeight/2;
    region2.x.baseVal.value = picPadding1+picWidth/2;
    region2.y.baseVal.value = picPadding2;
    region2.width.baseVal.value = picWidth/2;
    region2.height.baseVal.value = picHeight/2;
    region3.x.baseVal.value = picPadding1;
    region3.y.baseVal.value = picPadding2+picHeight/2;
    region3.width.baseVal.value = picWidth/2;
    region3.height.baseVal.value = picHeight/2;
    region4.x.baseVal.value = picPadding1+picWidth/2;
    region4.y.baseVal.value = picPadding2+picHeight/2;
    region4.width.baseVal.value = picWidth/2;
    region4.height.baseVal.value = picHeight/2;

    const red1 = document.getElementById("red1");
    const red2 = document.getElementById("red2");
    const red3 = document.getElementById("red3");
    const red4 = document.getElementById("red4");
    const red5 = document.getElementById("red5");
    const red6 = document.getElementById("red6");
    const red7 = document.getElementById("red7");
    const red8 = document.getElementById("red8");
    const green1 = document.getElementById("green1");
    const green2 = document.getElementById("green2");
    const green3 = document.getElementById("green3");
    const green4 = document.getElementById("green4");
    const green5 = document.getElementById("green5");
    const green6 = document.getElementById("green6");
    const picCorner1 = document.getElementById("red-corner1");
    const picCorner2 = document.getElementById("red-corner2");
    const picCorner3 = document.getElementById("red-corner3");
    const picCorner4 = document.getElementById("red-corner4");

    red1.x1.baseVal.value = picPadding1;
    red1.x2.baseVal.value = picWidth+picPadding1;
    red1.y1.baseVal.value = picPadding2;
    red1.y2.baseVal.value = picPadding2;
    red2.x1.baseVal.value = picPadding1;
    red2.x2.baseVal.value = picWidth+picPadding1;
    red2.y1.baseVal.value = picHeight/3+picPadding2;
    red2.y2.baseVal.value = picHeight/3+picPadding2;
    red3.x1.baseVal.value = picPadding1;
    red3.x2.baseVal.value = picWidth+picPadding1;
    red3.y1.baseVal.value = picHeight*2/3+picPadding2;
    red3.y2.baseVal.value = picHeight*2/3+picPadding2;
    red4.x1.baseVal.value = picPadding1;
    red4.x2.baseVal.value = picWidth+picPadding1;
    red4.y1.baseVal.value = picHeight+picPadding2;
    red4.y2.baseVal.value = picHeight+picPadding2;
    red5.x1.baseVal.value = picPadding1;
    red5.x2.baseVal.value = picPadding1;
    red5.y1.baseVal.value = picPadding2;
    red5.y2.baseVal.value = picHeight+picPadding2;
    red6.x1.baseVal.value = picWidth/3+picPadding1;
    red6.x2.baseVal.value = picWidth/3+picPadding1;
    red6.y1.baseVal.value = picPadding2;
    red6.y2.baseVal.value = picHeight+picPadding2;
    red7.x1.baseVal.value = picWidth*2/3+picPadding1;
    red7.x2.baseVal.value = picWidth*2/3+picPadding1;
    red7.y1.baseVal.value = picPadding2;
    red7.y2.baseVal.value = picHeight+picPadding2;
    red8.x1.baseVal.value = picWidth+picPadding1;
    red8.x2.baseVal.value = picWidth+picPadding1;
    red8.y1.baseVal.value = picPadding2;
    red8.y2.baseVal.value = picHeight+picPadding2;
    green1.x1.baseVal.value = picPadding1;
    green1.x2.baseVal.value = picWidth+picPadding1;
    green1.y1.baseVal.value = picHeight/6+picPadding2;
    green1.y2.baseVal.value = picHeight/6+picPadding2;
    green2.x1.baseVal.value = picPadding1;
    green2.x2.baseVal.value = picWidth+picPadding1;
    green2.y1.baseVal.value = picHeight/2+picPadding2;
    green2.y2.baseVal.value = picHeight/2+picPadding2;
    green3.x1.baseVal.value = picPadding1;
    green3.x2.baseVal.value = picWidth+picPadding1;
    green3.y1.baseVal.value = picHeight*5/6+picPadding2;
    green3.y2.baseVal.value = picHeight*5/6+picPadding2;
    green4.x1.baseVal.value = picWidth/6+picPadding1;
    green4.x2.baseVal.value = picWidth/6+picPadding1;
    green4.y1.baseVal.value = picPadding2;
    green4.y2.baseVal.value = picHeight+picPadding2;
    green5.x1.baseVal.value = picWidth/2+picPadding1;
    green5.x2.baseVal.value = picWidth/2+picPadding1;
    green5.y1.baseVal.value = picPadding2;
    green5.y2.baseVal.value = picHeight+picPadding2;
    green6.x1.baseVal.value = picWidth*5/6+picPadding1;
    green6.x2.baseVal.value = picWidth*5/6+picPadding1;
    green6.y1.baseVal.value = picPadding2;
    green6.y2.baseVal.value = picHeight+picPadding2;
    picCorner1.cx.baseVal.value = picPadding1;
    picCorner1.cy.baseVal.value = picPadding2;
    picCorner2.cx.baseVal.value = picWidth+picPadding1;
    picCorner2.cy.baseVal.value = picPadding2;
    picCorner3.cx.baseVal.value = picPadding1;
    picCorner3.cy.baseVal.value = picHeight+picPadding2;
    picCorner4.cx.baseVal.value = picWidth+picPadding1;
    picCorner4.cy.baseVal.value = picHeight+picPadding2;

    const line1 = document.getElementById("line1");
    const line2 = document.getElementById("line2");
    const line3 = document.getElementById("line3");
    const line4 = document.getElementById("line4");
    const point1 = document.getElementById("point1");
    const point2 = document.getElementById("point2");
    const point3 = document.getElementById("point3");
    const point4 = document.getElementById("point4");
    const point5 = document.getElementById("point5");
    const corner1 = document.getElementById("corner1");
    const corner2 = document.getElementById("corner2");
    const corner3 = document.getElementById("corner3");
    const corner4 = document.getElementById("corner4");

    diagram.x.baseVal.value = (+(x1coord.value))/6*picWidth+picPadding1-diagramWidth/2;
    diagram.y.baseVal.value = (6 - +(x2coord.value))/6*picHeight+picPadding2-diagramWidth/2;

    const padding = 0.1*diagramWidth;
    const width = diagramWidth - 2*padding;
    line1.x1.baseVal.value = matrixA[0]*width/6+padding;
    line1.x2.baseVal.value = matrixA[1]*width/6+padding;
    line2.x1.baseVal.value = matrixA[1]*width/6+padding;
    line2.x2.baseVal.value = matrixA[3]*width/6+padding;
    line3.x1.baseVal.value = matrixA[3]*width/6+padding;
    line3.x2.baseVal.value = matrixA[2]*width/6+padding;
    line4.x1.baseVal.value = matrixA[2]*width/6+padding;
    line4.x2.baseVal.value = matrixA[0]*width/6+padding;

    line1.y1.baseVal.value = (1-matrixB[0]/6)*width+padding;
    line1.y2.baseVal.value = (1-matrixB[1]/6)*width+padding;
    line2.y1.baseVal.value = (1-matrixB[1]/6)*width+padding;
    line2.y2.baseVal.value = (1-matrixB[3]/6)*width+padding;
    line3.y1.baseVal.value = (1-matrixB[3]/6)*width+padding;
    line3.y2.baseVal.value = (1-matrixB[2]/6)*width+padding;
    line4.y1.baseVal.value = (1-matrixB[2]/6)*width+padding;
    line4.y2.baseVal.value = (1-matrixB[0]/6)*width+padding;

    point1.cx.baseVal.value = matrixA[0]*width/6+padding;
    point1.cy.baseVal.value = (1-matrixB[0]/6)*width+padding;
    point2.cx.baseVal.value = matrixA[1]*width/6+padding;
    point2.cy.baseVal.value = (1-matrixB[1]/6)*width+padding;
    point3.cx.baseVal.value = matrixA[2]*width/6+padding;
    point3.cy.baseVal.value = (1-matrixB[2]/6)*width+padding;
    point4.cx.baseVal.value = matrixA[3]*width/6+padding;
    point4.cy.baseVal.value = (1-matrixB[3]/6)*width+padding;

    corner1.cx.baseVal.value = matrixA[0]*width/6+padding;
    corner1.cy.baseVal.value = (1-matrixB[0]/6)*width+padding;
    corner2.cx.baseVal.value = matrixA[1]*width/6+padding;
    corner2.cy.baseVal.value = (1-matrixB[1]/6)*width+padding;
    corner3.cx.baseVal.value = matrixA[2]*width/6+padding;
    corner3.cy.baseVal.value = (1-matrixB[2]/6)*width+padding;
    corner4.cx.baseVal.value = matrixA[3]*width/6+padding;
    corner4.cy.baseVal.value = (1-matrixB[3]/6)*width+padding;

    const error = 0.00001;
    const rowMax = Math.max(...matrixA) - error;
    const colMax = Math.max(...matrixB) - error;
    let numEquilibria = 0;

    if (matrixA[0]- matrixA[2] >= -error && matrixB[0] - matrixB[1] >= -error) {
        numEquilibria++;
        if (matrixA[0] >= rowMax && matrixB[0] >= colMax)
            point1.style = "fill:" + lightGreen;
        else if (matrixA[0] >= rowMax)
            point1.style = "fill:" + gold;
        else if (matrixB[0] >= colMax)
            point1.style = "fill:" + cerulean;
        else
            point1.style = "fill:" + bad;
        point1.style.r = eqRadii*width;
    } else {
        point1.style.opacity = 0;
    }
    
    if (matrixA[1] - matrixA[3] >= -error && matrixB[1] - matrixB[0] >= -error) {
        numEquilibria++;
        if (matrixA[1] >= rowMax && matrixB[1] >= colMax)
            point2.style = "fill:" + lightGreen;
        else if (matrixA[1] >= rowMax)
            point2.style = "fill:" + gold;
        else if (matrixB[1] >= colMax)
            point2.style = "fill:" + cerulean;
        else
            point2.style = "fill:" + bad;
        point2.style.r = eqRadii*width;
    } else {
        point2.style.opacity = 0;
    }

    if (matrixA[2] - matrixA[0] >= -error && matrixB[2] - matrixB[3] >= -error) {
        numEquilibria++;
        if (matrixA[2] >= rowMax && matrixB[2] >= colMax)
            point3.style = "fill:" + lightGreen;
        else if (matrixA[2] >= rowMax)
            point3.style = "fill:" + gold;
        else if (matrixB[2] >= colMax)
            point3.style = "fill:" + cerulean;
        else
            point3.style = "fill:" + bad;
        point3.style.r = eqRadii*width;
    } else {
        point3.style.opacity = 0;
    }

    if (matrixA[3] - matrixA[1] >= -error && matrixB[3] - matrixB[2] >= -error) {
        numEquilibria++;
        if (matrixA[3] >= rowMax && matrixB[3] >= colMax)
            point4.style = "fill:" + lightGreen;
        else if (matrixA[3] >= rowMax)
            point4.style = "fill:" + gold;
        else if (matrixB[3] >= colMax)
            point4.style = "fill:" + cerulean;
        else
            point4.style = "fill:" + bad;
        point4.style.r = eqRadii*width;
    } else {
        point4.style.opacity = 0;
    }
    if (0 < x1coord.value && x1coord.value < 3 && 0 < x2coord.value && x2coord.value < 3) {
        const mixedRow = mixedPayoff(matrixA);
        const mixedCol = mixedPayoff(matrixB);
        point5.style = "fill:" + mixedColor;
        point5.style.r = eqRadii*width;
        point5.cx.baseVal.value = mixedRow*width/6+padding;
        point5.cy.baseVal.value = (1-mixedCol/6)*width+padding;
    } else {
        point5.style.opacity = 0;
    }
}

function switchQuadrants(x1) {
    let x = 0;
    if (x1) {
        x = +document.getElementById("x1coord").value;
    }
    else {
        x = (10 - +document.getElementById("x2coord").value) % 6;
    }
    if (1 <= x && x <= 3) {
        switch (quad) {
            case 1:
                quad = 3;
                break;
            case 2:
                quad = 4;
                break;
            case 3:
                quad = 1;
                break;
            case 4:
                quad = 2;
                break;
        }
    } else if (3 <= x && x <= 5) {
        switch (quad) {
            case 1:
                quad = 4;
                break;
            case 2:
                quad = 3;
                break;
            case 3:
                quad = 2;
                break;
            case 4:
                quad = 1;
                break;
        }
    } else {
        switch (quad) {
            case 1:
                quad = 2;
                break;
            case 2:
                quad = 1;
                break;
            case 3:
                quad = 4;
                break;
            case 4:
                quad = 3;
                break;
        }
    }
    const region1 = document.getElementById("region1");
    const region2 = document.getElementById("region2");
    const region3 = document.getElementById("region3");
    const region4 = document.getElementById("region4");
    switch (quad) {
        case 1:
            region1.style.fill = greenBackground;
            region2.style.fill = greenBackground;
            region3.style.fill = "url('#gradient1')";
            region4.style.fill = greenBackground;
            break;
        case 2:
            region1.style.fill = ceruleanBackground;
            region2.style.fill = ceruleanBackground;
            region3.style.fill = "white";
            region4.style.fill = grayBackground;
            break;
        case 3:
            region1.style.fill = goldBackground;
            region2.style.fill = grayBackground;
            region3.style.fill = "url('#gradient2')";
            region4.style.fill = ceruleanBackground;
            break;
        case 4:
            region1.style.fill = grayBackground;
            region2.style.fill = goldBackground;
            region3.style.fill = "white";
            region4.style.fill = goldBackground;
            break;
    }
    if (x1) {
        const x1coord = document.getElementById("x1coord");
        let redLine = Math.round(x1coord.value/2)*2;
        x1coord.value = (redLine - (x1coord.value - redLine) + 6) % 6;
    } else {
        const x2coord = document.getElementById("x2coord");
        let redLine = Math.round(x2coord.value/2)*2;
        x2coord.value = (redLine - (x2coord.value - redLine)+6) % 6;
    }
}

function mod(a,b) {
    return ((a % b) + b) % b;
}

function flip([a,b,c,d]) {
    return [d,b,c,a];
}

function normalize(M) {
    const min = Math.min(...M);
    const max = Math.max(...M);
    for (let i = 0; i < 4; i++)
        M[i] = 6*(M[i] - min)/(max-min);
    return M;
}

function mixedPayoff([a,b,c,d]) {
    if (-a+b+c-d != 0)
        return (a*d - b*c)/(a - b - c + d);
    else return null;
}

function u([a,b,c,d]) {
    if ((a==6 || b==6) && (c==0 || d==0))
        return -(a/6-b/6-c/6+d/6)-3;
    else if ((b==6 || c==6) && (a==0 || d==0))
        return -(a/6+b/6-c/6-d/6)-1;
    else if ((a==0 || b==0) && (c==6 || d==6))
        return a/6-b/6-c/6+d/6+1;
    else if ((b==0 || c==0) && (a==6 || d==6))
        return a/6+b/6-c/6-d/6+3;
    throw "Matrices must be normalized.";
}

function v([a,b,c,d]) {
    if (Math.max(a,b,c,d)!=6 || Math.min(a,b,c,d)!=0)
        throw "Matrices must be normalized.";
    return a/6-b/6+c/6-d/6;
}

function mercator([u,v]) {
    const uShift = Math.round((u-1)/2)*2+1;
    const width = 2 - Math.abs(v);
    let result = [0,0];
    if (Math.abs(v) <= 1)
        result = [u,v];
    else if (Math.abs(v) == 2)
        result = [0,v];
    else
        result = [(u-uShift)/width + uShift,v];
    if (result[0] == -4)
        result[0] = 4;
    return result;
}

function inverseMercator([u,v]) {
    const uShift = Math.round((u-1)/2)*2+1;
    const width = 2 - Math.abs(v);
    if (Math.abs(v) <= 1)
        return [u,v];
    else
        return [(u-uShift)*width + uShift, v];
}

function UVtoMatrix([u,v]) {
    function UVtoMatrixEntry(u,v) {
        if (v == 2)
            return 0;
        const x = (mod(u+4,8) - 4) + (mod(v+2,4) - 2) + 1;
        const y = -(mod(u+4,8) - 4) + (mod(v+2,4) - 2) + 1;
        if (x <= -2 || y <= -2)
            return 6;
        else if (-2 <= x && x <= 0 && y >= x)
            return -3*x;
        else if (-2 <= y && y <= 0 && y <= x)
            return -3*y;
        else if (x >= 0 && y >= 0)
            return 0;
        throw("Invalid u-v coordinates");
    }

    const [u2, v2] = inverseMercator([u,v]);
    return [6-UVtoMatrixEntry(u2-4,v2), UVtoMatrixEntry(u2-2,v2),
            6-UVtoMatrixEntry(u2,v2),   UVtoMatrixEntry(u2+2,v2)]
}

function XBtoUV([x,b]) {
    function XBtoUVqtr(x,b) {
        if (0 <= x && x <= 1)
            return [(1-b/6) * (-x-1) + 2, (1-b/6) * (x-1) - 1];
        else
            return [(1-b/6) * (x-3) + 2, (1-b/6) * (x-1) - 1];
    }
    let u = 0, v = 0;
    if (-6 <= x && x <= -3) {
        [u,v] = XBtoUVqtr(x + 6, b);
        u = u - 4;
    } else if (-3 <= x && x <= 0) {
        [u,v] = XBtoUVqtr(-x, b);
        u = -u;
    } else if (0 <= x && x <= 3) {
        [u,v] = XBtoUVqtr(x, b);
    } else if (3 <= x && x <= 6) {
        [u,v] = XBtoUVqtr(6 - x, b);
        u = -u + 4;
    }
    else throw("Invalid x-b coordinates");
    return mercator([u,v]);
}

function XBtoMatrix([x,b]) {
    return UVtoMatrix(XBtoUV([x,b]));
}

function coordsToMatrices(x1,x2,b1,b2) {
    if (-6 <= x1 && x1 <= 6 && -6 <= x2 && x2 <= 6 && 
         0 <= b1 && b1 <= 6 && 0 <= b2 && b2 <= 6) {
        return [XBtoMatrix([-x1,b1]), flip(XBtoMatrix([-x2,b2]))];
    }
    else return [6, 6, 6, 6];
}