export type PointType = { x: number, y: number }

export class Point {
    constructor(coord: PointType) {
        this.coordinate = coord;
    }

    coordinate: PointType;


    draw(ctx: CanvasRenderingContext2D) { 
        ctx.beginPath();
        ctx.fillStyle = "red";
        ctx.arc(this.coordinate.x, this.coordinate.y , 9, 0, Math.PI * 2);
        ctx.fill();
    }
}
