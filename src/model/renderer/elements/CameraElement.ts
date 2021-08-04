import { Game } from "@/model/logic/Game";
import { Color, Mesh, MeshBasicMaterial, PlaneGeometry } from "three";
import { AElement } from "./AElement";

export class CameraElement extends AElement {
    constructor(private logic: Game) {
        super();

        const w = this.logic.map.getBlockSize()*this.logic.map.getSide();
        const h = w*(9/16);
        const geometry = new PlaneGeometry(w, h/2);
        const material = new MeshBasicMaterial();
        
        //sky
        material.color = new Color(0x0066ff);
        const upbg = new Mesh(geometry, material.clone());
        upbg.position.setX(w/2);
        upbg.position.setY(h/4);

        //ground
        material.color = new Color(0x00ddaa);
        const downbg = new Mesh(geometry, material.clone());
        downbg.position.setX(w/2);
        downbg.position.setY(-h/4);

        this.addToElement(
            upbg,
            downbg,
        );
    }

    drawElement() {
        
    }

    updateElement() {

    }
}