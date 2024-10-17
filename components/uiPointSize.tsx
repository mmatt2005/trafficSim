"use client"

import { Graph } from "@/app/classes/road/graph"
import { MutableRefObject, useState } from "react"
import { Button } from "./ui/button"
import { Input } from "./ui/input"
import { Label } from "./ui/label"
import { PointType } from "@/app/classes/road/point"
import { useGraph } from "@/app/stores/uiGraph"

export default function UiPointSize({ graph, canvas, point }: {
    graph: Graph
    canvas: MutableRefObject<HTMLCanvasElement | null>
    point: PointType
}) {
    const setUiPoints = useGraph((state) => state.setUiPoints)
    const [size, setSize] = useState(point.size)
    return <div className="">
        <Label htmlFor="colorInput">Size</Label>
        <Input id="colorInput" type="number" value={size} onChange={(newValue) => setSize(Number(newValue.target.value))} />
        <Button
            variant={"outline"}
            className="mt-1 w-full"
            onClick={() => {
                const ctx = canvas.current?.getContext("2d")
                if (!ctx) return
                const updatedPoints = graph.updatePoint({...point, size: size}, ctx)
                console.log(updatedPoints)
                if (updatedPoints) {
                    setUiPoints([...updatedPoints])
                }
            }}
        >Update Size</Button>
    </div>
}