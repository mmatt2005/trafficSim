"use client"

import { Graph } from "@/app/classes/road/graph"
import { MutableRefObject, useRef, useState } from "react"
import { Button } from "../ui/button"
import { Input } from "../ui/input"
import { Label } from "../ui/label"
import { PointType } from "@/app/classes/road/point"
import { useGraph } from "@/app/stores/uiGraph"


export default function UiPointColor({ graph, canvas, point }: {
    graph: Graph
    canvas: MutableRefObject<HTMLCanvasElement | null>
    point: PointType
}) {
    const colorInputRef = useRef<HTMLInputElement | null>(null)
    const setUiPoints = useGraph((state) => state.setUiPoints)

    return <div className="">
        <Label htmlFor="colorInput">Color</Label>
        <Input ref={colorInputRef} defaultValue={point.color} id="colorInput" />
        <Button
            variant={"outline"}
            className="mt-1 w-full"
            onClick={() => {
                const updatedPoints = graph.updatePoint({ ...point, color: colorInputRef.current?.value || "" })
                if (updatedPoints) {
                    setUiPoints([...updatedPoints])
                }
            }}
        >Update Color</Button>
    </div>
}