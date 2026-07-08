// import { Game } from 'game.js';
const PI = 3.1415926535897932385;

let matrixA = [0,0,0,0];
let matrixB = [1,2,3,4];
let coords = [3.5,3.5,2,2];
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
let draggingB1 = false;
let draggingB2 = false;
let startPoint = [0,0,0,0,0,0]; // r1,r2,b1,b2,x1,x2
let destination = [0,0,0,0]; // r1,r2,b1,b2
let animTime = 0;
let enRoute = false;
let draggingInBigPic = false;
let viewMode = 0;
let viewModeP1 = true;
let time = 0;
let values = [];
let valuesX = 0;
let valuesY = 0;
let backgroundOutOfDate = true;
let switchMode = false;
let fixImageSize = false;
let viewModeVolatile = false;
let updateRequired = false;
let draggingRhombus1 = false;
let draggingRhombus2 = false;
let useAltSchema = false;
let diagramGrid = false;
let showAllReturns = false;
let showAllReturnsAlways = false;
let nearestCentroid = [0,0];

let disagree = [0,0];
let bargainingReturns = [[0,0],[0,0],[0,0],[0,0]];

const lineWidth = 0.08;
const lineWidthBig = 0.04;
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
const brown = "#7c4700";
const lightBrown = "#ac7020";
const dashedStroke = "10,10";
const animationFrames = 70;
const points = [];
const blueLinePadding = 15;
const birhombicPadding = 20;
let xWidth = 0;

window.ondragstart = function() { return false; };

class Game {
    #row_matrix;
    #col_matrix;
    #quadrant;
    #x1; #b1; #x2; #b2;

    constructor(x1,x2,b1,b2,q) {
        this.#x1 = x1;
        this.#x2 = x2;
        this.#b1 = b1;
        this.#b2 = b2;
        this.#quadrant = q;
    }

    get matrices() {
        if (this.#row_matrix === undefined && this.#col_matrix === undefined) {
            var a = Math.max(this.#x1 % 2 - 1,0);
            var aa = Math.max(1 - (this.#x1 % 2),0);
            var b = Math.max(this.#x2 % 2 - 1,0);
            var bb = Math.max(1 - (this.#x2 % 2),0);
            this.#row_matrix = [0,6,0,0];
            this.#col_matrix = [0,6,0,0];
            switch (Math.floor(this.#x1/2)%3) {
                case 0:
                    this.#row_matrix[2] = 6 - this.#b1;
                    this.#row_matrix[3] = (6 - this.#b1) * a;
                    this.#row_matrix[0] = (6 - this.#b1) * aa;
                    break;
                case 1:
                    this.#row_matrix[3] = 6 - this.#b1;
                    this.#row_matrix[0] = (6 - this.#b1) * a;
                    this.#row_matrix[2] = (6 - this.#b1) * aa;
                    break;
                case 2:
                    this.#row_matrix[0] = 6 - this.#b1;
                    this.#row_matrix[2] = (6 - this.#b1) * a;
                    this.#row_matrix[3] = (6 - this.#b1) * aa;
                    break;
            }
            switch (Math.floor(this.#x2/2)%3) {
                case 0:
                    this.#col_matrix[2] = 6 - this.#b2;
                    this.#col_matrix[0] = (6 - this.#b2) * b;
                    this.#col_matrix[3] = (6 - this.#b2) * bb;
                    break;
                case 1:
                    this.#col_matrix[0] = 6 - this.#b2;
                    this.#col_matrix[3] = (6 - this.#b2) * b;
                    this.#col_matrix[2] = (6 - this.#b2) * bb;
                    break;
                case 2:
                    this.#col_matrix[3] = 6 - this.#b2;
                    this.#col_matrix[2] = (6 - this.#b2) * b;
                    this.#col_matrix[0] = (6 - this.#b2) * bb;
                    break;
            }
        }
        if (this.#quadrant == 2 || this.#quadrant == 3) {
            this.#row_matrix = [this.#row_matrix[2],this.#row_matrix[3],this.#row_matrix[0],this.#row_matrix[1]];
        }
        if (this.#quadrant == 4 || this.#quadrant == 3) {
            this.#col_matrix = [this.#col_matrix[1],this.#col_matrix[0],this.#col_matrix[3],this.#col_matrix[2]];
        }
        return [this.#row_matrix, this.#col_matrix];
    }
}

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

    // Initialize blue lines
    const blueLine1 = document.getElementById("blue-line-1");
    const blueLine2 = document.getElementById("blue-line-2");
    const blueCorner1 = document.getElementById("blue-corner-1");
    const blueCorner2 = document.getElementById("blue-corner-2");
    blueLine1.style.stroke = "black";
    blueLine2.style.stroke = "black";
    blueCorner1.style.fill = "black";
    blueCorner2.style.fill = "black";
    blueCorner2.style.display = "none";

    // Initialize big-diagram
    const bigDiagram = document.getElementById("big-diagram");
    const line1Big = document.getElementById("line1-big");
    const line2Big = document.getElementById("line2-big");
    const line3Big = document.getElementById("line3-big");
    const line4Big = document.getElementById("line4-big");
    const line5Big = document.getElementById("line5-big");
    const line6Big = document.getElementById("line6-big");
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
    const smallRedLine1 = document.getElementById("small-red-line-1");
    const smallRedLine2 = document.getElementById("small-red-line-2");
    const smallGreenLine1 = document.getElementById("small-green-line-1");
    const smallGreenLine2 = document.getElementById("small-green-line-2");
    const smallBlueLine1 = document.getElementById("small-blue-line-1");
    const smallBlueLine2 = document.getElementById("small-blue-line-2");
    const smallCorner = document.getElementById("small-corner");
    const redBox = document.getElementById("red-box");
    const greenBox = document.getElementById("green-box");
    const blueBox = document.getElementById("blue-box");
    const transUtilBoundary = document.getElementById("transferable-util-boundary");

    const bigDiagramWidth = bigDiagram.width.baseVal.value;
    const bigDiagramHeight = bigDiagram.height.baseVal.value;
    const paddingBig1 = 0.32*bigDiagramWidth;
    const paddingBig2 = 0.04*bigDiagramWidth;
    const widthBig = bigDiagramWidth - paddingBig1 - paddingBig2;
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
    line5Big.style.stroke = noLine;
    line5Big.style.strokeWidth = lineWidthBig*widthBig;
    line5Big.style.opacity = 0.6;
    line6Big.style.stroke = noLine;
    line6Big.style.strokeWidth = lineWidthBig*widthBig;
    line6Big.style.opacity = 0.6;
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
    smallLine1.x1.baseVal.value = paddingBig2;
    smallLine1.x2.baseVal.value = bigDiagramWidth - paddingBig1;
    smallLine1.y1.baseVal.value = paddingBig1;
    smallLine1.y2.baseVal.value = paddingBig1;
    smallLine2.x1.baseVal.value = bigDiagramWidth - paddingBig1;
    smallLine2.x2.baseVal.value = bigDiagramWidth - paddingBig1;
    smallLine2.y1.baseVal.value = paddingBig1;
    smallLine2.y2.baseVal.value = bigDiagramWidth - paddingBig2;
    smallLine3.x1.baseVal.value = paddingBig2;
    smallLine3.x2.baseVal.value = bigDiagramWidth - paddingBig1;
    smallLine3.y1.baseVal.value = bigDiagramWidth - paddingBig2;
    smallLine3.y2.baseVal.value = bigDiagramWidth - paddingBig2;
    smallLine4.x1.baseVal.value = paddingBig2;
    smallLine4.x2.baseVal.value = paddingBig2;
    smallLine4.y1.baseVal.value = paddingBig1;
    smallLine4.y2.baseVal.value = bigDiagramWidth - paddingBig2;
    smallLine5.x1.baseVal.value = paddingBig2;
    smallLine5.x2.baseVal.value = bigDiagramWidth - paddingBig1;
    smallLine6.x1.baseVal.value = paddingBig2;
    smallLine6.x2.baseVal.value = bigDiagramWidth - paddingBig1;
    smallLine7.y1.baseVal.value = paddingBig1;
    smallLine7.y2.baseVal.value = bigDiagramWidth - paddingBig2;
    smallLine8.y1.baseVal.value = paddingBig1;
    smallLine8.y2.baseVal.value = bigDiagramWidth - paddingBig2;
    const smallRGBLineWidth = smallLineWidth*5;
    smallRedLine1.style.stroke = "red";
    smallRedLine1.style.strokeWidth = smallRGBLineWidth;
    smallRedLine2.style.stroke = "red";
    smallRedLine2.style.strokeWidth = smallRGBLineWidth;
    smallGreenLine1.style.stroke = "green";
    smallGreenLine1.style.strokeWidth = smallRGBLineWidth;
    smallGreenLine2.style.stroke = "green";
    smallGreenLine2.style.strokeWidth = smallRGBLineWidth;
    smallBlueLine1.style.stroke = "blue";
    smallBlueLine1.style.strokeWidth = smallRGBLineWidth;
    smallBlueLine2.style.stroke = "blue";
    smallBlueLine2.style.strokeWidth = smallRGBLineWidth;
    smallCorner.style.fill = "red";
    smallCorner.r.baseVal.value = smallRGBLineWidth/2;

    transUtilBoundary.style.stroke = brown;
    transUtilBoundary.style.strokeWidth = lineWidthBig*widthBig;
    transUtilBoundary.style.strokeOpacity = 0;
    transUtilBoundary.x1.baseVal.value = 0;
    transUtilBoundary.y2.baseVal.value = widthBig+paddingBig1+paddingBig2;

    redBox.style.fill = "red";
    redBox.style.opacity = 0.5;
    greenBox.style.fill = "green";
    greenBox.style.opacity = 0.5;
    blueBox.style.fill = "blue";
    blueBox.style.opacity = 0.5;

    const disagreementPoint = document.getElementById("disagreement-point");
    const bargainingPoint1 = document.getElementById("bargaining-returns-1");
    const bargainingPoint2 = document.getElementById("bargaining-returns-2");
    const bargainingPoint3 = document.getElementById("bargaining-returns-3");
    const bargainingPoint4 = document.getElementById("bargaining-returns-4");
    const bargainingPoint3poly = document.getElementById("bargaining-returns-3-poly");
    const bargainingPoint4poly = document.getElementById("bargaining-returns-4-poly");
    const bargainingLine = document.getElementById("bargaining-line");
    disagreementPoint.r.baseVal.value = lineWidthBig*widthBig*0.55;
    disagreementPoint.style.fill = brown;
    bargainingPoint1.r.baseVal.value = lineWidthBig*widthBig*0.7;
    bargainingPoint1.style.fill = brown;
    bargainingPoint2.r.baseVal.value = lineWidthBig*widthBig*0.7;
    bargainingPoint2.style.fill = lightBrown;
    bargainingPoint3.style.fill = brown;
    bargainingPoint4.style.fill = lightBrown;
    bargainingLine.style.stroke = brown;
    bargainingLine.style.strokeWidth = lineWidthBig*widthBig*0.6;

    xWidth = lineWidthBig*widthBig*2;
    const xParameter = 4;
    // const str = (xWidth) + "," + (xWidth-xParameter) + " " + 
    //     (xWidth/2+xParameter) + "," + (xWidth/2) + " " + 
    //     (xWidth) + "," + (xParameter) + " " + 
    //     (xWidth-xParameter) + "," + (0) + " " + 
    //     (xWidth/2) + "," + (xWidth/2-xParameter) + " " + 
    //     (xParameter) + "," + (0) + " " + 
    //     (0) + "," + (xParameter) + " " + 
    //     (xWidth/2-xParameter) + "," + (xWidth/2) + " " + 
    //     (0) + "," + (xWidth-xParameter) + " " + 
    //     (xParameter) + "," + (xWidth) + " " + 
    //     (xWidth/2) + "," + (xWidth/2+xParameter) + " " + 
    //     (xWidth-xParameter) + "," + (xWidth);
    const str = (xWidth/2-xParameter/2) + "," + (0) + " " + 
        (xWidth/2+xParameter/2) + "," + (0) + " " + 
        (xWidth/2+xParameter/2) + "," + (xWidth/2-xParameter/2) + " " + 
        (xWidth) + "," + (xWidth/2-xParameter/2) + " " + 
        (xWidth) + "," + (xWidth/2+xParameter/2) + " " + 
        (xWidth/2+xParameter/2) + "," + (xWidth/2+xParameter/2) + " " + 
        (xWidth/2+xParameter/2) + "," + (xWidth) + " " + 
        (xWidth/2-xParameter/2) + "," + (xWidth) + " " + 
        (xWidth/2-xParameter/2) + "," + (xWidth/2+xParameter/2) + " " + 
        (0) + "," + (xWidth/2+xParameter/2) + " " + 
        (0) + "," + (xWidth/2-xParameter/2) + " " + 
        (xWidth/2-xParameter/2) + "," + (xWidth/2-xParameter/2);
    bargainingPoint3poly.setAttribute("points",str);
    bargainingPoint4poly.setAttribute("points",str);

    disagreementPoint.style.fillOpacity = 0;
    bargainingPoint1.style.fillOpacity = 0;
    bargainingPoint2.style.fillOpacity = 0;
    bargainingPoint3.style.fillOpacity = 0;
    bargainingPoint4.style.fillOpacity = 0;
    bargainingLine.style.strokeOpacity = 0;

    const container = document.getElementById("container");
    const maxPicWidth = (container.width.baseVal.value - diagram.width.baseVal.value);
    const maxPicHeight = (container.height.baseVal.value - diagram.height.baseVal.value);
    const minPicPadding1 = (container.width.baseVal.value-maxPicWidth)/2;
    const minPicPadding2 = (container.height.baseVal.value-maxPicHeight)/2;

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

    const backdrop = document.getElementById("backdrop");
    backdrop.style.fill = "#eee";

    const brRowPlayerPoly = document.getElementById("br-row-player-poly");
    const brColPlayerPoly = document.getElementById("br-col-player-poly");

    document.addEventListener('mousedown', (e) => { changeCoords(e); isMouseDown = true; });
    document.addEventListener('mouseup', () => {
        draggingB1 = false;
        draggingB2 = false;
        draggingRhombus1 = false;
        draggingRhombus2 = false;
        isMouseDown = false;
        backgroundOutOfDate = true;
    });
    document.addEventListener('mousemove', (e) => {
        if (isMouseDown) {
            changeCoords(e);
        }
        // if (!showAllReturnsAlways && document.elementsFromPoint(e.clientX, e.clientY).includes(document.getElementById("big-diagram"))) {
        //     showAllReturns = true;
        // } else if (!showAllReturnsAlways) {
        //     showAllReturns = false;
        // }
    });
    brRowPlayerPoly.addEventListener("mousedown", (e) => {
        draggingRhombus1 = true;
    });
    brColPlayerPoly.addEventListener("mousedown", (e) => {
        draggingRhombus2 = true;
    });
    bigDiagram.addEventListener('mousedown', (e) => { growBox(e); });

    document.getElementById("view-custom-1").addEventListener('change', (event) => {
        if (viewMode == 7) {
            backgroundOutOfDate = true;
            updateBigPicCanvas(payoffCustom);
            const select1 = document.getElementById("view-custom-1");
            const select2 = document.getElementById("view-custom-2");
            document.getElementById("view-mode-label").innerHTML = "<span style=\"color:rgb(150,0,0)\">" + select1.getElementsByTagName("option")[select1.selectedIndex].innerHTML
                                                    + "</span> minus <span style=\"color:rgb(0,0,150)\">" + select2.getElementsByTagName("option")[select2.selectedIndex].innerHTML + "</span>";
        }
    });
    document.getElementById("view-custom-2").addEventListener('change', (event) => {
        if (viewMode == 7) {
            backgroundOutOfDate = true;
            updateBigPicCanvas((a,b)=>payoffCustom(flip(b),flip(a)));
            const select1 = document.getElementById("view-custom-1");
            const select2 = document.getElementById("view-custom-2");
            document.getElementById("view-mode-label").innerHTML = "<span style=\"color:rgb(150,0,0)\">" + select1.getElementsByTagName("option")[select1.selectedIndex].innerHTML
                                                    + "</span> minus <span style=\"color:rgb(0,0,150)\">" + select2.getElementsByTagName("option")[select2.selectedIndex].innerHTML + "</span>";
        }
    });

    const acc = 0.005;
    document.addEventListener('keydown', (e) => {
        // e.preventDefault();
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
                case "a":
                    b1up = true;
                    break;
                case "d":
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
                case "r":
                    randomGame();
                    break;
                case "v":
                    showAllReturnsAlways = !showAllReturnsAlways;
                    showAllReturns = showAllReturnsAlways;
                    break;
                case "c":
                    if (!useAltSchema) coords = [...nearestCentroid,2,2];
                    else coords = [...standardToAltCoords(...[...nearestCentroid,2,2]),2,2];
                    backgroundOutOfDate = true;
                    break;
                case "e":
                    exportPNG();
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
            case "a":
                b1up = false;
                updateCanvas();
                break;
            case "d":
                b1down = false;
                updateCanvas();
                break;
            case "w":
                b2up = false;
                updateCanvas();
                break;
            case "s":
                b2down = false;
                updateCanvas();
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

    // initialize birhombic picture
    const birhombicPic = document.getElementById("birhombic-pic");
    const brBlueLine1 = document.getElementById("br-blue-line-1");
    const brBlueLine2 = document.getElementById("br-blue-line-2");
    const brBlueLine3 = document.getElementById("br-blue-line-3");
    const brBlueLine4 = document.getElementById("br-blue-line-4");
    const brBlueLine5 = document.getElementById("br-blue-line-5");
    const brBlueLine6 = document.getElementById("br-blue-line-6");
    const brGreenLine1 = document.getElementById("br-green-line-1");
    const brGreenLine2 = document.getElementById("br-green-line-2");
    const brGreenLine3 = document.getElementById("br-green-line-3");
    const brGreenLine4 = document.getElementById("br-green-line-4");
    const brGreenLine5 = document.getElementById("br-green-line-5");
    const brGreenLine6 = document.getElementById("br-green-line-6");
    const brGreenLine7 = document.getElementById("br-green-line-7");
    const brGreenLine8 = document.getElementById("br-green-line-8");
    const brGreenLine9 = document.getElementById("br-green-line-9");
    const brRedLine1 = document.getElementById("br-red-line-1");
    const brRedLine2 = document.getElementById("br-red-line-2");
    const brRedLine3 = document.getElementById("br-red-line-3");
    const brRedLine4 = document.getElementById("br-red-line-4");
    const brRedLine5 = document.getElementById("br-red-line-5");
    const brRedLine6 = document.getElementById("br-red-line-6");
    const brRedLine7 = document.getElementById("br-red-line-7");
    const brBlueCorner1 = document.getElementById("br-blue-corner-1");
    const brBlueCorner2 = document.getElementById("br-blue-corner-2");
    const brBlueCorner3 = document.getElementById("br-blue-corner-3");
    const brBlueCorner4 = document.getElementById("br-blue-corner-4");
    const brRowPlayer = document.getElementById("br-row-player");
    const brColPlayer = document.getElementById("br-col-player");
    const brRowRect = document.getElementById("br-row-rect");
    const brColRect = document.getElementById("br-col-rect");
    const brRowStar = document.getElementById("br-row-player-poly");
    const brColStar = document.getElementById("br-col-player-poly");
    const brGreenBackground = document.getElementById("br-green-background");
    const brGoldBackground = document.getElementById("br-gold-background");
    const brCeruleanBackground = document.getElementById("br-cerulean-background");
    const brHex1 = document.getElementById("br-hex-1");
    const brHex2 = document.getElementById("br-hex-2");
    const brHex3 = document.getElementById("br-hex-3");

    const matrixClass1 = document.getElementById("matrix-class-number-1");
    const matrixClass2 = document.getElementById("matrix-class-number-2");
    const matrixClass3 = document.getElementById("matrix-class-number-3");
    const matrixClass4 = document.getElementById("matrix-class-number-4");
    const matrixClass5 = document.getElementById("matrix-class-number-5");
    const matrixClass6 = document.getElementById("matrix-class-number-6");
    const matrixClass7 = document.getElementById("matrix-class-number-7");
    const matrixClass8 = document.getElementById("matrix-class-number-8");
    const matrixClass9 = document.getElementById("matrix-class-number-9");
    const matrixClass10 = document.getElementById("matrix-class-number-10");
    const matrixClass11 = document.getElementById("matrix-class-number-11");
    const matrixClass12 = document.getElementById("matrix-class-number-12");
    const matrixClass13 = document.getElementById("matrix-class-number-13");
    const matrixClass14 = document.getElementById("matrix-class-number-14");
    const matrixClass15 = document.getElementById("matrix-class-number-15");

    const birhombicWidth = birhombicPic.width.baseVal.value;
    const birhombicHeight = birhombicPic.height.baseVal.value;
    const birhombicDiagramWidth = birhombicWidth - birhombicPadding*2;
    const birhombicDiagramHeight = birhombicDiagramWidth*Math.sqrt(3)/4;
    const birhombicDiagramPadding = (birhombicHeight - birhombicDiagramHeight)/2;
    const brLineWidth = 4;
    const starWidth = 24;

    brBlueLine1.style.stroke = "blue";
    brBlueLine2.style.stroke = "blue";
    brBlueLine3.style.stroke = "blue";
    brBlueLine4.style.stroke = "blue";
    brBlueLine5.style.stroke = "blue";
    brBlueLine6.style.stroke = "blue";
    brBlueLine1.style.strokeWidth = brLineWidth;
    brBlueLine2.style.strokeWidth = brLineWidth;
    brBlueLine3.style.strokeWidth = brLineWidth;
    brBlueLine4.style.strokeWidth = brLineWidth;
    brBlueLine5.style.strokeWidth = brLineWidth;
    brBlueLine6.style.strokeWidth = brLineWidth;
    brBlueCorner1.style.fill = "blue";
    brBlueCorner2.style.fill = "blue";
    brBlueCorner3.style.fill = "blue";
    brBlueCorner4.style.fill = "blue";
    brBlueCorner1.r.baseVal.value = brLineWidth/2;
    brBlueCorner2.r.baseVal.value = brLineWidth/2;
    brBlueCorner3.r.baseVal.value = brLineWidth/2;
    brBlueCorner4.r.baseVal.value = brLineWidth/2;
    brRedLine1.style.stroke = "red";
    brRedLine2.style.stroke = "red";
    brRedLine3.style.stroke = "red";
    brRedLine4.style.stroke = "red";
    brRedLine5.style.stroke = "red";
    brRedLine6.style.stroke = "red";
    brRedLine7.style.stroke = "red";
    brRedLine1.style.strokeWidth = brLineWidth;
    brRedLine2.style.strokeWidth = brLineWidth;
    brRedLine3.style.strokeWidth = brLineWidth;
    brRedLine4.style.strokeWidth = brLineWidth;
    brRedLine5.style.strokeWidth = brLineWidth;
    brRedLine6.style.strokeWidth = brLineWidth;
    brRedLine7.style.strokeWidth = brLineWidth;
    brGreenLine1.style.stroke = "green";
    brGreenLine2.style.stroke = "green";
    brGreenLine3.style.stroke = "green";
    brGreenLine4.style.stroke = "green";
    brGreenLine5.style.stroke = "green";
    brGreenLine6.style.stroke = "green";
    brGreenLine7.style.stroke = "green";
    brGreenLine8.style.stroke = "green";
    brGreenLine9.style.stroke = "green";
    brGreenLine1.style.strokeWidth = brLineWidth;
    brGreenLine2.style.strokeWidth = brLineWidth;
    brGreenLine3.style.strokeWidth = brLineWidth;
    brGreenLine4.style.strokeWidth = brLineWidth;
    brGreenLine5.style.strokeWidth = brLineWidth;
    brGreenLine6.style.strokeWidth = brLineWidth;
    brGreenLine7.style.strokeWidth = brLineWidth;
    brGreenLine8.style.strokeWidth = brLineWidth;
    brGreenLine9.style.strokeWidth = brLineWidth;

    brGreenBackground.style.fill = greenBackground;
    brGoldBackground.style.fill = goldBackground;
    brCeruleanBackground.style.fill = ceruleanBackground;

    brHex1.style.stroke = "black";
    brHex1.style.strokeWidth = brLineWidth;
    brHex1.style.fill = "none";
    brHex1.style.display = "none";
    brHex2.style.stroke = "black";
    brHex2.style.strokeWidth = brLineWidth;
    brHex2.style.fill = "none";
    brHex2.style.display = "none";
    brHex3.style.stroke = "black";
    brHex3.style.strokeWidth = brLineWidth;
    brHex3.style.fill = "none";
    brHex3.style.display = "none";

    brBlueLine1.x1.baseVal.value = birhombicPadding;
    brBlueLine1.y1.baseVal.value = (birhombicHeight + birhombicDiagramHeight)/2;
    brBlueLine1.x2.baseVal.value = birhombicWidth - birhombicPadding;
    brBlueLine1.y2.baseVal.value = (birhombicHeight + birhombicDiagramHeight)/2;
    brBlueLine2.x1.baseVal.value = birhombicDiagramWidth/4 + birhombicPadding;
    brBlueLine2.y1.baseVal.value = birhombicDiagramPadding;
    brBlueLine2.x2.baseVal.value = birhombicDiagramWidth*3/4 + birhombicPadding;
    brBlueLine2.y2.baseVal.value = birhombicDiagramPadding;
    brBlueLine3.x1.baseVal.value = birhombicPadding;
    brBlueLine3.y1.baseVal.value = (birhombicHeight + birhombicDiagramHeight)/2;
    brBlueLine3.x2.baseVal.value = birhombicDiagramWidth/4 + birhombicPadding;
    brBlueLine3.y2.baseVal.value = birhombicDiagramPadding;
    brBlueLine4.x1.baseVal.value = birhombicDiagramWidth/4 + birhombicPadding;
    brBlueLine4.y1.baseVal.value = birhombicDiagramPadding;
    brBlueLine4.x2.baseVal.value = birhombicDiagramWidth/2 + birhombicPadding;
    brBlueLine4.y2.baseVal.value = (birhombicHeight + birhombicDiagramHeight)/2;
    brBlueLine5.x1.baseVal.value = birhombicDiagramWidth/2 + birhombicPadding;
    brBlueLine5.y1.baseVal.value = (birhombicHeight + birhombicDiagramHeight)/2;
    brBlueLine5.x2.baseVal.value = birhombicDiagramWidth*3/4 + birhombicPadding;
    brBlueLine5.y2.baseVal.value = birhombicDiagramPadding;
    brBlueLine6.x1.baseVal.value = birhombicDiagramWidth*3/4 + birhombicPadding;
    brBlueLine6.y1.baseVal.value = birhombicDiagramPadding;
    brBlueLine6.x2.baseVal.value = birhombicDiagramWidth + birhombicPadding;
    brBlueLine6.y2.baseVal.value = (birhombicHeight + birhombicDiagramHeight)/2;

    brRedLine1.x1.baseVal.value = birhombicDiagramWidth/8 + birhombicPadding;
    brRedLine1.y1.baseVal.value = birhombicDiagramPadding + birhombicDiagramHeight/2;
    brRedLine1.x2.baseVal.value = birhombicDiagramWidth/4 + birhombicPadding;
    brRedLine1.y2.baseVal.value = birhombicDiagramPadding + birhombicDiagramHeight*2/3;
    brRedLine2.x1.baseVal.value = birhombicDiagramWidth/4 + birhombicPadding;
    brRedLine2.y1.baseVal.value = birhombicDiagramPadding + birhombicDiagramHeight*2/3;
    brRedLine2.x2.baseVal.value = birhombicDiagramWidth/4 + birhombicPadding;
    brRedLine2.y2.baseVal.value = birhombicDiagramPadding + birhombicDiagramHeight;
    brRedLine3.x1.baseVal.value = birhombicDiagramWidth/2 + birhombicPadding;
    brRedLine3.y1.baseVal.value = birhombicDiagramPadding + birhombicDiagramHeight/3;
    brRedLine3.x2.baseVal.value = birhombicDiagramWidth/4 + birhombicPadding;
    brRedLine3.y2.baseVal.value = birhombicDiagramPadding + birhombicDiagramHeight*2/3;
    brRedLine4.x1.baseVal.value = birhombicDiagramWidth/2 + birhombicPadding;
    brRedLine4.y1.baseVal.value = birhombicDiagramPadding + birhombicDiagramHeight/3;
    brRedLine4.x2.baseVal.value = birhombicDiagramWidth*3/4 + birhombicPadding;
    brRedLine4.y2.baseVal.value = birhombicDiagramPadding + birhombicDiagramHeight*2/3;
    brRedLine5.x1.baseVal.value = birhombicDiagramWidth*3/4 + birhombicPadding;
    brRedLine5.y1.baseVal.value = birhombicDiagramPadding + birhombicDiagramHeight;
    brRedLine5.x2.baseVal.value = birhombicDiagramWidth*3/4 + birhombicPadding;
    brRedLine5.y2.baseVal.value = birhombicDiagramPadding + birhombicDiagramHeight*2/3;
    brRedLine6.x1.baseVal.value = birhombicDiagramWidth*7/8 + birhombicPadding;
    brRedLine6.y1.baseVal.value = birhombicDiagramPadding + birhombicDiagramHeight/2;
    brRedLine6.x2.baseVal.value = birhombicDiagramWidth*3/4 + birhombicPadding;
    brRedLine6.y2.baseVal.value = birhombicDiagramPadding + birhombicDiagramHeight*2/3;
    brRedLine7.x1.baseVal.value = birhombicDiagramWidth/2 + birhombicPadding;
    brRedLine7.y1.baseVal.value = birhombicDiagramPadding;
    brRedLine7.x2.baseVal.value = birhombicDiagramWidth/2 + birhombicPadding;
    brRedLine7.y2.baseVal.value = birhombicDiagramPadding + birhombicDiagramHeight/3;
    
    brGreenLine1.x1.baseVal.value = birhombicPadding;
    brGreenLine1.y1.baseVal.value = birhombicDiagramPadding + birhombicDiagramHeight;
    brGreenLine1.x2.baseVal.value = birhombicDiagramWidth/4 + birhombicPadding;
    brGreenLine1.y2.baseVal.value = birhombicDiagramPadding + birhombicDiagramHeight*2/3;
    brGreenLine2.x1.baseVal.value = birhombicDiagramWidth/4 + birhombicPadding;
    brGreenLine2.y1.baseVal.value = birhombicDiagramPadding;
    brGreenLine2.x2.baseVal.value = birhombicDiagramWidth/4 + birhombicPadding;
    brGreenLine2.y2.baseVal.value = birhombicDiagramPadding + birhombicDiagramHeight*2/3;
    brGreenLine3.x1.baseVal.value = birhombicDiagramWidth/2 + birhombicPadding;
    brGreenLine3.y1.baseVal.value = birhombicDiagramPadding + birhombicDiagramHeight;
    brGreenLine3.x2.baseVal.value = birhombicDiagramWidth/4 + birhombicPadding;
    brGreenLine3.y2.baseVal.value = birhombicDiagramPadding + birhombicDiagramHeight*2/3;
    brGreenLine4.x1.baseVal.value = birhombicDiagramWidth/2 + birhombicPadding;
    brGreenLine4.y1.baseVal.value = birhombicDiagramPadding + birhombicDiagramHeight/3;
    brGreenLine4.x2.baseVal.value = birhombicDiagramWidth/4 + birhombicPadding;
    brGreenLine4.y2.baseVal.value = birhombicDiagramPadding;
    brGreenLine5.x1.baseVal.value = birhombicDiagramWidth/2 + birhombicPadding;
    brGreenLine5.y1.baseVal.value = birhombicDiagramPadding + birhombicDiagramHeight/3;
    brGreenLine5.x2.baseVal.value = birhombicDiagramWidth/2 + birhombicPadding;
    brGreenLine5.y2.baseVal.value = birhombicDiagramPadding + birhombicDiagramHeight;
    brGreenLine6.x1.baseVal.value = birhombicDiagramWidth/2 + birhombicPadding;
    brGreenLine6.y1.baseVal.value = birhombicDiagramPadding + birhombicDiagramHeight;
    brGreenLine6.x2.baseVal.value = birhombicDiagramWidth*3/4 + birhombicPadding;
    brGreenLine6.y2.baseVal.value = birhombicDiagramPadding + birhombicDiagramHeight*2/3;
    brGreenLine7.x1.baseVal.value = birhombicDiagramWidth/2 + birhombicPadding;
    brGreenLine7.y1.baseVal.value = birhombicDiagramPadding + birhombicDiagramHeight/3;
    brGreenLine7.x2.baseVal.value = birhombicDiagramWidth*3/4 + birhombicPadding;
    brGreenLine7.y2.baseVal.value = birhombicDiagramPadding;
    brGreenLine8.x1.baseVal.value = birhombicDiagramWidth*3/4 + birhombicPadding;
    brGreenLine8.y1.baseVal.value = birhombicDiagramPadding + birhombicDiagramHeight*2/3;
    brGreenLine8.x2.baseVal.value = birhombicDiagramWidth*3/4 + birhombicPadding;
    brGreenLine8.y2.baseVal.value = birhombicDiagramPadding;
    brGreenLine9.x1.baseVal.value = birhombicDiagramWidth*3/4 + birhombicPadding;
    brGreenLine9.y1.baseVal.value = birhombicDiagramPadding + birhombicDiagramHeight*2/3;
    brGreenLine9.x2.baseVal.value = birhombicDiagramWidth + birhombicPadding;
    brGreenLine9.y2.baseVal.value = birhombicDiagramPadding + birhombicDiagramHeight;

    brBlueCorner1.cx.baseVal.value = birhombicPadding;
    brBlueCorner1.cy.baseVal.value = birhombicDiagramPadding + birhombicDiagramHeight;
    brBlueCorner2.cx.baseVal.value = birhombicDiagramWidth/4 + birhombicPadding;
    brBlueCorner2.cy.baseVal.value = birhombicDiagramPadding;
    brBlueCorner3.cx.baseVal.value = birhombicDiagramWidth*3/4 + birhombicPadding;
    brBlueCorner3.cy.baseVal.value = birhombicDiagramPadding;
    brBlueCorner4.cx.baseVal.value = birhombicDiagramWidth + birhombicPadding;
    brBlueCorner4.cy.baseVal.value = birhombicDiagramPadding + birhombicDiagramHeight;

    matrixClass1.setAttribute("x", birhombicPadding + birhombicDiagramWidth/4);
    matrixClass1.setAttribute("y", birhombicDiagramPadding);
    matrixClass2.setAttribute("x", birhombicPadding + birhombicDiagramWidth/2);
    matrixClass2.setAttribute("y", birhombicDiagramPadding);
    matrixClass3.setAttribute("x", birhombicPadding + birhombicDiagramWidth*3/4);
    matrixClass3.setAttribute("y", birhombicDiagramPadding);
    matrixClass4.setAttribute("x", birhombicPadding + birhombicDiagramWidth/2);
    matrixClass4.setAttribute("y", birhombicDiagramPadding + birhombicDiagramHeight/3);
    matrixClass5.setAttribute("x", birhombicPadding + birhombicDiagramWidth/8);
    matrixClass5.setAttribute("y", birhombicDiagramPadding + birhombicDiagramHeight/2);
    matrixClass6.setAttribute("x", birhombicPadding + birhombicDiagramWidth*3/8);
    matrixClass6.setAttribute("y", birhombicDiagramPadding + birhombicDiagramHeight/2);
    matrixClass7.setAttribute("x", birhombicPadding + birhombicDiagramWidth*5/8);
    matrixClass7.setAttribute("y", birhombicDiagramPadding + birhombicDiagramHeight/2);
    matrixClass8.setAttribute("x", birhombicPadding + birhombicDiagramWidth*7/8);
    matrixClass8.setAttribute("y", birhombicDiagramPadding + birhombicDiagramHeight/2);
    matrixClass9.setAttribute("x", birhombicPadding + birhombicDiagramWidth/4);
    matrixClass9.setAttribute("y", birhombicDiagramPadding + birhombicDiagramHeight*2/3);
    matrixClass10.setAttribute("x", birhombicPadding + birhombicDiagramWidth*3/4);
    matrixClass10.setAttribute("y", birhombicDiagramPadding + birhombicDiagramHeight*2/3);
    matrixClass11.setAttribute("x", birhombicPadding);
    matrixClass11.setAttribute("y", birhombicDiagramPadding + birhombicDiagramHeight);
    matrixClass12.setAttribute("x", birhombicPadding + birhombicDiagramWidth/4);
    matrixClass12.setAttribute("y", birhombicDiagramPadding + birhombicDiagramHeight);
    matrixClass13.setAttribute("x", birhombicPadding + birhombicDiagramWidth/2);
    matrixClass13.setAttribute("y", birhombicDiagramPadding + birhombicDiagramHeight);
    matrixClass14.setAttribute("x", birhombicPadding + birhombicDiagramWidth*3/4);
    matrixClass14.setAttribute("y", birhombicDiagramPadding + birhombicDiagramHeight);
    matrixClass15.setAttribute("x", birhombicPadding + birhombicDiagramWidth);
    matrixClass15.setAttribute("y", birhombicDiagramPadding + birhombicDiagramHeight);

    brGreenBackground.setAttribute("points",
        (birhombicPadding + birhombicDiagramWidth/4) + "," + birhombicDiagramPadding + " " +
        (birhombicPadding + birhombicDiagramWidth*3/4) + "," + birhombicDiagramPadding + " " +
        (birhombicPadding + birhombicDiagramWidth/2) + "," + (birhombicDiagramPadding + birhombicDiagramHeight)
    );
    brGoldBackground.setAttribute("points",
        (birhombicPadding + birhombicDiagramWidth/4) + "," + birhombicDiagramPadding + " " +
        (birhombicPadding) + "," + (birhombicDiagramPadding + birhombicDiagramHeight) + " " +
        (birhombicPadding + birhombicDiagramWidth/2) + "," + (birhombicDiagramPadding + birhombicDiagramHeight)
    );
    brCeruleanBackground.setAttribute("points",
        (birhombicPadding + birhombicDiagramWidth) + "," + (birhombicDiagramPadding + birhombicDiagramHeight) + " " +
        (birhombicPadding + birhombicDiagramWidth*3/4) + "," + birhombicDiagramPadding + " " +
        (birhombicPadding + birhombicDiagramWidth/2) + "," + (birhombicDiagramPadding + birhombicDiagramHeight)
    );

    brHex1.setAttribute("points",
        (birhombicPadding + birhombicDiagramWidth/4) + "," + (birhombicDiagramPadding + birhombicDiagramHeight) + " " +
        (birhombicPadding + birhombicDiagramWidth/8) + "," + (birhombicDiagramPadding + birhombicDiagramHeight*5/6) + " " +
        (birhombicPadding + birhombicDiagramWidth/8) + "," + (birhombicDiagramPadding + birhombicDiagramHeight/2) + " " +
        (birhombicPadding + birhombicDiagramWidth/4) + "," + (birhombicDiagramPadding + birhombicDiagramHeight/3) + " " +
        (birhombicPadding + birhombicDiagramWidth*3/8) + "," + (birhombicDiagramPadding + birhombicDiagramHeight/2) + " " +
        (birhombicPadding + birhombicDiagramWidth*3/8) + "," + (birhombicDiagramPadding + birhombicDiagramHeight*5/6)
    );
    brHex2.setAttribute("points",
        (birhombicPadding + birhombicDiagramWidth/2) + "," + (birhombicDiagramPadding) + " " +
        (birhombicPadding + birhombicDiagramWidth*3/8) + "," + (birhombicDiagramPadding + birhombicDiagramHeight/6) + " " +
        (birhombicPadding + birhombicDiagramWidth*3/8) + "," + (birhombicDiagramPadding + birhombicDiagramHeight/2) + " " +
        (birhombicPadding + birhombicDiagramWidth/2) + "," + (birhombicDiagramPadding + birhombicDiagramHeight*2/3) + " " +
        (birhombicPadding + birhombicDiagramWidth*5/8) + "," + (birhombicDiagramPadding + birhombicDiagramHeight/2) + " " +
        (birhombicPadding + birhombicDiagramWidth*5/8) + "," + (birhombicDiagramPadding + birhombicDiagramHeight/6)
    );
    brHex3.setAttribute("points",
        (birhombicPadding + birhombicDiagramWidth*3/4) + "," + (birhombicDiagramPadding + birhombicDiagramHeight) + " " +
        (birhombicPadding + birhombicDiagramWidth*7/8) + "," + (birhombicDiagramPadding + birhombicDiagramHeight*5/6) + " " +
        (birhombicPadding + birhombicDiagramWidth*7/8) + "," + (birhombicDiagramPadding + birhombicDiagramHeight/2) + " " +
        (birhombicPadding + birhombicDiagramWidth*3/4) + "," + (birhombicDiagramPadding + birhombicDiagramHeight/3) + " " +
        (birhombicPadding + birhombicDiagramWidth*5/8) + "," + (birhombicDiagramPadding + birhombicDiagramHeight/2) + " " +
        (birhombicPadding + birhombicDiagramWidth*5/8) + "," + (birhombicDiagramPadding + birhombicDiagramHeight*5/6)
    );

    brRowRect.width.baseVal.value = starWidth;
    brRowRect.height.baseVal.value = starWidth;
    brRowStar.style.fill = gold;
    brColStar.style.fill = cerulean;

    let points = "";
    for (let i = 0; i < 5; i++) {
        points = points + (starWidth/2*Math.cos(2*PI*i*2/5 - PI/2) + starWidth/2).toString() + ","
                        + (starWidth/2*Math.sin(2*PI*i*2/5 - PI/2) + starWidth/2).toString() + " ";
    }
    brRowPlayerPoly.setAttribute("points",points);
    brColPlayer.width.baseVal.value = starWidth;
    brColPlayer.height.baseVal.value = starWidth;
    points = "";
    for (let i = 0; i < 5; i++) {
        points = points + (starWidth/2*Math.cos(2*PI*i*2/5 + PI/2) + starWidth/2).toString() + ","
                        + (starWidth/2*Math.sin(2*PI*i*2/5 + PI/2) + starWidth/2).toString() + " ";
    }
    brColPlayerPoly.setAttribute("points",points);
    

    const canvas = document.getElementById("canvas");
    canvas.getContext("2d", { willReadFrequently: true});
    const canvasBigPic = document.getElementById("big-pic-canvas");
    canvasBigPic.getContext("2d", { willReadFrequently: true});

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
            document.getElementById("notable-games").style.display = "none";
            document.getElementById(button.id.slice(0,-7)).style.display = "";
        });
    }
    document.getElementById("navigation").style.display = "none";
    document.getElementById("view-modes").style.display = "none";
    document.getElementById("controls").style.display = "none";
    document.getElementById("notable-games").style.display = "none";

    const legendContainer = document.getElementById("legend-container");
    const legend = document.getElementById("legend-canvas");
    const legendLabel1 = document.getElementById("legend-label-1");
    const legendLabel2 = document.getElementById("legend-label-2");
    const legendLabel3 = document.getElementById("legend-label-3");
    const legendLabel4 = document.getElementById("legend-label-4");
    const legendLabel5 = document.getElementById("legend-label-5");
    const legendLabel6 = document.getElementById("legend-label-6");
    const legendLabel7 = document.getElementById("legend-label-7");
    const legendLabel8 = document.getElementById("legend-label-8");
    const legendLabel9 = document.getElementById("legend-label-9");
    const legendLabel10 = document.getElementById("legend-label-10");
    const legendLabel11 = document.getElementById("legend-label-11");
    const legendLabel12 = document.getElementById("legend-label-12");
    const legendLabel13 = document.getElementById("legend-label-13");
    legend.getContext("2d", { willReadFrequently: true});
    legend.width = legendContainer.width.baseVal.value;
    legend.height = legendContainer.height.baseVal.value;
    legendLabel1.setAttribute("x",legend.width+10);
    legendLabel1.setAttribute("y",legend.height+20);
    legendLabel2.setAttribute("x",legend.width+10);
    legendLabel2.setAttribute("y",legend.height*0.78+20);
    legendLabel3.setAttribute("x",legend.width+10);
    legendLabel3.setAttribute("y",legend.height*0.56+20);
    legendLabel4.setAttribute("x",legend.width+10);
    legendLabel4.setAttribute("y",legend.height*0.33+20);
    legendLabel5.setAttribute("x",legend.width+10);
    legendLabel5.setAttribute("y",20);
    legendLabel6.setAttribute("x",legend.width+10);
    legendLabel6.setAttribute("y",legend.height*0.5+20);
    legendLabel6.style.display = "none";
    legendLabel7.setAttribute("x",legend.width+10);
    legendLabel7.setAttribute("y",legend.height*0.89+20);
    legendLabel8.setAttribute("x",legend.width+10);
    legendLabel8.setAttribute("y",legend.height*0.67+20);
    legendLabel9.setAttribute("x",legend.width+10);
    legendLabel9.setAttribute("y",legend.height*0.44+20);
    legendLabel10.setAttribute("x",legend.width+10);
    legendLabel10.setAttribute("y",legend.height*0.17+20);
    legendLabel11.setAttribute("x",legend.width+10);
    legendLabel11.setAttribute("y",legend.height*0.33+20);
    legendLabel12.setAttribute("x",legend.width+10);
    legendLabel12.setAttribute("y",legend.height*0.67+20);
    legendLabel13.setAttribute("x",legend.width+10);
    legendLabel13.setAttribute("y",legend.height*0.83+20);
    updateLegend();

    // initialize hotspots and boundaries
    const boundaryLine1 = document.getElementById("boundary-line-1");
    const boundaryLine2 = document.getElementById("boundary-line-2");
    const boundaryLine3 = document.getElementById("boundary-line-3");
    const boundaryLine4 = document.getElementById("boundary-line-4");
    const boundaryLine5 = document.getElementById("boundary-line-5");
    const boundaryLine6 = document.getElementById("boundary-line-6");
    const boundaryLine7 = document.getElementById("boundary-line-7");
    const boundaryLine8 = document.getElementById("boundary-line-8");
    const boundaryLine9 = document.getElementById("boundary-line-9");
    const boundaryLine10 = document.getElementById("boundary-line-10");
    const boundaryLine11 = document.getElementById("boundary-line-11");
    const boundaryLine12 = document.getElementById("boundary-line-12");
    const boundaryLine13 = document.getElementById("boundary-line-13");
    const boundaryLine14 = document.getElementById("boundary-line-14");
    const boundaryLine15 = document.getElementById("boundary-line-15");
    const boundaryLine16 = document.getElementById("boundary-line-16");
    const boundaryLine17 = document.getElementById("boundary-line-17");
    const boundaryLine18 = document.getElementById("boundary-line-18");
    const boundaryLine19 = document.getElementById("boundary-line-19");
    const boundaryLine20 = document.getElementById("boundary-line-20");
    const boundaryLine21 = document.getElementById("boundary-line-21");
    const boundaryLine22 = document.getElementById("boundary-line-22");
    const boundaryLine23 = document.getElementById("boundary-line-23");
    const boundaryLine24 = document.getElementById("boundary-line-24");
    const boundaryPoint1 = document.getElementById("boundary-point-1");
    // const boundaryPoint2 = document.getElementById("boundary-point-2");
    const boundaryPoint3 = document.getElementById("boundary-point-3");
    const boundaryPoint4 = document.getElementById("boundary-point-4");
    const boundaryPoint5 = document.getElementById("boundary-point-5");
    // const boundaryPoint6 = document.getElementById("boundary-point-6");
    // const boundaryPoint7 = document.getElementById("boundary-point-7");
    const boundaryPoint8 = document.getElementById("boundary-point-8");
    const boundaryPoint9 = document.getElementById("boundary-point-9");
    const hotspot1 = document.getElementById("hotspot-1");
    const hotspot2 = document.getElementById("hotspot-2");
    const hotspot3 = document.getElementById("hotspot-3");
    boundaryLine1.style.stroke = lightGreen;
    boundaryLine2.style.stroke = cerulean;
    boundaryLine3.style.stroke = gold;
    boundaryLine4.style.stroke = lightGreen;
    boundaryLine5.style.stroke = cerulean;
    boundaryLine6.style.stroke = gold;
    boundaryLine7.style.stroke = lightGreen;
    boundaryLine8.style.stroke = cerulean;
    boundaryLine9.style.stroke = gold;
    boundaryLine10.style.stroke = cerulean;
    boundaryLine11.style.stroke = cerulean;
    boundaryLine12.style.stroke = cerulean;
    boundaryLine13.style.stroke = gold;
    boundaryLine14.style.stroke = gold;
    boundaryLine15.style.stroke = gold;
    boundaryLine16.style.stroke = lightGreen;
    boundaryLine17.style.stroke = lightGreen;
    boundaryLine18.style.stroke = lightGreen;
    boundaryPoint1.style.fill = red; //gold;
    // boundaryPoint2.style.fill = red; //bad;
    boundaryPoint3.style.fill = red; //lightGreen;
    boundaryPoint4.style.fill = red; //cerulean;
    boundaryPoint5.style.fill = red; //lightGreen;
    // boundaryPoint6.style.fill = red; //bad;
    // boundaryPoint7.style.fill = red; //bad;
    boundaryPoint8.style.fill = red; //gold;
    boundaryPoint9.style.fill = red; //cerulean;
    hotspot1.style.fill = cerulean;
    hotspot2.style.fill = gold;
    hotspot3.style.fill = lightGreen;    

    update();
}

function update() {
    const error = 0.00001;

    if (Math.abs(coords[0] - Math.round(coords[0]*2)/2) < 0.05 && !isMouseDown && !x1up && !x1down && x1V == 0 && !enRoute) {
        coords[0] = Math.round(coords[0]*2)/2;
        updateRequired = true;
    }
    if (Math.abs(coords[1] - Math.round(coords[1]*2)/2) < 0.05 && !isMouseDown && !x2up && !x2down && x2V == 0 && !enRoute) {
        coords[1] = Math.round(coords[1]*2)/2;
        updateRequired = true;
    }
    if (Math.abs(coords[2] - Math.round(coords[2])) < 0.05 && !b1up && !b1down && b1V == 0 && !enRoute) {
        coords[2] = Math.round(coords[2]);
        updateRequired = true;
    }
    if (Math.abs(coords[3] - Math.round(coords[3])) < 0.05 && !b2up && !b2down && b2V == 0 && !enRoute) {
        coords[3] = Math.round(coords[3]);
        updateRequired = true;
    }

    const movementSpeed = 0.03;
    if (x1up) {
        coords[0] = (coords[0] + movementSpeed) % 6;
        updateRequired = true;
    }
    if (x1down) {
        coords[0] = (coords[0] - movementSpeed + 6) % 6;
        updateRequired = true;
    }
    if (x2up) {
        coords[1] = (coords[1] + movementSpeed) % 6;
        updateRequired = true;
    }
    if (x2down) {
        coords[1] = (coords[1] - movementSpeed + 6) % 6;
        updateRequired = true;
    }
    if (b1up) {
        coords[2] = coords[2] + movementSpeed*2;
        backgroundOutOfDate = true;
        updateRequired = true;
    }
    if (b1down) {
        coords[2] = coords[2] - movementSpeed*2;
        backgroundOutOfDate = true;
        updateRequired = true;
    }
    if (b2up) {
        coords[3] = coords[3] + movementSpeed*2;
        backgroundOutOfDate = true;
        updateRequired = true;
    }
    if (b2down) {
        coords[3] = coords[3] - movementSpeed*2;
        updateRequired = true;
        backgroundOutOfDate = true;
    }

    if (x1V != 0) {
        coords[0] = (coords[0] + x1V + 6) % 6;
        updateRequired = true;
    }
    if (x2V != 0) {
        coords[1] = (coords[1] + x2V + 6) % 6;
        updateRequired = true;
    }
    coords[2] += b1V;
    if (b1V != 0) {
        backgroundOutOfDate = true;
        updateRequired = true;
    }
    if (coords[2] <= 0 && b1V != 0) {
        crossBlue(true);
        b1V = -b1V;
    } else if (coords[2] >= 6 && b1V != 0) {
        b1V = -b1V;
        coords[2] = coords[2] + b1V;
    }
    coords[3] = coords[3] + b2V;
    if (b2V != 0) {
        backgroundOutOfDate = true;
        updateRequired = true;
    }
    if (coords[3] <= 0 && b2V != 0) {
        crossBlue(false);
        b2V = -b2V;
    } else if (coords[3] >= 6 && b2V != 0) {
        b2V = -b2V;
        coords[3] = coords[3] + b2V;
    }
    fixCoords();

    // if (changeQuad1 && +b1coord.value != 0 && coords[2] == 0) {
    //     hitZero1 = true;
    // }
    // if (changeQuad2 && +b2coord.value != 0 && coords[3] == 0) {
    //     hitZero2 = true;
    // }
    // if (changeQuad1 && +b1coord.value == 0 && coords[2] != 0) {
    //     wasPositive1 = true;
    // }
    // if (changeQuad2 && +b2coord.value == 0 && coords[3] != 0) {
    //     wasPositive2 = true;
    // }
    // if (wasPositive1 && hitZero1 && changeQuad1) {
    //     crossBlue(true);
    //     wasPositive1 = false;
    // } else if (wasPositive2 && hitZero2 && changeQuad2) {
    //     crossBlue(false);
    //     wasPositive2 = false;
    // }

    if (enRoute) {
        animTime++;
        coords[2] = animTime/animationFrames*destination[2] + (1 - animTime/animationFrames)*startPoint[2];
        coords[3] = animTime/animationFrames*destination[3] + (1 - animTime/animationFrames)*startPoint[3];
        coords[0] = fromNearestRed(startPoint[4], (animTime/animationFrames*destination[0] + (1 - animTime/animationFrames)*startPoint[0])/(6 - coords[2]));
        coords[1] = fromNearestRed(startPoint[5], (animTime/animationFrames*destination[1] + (1 - animTime/animationFrames)*startPoint[1])/(6 - coords[3]));
        backgroundOutOfDate = true;
        updateRequired = true;
        if (animTime == animationFrames) {
            enRoute = false;
        }
    }

    if (diagramGrid && updateRequired) {
        updateDiagramGrid();
    }

    if (!useAltSchema) {
        [matrixA,matrixB] = coordsToMatrices(...coords);
    } else {
        [matrixA,matrixB] = coordsToMatricesAlt(coords[0],coords[1],quad);
        coords[2] = blue(matrixA);
        coords[3] = blue(matrixB);
    }
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
    // const rowMixedReturns = document.getElementById("row-return-mixed");
    // const colMixedReturns = document.getElementById("col-return-mixed");
    const rowReturnsTrans = document.getElementById("row-return-transferable");
    const colReturnsTrans = document.getElementById("col-return-transferable");
    const rowReturnsCoco = document.getElementById("row-return-coco");
    const colReturnsCoco = document.getElementById("col-return-coco");
    const rowReturnsBargaining1 = document.getElementById("row-return-bargaining-1");
    const colReturnsBargaining1 = document.getElementById("col-return-bargaining-1");
    const rowReturnsBargaining2 = document.getElementById("row-return-bargaining-2");
    const colReturnsBargaining2 = document.getElementById("col-return-bargaining-2");
    if (!useAltSchema) {
        rowX.innerHTML = coords[0].toFixed(1);
        colX.innerHTML = coords[1].toFixed(1);
    } else {
        [rowX.innerHTML,colX.innerHTML] = altToStandardCoords(coords[0],coords[1],quad).map(num => num.toFixed(1));
    }
    rowB.innerHTML = coords[2].toFixed(1);
    colB.innerHTML = coords[3].toFixed(1);
    const [rowM, colM] = (!useAltSchema) ? 
                         coordsToMatrices(coords[0], coords[1],
                                          coords[2] != 0 ? coords[2] : coords[2] + error*2,
                                          coords[3] != 0 ? coords[3] : coords[3] + error*2) :
                         coordsToMatricesAlt(coords[0], coords[1], quad);
    const returns = [
        payoffModified(rowM, colM),payoffModified(flip(colM), flip(rowM)),
        ...payoffBargainingBackstop(rowM, colM),
        ...payoffBargainingDisagreement(rowM, colM),
        ...payoffShapley(rowM, colM),
        ...payoffCoco(rowM, colM)
    ];
    rowReturns.innerHTML = returns[0].toFixed(1);
    rowReturns.style.color = `rgb(${colorFunction(returns[0]/9, 1)[0]}, ${colorFunction(returns[0]/9, 1)[1]}, ${colorFunction(returns[0]/9, 1)[2]})`;
    colReturns.innerHTML = returns[1].toFixed(1);
    colReturns.style.color = `rgb(${colorFunction(returns[1]/9, 1)[0]}, ${colorFunction(returns[1]/9, 1)[1]}, ${colorFunction(returns[1]/9, 1)[2]})`;
    // if (coords[0] < 3 && coords[1] < 3) {
    //     rowMixedReturns.innerHTML = " (" + payoff(rowM, colM).toFixed(1) + ")";
    //     colMixedReturns.innerHTML = " (" + payoff(flip(colM), flip(rowM)).toFixed(1) + ")";
    // } else {
    //     rowMixedReturns.innerHTML = "";
    //     colMixedReturns.innerHTML = "";
    // }
    rowReturnsBargaining1.innerHTML = returns[2].toFixed(1);
    rowReturnsBargaining1.style.color = `rgb(${colorFunction(returns[2]/9, 1)[0]}, ${colorFunction(returns[2]/9, 1)[1]}, ${colorFunction(returns[2]/9, 1)[2]})`;
    colReturnsBargaining1.innerHTML = returns[3].toFixed(1);
    colReturnsBargaining1.style.color = `rgb(${colorFunction(returns[3]/9, 1)[0]}, ${colorFunction(returns[3]/9, 1)[1]}, ${colorFunction(returns[3]/9, 1)[2]})`;
    rowReturnsBargaining2.innerHTML = returns[4].toFixed(1);
    rowReturnsBargaining2.style.color = `rgb(${colorFunction(returns[4]/9, 1)[0]}, ${colorFunction(returns[4]/9, 1)[1]}, ${colorFunction(returns[4]/9, 1)[2]})`;
    colReturnsBargaining2.innerHTML = returns[5].toFixed(1);
    colReturnsBargaining2.style.color = `rgb(${colorFunction(returns[5]/9, 1)[0]}, ${colorFunction(returns[5]/9, 1)[1]}, ${colorFunction(returns[5]/9, 1)[2]})`;
    rowReturnsTrans.innerHTML = returns[6].toFixed(1);
    rowReturnsTrans.style.color = `rgb(${colorFunction(returns[6]/9, 1)[0]}, ${colorFunction(returns[6]/9, 1)[1]}, ${colorFunction(returns[6]/9, 1)[2]})`;
    colReturnsTrans.innerHTML = returns[7].toFixed(1);
    colReturnsTrans.style.color = `rgb(${colorFunction(returns[7]/9, 1)[0]}, ${colorFunction(returns[7]/9, 1)[1]}, ${colorFunction(returns[7]/9, 1)[2]})`;
    rowReturnsCoco.innerHTML = returns[8].toFixed(1);
    rowReturnsCoco.style.color = `rgb(${colorFunction(returns[8]/9, 1)[0]}, ${colorFunction(returns[8]/9, 1)[1]}, ${colorFunction(returns[8]/9, 1)[2]})`;
    colReturnsCoco.innerHTML = returns[9].toFixed(1);
    colReturnsCoco.style.color = `rgb(${colorFunction(returns[9]/9, 1)[0]}, ${colorFunction(returns[9]/9, 1)[1]}, ${colorFunction(returns[9]/9, 1)[2]})`;

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

    updateDiagram();

    // Update big-diagram elements
    const bigDiagram = document.getElementById("big-diagram");
    const line1Big = document.getElementById("line1-big");
    const line2Big = document.getElementById("line2-big");
    const line3Big = document.getElementById("line3-big");
    const line4Big = document.getElementById("line4-big");
    const line5Big = document.getElementById("line5-big");
    const line6Big = document.getElementById("line6-big");
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
    const smallRedLine1 = document.getElementById("small-red-line-1");
    const smallRedLine2 = document.getElementById("small-red-line-2");
    const smallGreenLine1 = document.getElementById("small-green-line-1");
    const smallGreenLine2 = document.getElementById("small-green-line-2");
    const smallBlueLine1 = document.getElementById("small-blue-line-1");
    const smallBlueLine2 = document.getElementById("small-blue-line-2");
    const smallCorner = document.getElementById("small-corner");
    const redBox = document.getElementById("red-box");
    const greenBox = document.getElementById("green-box");
    const blueBox = document.getElementById("blue-box");

    const disagreementPoint = document.getElementById("disagreement-point");
    const bargainingPoint1 = document.getElementById("bargaining-returns-1");
    const bargainingPoint2 = document.getElementById("bargaining-returns-2");
    const bargainingPoint3 = document.getElementById("bargaining-returns-3");
    const bargainingPoint4 = document.getElementById("bargaining-returns-4");
    const bargainingLine = document.getElementById("bargaining-line");
    const transUtilBoundary = document.getElementById("transferable-util-boundary");

    const bigDiagramWidth = bigDiagram.getBoundingClientRect().width;
    const paddingBig1 = 0.32*bigDiagramWidth;
    const paddingBig2 = 0.04*bigDiagramWidth;
    const widthBig = bigDiagramWidth - paddingBig1 - paddingBig2;
    line1Big.x1.baseVal.value = matrixA[0]*widthBig/6+paddingBig2;
    line1Big.x2.baseVal.value = matrixA[1]*widthBig/6+paddingBig2;
    line2Big.x1.baseVal.value = matrixA[1]*widthBig/6+paddingBig2;
    line2Big.x2.baseVal.value = matrixA[3]*widthBig/6+paddingBig2;
    line3Big.x1.baseVal.value = matrixA[3]*widthBig/6+paddingBig2;
    line3Big.x2.baseVal.value = matrixA[2]*widthBig/6+paddingBig2;
    line4Big.x1.baseVal.value = matrixA[2]*widthBig/6+paddingBig2;
    line4Big.x2.baseVal.value = matrixA[0]*widthBig/6+paddingBig2;
    line5Big.x1.baseVal.value = matrixA[0]*widthBig/6+paddingBig2;
    line5Big.x2.baseVal.value = matrixA[3]*widthBig/6+paddingBig2;
    line6Big.x1.baseVal.value = matrixA[1]*widthBig/6+paddingBig2;
    line6Big.x2.baseVal.value = matrixA[2]*widthBig/6+paddingBig2;

    line1Big.y1.baseVal.value = (1-matrixB[0]/6)*widthBig+paddingBig1;
    line1Big.y2.baseVal.value = (1-matrixB[1]/6)*widthBig+paddingBig1;
    line2Big.y1.baseVal.value = (1-matrixB[1]/6)*widthBig+paddingBig1;
    line2Big.y2.baseVal.value = (1-matrixB[3]/6)*widthBig+paddingBig1;
    line3Big.y1.baseVal.value = (1-matrixB[3]/6)*widthBig+paddingBig1;
    line3Big.y2.baseVal.value = (1-matrixB[2]/6)*widthBig+paddingBig1;
    line4Big.y1.baseVal.value = (1-matrixB[2]/6)*widthBig+paddingBig1;
    line4Big.y2.baseVal.value = (1-matrixB[0]/6)*widthBig+paddingBig1;
    line5Big.y1.baseVal.value = (1-matrixB[0]/6)*widthBig+paddingBig1;
    line5Big.y2.baseVal.value = (1-matrixB[3]/6)*widthBig+paddingBig1;
    line6Big.y1.baseVal.value = (1-matrixB[1]/6)*widthBig+paddingBig1;
    line6Big.y2.baseVal.value = (1-matrixB[2]/6)*widthBig+paddingBig1;

    point1Big.cx.baseVal.value = matrixA[0]*widthBig/6+paddingBig2;
    point1Big.cy.baseVal.value = (1-matrixB[0]/6)*widthBig+paddingBig1;
    number1.setAttribute('x',matrixA[0]*widthBig/6+paddingBig2);
    number1.setAttribute('y',(1-matrixB[0]/6)*widthBig+paddingBig1);
    point2Big.cx.baseVal.value = matrixA[1]*widthBig/6+paddingBig2;
    point2Big.cy.baseVal.value = (1-matrixB[1]/6)*widthBig+paddingBig1;
    number2.setAttribute('x',matrixA[1]*widthBig/6+paddingBig2);
    number2.setAttribute('y',(1-matrixB[1]/6)*widthBig+paddingBig1);
    point3Big.cx.baseVal.value = matrixA[2]*widthBig/6+paddingBig2;
    point3Big.cy.baseVal.value = (1-matrixB[2]/6)*widthBig+paddingBig1;
    number3.setAttribute('x',matrixA[2]*widthBig/6+paddingBig2);
    number3.setAttribute('y',(1-matrixB[2]/6)*widthBig+paddingBig1);
    point4Big.cx.baseVal.value = matrixA[3]*widthBig/6+paddingBig2;
    point4Big.cy.baseVal.value = (1-matrixB[3]/6)*widthBig+paddingBig1;
    number4.setAttribute('x',matrixA[3]*widthBig/6+paddingBig2);
    number4.setAttribute('y',(1-matrixB[3]/6)*widthBig+paddingBig1);

    if (viewMode == 5 || viewMode == 6 || viewMode == 9 || viewMode == 4) {
        if (viewMode == 5) {
            bargainingLine.x2.baseVal.value = bargainingReturns[0][0]*widthBig/6+paddingBig2;
            bargainingLine.y2.baseVal.value = (6-bargainingReturns[0][1])*widthBig/6+paddingBig1;
        } else if (viewMode == 6) {
            bargainingLine.x2.baseVal.value = bargainingReturns[1][0]*widthBig/6+paddingBig2;
            bargainingLine.y2.baseVal.value = (6-bargainingReturns[1][1])*widthBig/6+paddingBig1;
        } else if (viewMode == 9) {
            bargainingLine.x2.baseVal.value = bargainingReturns[2][0]*widthBig/6+paddingBig2;
            bargainingLine.y2.baseVal.value = (6-bargainingReturns[2][1])*widthBig/6+paddingBig1;
        } else {
            bargainingLine.x2.baseVal.value = bargainingReturns[3][0]*widthBig/6+paddingBig2;
            bargainingLine.y2.baseVal.value = (6-bargainingReturns[3][1])*widthBig/6+paddingBig1;
        }
        if (viewMode == 5 || viewMode == 6) {
            disagreementPoint.style.fill = brown;
            bargainingLine.style.stroke = brown;
        } else {
            disagreementPoint.style.fill = lightBrown;
            bargainingLine.style.stroke = lightBrown;
        }
        disagreementPoint.cx.baseVal.value = disagree[0]*widthBig/6+paddingBig2;
        disagreementPoint.cy.baseVal.value = (6-disagree[1])*widthBig/6+paddingBig1;
        bargainingLine.x1.baseVal.value = disagree[0]*widthBig/6+paddingBig2;
        bargainingLine.y1.baseVal.value = (6-disagree[1])*widthBig/6+paddingBig1;
        disagreementPoint.style.fillOpacity = 1;
        bargainingLine.style.strokeOpacity = 1;
    } else {
        disagreementPoint.style.fillOpacity = 0;
        bargainingLine.style.strokeOpacity = 0;
    }

    if (viewMode == 5 || showAllReturns) {
        bargainingPoint1.cx.baseVal.value = bargainingReturns[0][0]*widthBig/6+paddingBig2;
        bargainingPoint1.cy.baseVal.value = (6-bargainingReturns[0][1])*widthBig/6+paddingBig1;
        bargainingPoint1.style.fillOpacity = 1;
    } else {
        bargainingPoint1.style.fillOpacity = 0;
    }

    if (viewMode == 6 || showAllReturns) {
        bargainingPoint3.x.baseVal.value = bargainingReturns[1][0]*widthBig/6+paddingBig2 - xWidth/2;
        bargainingPoint3.y.baseVal.value = (6-bargainingReturns[1][1])*widthBig/6+paddingBig1 - xWidth/2;
        bargainingPoint3.style.fillOpacity = 1;
    } else {
        bargainingPoint3.style.fillOpacity = 0;
    }
    
    if (viewMode == 9 || viewMode == 4 || showAllReturns) {
        transUtilBoundary.x2.baseVal.value = (bargainingReturns[2][0]+bargainingReturns[2][1])/6*widthBig+paddingBig2*2;
        transUtilBoundary.y1.baseVal.value = widthBig - (bargainingReturns[2][0]+bargainingReturns[2][1])/6*widthBig + paddingBig1 - paddingBig2;
        transUtilBoundary.style.strokeOpacity = 0.5;
    } else {
        transUtilBoundary.style.strokeOpacity = 0;
        bargainingPoint2.style.fillOpacity = 0;
        bargainingPoint4.style.fillOpacity = 0;
    }

    if (viewMode == 9 || showAllReturns) {
        bargainingPoint2.style.fillOpacity = 1;
        bargainingPoint2.cx.baseVal.value = bargainingReturns[2][0]/6*widthBig+paddingBig2;
        bargainingPoint2.cy.baseVal.value = (1-bargainingReturns[2][1]/6)*widthBig+paddingBig1;
    } else {
        bargainingPoint2.style.fillOpacity = 0;
    }

    if (viewMode == 4 || showAllReturns) {
        bargainingPoint4.style.fillOpacity = 1;
        bargainingPoint4.x.baseVal.value = bargainingReturns[3][0]/6*widthBig+paddingBig2 - xWidth/2;
        bargainingPoint4.y.baseVal.value = (1-bargainingReturns[3][1]/6)*widthBig+paddingBig1 - xWidth/2;
    } else {
        bargainingPoint4.style.fillOpacity = 0;
    }

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

    corner1Big.cx.baseVal.value = matrixA[0]*widthBig/6+paddingBig2;
    corner1Big.cy.baseVal.value = (1-matrixB[0]/6)*widthBig+paddingBig1;
    corner2Big.cx.baseVal.value = matrixA[1]*widthBig/6+paddingBig2;
    corner2Big.cy.baseVal.value = (1-matrixB[1]/6)*widthBig+paddingBig1;
    corner3Big.cx.baseVal.value = matrixA[2]*widthBig/6+paddingBig2;
    corner3Big.cy.baseVal.value = (1-matrixB[2]/6)*widthBig+paddingBig1;
    corner4Big.cx.baseVal.value = matrixA[3]*widthBig/6+paddingBig2;
    corner4Big.cy.baseVal.value = (1-matrixB[3]/6)*widthBig+paddingBig1;

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

    smallLine5.y1.baseVal.value = paddingBig1 + (1-take(matrixB,2)/6)*widthBig;
    smallLine5.y2.baseVal.value = paddingBig1 + (1-take(matrixB,2)/6)*widthBig;
    smallLine6.y1.baseVal.value = paddingBig1 + (1-take(matrixB,1)/6)*widthBig;
    smallLine6.y2.baseVal.value = paddingBig1 + (1-take(matrixB,1)/6)*widthBig;
    smallLine7.x1.baseVal.value = paddingBig2 + take(matrixA,2)/6*widthBig;
    smallLine7.x2.baseVal.value = paddingBig2 + take(matrixA,2)/6*widthBig;
    smallLine8.x1.baseVal.value = paddingBig2 + take(matrixA,1)/6*widthBig;
    smallLine8.x2.baseVal.value = paddingBig2 + take(matrixA,1)/6*widthBig;

    smallRedLine1.x1.baseVal.value = paddingBig2;
    smallRedLine1.x2.baseVal.value = paddingBig2 + take(matrixA,1)/6*widthBig;
    smallRedLine1.y1.baseVal.value = paddingBig1 + widthBig;
    smallRedLine1.y2.baseVal.value = paddingBig1 + widthBig;
    smallGreenLine1.x1.baseVal.value = paddingBig2 + take(matrixA,1)/6*widthBig;
    smallGreenLine1.x2.baseVal.value = paddingBig2 + take(matrixA,2)/6*widthBig;
    smallGreenLine1.y1.baseVal.value = paddingBig1 + widthBig;
    smallGreenLine1.y2.baseVal.value = paddingBig1 + widthBig;
    smallBlueLine1.x1.baseVal.value = paddingBig2 + take(matrixA,2)/6*widthBig;
    smallBlueLine1.x2.baseVal.value = paddingBig2 + widthBig;
    smallBlueLine1.y1.baseVal.value = paddingBig1 + widthBig;
    smallBlueLine1.y2.baseVal.value = paddingBig1 + widthBig;
    smallRedLine2.x1.baseVal.value = paddingBig2;
    smallRedLine2.x2.baseVal.value = paddingBig2;
    smallRedLine2.y1.baseVal.value = paddingBig1 + widthBig;
    smallRedLine2.y2.baseVal.value = paddingBig1 + (1-take(matrixB,1)/6)*widthBig;
    smallGreenLine2.x1.baseVal.value = paddingBig2;
    smallGreenLine2.x2.baseVal.value = paddingBig2;
    smallGreenLine2.y1.baseVal.value = paddingBig1 + (1-take(matrixB,2)/6)*widthBig;
    smallGreenLine2.y2.baseVal.value = paddingBig1 + (1-take(matrixB,1)/6)*widthBig;
    smallBlueLine2.x1.baseVal.value = paddingBig2;
    smallBlueLine2.x2.baseVal.value = paddingBig2;
    smallBlueLine2.y1.baseVal.value = paddingBig1 + (1-take(matrixB,2)/6)*widthBig;
    smallBlueLine2.y2.baseVal.value = paddingBig1;
    smallCorner.cx.baseVal.value = paddingBig2;
    smallCorner.cy.baseVal.value = paddingBig1 + widthBig;

    redBox.x.baseVal.value = paddingBig2;
    redBox.y.baseVal.value = paddingBig1 + (1-take(matrixB,1)/6)*widthBig;
    redBox.width.baseVal.value = take(matrixA,1)/6*widthBig;
    redBox.height.baseVal.value = take(matrixB,1)/6*widthBig;
    greenBox.x.baseVal.value = paddingBig2 + take(matrixA,1)/6*widthBig;
    greenBox.y.baseVal.value = paddingBig1 + (1-take(matrixB,2)/6)*widthBig;
    greenBox.width.baseVal.value = (take(matrixA,2)-take(matrixA,1))/6*widthBig;
    greenBox.height.baseVal.value = (take(matrixB,2)-take(matrixB,1))/6*widthBig;
    blueBox.x.baseVal.value = paddingBig2 + take(matrixA,2)/6*widthBig;
    blueBox.y.baseVal.value = paddingBig1;
    blueBox.width.baseVal.value = (6-take(matrixA,2))/6*widthBig;
    blueBox.height.baseVal.value = (6-take(matrixB,2))/6*widthBig;

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

    const diagram = document.getElementById("diagram");
    const diagramWidth = diagram.width.baseVal.value;
    const picWidth = fixImageSize ? container.width.baseVal.value - diagramWidth : (container.width.baseVal.value - diagramWidth)*(6 - coords[2])/6;
    const picHeight = fixImageSize ? container.height.baseVal.value - diagramWidth : (container.height.baseVal.value - diagramWidth)*(6 - coords[3])/6;
    const rowMax = Math.max(...matrixA) - error;
    const colMax = Math.max(...matrixB) - error;
    const picPadding1 = (container.width.baseVal.value-picWidth)/2;
    const picPadding2 = (container.height.baseVal.value-picHeight)/2;

    if (matrixA[0] - matrixA[2] >= -error && matrixB[0] - matrixB[1] >= -error) {
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
    if (0 < coords[0] && coords[0] < 3 && 0 < coords[1] && coords[1] < 3 && coords[2] < 6 && coords[3] < 6) {
        const mixedRow = mixedPayoff(matrixA);
        const mixedCol = mixedPayoff(matrixB);
        point5Big.style = "fill:" + mixedColor;
        point5Big.style.r = eqRadiiBig*widthBig;
        point5Big.cx.baseVal.value = mixedRow*widthBig/6+paddingBig2;
        point5Big.cy.baseVal.value = (1-mixedCol/6)*widthBig+paddingBig1;
        if (6 - mixedRow < error && 6 - mixedCol < error) point5Big.style.opacity = 0;
    } else {
        point5Big.style.opacity = 0;
    }

    const wholeFigure = document.getElementById("whole-figure");
    const edgeFigure = document.getElementById("edge-figure");

    if (!fixImageSize) {
        if (coords[2] >= 6 && coords[3] >= 6) {
            wholeFigure.style.display = "none";
            edgeFigure.style.display = "none";
        } else if (coords[3] == 6) {
            wholeFigure.style.display = "none";
            edgeFigure.style.display = "";

            const bar = document.getElementById("bar");
            // const bar1 = document.getElementById("bar1");
            // const bar2 = document.getElementById("bar2");
            // const bar3 = document.getElementById("bar3");
            // const bar4 = document.getElementById("bar4");
            const red1 = document.getElementById("red-point1");
            const red2 = document.getElementById("red-point2");
            const red3 = document.getElementById("red-point3");
            const green1 = document.getElementById("green-point1");
            const green2 = document.getElementById("green-point2");
            const green3 = document.getElementById("green-point3");
            const green4 = document.getElementById("green-point4");
            
            // switch (quad) {
            //     case 1:
            //         bar1.style.display = "";
            //         bar2.style.display = "";
            //         bar3.style.display = "";
            //         bar4.style.display = "none";
            //         bar1.style.stroke = lightGreen;
            //         bar2.style.stroke = bad;
            //         bar3.style.stroke = lightGreen;
            //         break;
            //     case 2:
            //         bar1.style.display = "";
            //         bar2.style.display = "none";
            //         bar3.style.display = "";
            //         bar4.style.display = "";
            //         bar1.style.stroke = gold;
            //         bar3.style.stroke = gold;
            //         bar4.style.stroke = bad;
            //         break;
            //     case 3:
            //         bar1.style.display = "";
            //         bar2.style.display = "";
            //         bar3.style.display = "";
            //         bar4.style.display = "";
            //         bar1.style.stroke = cerulean;
            //         bar2.style.stroke = gold;
            //         bar3.style.stroke = bad;
            //         bar4.style.stroke = gold;
            //         break;
            //     case 4:
            //         bar1.style.display = "";
            //         bar2.style.display = "none";
            //         bar3.style.display = "";
            //         bar4.style.display = "none";
            //         bar1.style.stroke = bad;
            //         bar3.style.stroke = cerulean;
            //         break;
            // }

            const barOffset = 0.1*container.width.baseVal.value;
            const barSeparation = 0.03*container.width.baseVal.value;
            bar.x1.baseVal.value = picPadding1;
            bar.x2.baseVal.value = picPadding1 + picWidth;
            bar.y1.baseVal.value = picPadding2;
            bar.y2.baseVal.value = picPadding2;
            bar.style.stroke = "#d3d3d3";
            // bar1.x1.baseVal.value = picPadding1;
            // bar1.x2.baseVal.value = picPadding1 + picWidth/2 + 1;
            // bar1.y1.baseVal.value = picPadding2 + barOffset;
            // bar1.y2.baseVal.value = picPadding2 + barOffset;
            // bar2.x1.baseVal.value = picPadding1;
            // bar2.x2.baseVal.value = picPadding1 + picWidth/2;
            // bar2.y1.baseVal.value = picPadding2 + barOffset + barSeparation;
            // bar2.y2.baseVal.value = picPadding2 + barOffset + barSeparation;
            // bar3.x1.baseVal.value = picPadding1 + picWidth;
            // bar3.x2.baseVal.value = picPadding1 + picWidth/2;
            // bar3.y1.baseVal.value = picPadding2 + barOffset;
            // bar3.y2.baseVal.value = picPadding2 + barOffset;
            // bar4.x1.baseVal.value = picPadding1 + picWidth;
            // bar4.x2.baseVal.value = picPadding1 + picWidth/2;
            // bar4.y1.baseVal.value = picPadding2 + barOffset + barSeparation;
            // bar4.y2.baseVal.value = picPadding2 + barOffset + barSeparation;

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
            edgeFigure.style.display = "";

            const bar = document.getElementById("bar");
            // const bar1 = document.getElementById("bar1");
            // const bar2 = document.getElementById("bar2");
            // const bar3 = document.getElementById("bar3");
            // const bar4 = document.getElementById("bar4");
            const red1 = document.getElementById("red-point1");
            const red2 = document.getElementById("red-point2");
            const red3 = document.getElementById("red-point3");
            const green1 = document.getElementById("green-point1");
            const green2 = document.getElementById("green-point2");
            const green3 = document.getElementById("green-point3");
            const green4 = document.getElementById("green-point4");
            
            // switch (quad) {
            //     case 1:
            //         bar1.style.display = "none";
            //         bar2.style.display = "";
            //         bar3.style.display = "";
            //         bar4.style.display = "";
            //         bar2.style.stroke = lightGreen;
            //         bar3.style.stroke = bad;
            //         bar4.style.stroke = lightGreen;
            //         break;
            //     case 2:
            //         bar1.style.display = "";
            //         bar2.style.display = "none";
            //         bar3.style.display = "";
            //         bar4.style.display = "none";
            //         bar1.style.stroke = gold;
            //         bar3.style.stroke = bad;
            //         break;
            //     case 3:
            //         bar1.style.display = "";
            //         bar2.style.display = "";
            //         bar3.style.display = "";
            //         bar4.style.display = "";
            //         bar1.style.stroke = cerulean;
            //         bar2.style.stroke = bad;
            //         bar3.style.stroke = cerulean;
            //         bar4.style.stroke = gold;
            //         break;
            //     case 4:
            //         bar1.style.display = "";
            //         bar2.style.display = "";
            //         bar3.style.display = "none";
            //         bar4.style.display = "";
            //         bar1.style.stroke = bad;
            //         bar2.style.stroke = cerulean;
            //         bar4.style.stroke = cerulean;
            //         break;
            // }

            const barOffset = 0.1*container.width.baseVal.value;
            const barSeparation = 0.03*container.width.baseVal.value;
            bar.y1.baseVal.value = picPadding2;
            bar.y2.baseVal.value = picPadding2 + picHeight;
            bar.x1.baseVal.value = picPadding1;
            bar.x2.baseVal.value = picPadding1;
            bar.style.stroke = "#d3d3d3";
            // bar1.y1.baseVal.value = picPadding2;
            // bar1.y2.baseVal.value = picPadding2 + picHeight/2 + 1;
            // bar1.x1.baseVal.value = picPadding1 + barOffset;
            // bar1.x2.baseVal.value = picPadding1 + barOffset;
            // bar2.y1.baseVal.value = picPadding2;
            // bar2.y2.baseVal.value = picPadding2 + picHeight/2;
            // bar2.x1.baseVal.value = picPadding1 + barOffset + barSeparation;
            // bar2.x2.baseVal.value = picPadding1 + barOffset + barSeparation;
            // bar3.y1.baseVal.value = picPadding2 + picHeight;
            // bar3.y2.baseVal.value = picPadding2 + picHeight/2;
            // bar3.x1.baseVal.value = picPadding1 + barOffset;
            // bar3.x2.baseVal.value = picPadding1 + barOffset;
            // bar4.y1.baseVal.value = picPadding2 + picHeight;
            // bar4.y2.baseVal.value = picPadding2 + picHeight/2;
            // bar4.x1.baseVal.value = picPadding1 + barOffset + barSeparation;
            // bar4.x2.baseVal.value = picPadding1 + barOffset + barSeparation;

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
            edgeFigure.style.display = "none";
        }
    } else {
        wholeFigure.style.display = "";
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

    const backdrop = document.getElementById("backdrop");
    backdrop.x.baseVal.value = container.width.baseVal.value/2 - diagramWidth*3;
    backdrop.y.baseVal.value = container.height.baseVal.value/2 - diagramWidth*3;
    backdrop.width.baseVal.value = diagramWidth*6;
    backdrop.height.baseVal.value = diagramWidth*6;

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

    const boundaryLine1 = document.getElementById("boundary-line-1");
    const boundaryLine2 = document.getElementById("boundary-line-2");
    const boundaryLine3 = document.getElementById("boundary-line-3");
    const boundaryLine4 = document.getElementById("boundary-line-4");
    const boundaryLine5 = document.getElementById("boundary-line-5");
    const boundaryLine6 = document.getElementById("boundary-line-6");
    const boundaryLine7 = document.getElementById("boundary-line-7");
    const boundaryLine8 = document.getElementById("boundary-line-8");
    const boundaryLine9 = document.getElementById("boundary-line-9");
    const boundaryLine10 = document.getElementById("boundary-line-10");
    const boundaryLine11 = document.getElementById("boundary-line-11");
    const boundaryLine12 = document.getElementById("boundary-line-12");
    const boundaryLine13 = document.getElementById("boundary-line-13");
    const boundaryLine14 = document.getElementById("boundary-line-14");
    const boundaryLine15 = document.getElementById("boundary-line-15");
    const boundaryLine16 = document.getElementById("boundary-line-16");
    const boundaryLine17 = document.getElementById("boundary-line-17");
    const boundaryLine18 = document.getElementById("boundary-line-18");
    const boundaryLine19 = document.getElementById("boundary-line-19");
    const boundaryLine20 = document.getElementById("boundary-line-20");
    const boundaryLine21 = document.getElementById("boundary-line-21");
    const boundaryLine22 = document.getElementById("boundary-line-22");
    const boundaryLine23 = document.getElementById("boundary-line-23");
    const boundaryLine24 = document.getElementById("boundary-line-24");
    const boundaryPoint1 = document.getElementById("boundary-point-1");
    // const boundaryPoint2 = document.getElementById("boundary-point-2");
    const boundaryPoint3 = document.getElementById("boundary-point-3");
    const boundaryPoint4 = document.getElementById("boundary-point-4");
    const boundaryPoint5 = document.getElementById("boundary-point-5");
    // const boundaryPoint6 = document.getElementById("boundary-point-6");
    // const boundaryPoint7 = document.getElementById("boundary-point-7");
    const boundaryPoint8 = document.getElementById("boundary-point-8");
    const boundaryPoint9 = document.getElementById("boundary-point-9");
    const hotspot1 = document.getElementById("hotspot-1");
    const hotspot2 = document.getElementById("hotspot-2");
    const hotspot3 = document.getElementById("hotspot-3");

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

    if (coords[2] == 0) {
        boundaryLine1.x1.baseVal.value = picWidth/6+picPadding1;
        boundaryLine1.y1.baseVal.value = picHeight/12+picPadding2;
        boundaryLine1.x2.baseVal.value = picWidth/6+picPadding1;
        boundaryLine1.y2.baseVal.value = picHeight*3/12+picPadding2;
        boundaryLine2.x1.baseVal.value = picWidth/2+picPadding1;
        boundaryLine2.y1.baseVal.value = picHeight/12+picPadding2;
        boundaryLine2.x2.baseVal.value = picWidth/2+picPadding1;
        boundaryLine2.y2.baseVal.value = picHeight*3/12+picPadding2;
        boundaryLine3.x1.baseVal.value = picWidth*5/6+picPadding1;
        boundaryLine3.y1.baseVal.value = picHeight/12+picPadding2;
        boundaryLine3.x2.baseVal.value = picWidth*5/6+picPadding1;
        boundaryLine3.y2.baseVal.value = picHeight*3/12+picPadding2;
        boundaryLine4.x1.baseVal.value = picWidth/6+picPadding1;
        boundaryLine4.y1.baseVal.value = picHeight*5/12+picPadding2;
        boundaryLine4.x2.baseVal.value = picWidth/6+picPadding1;
        boundaryLine4.y2.baseVal.value = picHeight*7/12+picPadding2;
        boundaryLine5.x1.baseVal.value = picWidth/2+picPadding1;
        boundaryLine5.y1.baseVal.value = picHeight*5/12+picPadding2;
        boundaryLine5.x2.baseVal.value = picWidth/2+picPadding1;
        boundaryLine5.y2.baseVal.value = picHeight*7/12+picPadding2;
        boundaryLine6.x1.baseVal.value = picWidth*5/6+picPadding1;
        boundaryLine6.y1.baseVal.value = picHeight*5/12+picPadding2;
        boundaryLine6.x2.baseVal.value = picWidth*5/6+picPadding1;
        boundaryLine6.y2.baseVal.value = picHeight*7/12+picPadding2;
        boundaryLine7.x1.baseVal.value = picWidth/6+picPadding1;
        boundaryLine7.y1.baseVal.value = picHeight*9/12+picPadding2;
        boundaryLine7.x2.baseVal.value = picWidth/6+picPadding1;
        boundaryLine7.y2.baseVal.value = picHeight*11/12+picPadding2;
        boundaryLine8.x1.baseVal.value = picWidth/2+picPadding1;
        boundaryLine8.y1.baseVal.value = picHeight*9/12+picPadding2;
        boundaryLine8.x2.baseVal.value = picWidth/2+picPadding1;
        boundaryLine8.y2.baseVal.value = picHeight*11/12+picPadding2;
        boundaryLine9.x1.baseVal.value = picWidth*5/6+picPadding1;
        boundaryLine9.y1.baseVal.value = picHeight*9/12+picPadding2;
        boundaryLine9.x2.baseVal.value = picWidth*5/6+picPadding1;
        boundaryLine9.y2.baseVal.value = picHeight*11/12+picPadding2;
        boundaryLine1.style.display = "";
        boundaryLine2.style.display = "";
        boundaryLine3.style.display = "";
        boundaryLine4.style.display = "";
        boundaryLine5.style.display = "";
        boundaryLine6.style.display = "";
        boundaryLine7.style.display = "";
        boundaryLine8.style.display = "";
        boundaryLine9.style.display = "";
    } else {
        boundaryLine1.style.display = "none";
        boundaryLine2.style.display = "none";
        boundaryLine3.style.display = "none";
        boundaryLine4.style.display = "none";
        boundaryLine5.style.display = "none";
        boundaryLine6.style.display = "none";
        boundaryLine7.style.display = "none";
        boundaryLine8.style.display = "none";
        boundaryLine9.style.display = "none";
    }
    if (coords[3] == 0) {
        boundaryLine10.x1.baseVal.value = picWidth/12+picPadding1;
        boundaryLine10.y1.baseVal.value = picHeight/6+picPadding2;
        boundaryLine10.x2.baseVal.value = picWidth*3/12+picPadding1;
        boundaryLine10.y2.baseVal.value = picHeight/6+picPadding2;
        boundaryLine11.x1.baseVal.value = picWidth*5/12+picPadding1;
        boundaryLine11.y1.baseVal.value = picHeight/6+picPadding2;
        boundaryLine11.x2.baseVal.value = picWidth*7/12+picPadding1;
        boundaryLine11.y2.baseVal.value = picHeight/6+picPadding2;
        boundaryLine12.x1.baseVal.value = picWidth*9/12+picPadding1;
        boundaryLine12.y1.baseVal.value = picHeight/6+picPadding2;
        boundaryLine12.x2.baseVal.value = picWidth*11/12+picPadding1;
        boundaryLine12.y2.baseVal.value = picHeight/6+picPadding2;
        boundaryLine13.x1.baseVal.value = picWidth/12+picPadding1;
        boundaryLine13.y1.baseVal.value = picHeight/2+picPadding2;
        boundaryLine13.x2.baseVal.value = picWidth*3/12+picPadding1;
        boundaryLine13.y2.baseVal.value = picHeight/2+picPadding2;
        boundaryLine14.x1.baseVal.value = picWidth*5/12+picPadding1;
        boundaryLine14.y1.baseVal.value = picHeight/2+picPadding2;
        boundaryLine14.x2.baseVal.value = picWidth*7/12+picPadding1;
        boundaryLine14.y2.baseVal.value = picHeight/2+picPadding2;
        boundaryLine15.x1.baseVal.value = picWidth*9/12+picPadding1;
        boundaryLine15.y1.baseVal.value = picHeight/2+picPadding2;
        boundaryLine15.x2.baseVal.value = picWidth*11/12+picPadding1;
        boundaryLine15.y2.baseVal.value = picHeight/2+picPadding2;
        boundaryLine16.x1.baseVal.value = picWidth/12+picPadding1;
        boundaryLine16.y1.baseVal.value = picHeight*5/6+picPadding2;
        boundaryLine16.x2.baseVal.value = picWidth*3/12+picPadding1;
        boundaryLine16.y2.baseVal.value = picHeight*5/6+picPadding2;
        boundaryLine17.x1.baseVal.value = picWidth*5/12+picPadding1;
        boundaryLine17.y1.baseVal.value = picHeight*5/6+picPadding2;
        boundaryLine17.x2.baseVal.value = picWidth*7/12+picPadding1;
        boundaryLine17.y2.baseVal.value = picHeight*5/6+picPadding2;
        boundaryLine18.x1.baseVal.value = picWidth*9/12+picPadding1;
        boundaryLine18.y1.baseVal.value = picHeight*5/6+picPadding2;
        boundaryLine18.x2.baseVal.value = picWidth*11/12+picPadding1;
        boundaryLine18.y2.baseVal.value = picHeight*5/6+picPadding2;
        boundaryLine10.style.display = "";
        boundaryLine11.style.display = "";
        boundaryLine12.style.display = "";
        boundaryLine13.style.display = "";
        boundaryLine14.style.display = "";
        boundaryLine15.style.display = "";
        boundaryLine16.style.display = "";
        boundaryLine17.style.display = "";
        boundaryLine18.style.display = "";
    } else {
        boundaryLine10.style.display = "none";
        boundaryLine11.style.display = "none";
        boundaryLine12.style.display = "none";
        boundaryLine13.style.display = "none";
        boundaryLine14.style.display = "none";
        boundaryLine15.style.display = "none";
        boundaryLine16.style.display = "none";
        boundaryLine17.style.display = "none";
        boundaryLine18.style.display = "none";
    }
    if (coords[2] == 0 && coords[3] == 0) {
        boundaryPoint1.cx.baseVal.value = picWidth/6+picPadding1;
        boundaryPoint1.cy.baseVal.value = picHeight/6+picPadding2;
        // boundaryPoint2.cx.baseVal.value = picWidth/2+picPadding1;
        // boundaryPoint2.cy.baseVal.value = picHeight/6+picPadding2;
        boundaryPoint3.cx.baseVal.value = picWidth*5/6+picPadding1;
        boundaryPoint3.cy.baseVal.value = picHeight/6+picPadding2;
        boundaryPoint4.cx.baseVal.value = picWidth/6+picPadding1;
        boundaryPoint4.cy.baseVal.value = picHeight/2+picPadding2;
        boundaryPoint5.cx.baseVal.value = picWidth/2+picPadding1;
        boundaryPoint5.cy.baseVal.value = picHeight/2+picPadding2;
        // boundaryPoint6.cx.baseVal.value = picWidth*5/6+picPadding1;
        // boundaryPoint6.cy.baseVal.value = picHeight/2+picPadding2;
        // boundaryPoint7.cx.baseVal.value = picWidth/6+picPadding1;
        // boundaryPoint7.cy.baseVal.value = picHeight*5/6+picPadding2;
        boundaryPoint8.cx.baseVal.value = picWidth/2+picPadding1;
        boundaryPoint8.cy.baseVal.value = picHeight*5/6+picPadding2;
        boundaryPoint9.cx.baseVal.value = picWidth*5/6+picPadding1;
        boundaryPoint9.cy.baseVal.value = picHeight*5/6+picPadding2;
        boundaryPoint1.style.display = "";
        // boundaryPoint2.style.display = "";
        boundaryPoint3.style.display = "";
        boundaryPoint4.style.display = "";
        boundaryPoint5.style.display = "";
        // boundaryPoint6.style.display = "";
        // boundaryPoint7.style.display = "";
        boundaryPoint8.style.display = "";
        boundaryPoint9.style.display = "";
        // hotspot1.style.display = "none";
        // hotspot2.style.display = "none";
        // hotspot3.style.display = "none";
    } else {
        boundaryPoint1.style.display = "none";
        // boundaryPoint2.style.display = "none";
        boundaryPoint3.style.display = "none";
        boundaryPoint4.style.display = "none";
        boundaryPoint5.style.display = "none";
        // boundaryPoint6.style.display = "none";
        // boundaryPoint7.style.display = "none";
        boundaryPoint8.style.display = "none";
        boundaryPoint9.style.display = "none";
        // hotspot1.style.display = "";
        // hotspot2.style.display = "";
        // hotspot3.style.display = "";
    }
    hotspot1.cx.baseVal.value = picWidth/2+picPadding1;
    hotspot1.cy.baseVal.value = picHeight/6+picPadding2;
    hotspot2.cx.baseVal.value = picWidth*5/6+picPadding1;
    hotspot2.cy.baseVal.value = picHeight/2+picPadding2;
    hotspot3.cx.baseVal.value = picWidth/6+picPadding1;
    hotspot3.cy.baseVal.value = picHeight*5/6+picPadding2;

    updateBlueLines();

    // update big picture
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
    points.push([ quad, coords[0] % 6, coords[1] % 6 ]);
    if (coords[2] == 0) {
        let redLine = Math.round((points[0][1]+1)/2)*2-1;
        points.push([ qOverBlue(true, quad, points[0][1], points[0][2]), (redLine - (points[0][1] - redLine) + 6) % 6, points[0][2] ]);
        if (Number.isInteger(coords[0]/2)) {
            let redLine = Math.round((points[1][1]+1)/2)*2-1;
            points.push([ qOverBlue(true, points[1][0], points[1][1], points[1][2]), (redLine - (points[1][1] - redLine) + 6) % 6, points[1][2] ]);
        }
    }
    if (coords[3] == 0) {
        const length = points.length;
        for (let i = 0; i < length; i++) {
            let redLine = Math.round((points[i][2]+1)/2)*2-1;
            points.push([ qOverBlue(false, points[i][0], points[i][1], points[i][2]), points[i][1], (redLine - (points[i][2] - redLine) + 6) % 6 ]);
        }
        if (Number.isInteger(coords[1]/2)) {
            for (let i = length; i < 2*length; i++) {
                let redLine = Math.round((points[i][2]+1)/2)*2-1;
                points.push([ qOverBlue(false, points[i][0], points[i][1], points[i][2]), points[i][1], (redLine - (points[i][2] - redLine) + 6) % 6 ]);
            }
        }
    }
    if (draggingInBigPic && isMouseDown) {
        placePoint(bigPicPoint1, quad, coords[0], coords[1]);
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

    // update birhombic picture
    const birhombicPic = document.getElementById("birhombic-pic");
    const brRowPlayer = document.getElementById("br-row-player");
    const brColPlayer = document.getElementById("br-col-player");
    const brRowRect = document.getElementById("br-row-rect");

    const birhombicWidth = birhombicPic.width.baseVal.value;
    const birhombicHeight = birhombicPic.height.baseVal.value;
    const birhombicDiagramWidth = birhombicWidth - birhombicPadding*2;
    const birhombicDiagramHeight = birhombicDiagramWidth*Math.sqrt(3)/4;
    const birhombicDiagramPadding = (birhombicHeight - birhombicDiagramHeight)/2;
    const starWidth = brRowRect.width.baseVal.value;

    let [brRowX, brRowY] = coordsToRhombic(true, ...(!useAltSchema ? [coords[0], coords[2]] : matrixToCoords(matrixA)), quad);
    brRowX = brRowX*birhombicDiagramWidth/4 + birhombicDiagramWidth/2 + birhombicPadding - starWidth/2;
    brRowY = birhombicDiagramHeight - brRowY*birhombicDiagramHeight/Math.sqrt(3) + birhombicDiagramPadding - starWidth/2;
    brRowPlayer.x.baseVal.value = brRowX;
    brRowPlayer.y.baseVal.value = brRowY;
    let [brColX, brColY] = coordsToRhombic(false, ...(!useAltSchema ? [coords[1], coords[3]] : matrixToCoords(flip(matrixB))), quad);
    brColX = brColX*birhombicDiagramWidth/4 + birhombicDiagramWidth/2 + birhombicPadding - starWidth/2;
    brColY = birhombicDiagramHeight - brColY*birhombicDiagramHeight/Math.sqrt(3) + birhombicDiagramPadding - starWidth/2;
    brColPlayer.x.baseVal.value = brColX;
    brColPlayer.y.baseVal.value = brColY;

    // update canvas
    if (backgroundOutOfDate && viewMode != 0) {
        if (!draggingB1 && !draggingB2 && !b1up && !b1down && !b2up && !b2down && b1V == 0 && b2V == 0) {
            updateCanvas(false);
        } else {
            updateCanvas(true);
        }
    }

    if (backgroundOutOfDate && (coords[2] < 6-error && coords[3] < 6-error || fixImageSize) && viewMode != 0) {
        const foreignObject = document.getElementById("canvasForeignObject");
        const canvas = document.getElementById("canvas");

        // update the size of the canvas
        foreignObject.x.baseVal.value = picPadding1;
        foreignObject.y.baseVal.value = picPadding2;
        foreignObject.width.baseVal.value = picWidth;
        foreignObject.height.baseVal.value = picHeight;
        canvas.width = picWidth;
        canvas.height = picHeight;

        // if (time % 3 == 0 || switchMode) {
        valuesX = 6*Math.round(picWidth/30);
        valuesY = 6*Math.round(picHeight/30);
        // if (valuesX == 0 || valuesY == 0) {
        values = [];
        for (let j = 0; j < valuesY; j++) {
            values.push([]);
            for (let i = 0; i < valuesX; i++) {
                let [rowM, colM] = (!useAltSchema) ? 
                                        coordsToMatrices((i+0.5)/valuesX*6, (valuesY-j-0.5)/valuesY*6,
                                                        coords[2] != 0 ? coords[2] : coords[2] + error*2,
                                                        coords[3] != 0 ? coords[3] : coords[3] + error*2) :
                                        coordsToMatricesAlt((i+0.5)/valuesX*6, (valuesY-j-0.5)/valuesY*6, quad);
                if (!viewModeP1) {
                    [rowM, colM] = [flip(rowM), flip(colM)].toReversed();
                }
                switch (viewMode) {
                    case 1:
                        values[j].push(payoff(rowM, colM)/9);
                        break;
                    case 2:
                        values[j].push(payoffTransferable(rowM, colM)/9);
                        break;
                    case 3:
                        values[j].push(payoffModified(rowM, colM)/9);
                        break;
                    case 4:
                        values[j].push(payoffCoco(rowM, colM)[0]/9);
                        break;
                    case 5:
                        values[j].push(payoffBargainingBackstop(rowM, colM)[0]/9);
                        break;
                    case 6:
                        values[j].push(payoffBargainingDisagreement(rowM, colM)[0]/9);
                        break;
                    case 7:
                        values[j].push(payoffCustom(rowM, colM));
                        break;
                    case 8:
                        values[j].push(coordination(rowM, colM));
                        break;
                    case 9:
                        values[j].push(payoffShapley(rowM, colM)[0]/9);
                        break;
                }
            }
        }
        switchMode = false;
        backgroundOutOfDate = false;
        // }

        const ctx = canvas.getContext("2d");
        const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
        const data = imageData.data;
        for (let j = 0; j < canvas.height; j++) {
            for (let i = 0; i < canvas.width; i++) {
                let value = 0;

                // Apply linear interpolation between samples
                value = values[Math.floor(j/canvas.height*valuesY)][Math.floor(i/canvas.width*valuesX)];
                if ((viewMode == 3 || viewMode == 1) && viewModeP1) {
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
                // if ((i < canvas.width/2 && j >= canvas.height/2 && viewMode == 3 && (quad == 1 || quad == 3)) || viewMode == 7) {
                if (!draggingB1 && !draggingB2 && !b1up && !b1down && !b2up && !b2down && b1V == 0 && b2V == 0) {
                    // const n = Math.floor(i/canvas.width*valuesX);
                    // const m = Math.floor(j/canvas.height*valuesY);
                    // const jumpSize = 0.01;
                    let boundary = true; // false
                    // if (n != 0 && Math.abs(values[m][n-1] - values[m][n]) > jumpSize) boundary = true;
                    // if (n != 0 && m != 0 && Math.abs(values[m-1][n-1] - values[m][n]) > jumpSize) boundary = true;
                    // if (m != 0 && Math.abs(values[m-1][n] - values[m][n]) > jumpSize) boundary = true;
                    // if (n != valuesX-1 && m != 0 && Math.abs(values[m-1][n+1] - values[m][n]) > jumpSize) boundary = true;
                    // if (n != valuesX-1 && Math.abs(values[m][n+1] - values[m][n]) > jumpSize) boundary = true;
                    // if (n != valuesX-1 && m != valuesY-1 && Math.abs(values[m+1][n+1] - values[m][n]) > jumpSize) boundary = true;
                    // if (m != valuesY-1 && Math.abs(values[m][n+1] - values[m][n]) > jumpSize) boundary = true;
                    // if (n != 0 && m != valuesY-1 && Math.abs(values[m+1][n-1] - values[m][n]) > jumpSize) boundary = true;

                    if (boundary) {
                        let [rowM, colM] = (!useAltSchema) ? 
                                            coordsToMatrices(i/canvas.width*6, (canvas.height-j)/canvas.height*6,
                                                            coords[2] != 0 ? coords[2] : coords[2] + error*2,
                                                            coords[3] != 0 ? coords[3] : coords[3] + error*2) :
                                            coordsToMatricesAlt(i/canvas.width*6, (canvas.height-j)/canvas.height*6, quad);
                        if (!viewModeP1) {
                            [rowM, colM] = [flip(rowM), flip(colM)].toReversed();
                        }
                        switch (viewMode) {
                            case 1:
                                value = payoff(rowM, colM)/9;
                                break;
                            case 2:
                                value = payoffTransferable(rowM, colM)/9;
                                break;
                            case 3:
                                value = payoffModified(rowM, colM)/9;
                                break;
                            case 4:
                                value = payoffCoco(rowM, colM)[0]/9;
                                break;
                            case 5:
                                value = payoffBargainingBackstop(rowM, colM)[0]/9;
                                break;
                            case 6:
                                value = payoffBargainingDisagreement(rowM, colM)[0]/9;
                                break;
                            case 7:
                                value = payoffCustom(rowM, colM);
                                break;
                            case 8:
                                value = coordination(rowM, colM);
                                break;
                            case 9:
                                value = payoffShapley(rowM, colM)[0]/9;
                                break;
                        }
                    }
                }

                const color = colorFunction(value, viewMode);
                data[(j*canvas.width+i)*4]   = color[0];
                data[(j*canvas.width+i)*4+1] = color[1];
                data[(j*canvas.width+i)*4+2] = color[2];
                data[(j*canvas.width+i)*4+3] = 255;
            }
        }
        ctx.putImageData(imageData,0,0);
    }

    if (coords[0] % 1 != 0) {
        nearestCentroid[0] = Math.round(coords[0]-0.5)+0.5;
    }
    if (coords[1] % 1 != 0) {
        nearestCentroid[1] = Math.round(coords[1]-0.5)+0.5;
    }

    // update cell name
    const cellName = document.getElementById("cell-name");
    let cellCol = 6 - (Math.floor(coords[0])+2) % 6;
    let cellRow = 6 - (Math.floor(coords[1])+2) % 6;
    cellName.innerHTML = cellCol.toString() + "," + cellRow.toString();

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
    quad = qOverBlue(p1, quad, coords[0], coords[1]);
    updateBackground();
    if (p1) {
        let redLine = Math.round((coords[0]+1)/2)*2-1;
        coords[0] = (redLine - (coords[0] - redLine) + 6) % 6;
    } else {
        let redLine = Math.round((coords[1]+1)/2)*2-1;
        coords[1] = (redLine - (coords[1] - redLine) + 6) % 6;
    }
}

function crossRed(p1) {
    if (p1) {
        let redLine = Math.round((coords[0]+1)/2)*2-1;
        coords[0] = (redLine - (coords[0] - redLine) + 6) % 6;
    } else {
        let redLine = Math.round((coords[1]+1)/2)*2-1;
        coords[1] = (redLine - (coords[1] - redLine) + 6) % 6;
    }
}

function crossGreen(p1) {
    if (p1) {
        let greenLine = Math.round(coords[0]/2)*2;
        coords[0] = (greenLine - (coords[0] - greenLine) + 6) % 6;
    } else {
        let greenLine = Math.round(coords[1]/2)*2;
        coords[1] = (greenLine - (coords[1] - greenLine) + 6) % 6;
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

function switchMatrices() {
    for (let i = 0; i < 4; i++) {
        let temp = matrixA[i];
        matrixA[i] = matrixB[i];
        matrixB[i] = temp;
    }
    updateCoords();
}

function flipMatrices() {
    let tempA = flip(matrixA);
    let tempB = flip(matrixB);
    for (let i = 0; i < 4; i++) {
        matrixA[i] = tempA[i];
        matrixB[i] = tempB[i];
    }
    updateCoords();
}

function negate(p1) {
    if (p1) {
        for (let i = 0; i < 4; i++) matrixA[i] = 6 - matrixA[i];
    } else {
        for (let i = 0; i < 4; i++) matrixB[i] = 6 - matrixB[i];
    }
    updateCoords();
}

function switchRows() {
    const temp = [...matrixA];
    matrixA[0] = temp[2];
    matrixA[1] = temp[3];
    matrixA[2] = temp[0];
    matrixA[3] = temp[1];
    updateCoords();
}

function switchColumns() {
    const temp = [...matrixB];
    matrixB[0] = temp[1];
    matrixB[1] = temp[0];
    matrixB[2] = temp[3];
    matrixB[3] = temp[2];
    updateCoords();
}

function rotate() {
    const tempA = [...matrixA];
    const tempB = [...matrixB];
    matrixA[0] = tempA[3];
    matrixA[2] = tempA[0];
    matrixA[3] = tempA[2];
    matrixB[0] = tempB[3];
    matrixB[2] = tempB[0];
    matrixB[3] = tempB[2];
    updateCoords();
}

function randomGame() {
    matrixA = normalize([Math.random(),Math.random(),Math.random(),Math.random()]);
    matrixB = normalize([Math.random(),Math.random(),Math.random(),Math.random()]);
    updateCoords();
}

function updateBackground() {
    if (window.Worker) {
        console.log("check");
        const myWorker = new Worker('game-theory-worker.js');
        myWorker.postMessage(10);
        myWorker.onmessage = function(event) {
            console.log('Result from worker:', event.data);
        };
        
        myWorker.onerror = function(error) {
            console.error('Worker error:', error.message);
        };
    } else {
        console.log("check");
    }

    backgroundOutOfDate = true;
    updateRequired = true;

    const region1 = document.getElementById("region1");
    const region2 = document.getElementById("region2");
    const region3 = document.getElementById("region3");
    const region4 = document.getElementById("region4");
    // const header = document.getElementById("quad-header");
    const boundaryLine1 = document.getElementById("boundary-line-1");
    const boundaryLine2 = document.getElementById("boundary-line-2");
    const boundaryLine3 = document.getElementById("boundary-line-3");
    const boundaryLine4 = document.getElementById("boundary-line-4");
    const boundaryLine5 = document.getElementById("boundary-line-5");
    const boundaryLine6 = document.getElementById("boundary-line-6");
    const boundaryLine7 = document.getElementById("boundary-line-7");
    const boundaryLine8 = document.getElementById("boundary-line-8");
    const boundaryLine9 = document.getElementById("boundary-line-9");
    const boundaryLine10 = document.getElementById("boundary-line-10");
    const boundaryLine11 = document.getElementById("boundary-line-11");
    const boundaryLine12 = document.getElementById("boundary-line-12");
    const boundaryLine13 = document.getElementById("boundary-line-13");
    const boundaryLine14 = document.getElementById("boundary-line-14");
    const boundaryLine15 = document.getElementById("boundary-line-15");
    const boundaryLine16 = document.getElementById("boundary-line-16");
    const boundaryLine17 = document.getElementById("boundary-line-17");
    const boundaryLine18 = document.getElementById("boundary-line-18");
    const boundaryLine19 = document.getElementById("boundary-line-19");
    const boundaryLine20 = document.getElementById("boundary-line-20");
    const boundaryLine21 = document.getElementById("boundary-line-21");
    const boundaryLine22 = document.getElementById("boundary-line-22");
    const boundaryLine23 = document.getElementById("boundary-line-23");
    const boundaryLine24 = document.getElementById("boundary-line-24");
    const boundaryPoint1 = document.getElementById("boundary-point-1");
    // const boundaryPoint2 = document.getElementById("boundary-point-2");
    const boundaryPoint3 = document.getElementById("boundary-point-3");
    const boundaryPoint4 = document.getElementById("boundary-point-4");
    const boundaryPoint5 = document.getElementById("boundary-point-5");
    // const boundaryPoint6 = document.getElementById("boundary-point-6");
    // const boundaryPoint7 = document.getElementById("boundary-point-7");
    const boundaryPoint8 = document.getElementById("boundary-point-8");
    const boundaryPoint9 = document.getElementById("boundary-point-9");
    const hotspot1 = document.getElementById("hotspot-1");
    const hotspot2 = document.getElementById("hotspot-2");
    const hotspot3 = document.getElementById("hotspot-3");
    const header = document.getElementById("quadrant-label")

    switch (quad) {
        case 1:
            region1.style.fill = greenBackground;
            region2.style.fill = greenBackground;
            region3.style.fill = "url('#gradient1')";
            region4.style.fill = greenBackground;
            // header.innerHTML = "Good Quadrant";
            header.innerHTML = "Good quadrant";
            header.style.color = lightGreen;

            boundaryLine1.style.stroke = bad;
            boundaryLine2.style.stroke = gold;
            boundaryLine3.style.stroke = cerulean;
            boundaryLine4.style.stroke = bad;
            boundaryLine5.style.stroke = gold;
            boundaryLine6.style.stroke = cerulean;
            boundaryLine7.style.stroke = bad;
            boundaryLine8.style.stroke = gold;
            boundaryLine9.style.stroke = cerulean;
            boundaryLine10.style.stroke = gold;
            boundaryLine11.style.stroke = gold;
            boundaryLine12.style.stroke = gold;
            boundaryLine13.style.stroke = cerulean;
            boundaryLine14.style.stroke = cerulean;
            boundaryLine15.style.stroke = cerulean;
            boundaryLine16.style.stroke = bad;
            boundaryLine17.style.stroke = bad;
            boundaryLine18.style.stroke = bad;
            // boundaryPoint1.style.fill = cerulean;
            // boundaryPoint2.style.fill = lightGreen;
            // boundaryPoint3.style.fill = bad;
            // boundaryPoint4.style.fill = gold;
            // boundaryPoint5.style.fill = bad;
            // boundaryPoint6.style.fill = lightGreen;
            // boundaryPoint7.style.fill = lightGreen;
            // boundaryPoint8.style.fill = cerulean;
            // boundaryPoint9.style.fill = gold;
            hotspot1.style.fill = gold;
            hotspot2.style.fill = cerulean;
            hotspot3.style.fill = bad;
            break;
        case 2:
            region1.style.fill = goldBackground;
            region2.style.fill = goldBackground;
            region3.style.fill = "white";
            region4.style.fill = grayBackground;
            // header.innerHTML = "Row Quadrant";
            header.innerHTML = "Row quadrant";
            header.style.color = gold;
            
            boundaryLine1.style.stroke = cerulean;
            boundaryLine2.style.stroke = lightGreen;
            boundaryLine3.style.stroke = bad;
            boundaryLine4.style.stroke = cerulean;
            boundaryLine5.style.stroke = lightGreen;
            boundaryLine6.style.stroke = bad;
            boundaryLine7.style.stroke = cerulean;
            boundaryLine8.style.stroke = lightGreen;
            boundaryLine9.style.stroke = bad;
            boundaryLine10.style.stroke = lightGreen;
            boundaryLine11.style.stroke = lightGreen;
            boundaryLine12.style.stroke = lightGreen;
            boundaryLine13.style.stroke = bad;
            boundaryLine14.style.stroke = bad;
            boundaryLine15.style.stroke = bad;
            boundaryLine16.style.stroke = cerulean;
            boundaryLine17.style.stroke = cerulean;
            boundaryLine18.style.stroke = cerulean;
            // boundaryPoint1.style.fill = bad;
            // boundaryPoint2.style.fill = gold;
            // boundaryPoint3.style.fill = cerulean;
            // boundaryPoint4.style.fill = lightGreen;
            // boundaryPoint5.style.fill = cerulean;
            // boundaryPoint6.style.fill = gold;
            // boundaryPoint7.style.fill = gold;
            // boundaryPoint8.style.fill = bad;
            // boundaryPoint9.style.fill = lightGreen;
            hotspot1.style.fill = lightGreen;
            hotspot2.style.fill = bad;
            hotspot3.style.fill = cerulean;
            break;
        case 3:
            region1.style.fill = ceruleanBackground;
            region2.style.fill = grayBackground;
            region3.style.fill = "url('#gradient2')";
            region4.style.fill = goldBackground;
            // header.innerHTML = "Bad Quadrant";
            header.innerHTML = "Bad quadrant";
            header.style.color = bad;
            
            boundaryLine1.style.stroke = lightGreen;
            boundaryLine2.style.stroke = cerulean;
            boundaryLine3.style.stroke = gold;
            boundaryLine4.style.stroke = lightGreen;
            boundaryLine5.style.stroke = cerulean;
            boundaryLine6.style.stroke = gold;
            boundaryLine7.style.stroke = lightGreen;
            boundaryLine8.style.stroke = cerulean;
            boundaryLine9.style.stroke = gold;
            boundaryLine10.style.stroke = cerulean;
            boundaryLine11.style.stroke = cerulean;
            boundaryLine12.style.stroke = cerulean;
            boundaryLine13.style.stroke = gold;
            boundaryLine14.style.stroke = gold;
            boundaryLine15.style.stroke = gold;
            boundaryLine16.style.stroke = lightGreen;
            boundaryLine17.style.stroke = lightGreen;
            boundaryLine18.style.stroke = lightGreen;
            // boundaryPoint1.style.fill = gold;
            // boundaryPoint2.style.fill = bad;
            // boundaryPoint3.style.fill = lightGreen;
            // boundaryPoint4.style.fill = cerulean;
            // boundaryPoint5.style.fill = lightGreen;
            // boundaryPoint6.style.fill = bad;
            // boundaryPoint7.style.fill = bad;
            // boundaryPoint8.style.fill = gold;
            // boundaryPoint9.style.fill = cerulean;
            hotspot1.style.fill = cerulean;
            hotspot2.style.fill = gold;
            hotspot3.style.fill = lightGreen;
            break;
        case 4:
            region1.style.fill = grayBackground;
            region2.style.fill = ceruleanBackground;
            region3.style.fill = "white";
            region4.style.fill = ceruleanBackground;
            // header.innerHTML = "Column Quadrant";
            header.innerHTML = "Column quadrant";
            header.style.color = cerulean;
            
            boundaryLine1.style.stroke = gold;
            boundaryLine2.style.stroke = bad;
            boundaryLine3.style.stroke = lightGreen;
            boundaryLine4.style.stroke = gold;
            boundaryLine5.style.stroke = bad;
            boundaryLine6.style.stroke = lightGreen;
            boundaryLine7.style.stroke = gold;
            boundaryLine8.style.stroke = bad;
            boundaryLine9.style.stroke = lightGreen;
            boundaryLine10.style.stroke = bad;
            boundaryLine11.style.stroke = bad;
            boundaryLine12.style.stroke = bad;
            boundaryLine13.style.stroke = lightGreen;
            boundaryLine14.style.stroke = lightGreen;
            boundaryLine15.style.stroke = lightGreen;
            boundaryLine16.style.stroke = gold;
            boundaryLine17.style.stroke = gold;
            boundaryLine18.style.stroke = gold;
            // boundaryPoint1.style.fill = lightGreen;
            // boundaryPoint2.style.fill = cerulean;
            // boundaryPoint3.style.fill = gold;
            // boundaryPoint4.style.fill = bad;
            // boundaryPoint5.style.fill = gold;
            // boundaryPoint6.style.fill = cerulean;
            // boundaryPoint7.style.fill = cerulean;
            // boundaryPoint8.style.fill = lightGreen;
            // boundaryPoint9.style.fill = bad;
            hotspot1.style.fill = bad;
            hotspot2.style.fill = lightGreen;
            hotspot3.style.fill = gold;
            break;
    }
    if (diagramGrid) {
        updateDiagramGrid();
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

// function coordsToMatrices(x1,x2,b1,b2,q=quad) {
//     let x1new = x1;
//     let x2new = x2;
//     if (q == 2 || q == 3) {
//         x1new -= 6;
//     } else if (x1 == 0) {
//         x1new += 6;
//     }
//     if (q == 3 || q == 4) {
//         x2new -= 6;
//     } else if (x2 == 0) {
//         x2new += 6;
//     }
//     if (-6 <= x1new && x1new <= 6 && -6 <= x2new && x2new <= 6 && 
//          0 <= b1 && b1 <= 6 && 0 <= b2 && b2 <= 6) {
//         return [XBtoMatrix([-x1new,b1]), flip(XBtoMatrix([-x2new,b2]))];
//     }
//     else {
//         return [[6, 6, 6, 6],[6,6,6,6]];
//     }
// }

function coordsToMatrices(x1,x2,b1,b2,q=quad) {
    var game = new Game(x1,x2,b1,b2,q);
    return game.matrices;
}

function changeCoords(e) {
    if (!isMouseDown) {
        const x = e.pageX;
        const y = e.pageY;
        const blueCorner1 = document.getElementById("blue-corner-1");
        const blueCorner2 = document.getElementById("blue-corner-2");
        const blueLine1 = document.getElementById("blue-line-1");
        const blueLine2 = document.getElementById("blue-line-2");
        const elements = document.elementsFromPoint(x,y);
        if (!fixImageSize) {
            if (elements.includes(blueCorner1)) {
                draggingB1 = true;
                draggingB2 = true;
            } else if (elements.includes(blueLine1)) {
                draggingB1 = true;
            } else if (elements.includes(blueLine2)) {
                draggingB2 = true;
            }
        } else {
            if (elements.includes(blueCorner1) || (elements.includes(blueLine2) && coords[2] == 0 && coords[3] == 0)) {
                draggingB2 = true;
            }
            if (elements.includes(blueCorner2) || (elements.includes(blueLine1) && coords[2] == 0 && coords[3] == 0)) {
                draggingB1 = true;
            }
        }
    }
    if (draggingB1 || draggingB2) {
        backgroundOutOfDate = true;
        const container = document.getElementById("container");
        const diagram = document.getElementById("diagram");
        if (draggingB1) {
            const x = e.pageX;
            const containerWidth = container.width.baseVal.value;
            const diagramWidth = diagram.width.baseVal.value;
            coords[2] = 6 - 2*(x - containerWidth/2 - blueLinePadding) / diagramWidth;
        }
        if (draggingB2) {
            const y = e.pageY;
            const containerHeight = container.height.baseVal.value;
            const diagramHeight = diagram.height.baseVal.value;
            coords[3] = 6 - 2*(y - containerHeight/2 - blueLinePadding) / diagramHeight;
        }
        if (fixImageSize) {
            fixCoords();
            updateBlueLines();
            if (diagramGrid) {
                updateDiagramGrid();
            }
        }
        return;
    }

    if ((coords[2] == 6 || coords[3] == 6) && !fixImageSize) {
        const container = document.getElementById("container");
        const edgeFig = document.getElementById("edge-figure");
        const rect1 = container.getBoundingClientRect();
        const rect2 = edgeFig.getBoundingClientRect();
        const x = e.pageX;
        const y = e.pageY;
        const margins = 20;
        if (coords[3] == 6 && rect2.left-margins <= x && rect2.right+margins >= x && rect1.top+rect1.width/2-margins <= y && rect1.top+rect1.width/2+margins >= y) {
            coords[0] = (x - rect2.left) / rect2.width * 6;
            enRoute = false;
        }
        if (coords[2] == 6 && rect2.top-margins <= y && rect2.bottom+margins >= y && rect1.left+rect1.height/2-margins <= x && rect1.left+rect1.height/2+margins >= x) {
            coords[1] = 6 - (y - rect2.top) / rect2.height * 6;
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
                if (coords[2] == 0 && integerBetween((coords[0]+1)/2,(newX1+1)/2) && coords[1] % 2 > 0.5 && coords[1] % 2 < 1.5) {
                    crossBlue(true);
                }
                if (coords[3] == 0 && integerBetween((coords[1]+1)/2,(newX2+1)/2) && coords[0] % 2 > 0.5 && coords[0] % 2 < 1.5) {
                    crossBlue(false);
                }
                coords[0] = newX1;
                coords[1] = newX2;
            } else {
                coords[0] = Math.round(newX1*6)/6;
                coords[1] = Math.round(newX2*6)/6;
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
            coords[0] = newX1;
            coords[1] = newX2;
            enRoute = false;
        } else if (0.52 <= relativeX && relativeX <= 0.98 && 0.02 <= relativeY && relativeY <= 0.48) {
            if (quad != 1) { quad = 1; updateBackground(); }
            else quad = 1;
            const newX1 = 6 * (relativeX - 0.54) / 0.42;
            const newX2 = 6 - 6 * (relativeY - 0.04) / 0.42;
            coords[0] = newX1;
            coords[1] = newX2;
            enRoute = false;
        } else if (0.02 <= relativeX && relativeX <= 0.48 && 0.52 <= relativeY && relativeY <= 0.98) {
            if (quad != 3) { quad = 3; updateBackground(); }
            else quad = 3;
            const newX1 = 6 * (relativeX - 0.04) / 0.42;
            const newX2 = 6 - 6 * (relativeY - 0.54) / 0.42;
            coords[0] = newX1;
            coords[1] = newX2;
            enRoute = false;
        } else if (0.52 <= relativeX && relativeX <= 0.98 && 0.52 <= relativeY && relativeY <= 0.98) {
            if (quad != 4) { quad = 4; updateBackground(); }
            else quad = 4;
            const newX1 = 6 * (relativeX - 0.54) / 0.42;
            const newX2 = 6 - 6 * (relativeY - 0.54) / 0.42;
            coords[0] = newX1;
            coords[1] = newX2;
            enRoute = false;
        }
    }

    if (draggingRhombus1 || draggingRhombus2) {
        backgroundOutOfDate = true;
        const birhombicPic = document.getElementById("birhombic-pic");
        const birhombicWidth = birhombicPic.width.baseVal.value;
        const birhombicHeight = birhombicPic.height.baseVal.value;
        const birhombicDiagramWidth = birhombicWidth - birhombicPadding*2;
        const birhombicDiagramHeight = birhombicDiagramWidth*Math.sqrt(3)/4;
        const birhombicDiagramPadding = (birhombicHeight - birhombicDiagramHeight)/2;
        const rectBR = birhombicPic.getBoundingClientRect();
        const starWidth = document.getElementById("br-row-rect").width.baseVal.value;
        const relativeXbr = (e.pageX - rectBR.left - birhombicWidth/2)*4 / birhombicDiagramWidth;
        const relativeYbr = (birhombicHeight - e.pageY + rectBR.top - birhombicDiagramPadding)*Math.sqrt(3)/birhombicDiagramHeight;

        if (draggingRhombus1) {
            let newCoords = rhombicToCoords(true,relativeXbr,relativeYbr);
            if (newCoords != null) {
                if (newCoords[2] != quad) {
                    quad = newCoords[2];
                    // let redLine = Math.round((coords[1]+1)/2)*2-1;
                    // coords[1] = (redLine - (coords[1] - redLine) + 6) % 6;
                    updateBackground();
                }
                coords[0] = newCoords[0];
                coords[2] = newCoords[1];
            }
        } else {
            let newCoords = rhombicToCoords(false,relativeXbr,relativeYbr);
            if (newCoords != null) {
                if (newCoords[2] != quad) {
                    quad = newCoords[2];
                    // let redLine = Math.round((coords[0]+1)/2)*2-1;
                    // coords[0] = (redLine - (coords[0] - redLine) + 6) % 6;
                    updateBackground();
                }
                coords[1] = newCoords[0];
                coords[3] = newCoords[1];
            }
        }
    }

    if (diagramGrid) {
        fixCoords();
        updateDiagramGrid();
    }
}

function take(array, rank) {
    const sortedArray = [...array].sort((a, b) => a - b);
    return sortedArray[rank];
}

// function sideWidth(side) {
//     const totalA = matrixA.reduce((accumulator, currentValue) => accumulator + currentValue, 0);
//     const totalB = matrixB.reduce((accumulator, currentValue) => accumulator + currentValue, 0);
//     switch (side) {
//         case 1:
//             return (totalB - 6)/12;
//         case 2:
//             return (totalA - 6)/12;
//         case 3:
//             return (18 - totalB)/12;
//         case 4:
//             return (18 - totalA)/12;
//     }
// }

function growBox(e) {
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
        startPoint[2] = coords[2];
        startPoint[3] = coords[3];
        startPoint[4] = coords[0];
        startPoint[5] = coords[1];
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

    bargainingReturns[2] = [(max + rowBackstop - colBackstop)/2,(max + colBackstop - rowBackstop)/2];
    if (viewMode == 9) {
        disagree = [rowBackstop, colBackstop];
    }
    return [(max + rowBackstop - colBackstop)/2,(max + colBackstop - rowBackstop)/2];
}

function payoffCoco(m1, m2) {
    const newM1 = [m1[0]-m2[0], m1[1]-m2[1], m1[2]-m2[2], m1[3]-m2[3]];
    const newM2 = [m2[0]-m1[0], m2[1]-m1[1], m2[2]-m1[2], m2[3]-m1[3]];
    const rowEquilibrium = equilibrium(newM1, newM2);
    const colEquilibrium = 1-equilibrium(flip(newM2), flip(newM1));
    const rowDisagreement = rowEquilibrium*colEquilibrium*m1[0] + rowEquilibrium*(1-colEquilibrium)*m1[1] + (1-rowEquilibrium)*colEquilibrium*m1[2] + (1-rowEquilibrium)*(1-colEquilibrium)*m1[3];
    const colDisagreement = rowEquilibrium*colEquilibrium*m2[0] + rowEquilibrium*(1-colEquilibrium)*m2[1] + (1-rowEquilibrium)*colEquilibrium*m2[2] + (1-rowEquilibrium)*(1-colEquilibrium)*m2[3];

    const error = 0.00001;
    let biggestEntry = 0;
    let max = m1[0]+m2[0];
    for (let i = 1; i < 4; i++) {
        if (max < m1[i]+m2[i] - error) {
            biggestEntry = i;
            max = m1[i]+m2[i];
        }
    }
    
    bargainingReturns[3] = [(max + rowDisagreement - colDisagreement)/2, (max + colDisagreement - rowDisagreement)/2];
    if (viewMode == 4) {
        disagree = [rowDisagreement, colDisagreement];
    }
    return [(max + rowDisagreement - colDisagreement)/2, (max + colDisagreement - rowDisagreement)/2];
}

function payoffBargainingBackstop(m1, m2) {
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
    let return2 = m2[vertices[0]];
    let max = -10000;
    for (let n = 0; n < vertices.length; n++) {
        for (let m = n + 1; m < vertices.length; m++) {
            const i = vertices[n];
            const j = vertices[m];
            const x1 = m1[i] - rowBackstop;
            const x2 = m1[j] - rowBackstop;
            const y1 = m2[i] - colBackstop;
            const y2 = m2[j] - colBackstop;
            // maximizing   (x1*t+x2*(1-t))*(y1*t+y2*(1-t))
            // derivative   (x1*t+x2*(1-t))*(y1-y2)+(y1*t+y2*(1-t))*(x1-x2) = 0
            // solve        t*(x1-x2)*(y1-y2)*2+x2*(y1-y2)+y2*(x1-x2) = 0
            //              t = (x2*(y1-y2)+y2*(x1-x2))/((x1-x2)*(y1-y2)*2)
            const t = (y1 == y2 || x1 == x2) ? -1 : -(x2*(y1-y2)+y2*(x1-x2))/((x1-x2)*(y1-y2)*2);
            const value1 = x1*y1;
            const value2 = x2*y2;
            const value3 = (t < 1 && t > 0 && (x1*t+x2*(1-t))>0 && (y1*t+y2*(1-t))>0) ? (x1*t+x2*(1-t))*(y1*t+y2*(1-t)) : -1;
            if (value1 >= max && value1 >= value2 && value1 >= value3) {
                max = value1;
                return1 = m1[i];
                return2 = m2[i];
            } else if (value2 >= max && value2 >= value3) {
                max = value2;
                return1 = m1[j];
                return2 = m2[j];
            } else if (value3 >= max) {
                max = value3;
                return1 = m1[i]*t + m1[j]*(1-t);
                return2 = m2[i]*t + m2[j]*(1-t);
            }
        }
    }
    // if (max == 0) return 8;
    bargainingReturns[0] = [return1,return2];
    if (viewMode == 5) {
        disagree = [rowBackstop, colBackstop];
    }
    return [return1,return2];
}

function payoffBargainingDisagreement(m1, m2) {
    const newM1 = [m1[0]-m2[0], m1[1]-m2[1], m1[2]-m2[2], m1[3]-m2[3]];
    const newM2 = [m2[0]-m1[0], m2[1]-m1[1], m2[2]-m1[2], m2[3]-m1[3]];
    const rowEquilibrium = equilibrium(newM1, newM2);
    const colEquilibrium = 1-equilibrium(flip(newM2), flip(newM1));
    const rowDisagreement = rowEquilibrium*colEquilibrium*m1[0] + rowEquilibrium*(1-colEquilibrium)*m1[1] + (1-rowEquilibrium)*colEquilibrium*m1[2] + (1-rowEquilibrium)*(1-colEquilibrium)*m1[3];
    const colDisagreement = rowEquilibrium*colEquilibrium*m2[0] + rowEquilibrium*(1-colEquilibrium)*m2[1] + (1-rowEquilibrium)*colEquilibrium*m2[2] + (1-rowEquilibrium)*(1-colEquilibrium)*m2[3];

    // let equilibriumPoint = -1;
    // if (rowEquilibrium == 1 && colEquilibrium == 1) {
    //     equilibriumPoint = 0;
    // } else if (rowEquilibrium == 1 && colEquilibrium == 0) {
    //     equilibriumPoint = 1;
    // } else if (rowEquilibrium == 0 && colEquilibrium == 1) {
    //     equilibriumPoint = 2;
    // } else if (rowEquilibrium == 0 && colEquilibrium == 0) {
    //     equilibriumPoint = 3;
    // }

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
            // if (i == equilibriumPoint) return rowDisagreement;
            vertices.push(i);
        }
    }

    let return1 = m1[vertices[0]];
    let return2 = m2[vertices[0]];
    let max = -10000;
    for (let n = 0; n < vertices.length; n++) {
        for (let m = n + 1; m < vertices.length; m++) {
            const i = vertices[n];
            const j = vertices[m];
            const x1 = m1[i] - rowDisagreement;
            const x2 = m1[j] - rowDisagreement;
            const y1 = m2[i] - colDisagreement;
            const y2 = m2[j] - colDisagreement;
            const t = (y1 == y2 || x1 == x2) ? -1 : -(x2*(y1-y2)+y2*(x1-x2))/((x1-x2)*(y1-y2)*2);
            const value1 = x1*y1;
            const value2 = x2*y2;
            const value3 = (t < 1 && t > 0 && (x1*t+x2*(1-t))>0 && (y1*t+y2*(1-t))>0) ? (x1*t+x2*(1-t))*(y1*t+y2*(1-t)) : -1;
            if (value1 >= max && value1 >= value2 && value1 >= value3) {
                max = value1;
                return1 = m1[i];
                return2 = m2[i];
            } else if (value2 >= max && value2 >= value3) {
                max = value2;
                return1 = m1[j];
                return2 = m2[j];
            } else if (value3 >= max) {
                max = value3;
                return1 = m1[i]*t + m1[j]*(1-t);
                return2 = m2[i]*t + m2[j]*(1-t);
            }
        }
    }
    // if (max == 0) return 8;
    bargainingReturns[1] = [return1,return2];
    if (viewMode == 6) {
        disagree = [rowDisagreement, colDisagreement];
    }
    return [return1,return2];
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
        value1 = payoffShapley(m1,m2)[0];
    } else if (choice1 == "returns-coco") {
        value1 = payoffCoco(m1,m2)[0];
    } else if (choice1 == "returns-bargaining-bs") {
        value1 = payoffBargainingBackstop(m1,m2)[0];
    } else if (choice1 == "returns-bargaining-tp") {
        value1 = payoffBargainingDisagreement(m1,m2)[0];
    } else if (choice1 == "returns-max-total") {
        value1 = payoffTransferable(m1,m2);
    } else if (choice1 == "returns-col") {
        value1 = payoffModified(flip(m2),flip(m1));
    } else if (choice1 == "returns-mixed-col") {
        value1 = payoff(flip(m2),flip(m1));
    } else if (choice1 == "returns-shapley-col") {
        value1 = payoffShapley(m1,m2)[1];
    } else if (choice1 == "returns-coco") {
        value1 = payoffCoco(m1,m2)[1];
    } else if (choice1 == "returns-bargaining-bs-col") {
        value1 = payoffBargainingBackstop(m1,m2)[1];
    } else if (choice1 == "returns-bargaining-tp-col") {
        value1 = payoffBargainingDisagreement(m1,m2)[1];
    }

    if (choice2 == "returns") {
        value2 = payoffModified(m1,m2);
    } else if (choice2 == "returns-mixed") {
        value2 = payoff(m1,m2);
    } else if (choice2 == "returns-shapley") {
        value2 = payoffShapley(m1,m2)[0];
    } else if (choice2 == "returns-coco") {
        value2 = payoffCoco(m1,m2)[0];
    } else if (choice2 == "returns-bargaining-bs") {
        value2 = payoffBargainingBackstop(m1,m2)[0];
    } else if (choice2 == "returns-bargaining-tp") {
        value2 = payoffBargainingDisagreement(m1,m2)[0];
    } else if (choice2 == "returns-max-total") {
        value2 = payoffTransferable(m1,m2);
    } else if (choice2 == "returns-col") {
        value2 = payoffModified(flip(m2),flip(m1));
    } else if (choice2 == "returns-mixed-col") {
        value2 = payoff(flip(m2),flip(m1));
    } else if (choice2 == "returns-shapley-col") {
        value2 = payoffShapley(m1,m2)[1];
    } else if (choice2 == "returns-coco") {
        value2 = payoffCoco(m1,m2)[1];
    } else if (choice2 == "returns-bargaining-bs-col") {
        value2 = payoffBargainingBackstop(m1,m2)[1];
    } else if (choice2 == "returns-bargaining-tp-col") {
        value2 = payoffBargainingDisagreement(m1,m2)[1];
    }
    return (value1 - value2)/12+1/2;
}

function coordination(m1, m2) {
    const newM1 = [m1[0]+m2[0], m1[1]+m2[1], m1[2]+m2[2], m1[3]+m2[3]];
    const newM2 = [m2[0]-m1[0], m2[1]-m1[1], m2[2]-m1[2], m2[3]-m1[3]];
    const mean1 = (newM1[0]+newM1[1]+newM1[2]+newM1[3])/4; // max 9
    const mean2 = (newM2[0]+newM2[1]+newM2[2]+newM2[3])/4; // max 6
    const norm1 = (newM1[0]-mean1)**2 + (newM1[1]-mean1)**2 + (newM1[2]-mean1)**2 + (newM1[3]-mean1)**2; // max 
    const norm2 = (newM2[0]-mean2)**2 + (newM2[1]-mean2)**2 + (newM2[2]-mean2)**2 + (newM2[3]-mean2)**2;
    return (norm1 / (norm1 + norm2));
}

function colorFunctionOld(value) {
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

function colorFunction(value,vMode) {
    if (value > 1) value = 1;
    let colors = [];
    let cutoffs = [];
    // const colors = [[38,84,138],[70,102,168],[110,116,144],[150,130,121],[190,144,97],[229,158,74],
    //                 [236,174,94],[242,190,113],[249,206,133],[255,222,153],[255,242,191],[142,255,142],[0,113,0],[255,255,255]];
    // const cutoffs = [0,0.1,0.2,0.3,0.4,0.5,0.6,0.7,0.8,0.9,1,1.25,1.5,2];
    if (vMode == 7) {
        colors = [[0,0,0],[0,0,86],[111,118,172],[255,255,255],[184,114,116],[86,0,0],[0,0,0]];
        cutoffs = [0,0.25,0.375,0.5,0.625,0.75,1];
    } else if (vMode == 8) {
        colors = [[0,0,10],[0,0,86],[111,118,172],[255,255,255],[184,114,116],[86,0,0],[10,0,0]];
        cutoffs = [0,0.1,0.3,0.5,0.7,0.9,1];
    } else {
        colors = [[0,7,105],[0,98,162],[48,175,149],[94,190,64],[195,167,48],[199,111,8],[198,34,41],[243,178,188],[255,222,226]];
        cutoffs = [0,0.11,0.22,0.33,0.44,0.55,0.67,0.85,1];
    }
    const result = [0,0,0];
    for (let i = 1; i <= cutoffs.length; i++) {
        if (value <= cutoffs[i]) {
            for (let j = 0; j < 3; j++) result[j] = Math.floor((1-(value-cutoffs[i-1])/(cutoffs[i]-cutoffs[i-1]))*colors[i-1][j] + (value-cutoffs[i-1])/(cutoffs[i]-cutoffs[i-1])*colors[i][j]);
        return result;
        }
    }
}

function changeViewMode(mode, p1=true) {
    viewModeP1 = p1;
    if (viewMode == 7 || mode == 7 || viewMode == 8 || mode == 8 || viewMode == 0 || mode == 0) {
        viewMode = mode;
        updateLegend();
    } else {
        viewMode = mode;
    }
    const canvas = document.getElementById("canvas");
    const canvasBig = document.getElementById("big-pic-canvas");
    if (mode == 0) {
        canvas.style.display = "none";
        canvasBig.style.display = "none";
        canvas.width = 0;
        canvas.height = 0;
        canvas.x = 0;
        canvas.y = 0;
    } else {
        canvas.style.display = "";
        canvasBig.style.display = "";
        switchMode = true;
        backgroundOutOfDate = true;
    }

    const curButton = document.getElementsByClassName("selected")[0];
    curButton.classList.remove("selected");

    let func = ()=>(null);
    if (p1) {
        switch (mode) {
            case 0:
                document.getElementById("regular-mode").classList.add("selected");
                document.getElementById("view-mode-label").innerHTML = "Equilibrium view";
                break;
            case 2:
                document.getElementById("transferable-mode").classList.add("selected");
                document.getElementById("view-mode-label").innerHTML = "Max total";
                func = (a,b)=>payoffTransferable(a,b)/9;
                break;
            case 3:
                document.getElementById("return-mode-2").classList.add("selected");
                document.getElementById("view-mode-label").innerHTML = "Row's equilibrium returns";
                func = (a,b)=>payoffModified(a,b)/9;
                break;
            case 4:
                document.getElementById("coco-mode").classList.add("selected");
                document.getElementById("view-mode-label").innerHTML = "Row's threat point TU";
                func = (a,b)=>payoffCoco(a,b)[0]/9;
                break;
            case 5:
                document.getElementById("bargaining-mode-1").classList.add("selected");
                document.getElementById("view-mode-label").innerHTML = "Row's backstop NTU";
                func = (a,b)=>payoffBargainingBackstop(a,b)[0]/9;
                break;
            case 6:
                document.getElementById("bargaining-mode-2").classList.add("selected");
                document.getElementById("view-mode-label").innerHTML = "Row's threat point NTU";
                func = (a,b)=>payoffBargainingDisagreement(a,b)[0]/9;
                break;
            case 7:
                document.getElementById("custom-mode").classList.add("selected");
                const select1 = document.getElementById("view-custom-1");
                const select2 = document.getElementById("view-custom-2");
                document.getElementById("view-mode-label").innerHTML = "<span style=\"color:rgb(150,0,0)\">" + select1.getElementsByTagName("option")[select1.selectedIndex].innerHTML
                                                       + "</span> minus <span style=\"color:rgb(0,0,150)\">" + select2.getElementsByTagName("option")[select2.selectedIndex].innerHTML + "</span>";
                func = (a,b)=>payoffCustom(a,b);
                break;
            case 8:
                document.getElementById("coordination-mode").classList.add("selected");
                document.getElementById("view-mode-label").innerHTML = "Correlation";
                func = (a,b)=>coordination(a,b);
                break;
            case 9:
                document.getElementById("shapley-mode").classList.add("selected");
                document.getElementById("view-mode-label").innerHTML = "Row's backstop TU";
                func = (a,b)=>payoffShapley(a,b)[0]/9;
                break;
        }
    } else {
        switch (mode) {
            case 3:
                document.getElementById("return-mode-2-col").classList.add("selected");
                document.getElementById("view-mode-label").innerHTML = "Column's equilibrium returns";
                func = (a,b)=>payoffModified(flip(b),flip(a))/9;
                break;
            case 4:
                document.getElementById("coco-mode-col").classList.add("selected");
                document.getElementById("view-mode-label").innerHTML = "Column's threat point TU";
                func = (a,b)=>payoffCoco(flip(b),flip(a))[0]/9;
                break;
            case 5:
                document.getElementById("bargaining-mode-1-col").classList.add("selected");
                document.getElementById("view-mode-label").innerHTML = "Column's backstop NTU";
                func = (a,b)=>payoffBargainingBackstop(flip(b),flip(a))[0]/9;
                break;
            case 6:
                document.getElementById("bargaining-mode-2-col").classList.add("selected");
                document.getElementById("view-mode-label").innerHTML = "Column's threat point NTU";
                func = (a,b)=>payoffBargainingDisagreement(flip(b),flip(a))[0]/9;
                break;
            case 9:
                document.getElementById("shapley-mode-col").classList.add("selected");
                document.getElementById("view-mode-label").innerHTML = "Column's backstop TU";
                func = (a,b)=>payoffShapley(flip(b),flip(a))[0]/9;
                break;
        }
    }
    // if (mode == 7) {
    //     viewModeVolatile = true;
    // } else {
    //     viewModeVolatile = false;
    // }
    // updateBigPicCanvas(func);
}

function updateBigPicCanvas(func, lowRes = false) {
    // update big pic canvas
    const canvasBigPic = document.getElementById("big-pic-canvas");
    const foreignObject = document.getElementById("canvasForeignObject-big-pic");
    const bigPicture = document.getElementById("big-picture");
    canvasBigPic.width = bigPicture.width.baseVal.value;
    canvasBigPic.height = bigPicture.height.baseVal.value;
    foreignObject.width.baseVal.value = bigPicture.width.baseVal.value;
    foreignObject.height.baseVal.value = bigPicture.height.baseVal.value;
    const ctx = canvasBigPic.getContext("2d");
    const imageData = ctx.getImageData(0, 0, canvasBigPic.width, canvasBigPic.height);
    const data = imageData.data;
    for (let j = 0; j < canvasBigPic.height; j++) {
        for (let i = 0; i < canvasBigPic.width; i++) {
            data[(i+j*canvasBigPic.width)*4+3] = 0;
        }
    }
    const error = 0.00001;
    const b1 = coords[2] != 0 ? coords[2] : error;
    const b2 = coords[3] != 0 ? coords[3] : error;
    if (!lowRes) {
        const quadrantWidth = canvasBigPic.width*0.42;
        for (let j = 0; j < quadrantWidth; j++) {
            for (let i = 0; i < quadrantWidth; i++) {
                let color = [];
                if (!useAltSchema) color = colorFunction(func(...coordsToMatrices(i*6/quadrantWidth,(1-j/quadrantWidth)*6,b1,b2,1)),viewMode);
                else color = colorFunction(func(...coordsToMatricesAlt(i*6/quadrantWidth,(1-j/quadrantWidth)*6,1)),viewMode);
                const x = i + Math.round(canvasBigPic.width*0.54);
                const y = j + Math.round(canvasBigPic.height*0.04);
                data[(x+y*canvasBigPic.width)*4] = color[0];
                data[(x+y*canvasBigPic.width)*4+1] = color[1];
                data[(x+y*canvasBigPic.width)*4+2] = color[2];
                data[(x+y*canvasBigPic.width)*4+3] = 255;
            }
        }
        for (let j = 0; j < quadrantWidth; j++) {
            for (let i = 0; i < quadrantWidth; i++) {
                let color = [];
                if (!useAltSchema) color = colorFunction(func(...coordsToMatrices(i*6/quadrantWidth,(1-j/quadrantWidth)*6,b1,b2,2)),viewMode);
                else color = colorFunction(func(...coordsToMatricesAlt(i*6/quadrantWidth,(1-j/quadrantWidth)*6,2)),viewMode);
                const x = i + Math.round(canvasBigPic.width*0.04);
                const y = j + Math.round(canvasBigPic.height*0.04);
                data[(x+y*canvasBigPic.width)*4] = color[0];
                data[(x+y*canvasBigPic.width)*4+1] = color[1];
                data[(x+y*canvasBigPic.width)*4+2] = color[2];
                data[(x+y*canvasBigPic.width)*4+3] = 255;
            }
        }
        for (let j = 0; j < quadrantWidth; j++) {
            for (let i = 0; i < quadrantWidth; i++) {
                let color = [];
                if (!useAltSchema) color = colorFunction(func(...coordsToMatrices(i*6/quadrantWidth,(1-j/quadrantWidth)*6,b1,b2,3)),viewMode);
                else color = colorFunction(func(...coordsToMatricesAlt(i*6/quadrantWidth,(1-j/quadrantWidth)*6,3)),viewMode);
                const x = i + Math.round(canvasBigPic.width*0.04);
                const y = j + Math.round(canvasBigPic.height*0.54);
                data[(x+y*canvasBigPic.width)*4] = color[0];
                data[(x+y*canvasBigPic.width)*4+1] = color[1];
                data[(x+y*canvasBigPic.width)*4+2] = color[2];
                data[(x+y*canvasBigPic.width)*4+3] = 255;
            }
        }
        for (let j = 0; j < quadrantWidth; j++) {
            for (let i = 0; i < quadrantWidth; i++) {
                let color = [];
                if (!useAltSchema) color = colorFunction(func(...coordsToMatrices(i*6/quadrantWidth,(1-j/quadrantWidth)*6,b1,b2,4)),viewMode);
                else color = colorFunction(func(...coordsToMatricesAlt(i*6/quadrantWidth,(1-j/quadrantWidth)*6,4)),viewMode);
                const x = i + Math.round(canvasBigPic.width*0.54);
                const y = j + Math.round(canvasBigPic.height*0.54);
                data[(x+y*canvasBigPic.width)*4] = color[0];
                data[(x+y*canvasBigPic.width)*4+1] = color[1];
                data[(x+y*canvasBigPic.width)*4+2] = color[2];
                data[(x+y*canvasBigPic.width)*4+3] = 255;
            }
        }
    } else {
        const resolution = 24;
        const quadrantWidth = canvasBigPic.width*0.42;
        for (let j = 0; j < resolution; j++) {
            for (let i = 0; i < resolution; i++) {
                let color = [];
                if (!useAltSchema) color = colorFunction(func(...coordsToMatrices(i/resolution*6+3/resolution,6-j/resolution*6-3/resolution,b1,b2,1)),viewMode);
                else color = colorFunction(func(...coordsToMatricesAlt(i/resolution*6+3/resolution,6-j/resolution*6+3/resolution,1)),viewMode);
                for (let x = Math.round(i/resolution*quadrantWidth + canvasBigPic.width*0.54); x < (i+1)/resolution*quadrantWidth + canvasBigPic.width*0.54; x++) {
                    for (let y = Math.round(j/resolution*quadrantWidth + canvasBigPic.height*0.04); y < (j+1)/resolution*quadrantWidth + canvasBigPic.height*0.04; y++) {
                        data[(x+y*canvasBigPic.width)*4] = color[0];
                        data[(x+y*canvasBigPic.width)*4+1] = color[1];
                        data[(x+y*canvasBigPic.width)*4+2] = color[2];
                        data[(x+y*canvasBigPic.width)*4+3] = 255;
                    }
                }
            }
        }
        for (let j = 0; j < resolution; j++) {
            for (let i = 0; i < resolution; i++) {
                let color = [];
                if (!useAltSchema) color = colorFunction(func(...coordsToMatrices(i/resolution*6+3/resolution,6-j/resolution*6-3/resolution,b1,b2,2)),viewMode);
                else color = colorFunction(func(...coordsToMatricesAlt(i/resolution*6+3/resolution,6-j/resolution*6+3/resolution,2)),viewMode);
                for (let x = Math.round(i/resolution*quadrantWidth + canvasBigPic.width*0.04); x < (i+1)/resolution*quadrantWidth + canvasBigPic.width*0.04; x++) {
                    for (let y = Math.round(j/resolution*quadrantWidth + canvasBigPic.height*0.04); y < (j+1)/resolution*quadrantWidth + canvasBigPic.height*0.04; y++) {
                        data[(x+y*canvasBigPic.width)*4] = color[0];
                        data[(x+y*canvasBigPic.width)*4+1] = color[1];
                        data[(x+y*canvasBigPic.width)*4+2] = color[2];
                        data[(x+y*canvasBigPic.width)*4+3] = 255;
                    }
                }
            }
        }
        for (let j = 0; j < resolution; j++) {
            for (let i = 0; i < resolution; i++) {
                let color = [];
                if (!useAltSchema) color = colorFunction(func(...coordsToMatrices(i/resolution*6+3/resolution,6-j/resolution*6-3/resolution,b1,b2,3)),viewMode);
                else color = colorFunction(func(...coordsToMatricesAlt(i/resolution*6+3/resolution,6-j/resolution*6+3/resolution,3)),viewMode);
                for (let x = Math.round(i/resolution*quadrantWidth + canvasBigPic.width*0.04); x < (i+1)/resolution*quadrantWidth + canvasBigPic.width*0.04; x++) {
                    for (let y = Math.round(j/resolution*quadrantWidth + canvasBigPic.height*0.54); y < (j+1)/resolution*quadrantWidth + canvasBigPic.height*0.54; y++) {
                        data[(x+y*canvasBigPic.width)*4] = color[0];
                        data[(x+y*canvasBigPic.width)*4+1] = color[1];
                        data[(x+y*canvasBigPic.width)*4+2] = color[2];
                        data[(x+y*canvasBigPic.width)*4+3] = 255;
                    }
                }
            }
        }
        for (let j = 0; j < resolution; j++) {
            for (let i = 0; i < resolution; i++) {
                let color = [];
                if (!useAltSchema) color = colorFunction(func(...coordsToMatrices(i/resolution*6+3/resolution,6-j/resolution*6-3/resolution,b1,b2,4)),viewMode);
                else color = colorFunction(func(...coordsToMatricesAlt(i/resolution*6+3/resolution,6-j/resolution*6+3/resolution,4)),viewMode);
                for (let x = Math.round(i/resolution*quadrantWidth + canvasBigPic.width*0.54); x < (i+1)/resolution*quadrantWidth + canvasBigPic.width*0.54; x++) {
                    for (let y = Math.round(j/resolution*quadrantWidth + canvasBigPic.height*0.54); y < (j+1)/resolution*quadrantWidth + canvasBigPic.height*0.54; y++) {
                        data[(x+y*canvasBigPic.width)*4] = color[0];
                        data[(x+y*canvasBigPic.width)*4+1] = color[1];
                        data[(x+y*canvasBigPic.width)*4+2] = color[2];
                        data[(x+y*canvasBigPic.width)*4+3] = 255;
                    }
                }
            }
        }
    }
    // console.log(data);
    ctx.putImageData(imageData,0,0);
}

function updateCanvas(lowRes = false) {
    let func = ()=>(null);
    if (viewModeP1) {
        switch (viewMode) {
            case 0:
                break;
            case 1:
                func = (a,b)=>payoff(a,b)/9;
                break;
            case 2:
                func = (a,b)=>payoffTransferable(a,b)/9;
                break;
            case 3:
                func = (a,b)=>payoffModified(a,b)/9;
                break;
            case 4:
                func = (a,b)=>payoffCoco(a,b)[0]/9;
                break;
            case 5:
                func = (a,b)=>payoffBargainingBackstop(a,b)[0]/9;
                break;
            case 6:
                func = (a,b)=>payoffBargainingDisagreement(a,b)[0]/9;
                break;
            case 7:
                func = (a,b)=>payoffCustom(a,b);
                break;
            case 8:
                func = (a,b)=>coordination(a,b);
                break;
            case 9:
                func = (a,b)=>payoffShapley(a,b)[0]/9;
                break;
        }
    } else {
        switch (viewMode) {
            case 0:
                break;
            case 1:
                func = (a,b)=>payoff(flip(b),flip(a))/9;
                break;
            case 2:
                func = (a,b)=>payoffTransferable(flip(b),flip(a))/9;
                break;
            case 3:
                func = (a,b)=>payoffModified(flip(b),flip(a))/9;
                break;
            case 4:
                func = (a,b)=>payoffCoco(flip(b),flip(a))[0]/9;
                break;
            case 5:
                func = (a,b)=>payoffBargainingBackstop(flip(b),flip(a))[0]/9;
                break;
            case 6:
                func = (a,b)=>payoffBargainingDisagreement(flip(b),flip(a))[0]/9;
                break;
            case 7:
                func = (a,b)=>payoffCustom(flip(b),flip(a));
                break;
            case 8:
                func = (a,b)=>coordination(flip(b),flip(a));
                break;
            case 9:
                func = (a,b)=>payoffShapley(flip(b),flip(a))[0]/9;
                break;
        }
    }
    updateBigPicCanvas(func,lowRes);
}

function fixImage(alt) {
    if (!useAltSchema) {
        fixImageSize = alt;
        backgroundOutOfDate = true;
    }
    const fixImageButton0 = document.getElementById("fix-image-button-0");
    const fixImageButton1 = document.getElementById("fix-image-button-1");
    const fixImageButton2 = document.getElementById("fix-image-button-2");
    const diagram = document.getElementById("diagram");
    fixImageButton0.classList.remove("selected");

    if (alt) {
        diagramGrid = true;
        fixImageButton1.classList.remove("selected");
        fixImageButton2.classList.add("selected");
        diagram.style.opacity = 0;
        // updateDiagramGrid();
    } else {
        diagramGrid = false;
        fixImageButton2.classList.remove("selected");
        fixImageButton1.classList.add("selected");
        let element;
        while (element = document.querySelector(".clone")) {
            element.remove();
        }
        diagram.style.opacity = 1;
    }
}

function matrixToCoords(m) {
    let pos0 = -1;
    let pos1 = -1;
    let pos2 = -1;
    let pos3 = -1;
    for (let i = 0; i < 4; i++) {
        if (m[i] == 6 && pos3 == -1) pos3 = i;
        else if (m[i] == 0 && pos0 == -1) pos0 = i;
        else if (pos1 == -1) pos1 = i;
        else {
            if (m[i] >= m[pos1]) pos2 = i;
            else {
                pos2 = pos1;
                pos1 = i;
            }
        }
    }

    const redModified = m[pos1]/m[pos2];
    const blue = 6 - m[pos2];

    let cell = -1;
    if (pos2 == 0 && pos3 == 1 || pos2 == 1 && pos3 == 0 || pos2 == 2 && pos3 == 3 || pos2 == 3 && pos3 == 2) {
        if (pos0 == 0 && pos3 == 2 || pos0 == 2 && pos3 == 0 || pos0 == 1 && pos3 == 3 || pos0 == 3 && pos3 == 1) cell = 5;
        else cell = 4;
    } else if (pos2 == 0 && pos3 == 2 || pos2 == 2 && pos3 == 0 || pos2 == 1 && pos3 == 3 || pos2 == 3 && pos3 == 1) {
        if (pos0 == 0 && pos3 == 1 || pos0 == 1 && pos3 == 0 || pos0 == 2 && pos3 == 3 || pos0 == 3 && pos3 == 2) cell = 2;
        else cell = 3;
    } else {
        if (pos0 == 0 && pos3 == 2 || pos0 == 2 && pos3 == 0 || pos0 == 1 && pos3 == 3 || pos0 == 3 && pos3 == 1) cell = 0;
        else cell = 1;
    }

    let x = -1;
    if (cell % 2 == 0) x = cell + 1 - redModified;
    else x = cell + redModified;

    return [x,blue];
}

// function matricesToQuad(m1,m2) {
//     let maxIndex1 = -1;
//     let maxIndex2 = -1;
//     for (let i = 0; i < 4; i++) {
//         if (m1[i] == 6) {
//             maxIndex1 = i;
//             break;
//         }
//     }
//     for (let i = 0; i < 4; i++) {
//         if (m2[i] == 6) {
//             maxIndex2 = i;
//             break;
//         }
//     }
//     if (maxIndex1 == maxIndex2) {
//         return 1;
//     } else if (maxIndex1 % 2 != maxIndex2 % 2 && Math.floor(maxIndex1/2) != Math.floor(maxIndex2/2)) {
//         return 3;
//     } else if (maxIndex1 % 2 != maxIndex2 % 2) {
//         return 4;
//     } else {
//         return 2;
//     }
// }

function updateCoords() {
    if (!useAltSchema) {
        const coords1 = matrixToCoords(matrixA);
        const coords2 = matrixToCoords(flip(matrixB));
        coords = [coords1[0],coords2[0],coords1[1],coords2[1]];
    } else {
        const coords1 = matrixToCoords(matrixA);
        const coords2 = matrixToCoords(flip(matrixB));
        [coords[0],coords[1]] = standardToAltCoords(coords1[0],coords2[0]);
    }

    let max1 = -1;
    let max2 = -1;
    const error = 0.00001;
    for (let i = 0; i < 4; i++) {
        if (Math.abs(matrixA[i] - 6) < error) {
            max1 = i;
            break;
        }
    }
    for (let i of [3,1,2,0]) {
        if (Math.abs(matrixB[i] - 6) < error) {
            max2 = i;
            break;
        }
    }
    if (max1 == max2) quad = 1;
    else if (max1 == 0 && max2 == 2 || max1 == 2 && max2 == 0 || max1 == 1 && max2 == 3 || max1 == 3 && max2 == 1) quad = 2;
    else if (max1 == 0 && max2 == 1 || max1 == 1 && max2 == 0 || max1 == 2 && max2 == 3 || max1 == 3 && max2 == 2) quad = 4;
    else quad = 3;
    updateBackground();
}

function createDiagram() {
    const diagram = document.getElementById("diagram");
    const clone = diagram.cloneNode(true);
    clone.classList.add("clone");
    clone.style.opacity = 1;
    const box = clone.querySelector('#diagram-box');
    box.remove();
    const container = document.getElementById("container");
    container.appendChild(clone);
}

function updateDiagram() {
    const error = 0.00001;
    if (!useAltSchema) {
        [matrixA,matrixB] = coordsToMatrices(...coords);
    } else {
        [matrixA,matrixB] = coordsToMatricesAlt(coords[0],coords[1],quad);
    }

    const container = document.getElementById("container");
    const diagram = document.getElementById("diagram");
    const diagramWidth = diagram.width.baseVal.value;
    const picWidth = fixImageSize ? container.width.baseVal.value - diagramWidth : (container.width.baseVal.value - diagramWidth)*(6 - coords[2])/6;
    const picHeight = fixImageSize ? container.height.baseVal.value - diagramWidth : (container.height.baseVal.value - diagramWidth)*(6 - coords[3])/6;
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

    diagram.x.baseVal.value = coords[0]/6*picWidth+picPadding1-diagramWidth/2;
    diagram.y.baseVal.value = (6 - coords[1])/6*picHeight+picPadding2-diagramWidth/2;

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

    if (0 < coords[0] && coords[0] < 3 && 0 < coords[1] && coords[1] < 3 && coords[2] < 6 && coords[3] < 6) {
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
}

function updateDiagramGrid() {
    updateRequired = false;
    let element;
    while (element = document.querySelector(".clone")) {
        element.remove();
    }
    for (let i = 0; i < 6; i++) {
        for (let j = 0; j < 6; j++) {
            if (j % 2 == 0) {
                let redLine = Math.round((coords[0]+1)/2)*2-1;
                if (coords[0] != 4)
                    coords[0] = (redLine - (coords[0] - redLine) + 6) % 6;
                else
                    coords[0] = 6;
            } else crossGreen(true);
            updateDiagram();
            createDiagram();
        }
        if (i % 2 == 0) {
            let redLine = Math.round((coords[1]+1)/2)*2-1;
            if (coords[1] != 4)
                coords[1] = (redLine - (coords[1] - redLine) + 6) % 6;
            else
                coords[1] = 6;
        } else crossGreen(false);
    }
}

function blue(M) {
    return take(M,3) - take(M,2);
}

function updateBlueLines() {
    const container = document.getElementById("container");
    const diagram = document.getElementById("diagram");
    const diagramWidth = diagram.width.baseVal.value;
    const picWidth = fixImageSize ? container.width.baseVal.value - diagramWidth : (container.width.baseVal.value - diagramWidth)*(6 - coords[2])/6;
    const picHeight = fixImageSize ? container.height.baseVal.value - diagramWidth : (container.height.baseVal.value - diagramWidth)*(6 - coords[3])/6;
    const picPadding1 = (container.width.baseVal.value-picWidth)/2;
    const picPadding2 = (container.height.baseVal.value-picHeight)/2;

    const blueLine1 = document.getElementById("blue-line-1");
    const blueLine2 = document.getElementById("blue-line-2");
    const blueCorner1 = document.getElementById("blue-corner-1");
    const blueCorner2 = document.getElementById("blue-corner-2");
    const blueLineWidth = (container.width.baseVal.value - diagramWidth)*(6 - blue(matrixA))/6;
    const blueLineHeight = (container.height.baseVal.value - diagramWidth)*(6 - blue(matrixB))/6;
    const blueLinePadding1 = (container.width.baseVal.value-blueLineWidth)/2;
    const blueLinePadding2 = (container.height.baseVal.value-blueLineHeight)/2;
    blueLine1.x1.baseVal.value = picWidth + picPadding1 + blueLinePadding;
    blueLine1.y1.baseVal.value = blueLineHeight + blueLinePadding2 + (!useAltSchema ? blueLinePadding : 0);
    blueLine1.x2.baseVal.value = picWidth + picPadding1 + blueLinePadding;
    blueLine1.y2.baseVal.value = blueLinePadding2;
    blueLine2.x1.baseVal.value = blueLineWidth + blueLinePadding1 + (!useAltSchema ? blueLinePadding : 0);
    blueLine2.y1.baseVal.value = picHeight + picPadding2 + blueLinePadding;
    blueLine2.x2.baseVal.value = blueLinePadding1;
    blueLine2.y2.baseVal.value = picHeight + picPadding2 + blueLinePadding;
    blueCorner1.cx.baseVal.value = picWidth + picPadding1 + blueLinePadding;
    blueCorner1.cy.baseVal.value = blueLineHeight + blueLinePadding2 + blueLinePadding;
    
    if (useAltSchema) {
        blueCorner1.style.display = "none";
        blueCorner2.style.display = "none";
        blueLine1.style.cursor = "auto";
        blueLine2.style.cursor = "auto";
        blueCorner1.style.cursor = "auto";
    } else if (fixImageSize) {
        blueCorner1.style.display = "";
        blueCorner2.style.display = "";
        blueCorner2.cx.baseVal.value = blueLineWidth + blueLinePadding1 + blueLinePadding;
        blueCorner2.cy.baseVal.value = picHeight + picPadding2 + blueLinePadding;
        if (coords[2] == 0 && coords[3] == 0) {
            blueLine1.style.cursor = "ew-resize";
            blueLine2.style.cursor = "ns-resize";
            blueCorner1.style.cursor = "all-scroll";
        } else {
            blueLine1.style.cursor = "auto";
            blueLine2.style.cursor = "auto";
            blueCorner1.style.cursor = "ns-resize";
        }
    } else {
        blueCorner1.style.display = "";
        blueCorner2.style.display = "none";
        blueLine1.style.cursor = "ew-resize";
        blueLine2.style.cursor = "ns-resize";
        blueCorner1.style.cursor = "all-scroll";
    }
}

function fixCoords() {
    if (coords[0] < 0) coords[0] = 0;
    else if (coords[0] > 6) coords[0] = 6;
    if (coords[1] < 0) coords[1] = 0;
    else if (coords[1] > 6) coords[1] = 6;
    if (coords[2] < 0) coords[2] = 0;
    else if (coords[2] > 6) coords[2] = 6;
    if (coords[3] < 0) coords[3] = 0;
    else if (coords[3] > 6) coords[3] = 6;
}

function coordsToRhombic(p1,x,b,quad) {
    function rotate([y1,y2]) {
        return [(-y1 + Math.sqrt(3)*y2) / 2, (-Math.sqrt(3)*y1 - y2) / 2];
    }
    let y1 = -(x % 2 - 1) * (6-b)/6;
    let y2 = -1/Math.sqrt(3) * (6-b)/6;
    if (x >= 2 && x != 6) [y1,y2] = rotate([y1,y2]);
    if (x >= 4 && x != 6) [y1,y2] = rotate([y1,y2]);
    const goodSide = quad == 1 || (p1 && quad == 2) || (!p1 && quad == 4);
    if (goodSide) {
        y1 = -y1;
        y2 = -y2 + 2/Math.sqrt(3);
    } else {
        y1 -= 1;
        y2 += 1/Math.sqrt(3);
    }
    if (!p1) {
        y1 = -y1;
    }
    return [y1,y2];
}

function rhombicToCoords(p1,y1,y2) {
    const error = 0.00001;
    const sqrt3 = Math.sqrt(3);
    function rotate([y1,y2]) {
        return [(-y1 + sqrt3*y2) / 2, (-sqrt3*y1 - y2) / 2];
    }
    let newY1 = y1;
    let newY2 = y2;
    let newQuad = quad;
    if (!p1) {
        newY1 = -newY1;
    }
    const margin = 0.2;
    if (newY2 < -sqrt3*newY1 && newY2 < sqrt3*(newY1+2) + margin && newY2 > -margin) {
        newY1 += 1;
        newY2 -= 1/sqrt3;
        if (p1) {
            if (newQuad == 1) newQuad = 4;
            else if (newQuad == 2) newQuad = 3;
        } else {
            if (newQuad == 1) newQuad = 2;
            else if (newQuad == 4) newQuad = 3;
        }
    } else if (newY2 > -sqrt3*newY1 && newY2 > sqrt3*newY1 - margin && newY2 < sqrt3 + margin) {
        newY1 = -newY1;
        newY2 = -newY2 + 2/sqrt3;
        if (p1) {
            if (newQuad == 4) newQuad = 1;
            else if (newQuad == 3) newQuad = 2;
        } else {
            if (newQuad == 2) newQuad = 1;
            else if (newQuad == 3) newQuad = 4;
        }
    } else {
        return null;
    }
    let x = 0;
    newY1 = -newY1;
    for (let i = 0; i < 3 && (newY2 > -newY1/sqrt3 || newY2 > newY1/sqrt3); i++) {
        [newY1,newY2] = rotate([newY1,newY2]);
        x = (x + 2) % 6;
    }
    let b = (newY2*sqrt3 + 1)*6;
    x += newY1/(1 - b/6) + 1;
    if (x > 6) x = 6;
    else if (x < 0) x = 0;
    if (b > 6) b = 6;
    else if (b < 0) b = 0;
    return [x,b,newQuad];
}

function coordsToMatricesAlt(x1,x2,quad) {
    function mix(x,m1,m2) {
        let result = [0,0,0,0];
        for (let i = 0; i < 4; i++)
            result[i] = x*m2[i]+(1-x)*m1[i];
        return result;
    }
    let rowM = [0,0,0,0];
    let colM = [0,0,0,0];

    let m1 = [0,0,0,0];
    let m2 = [0,0,0,0];
    let m3 = [0,0,0,0];
    let m4 = [0,0,0,0];
    let m5 = [0,0,0,0];
    let m6 = [0,0,0,0];
    if (quad == 1) {
        m1 = [0,6,6,0];
        m2 = [0,6,0,6];
        m3 = [6,6,0,0];
        m4 = [0,6,6,0];
        m5 = [6,6,0,0];
        m6 = [0,6,0,6];
    } else if (quad == 2) {
        m1 = [6,0,0,6];
        m2 = [0,6,0,6];
        m3 = [0,0,6,6];
        m4 = [0,6,6,0];
        m5 = [6,6,0,0];
        m6 = [0,6,0,6];
    } else if (quad == 3) {
        m1 = [6,0,0,6];
        m2 = [0,6,0,6];
        m3 = [0,0,6,6];
        m4 = [6,0,0,6];
        m5 = [6,6,0,0];
        m6 = [6,0,6,0];
    } else {
        m1 = [0,6,6,0];
        m2 = [0,6,0,6];
        m3 = [6,6,0,0];
        m4 = [6,0,0,6];
        m5 = [6,6,0,0];
        m6 = [6,0,6,0];
    }
    let x1new = (x1+5)%6;
    let x2new = (x2+5)%6;
    if (x1new < 2) {
        rowM = mix((x1new%2)/2,m1,m2);
    } else if (x1new < 4) {
        rowM = mix((x1new%2)/2,m2,m3);
    } else {
        rowM = mix((x1new%2)/2,m3,m1);
    }
    if (x2new < 2) {
        colM = mix((x2new%2)/2,m4,m5);
    } else if (x2new < 4) {
        colM = mix((x2new%2)/2,m5,m6);
    } else {
        colM = mix((x2new%2)/2,m6,m4);
    }
    return [rowM,colM];
}

function altToStandardCoords(x1,x2,b1,b2) {
    let y1 = Math.floor(x1/2)*2;
    let z1 = x1 % 2;
    let s1 = (z1 < 1) ? (z1-1)/(z1+1) + 1 : (z1-1)/(3-z1) + 1;
    let y2 = Math.floor(x2/2)*2;
    let z2 = x2 % 2;
    let s2 = (z2 < 1) ? (z2-1)/(z2+1) + 1 : (z2-1)/(3-z2) + 1;
    return [y1+s1,y2+s2];
}

function standardToAltCoords(x1,x2,b1,b2) {
    let y1 = Math.floor(x1/2)*2;
    let z1 = x1 % 2;
    let s1 = (z1 < 1) ? z1/(2-z1) : (3*z1-2)/z1;
    let y2 = Math.floor(x2/2)*2;
    let z2 = x2 % 2;
    let s2 = (z2 < 1) ? z2/(2-z2) : (3*z2-2)/z2;
    return [y1+s1,y2+s2];
}

function altImage(alt) {
    const button1 = document.getElementById("alt-image-button-1");
    const button2 = document.getElementById("alt-image-button-2");

    const pic = document.getElementById("birhombic-pic");
    const rowPlayer = document.getElementById("br-row-player");
    const colPlayer = document.getElementById("br-col-player");
    const number2 = document.getElementById("matrix-class-number-2");
    const number5 = document.getElementById("matrix-class-number-5");
    const number6 = document.getElementById("matrix-class-number-6");
    const number7 = document.getElementById("matrix-class-number-7");
    const number8 = document.getElementById("matrix-class-number-8");
    const number12 = document.getElementById("matrix-class-number-12");
    const number14 = document.getElementById("matrix-class-number-14");
    const hex1 = document.getElementById("br-hex-1");
    const hex2 = document.getElementById("br-hex-2");
    const hex3 = document.getElementById("br-hex-3");

    // useAltSchema = alt;
    if (!diagramGrid) {
        fixImageSize = !useAltSchema;
        backgroundOutOfDate = true;
    }
    if (useAltSchema && !alt) {
        useAltSchema = false;
        button2.classList.remove("selected");
        button1.classList.add("selected");
        const coords1 = matrixToCoords(matrixA);
        const coords2 = matrixToCoords(flip(matrixB));
        coords = [coords1[0],coords2[0],coords1[1],coords2[1]];

        for (let child of pic.children) {
            child.style.opacity = 1;
        }
        hex1.style.display = "none";
        hex2.style.display = "none";
        hex3.style.display = "none";
    } else if (!useAltSchema && alt) {
        useAltSchema = true;
        button1.classList.remove("selected");
        button2.classList.add("selected");
        coords[2] = take(matrixA,1);
        coords[3] = take(matrixB,1);
        [coords[0],coords[1]] = standardToAltCoords(coords[0],coords[1]);

        for (let child of pic.children) {
            child.style.opacity = 0.5;
        }
        hex1.style.display = "";
        hex2.style.display = "";
        hex3.style.display = "";
        hex1.style.opacity = 1;
        hex2.style.opacity = 1;
        hex3.style.opacity = 1;
        rowPlayer.style.opacity = 1;
        colPlayer.style.opacity = 1;
        number2.style.opacity = 1;
        number5.style.opacity = 1;
        number6.style.opacity = 1;
        number7.style.opacity = 1;
        number8.style.opacity = 1;
        number12.style.opacity = 1;
        number14.style.opacity = 1;
    }
    if (diagramGrid) updateDiagramGrid();
    changeViewMode(viewMode,viewModeP1);
}

function hideGame() {
    diagramGrid = false;
    const fixImageButton0 = document.getElementById("fix-image-button-0");
    const fixImageButton1 = document.getElementById("fix-image-button-1");
    const fixImageButton2 = document.getElementById("fix-image-button-2");
    fixImageButton0.classList.add("selected");
    fixImageButton1.classList.remove("selected");
    fixImageButton2.classList.remove("selected");

    let element;
    while (element = document.querySelector(".clone")) {
        element.remove();
    }

    if (fixImageSize && !useAltSchema) {
        fixImageSize = false;
        backgroundOutOfDate = true;
    }

    const diagram = document.getElementById("diagram");
    diagram.style.opacity = 0;
}

function updateLegend() {
    const legendContainer = document.getElementById("legend-container");
    const legendCanvas = document.getElementById("legend-canvas");
    const legendLabel1 = document.getElementById("legend-label-1");
    const legendLabel2 = document.getElementById("legend-label-2");
    const legendLabel3 = document.getElementById("legend-label-3");
    const legendLabel4 = document.getElementById("legend-label-4");
    const legendLabel5 = document.getElementById("legend-label-5");
    const legendLabel6 = document.getElementById("legend-label-6");
    const legendLabel7 = document.getElementById("legend-label-7");
    const legendLabel8 = document.getElementById("legend-label-8");
    const legendLabel9 = document.getElementById("legend-label-9");
    const legendLabel10 = document.getElementById("legend-label-10");
    const legendLabel11 = document.getElementById("legend-label-11");
    const legendLabel12 = document.getElementById("legend-label-12");
    const legendLabel13 = document.getElementById("legend-label-13");

    const ctx = legendCanvas.getContext("2d");
    const imageData = ctx.getImageData(0, 0, legendCanvas.width, legendCanvas.height);
    const data = imageData.data;
    for (let j = 0; j < legendCanvas.height; j++) {
        const color = colorFunction(1-j/legendCanvas.height, viewMode);
        for (let i = 0; i < legendCanvas.height; i++) {
            data[(j*legendCanvas.width+i)*4]   = color[0];
            data[(j*legendCanvas.width+i)*4+1] = color[1];
            data[(j*legendCanvas.width+i)*4+2] = color[2];
            data[(j*legendCanvas.width+i)*4+3] = 255;
        }
    }
    ctx.putImageData(imageData,0,0);

    if (viewMode == 7) {
        legendLabel2.style.display = "none";
        legendLabel3.style.display = "none";
        legendLabel4.style.display = "none";
        legendLabel6.style.display = "";
        legendLabel7.style.display = "none";
        legendLabel8.style.display = "none";
        legendLabel9.style.display = "none";
        legendLabel10.style.display = "";
        legendLabel11.style.display = "";
        legendLabel12.style.display = "";
        legendLabel13.style.display = "";
        legendLabel1.innerHTML = "-6";
        legendLabel5.innerHTML = "6";
        legendLabel10.innerHTML = "4";
        legendLabel11.innerHTML = "2";
        legendLabel12.innerHTML = "-2";
        legendLabel13.innerHTML = "-4";
    } else if (viewMode == 8) {
        legendLabel2.style.display = "none";
        legendLabel3.style.display = "none";
        legendLabel4.style.display = "none";
        legendLabel6.style.display = "";
        legendLabel7.style.display = "none";
        legendLabel8.style.display = "none";
        legendLabel9.style.display = "none";
        legendLabel10.style.display = "";
        legendLabel11.style.display = "";
        legendLabel12.style.display = "";
        legendLabel13.style.display = "";
        legendLabel1.innerHTML = "-1";
        legendLabel5.innerHTML = "1";
        legendLabel10.innerHTML = "2/3";
        legendLabel11.innerHTML = "1/3";
        legendLabel12.innerHTML = "-1/3";
        legendLabel13.innerHTML = "-2/3";
    } else {
        legendLabel2.style.display = "";
        legendLabel3.style.display = "";
        legendLabel4.style.display = "";
        legendLabel6.style.display = "none";
        legendLabel7.style.display = "";
        legendLabel8.style.display = "";
        legendLabel9.style.display = "";
        legendLabel10.style.display = "none";
        legendLabel11.style.display = "none";
        legendLabel12.style.display = "none";
        legendLabel13.style.display = "none";
        legendLabel1.innerHTML = "0";
        legendLabel5.innerHTML = "9";
    }
}

function integerBetween(a,b) {
    return a != b && (Math.floor(a) == Math.ceil(b) || Math.ceil(a) == Math.floor(b));
}

function exportPNG() {
    const canvas = document.getElementById('canvas');
    const dataURL = canvas.toDataURL('image/png');
    const downloadLink = document.createElement('a');
    downloadLink.href = dataURL;
    downloadLink.download = 'canvas-image-'+viewMode.toString()+'-'+quad.toString()+'.png';
    downloadLink.click();
}

function goTo(x1,x2,b1,b2,q) {
    coords = [x1,x2,b1,b2];
    quad = q;
    updateBackground();
}

function goToZeroSum(q,i) {
    if (coords[2] > 3 && coords[3] > 3) {
        alert("There are no zero sum games such that b1=" + coords[2].toFixed(1) + " or b2=" + coords[3].toFixed(1) + ".");
        return;
    } else if (coords[2] > 3) {
        alert("There are no zero sum games such that b1=" + coords[2].toFixed(1) + ".");
        return;
    } else if (coords[3] > 3) {
        alert("There are no zero sum games such that b2=" + coords[3].toFixed(1) + ".");
        return;
    }
    let matrixRow = [0,0,0,6];
    let matrixCol = [0,0,0,0];
    let p1 = 0; // will either be r1 or s1-r1
    let p2 = 0; // will either be r1 or s1-r1
    let b1 = coords[2];
    let b2 = coords[3];
    if (i == 1) {
        p1 = 6-b2;
        p2 = 6-b1;
    } else {
        p1 = b1;
        p2 = b2;
    }

    switch (q) {
        case 2:
            matrixA = [6,p2,0,6-p1];
            matrixB = [0,6-p2,6,p1];
            break;
        case 3:
            matrixA = [6,p2,6-p1,0];
            matrixB = [0,6-p2,p1,6];
            break;
        case 4:
            matrixA = [6,0,p2,6-p1];
            matrixB = [0,6,6-p2,p1];
            break;
    }
    updateCoords();
    if (quad != q) {
        if (q == 2 || quad == 2) {
            crossBlue(false);
        } else if (q == 4 || quad == 4) {
            crossBlue(false);
        }
    }
}

function hideLines(hide) {
    const showLinesButton = document.getElementById("show-lines-button");
    const hideLinesButton = document.getElementById("hide-lines-button");
    if (hide) {
        showLinesButton.classList.remove("selected");
        hideLinesButton.classList.add("selected");
    } else {
        showLinesButton.classList.add("selected");
        hideLinesButton.classList.remove("selected");
    }
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

    if (hide) {
        red1.style.display = "none";
        red2.style.display = "none";
        red3.style.display = "none";
        red4.style.display = "none";
        red5.style.display = "none";
        red6.style.display = "none";
        green1.style.display = "none";
        green2.style.display = "none";
        green3.style.display = "none";
        green4.style.display = "none";
        green5.style.display = "none";
        green6.style.display = "none";
        green7.style.display = "none";
        green8.style.display = "none";
        picCorner1.style.display = "none";
        picCorner2.style.display = "none";
        picCorner3.style.display = "none";
        picCorner4.style.display = "none";
    } else {
        red1.style.display = "";
        red2.style.display = "";
        red3.style.display = "";
        red4.style.display = "";
        red5.style.display = "";
        red6.style.display = "";
        green1.style.display = "";
        green2.style.display = "";
        green3.style.display = "";
        green4.style.display = "";
        green5.style.display = "";
        green6.style.display = "";
        green7.style.display = "";
        green8.style.display = "";
        picCorner1.style.display = "";
        picCorner2.style.display = "";
        picCorner3.style.display = "";
        picCorner4.style.display = "";
    }
}


// add parameter for transferable utility
// add means

// going through corners
// show discontinuities?
// formatting
// update growbox() (bugged) (including for balanced games)
// dragging lines in balanced games