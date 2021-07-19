export class Map {
    
    public map: number[];
    private lengthX: number;
    private heightY: number;
    private size: number;

    constructor(length = 8, height = 8) {
        this.lengthX = length;
        this.heightY = height;
        this.size = this.getSize();
        this.map = [
            1,1,1,1,1,1,1,1,
            1,0,0,1,0,0,0,1,
            1,1,0,1,0,0,0,1,
            1,0,0,0,0,1,1,1,
            1,0,0,0,0,0,0,1,
            1,0,0,0,0,0,0,1,
            1,0,1,0,0,0,0,1,
            1,1,1,1,1,1,1,1,
        ];
    }

    setLengthX(length: number) {
        if(length > 0)
            this.lengthX = length;
    }

    setHeightY(height: number) {
        if(length > 0)
            this.heightY = height;
    }

    getLengthX() { return this.lengthX; }

    getHeightY() { return this.heightY; }

    getSize() { return this.lengthX*this.heightY; }
}