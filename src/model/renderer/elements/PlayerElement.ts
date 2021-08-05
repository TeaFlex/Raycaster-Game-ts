import { Game } from "@/model/logic/Game";
import { Player } from "@/model/logic/Player";
import { getXProjection, getYProjection } from "@/model/utils/trigonometric";
import { 
    BufferGeometry, 
    Line, 
    LineBasicMaterial, 
    Points, 
    PointsMaterial,
    Vector2 
} from "three";
import { AElement } from "./AElement";

export class PlayerElement extends AElement {
    
    private sightDirection: Line;
    private dotPlayer: Points;
    private rays: Line[] = [];
    private psize = 8;
    private lsize = 4*this.psize;
    private player: Player;

    constructor(logic: Game) {
        super(logic);
        this.player = this.logic.player;
        const pos =  new Vector2(0, 0);
        const lx = getXProjection(this.lsize, this.player.angle);
        const ly = getYProjection(this.lsize, this.player.angle);
        
        //rays
        for(let i = this.player.rays.length; i>0; i--) {
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

        this.entity.position.set(this.player.x, this.player.y, 0);
    }

    drawElement() {
        this.addToElement(
            this.dotPlayer,
            this.sightDirection,
            ...this.rays
        );
        this.updateElement();
    }

    updateElement() {
        //Changing the position of the group.
        this.entity.position.set(this.player.x, this.player.y, 0);
        const sightPoints: number[] = (this.sightDirection.geometry.attributes as any).position.array;
        
        //coords of where the sight ray is pointing at.
        sightPoints[3] = getXProjection(this.lsize, this.player.angle);
        sightPoints[4] = getYProjection(this.lsize, this.player.angle);
        
        (this.sightDirection.geometry.attributes as any).position.needsUpdate = true;

        for (let i = 1; i <= this.rays.length; i++) {
            const ray = this.rays[i-1];
            const rayPoints = (ray.geometry.attributes as any).position.array;

            rayPoints[3] = this.player.rays[i-1].x;
            rayPoints[4] = this.player.rays[i-1].y;

            (ray.geometry.attributes as any).position.needsUpdate = true;
        }
    }
}