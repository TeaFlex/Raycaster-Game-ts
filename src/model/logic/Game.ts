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
            1,0,0,0,1,0,0,1,
            1,0,0,0,1,0,0,1,
            1,0,0,0,0,0,0,1,
            1,0,0,0,0,0,0,1,
            1,0,0,0,0,0,0,1,
            1,1,1,1,1,1,1,1,
        ]);
    }
}