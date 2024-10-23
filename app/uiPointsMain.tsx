"use client"

import { MutableRefObject, useMemo, useState } from "react";
import { PointType } from "./classes/road/point";
import { Button } from "@/components/ui/button";
import UiPointColor from "@/components/point/uiPointColor";

import { useAddPoint } from "./hooks/useAddPoint";
import { useGraph } from "./stores/uiGraph";
import { Graph } from "./classes/road/graph";
import UiPointRemove from "@/components/point/uiPointRemove";
import UiPointSelect from "@/components/point/uiPointSelect";
import UiPointSize from "@/components/point/uiPointSize";

export default function UiPointsMain({ graph, canvas }: {
    graph: Graph
    canvas: MutableRefObject<HTMLCanvasElement | null>
}) {
    const [selectedPoints, setSelectedPoints] = useState<PointType[]>([]);

    const isMaxSelected = useMemo(() => {
        if (selectedPoints.length >= 2) return true
        return false
    }, [selectedPoints.length])



    const uiPoints = useGraph((state) => state.uiPoints)

    const setUiLines = useGraph((state) => state.setUiLines)



    useAddPoint(graph, canvas)
    return <>
        {
            uiPoints.map(point => {
                return <div
                    key={point.id}
                    className={` bg-neutral-900 p-5 rounded-lg z-50
                        ${selectedPoints.some(spoint => spoint.x === point.x && spoint.y == point.y) && "border-4"}
                    `}
                >
                    <div className="mb-5">
                        <h1 className="text-lg">Point</h1>
                        <p className="text-sm">x:{point.x} y:{point.y}</p>
                    </div>


                    <UiPointColor graph={graph} canvas={canvas} point={point} />
                    <UiPointSize graph={graph} canvas={canvas} point={point} />
                    <div className="mt-5 flex flex-col gap-2">
                        <UiPointRemove graph={graph} canvas={canvas} point={point} />
                        <UiPointSelect point={point} selectedPoints={selectedPoints} setSelectedPoints={setSelectedPoints} />
                    </div>
                </div>
            })
        }
        {isMaxSelected && <Button
            variant={"secondary"}
            onClick={() => {
                if (!canvas.current) return console.log("no canvas prop")
                const ctx = canvas.current.getContext("2d")
                if (!ctx) return console.log("No ctx")

                const updatedLines = graph.drawLine(selectedPoints[0], selectedPoints[1])
                if (updatedLines) {
                    setUiLines(updatedLines)
                }

                setSelectedPoints([])




            }}
        >Create line at 2 points</Button>}
    </>
}