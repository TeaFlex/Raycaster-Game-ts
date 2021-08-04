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