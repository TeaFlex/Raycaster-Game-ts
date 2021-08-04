import { Game } from "@/model/logic/Game";
import { Color, Group, Mesh, MeshBasicMaterial, PlaneGeometry } from "three";
import { AElement } from "./AElement";

export class CameraElement extends AElement {

    private wallParts: Mesh[] = [];

    constructor(logic: Game) {
        super(logic);

        const w = this.logic.map.getBlockSize()*this.logic.map.getSide();
        const h = w*(9/16);
        const geometry = new PlaneGeometry(w, h/2);
        const material = new MeshBasicMaterial();
        
        //sky
        material.color = new Color(0x0066ff);
        const upbg = new Mesh(geometry, material.clone());
        upbg.position.setY(h/4);

        //ground
        material.color = new Color(0x00dd66);
        const downbg = new Mesh(geometry, material.clone());
        downbg.position.setY(-h/4);

        const background = new Group();
        background.add(upbg, downbg);
        background.position.setX(w/2);

        this.addToElement(
            background,
        );

        const wPart = w/this.logic.distances.length;

        for(let i=0; i<this.logic.distances.length; i++) {
            const dist = this.logic.distances[i];

        }
    }

    drawElement() {
        
    }

    updateElement() {

    }
}