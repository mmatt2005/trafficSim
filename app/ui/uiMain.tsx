"use client"
import { MutableRefObject, useMemo, useRef, useState } from "react"
import { Point, PointType } from "../classes/road/point"
import { useGraph } from "../stores/uiGraph"
import { Button } from "@/components/ui/button";
import { Graph } from "../classes/road/graph";
import { useAddPoint } from "../hooks/useAddPoint";
import UiPointSize from "@/components/uiPointSize";
import UiPointColor from "@/components/uiPointColor";
import UiPointRemove from "@/components/uiPointRemove";
import UiPointSelect from "@/components/uiPointSelect";

export default function UiMain({ graph, canvas }: {
    graph: Graph
    canvas: MutableRefObject<HTMLCanvasElement | null>
}) {
    const [selectedPoints, setSelectedPoints] = useState<PointType[]>([]);

    const isMaxSelected = useMemo(() => {
        if (selectedPoints.length >= 2) return true
        return false
    }, [selectedPoints.length])



    const uiPoints = useGraph((state) => state.uiPoints)


    useAddPoint(graph, canvas)

    return <div className="flex flex-wrap gap-5 p-5 ">
        {
            uiPoints.map(point => {
                return <div
                    key={point.id}
                    className={` bg-neutral-900 p-5 rounded-lg
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
                        <UiPointSelect point={point} selectedPoints={selectedPoints} setSelectedPoints={setSelectedPoints}/>
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

                graph.drawLine(ctx, selectedPoints[0], selectedPoints[1])

                setSelectedPoints([])
            }}
        >Create line at 2 points</Button>}
    </div>
}