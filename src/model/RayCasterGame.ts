import { GameRenderer } from "./renderer/GameRenderer";
import { Game } from "./logic/Game";

export class RayCasterGame {
    public game: Game;
    public gameRenderer: GameRenderer;

    constructor(canvas: HTMLCanvasElement) {
        this.game = new Game(undefined, 4*(-64));
        this.gameRenderer = new GameRenderer(this.game.player, this.game.map, canvas);

        this.control =  this.control.bind(this);
    }

    control(e: KeyboardEvent) {
        const key = e.code.replace(/^(Arrow)/gm, "").toLowerCase();

        switch(key) {
            case "up":
                this.game.player.move(5);
                break;
            case "down":
                this.game.player.move(-5);
                break;
            case "left":
                this.game.player.rotate(0.2);
                break;
            case "right":
                this.game.player.rotate(-0.2);
                break;
        }
    }
}