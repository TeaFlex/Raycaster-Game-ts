export const oneDegree = 0.0174533;

export function getXProjection(norm: number, theta: number) {
    return norm * Math.cos(theta);
}

export function getYProjection(norm: number, theta: number) {
    return norm * Math.sin(theta);
}