import { Map } from "./Map";
import { Player } from "./Player";

export class Game {
    public player: Player;
    public map: Map;

    constructor(map?: number[], px?: number, py?: number) {
        this.player = new Player(px, py);
        this.map = new Map(map ?? [
            1,1,1,1,1,1,1,1,
            1,0,0,0,0,0,0,1,
            1,0,1,0,0,0,0,1,
            1,0,0,0,0,0,0,1,
            1,0,0,0,0,0,0,1,
            1,0,0,0,0,0,0,1,
            1,0,0,0,0,0,0,1,
            1,1,1,1,1,1,1,1,
        ]);

        this.control =  this.control.bind(this);
    }

    control(e: KeyboardEvent) {
        const key = e.code.replace(/^(Arrow)/gm, "").toLowerCase();

        switch(key) {
            case "up":
                this.player.move(5);
                break;
            case "down":
                this.player.move(-5);
                break;
            case "left":
                this.player.rotate(0.2);
                break;
            case "right":
                this.player.rotate(-0.2);
                break;
        }
        
        console.log(this.player.position);
    }
}