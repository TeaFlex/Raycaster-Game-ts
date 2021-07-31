export class Map {
    private width: number;
    private heigth: number;
    private content: number[];

    constructor(content: number[]) {
        this.content = content;
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
}