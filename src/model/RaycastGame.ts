import { BufferGeometry, Color, OrthographicCamera, Points, PointsMaterial, Raycaster, Scene, Vector2, WebGLRenderer } from "three";
import { Map } from "./Map";
import { Player } from "./Player";

export class RaycastGame {
    public player: Player;
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
            this.drawRays3D();
            renderer.render(scene, camera);
        };
        
        this.scene?.add(
            //this.map.entity,
            this.player.entity
        );
        
        renderScene();
    }

    private drawRays3D() {
        let r, mx, my, mp, dof;
        let rx, ry, ra, xo, yo;
        ra = this.player.angle;

        for(let r = 0; r<1; r++) {
            dof = 0;
            const aTan = -1/Math.tan(ra);

            //Horizontal check
            if(ra > Math.PI || ra < 0) { //down
                ry = (Math.round(this.player.pos.y >> 6)<<6);
                rx = (this.player.pos.y - ry)*aTan +this.player.pos.x;
                yo = -64;
                xo = -yo*aTan; 
            }
            else if(ra < Math.PI) { //up
                ry = (Math.round(this.player.pos.y >> 6)<<6) + 64;
                rx = (this.player.pos.y - ry)*aTan +this.player.pos.x;
                yo = 64;
                xo = -yo*aTan;
            }
            else if(ra == 0 || ra == Math.PI) { //left or right
                rx = this.player.pos.x;
                ry = this.player.pos.y;
                dof = 8;
            }

            while(dof < 8) {
                mx = Math.round(rx as number >> 6);
                my = Math.round(ry as number >> 6);
                mp = my*this.map.getLengthX()+mx;
                if(mp<this.map.getSize() && this.map.map[mp] == 1) dof = 8;
                else {
                    (rx as number) += xo as number;
                    (ry as number) += yo as number;
                    dof++;
                }
            }

            console.log(rx, ry);
            

            const geometry = new BufferGeometry().setFromPoints([
                new Vector2(0, 0)
            ]);
            
            const material = new PointsMaterial({
                size: 5,
                color: 0x00ff00
            });

            // const ray = new Line(geometry, material);
            const point = new Points(geometry, material);
            point.position.set((rx??0), ry??0, 0);
            this.scene?.add(point);
            // ray.position.set(256,0,0);
            // //console.log(ray.position);
            
            // this.player.entity.add(ray);
        }
    }

    private drawRays() {
        const raycaster = new Raycaster(this.player.pos);

        const intersects = raycaster.intersectObject(this.map.entity, true);
        
        for(let i = 0; i<this.scene!.children.length; i++) {
            
            if(intersects[i]) {
                //(intersects[i].object as any).material.color.set(0x0000ff);
            }
            
        }
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