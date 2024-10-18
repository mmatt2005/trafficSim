import { Line, LineType } from "../line";
import { Draw } from "./draw";
import { Point, PointType } from "./point";

export class Graph extends Draw {
    points: Point[]
    lines: Line[]

    constructor() {
        super();
        this.points = []
        this.lines = []
        this.setGraph(this)
    }

    addPoint(newPoint: Point) {
        this.points.push(newPoint)
    }

    addLine(newLine: Line) {
        this.lines.push(newLine)
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