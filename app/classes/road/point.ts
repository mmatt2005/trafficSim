export type PointType = { x: number, y: number, color: string, id: string }

export class Point implements PointType {
    constructor(point: PointType) {
        this.x = point.x
        this.y = point.y
        this.color = point.color
        this.id = point.id
    }

    randomColor() {
        const colors = ["red", "pink", "blue", "green", "orange"]
        return colors[Math.floor(Math.random() * colors.length)]
    }

    x: number
    y: number
    color: string 
    id: string

    changeColor(newColor: string) { 
        this.color = newColor
    }


    draw(ctx: CanvasRenderingContext2D) { 
        ctx.beginPath();
        ctx.fillStyle = this.color;
        ctx.arc(this.x, this.y , 9, 0, Math.PI * 2);
        ctx.fill();
    }
}
