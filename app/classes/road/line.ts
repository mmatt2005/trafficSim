import { PointType } from "../road/point"

export type LineType = {
    color: string
    width: number
    id: string
    points: PointType[]
}

export class Line {
    constructor(line: LineType) {
        this.color = line.color
        this.width = line.width
        this.id = line.id
        this.points = line.points
    }

    color: string
    width: number
    id: string
    points: PointType[]

}