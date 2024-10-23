import { Line, LineType } from "./line";
import { Graph } from "./graph";
import { PointType } from "./point";
import { v4 as uuidv4 } from "uuid"

export class Draw {
    graph!: Graph
    lines!: LineType[]
    points!: PointType[]
    ctx!: CanvasRenderingContext2D | null
    constructor() { }

    setGraph(graph: Graph, lines: LineType[], points: PointType[], ctx: CanvasRenderingContext2D | null) {
        this.graph = graph
        this.lines = lines
        this.points = points
        this.ctx = ctx
    }

    addVehicle(line: Line) {
        if (!this.ctx) return console.log("No ctx!")

        this.graph.vehicles.push({ line: line, car: "car" })
    }

    drawLine(point1: PointType, point2: PointType, lineOptions?: Omit<Line, "id" | "points" | "vehicles" | "addVehicle">) {
        if (!this.ctx) return console.log("No ctx")

        if (!lineOptions) {
            lineOptions = {
                color: "red",
                width: 5
            }
        }

        const line = this.graph.addLine(new Line({ color: lineOptions.color, width: lineOptions.width, id: uuidv4(), points: [point1, point2] }))
        this.addVehicle(line)

        this.ctx.beginPath();

        // point1
        this.ctx.moveTo(point1.x, point1.y);

        //point2
        this.ctx.lineTo(point2.x, point2.y);

        this.ctx.lineWidth = lineOptions.width
        this.ctx.strokeStyle = lineOptions.color


        this.ctx.stroke();

        this.reDrawCanvas()


        return this.graph.lines
    }


    drawPoints(points: PointType[]) {
        if (!this.ctx) return console.log("No ctx")

        if (points.length === 0) {
            console.log("Cannot draw points due to points.length being 0")
            return null
        }

        for (let i = 0; i < points.length; i++) {
            const x = points[i].x
            const y = points[i].y

            this.ctx.beginPath();
            this.ctx.fillStyle = points[i].color;
            this.ctx.arc(x, y, points[i].size, 0, Math.PI * 2);
            this.ctx.fill();
        }
    }


    drawLines(lines: LineType[]) {
        if (!this.ctx) return console.log("No ctx")

        if (lines.length === 0) {
            console.log("Cannot draw lines due to lines.length being 0")
            return null
        }

        for (let i = 0; i < lines.length; i++) {

            this.ctx.beginPath();

            // point1
            this.ctx.moveTo(lines[i].points[0].x, lines[i].points[0].y);

            //point2
            this.ctx.lineTo(lines[i].points[1].x, lines[i].points[1].y);

            this.ctx.lineWidth = lines[i].width;
            this.ctx.strokeStyle = lines[i].color;

            this.ctx.stroke();
        }


        return this.graph.lines
    }

    drawVehicles() {
        if (!this.ctx) return console.log("no ctx")

        for (let i = 0; i < this.graph.vehicles.length; i++) {
            const vehiclesOnLine = this.graph.vehicles[i]
            if (vehiclesOnLine) {
                this.ctx.fillRect(vehiclesOnLine.line.points[1].x, vehiclesOnLine.line.points[1].y, 50, 50)
                this.ctx.fillStyle = "black"
            }
        }
    }

    reDrawCanvas() {
        if (!this.ctx) return console.log("Cannot reDrawCanvas due to canvas being null")
        this.ctx.clearRect(0, 0, this.ctx.canvas.width, this.ctx.canvas.height);


        this.drawVehicles()
        this.drawLines(this.lines)
        this.drawPoints(this.points)
    }

}