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
        this.setGraph(this, this.lines, this.points)
    }

    addPoint(newPoint: Point) {
        this.points.push(newPoint)
    }

    addLine(newLine: Line) {
        this.lines.push(newLine)
    }

    updatePoint(updatedPoint: PointType, ctx: CanvasRenderingContext2D) {
        const findUpdatedPointIndex = this.points.findIndex(point => point.id === updatedPoint.id)
        if (findUpdatedPointIndex === -1) return null

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

    updateLine(updatedLine: LineType, ctx: CanvasRenderingContext2D) { 
        const findUpdatedLineIndex = this.lines.findIndex(line => line.id === updatedLine.id)
        if (findUpdatedLineIndex === -1) return null

        this.lines = this.lines.map((line, index) => { 
            if (index === findUpdatedLineIndex) { 
                return this.lines[index] = new Line(updatedLine)
            } else { 
                return line
            }
        })

        this.reDrawCanvas(ctx)


        return this.lines
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