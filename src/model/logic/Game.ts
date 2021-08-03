import { getXProjection, getYProjection, oneDegree } from "../utils/trigonometric";
import { Map } from "./Map";
import { Player } from "./Player";

export class Game {
    public player: Player;
    public map: Map;

    constructor(map?: number[], px?: number, py?: number) {
        this.map = new Map(map ?? [
            1,1,1,1,1,1,1,1,
            1,0,1,0,0,0,0,1,
            1,0,1,0,0,0,0,1,
            1,0,1,0,0,0,0,1,
            1,0,0,0,0,0,0,1,
            1,0,0,0,0,1,0,1,
            1,0,0,0,0,0,0,1,
            1,1,1,1,1,1,1,1,
        ]);
        this.player = new Player(px, py);
        this.calculateRays3D();
    }

    rotatePlayer(step?: number) {
        this.player.rotate(step);
        this.calculateRays3D();
    }

    movePlayer(step?: number) {
        this.player.move(step);
        this.calculateRays3D();
    }

    calculateRays3D() {
        let dof, xo = 0, yo = 0, mx, my, mp;
        let ra = this.player.angle;
        
        for(let i = 1; i<=this.player.rayQuantity; i++) {
            dof = 0
            
            const ray = this.player.rays[i-1];
            ra = this.player.angle - ((Math.round(this.player.rayQuantity/2))*oneDegree) + (i*oneDegree);
            const sin = Math.sin(ra);
            // ray.x = getXProjection(this.player.rayLength, ra);
            // ray.y = getYProjection(this.player.rayLength, ra);
            
            
            if(ra > Math.PI) { ///bas
                ray.y = ((this.player.y>>6)<<6) -(64*(0**Math.abs(this.player.y))) - this.player.y;
                ray.x = getXProjection(ray.y/sin, ra);
                xo = this.player.x + ray.x;
                yo = -64;
                console.log("bas");
            }
            if(ra < Math.PI && ra != 0) { //haut
                ray.y = ((this.player.y>>6)<<6) + 64 - this.player.y;
                ray.x = getXProjection(ray.y/sin, ra);
                xo = this.player.x + ray.x;
                yo = 64;
                console.log("haut");
            }
            if(ra == 0 || ra == Math.PI) {
                ray.x = this.player.x;
                ray.y = this.player.y;
                dof = 8;
            }
            
            // console.log(this.player.position);
            console.log(ray);
            
            
            
            while(dof < 8) {
                mx=Math.round(ray.x >> 6);
                my=Math.round(ray.y >> 6);
                mp = my*this.map.getSide()+mx;
                if((mp<this.map.getSide()**2) && (this.map.getContent()[mp] == 1)) dof = 8;
                else {
                    
                    ray.x+=xo;
                    ray.y+=yo;
                    dof++;
                }
            }
        }
    }
}