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
        const findUpdatedPointIndex = this.points.findIndex(point => point.id === updatedPoint.id)
        if (!findUpdatedPointIndex) return null

        this.points = this.points.map((point, index) => { 
            if (index === findUpdatedPointIndex) {
                return this.points[index] = new Point(updatedPoint)
            } else {
                return point
            }
        })

        this.reDrawPoints(ctx, this.points)

        return this.points

    }

    removePoint(removedPoint: PointType, ctx: CanvasRenderingContext2D) { 
        console.log(removedPoint)
        const findPointToRemove = this.points.find(point => point.id === removedPoint.id)
        if (!findPointToRemove) return null

        this.points = this.points.filter((point) => point.id !== removedPoint.id)


        this.reDrawPoints(ctx, this.points)


        return this.points

    }
}