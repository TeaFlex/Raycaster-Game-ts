import { Game } from "@/model/logic/Game";
import { Color, Group, Mesh, MeshBasicMaterial, PlaneGeometry } from "three";
import { AElement } from "./AElement";

export class CameraElement extends AElement {

    private wallParts: Mesh[] = [];
    private width: number;
    private height: number;
    private background: Group;

    constructor(logic: Game) {
        super(logic);

        this.width = this.logic.map.getBlockSize()*this.logic.map.getSide();
        this.height = this.width*(9/16);
        const geometry = new PlaneGeometry(this.width, this.height/2);
        const material = new MeshBasicMaterial();
        
        //sky
        material.color = new Color(0x0066ff);
        const upbg = new Mesh(geometry, material.clone());
        upbg.position.setY(this.height/4);

        //ground
        material.color = new Color(0x00dd66);
        const downbg = new Mesh(geometry, material.clone());
        downbg.position.setY(-this.height/4);

        const background = new Group();
        background.add(upbg, downbg);
        background.position.setX(this.width/2);
        background.position.setZ(-0.1);

        this.background = background;

        const wPart = this.width/this.logic.data.length;

        for(let i=this.logic.data.length-1; i>=0; i--) {
            const dist = this.logic.data[i].distance;

            const pGeo = new PlaneGeometry(wPart, 10);
            const pMat = new MeshBasicMaterial();
            const part = new Mesh(pGeo, pMat);
            part.position.setX(wPart/2);
            part.position.x+=i*wPart;
            this.wallParts.push(part);
        }
    }

    drawElement() {
        this.addToElement(
            this.background,
            ...this.wallParts,
        );
        this.updateElement();
    }

    updateElement() {
        for (let i = 0; i< this.wallParts.length; i++) {
            const part = this.wallParts[i];
            const data = this.logic.data[i];
            let dis = data.distance;

            dis = dis*Math.cos(this.logic.player.angle - data.angle);
            
            let h = this.logic.map.getSide()*this.height/dis;

            if(h > this.height/10) h=this.height/10;
            
            part.scale.set(1, h, 0);

            const color = (data.side === "h")? 0xff00ff: 0xff00bb;
            (part.material as MeshBasicMaterial).color = new Color(color);
            
        }
    }
}