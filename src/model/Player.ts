import { 
    BufferGeometry, 
    Group, 
    Line, 
    LineBasicMaterial, 
    Points, 
    PointsMaterial, 
    Vector2 
} from "three";

export class Player {

    public entity: Group;

    constructor(size = 1) {
        this.entity = new Group();
        const pos = new Vector2(0,0);
        const pgeometry = new BufferGeometry().setFromPoints([
            pos
        ]);
        const pmaterial = new PointsMaterial({
            size,
            color: 0xffcc00,
        });
        
        const lgeometry = new BufferGeometry().setFromPoints([
            pos, 
            pos.clone().setY(10)
        ]);
        const lmaterial = new LineBasicMaterial({ 
            color: 0xff0000,
        });
        
        this.entity.add(
            new Points(pgeometry, pmaterial),
            new Line(lgeometry, lmaterial)
        );
    }

    rotate(angle: number) {
        this.entity.rotateZ(angle);
    }

    move(speed = 1) {
        const x = Math.cos(this.angle);
        const y = Math.sin(this.angle);
        
        this.pos.x += x*speed;
        this.pos.y += y*speed;
    }

    get pos() { return this.entity.position; }

    get angle() { 
        return this.entity.rotation.z + (Math.PI/2); 
    }
}