import { oneDegree, getXProjection, getYProjection } from '../utils/trigonometric';

export class Player {
    public angle = 0;
    public rays: {x: number, y: number}[] = [];
    public readonly rayLength = 1000;
    public readonly rayQuantity = 64;

    constructor(
        public x = 0,
        public y = 0,
    ) {
        for(let i = this.rayQuantity; i>0; i--) {
            const rangle = this.angle + (i*oneDegree) - ((Math.round(this.rayQuantity/2))*oneDegree);
            
            this.rays.push({
                x: getXProjection(this.rayLength, rangle),
                y: getYProjection(this.rayLength, rangle)
            });
        }  
    }

    move(step = 1) {
        this.x += Math.cos(this.angle)*step;
        this.y += Math.sin(this.angle)*step;
    }

    rotate(angle = 0.1) {
        this.angle += angle;
        if(this.angle > 2*(Math.PI))
            this.angle -= (2*Math.PI);
        if(this.angle < 0)
            this.angle += (2*Math.PI);

        // for(let i = 1; i<=this.rayQuantity; i++) {
        //     const ray = this.rays[i-1];
        //     const rangle = this.angle - ((Math.round(this.rayQuantity/2))*oneDegree) + (i*oneDegree);
        //     ray.x = getXProjection(this.rayLength, rangle);
        //     ray.y = getYProjection(this.rayLength, rangle);
        // }
    }

    get position() {
        return {
            x: this.x,
            y: this.y,
            angle: this.angle
        };
    }
}