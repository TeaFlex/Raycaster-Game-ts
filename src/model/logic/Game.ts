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
            1,0,0,0,0,0,0,1,
            1,0,0,0,0,0,0,1,
            1,0,0,0,0,0,0,1,
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
        let ra = 0;
        

        for(let i = 0; i<this.player.rayQuantity; i++) {
            dof = 0
            
            const ray = this.player.rays[i];
            ra = this.player.angle - ((Math.floor(this.player.rayQuantity/2))*oneDegree) + (i*oneDegree);
            if(ra<0) ra += 2*Math.PI;
            if(ra>2*Math.PI) ra -= 2*Math.PI;
            const sin = Math.sin(ra);
            
            // horizontal check 
            if(ra > Math.PI) { //down
                ray.y = ((this.player.y>>6)<<6) -(64*(0**Math.abs(this.player.y))) - this.player.y;
                ray.x = getXProjection(ray.y/sin, ra);
                yo = -64;
                xo = getXProjection(yo/sin, ra);
            }
            if(ra < Math.PI) { //up
                ray.y = ((this.player.y>>6)<<6) + 64 - this.player.y;
                ray.x = getXProjection(ray.y/sin, ra);
                yo = 64;
                xo = getXProjection(yo/sin, ra);
            }
            if(ra == 0 || ra == Math.PI) { //right or left
                ray.x = this.player.x;
                ray.y = this.player.y;
                dof = 8;
            }
            
            
            while(dof < 8) {
                mx=Math.round((ray.x + this.player.x) >> 6);
                my=Math.round((ray.y + this.player.y) >> 6);
                
                
                mp = my*this.map.getSide()+mx+(this.map.getSide()**2)/2;
                //console.log(/*mx, my,*/ mp, this.map.getContent()[mp]);
                //if((mp<this.map.getSide()**2) && (this.map.getContent()[mp] == 1)) dof = 8;
                if(true) {
                    
                    ray.x+=xo;
                    ray.y+=yo;
                    dof++;
                }
            }
        }
    }
}