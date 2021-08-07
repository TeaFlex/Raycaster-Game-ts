import { Camera, Color, OrthographicCamera, Scene, WebGLRenderer } from "three";
import { Game } from "../logic/Game";
import { CameraElement } from "./elements/CameraElement";
import { MapElement } from "./elements/MapElement";
import { PlayerElement } from "./elements/PlayerElement";

export class GameRenderer {

    private mapE: MapElement;
    private playerE: PlayerElement;
    private cameraE: CameraElement;
    
    private scene?: Scene;
    private camera?: Camera;
    private renderer?: WebGLRenderer;
    private canvas?: HTMLCanvasElement;
    private isRendering = false;
    private resolution = {
        height: 512,
        width: 1024
    };

    constructor(
        game: Game,
        canvas?: HTMLCanvasElement,
    ) {
        this.mapE = new MapElement(game);
        this.playerE = new PlayerElement(game);
        this.cameraE = new CameraElement(game);

        this.canvas = canvas;
        this.initScene();
        this.renderScene();
    }

    private initScene() {
        this.scene = new Scene();
        this.camera = new OrthographicCamera(
            this.resolution.width/-2, 
            this.resolution.width/2,
            this.resolution.height/2,
            this.resolution.height/-2
        );
        this.camera.position.setZ(1);

        if(this.canvas)
            this.renderer = new WebGLRenderer({ canvas: this.canvas, alpha: true });
        else {
            this.renderer = new WebGLRenderer();
            this.canvas = this.renderer.domElement;
        }
        this.renderer.setSize(this.resolution.width, this.resolution.height);

        this.scene.add(
            this.mapE.entity,
            this.playerE.entity,
            this.cameraE.entity,
        );

        this.mapE.drawElement();
        this.playerE.drawElement();
        this.cameraE.drawElement();
    }

    private renderScene() {
        const render = () => {
            requestAnimationFrame(render);
            this.playerE.updateElement();
            this.playerE.entity.position.x -= 4*this.mapE.getBlockSize();
            this.cameraE.updateElement();
            this.renderer!.render(this.scene!, this.camera!);
        };
        if(!this.isRendering) render();
        else console.log("Game is already rendering !");
    }

    getCanvas() {
        return this.canvas;
    }
} 