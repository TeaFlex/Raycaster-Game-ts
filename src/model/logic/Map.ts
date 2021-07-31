export class Map {
    private width: number;
    private heigth: number;

    constructor(
        private content: number[], 
        private blockSize = 64
    ) {
        this.width = Math.sqrt(content.length);
        this.heigth = this.width;
    }

    getSide() { return this.width; }
    setSide(side: number) { 
        if(side >= 5) {
            this.width = side;
            this.heigth = side;
        }
    }

    getContent() {
        return this.content;
    }

    getBlockSize() {
        return this.blockSize;
    }
}