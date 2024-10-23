"use client"

import { MutableRefObject } from "react"
import { Graph } from "./classes/road/graph"
import { useGraph } from "./stores/uiGraph"
import UiLineColor from "../components/line/uiLineColor"
import UiLineWidth from "@/components/line/uiLineWidth"

export default function UiLinesMain({ graph, canvas }: {
    graph: Graph
    canvas: MutableRefObject<HTMLCanvasElement | null>
}) {
    const uiLines = useGraph((state) => state.uiLines)

    return <>
        {
            uiLines.map(line => {
                return <div
                    key={line.id}
                    className={` bg-neutral-900 p-5 rounded-lg`}
                >
                    <div className="mb-5">
                        <h1 className="text-lg">Line</h1>
                        <div className="flex gap-5 flex-wrap">
                            {line.points.map((point, index) => (
                                <div key={index}>
                                    <p className="text-sm ">Point {index + 1}</p>
                                    <p className="text-sm text-muted-foreground">x: {point.x} y: {point.y}</p>
                                </div>
                            ))}
                        </div>
                        <UiLineColor graph={graph} canvas={canvas} line={line} />
                        <UiLineWidth graph={graph} canvas={canvas} line={line}/>
                    </div>
                </div>
            })
        }

    </>
}