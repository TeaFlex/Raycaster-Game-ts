export class Player {

    public angle = 0;

    constructor(
        public x = 0,
        public y = 0,
    ) {}

    move(step = 1) {
        this.x += Math.cos(this.angle)*step;
        this.y += Math.sin(this.angle)*step;
    }

    rotate(angle = 0.1) {
        this.angle += angle;
        if(this.angle > 2*(Math.PI))
            this.angle = this.angle - (2*Math.PI);
        if(this.angle < 0)
            this.angle = (2*Math.PI) + this.angle;
    }

    get position() {
        return {
            x: this.x,
            y: this.y,
            angle: this.angle
        };
    }
}