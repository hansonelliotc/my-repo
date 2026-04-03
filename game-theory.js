let matrixA = [1,2,3,4];
let matrixB = [1,2,3,4];
let coords = [1.5,1.5,1.1,1.1];
let quad = 3;

let changeQuad1 = false;
let changeQuad2 = false;
let hitZero1 = false;
let hitZero2 = false;
let wasPositive1 = false;
let wasPositive2 = false;
let isMouseDown = false;

let x1up    = false;
let x1down  = false;
let x2up    = false;
let x2down  = false;
let b1up    = false;
let b1down  = false;
let b2up    = false;
let b2down  = false;
let x1V   = 0;
let x2V   = 0;
let b1V   = 0;
let b2V   = 0;
let startPoint = [0,0,0,0,0,0]; // r1,r2,b1,b2,x1,x2
let destination = [0,0,0,0]; // r1,r2,b1,b2
let animTime = 0;
let enRoute = false;
let draggingInBigPic = false;
let viewMode = 0;
let time = 0;
let values = [];
let valuesX = 0;
let valuesY = 0;
let backgroundOutOfDate = true;
let switchMode = false;
let fixImageSize = false;
let viewModeVolatile = false;

const lineWidth = 0.08;
const lineWidthBig = 0.05;
const eqRadii = 0.08;
const eqRadiiBig = 0.05;
const cerulean = "#007BA7";
const gold = "#ffcc33";
const lightGreen = "#00ff00";
const bad = "#000000";
const lighterBad = "#a0a0a0";
const mixedColor = "#898989";
const red = "#ff0000";
const greenBackground = "#d9ffd9"; // "#d9efb9"
const ceruleanBackground = "#c4e0eb";
const goldBackground = "#fff3d0"; // "#e6d3b0"
const grayBackground = "#ddd" // "#bbb"
const noLine = "#ddd";
const dashedStroke = "10,10";
const animationFrames = 70;
const points = [];

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

    // Initialize big-diagram
    const bigDiagram = document.getElementById("big-diagram");
    const line1Big = document.getElementById("line1-big");
    const line2Big = document.getElementById("line2-big");
    const line3Big = document.getElementById("line3-big");
    const line4Big = document.getElementById("line4-big");
    const corner1Big = document.getElementById("corner1-big");
    const corner2Big = document.getElementById("corner2-big");
    const corner3Big = document.getElementById("corner3-big");
    const corner4Big = document.getElementById("corner4-big");
    // const top1 = document.getElementById("top-1-big");
    // const top2 = document.getElementById("top-2-big");
    // const top3 = document.getElementById("top-3-big");
    // const left1 = document.getElementById("left-1-big");
    // const left2 = document.getElementById("left-2-big");
    // const left3 = document.getElementById("left-3-big");
    // const right1 = document.getElementById("right-1-big");
    // const right2 = document.getElementById("right-2-big");
    // const right3 = document.getElementById("right-3-big");
    // const bottom1 = document.getElementById("bottom-1-big");
    // const bottom2 = document.getElementById("bottom-2-big");
    // const bottom3 = document.getElementById("bottom-3-big");
    // const goldBar1 = document.getElementById("gold-bar-1");
    // const goldBar2 = document.getElementById("gold-bar-2");
    // const goldBar3 = document.getElementById("gold-bar-3");
    // const goldBar4 = document.getElementById("gold-bar-4");
    const smallLine1 = document.getElementById("small-line-1");
    const smallLine2 = document.getElementById("small-line-2");
    const smallLine3 = document.getElementById("small-line-3");
    const smallLine4 = document.getElementById("small-line-4");
    const smallLine5 = document.getElementById("small-line-5");
    const smallLine6 = document.getElementById("small-line-6");
    const smallLine7 = document.getElementById("small-line-7");
    const smallLine8 = document.getElementById("small-line-8");

    const bigDiagramWidth = bigDiagram.getBoundingClientRect().width;
    const paddingBig = 0.1*bigDiagramWidth;
    const widthBig = bigDiagramWidth - 2*paddingBig;
    const smallLineWidth = lineWidthBig*widthBig*0.1;

    line1Big.style.stroke = cerulean;
    line1Big.style.strokeWidth = lineWidthBig*widthBig;
    line1Big.style.strokeDasharray = dashedStroke;
    line2Big.style.stroke = gold;
    line2Big.style.strokeWidth = lineWidthBig*widthBig;
    line3Big.style.stroke = cerulean;
    line3Big.style.strokeWidth = lineWidthBig*widthBig;
    line3Big.style.strokeDasharray = dashedStroke;
    line4Big.style.stroke = gold;
    line4Big.style.strokeWidth = lineWidthBig*widthBig;
    corner1Big.style = "fill:" + cerulean;
    corner1Big.r.baseVal.value = lineWidthBig*widthBig/2;
    corner2Big.style = "fill:" + cerulean;
    corner2Big.r.baseVal.value = lineWidthBig*widthBig/2;
    corner3Big.style = "fill:" + cerulean;
    corner3Big.r.baseVal.value = lineWidthBig*widthBig/2;
    corner4Big.style = "fill:" + cerulean;
    corner4Big.r.baseVal.value = lineWidthBig*widthBig/2;
    // goldBar1.style.stroke = gold;
    // goldBar2.style.stroke = gold;
    // goldBar3.style.stroke = gold;
    // goldBar4.style.stroke = gold;
    // top1.x1.baseVal.value = paddingBig;
    // top1.y1.baseVal.value = lineWidthBig*widthBig/2;
    // top1.y2.baseVal.value = lineWidthBig*widthBig/2;
    // top2.y1.baseVal.value = lineWidthBig*widthBig/2;
    // top2.y2.baseVal.value = lineWidthBig*widthBig/2;
    // top3.x2.baseVal.value = bigDiagramWidth - paddingBig;
    // top3.y1.baseVal.value = lineWidthBig*widthBig/2;
    // top3.y2.baseVal.value = lineWidthBig*widthBig/2;
    // left3.y1.baseVal.value = paddingBig;
    // left3.x1.baseVal.value = lineWidthBig*widthBig/2;
    // left3.x2.baseVal.value = lineWidthBig*widthBig/2;
    // left2.x1.baseVal.value = lineWidthBig*widthBig/2;
    // left2.x2.baseVal.value = lineWidthBig*widthBig/2;
    // left1.y2.baseVal.value = bigDiagramWidth - paddingBig;
    // left1.x1.baseVal.value = lineWidthBig*widthBig/2;
    // left1.x2.baseVal.value = lineWidthBig*widthBig/2;
    // right3.y1.baseVal.value = paddingBig;
    // right3.x1.baseVal.value = bigDiagramWidth - lineWidthBig*widthBig/2;
    // right3.x2.baseVal.value = bigDiagramWidth - lineWidthBig*widthBig/2;
    // right2.x1.baseVal.value = bigDiagramWidth - lineWidthBig*widthBig/2;
    // right2.x2.baseVal.value = bigDiagramWidth - lineWidthBig*widthBig/2;
    // right1.y2.baseVal.value = bigDiagramWidth - paddingBig;
    // right1.x1.baseVal.value = bigDiagramWidth - lineWidthBig*widthBig/2;
    // right1.x2.baseVal.value = bigDiagramWidth - lineWidthBig*widthBig/2;
    // bottom1.x1.baseVal.value = paddingBig;
    // bottom1.y1.baseVal.value = bigDiagramWidth - lineWidthBig*widthBig/2;
    // bottom1.y2.baseVal.value = bigDiagramWidth - lineWidthBig*widthBig/2;
    // bottom2.y1.baseVal.value = bigDiagramWidth - lineWidthBig*widthBig/2;
    // bottom2.y2.baseVal.value = bigDiagramWidth - lineWidthBig*widthBig/2;
    // bottom3.x2.baseVal.value = bigDiagramWidth - paddingBig;
    // bottom3.y1.baseVal.value = bigDiagramWidth - lineWidthBig*widthBig/2;
    // bottom3.y2.baseVal.value = bigDiagramWidth - lineWidthBig*widthBig/2;
    // goldBar1.x1.baseVal.value = paddingBig;
    // goldBar1.x2.baseVal.value = bigDiagramWidth - paddingBig;
    // goldBar1.y1.baseVal.value = lineWidthBig*widthBig/2;
    // goldBar1.y2.baseVal.value = lineWidthBig*widthBig/2;
    // goldBar2.x1.baseVal.value = bigDiagramWidth - lineWidthBig*widthBig/2;
    // goldBar2.x2.baseVal.value = bigDiagramWidth - lineWidthBig*widthBig/2;
    // goldBar2.y1.baseVal.value = paddingBig;
    // goldBar2.y2.baseVal.value = bigDiagramWidth - paddingBig;
    // goldBar3.x1.baseVal.value = paddingBig;
    // goldBar3.x2.baseVal.value = bigDiagramWidth - paddingBig;
    // goldBar3.y1.baseVal.value = bigDiagramWidth - lineWidthBig*widthBig/2;
    // goldBar3.y2.baseVal.value = bigDiagramWidth - lineWidthBig*widthBig/2;
    // goldBar4.x1.baseVal.value = lineWidthBig*widthBig/2;
    // goldBar4.x2.baseVal.value = lineWidthBig*widthBig/2;
    // goldBar4.y1.baseVal.value = paddingBig;
    // goldBar4.y2.baseVal.value = bigDiagramWidth - paddingBig;
    smallLine1.style.stroke = "#000";
    smallLine1.style.strokeWidth = smallLineWidth;
    smallLine2.style.stroke = "#000";
    smallLine2.style.strokeWidth = smallLineWidth;
    smallLine3.style.stroke = "#000";
    smallLine3.style.strokeWidth = smallLineWidth;
    smallLine4.style.stroke = "#000";
    smallLine4.style.strokeWidth = smallLineWidth;
    smallLine5.style.stroke = "#000";
    smallLine5.style.strokeWidth = smallLineWidth;
    smallLine6.style.stroke = "#000";
    smallLine6.style.strokeWidth = smallLineWidth;
    smallLine7.style.stroke = "#000";
    smallLine7.style.strokeWidth = smallLineWidth;
    smallLine8.style.stroke = "#000";
    smallLine8.style.strokeWidth = smallLineWidth;
    smallLine1.x1.baseVal.value = paddingBig;
    smallLine1.x2.baseVal.value = bigDiagramWidth - paddingBig;
    smallLine1.y1.baseVal.value = paddingBig;
    smallLine1.y2.baseVal.value = paddingBig;
    smallLine2.x1.baseVal.value = bigDiagramWidth - paddingBig;
    smallLine2.x2.baseVal.value = bigDiagramWidth - paddingBig;
    smallLine2.y1.baseVal.value = paddingBig;
    smallLine2.y2.baseVal.value = bigDiagramWidth - paddingBig;
    smallLine3.x1.baseVal.value = paddingBig;
    smallLine3.x2.baseVal.value = bigDiagramWidth - paddingBig;
    smallLine3.y1.baseVal.value = bigDiagramWidth - paddingBig;
    smallLine3.y2.baseVal.value = bigDiagramWidth - paddingBig;
    smallLine4.x1.baseVal.value = paddingBig;
    smallLine4.x2.baseVal.value = paddingBig;
    smallLine4.y1.baseVal.value = paddingBig;
    smallLine4.y2.baseVal.value = bigDiagramWidth - paddingBig;
    smallLine5.x1.baseVal.value = paddingBig;
    smallLine5.x2.baseVal.value = bigDiagramWidth - paddingBig;
    smallLine6.x1.baseVal.value = paddingBig;
    smallLine6.x2.baseVal.value = bigDiagramWidth - paddingBig;
    smallLine7.y1.baseVal.value = paddingBig;
    smallLine7.y2.baseVal.value = bigDiagramWidth - paddingBig;
    smallLine8.y1.baseVal.value = paddingBig;
    smallLine8.y2.baseVal.value = bigDiagramWidth - paddingBig;

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
    b1coord.style.width = (maxPicWidth/2+26).toString() + "px";
    b2coord.parentElement.style.top = (container.height.baseVal.value/2-12.5).toString()+"px";
    b2coord.style.height = (maxPicHeight/2+26).toString() + "px";

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
    region1.style.fill = ceruleanBackground;
    region2.style.fill = grayBackground;
    region3.style.fill = "url('#gradient2')";
    region4.style.fill = goldBackground;
            
    document.addEventListener('mousedown', (e) => { changeCoords(e); isMouseDown = true; });
    document.addEventListener('mouseup', () => { isMouseDown = false; });
    document.addEventListener('mousemove', (e) => {
        if (isMouseDown) {
            changeCoords(e);
        }
    });
    bigDiagram.addEventListener('mousedown', (e) => { growBox(e); });

    const acc = 0.005;
    document.addEventListener('keydown', (e) => {
        e.preventDefault();
        if (!e.shiftKey) {
            switch (e.key) {
                case "ArrowRight":
                    x1up = true;
                    break;
                case "ArrowLeft":
                    x1down = true;
                    break;
                case "ArrowUp":
                    x2up = true;
                    break;
                case "ArrowDown":
                    x2down = true;
                    break;
                case "d":
                    b1up = true;
                    break;
                case "a":
                    b1down = true;
                    break;
                case "w":
                    b2up = true;
                    break;
                case "s":
                    b2down = true;
                    break;
                case " ":
                    x1V = 0;
                    x2V = 0;
                    b1V = 0;
                    b2V = 0;
                    break;
            }
        } else {
            switch (e.key) {
                case "ArrowRight":
                    if (x1V < 0.3) x1V += acc;
                    break;
                case "ArrowLeft":
                    if (-x1V < 0.3) x1V -= acc;
                    break;
                case "ArrowUp":
                    if (x2V < 0.3) x2V += acc;
                    break;
                case "ArrowDown":
                    if (-x2V < 0.3) x2V -= acc;
                    break;
                case "D":
                    if (b1V < 0.3) b1V += acc;
                    break;
                case "A":
                    if (-b1V < 0.3) b1V -= acc;
                    break;
                case "W":
                    if (b2V < 0.3) b2V += acc;
                    break;
                case "S":
                    if (-b2V < 0.3) b2V -= acc;
                    break;
            }
        }
        enRoute = false;
    });
    document.addEventListener('keyup', (e) => {
        switch (e.key) {
            case "ArrowRight":
                x1up = false;
                break;
            case "ArrowLeft":
                x1down = false;
                break;
            case "ArrowUp":
                x2up = false;
                break;
            case "ArrowDown":
                x2down = false;
                break;
            case "d":
                b1up = false;
                break;
            case "a":
                b1down = false;
                break;
            case "w":
                b2up = false;
                break;
            case "s":
                b2down = false;
                break;
        }
    });

    const bigPicQuad1 = document.getElementById("quad1");
    const bigPicQuad2 = document.getElementById("quad2");
    const bigPicQuad3 = document.getElementById("quad3");
    const bigPicQuad4 = document.getElementById("quad4");
    const bigPicQuad1a = document.getElementById("q1a");
    const bigPicQuad2a = document.getElementById("q2a");
    const bigPicQuad2b = document.getElementById("q2b");
    const bigPicQuad3a = document.getElementById("q3a");
    const bigPicQuad3b = document.getElementById("q3b");
    const bigPicQuad3c = document.getElementById("q3c");
    const bigPicQuad4a = document.getElementById("q4a");
    const bigPicQuad4b = document.getElementById("q4b");
    bigPicQuad1.style.fill = greenBackground;
    bigPicQuad2.style.fill = goldBackground;
    bigPicQuad3.style.fill = grayBackground;
    bigPicQuad4.style.fill = ceruleanBackground;
    bigPicQuad1a.style.fill = "url('#gradient1')";
    bigPicQuad2a.style.fill = "white";
    bigPicQuad2b.style.fill = grayBackground;
    bigPicQuad3a.style.fill = ceruleanBackground;
    bigPicQuad3b.style.fill = "url('#gradient2')";
    bigPicQuad3c.style.fill = goldBackground;
    bigPicQuad4a.style.fill = grayBackground;
    bigPicQuad4b.style.fill = "white";

    const canvas = document.getElementById("canvas");
    canvas.getContext("2d", { willReadFrequently: true});

    const navButtons = document.getElementsByClassName("nav-button");
    for (let button of navButtons) {
        button.addEventListener("click", () => {
            for (let otherButton of navButtons) {
                otherButton.classList.remove("selected");
            }
            button.classList.add("selected");
            document.getElementById("game-info").style.display = "none";
            document.getElementById("navigation").style.display = "none";
            document.getElementById("view-modes").style.display = "none";
            document.getElementById("controls").style.display = "none";
            document.getElementById(button.id.slice(0,-7)).style.display = "";
        });
    }
    document.getElementById("navigation").style.display = "none";
    document.getElementById("view-modes").style.display = "none";
    document.getElementById("controls").style.display = "none";

    update();
}

function update() {
    const error = 0.00001;
    const x1coord = document.getElementById("x1coord");
    const x2coord = document.getElementById("x2coord");
    const b1coord = document.getElementById("b1coord");
    const b2coord = document.getElementById("b2coord");

    if (Math.abs(+x1coord.value - Math.round(+x1coord.value*2)/2) < 0.05 && !isMouseDown && !x1up && !x1down && x1V == 0 && !enRoute) {
        x1coord.value = Math.round(+x1coord.value*2)/2;
    }
    if (Math.abs(+x2coord.value - Math.round(+x2coord.value*2)/2) < 0.05 && !isMouseDown && !x2up && !x2down && x2V == 0 && !enRoute) {
        x2coord.value = Math.round(+x2coord.value*2)/2;
    }
    if (Math.abs(+b1coord.value - Math.round(+b1coord.value)) < 0.05 && !b1up && !b1down && b1V == 0 && !enRoute) {
        b1coord.value = Math.round(+b1coord.value);
    }
    if (Math.abs(+b2coord.value - Math.round(+b2coord.value)) < 0.05 && !b2up && !b2down && b2V == 0 && !enRoute) {
        b2coord.value = Math.round(+b2coord.value);
    }

    if (x1up) {
        x1coord.value = (+x1coord.value + 5*+x1coord.step) % 6;
    }
    if (x1down) {
        x1coord.value = (+x1coord.value - 5*+x1coord.step + 6) % 6;
    }
    if (x2up) {
        x2coord.value = (+x2coord.value + 5*+x2coord.step) % 6;
    }
    if (x2down) {
        x2coord.value = (+x2coord.value - 5*+x2coord.step + 6) % 6;
    }
    if (b1up) {
        b1coord.value = +b1coord.value + 10*+b1coord.step;
    }
    if (b1down) {
        // if (+b1coord.value == 10*+b1coord.step) crossBlue(true);
        b1coord.value = +b1coord.value - 10*+b1coord.step;
    }
    if (b2up) {
        b2coord.value = +b2coord.value + 10*+b2coord.step;
    }
    if (b2down) {
        // if (+b2coord.value == 10*+b2coord.step) crossBlue(false);
        b2coord.value = +b2coord.value - 10*+b2coord.step;
    }

    if (x1V != 0) x1coord.value = (+x1coord.value + x1V + 6) % 6;
    if (x2V != 0) x2coord.value = (+x2coord.value + x2V + 6) % 6;
    b1coord.value = +b1coord.value + b1V;
    if (+b1coord.value == 0 && b1V != 0) {
        crossBlue(true);
        b1V = -b1V;
    } else if (+b1coord.value == 6 && b1V != 0) {
        b1V = -b1V;
        b1coord.value = +b1coord.value + b1V;
    }
    b2coord.value = +b2coord.value + b2V;
    if (+b2coord.value == 0 && b2V != 0) {
        crossBlue(false);
        b2V = -b2V;
    } else if (+b2coord.value == 6 && b2V != 0) {
        b2V = -b2V;
        b2coord.value = +b2coord.value + b2V;
    }

    if (changeQuad1 && +b1coord.value != 0 && coords[2] == 0) {
        hitZero1 = true;
    }
    if (changeQuad2 && +b2coord.value != 0 && coords[3] == 0) {
        hitZero2 = true;
    }
    if (changeQuad1 && +b1coord.value == 0 && coords[2] != 0) {
        wasPositive1 = true;
    }
    if (changeQuad2 && +b2coord.value == 0 && coords[3] != 0) {
        wasPositive2 = true;
    }
    if (wasPositive1 && hitZero1 && changeQuad1) {
        crossBlue(true);
        wasPositive1 = false;
    } else if (wasPositive2 && hitZero2 && changeQuad2) {
        crossBlue(false);
        wasPositive2 = false;
    }

    if (enRoute) {
        animTime++;
        b1coord.value = animTime/animationFrames*destination[2] + (1 - animTime/animationFrames)*startPoint[2];
        b2coord.value = animTime/animationFrames*destination[3] + (1 - animTime/animationFrames)*startPoint[3];
        x1coord.value = fromNearestRed(startPoint[4], (animTime/animationFrames*destination[0] + (1 - animTime/animationFrames)*startPoint[0])/(6 - +b1coord.value));
        x2coord.value = fromNearestRed(startPoint[5], (animTime/animationFrames*destination[1] + (1 - animTime/animationFrames)*startPoint[1])/(6 - +b2coord.value));
        if (animTime == animationFrames)
            enRoute = false;
    }

    let tempCoords = [+(x1coord.value), +(x2coord.value), +(b1coord.value), +(b2coord.value)];
    if (x1coord.value == 0) tempCoords[0] += 6;
    if (x2coord.value == 0) tempCoords[1] += 6;
    if (quad == 2 || quad == 3) {
        tempCoords[0] = tempCoords[0] - 6;
        if (tempCoords[0] == 0) tempCoords[0] = -6;
    }
    if (quad == 3 || quad == 4) {
        tempCoords[1] = tempCoords[1] - 6;
        if (tempCoords[1] == 0) tempCoords[1] = -6;
    }
    if (tempCoords[2] != coords[2] || tempCoords[3] != coords[3]) backgroundOutOfDate = true;
    coords = tempCoords;

    [matrixA,matrixB] = coordsToMatrices(...coords);
    const a1 = document.getElementById("a1");
    const b1 = document.getElementById("b1");
    const c1 = document.getElementById("c1");
    const d1 = document.getElementById("d1");
    a1.innerHTML = matrixA[0].toFixed(2);
    b1.innerHTML = matrixA[1].toFixed(2);
    c1.innerHTML = matrixA[2].toFixed(2);
    d1.innerHTML = matrixA[3].toFixed(2);
    const a2 = document.getElementById("a2");
    const b2 = document.getElementById("b2");
    const c2 = document.getElementById("c2");
    const d2 = document.getElementById("d2");
    a2.innerHTML = matrixB[0].toFixed(2);
    b2.innerHTML = matrixB[1].toFixed(2);
    c2.innerHTML = matrixB[2].toFixed(2);
    d2.innerHTML = matrixB[3].toFixed(2);

    // update returns data
    const rowX = document.getElementById("x-row");
    const rowB = document.getElementById("b-row");
    const colX = document.getElementById("x-col");
    const colB = document.getElementById("b-col");
    const rowReturns = document.getElementById("row-return");
    const colReturns = document.getElementById("col-return");
    const rowMixedReturns = document.getElementById("row-return-mixed");
    const colMixedReturns = document.getElementById("col-return-mixed");
    const rowReturnsTrans = document.getElementById("row-return-transferable");
    const colReturnsTrans = document.getElementById("col-return-transferable");
    const rowReturnsCoco = document.getElementById("row-return-coco");
    const colReturnsCoco = document.getElementById("col-return-coco");
    const rowReturnsBargaining1 = document.getElementById("row-return-bargaining-1");
    const colReturnsBargaining1 = document.getElementById("col-return-bargaining-1");
    const rowReturnsBargaining2 = document.getElementById("row-return-bargaining-2");
    const colReturnsBargaining2 = document.getElementById("col-return-bargaining-2");
    rowX.innerHTML = (+x1coord.value).toFixed(1);
    rowB.innerHTML = (+b1coord.value).toFixed(1);
    colX.innerHTML = (+x2coord.value).toFixed(1);
    colB.innerHTML = (+b2coord.value).toFixed(1);
    let x1Offset = 0;
    let x2Offset = 0;
    switch (quad) {
        case 2:
            x1Offset = -6;
            break;
        case 3:
            x1Offset = -6;
            x2Offset = -6;
            break;
        case 4:
            x2Offset = -6;
            break;
    }
    const [rowM, colM] = coordsToMatrices(+x1coord.value % 3 > error ? +x1coord.value + x1Offset : +x1coord.value + x1Offset + error,
                                                +x2coord.value % 3 > error ? +x2coord.value + x2Offset : +x2coord.value + x2Offset + error,
                                                +b1coord.value != 0 ? b1coord.value : b1coord.value + error*2,
                                                +b2coord.value != 0 ? b2coord.value : b2coord.value + error*2);
    rowReturns.innerHTML = payoffModified(rowM, colM).toFixed(1);
    colReturns.innerHTML = payoffModified(flip(colM), flip(rowM)).toFixed(1);
    if (+x1coord.value < 3 && +x2coord.value < 3) {
        rowMixedReturns.innerHTML = " (" + payoff(rowM, colM).toFixed(1) + ")";
        colMixedReturns.innerHTML = " (" + payoff(flip(colM), flip(rowM)).toFixed(1) + ")";
    } else {
        rowMixedReturns.innerHTML = "";
        colMixedReturns.innerHTML = "";
    }
    rowReturnsTrans.innerHTML = payoffTransferable(rowM, colM).toFixed(1);
    colReturnsTrans.innerHTML = payoffTransferable(flip(colM), flip(rowM)).toFixed(1);
    rowReturnsCoco.innerHTML = payoffCoco(rowM, colM).toFixed(1);
    colReturnsCoco.innerHTML = payoffCoco(flip(colM), flip(rowM)).toFixed(1);
    rowReturnsBargaining1.innerHTML = payoffBargainingBackstop(rowM, colM).toFixed(1);
    colReturnsBargaining1.innerHTML = payoffBargainingBackstop(flip(colM), flip(rowM)).toFixed(1);
    rowReturnsBargaining2.innerHTML = payoffBargainingDisagreement(rowM, colM).toFixed(1);
    // colReturnsBargaining2.innerHTML = payoffBargainingDisagreement(flip(colM), flip(rowM)).toFixed(1);

    const crossBlue1 = document.getElementById("cross-blue-1");
    const crossBlue2 = document.getElementById("cross-blue-2");
    const crossGreen1 = document.getElementById("cross-green-1");
    const crossGreen2 = document.getElementById("cross-green-2");
    const crossRed1 = document.getElementById("cross-red-1");
    const crossRed2 = document.getElementById("cross-red-2");
    if (take(matrixA,3) - take(matrixA,2) < 0.0001) {
        crossBlue1.style.color = "blue";
    } else {
        crossBlue1.style.color = "black";
    }
    if (take(matrixB,3) - take(matrixB,2) < 0.0001) {
        crossBlue2.style.color = "blue";
    } else {
        crossBlue2.style.color = "black";
    }
    if (take(matrixA,2) - take(matrixA,1) < 0.0001) {
        crossGreen1.style.color = "green";
    } else {
        crossGreen1.style.color = "black";
    }
    if (take(matrixB,2) - take(matrixB,1) < 0.0001) {
        crossGreen2.style.color = "green";
    } else {
        crossGreen2.style.color = "black";
    }
    if (take(matrixA,1) - take(matrixA,0) < 0.0001) {
        crossRed1.style.color = "red";
    } else {
        crossRed1.style.color = "black";
    }
    if (take(matrixB,1) - take(matrixB,0) < 0.0001) {
        crossRed2.style.color = "red";
    } else {
        crossRed2.style.color = "black";
    }

    if (viewModeVolatile) backgroundOutOfDate = true;

    const container = document.getElementById("container");
    const diagram = document.getElementById("diagram");
    const diagramWidth = diagram.width.baseVal.value;
    const picWidth = fixImageSize ? container.width.baseVal.value - diagramWidth : (container.width.baseVal.value - diagramWidth)*(6 - +b1coord.value)/6;
    const picHeight = fixImageSize ? container.height.baseVal.value - diagramWidth : (container.height.baseVal.value - diagramWidth)*(6 - +b2coord.value)/6;
    const picPadding1 = (container.width.baseVal.value-picWidth)/2;
    const picPadding2 = (container.height.baseVal.value-picHeight)/2;
    const maxPicWidth = (container.width.baseVal.value - diagram.width.baseVal.value);
    const maxPicHeight = (container.height.baseVal.value - diagram.height.baseVal.value);

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
    const diagramBox = document.getElementById("diagram-box");

    diagram.x.baseVal.value = (+(x1coord.value))/6*picWidth+picPadding1-diagramWidth/2;
    diagram.y.baseVal.value = (6 - +(x2coord.value))/6*picHeight+picPadding2-diagramWidth/2;

    const padding = 0.1*diagramWidth;
    const width = diagramWidth - 2*padding;
    diagramBox.width.baseVal.value = width;
    diagramBox.height.baseVal.value = width;
    diagramBox.x.baseVal.value = padding;
    diagramBox.y.baseVal.value = padding;
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

    const rowMax = Math.max(...matrixA) - error;
    const colMax = Math.max(...matrixB) - error;

    if (matrixA[0] - matrixA[2] >= -error && matrixB[0] - matrixB[1] >= -error) {
        if (matrixA[0] >= rowMax && matrixB[0] >= colMax) {
            point1.style = "fill:" + lightGreen;
            a1.style.color = lightGreen;
            a2.style.color = lightGreen;
        } else if (matrixA[0] >= rowMax) {
            point1.style = "fill:" + gold;
            a1.style.color = gold;
            a2.style.color = gold;
        } else if (matrixB[0] >= colMax) {
            point1.style = "fill:" + cerulean;
            a1.style.color = cerulean;
            a2.style.color = cerulean;
        } else {
            point1.style = "fill:" + bad;
            a1.style.color = bad;
            a2.style.color = bad;
        }
        a1.style.fontWeight = "bold";
        a2.style.fontWeight = "bold";
        point1.style.r = eqRadii*width;
    } else {
        point1.style.opacity = 0;
        a1.style.color = "black";
        a1.style.fontWeight = "";
        a2.style.color = "black";
        a2.style.fontWeight = "";
    }
    
    if (matrixA[1] - matrixA[3] >= -error && matrixB[1] - matrixB[0] >= -error) {
        if (matrixA[1] >= rowMax && matrixB[1] >= colMax) {
            point2.style = "fill:" + lightGreen;
            b1.style.color = lightGreen;
            b2.style.color = lightGreen;
        } else if (matrixA[1] >= rowMax) {
            point2.style = "fill:" + gold;
            b1.style.color = gold;
            b2.style.color = gold;
        } else if (matrixB[1] >= colMax) {
            point2.style = "fill:" + cerulean;
            b1.style.color = cerulean;
            b2.style.color = cerulean;
        } else {
            point2.style = "fill:" + bad;
            b1.style.color = bad;
            b2.style.color = bad;
        }
        b1.style.fontWeight = "bold";
        b2.style.fontWeight = "bold";
        point2.style.r = eqRadii*width;
    } else {
        point2.style.opacity = 0;
        b1.style.color = "black";
        b1.style.fontWeight = "";
        b2.style.color = "black";
        b2.style.fontWeight = "";
    }

    if (matrixA[2] - matrixA[0] >= -error && matrixB[2] - matrixB[3] >= -error) {
        if (matrixA[2] >= rowMax && matrixB[2] >= colMax) {
            point3.style = "fill:" + lightGreen;
            c1.style.color = lightGreen;
            c2.style.color = lightGreen;
        } else if (matrixA[2] >= rowMax) {
            point3.style = "fill:" + gold;
            c1.style.color = gold;
            c2.style.color = gold;
        } else if (matrixB[2] >= colMax) {
            point3.style = "fill:" + cerulean;
            c1.style.color = cerulean;
            c2.style.color = cerulean;
        } else {
            point3.style = "fill:" + bad;
            c1.style.color = bad;
            c2.style.color = bad;
        }
        c1.style.fontWeight = "bold";
        c2.style.fontWeight = "bold";
        point3.style.r = eqRadii*width;
    } else {
        point3.style.opacity = 0;
        c1.style.color = "black";
        c1.style.fontWeight = "";
        c2.style.color = "black";
        c2.style.fontWeight = "";
    }

    if (matrixA[3] - matrixA[1] >= -error && matrixB[3] - matrixB[2] >= -error) {
        if (matrixA[3] >= rowMax && matrixB[3] >= colMax) {
            point4.style = "fill:" + lightGreen;
            d1.style.color = lightGreen;
            d2.style.color = lightGreen;
        } else if (matrixA[3] >= rowMax) {
            point4.style = "fill:" + gold;
            d1.style.color = gold;
            d2.style.color = gold;
        } else if (matrixB[3] >= colMax) {
            point4.style = "fill:" + cerulean;
            d1.style.color = cerulean;
            d2.style.color = cerulean;
        } else {
            point4.style = "fill:" + bad;
            d1.style.color = bad;
            d2.style.color = bad;
        }
        d1.style.fontWeight = "bold";
        d2.style.fontWeight = "bold";
        point4.style.r = eqRadii*width;
    } else {
        point4.style.opacity = 0;
        d1.style.color = "black";
        d1.style.fontWeight = "";
        d2.style.color = "black";
        d2.style.fontWeight = "";
    }

    if (0 < x1coord.value && x1coord.value < 3 && 0 < x2coord.value && x2coord.value < 3 && b1coord.value < 6 && b2coord.value < 6) {
        const mixedRow = mixedPayoff(matrixA);
        const mixedCol = mixedPayoff(matrixB);
        point5.style = "fill:" + mixedColor;
        point5.style.r = eqRadii*width;
        point5.cx.baseVal.value = mixedRow*width/6+padding;
        point5.cy.baseVal.value = (1-mixedCol/6)*width+padding;
        if (6 - mixedRow < error && 6 - mixedCol < error) point5.style.opacity = 0;
    } else {
        point5.style.opacity = 0;
    }

    // Update big-diagram elements
    const bigDiagram = document.getElementById("big-diagram");
    const line1Big = document.getElementById("line1-big");
    const line2Big = document.getElementById("line2-big");
    const line3Big = document.getElementById("line3-big");
    const line4Big = document.getElementById("line4-big");
    const point1Big = document.getElementById("point1-big");
    const point2Big = document.getElementById("point2-big");
    const point3Big = document.getElementById("point3-big");
    const point4Big = document.getElementById("point4-big");
    const point5Big = document.getElementById("point5-big");
    const corner1Big = document.getElementById("corner1-big");
    const corner2Big = document.getElementById("corner2-big");
    const corner3Big = document.getElementById("corner3-big");
    const corner4Big = document.getElementById("corner4-big");
    const number1 = document.getElementById("vertex-number-1");
    const number2 = document.getElementById("vertex-number-2");
    const number3 = document.getElementById("vertex-number-3");
    const number4 = document.getElementById("vertex-number-4");
    // const top1 = document.getElementById("top-1-big");
    // const top2 = document.getElementById("top-2-big");
    // const top3 = document.getElementById("top-3-big");
    // const left1 = document.getElementById("left-1-big");
    // const left2 = document.getElementById("left-2-big");
    // const left3 = document.getElementById("left-3-big");
    // const right1 = document.getElementById("right-1-big");
    // const right2 = document.getElementById("right-2-big");
    // const right3 = document.getElementById("right-3-big");
    // const bottom1 = document.getElementById("bottom-1-big");
    // const bottom2 = document.getElementById("bottom-2-big");
    // const bottom3 = document.getElementById("bottom-3-big");
    // const goldBar1 = document.getElementById("gold-bar-1");
    // const goldBar2 = document.getElementById("gold-bar-2");
    // const goldBar3 = document.getElementById("gold-bar-3");
    // const goldBar4 = document.getElementById("gold-bar-4");
    const smallLine5 = document.getElementById("small-line-5");
    const smallLine6 = document.getElementById("small-line-6");
    const smallLine7 = document.getElementById("small-line-7");
    const smallLine8 = document.getElementById("small-line-8");

    const bigDiagramWidth = bigDiagram.getBoundingClientRect().width;
    const paddingBig = 0.1*bigDiagramWidth;
    const widthBig = bigDiagramWidth - 2*paddingBig;
    line1Big.x1.baseVal.value = matrixA[0]*widthBig/6+paddingBig;
    line1Big.x2.baseVal.value = matrixA[1]*widthBig/6+paddingBig;
    line2Big.x1.baseVal.value = matrixA[1]*widthBig/6+paddingBig;
    line2Big.x2.baseVal.value = matrixA[3]*widthBig/6+paddingBig;
    line3Big.x1.baseVal.value = matrixA[3]*widthBig/6+paddingBig;
    line3Big.x2.baseVal.value = matrixA[2]*widthBig/6+paddingBig;
    line4Big.x1.baseVal.value = matrixA[2]*widthBig/6+paddingBig;
    line4Big.x2.baseVal.value = matrixA[0]*widthBig/6+paddingBig;

    line1Big.y1.baseVal.value = (1-matrixB[0]/6)*widthBig+paddingBig;
    line1Big.y2.baseVal.value = (1-matrixB[1]/6)*widthBig+paddingBig;
    line2Big.y1.baseVal.value = (1-matrixB[1]/6)*widthBig+paddingBig;
    line2Big.y2.baseVal.value = (1-matrixB[3]/6)*widthBig+paddingBig;
    line3Big.y1.baseVal.value = (1-matrixB[3]/6)*widthBig+paddingBig;
    line3Big.y2.baseVal.value = (1-matrixB[2]/6)*widthBig+paddingBig;
    line4Big.y1.baseVal.value = (1-matrixB[2]/6)*widthBig+paddingBig;
    line4Big.y2.baseVal.value = (1-matrixB[0]/6)*widthBig+paddingBig;

    point1Big.cx.baseVal.value = matrixA[0]*widthBig/6+paddingBig;
    point1Big.cy.baseVal.value = (1-matrixB[0]/6)*widthBig+paddingBig;
    number1.setAttribute('x',matrixA[0]*widthBig/6+paddingBig);
    number1.setAttribute('y',(1-matrixB[0]/6)*widthBig+paddingBig);
    point2Big.cx.baseVal.value = matrixA[1]*widthBig/6+paddingBig;
    point2Big.cy.baseVal.value = (1-matrixB[1]/6)*widthBig+paddingBig;
    number2.setAttribute('x',matrixA[1]*widthBig/6+paddingBig);
    number2.setAttribute('y',(1-matrixB[1]/6)*widthBig+paddingBig);
    point3Big.cx.baseVal.value = matrixA[2]*widthBig/6+paddingBig;
    point3Big.cy.baseVal.value = (1-matrixB[2]/6)*widthBig+paddingBig;
    number3.setAttribute('x',matrixA[2]*widthBig/6+paddingBig);
    number3.setAttribute('y',(1-matrixB[2]/6)*widthBig+paddingBig);
    point4Big.cx.baseVal.value = matrixA[3]*widthBig/6+paddingBig;
    point4Big.cy.baseVal.value = (1-matrixB[3]/6)*widthBig+paddingBig;
    number4.setAttribute('x',matrixA[3]*widthBig/6+paddingBig);
    number4.setAttribute('y',(1-matrixB[3]/6)*widthBig+paddingBig);

    const overlap = [1,1,1,1];
    if (Math.abs(matrixA[0] - matrixA[1]) < error && Math.abs(matrixB[0] - matrixB[1]) < error) { overlap[0]++; overlap[1]++; }
    if (Math.abs(matrixA[0] - matrixA[2]) < error && Math.abs(matrixB[0] - matrixB[2]) < error) { overlap[0]++; overlap[2]++; }
    if (Math.abs(matrixA[0] - matrixA[3]) < error && Math.abs(matrixB[0] - matrixB[3]) < error) { overlap[0]++; overlap[3]++; }
    if (Math.abs(matrixA[1] - matrixA[2]) < error && Math.abs(matrixB[1] - matrixB[2]) < error) { overlap[1]++; overlap[2]++; }
    if (Math.abs(matrixA[1] - matrixA[3]) < error && Math.abs(matrixB[1] - matrixB[3]) < error) { overlap[1]++; overlap[3]++; }
    if (Math.abs(matrixA[2] - matrixA[3]) < error && Math.abs(matrixB[2] - matrixB[3]) < error) { overlap[2]++; overlap[3]++; }
    number1.innerHTML = overlap[0];
    number2.innerHTML = overlap[1];
    number3.innerHTML = overlap[2];
    number4.innerHTML = overlap[3];
    if (overlap[0] == 1) number1.style.display = "none";
    else number1.style.display = "";
    if (overlap[1] == 1) number2.style.display = "none";
    else number2.style.display = "";
    if (overlap[2] == 1) number3.style.display = "none";
    else number3.style.display = "";
    if (overlap[3] == 1) number4.style.display = "none";
    else number4.style.display = "";

    corner1Big.cx.baseVal.value = matrixA[0]*widthBig/6+paddingBig;
    corner1Big.cy.baseVal.value = (1-matrixB[0]/6)*widthBig+paddingBig;
    corner2Big.cx.baseVal.value = matrixA[1]*widthBig/6+paddingBig;
    corner2Big.cy.baseVal.value = (1-matrixB[1]/6)*widthBig+paddingBig;
    corner3Big.cx.baseVal.value = matrixA[2]*widthBig/6+paddingBig;
    corner3Big.cy.baseVal.value = (1-matrixB[2]/6)*widthBig+paddingBig;
    corner4Big.cx.baseVal.value = matrixA[3]*widthBig/6+paddingBig;
    corner4Big.cy.baseVal.value = (1-matrixB[3]/6)*widthBig+paddingBig;

    // top1.x2.baseVal.value = paddingBig + take(matrixA,1)/6*widthBig;
    // top2.x1.baseVal.value = paddingBig + take(matrixA,1)/6*widthBig;
    // top2.x2.baseVal.value = paddingBig + take(matrixA,2)/6*widthBig;
    // top3.x1.baseVal.value = paddingBig + take(matrixA,2)/6*widthBig;
    // left3.y2.baseVal.value = paddingBig + (1-take(matrixB,2)/6)*widthBig;
    // left2.y1.baseVal.value = paddingBig + (1-take(matrixB,2)/6)*widthBig;
    // left2.y2.baseVal.value = paddingBig + (1-take(matrixB,1)/6)*widthBig;
    // left1.y1.baseVal.value = paddingBig + (1-take(matrixB,1)/6)*widthBig;
    // right3.y2.baseVal.value = paddingBig + (1-take(matrixB,2)/6)*widthBig;
    // right2.y1.baseVal.value = paddingBig + (1-take(matrixB,2)/6)*widthBig;
    // right2.y2.baseVal.value = paddingBig + (1-take(matrixB,1)/6)*widthBig;
    // right1.y1.baseVal.value = paddingBig + (1-take(matrixB,1)/6)*widthBig;
    // bottom1.x2.baseVal.value = paddingBig + take(matrixA,1)/6*widthBig;
    // bottom2.x1.baseVal.value = paddingBig + take(matrixA,1)/6*widthBig;
    // bottom2.x2.baseVal.value = paddingBig + take(matrixA,2)/6*widthBig;
    // bottom3.x1.baseVal.value = paddingBig + take(matrixA,2)/6*widthBig;

    smallLine5.y1.baseVal.value = paddingBig + (1-take(matrixB,2)/6)*widthBig;
    smallLine5.y2.baseVal.value = paddingBig + (1-take(matrixB,2)/6)*widthBig;
    smallLine6.y1.baseVal.value = paddingBig + (1-take(matrixB,1)/6)*widthBig;
    smallLine6.y2.baseVal.value = paddingBig + (1-take(matrixB,1)/6)*widthBig;
    smallLine7.x1.baseVal.value = paddingBig + take(matrixA,2)/6*widthBig;
    smallLine7.x2.baseVal.value = paddingBig + take(matrixA,2)/6*widthBig;
    smallLine8.x1.baseVal.value = paddingBig + take(matrixA,1)/6*widthBig;
    smallLine8.x2.baseVal.value = paddingBig + take(matrixA,1)/6*widthBig;

    // top1.style.strokeWidth = lineWidthBig*widthBig*sideWidth(1);
    // top2.style.strokeWidth = lineWidthBig*widthBig*sideWidth(1);
    // top3.style.strokeWidth = lineWidthBig*widthBig*sideWidth(1);
    // left1.style.strokeWidth = lineWidthBig*widthBig*sideWidth(4);
    // left2.style.strokeWidth = lineWidthBig*widthBig*sideWidth(4);
    // left3.style.strokeWidth = lineWidthBig*widthBig*sideWidth(4);
    // right1.style.strokeWidth = lineWidthBig*widthBig*sideWidth(2);
    // right2.style.strokeWidth = lineWidthBig*widthBig*sideWidth(2);
    // right3.style.strokeWidth = lineWidthBig*widthBig*sideWidth(2);
    // bottom1.style.strokeWidth = lineWidthBig*widthBig*sideWidth(3);
    // bottom2.style.strokeWidth = lineWidthBig*widthBig*sideWidth(3);
    // bottom3.style.strokeWidth = lineWidthBig*widthBig*sideWidth(3);
    // goldBar1.style.strokeWidth = lineWidthBig*widthBig*sideWidth(1);
    // goldBar2.style.strokeWidth = lineWidthBig*widthBig*sideWidth(2);
    // goldBar3.style.strokeWidth = lineWidthBig*widthBig*sideWidth(3);
    // goldBar4.style.strokeWidth = lineWidthBig*widthBig*sideWidth(4);

    // let coord = 0;
    // switch (quad) {
    //     case 1:
    //         bottom3.style.stroke = noLine;
    //         bottom3.style.strokeDasharray = "";
    //         left3.style.stroke = noLine;
    //         left3.style.strokeDasharray = "";
    //         coord = +(x1coord.value);
    //         if (coord >= 1 && coord < 3) {
    //             bottom2.style.stroke = cerulean;
    //             bottom2.style.strokeDasharray = dashedStroke;
    //             top2.style.stroke = cerulean;
    //             top2.style.strokeDasharray = dashedStroke;
    //         } else if (coord >= 3 && coord < 5) {
    //             bottom2.style.stroke = gold;
    //             bottom2.style.strokeDasharray = "";
    //             top2.style.stroke = gold;
    //             top2.style.strokeDasharray = "";
    //         } else {
    //             bottom2.style.stroke = cerulean;
    //             bottom2.style.strokeDasharray = "";
    //             top2.style.stroke = cerulean;
    //             top2.style.strokeDasharray = "";
    //         }
    //         if (coord >= 0 && coord < 2) {
    //             right3.style.stroke = gold;
    //             right3.style.strokeDasharray = "";
    //             bottom1.style.stroke = gold;
    //             bottom1.style.strokeDasharray = "";
    //         } else if (coord >= 2 && coord < 4) {
    //             right3.style.stroke = cerulean;
    //             right3.style.strokeDasharray = "";
    //             bottom1.style.stroke = cerulean;
    //             bottom1.style.strokeDasharray = "";
    //         } else {
    //             right3.style.stroke = cerulean;
    //             right3.style.strokeDasharray = dashedStroke;
    //             bottom1.style.stroke = cerulean;
    //             bottom1.style.strokeDasharray = dashedStroke;
    //         }
    //         coord = +(x2coord.value);
    //         if (coord >= 1 && coord < 3) {
    //             right2.style.stroke = cerulean;
    //             right2.style.strokeDasharray = dashedStroke;
    //             left2.style.stroke = cerulean;
    //             left2.style.strokeDasharray = dashedStroke;
    //         } else if (coord >= 3 && coord < 5) {
    //             right2.style.stroke = cerulean;
    //             right2.style.strokeDasharray = "";
    //             left2.style.stroke = cerulean;
    //             left2.style.strokeDasharray = "";
    //         } else {
    //             right2.style.stroke = gold;
    //             right2.style.strokeDasharray = "";
    //             left2.style.stroke = gold;
    //             left2.style.strokeDasharray = "";
    //         }
    //         if (coord >= 0 && coord < 2) {
    //             top3.style.stroke = cerulean;
    //             top3.style.strokeDasharray = "";
    //             left1.style.stroke = cerulean;
    //             left1.style.strokeDasharray = "";
    //             coord = +(x1coord.value);
    //             if (coord >= 0 && coord < 2) {
    //                 top1.style.stroke = cerulean;
    //                 top1.style.strokeDasharray = dashedStroke;
    //                 right1.style.stroke = cerulean;
    //                 right1.style.strokeDasharray = dashedStroke;
    //             } else if (coord >= 2 && coord < 4) {
    //                 top1.style.stroke = noLine;
    //                 top1.style.strokeDasharray = "";
    //                 right1.style.stroke = noLine;
    //                 right1.style.strokeDasharray = "";
    //             } else {
    //                 top1.style.stroke = gold;
    //                 top1.style.strokeDasharray = "";
    //                 right1.style.stroke = gold;
    //                 right1.style.strokeDasharray = "";
    //             }
    //         } else if (coord >= 2 && coord < 4) {
    //             top3.style.stroke = gold;
    //             top3.style.strokeDasharray = "";
    //             left1.style.stroke = gold;
    //             left1.style.strokeDasharray = "";
    //             coord = +(x1coord.value);
    //             if (coord >= 0 && coord < 2) {
    //                 top1.style.stroke = noLine;
    //                 top1.style.strokeDasharray = "";
    //                 right1.style.stroke = noLine;
    //                 right1.style.strokeDasharray = "";
    //             } else if (coord >= 2 && coord < 4) {
    //                 top1.style.stroke = cerulean;
    //                 top1.style.strokeDasharray = dashedStroke;
    //                 right1.style.stroke = cerulean;
    //                 right1.style.strokeDasharray = dashedStroke;
    //             } else {
    //                 top1.style.stroke = cerulean;
    //                 top1.style.strokeDasharray = "";
    //                 right1.style.stroke = cerulean;
    //                 right1.style.strokeDasharray = "";
    //             }
    //         } else {
    //             top3.style.stroke = cerulean;
    //             top3.style.strokeDasharray = dashedStroke;
    //             left1.style.stroke = cerulean;
    //             left1.style.strokeDasharray = dashedStroke;
    //             coord = +(x1coord.value);
    //             if (coord >= 0 && coord < 2) {
    //                 top1.style.stroke = cerulean;
    //                 top1.style.strokeDasharray = "";
    //                 right1.style.stroke = cerulean;
    //                 right1.style.strokeDasharray = "";
    //             } else if (coord >= 2 && coord < 4) {
    //                 top1.style.stroke = gold;
    //                 top1.style.strokeDasharray = "";
    //                 right1.style.stroke = gold;
    //                 right1.style.strokeDasharray = "";
    //             } else {
    //                 top1.style.stroke = noLine;
    //                 top1.style.strokeDasharray = "";
    //                 right1.style.stroke = noLine;
    //                 right1.style.strokeDasharray = "";
    //             }
    //         }
    //         break;
    //     case 2:
    //         bottom3.style.stroke = cerulean;
    //         bottom3.style.strokeDasharray = "";
    //         left3.style.stroke = cerulean;
    //         left3.style.strokeDasharray = "";
    //         coord = +(x1coord.value);
    //         if (coord >= 1 && coord < 3) {
    //             bottom2.style.stroke = cerulean;
    //             bottom2.style.strokeDasharray = dashedStroke;
    //             top2.style.stroke = cerulean;
    //             top2.style.strokeDasharray = dashedStroke;
    //         } else if (coord >= 3 && coord < 5) {
    //             bottom2.style.stroke = gold;
    //             bottom2.style.strokeDasharray = "";
    //             top2.style.stroke = gold;
    //             top2.style.strokeDasharray = "";
    //         } else {
    //             bottom2.style.stroke = cerulean;
    //             bottom2.style.strokeDasharray = "";
    //             top2.style.stroke = cerulean;
    //             top2.style.strokeDasharray = "";
    //         }
    //         if (coord >= 0 && coord < 2) {
    //             right3.style.stroke = cerulean;
    //             right3.style.strokeDasharray = dashedStroke;
    //             bottom1.style.stroke = cerulean;
    //             bottom1.style.strokeDasharray = dashedStroke;
    //         } else if (coord >= 2 && coord < 4) {
    //             right3.style.stroke = noLine;
    //             right3.style.strokeDasharray = "";
    //             bottom1.style.stroke = noLine;
    //             bottom1.style.strokeDasharray = "";
    //         } else {
    //             right3.style.stroke = gold;
    //             right3.style.strokeDasharray = "";
    //             bottom1.style.stroke = gold;
    //             bottom1.style.strokeDasharray = "";
    //         }
    //         coord = +(x2coord.value);
    //         if (coord >= 1 && coord < 3) {
    //             right2.style.stroke = cerulean;
    //             right2.style.strokeDasharray = dashedStroke;
    //             left2.style.stroke = cerulean;
    //             left2.style.strokeDasharray = dashedStroke;
    //         } else if (coord >= 3 && coord < 5) {
    //             right2.style.stroke = cerulean;
    //             right2.style.strokeDasharray = "";
    //             left2.style.stroke = cerulean;
    //             left2.style.strokeDasharray = "";
    //         } else {
    //             right2.style.stroke = gold;
    //             right2.style.strokeDasharray = "";
    //             left2.style.stroke = gold;
    //             left2.style.strokeDasharray = "";
    //         }
    //         if (coord >= 0 && coord < 2) {
    //             top3.style.stroke = noLine;
    //             top3.style.strokeDasharray = "";
    //             left1.style.stroke = noLine;
    //             left1.style.strokeDasharray = "";
    //             coord = +(x1coord.value);
    //             if (coord >= 0 && coord < 2) {
    //                 top1.style.stroke = gold;
    //                 top1.style.strokeDasharray = "";
    //                 right1.style.stroke = gold;
    //                 right1.style.strokeDasharray = "";
    //             } else if (coord >= 2 && coord < 4) {
    //                 top1.style.stroke = cerulean;
    //                 top1.style.strokeDasharray = "";
    //                 right1.style.stroke = cerulean;
    //                 right1.style.strokeDasharray = "";
    //             } else {
    //                 top1.style.stroke = cerulean;
    //                 top1.style.strokeDasharray = dashedStroke;
    //                 right1.style.stroke = cerulean;
    //                 right1.style.strokeDasharray = dashedStroke;
    //             }
    //         } else if (coord >= 2 && coord < 4) {
    //             top3.style.stroke = cerulean;
    //             top3.style.strokeDasharray = dashedStroke;
    //             left1.style.stroke = cerulean;
    //             left1.style.strokeDasharray = dashedStroke;
    //             coord = +(x1coord.value);
    //             if (coord >= 0 && coord < 2) {
    //                 top1.style.stroke = cerulean;
    //                 top1.style.strokeDasharray = "";
    //                 right1.style.stroke = cerulean;
    //                 right1.style.strokeDasharray = "";
    //             } else if (coord >= 2 && coord < 4) {
    //                 top1.style.stroke = gold;
    //                 top1.style.strokeDasharray = "";
    //                 right1.style.stroke = gold;
    //                 right1.style.strokeDasharray = "";
    //             } else {
    //                 top1.style.stroke = noLine;
    //                 top1.style.strokeDasharray = "";
    //                 right1.style.stroke = noLine;
    //                 right1.style.strokeDasharray = "";
    //             }
    //         } else {
    //             top3.style.stroke = gold;
    //             top3.style.strokeDasharray = "";
    //             left1.style.stroke = gold;
    //             left1.style.strokeDasharray = "";
    //             coord = +(x1coord.value);
    //             if (coord >= 0 && coord < 2) {
    //                 top1.style.stroke = noLine;
    //                 top1.style.strokeDasharray = "";
    //                 right1.style.stroke = noLine;
    //                 right1.style.strokeDasharray = "";
    //             } else if (coord >= 2 && coord < 4) {
    //                 top1.style.stroke = cerulean;
    //                 top1.style.strokeDasharray = dashedStroke;
    //                 right1.style.stroke = cerulean;
    //                 right1.style.strokeDasharray = dashedStroke;
    //             } else {
    //                 top1.style.stroke = cerulean;
    //                 top1.style.strokeDasharray = "";
    //                 right1.style.stroke = cerulean;
    //                 right1.style.strokeDasharray = "";
    //             }
    //         }
    //         break;
    //     case 3:
    //         bottom3.style.stroke = cerulean;
    //         bottom3.style.strokeDasharray = dashedStroke;
    //         left3.style.stroke = cerulean;
    //         left3.style.strokeDasharray = dashedStroke;
    //         coord = +(x1coord.value);
    //         if (coord >= 1 && coord < 3) {
    //             bottom2.style.stroke = cerulean;
    //             bottom2.style.strokeDasharray = dashedStroke;
    //             top2.style.stroke = cerulean;
    //             top2.style.strokeDasharray = dashedStroke;
    //         } else if (coord >= 3 && coord < 5) {
    //             bottom2.style.stroke = gold;
    //             bottom2.style.strokeDasharray = "";
    //             top2.style.stroke = gold;
    //             top2.style.strokeDasharray = "";
    //         } else {
    //             bottom2.style.stroke = cerulean;
    //             bottom2.style.strokeDasharray = "";
    //             top2.style.stroke = cerulean;
    //             top2.style.strokeDasharray = "";
    //         }
    //         if (coord >= 0 && coord < 2) {
    //             right3.style.stroke = cerulean;
    //             right3.style.strokeDasharray = "";
    //             bottom1.style.stroke = cerulean;
    //             bottom1.style.strokeDasharray = "";
    //         } else if (coord >= 2 && coord < 4) {
    //             right3.style.stroke = gold;
    //             right3.style.strokeDasharray = "";
    //             bottom1.style.stroke = gold;
    //             bottom1.style.strokeDasharray = "";
    //         } else {
    //             right3.style.stroke = noLine;
    //             right3.style.strokeDasharray = "";
    //             bottom1.style.stroke = noLine;
    //             bottom1.style.strokeDasharray = "";
    //         }
    //         coord = +(x2coord.value);
    //         if (coord >= 1 && coord < 3) {
    //             right2.style.stroke = cerulean;
    //             right2.style.strokeDasharray = dashedStroke;
    //             left2.style.stroke = cerulean;
    //             left2.style.strokeDasharray = dashedStroke;
    //         } else if (coord >= 3 && coord < 5) {
    //             right2.style.stroke = cerulean;
    //             right2.style.strokeDasharray = "";
    //             left2.style.stroke = cerulean;
    //             left2.style.strokeDasharray = "";
    //         } else {
    //             right2.style.stroke = gold;
    //             right2.style.strokeDasharray = "";
    //             left2.style.stroke = gold;
    //             left2.style.strokeDasharray = "";
    //         }
    //         if (coord >= 0 && coord < 2) {
    //             top3.style.stroke = gold;
    //             top3.style.strokeDasharray = "";
    //             left1.style.stroke = gold;
    //             left1.style.strokeDasharray = "";
    //             coord = +(x1coord.value);
    //             if (coord >= 0 && coord < 2) {
    //                 top1.style.stroke = noLine;
    //                 top1.style.strokeDasharray = "";
    //                 right1.style.stroke = noLine;
    //                 right1.style.strokeDasharray = "";
    //             } else if (coord >= 2 && coord < 4) {
    //                 top1.style.stroke = cerulean;
    //                 top1.style.strokeDasharray = dashedStroke;
    //                 right1.style.stroke = cerulean;
    //                 right1.style.strokeDasharray = dashedStroke;
    //             } else {
    //                 top1.style.stroke = cerulean;
    //                 top1.style.strokeDasharray = "";
    //                 right1.style.stroke = cerulean;
    //                 right1.style.strokeDasharray = "";
    //             }
    //         } else if (coord >= 2 && coord < 4) {
    //             top3.style.stroke = cerulean;
    //             top3.style.strokeDasharray = "";
    //             left1.style.stroke = cerulean;
    //             left1.style.strokeDasharray = "";
    //             coord = +(x1coord.value);
    //             if (coord >= 0 && coord < 2) {
    //                 top1.style.stroke = cerulean;
    //                 top1.style.strokeDasharray = dashedStroke;
    //                 right1.style.stroke = cerulean;
    //                 right1.style.strokeDasharray = dashedStroke;
    //             } else if (coord >= 2 && coord < 4) {
    //                 top1.style.stroke = noLine;
    //                 top1.style.strokeDasharray = "";
    //                 right1.style.stroke = noLine;
    //                 right1.style.strokeDasharray = "";
    //             } else {
    //                 top1.style.stroke = gold;
    //                 top1.style.strokeDasharray = "";
    //                 right1.style.stroke = gold;
    //                 right1.style.strokeDasharray = "";
    //             }
    //         } else {
    //             top3.style.stroke = noLine;
    //             top3.style.strokeDasharray = "";
    //             left1.style.stroke = noLine;
    //             left1.style.strokeDasharray = "";
    //             coord = +(x1coord.value);
    //             if (coord >= 0 && coord < 2) {
    //                 top1.style.stroke = gold;
    //                 top1.style.strokeDasharray = "";
    //                 right1.style.stroke = gold;
    //                 right1.style.strokeDasharray = "";
    //             } else if (coord >= 2 && coord < 4) {
    //                 top1.style.stroke = cerulean;
    //                 top1.style.strokeDasharray = "";
    //                 right1.style.stroke = cerulean;
    //                 right1.style.strokeDasharray = "";
    //             } else {
    //                 top1.style.stroke = cerulean;
    //                 top1.style.strokeDasharray = dashedStroke;
    //                 right1.style.stroke = cerulean;
    //                 right1.style.strokeDasharray = dashedStroke;
    //             }
    //         }
    //         break;
    //     case 4:
    //         bottom3.style.stroke = gold;
    //         bottom3.style.strokeDasharray = "";
    //         left3.style.stroke = gold;
    //         left3.style.strokeDasharray = "";
    //         coord = +(x1coord.value);
    //         if (coord >= 1 && coord < 3) {
    //             bottom2.style.stroke = cerulean;
    //             bottom2.style.strokeDasharray = dashedStroke;
    //             top2.style.stroke = cerulean;
    //             top2.style.strokeDasharray = dashedStroke;
    //         } else if (coord >= 3 && coord < 5) {
    //             bottom2.style.stroke = gold;
    //             bottom2.style.strokeDasharray = "";
    //             top2.style.stroke = gold;
    //             top2.style.strokeDasharray = "";
    //         } else {
    //             bottom2.style.stroke = cerulean;
    //             bottom2.style.strokeDasharray = "";
    //             top2.style.stroke = cerulean;
    //             top2.style.strokeDasharray = "";
    //         }
    //         if (coord >= 0 && coord < 2) {
    //             right3.style.stroke = noLine;
    //             right3.style.strokeDasharray = "";
    //             bottom1.style.stroke = noLine;
    //             bottom1.style.strokeDasharray = "";
    //         } else if (coord >= 2 && coord < 4) {
    //             right3.style.stroke = cerulean;
    //             right3.style.strokeDasharray = dashedStroke;
    //             bottom1.style.stroke = cerulean;
    //             bottom1.style.strokeDasharray = dashedStroke;
    //         } else {
    //             right3.style.stroke = cerulean;
    //             right3.style.strokeDasharray = "";
    //             bottom1.style.stroke = cerulean;
    //             bottom1.style.strokeDasharray = "";
    //         }
    //         coord = +(x2coord.value);
    //         if (coord >= 1 && coord < 3) {
    //             right2.style.stroke = cerulean;
    //             right2.style.strokeDasharray = dashedStroke;
    //             left2.style.stroke = cerulean;
    //             left2.style.strokeDasharray = dashedStroke;
    //         } else if (coord >= 3 && coord < 5) {
    //             right2.style.stroke = cerulean;
    //             right2.style.strokeDasharray = "";
    //             left2.style.stroke = cerulean;
    //             left2.style.strokeDasharray = "";
    //         } else {
    //             right2.style.stroke = gold;
    //             right2.style.strokeDasharray = "";
    //             left2.style.stroke = gold;
    //             left2.style.strokeDasharray = "";
    //         }
    //         if (coord >= 0 && coord < 2) {
    //             top3.style.stroke = cerulean;
    //             top3.style.strokeDasharray = dashedStroke;
    //             left1.style.stroke = cerulean;
    //             left1.style.strokeDasharray = dashedStroke;
    //             coord = +(x1coord.value);
    //             if (coord >= 0 && coord < 2) {
    //                 top1.style.stroke = cerulean;
    //                 top1.style.strokeDasharray = "";
    //                 right1.style.stroke = cerulean;
    //                 right1.style.strokeDasharray = "";
    //             } else if (coord >= 2 && coord < 4) {
    //                 top1.style.stroke = gold;
    //                 top1.style.strokeDasharray = "";
    //                 right1.style.stroke = gold;
    //                 right1.style.strokeDasharray = "";
    //             } else {
    //                 top1.style.stroke = noLine;
    //                 top1.style.strokeDasharray = "";
    //                 right1.style.stroke = noLine;
    //                 right1.style.strokeDasharray = "";
    //             }
    //         } else if (coord >= 2 && coord < 4) {
    //             top3.style.stroke = noLine;
    //             top3.style.strokeDasharray = "";
    //             left1.style.stroke = noLine;
    //             left1.style.strokeDasharray = "";
    //             coord = +(x1coord.value);
    //             if (coord >= 0 && coord < 2) {
    //                 top1.style.stroke = gold;
    //                 top1.style.strokeDasharray = "";
    //                 right1.style.stroke = gold;
    //                 right1.style.strokeDasharray = "";
    //             } else if (coord >= 2 && coord < 4) {
    //                 top1.style.stroke = cerulean;
    //                 top1.style.strokeDasharray = "";
    //                 right1.style.stroke = cerulean;
    //                 right1.style.strokeDasharray = "";
    //             } else {
    //                 top1.style.stroke = cerulean;
    //                 top1.style.strokeDasharray = dashedStroke;
    //                 right1.style.stroke = cerulean;
    //                 right1.style.strokeDasharray = dashedStroke;
    //             }
    //         } else {
    //             top3.style.stroke = cerulean;
    //             top3.style.strokeDasharray = "";
    //             left1.style.stroke = cerulean;
    //             left1.style.strokeDasharray = "";
    //             coord = +(x1coord.value);
    //             if (coord >= 0 && coord < 2) {
    //                 top1.style.stroke = cerulean;
    //                 top1.style.strokeDasharray = dashedStroke;
    //                 right1.style.stroke = cerulean;
    //                 right1.style.strokeDasharray = dashedStroke;
    //             } else if (coord >= 2 && coord < 4) {
    //                 top1.style.stroke = noLine;
    //                 top1.style.strokeDasharray = "";
    //                 right1.style.stroke = noLine;
    //                 right1.style.strokeDasharray = "";
    //             } else {
    //                 top1.style.stroke = gold;
    //                 top1.style.strokeDasharray = "";
    //                 right1.style.stroke = gold;
    //                 right1.style.strokeDasharray = "";
    //             }
    //         }
    //         break;
    // }

    if (matrixA[0]- matrixA[2] >= -error && matrixB[0] - matrixB[1] >= -error) {
        if (matrixA[0] >= rowMax && matrixB[0] >= colMax)
            point1Big.style = "fill:" + lightGreen;
        else if (matrixA[0] >= rowMax)
            point1Big.style = "fill:" + gold;
        else if (matrixB[0] >= colMax)
            point1Big.style = "fill:" + cerulean;
        else
            point1Big.style = "fill:" + bad;
        point1Big.style.r = eqRadiiBig*widthBig;
    } else {
        point1Big.style.opacity = 0;
    }
    
    if (matrixA[1] - matrixA[3] >= -error && matrixB[1] - matrixB[0] >= -error) {
        if (matrixA[1] >= rowMax && matrixB[1] >= colMax)
            point2Big.style = "fill:" + lightGreen;
        else if (matrixA[1] >= rowMax)
            point2Big.style = "fill:" + gold;
        else if (matrixB[1] >= colMax)
            point2Big.style = "fill:" + cerulean;
        else
            point2Big.style = "fill:" + bad;
        point2Big.style.r = eqRadiiBig*widthBig;
    } else {
        point2Big.style.opacity = 0;
    }

    if (matrixA[2] - matrixA[0] >= -error && matrixB[2] - matrixB[3] >= -error) {
        if (matrixA[2] >= rowMax && matrixB[2] >= colMax)
            point3Big.style = "fill:" + lightGreen;
        else if (matrixA[2] >= rowMax)
            point3Big.style = "fill:" + gold;
        else if (matrixB[2] >= colMax)
            point3Big.style = "fill:" + cerulean;
        else
            point3Big.style = "fill:" + bad;
        point3Big.style.r = eqRadiiBig*widthBig;
    } else {
        point3Big.style.opacity = 0;
    }

    if (matrixA[3] - matrixA[1] >= -error && matrixB[3] - matrixB[2] >= -error) {
        if (matrixA[3] >= rowMax && matrixB[3] >= colMax)
            point4Big.style = "fill:" + lightGreen;
        else if (matrixA[3] >= rowMax)
            point4Big.style = "fill:" + gold;
        else if (matrixB[3] >= colMax)
            point4Big.style = "fill:" + cerulean;
        else
            point4Big.style = "fill:" + bad;
        point4Big.style.r = eqRadiiBig*widthBig;
    } else {
        point4Big.style.opacity = 0;
    }
    if (0 < x1coord.value && x1coord.value < 3 && 0 < x2coord.value && x2coord.value < 3 && b1coord.value < 6 && b2coord.value < 6) {
        const mixedRow = mixedPayoff(matrixA);
        const mixedCol = mixedPayoff(matrixB);
        point5Big.style = "fill:" + mixedColor;
        point5Big.style.r = eqRadiiBig*widthBig;
        point5Big.cx.baseVal.value = mixedRow*widthBig/6+paddingBig;
        point5Big.cy.baseVal.value = (1-mixedCol/6)*widthBig+paddingBig;
        if (6 - mixedRow < error && 6 - mixedCol < error) point5Big.style.opacity = 0;
    } else {
        point5Big.style.opacity = 0;
    }

    const arrowSize = 0.016*container.width.baseVal.value;
    const arrowOffset = 0.04*container.width.baseVal.value;
    const arrowSizeD = arrowSize/1.414;
    const arrow1 = document.getElementById("arrow1");
    const arrow2 = document.getElementById("arrow2");
    const arrow3 = document.getElementById("arrow3");
    const arrow4 = document.getElementById("arrow4");
    const arrow5 = document.getElementById("arrow5");
    const arrow6 = document.getElementById("arrow6");
    const arrow7 = document.getElementById("arrow7");
    const arrow8 = document.getElementById("arrow8");
    const arrow9 = document.getElementById("arrow9");
    const arrow10 = document.getElementById("arrow10");
    const arrow11 = document.getElementById("arrow11");
    const arrow12 = document.getElementById("arrow12");
    
    if (quad == 2 || quad == 4) {
        arrow1.x1.baseVal.value = picPadding1 + picWidth/12 - arrowSizeD;
        arrow1.x2.baseVal.value = picPadding1 + picWidth/12 + arrowSizeD;
        arrow1.y1.baseVal.value = picPadding2 - arrowOffset - arrowSizeD;
        arrow1.y2.baseVal.value = picPadding2 - arrowOffset + arrowSizeD;
        arrow2.x1.baseVal.value = picPadding1 + picWidth*3/12 - arrowSizeD;
        arrow2.x2.baseVal.value = picPadding1 + picWidth*3/12 + arrowSizeD;
        arrow2.y1.baseVal.value = picPadding2 - arrowOffset - arrowSizeD;
        arrow2.y2.baseVal.value = picPadding2 - arrowOffset + arrowSizeD;
    } else {
        arrow1.x1.baseVal.value = picPadding1 + picWidth/12 + arrowSizeD;
        arrow1.x2.baseVal.value = picPadding1 + picWidth/12 - arrowSizeD;
        arrow1.y1.baseVal.value = picPadding2 - arrowOffset - arrowSizeD;
        arrow1.y2.baseVal.value = picPadding2 - arrowOffset + arrowSizeD;
        arrow2.x1.baseVal.value = picPadding1 + picWidth*3/12 + arrowSizeD;
        arrow2.x2.baseVal.value = picPadding1 + picWidth*3/12 - arrowSizeD;
        arrow2.y1.baseVal.value = picPadding2 - arrowOffset - arrowSizeD;
        arrow2.y2.baseVal.value = picPadding2 - arrowOffset + arrowSizeD;
    }
    arrow3.x1.baseVal.value = picPadding1 + picWidth*5/12 - arrowSize;
    arrow3.x2.baseVal.value = picPadding1 + picWidth*5/12 + arrowSize;
    arrow3.y1.baseVal.value = picPadding2 - arrowOffset;
    arrow3.y2.baseVal.value = picPadding2 - arrowOffset;
    arrow4.x1.baseVal.value = picPadding1 + picWidth*7/12 - arrowSize;
    arrow4.x2.baseVal.value = picPadding1 + picWidth*7/12 + arrowSize;
    arrow4.y1.baseVal.value = picPadding2 - arrowOffset;
    arrow4.y2.baseVal.value = picPadding2 - arrowOffset;
    arrow5.x1.baseVal.value = picPadding1 + picWidth*9/12;
    arrow5.x2.baseVal.value = picPadding1 + picWidth*9/12;
    arrow5.y1.baseVal.value = picPadding2 - arrowOffset - arrowSize;
    arrow5.y2.baseVal.value = picPadding2 - arrowOffset + arrowSize;
    arrow6.x1.baseVal.value = picPadding1 + picWidth*11/12;
    arrow6.x2.baseVal.value = picPadding1 + picWidth*11/12;
    arrow6.y1.baseVal.value = picPadding2 - arrowOffset - arrowSize;
    arrow6.y2.baseVal.value = picPadding2 - arrowOffset + arrowSize;

    if (quad == 2 || quad == 4) {
        arrow7.x1.baseVal.value = picPadding1 - arrowSizeD - arrowOffset;
        arrow7.x2.baseVal.value = picPadding1 + arrowSizeD - arrowOffset;
        arrow7.y1.baseVal.value = picPadding2 + picHeight*11/12 - arrowSizeD;
        arrow7.y2.baseVal.value = picPadding2 + picHeight*11/12 + arrowSizeD;
        arrow8.x1.baseVal.value = picPadding1 - arrowSizeD - arrowOffset;
        arrow8.x2.baseVal.value = picPadding1 + arrowSizeD - arrowOffset;
        arrow8.y1.baseVal.value = picPadding2 + picHeight*9/12 - arrowSizeD;
        arrow8.y2.baseVal.value = picPadding2 + picHeight*9/12 + arrowSizeD;
    } else {
        arrow7.x1.baseVal.value = picPadding1 + arrowSizeD - arrowOffset;
        arrow7.x2.baseVal.value = picPadding1 - arrowSizeD - arrowOffset;
        arrow7.y1.baseVal.value = picPadding2 + picHeight*11/12 - arrowSizeD;
        arrow7.y2.baseVal.value = picPadding2 + picHeight*11/12 + arrowSizeD;
        arrow8.x1.baseVal.value = picPadding1 + arrowSizeD - arrowOffset;
        arrow8.x2.baseVal.value = picPadding1 - arrowSizeD - arrowOffset;
        arrow8.y1.baseVal.value = picPadding2 + picHeight*9/12 - arrowSizeD;
        arrow8.y2.baseVal.value = picPadding2 + picHeight*9/12 + arrowSizeD;
    }
    arrow9.x1.baseVal.value = picPadding1 - arrowOffset;
    arrow9.x2.baseVal.value = picPadding1 - arrowOffset;
    arrow9.y1.baseVal.value = picPadding2 + picHeight*7/12 - arrowSize;
    arrow9.y2.baseVal.value = picPadding2 + picHeight*7/12 + arrowSize;
    arrow10.x1.baseVal.value = picPadding1 - arrowOffset;
    arrow10.x2.baseVal.value = picPadding1 - arrowOffset;
    arrow10.y1.baseVal.value = picPadding2 + picHeight*5/12 - arrowSize;
    arrow10.y2.baseVal.value = picPadding2 + picHeight*5/12 + arrowSize;
    arrow11.x1.baseVal.value = picPadding1 - arrowSize - arrowOffset;
    arrow11.x2.baseVal.value = picPadding1 + arrowSize - arrowOffset;
    arrow11.y1.baseVal.value = picPadding2 + picHeight*3/12;
    arrow11.y2.baseVal.value = picPadding2 + picHeight*3/12;
    arrow12.x1.baseVal.value = picPadding1 - arrowSize - arrowOffset;
    arrow12.x2.baseVal.value = picPadding1 + arrowSize - arrowOffset;
    arrow12.y1.baseVal.value = picPadding2 + picHeight/12;
    arrow12.y2.baseVal.value = picPadding2 + picHeight/12;

    let arrowA = "url(#arrow)";
    let arrowB = "url(#arrow)";

    if (changeQuad1 && (wasPositive1 || (hitZero1 && b1coord.value != 0))) {
        arrow1.style.stroke = "blue";
        arrow2.style.stroke = "blue";
        arrow3.style.stroke = "blue";
        arrow4.style.stroke = "blue";
        arrow5.style.stroke = "blue";
        arrow6.style.stroke = "blue";
        arrowA = "url(#blue-arrow)";
    } else {
        arrow1.style.stroke = "black";
        arrow2.style.stroke = "black";
        arrow3.style.stroke = "black";
        arrow4.style.stroke = "black";
        arrow5.style.stroke = "black";
        arrow6.style.stroke = "black";
    } if (changeQuad2 && (wasPositive2 || (hitZero2 && b2coord.value != 0))) {
        arrow7.style.stroke = "blue";
        arrow8.style.stroke = "blue";
        arrow9.style.stroke = "blue";
        arrow10.style.stroke = "blue";
        arrow11.style.stroke = "blue";
        arrow12.style.stroke = "blue";
        arrowB = "url(#blue-arrow)";
    } else {
        arrow7.style.stroke = "black";
        arrow8.style.stroke = "black";
        arrow9.style.stroke = "black";
        arrow10.style.stroke = "black";
        arrow11.style.stroke = "black";
        arrow12.style.stroke = "black";
    }

    if (quad == 2 || quad == 3) {
        arrow3.style.markerEnd = arrowA;
        arrow4.style.markerEnd = arrowA;
        arrow3.style.markerStart = "";
        arrow4.style.markerStart = "";
        arrow11.style.markerEnd = arrowB;
        arrow12.style.markerEnd = arrowB;
        arrow11.style.markerStart = "";
        arrow12.style.markerStart = "";
    } else {
        arrow3.style.markerStart = arrowA;
        arrow4.style.markerStart = arrowA;
        arrow3.style.markerEnd = "";
        arrow4.style.markerEnd = "";
        arrow11.style.markerStart = arrowB;
        arrow12.style.markerStart = arrowB;
        arrow11.style.markerEnd = "";
        arrow12.style.markerEnd = "";
    }
    if (quad == 1 || quad == 2) {
        arrow5.style.markerEnd = arrowA;
        arrow6.style.markerEnd = arrowA;
        arrow5.style.markerStart = "";
        arrow6.style.markerStart = "";
        arrow9.style.markerEnd = arrowB;
        arrow10.style.markerEnd = arrowB;
        arrow9.style.markerStart = "";
        arrow10.style.markerStart = "";
    } else {
        arrow5.style.markerStart = arrowA;
        arrow6.style.markerStart = arrowA;
        arrow5.style.markerEnd = "";
        arrow6.style.markerEnd = "";
        arrow9.style.markerStart = arrowB;
        arrow10.style.markerStart = arrowB;
        arrow9.style.markerEnd = "";
        arrow10.style.markerEnd = "";
    }
    if (quad == 1 || quad == 2) {
        arrow1.style.markerEnd = arrowA;
        arrow2.style.markerEnd = arrowA;
        arrow1.style.markerStart = "";
        arrow2.style.markerStart = "";
        arrow7.style.markerEnd = arrowB;
        arrow8.style.markerEnd = arrowB;
        arrow7.style.markerStart = "";
        arrow8.style.markerStart = "";
    } else {
        arrow1.style.markerStart = arrowA;
        arrow2.style.markerStart = arrowA;
        arrow1.style.markerEnd = "";
        arrow2.style.markerEnd = "";
        arrow7.style.markerStart = arrowB;
        arrow8.style.markerStart = arrowB;
        arrow7.style.markerEnd = "";
        arrow8.style.markerEnd = "";
    }

    x1coord.style.width = (picWidth+26).toString()+"px";
    x1coord.style.left = (picPadding1-diagram.width.baseVal.value/2).toString()+"px";
    x2coord.style.height = (picHeight+26).toString()+"px";
    x2coord.parentElement.style.top = (picPadding2-12.5).toString()+"px";
    const x2label = document.getElementById("x2-label");
    x2label.style.top = (picPadding2 - diagramWidth/2).toString() + "px";

    const wholeFigure = document.getElementById("whole-figure");
    const edgeFigure = document.getElementById("edge-figure");
    const arrows1 = document.getElementById("arrows1");
    const arrows2 = document.getElementById("arrows2");

    if (!fixImageSize) {
        if (coords[2] >= 6 && coords[3] >= 6) {
            wholeFigure.style.display = "none";
            arrows1.style.display = "none";
            arrows2.style.display = "none";
            edgeFigure.style.display = "none";
        } else if (coords[3] == 6) {
            wholeFigure.style.display = "none";
            arrows1.style.display = "";
            arrows2.style.display = "none";
            edgeFigure.style.display = "";

            const bar = document.getElementById("bar");
            const bar1 = document.getElementById("bar1");
            const bar2 = document.getElementById("bar2");
            const bar3 = document.getElementById("bar3");
            const bar4 = document.getElementById("bar4");
            const red1 = document.getElementById("red-point1");
            const red2 = document.getElementById("red-point2");
            const red3 = document.getElementById("red-point3");
            const green1 = document.getElementById("green-point1");
            const green2 = document.getElementById("green-point2");
            const green3 = document.getElementById("green-point3");
            const green4 = document.getElementById("green-point4");
            
            switch (quad) {
                case 1:
                    bar1.style.display = "";
                    bar2.style.display = "";
                    bar3.style.display = "";
                    bar4.style.display = "none";
                    bar1.style.stroke = lightGreen;
                    bar2.style.stroke = bad;
                    bar3.style.stroke = lightGreen;
                    break;
                case 2:
                    bar1.style.display = "";
                    bar2.style.display = "none";
                    bar3.style.display = "";
                    bar4.style.display = "";
                    bar1.style.stroke = gold;
                    bar3.style.stroke = gold;
                    bar4.style.stroke = bad;
                    break;
                case 3:
                    bar1.style.display = "";
                    bar2.style.display = "";
                    bar3.style.display = "";
                    bar4.style.display = "";
                    bar1.style.stroke = cerulean;
                    bar2.style.stroke = gold;
                    bar3.style.stroke = bad;
                    bar4.style.stroke = gold;
                    break;
                case 4:
                    bar1.style.display = "";
                    bar2.style.display = "none";
                    bar3.style.display = "";
                    bar4.style.display = "none";
                    bar1.style.stroke = bad;
                    bar3.style.stroke = cerulean;
                    break;
            }

            const barOffset = 0.1*container.width.baseVal.value;
            const barSeparation = 0.03*container.width.baseVal.value;
            bar.x1.baseVal.value = picPadding1;
            bar.x2.baseVal.value = picPadding1 + picWidth;
            bar.y1.baseVal.value = picPadding2;
            bar.y2.baseVal.value = picPadding2;
            bar.style.stroke = "#d3d3d3";
            bar1.x1.baseVal.value = picPadding1;
            bar1.x2.baseVal.value = picPadding1 + picWidth/2 + 1;
            bar1.y1.baseVal.value = picPadding2 + barOffset;
            bar1.y2.baseVal.value = picPadding2 + barOffset;
            bar2.x1.baseVal.value = picPadding1;
            bar2.x2.baseVal.value = picPadding1 + picWidth/2;
            bar2.y1.baseVal.value = picPadding2 + barOffset + barSeparation;
            bar2.y2.baseVal.value = picPadding2 + barOffset + barSeparation;
            bar3.x1.baseVal.value = picPadding1 + picWidth;
            bar3.x2.baseVal.value = picPadding1 + picWidth/2;
            bar3.y1.baseVal.value = picPadding2 + barOffset;
            bar3.y2.baseVal.value = picPadding2 + barOffset;
            bar4.x1.baseVal.value = picPadding1 + picWidth;
            bar4.x2.baseVal.value = picPadding1 + picWidth/2;
            bar4.y1.baseVal.value = picPadding2 + barOffset + barSeparation;
            bar4.y2.baseVal.value = picPadding2 + barOffset + barSeparation;

            green1.cx.baseVal.value = picPadding1;
            red1.cx.baseVal.value = picPadding1 + picWidth/6;
            green2.cx.baseVal.value = picPadding1 + picWidth/3;
            red2.cx.baseVal.value = picPadding1 + picWidth/2;
            green3.cx.baseVal.value = picPadding1 + picWidth*2/3;
            red3.cx.baseVal.value = picPadding1 + picWidth*5/6;
            green4.cx.baseVal.value = picPadding1 + picWidth;
            green1.cy.baseVal.value = picPadding2;
            red1.cy.baseVal.value = picPadding2;
            green2.cy.baseVal.value = picPadding2;
            red2.cy.baseVal.value = picPadding2;
            green3.cy.baseVal.value = picPadding2;
            red3.cy.baseVal.value = picPadding2;
            green4.cy.baseVal.value = picPadding2;
        } else if (coords[2] == 6) {
            wholeFigure.style.display = "none";
            arrows1.style.display = "none";
            arrows2.style.display = "";
            edgeFigure.style.display = "";

            const bar = document.getElementById("bar");
            const bar1 = document.getElementById("bar1");
            const bar2 = document.getElementById("bar2");
            const bar3 = document.getElementById("bar3");
            const bar4 = document.getElementById("bar4");
            const red1 = document.getElementById("red-point1");
            const red2 = document.getElementById("red-point2");
            const red3 = document.getElementById("red-point3");
            const green1 = document.getElementById("green-point1");
            const green2 = document.getElementById("green-point2");
            const green3 = document.getElementById("green-point3");
            const green4 = document.getElementById("green-point4");
            
            switch (quad) {
                case 1:
                    bar1.style.display = "none";
                    bar2.style.display = "";
                    bar3.style.display = "";
                    bar4.style.display = "";
                    bar2.style.stroke = lightGreen;
                    bar3.style.stroke = bad;
                    bar4.style.stroke = lightGreen;
                    break;
                case 2:
                    bar1.style.display = "";
                    bar2.style.display = "none";
                    bar3.style.display = "";
                    bar4.style.display = "none";
                    bar1.style.stroke = gold;
                    bar3.style.stroke = bad;
                    break;
                case 3:
                    bar1.style.display = "";
                    bar2.style.display = "";
                    bar3.style.display = "";
                    bar4.style.display = "";
                    bar1.style.stroke = cerulean;
                    bar2.style.stroke = bad;
                    bar3.style.stroke = cerulean;
                    bar4.style.stroke = gold;
                    break;
                case 4:
                    bar1.style.display = "";
                    bar2.style.display = "";
                    bar3.style.display = "none";
                    bar4.style.display = "";
                    bar1.style.stroke = bad;
                    bar2.style.stroke = cerulean;
                    bar4.style.stroke = cerulean;
                    break;
            }

            const barOffset = 0.1*container.width.baseVal.value;
            const barSeparation = 0.03*container.width.baseVal.value;
            bar.y1.baseVal.value = picPadding2;
            bar.y2.baseVal.value = picPadding2 + picHeight;
            bar.x1.baseVal.value = picPadding1;
            bar.x2.baseVal.value = picPadding1;
            bar.style.stroke = "#d3d3d3";
            bar1.y1.baseVal.value = picPadding2;
            bar1.y2.baseVal.value = picPadding2 + picHeight/2 + 1;
            bar1.x1.baseVal.value = picPadding1 + barOffset;
            bar1.x2.baseVal.value = picPadding1 + barOffset;
            bar2.y1.baseVal.value = picPadding2;
            bar2.y2.baseVal.value = picPadding2 + picHeight/2;
            bar2.x1.baseVal.value = picPadding1 + barOffset + barSeparation;
            bar2.x2.baseVal.value = picPadding1 + barOffset + barSeparation;
            bar3.y1.baseVal.value = picPadding2 + picHeight;
            bar3.y2.baseVal.value = picPadding2 + picHeight/2;
            bar3.x1.baseVal.value = picPadding1 + barOffset;
            bar3.x2.baseVal.value = picPadding1 + barOffset;
            bar4.y1.baseVal.value = picPadding2 + picHeight;
            bar4.y2.baseVal.value = picPadding2 + picHeight/2;
            bar4.x1.baseVal.value = picPadding1 + barOffset + barSeparation;
            bar4.x2.baseVal.value = picPadding1 + barOffset + barSeparation;

            green1.cy.baseVal.value = picPadding2;
            red1.cy.baseVal.value = picPadding2 + picHeight/6;
            green2.cy.baseVal.value = picPadding2 + picHeight/3;
            red2.cy.baseVal.value = picPadding2 + picHeight/2;
            green3.cy.baseVal.value = picPadding2 + picHeight*2/3;
            red3.cy.baseVal.value = picPadding2 + picHeight*5/6;
            green4.cy.baseVal.value = picPadding2 + picHeight;
            green1.cx.baseVal.value = picPadding1;
            red1.cx.baseVal.value = picPadding1;
            green2.cx.baseVal.value = picPadding1;
            red2.cx.baseVal.value = picPadding1;
            green3.cx.baseVal.value = picPadding1;
            red3.cx.baseVal.value = picPadding1;
            green4.cx.baseVal.value = picPadding1;
        } else {
            wholeFigure.style.display = "";
            arrows1.style.display = "";
            arrows2.style.display = "";
            edgeFigure.style.display = "none";
        }
    } else {
        wholeFigure.style.display = "";
        arrows1.style.display = "";
        arrows2.style.display = "";
        edgeFigure.style.display = "none";
    }

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
    const green1 = document.getElementById("green1");
    const green2 = document.getElementById("green2");
    const green3 = document.getElementById("green3");
    const green4 = document.getElementById("green4");
    const green5 = document.getElementById("green5");
    const green6 = document.getElementById("green6");
    const green7 = document.getElementById("green7");
    const green8 = document.getElementById("green8");
    const picCorner1 = document.getElementById("green-corner1");
    const picCorner2 = document.getElementById("green-corner2");
    const picCorner3 = document.getElementById("green-corner3");
    const picCorner4 = document.getElementById("green-corner4");

    green1.x1.baseVal.value = picPadding1;
    green1.x2.baseVal.value = picWidth+picPadding1;
    green1.y1.baseVal.value = picPadding2;
    green1.y2.baseVal.value = picPadding2;
    green2.x1.baseVal.value = picPadding1;
    green2.x2.baseVal.value = picWidth+picPadding1;
    green2.y1.baseVal.value = picHeight/3+picPadding2;
    green2.y2.baseVal.value = picHeight/3+picPadding2;
    green3.x1.baseVal.value = picPadding1;
    green3.x2.baseVal.value = picWidth+picPadding1;
    green3.y1.baseVal.value = picHeight*2/3+picPadding2;
    green3.y2.baseVal.value = picHeight*2/3+picPadding2;
    green4.x1.baseVal.value = picPadding1;
    green4.x2.baseVal.value = picWidth+picPadding1;
    green4.y1.baseVal.value = picHeight+picPadding2;
    green4.y2.baseVal.value = picHeight+picPadding2;
    green5.x1.baseVal.value = picPadding1;
    green5.x2.baseVal.value = picPadding1;
    green5.y1.baseVal.value = picPadding2;
    green5.y2.baseVal.value = picHeight+picPadding2;
    green6.x1.baseVal.value = picWidth/3+picPadding1;
    green6.x2.baseVal.value = picWidth/3+picPadding1;
    green6.y1.baseVal.value = picPadding2;
    green6.y2.baseVal.value = picHeight+picPadding2;
    green7.x1.baseVal.value = picWidth*2/3+picPadding1;
    green7.x2.baseVal.value = picWidth*2/3+picPadding1;
    green7.y1.baseVal.value = picPadding2;
    green7.y2.baseVal.value = picHeight+picPadding2;
    green8.x1.baseVal.value = picWidth+picPadding1;
    green8.x2.baseVal.value = picWidth+picPadding1;
    green8.y1.baseVal.value = picPadding2;
    green8.y2.baseVal.value = picHeight+picPadding2;
    red1.x1.baseVal.value = picPadding1;
    red1.x2.baseVal.value = picWidth+picPadding1;
    red1.y1.baseVal.value = picHeight/6+picPadding2;
    red1.y2.baseVal.value = picHeight/6+picPadding2;
    red2.x1.baseVal.value = picPadding1;
    red2.x2.baseVal.value = picWidth+picPadding1;
    red2.y1.baseVal.value = picHeight/2+picPadding2;
    red2.y2.baseVal.value = picHeight/2+picPadding2;
    red3.x1.baseVal.value = picPadding1;
    red3.x2.baseVal.value = picWidth+picPadding1;
    red3.y1.baseVal.value = picHeight*5/6+picPadding2;
    red3.y2.baseVal.value = picHeight*5/6+picPadding2;
    red4.x1.baseVal.value = picWidth/6+picPadding1;
    red4.x2.baseVal.value = picWidth/6+picPadding1;
    red4.y1.baseVal.value = picPadding2;
    red4.y2.baseVal.value = picHeight+picPadding2;
    red5.x1.baseVal.value = picWidth/2+picPadding1;
    red5.x2.baseVal.value = picWidth/2+picPadding1;
    red5.y1.baseVal.value = picPadding2;
    red5.y2.baseVal.value = picHeight+picPadding2;
    red6.x1.baseVal.value = picWidth*5/6+picPadding1;
    red6.x2.baseVal.value = picWidth*5/6+picPadding1;
    red6.y1.baseVal.value = picPadding2;
    red6.y2.baseVal.value = picHeight+picPadding2;
    picCorner1.cx.baseVal.value = picPadding1;
    picCorner1.cy.baseVal.value = picPadding2;
    picCorner2.cx.baseVal.value = picWidth+picPadding1;
    picCorner2.cy.baseVal.value = picPadding2;
    picCorner3.cx.baseVal.value = picPadding1;
    picCorner3.cy.baseVal.value = picHeight+picPadding2;
    picCorner4.cx.baseVal.value = picWidth+picPadding1;
    picCorner4.cy.baseVal.value = picHeight+picPadding2;

    const bigPicPoint1 = document.getElementById("big-pic-point1");
    const bigPicPoint2 = document.getElementById("big-pic-point2");
    const bigPicPoint3 = document.getElementById("big-pic-point3");
    const bigPicPoint4 = document.getElementById("big-pic-point4");
    const bigPicPoint5 = document.getElementById("big-pic-point5");
    const bigPicPoint6 = document.getElementById("big-pic-point6");
    const bigPicPoint7 = document.getElementById("big-pic-point7");
    const bigPicPoint8 = document.getElementById("big-pic-point8");
    const bigPicPoint9 = document.getElementById("big-pic-point9");
    const pointObjects = [ bigPicPoint1, bigPicPoint2, bigPicPoint3, bigPicPoint4, bigPicPoint5, bigPicPoint6, bigPicPoint7, bigPicPoint8, bigPicPoint9 ];
    points.length = 0;
    points.push([ quad, +x1coord.value % 6, +x2coord.value % 6 ]);
    if (+b1coord.value == 0) {
        let redLine = Math.round((points[0][1]+1)/2)*2-1;
        points.push([ qOverBlue(true, quad, points[0][1], points[0][2]), (redLine - (points[0][1] - redLine) + 6) % 6, points[0][2] ]);
        if (Number.isInteger(+x1coord.value/2)) {
            let redLine = Math.round((points[1][1]+1)/2)*2-1;
            points.push([ qOverBlue(true, points[1][0], points[1][1], points[1][2]), (redLine - (points[1][1] - redLine) + 6) % 6, points[1][2] ]);
        }
    }
    if (+b2coord.value == 0) {
        const length = points.length;
        for (let i = 0; i < length; i++) {
            let redLine = Math.round((points[i][2]+1)/2)*2-1;
            points.push([ qOverBlue(false, points[i][0], points[i][1], points[i][2]), points[i][1], (redLine - (points[i][2] - redLine) + 6) % 6 ]);
        }
        if (Number.isInteger(+x2coord.value/2)) {
            for (let i = length; i < 2*length; i++) {
                let redLine = Math.round((points[i][2]+1)/2)*2-1;
                points.push([ qOverBlue(false, points[i][0], points[i][1], points[i][2]), points[i][1], (redLine - (points[i][2] - redLine) + 6) % 6 ]);
            }
        }
    }
    if (draggingInBigPic && isMouseDown) {
        placePoint(bigPicPoint1, quad, +x1coord.value, +x2coord.value);
    } else {
        placePoint(pointObjects[0], points[0][0], points[0][1], points[0][2]);
        draggingInBigPic = false;
    }
    for (let i = 1; i < 9; i++) {
        if (i < points.length) {
            pointObjects[i].style.display = "";
            placePoint(pointObjects[i], points[i][0], points[i][1], points[i][2]);
        } else {
            pointObjects[i].style.display = "none";
        }
    }

    if (backgroundOutOfDate && (+b1coord.value != 6 && +b2coord.value != 6 || fixImageSize) && viewMode != 0) {
        const foreignObject = document.getElementById("canvasForeignObject");
        const canvas = document.getElementById("canvas");

        // update the size of the canvas
        foreignObject.x.baseVal.value = picPadding1;
        foreignObject.y.baseVal.value = picPadding2;
        foreignObject.width.baseVal.value = picWidth;
        foreignObject.height.baseVal.value = picHeight;
        canvas.width = picWidth;
        canvas.height = picHeight;

        if (time % 3 == 0 || switchMode) {
            // get the appropriate values for the density plot
            let x1Offset = 0;
            let x2Offset = 0;
            switch (quad) {
                case 2:
                    x1Offset = -6;
                    break;
                case 3:
                    x1Offset = -6;
                    x2Offset = -6;
                    break;
                case 4:
                    x2Offset = -6;
                    break;
            }
            
            valuesX = 6*Math.round(picWidth/30);
            valuesY = 6*Math.round(picHeight/30);
            values = [];
            for (let j = 0; j < valuesY; j++) {
                values.push([]);
                for (let i = 0; i < valuesX; i++) {
                    const [rowM, colM] = coordsToMatrices((i+0.5)/valuesX*6 + x1Offset, (valuesY-j-0.5)/valuesY*6 + x2Offset,
                                                        +b1coord.value != 0 ? b1coord.value : b1coord.value + error*2,
                                                        +b2coord.value != 0 ? b2coord.value : b2coord.value + error*2);
                    switch (viewMode) {
                        case 1:
                            values[j].push(payoff(rowM, colM));
                            break;
                        case 2:
                            values[j].push(payoffTransferable(rowM, colM));
                            break;
                        case 3:
                            values[j].push(payoffModified(rowM, colM));
                            break;
                        case 4:
                            values[j].push(payoffCoco(rowM, colM));
                            break;
                        case 5:
                            values[j].push(payoffBargainingBackstop(rowM, colM));
                            break;
                        case 6:
                            values[j].push(payoffBargainingDisagreement(rowM, colM));
                            break;
                        case 7:
                            values[j].push(payoffCustom(rowM, colM));
                            break;
                        case 8:
                            values[j].push(coordination(rowM, colM));
                            break;
                        case 9:
                            values[j].push(payoffShapley(rowM, colM));
                            break;
                    }
                }
            }
            switchMode = false;
            backgroundOutOfDate = false;
        }

        const ctx = canvas.getContext("2d");
        const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
        const data = imageData.data;
        for (let j = 0; j < canvas.height; j++) {
            for (let i = 0; i < canvas.width; i++) {
                let value = 0;

                // Apply linear interpolation between samples
                value = values[Math.floor(j/canvas.height*valuesY)][Math.floor(i/canvas.width*valuesX)];
                if (viewMode == 3 || viewMode == 1) {
                    const weight1 = i/canvas.width*valuesX % 1;
                    if (Math.ceil(i/canvas.width*valuesX)%valuesX == valuesX/2) {
                        value = values[Math.floor(j/canvas.height*valuesY)][Math.floor(i/canvas.width*valuesX)];
                    } else {
                        value = values[Math.floor(j/canvas.height*valuesY)][Math.floor(i/canvas.width*valuesX)] * (1-weight1) +
                                values[Math.floor(j/canvas.height*valuesY)%valuesY][Math.ceil(i/canvas.width*valuesX)%valuesX] * weight1;
                    }
                } else {
                    const weight1 = i/canvas.width*valuesX % 1;
                    const weight2 = j/canvas.height*valuesY % 1;
                    value = values[Math.floor(j/canvas.height*valuesY)][Math.floor(i/canvas.width*valuesX)] * (1-weight1) * (1-weight2) +
                            values[Math.floor(j/canvas.height*valuesY)%valuesY][Math.ceil(i/canvas.width*valuesX)%valuesX] * weight1 * (1-weight2) +
                            values[Math.ceil(j/canvas.height*valuesY)%valuesY][Math.floor(i/canvas.width*valuesX)%valuesX] * (1-weight1) * weight2 +
                            values[Math.ceil(j/canvas.height*valuesY)%valuesY][Math.ceil(i/canvas.width*valuesX)%valuesX] * weight1 * weight2;
                }

                // Render discontinuities in higher resolution
                if (i < canvas.width/2 && j >= canvas.height/2 && viewMode == 3 && (quad == 1 || quad == 3)) {
                    const n = Math.floor(i/canvas.width*valuesX);
                    const m = Math.floor(j/canvas.height*valuesY);
                    const jumpSize = 0.4;
                    let boundary = false;
                    if (n != 0 && Math.abs(values[m][n-1] - values[m][n]) > jumpSize) boundary = true;
                    if (n != 0 && m != 0 && Math.abs(values[m-1][n-1] - values[m][n]) > jumpSize) boundary = true;
                    if (m != 0 && Math.abs(values[m-1][n] - values[m][n]) > jumpSize) boundary = true;
                    if (n != valuesX-1 && m != 0 && Math.abs(values[m-1][n+1] - values[m][n]) > jumpSize) boundary = true;
                    if (n != valuesX-1 && Math.abs(values[m][n+1] - values[m][n]) > jumpSize) boundary = true;
                    if (n != valuesX-1 && m != valuesY-1 && Math.abs(values[m+1][n+1] - values[m][n]) > jumpSize) boundary = true;
                    if (m != valuesY-1 && Math.abs(values[m][n+1] - values[m][n]) > jumpSize) boundary = true;
                    if (n != 0 && m != valuesY-1 && Math.abs(values[m-1][n+1] - values[m][n]) > jumpSize) boundary = true;

                    if (boundary) {
                        const [rowM, colM] = coordsToMatrices(i/canvas.width*6 + x1Offset, (canvas.height-j)/canvas.height*6 + x2Offset,
                                                            +b1coord.value != 0 ? b1coord.value : b1coord.value + error*2,
                                                            +b2coord.value != 0 ? b2coord.value : b2coord.value + error*2);
                        switch (viewMode) {
                            case 1:
                                value = payoff(rowM, colM);
                                break;
                            case 2:
                                value = payoffTransferable(rowM, colM);
                                break;
                            case 3:
                                value = payoffModified(rowM, colM);
                                break;
                            case 4:
                                value = payoffCoco(rowM, colM);
                                break;
                            case 5:
                                value = payoffBargainingBackstop(rowM, colM);
                                break;
                            case 6:
                                value = payoffBargainingDisagreement(rowM, colM);
                                break;
                            case 7:
                                value = payoffCustom(rowM, colM);
                                break;
                            case 8:
                                value = coordination(rowM, colM);
                                break;
                            case 9:
                                value = payoffShapley(rowM, colM);
                                break;
                        }
                    }
                }

                const color = colorFunction(value/6);
                // console.log(value/6);
                data[(j*canvas.width+i)*4]   = color[0];
                data[(j*canvas.width+i)*4+1] = color[1];
                data[(j*canvas.width+i)*4+2] = color[2];
                data[(j*canvas.width+i)*4+3] = 255;
            }
        }
        ctx.putImageData(imageData,0,0);
    }

    time++;
}

function qOverBlue(p1, q0, x1, x2) {
    let x = 0;
    if (p1) {
        x = x1;
    }
    else {
        x = (8 - x2) % 6;
    }
    if (0 < x && x < 2 || x == 0 && p1 || x == 6 && p1 || x == 2 && !p1) {
        switch (q0) {
            case 1:
                return 3;
            case 2:
                return 4;
            case 3:
                return 1;
            case 4:
                return 2;
        }
    } else if (2 < x && x < 4 || x == 2 && p1 || x == 4 && !p1) {
        switch (q0) {
            case 1:
                return 2;
            case 2:
                return 1;
            case 3:
                return 4;
            case 4:
                return 3;
        }
    } else {
        switch (q0) {
            case 1:
                return 4;
            case 2:
                return 3;
            case 3:
                return 2;
            case 4:
                return 1;
        }
    }
}

function crossBlue(p1) {
    quad = qOverBlue(p1, quad, +x1coord.value, +x2coord.value);
    updateBackground();
    if (p1) {
        const x1coord = document.getElementById("x1coord");
        let redLine = Math.round((+x1coord.value+1)/2)*2-1;
        x1coord.value = (redLine - (+x1coord.value - redLine) + 6) % 6;
    } else {
        const x2coord = document.getElementById("x2coord");
        let redLine = Math.round((+x2coord.value+1)/2)*2-1;
        x2coord.value = (redLine - (+x2coord.value - redLine) + 6) % 6;
    }
}

function crossRed(p1) {
    if (p1) {
        const x1coord = document.getElementById("x1coord");
        let redLine = Math.round((+x1coord.value+1)/2)*2-1;
        x1coord.value = (redLine - (+x1coord.value - redLine) + 6) % 6;
    } else {
        const x2coord = document.getElementById("x2coord");
        let redLine = Math.round((+x2coord.value+1)/2)*2-1;
        x2coord.value = (redLine - (+x2coord.value - redLine) + 6) % 6;
    }
}

function crossGreen(p1) {
    if (p1) {
        const x1coord = document.getElementById("x1coord");
        let greenLine = Math.round(+x1coord.value/2)*2;
        x1coord.value = (greenLine - (+x1coord.value - greenLine) + 6) % 6;
    } else {
        const x2coord = document.getElementById("x2coord");
        let greenLine = Math.round(+x2coord.value/2)*2;
        x2coord.value = (greenLine - (+x2coord.value - greenLine) + 6) % 6;
    }
}

function wiggle(p1) {
    if (p1) {
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
    } else {
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
    }
    updateBackground();
}

function updateBackground() {
    backgroundOutOfDate = true;

    const region1 = document.getElementById("region1");
    const region2 = document.getElementById("region2");
    const region3 = document.getElementById("region3");
    const region4 = document.getElementById("region4");
    const header = document.getElementById("quad-header");
    switch (quad) {
        case 1:
            region1.style.fill = greenBackground;
            region2.style.fill = greenBackground;
            region3.style.fill = "url('#gradient1')";
            region4.style.fill = greenBackground;
            header.innerHTML = "Good Quadrant";
            break;
        case 2:
            region1.style.fill = goldBackground;
            region2.style.fill = goldBackground;
            region3.style.fill = "white";
            region4.style.fill = grayBackground;
            header.innerHTML = "Row Quadrant";
            break;
        case 3:
            region1.style.fill = ceruleanBackground;
            region2.style.fill = grayBackground;
            region3.style.fill = "url('#gradient2')";
            region4.style.fill = goldBackground;
            header.innerHTML = "Bad Quadrant";
            break;
        case 4:
            region1.style.fill = grayBackground;
            region2.style.fill = ceruleanBackground;
            region3.style.fill = "white";
            region4.style.fill = ceruleanBackground;
            header.innerHTML = "Column Quadrant";
            break;
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

function mixedEquilibrium([a,b,c,d]) {
    // takes the other player's matrix
    if (a-b-c+d != 0)
        return (d - c)/(a - b - c + d);
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
    let x0 = x;
    if (x < 0) x0 += 6;
    x0 = 6 - ((x0 + 3) % 6); // modifies for a change in convention
    if (x < 0) x0 -= 6;
    return UVtoMatrix(XBtoUV([x0,b]));
}

function coordsToMatrices(x1,x2,b1,b2) {
    if (-6 <= x1 && x1 <= 6 && -6 <= x2 && x2 <= 6 && 
         0 <= b1 && b1 <= 6 && 0 <= b2 && b2 <= 6) {
        return [XBtoMatrix([-x1,b1]), flip(XBtoMatrix([-x2,b2]))];
    }
    else return [6, 6, 6, 6];
}

function changeCoords(e) {
    const x1coord = document.getElementById("x1coord");
    const x2coord = document.getElementById("x2coord");
    const b1coord = document.getElementById("b1coord");
    const b2coord = document.getElementById("b2coord");
    if ((+b1coord.value == 6 || +b2coord.value == 6) && !fixImageSize) {
        const container = document.getElementById("container");
        const edgeFig = document.getElementById("edge-figure");
        const rect1 = container.getBoundingClientRect();
        const rect2 = edgeFig.getBoundingClientRect();
        const x = e.pageX;
        const y = e.pageY;
        const margins = 20;
        if (+b2coord.value == 6 && rect2.left-margins <= x && rect2.right+margins >= x && rect1.top+rect1.width/2-margins <= y && rect1.top+rect1.width/2+margins >= y) {
            x1coord.value = (x - rect2.left) / rect2.width * 6;
            enRoute = false;
        }
        if (+b1coord.value == 6 && rect2.top-margins <= y && rect2.bottom+margins >= y && rect1.left+rect1.height/2-margins <= x && rect1.left+rect1.height/2+margins >= x) {
            x2coord.value = 6 - (y - rect2.top) / rect2.height * 6;
            enRoute = false;
        }
    }
    else {
        const wholeFigure = document.getElementById("whole-figure");
        const rect = wholeFigure.getBoundingClientRect();
        const relativeX1 = e.pageX - rect.left;
        const relativeY1 = e.pageY - rect.top;
        const newX1 = relativeX1 / rect.width * 6;
        const newX2 = (1 - relativeY1 / rect.height) * 6;
        if (-0.1 <= newX1 && newX1 <= 6.1 && -0.1 <= newX2 && newX2 <= 6.1) {
            if (isMouseDown) {
                x1coord.value = newX1;
                x2coord.value = newX2;
            } else {
                x1coord.value = Math.round(newX1*6)/6;
                x2coord.value = Math.round(newX2*6)/6;
            }
            enRoute = false;
        }
    }

    const bigPicture = document.getElementById("big-picture");
    const bigPicWidth = bigPicture.width.baseVal.value;
    const rect = bigPicture.getBoundingClientRect();
    let relativeX = (e.pageX - rect.left) / bigPicWidth;
    let relativeY = (e.pageY - rect.top) / bigPicWidth;

    if (0 <= relativeX && relativeX <= 1 && 0 <= relativeY && relativeY <= 1) {
        if (!isMouseDown) {
            const bigPicPoint1 = document.getElementById("big-pic-point1");
            const bigPicPoint2 = document.getElementById("big-pic-point2");
            const bigPicPoint3 = document.getElementById("big-pic-point3");
            const bigPicPoint4 = document.getElementById("big-pic-point4");
            const bigPicPoint5 = document.getElementById("big-pic-point5");
            const bigPicPoint6 = document.getElementById("big-pic-point6");
            const bigPicPoint7 = document.getElementById("big-pic-point7");
            const bigPicPoint8 = document.getElementById("big-pic-point8");
            const bigPicPoint9 = document.getElementById("big-pic-point9");
            const pointObjects = [ bigPicPoint1, bigPicPoint2, bigPicPoint3, bigPicPoint4, bigPicPoint5, bigPicPoint6, bigPicPoint7, bigPicPoint8, bigPicPoint9 ];
            for (let i = 0; i < points.length; i++) {
                const x = pointObjects[i].cx.baseVal.value / bigPicWidth;
                const y = pointObjects[i].cy.baseVal.value / bigPicWidth;
                const r = pointObjects[i].r.baseVal.value / bigPicWidth;
                if (Math.sqrt((x - relativeX)**2 + (y - relativeY)**2) <= r) {
                    relativeX = x;
                    relativeY = y;
                    break;
                }
            }
        } else {
            const bigPicPoint1 = document.getElementById("big-pic-point1");
            const x = bigPicPoint1.cx.baseVal.value / bigPicWidth;
            const y = bigPicPoint1.cy.baseVal.value / bigPicWidth;
            const r = bigPicPoint1.r.baseVal.value / bigPicWidth;
            if (Math.sqrt((x - relativeX)**2 + (y - relativeY)**2) <= r) draggingInBigPic = true;
        }

        if (0.02 <= relativeX && relativeX <= 0.48 && 0.02 <= relativeY && relativeY <= 0.48) {
            if (quad != 2) { quad = 2; updateBackground(); }
            else quad = 2;
            const newX1 = 6 * (relativeX - 0.04) / 0.42;
            const newX2 = 6 - 6 * (relativeY - 0.04) / 0.42;
            const x1coord = document.getElementById("x1coord");
            const x2coord = document.getElementById("x2coord");
            x1coord.value = newX1;
            x2coord.value = newX2;
            enRoute = false;
        } else if (0.52 <= relativeX && relativeX <= 0.98 && 0.02 <= relativeY && relativeY <= 0.48) {
            if (quad != 1) { quad = 1; updateBackground(); }
            else quad = 1;
            const newX1 = 6 * (relativeX - 0.54) / 0.42;
            const newX2 = 6 - 6 * (relativeY - 0.04) / 0.42;
            const x1coord = document.getElementById("x1coord");
            const x2coord = document.getElementById("x2coord");
            x1coord.value = newX1;
            x2coord.value = newX2;
            enRoute = false;
        } else if (0.02 <= relativeX && relativeX <= 0.48 && 0.52 <= relativeY && relativeY <= 0.98) {
            if (quad != 3) { quad = 3; updateBackground(); }
            else quad = 3;
            const newX1 = 6 * (relativeX - 0.04) / 0.42;
            const newX2 = 6 - 6 * (relativeY - 0.54) / 0.42;
            const x1coord = document.getElementById("x1coord");
            const x2coord = document.getElementById("x2coord");
            x1coord.value = newX1;
            x2coord.value = newX2;
            enRoute = false;
        } else if (0.52 <= relativeX && relativeX <= 0.98 && 0.52 <= relativeY && relativeY <= 0.98) {
            if (quad != 4) { quad = 4; updateBackground(); }
            else quad = 4;
            const newX1 = 6 * (relativeX - 0.54) / 0.42;
            const newX2 = 6 - 6 * (relativeY - 0.54) / 0.42;
            const x1coord = document.getElementById("x1coord");
            const x2coord = document.getElementById("x2coord");
            x1coord.value = newX1;
            x2coord.value = newX2;
            enRoute = false;
        }
    }
}

function take(array, rank) {
    const sortedArray = [...array].sort((a, b) => a - b);
    return sortedArray[rank];
}

function sideWidth(side) {
    const totalA = matrixA.reduce((accumulator, currentValue) => accumulator + currentValue, 0);
    const totalB = matrixB.reduce((accumulator, currentValue) => accumulator + currentValue, 0);
    switch (side) {
        case 1:
            return (totalB - 6)/12;
        case 2:
            return (totalA - 6)/12;
        case 3:
            return (18 - totalB)/12;
        case 4:
            return (18 - totalA)/12;
    }
}

function growBox(e) {
    const x1coord = document.getElementById("x1coord");
    const x2coord = document.getElementById("x2coord");
    const b1coord = document.getElementById("b1coord");
    const b2coord = document.getElementById("b2coord");

    const bigDiagram = document.getElementById("big-diagram");
    const rect = bigDiagram.getBoundingClientRect();
    if (rect.width == 0) {
        return;
    }
    const fullWidth = bigDiagram.getBoundingClientRect().width;
    const padding = 0.1*fullWidth;
    const width = fullWidth - 2*padding;
    const relativeX = e.offsetX - padding;
    const relativeY = e.offsetY - padding;
    const x = relativeX / width * 6;
    const y = (1 - relativeY / width) * 6;

    if (x <= 6 && x >= 0 && y <= 6 && y >= 0) {
        x1V = 0;
        x2V = 0;
        b1V = 0;
        b2V = 0;

        enRoute = true;
        const ver1 = take(matrixA, 1);
        const ver2 = take(matrixA, 2);
        const hor1 = take(matrixB, 1);
        const hor2 = take(matrixB, 2);
        if (x > ver2) destination[2] = 6;
        else destination[2] = 0;
        if (x > ver1) destination[0] = 0;
        else destination[0] = 6;
        if (y > hor2) destination[3] = 6;
        else destination[3] = 0;
        if (y > hor1) destination[1] = 0;
        else destination[1] = 6;

        startPoint[0] = take(matrixA,1);
        startPoint[1] = take(matrixB,1);
        startPoint[2] = +b1coord.value;
        startPoint[3] = +b2coord.value;
        startPoint[4] = +x1coord.value;
        startPoint[5] = +x2coord.value;
        animTime = 0;
    }
}

function fromNearestRed(x, distance) {
    const nearestRed = Math.round((x+1) / 2) * 2 - 1;
    if (x < nearestRed) return nearestRed - distance;
    else return nearestRed + distance;
}

function placePoint(point, q, x1, x2) {
    const bigPicture = document.getElementById("big-picture");
    const bigPictureWidth = bigPicture.width.baseVal.value;
    switch (q) {
        case 1:
            point.cx.baseVal.value = (0.54 + x1/6*0.42)*bigPictureWidth;
            point.cy.baseVal.value = (0.46 - x2/6*0.42)*bigPictureWidth;
            break;
        case 2:
            point.cx.baseVal.value = (0.04 + x1/6*0.42)*bigPictureWidth;
            point.cy.baseVal.value = (0.46 - x2/6*0.42)*bigPictureWidth;
            break;
        case 3:
            point.cx.baseVal.value = (0.04 + x1/6*0.42)*bigPictureWidth;
            point.cy.baseVal.value = (0.96 - x2/6*0.42)*bigPictureWidth;
            break;
        case 4:
            point.cx.baseVal.value = (0.54 + x1/6*0.42)*bigPictureWidth;
            point.cy.baseVal.value = (0.96 - x2/6*0.42)*bigPictureWidth;
            break;
    }
}

function payoff([a1,b1,c1,d1], [a2,b2,c2,d2]) {
    const error = 0.00001;
    if (a2 - b2 > error && c2 - d2 > error) {
        return Math.max(a1, c1);
    } else if (b2 - a2 > error && d2 - c2 > error) {
        return Math.max(b1, d1);
    } else if (a1 - c1 > error && b1 - d1 > error) {
        if (a2 - b2 > error) return a1;
        else return b1;
    } else if (c1 - a1 > error && d1 - b1 > error) {
        if (c2 - d2 > error) return c1;
        else return d1;
    } else {
        return mixedPayoff([a1,b1,c1,d1]);
    }
}

function equilibrium([a1,b1,c1,d1], [a2,b2,c2,d2]) {
    const error = 0.00001;
    if (a2 - b2 > error && c2 - d2 > error) {
        if (a1 - c1 > error) return 1;
        else return 0;
    } else if (b2 - a2 > error && d2 - c2 > error) {
        if (b1 - d1 > error) return 1;
        else return 0;
    } else if (a1 - c1 > error && b1 - d1 > error) {
        if (a2 - b2 > error) return 1;
        else return 1;
    } else if (c1 - a1 > error && d1 - b1 > error) {
        if (c2 - d2 > error) return 0;
        else return 0;
    } else {
        return mixedEquilibrium([a2,b2,c2,d2]);
    }
}

function payoffModified([a1,b1,c1,d1], [a2,b2,c2,d2]) {
    const error = 0.000001;
    if (a2 - b2 > error && c2 - d2 > error) {
        return Math.max(a1, c1);
    } else if (b2 - a2 > error && d2 - c2 > error) {
        return Math.max(b1, d1);
    } else if (a1 - c1 > error && b1 - d1 > error) {
        if (a2 - b2 > error) return a1;
        else return b1;
    } else if (c1 - a1 > error && d1 - b1 > error) {
        if (c2 - d2 > error) return c1;
        else return d1;
    }
    if (a1 - c1 > error && a2 - b2 > error && d1 - b1 > error && d2 - c2 > error) {
        if ((a1-c1)*(a2-b2) - (d1-b1)*(d2-c2) > error) return a1;
        else return d1;
    } else if (b1 - d1 > error && b2 - a2 > error && c1 - a1 > error && c2 - d2 > error) {
        if ((b1-d1)*(b2-a2) - (c1-a1)*(c2-d2) > error) return b1;
        else return c1;
    }
    return mixedPayoff([a1,b1,c1,d1]);
}

function payoffTransferable(m1, m2) {
    const error = 0.00001;
    let biggestEntry = 0;
    let max = m1[0]+m2[0];
    for (let i = 1; i < 4; i++) {
        if (max < m1[i]+m2[i] - error) {
            biggestEntry = i;
            max = m1[i]+m2[i];
        }
    }

    return max/2;
}

function payoffShapley(m1, m2) {
    const error = 0.00001;
    let biggestEntry = 0;
    let max = m1[0]+m2[0];
    for (let i = 1; i < 4; i++) {
        if (max < m1[i]+m2[i] - error) {
            biggestEntry = i;
            max = m1[i]+m2[i];
        }
    }
    let rowBackstop = 0;
    let colBackstop = 0;
    if (Math.min(m1[0],m1[1]) < Math.min(m1[2],m1[3])) rowBackstop = Math.min(m1[2],m1[3]);
    else rowBackstop = Math.min(m1[0],m1[1]);
    if (Math.min(m2[0],m2[2]) < Math.min(m2[1],m2[3])) colBackstop = Math.min(m2[1],m2[3]);
    else colBackstop = Math.min(m2[0],m2[2]);

    return (max + rowBackstop - colBackstop)/2;
}

function payoffCoco(m1, m2) {
    const newM1 = [m1[0]-m2[0], m1[1]-m2[1], m1[2]-m2[2], m1[3]-m2[3]];
    const newM2 = [m2[0]-m1[0], m2[1]-m1[1], m2[2]-m1[2], m2[3]-m1[3]];
    const zeroSumPayoff = payoff(newM1, newM2);
    const error = 0.00001;
    let biggestEntry = 0;
    let max = m1[0]+m2[0];
    for (let i = 1; i < 4; i++) {
        if (max < m1[i]+m2[i] - error) {
            biggestEntry = i;
            max = m1[i]+m2[i];
        }
    }
    return (max + zeroSumPayoff)/2;
}

function payoffBargainingBackstop(m1, m2) {
    // console.log("check");
    let rowBackstop = 0;
    let colBackstop = 0;
    if (Math.min(m1[0],m1[1]) < Math.min(m1[2],m1[3])) rowBackstop = Math.min(m1[2],m1[3]);
    else rowBackstop = Math.min(m1[0],m1[1]);
    if (Math.min(m2[0],m2[2]) < Math.min(m2[1],m2[3])) colBackstop = Math.min(m2[1],m2[3]);
    else colBackstop = Math.min(m2[0],m2[2]);

    let vertices = [];
    for (let i = 0; i < 4; i++) {
        let pareto = true;
        for (let j = 0; j < 4; j++) {
            if (m1[i] < m1[j] && m2[i] < m2[j]) {
                pareto = false;
                break;
            }
        }
        if (pareto) vertices.push(i);
    }

    let return1 = m1[vertices[0]];
    let max = -10000;
    for (let n = 0; n < vertices.length; n++) {
        for (let m = n + 1; m < vertices.length; m++) {
            const i = vertices[n];
            const j = vertices[m];
            const x1 = m1[i] - rowBackstop;
            const x2 = m1[j] - rowBackstop;
            const y1 = m2[i] - colBackstop;
            const y2 = m2[j] - colBackstop;
            if (y1 == y2 || x1 == x2){ console.log("error!"); return 0; }
            // maximizing   (x1*t+x2*(1-t))*(y1*t+y2*(1-t))
            // derivative   (x1*t+x2*(1-t))*(y1-y2)+(y1*t+y2*(1-t))*(x1-x2) = 0
            // solve        t*(x1-x2)*(y1-y2)*2+x2*(y1-y2)+y2*(x1-x2) = 0
            //              t = (x2*(y1-y2)+y2*(x1-x2))/((x1-x2)*(y1-y2)*2)
            const t = -(x2*(y1-y2)+y2*(x1-x2))/((x1-x2)*(y1-y2)*2);
            const value1 = x1*y1;
            const value2 = x2*y2;
            const value3 = (t < 1 && t > 0 && (x1*t+x2*(1-t))>0 && (y1*t+y2*(1-t))>0) ? (x1*t+x2*(1-t))*(y1*t+y2*(1-t)) : -1;
            // console.log(i + " " + j + ": " + value1.toFixed(1) + " " + value2.toFixed(1) + " " + value3.toFixed(1) + " " + t.toFixed(2));
            if (value1 >= max && value1 >= value2 && value1 >= value3) {
                max = value1;
                return1 = m1[i];
                // console.log(i + ": " + value1);
            } else if (value2 >= max && value2 >= value3) {
                max = value2;
                return1 = m1[j];
                // console.log(j + ": " + value2);
            } else if (value3 >= max) {
                max = value3;
                return1 = m1[i]*t + m1[j]*(1-t);
                // console.log(i + "-" + j + ": " + value3);
            }
        }
    }
    // console.log("");
    // if (max == 0) return 8;
    return return1;
}

function payoffBargainingDisagreement(m1, m2) {
    const newM1 = [m1[0]-m2[0], m1[1]-m2[1], m1[2]-m2[2], m1[3]-m2[3]];
    const newM2 = [m2[0]-m1[0], m2[1]-m1[1], m2[2]-m1[2], m2[3]-m1[3]];
    const rowEquilibrium = equilibrium(newM1, newM2);
    const colEquilibrium = 1-equilibrium(flip(newM2), flip(newM1));
    const rowDisagreement = rowEquilibrium*colEquilibrium*m1[0] + rowEquilibrium*(1-colEquilibrium)*m1[1] + (1-rowEquilibrium)*colEquilibrium*m1[2] + (1-rowEquilibrium)*(1-colEquilibrium)*m1[3];
    const colDisagreement = rowEquilibrium*colEquilibrium*m2[0] + rowEquilibrium*(1-colEquilibrium)*m2[1] + (1-rowEquilibrium)*colEquilibrium*m2[2] + (1-rowEquilibrium)*(1-colEquilibrium)*m2[3];

    let equilibriumPoint = -1;
    if (rowEquilibrium == 1 && colEquilibrium == 1) {
        equilibriumPoint = 0;
    } else if (rowEquilibrium == 1 && colEquilibrium == 0) {
        equilibriumPoint = 1;
    } else if (rowEquilibrium == 0 && colEquilibrium == 1) {
        equilibriumPoint = 2;
    } else if (rowEquilibrium == 0 && colEquilibrium == 0) {
        equilibriumPoint = 3;
    }

    let vertices = [];
    for (let i = 0; i < 4; i++) {
        let pareto = true;
        for (let j = 0; j < 4; j++) {
            if (m1[i] < m1[j] && m2[i] < m2[j]) {
                pareto = false;
                break;
            }
        }
        if (pareto) {
            if (i == equilibriumPoint) return rowDisagreement;
            vertices.push(i);
        }
    }

    let return1 = m1[vertices[0]];
    let max = -10000;
    for (let n = 0; n < vertices.length; n++) {
        for (let m = n + 1; m < vertices.length; m++) {
            const i = vertices[n];
            const j = vertices[m];
            const x1 = m1[i] - rowDisagreement;
            const x2 = m1[j] - rowDisagreement;
            const y1 = m2[i] - colDisagreement;
            const y2 = m2[j] - colDisagreement;
            if (y1 == y2 || x1 == x2){ console.log("error!"); return 0; }
            const t = -(x2*(y1-y2)+y2*(x1-x2))/((x1-x2)*(y1-y2)*2);
            const value1 = x1*y1;
            const value2 = x2*y2;
            const value3 = (t < 1 && t > 0 && (x1*t+x2*(1-t))>0 && (y1*t+y2*(1-t))>0) ? (x1*t+x2*(1-t))*(y1*t+y2*(1-t)) : -1;
            // console.log(rowDisagreement + "," + colDisagreement);
            // console.log(i + " " + j + ": " + value1.toFixed(1) + " " + value2.toFixed(1) + " " + value3.toFixed(1) + " " + t.toFixed(2));
            if (value1 >= max && value1 >= value2 && value1 >= value3) {
                max = value1;
                return1 = m1[i];
                // console.log(i + ": " + value1);
            } else if (value2 >= max && value2 >= value3) {
                max = value2;
                return1 = m1[j];
                // console.log(j + ": " + value2);
            } else if (value3 >= max) {
                max = value3;
                return1 = m1[i]*t + m1[j]*(1-t);
                // console.log(i + "-" + j + ": " + value3);
            }
        }
    }
    // console.log("");
    // if (max == 0) return 8;
    return return1;
}

function payoffCustom(m1, m2) {
    const choice1 = document.getElementById("view-custom-1").value;
    const choice2 = document.getElementById("view-custom-2").value;
    let value1 = 0;
    let value2 = 0;

    if (choice1 == "returns") {
        value1 = payoffModified(m1,m2);
    } else if (choice1 == "returns-mixed") {
        value1 = payoff(m1,m2);
    } else if (choice1 == "returns-shapley") {
        value1 = payoffTransferable(m1,m2);
    } else if (choice1 == "returns-coco") {
        value1 = payoffCoco(m1,m2);
    } else if (choice1 == "returns-bargaining-bs") {
        value1 = payoffBargainingBackstop(m1,m2);
    } else if (choice1 == "returns-bargaining-tp") {
        value1 = payoffBargainingDisagreement(m1,m2);
    }

    if (choice2 == "returns") {
        value2 = payoffModified(m1,m2);
    } else if (choice2 == "returns-mixed") {
        value2 = payoff(m1,m2);
    } else if (choice2 == "returns-shapley") {
        value2 = payoffTransferable(m1,m2);
    } else if (choice2 == "returns-coco") {
        value2 = payoffCoco(m1,m2);
    } else if (choice2 == "returns-bargaining-bs") {
        value2 = payoffBargainingBackstop(m1,m2);
    } else if (choice2 == "returns-bargaining-tp") {
        value2 = payoffBargainingDisagreement(m1,m2);
    }

    return (value1 - value2)/2+3;
}

function coordination(m1, m2) {
    const newM1 = [m1[0]+m2[0], m1[1]+m2[1], m1[2]+m2[2], m1[3]+m2[3]];
    const newM2 = [m2[0]-m1[0], m2[1]-m1[1], m2[2]-m1[2], m2[3]-m1[3]];
    const mean1 = (newM1[0]+newM1[1]+newM1[2]+newM1[3])/4;
    const mean2 = (newM2[0]+newM2[1]+newM2[2]+newM2[3])/4;
    const norm1 = (m1[0]-mean1)**2 + (m1[1]-mean1)**2 + (m1[2]-mean1)**2 + (m1[3]-mean1)**2;
    const norm2 = (m2[0]-mean2)**2 + (m2[1]-mean2)**2 + (m2[2]-mean2)**2 + (m2[3]-mean2)**2;
    return ((norm1 / (norm1 + norm2))*6-3)*5+3;
}

function colorFunction(value) {
    const colors = [[255,100,100],[170,170,170],[100,255,150],[255,255,255],[255,255,255]];
    const cutoffs = [0,0.5,1,1.5,2];
    const result = [0,0,0];
    for (let i = 1; i <= cutoffs.length; i++) {
        if (value <= cutoffs[i]) {
            for (let j = 0; j < 3; j++) result[j] = Math.floor((1-(value-cutoffs[i-1])/(cutoffs[i]-cutoffs[i-1]))*colors[i-1][j] + (value-cutoffs[i-1])/(cutoffs[i]-cutoffs[i-1])*colors[i][j]);
        return result;
        }
    }
}

function changeViewMode(mode) {
    viewMode = mode;
    const canvas = document.getElementById("canvas");
    if (mode == 0) {
        canvas.style.display = "none";
        canvas.width = 0;
        canvas.height = 0;
        canvas.x = 0;
        canvas.y = 0;
    } else {
        canvas.style.display = "";
        switchMode = true;
        backgroundOutOfDate = true;
    }

    const curButton = document.getElementsByClassName("selected")[1];
    curButton.classList.remove("selected");
    switch (mode) {
        case 0:
            document.getElementById("regular-mode").classList.add("selected");
            break;
        case 1:
            document.getElementById("return-mode-1").classList.add("selected");
            break;
        case 2:
            document.getElementById("transferable-mode").classList.add("selected");
            break;
        case 3:
            document.getElementById("return-mode-2").classList.add("selected");
            break;
        case 4:
            document.getElementById("coco-mode").classList.add("selected");
            break;
        case 5:
            document.getElementById("bargaining-mode-1").classList.add("selected");
            break;
        case 6:
            document.getElementById("bargaining-mode-2").classList.add("selected");
            break;
        case 7:
            document.getElementById("custom-mode").classList.add("selected");
            break;
        case 8:
            document.getElementById("coordination-mode").classList.add("selected");
            break;
        case 9:
            document.getElementById("shapley-mode").classList.add("selected");
            break;
    }
    if (mode == 7) {
        viewModeVolatile = true;
    } else {
        viewModeVolatile = false;
    }
}

function fixImage() {
    backgroundOutOfDate = true;
    fixImageSize = !fixImageSize;
    const fixImageButton = document.getElementById("fix-image-button");
    if (fixImageSize) fixImageButton.innerHTML = "Unfix image size";
    else fixImageButton.innerHTML = "Fix image size";
}