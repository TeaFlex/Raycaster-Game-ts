import { Game } from "@/model/logic/Game";
import { Map } from "@/model/logic/Map";
import { Mesh, MeshBasicMaterial, PlaneGeometry } from "three";
import { colorArray } from "../enums/ColorDictionnary";
import { AElement } from "./AElement";

export class MapElement extends AElement{
    
    private map: Map;
    
    constructor(logic: Game) {
        super(logic);
        this.map = this.logic.map;
    }

    drawElement() {
        const blockSize = this.map.getBlockSize();

        for(let y = 0; y<this.map.getSide(); y++) {
            for(let x = 0; x<this.map.getSide(); x++) {   
                const i = y*this.map.getSide()+x;   
                const data = this.map.getContent()[i]; 
                const color = (data === 0)? 0x000000 : colorArray[data-1][0];
                const geometry = new PlaneGeometry(blockSize-1, blockSize-1);
                const material = new MeshBasicMaterial({ color });
                const square = new Mesh(geometry, material);
                square.position.set(x*blockSize, Math.abs(y-(this.map.getSide()-1))*blockSize, 0);
                this.addToElement(square);
            }
        }

        this.entity.position.setX(-((blockSize*this.map.getSide())-(blockSize/2)));
        
        this.entity.position.setY(-((blockSize*this.map.getSide())-(9*blockSize)/2));

        this.entity.position.setZ(-0.1);
    }

    getBlockSize() {
        return this.map.getBlockSize();
    }
}