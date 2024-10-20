"use client"

import { MutableRefObject } from "react"
import { Graph } from "./classes/road/graph"
import { useGraph } from "./stores/uiGraph"
import UiLineColor from "./uiLineColor"

export default function UiLinesMain({ graph, canvas }: {
    graph: Graph
    canvas: MutableRefObject<HTMLCanvasElement | null>
}) {
    const uiLines = useGraph((state) => state.uiLines)

    return <div className="">
        {
            uiLines.map(line => {
                return <div
                    key={line.id}
                    className={` bg-neutral-900 p-5 rounded-lg`}
                >
                    <div className="mb-5">
                        <h1 className="text-lg">Line</h1>
                        {line.points.map((point, index) => (
                            <div key={index}>
                                <p className="text-sm ">Point {index + 1}</p>
                                <p className="text-sm text-muted-foreground">{point.x} {point.y}</p>
                            </div>
                        ))}
                        <UiLineColor graph={graph} canvas={canvas} line={line}/>
                    </div>
                </div>
            })
        }

    </div>
}