import { Draw } from "./draw";
import { Point, PointType } from "./point";

export class Graph extends Draw {
    points: PointType[]

    constructor(defaultPoints: PointType[]) {
        super();
        this.points = defaultPoints
    }



    addPoint(newPoint: PointType) {
        this.points.push(newPoint)
    }

    updatePoint(updatedPoint: PointType, ctx: CanvasRenderingContext2D) {
        console.log("BEING CALLED")
        const findUpdatedPoint = this.points.find(point => point.id === updatedPoint.id)
        console.log(this.points)
        if (!findUpdatedPoint) return null
        this.points = [...this.points.filter((point) => point.id === findUpdatedPoint.id)]
        console.log(this.points)

        this.drawPoints(ctx)

        return this.points

    }

    removePoint(removedPoint: PointType, ctx: CanvasRenderingContext2D) { 
        const findPointToRemove = this.points.find(point => point.id === removedPoint.id)
        if (!findPointToRemove) return null

        console.log(this.points)
        this.points = [...this.points.filter((point) => point.id !== removedPoint.id)]
        console.log(this.points)

        ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);


        return this.points

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