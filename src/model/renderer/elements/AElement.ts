import { Game } from "@/model/logic/Game";
import { Group, Object3D } from "three";

export abstract class AElement {
    public entity: Group;
    
    constructor(protected logic: Game) {
        this.entity = new Group();
    }

    addToElement(...objects: Object3D[]) {
        for (const obj of objects)
            this.entity.add(obj);
    }

    abstract drawElement(): void;

    updateElement() {}
}