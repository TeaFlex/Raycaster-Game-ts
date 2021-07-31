import { Camera, Color, Object3D, OrthographicCamera, Scene, WebGLRenderer } from "three";
import { Map } from "../logic/Map";
import { Player } from "../logic/Player";
import { AElement } from "./elements/AElement";
import { MapElement } from "./elements/MapElement";
import { PlayerElement } from "./elements/PlayerElement";

export class GameRenderer {

    private playerE: PlayerElement;
    private mapE: MapElement;

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
        player: Player,
        map: Map,
        canvas?: HTMLCanvasElement,
    ) {
        this.mapE = new MapElement(map);
        this.playerE = new PlayerElement(player);

        this.canvas = canvas;
        this.initScene();
        this.renderScene();
    }

    private initScene() {
        this.scene = new Scene();
        this.scene.background = new Color(0xa5a5a5);
        this.camera = new OrthographicCamera(
            this.resolution.width/-2, 
            this.resolution.width/2,
            this.resolution.height/2,
            this.resolution.height/-2
        );
        this.camera.position.setZ(1);

        if(this.canvas)
            this.renderer = new WebGLRenderer({ canvas: this.canvas });
        else {
            this.renderer = new WebGLRenderer();
            this.canvas = this.renderer.domElement;
        }
        this.renderer.setSize(this.resolution.width, this.resolution.height);

        this.scene.add(
            this.playerE.entity,
            this.mapE.entity,
        );
    }

    private renderScene() {
        const render = () => {
            requestAnimationFrame(render);
            this.playerE.drawElement();
            this.mapE.drawElement();
            this.renderer!.render(this.scene!, this.camera!);
        };
        if(!this.isRendering) render();
        else console.log("Game is already rendering !");
    }

    addToScene(...elements: AElement[]) {
        for (const el of elements) 
            this.scene?.add(el.entity);
    }

    getCanvas() {
        return this.canvas;
    }
} 