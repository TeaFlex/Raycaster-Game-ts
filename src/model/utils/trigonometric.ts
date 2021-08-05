export const oneDegree = Math.PI/180;

export function getXProjection(norm: number, theta: number) {
    return norm * Math.cos(theta);
}

export function getYProjection(norm: number, theta: number) {
    return norm * Math.sin(theta);
}

export function getPythagore(a: number, b: number) {
    return Math.sqrt(a**2+b**2);
}

export function getNormalizedAngle(angle: number) {
    if(angle > 2*(Math.PI))
        angle -= (2*Math.PI);
    if(angle < 0)
        angle += (2*Math.PI);
    return angle;
}