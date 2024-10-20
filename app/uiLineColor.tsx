"use client"
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { MutableRefObject, useState } from "react";
import { Graph } from "./classes/road/graph";
import { PointType } from "./classes/road/point";
import { Line } from "./classes/line";
import { useGraph } from "./stores/uiGraph";

export default function UiLineColor({ graph, canvas, line }: {
    graph: Graph
    canvas: MutableRefObject<HTMLCanvasElement | null>
    line: Line
}) {
    const [inputColor, setInputColor] = useState(line.color)
    const setUiLines = useGraph((state) => state.setUiLines)

    return <div className="">
        <Label htmlFor="colorInput">Color</Label>
        <Input id="colorInput" value={inputColor} onChange={(newColor) => setInputColor(newColor.target.value)} />
        <Button
            variant={"outline"}
            className="mt-1 w-full"
            onClick={() => {
                console.log("TEST")
                const ctx = canvas.current?.getContext("2d")
                if (!ctx) return console.log("NO CTX")
                const updatedLines = graph.updateLine({ ...line, color: inputColor }, ctx)
                if (updatedLines) {
                    setUiLines([...updatedLines])
                }

            }}
        >Update Color</Button>
    </div>
}