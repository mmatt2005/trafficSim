"use client"
import { MutableRefObject, useMemo, useRef, useState } from "react"
import { Point, PointType } from "../classes/road/point"
import { useGraph } from "../stores/uiGraph"
import { Button } from "@/components/ui/button";
import { Graph } from "../classes/road/graph";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { useAddPoint } from "../hooks/useAddPoint";

export default function UiMain({ graph, canvas }: {
    graph: Graph
    canvas: MutableRefObject<HTMLCanvasElement | null>
}) {
    const [selectedPoints, setSelectedPoints] = useState<PointType[]>([]);
    const setUiPoints = useGraph((state) => state.setUiPoints)

    const isMaxSelected = useMemo(() => {
        if (selectedPoints.length >= 2) return true
        return false
    }, [selectedPoints.length])

    function isAlreadySelected(point: PointType): boolean {
        if (selectedPoints.some(spoint => spoint.x === point.x && spoint.y == point.y)) return true
        return false
    }

    const uiPoints = useGraph((state) => state.uiPoints)

    const colorInputRef = useRef<HTMLInputElement | null>(null)

    const ctx = canvas.current?.getContext("2d")

    useAddPoint(graph, canvas)

    return <div className="flex flex-wrap gap-5 p-5">
        {
            uiPoints.map(point => {
                return <div
                    key={Math.random()}
                    className={` bg-neutral-900 p-2 rounded-sm
                        ${selectedPoints.some(spoint => spoint.x === point.x && spoint.y == point.y) && "border-4"}
                    `}                >
                    x:{point.x} y:{point.y}
                    <div className="">
                        <Label htmlFor="colorInput">Color</Label>
                        <Input ref={colorInputRef} defaultValue={point.color} id="colorInput" />
                        <Button
                            variant={"outline"}
                            className="mt-1 w-full"
                            onClick={() => {
                                if (!ctx) return console.log("NO CTX")
                                const updatedPoints = graph.updatePoint({ ...point, color: colorInputRef.current?.value || "" }, ctx)
                                if (updatedPoints) { 
                                    setUiPoints([...updatedPoints])
                                }
                            }}
                        >Update Color</Button>
                    </div>
                    <Button 
                    variant={"secondary"}
                    onClick={() => {
                        if (!ctx) return 
                        const test = graph.removePoint(point, ctx)
                        if (test) {
                            graph.drawPoints(ctx)
                            setUiPoints([...graph.points])
                        }

                    }}>Remove</Button>
                    <Button
                        onClick={() => {
                            // If the user selected a point thats already selected unselect it
                            if (isAlreadySelected(point)) return setSelectedPoints(selectedPoints.filter(spoint => spoint.x !== point.x && spoint.y !== point.y))


                            if (isMaxSelected) return console.log("Max is already selected...")

                            setSelectedPoints([...selectedPoints, point])
                        }}
                        className="mt-2 w-full"
                    >
                        {selectedPoints.some(spoint => spoint.x === point.x && spoint.y == point.y) ? "Un select" : "Select"}
                    </Button>
                </div>
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