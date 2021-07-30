import { DoubleSide, Group, Mesh, MeshBasicMaterial, PlaneGeometry } from "three";

export class Map {
    
    public entity: Group;
    public map: number[];
    private lengthX: number;
    private heightY: number;
    private size: number;

    constructor(length = 8, height = 8, blockSize?: number) {
        this.entity = new Group();
        this.lengthX = length;
        this.heightY = height;
        this.size = this.getSize();
        this.map = [
            1,1,1,1,1,1,1,1,
            1,0,0,0,0,0,0,1,
            1,1,1,0,0,1,1,1,
            1,1,0,0,0,0,1,1,
            1,0,0,1,1,0,0,1,
            1,0,1,1,1,1,0,1,
            1,0,1,0,0,1,0,1,
            1,1,1,1,1,1,1,1,
        ];

        blockSize = blockSize ?? this.size;

        for(let y = 0; y<this.heightY; y++) {
            for(let x = 0; x<this.lengthX; x++) {
                const color = (this.map[y*this.lengthX+x] === 1)? 0xffffff : 0x000000;
                const geometry = new PlaneGeometry(blockSize-1, blockSize-1);
                const material = new MeshBasicMaterial({
                    color,
                    side: DoubleSide
                });
                const square = new Mesh(geometry, material);
                square.position.set(x*blockSize, y*blockSize, 0);
                this.entity.add(square);
            }
        }

        //this.entity.rotateX(Math.PI);
        this.entity.translateX(-((blockSize*this.lengthX)-(blockSize/2)));
        this.entity.translateY(-((blockSize*this.lengthX)/2-(blockSize/2)));
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