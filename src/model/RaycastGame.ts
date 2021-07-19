import { Color, Group, OrthographicCamera, Scene, Vector3, WebGLRenderer } from "three";
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

    constructor(public canvasId = "raycast") {
        this.map = new Map(8, 8, this.resolution.height/8);
        this.player = new Player(-this.resolution.width/4,0);
        this.initScene();
        this.control = this.control.bind(this);
    }

    initScene() {
        this.scene = new Scene();
        const scene = this.scene;
        scene.background = new Color(0x555555);
        const camera = new OrthographicCamera(
            this.resolution.width/-2, 
            this.resolution.width/2,
            this.resolution.height/2,
            this.resolution.height/-2
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
        
        this.scene?.add(
            this.map.entity,
            this.player.entity
        );

        renderScene();
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
    }
}