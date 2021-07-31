import { Player } from "@/model/logic/Player";
import { BufferGeometry, Line, LineBasicMaterial, Points, PointsMaterial, Vector2 } from "three";
import { AElement } from "./AElement";

export class PlayerElement extends AElement {
    
    private sightDirection: Line;
    private dotPlayer: Points;
    private rays: Line[] = [];
    private psize = 8;
    private lsize = 4*this.psize;

    constructor(private logic: Player) {
        super();
        const pos =  new Vector2(0, 0);
        const oneDegree = 0.0174533;
        const lx = this.lsize * Math.cos(this.logic.angle);
        const ly = this.lsize * Math.sin(this.logic.angle);
    
        //rays
        for(let i = 90; i>0; i--) {
            const rgeometry = new BufferGeometry().setFromPoints([
                pos, 
                new Vector2(lx, ly),
            ]);
            const rmaterial = new LineBasicMaterial({ color: 0x00ff00, });

            this.rays.push(new Line(rgeometry, rmaterial));
        }

        //sight line
        const lgeometry = new BufferGeometry().setFromPoints([
            pos, 
            new Vector2(lx, ly),
        ]);
        const lmaterial = new LineBasicMaterial({ color: 0xff0000, });

        //player point
        const pgeometry = new BufferGeometry().setFromPoints([pos]);
        const pmaterial = new PointsMaterial({
            size: this.psize,
            color: 0xffcc00,
        });

        

        this.dotPlayer = new Points(pgeometry, pmaterial);
        this.sightDirection = new Line(lgeometry, lmaterial);

        this.addToElement(
            this.dotPlayer,
            this.sightDirection,
            ...this.rays
        );

        this.entity.position.set(this.logic.x, this.logic.y, 0);
    }

    drawElement() {
        //Changing the position of the group.
        this.entity.position.set(this.logic.x, this.logic.y, 0);
        const sightPoints: number[] = (this.sightDirection.geometry.attributes as any).position.array;
        
        //coords of where the sight ray is pointing at.
        sightPoints[3] = this.lsize * Math.cos(this.logic.angle);
        sightPoints[4] = this.lsize * Math.sin(this.logic.angle);
        
        (this.sightDirection.geometry.attributes as any).position.needsUpdate = true;

        const oneDegree = 0.0174533;

        for (let i = 1; i <= this.rays.length; i++) {
            const rangle = this.logic.angle - ((this.rays.length/2)*oneDegree) + (i*oneDegree);
            const ray = this.rays[i-1];
            const rayPoints = (ray.geometry.attributes as any).position.array;

            const length = Math.round(Math.sqrt(((rayPoints[3]**2)+(rayPoints[4]**2)))) + 100;

            rayPoints[3] = length * Math.cos(rangle);
            rayPoints[4] = length * Math.sin(rangle);

            (ray.geometry.attributes as any).position.needsUpdate = true;
        }
    }

    updateElement() {
        this.drawElement();
    }
}