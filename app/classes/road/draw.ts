import { PointType } from "./point";

export class Draw { 
    drawLine(ctx: CanvasRenderingContext2D, point1: PointType, point2: PointType) {
        ctx.beginPath();

        // point1
        ctx.moveTo(point1.x, point1.y);

        //point2
        ctx.lineTo(point2.x, point2.y);

        ctx.stroke();
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