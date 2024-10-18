export type LineType = {
    color: string
    width: number
    id: string
}

export class Line {
    constructor(line: LineType) {
        this.color = line.color
        this.width = line.width
        this.id = line.id

    }

    color: string
    width: number
    id: string
}