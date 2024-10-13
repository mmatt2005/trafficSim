"use client"
import { MutableRefObject, useMemo, useState } from "react"
import { Point, PointType } from "../classes/road/point"
import { useGraph } from "../stores/uiGraph"
import { Button } from "@/components/ui/button";
import { Graph } from "../classes/road/graph";

export default function UiMain({ graph, canvas }: {
    graph: Graph
    canvas: MutableRefObject<HTMLCanvasElement | null>
}) {
    const [selectedPoints, setSelectedPoints] = useState<PointType[]>([]);

    const isMaxSelected = useMemo(() => {
        if (selectedPoints.length >= 2) return true
        return false
    }, [selectedPoints.length])

    function isAlreadySelected(point: PointType): boolean {
        if (selectedPoints.some(spoint => spoint.x === point.x && spoint.y == point.y)) return true
        return false
    }

    const uiPoints = useGraph((state) => state.uiPoints)

    return <div className="flex flex-wrap gap-5 p-5">
        {
            uiPoints.map(point => {
                return <div
                    key={Math.random()}
                    className={` bg-neutral-900 p-2 rounded-sm
                        ${selectedPoints.some(spoint => spoint.x === point.x && spoint.y == point.y) && "bg-primary"}
                    `}
                    onClick={() => {
                        // If the user selected a point thats already selected unselect it
                        if (isAlreadySelected(point)) return setSelectedPoints(selectedPoints.filter(spoint => spoint.x !== point.x && spoint.y !== point.y))


                        if (isMaxSelected) return console.log("Max is already selected...")

                        setSelectedPoints([...selectedPoints, point])
                    }}
                >x:{point.x} y:{point.y}</div>
            })
        }
        {isMaxSelected && <Button
            variant={"secondary"}
            onClick={() => {
                if (!canvas.current) return console.log("no canvas prop")
                const ctx = canvas.current.getContext("2d")
                if (!ctx) return console.log("No ctx")

                graph.drawLine(ctx, selectedPoints[0], selectedPoints[1])

                setSelectedPoints([])
            }}
        >Create line at 2 points</Button>}
    </div>
}