import { Line } from "../line";
import { Graph } from "./graph";
import { PointType } from "./point";
import {v4 as uuidv4} from "uuid"

export class Draw { 
    graph!: Graph
    constructor() {}

    setGraph(graph: Graph) {
        this.graph = graph
    }

    drawLine(ctx: CanvasRenderingContext2D, point1: PointType, point2: PointType, lineOptions?: Omit<Line, "id">) {
        if (!lineOptions) { 
            lineOptions = {
                color: "red",
                width: 5
            }
        }

        this.graph.addLine(new Line({color: lineOptions.color, width: lineOptions.width, id: uuidv4()}))

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

}