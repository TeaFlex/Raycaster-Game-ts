import { Player } from "@/model/Player";
import { BufferGeometry, Line, LineBasicMaterial, Points, PointsMaterial, Vector2 } from "three";
import { AElement } from "./AElement";

export class PlayerElement extends AElement {
    
    private sightDirection: Line;
    private dotPlayer: Points;

    constructor(private logic: Player) {
        super();
        const size = 8;
        const lsize = 4*size;
        const pos =  new Vector2(0, 0);

        const pgeometry = new BufferGeometry().setFromPoints([
            pos
        ]);
        const pmaterial = new PointsMaterial({
            size,
            color: 0xffcc00,
        });

        const lx = lsize * Math.cos(this.logic.angle);
        const ly = lsize * Math.sin(this.logic.angle);

        const lgeometry = new BufferGeometry().setFromPoints([
            pos, 
            new Vector2(lx, ly),
        ]);
        const lmaterial = new LineBasicMaterial({ 
            color: 0xff0000,
        });

        this.dotPlayer = new Points(pgeometry, pmaterial);
        this.sightDirection = new Line(lgeometry, lmaterial);

        this.addToElement(
            this.dotPlayer,
            this.sightDirection,
        );

        this.entity.position.set(this.logic.x, this.logic.y, 0);
    }

    drawElement() {
        this.entity.position.set(this.logic.x, this.logic.y, 0);
        const sightPoints: number[] = (this.sightDirection.geometry.attributes as any).position.array;

        const length = Math.round(Math.sqrt(((sightPoints[3]**2)+(sightPoints[4]**2))));
        
        sightPoints[3] = length * Math.cos(this.logic.angle);
        sightPoints[4] = length * Math.sin(this.logic.angle);
        
        (this.sightDirection.geometry.attributes as any).position.needsUpdate = true;
    }
}