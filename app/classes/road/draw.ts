import { Line, LineType } from "../line";
import { Graph } from "./graph";
import { PointType } from "./point";
import { v4 as uuidv4 } from "uuid"

export class Draw {
    graph!: Graph
    lines!: LineType[]
    points!: PointType[]
    constructor() { }

    setGraph(graph: Graph, lines: LineType[], points: PointType[]) {
        this.graph = graph
        this.lines = lines
        this.points = points
    }

    drawLine(ctx: CanvasRenderingContext2D, point1: PointType, point2: PointType, lineOptions?: Omit<Line, "id" | "points">) {
        if (!lineOptions) {
            lineOptions = {
                color: "red",
                width: 5
            }
        }

        this.graph.addLine(new Line({ color: lineOptions.color, width: lineOptions.width, id: uuidv4(), points: [point1, point2] }))

        ctx.beginPath();

        // point1
        ctx.moveTo(point1.x, point1.y);

        //point2
        ctx.lineTo(point2.x, point2.y);

        ctx.lineWidth = lineOptions.width
        ctx.strokeStyle = lineOptions.color


        ctx.stroke();

        return this.graph.lines
    }


    drawPoints(ctx: CanvasRenderingContext2D, points: PointType[]) {
        if (points.length === 0) {
            console.log("Cannot draw points due to points.length being 0")
            return null
        }

        for (let i = 0; i < points.length; i++) {
            const x = points[i].x
            const y = points[i].y

            ctx.beginPath();
            ctx.fillStyle = points[i].color;
            ctx.arc(x, y, points[i].size, 0, Math.PI * 2);
            ctx.fill();
        }
    }

    reDrawPoints(ctx: CanvasRenderingContext2D, points: PointType[]) {
        ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
        this.drawPoints(ctx, points)
    }

    drawLines(ctx: CanvasRenderingContext2D, lines: LineType[]) {
        if (lines.length === 0) {
            console.log("Cannot draw lines due to lines.length being 0")
            return null
        }

        for (let i = 0; i < lines.length; i++) {

            ctx.beginPath();

            // point1
            ctx.moveTo(lines[i].points[0].x, lines[i].points[0].y);

            //point2
            ctx.lineTo(lines[i].points[1].x, lines[i].points[1].y);

            ctx.lineWidth = lines[i].width;
            ctx.strokeStyle = lines[i].color;

            ctx.stroke();
        }

        return this.graph.lines
    }

    reDrawLines(ctx: CanvasRenderingContext2D, lines: LineType[]) {
        ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
        this.drawLines(ctx, lines)
    }

    reDrawCanvas(ctx: CanvasRenderingContext2D) { 
        ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);

        this.drawLines(ctx, this.lines)
        this.drawPoints(ctx, this.points)
    } 

}