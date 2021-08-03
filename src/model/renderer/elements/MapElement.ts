import { Map } from "@/model/logic/Map";
import { DoubleSide, Mesh, MeshBasicMaterial, PlaneGeometry } from "three";
import { AElement } from "./AElement";

export class MapElement extends AElement{
    constructor(private logic: Map) {
        super();
    }

    drawElement() {
        const blockSize = this.logic.getBlockSize();

        for(let y = 0; y<this.logic.getSide(); y++) {
            for(let x = 0; x<this.logic.getSide(); x++) {                
                const color = (this.logic.getContent()[y*this.logic.getSide()+x] === 0)? 0x000000 : 0xffffff;
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

        this.entity.position.setX(-((blockSize*this.logic.getSide())-(blockSize/2)));
        
        this.entity.position.setY((blockSize*this.logic.getSide())/2-(blockSize/2));

        this.entity.position.setZ(-0.1);

        this.entity.rotateX(Math.PI);
    }

    getBlockSize() {
        return this.logic.getBlockSize();
    }
}