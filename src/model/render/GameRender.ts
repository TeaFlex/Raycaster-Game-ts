import { Camera, OrthographicCamera, Scene, WebGLRenderer } from "three";

export class GameRender {
    public scene?: Scene;
    public camera?: Camera;
    public renderer?: WebGLRenderer;
    public isRendering = false;
    public resolution = {
        height: 512,
        width: 1024
    };

    constructor() {
        
    }

    initScene() {
        this.scene = new Scene();
        this.camera = new OrthographicCamera(
            this.resolution.width/-2, 
            this.resolution.width/2,
            this.resolution.height/2,
            this.resolution.height/-2
        );
        this.renderer = new WebGLRenderer();
        this.renderer.setSize(this.resolution.width, this.resolution.height)
    }

    renderScene() {
        const render = () => {
            requestAnimationFrame(render);
            this.renderer!.render(this.scene!, this.camera!);
        };
        if(!this.isRendering) render();
        else console.log("Game is already rendering !");
    }
} 