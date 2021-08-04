import { GameRenderer } from "./renderer/GameRenderer";
import { Game } from "./logic/Game";

export class RayCasterGame {
    public game: Game;
    public gameRenderer: GameRenderer;

    constructor(canvas: HTMLCanvasElement) {
        this.game = new Game();
        this.gameRenderer = new GameRenderer(this.game, canvas);

        this.control =  this.control.bind(this);
    }

    control(e: KeyboardEvent) {
        const key = e.code.replace(/^(Arrow)/gm, "").toLowerCase();

        switch(key) {
            case "up":
                this.game.movePlayer(5)
                break;
            case "down":
                this.game.movePlayer(-5);
                break;
            case "left":
                this.game.rotatePlayer(0.2);
                break;
            case "right":
                this.game.rotatePlayer(-0.2);
                break;
        }
    }
}