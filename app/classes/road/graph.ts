import { Line, LineType } from "./line";
import { Draw } from "./draw";
import { Point, PointType } from "./point";

export interface VehicleType { 
    line: LineType
    car: string
}
export class Graph extends Draw {
    points: Point[]
    lines: Line[]
    ctx: CanvasRenderingContext2D | null
    vehicles: VehicleType[]

    constructor() {
        super();
        this.points = []
        this.lines = []
        this.ctx = null
        this.setGraph(this, this.lines, this.points, this.ctx)
        this.vehicles = []
    }

    setCtx(ctx: CanvasRenderingContext2D) { 
        console.log(ctx)
        this.ctx = ctx
    }

    addPoint(newPoint: Point) {
        this.points.push(newPoint)
    }

    addLine(newLine: Line) {
        this.lines.push(newLine)

        return newLine
    }

    updatePoint(updatedPoint: PointType) {
        if (!this.ctx) return console.log("No ctx"), null

        const findUpdatedPointIndex = this.points.findIndex(point => point.id === updatedPoint.id)
        if (findUpdatedPointIndex === -1) return null

        this.points = this.points.map((point, index) => {
            if (index === findUpdatedPointIndex) {
                return this.points[index] = new Point(updatedPoint)
            } else {
                return point
            }
        })

        this.reDrawCanvas()

        return this.points

    }

    updateLine(updatedLine: LineType) {
        if (!this.ctx) return console.log("No ctx"), null

        const findUpdatedLineIndex = this.lines.findIndex(line => line.id === updatedLine.id)
        if (findUpdatedLineIndex === -1) return null

        this.lines = this.lines.map((line, index) => {
            if (index === findUpdatedLineIndex) {
                return this.lines[index] = new Line(updatedLine)
            } else {
                return line
            }
        })

        this.reDrawCanvas()


        return this.lines
    }

    removePoint(removedPoint: PointType) {
        if (!this.ctx) return console.log("No ctx"), null

        const findPointToRemove = this.points.find(point => point.id === removedPoint.id)
        if (!findPointToRemove) return null

        this.points = this.points.filter((point) => point.id !== removedPoint.id)


        this.reDrawCanvas()


        return this.points

    }
}