export type PointType = {x: number, y: number}

class Point {
    constructor(coord: PointType) {
        this.coordinate = coord;
    }

    coordinate: PointType;
    
}

// test linkage commit