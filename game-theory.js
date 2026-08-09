const PI = 3.1415926535897932385;

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
let startPoint = [[0,0,0,0],[0,0,0,0]];
let destination = [[0,0,0,0],[0,0,0,0]];
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
let hiddenLines = false;

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
const games = [];
const blueLinePadding = 15;
const birhombicPadding = 20;
let xWidth = 0;

window.ondragstart = function() { return false; };

class Game {
    #row_matrix; #row_ranks;
    #col_matrix; #col_ranks;
    #quadrant; #x1; #b1; #x2; #b2;
    #quad_temp; #y1; #y2; #t1; #t2;
    #mode; #zone_row; #zone_col;
    #backstop; #threat_point; #threat_point_2; #pareto;
    #rhombic_x1; #rhombic_y1; #rhombic_x2; #rhombic_y2;
    #row_equilibrium_return; #col_equilibrium_return;
    #row_equilibrium_return_2; #col_equilibrium_return_2;
    #row_mixed_return; #col_mixed_return;
    #row_ntu_bs_return; #col_ntu_bs_return;
    #row_ntu_tp_return; #col_ntu_tp_return;
    #row_ntu_tp_return_2; #col_ntu_tp_return_2;
    #row_tu_bs_return; #col_tu_bs_return;
    #row_tu_tp_return; #col_tu_tp_return;
    #max_total; #correlation;
    #offset1 = 2; #offset2 = 2;
    #flip1 = -1; #flip2 = -1;

    constructor() {}

    static xb(x1,x2,b1,b2,q) {
        const new_game = new Game();
        new_game.x1 = x1;
        new_game.x2 = x2;
        new_game.b1 = b1;
        new_game.b2 = b2;
        new_game.quadrant = q;
        new_game.mode = 0;
        return new_game;
    }

    static temp(y1,y2,t1,t2,q,zone) {
        const new_game = new Game();
        new_game.mode = 1;
        new_game.y1 = y1;
        new_game.y2 = y2;
        new_game.t1 = t1;
        new_game.t2 = t2;
        new_game.quad_temp = q;
        new_game.zone = zone;
        return new_game;
    }

    static flip(matrix) {
        return [matrix[3],matrix[1],matrix[2],matrix[0]];
    }

    #clear() {
        // this.#row_matrix = undefined; this.#row_ranks = undefined;
        // this.#col_matrix = undefined; this.#col_ranks = undefined;
        // this.#x1 = undefined; this.#x2 = undefined; this.#b1 = undefined; this.#b2 = undefined; this.#quadrant = undefined;
        // this.#y1 = undefined; this.#y2 = undefined; this.#t1 = undefined; this.#t2 = undefined; this.#quad_temp = undefined;
        // this.#zone_row = undefined; this.#zone_col = undefined;
        this.#backstop = undefined; this.#threat_point = undefined; this.#threat_point_2 = undefined; this.#pareto = undefined;
        this.#rhombic_x1 = undefined; this.#rhombic_y1 = undefined; this.#rhombic_x2 = undefined; this.#rhombic_y2 = undefined;
        this.#row_equilibrium_return = undefined; this.#col_equilibrium_return = undefined;
        this.#row_equilibrium_return_2 = undefined; this.#col_equilibrium_return_2 = undefined;
        this.#row_mixed_return = undefined; this.#col_mixed_return = undefined;
        this.#row_ntu_bs_return = undefined; this.#col_ntu_bs_return = undefined;
        this.#row_ntu_tp_return = undefined; this.#col_ntu_tp_return = undefined;
        this.#row_ntu_tp_return_2 = undefined; this.#col_ntu_tp_return_2 = undefined;
        this.#row_tu_bs_return = undefined; this.#col_tu_bs_return = undefined;
        this.#row_tu_tp_return = undefined; this.#col_tu_tp_return = undefined;
        this.#max_total = undefined; this.#correlation = undefined;
    }
    #clear1() {
        this.#x1 = undefined; this.#x2 = undefined; this.#b1 = undefined; this.#b2 = undefined; this.#quadrant = undefined;
    }
    #clear2() {
        this.#y1 = undefined; this.#y2 = undefined; this.#t1 = undefined; this.#t2 = undefined; this.#quad_temp = undefined;
    }
    #clear_zones() {
        this.#zone_row = undefined; this.#zone_col = undefined;
    }

    #ranks(m) {
        let ranks = [0,0,0,0];
        const values = m.toSorted();
        for (let i = 0; i < 4; i++) {
            ranks[i] = values.indexOf(m[i]);
            values[ranks[i]] = -1;
        }
        return ranks;
    }

    get row_matrix() { return this.#row_matrix; }
    get col_matrix() { return this.#col_matrix; }
    set row_matrix(val) {
        this.#clear(); this.#clear1(); this.#clear2();
        this.#row_matrix = val;
        this.#row_ranks = this.#ranks(val);
        if (this.t1 > 3) this.#zone_row = 1;
        else if (this.t1 < 3) this.#zone_row = 0;
    }
    set col_matrix(val) {
        this.#clear(); this.#clear1(); this.#clear2();
        this.#col_matrix = val;
        this.#col_ranks = this.#ranks(val);
        if (this.t2 > 3) this.#zone_col = 1;
        else if (this.t2 < 3) this.#zone_col = 0;
    }
    get row_ranks() {
        if (this.#row_ranks === undefined) this.#row_ranks = this.#ranks(this.row_matrix);
        return this.#row_ranks;
    }
    get col_ranks() {
        if (this.#col_ranks === undefined) this.#col_ranks = this.#ranks(this.col_matrix);
        return this.#col_ranks;
    }

    #update_quadrant() {
        const max1 = this.row_ranks.indexOf(3);
        const max2 = this.col_ranks.indexOf(3);
        if (max1 == max2) this.#quadrant = 1;
        else if (max1 == 0 && max2 == 2 || max1 == 2 && max2 == 0 || max1 == 1 && max2 == 3 || max1 == 3 && max2 == 1)
            this.#quadrant = 2;
        else if (max1 == 0 && max2 == 1 || max1 == 1 && max2 == 0 || max1 == 2 && max2 == 3 || max1 == 3 && max2 == 2)
            this.#quadrant = 4;
        else this.#quadrant = 3;
    }
    #update_quad_temp() {
        const max1 = this.zone_row == 1 ? this.row_ranks.indexOf(0) : this.row_ranks.indexOf(3);
        const max2 = this.zone_col == 1 ? this.col_ranks.indexOf(0) : this.col_ranks.indexOf(3);
        if (max1 == max2) this.#quad_temp = 1;
        else if (max1 == 0 && max2 == 2 || max1 == 2 && max2 == 0 || max1 == 1 && max2 == 3 || max1 == 3 && max2 == 1)
            this.#quad_temp = 2;
        else if (max1 == 0 && max2 == 1 || max1 == 1 && max2 == 0 || max1 == 2 && max2 == 3 || max1 == 3 && max2 == 2)
            this.#quad_temp = 4;
        else this.#quad_temp = 3;
    }

    #matrix_to_xb(matrix,ranks) {
        const sorted_matrix = matrix.toSorted();
        const redModified = sorted_matrix[2] != 0 ? sorted_matrix[1]/sorted_matrix[2] : 0;
        const blue = 6 - sorted_matrix[2];

        let cell = -1;
        if (ranks[0] == 2 && ranks[1] == 3 || ranks[1] == 2 && ranks[0] == 3 || ranks[2] == 2 && ranks[3] == 3 || ranks[3] == 2 && ranks[2] == 3) {
            if (ranks[0] == 0 && ranks[2] == 3 || ranks[2] == 0 && ranks[0] == 3 || ranks[1] == 0 && ranks[3] == 3 || ranks[3] == 0 && ranks[1] == 3) cell = 5;
            else cell = 4;
        } else if (ranks[0] == 2 && ranks[2] == 3 || ranks[2] == 2 && ranks[0] == 3 || ranks[1] == 2 && ranks[3] == 3 || ranks[3] == 2 && ranks[1] == 3) {
            if (ranks[0] == 0 && ranks[1] == 3 || ranks[1] == 0 && ranks[0] == 3 || ranks[2] == 0 && ranks[3] == 3 || ranks[3] == 0 && ranks[2] == 3) cell = 2;
            else cell = 3;
        } else {
            if (ranks[0] == 0 && ranks[2] == 3 || ranks[2] == 0 && ranks[0] == 3 || ranks[1] == 0 && ranks[3] == 3 || ranks[3] == 0 && ranks[1] == 3) cell = 0;
            else cell = 1;
        }

        let x = -1;
        if (cell % 2 == 0) x = cell + 1 - redModified;
        else x = cell + redModified;
        return [x,blue];
    }

    #negate_row(m) {
        const new_matrix = [0,1,2,3];
        for (let i = 0; i < 4; i++) {
            new_matrix[i] = this.row_matrix[this.row_ranks.indexOf(3-this.row_ranks[i])];
        }
        this.#row_matrix = new_matrix;
        this.#row_ranks = this.#row_ranks.map(x => 3 - x);
    }

    #negate_col(m) {
        const new_matrix = [0,1,2,3];
        for (let i = 0; i < 4; i++) {
            new_matrix[i] = this.col_matrix[this.col_ranks.indexOf(3-this.col_ranks[i])];
        }
        this.#col_matrix = new_matrix;
        this.#col_ranks = this.#col_ranks.map(x => 3 - x);
    }

    #x1b1_to_matrix() {
        const x1 = (this.#x1*this.#flip1 - this.#offset1 + 12) % 6;
        var a = Math.max(x1 % 2 - 1,0);
        var aa = Math.max(1 - (x1 % 2),0);
        this.#row_matrix = [0,6,0,0];
        this.#row_ranks = [0,3,0,0];

        switch (Math.floor(x1/2)%3) {
            case 0:
                this.#row_matrix[2] = 6 - this.#b1;
                this.#row_matrix[3] = (6 - this.#b1) * a;
                this.#row_matrix[0] = (6 - this.#b1) * aa;
                this.#row_ranks[2] = 2;
                this.#row_ranks[3] = aa == 0 ? 1 : 0;
                this.#row_ranks[0] = aa == 0 ? 0 : 1;
                break;
            case 1:
                this.#row_matrix[3] = 6 - this.#b1;
                this.#row_matrix[0] = (6 - this.#b1) * a;
                this.#row_matrix[2] = (6 - this.#b1) * aa;
                this.#row_ranks[3] = 2;
                this.#row_ranks[0] = aa == 0 ? 1 : 0;
                this.#row_ranks[2] = aa == 0 ? 0 : 1;
                break;
            case 2:
                this.#row_matrix[0] = 6 - this.#b1;
                this.#row_matrix[2] = (6 - this.#b1) * a;
                this.#row_matrix[3] = (6 - this.#b1) * aa;
                this.#row_ranks[0] = 2;
                this.#row_ranks[2] = aa == 0 ? 1 : 0;
                this.#row_ranks[3] = aa == 0 ? 0 : 1;
                break;
        }
        if (this.#quadrant == 2 || this.#quadrant == 3) {
            this.#row_matrix = [this.#row_matrix[2],this.#row_matrix[3],this.#row_matrix[0],this.#row_matrix[1]];
            this.#row_ranks = [this.#row_ranks[2],this.#row_ranks[3],this.#row_ranks[0],this.#row_ranks[1]];
        }
        this.#clear();
        this.#clear2();
        return this.#row_matrix;
    }
    #update_x1b1() {
        const coords = this.#matrix_to_xb(this.row_matrix,this.row_ranks);
        this.#x1 = ((coords[0] + this.#offset1)*this.#flip1 + 12) % 6;
        this.#b1 = coords[1];
    }

    #x2b2_to_matrix() {
        const x2 = (this.#x2*this.#flip2 - this.#offset2 + 12) % 6;
        var b = Math.max(x2 % 2 - 1,0);
        var bb = Math.max(1 - (x2 % 2),0);
        this.#col_matrix = [0,6,0,0];
        this.#col_ranks = [0,3,0,0];

        switch (Math.floor(x2/2)%3) {
            case 0:
                this.#col_matrix[2] = 6 - this.#b2;
                this.#col_matrix[0] = (6 - this.#b2) * b;
                this.#col_matrix[3] = (6 - this.#b2) * bb;
                this.#col_ranks[2] = 2;
                this.#col_ranks[0] = bb == 0 ? 1 : 0;
                this.#col_ranks[3] = bb == 0 ? 0 : 1;
                break;
            case 1:
                this.#col_matrix[0] = 6 - this.#b2;
                this.#col_matrix[3] = (6 - this.#b2) * b;
                this.#col_matrix[2] = (6 - this.#b2) * bb;
                this.#col_ranks[0] = 2;
                this.#col_ranks[3] = bb == 0 ? 1 : 0;
                this.#col_ranks[2] = bb == 0 ? 0 : 1;
                break;
            case 2:
                this.#col_matrix[3] = 6 - this.#b2;
                this.#col_matrix[2] = (6 - this.#b2) * b;
                this.#col_matrix[0] = (6 - this.#b2) * bb;
                this.#col_ranks[3] = 2;
                this.#col_ranks[2] = bb == 0 ? 1 : 0;
                this.#col_ranks[0] = bb == 0 ? 0 : 1;
                break;
        }
        if (this.#quadrant == 4 || this.#quadrant == 3) {
            this.#col_matrix = [this.#col_matrix[1],this.#col_matrix[0],this.#col_matrix[3],this.#col_matrix[2]];
            this.#col_ranks = [this.#col_ranks[1],this.#col_ranks[0],this.#col_ranks[3],this.#col_ranks[2]];
        }
        this.#clear();
        this.#clear2();
        return this.#col_matrix;
    }
    #update_x2b2() {
        const coords = this.#matrix_to_xb(Game.flip(this.col_matrix),Game.flip(this.col_ranks));
        this.#x2 = ((coords[0] + this.#offset2)*this.#flip2 + 12) % 6;
        this.#b2 = coords[1];
    }

    get x1() {
        if (this.#x1 === undefined) this.#update_x1b1();
        return this.#x1;
    }
    get b1() {
        if (this.#b1 === undefined) this.#update_x1b1();
        return this.#b1;
    }
    get x2() {
        if (this.#x2 === undefined) this.#update_x2b2();
        return this.#x2;
    }
    get b2() {
        if (this.#b2 === undefined) this.#update_x2b2();
        return this.#b2;
    }
    set x1(val) {
        this.#x1 = val;
        if (this.#b1 !== undefined)
            this.#x1b1_to_matrix();
    }
    set b1(val) {
        this.#b1 = val;
        if (this.#x1 !== undefined)
            this.#x1b1_to_matrix();
    }
    set x2(val) {
        this.#x2 = val;
        if (this.#b2 !== undefined)
            this.#x2b2_to_matrix();
    }
    set b2(val) {
        this.#b2 = val;
        if (this.#x2 !== undefined)
            this.#x2b2_to_matrix();
    }
    get quadrant() {
        if (this.#quadrant === undefined) this.#update_quadrant();
        return this.#quadrant;
    }
    set quadrant(val) {
        this.#quadrant = val;
        if (this.#x1 !== undefined && this.#b1 !== undefined)
            this.#x1b1_to_matrix();
        if (this.#x2 !== undefined && this.#b2 !== undefined)
            this.#x2b2_to_matrix();
    }

    #matrix_to_yt(matrix,ranks) {
        const sorted_matrix = matrix.toSorted();
        const temp = (sorted_matrix[1] + sorted_matrix[2]) / 2;
        const y0 = (sorted_matrix[2] - temp) / (temp == 0 || temp == 6 ? 1 : Math.min(temp,6-temp));

        let cell = -1;
        if (ranks[0] == 2 && ranks[1] == 3 || ranks[1] == 2 && ranks[0] == 3 || ranks[2] == 2 && ranks[3] == 3 || ranks[3] == 2 && ranks[2] == 3) {
            if (ranks[0] == 0 && ranks[2] == 3 || ranks[2] == 0 && ranks[0] == 3 || ranks[1] == 0 && ranks[3] == 3 || ranks[3] == 0 && ranks[1] == 3) cell = 5;
            else cell = 4;
        } else if (ranks[0] == 2 && ranks[2] == 3 || ranks[2] == 2 && ranks[0] == 3 || ranks[1] == 2 && ranks[3] == 3 || ranks[3] == 2 && ranks[1] == 3) {
            if (ranks[0] == 0 && ranks[1] == 3 || ranks[1] == 0 && ranks[0] == 3 || ranks[2] == 0 && ranks[3] == 3 || ranks[3] == 0 && ranks[2] == 3) cell = 2;
            else cell = 3;
        } else {
            if (ranks[0] == 0 && ranks[2] == 3 || ranks[2] == 0 && ranks[0] == 3 || ranks[1] == 0 && ranks[3] == 3 || ranks[3] == 0 && ranks[1] == 3) cell = 0;
            else cell = 1;
        }

        let y = -1;
        if (cell % 2 == 1) y = cell + 1 - y0;
        else y = cell + y0;
        return [y,temp];
    }
    #update_y1() {
        const coords = this.zone_row == 0 ? 
                       this.#matrix_to_yt(this.row_matrix,this.row_ranks) :
                       this.#matrix_to_yt(this.row_matrix.map(x => 6 - x),this.row_ranks.map(x => 3 - x));
        this.#y1 = ((coords[0] + this.#offset1)*this.#flip1 + 12) % 6;
    }
    #update_y2() {
        const coords = this.zone_col == 0 ? 
                       this.#matrix_to_yt(Game.flip(this.col_matrix),Game.flip(this.col_ranks)) :
                       this.#matrix_to_yt(Game.flip(this.col_matrix.map(x => 6 - x)),Game.flip(this.col_ranks.map(x => 3 - x)));
        this.#y2 = ((coords[0] + this.#offset1)*this.#flip1 + 12) % 6;
    }

    #y1t1_to_matrix() {
        const y1 = (this.#y1*this.#flip1 - this.#offset1 + 12) % 6;
        const middle_interval = (1-Math.abs(y1 % 2 - 1))*(3-Math.abs(this.t1-3))*2; // the difference between the two middle values in row's matrix
        var b = this.t1 - middle_interval/2; // third greatest value
        var c = this.t1 + middle_interval/2; // second greatest value
        const flipped = Math.floor(y1 % 2) == 1;
        this.#row_matrix = [0,6,0,0];
        this.#row_ranks = [0,3,0,0];

        switch (Math.floor(y1/2)%3) {
            case 0:
                this.#row_matrix[2] = c;
                this.#row_matrix[3] = flipped ? b : 0;
                this.#row_matrix[0] = flipped ? 0 : b;
                this.#row_ranks[2] = 2;
                this.#row_ranks[3] = flipped ? 1 : 0;
                this.#row_ranks[0] = flipped ? 0 : 1;
                break;
            case 1:
                this.#row_matrix[3] = c;
                this.#row_matrix[0] = flipped ? b : 0;
                this.#row_matrix[2] = flipped ? 0 : b;
                this.#row_ranks[3] = 2;
                this.#row_ranks[0] = flipped ? 1 : 0;
                this.#row_ranks[2] = flipped ? 0 : 1;
                break;
            case 2:
                this.#row_matrix[0] = c;
                this.#row_matrix[2] = flipped ? b : 0;
                this.#row_matrix[3] = flipped ? 0 : b;
                this.#row_ranks[0] = 2;
                this.#row_ranks[2] = flipped ? 1 : 0;
                this.#row_ranks[3] = flipped ? 0 : 1;
                break;
        }
        if (this.quad_temp == 2 || this.quad_temp == 3) {
            this.#row_matrix = [this.#row_matrix[2],this.#row_matrix[3],this.#row_matrix[0],this.#row_matrix[1]];
            this.#row_ranks = [this.#row_ranks[2],this.#row_ranks[3],this.#row_ranks[0],this.#row_ranks[1]];
        }
        if (this.zone_row == 1) {
            this.#negate_row();
        }
        this.#clear();
        this.#clear1();
        return this.#row_matrix;
    }
    #y2t2_to_matrix() {
        const y2 = (this.#y2*this.#flip2 - this.#offset2 + 12) % 6;
        const middle_interval = (1-Math.abs(y2 % 2 - 1))*(3-Math.abs(this.t2-3))*2; // the difference between the two middle values in row's matrix
        var b = this.t2 - middle_interval/2; // third greatest value
        var c = this.t2 + middle_interval/2; // second greatest value
        const flipped = Math.floor(y2 % 2) == 1;
        this.#col_matrix = [0,6,0,0];
        this.#col_ranks = [0,3,0,0];

        switch (Math.floor(y2/2)%3) {
            case 0:
                this.#col_matrix[2] = c;
                this.#col_matrix[0] = flipped ? b : 0;
                this.#col_matrix[3] = flipped ? 0 : b;
                this.#col_ranks[2] = 2;
                this.#col_ranks[0] = flipped ? 1 : 0;
                this.#col_ranks[3] = flipped ? 0 : 1;
                break;
            case 1:
                this.#col_matrix[0] = c;
                this.#col_matrix[3] = flipped ? b : 0;
                this.#col_matrix[2] = flipped ? 0 : b;
                this.#col_ranks[0] = 2;
                this.#col_ranks[3] = flipped ? 1 : 0;
                this.#col_ranks[2] = flipped ? 0 : 1;
                break;
            case 2:
                this.#col_matrix[3] = c;
                this.#col_matrix[2] = flipped ? b : 0;
                this.#col_matrix[0] = flipped ? 0 : b;
                this.#col_ranks[3] = 2;
                this.#col_ranks[2] = flipped ? 1 : 0;
                this.#col_ranks[0] = flipped ? 0 : 1;
                break;
        }
        if (this.quad_temp == 4 || this.quad_temp == 3) {
            this.#col_matrix = [this.#col_matrix[1],this.#col_matrix[0],this.#col_matrix[3],this.#col_matrix[2]];
            this.#col_ranks = [this.#col_ranks[1],this.#col_ranks[0],this.#col_ranks[3],this.#col_ranks[2]];
        }
        if (this.zone_col == 1) {
            this.#negate_col();
        }
        this.#clear();
        this.#clear1();
        return this.#col_matrix;
    }

    get y1() {
        if (this.#y1 === undefined) this.#update_y1();
        return this.#y1;
    }
    get y2() {
        if (this.#y2 === undefined) this.#update_y2();
        return this.#y2;
    }
    get t1() {
        if (this.#t1 === undefined) {
            this.#t1 = (this.row_matrix[0]+this.row_matrix[1]+this.row_matrix[2]+this.row_matrix[3]-6) / 2;
        }
        return this.#t1;
    }
    get t2() {
        if (this.#t2 === undefined) {
            this.#t2 = (this.col_matrix[0]+this.col_matrix[1]+this.col_matrix[2]+this.col_matrix[3]-6) / 2;
        }
        return this.#t2;
    }
    get quad_temp() {
        if (this.#quad_temp === undefined) this.#update_quad_temp();
        return this.#quad_temp;
    }
    get zone() {
        if (this.zone_row == 0 && this.zone_col == 0) {
            return 1;
        } else if (this.zone_row == 1 && this.zone_col == 0) {
            return 2;
        } else if (this.zone_row == 0 && this.zone_col == 1) {
            return 4;
        } else {
            return 3;
        }
    }
    get zone_row() {
        if (this.#zone_row === undefined) {
            if (this.t1 <= 3) {
                this.#zone_row = 0;
            } else {
                this.#zone_row = 1;
            }
        }
        return this.#zone_row;
    }
    get zone_col() {
        if (this.#zone_col === undefined) {
            if (this.#t2 <= 3) {
                this.#zone_col = 0;
            } else {
                this.#zone_col = 1;
            }
        }
        return this.#zone_col;
    }
    set y1(val) {
        this.#y1 = val;
        if (this.#t1 !== undefined && this.#zone_row !== undefined && this.#quad_temp !== undefined) this.#y1t1_to_matrix();
    }
    set y2(val) {
        this.#y2 = val;
        if (this.#t2 !== undefined && this.#zone_col !== undefined && this.#quad_temp !== undefined) this.#y2t2_to_matrix();
    }
    set t1(val) {
        this.#t1 = val;
        if (this.#t1 != 3) this.zone_row = val < 3 ? 0 : 1;
        if (this.#y1 !== undefined && this.#quad_temp !== undefined) this.#y1t1_to_matrix();
    }
    set t2(val) {
        this.#t2 = val;
        if (this.#t2 != 3) this.zone_col = val < 3 ? 0 : 1;
        if (this.#y2 !== undefined && this.#quad_temp !== undefined) this.#y2t2_to_matrix();
    }
    set quad_temp(val) {
        this.#quad_temp = val;
        if (this.#y1 !== undefined && this.#t1 !== undefined)
            this.#y1t1_to_matrix();
        if (this.#y2 !== undefined && this.#t2 !== undefined)
            this.#y2t2_to_matrix();
    }
    set zone(val) {
        switch (val) {
            case 1:
                this.zone_row = 0;
                this.zone_col = 0;
                break;
            case 2:
                this.zone_row = 1;
                this.zone_col = 0;
                break;
            case 3:
                this.zone_row = 1;
                this.zone_col = 1;
                break;
            case 4:
                this.zone_row = 0;
                this.zone_col = 1;
                break;
        }
    }
    set zone_row(val) {
        if (this.#row_matrix !== undefined && this.#col_matrix !== undefined && val != this.#zone_row) {
            this.#zone_row = val;
            this.#update_quad_temp();
        } else {
            this.#zone_row = val;
        }
    }
    set zone_col(val) {
        if (this.#row_matrix !== undefined && this.#col_matrix !== undefined && val != this.#zone_col) {
            this.#zone_col = val;
            this.#update_quad_temp();
        } else {
            this.#zone_col = val;
        }
    }

    get mode() { return this.#mode; }
    set mode(val) { this.#mode = val; }
    get coord_1() {
        if (this.mode == 0) return this.x1;
        else return this.y1;
    }
    get coord_2() {
        if (this.mode == 0) return this.x2;
        else return this.y2;
    }
    get coord_3() {
        if (this.mode == 0) return this.b1;
        else return this.t1;
    }
    get coord_4() {
        if (this.mode == 0) return this.b2;
        else return this.t2;
    }
    get quad() {
        if (this.mode == 0) return this.quadrant;
        else return this.quad_temp;
    }
    set coord_1(val) {
        if (this.mode == 0) this.x1 = val;
        else this.y1 = val;
    }
    set coord_2(val) {
        if (this.mode == 0) this.x2 = val;
        else this.y2 = val;
    }
    set coord_3(val) {
        if (this.mode == 0) this.b1 = val;
        else this.t1 = val;
    }
    set coord_4(val) {
        if (this.mode == 0) this.b2 = val;
        else this.t2 = val;
    }
    set quad(val) {
        if (this.mode == 0) this.quadrant = val;
        else this.quad_temp = val;
    }

    // set matrices(val) {
    //     val[0] = val[0].map(x => Math.max(Math.min(x,6)),0);
    //     val[1] = val[1].map(x => Math.max(Math.min(x,6)),0);
    //     const coords1 = this.#matrix_to_xb(val[0],this.#ranks(val[0]));
    //     this.#x1 = ((coords1[0] + this.#offset1)*this.#flip1 + 12) % 6;
    //     this.#b1 = coords1[1];
    //     const coords2 = this.#matrix_to_xb(flip(val[1]),flip(this.#ranks(val[1])));
    //     this.#x2 = ((coords2[0] + this.#offset2)*this.#flip2 + 12) % 6;
    //     this.#b2 = coords2[1];
    //     this.#row_matrix = val[0];
    //     this.#col_matrix = val[1];
    //     this.#row_ranks = this.#ranks(this.#row_matrix);
    //     this.#col_ranks = this.#ranks(this.#col_matrix);
    //     this.#update_quadrant();
    //     this.#clear();
    // }

    get row_mixed_return() {
        if (this.#row_mixed_return === undefined) {
            if ((this.row_matrix[0] >= this.row_matrix[2] || this.row_matrix[1] >= this.row_matrix[3]) &&
                (this.row_matrix[0] <= this.row_matrix[2] || this.row_matrix[1] <= this.row_matrix[3]) &&
                (this.col_matrix[0] >= this.col_matrix[1] || this.col_matrix[2] >= this.col_matrix[3]) &&
                (this.col_matrix[0] <= this.col_matrix[1] || this.col_matrix[2] <= this.col_matrix[3])
            ) {
                let denom = this.row_matrix[0] - this.row_matrix[1] - this.row_matrix[2] + this.row_matrix[3];
                if (denom != 0)
                    this.#row_mixed_return = (this.row_matrix[0]*this.row_matrix[3] - this.row_matrix[1]*this.row_matrix[2]) / denom;
                else
                    this.#row_mixed_return = null;
            } else {
                this.#row_mixed_return = null;
            }
        }
        return this.#row_mixed_return;
    }

    get col_mixed_return() {
        if (this.#col_mixed_return === undefined) {
            if ((this.row_matrix[0] >= this.row_matrix[2] || this.row_matrix[1] >= this.row_matrix[3]) &&
                (this.row_matrix[0] <= this.row_matrix[2] || this.row_matrix[1] <= this.row_matrix[3]) &&
                (this.col_matrix[0] >= this.col_matrix[1] || this.col_matrix[2] >= this.col_matrix[3]) &&
                (this.col_matrix[0] <= this.col_matrix[1] || this.col_matrix[2] <= this.col_matrix[3])
            ) {
                let denom = this.col_matrix[0] - this.col_matrix[1] - this.col_matrix[2] + this.col_matrix[3];
                if (denom != 0)
                    this.#col_mixed_return = (this.col_matrix[0]*this.col_matrix[3] - this.col_matrix[1]*this.col_matrix[2]) / denom;
                else
                    this.#col_mixed_return = null;
            } else {
                this.#col_mixed_return = null;
            }
        }
        return this.#col_mixed_return;
    }

    get row_equilibrium_return() {
        if (this.#row_equilibrium_return === undefined) {
            if (this.col_ranks[0] > this.col_ranks[1] && this.col_ranks[2] > this.col_ranks[3]) {
                this.#row_equilibrium_return = Math.max(this.row_matrix[0], this.row_matrix[2]);
            } else if (this.col_ranks[0] < this.col_ranks[1] && this.col_ranks[2] < this.col_ranks[3]) {
                this.#row_equilibrium_return = Math.max(this.row_matrix[1], this.row_matrix[3]);
            } else if (this.row_ranks[0] > this.row_ranks[2] && this.row_ranks[1] > this.row_ranks[3]) {
                if (this.col_ranks[0] > this.col_ranks[1])
                    this.#row_equilibrium_return = this.row_matrix[0];
                else
                    this.#row_equilibrium_return = this.row_matrix[1];
            } else if (this.row_ranks[0] < this.row_ranks[2] && this.row_ranks[1] < this.row_ranks[3]) {
                if (this.col_ranks[2] > this.col_ranks[3])
                    this.#row_equilibrium_return = this.row_matrix[2];
                else
                    this.#row_equilibrium_return = this.row_matrix[3];
            } else if (this.row_ranks[0] > this.row_ranks[2] && this.col_ranks[0] > this.col_ranks[1] && this.row_ranks[3] > this.row_ranks[1] && this.col_ranks[3] > this.col_ranks[2]) {
                const product1 = (this.row_matrix[0]-this.row_matrix[2])*(this.col_matrix[0]-this.col_matrix[1]);
                const product2 = (this.row_matrix[3]-this.row_matrix[1])*(this.col_matrix[3]-this.col_matrix[2]);
                if (Math.abs(product1-product2) < 0.0001) {
                    this.#row_equilibrium_return_2 = this.row_matrix[3];
                    return this.row_matrix[0];
                }
                if (product1 > product2) return this.row_matrix[0];
                else return this.row_matrix[3];
            } else if (this.row_ranks[1] > this.row_ranks[3] && this.col_ranks[1] > this.col_ranks[0] && this.row_ranks[2] > this.row_ranks[0] && this.col_ranks[2] > this.col_ranks[3]) {
                const product1 = (this.row_matrix[1]-this.row_matrix[3])*(this.col_matrix[1]-this.col_matrix[0]);
                const product2 = (this.row_matrix[2]-this.row_matrix[0])*(this.col_matrix[2]-this.col_matrix[3]);
                if (Math.abs(product1-product2) < 0.0001) {
                    this.#row_equilibrium_return_2 = this.row_matrix[2];
                    return this.row_matrix[1];
                    // const checker_size = 0.25;
                    // const diagonal1 = (this.#x1+this.#x2) % checker_size < checker_size/2;
                    // const diagonal2 = (this.#x1-this.#x2+6) % checker_size < checker_size/2;
                    // if (diagonal1 && diagonal2 || !diagonal1 && !diagonal2)
                    //     return this.row_matrix[1];
                    // else
                    //     return this.row_matrix[2];
                }
                if (product1 > product2) return this.row_matrix[1];
                else return this.row_matrix[2];
            } else {
                this.#row_equilibrium_return = this.row_mixed_return;
            }
        }
        return this.#row_equilibrium_return;
    }

    get col_equilibrium_return() {
        if (this.#col_equilibrium_return === undefined) {
            if (this.row_ranks[3] > this.row_ranks[1] && this.row_ranks[2] > this.row_ranks[0]) {
                this.#col_equilibrium_return = Math.max(this.col_matrix[3], this.col_matrix[2]);
            } else if (this.row_ranks[3] < this.row_ranks[1] && this.row_ranks[2] < this.row_ranks[0]) {
                this.#col_equilibrium_return = Math.max(this.col_matrix[1], this.col_matrix[0]);
            } else if (this.col_ranks[3] > this.col_ranks[2] && this.col_ranks[1] > this.col_ranks[0]) {
                if (this.row_ranks[3] > this.row_ranks[1])
                    this.#col_equilibrium_return = this.col_matrix[3];
                else
                    this.#col_equilibrium_return = this.col_matrix[1];
            } else if (this.col_ranks[3] < this.col_ranks[2] && this.col_ranks[1] < this.col_ranks[0]) {
                if (this.row_ranks[2] > this.row_ranks[0])
                    this.#col_equilibrium_return = this.col_matrix[2];
                else
                    this.#col_equilibrium_return = this.col_matrix[0];
            } else if (this.row_ranks[0] > this.row_ranks[2] && this.col_ranks[0] > this.col_ranks[1] && this.row_ranks[3] > this.row_ranks[1] && this.col_ranks[3] > this.col_ranks[2]) {
                const product1 = (this.row_matrix[0]-this.row_matrix[2])*(this.col_matrix[0]-this.col_matrix[1]);
                const product2 = (this.row_matrix[3]-this.row_matrix[1])*(this.col_matrix[3]-this.col_matrix[2]);
                if (Math.abs(product1-product2) < 0.0001) {
                    this.#col_equilibrium_return_2 = this.col_matrix[3];
                    return this.col_matrix[0];
                }
                if (product1 > product2) return this.col_matrix[0];
                else return this.col_matrix[3];
            } else if (this.row_ranks[1] > this.row_ranks[3] && this.col_ranks[1] > this.col_ranks[0] && this.row_ranks[2] > this.row_ranks[0] && this.col_ranks[2] > this.col_ranks[3]) {
                const product1 = (this.row_matrix[1]-this.row_matrix[3])*(this.col_matrix[1]-this.col_matrix[0]);
                const product2 = (this.row_matrix[2]-this.row_matrix[0])*(this.col_matrix[2]-this.col_matrix[3]);
                if (Math.abs(product1-product2) < 0.0001) {
                    this.#col_equilibrium_return_2 = this.col_matrix[2];
                    return this.col_matrix[1];
                }
                if (product1 > product2) return this.col_matrix[1];
                else return this.col_matrix[2];
            } else {
                this.#col_equilibrium_return = this.col_mixed_return;
            }
        }
        return this.#col_equilibrium_return;
    }

    get row_equilibrium_return_2() {
        this.row_equilibrium_return;
        if (this.#row_equilibrium_return_2 === undefined) {
            return null;
        } else {
            return this.#row_equilibrium_return_2;
        }
    }

    get col_equilibrium_return_2() {
        this.col_equilibrium_return;
        if (this.#col_equilibrium_return_2 === undefined) {
            return null;
        } else {
            return this.#col_equilibrium_return_2;
        }
    }

    get max_total() {
        if (this.#max_total === undefined) {
            let biggestEntry = 0;
            let max = this.row_matrix[0]+this.col_matrix[0];
            for (let i = 1; i < 4; i++) {
                if (max < this.row_matrix[i]+this.col_matrix[i]) {
                    biggestEntry = i;
                    max = this.row_matrix[i]+this.col_matrix[i];
                }
            }
            this.#max_total = max/2;
        }
        return this.#max_total;
    }

    get backstop() {
        if (this.#backstop === undefined) {
            let rowBackstop = 0;
            let colBackstop = 0;

            let row1_min = Math.min(this.row_matrix[0],this.row_matrix[1]);
            let row2_min = Math.min(this.row_matrix[2],this.row_matrix[3]);
            if (row1_min < row2_min)
                rowBackstop = row2_min;
            else rowBackstop = row1_min;

            let col1_min = Math.min(this.col_matrix[0],this.col_matrix[2]);
            let col2_min = Math.min(this.col_matrix[1],this.col_matrix[3]);
            if (col1_min < col2_min)
                colBackstop = col2_min;
            else colBackstop = col1_min;

            this.#backstop = [rowBackstop,colBackstop];
        }
        return this.#backstop;
    }

    get threat_point() {
        if (this.#threat_point === undefined) {
            // create zero-sum game given by A=R-C and B=C-R
            const A = [this.row_matrix[0]-this.col_matrix[0], this.row_matrix[1]-this.col_matrix[1],
                    this.row_matrix[2]-this.col_matrix[2], this.row_matrix[3]-this.col_matrix[3]];
            const B = [-A[0],-A[1],-A[2],-A[3]];

            // compute the equilibrium of the zero-sum game
            let equilibrium = [0,0];
            let mixed = false;
            if (B[0] >= B[1] && B[2] >= B[3]) {
                if (A[0] >= A[2]) {
                    equilibrium[0] = 1;
                }
                else equilibrium[0] = 0;
            } else if (B[1] >= B[0] && B[3] >= B[2]) {
                if (A[1] >= A[3]) {
                    equilibrium[0] = 1;
                }
                else equilibrium[0] = 0;
            } else if (A[0] >= A[2] && A[1] >= A[3]) {
                equilibrium[0] = 1;
            } else if (A[2] >= A[0] && A[3] >= A[1]) {
                equilibrium[0] = 0;
            } else {
                equilibrium[0] = (B[3] - B[2])/(B[0] - B[1] - B[2] + B[3]);
            }

            if (A[3] >= A[1] && A[2] >= A[0]) {
                if (B[3] >= B[2]) equilibrium[1] = 0;
                else equilibrium[1] = 1;
            } else if (A[1] >= A[3] && A[0] >= A[2]) {
                if (B[1] >= B[0]) equilibrium[1] = 0;
                else equilibrium[1] = 1;
            } else if (B[3] >= B[2] && B[1] >= B[0]) {
                equilibrium[1] = 0;
            } else if (B[2] >= B[3] && B[0] >= B[1]) {
                equilibrium[1] = 1;
            } else {
                equilibrium[1] = (A[3] - A[1])/(A[0] - A[1] - A[2] + A[3]);
                mixed = true;
            }

            // apply that equilibrium to the original matrices
            const rowDisagree = equilibrium[0]*equilibrium[1]*this.row_matrix[0] + equilibrium[0]*(1-equilibrium[1])*this.row_matrix[1]
                            + (1-equilibrium[0])*equilibrium[1]*this.row_matrix[2] + (1-equilibrium[0])*(1-equilibrium[1])*this.row_matrix[3];
            const colDisagree = equilibrium[0]*equilibrium[1]*this.col_matrix[0] + equilibrium[0]*(1-equilibrium[1])*this.col_matrix[1]
                            + (1-equilibrium[0])*equilibrium[1]*this.col_matrix[2] + (1-equilibrium[0])*(1-equilibrium[1])*this.col_matrix[3];
            this.#threat_point = [rowDisagree,colDisagree];

            // if there are two equally valid threat points, compute the second one
            if (!mixed && (A[3] <= A[1] || A[2] <= A[0]) && (A[1] <= A[3] || A[0] <= A[2]) && (B[3] <= B[2] || B[1] <= B[0]) && (B[2] <= B[3] || B[0] <= B[1])) {
                let equilibrium2 = [(B[3] - B[2])/(B[0] - B[1] - B[2] + B[3]), (A[3] - A[1])/(A[0] - A[1] - A[2] + A[3])];
                const rowDisagree2 = equilibrium2[0]*equilibrium2[1]*this.row_matrix[0] + equilibrium2[0]*(1-equilibrium2[1])*this.row_matrix[1]
                                + (1-equilibrium2[0])*equilibrium2[1]*this.row_matrix[2] + (1-equilibrium2[0])*(1-equilibrium2[1])*this.row_matrix[3];
                const colDisagree2 = equilibrium2[0]*equilibrium2[1]*this.col_matrix[0] + equilibrium2[0]*(1-equilibrium2[1])*this.col_matrix[1]
                                + (1-equilibrium2[0])*equilibrium2[1]*this.col_matrix[2] + (1-equilibrium2[0])*(1-equilibrium2[1])*this.col_matrix[3];
                if (Math.abs(this.#threat_point[0]-rowDisagree2) > 0.001 && Math.abs(this.#threat_point[1]-colDisagree2) > 0.001)
                    this.#threat_point_2 = [rowDisagree2,colDisagree2];
            }
        }
        return this.#threat_point;
    }

    get threat_point_2() {
        this.threat_point;
        if (this.#threat_point_2 !== undefined) {
            return this.#threat_point_2;
        } else {
            return null;
        }
    }

    get pareto() {
        if (this.#pareto === undefined) {
            let result = [];
            for (let i = 0; i < 4; i++) {
                let pareto = true;
                for (let j = 0; j < 4; j++) {
                    if (this.row_ranks[i] < this.row_ranks[j] && this.col_ranks[i] < this.col_ranks[j]) {
                        pareto = false;
                        break;
                    }
                }
                if (pareto) result.push(i);
            }
            this.#pareto = result;
        }
        return this.#pareto;
    }

    #bargaining(tp) {
        const pareto = this.pareto;
        let return1 = this.row_matrix[pareto[0]];
        let return2 = this.col_matrix[pareto[0]];
        let max = -10000;
        for (let n = 0; n < pareto.length; n++) {
            for (let m = n + 1; m < pareto.length; m++) {
                const i = pareto[n];
                const j = pareto[m];
                const x1 = this.row_matrix[i] - tp[0];
                const x2 = this.row_matrix[j] - tp[0];
                const y1 = this.col_matrix[i] - tp[1];
                const y2 = this.col_matrix[j] - tp[1];
                // maximizing   (x1*t+x2*(1-t))*(y1*t+y2*(1-t))
                // derivative   (x1*t+x2*(1-t))*(y1-y2)+(y1*t+y2*(1-t))*(x1-x2) = 0
                // solve        t*(x1-x2)*(y1-y2)*2+x2*(y1-y2)+y2*(x1-x2) = 0
                //              t = (x2*(y1-y2)+y2*(x1-x2))/((x1-x2)*(y1-y2)*2)
                const t = (y1 == y2 || x1 == x2) ? -1 : -(x2*(y1-y2)+y2*(x1-x2))/((x1-x2)*(y1-y2)*2);
                const value1 = x1*y1;
                const value2 = x2*y2;
                const value3 = (t < 1 && t > 0 && (x1*t+x2*(1-t))>0 && (y1*t+y2*(1-t))>0) ? (x1*t+x2*(1-t))*(y1*t+y2*(1-t)) : -1;
                if (value1 >= max && value1 >= value2 && value1 >= value3 && x1 >= 0 && y1 >= 0) {
                    max = value1;
                    return1 = this.row_matrix[i];
                    return2 = this.col_matrix[i];
                } else if (value2 >= max && value2 >= value3 && x2 >= 0 && y2 >= 0) {
                    max = value2;
                    return1 = this.row_matrix[j];
                    return2 = this.col_matrix[j];
                } else if (value3 >= max) {
                    max = value3;
                    return1 = this.row_matrix[i]*t + this.row_matrix[j]*(1-t);
                    return2 = this.col_matrix[i]*t + this.col_matrix[j]*(1-t);
                }
            }
        }
        return [return1,return2];
    }

    #bargaining_trans(tp) {
        let max = this.max_total;
        return [max + (tp[0] - tp[1])/2, max + (tp[1] - tp[0])/2];
    }

    get row_ntu_bs_return() {
        if (this.#row_ntu_bs_return === undefined) {
            [this.#row_ntu_bs_return,this.#col_ntu_bs_return] = this.#bargaining(this.backstop);
        }
        return this.#row_ntu_bs_return;
    }

    get col_ntu_bs_return() {
        if (this.#col_ntu_bs_return === undefined) {
            [this.#row_ntu_bs_return,this.#col_ntu_bs_return] = this.#bargaining(this.backstop);
        }
        return this.#col_ntu_bs_return;
    }

    get row_ntu_tp_return() {
        if (this.#row_ntu_tp_return === undefined) {
            [this.#row_ntu_tp_return,this.#col_ntu_tp_return] = this.#bargaining(this.threat_point);
            if (this.threat_point_2 != null) {
                [this.#row_ntu_tp_return_2,this.#col_ntu_tp_return_2] = this.#bargaining(this.threat_point_2);
            }
        }
        return this.#row_ntu_tp_return;
    }

    get row_ntu_tp_return_2() {
        this.row_ntu_tp_return;
        if (this.#row_ntu_tp_return_2 !== undefined)
            return this.#row_ntu_tp_return_2;
        else return null;
    }

    get col_ntu_tp_return() {
        if (this.#col_ntu_tp_return === undefined) {
            [this.#row_ntu_tp_return,this.#col_ntu_tp_return] = this.#bargaining(this.threat_point);
            if (this.threat_point_2 != null) {
                [this.#row_ntu_tp_return_2,this.#col_ntu_tp_return_2] = this.#bargaining(this.threat_point_2);
            }
        }
        return this.#col_ntu_tp_return;
    }

    get col_ntu_tp_return_2() {
        this.col_ntu_tp_return;
        if (this.#col_ntu_tp_return_2 !== undefined)
            return this.#col_ntu_tp_return_2;
        else return null;
    }

    get row_tu_bs_return() {
        if (this.#row_tu_bs_return === undefined) {
            [this.#row_tu_bs_return,this.#col_tu_bs_return] = this.#bargaining_trans(this.backstop);
        }
        return this.#row_tu_bs_return;
    }

    get col_tu_bs_return() {
        if (this.#col_tu_bs_return === undefined) {
            [this.#row_tu_bs_return,this.#col_tu_bs_return] = this.#bargaining_trans(this.backstop);
        }
        return this.#col_tu_bs_return;
    }

    get row_tu_tp_return() {
        if (this.#row_tu_tp_return === undefined) {
            [this.#row_tu_tp_return,this.#col_tu_tp_return] = this.#bargaining_trans(this.threat_point);
        }
        return this.#row_tu_tp_return;
    }

    get col_tu_tp_return() {
        if (this.#col_tu_tp_return === undefined) {
            [this.#row_tu_tp_return,this.#col_tu_tp_return] = this.#bargaining_trans(this.threat_point);
        }
        return this.#col_tu_tp_return;
    }

    // get balanced1() {
    //     if (this.#balanced1 === undefined) {
    //         let y1 = Math.floor(this.#x1/2)*2;
    //         let z1 = this.#x1 % 2;
    //         let s1 = (z1 < 1) ? z1/(2-z1) : (3*z1-2)/z1;
    //         let y2 = Math.floor(this.#x2/2)*2;
    //         let z2 = this.#x2 % 2;
    //         let s2 = (z2 < 1) ? z2/(2-z2) : (3*z2-2)/z2;
    //         this.#balanced1 = y1+s1;
    //         this.#balanced2 = y2+s2;
    //     }
    //     return this.#balanced1;
    // }

    // set balanced1(val) {
    //     if (this.#balanced1 != val) {
    //         let y1 = Math.floor(val/2)*2;
    //         let z1 = val % 2;
    //         let s1 = (z1 < 1) ? (z1-1)/(z1+1) + 1 : (z1-1)/(3-z1) + 1;
    //         this.#x1 = y1+s1;
    //         this.#b1 = 3*Math.abs(z1-1);
    //     }
    // }

    // get balanced2() {
    //     if (this.#balanced2 === undefined) {
    //         let y1 = Math.floor(this.#x1/2)*2;
    //         let z1 = this.#x1 % 2;
    //         let s1 = (z1 < 1) ? z1/(2-z1) : (3*z1-2)/z1;
    //         let y2 = Math.floor(this.#x2/2)*2;
    //         let z2 = this.#x2 % 2;
    //         let s2 = (z2 < 1) ? z2/(2-z2) : (3*z2-2)/z2;
    //         this.#balanced1 = y1+s1;
    //         this.#balanced2 = y2+s2;
    //     }
    //     return this.#balanced2;
    // }

    // set balanced2(val) {
    //     if (this.#balanced1 != val) {
    //         let y2 = Math.floor(val/2)*2;
    //         let z2 = val % 2;
    //         let s2 = (z2 < 1) ? (z2-1)/(z2+1) + 1 : (z2-1)/(3-z2) + 1;
    //         this.#x2 = y2+s2;
    //         this.#b2 = 3*Math.abs(z2-1);
    //     }
    // }
    
    // static balanced(x1,x2,q) {
    //     let y1 = Math.floor(x1/2)*2;
    //     let z1 = x1 % 2;
    //     let s1 = (z1 < 1) ? (z1-1)/(z1+1) + 1 : (z1-1)/(3-z1) + 1;
    //     let y2 = Math.floor(x2/2)*2;
    //     let z2 = x2 % 2;
    //     let s2 = (z2 < 1) ? (z2-1)/(z2+1) + 1 : (z2-1)/(3-z2) + 1;
    //     return Game.xb(y1+s1,y2+s2,3*Math.abs(z1-1),3*Math.abs(z2-1),q);
    // }

    to_balanced() {
        const sorted_row_matrix = this.row_matrix.toSorted();
        const sorted_col_matrix = this.col_matrix.toSorted();
        this.b1 = 6*sorted_row_matrix[1]/sorted_row_matrix[2]/(1+sorted_row_matrix[1]/sorted_row_matrix[2]);
        this.b2 = 6*sorted_col_matrix[1]/sorted_col_matrix[2]/(1+sorted_col_matrix[1]/sorted_col_matrix[2]);
    }

    #xb_to_rhombic(x,b,good_quadrant) {
        function rotate([y1,y2]) {
            return [(-y1 + Math.sqrt(3)*y2) / 2, (-Math.sqrt(3)*y1 - y2) / 2];
        }
        let y1 = -(x % 2 - 1) * (6-b)/6;
        let y2 = -1/Math.sqrt(3) * (6-b)/6;
        if (x >= 2 && x != 6) [y1,y2] = rotate([y1,y2]);
        if (x >= 4 && x != 6) [y1,y2] = rotate([y1,y2]);
        if (good_quadrant) {
            y1 = -y1;
            y2 = -y2 + 2/Math.sqrt(3);
        } else {
            y1 -= 1;
            y2 += 1/Math.sqrt(3);
        }

        return [y1,y2];
    }

    get rhombic_x1() {
        const q = this.#quadrant;
        if (this.#rhombic_x1 === undefined) {
            let rhombic = this.#xb_to_rhombic((this.#x1*this.#flip1 - this.#offset1 + 12) % 6, this.#b1, q == 1 || q == 2);
            this.#rhombic_x1 = rhombic[0];
            this.#rhombic_y1 = rhombic[1];
        }
        return this.#rhombic_x1;
    }

    get rhombic_y1() {
        const q = this.#quadrant;
        if (this.#rhombic_y1 === undefined) {
            let rhombic = this.#xb_to_rhombic((this.#x1*this.#flip1 - this.#offset1 + 12) % 6, this.#b1, q == 1 || q == 2);
            this.#rhombic_x1 = rhombic[0];
            this.#rhombic_y1 = rhombic[1];
        }
        return this.#rhombic_y1;
    }

    get rhombic_x2() {
        const q = this.#quadrant;
        if (this.#rhombic_x2 === undefined) {
            let rhombic = this.#xb_to_rhombic((this.#x2*this.#flip2 - this.#offset2 + 12) % 6, this.#b2, q == 1 || q == 4);
            this.#rhombic_x2 = -rhombic[0];
            this.#rhombic_y2 = rhombic[1];
        }
        return this.#rhombic_x2;
    }

    get rhombic_y2() {
        const q = this.#quadrant;
        if (this.#rhombic_y2 === undefined) {
            let rhombic = this.#xb_to_rhombic((this.#x2*this.#flip2 - this.#offset2 + 12) % 6, this.#b2, q == 1 || q == 4);
            this.#rhombic_x2 = -rhombic[0];
            this.#rhombic_y2 = rhombic[1];
        }
        return this.#rhombic_y2;
    }

    birhombic(y1,y2,z1,z2) {
        function rhombic_to_xb(y1,y2) {
            let hemisphere;
            const sqrt3 = Math.sqrt(3);
            function rotate([y1,y2]) {
                return [(-y1 + sqrt3*y2) / 2, (-sqrt3*y1 - y2) / 2];
            }
            const margin = 0.2;
            if (y2 < -sqrt3*y1 && y2 < sqrt3*(y1+2) + margin && y2 > -margin) {
                y1 += 1;
                y2 -= 1/sqrt3;
                hemisphere = true;
            } else if (y2 > -sqrt3*y1 && y2 > sqrt3*y1 - margin && y2 < sqrt3 + margin) {
                y1 = -y1;
                y2 = -y2 + 2/sqrt3;
                hemisphere = false;
            } else {
                return null;
            }
            let x = 0;
            y1 = -y1;
            for (let i = 0; i < 3 && (y2 > -y1/sqrt3 || y2 > y1/sqrt3); i++) {
                [y1,y2] = rotate([y1,y2]);
                x = (x + 2) % 6;
            }
            let b = (y2*sqrt3 + 1)*6;
            x += y1/(1 - b/6) + 1;
            if (x > 6) x = 6;
            else if (x < 0) x = 0;
            if (b > 6) b = 6;
            else if (b < 0) b = 0;
            return [x,b,hemisphere];
        }
        let rhombic1 = rhombic_to_xb(y1,y2);
        let rhombic2 = rhombic_to_xb(-z1,z2);
        if (rhombic1 == null || rhombic2 == null) return null;
        let quad;
        if (rhombic1[2] && rhombic2[2]) {
            quad = 3;
        } else if (rhombic1[2] && !rhombic2[2]) {
            quad = 4;
        } else if (!rhombic1[2] && rhombic2[2]) {
            quad = 2;
        } else {
            quad = 1;
        }
        this.x1 = ((rhombic1[0] + this.#offset1)*this.#flip1 + 6) % 6;
        this.x2 = ((rhombic2[0] + this.#offset2)*this.#flip2 + 6) % 6;
        this.b1 = rhombic1[1];
        this.b2 = rhombic2[1];
        this.quadrant = quad;
        return this;
    }

    get correlation() {
        if (this.#correlation === undefined) {
            const A = [this.row_matrix[0]+this.col_matrix[0], this.row_matrix[1]+this.col_matrix[1], this.row_matrix[2]+this.col_matrix[2], this.row_matrix[3]+this.col_matrix[3]];
            const B = [this.col_matrix[0]-this.row_matrix[0], this.col_matrix[1]-this.row_matrix[1], this.col_matrix[2]-this.row_matrix[2], this.col_matrix[3]-this.row_matrix[3]];
            const mean1 = (A[0]+A[1]+A[2]+A[3])/4; // max 9
            const mean2 = (B[0]+B[1]+B[2]+B[3])/4; // max 6
            const sq = a => a*a;
            const norm1 = sq(A[0]-mean1) + sq(A[1]-mean1) + sq(A[2]-mean1) + sq(A[3]-mean1);
            const norm2 = sq(B[0]-mean2) + sq(B[1]-mean2) + sq(B[2]-mean2) + sq(B[3]-mean2);
            this.#correlation = (norm1 / (norm1 + norm2));
        }
        return this.#correlation;
    }

    get centroidal_matrices() {
        return [this.row_ranks.map(x => 2*x), this.col_ranks.map(x => 2*x)];
    }

    to_centroid() {
        if (this.mode == 0) {
            this.x1 = Math.round(this.x1+0.5)-0.5;
            this.x2 = Math.round(this.x2+0.5)-0.5;
            this.b1 = 2;
            this.b2 = 2;
        } else {
            this.y1 = Math.round(this.y1+0.5)-0.5;
            this.y2 = Math.round(this.y2+0.5)-0.5;
            this.t1 = this.zone_row == 0 ? 2 : 4;
            this.t2 = this.zone_col == 0 ? 2 : 4;
        }
    }

    get offset1() {
        return this.#offset1;
    }
    get offset2() {
        return this.#offset2;
    }
    get offset() {
        return this.#offset1;
    }
    get flip() {
        return this.#flip1;
    }
    set offset(val) {
        this.#offset1 = val;
        this.#offset2 = val;
    }
    set flip(val) {
        this.#flip1 = val;
        this.#flip2 = val;
    }

    set conventions([offset, flip]) {
        this.coord_1 = ((this.coord_1*this.#flip1 + offset - this.offset1)*flip + 12) % 6;
        this.coord_2 = ((this.coord_2*this.#flip1 + offset - this.offset2)*flip + 12) % 6;
        this.#offset1 = offset;
        this.#offset2 = offset;
        this.#flip1 = flip;
        this.#flip2 = flip;
        return this;
    }

    get conventions() {
        return [this.#offset1, this.#flip1];
    }

    use_conventions(x1,x2,b1,b2,q) {
        const new_game = new Game();
        new_game.offset = this.offset;
        new_game.flip = this.flip;
        if (this.mode == 0) {
            new_game.x1 = x1;
            new_game.x2 = x2;
            new_game.b1 = b1;
            new_game.b2 = b2;
            new_game.quadrant = q;
            new_game.mode = 0;
        } else {
            new_game.zone = this.zone;
            new_game.y1 = x1;
            new_game.y2 = x2;
            new_game.t1 = b1;
            new_game.t2 = b2;
            new_game.quad_temp = q;
            new_game.mode = 1;
        }
        return new_game;
    }

    qOverBlue(p1) {
        let x = 0;
        if (p1) {
            x = (this.x1*this.#flip1 - this.#offset1 + 12) % 6;
        }
        else {
            x = (14 - this.x2*this.#flip2 + this.#offset2) % 6;
        }
        if (0 < x && x < 2 || x == 0 && p1 && this.#flip1 == 1 || x == 0 && !p1 && this.#flip1 == -1 || x == 2 && !p1 && this.#flip1 == 1 || x == 2 && p1 && this.#flip1 == -1) {
            switch (this.quadrant) {
                case 1:
                    return 3;
                case 2:
                    return 4;
                case 3:
                    return 1;
                case 4:
                    return 2;
            }
        } else if (2 < x && x < 4 || x == 2 && p1 && this.#flip1 == 1 || x == 2 && !p1 && this.#flip1 == -1 || x == 4 && !p1 && this.#flip1 == 1 || x == 4 && p1 && this.#flip1 == -1) {
            switch (this.quadrant) {
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
            switch (this.quadrant) {
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

    crossBlue(p1) {
        if (p1) {
            const matrix = [...this.row_matrix];
            const a = this.row_ranks.indexOf(2);
            const b = this.row_ranks.indexOf(3);
            matrix[a] = this.row_matrix[b];
            matrix[b] = this.row_matrix[a];
            this.row_matrix = matrix;
        } else {
            const matrix = [...this.col_matrix];
            const a = this.col_ranks.indexOf(2);
            const b = this.col_ranks.indexOf(3);
            matrix[a] = this.col_matrix[b];
            matrix[b] = this.col_matrix[a];
            this.col_matrix = matrix;
        }
    }

    acrossBlue(p1) {
        let x1 = this.x1;
        let x2 = this.x2;
        if (p1) {
            let redLine = Math.round((this.x1+1)/2)*2-1;
            x1 = (redLine - (this.x1 - redLine) + 6) % 6;
        } else {
            let redLine = Math.round((this.x2+1)/2)*2-1;
            x2 = (redLine - (this.x2 - redLine) + 6) % 6;
        }
        return game.use_conventions(x1,x2,this.b1,this.b2,this.qOverBlue(p1));
    }

    crossGreen(p1) {
        if (p1) {
            const matrix = [...this.row_matrix];
            const a = this.row_ranks.indexOf(1);
            const b = this.row_ranks.indexOf(2);
            matrix[a] = this.row_matrix[b];
            matrix[b] = this.row_matrix[a];
            this.row_matrix = matrix;
        } else {
            const matrix = [...this.col_matrix];
            const a = this.col_ranks.indexOf(1);
            const b = this.col_ranks.indexOf(2);
            matrix[a] = this.col_matrix[b];
            matrix[b] = this.col_matrix[a];
            this.col_matrix = matrix;
        }
    }

    crossRed(p1) {
        if (p1) {
            const matrix = [...this.row_matrix];
            const a = this.row_ranks.indexOf(0);
            const b = this.row_ranks.indexOf(1);
            matrix[a] = this.row_matrix[b];
            matrix[b] = this.row_matrix[a];
            this.row_matrix = matrix;
        } else {
            const matrix = [...this.col_matrix];
            const a = this.col_ranks.indexOf(0);
            const b = this.col_ranks.indexOf(1);
            matrix[a] = this.col_matrix[b];
            matrix[b] = this.col_matrix[a];
            this.col_matrix = matrix;
        }
    }

    crossTan(p1) {
        if (p1) {
            const matrix = [...this.row_matrix];
            const a = this.row_ranks.indexOf(1);
            const b = this.row_ranks.indexOf(2);
            matrix[a] = 6-this.row_matrix[b];
            matrix[b] = 6-this.row_matrix[a];
            this.row_matrix = matrix;
        } else {
            const matrix = [...this.col_matrix];
            const a = this.col_ranks.indexOf(1);
            const b = this.col_ranks.indexOf(2);
            matrix[a] = 6-this.col_matrix[b];
            matrix[b] = 6-this.col_matrix[a];
            this.col_matrix = matrix;
        }
    }

    get equilibrium_color() {
        const greenBackground = [217, 255, 217];
        const ceruleanBackground = [196, 224, 235];
        const goldBackground = [255, 243, 208];
        const grayBackground = [208, 208, 208];
        switch (this.quadrant) {
            case 1:
                if ((this.x1*this.#flip1 - this.#offset1 + 12) % 6 < 3 && (this.x2*this.#flip2 - this.#offset2 + 12) % 6 < 3) {
                    const weight = (Math.sin((this.x1 - this.x2)*6)+1)/2;
                    return [greenBackground[0]*weight+(1-weight)*grayBackground[0],
                            greenBackground[1]*weight+(1-weight)*grayBackground[1],
                            greenBackground[2]*weight+(1-weight)*grayBackground[2]];
                } else {
                    return greenBackground;
                }
                break;
            case 2:
                if ((this.x1*this.#flip1 - this.#offset1 + 12) % 6 < 3 && (this.x2*this.#flip2 - this.#offset2 + 12) % 6 < 3) {
                    return [255,255,255];
                } else if ((this.x2*this.#flip2 - this.#offset2 + 12) % 6 < 3) {
                    return grayBackground;
                } else {
                    return goldBackground;
                }
                break;
            case 3:
                if ((this.x1*this.#flip1 - this.#offset1 + 12) % 6 >= 3 && (this.x2*this.#flip2 - this.#offset2 + 12) % 6 >= 3) {
                    return grayBackground;
                } else if ((this.x1*this.#flip1 - this.#offset1 + 12) % 6 >= 3) {
                    return goldBackground;
                } else if ((this.x2*this.#flip2 - this.#offset2 + 12) % 6 >= 3) {
                    return ceruleanBackground;
                } else {
                    const weight = (Math.sin((this.x1 + this.x2)*6)+1)/2;
                    return [goldBackground[0]*weight+(1-weight)*ceruleanBackground[0],
                            goldBackground[1]*weight+(1-weight)*ceruleanBackground[1],
                            goldBackground[2]*weight+(1-weight)*ceruleanBackground[2]];
                }
                break;
            case 4:
                if ((this.x1*this.#flip1 - this.#offset1 + 12) % 6 < 3 && (this.x2*this.#flip2 - this.#offset2 + 12) % 6 < 3) {
                    return [255,255,255];
                } else if ((this.x1*this.#flip1 - this.#offset1 + 12) % 6 < 3) {
                    return grayBackground;
                } else {
                    return ceruleanBackground;
                }
                break;
        }
    }

    get quadrant_color() {
        const greenBackground = [217, 255, 217];
        const ceruleanBackground = [196, 224, 235];
        const goldBackground = [255, 243, 208];
        const grayBackground = [208, 208, 208];
        const max1 = this.row_ranks.indexOf(3);
        const max2 = this.col_ranks.indexOf(3);
        if (max1 == max2) return greenBackground;
        else if (max1 == 0 && max2 == 2 || max1 == 2 && max2 == 0 || max1 == 1 && max2 == 3 || max1 == 3 && max2 == 1) return goldBackground;
        else if (max1 == 0 && max2 == 1 || max1 == 1 && max2 == 0 || max1 == 2 && max2 == 3 || max1 == 3 && max2 == 2) return ceruleanBackground;
        else return grayBackground;
    }
}

let game = Game.xb(0.5,0.5,2,2,3);

init();
setInterval('update()', 50);

function init() {
    set_coords();
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
    const blueLine3 = document.getElementById("blue-line-3");
    const blueLine4 = document.getElementById("blue-line-4");
    const blueCorner1 = document.getElementById("blue-corner-1");
    const blueCorner2 = document.getElementById("blue-corner-2");
    const blueCorner3 = document.getElementById("blue-corner-3");
    const blueCorner4 = document.getElementById("blue-corner-4");
    const blueCorner5 = document.getElementById("blue-corner-5");
    const redSemicircle = document.getElementById("red-semicircle");
    const blueSemicircle = document.getElementById("blue-semicircle");
    blueLine1.style.stroke = "black";
    blueLine2.style.stroke = "black";
    blueLine3.style.stroke = "black";
    blueLine4.style.stroke = "black";
    blueCorner1.style.fill = "blue";
    blueCorner2.style.fill = "blue";
    blueCorner3.style.fill = "blue";
    blueCorner4.style.fill = "red";
    blueCorner5.style.fill = "red";
    redSemicircle.style.fill = "red";
    blueSemicircle.style.fill = "blue";
    blueCorner2.style.display = "none";
    blueCorner3.style.display = "none";
    blueCorner4.style.display = "none";
    blueCorner5.style.display = "none";
    redSemicircle.style.display = "none";
    blueSemicircle.style.display = "none";

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

    // const stop1 = document.getElementById("stop1");
    // const stop2 = document.getElementById("stop2");
    // const stop3 = document.getElementById("stop3");
    // const stop4 = document.getElementById("stop4");
    // const stop5 = document.getElementById("stop5");
    // const stop6 = document.getElementById("stop6");
    // stop1.style.stopColor = greenBackground;
    // stop2.style.stopColor = grayBackground;
    // stop3.style.stopColor = greenBackground;
    // stop4.style.stopColor = ceruleanBackground;
    // stop5.style.stopColor = goldBackground;
    // stop6.style.stopColor = ceruleanBackground;

    // const region1 = document.getElementById("region1");
    // const region2a = document.getElementById("region2a");
    // const region2b = document.getElementById("region2b");
    // const region3a = document.getElementById("region3a");
    // const region3b = document.getElementById("region3b");
    // const region4 = document.getElementById("region4");
    // region1.style.fill = grayBackground;
    // region2a.style.fill = ceruleanBackground;
    // region2b.style.fill = ceruleanBackground;
    // region3a.style.fill = goldBackground;
    // region3b.style.fill = goldBackground;
    // region4.style.fill = "url('#gradient2')";

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

    const acc = 0.02;
    document.addEventListener('keydown', (e) => {
        // e.preventDefault();
        if (!e.shiftKey) {
            switch (e.key) {
                case "ArrowRight":
                    e.preventDefault();
                    x1up = true;
                    break;
                case "ArrowLeft":
                    e.preventDefault();
                    x1down = true;
                    break;
                case "ArrowUp":
                    e.preventDefault();
                    x2up = true;
                    break;
                case "ArrowDown":
                    e.preventDefault();
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
                    e.preventDefault();
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
                    game.to_centroid();
                    backgroundOutOfDate = true;
                    break;
                case "e":
                    exportPNG();
                    break;
            }
        } else {
            switch (e.key) {
                case "ArrowRight":
                    e.preventDefault();
                    if (x1V < 0.3) x1V += acc;
                    break;
                case "ArrowLeft":
                    e.preventDefault();
                    if (-x1V < 0.3) x1V -= acc;
                    break;
                case "ArrowUp":
                    e.preventDefault();
                    if (x2V < 0.3) x2V += acc;
                    break;
                case "ArrowDown":
                    e.preventDefault();
                    if (-x2V < 0.3) x2V -= acc;
                    break;
                case "D":
                    if (-b1V < 0.3) b1V -= acc;
                    break;
                case "A":
                    if (b1V < 0.3) b1V += acc;
                    break;
                case "W":
                    if (-b2V < 0.3) b2V -= acc;
                    break;
                case "S":
                    if (b2V < 0.3) b2V += acc;
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
                if (viewMode != 0 && viewMode != 11) updateCanvas();
                break;
            case "d":
                b1down = false;
                if (viewMode != 0 && viewMode != 11) updateCanvas();
                break;
            case "w":
                b2up = false;
                if (viewMode != 0 && viewMode != 11) updateCanvas();
                break;
            case "s":
                b2down = false;
                if (viewMode != 0 && viewMode != 11) updateCanvas();
                break;
        }
    });

    // const bigPicQuad1 = document.getElementById("quad1");
    // const bigPicQuad2 = document.getElementById("quad2");
    // const bigPicQuad3 = document.getElementById("quad3");
    // const bigPicQuad4 = document.getElementById("quad4");
    // const bigPicQuad1a = document.getElementById("q1a");
    // const bigPicQuad2a = document.getElementById("q2a");
    // const bigPicQuad2b = document.getElementById("q2b");
    // const bigPicQuad3a = document.getElementById("q3a");
    // const bigPicQuad3b = document.getElementById("q3b");
    // const bigPicQuad3c = document.getElementById("q3c");
    // const bigPicQuad4a = document.getElementById("q4a");
    // const bigPicQuad4b = document.getElementById("q4b");
    // bigPicQuad1.style.fill = greenBackground;
    // bigPicQuad2.style.fill = goldBackground;
    // bigPicQuad3.style.fill = grayBackground;
    // bigPicQuad4.style.fill = ceruleanBackground;
    // bigPicQuad1a.style.fill = "url('#gradient1')";
    // bigPicQuad2a.style.fill = "white";
    // bigPicQuad2b.style.fill = grayBackground;
    // bigPicQuad3a.style.fill = ceruleanBackground;
    // bigPicQuad3b.style.fill = "url('#gradient2')";
    // bigPicQuad3c.style.fill = goldBackground;
    // bigPicQuad4a.style.fill = grayBackground;
    // bigPicQuad4b.style.fill = "white";

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
            document.getElementById("advanced-settings").style.display = "none";
            document.getElementById(button.id.slice(0,-7)).style.display = "";
        });
    }
    document.getElementById("navigation").style.display = "none";
    document.getElementById("view-modes").style.display = "none";
    document.getElementById("controls").style.display = "none";
    document.getElementById("notable-games").style.display = "none";
    document.getElementById("advanced-settings").style.display = "none";

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
    let times = [];
    let cur_time = performance.now();

    const error = 0.00001;

    if (Math.abs(game.coord_1 - Math.round(game.coord_1*2)/2) < 0.05 && !isMouseDown && !x1up && !x1down && x1V == 0 && !enRoute) {
        game.coord_1 = Math.round(game.coord_1*2)/2;
        updateRequired = true;
    }
    if (Math.abs(game.coord_2 - Math.round(game.coord_2*2)/2) < 0.05 && !isMouseDown && !x2up && !x2down && x2V == 0 && !enRoute) {
        game.coord_2 = Math.round(game.coord_2*2)/2;
        updateRequired = true;
    }
    if (Math.abs(game.coord_3 - Math.round(game.coord_3)) < 0.05 && !b1up && !b1down && b1V == 0 && !enRoute) {
        game.coord_3 = Math.round(game.coord_3);
        updateRequired = true;
    }
    if (Math.abs(game.coord_4 - Math.round(game.coord_4)) < 0.05 && !b2up && !b2down && b2V == 0 && !enRoute) {
        game.coord_4 = Math.round(game.coord_4);
        updateRequired = true;
    }

    const movementSpeed = 0.03;
    if (x1up) {
        game.coord_1 = (game.coord_1 + movementSpeed) % 6;
        updateRequired = true;
    }
    if (x1down) {
        game.coord_1 = (game.coord_1 - movementSpeed + 6) % 6;
        updateRequired = true;
    }
    if (x2up) {
        game.coord_2 = (game.coord_2 + movementSpeed) % 6;
        updateRequired = true;
    }
    if (x2down) {
        game.coord_2 = (game.coord_2 - movementSpeed + 6) % 6;
        updateRequired = true;
    }
    if (b1down) {
        game.coord_3 = game.coord_3 + movementSpeed*2;
        backgroundOutOfDate = true;
        updateRequired = true;
    }
    if (b1up) {
        game.coord_3 = game.coord_3 - movementSpeed*2;
        backgroundOutOfDate = true;
        updateRequired = true;
    }
    if (b2up) {
        game.coord_4 = game.coord_4 + movementSpeed*2;
        backgroundOutOfDate = true;
        updateRequired = true;
    }
    if (b2down) {
        game.coord_4 = game.coord_4 - movementSpeed*2;
        updateRequired = true;
        backgroundOutOfDate = true;
    }

    if (x1V != 0) {
        game.coord_1 = (game.coord_1 + x1V + 6) % 6;
        updateRequired = true;
    }
    if (x2V != 0) {
        game.coord_2 = (game.coord_2 + x2V + 6) % 6;
        updateRequired = true;
    }
    game.coord_3 -= b1V;
    if (b1V != 0) {
        backgroundOutOfDate = true;
        updateRequired = true;
    }
    if (game.coord_3 <= 0 && b1V != 0) {
        crossBlue(true);
        b1V = -b1V;
    } else if (game.coord_3 >= 6 && b1V != 0) {
        b1V = -b1V;
        game.coord_3 = game.coord_3 + b1V;
    }
    game.coord_4 = game.coord_4 - b2V;
    if (b2V != 0) {
        backgroundOutOfDate = true;
        updateRequired = true;
    }
    if (game.coord_4 <= 0 && b2V != 0) {
        crossBlue(false);
        b2V = -b2V;
    } else if (game.coord_4 >= 6 && b2V != 0) {
        b2V = -b2V;
        game.coord_4 = game.coord_4 + b2V;
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
        // game.coord_3 = animTime/animationFrames*destination[2] + (1 - animTime/animationFrames)*startPoint[2];
        // game.coord_4 = animTime/animationFrames*destination[3] + (1 - animTime/animationFrames)*startPoint[3];
        // game.coord_1 = fromNearestRed(startPoint[4], (animTime/animationFrames*destination[0] + (1 - animTime/animationFrames)*startPoint[0])/(6 - game.coord_3));
        // game.coord_2 = fromNearestRed(startPoint[5], (animTime/animationFrames*destination[1] + (1 - animTime/animationFrames)*startPoint[1])/(6 - game.coord_4));
        const ratio = animTime/animationFrames;
        game.matrices = [
            destination[0].map((x,i) => x*ratio + startPoint[0][i]*(1-ratio)),
            destination[1].map((x,i) => x*ratio + startPoint[1][i]*(1-ratio))
        ];
        backgroundOutOfDate = true;
        updateRequired = true;
        if (animTime == animationFrames) {
            enRoute = false;
        }
    }

    // if (useAltSchema) game.to_balanced();

    if (diagramGrid && updateRequired) {
        updateDiagramGrid();
    }

    const a1 = document.getElementById("a1");
    const b1 = document.getElementById("b1");
    const c1 = document.getElementById("c1");
    const d1 = document.getElementById("d1");
    a1.innerHTML = game.row_matrix[0].toFixed(2);
    b1.innerHTML = game.row_matrix[1].toFixed(2);
    c1.innerHTML = game.row_matrix[2].toFixed(2);
    d1.innerHTML = game.row_matrix[3].toFixed(2);
    const a2 = document.getElementById("a2");
    const b2 = document.getElementById("b2");
    const c2 = document.getElementById("c2");
    const d2 = document.getElementById("d2");
    a2.innerHTML = game.col_matrix[0].toFixed(2);
    b2.innerHTML = game.col_matrix[1].toFixed(2);
    c2.innerHTML = game.col_matrix[2].toFixed(2);
    d2.innerHTML = game.col_matrix[3].toFixed(2);

    // update returns data
    const rowX = document.getElementById("x-row");
    const rowB = document.getElementById("b-row");
    const colX = document.getElementById("x-col");
    const colB = document.getElementById("b-col");
    const rowY = document.getElementById("y-row");
    const rowT = document.getElementById("t-row");
    const colY = document.getElementById("y-col");
    const colT = document.getElementById("t-col");
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

    rowX.innerHTML = game.x1.toFixed(1);
    colX.innerHTML = game.x2.toFixed(1);
    
    rowB.innerHTML = game.b1.toFixed(1);
    colB.innerHTML = game.b2.toFixed(1);

    rowY.innerHTML = game.y1.toFixed(1);
    colY.innerHTML = game.y2.toFixed(1);
    
    rowT.innerHTML = game.t1.toFixed(1);
    colT.innerHTML = game.t2.toFixed(1);

    // row's equilibrium return
    if (game.row_equilibrium_return_2 == null) {
        rowReturns.innerHTML = game.row_equilibrium_return.toFixed(1);
        rowReturns.style.color = (color => `rgb(${color[0]}, ${color[1]}, ${color[2]})`)(colorFunction(game.row_equilibrium_return, 1));
    } else {
        rowReturns.innerHTML = "<span style='color:" + (color => `rgb(${color[0]}, ${color[1]}, ${color[2]})`)(colorFunction(game.row_equilibrium_return, 1))
                             + "'>" + game.row_equilibrium_return.toFixed(1) + "</span> / "
                             + "<span style='color:" + (color => `rgb(${color[0]}, ${color[1]}, ${color[2]})`)(colorFunction(game.row_equilibrium_return_2, 1))
                             + "'>" + game.row_equilibrium_return_2.toFixed(1) + "</span>";
        rowReturns.style.color = "black";
    }

    // column's equilibrium return
    if (game.col_equilibrium_return_2 == null) {
        colReturns.innerHTML = game.col_equilibrium_return.toFixed(1);
        colReturns.style.color = (color => `rgb(${color[0]}, ${color[1]}, ${color[2]})`)(colorFunction(game.col_equilibrium_return, 1));
    } else {
        colReturns.innerHTML = "<span style='color:" + (color => `rgb(${color[0]}, ${color[1]}, ${color[2]})`)(colorFunction(game.col_equilibrium_return, 1))
                             + "'>" + game.col_equilibrium_return.toFixed(1) + "</span> / "
                             + "<span style='color:" + (color => `rgb(${color[0]}, ${color[1]}, ${color[2]})`)(colorFunction(game.col_equilibrium_return_2, 1))
                             + "'>" + game.col_equilibrium_return_2.toFixed(1) + "</span>";
        colReturns.style.color = "black";
    }
    // row's backstop bargaining returns w/o transferable utility
    rowReturnsBargaining1.innerHTML = game.row_ntu_bs_return.toFixed(1);
    rowReturnsBargaining1.style.color = (color => `rgb(${color[0]}, ${color[1]}, ${color[2]})`)(colorFunction(game.row_ntu_bs_return, 1));

    // column's backstop bargaining returns w/o transferable utility
    colReturnsBargaining1.innerHTML = game.col_ntu_bs_return.toFixed(1);
    colReturnsBargaining1.style.color = (color => `rgb(${color[0]}, ${color[1]}, ${color[2]})`)(colorFunction(game.col_ntu_bs_return, 1));

    // row's threat point bargaining returns w/o transferable utility
    // rowReturnsBargaining2.innerHTML = game.row_ntu_tp_return.toFixed(1);
    // rowReturnsBargaining2.style.color = (color => `rgb(${color[0]}, ${color[1]}, ${color[2]})`)(colorFunction(game.row_ntu_tp_return, 1));
    if (game.row_ntu_tp_return_2 == null) {
        rowReturnsBargaining2.innerHTML = game.row_ntu_tp_return.toFixed(1);
        rowReturnsBargaining2.style.color = (color => `rgb(${color[0]}, ${color[1]}, ${color[2]})`)(colorFunction(game.row_ntu_tp_return, 1));
    } else {
        rowReturnsBargaining2.innerHTML = "<span style='color:" + (color => `rgb(${color[0]}, ${color[1]}, ${color[2]})`)(colorFunction(game.row_ntu_tp_return, 1))
                                        + "'>" + game.row_ntu_tp_return.toFixed(1) + "</span> / "
                                        + "<span style='color:" + (color => `rgb(${color[0]}, ${color[1]}, ${color[2]})`)(colorFunction(game.row_ntu_tp_return_2, 1))
                                        + "'>" + game.row_ntu_tp_return_2.toFixed(1) + "</span>";
        rowReturnsBargaining2.style.color = "black";
    }

    // column's threat point bargaining returns w/o transferable utility
    // colReturnsBargaining2.innerHTML = game.col_ntu_tp_return.toFixed(1);
    // colReturnsBargaining2.style.color = (color => `rgb(${color[0]}, ${color[1]}, ${color[2]})`)(colorFunction(game.col_ntu_tp_return, 1));
    if (game.row_ntu_tp_return_2 == null) {
        colReturnsBargaining2.innerHTML = game.col_ntu_tp_return.toFixed(1);
        colReturnsBargaining2.style.color = (color => `rgb(${color[0]}, ${color[1]}, ${color[2]})`)(colorFunction(game.col_ntu_tp_return, 1));
    } else {
        colReturnsBargaining2.innerHTML = "<span style='color:" + (color => `rgb(${color[0]}, ${color[1]}, ${color[2]})`)(colorFunction(game.col_ntu_tp_return, 1))
                                        + "'>" + game.col_ntu_tp_return.toFixed(1) + "</span> / "
                                        + "<span style='color:" + (color => `rgb(${color[0]}, ${color[1]}, ${color[2]})`)(colorFunction(game.col_ntu_tp_return_2, 1))
                                        + "'>" + game.col_ntu_tp_return_2.toFixed(1) + "</span>";
        colReturnsBargaining2.style.color = "black";
    }

    // row's backstop bargaining returns w/ transferable utility
    rowReturnsTrans.innerHTML = game.row_tu_bs_return.toFixed(1);
    rowReturnsTrans.style.color = (color => `rgb(${color[0]}, ${color[1]}, ${color[2]})`)(colorFunction(game.row_tu_bs_return, 1));

    // column's backstop bargaining returns w/ transferable utility
    colReturnsTrans.innerHTML = game.col_tu_bs_return.toFixed(1);
    colReturnsTrans.style.color = (color => `rgb(${color[0]}, ${color[1]}, ${color[2]})`)(colorFunction(game.col_tu_bs_return, 1));

    // row's threat point bargaining returns w/ transferable utility
    rowReturnsCoco.innerHTML = game.row_tu_tp_return.toFixed(1);
    rowReturnsCoco.style.color = (color => `rgb(${color[0]}, ${color[1]}, ${color[2]})`)(colorFunction(game.row_tu_tp_return, 1));
    
    // column's threat point bargaining returns w/ transferable utility
    colReturnsCoco.innerHTML = game.col_tu_tp_return.toFixed(1);
    colReturnsCoco.style.color = (color => `rgb(${color[0]}, ${color[1]}, ${color[2]})`)(colorFunction(game.col_tu_tp_return, 1));

    const crossBlue1 = document.getElementById("cross-blue-1");
    const crossBlue2 = document.getElementById("cross-blue-2");
    const crossGreen1 = document.getElementById("cross-green-1");
    const crossGreen2 = document.getElementById("cross-green-2");
    const crossRed1 = document.getElementById("cross-red-1");
    const crossRed2 = document.getElementById("cross-red-2");
    if (take(game.row_matrix,3) - take(game.row_matrix,2) < 0.0001) {
        crossBlue1.style.color = "blue";
    } else {
        crossBlue1.style.color = "black";
    }
    if (take(game.col_matrix,3) - take(game.col_matrix,2) < 0.0001) {
        crossBlue2.style.color = "blue";
    } else {
        crossBlue2.style.color = "black";
    }
    if (take(game.row_matrix,2) - take(game.row_matrix,1) < 0.0001) {
        crossGreen1.style.color = "green";
    } else {
        crossGreen1.style.color = "black";
    }
    if (take(game.col_matrix,2) - take(game.col_matrix,1) < 0.0001) {
        crossGreen2.style.color = "green";
    } else {
        crossGreen2.style.color = "black";
    }
    if (take(game.row_matrix,1) - take(game.row_matrix,0) < 0.0001) {
        crossRed1.style.color = "red";
    } else {
        crossRed1.style.color = "black";
    }
    if (take(game.col_matrix,1) - take(game.col_matrix,0) < 0.0001) {
        crossRed2.style.color = "red";
    } else {
        crossRed2.style.color = "black";
    }

    if (viewModeVolatile) backgroundOutOfDate = true;

    updateDiagram(game);

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
    line1Big.x1.baseVal.value = game.row_matrix[0]*widthBig/6+paddingBig2;
    line1Big.x2.baseVal.value = game.row_matrix[1]*widthBig/6+paddingBig2;
    line2Big.x1.baseVal.value = game.row_matrix[1]*widthBig/6+paddingBig2;
    line2Big.x2.baseVal.value = game.row_matrix[3]*widthBig/6+paddingBig2;
    line3Big.x1.baseVal.value = game.row_matrix[3]*widthBig/6+paddingBig2;
    line3Big.x2.baseVal.value = game.row_matrix[2]*widthBig/6+paddingBig2;
    line4Big.x1.baseVal.value = game.row_matrix[2]*widthBig/6+paddingBig2;
    line4Big.x2.baseVal.value = game.row_matrix[0]*widthBig/6+paddingBig2;
    line5Big.x1.baseVal.value = game.row_matrix[0]*widthBig/6+paddingBig2;
    line5Big.x2.baseVal.value = game.row_matrix[3]*widthBig/6+paddingBig2;
    line6Big.x1.baseVal.value = game.row_matrix[1]*widthBig/6+paddingBig2;
    line6Big.x2.baseVal.value = game.row_matrix[2]*widthBig/6+paddingBig2;

    line1Big.y1.baseVal.value = (1-game.col_matrix[0]/6)*widthBig+paddingBig1;
    line1Big.y2.baseVal.value = (1-game.col_matrix[1]/6)*widthBig+paddingBig1;
    line2Big.y1.baseVal.value = (1-game.col_matrix[1]/6)*widthBig+paddingBig1;
    line2Big.y2.baseVal.value = (1-game.col_matrix[3]/6)*widthBig+paddingBig1;
    line3Big.y1.baseVal.value = (1-game.col_matrix[3]/6)*widthBig+paddingBig1;
    line3Big.y2.baseVal.value = (1-game.col_matrix[2]/6)*widthBig+paddingBig1;
    line4Big.y1.baseVal.value = (1-game.col_matrix[2]/6)*widthBig+paddingBig1;
    line4Big.y2.baseVal.value = (1-game.col_matrix[0]/6)*widthBig+paddingBig1;
    line5Big.y1.baseVal.value = (1-game.col_matrix[0]/6)*widthBig+paddingBig1;
    line5Big.y2.baseVal.value = (1-game.col_matrix[3]/6)*widthBig+paddingBig1;
    line6Big.y1.baseVal.value = (1-game.col_matrix[1]/6)*widthBig+paddingBig1;
    line6Big.y2.baseVal.value = (1-game.col_matrix[2]/6)*widthBig+paddingBig1;

    point1Big.cx.baseVal.value = game.row_matrix[0]*widthBig/6+paddingBig2;
    point1Big.cy.baseVal.value = (1-game.col_matrix[0]/6)*widthBig+paddingBig1;
    number1.setAttribute('x',game.row_matrix[0]*widthBig/6+paddingBig2);
    number1.setAttribute('y',(1-game.col_matrix[0]/6)*widthBig+paddingBig1);
    point2Big.cx.baseVal.value = game.row_matrix[1]*widthBig/6+paddingBig2;
    point2Big.cy.baseVal.value = (1-game.col_matrix[1]/6)*widthBig+paddingBig1;
    number2.setAttribute('x',game.row_matrix[1]*widthBig/6+paddingBig2);
    number2.setAttribute('y',(1-game.col_matrix[1]/6)*widthBig+paddingBig1);
    point3Big.cx.baseVal.value = game.row_matrix[2]*widthBig/6+paddingBig2;
    point3Big.cy.baseVal.value = (1-game.col_matrix[2]/6)*widthBig+paddingBig1;
    number3.setAttribute('x',game.row_matrix[2]*widthBig/6+paddingBig2);
    number3.setAttribute('y',(1-game.col_matrix[2]/6)*widthBig+paddingBig1);
    point4Big.cx.baseVal.value = game.row_matrix[3]*widthBig/6+paddingBig2;
    point4Big.cy.baseVal.value = (1-game.col_matrix[3]/6)*widthBig+paddingBig1;
    number4.setAttribute('x',game.row_matrix[3]*widthBig/6+paddingBig2);
    number4.setAttribute('y',(1-game.col_matrix[3]/6)*widthBig+paddingBig1);

    if (viewMode == 2 || viewMode == 3 || viewMode == 4 || viewMode == 5) {
        if (viewMode == 2) {
            bargainingLine.x2.baseVal.value = game.row_ntu_bs_return*widthBig/6+paddingBig2;
            bargainingLine.y2.baseVal.value = (6-game.col_ntu_bs_return)*widthBig/6+paddingBig1;
        } else if (viewMode == 3) {
            bargainingLine.x2.baseVal.value = game.row_ntu_tp_return*widthBig/6+paddingBig2;
            bargainingLine.y2.baseVal.value = (6-game.col_ntu_tp_return)*widthBig/6+paddingBig1;
        } else if (viewMode == 4) {
            bargainingLine.x2.baseVal.value = game.row_tu_bs_return*widthBig/6+paddingBig2;
            bargainingLine.y2.baseVal.value = (6-game.col_tu_bs_return)*widthBig/6+paddingBig1;
        } else {
            bargainingLine.x2.baseVal.value = game.row_tu_tp_return*widthBig/6+paddingBig2;
            bargainingLine.y2.baseVal.value = (6-game.col_tu_tp_return)*widthBig/6+paddingBig1;
        }
        if (viewMode == 2 || viewMode == 3) {
            disagreementPoint.style.fill = brown;
            bargainingLine.style.stroke = brown;
        } else {
            disagreementPoint.style.fill = lightBrown;
            bargainingLine.style.stroke = lightBrown;
        }
        if (viewMode == 2 || viewMode == 4) {
            disagreementPoint.cx.baseVal.value = game.backstop[0]*widthBig/6+paddingBig2;
            disagreementPoint.cy.baseVal.value = (6-game.backstop[1])*widthBig/6+paddingBig1;
            bargainingLine.x1.baseVal.value = game.backstop[0]*widthBig/6+paddingBig2;
            bargainingLine.y1.baseVal.value = (6-game.backstop[1])*widthBig/6+paddingBig1;            
        } else {
            disagreementPoint.cx.baseVal.value = game.threat_point[0]*widthBig/6+paddingBig2;
            disagreementPoint.cy.baseVal.value = (6-game.threat_point[1])*widthBig/6+paddingBig1;
            bargainingLine.x1.baseVal.value = game.threat_point[0]*widthBig/6+paddingBig2;
            bargainingLine.y1.baseVal.value = (6-game.threat_point[1])*widthBig/6+paddingBig1;
        }
        disagreementPoint.style.fillOpacity = 1;
        bargainingLine.style.strokeOpacity = 1;
    } else {
        disagreementPoint.style.fillOpacity = 0;
        bargainingLine.style.strokeOpacity = 0;
    }

    if (viewMode == 2 || showAllReturns) {
        bargainingPoint1.cx.baseVal.value = game.row_ntu_bs_return*widthBig/6+paddingBig2;
        bargainingPoint1.cy.baseVal.value = (6-game.col_ntu_bs_return)*widthBig/6+paddingBig1;
        bargainingPoint1.style.fillOpacity = 1;
    } else {
        bargainingPoint1.style.fillOpacity = 0;
    }

    if (viewMode == 3 || showAllReturns) {
        bargainingPoint3.x.baseVal.value = game.row_ntu_tp_return*widthBig/6+paddingBig2 - xWidth/2;
        bargainingPoint3.y.baseVal.value = (6-game.col_ntu_tp_return)*widthBig/6+paddingBig1 - xWidth/2;
        bargainingPoint3.style.fillOpacity = 1;
    } else {
        bargainingPoint3.style.fillOpacity = 0;
    }
    
    if (viewMode == 4 || viewMode == 5 || showAllReturns) {
        transUtilBoundary.x2.baseVal.value = (game.row_tu_bs_return+game.col_tu_bs_return)/6*widthBig+paddingBig2*2;
        transUtilBoundary.y1.baseVal.value = widthBig - (game.row_tu_bs_return+game.col_tu_bs_return)/6*widthBig + paddingBig1 - paddingBig2;
        transUtilBoundary.style.strokeOpacity = 0.5;
    } else {
        transUtilBoundary.style.strokeOpacity = 0;
        bargainingPoint2.style.fillOpacity = 0;
        bargainingPoint4.style.fillOpacity = 0;
    }

    if (viewMode == 4 || showAllReturns) {
        bargainingPoint2.style.fillOpacity = 1;
        bargainingPoint2.cx.baseVal.value = game.row_tu_bs_return/6*widthBig+paddingBig2;
        bargainingPoint2.cy.baseVal.value = (1-game.col_tu_bs_return/6)*widthBig+paddingBig1;
    } else {
        bargainingPoint2.style.fillOpacity = 0;
    }

    if (viewMode == 5 || showAllReturns) {
        bargainingPoint4.style.fillOpacity = 1;
        bargainingPoint4.x.baseVal.value = game.row_tu_tp_return/6*widthBig+paddingBig2 - xWidth/2;
        bargainingPoint4.y.baseVal.value = (1-game.col_tu_tp_return/6)*widthBig+paddingBig1 - xWidth/2;
    } else {
        bargainingPoint4.style.fillOpacity = 0;
    }

    const overlap = [1,1,1,1];
    if (Math.abs(game.row_matrix[0] - game.row_matrix[1]) < error && Math.abs(game.col_matrix[0] - game.col_matrix[1]) < error) { overlap[0]++; overlap[1]++; }
    if (Math.abs(game.row_matrix[0] - game.row_matrix[2]) < error && Math.abs(game.col_matrix[0] - game.col_matrix[2]) < error) { overlap[0]++; overlap[2]++; }
    if (Math.abs(game.row_matrix[0] - game.row_matrix[3]) < error && Math.abs(game.col_matrix[0] - game.col_matrix[3]) < error) { overlap[0]++; overlap[3]++; }
    if (Math.abs(game.row_matrix[1] - game.row_matrix[2]) < error && Math.abs(game.col_matrix[1] - game.col_matrix[2]) < error) { overlap[1]++; overlap[2]++; }
    if (Math.abs(game.row_matrix[1] - game.row_matrix[3]) < error && Math.abs(game.col_matrix[1] - game.col_matrix[3]) < error) { overlap[1]++; overlap[3]++; }
    if (Math.abs(game.row_matrix[2] - game.row_matrix[3]) < error && Math.abs(game.col_matrix[2] - game.col_matrix[3]) < error) { overlap[2]++; overlap[3]++; }
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

    corner1Big.cx.baseVal.value = game.row_matrix[0]*widthBig/6+paddingBig2;
    corner1Big.cy.baseVal.value = (1-game.col_matrix[0]/6)*widthBig+paddingBig1;
    corner2Big.cx.baseVal.value = game.row_matrix[1]*widthBig/6+paddingBig2;
    corner2Big.cy.baseVal.value = (1-game.col_matrix[1]/6)*widthBig+paddingBig1;
    corner3Big.cx.baseVal.value = game.row_matrix[2]*widthBig/6+paddingBig2;
    corner3Big.cy.baseVal.value = (1-game.col_matrix[2]/6)*widthBig+paddingBig1;
    corner4Big.cx.baseVal.value = game.row_matrix[3]*widthBig/6+paddingBig2;
    corner4Big.cy.baseVal.value = (1-game.col_matrix[3]/6)*widthBig+paddingBig1;

    // top1.x2.baseVal.value = paddingBig + take(matrixA,1)/6*widthBig;
    // top2.x1.baseVal.value = paddingBig + take(matrixA,1)/6*widthBig;
    // top2.x2.baseVal.value = paddingBig + take(matrixA,2)/6*widthBig;
    // top3.x1.baseVal.value = paddingBig + take(matrixA,2)/6*widthBig;
    // left3.y2.baseVal.value = paddingBig + (1-take(game.col_matrix,2)/6)*widthBig;
    // left2.y1.baseVal.value = paddingBig + (1-take(game.col_matrix,2)/6)*widthBig;
    // left2.y2.baseVal.value = paddingBig + (1-take(game.col_matrix,1)/6)*widthBig;
    // left1.y1.baseVal.value = paddingBig + (1-take(game.col_matrix,1)/6)*widthBig;
    // right3.y2.baseVal.value = paddingBig + (1-take(game.col_matrix,2)/6)*widthBig;
    // right2.y1.baseVal.value = paddingBig + (1-take(game.col_matrix,2)/6)*widthBig;
    // right2.y2.baseVal.value = paddingBig + (1-take(game.col_matrix,1)/6)*widthBig;
    // right1.y1.baseVal.value = paddingBig + (1-take(game.col_matrix,1)/6)*widthBig;
    // bottom1.x2.baseVal.value = paddingBig + take(matrixA,1)/6*widthBig;
    // bottom2.x1.baseVal.value = paddingBig + take(matrixA,1)/6*widthBig;
    // bottom2.x2.baseVal.value = paddingBig + take(matrixA,2)/6*widthBig;
    // bottom3.x1.baseVal.value = paddingBig + take(matrixA,2)/6*widthBig;

    smallLine5.y1.baseVal.value = paddingBig1 + (1-take(game.col_matrix,2)/6)*widthBig;
    smallLine5.y2.baseVal.value = paddingBig1 + (1-take(game.col_matrix,2)/6)*widthBig;
    smallLine6.y1.baseVal.value = paddingBig1 + (1-take(game.col_matrix,1)/6)*widthBig;
    smallLine6.y2.baseVal.value = paddingBig1 + (1-take(game.col_matrix,1)/6)*widthBig;
    smallLine7.x1.baseVal.value = paddingBig2 + take(game.row_matrix,2)/6*widthBig;
    smallLine7.x2.baseVal.value = paddingBig2 + take(game.row_matrix,2)/6*widthBig;
    smallLine8.x1.baseVal.value = paddingBig2 + take(game.row_matrix,1)/6*widthBig;
    smallLine8.x2.baseVal.value = paddingBig2 + take(game.row_matrix,1)/6*widthBig;

    smallRedLine1.x1.baseVal.value = paddingBig2;
    smallRedLine1.x2.baseVal.value = paddingBig2 + take(game.row_matrix,1)/6*widthBig;
    smallRedLine1.y1.baseVal.value = paddingBig1 + widthBig;
    smallRedLine1.y2.baseVal.value = paddingBig1 + widthBig;
    smallGreenLine1.x1.baseVal.value = paddingBig2 + take(game.row_matrix,1)/6*widthBig;
    smallGreenLine1.x2.baseVal.value = paddingBig2 + take(game.row_matrix,2)/6*widthBig;
    smallGreenLine1.y1.baseVal.value = paddingBig1 + widthBig;
    smallGreenLine1.y2.baseVal.value = paddingBig1 + widthBig;
    smallBlueLine1.x1.baseVal.value = paddingBig2 + take(game.row_matrix,2)/6*widthBig;
    smallBlueLine1.x2.baseVal.value = paddingBig2 + widthBig;
    smallBlueLine1.y1.baseVal.value = paddingBig1 + widthBig;
    smallBlueLine1.y2.baseVal.value = paddingBig1 + widthBig;
    smallRedLine2.x1.baseVal.value = paddingBig2;
    smallRedLine2.x2.baseVal.value = paddingBig2;
    smallRedLine2.y1.baseVal.value = paddingBig1 + widthBig;
    smallRedLine2.y2.baseVal.value = paddingBig1 + (1-take(game.col_matrix,1)/6)*widthBig;
    smallGreenLine2.x1.baseVal.value = paddingBig2;
    smallGreenLine2.x2.baseVal.value = paddingBig2;
    smallGreenLine2.y1.baseVal.value = paddingBig1 + (1-take(game.col_matrix,2)/6)*widthBig;
    smallGreenLine2.y2.baseVal.value = paddingBig1 + (1-take(game.col_matrix,1)/6)*widthBig;
    smallBlueLine2.x1.baseVal.value = paddingBig2;
    smallBlueLine2.x2.baseVal.value = paddingBig2;
    smallBlueLine2.y1.baseVal.value = paddingBig1 + (1-take(game.col_matrix,2)/6)*widthBig;
    smallBlueLine2.y2.baseVal.value = paddingBig1;
    smallCorner.cx.baseVal.value = paddingBig2;
    smallCorner.cy.baseVal.value = paddingBig1 + widthBig;

    redBox.x.baseVal.value = paddingBig2;
    redBox.y.baseVal.value = paddingBig1 + (1-take(game.col_matrix,1)/6)*widthBig;
    redBox.width.baseVal.value = take(game.row_matrix,1)/6*widthBig;
    redBox.height.baseVal.value = take(game.col_matrix,1)/6*widthBig;
    greenBox.x.baseVal.value = paddingBig2 + take(game.row_matrix,1)/6*widthBig;
    greenBox.y.baseVal.value = paddingBig1 + (1-take(game.col_matrix,2)/6)*widthBig;
    greenBox.width.baseVal.value = (take(game.row_matrix,2)-take(game.row_matrix,1))/6*widthBig;
    greenBox.height.baseVal.value = (take(game.col_matrix,2)-take(game.col_matrix,1))/6*widthBig;
    blueBox.x.baseVal.value = paddingBig2 + take(game.row_matrix,2)/6*widthBig;
    blueBox.y.baseVal.value = paddingBig1;
    blueBox.width.baseVal.value = (6-take(game.row_matrix,2))/6*widthBig;
    blueBox.height.baseVal.value = (6-take(game.col_matrix,2))/6*widthBig;

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
    const picWidth = fixImageSize ? container.width.baseVal.value - diagramWidth : (container.width.baseVal.value - diagramWidth)*dimensions()[0];
    const picHeight = fixImageSize ? container.height.baseVal.value - diagramWidth : (container.height.baseVal.value - diagramWidth)*dimensions()[1];
    const rowMax = Math.max(...game.row_matrix) - error;
    const colMax = Math.max(...game.col_matrix) - error;
    const picPadding1 = (container.width.baseVal.value-picWidth)/2;
    const picPadding2 = (container.height.baseVal.value-picHeight)/2;

    if (game.row_matrix[0] - game.row_matrix[2] >= -error && game.col_matrix[0] - game.col_matrix[1] >= -error) {
        if (game.row_matrix[0] >= rowMax && game.col_matrix[0] >= colMax)
            point1Big.style = "fill:" + lightGreen;
        else if (game.row_matrix[0] >= rowMax)
            point1Big.style = "fill:" + gold;
        else if (game.col_matrix[0] >= colMax)
            point1Big.style = "fill:" + cerulean;
        else
            point1Big.style = "fill:" + bad;
        point1Big.style.r = eqRadiiBig*widthBig;
    } else {
        point1Big.style.opacity = 0;
    }
    
    if (game.row_matrix[1] - game.row_matrix[3] >= -error && game.col_matrix[1] - game.col_matrix[0] >= -error) {
        if (game.row_matrix[1] >= rowMax && game.col_matrix[1] >= colMax)
            point2Big.style = "fill:" + lightGreen;
        else if (game.row_matrix[1] >= rowMax)
            point2Big.style = "fill:" + gold;
        else if (game.col_matrix[1] >= colMax)
            point2Big.style = "fill:" + cerulean;
        else
            point2Big.style = "fill:" + bad;
        point2Big.style.r = eqRadiiBig*widthBig;
    } else {
        point2Big.style.opacity = 0;
    }

    if (game.row_matrix[2] - game.row_matrix[0] >= -error && game.col_matrix[2] - game.col_matrix[3] >= -error) {
        if (game.row_matrix[2] >= rowMax && game.col_matrix[2] >= colMax)
            point3Big.style = "fill:" + lightGreen;
        else if (game.row_matrix[2] >= rowMax)
            point3Big.style = "fill:" + gold;
        else if (game.col_matrix[2] >= colMax)
            point3Big.style = "fill:" + cerulean;
        else
            point3Big.style = "fill:" + bad;
        point3Big.style.r = eqRadiiBig*widthBig;
    } else {
        point3Big.style.opacity = 0;
    }

    if (game.row_matrix[3] - game.row_matrix[1] >= -error && game.col_matrix[3] - game.col_matrix[2] >= -error) {
        if (game.row_matrix[3] >= rowMax && game.col_matrix[3] >= colMax)
            point4Big.style = "fill:" + lightGreen;
        else if (game.row_matrix[3] >= rowMax)
            point4Big.style = "fill:" + gold;
        else if (game.col_matrix[3] >= colMax)
            point4Big.style = "fill:" + cerulean;
        else
            point4Big.style = "fill:" + bad;
        point4Big.style.r = eqRadiiBig*widthBig;
    } else {
        point4Big.style.opacity = 0;
    }
    if (game.row_mixed_return != null) {
        const mixedRow = game.row_mixed_return;
        const mixedCol = game.col_mixed_return;
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
        if (dimensions()[0] == 0 && dimensions()[1] == 0) {
            wholeFigure.style.display = "none";
            edgeFigure.style.display = "none";
        } else if (dimensions()[1] == 0) {
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
        } else if (dimensions()[0] == 0) {
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

    // const region1 = document.getElementById("region1");
    // const region2a = document.getElementById("region2a");
    // const region2b = document.getElementById("region2b");
    // const region3a = document.getElementById("region3a");
    // const region3b = document.getElementById("region3b");
    // const region4 = document.getElementById("region4");
    // region1.x.baseVal.value = picPadding1;
    // region1.y.baseVal.value = picPadding2;
    // region1.width.baseVal.value = picWidth;
    // region1.height.baseVal.value = picHeight;
    // region2a.x.baseVal.value = picPadding1+picWidth/3;
    // region2a.y.baseVal.value = picPadding2;
    // region2a.width.baseVal.value = picWidth/2;
    // region2a.height.baseVal.value = picHeight/6;
    // region2b.x.baseVal.value = picPadding1+picWidth/3;
    // region2b.y.baseVal.value = picPadding2+picHeight*2/3;
    // region2b.width.baseVal.value = picWidth/2;
    // region2b.height.baseVal.value = picHeight/3;
    // region3a.x.baseVal.value = picPadding1+picWidth*5/6;
    // region3a.y.baseVal.value = picPadding2+picHeight/6;
    // region3a.width.baseVal.value = picWidth/6;
    // region3a.height.baseVal.value = picHeight/2;
    // region3b.x.baseVal.value = picPadding1;
    // region3b.y.baseVal.value = picPadding2+picHeight/6;
    // region3b.width.baseVal.value = picWidth/3;
    // region3b.height.baseVal.value = picHeight/2;
    // region4.x.baseVal.value = picPadding1+picWidth/3;
    // region4.y.baseVal.value = picPadding2+picHeight/6;
    // region4.width.baseVal.value = picWidth/2;
    // region4.height.baseVal.value = picHeight/2;

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

    function adjust_x(x) { // adjusts the x-coordinate according to the current conventions
        return ((x+game.conventions[0])*game.conventions[1]+12) % 6;
    }

    function adjust_y(y) { // adjusts the y-coordinate according to the current conventions
        return ((y-game.conventions[0])*game.conventions[1]+12) % 6;
    }

    if (dimensions()[0] == 1 && !hiddenLines && !useAltSchema) {
        boundaryLine1.x1.baseVal.value = picWidth*adjust_x(1)/6+picPadding1;
        boundaryLine1.y1.baseVal.value = picHeight*adjust_y(0.5)/6+picPadding2;
        boundaryLine1.x2.baseVal.value = picWidth*adjust_x(1)/6+picPadding1;
        boundaryLine1.y2.baseVal.value = picHeight*adjust_y(1.5)/6+picPadding2;
        boundaryLine2.x1.baseVal.value = picWidth*adjust_x(3)/6+picPadding1;
        boundaryLine2.y1.baseVal.value = picHeight*adjust_y(0.5)/6+picPadding2;
        boundaryLine2.x2.baseVal.value = picWidth*adjust_x(3)/6+picPadding1;
        boundaryLine2.y2.baseVal.value = picHeight*adjust_y(1.5)/6+picPadding2;
        boundaryLine3.x1.baseVal.value = picWidth*adjust_x(5)/6+picPadding1;
        boundaryLine3.y1.baseVal.value = picHeight*adjust_y(0.5)/6+picPadding2;
        boundaryLine3.x2.baseVal.value = picWidth*adjust_x(5)/6+picPadding1;
        boundaryLine3.y2.baseVal.value = picHeight*adjust_y(1.5)/6+picPadding2;
        boundaryLine4.x1.baseVal.value = picWidth*adjust_x(1)/6+picPadding1;
        boundaryLine4.y1.baseVal.value = picHeight*adjust_y(2.5)/6+picPadding2;
        boundaryLine4.x2.baseVal.value = picWidth*adjust_x(1)/6+picPadding1;
        boundaryLine4.y2.baseVal.value = picHeight*adjust_y(3.5)/6+picPadding2;
        boundaryLine5.x1.baseVal.value = picWidth*adjust_x(3)/6+picPadding1;
        boundaryLine5.y1.baseVal.value = picHeight*adjust_y(2.5)/6+picPadding2;
        boundaryLine5.x2.baseVal.value = picWidth*adjust_x(3)/6+picPadding1;
        boundaryLine5.y2.baseVal.value = picHeight*adjust_y(3.5)/6+picPadding2;
        boundaryLine6.x1.baseVal.value = picWidth*adjust_x(5)/6+picPadding1;
        boundaryLine6.y1.baseVal.value = picHeight*adjust_y(2.5)/6+picPadding2;
        boundaryLine6.x2.baseVal.value = picWidth*adjust_x(5)/6+picPadding1;
        boundaryLine6.y2.baseVal.value = picHeight*adjust_y(3.5)/6+picPadding2;
        boundaryLine7.x1.baseVal.value = picWidth*adjust_x(1)/6+picPadding1;
        boundaryLine7.y1.baseVal.value = picHeight*adjust_y(4.5)/6+picPadding2;
        boundaryLine7.x2.baseVal.value = picWidth*adjust_x(1)/6+picPadding1;
        boundaryLine7.y2.baseVal.value = picHeight*adjust_y(5.5)/6+picPadding2;
        boundaryLine8.x1.baseVal.value = picWidth*adjust_x(3)/6+picPadding1;
        boundaryLine8.y1.baseVal.value = picHeight*adjust_y(4.5)/6+picPadding2;
        boundaryLine8.x2.baseVal.value = picWidth*adjust_x(3)/6+picPadding1;
        boundaryLine8.y2.baseVal.value = picHeight*adjust_y(5.5)/6+picPadding2;
        boundaryLine9.x1.baseVal.value = picWidth*adjust_x(5)/6+picPadding1;
        boundaryLine9.y1.baseVal.value = picHeight*adjust_y(4.5)/6+picPadding2;
        boundaryLine9.x2.baseVal.value = picWidth*adjust_x(5)/6+picPadding1;
        boundaryLine9.y2.baseVal.value = picHeight*adjust_y(5.5)/6+picPadding2;
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
    if (dimensions()[1] == 1 && !hiddenLines && !useAltSchema) {
        boundaryLine10.x1.baseVal.value = picWidth*adjust_x(0.5)/6+picPadding1;
        boundaryLine10.y1.baseVal.value = picHeight*adjust_y(1)/6+picPadding2;
        boundaryLine10.x2.baseVal.value = picWidth*adjust_x(1.5)/6+picPadding1;
        boundaryLine10.y2.baseVal.value = picHeight*adjust_y(1)/6+picPadding2;
        boundaryLine11.x1.baseVal.value = picWidth*adjust_x(2.5)/6+picPadding1;
        boundaryLine11.y1.baseVal.value = picHeight*adjust_y(1)/6+picPadding2;
        boundaryLine11.x2.baseVal.value = picWidth*adjust_x(3.5)/6+picPadding1;
        boundaryLine11.y2.baseVal.value = picHeight*adjust_y(1)/6+picPadding2;
        boundaryLine12.x1.baseVal.value = picWidth*adjust_x(4.5)/6+picPadding1;
        boundaryLine12.y1.baseVal.value = picHeight*adjust_y(1)/6+picPadding2;
        boundaryLine12.x2.baseVal.value = picWidth*adjust_x(5.5)/6+picPadding1;
        boundaryLine12.y2.baseVal.value = picHeight*adjust_y(1)/6+picPadding2;
        boundaryLine13.x1.baseVal.value = picWidth*adjust_x(0.5)/6+picPadding1;
        boundaryLine13.y1.baseVal.value = picHeight*adjust_y(3)/6+picPadding2;
        boundaryLine13.x2.baseVal.value = picWidth*adjust_x(1.5)/6+picPadding1;
        boundaryLine13.y2.baseVal.value = picHeight*adjust_y(3)/6+picPadding2;
        boundaryLine14.x1.baseVal.value = picWidth*adjust_x(2.5)/6+picPadding1;
        boundaryLine14.y1.baseVal.value = picHeight*adjust_y(3)/6+picPadding2;
        boundaryLine14.x2.baseVal.value = picWidth*adjust_x(3.5)/6+picPadding1;
        boundaryLine14.y2.baseVal.value = picHeight*adjust_y(3)/6+picPadding2;
        boundaryLine15.x1.baseVal.value = picWidth*adjust_x(4.5)/6+picPadding1;
        boundaryLine15.y1.baseVal.value = picHeight*adjust_y(3)/6+picPadding2;
        boundaryLine15.x2.baseVal.value = picWidth*adjust_x(5.5)/6+picPadding1;
        boundaryLine15.y2.baseVal.value = picHeight*adjust_y(3)/6+picPadding2;
        boundaryLine16.x1.baseVal.value = picWidth*adjust_x(0.5)/6+picPadding1;
        boundaryLine16.y1.baseVal.value = picHeight*adjust_y(5)/6+picPadding2;
        boundaryLine16.x2.baseVal.value = picWidth*adjust_x(1.5)/6+picPadding1;
        boundaryLine16.y2.baseVal.value = picHeight*adjust_y(5)/6+picPadding2;
        boundaryLine17.x1.baseVal.value = picWidth*adjust_x(2.5)/6+picPadding1;
        boundaryLine17.y1.baseVal.value = picHeight*adjust_y(5)/6+picPadding2;
        boundaryLine17.x2.baseVal.value = picWidth*adjust_x(3.5)/6+picPadding1;
        boundaryLine17.y2.baseVal.value = picHeight*adjust_y(5)/6+picPadding2;
        boundaryLine18.x1.baseVal.value = picWidth*adjust_x(4.5)/6+picPadding1;
        boundaryLine18.y1.baseVal.value = picHeight*adjust_y(5)/6+picPadding2;
        boundaryLine18.x2.baseVal.value = picWidth*adjust_x(5.5)/6+picPadding1;
        boundaryLine18.y2.baseVal.value = picHeight*adjust_y(5)/6+picPadding2;
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
    if (dimensions()[0] == 1 && dimensions()[1] == 1 && !hiddenLines && !useAltSchema) {
        boundaryPoint1.cx.baseVal.value = picWidth*adjust_x(1)/6+picPadding1;
        boundaryPoint1.cy.baseVal.value = picHeight*adjust_y(1)/6+picPadding2;
        // boundaryPoint2.cx.baseVal.value = picWidth/2+picPadding1;
        // boundaryPoint2.cy.baseVal.value = picHeight/6+picPadding2;
        boundaryPoint3.cx.baseVal.value = picWidth*adjust_x(5)/6+picPadding1;
        boundaryPoint3.cy.baseVal.value = picHeight*adjust_y(1)/6+picPadding2;
        boundaryPoint4.cx.baseVal.value = picWidth*adjust_x(1)/6+picPadding1;
        boundaryPoint4.cy.baseVal.value = picHeight*adjust_y(3)/6+picPadding2;
        boundaryPoint5.cx.baseVal.value = picWidth*adjust_x(3)/6+picPadding1;
        boundaryPoint5.cy.baseVal.value = picHeight*adjust_y(3)/6+picPadding2;
        // boundaryPoint6.cx.baseVal.value = picWidth*5/6+picPadding1;
        // boundaryPoint6.cy.baseVal.value = picHeight/2+picPadding2;
        // boundaryPoint7.cx.baseVal.value = picWidth/6+picPadding1;
        // boundaryPoint7.cy.baseVal.value = picHeight*5/6+picPadding2;
        boundaryPoint8.cx.baseVal.value = picWidth*adjust_x(3)/6+picPadding1;
        boundaryPoint8.cy.baseVal.value = picHeight*adjust_y(5)/6+picPadding2;
        boundaryPoint9.cx.baseVal.value = picWidth*adjust_x(5)/6+picPadding1;
        boundaryPoint9.cy.baseVal.value = picHeight*adjust_y(5)/6+picPadding2;
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
    hotspot1.cx.baseVal.value = picWidth*adjust_x(3)/6+picPadding1;
    hotspot1.cy.baseVal.value = picHeight*adjust_y(1)/6+picPadding2;
    hotspot2.cx.baseVal.value = picWidth*adjust_x(5)/6+picPadding1;
    hotspot2.cy.baseVal.value = picHeight*adjust_y(3)/6+picPadding2;
    hotspot3.cx.baseVal.value = picWidth*adjust_x(1)/6+picPadding1;
    hotspot3.cy.baseVal.value = picHeight*adjust_y(5)/6+picPadding2;

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
    games.length = 0;
    // uncomment
    // games.push(game.use_conventions(game.coord_1 % 6, game.coord_2 % 6, game.coord_3, game.coord_4, game.quad));
    // if (!useAltSchema) {
    //     if (dimensions()[0] == 1) {
    //         let redLine = Math.round((games[0].x1+1)/2)*2-1;
    //         games.push(games[0].acrossBlue(true));
    //         if (Number.isInteger(game.coord_1/2)) {
    //             let redLine = Math.round((games[1].x1+1)/2)*2-1;
    //             games.push(games[1].acrossBlue(true));
    //         }
    //     }
    //     if (dimensions()[1] == 1) {
    //         const length = games.length;
    //         for (let i = 0; i < length; i++) {
    //             let redLine = Math.round((games[i].x2+1)/2)*2-1;
    //             games.push(games[i].acrossBlue(false));
    //         }
    //         if (Number.isInteger(game.coord_2/2)) {
    //             for (let i = length; i < 2*length; i++) {
    //                 let redLine = Math.round((games[i].x2+1)/2)*2-1;
    //                 games.push(games[i].acrossBlue(false));
    //             }
    //         }
    //     }
    // }
    // if (draggingInBigPic && isMouseDown) {
    //     placePoint(bigPicPoint1, game.quad, game.coord_1, game.coord_2);
    // } else {
    //     placePoint(pointObjects[0], games[0].quad, games[0].coord_1, games[0].coord_2);
    //     draggingInBigPic = false;
    // }
    // for (let i = 1; i < 9; i++) {
    //     if (i < games.length) {
    //         pointObjects[i].style.display = "";
    //         placePoint(pointObjects[i], games[i].quad, games[i].coord_1, games[i].coord_2);
    //     } else {
    //         pointObjects[i].style.display = "none";
    //     }
    // }

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

    // let [brRowX, brRowY] = [game.rhombic_x1,game.rhombic_y1];
    // brRowX = brRowX*birhombicDiagramWidth/4 + birhombicDiagramWidth/2 + birhombicPadding - starWidth/2;
    // brRowY = birhombicDiagramHeight - brRowY*birhombicDiagramHeight/Math.sqrt(3) + birhombicDiagramPadding - starWidth/2;
    // brRowPlayer.x.baseVal.value = brRowX;
    // brRowPlayer.y.baseVal.value = brRowY;
    // let [brColX, brColY] = [game.rhombic_x2,game.rhombic_y2];
    // brColX = brColX*birhombicDiagramWidth/4 + birhombicDiagramWidth/2 + birhombicPadding - starWidth/2;
    // brColY = birhombicDiagramHeight - brColY*birhombicDiagramHeight/Math.sqrt(3) + birhombicDiagramPadding - starWidth/2;
    // brColPlayer.x.baseVal.value = brColX;
    // brColPlayer.y.baseVal.value = brColY;
    
    times.push(performance.now() - cur_time);
    cur_time = performance.now();

    let animation_time = 0;
    // update canvas
    if (backgroundOutOfDate) { //  && viewMode != 0
        if ((dimensions()[0] != 1 && dimensions()[1] != 1 || !isMouseDown && !x1up && !x1down && !x2up && !x2down) && 
            !draggingB1 && !draggingB2  && !b1up && !b1down && !b2up && !b2down && b1V == 0 && b2V == 0) {
            updateCanvas(false);
        } else {
            updateCanvas(true);
        }
    }

    // if (backgroundOutOfDate && (dimensions()[0] > 0 && dimensions()[1] > 0 || fixImageSize)) { //  && viewMode != 0
    //     const foreignObject = document.getElementById("canvasForeignObject");
    //     const canvas = document.getElementById("canvas");

    //     // update the size of the canvas
    //     foreignObject.x.baseVal.value = picPadding1;
    //     foreignObject.y.baseVal.value = picPadding2;
    //     foreignObject.width.baseVal.value = picWidth;
    //     foreignObject.height.baseVal.value = picHeight;
    //     canvas.width = picWidth;
    //     canvas.height = picHeight;

    //     // if (time % 3 == 0 || switchMode) {
    //     valuesX = 6*Math.round(picWidth/30);
    //     valuesY = 6*Math.round(picHeight/30);
    //     // if (valuesX == 0 || valuesY == 0) {
    //     values = [];
    //     for (let j = 0; j < valuesY; j++) {
    //         values.push([]);
    //         for (let i = 0; i < valuesX; i++) {
    //             // let [rowM, colM] = (!useAltSchema) ? 
    //             //                         coordsToMatrices((i+0.5)/valuesX*6, (valuesY-j-0.5)/valuesY*6,
    //             //                                         coords[2] != 0 ? coords[2] : coords[2] + error*2,
    //             //                                         coords[3] != 0 ? coords[3] : coords[3] + error*2) :
    //             //                         coordsToMatricesAlt((i+0.5)/valuesX*6, (valuesY-j-0.5)/valuesY*6, quad);
    //             // if (!viewModeP1) {
    //             //     [rowM, colM] = [flip(rowM), flip(colM)].toReversed();
    //             // }
    //             let new_game = game.use_conventions((i+0.5)/valuesX*6, (valuesY-j-0.5)/valuesY*6, game.coord_3, game.coord_4, game.quad);
    //             // if (useAltSchema) new_game.to_balanced();
    //             values[j].push(returns(new_game,viewMode,viewModeP1));
    //         }
    //     }
    //     switchMode = false;
    //     backgroundOutOfDate = false;
    //     // }

    //     let last_t = performance.now();
    //     const ctx = canvas.getContext("2d");
    //     const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
    //     const data = imageData.data;
    //     for (let j = 0; j < canvas.height; j++) {
    //         for (let i = 0; i < canvas.width; i++) {
    //             let color;
    //             if (viewMode == 0) {
    //                 // last_t = performance.now();
    //                 const new_game = game.use_conventions(i/canvas.width*6, (canvas.height-j)/canvas.height*6, game.coord_3, game.coord_4, game.quad);
    //                 color = new_game.equilibrium_color;
    //                 animation_time += performance.now() - last_t;
    //             } else if (viewMode == 11) {
    //                 const new_game = game.use_conventions(i/canvas.width*6, (canvas.height-j)/canvas.height*6, game.coord_3, game.coord_4, game.quad);
    //                 color = new_game.quadrant_color;
    //             } else {
    //                 let value = 0;

    //                 // Apply linear interpolation between samples
    //                 // value = values[Math.floor(j/canvas.height*valuesY)][Math.floor(i/canvas.width*valuesX)];
    //                 // if ((viewMode == 3 || viewMode == 1) && viewModeP1) {
    //                 //     const weight1 = i/canvas.width*valuesX % 1;
    //                 //     if (Math.ceil(i/canvas.width*valuesX)%valuesX == valuesX/2) {
    //                 //         value = values[Math.floor(j/canvas.height*valuesY)][Math.floor(i/canvas.width*valuesX)];
    //                 //     } else {
    //                 //         value = values[Math.floor(j/canvas.height*valuesY)][Math.floor(i/canvas.width*valuesX)] * (1-weight1) +
    //                 //                 values[Math.floor(j/canvas.height*valuesY)%valuesY][Math.ceil(i/canvas.width*valuesX)%valuesX] * weight1;
    //                 //     }
    //                 // } else {
    //                 const weight1 = i/canvas.width*valuesX % 1;
    //                 const weight2 = j/canvas.height*valuesY % 1;
    //                 value = values[Math.floor(j/canvas.height*valuesY)][Math.floor(i/canvas.width*valuesX)] * (1-weight1) * (1-weight2) +
    //                         values[Math.floor(j/canvas.height*valuesY)%valuesY][Math.ceil(i/canvas.width*valuesX)%valuesX] * weight1 * (1-weight2) +
    //                         values[Math.ceil(j/canvas.height*valuesY)%valuesY][Math.floor(i/canvas.width*valuesX)%valuesX] * (1-weight1) * weight2 +
    //                         values[Math.ceil(j/canvas.height*valuesY)%valuesY][Math.ceil(i/canvas.width*valuesX)%valuesX] * weight1 * weight2;
    //                 // }

    //                 // Render discontinuities in higher resolution
    //                 // if ((i < canvas.width/2 && j >= canvas.height/2 && viewMode == 3 && (quad == 1 || quad == 3)) || viewMode == 7) {
    //                 if ((dimensions()[0] != 1 && dimensions()[1] != 1 || !isMouseDown && !x1up && !x1down && !x2up && !x2down) && 
    //                     !draggingB1 && !draggingB2 && !b1up && !b1down && !b2up && !b2down && b1V == 0 && b2V == 0) {
    //                     // const n = Math.floor(i/canvas.width*valuesX);
    //                     // const m = Math.floor(j/canvas.height*valuesY);
    //                     // const jumpSize = 0.01;
    //                     // let boundary = true; // false
    //                     // if (n != 0 && Math.abs(values[m][n-1] - values[m][n]) > jumpSize) boundary = true;
    //                     // if (n != 0 && m != 0 && Math.abs(values[m-1][n-1] - values[m][n]) > jumpSize) boundary = true;
    //                     // if (m != 0 && Math.abs(values[m-1][n] - values[m][n]) > jumpSize) boundary = true;
    //                     // if (n != valuesX-1 && m != 0 && Math.abs(values[m-1][n+1] - values[m][n]) > jumpSize) boundary = true;
    //                     // if (n != valuesX-1 && Math.abs(values[m][n+1] - values[m][n]) > jumpSize) boundary = true;
    //                     // if (n != valuesX-1 && m != valuesY-1 && Math.abs(values[m+1][n+1] - values[m][n]) > jumpSize) boundary = true;
    //                     // if (m != valuesY-1 && Math.abs(values[m][n+1] - values[m][n]) > jumpSize) boundary = true;
    //                     // if (n != 0 && m != valuesY-1 && Math.abs(values[m+1][n-1] - values[m][n]) > jumpSize) boundary = true;

    //                     // if (boundary) {
    //                         let new_game = game.use_conventions(i/canvas.width*6, (canvas.height-j)/canvas.height*6, game.coord_3, game.coord_4, game.quad);
    //                         // if (useAltSchema) new_game.to_balanced();
    //                         value = returns(new_game,viewMode,viewModeP1);
    //                         // let [rowM, colM] = (!useAltSchema) ? 
    //                         //                     coordsToMatrices(i/canvas.width*6, (canvas.height-j)/canvas.height*6,
    //                         //                                     coords[2] != 0 ? coords[2] : coords[2] + error*2,
    //                         //                                     coords[3] != 0 ? coords[3] : coords[3] + error*2) :
    //                         //                     coordsToMatricesAlt(i/canvas.width*6, (canvas.height-j)/canvas.height*6, quad);
    //                         // if (!viewModeP1) {
    //                         //     [rowM, colM] = [flip(rowM), flip(colM)].toReversed();
    //                         // }
    //                         // switch (viewMode) {
    //                         //     case 1:
    //                         //         value = payoff(rowM, colM)/9;
    //                         //         break;
    //                         //     case 2:
    //                         //         value = payoffTransferable(rowM, colM)/9;
    //                         //         break;
    //                         //     case 3:
    //                         //         value = payoffModified(rowM, colM)/9;
    //                         //         break;
    //                         //     case 4:
    //                         //         value = payoffCoco(rowM, colM)[0]/9;
    //                         //         break;
    //                         //     case 5:
    //                         //         value = payoffBargainingBackstop(rowM, colM)[0]/9;
    //                         //         break;
    //                         //     case 6:
    //                         //         value = payoffBargainingDisagreement(rowM, colM)[0]/9;
    //                         //         break;
    //                         //     case 7:
    //                         //         value = payoffCustom(rowM, colM);
    //                         //         break;
    //                         //     case 8:
    //                         //         value = coordination(rowM, colM);
    //                         //         break;
    //                         //     case 9:
    //                         //         value = payoffShapley(rowM, colM)[0]/9;
    //                         //         break;
    //                         // }
    //                     // }
    //                 }
    //                 color = colorFunction(value, viewMode);
    //             }

    //             data[(j*canvas.width+i)*4]   = color[0];
    //             data[(j*canvas.width+i)*4+1] = color[1];
    //             data[(j*canvas.width+i)*4+2] = color[2];
    //             data[(j*canvas.width+i)*4+3] = 255;
    //         }
    //     }
    //     ctx.putImageData(imageData,0,0);
    // }
    if (backgroundOutOfDate && (dimensions()[0] > 0 && dimensions()[1] > 0 || fixImageSize)) { //  && viewMode != 0
        render_background(picWidth,picHeight,picPadding1,picPadding2);
    }

    times.push(performance.now() - cur_time);
    cur_time = performance.now();

    // update cell name
    const cellName = document.getElementById("cell-name");
    let cellCol = (-1*(Math.floor(game.coord_1*game.conventions[1])-game.conventions[0]) + 15) % 6 + 1;
    let cellRow = (-1*(Math.floor(game.coord_2*game.conventions[1])-game.conventions[0]) + 15) % 6 + 1;
    cellName.innerHTML = cellCol.toString() + "," + cellRow.toString();

    // update zone label
    const zone_label = document.getElementById("zone");
    if (!useAltSchema) {
        zone_label.innerHTML = "";
    } else {
        switch (game.zone) {
            case 1:
                zone_label.innerHTML = " - cold-cold";
                break;
            case 2:
                zone_label.innerHTML = " - warm-cold";
                break;
            case 3:
                zone_label.innerHTML = " - warm-warm";
                break;
            case 4:
                zone_label.innerHTML = " - cold-warm";
                break;
        }
    }

    updateDegenerateGames();

    update_rgb_lines();

    time++;
}

// function qOverBlue(p1, q0, x1, x2) {
//     let x = 0;
//     if (p1) {
//         x = x1;
//     }
//     else {
//         x = (8 - x2) % 6;
//     }
//     if (0 < x && x < 2 || x == 0 && p1 || x == 6 && p1 || x == 2 && !p1) {
//         switch (q0) {
//             case 1:
//                 return 3;
//             case 2:
//                 return 4;
//             case 3:
//                 return 1;
//             case 4:
//                 return 2;
//         }
//     } else if (2 < x && x < 4 || x == 2 && p1 || x == 4 && !p1) {
//         switch (q0) {
//             case 1:
//                 return 2;
//             case 2:
//                 return 1;
//             case 3:
//                 return 4;
//             case 4:
//                 return 3;
//         }
//     } else {
//         switch (q0) {
//             case 1:
//                 return 4;
//             case 2:
//                 return 3;
//             case 3:
//                 return 2;
//             case 4:
//                 return 1;
//         }
//     }
// }

function crossBlue(p1) {
    game.crossBlue(p1);
    // game.quad = qOverBlue(p1, game.quad, game.coord_1, game.coord_2);
    updateBackground();
    // if (p1) {
    //     let redLine = Math.round((game.coord_1+1)/2)*2-1;
    //     game.coord_1 = (redLine - (game.coord_1 - redLine) + 6) % 6;
    // } else {
    //     let redLine = Math.round((game.coord_2+1)/2)*2-1;
    //     game.coord_2 = (redLine - (game.coord_2 - redLine) + 6) % 6;
    // }
}

function crossRed(p1) {
    game.crossRed(p1);
    updateBackground();
    // if (p1) {
    //     let redLine = Math.round((game.coord_1+1)/2)*2-1;
    //     game.coord_1 = (redLine - (game.coord_1 - redLine) + 6) % 6;
    // } else {
    //     let redLine = Math.round((game.coord_2+1)/2)*2-1;
    //     game.coord_2 = (redLine - (game.coord_2 - redLine) + 6) % 6;
    // }
}

function crossGreen(p1) {
    game.crossGreen(p1);
    // if (p1) {
    //     let greenLine = Math.round(game.coord_1/2)*2;
    //     game.coord_1 = (greenLine - (game.coord_1 - greenLine) + 6) % 6;
    // } else {
    //     let greenLine = Math.round(game.coord_2/2)*2;
    //     game.coord_2 = (greenLine - (game.coord_2 - greenLine) + 6) % 6;
    // }
}

function crossTan(p1) {
    game.crossTan(p1);
    updateBackground();
}

function switchMatrices() {
    const temp = [...game.row_matrix];
    game.row_matrix = [...game.col_matrix];
    game.col_matrix = temp;
    updateCoords();
}

function flipMatrices() {
    game.row_matrix = Game.flip(game.row_matrix);
    game.col_matrix = Game.flip(game.col_matrix);
    updateCoords();
}

function negate(player1) {
    if (player1) {
        game.row_matrix = [...game.row_matrix].map(x => 6 - x);
    } else {
        game.col_matrix = [...game.col_matrix].map(x => 6 - x);
    }
    updateCoords();
}

function switchRows() {
    const temp = [...game.row_matrix];
    game.row_matrix = [temp[2],temp[3],temp[0],temp[1]];
    updateCoords();
}

function switchColumns() {
    const temp = [...game.col_matrix];
    game.col_matrix = [temp[1],temp[0],temp[3],temp[2]];
    updateCoords();
}

function rotate() {
    const tempA = [...game.row_matrix];
    const tempB = [...game.col_matrix];
    game.row_matrix = [tempA[3], tempA[1], tempA[0], tempA[2]];
    game.col_matrix = [tempB[3], tempB[1], tempB[0], tempB[2]];
    updateCoords();
}

function randomGame() {
    game.row_matrix = normalize([Math.random(),Math.random(),Math.random(),Math.random()]);
    game.col_matrix = normalize([Math.random(),Math.random(),Math.random(),Math.random()]);

    updateCoords();
}

function updateBackground() {
    backgroundOutOfDate = true;
    updateRequired = true;

    const region1 = document.getElementById("region1");
    const region2a = document.getElementById("region2a");
    const region2b = document.getElementById("region2b");
    const region3a = document.getElementById("region3a");
    const region3b = document.getElementById("region3b");
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

    switch (game.quad) {
        case 1:
            // region1.style.fill = greenBackground;
            // if (viewMode == 0) {
            //     region2a.style.fill = greenBackground;
            //     region2b.style.fill = greenBackground;
            //     region3a.style.fill = greenBackground;
            //     region3b.style.fill = greenBackground;
            //     region4.style.fill = "url('#gradient1')";
            //     region2a.style.display = "";
            //     region2b.style.display = "";
            //     region3a.style.display = "";
            //     region3b.style.display = "";
            //     region4.style.display = "";
            // } else {
            //     region2a.style.display = "none";
            //     region2b.style.display = "none";
            //     region3a.style.display = "none";
            //     region3b.style.display = "none";
            //     region4.style.display = "none";
            // }
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
            // region1.style.fill = goldBackground;
            // if (viewMode == 0) {
            //     region2a.style.fill = goldBackground;
            //     region2b.style.fill = goldBackground;
            //     region3a.style.fill = grayBackground;
            //     region3b.style.fill = grayBackground;
            //     region4.style.fill = "white";
            //     region2a.style.display = "";
            //     region2b.style.display = "";
            //     region3a.style.display = "";
            //     region3b.style.display = "";
            //     region4.style.display = "";
            // } else {
            //     region2a.style.display = "none";
            //     region2b.style.display = "none";
            //     region3a.style.display = "none";
            //     region3b.style.display = "none";
            //     region4.style.display = "none";
            // }
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
            // region1.style.fill = grayBackground;
            // if (viewMode == 0) {
            //     region2a.style.fill = ceruleanBackground;
            //     region2b.style.fill = ceruleanBackground;
            //     region3a.style.fill = goldBackground;
            //     region3b.style.fill = goldBackground;
            //     region4.style.fill = "url('#gradient2')";
            //     region2a.style.display = "";
            //     region2b.style.display = "";
            //     region3a.style.display = "";
            //     region3b.style.display = "";
            //     region4.style.display = "";
            // } else {
            //     region2a.style.display = "none";
            //     region2b.style.display = "none";
            //     region3a.style.display = "none";
            //     region3b.style.display = "none";
            //     region4.style.display = "none";
            // }
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
            // region1.style.fill = ceruleanBackground;
            // if (viewMode == 0) {
            //     region2a.style.fill = grayBackground;
            //     region2b.style.fill = grayBackground;
            //     region3a.style.fill = ceruleanBackground;
            //     region3b.style.fill = ceruleanBackground;
            //     region4.style.fill = "white";
            //     region2a.style.display = "";
            //     region2b.style.display = "";
            //     region3a.style.display = "";
            //     region3b.style.display = "";
            //     region4.style.display = "";
            // } else {
            //     region2a.style.display = "none";
            //     region2b.style.display = "none";
            //     region3a.style.display = "none";
            //     region3b.style.display = "none";
            //     region4.style.display = "none";
            // }
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

// function coordsToMatrices(x1,x2,b1,b2,q=game.quad) {
//     let game = Game.xb(x1,x2,b1,b2,q);
//     return [game.row_matrix, game.col_matrix];
// }

function changeCoords(e) {
    if (!isMouseDown) {
        const x = e.pageX;
        const y = e.pageY;
        const blueCorner1 = document.getElementById("blue-corner-1");
        const blueCorner2 = document.getElementById("blue-corner-2");
        const blueCorner3 = document.getElementById("blue-corner-3");
        const blueCorner4 = document.getElementById("blue-corner-4");
        const blueCorner5 = document.getElementById("blue-corner-5");
        const blueLine1 = document.getElementById("blue-line-1");
        const blueLine2 = document.getElementById("blue-line-2");
        const blueLine3 = document.getElementById("blue-line-3");
        const blueLine4 = document.getElementById("blue-line-4");
        const elements = document.elementsFromPoint(x,y);
        if (!fixImageSize) {
            if (elements.includes(blueCorner1)) {
                draggingB1 = true; draggingB2 = true;
                game.zone = 1;
            } else if (elements.includes(blueCorner3)) {
                draggingB1 = true; draggingB2 = true;
                game.zone = 2;
            } else if (elements.includes(blueCorner4)) {
                draggingB1 = true; draggingB2 = true;
                game.zone = 3;
            } else if (elements.includes(blueCorner5)) {
                draggingB1 = true; draggingB2 = true;
                game.zone = 4;
            } else if (elements.includes(blueLine1)) {
                draggingB1 = true;
            } else if (elements.includes(blueLine2)) {
                draggingB2 = true;
            } else if (elements.includes(blueLine3)) {
                draggingB1 = true;
            } else if (elements.includes(blueLine4)) {
                draggingB2 = true;
            }
        } else {
            if (elements.includes(blueCorner1) || (elements.includes(blueLine2) && dimensions()[0] == 1 && dimensions()[1] == 1)) {
                draggingB2 = true;
            }
            if (elements.includes(blueCorner2) || (elements.includes(blueLine1) && dimensions()[0] == 1 && dimensions()[1] == 1)) {
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
            if (!useAltSchema)
                game.coord_3 = 6 - 2*(x - containerWidth/2 - blueLinePadding) / diagramWidth;
            else {
                if (game.zone == 1 || game.zone == 4) {
                    game.coord_3 = Math.min((x - containerWidth/2 - blueLinePadding) / diagramWidth,3);
                    // if (game.coord_3 > 3) game.coord_3 = 3;
                }
                else {
                    game.coord_3 = Math.max(3 + (x - blueLinePadding) / diagramWidth,3);
                    if (game.coord_3 < 3) game.coord_3 = 3;
                }
            }
        }
        if (draggingB2) {
            const y = e.pageY;
            const containerHeight = container.height.baseVal.value;
            const diagramHeight = diagram.height.baseVal.value;
            if (!useAltSchema)
                game.coord_4 = 6 - 2*(y - containerHeight/2 - blueLinePadding) / diagramHeight;
            else {
                if (game.zone == 1 || game.zone == 2) {
                    game.coord_4 = Math.min(3 - (y - blueLinePadding) / diagramHeight,3);
                    // if (game.coord_4 > 3) game.coord_4 = 3;
                }
                else {
                    game.coord_4 = Math.max(6 - (y - containerHeight/2 - blueLinePadding) / diagramHeight,3);
                    // if (game.coord_4 < 3) game.coord_4 = 3;
                }
            }
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

    if ((dimensions()[0] == 0 || dimensions()[1] == 0) && !fixImageSize) {
        const container = document.getElementById("container");
        const edgeFig = document.getElementById("edge-figure");
        const rect1 = container.getBoundingClientRect();
        const rect2 = edgeFig.getBoundingClientRect();
        const x = e.pageX;
        const y = e.pageY;
        const margins = 20;
        if (dimensions()[1] == 0 && rect2.left-margins <= x && rect2.right+margins >= x && rect1.top+rect1.width/2-margins <= y && rect1.top+rect1.width/2+margins >= y) {
            game.coord_1 = (x - rect2.left) / rect2.width * 6;
            enRoute = false;
        }
        if (dimensions()[0] == 0 && rect2.top-margins <= y && rect2.bottom+margins >= y && rect1.left+rect1.height/2-margins <= x && rect1.left+rect1.height/2+margins >= x) {
            game.coord_2 = 6 - (y - rect2.top) / rect2.height * 6;
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
                if (dimensions()[0] == 1 && !useAltSchema && !hiddenLines && integerBetween((game.coord_1+1)/2,(newX1+1)/2) && game.coord_2 % 2 > 0.5 && game.coord_2 % 2 < 1.5) {
                    crossBlue(true);
                }
                if (dimensions()[1] == 1 && !useAltSchema && !hiddenLines && integerBetween((game.coord_2+1)/2,(newX2+1)/2) && game.coord_1 % 2 > 0.5 && game.coord_1 % 2 < 1.5) {
                    crossBlue(false);
                }
                game.coord_1 = newX1;
                game.coord_2 = newX2;
            } else {
                game.coord_1 = Math.round(newX1*6)/6;
                game.coord_2 = Math.round(newX2*6)/6;
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
            for (let i = 0; i < games.length; i++) {
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
            if (game.quad != 2) { game.quad = 2; updateBackground(); }
            else game.quad = 2;
            const newX1 = 6 * (relativeX - 0.04) / 0.42;
            const newX2 = 6 - 6 * (relativeY - 0.04) / 0.42;
            // if (!useAltSchema) {
            game.coord_1 = newX1;
            game.coord_2 = newX2;
            // } else {
            //     game.balanced1 = newX1;
            //     game.balanced2 = newX2;
            // }
            enRoute = false;
        } else if (0.52 <= relativeX && relativeX <= 0.98 && 0.02 <= relativeY && relativeY <= 0.48) {
            if (game.quad != 1) { game.quad = 1; updateBackground(); }
            else game.quad = 1;
            const newX1 = 6 * (relativeX - 0.54) / 0.42;
            const newX2 = 6 - 6 * (relativeY - 0.04) / 0.42;
            // if (!useAltSchema) {
            game.coord_1 = newX1;
            game.coord_2 = newX2;
            // } else {
            //     game.balanced1 = newX1;
            //     game.balanced2 = newX2;
            // }
            enRoute = false;
        } else if (0.02 <= relativeX && relativeX <= 0.48 && 0.52 <= relativeY && relativeY <= 0.98) {
            if (game.quad != 3) { game.quad = 3; updateBackground(); }
            else game.quad = 3;
            const newX1 = 6 * (relativeX - 0.04) / 0.42;
            const newX2 = 6 - 6 * (relativeY - 0.54) / 0.42;
            // if (!useAltSchema) {
            game.coord_1 = newX1;
            game.coord_2 = newX2;
            // } else {
            //     game.balanced1 = newX1;
            //     game.balanced2 = newX2;
            // }
            enRoute = false;
        } else if (0.52 <= relativeX && relativeX <= 0.98 && 0.52 <= relativeY && relativeY <= 0.98) {
            if (game.quad != 4) { game.quad = 4; updateBackground(); }
            else game.quad = 4;
            const newX1 = 6 * (relativeX - 0.54) / 0.42;
            const newX2 = 6 - 6 * (relativeY - 0.54) / 0.42;
            // if (!useAltSchema) {
            game.coord_1 = newX1;
            game.coord_2 = newX2;
            // } else {
            //     game.balanced1 = newX1;
            //     game.balanced2 = newX2;
            // }
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
            let new_game = game.use_conventions(0,0,0,0,1).birhombic(relativeXbr,relativeYbr,game.rhombic_x2,game.rhombic_y2);
            // let newCoords = rhombicToCoords(true,relativeXbr,relativeYbr);
            if (new_game != null) {
                let newCoords = [new_game.coord_1,new_game.coord_3,new_game.quad];
                if (newCoords[2] != game.quad) {
                    game.quad = newCoords[2];
                    // let redLine = Math.round((coords[1]+1)/2)*2-1;
                    // coords[1] = (redLine - (coords[1] - redLine) + 6) % 6;
                    updateBackground();
                }
                // if (!useAltSchema) {
                game.coord_1 = newCoords[0];
                game.coord_3 = newCoords[1];
                // } else {
                //     game.balanced1 = newCoords[0];
                // }
            }
        } else {
            let new_game = game.use_conventions(0,0,0,0,1).birhombic(game.rhombic_x1,game.rhombic_y1,relativeXbr,relativeYbr);
            // let newCoords = rhombicToCoords(false,relativeXbr,relativeYbr);
            if (new_game != null) {
                let newCoords = [new_game.coord_2,new_game.coord_4,new_game.quad];
                if (newCoords[2] != game.quad) {
                    game.quad = newCoords[2];
                    // let redLine = Math.round((coords[0]+1)/2)*2-1;
                    // coords[0] = (redLine - (coords[0] - redLine) + 6) % 6;
                    updateBackground();
                }
                // if (!useAltSchema) {
                game.coord_2 = newCoords[0];
                game.coord_4 = newCoords[1];
                // } else {
                //     game.balanced2 = newCoords[0];
                // }
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
    if (enRoute) {
        enRoute = false;
        return;
    }
    const bigDiagram = document.getElementById("big-diagram");
    const rect = bigDiagram.getBoundingClientRect();
    if (rect.width == 0) {
        return;
    }
    const fullWidth = bigDiagram.getBoundingClientRect().width;
    const padding1 = 0.04*fullWidth;
    const padding2 = 0.32*fullWidth;
    const width = fullWidth - padding1 - padding2;
    // const padding = 0.1*fullWidth;
    // const width = fullWidth - 2*padding;
    const relativeX = e.offsetX - padding1;
    const relativeY = e.offsetY - padding2;
    const x = relativeX / width * 6;
    const y = (1 - relativeY / width) * 6;

    if (x <= 6 && x >= 0 && y <= 6 && y >= 0) {
        x1V = 0;
        x2V = 0;
        b1V = 0;
        b2V = 0;

        enRoute = true;
        const ver1 = take(game.row_matrix, 1);
        const ver2 = take(game.row_matrix, 2);
        const hor1 = take(game.col_matrix, 1);
        const hor2 = take(game.col_matrix, 2);
        destination[0][game.row_ranks.indexOf(0)] = 0;
        destination[0][game.row_ranks.indexOf(3)] = 6;
        destination[1][game.col_ranks.indexOf(0)] = 0;
        destination[1][game.col_ranks.indexOf(3)] = 6;
        destination[2] = game.quad;
        if (x > ver2) destination[0][game.row_ranks.indexOf(2)] = 0;
        else destination[0][game.row_ranks.indexOf(2)] = 6;
        if (x > ver1) destination[0][game.row_ranks.indexOf(1)] = 0;
        else destination[0][game.row_ranks.indexOf(1)] = 6;
        if (y > hor2) destination[1][game.col_ranks.indexOf(2)] = 0;
        else destination[1][game.col_ranks.indexOf(2)] = 6;
        if (y > hor1) destination[1][game.col_ranks.indexOf(1)] = 0;
        else destination[1][game.col_ranks.indexOf(1)] = 6;

        startPoint = [[...game.row_matrix],[...game.col_matrix]];
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

// function payoff([a1,b1,c1,d1], [a2,b2,c2,d2]) {
//     const error = 0.00001;
//     if (a2 - b2 > error && c2 - d2 > error) {
//         return Math.max(a1, c1);
//     } else if (b2 - a2 > error && d2 - c2 > error) {
//         return Math.max(b1, d1);
//     } else if (a1 - c1 > error && b1 - d1 > error) {
//         if (a2 - b2 > error) return a1;
//         else return b1;
//     } else if (c1 - a1 > error && d1 - b1 > error) {
//         if (c2 - d2 > error) return c1;
//         else return d1;
//     } else {
//         return mixedPayoff([a1,b1,c1,d1]);
//     }
// }

// function equilibrium([a1,b1,c1,d1], [a2,b2,c2,d2]) {
//     const error = 0.00001;
//     if (a2 - b2 > error && c2 - d2 > error) {
//         if (a1 - c1 > error) return 1;
//         else return 0;
//     } else if (b2 - a2 > error && d2 - c2 > error) {
//         if (b1 - d1 > error) return 1;
//         else return 0;
//     } else if (a1 - c1 > error && b1 - d1 > error) {
//         if (a2 - b2 > error) return 1;
//         else return 1;
//     } else if (c1 - a1 > error && d1 - b1 > error) {
//         if (c2 - d2 > error) return 0;
//         else return 0;
//     } else {
//         return mixedEquilibrium([a2,b2,c2,d2]);
//     }
// }

// function payoffModified([a1,b1,c1,d1], [a2,b2,c2,d2]) {
//     const error = 0.000001;
//     if (a2 - b2 > error && c2 - d2 > error) {
//         return Math.max(a1, c1);
//     } else if (b2 - a2 > error && d2 - c2 > error) {
//         return Math.max(b1, d1);
//     } else if (a1 - c1 > error && b1 - d1 > error) {
//         if (a2 - b2 > error) return a1;
//         else return b1;
//     } else if (c1 - a1 > error && d1 - b1 > error) {
//         if (c2 - d2 > error) return c1;
//         else return d1;
//     }
//     if (a1 - c1 > error && a2 - b2 > error && d1 - b1 > error && d2 - c2 > error) {
//         if ((a1-c1)*(a2-b2) - (d1-b1)*(d2-c2) > error) return a1;
//         else return d1;
//     } else if (b1 - d1 > error && b2 - a2 > error && c1 - a1 > error && c2 - d2 > error) {
//         if ((b1-d1)*(b2-a2) - (c1-a1)*(c2-d2) > error) return b1;
//         else return c1;
//     }
//     return mixedPayoff([a1,b1,c1,d1]);
// }

// function payoffShapley(m1, m2) {
//     const error = 0.00001;
//     let max = m1[0]+m2[0];
//     for (let i = 1; i < 4; i++) {
//         if (max < m1[i]+m2[i] - error) {
//             // biggestEntry = i;
//             max = m1[i]+m2[i];
//         }
//     }
//     let rowBackstop = 0;
//     let colBackstop = 0;
//     if (Math.min(m1[0],m1[1]) < Math.min(m1[2],m1[3])) rowBackstop = Math.min(m1[2],m1[3]);
//     else rowBackstop = Math.min(m1[0],m1[1]);
//     if (Math.min(m2[0],m2[2]) < Math.min(m2[1],m2[3])) colBackstop = Math.min(m2[1],m2[3]);
//     else colBackstop = Math.min(m2[0],m2[2]);

//     bargainingReturns[2] = [(max + rowBackstop - colBackstop)/2,(max + colBackstop - rowBackstop)/2];
//     if (viewMode == 9) {
//         disagree = [rowBackstop, colBackstop];
//     }
//     return [(max + rowBackstop - colBackstop)/2,(max + colBackstop - rowBackstop)/2];
// }

// function payoffCoco(m1, m2) {
//     const newM1 = [m1[0]-m2[0], m1[1]-m2[1], m1[2]-m2[2], m1[3]-m2[3]];
//     const newM2 = [m2[0]-m1[0], m2[1]-m1[1], m2[2]-m1[2], m2[3]-m1[3]];
//     const rowEquilibrium = equilibrium(newM1, newM2);
//     const colEquilibrium = 1-equilibrium(flip(newM2), flip(newM1));
//     const rowDisagreement = rowEquilibrium*colEquilibrium*m1[0] + rowEquilibrium*(1-colEquilibrium)*m1[1] + (1-rowEquilibrium)*colEquilibrium*m1[2] + (1-rowEquilibrium)*(1-colEquilibrium)*m1[3];
//     const colDisagreement = rowEquilibrium*colEquilibrium*m2[0] + rowEquilibrium*(1-colEquilibrium)*m2[1] + (1-rowEquilibrium)*colEquilibrium*m2[2] + (1-rowEquilibrium)*(1-colEquilibrium)*m2[3];

//     const error = 0.00001;
//     let biggestEntry = 0;
//     let max = m1[0]+m2[0];
//     for (let i = 1; i < 4; i++) {
//         if (max < m1[i]+m2[i] - error) {
//             biggestEntry = i;
//             max = m1[i]+m2[i];
//         }
//     }
    
//     bargainingReturns[3] = [(max + rowDisagreement - colDisagreement)/2, (max + colDisagreement - rowDisagreement)/2];
//     if (viewMode == 4) {
//         disagree = [rowDisagreement, colDisagreement];
//     }
//     return [(max + rowDisagreement - colDisagreement)/2, (max + colDisagreement - rowDisagreement)/2];
// }

// function payoffBargainingBackstop(m1, m2) {
//     let rowBackstop = 0;
//     let colBackstop = 0;
//     if (Math.min(m1[0],m1[1]) < Math.min(m1[2],m1[3])) rowBackstop = Math.min(m1[2],m1[3]);
//     else rowBackstop = Math.min(m1[0],m1[1]);
//     if (Math.min(m2[0],m2[2]) < Math.min(m2[1],m2[3])) colBackstop = Math.min(m2[1],m2[3]);
//     else colBackstop = Math.min(m2[0],m2[2]);

//     let vertices = [];
//     for (let i = 0; i < 4; i++) {
//         let pareto = true;
//         for (let j = 0; j < 4; j++) {
//             if (m1[i] < m1[j] && m2[i] < m2[j]) {
//                 pareto = false;
//                 break;
//             }
//         }
//         if (pareto) vertices.push(i);
//     }

//     let return1 = m1[vertices[0]];
//     let return2 = m2[vertices[0]];
//     let max = -10000;
//     for (let n = 0; n < vertices.length; n++) {
//         for (let m = n + 1; m < vertices.length; m++) {
//             const i = vertices[n];
//             const j = vertices[m];
//             const x1 = m1[i] - rowBackstop;
//             const x2 = m1[j] - rowBackstop;
//             const y1 = m2[i] - colBackstop;
//             const y2 = m2[j] - colBackstop;
//             // maximizing   (x1*t+x2*(1-t))*(y1*t+y2*(1-t))
//             // derivative   (x1*t+x2*(1-t))*(y1-y2)+(y1*t+y2*(1-t))*(x1-x2) = 0
//             // solve        t*(x1-x2)*(y1-y2)*2+x2*(y1-y2)+y2*(x1-x2) = 0
//             //              t = (x2*(y1-y2)+y2*(x1-x2))/((x1-x2)*(y1-y2)*2)
//             const t = (y1 == y2 || x1 == x2) ? -1 : -(x2*(y1-y2)+y2*(x1-x2))/((x1-x2)*(y1-y2)*2);
//             const value1 = x1*y1;
//             const value2 = x2*y2;
//             const value3 = (t < 1 && t > 0 && (x1*t+x2*(1-t))>0 && (y1*t+y2*(1-t))>0) ? (x1*t+x2*(1-t))*(y1*t+y2*(1-t)) : -1;
//             if (value1 >= max && value1 >= value2 && value1 >= value3) {
//                 max = value1;
//                 return1 = m1[i];
//                 return2 = m2[i];
//             } else if (value2 >= max && value2 >= value3) {
//                 max = value2;
//                 return1 = m1[j];
//                 return2 = m2[j];
//             } else if (value3 >= max) {
//                 max = value3;
//                 return1 = m1[i]*t + m1[j]*(1-t);
//                 return2 = m2[i]*t + m2[j]*(1-t);
//             }
//         }
//     }
//     // if (max == 0) return 8;
//     bargainingReturns[0] = [return1,return2];
//     if (viewMode == 5) {
//         disagree = [rowBackstop, colBackstop];
//     }
//     return [return1,return2];
// }

// function payoffBargainingDisagreement(m1, m2) {
//     const newM1 = [m1[0]-m2[0], m1[1]-m2[1], m1[2]-m2[2], m1[3]-m2[3]];
//     const newM2 = [m2[0]-m1[0], m2[1]-m1[1], m2[2]-m1[2], m2[3]-m1[3]];
//     const rowEquilibrium = equilibrium(newM1, newM2);
//     const colEquilibrium = 1-equilibrium(flip(newM2), flip(newM1));
//     const rowDisagreement = rowEquilibrium*colEquilibrium*m1[0] + rowEquilibrium*(1-colEquilibrium)*m1[1] + (1-rowEquilibrium)*colEquilibrium*m1[2] + (1-rowEquilibrium)*(1-colEquilibrium)*m1[3];
//     const colDisagreement = rowEquilibrium*colEquilibrium*m2[0] + rowEquilibrium*(1-colEquilibrium)*m2[1] + (1-rowEquilibrium)*colEquilibrium*m2[2] + (1-rowEquilibrium)*(1-colEquilibrium)*m2[3];

//     // let equilibriumPoint = -1;
//     // if (rowEquilibrium == 1 && colEquilibrium == 1) {
//     //     equilibriumPoint = 0;
//     // } else if (rowEquilibrium == 1 && colEquilibrium == 0) {
//     //     equilibriumPoint = 1;
//     // } else if (rowEquilibrium == 0 && colEquilibrium == 1) {
//     //     equilibriumPoint = 2;
//     // } else if (rowEquilibrium == 0 && colEquilibrium == 0) {
//     //     equilibriumPoint = 3;
//     // }

//     let vertices = [];
//     for (let i = 0; i < 4; i++) {
//         let pareto = true;
//         for (let j = 0; j < 4; j++) {
//             if (m1[i] < m1[j] && m2[i] < m2[j]) {
//                 pareto = false;
//                 break;
//             }
//         }
//         if (pareto) {
//             // if (i == equilibriumPoint) return rowDisagreement;
//             vertices.push(i);
//         }
//     }

//     let return1 = m1[vertices[0]];
//     let return2 = m2[vertices[0]];
//     let max = -10000;
//     for (let n = 0; n < vertices.length; n++) {
//         for (let m = n + 1; m < vertices.length; m++) {
//             const i = vertices[n];
//             const j = vertices[m];
//             const x1 = m1[i] - rowDisagreement;
//             const x2 = m1[j] - rowDisagreement;
//             const y1 = m2[i] - colDisagreement;
//             const y2 = m2[j] - colDisagreement;
//             const t = (y1 == y2 || x1 == x2) ? -1 : -(x2*(y1-y2)+y2*(x1-x2))/((x1-x2)*(y1-y2)*2);
//             const value1 = x1*y1;
//             const value2 = x2*y2;
//             const value3 = (t < 1 && t > 0 && (x1*t+x2*(1-t))>0 && (y1*t+y2*(1-t))>0) ? (x1*t+x2*(1-t))*(y1*t+y2*(1-t)) : -1;
//             if (value1 >= max && value1 >= value2 && value1 >= value3) {
//                 max = value1;
//                 return1 = m1[i];
//                 return2 = m2[i];
//             } else if (value2 >= max && value2 >= value3) {
//                 max = value2;
//                 return1 = m1[j];
//                 return2 = m2[j];
//             } else if (value3 >= max) {
//                 max = value3;
//                 return1 = m1[i]*t + m1[j]*(1-t);
//                 return2 = m2[i]*t + m2[j]*(1-t);
//             }
//         }
//     }
//     // if (max == 0) return 8;
//     bargainingReturns[1] = [return1,return2];
//     if (viewMode == 6) {
//         disagree = [rowDisagreement, colDisagreement];
//     }
//     return [return1,return2];
// }

function payoffCustom(game) {
    const choice1 = document.getElementById("view-custom-1").value;
    const choice2 = document.getElementById("view-custom-2").value;
    let value1 = 0;
    let value2 = 0;

    if (choice1 == "returns") {
        value1 = returns(game,1,true);
    } else if (choice1 == "returns-shapley") {
        value1 = returns(game,4,true);
    } else if (choice1 == "returns-coco") {
        value1 = returns(game,5,true);
    } else if (choice1 == "returns-bargaining-bs") {
        value1 = returns(game,2,true);
    } else if (choice1 == "returns-bargaining-tp") {
        value1 = returns(game,3,true);
    } else if (choice1 == "returns-max-total") {
        value1 = returns(game,6,true);
    } else if (choice1 == "returns-col") {
        value1 = returns(game,1,false);
    } else if (choice1 == "returns-shapley-col") {
        value1 = returns(game,4,false);
    } else if (choice1 == "returns-coco-col") {
        value1 = returns(game,5,false);
    } else if (choice1 == "returns-bargaining-bs-col") {
        value1 = returns(game,2,false);
    } else if (choice1 == "returns-bargaining-tp-col") {
        value1 = returns(game,3,false);
    } else if (choice1 == "backstop-row") {
        value1 = returns(game,9,true);
    } else if (choice1 == "threat-point-row") {
        value1 = returns(game,10,true);
    } else if (choice1 == "backstop-col") {
        value1 = returns(game,9,false);
    } else if (choice1 == "threat-point-col") {
        value1 = returns(game,10,false);
    }

    if (choice2 == "returns") {
        value2 = returns(game,1,true);
    } else if (choice2 == "returns-shapley") {
        value2 = returns(game,4,true);
    } else if (choice2 == "returns-coco") {
        value2 = returns(game,5,true);
    } else if (choice2 == "returns-bargaining-bs") {
        value2 = returns(game,2,true);
    } else if (choice2 == "returns-bargaining-tp") {
        value2 = returns(game,3,true);
    } else if (choice2 == "returns-max-total") {
        value2 = returns(game,6,true);
    } else if (choice2 == "returns-col") {
        value2 = returns(game,1,false);
    } else if (choice2 == "returns-shapley-col") {
        value2 = returns(game,4,false);
    } else if (choice2 == "returns-coco-col") {
        value2 = returns(game,5,false);
    } else if (choice2 == "returns-bargaining-bs-col") {
        value2 = returns(game,2,false);
    } else if (choice2 == "returns-bargaining-tp-col") {
        value2 = returns(game,3,false);
    } else if (choice2 == "backstop-row") {
        value2 = returns(game,9,true);
    } else if (choice2 == "threat-point-row") {
        value2 = returns(game,10,true);
    } else if (choice2 == "backstop-col") {
        value2 = returns(game,9,false);
    } else if (choice2 == "threat-point-col") {
        value2 = returns(game,10,false);
    }
    return (value1 - value2)/12+1/2;
}

// function coordination(m1, m2) {
//     const newM1 = [m1[0]+m2[0], m1[1]+m2[1], m1[2]+m2[2], m1[3]+m2[3]];
//     const newM2 = [m2[0]-m1[0], m2[1]-m1[1], m2[2]-m1[2], m2[3]-m1[3]];
//     const mean1 = (newM1[0]+newM1[1]+newM1[2]+newM1[3])/4; // max 9
//     const mean2 = (newM2[0]+newM2[1]+newM2[2]+newM2[3])/4; // max 6
//     const norm1 = (newM1[0]-mean1)**2 + (newM1[1]-mean1)**2 + (newM1[2]-mean1)**2 + (newM1[3]-mean1)**2; // max 
//     const norm2 = (newM2[0]-mean2)**2 + (newM2[1]-mean2)**2 + (newM2[2]-mean2)**2 + (newM2[3]-mean2)**2;
//     return (norm1 / (norm1 + norm2));
// }

function colorFunction(value,vMode) {
    let colors = [];
    let cutoffs = [];
    let divisor = 1;
    // const colors = [[38,84,138],[70,102,168],[110,116,144],[150,130,121],[190,144,97],[229,158,74],
    //                 [236,174,94],[242,190,113],[249,206,133],[255,222,153],[255,242,191],[142,255,142],[0,113,0],[255,255,255]];
    // const cutoffs = [0,0.1,0.2,0.3,0.4,0.5,0.6,0.7,0.8,0.9,1,1.25,1.5,2];
    if (vMode == 8) {
        colors = [[0,0,0],[0,0,86],[111,118,172],[255,255,255],[184,114,116],[86,0,0],[0,0,0]];
        cutoffs = [0,0.25,0.375,0.5,0.625,0.75,1];
    } else if (vMode == 7) {
        colors = [[0,0,10],[0,0,86],[111,118,172],[255,255,255],[184,114,116],[86,0,0],[10,0,0]];
        cutoffs = [0,0.1,0.3,0.5,0.7,0.9,1];
    } else {
        colors = [[0,7,105],[0,98,162],[48,175,149],[94,190,64],[195,167,48],[199,111,8],[198,34,41],[243,178,188],[255,222,226]];
        cutoffs = [0,0.11,0.22,0.33,0.44,0.55,0.67,0.85,1];
        divisor = 9;
    }
    value = value / divisor;
    if (value > 1) value = 1;
    const result = [0,0,0];
    for (let i = 1; i <= cutoffs.length; i++) {
        if (value <= cutoffs[i]) {
            for (let j = 0; j < 3; j++) result[j] = Math.floor((1-(value-cutoffs[i-1])/(cutoffs[i]-cutoffs[i-1]))*colors[i-1][j] + (value-cutoffs[i-1])/(cutoffs[i]-cutoffs[i-1])*colors[i][j]);
        return result;
        }
    }
}

function changeViewMode(mode, player1=true) {
    viewModeP1 = player1;
    if (viewMode == 7 || mode == 7 || viewMode == 8 || mode == 8 || viewMode == 0 || mode == 0) {
        viewMode = mode;
        updateLegend();
    } else {
        viewMode = mode;
    }
    // const canvas = document.getElementById("canvas");
    // const canvasBig = document.getElementById("big-pic-canvas");
    // if (mode == 0) {
    //     canvas.style.display = "none";
    //     canvasBig.style.display = "none";
    //     canvas.width = 0;
    //     canvas.height = 0;
    //     canvas.x = 0;
    //     canvas.y = 0;
    // } else {
    //     canvas.style.display = "";
    //     canvasBig.style.display = "";
        switchMode = true;
        backgroundOutOfDate = true;
    // }

    const curButton = document.getElementsByClassName("selected")[0];
    curButton.classList.remove("selected");

    if (player1) {
        switch (mode) {
            case 0:
                document.getElementById("regular-mode").classList.add("selected");
                document.getElementById("view-mode-label").innerHTML = "Equilibrium view";
                // document.getElementById("q1a").style.display = "";
                // document.getElementById("q2a").style.display = "";
                // document.getElementById("q2b").style.display = "";
                // document.getElementById("q3a").style.display = "";
                // document.getElementById("q3b").style.display = "";
                // document.getElementById("q3c").style.display = "";
                // document.getElementById("q4a").style.display = "";
                // document.getElementById("q4b").style.display = "";
                updateBackground();
                break;
            case 6:
                document.getElementById("transferable-mode").classList.add("selected");
                document.getElementById("view-mode-label").innerHTML = "Max total";
                break;
            case 1:
                document.getElementById("return-mode-2").classList.add("selected");
                document.getElementById("view-mode-label").innerHTML = "Row's equilibrium returns";
                break;
            case 5:
                document.getElementById("coco-mode").classList.add("selected");
                document.getElementById("view-mode-label").innerHTML = "Row's threat point TU";
                break;
            case 2:
                document.getElementById("bargaining-mode-1").classList.add("selected");
                document.getElementById("view-mode-label").innerHTML = "Row's backstop NTU";
                break;
            case 3:
                document.getElementById("bargaining-mode-2").classList.add("selected");
                document.getElementById("view-mode-label").innerHTML = "Row's threat point NTU";
                break;
            case 8:
                document.getElementById("custom-mode").classList.add("selected");
                const select1 = document.getElementById("view-custom-1");
                const select2 = document.getElementById("view-custom-2");
                document.getElementById("view-mode-label").innerHTML = "<span style=\"color:rgb(150,0,0)\">" + select1.getElementsByTagName("option")[select1.selectedIndex].innerHTML
                                                       + "</span> minus <span style=\"color:rgb(0,0,150)\">" + select2.getElementsByTagName("option")[select2.selectedIndex].innerHTML + "</span>";
                break;
            case 7:
                document.getElementById("coordination-mode").classList.add("selected");
                document.getElementById("view-mode-label").innerHTML = "Correlation";
                break;
            case 4:
                document.getElementById("shapley-mode").classList.add("selected");
                document.getElementById("view-mode-label").innerHTML = "Row's backstop TU";
                break;
            case 9:
                document.getElementById("backstop-row").classList.add("selected");
                document.getElementById("view-mode-label").innerHTML = "Row's backstop";
                break;
            case 10:
                document.getElementById("threat-point-row").classList.add("selected");
                document.getElementById("view-mode-label").innerHTML = "Row's threat point";
                break;
            case 11:
                document.getElementById("quadrant-mode").classList.add("selected");
                document.getElementById("view-mode-label").innerHTML = "Quadrant";
                // document.getElementById("q1a").style.display = "none";
                // document.getElementById("q2a").style.display = "none";
                // document.getElementById("q2b").style.display = "none";
                // document.getElementById("q3a").style.display = "none";
                // document.getElementById("q3b").style.display = "none";
                // document.getElementById("q3c").style.display = "none";
                // document.getElementById("q4a").style.display = "none";
                // document.getElementById("q4b").style.display = "none";
                updateBackground();
                break;
            case 12:
                document.getElementById("none-mode").classList.add("selected");
                document.getElementById("view-mode-label").innerHTML = "No background";
                break;
        }
    } else {
        switch (mode) {
            case 1:
                document.getElementById("return-mode-2-col").classList.add("selected");
                document.getElementById("view-mode-label").innerHTML = "Column's equilibrium returns";
                break;
            case 5:
                document.getElementById("coco-mode-col").classList.add("selected");
                document.getElementById("view-mode-label").innerHTML = "Column's threat point TU";
                break;
            case 2:
                document.getElementById("bargaining-mode-1-col").classList.add("selected");
                document.getElementById("view-mode-label").innerHTML = "Column's backstop NTU";
                break;
            case 3:
                document.getElementById("bargaining-mode-2-col").classList.add("selected");
                document.getElementById("view-mode-label").innerHTML = "Column's threat point NTU";
                break;
            case 4:
                document.getElementById("shapley-mode-col").classList.add("selected");
                document.getElementById("view-mode-label").innerHTML = "Column's backstop TU";
                break;
            case 9:
                document.getElementById("backstop-col").classList.add("selected");
                document.getElementById("view-mode-label").innerHTML = "Row's backstop";
                break;
            case 10:
                document.getElementById("threat-point-col").classList.add("selected");
                document.getElementById("view-mode-label").innerHTML = "Row's threat point";
                break;
        }
    }
}

function updateBigPicCanvas(lowRes = false) {
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
    const b1 = game.coord_3 != 0 ? game.coord_3 : error;
    const b2 = game.coord_4 != 0 ? game.coord_4 : error;
    // if (!lowRes) {
        const quadrantWidth = canvasBigPic.width*0.42;
        for (let j = 0; j < quadrantWidth; j++) {
            for (let i = 0; i < quadrantWidth; i++) {
                let color = [];
                if (viewMode == 12) {
                    color = [255,255,255];
                } else {
                    let new_game = game.use_conventions(i*6/quadrantWidth,(1-j/quadrantWidth)*6,b1,b2,1);
                    if (viewMode == 0) color = new_game.equilibrium_color;
                    else if (viewMode == 11) color = new_game.quadrant_color;
                    else color = colorFunction(returns(new_game,viewMode,viewModeP1),viewMode);
                }
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
                if (viewMode == 12) {
                    color = [255,255,255];
                } else {
                    let new_game = game.use_conventions(i*6/quadrantWidth,(1-j/quadrantWidth)*6,b1,b2,2);
                    if (viewMode == 0) color = new_game.equilibrium_color;
                    else if (viewMode == 11) color = new_game.quadrant_color;
                    else color = colorFunction(returns(new_game,viewMode,viewModeP1),viewMode);
                }
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
                if (viewMode == 12) {
                    color = [255,255,255];
                } else {
                    let new_game = game.use_conventions(i*6/quadrantWidth,(1-j/quadrantWidth)*6,b1,b2,3);
                    if (viewMode == 0) color = new_game.equilibrium_color;
                    else if (viewMode == 11) color = new_game.quadrant_color;
                    else color = colorFunction(returns(new_game,viewMode,viewModeP1),viewMode);
                }
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
                if (viewMode == 12) {
                    color = [255,255,255];
                } else {
                    let new_game = game.use_conventions(i*6/quadrantWidth,(1-j/quadrantWidth)*6,b1,b2,4);
                    if (viewMode == 0) color = new_game.equilibrium_color;
                    else if (viewMode == 11) color = new_game.quadrant_color;
                    else color = colorFunction(returns(new_game,viewMode,viewModeP1),viewMode);
                }
                const x = i + Math.round(canvasBigPic.width*0.54);
                const y = j + Math.round(canvasBigPic.height*0.54);
                data[(x+y*canvasBigPic.width)*4] = color[0];
                data[(x+y*canvasBigPic.width)*4+1] = color[1];
                data[(x+y*canvasBigPic.width)*4+2] = color[2];
                data[(x+y*canvasBigPic.width)*4+3] = 255;
            }
        }
    // } else {
    //     const resolution = 24;
    //     const quadrantWidth = canvasBigPic.width*0.42;
    //     for (let j = 0; j < resolution; j++) {
    //         for (let i = 0; i < resolution; i++) {
    //             let color = [];
    //             if (!useAltSchema) color = colorFunction(func(...coordsToMatrices(i/resolution*6+3/resolution,6-j/resolution*6-3/resolution,b1,b2,1)),viewMode);
    //             else color = colorFunction(func(...coordsToMatricesAlt(i/resolution*6+3/resolution,6-j/resolution*6+3/resolution,1)),viewMode);
    //             for (let x = Math.round(i/resolution*quadrantWidth + canvasBigPic.width*0.54); x < (i+1)/resolution*quadrantWidth + canvasBigPic.width*0.54; x++) {
    //                 for (let y = Math.round(j/resolution*quadrantWidth + canvasBigPic.height*0.04); y < (j+1)/resolution*quadrantWidth + canvasBigPic.height*0.04; y++) {
    //                     data[(x+y*canvasBigPic.width)*4] = color[0];
    //                     data[(x+y*canvasBigPic.width)*4+1] = color[1];
    //                     data[(x+y*canvasBigPic.width)*4+2] = color[2];
    //                     data[(x+y*canvasBigPic.width)*4+3] = 255;
    //                 }
    //             }
    //         }
    //     }
    //     for (let j = 0; j < resolution; j++) {
    //         for (let i = 0; i < resolution; i++) {
    //             let color = [];
    //             if (!useAltSchema) color = colorFunction(func(...coordsToMatrices(i/resolution*6+3/resolution,6-j/resolution*6-3/resolution,b1,b2,2)),viewMode);
    //             else color = colorFunction(func(...coordsToMatricesAlt(i/resolution*6+3/resolution,6-j/resolution*6+3/resolution,2)),viewMode);
    //             for (let x = Math.round(i/resolution*quadrantWidth + canvasBigPic.width*0.04); x < (i+1)/resolution*quadrantWidth + canvasBigPic.width*0.04; x++) {
    //                 for (let y = Math.round(j/resolution*quadrantWidth + canvasBigPic.height*0.04); y < (j+1)/resolution*quadrantWidth + canvasBigPic.height*0.04; y++) {
    //                     data[(x+y*canvasBigPic.width)*4] = color[0];
    //                     data[(x+y*canvasBigPic.width)*4+1] = color[1];
    //                     data[(x+y*canvasBigPic.width)*4+2] = color[2];
    //                     data[(x+y*canvasBigPic.width)*4+3] = 255;
    //                 }
    //             }
    //         }
    //     }
    //     for (let j = 0; j < resolution; j++) {
    //         for (let i = 0; i < resolution; i++) {
    //             let color = [];
    //             if (!useAltSchema) color = colorFunction(func(...coordsToMatrices(i/resolution*6+3/resolution,6-j/resolution*6-3/resolution,b1,b2,3)),viewMode);
    //             else color = colorFunction(func(...coordsToMatricesAlt(i/resolution*6+3/resolution,6-j/resolution*6+3/resolution,3)),viewMode);
    //             for (let x = Math.round(i/resolution*quadrantWidth + canvasBigPic.width*0.04); x < (i+1)/resolution*quadrantWidth + canvasBigPic.width*0.04; x++) {
    //                 for (let y = Math.round(j/resolution*quadrantWidth + canvasBigPic.height*0.54); y < (j+1)/resolution*quadrantWidth + canvasBigPic.height*0.54; y++) {
    //                     data[(x+y*canvasBigPic.width)*4] = color[0];
    //                     data[(x+y*canvasBigPic.width)*4+1] = color[1];
    //                     data[(x+y*canvasBigPic.width)*4+2] = color[2];
    //                     data[(x+y*canvasBigPic.width)*4+3] = 255;
    //                 }
    //             }
    //         }
    //     }
    //     for (let j = 0; j < resolution; j++) {
    //         for (let i = 0; i < resolution; i++) {
    //             let color = [];
    //             if (!useAltSchema) color = colorFunction(func(...coordsToMatrices(i/resolution*6+3/resolution,6-j/resolution*6-3/resolution,b1,b2,4)),viewMode);
    //             else color = colorFunction(func(...coordsToMatricesAlt(i/resolution*6+3/resolution,6-j/resolution*6+3/resolution,4)),viewMode);
    //             for (let x = Math.round(i/resolution*quadrantWidth + canvasBigPic.width*0.54); x < (i+1)/resolution*quadrantWidth + canvasBigPic.width*0.54; x++) {
    //                 for (let y = Math.round(j/resolution*quadrantWidth + canvasBigPic.height*0.54); y < (j+1)/resolution*quadrantWidth + canvasBigPic.height*0.54; y++) {
    //                     data[(x+y*canvasBigPic.width)*4] = color[0];
    //                     data[(x+y*canvasBigPic.width)*4+1] = color[1];
    //                     data[(x+y*canvasBigPic.width)*4+2] = color[2];
    //                     data[(x+y*canvasBigPic.width)*4+3] = 255;
    //                 }
    //             }
    //         }
    //     }
    // }
    ctx.putImageData(imageData,0,0);
}

function updateCanvas(lowRes = false) {
    // let func = ()=>(null);
    // if (viewModeP1) {
    //     switch (viewMode) {
    //         case 0:
    //             break;
    //         case 1:
    //             func = (a,b)=>payoff(a,b)/9;
    //             break;
    //         case 2:
    //             func = (a,b)=>payoffTransferable(a,b)/9;
    //             break;
    //         case 3:
    //             func = (a,b)=>payoffModified(a,b)/9;
    //             break;
    //         case 4:
    //             func = (a,b)=>payoffCoco(a,b)[0]/9;
    //             break;
    //         case 5:
    //             func = (a,b)=>payoffBargainingBackstop(a,b)[0]/9;
    //             break;
    //         case 6:
    //             func = (a,b)=>payoffBargainingDisagreement(a,b)[0]/9;
    //             break;
    //         case 7:
    //             func = (a,b)=>payoffCustom(a,b);
    //             break;
    //         case 8:
    //             func = (a,b)=>coordination(a,b);
    //             break;
    //         case 9:
    //             func = (a,b)=>payoffShapley(a,b)[0]/9;
    //             break;
    //     }
    // } else {
    //     switch (viewMode) {
    //         case 0:
    //             break;
    //         case 1:
    //             func = (a,b)=>payoff(flip(b),flip(a))/9;
    //             break;
    //         case 2:
    //             func = (a,b)=>payoffTransferable(flip(b),flip(a))/9;
    //             break;
    //         case 3:
    //             func = (a,b)=>payoffModified(flip(b),flip(a))/9;
    //             break;
    //         case 4:
    //             func = (a,b)=>payoffCoco(flip(b),flip(a))[0]/9;
    //             break;
    //         case 5:
    //             func = (a,b)=>payoffBargainingBackstop(flip(b),flip(a))[0]/9;
    //             break;
    //         case 6:
    //             func = (a,b)=>payoffBargainingDisagreement(flip(b),flip(a))[0]/9;
    //             break;
    //         case 7:
    //             func = (a,b)=>payoffCustom(flip(b),flip(a));
    //             break;
    //         case 8:
    //             func = (a,b)=>coordination(flip(b),flip(a));
    //             break;
    //         case 9:
    //             func = (a,b)=>payoffShapley(flip(b),flip(a))[0]/9;
    //             break;
    //     }
    // }
    updateBigPicCanvas(lowRes);
}

function fixImage(alt) {
    // if (!useAltSchema) {
    fixImageSize = alt;
    backgroundOutOfDate = true;
    // }
    for (let elt of document.getElementsByClassName("show-diagrams")) {
        elt.classList.remove("selected");
    }

    num_games = x => 6;

    if (alt) {
        diagramGrid = true;
        document.getElementById("fix-image-button-3").classList.add("selected");
        // diagram.style.opacity = 0;
        // updateDiagramGrid();
    } else {
        diagramGrid = false;
        document.getElementById("fix-image-button-1").classList.add("selected");
        let element;
        while (element = document.querySelector(".clone")) {
            element.remove();
        }
        diagram.style.opacity = 1;
    }
}

// function matrixToCoords(m) {
//     let pos0 = -1;
//     let pos1 = -1;
//     let pos2 = -1;
//     let pos3 = -1;
//     for (let i = 0; i < 4; i++) {
//         if (m[i] == 6 && pos3 == -1) pos3 = i;
//         else if (m[i] == 0 && pos0 == -1) pos0 = i;
//         else if (pos1 == -1) pos1 = i;
//         else {
//             if (m[i] >= m[pos1]) pos2 = i;
//             else {
//                 pos2 = pos1;
//                 pos1 = i;
//             }
//         }
//     }

//     const redModified = m[pos1]/m[pos2];
//     const blue = 6 - m[pos2];

//     let cell = -1;
//     if (pos2 == 0 && pos3 == 1 || pos2 == 1 && pos3 == 0 || pos2 == 2 && pos3 == 3 || pos2 == 3 && pos3 == 2) {
//         if (pos0 == 0 && pos3 == 2 || pos0 == 2 && pos3 == 0 || pos0 == 1 && pos3 == 3 || pos0 == 3 && pos3 == 1) cell = 5;
//         else cell = 4;
//     } else if (pos2 == 0 && pos3 == 2 || pos2 == 2 && pos3 == 0 || pos2 == 1 && pos3 == 3 || pos2 == 3 && pos3 == 1) {
//         if (pos0 == 0 && pos3 == 1 || pos0 == 1 && pos3 == 0 || pos0 == 2 && pos3 == 3 || pos0 == 3 && pos3 == 2) cell = 2;
//         else cell = 3;
//     } else {
//         if (pos0 == 0 && pos3 == 2 || pos0 == 2 && pos3 == 0 || pos0 == 1 && pos3 == 3 || pos0 == 3 && pos3 == 1) cell = 0;
//         else cell = 1;
//     }

//     let x = -1;
//     if (cell % 2 == 0) x = cell + 1 - redModified;
//     else x = cell + redModified;

//     return [x,blue];
// }

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
    // if (!useAltSchema) {
    //     const coords1 = [game.coord_1,game.b1];
    //     const coords2 = [game.coord_2,game.coord_4];
    // } else {
    //     const coords1 = matrixToCoords(game.row_matrix);
    //     const coords2 = matrixToCoords(flip(game.col_matrix));
    //     [game.coord_1,game.coord_2] = standardToAltCoords(coords1[0],coords2[0]);
    // }

    // let max1 = -1;
    // let max2 = -1;
    // const error = 0.00001;
    // for (let i = 0; i < 4; i++) {
    //     if (Math.abs(game.row_matrix[i] - 6) < error) {
    //         max1 = i;
    //         break;
    //     }
    // }
    // for (let i of [3,1,2,0]) {
    //     if (Math.abs(game.col_matrix[i] - 6) < error) {
    //         max2 = i;
    //         break;
    //     }
    // }
    // if (max1 == max2) game.quad = 1;
    // else if (max1 == 0 && max2 == 2 || max1 == 2 && max2 == 0 || max1 == 1 && max2 == 3 || max1 == 3 && max2 == 1) game.quad = 2;
    // else if (max1 == 0 && max2 == 1 || max1 == 1 && max2 == 0 || max1 == 2 && max2 == 3 || max1 == 3 && max2 == 2) game.quad = 4;
    // else game.quad = 3;
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

function updateDiagram(game) {
    const error = 0.00001;

    const container = document.getElementById("container");
    const diagram = document.getElementById("diagram");
    const diagramWidth = diagram.width.baseVal.value;
    const picWidth = fixImageSize ? container.width.baseVal.value - diagramWidth : (container.width.baseVal.value - diagramWidth)*dimensions()[0];
    const picHeight = fixImageSize ? container.height.baseVal.value - diagramWidth : (container.height.baseVal.value - diagramWidth)*dimensions()[1];
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

    // if (!useAltSchema) {
    diagram.x.baseVal.value = game.coord_1/6*picWidth+picPadding1-diagramWidth/2;
    diagram.y.baseVal.value = (6 - game.coord_2)/6*picHeight+picPadding2-diagramWidth/2;
    // } else {
    //     diagram.x.baseVal.value = game.balanced1/6*picWidth+picPadding1-diagramWidth/2;
    //     diagram.y.baseVal.value = (6 - game.balanced2)/6*picHeight+picPadding2-diagramWidth/2;
    // }

    const padding = 0.1*diagramWidth;
    const width = diagramWidth - 2*padding;
    diagramBox.width.baseVal.value = width;
    diagramBox.height.baseVal.value = width;
    diagramBox.x.baseVal.value = padding;
    diagramBox.y.baseVal.value = padding;
    line1.x1.baseVal.value = game.row_matrix[0]*width/6+padding;
    line1.x2.baseVal.value = game.row_matrix[1]*width/6+padding;
    line2.x1.baseVal.value = game.row_matrix[1]*width/6+padding;
    line2.x2.baseVal.value = game.row_matrix[3]*width/6+padding;
    line3.x1.baseVal.value = game.row_matrix[3]*width/6+padding;
    line3.x2.baseVal.value = game.row_matrix[2]*width/6+padding;
    line4.x1.baseVal.value = game.row_matrix[2]*width/6+padding;
    line4.x2.baseVal.value = game.row_matrix[0]*width/6+padding;

    line1.y1.baseVal.value = (1-game.col_matrix[0]/6)*width+padding;
    line1.y2.baseVal.value = (1-game.col_matrix[1]/6)*width+padding;
    line2.y1.baseVal.value = (1-game.col_matrix[1]/6)*width+padding;
    line2.y2.baseVal.value = (1-game.col_matrix[3]/6)*width+padding;
    line3.y1.baseVal.value = (1-game.col_matrix[3]/6)*width+padding;
    line3.y2.baseVal.value = (1-game.col_matrix[2]/6)*width+padding;
    line4.y1.baseVal.value = (1-game.col_matrix[2]/6)*width+padding;
    line4.y2.baseVal.value = (1-game.col_matrix[0]/6)*width+padding;

    point1.cx.baseVal.value = game.row_matrix[0]*width/6+padding;
    point1.cy.baseVal.value = (1-game.col_matrix[0]/6)*width+padding;
    point2.cx.baseVal.value = game.row_matrix[1]*width/6+padding;
    point2.cy.baseVal.value = (1-game.col_matrix[1]/6)*width+padding;
    point3.cx.baseVal.value = game.row_matrix[2]*width/6+padding;
    point3.cy.baseVal.value = (1-game.col_matrix[2]/6)*width+padding;
    point4.cx.baseVal.value = game.row_matrix[3]*width/6+padding;
    point4.cy.baseVal.value = (1-game.col_matrix[3]/6)*width+padding;

    corner1.cx.baseVal.value = game.row_matrix[0]*width/6+padding;
    corner1.cy.baseVal.value = (1-game.col_matrix[0]/6)*width+padding;
    corner2.cx.baseVal.value = game.row_matrix[1]*width/6+padding;
    corner2.cy.baseVal.value = (1-game.col_matrix[1]/6)*width+padding;
    corner3.cx.baseVal.value = game.row_matrix[2]*width/6+padding;
    corner3.cy.baseVal.value = (1-game.col_matrix[2]/6)*width+padding;
    corner4.cx.baseVal.value = game.row_matrix[3]*width/6+padding;
    corner4.cy.baseVal.value = (1-game.col_matrix[3]/6)*width+padding;

    const rowMax = Math.max(...game.row_matrix) - error;
    const colMax = Math.max(...game.col_matrix) - error;

    if (game.row_matrix[0] - game.row_matrix[2] >= -error && game.col_matrix[0] - game.col_matrix[1] >= -error) {
        if (game.row_matrix[0] >= rowMax && game.col_matrix[0] >= colMax) {
            point1.style = "fill:" + lightGreen;
            a1.style.color = lightGreen;
            a2.style.color = lightGreen;
        } else if (game.row_matrix[0] >= rowMax) {
            point1.style = "fill:" + gold;
            a1.style.color = gold;
            a2.style.color = gold;
        } else if (game.col_matrix[0] >= colMax) {
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
    
    if (game.row_matrix[1] - game.row_matrix[3] >= -error && game.col_matrix[1] - game.col_matrix[0] >= -error) {
        if (game.row_matrix[1] >= rowMax && game.col_matrix[1] >= colMax) {
            point2.style = "fill:" + lightGreen;
            b1.style.color = lightGreen;
            b2.style.color = lightGreen;
        } else if (game.row_matrix[1] >= rowMax) {
            point2.style = "fill:" + gold;
            b1.style.color = gold;
            b2.style.color = gold;
        } else if (game.col_matrix[1] >= colMax) {
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

    if (game.row_matrix[2] - game.row_matrix[0] >= -error && game.col_matrix[2] - game.col_matrix[3] >= -error) {
        if (game.row_matrix[2] >= rowMax && game.col_matrix[2] >= colMax) {
            point3.style = "fill:" + lightGreen;
            c1.style.color = lightGreen;
            c2.style.color = lightGreen;
        } else if (game.row_matrix[2] >= rowMax) {
            point3.style = "fill:" + gold;
            c1.style.color = gold;
            c2.style.color = gold;
        } else if (game.col_matrix[2] >= colMax) {
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

    if (game.row_matrix[3] - game.row_matrix[1] >= -error && game.col_matrix[3] - game.col_matrix[2] >= -error) {
        if (game.row_matrix[3] >= rowMax && game.col_matrix[3] >= colMax) {
            point4.style = "fill:" + lightGreen;
            d1.style.color = lightGreen;
            d2.style.color = lightGreen;
        } else if (game.row_matrix[3] >= rowMax) {
            point4.style = "fill:" + gold;
            d1.style.color = gold;
            d2.style.color = gold;
        } else if (game.col_matrix[3] >= colMax) {
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

    if (game.row_mixed_return != null) {
        const mixedRow = game.row_mixed_return;
        const mixedCol = game.col_mixed_return;
        point5.style = "fill:" + mixedColor;
        point5.style.r = eqRadii*width;
        point5.cx.baseVal.value = mixedRow*width/6+padding;
        point5.cy.baseVal.value = (1-mixedCol/6)*width+padding;
        if (6 - mixedRow < error && 6 - mixedCol < error) point5.style.opacity = 0;
    } else {
        point5.style.opacity = 0;
    }
}


let num_games = x => 6;

function updateDiagramGrid() {
    updateRequired = false;
    let element;
    while (element = document.querySelector(".clone")) {
        element.remove();
    }
    let new_game = game.use_conventions(game.coord_1,game.coord_2,game.coord_3,game.coord_4,game.quad);
    const j0 = Math.floor(game.coord_1);
    const i0 = Math.floor(game.coord_2);
    const gap1 = 6/num_games(6-dimensions()[0]*6);
    const gap2 = 6/num_games(6-dimensions()[1]*6);
    for (let i = 0; i < 6; i += gap2) {
        for (let k = 0; k < gap2; k++) {
            // if ((i+k) % 2 == 0) {
            //     let redLine = Math.round((new_game.coord_2+1)/2)*2-1;
            //     if (new_game.coord_2 != 4)
            //         new_game.coord_2 = (redLine - (new_game.coord_2 - redLine) + 6) % 6;
            //     else
            //         new_game.coord_2 = 6;
            // } else new_game.crossGreen(false);
            // if (new_game.coord_2 != 4)
            new_game.coord_2 = (new_game.coord_2 + 2*((i0+i+k % 6)+1 - new_game.coord_2)) % 6;
            // else
            //     new_game.coord_2 = 6;
        }
        for (let j = 0; j < 6; j += gap1) {
            if (i == 6 - gap2 && j == 6 - gap1) break;
            for (let k = 0; k < gap1; k++) {
                // if ((j+k) % 2 == 0) {
                //     let redLine = Math.round((new_game.coord_1+1)/2)*2-1;
                //     if (new_game.coord_1 != 4)
                //         new_game.coord_1 = (redLine - (new_game.coord_1 - redLine) + 6) % 6;
                //     else
                //         new_game.coord_1 = 6;
                // } else new_game.crossGreen(true);
                // if (new_game.coord_1 != 4)
                    // new_game.coord_1 = (j0+j+k - (new_game.coord_1 - j0-j-k) + 6) % 6;
                new_game.coord_1 = (new_game.coord_1 + 2*((j0+j+k % 6)+1 - new_game.coord_1)) % 6;
                // else
                //     new_game.coord_1 = 6;
            }
            updateDiagram(new_game);
            createDiagram();
        }
    }
}

function updateBlueLines() {
    const container = document.getElementById("container");
    const diagram = document.getElementById("diagram");
    const diagramWidth = diagram.width.baseVal.value;
    const picWidth = fixImageSize ? container.width.baseVal.value - diagramWidth : (container.width.baseVal.value - diagramWidth)*dimensions()[0];
    const picHeight = fixImageSize ? container.height.baseVal.value - diagramWidth : (container.height.baseVal.value - diagramWidth)*dimensions()[1];
    const picPadding1 = (container.width.baseVal.value-picWidth)/2;
    const picPadding2 = (container.height.baseVal.value-picHeight)/2;

    const blueLine1 = document.getElementById("blue-line-1");
    const blueLine2 = document.getElementById("blue-line-2");
    const blueLine3 = document.getElementById("blue-line-3");
    const blueLine4 = document.getElementById("blue-line-4");
    const blueCorner1 = document.getElementById("blue-corner-1");
    const blueCorner2 = document.getElementById("blue-corner-2");
    const blueCorner3 = document.getElementById("blue-corner-3");
    const blueCorner4 = document.getElementById("blue-corner-4");
    const blueCorner5 = document.getElementById("blue-corner-5");
    const redSemicircle = document.getElementById("red-semicircle");
    const blueSemicircle = document.getElementById("blue-semicircle");
    const blueLineWidth = (container.width.baseVal.value - diagramWidth)*dimensions()[0];
    const blueLineHeight = (container.height.baseVal.value - diagramWidth)*dimensions()[1];
    const blueLinePadding1 = (container.width.baseVal.value-blueLineWidth)/2;
    const blueLinePadding2 = (container.height.baseVal.value-blueLineHeight)/2;

    if (!useAltSchema) {
        blueLine1.x1.baseVal.value = picWidth + picPadding1 + blueLinePadding;
        blueLine1.y1.baseVal.value = blueLineHeight + blueLinePadding2 + blueLinePadding;
        blueLine1.x2.baseVal.value = picWidth + picPadding1 + blueLinePadding;
        blueLine1.y2.baseVal.value = blueLinePadding2;
        blueLine2.x1.baseVal.value = blueLineWidth + blueLinePadding1 + blueLinePadding;
        blueLine2.y1.baseVal.value = picHeight + picPadding2 + blueLinePadding;
        blueLine2.x2.baseVal.value = blueLinePadding1;
        blueLine2.y2.baseVal.value = picHeight + picPadding2 + blueLinePadding;
        blueCorner1.cx.baseVal.value = picWidth + picPadding1 + blueLinePadding;
        blueCorner1.cy.baseVal.value = blueLineHeight + blueLinePadding2 + blueLinePadding;
        blueLine3.style.display = "none";
        blueLine4.style.display = "none";
        blueCorner1.style.display = "";
        blueCorner3.style.display = "none";
        blueCorner4.style.display = "none";
        blueCorner5.style.display = "none";
        redSemicircle.style.display = "none";
        blueSemicircle.style.display = "none";
    } else {
        // if (game.t1 > 3 && game.t2 > 3) game.zone = 3;
        // else if (game.t1 < 3 && game.t2 > 3) game.zone = 4;
        // else if (game.t1 > 3 && game.t2 < 3) game.zone = 2;
        // else if (game.t1 < 3 && game.t2 < 3) game.zone = 1;
        blueLine3.style.display = "";
        blueLine4.style.display = "";
        blueCorner1.style.display = (game.zone == 1 || game.t1 == 3 && game.t2 == 3 || game.zone == 2 && game.t1 == 3 || game.zone == 4 && game.t2 == 3) ? "" : "none";
        blueCorner3.style.display = (game.zone == 2 || game.t1 == 3 && game.t2 == 3 || game.zone == 1 && game.t1 == 3 || game.zone == 3 && game.t2 == 3) ? "" : "none";
        blueCorner4.style.display = (game.zone == 3 || game.t1 == 3 && game.t2 == 3 || game.zone == 4 && game.t1 == 3 || game.zone == 2 && game.t2 == 3) ? "" : "none";
        blueCorner5.style.display = (game.zone == 4 || game.t1 == 3 && game.t2 == 3 || game.zone == 3 && game.t1 == 3 || game.zone == 1 && game.t2 == 3) ? "" : "none";
        redSemicircle.style.display = (game.zone == 2 || game.t1 == 3 && game.t2 == 3 || game.zone == 1 && game.t1 == 3 || game.zone == 3 && game.t2 == 3) ? "" : "none";
        blueSemicircle.style.display = (game.zone == 4 || game.t1 == 3 && game.t2 == 3 || game.zone == 3 && game.t1 == 3 || game.zone == 1 && game.t2 == 3) ? "" : "none";
        blueLine1.x1.baseVal.value = picWidth + picPadding1 + blueLinePadding;
        blueLine1.y1.baseVal.value = blueLineHeight + blueLinePadding2 + blueLinePadding;
        blueLine1.x2.baseVal.value = picWidth + picPadding1 + blueLinePadding;
        blueLine1.y2.baseVal.value = blueLinePadding2 - blueLinePadding;
        blueLine2.x1.baseVal.value = blueLineWidth + blueLinePadding1 + blueLinePadding;
        blueLine2.y1.baseVal.value = picHeight + picPadding2 + blueLinePadding;
        blueLine2.x2.baseVal.value = blueLinePadding1 - blueLinePadding;
        blueLine2.y2.baseVal.value = picHeight + picPadding2 + blueLinePadding;
        blueLine3.x1.baseVal.value = picPadding1 - blueLinePadding;
        blueLine3.y1.baseVal.value = blueLineHeight + blueLinePadding2 + blueLinePadding;
        blueLine3.x2.baseVal.value = picPadding1 - blueLinePadding;
        blueLine3.y2.baseVal.value = blueLinePadding2 - blueLinePadding;
        blueLine4.x1.baseVal.value = blueLineWidth + blueLinePadding1 + blueLinePadding;
        blueLine4.y1.baseVal.value = picPadding2 - blueLinePadding;
        blueLine4.x2.baseVal.value = blueLinePadding1 - blueLinePadding;
        blueLine4.y2.baseVal.value = picPadding2 - blueLinePadding;
        blueCorner1.cx.baseVal.value = picWidth + picPadding1 + blueLinePadding;
        blueCorner1.cy.baseVal.value = blueLinePadding2 - blueLinePadding;
        blueCorner3.cx.baseVal.value = picPadding1 - blueLinePadding;
        blueCorner3.cy.baseVal.value = blueLinePadding2 - blueLinePadding;
        blueCorner4.cx.baseVal.value = picPadding1 - blueLinePadding;
        blueCorner4.cy.baseVal.value = blueLineHeight + blueLinePadding2 + blueLinePadding;
        blueCorner5.cx.baseVal.value = picWidth + picPadding1 + blueLinePadding;
        blueCorner5.cy.baseVal.value = blueLineHeight + blueLinePadding2 + blueLinePadding;
        redSemicircle.x.baseVal.value = picPadding1 - blueLinePadding - 10;
        redSemicircle.y.baseVal.value = blueLinePadding2 - blueLinePadding - 10;
        blueSemicircle.x.baseVal.value = picWidth + picPadding1 + blueLinePadding - 10;
        blueSemicircle.y.baseVal.value = blueLineHeight + blueLinePadding2 + blueLinePadding - 10;
    }
    // blueCorner3.cx.baseVal.value = picWidth + picPadding1 + blueLinePadding;
    // blueCorner3.cy.baseVal.value = blueLineHeight + blueLinePadding2 + blueLinePadding;
    // blueCorner4.cx.baseVal.value = picWidth + picPadding1 + blueLinePadding;
    // blueCorner4.cy.baseVal.value = blueLineHeight + blueLinePadding2 + blueLinePadding;
    // blueCorner5.cx.baseVal.value = picWidth + picPadding1 + blueLinePadding;
    // blueCorner5.cy.baseVal.value = blueLineHeight + blueLinePadding2 + blueLinePadding;
    
    // if (useAltSchema) {
    //     blueCorner1.style.display = "none";
    //     blueCorner2.style.display = "none";
    //     blueLine1.style.cursor = "auto";
    //     blueLine2.style.cursor = "auto";
    //     blueCorner1.style.cursor = "auto";
    // } else 
    if (fixImageSize) {
        blueCorner2.style.display = "";
        blueCorner2.cx.baseVal.value = blueLineWidth + blueLinePadding1 + blueLinePadding;
        blueCorner2.cy.baseVal.value = picHeight + picPadding2 + blueLinePadding;
        if (dimensions()[0] == 1 && dimensions()[1] == 1) {
            blueLine1.style.cursor = "ew-resize";
            blueLine2.style.cursor = "ns-resize";
            blueCorner1.style.cursor = "all-scroll";
        } else {
            blueLine1.style.cursor = "auto";
            blueLine2.style.cursor = "auto";
            blueCorner1.style.cursor = "ns-resize";
        }
    } else {
        blueCorner2.style.display = "none";
        blueLine1.style.cursor = "ew-resize";
        blueLine2.style.cursor = "ns-resize";
        blueCorner1.style.cursor = "all-scroll";
    }
}

function fixCoords() {
    if (game.coord_1 < 0) game.coord_1 = 0;
    else if (game.coord_1 > 6) game.coord_1 = 6;
    if (game.coord_2 < 0) game.coord_2 = 0;
    else if (game.coord_2 > 6) game.coord_2 = 6;
    if (game.coord_3 < 0) game.coord_3 = 0;
    else if (game.coord_3 > 6) game.coord_3 = 6;
    if (game.coord_4 < 0) game.coord_4 = 0;
    else if (game.coord_4 > 6) game.coord_4 = 6;
}

// function coordsToRhombic(p1,x,b,quad) {
//     function rotate([y1,y2]) {
//         return [(-y1 + Math.sqrt(3)*y2) / 2, (-Math.sqrt(3)*y1 - y2) / 2];
//     }
//     let y1 = -(x % 2 - 1) * (6-b)/6;
//     let y2 = -1/Math.sqrt(3) * (6-b)/6;
//     if (x >= 2 && x != 6) [y1,y2] = rotate([y1,y2]);
//     if (x >= 4 && x != 6) [y1,y2] = rotate([y1,y2]);
//     const goodSide = quad == 1 || (p1 && quad == 2) || (!p1 && quad == 4);
//     if (goodSide) {
//         y1 = -y1;
//         y2 = -y2 + 2/Math.sqrt(3);
//     } else {
//         y1 -= 1;
//         y2 += 1/Math.sqrt(3);
//     }
//     if (!p1) {
//         y1 = -y1;
//     }
//     let game = Game.xb(...coords,quad);
//     return [y1,y2];
// }

// function rhombicToCoords(p1,y1,y2) {
//     const sqrt3 = Math.sqrt(3);
//     function rotate([y1,y2]) {
//         return [(-y1 + sqrt3*y2) / 2, (-sqrt3*y1 - y2) / 2];
//     }
//     let newY1 = y1;
//     let newY2 = y2;
//     let newQuad = quad;
//     if (!p1) {
//         newY1 = -newY1;
//     }
//     const margin = 0.2;
//     if (newY2 < -sqrt3*newY1 && newY2 < sqrt3*(newY1+2) + margin && newY2 > -margin) {
//         newY1 += 1;
//         newY2 -= 1/sqrt3;
//         if (p1) {
//             if (newQuad == 1) newQuad = 4;
//             else if (newQuad == 2) newQuad = 3;
//         } else {
//             if (newQuad == 1) newQuad = 2;
//             else if (newQuad == 4) newQuad = 3;
//         }
//     } else if (newY2 > -sqrt3*newY1 && newY2 > sqrt3*newY1 - margin && newY2 < sqrt3 + margin) {
//         newY1 = -newY1;
//         newY2 = -newY2 + 2/sqrt3;
//         if (p1) {
//             if (newQuad == 4) newQuad = 1;
//             else if (newQuad == 3) newQuad = 2;
//         } else {
//             if (newQuad == 2) newQuad = 1;
//             else if (newQuad == 3) newQuad = 4;
//         }
//     } else {
//         return null;
//     }
//     let x = 0;
//     newY1 = -newY1;
//     for (let i = 0; i < 3 && (newY2 > -newY1/sqrt3 || newY2 > newY1/sqrt3); i++) {
//         [newY1,newY2] = rotate([newY1,newY2]);
//         x = (x + 2) % 6;
//     }
//     let b = (newY2*sqrt3 + 1)*6;
//     x += newY1/(1 - b/6) + 1;
//     if (x > 6) x = 6;
//     else if (x < 0) x = 0;
//     if (b > 6) b = 6;
//     else if (b < 0) b = 0;
//     return [x,b,newQuad];
// }

// function coordsToMatricesAlt(x1,x2,quad) {
//     function mix(x,m1,m2) {
//         let result = [0,0,0,0];
//         for (let i = 0; i < 4; i++)
//             result[i] = x*m2[i]+(1-x)*m1[i];
//         return result;
//     }
//     let rowM = [0,0,0,0];
//     let colM = [0,0,0,0];

//     let m1 = [0,0,0,0];
//     let m2 = [0,0,0,0];
//     let m3 = [0,0,0,0];
//     let m4 = [0,0,0,0];
//     let m5 = [0,0,0,0];
//     let m6 = [0,0,0,0];
//     if (quad == 1) {
//         m1 = [0,6,6,0];
//         m2 = [0,6,0,6];
//         m3 = [6,6,0,0];
//         m4 = [0,6,6,0];
//         m5 = [6,6,0,0];
//         m6 = [0,6,0,6];
//     } else if (quad == 2) {
//         m1 = [6,0,0,6];
//         m2 = [0,6,0,6];
//         m3 = [0,0,6,6];
//         m4 = [0,6,6,0];
//         m5 = [6,6,0,0];
//         m6 = [0,6,0,6];
//     } else if (quad == 3) {
//         m1 = [6,0,0,6];
//         m2 = [0,6,0,6];
//         m3 = [0,0,6,6];
//         m4 = [6,0,0,6];
//         m5 = [6,6,0,0];
//         m6 = [6,0,6,0];
//     } else {
//         m1 = [0,6,6,0];
//         m2 = [0,6,0,6];
//         m3 = [6,6,0,0];
//         m4 = [6,0,0,6];
//         m5 = [6,6,0,0];
//         m6 = [6,0,6,0];
//     }
//     let x1new = (x1+5)%6;
//     let x2new = (x2+5)%6;
//     if (x1new < 2) {
//         rowM = mix((x1new%2)/2,m1,m2);
//     } else if (x1new < 4) {
//         rowM = mix((x1new%2)/2,m2,m3);
//     } else {
//         rowM = mix((x1new%2)/2,m3,m1);
//     }
//     if (x2new < 2) {
//         colM = mix((x2new%2)/2,m4,m5);
//     } else if (x2new < 4) {
//         colM = mix((x2new%2)/2,m5,m6);
//     } else {
//         colM = mix((x2new%2)/2,m6,m4);
//     }
//     return [rowM,colM];
// }

// function altToStandardCoords(x1,x2,b1,b2) {
//     // let y1 = Math.floor(x1/2)*2;
//     // let z1 = x1 % 2;
//     // let s1 = (z1 < 1) ? (z1-1)/(z1+1) + 1 : (z1-1)/(3-z1) + 1;
//     // let y2 = Math.floor(x2/2)*2;
//     // let z2 = x2 % 2;
//     // let s2 = (z2 < 1) ? (z2-1)/(z2+1) + 1 : (z2-1)/(3-z2) + 1;
//     let new_game = Game.balanced(x1,x2,quad);
//     return [new_game.coord_1, new_game.coord_2];
//     // return [y1+s1,y2+s2];
// }

// function standardToAltCoords(x1,x2,b1,b2) {
//     let y1 = Math.floor(x1/2)*2;
//     let z1 = x1 % 2;
//     let s1 = (z1 < 1) ? z1/(2-z1) : (3*z1-2)/z1;
//     let y2 = Math.floor(x2/2)*2;
//     let z2 = x2 % 2;
//     let s2 = (z2 < 1) ? z2/(2-z2) : (3*z2-2)/z2;
//     return [y1+s1,y2+s2];
// }

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
    // if (!diagramGrid) fixImageSize = alt;
    backgroundOutOfDate = true;
    if (useAltSchema && !alt) {
        // game = Game.xb(game.coord_1,game.coord_2,2,2,game.quad);
        game.mode = 0;
        useAltSchema = false;
        button2.classList.remove("selected");
        button1.classList.add("selected");
        const coords1 = [game.coord_1,game.coord_3];
        const coords2 = [game.coord_2,game.coord_4];
        coords = [coords1[0],coords2[0],coords1[1],coords2[1]];

        for (let child of pic.children) {
            child.style.opacity = 1;
        }
        hex1.style.display = "none";
        hex2.style.display = "none";
        hex3.style.display = "none";
    } else if (!useAltSchema && alt) {
        // game = Game.temp(game.coord_1,game.coord_2,3,3,game.quad,game.zone);
        game.mode = 1;
        useAltSchema = true;
        button1.classList.remove("selected");
        button2.classList.add("selected");
        // game.coord_3 = take(game.row_matrix,1);
        // game.coord_4 = take(game.col_matrix,1);
        // [game.coord_1,game.coord_2] = standardToAltCoords(game.coord_1,game.coord_2);

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
    for (let elt of document.getElementsByClassName("show-diagrams")) {
        elt.classList.remove("selected");
    }
    document.getElementById("fix-image-button-0").classList.add("selected");

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

function more_games() {
    diagramGrid = true;
    for (let elt of document.getElementsByClassName("show-diagrams")) {
        elt.classList.remove("selected");
    }
    document.getElementById("fix-image-button-2").classList.add("selected");

    function func(x) {
        if (x < 3.5) return 3;
        return 1;
    }
    num_games = func;

    let element;
    while (element = document.querySelector(".clone")) {
        element.remove();
    }

    if (fixImageSize) {
        fixImageSize = false;
        backgroundOutOfDate = true;
    }

    const diagram = document.getElementById("diagram");
    diagram.style.opacity = 1;
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
        const mult = viewMode == 7 || viewMode == 8 ? 1 : 9;
        const color = colorFunction((1-j/legendCanvas.height)*mult, viewMode);
        for (let i = 0; i < legendCanvas.height; i++) {
            data[(j*legendCanvas.width+i)*4]   = color[0];
            data[(j*legendCanvas.width+i)*4+1] = color[1];
            data[(j*legendCanvas.width+i)*4+2] = color[2];
            data[(j*legendCanvas.width+i)*4+3] = 255;
        }
    }
    ctx.putImageData(imageData,0,0);

    if (viewMode == 8) {
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
    } else if (viewMode == 7) {
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
    downloadLink.download = 'canvas-image-'+viewMode.toString()+'-'+game.quad.toString()+'.png';
    downloadLink.click();
}

function goTo(x1,x2,b1,b2,q) {
    game.x1 = ((x1 + game.conventions[0])*game.conventions[1] + 12) % 6;
    game.x2 = ((x2 + game.conventions[0])*game.conventions[1] + 12) % 6;
    game.b1 = b1;
    game.b2 = b2;
    game.quadrant = q;
    updateBackground();
}

function goToZeroSum(q,i) {
    if (game.coord_3 > 3 && game.coord_4 > 3) {
        alert("There are no zero sum games such that b1=" + game.coord_3.toFixed(1) + " or b2=" + game.coord_4.toFixed(1) + ".");
        return;
    } else if (game.coord_3 > 3) {
        alert("There are no zero sum games such that b1=" + game.coord_3.toFixed(1) + ".");
        return;
    } else if (game.coord_4 > 3) {
        alert("There are no zero sum games such that b2=" + game.coord_4.toFixed(1) + ".");
        return;
    }
    let matrixRow = [0,0,0,6];
    let matrixCol = [0,0,0,0];
    let p1 = 0; // will either be r1 or s1-r1
    let p2 = 0; // will either be r1 or s1-r1
    let b1 = game.coord_3;
    let b2 = game.coord_4;
    if (i == 1) {
        p1 = 6-b2;
        p2 = 6-b1;
    } else {
        p1 = b1;
        p2 = b2;
    }

    switch (q) {
        case 2:
            game.matrices = [[6,p2,0,6-p1],[0,6-p2,6,p1]];
            break;
        case 3:
            game.matrices = [[6,p2,6-p1,0],[0,6-p2,p1,6]];
            break;
        case 4:
            game.matrices = [[6,0,p2,6-p1],[0,6,6-p2,p1]];
            break;
    }
    updateCoords();
}

function hideLines(hide) {
    hiddenLines = hide;
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
    const boundaryPoint1 = document.getElementById("boundary-point-1");
    const boundaryPoint3 = document.getElementById("boundary-point-3");
    const boundaryPoint4 = document.getElementById("boundary-point-4");
    const boundaryPoint5 = document.getElementById("boundary-point-5");
    const boundaryPoint8 = document.getElementById("boundary-point-8");
    const boundaryPoint9 = document.getElementById("boundary-point-9");
    const hotspot1 = document.getElementById("hotspot-1");
    const hotspot2 = document.getElementById("hotspot-2");
    const hotspot3 = document.getElementById("hotspot-3");
    const big_pic_lines_hor = document.getElementsByClassName("big-pic-line-hor");
    const big_pic_lines_ver = document.getElementsByClassName("big-pic-line-ver");

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
        boundaryLine1.style.display = "none";
        boundaryLine2.style.display = "none";
        boundaryLine3.style.display = "none";
        boundaryLine4.style.display = "none";
        boundaryLine5.style.display = "none";
        boundaryLine6.style.display = "none";
        boundaryLine7.style.display = "none";
        boundaryLine8.style.display = "none";
        boundaryLine9.style.display = "none";
        boundaryLine10.style.display = "none";
        boundaryLine11.style.display = "none";
        boundaryLine12.style.display = "none";
        boundaryLine13.style.display = "none";
        boundaryLine14.style.display = "none";
        boundaryLine15.style.display = "none";
        boundaryLine16.style.display = "none";
        boundaryLine17.style.display = "none";
        boundaryLine18.style.display = "none";
        boundaryPoint1.style.display = "none";
        boundaryPoint3.style.display = "none";
        boundaryPoint4.style.display = "none";
        boundaryPoint5.style.display = "none";
        boundaryPoint8.style.display = "none";
        boundaryPoint9.style.display = "none";
        hotspot1.style.display = "none";
        hotspot2.style.display = "none";
        hotspot3.style.display = "none";
        for (let line of big_pic_lines_hor) {
            line.style.display = "none";
        }
        for (let line of big_pic_lines_ver) {
            line.style.display = "none";
        }
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
        boundaryLine1.style.display = "";
        boundaryLine2.style.display = "";
        boundaryLine3.style.display = "";
        boundaryLine4.style.display = "";
        boundaryLine5.style.display = "";
        boundaryLine6.style.display = "";
        boundaryLine7.style.display = "";
        boundaryLine8.style.display = "";
        boundaryLine9.style.display = "";
        boundaryLine10.style.display = "";
        boundaryLine11.style.display = "";
        boundaryLine12.style.display = "";
        boundaryLine13.style.display = "";
        boundaryLine14.style.display = "";
        boundaryLine15.style.display = "";
        boundaryLine16.style.display = "";
        boundaryLine17.style.display = "";
        boundaryLine18.style.display = "";
        boundaryPoint1.style.display = "";
        boundaryPoint3.style.display = "";
        boundaryPoint4.style.display = "";
        boundaryPoint5.style.display = "";
        boundaryPoint8.style.display = "";
        boundaryPoint9.style.display = "";
        hotspot1.style.display = "";
        hotspot2.style.display = "";
        hotspot3.style.display = "";
        for (let line of big_pic_lines_hor) {
            line.style.display = "";
        }
        for (let line of big_pic_lines_ver) {
            line.style.display = "";
        }
    }
}

function returns(game, mode, row_player) {
    switch (mode) {
        case 1: // equilibrium returns
            if (row_player) {
                if (game.row_equilibrium_return_2 == null)
                    return game.row_equilibrium_return;
                else {
                    const checker_size = 0.25;
                    const diagonal1 = (game.coord_1+game.coord_2) % checker_size < checker_size/2;
                    const diagonal2 = (game.coord_1-game.coord_2+6) % checker_size < checker_size/2;
                    if (diagonal1 && diagonal2 || !diagonal1 && !diagonal2)
                        return game.row_equilibrium_return;
                    else
                        return game.row_equilibrium_return_2;
                }
            }
            else {
                if (game.col_equilibrium_return_2 == null)
                    return game.col_equilibrium_return;
                else {
                    const checker_size = 0.25;
                    const diagonal1 = (game.coord_1+game.coord_2) % checker_size < checker_size/2;
                    const diagonal2 = (game.coord_1-game.coord_2+6) % checker_size < checker_size/2;
                    if (diagonal1 && diagonal2 || !diagonal1 && !diagonal2)
                        return game.col_equilibrium_return;
                    else
                        return game.col_equilibrium_return_2;
                }
            }
        case 2: // non-transferable utility backstop
            if (row_player) return game.row_ntu_bs_return;
            else return game.col_ntu_bs_return;
        case 3: // non-transferable utility threat point
            if (row_player) {
                if (game.row_ntu_tp_return_2 == null)
                    return game.row_ntu_tp_return;
                else {
                    const checker_size = 0.25;
                    const diagonal1 = (game.coord_1+game.coord_2) % checker_size < checker_size/2;
                    const diagonal2 = (game.coord_1-game.coord_2+6) % checker_size < checker_size/2;
                    if (diagonal1 && diagonal2 || !diagonal1 && !diagonal2)
                        return game.row_ntu_tp_return;
                    else
                        return game.row_ntu_tp_return_2;
                }
            }
            else {
                if (game.col_ntu_tp_return_2 == null)
                    return game.col_ntu_tp_return;
                else {
                    const checker_size = 0.25;
                    const diagonal1 = (game.coord_1+game.coord_2) % checker_size < checker_size/2;
                    const diagonal2 = (game.coord_1-game.coord_2+6) % checker_size < checker_size/2;
                    if (diagonal1 && diagonal2 || !diagonal1 && !diagonal2)
                        return game.col_ntu_tp_return;
                    else
                        return game.col_ntu_tp_return_2;
                }
            }
        case 4: // transferable utility backstop
            if (row_player) return game.row_tu_bs_return;
            else return game.col_tu_bs_return;
        case 5: // transferable utility threat point
            if (row_player) return game.row_tu_tp_return;
            else return game.col_tu_tp_return;
        case 6: // max total
            return game.max_total;
        case 7: // correlation
            return game.correlation;
        case 8: // custom difference
            return payoffCustom(game);
        case 9: // backstop
            if (row_player)
                return game.backstop[0];
            else
                return game.backstop[1];
        case 10: // threat points
            if (row_player) {
                if (game.threat_point_2 == null)
                    return game.threat_point[0];
                else {
                    const checker_size = 0.25;
                    const diagonal1 = (game.coord_1+game.coord_2) % checker_size < checker_size/2;
                    const diagonal2 = (game.coord_1-game.coord_2+6) % checker_size < checker_size/2;
                    if (diagonal1 && diagonal2 || !diagonal1 && !diagonal2)
                        return game.threat_point[0];
                    else
                        return game.threat_point_2[0];
                }
            }
            else {
                if (game.threat_point_2 == null)
                    return game.threat_point[1];
                else {
                    const checker_size = 0.25;
                    const diagonal1 = (game.coord_1+game.coord_2) % checker_size < checker_size/2;
                    const diagonal2 = (game.coord_1-game.coord_2+6) % checker_size < checker_size/2;
                    if (diagonal1 && diagonal2 || !diagonal1 && !diagonal2)
                        return game.threat_point[1];
                    else
                        return game.threat_point_2[1];
                }
            }
    }
}

function change_conventions(offset, inversion) {
    game.conventions = [offset,inversion];
    for (let elt of document.getElementsByClassName("convention-button")) {
        elt.classList.remove("selected");
    }
    const selected_button = document.getElementById("convention-" + offset.toString() + (inversion == -1 ? "-inverted" : ""));
    selected_button.classList.add("selected");

    update_rgb_lines();
}

function update_rgb_lines() {
    const color1 = !useAltSchema || game.zone_row == 0 ? "red" : "blue";
    const color2 = !useAltSchema || game.zone_col == 0 ? "red" : "blue";
    const redLinesHor = document.getElementsByClassName("red-line-hor");
    const greenLinesHor = document.getElementsByClassName("green-line-hor");
    const redLinesVer = document.getElementsByClassName("red-line-ver");
    const greenLinesVer = document.getElementsByClassName("green-line-ver");
    const corners = document.getElementsByClassName("pic-corner");
    const bigPicLinesHor = document.getElementsByClassName("big-pic-line-hor");
    const bigPicLinesVer = document.getElementsByClassName("big-pic-line-ver");
    if (game.offset % 2 == 0) {
        for (let line of redLinesHor) {
            line.style.stroke = color2;
        }
        for (let line of redLinesVer) {
            line.style.stroke = color1;
        }
        for (let line of greenLinesHor) {
            line.style.stroke = "green";
        }
        for (let line of greenLinesVer) {
            line.style.stroke = "green";
        }
        for (let line of bigPicLinesHor) {
            line.style.stroke = "green";
        }
        for (let line of bigPicLinesVer) {
            line.style.stroke = "green";
        }
        for (let circle of corners) {
            circle.style.fill = "green";
        }
    } else {
        for (let line of redLinesHor) {
            line.style.stroke = "green";
        }
        for (let line of redLinesVer) {
            line.style.stroke = "green";
        }
        for (let line of greenLinesHor) {
            line.style.stroke = color2;
        }
        for (let line of greenLinesVer) {
            line.style.stroke = color1;
        }
        for (let line of bigPicLinesHor) {
            line.style.stroke = color2;
        }
        for (let line of bigPicLinesVer) {
            line.style.stroke = color1;
        }
        for (let circle of corners) {
            circle.style.fill = color1;
        }
    }
}

function updateDegenerateGames() {
    // function proximity_color(x) {
    //     let color = [0,0,0];
    //     color[0] = 255*(Math.pow(x/36,0.5)+0.5)/1.5;
    //     color[1] = 255*(1-Math.pow(x/36,0.25))/3;
    //     color[2] = 255*(1-Math.pow(x/36,0.25))/3;
    //     return `rgb(${color[0]}, ${color[1]}, ${color[2]})`;
    // }
    // const sorted_row = game.row_matrix.toSorted();
    // const sorted_col = game.col_matrix.toSorted();
    // const row_intervals = [0,0,0];
    // const col_intervals = [0,0,0];
    // for (let i = 0; i < 3; i++) {
    //     row_intervals[i] = sorted_row[i+1] - sorted_row[i];
    //     col_intervals[i] = sorted_col[i+1] - sorted_col[i];
    // }

    // update degenerate games
    for (let elt of document.getElementsByClassName("degen-game")) {
        elt.style.color = "black";
    }
    const x1base = (game.coord_1*game.conventions[1] - game.conventions[0] + 12) % 6;
    const x2base = (game.coord_2*game.conventions[1] - game.conventions[0] + 12) % 6;
    // type 11
    const degen_game_11 = document.getElementById("degen-game-11-" + game.quad.toString());
    degen_game_11.style.color = "red";
    // type X1
    const red1 = Math.floor(x1base/2) % 3;
    const green1 = Math.round(x1base/2) % 3;
    let sign_X1;
    switch (red1) {
        case 0:
            if (game.quad == 1 || game.quad == 3) sign_X1 = "+";
            else sign_X1 = "-";
            break;
        case 1:
            if (game.quad == 1 || game.quad == 2) sign_X1 = "+";
            else sign_X1 = "-";
            break;
        case 2:
            if (game.quad == 1 || game.quad == 4) sign_X1 = "+";
            else sign_X1 = "-";
            break;
    }
    const degen_game_X1 = document.getElementById("degen-game-" + ["D","C","R"][red1] + "1" + sign_X1);
    degen_game_X1.style.color = "red";
    // type 1X
    const red2 = Math.floor(x2base/2) % 3;
    const green2 = Math.round(x2base/2) % 3;
    let sign_1X;
    switch (red2) {
        case 0:
            if (game.quad == 1 || game.quad == 3) sign_1X = "+";
            else sign_1X = "-";
            break;
        case 2:
            if (game.quad == 1 || game.quad == 2) sign_1X = "+";
            else sign_1X = "-";
            break;
        case 1:
            if (game.quad == 1 || game.quad == 4) sign_1X = "+";
            else sign_1X = "-";
            break;
    }
    const degen_game_1X = document.getElementById("degen-game-1" + ["D","R","C"][red2] + sign_1X);
    degen_game_1X.style.color = "red";
    // type XX
    let sign_XX = "";
    if (["D","C","R"][red1] == ["D","R","C"][red2]) {
        switch (red1) {
            case 0:
                if (game.quad == 1 || game.quad == 3) sign_XX = "+";
                else sign_XX = "-";
                break;
            case 1:
                if (game.quad == 1 || game.quad == 2) sign_XX = "+";
                else sign_XX = "-";
                break;
            case 2:
                if (game.quad == 1 || game.quad == 4) sign_XX = "+";
                else sign_XX = "-";
                break;
        }
    }
    const degen_game_XX = document.getElementById("degen-game-" + ["D","C","R"][red1] + ["D","R","C"][red2] + sign_XX);
    degen_game_XX.style.color = "red";
    // type 31
    let type_31 = "";
    if (game.quad == 2 && green1 == 0 || game.quad == 4 && green1 == 1 || game.quad == 3 && green1 == 2) {
        type_31 = "s";
    } else if (game.quad == 1 && green1 == 0 || game.quad == 3 && green1 == 1 || game.quad == 4 && green1 == 2) {
        type_31 = "c";
    } else if (game.quad == 3 && green1 == 0 || game.quad == 1 && green1 == 1 || game.quad == 2 && green1 == 2) {
        type_31 = "r";
    } else {
        type_31 = "d";
    }
    const degen_game_31 = document.getElementById("degen-game-31" + type_31);
    degen_game_31.style.color = "red";
    // type 13
    let type_13 = "";
    if (game.quad == 4 && green2 == 0 || game.quad == 2 && green2 == 1 || game.quad == 3 && green2 == 2) {
        type_13 = "s";
    } else if (game.quad == 3 && green2 == 0 || game.quad == 1 && green2 == 1 || game.quad == 4 && green2 == 2) {
        type_13 = "c";
    } else if (game.quad == 1 && green2 == 0 || game.quad == 3 && green2 == 1 || game.quad == 2 && green2 == 2) {
        type_13 = "r";
    } else {
        type_13 = "d";
    }
    const degen_game_13 = document.getElementById("degen-game-13" + type_13);
    degen_game_13.style.color = "red";
    // type X3
    let sign_X3 = [2,1,0][green2] == red1;
    switch (red1) {
        case 0:
            if (game.quad == 1 || game.quad == 3) sign_X3 = !sign_X3;
            break;
        case 1:
            if (game.quad == 1 || game.quad == 2)  sign_X3 = !sign_X3;
            break;
        case 2:
            if (game.quad == 1 || game.quad == 4) sign_X3 = !sign_X3;
            break;
    }
    const degen_game_X3 = document.getElementById("degen-game-" + ["D","C","R"][red1] + "3" + (sign_X3 ? "+" : "-"));
    degen_game_X3.style.color = "red";
    // type 3X
    let sign_3X = [2,1,0][green1] == red2;
    switch (red2) {
        case 0:
            if (game.quad == 1 || game.quad == 3) sign_3X = !sign_3X;
            break;
        case 1:
            if (game.quad == 1 || game.quad == 4) sign_3X = !sign_3X;
            break;
        case 2:
            if (game.quad == 1 || game.quad == 2) sign_3X = !sign_3X;
            break;
    }
    const degen_game_3X = document.getElementById("degen-game-3" + ["D","R","C"][red2] + (sign_3X ? "+" : "-"));
    degen_game_3X.style.color = "red";
    // type 33
    let type_33;
    if ((2-(green2+1)%3) == green1) {
        type_33 = game.quad + 2;
    } else if (green1 == green2) {
        type_33 = game.quad;
    } else if ((green1+1)%3+1 == green2) {
        type_33 = game.quad + (game.quad % 2 * 2 - 1);
    } else {
        type_33 = 5 - game.quad;
    }
    const degen_game_33 = document.getElementById("degen-game-33" + ["c","d","r","s"][type_33 % 4]);
    degen_game_33.style.color = "red";
}

function set_coords(x1,x2,b1,b2) {
    if (x1 != null) {
        if (!useAltSchema) game.coord_1 = x1;
        else game.y1 = x1;
    }
    if (x2 != null) {
        if (!useAltSchema) game.coord_2 = x2;
        else game.y2 = x2;
    }
    if (b1 != null) {
        if (!useAltSchema) game.coord_3 = b1;
        else game.t1 = b1;
    }
    if (b2 != null) {
        if (!useAltSchema) game.coord_4 = b2;
        else game.t2 = b2;
    }
}

function dimensions() {
    if (!useAltSchema) {
        return [1-game.b1/6, 1-game.b2/6];
    } else {
        return [1-Math.abs(game.t1-3)/3, 1-Math.abs(game.t2-3)/3];
    }
}

function render_background(picWidth,picHeight,picPadding1,picPadding2) {
    // res = 1 denotes full resolution. Use smaller values to decrease the resolution.
    const foreignObject = document.getElementById("canvasForeignObject");
    const canvas = document.getElementById("canvas");

    // update the size of the canvas
    foreignObject.x.baseVal.value = picPadding1;
    foreignObject.y.baseVal.value = picPadding2;
    foreignObject.width.baseVal.value = picWidth;
    foreignObject.height.baseVal.value = picHeight;
    canvas.width = picWidth;
    canvas.height = picHeight;

    const high_res = (dimensions()[0] != 1 && dimensions()[1] != 1 || !isMouseDown && !x1up && !x1down && !x2up && !x2down) && 
                     !draggingB1 && !draggingB2 && !b1up && !b1down && !b2up && !b2down && b1V == 0 && b2V == 0;
    // if (!high_res && viewMode != 0 && viewMode != 11) {
    //     valuesX = 6*Math.round(picWidth/30);
    //     valuesY = 6*Math.round(picHeight/30);
    //     values = [];
    //     for (let j = 0; j < valuesY; j++) {
    //         values.push([]);
    //         for (let i = 0; i < valuesX; i++) {
    //             let new_game = game.use_conventions((i+0.5)/valuesX*6, (valuesY-j-0.5)/valuesY*6, game.coord_3, game.coord_4, game.quad);
    //             values[j].push(returns(new_game,viewMode,viewModeP1));
    //         }
    //     }
    // }
    switchMode = false;
    backgroundOutOfDate = false;

    const pixel_size = [Math.ceil(canvas.width/30), Math.ceil(canvas.height/30)];
    if (pixel_size[0] == 0 || pixel_size[1] == 0) return;
    const ctx = canvas.getContext("2d");
    const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
    const data = imageData.data;
    let color;
    for (let j = 0; j < canvas.height; j++) {
        for (let i = 0; i < canvas.width; i++) {
            if (high_res || i % pixel_size[0] == 0) {
                if (viewMode == 0) {
                    const new_game = game.use_conventions(i/canvas.width*6, (canvas.height-j)/canvas.height*6, game.coord_3, game.coord_4, game.quad);
                    color = new_game.equilibrium_color;
                } else if (viewMode == 11) {
                    const new_game = game.use_conventions(i/canvas.width*6, (canvas.height-j)/canvas.height*6, game.coord_3, game.coord_4, game.quad);
                    color = new_game.quadrant_color;
                } else if (viewMode == 12) {
                    color = [255,255,255];
                } else {
                    let value = 0;
                    // if (high_res) {
                    let new_game = game.use_conventions(i/canvas.width*6, (canvas.height-j)/canvas.height*6, game.coord_3, game.coord_4, game.quad);
                    value = returns(new_game,viewMode,viewModeP1);
                    // } else {
                    //     const weight1 = i/canvas.width*valuesX % 1;
                    //     const weight2 = j/canvas.height*valuesY % 1;
                    //     value = values[Math.floor(j/canvas.height*valuesY)][Math.floor(i/canvas.width*valuesX)] * (1-weight1) * (1-weight2) +
                    //             values[Math.floor(j/canvas.height*valuesY)%valuesY][Math.ceil(i/canvas.width*valuesX)%valuesX] * weight1 * (1-weight2) +
                    //             values[Math.ceil(j/canvas.height*valuesY)%valuesY][Math.floor(i/canvas.width*valuesX)%valuesX] * (1-weight1) * weight2 +
                    //             values[Math.ceil(j/canvas.height*valuesY)%valuesY][Math.ceil(i/canvas.width*valuesX)%valuesX] * weight1 * weight2;
                    // }
                    color = colorFunction(value, viewMode);
                }
            }

            data[(j*canvas.width+i)*4]   = color[0];
            data[(j*canvas.width+i)*4+1] = color[1];
            data[(j*canvas.width+i)*4+2] = color[2];
            data[(j*canvas.width+i)*4+3] = 255;
        }
    }
    ctx.putImageData(imageData,0,0);
}


// bugs
// sometimes switching from blue to temp changes the game

// add parameter for transferable utility
// add means

// going through corners
// show discontinuities?
// formatting
// update growbox() (bugged) (including for balanced games)
// dragging lines in balanced games

// update balanced games
// when asdw released, update render
// remove constant rendering
// change the condition for rendering mixed equilibria


// change conventions to break equilibrium quads and put hotspots on the diagonal