"use client"
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { MutableRefObject, useState } from "react";
import { Graph } from "../../app/classes/road/graph";
import { PointType } from "../../app/classes/road/point";
import { Line } from "../../app/classes/road/line";
import { useGraph } from "../../app/stores/uiGraph";

export default function UiLineWidth({ graph, canvas, line }: {
    graph: Graph
    canvas: MutableRefObject<HTMLCanvasElement | null>
    line: Line
}) {
    const setUiLines = useGraph((state) => state.setUiLines)
    const [lineWidth, setLineWidth] = useState(line.width)
    return <div className="">
        <Label htmlFor="lineWidth">Width</Label>
        <Input id="lineWidth" type="number" value={lineWidth} onChange={(newWidth) => setLineWidth(Number(newWidth.target.value))} />
        <Button
            variant={"outline"}
            className="mt-1 w-full"
            onClick={() => {
                console.log("TEST")
                const updatedLines = graph.updateLine({ ...line, width: lineWidth })
                if (updatedLines) {
                    setUiLines([...updatedLines])
                }

            }}
        >Update Width</Button>
    </div>
}