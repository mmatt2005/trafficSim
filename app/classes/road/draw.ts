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


}