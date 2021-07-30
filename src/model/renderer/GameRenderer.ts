import { Camera, Object3D, OrthographicCamera, Scene, WebGLRenderer } from "three";
import { AElement } from "./elements/AElement";
import { MapElement } from "./elements/MapElement";
import { PlayerElement } from "./elements/PlayerElement";

export class GameRenderer {
    private scene?: Scene;
    private camera?: Camera;
    private renderer?: WebGLRenderer;
    private canvas?: HTMLCanvasElement;
    private isRendering = false;
    private resolution = {
        height: 512,
        width: 1024
    };

    constructor(canvas?: HTMLCanvasElement) {
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
        if(this.canvas)
            this.renderer = new WebGLRenderer({ canvas: this.canvas });
        else {
            this.renderer = new WebGLRenderer();
            this.canvas = this.renderer.domElement;
        }
        this.renderer.setSize(this.resolution.width, this.resolution.height)
    }

    private renderScene() {
        const render = () => {
            requestAnimationFrame(render);
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