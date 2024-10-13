import { Point, PointType } from "./point";

export class Graph {
    points: PointType[]

    constructor(defaultPoints: PointType[]) {
        this.points = defaultPoints
    }

    drawLine(ctx: CanvasRenderingContext2D, point1: PointType, point2: PointType) { 
        ctx.beginPath();

        // point1
        ctx.moveTo(point1.x, point1.y);

        //point2
        ctx.lineTo(point2.x, point2.y);

        ctx.stroke();
    }

    addPoint(newPoint: PointType) {
        this.points.push(newPoint)
    }

    updatePoint(updatedPoint: PointType) { 
        // const findUpdatedPoint = this.points.find()
    }

    drawPoints(ctx: CanvasRenderingContext2D) {
        for (let i = 0; i < this.points.length; i++) {
            const x = this.points[i].x
            const y = this.points[i].y

            ctx.beginPath();
            ctx.fillStyle = this.points[i].color;
            ctx.arc(x, y, 9, 0, Math.PI * 2);
            ctx.fill();
        }
    }
}