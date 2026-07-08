export class Game {
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
