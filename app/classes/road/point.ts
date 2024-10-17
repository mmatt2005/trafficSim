import { Graph } from "./graph"

export type PointType = {
    x: number,
    y: number,
    color: string,
    id: string,
    graph: Graph
    size: number
}

export class Point implements PointType {
    constructor(point: PointType) {
        this.x = point.x
        this.y = point.y
        this.color = point.color
        this.id = point.id
        this.graph = point.graph
        this.size = point.size
    }

    x: number
    y: number
    color: string
    id: string
    graph: Graph
    size: number
}
