import { Color, OrthographicCamera, Scene, WebGLRenderer } from "three";
import { Map } from "./Map";
import { Player } from "./Player";

export class RaycastGame {
    private player: Player;
    private map: Map;
    private scene?: Scene;
    public canvas?: HTMLCanvasElement;
    public resolution = {
        height: 512,
        width: 1024
    };
    private scale = 10;

    constructor(public canvasId = "raycast") {
        this.map = new Map();
        this.player = new Player(this.scale);
        this.initScene();
        this.control = this.control.bind(this);
    }

    initScene() {
        this.scene = new Scene();
        const scene = this.scene;
        scene.background = new Color(0x555555);
        const camera = new OrthographicCamera(
            (this.resolution.width/-2)/this.scale, 
            (this.resolution.width/2)/this.scale,
            (this.resolution.height/2)/this.scale,
            (this.resolution.height/-2)/this.scale
        );
        const renderer = new WebGLRenderer();
        renderer.setSize(this.resolution.width, this.resolution.height);
        this.canvas = renderer.domElement;
        this.canvas.id = this.canvasId;
        camera.position.setZ(1);
        const renderScene = () => {
            requestAnimationFrame(renderScene);
            renderer.render(scene, camera);
        };
        
        //draw player
        this.scene?.add(this.player.entity);

        renderScene();
    }

    control(e: KeyboardEvent) {
        const key = e.code.replace(/^(Arrow)/gm, "").toLowerCase();

        switch(key) {
            case "up":
                this.player.move();
                break;
            case "down":
                this.player.move(-1);
                break;
            case "left":
                this.player.rotate(0.1);
                break;
            case "right":
                this.player.rotate(-0.1);
                break;
        }
    }
}