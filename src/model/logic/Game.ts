import { getPythagore, getXProjection, getYProjection, oneDegree } from "../utils/trigonometric";
import { Map } from "./Map";
import { Player } from "./Player";

export class Game {
    public player: Player;
    public map: Map;

    constructor(map?: number[], px?: number, py?: number) {
        this.map = new Map(map ?? [
            1,1,1,1,1,1,1,1,
            1,0,0,0,1,0,0,1,
            1,0,0,0,0,0,0,1,
            1,1,0,0,0,0,0,1,
            1,0,0,0,0,0,1,1,
            1,0,0,0,0,0,0,1,
            1,0,0,1,0,0,0,1,
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
        let ra = 0, rx = 0, ry = 0;
        let vx = this.player.x, vy = this.player.y;
        let hx = this.player.x, hy = this.player.y;
        let disV = 10**6, disH = 10**6;
        

        for(let i = 0; i<this.player.rayQuantity; i++) {
            dof = 0
            
            const ray = this.player.rays[i];
            ra = this.player.angle - ((Math.floor(this.player.rayQuantity/2))*oneDegree) + (i*oneDegree);
            if(ra<0) ra += 2*Math.PI;
            if(ra>2*Math.PI) ra -= 2*Math.PI;
            
            // horizontal check 
            const sin = Math.sin(ra);
            if(ra > Math.PI) { //down
                ry = ((this.player.y>>6)<<6) -(64*(0**Math.abs(this.player.y))) - this.player.y;
                rx = getXProjection(ry/sin, ra);
                yo = -64;
                xo = getXProjection(yo/sin, ra);           
            }
            if(ra < Math.PI) { //up
                ry = ((this.player.y>>6)<<6) + 64 - this.player.y;
                rx = getXProjection(ry/sin, ra);
                yo = 64;
                xo = getXProjection(yo/sin, ra);      
            }
            if(ra == 0 || ra == Math.PI) { //right or left
                rx = this.player.x;
                ry = this.player.y;
                dof = 8;
            }
        
            while(dof < 8) {
                mx=((rx + this.player.x) >> 6) +4;
                my=(-(ry + this.player.y) >> 6) +4;

                if(ra < Math.PI) my--;
                
                mp = my*this.map.getSide()+mx;
                if((mp<this.map.getSide()**2) && (this.map.getContent()[mp] != 0)){
                    dof = 8;
                    hx = rx;
                    hy = ry;
                    disH = getPythagore(hx, hy);
                }
                else {
                    rx+=xo;
                    ry+=yo;
                    dof++;
                }
            }

            // vertical check 
            dof = 0;
            const cos = Math.cos(ra);
            if(ra > Math.PI/2 && ra < 3*Math.PI/2) { //left
                rx = ((this.player.x>>6)<<6)-(64*(0**Math.abs(this.player.x))) - this.player.x;
                ry = getYProjection(rx/cos, ra);
                xo = -64;
                yo = getYProjection(xo/cos, ra);    
            }
            if(ra < Math.PI/2 || ra > 3*Math.PI/2) { //right
                rx = ((this.player.x>>6)<<6) + 64 - this.player.x;
                ry = getYProjection(rx/cos, ra);
                xo = 64;
                yo = getYProjection(xo/cos, ra);
            }
            if(ra == Math.PI/2 || ra == 3*Math.PI/2) { //up or down
                rx = this.player.x;
                ry = this.player.y;
                dof = 8;
            }
        
            while(dof < 8) {
                mx=((rx + this.player.x) >> 6) +4;
                my=(-(ry + this.player.y) >> 6) +4;

                if(ra > Math.PI/2 && ra < 3*Math.PI/2) mx--;
                
                mp = my*this.map.getSide()+mx;
                if((mp<this.map.getSide()**2) && (this.map.getContent()[mp] != 0)){
                    dof = 8;
                    vx = rx;
                    vy = ry;
                    disV = getPythagore(vx, vy);
                }
                else {
                    rx+=xo;
                    ry+=yo;
                    dof++;
                }
            }

            if(disH < disV) {
                ray.x = hx;
                ray.y = hy;
            }
            else {
                ray.x = vx;
                ray.y = vy;
            }
        }
    }
}